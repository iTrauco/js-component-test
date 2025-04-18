// b129d2f|2025-04-18T16:13:59.578Z line:1 uuid:a54ff538
// b129d2f|2025-04-18T16:13:59.578Z line:2 uuid:8605c6e9
// b129d2f|2025-04-18T16:13:59.578Z line:3 uuid:545cde07
// b129d2f|2025-04-18T16:13:59.578Z line:4 uuid:06199c81
// b129d2f|2025-04-18T16:13:59.578Z line:5 uuid:685f8c1a
#!/usr/bin/env node // b129d2f|2025-04-18T16:13:59.578Z line:6 uuid:d79b9c27
const fs = require('fs'); // b129d2f|2025-04-18T16:13:59.578Z line:7 uuid:e56adceb
const path = require('path'); // b129d2f|2025-04-18T16:13:59.578Z line:8 uuid:c964d427
const crypto = require('crypto'); // b129d2f|2025-04-18T16:13:59.578Z line:9 uuid:7e326a16
const { execSync } = require('child_process'); // b129d2f|2025-04-18T16:13:59.578Z line:10 uuid:6f9745e6
const readline = require('readline'); // b129d2f|2025-04-18T16:13:59.578Z line:11 uuid:ef1815d4
// b129d2f|2025-04-18T16:13:59.578Z line:12 uuid:4a2aabe2
const CONFIG_FILE = '.uuid-cli-config.json'; // b129d2f|2025-04-18T16:13:59.578Z line:13 uuid:5e9cd1d2
const SCRIPT_FILENAME = path.basename(__filename); // b129d2f|2025-04-18T16:13:59.578Z line:14 uuid:02c09057
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // b129d2f|2025-04-18T16:13:59.578Z line:15 uuid:244a6693
// b129d2f|2025-04-18T16:13:59.578Z line:16 uuid:87c03228
// b129d2f|2025-04-18T16:13:59.578Z line:17 uuid:d4c46b5d
let config = { // b129d2f|2025-04-18T16:13:59.578Z line:18 uuid:73f768d9
  includeBranch: true, // b129d2f|2025-04-18T16:13:59.578Z line:19 uuid:3afb8347
  includeCommit: true, // b129d2f|2025-04-18T16:13:59.578Z line:20 uuid:0f4a6981
  includeTimestamp: true, // b129d2f|2025-04-18T16:13:59.578Z line:21 uuid:fb77f04b
  includeLineNumber: true // b129d2f|2025-04-18T16:13:59.578Z line:22 uuid:7a1527f7
}; // b129d2f|2025-04-18T16:13:59.578Z line:23 uuid:65134d42
// b129d2f|2025-04-18T16:13:59.578Z line:24 uuid:65a7d5b1
function generateShortUUID() { // b129d2f|2025-04-18T16:13:59.578Z line:25 uuid:a1591e99
  return crypto.randomBytes(4).toString('hex'); // b129d2f|2025-04-18T16:13:59.578Z line:26 uuid:4b61290c
} // b129d2f|2025-04-18T16:13:59.578Z line:27 uuid:c2e9ba8e
// b129d2f|2025-04-18T16:13:59.578Z line:28 uuid:dac5e8dd
function getGitInfo() { // b129d2f|2025-04-18T16:13:59.578Z line:29 uuid:e4336fa5
  try { // b129d2f|2025-04-18T16:13:59.578Z line:30 uuid:7a511ba6
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // b129d2f|2025-04-18T16:13:59.578Z line:31 uuid:0fcc3451
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // b129d2f|2025-04-18T16:13:59.578Z line:32 uuid:c054caba
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // b129d2f|2025-04-18T16:13:59.578Z line:33 uuid:c3f12590
    return { branch, lastCommit }; // b129d2f|2025-04-18T16:13:59.578Z line:34 uuid:03438d87
  } catch { // b129d2f|2025-04-18T16:13:59.578Z line:35 uuid:ffbbcc4c
    return { branch: null, lastCommit: null }; // b129d2f|2025-04-18T16:13:59.578Z line:36 uuid:9ee1f878
  } // b129d2f|2025-04-18T16:13:59.578Z line:37 uuid:0fff619d
} // b129d2f|2025-04-18T16:13:59.578Z line:38 uuid:b6f7c78c
// b129d2f|2025-04-18T16:13:59.578Z line:39 uuid:528571e1
function loadConfig() { // b129d2f|2025-04-18T16:13:59.578Z line:40 uuid:c9f4aa26
  try { // b129d2f|2025-04-18T16:13:59.578Z line:41 uuid:f5a4e251
    if (fs.existsSync(CONFIG_FILE)) { // b129d2f|2025-04-18T16:13:59.578Z line:42 uuid:2b5b72f1
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // b129d2f|2025-04-18T16:13:59.578Z line:43 uuid:50e6c12c
      console.log('Loaded configuration:', config); // b129d2f|2025-04-18T16:13:59.578Z line:44 uuid:aa22f754
    } // b129d2f|2025-04-18T16:13:59.578Z line:45 uuid:a8a398b4
  } catch (error) { // b129d2f|2025-04-18T16:13:59.578Z line:46 uuid:d845ee59
    console.error('Error loading config:', error.message); // b129d2f|2025-04-18T16:13:59.578Z line:47 uuid:01471fa3
  } // b129d2f|2025-04-18T16:13:59.578Z line:48 uuid:0601e7bf
} // b129d2f|2025-04-18T16:13:59.578Z line:49 uuid:b2fd569e
// b129d2f|2025-04-18T16:13:59.578Z line:50 uuid:55f9cc0f
function saveConfig() { // b129d2f|2025-04-18T16:13:59.578Z line:51 uuid:bf336ed2
  try { // b129d2f|2025-04-18T16:13:59.578Z line:52 uuid:3e7b79ba
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // b129d2f|2025-04-18T16:13:59.578Z line:53 uuid:5c81408b
    console.log('Configuration saved.'); // b129d2f|2025-04-18T16:13:59.578Z line:54 uuid:ac7ada90
  } catch (error) { // b129d2f|2025-04-18T16:13:59.578Z line:55 uuid:81c80e3b
    console.error('Error saving config:', error.message); // b129d2f|2025-04-18T16:13:59.578Z line:56 uuid:540a1d8a
  } // b129d2f|2025-04-18T16:13:59.578Z line:57 uuid:dfd6f9d6
} // b129d2f|2025-04-18T16:13:59.578Z line:58 uuid:84aa4e9c
// b129d2f|2025-04-18T16:13:59.578Z line:59 uuid:74a95319
function addUUIDsToFile(filePath) { // b129d2f|2025-04-18T16:13:59.578Z line:60 uuid:582e7d82
  try { // b129d2f|2025-04-18T16:13:59.578Z line:61 uuid:d0b74125
    if (path.basename(filePath) === SCRIPT_FILENAME) { // b129d2f|2025-04-18T16:13:59.578Z line:62 uuid:d7d16dac
      console.log(`Skipping self: ${filePath}`); // b129d2f|2025-04-18T16:13:59.578Z line:63 uuid:716a0dd9
      return; // b129d2f|2025-04-18T16:13:59.578Z line:64 uuid:b1089018
    } // b129d2f|2025-04-18T16:13:59.578Z line:65 uuid:7ddfc21a
// b129d2f|2025-04-18T16:13:59.578Z line:66 uuid:17df258f
    const { branch, lastCommit } = getGitInfo(); // b129d2f|2025-04-18T16:13:59.578Z line:67 uuid:f8995650
    const timestamp = new Date().toISOString(); // b129d2f|2025-04-18T16:13:59.578Z line:68 uuid:b80c0da5
// b129d2f|2025-04-18T16:13:59.578Z line:69 uuid:1aa0aa0a
// b129d2f|2025-04-18T16:13:59.578Z line:70 uuid:20d1db04
    let metaParts = []; // b129d2f|2025-04-18T16:13:59.578Z line:71 uuid:acc383c2
    if (config.includeBranch && branch) metaParts.push(branch); // b129d2f|2025-04-18T16:13:59.578Z line:72 uuid:116e4191
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // b129d2f|2025-04-18T16:13:59.578Z line:73 uuid:4f6736f6
    if (config.includeTimestamp) metaParts.push(timestamp); // b129d2f|2025-04-18T16:13:59.578Z line:74 uuid:6234ac9b
    const metaInfo = metaParts.join('|'); // b129d2f|2025-04-18T16:13:59.578Z line:75 uuid:9239ac9c
// b129d2f|2025-04-18T16:13:59.578Z line:76 uuid:f03ca667
    let content = fs.readFileSync(filePath, 'utf8'); // b129d2f|2025-04-18T16:13:59.578Z line:77 uuid:4c6f266c
    const lines = content.split('\n'); // b129d2f|2025-04-18T16:13:59.578Z line:78 uuid:e4ebd394
// b129d2f|2025-04-18T16:13:59.578Z line:79 uuid:c058600b
    const updatedLines = lines.map((line, index) => { // b129d2f|2025-04-18T16:13:59.578Z line:80 uuid:32b960f3
      const lineNumber = index + 1; // b129d2f|2025-04-18T16:13:59.578Z line:81 uuid:4fa15480
      let cleanLine = line; // b129d2f|2025-04-18T16:13:59.578Z line:82 uuid:0a3c6be2
// b129d2f|2025-04-18T16:13:59.578Z line:83 uuid:0550cd5e
      if (line.includes(' // b129d2f|2025-04-18T16:13:59.578Z line:84 uuid:eaa819d5
        cleanLine = line.substring(0, line.indexOf(' // b129d2f|2025-04-18T16:13:59.578Z line:85 uuid:269afdc2
      } // b129d2f|2025-04-18T16:13:59.578Z line:86 uuid:2ff07066
// b129d2f|2025-04-18T16:13:59.578Z line:87 uuid:6322c456
      let comment = ' // b129d2f|2025-04-18T16:13:59.578Z line:88 uuid:9b5fc07b
      if (metaInfo) comment += `${metaInfo} `; // b129d2f|2025-04-18T16:13:59.578Z line:89 uuid:2f30d9dc
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // b129d2f|2025-04-18T16:13:59.578Z line:90 uuid:65600484
      comment += `uuid:${generateShortUUID()}`; // b129d2f|2025-04-18T16:13:59.578Z line:91 uuid:32084549
// b129d2f|2025-04-18T16:13:59.578Z line:92 uuid:452ee4ce
      if (cleanLine.trim() === '') { // b129d2f|2025-04-18T16:13:59.578Z line:93 uuid:9497919e
        return comment.trim(); // b129d2f|2025-04-18T16:13:59.578Z line:94 uuid:52f6064f
      } // b129d2f|2025-04-18T16:13:59.578Z line:95 uuid:6aed8ad8
// b129d2f|2025-04-18T16:13:59.578Z line:96 uuid:68d0f939
      return `${cleanLine.trimEnd()}${comment}`; // b129d2f|2025-04-18T16:13:59.578Z line:97 uuid:073b2196
    }); // b129d2f|2025-04-18T16:13:59.578Z line:98 uuid:eb43fd12
// b129d2f|2025-04-18T16:13:59.578Z line:99 uuid:e8996a15
    fs.writeFileSync(filePath, updatedLines.join('\n')); // b129d2f|2025-04-18T16:13:59.578Z line:100 uuid:2dc68219
    console.log(`Updated: ${filePath}`); // b129d2f|2025-04-18T16:13:59.578Z line:101 uuid:ed92c4b0
  } catch (error) { // b129d2f|2025-04-18T16:13:59.578Z line:102 uuid:cb8a0c49
    console.error(`Error processing ${filePath}: ${error.message}`); // b129d2f|2025-04-18T16:13:59.578Z line:103 uuid:a618d8b5
  } // b129d2f|2025-04-18T16:13:59.578Z line:104 uuid:0e22d768
} // b129d2f|2025-04-18T16:13:59.578Z line:105 uuid:d03f3c62
// b129d2f|2025-04-18T16:13:59.578Z line:106 uuid:58fda161
function processDirectory(dirPath) { // b129d2f|2025-04-18T16:13:59.578Z line:107 uuid:b5f87703
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // b129d2f|2025-04-18T16:13:59.578Z line:108 uuid:a1e58f57
// b129d2f|2025-04-18T16:13:59.578Z line:109 uuid:0370f22a
  for (const entry of entries) { // b129d2f|2025-04-18T16:13:59.578Z line:110 uuid:8b3f429c
    const fullPath = path.join(dirPath, entry.name); // b129d2f|2025-04-18T16:13:59.578Z line:111 uuid:f10558f1
// b129d2f|2025-04-18T16:13:59.578Z line:112 uuid:06e0de38
    if (entry.isDirectory()) { // b129d2f|2025-04-18T16:13:59.578Z line:113 uuid:9e5b6bdb
      if (!SKIP_DIRS.includes(entry.name)) { // b129d2f|2025-04-18T16:13:59.578Z line:114 uuid:ea2cf5c8
        processDirectory(fullPath); // b129d2f|2025-04-18T16:13:59.578Z line:115 uuid:2115b449
      } // b129d2f|2025-04-18T16:13:59.578Z line:116 uuid:b24c50f5
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // b129d2f|2025-04-18T16:13:59.578Z line:117 uuid:cb90c51d
      addUUIDsToFile(fullPath); // b129d2f|2025-04-18T16:13:59.578Z line:118 uuid:68970041
    } // b129d2f|2025-04-18T16:13:59.578Z line:119 uuid:4ef6095e
  } // b129d2f|2025-04-18T16:13:59.578Z line:120 uuid:982e8a77
} // b129d2f|2025-04-18T16:13:59.578Z line:121 uuid:2eef632d
// b129d2f|2025-04-18T16:13:59.578Z line:122 uuid:75a96abf
function showMenu() { // b129d2f|2025-04-18T16:13:59.578Z line:123 uuid:80f78d73
  const rl = readline.createInterface({ // b129d2f|2025-04-18T16:13:59.578Z line:124 uuid:825d764c
    input: process.stdin, // b129d2f|2025-04-18T16:13:59.578Z line:125 uuid:e42f7264
    output: process.stdout // b129d2f|2025-04-18T16:13:59.578Z line:126 uuid:d4762986
  }); // b129d2f|2025-04-18T16:13:59.578Z line:127 uuid:0e2a8a2a
// b129d2f|2025-04-18T16:13:59.578Z line:128 uuid:0543c523
  console.log('\nUUID CLI Configuration:'); // b129d2f|2025-04-18T16:13:59.578Z line:129 uuid:b74efd41
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.578Z line:130 uuid:a2ce23f8
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.578Z line:131 uuid:5d96d698
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.578Z line:132 uuid:08c399d5
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.578Z line:133 uuid:880e68e7
  console.log('5. Reset to Defaults'); // b129d2f|2025-04-18T16:13:59.578Z line:134 uuid:7d2ecb1c
  console.log('6. Save and Run'); // b129d2f|2025-04-18T16:13:59.578Z line:135 uuid:acc62afd
  console.log('7. Exit'); // b129d2f|2025-04-18T16:13:59.578Z line:136 uuid:bcdcd27d
// b129d2f|2025-04-18T16:13:59.578Z line:137 uuid:06125fdc
  rl.question('\nEnter option number: ', (answer) => { // b129d2f|2025-04-18T16:13:59.578Z line:138 uuid:ee0ecff5
    switch(answer) { // b129d2f|2025-04-18T16:13:59.578Z line:139 uuid:5e35e82e
      case '1': // b129d2f|2025-04-18T16:13:59.578Z line:140 uuid:843cd60e
        config.includeBranch = !config.includeBranch; // b129d2f|2025-04-18T16:13:59.578Z line:141 uuid:d5d9d3bc
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:142 uuid:9834ace2
        showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:143 uuid:78c4492b
        break; // b129d2f|2025-04-18T16:13:59.578Z line:144 uuid:8ddc8b40
      case '2': // b129d2f|2025-04-18T16:13:59.578Z line:145 uuid:fad340cc
        config.includeCommit = !config.includeCommit; // b129d2f|2025-04-18T16:13:59.578Z line:146 uuid:df77701e
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:147 uuid:2d600f27
        showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:148 uuid:e25fe5e3
        break; // b129d2f|2025-04-18T16:13:59.578Z line:149 uuid:ca9e02cf
      case '3': // b129d2f|2025-04-18T16:13:59.578Z line:150 uuid:504d7156
        config.includeTimestamp = !config.includeTimestamp; // b129d2f|2025-04-18T16:13:59.578Z line:151 uuid:105db854
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:152 uuid:afba36b4
        showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:153 uuid:be3bffa5
        break; // b129d2f|2025-04-18T16:13:59.578Z line:154 uuid:decfa606
      case '4': // b129d2f|2025-04-18T16:13:59.578Z line:155 uuid:7cc78b04
        config.includeLineNumber = !config.includeLineNumber; // b129d2f|2025-04-18T16:13:59.578Z line:156 uuid:d1362e7f
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:157 uuid:560fb476
        showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:158 uuid:3c160f58
        break; // b129d2f|2025-04-18T16:13:59.578Z line:159 uuid:195443f9
      case '5': // b129d2f|2025-04-18T16:13:59.578Z line:160 uuid:ef8223c4
        config = { // b129d2f|2025-04-18T16:13:59.578Z line:161 uuid:4eca89b0
          includeBranch: true, // b129d2f|2025-04-18T16:13:59.578Z line:162 uuid:6e1fbc94
          includeCommit: true, // b129d2f|2025-04-18T16:13:59.578Z line:163 uuid:d9eeb164
          includeTimestamp: true, // b129d2f|2025-04-18T16:13:59.578Z line:164 uuid:2ad2caa1
          includeLineNumber: true // b129d2f|2025-04-18T16:13:59.578Z line:165 uuid:8e90adda
        }; // b129d2f|2025-04-18T16:13:59.578Z line:166 uuid:8bdcf87a
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:167 uuid:6fb92b17
        showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:168 uuid:ba8f166c
        break; // b129d2f|2025-04-18T16:13:59.578Z line:169 uuid:2845e540
      case '6': // b129d2f|2025-04-18T16:13:59.578Z line:170 uuid:e3ca7bdc
        saveConfig(); // b129d2f|2025-04-18T16:13:59.578Z line:171 uuid:620ff37f
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:172 uuid:2843e3fd
        processDirectory(process.cwd()); // b129d2f|2025-04-18T16:13:59.578Z line:173 uuid:30f8ba7e
        break; // b129d2f|2025-04-18T16:13:59.578Z line:174 uuid:03411d5f
      case '7': // b129d2f|2025-04-18T16:13:59.578Z line:175 uuid:87fb7149
        console.log('Exiting without changes.'); // b129d2f|2025-04-18T16:13:59.578Z line:176 uuid:469b750b
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:177 uuid:31940586
        break; // b129d2f|2025-04-18T16:13:59.578Z line:178 uuid:736a9ce3
      default: // b129d2f|2025-04-18T16:13:59.578Z line:179 uuid:97a5b17b
        console.log('Invalid option. Please try again.'); // b129d2f|2025-04-18T16:13:59.578Z line:180 uuid:4246879e
        rl.close(); // b129d2f|2025-04-18T16:13:59.578Z line:181 uuid:3b74006e
        showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:182 uuid:7546d6f9
    } // b129d2f|2025-04-18T16:13:59.578Z line:183 uuid:6ec632f3
  }); // b129d2f|2025-04-18T16:13:59.578Z line:184 uuid:b423f52b
} // b129d2f|2025-04-18T16:13:59.578Z line:185 uuid:4c0abc3a
// b129d2f|2025-04-18T16:13:59.578Z line:186 uuid:f404eb7a
// b129d2f|2025-04-18T16:13:59.578Z line:187 uuid:6570fc0d
function main() { // b129d2f|2025-04-18T16:13:59.578Z line:188 uuid:cb934c7f
  loadConfig(); // b129d2f|2025-04-18T16:13:59.578Z line:189 uuid:4094a356
// b129d2f|2025-04-18T16:13:59.578Z line:190 uuid:4413eada
  if (process.argv.length > 2 && process.argv[2] === '--run') { // b129d2f|2025-04-18T16:13:59.578Z line:191 uuid:d7fed743
// b129d2f|2025-04-18T16:13:59.578Z line:192 uuid:9ce93f08
    processDirectory(process.cwd()); // b129d2f|2025-04-18T16:13:59.578Z line:193 uuid:8feb46c4
  } else { // b129d2f|2025-04-18T16:13:59.578Z line:194 uuid:1c25e44b
// b129d2f|2025-04-18T16:13:59.578Z line:195 uuid:a3dab6e7
    showMenu(); // b129d2f|2025-04-18T16:13:59.578Z line:196 uuid:5c314f0b
  } // b129d2f|2025-04-18T16:13:59.578Z line:197 uuid:946040f9
} // b129d2f|2025-04-18T16:13:59.578Z line:198 uuid:bcba3817
// b129d2f|2025-04-18T16:13:59.578Z line:199 uuid:dd6cb260
main(); // b129d2f|2025-04-18T16:13:59.578Z line:200 uuid:04b4e5c9
// b129d2f|2025-04-18T16:13:59.578Z line:201 uuid:380b8a5e