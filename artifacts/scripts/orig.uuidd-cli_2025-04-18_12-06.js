// 6084808|2025-04-18T16:08:33.219Z line:1 uuid:f5647cd8
// 6084808|2025-04-18T16:08:33.219Z line:2 uuid:23fdb637
// 6084808|2025-04-18T16:08:33.219Z line:3 uuid:e431060c
// 6084808|2025-04-18T16:08:33.219Z line:4 uuid:916e1f79
// 6084808|2025-04-18T16:08:33.219Z line:5 uuid:865d9c99
#!/usr/bin/env node // 6084808|2025-04-18T16:08:33.219Z line:6 uuid:6d19ea8d
const fs = require('fs'); // 6084808|2025-04-18T16:08:33.219Z line:7 uuid:0586b384
const path = require('path'); // 6084808|2025-04-18T16:08:33.219Z line:8 uuid:0254e927
const crypto = require('crypto'); // 6084808|2025-04-18T16:08:33.219Z line:9 uuid:403fc7dc
const { execSync } = require('child_process'); // 6084808|2025-04-18T16:08:33.219Z line:10 uuid:8e7e16a8
const readline = require('readline'); // 6084808|2025-04-18T16:08:33.219Z line:11 uuid:94456d78
// 6084808|2025-04-18T16:08:33.219Z line:12 uuid:81085a68
const CONFIG_FILE = '.uuid-cli-config.json'; // 6084808|2025-04-18T16:08:33.219Z line:13 uuid:b8360369
const SCRIPT_FILENAME = path.basename(__filename); // 6084808|2025-04-18T16:08:33.219Z line:14 uuid:68605e18
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // 6084808|2025-04-18T16:08:33.219Z line:15 uuid:77363318
// 6084808|2025-04-18T16:08:33.219Z line:16 uuid:1ebc4368
// 6084808|2025-04-18T16:08:33.219Z line:17 uuid:943d3d8e
let config = { // 6084808|2025-04-18T16:08:33.219Z line:18 uuid:3bb98822
  includeBranch: true, // 6084808|2025-04-18T16:08:33.219Z line:19 uuid:3ede2978
  includeCommit: true, // 6084808|2025-04-18T16:08:33.219Z line:20 uuid:9884d2e3
  includeTimestamp: true, // 6084808|2025-04-18T16:08:33.219Z line:21 uuid:a9a0de5d
  includeLineNumber: true // 6084808|2025-04-18T16:08:33.219Z line:22 uuid:83b1abe3
}; // 6084808|2025-04-18T16:08:33.219Z line:23 uuid:7d78772f
// 6084808|2025-04-18T16:08:33.219Z line:24 uuid:06d291fb
function generateShortUUID() { // 6084808|2025-04-18T16:08:33.219Z line:25 uuid:05765969
  return crypto.randomBytes(4).toString('hex'); // 6084808|2025-04-18T16:08:33.219Z line:26 uuid:d05f88b8
} // 6084808|2025-04-18T16:08:33.219Z line:27 uuid:9ed8b9bc
// 6084808|2025-04-18T16:08:33.219Z line:28 uuid:e8ba6a4b
function getGitInfo() { // 6084808|2025-04-18T16:08:33.219Z line:29 uuid:0eb69fc3
  try { // 6084808|2025-04-18T16:08:33.219Z line:30 uuid:ac8583fc
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // 6084808|2025-04-18T16:08:33.219Z line:31 uuid:0b954132
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // 6084808|2025-04-18T16:08:33.219Z line:32 uuid:cd1d52b5
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // 6084808|2025-04-18T16:08:33.219Z line:33 uuid:70c62daa
    return { branch, lastCommit }; // 6084808|2025-04-18T16:08:33.219Z line:34 uuid:3c7b359c
  } catch { // 6084808|2025-04-18T16:08:33.219Z line:35 uuid:e1fe7e61
    return { branch: null, lastCommit: null }; // 6084808|2025-04-18T16:08:33.219Z line:36 uuid:8017508a
  } // 6084808|2025-04-18T16:08:33.219Z line:37 uuid:7e16c3c1
} // 6084808|2025-04-18T16:08:33.219Z line:38 uuid:4bc879f4
// 6084808|2025-04-18T16:08:33.219Z line:39 uuid:17c99272
function loadConfig() { // 6084808|2025-04-18T16:08:33.219Z line:40 uuid:27bad1bb
  try { // 6084808|2025-04-18T16:08:33.219Z line:41 uuid:a5633824
    if (fs.existsSync(CONFIG_FILE)) { // 6084808|2025-04-18T16:08:33.219Z line:42 uuid:5bd48ca7
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // 6084808|2025-04-18T16:08:33.219Z line:43 uuid:e12489a4
      console.log('Loaded configuration:', config); // 6084808|2025-04-18T16:08:33.219Z line:44 uuid:4be9bb78
    } // 6084808|2025-04-18T16:08:33.219Z line:45 uuid:e543d772
  } catch (error) { // 6084808|2025-04-18T16:08:33.219Z line:46 uuid:d37d0672
    console.error('Error loading config:', error.message); // 6084808|2025-04-18T16:08:33.219Z line:47 uuid:eca189b9
  } // 6084808|2025-04-18T16:08:33.219Z line:48 uuid:bc3adff3
} // 6084808|2025-04-18T16:08:33.219Z line:49 uuid:70cacf3f
// 6084808|2025-04-18T16:08:33.219Z line:50 uuid:00232dbc
function saveConfig() { // 6084808|2025-04-18T16:08:33.219Z line:51 uuid:e296d36c
  try { // 6084808|2025-04-18T16:08:33.219Z line:52 uuid:40a9e9a8
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // 6084808|2025-04-18T16:08:33.219Z line:53 uuid:ade4f056
    console.log('Configuration saved.'); // 6084808|2025-04-18T16:08:33.219Z line:54 uuid:0e6df1fe
  } catch (error) { // 6084808|2025-04-18T16:08:33.219Z line:55 uuid:2a23f325
    console.error('Error saving config:', error.message); // 6084808|2025-04-18T16:08:33.219Z line:56 uuid:fae9e4f1
  } // 6084808|2025-04-18T16:08:33.219Z line:57 uuid:1536d2d0
} // 6084808|2025-04-18T16:08:33.219Z line:58 uuid:e22384be
// 6084808|2025-04-18T16:08:33.219Z line:59 uuid:2c45ad40
function addUUIDsToFile(filePath) { // 6084808|2025-04-18T16:08:33.219Z line:60 uuid:118addc9
  try { // 6084808|2025-04-18T16:08:33.219Z line:61 uuid:2ab85bf7
    if (path.basename(filePath) === SCRIPT_FILENAME) { // 6084808|2025-04-18T16:08:33.219Z line:62 uuid:bf7dd9a5
      console.log(`Skipping self: ${filePath}`); // 6084808|2025-04-18T16:08:33.219Z line:63 uuid:a3540f07
      return; // 6084808|2025-04-18T16:08:33.219Z line:64 uuid:526fc596
    } // 6084808|2025-04-18T16:08:33.219Z line:65 uuid:77cb0198
// 6084808|2025-04-18T16:08:33.219Z line:66 uuid:435513f5
    const { branch, lastCommit } = getGitInfo(); // 6084808|2025-04-18T16:08:33.219Z line:67 uuid:10b82b1d
    const timestamp = new Date().toISOString(); // 6084808|2025-04-18T16:08:33.219Z line:68 uuid:ce6ffe47
// 6084808|2025-04-18T16:08:33.219Z line:69 uuid:5b0e5090
// 6084808|2025-04-18T16:08:33.219Z line:70 uuid:fba38bb2
    let metaParts = []; // 6084808|2025-04-18T16:08:33.219Z line:71 uuid:c30d1499
    if (config.includeBranch && branch) metaParts.push(branch); // 6084808|2025-04-18T16:08:33.219Z line:72 uuid:e794184a
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // 6084808|2025-04-18T16:08:33.219Z line:73 uuid:348e9ed6
    if (config.includeTimestamp) metaParts.push(timestamp); // 6084808|2025-04-18T16:08:33.219Z line:74 uuid:f5fb2226
    const metaInfo = metaParts.join('|'); // 6084808|2025-04-18T16:08:33.219Z line:75 uuid:d4c3f4c4
// 6084808|2025-04-18T16:08:33.219Z line:76 uuid:2fad1151
    let content = fs.readFileSync(filePath, 'utf8'); // 6084808|2025-04-18T16:08:33.219Z line:77 uuid:0f1d27dc
    const lines = content.split('\n'); // 6084808|2025-04-18T16:08:33.219Z line:78 uuid:9f255e46
// 6084808|2025-04-18T16:08:33.219Z line:79 uuid:cedf8e9a
    const updatedLines = lines.map((line, index) => { // 6084808|2025-04-18T16:08:33.219Z line:80 uuid:aa132ab1
      const lineNumber = index + 1; // 6084808|2025-04-18T16:08:33.219Z line:81 uuid:f62d7c6c
      let cleanLine = line; // 6084808|2025-04-18T16:08:33.219Z line:82 uuid:b2098c8e
// 6084808|2025-04-18T16:08:33.219Z line:83 uuid:c6de688f
      if (line.includes(' // 6084808|2025-04-18T16:08:33.219Z line:84 uuid:3aa8510e
        cleanLine = line.substring(0, line.indexOf(' // 6084808|2025-04-18T16:08:33.219Z line:85 uuid:5e26321a
      } // 6084808|2025-04-18T16:08:33.219Z line:86 uuid:ade9e340
// 6084808|2025-04-18T16:08:33.219Z line:87 uuid:d02888aa
      let comment = ' // 6084808|2025-04-18T16:08:33.219Z line:88 uuid:466d7679
      if (metaInfo) comment += `${metaInfo} `; // 6084808|2025-04-18T16:08:33.219Z line:89 uuid:aa21e4eb
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // 6084808|2025-04-18T16:08:33.219Z line:90 uuid:551485c2
      comment += `uuid:${generateShortUUID()}`; // 6084808|2025-04-18T16:08:33.219Z line:91 uuid:ebcc6382
// 6084808|2025-04-18T16:08:33.219Z line:92 uuid:96624457
      if (cleanLine.trim() === '') { // 6084808|2025-04-18T16:08:33.219Z line:93 uuid:d539a94d
        return comment.trim(); // 6084808|2025-04-18T16:08:33.219Z line:94 uuid:fa0991df
      } // 6084808|2025-04-18T16:08:33.219Z line:95 uuid:90202c51
// 6084808|2025-04-18T16:08:33.219Z line:96 uuid:1be3a9ce
      return `${cleanLine.trimEnd()}${comment}`; // 6084808|2025-04-18T16:08:33.219Z line:97 uuid:394f3b47
    }); // 6084808|2025-04-18T16:08:33.219Z line:98 uuid:b170b1b4
// 6084808|2025-04-18T16:08:33.219Z line:99 uuid:a558fb61
    fs.writeFileSync(filePath, updatedLines.join('\n')); // 6084808|2025-04-18T16:08:33.219Z line:100 uuid:1135d0a9
    console.log(`Updated: ${filePath}`); // 6084808|2025-04-18T16:08:33.219Z line:101 uuid:bfbe1680
  } catch (error) { // 6084808|2025-04-18T16:08:33.219Z line:102 uuid:44f237e4
    console.error(`Error processing ${filePath}: ${error.message}`); // 6084808|2025-04-18T16:08:33.219Z line:103 uuid:48ca095c
  } // 6084808|2025-04-18T16:08:33.219Z line:104 uuid:1b90f7ef
} // 6084808|2025-04-18T16:08:33.219Z line:105 uuid:3bdee4d0
// 6084808|2025-04-18T16:08:33.219Z line:106 uuid:a37e627b
function processDirectory(dirPath) { // 6084808|2025-04-18T16:08:33.219Z line:107 uuid:46249db0
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // 6084808|2025-04-18T16:08:33.219Z line:108 uuid:0290656d
// 6084808|2025-04-18T16:08:33.219Z line:109 uuid:ab24e597
  for (const entry of entries) { // 6084808|2025-04-18T16:08:33.219Z line:110 uuid:8b0cbb6a
    const fullPath = path.join(dirPath, entry.name); // 6084808|2025-04-18T16:08:33.219Z line:111 uuid:08f1b463
// 6084808|2025-04-18T16:08:33.219Z line:112 uuid:cedea1f2
    if (entry.isDirectory()) { // 6084808|2025-04-18T16:08:33.219Z line:113 uuid:08382a9f
      if (!SKIP_DIRS.includes(entry.name)) { // 6084808|2025-04-18T16:08:33.219Z line:114 uuid:453fb0e8
        processDirectory(fullPath); // 6084808|2025-04-18T16:08:33.219Z line:115 uuid:7d5031da
      } // 6084808|2025-04-18T16:08:33.219Z line:116 uuid:b070dcc7
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // 6084808|2025-04-18T16:08:33.219Z line:117 uuid:74dcb041
      addUUIDsToFile(fullPath); // 6084808|2025-04-18T16:08:33.219Z line:118 uuid:ee9b7dbf
    } // 6084808|2025-04-18T16:08:33.219Z line:119 uuid:8b0bfb22
  } // 6084808|2025-04-18T16:08:33.219Z line:120 uuid:a8654603
} // 6084808|2025-04-18T16:08:33.219Z line:121 uuid:a81b974a
// 6084808|2025-04-18T16:08:33.219Z line:122 uuid:c401ba3b
function showMenu() { // 6084808|2025-04-18T16:08:33.219Z line:123 uuid:648e7930
  const rl = readline.createInterface({ // 6084808|2025-04-18T16:08:33.219Z line:124 uuid:370f8860
    input: process.stdin, // 6084808|2025-04-18T16:08:33.219Z line:125 uuid:70511bfa
    output: process.stdout // 6084808|2025-04-18T16:08:33.219Z line:126 uuid:1bb5b9b6
  }); // 6084808|2025-04-18T16:08:33.219Z line:127 uuid:a0135da4
// 6084808|2025-04-18T16:08:33.219Z line:128 uuid:45cc39a8
  console.log('\nUUID CLI Configuration:'); // 6084808|2025-04-18T16:08:33.219Z line:129 uuid:f916172a
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // 6084808|2025-04-18T16:08:33.219Z line:130 uuid:fca8a417
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // 6084808|2025-04-18T16:08:33.219Z line:131 uuid:bedbd1cd
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // 6084808|2025-04-18T16:08:33.219Z line:132 uuid:46426e09
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // 6084808|2025-04-18T16:08:33.219Z line:133 uuid:c9c309ee
  console.log('5. Reset to Defaults'); // 6084808|2025-04-18T16:08:33.219Z line:134 uuid:287eb620
  console.log('6. Save and Run'); // 6084808|2025-04-18T16:08:33.219Z line:135 uuid:55612d0b
  console.log('7. Exit'); // 6084808|2025-04-18T16:08:33.219Z line:136 uuid:d73a8b20
// 6084808|2025-04-18T16:08:33.219Z line:137 uuid:da8a5273
  rl.question('\nEnter option number: ', (answer) => { // 6084808|2025-04-18T16:08:33.219Z line:138 uuid:d7b44035
    switch(answer) { // 6084808|2025-04-18T16:08:33.219Z line:139 uuid:9b90fb49
      case '1': // 6084808|2025-04-18T16:08:33.219Z line:140 uuid:2f63433b
        config.includeBranch = !config.includeBranch; // 6084808|2025-04-18T16:08:33.219Z line:141 uuid:f45dcec0
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:142 uuid:22f89367
        showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:143 uuid:3f3eb181
        break; // 6084808|2025-04-18T16:08:33.219Z line:144 uuid:dee68199
      case '2': // 6084808|2025-04-18T16:08:33.219Z line:145 uuid:09c51d8d
        config.includeCommit = !config.includeCommit; // 6084808|2025-04-18T16:08:33.219Z line:146 uuid:ea333547
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:147 uuid:4b96507a
        showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:148 uuid:a483d4f3
        break; // 6084808|2025-04-18T16:08:33.219Z line:149 uuid:ba7d3eca
      case '3': // 6084808|2025-04-18T16:08:33.219Z line:150 uuid:c528f954
        config.includeTimestamp = !config.includeTimestamp; // 6084808|2025-04-18T16:08:33.219Z line:151 uuid:419dd97f
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:152 uuid:fd4abde2
        showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:153 uuid:de8d653d
        break; // 6084808|2025-04-18T16:08:33.219Z line:154 uuid:b3d80121
      case '4': // 6084808|2025-04-18T16:08:33.219Z line:155 uuid:e1ab3c2a
        config.includeLineNumber = !config.includeLineNumber; // 6084808|2025-04-18T16:08:33.219Z line:156 uuid:31149410
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:157 uuid:6a6626c1
        showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:158 uuid:d6b71fc7
        break; // 6084808|2025-04-18T16:08:33.219Z line:159 uuid:3ce628bc
      case '5': // 6084808|2025-04-18T16:08:33.219Z line:160 uuid:ad2e1f3e
        config = { // 6084808|2025-04-18T16:08:33.219Z line:161 uuid:22182fda
          includeBranch: true, // 6084808|2025-04-18T16:08:33.219Z line:162 uuid:6adcc83b
          includeCommit: true, // 6084808|2025-04-18T16:08:33.219Z line:163 uuid:90bb3da6
          includeTimestamp: true, // 6084808|2025-04-18T16:08:33.219Z line:164 uuid:de71e428
          includeLineNumber: true // 6084808|2025-04-18T16:08:33.219Z line:165 uuid:5eac9add
        }; // 6084808|2025-04-18T16:08:33.219Z line:166 uuid:bb4b5735
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:167 uuid:92ff69ce
        showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:168 uuid:6549725b
        break; // 6084808|2025-04-18T16:08:33.219Z line:169 uuid:6c47da73
      case '6': // 6084808|2025-04-18T16:08:33.219Z line:170 uuid:04637ca1
        saveConfig(); // 6084808|2025-04-18T16:08:33.219Z line:171 uuid:811e846f
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:172 uuid:e94fd404
        processDirectory(process.cwd()); // 6084808|2025-04-18T16:08:33.219Z line:173 uuid:f233de3c
        break; // 6084808|2025-04-18T16:08:33.219Z line:174 uuid:26571530
      case '7': // 6084808|2025-04-18T16:08:33.219Z line:175 uuid:e21ed0c7
        console.log('Exiting without changes.'); // 6084808|2025-04-18T16:08:33.219Z line:176 uuid:87a8e059
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:177 uuid:db683f87
        break; // 6084808|2025-04-18T16:08:33.219Z line:178 uuid:3cd37567
      default: // 6084808|2025-04-18T16:08:33.219Z line:179 uuid:f902d14e
        console.log('Invalid option. Please try again.'); // 6084808|2025-04-18T16:08:33.219Z line:180 uuid:ae2676f8
        rl.close(); // 6084808|2025-04-18T16:08:33.219Z line:181 uuid:b3757be2
        showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:182 uuid:4f7d2c15
    } // 6084808|2025-04-18T16:08:33.219Z line:183 uuid:1923e1d8
  }); // 6084808|2025-04-18T16:08:33.219Z line:184 uuid:515b5152
} // 6084808|2025-04-18T16:08:33.219Z line:185 uuid:aaf10501
// 6084808|2025-04-18T16:08:33.219Z line:186 uuid:cedebc05
// 6084808|2025-04-18T16:08:33.219Z line:187 uuid:ba6dd4e2
function main() { // 6084808|2025-04-18T16:08:33.219Z line:188 uuid:e363a501
  loadConfig(); // 6084808|2025-04-18T16:08:33.219Z line:189 uuid:c460bbc5
// 6084808|2025-04-18T16:08:33.219Z line:190 uuid:42b302b0
  if (process.argv.length > 2 && process.argv[2] === '--run') { // 6084808|2025-04-18T16:08:33.219Z line:191 uuid:dc2bac78
// 6084808|2025-04-18T16:08:33.219Z line:192 uuid:e58bbc86
    processDirectory(process.cwd()); // 6084808|2025-04-18T16:08:33.219Z line:193 uuid:6abf909f
  } else { // 6084808|2025-04-18T16:08:33.219Z line:194 uuid:2e4660a5
// 6084808|2025-04-18T16:08:33.219Z line:195 uuid:c9935ca7
    showMenu(); // 6084808|2025-04-18T16:08:33.219Z line:196 uuid:af206efa
  } // 6084808|2025-04-18T16:08:33.219Z line:197 uuid:d6ed796e
} // 6084808|2025-04-18T16:08:33.219Z line:198 uuid:779c4c04
// 6084808|2025-04-18T16:08:33.219Z line:199 uuid:16fc9a19
main(); // 6084808|2025-04-18T16:08:33.219Z line:200 uuid:4997eba0
// 6084808|2025-04-18T16:08:33.219Z line:201 uuid:6be6f184