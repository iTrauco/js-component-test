// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:1 uuid:d3bd9a98
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:2 uuid:1c226a74
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:3 uuid:85b40da9
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:4 uuid:333cd808
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:5 uuid:2698a6be
#!/usr/bin/env node // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:6 uuid:32ac70c7
const fs = require('fs'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:7 uuid:4e828d13
const path = require('path'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:8 uuid:454c0824
const crypto = require('crypto'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:9 uuid:811bc1ec
const { execSync } = require('child_process'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:10 uuid:214531ba
const readline = require('readline'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:11 uuid:b7e316ea
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:12 uuid:054d61c7
const CONFIG_FILE = '.uuid-cli-config.json'; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:13 uuid:371bc239
const SCRIPT_FILENAME = path.basename(__filename); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:14 uuid:64e30e80
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:15 uuid:abd0b6ab
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:16 uuid:00daaf4e
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:17 uuid:da7a2042
let config = { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:18 uuid:2da4a9f7
  includeBranch: true, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:19 uuid:58630ba8
  includeCommit: true, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:20 uuid:037f15a3
  includeTimestamp: true, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:21 uuid:4c17e899
  includeLineNumber: true // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:22 uuid:36077867
}; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:23 uuid:099e1a9b
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:24 uuid:b7a1876c
function generateShortUUID() { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:25 uuid:2fae34b6
  return crypto.randomBytes(4).toString('hex'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:26 uuid:0fd0030e
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:27 uuid:a1b78f9f
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:28 uuid:93b01b67
function getGitInfo() { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:29 uuid:1c62ef6d
  try { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:30 uuid:e512d6b0
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:31 uuid:7aa04828
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:32 uuid:c1614482
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:33 uuid:f34662a2
    return { branch, lastCommit }; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:34 uuid:55652835
  } catch { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:35 uuid:a9012fad
    return { branch: null, lastCommit: null }; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:36 uuid:615b4dcb
  } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:37 uuid:366348b7
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:38 uuid:a3e91398
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:39 uuid:d04a8d59
function loadConfig() { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:40 uuid:891f144e
  try { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:41 uuid:35e36286
    if (fs.existsSync(CONFIG_FILE)) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:42 uuid:7c5bcaa8
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:43 uuid:226a4092
      console.log('Loaded configuration:', config); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:44 uuid:d39aae23
    } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:45 uuid:9a0909a2
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:46 uuid:0a6fa09d
    console.error('Error loading config:', error.message); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:47 uuid:1d614031
  } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:48 uuid:180791c4
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:49 uuid:853c644b
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:50 uuid:a8b369b6
function saveConfig() { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:51 uuid:7974d46a
  try { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:52 uuid:956cf714
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:53 uuid:12a3b0c1
    console.log('Configuration saved.'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:54 uuid:fec8428b
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:55 uuid:db711533
    console.error('Error saving config:', error.message); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:56 uuid:b8a08658
  } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:57 uuid:ae380987
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:58 uuid:9103a4bc
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:59 uuid:5a49476c
function addUUIDsToFile(filePath) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:60 uuid:c16ce493
  try { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:61 uuid:ede21619
    if (path.basename(filePath) === SCRIPT_FILENAME) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:62 uuid:53525be8
      console.log(`Skipping self: ${filePath}`); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:63 uuid:af0f0938
      return; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:64 uuid:58cebf6b
    } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:65 uuid:56f07e3b
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:66 uuid:ab3e8c1e
    const { branch, lastCommit } = getGitInfo(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:67 uuid:087cb7cc
    const timestamp = new Date().toISOString(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:68 uuid:e51d519f
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:69 uuid:2837a625
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:70 uuid:8652677b
    let metaParts = []; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:71 uuid:a7dfb6a3
    if (config.includeBranch && branch) metaParts.push(branch); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:72 uuid:4750378e
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:73 uuid:bbcceaca
    if (config.includeTimestamp) metaParts.push(timestamp); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:74 uuid:e07863a7
    const metaInfo = metaParts.join('|'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:75 uuid:9d2ac0c5
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:76 uuid:e50dc6df
    let content = fs.readFileSync(filePath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:77 uuid:b98e08a5
    const lines = content.split('\n'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:78 uuid:e4cb01bd
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:79 uuid:1f58b574
    const updatedLines = lines.map((line, index) => { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:80 uuid:03a5bc2d
      const lineNumber = index + 1; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:81 uuid:2d64fa21
      let cleanLine = line; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:82 uuid:d7e79e48
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:83 uuid:d1108a88
      if (line.includes(' // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:84 uuid:e44e1e74
        cleanLine = line.substring(0, line.indexOf(' // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:85 uuid:c472e58f
      } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:86 uuid:9c67308d
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:87 uuid:e13d324c
      let comment = ' // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:88 uuid:1a246ec2
      if (metaInfo) comment += `${metaInfo} `; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:89 uuid:5405095f
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:90 uuid:bd6e706b
      comment += `uuid:${generateShortUUID()}`; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:91 uuid:3e5fd605
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:92 uuid:02ac82cc
      if (cleanLine.trim() === '') { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:93 uuid:271455e0
        return comment.trim(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:94 uuid:f27febe5
      } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:95 uuid:1fded030
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:96 uuid:dc445985
      return `${cleanLine.trimEnd()}${comment}`; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:97 uuid:7ffffe72
    }); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:98 uuid:52585679
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:99 uuid:b93040dc
    fs.writeFileSync(filePath, updatedLines.join('\n')); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:100 uuid:3835afb5
    console.log(`Updated: ${filePath}`); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:101 uuid:116b6f71
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:102 uuid:c1defdd5
    console.error(`Error processing ${filePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:103 uuid:37630c49
  } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:104 uuid:5a4cf905
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:105 uuid:cbb9e491
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:106 uuid:bb0bc76c
function processDirectory(dirPath) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:107 uuid:813e5a01
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:108 uuid:28f66e47
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:109 uuid:b7b3eda3
  for (const entry of entries) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:110 uuid:1ae733b3
    const fullPath = path.join(dirPath, entry.name); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:111 uuid:bca3e483
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:112 uuid:d81e8eb0
    if (entry.isDirectory()) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:113 uuid:740ecf3c
      if (!SKIP_DIRS.includes(entry.name)) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:114 uuid:98a46d45
        processDirectory(fullPath); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:115 uuid:c433e52f
      } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:116 uuid:417e413f
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:117 uuid:7bfa7f25
      addUUIDsToFile(fullPath); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:118 uuid:0e9f3007
    } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:119 uuid:c88dd97e
  } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:120 uuid:3505a41f
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:121 uuid:b3d7351b
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:122 uuid:5b4c621a
function showMenu() { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:123 uuid:c9a3afc3
  const rl = readline.createInterface({ // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:124 uuid:21a185b9
    input: process.stdin, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:125 uuid:069ad627
    output: process.stdout // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:126 uuid:0fa29083
  }); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:127 uuid:03929e48
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:128 uuid:74542407
  console.log('\nUUID CLI Configuration:'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:129 uuid:f75845bc
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:130 uuid:23dd9933
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:131 uuid:4fda7080
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:132 uuid:3affd650
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:133 uuid:423e75d8
  console.log('5. Reset to Defaults'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:134 uuid:3002609a
  console.log('6. Save and Run'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:135 uuid:428008f4
  console.log('7. Exit'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:136 uuid:b7ad4988
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:137 uuid:215ef5ef
  rl.question('\nEnter option number: ', (answer) => { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:138 uuid:b202bb94
    switch(answer) { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:139 uuid:f67b251d
      case '1': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:140 uuid:e29048be
        config.includeBranch = !config.includeBranch; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:141 uuid:d19da534
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:142 uuid:66488556
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:143 uuid:6f2dc4d3
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:144 uuid:f50ce9f7
      case '2': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:145 uuid:d9f1595e
        config.includeCommit = !config.includeCommit; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:146 uuid:3fda4adb
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:147 uuid:be1eff61
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:148 uuid:685a936c
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:149 uuid:c514673c
      case '3': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:150 uuid:6beeb130
        config.includeTimestamp = !config.includeTimestamp; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:151 uuid:9f765c5a
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:152 uuid:d8fe9d66
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:153 uuid:de8bd700
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:154 uuid:319eb8c1
      case '4': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:155 uuid:522fdbf9
        config.includeLineNumber = !config.includeLineNumber; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:156 uuid:6689e8df
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:157 uuid:4229a309
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:158 uuid:e0f637cd
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:159 uuid:60d20347
      case '5': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:160 uuid:a927f35f
        config = { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:161 uuid:46f885cb
          includeBranch: true, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:162 uuid:5542252d
          includeCommit: true, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:163 uuid:6eb4838e
          includeTimestamp: true, // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:164 uuid:c02d63e7
          includeLineNumber: true // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:165 uuid:3e196e8c
        }; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:166 uuid:fade7aae
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:167 uuid:3b9c001d
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:168 uuid:55b5339e
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:169 uuid:4b55944a
      case '6': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:170 uuid:d7b8bb23
        saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:171 uuid:50b9ba34
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:172 uuid:cd9e538d
        processDirectory(process.cwd()); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:173 uuid:6e2a540d
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:174 uuid:d849aeb4
      case '7': // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:175 uuid:a9020971
        console.log('Exiting without changes.'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:176 uuid:e829afe2
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:177 uuid:c37f47bf
        break; // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:178 uuid:f13711c3
      default: // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:179 uuid:d1636dfe
        console.log('Invalid option. Please try again.'); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:180 uuid:7e9f9dfb
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:181 uuid:e554de85
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:182 uuid:aca2f7fe
    } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:183 uuid:87e504bf
  }); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:184 uuid:1924c17e
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:185 uuid:5a92781c
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:186 uuid:ea111def
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:187 uuid:29fc32a3
function main() { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:188 uuid:6ca90ff0
  loadConfig(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:189 uuid:c1b4a7be
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:190 uuid:42637c45
  if (process.argv.length > 2 && process.argv[2] === '--run') { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:191 uuid:8447e6dc
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:192 uuid:9fd4215c
    processDirectory(process.cwd()); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:193 uuid:0a65b49a
  } else { // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:194 uuid:d2690eb6
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:195 uuid:074c91d0
    showMenu(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:196 uuid:2148e8e6
  } // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:197 uuid:9f76746e
} // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:198 uuid:e996d302
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:199 uuid:058c7a05
main(); // commit:6a2a820|time:2025-04-18T16:15:27.002Z line:200 uuid:e06674dc
// commit:6a2a820|time:2025-04-18T16:15:27.002Z line:201 uuid:3c601f35