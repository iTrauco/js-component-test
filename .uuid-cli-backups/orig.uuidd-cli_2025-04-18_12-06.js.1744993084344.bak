// time:2025-04-18T16:17:35.555Z line:1 uuid:fddfddc2
// time:2025-04-18T16:17:35.555Z line:2 uuid:5baa1568
// time:2025-04-18T16:17:35.555Z line:3 uuid:5d9303ab
// time:2025-04-18T16:17:35.555Z line:4 uuid:0e0c6833
// time:2025-04-18T16:17:35.555Z line:5 uuid:5f285458
#!/usr/bin/env node // time:2025-04-18T16:17:35.555Z line:6 uuid:6debc680
const fs = require('fs'); // time:2025-04-18T16:17:35.555Z line:7 uuid:fe5e8835
const path = require('path'); // time:2025-04-18T16:17:35.555Z line:8 uuid:8053530a
const crypto = require('crypto'); // time:2025-04-18T16:17:35.555Z line:9 uuid:87c6e537
const { execSync } = require('child_process'); // time:2025-04-18T16:17:35.555Z line:10 uuid:6e5216df
const readline = require('readline'); // time:2025-04-18T16:17:35.555Z line:11 uuid:99ad5e37
// time:2025-04-18T16:17:35.555Z line:12 uuid:774fef22
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:17:35.555Z line:13 uuid:b4324eb8
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:17:35.555Z line:14 uuid:ea6a28ee
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // time:2025-04-18T16:17:35.555Z line:15 uuid:71798640
// time:2025-04-18T16:17:35.555Z line:16 uuid:d39335cc
// time:2025-04-18T16:17:35.555Z line:17 uuid:5a8cd51b
let config = { // time:2025-04-18T16:17:35.555Z line:18 uuid:3d0562a3
  includeBranch: true, // time:2025-04-18T16:17:35.555Z line:19 uuid:a833d369
  includeCommit: true, // time:2025-04-18T16:17:35.555Z line:20 uuid:8b6fe4a1
  includeTimestamp: true, // time:2025-04-18T16:17:35.555Z line:21 uuid:7c6b0364
  includeLineNumber: true // time:2025-04-18T16:17:35.555Z line:22 uuid:ee64aa90
}; // time:2025-04-18T16:17:35.555Z line:23 uuid:aaf3bbeb
// time:2025-04-18T16:17:35.555Z line:24 uuid:d6eb2bad
function generateShortUUID() { // time:2025-04-18T16:17:35.555Z line:25 uuid:e330502c
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:17:35.555Z line:26 uuid:ead0e026
} // time:2025-04-18T16:17:35.555Z line:27 uuid:145a817b
// time:2025-04-18T16:17:35.555Z line:28 uuid:d331eda2
function getGitInfo() { // time:2025-04-18T16:17:35.555Z line:29 uuid:8e6bd01d
  try { // time:2025-04-18T16:17:35.555Z line:30 uuid:4d7a2b1e
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:17:35.555Z line:31 uuid:99c73445
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.555Z line:32 uuid:0ea148a1
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.555Z line:33 uuid:387f53ca
    return { branch, lastCommit }; // time:2025-04-18T16:17:35.555Z line:34 uuid:47b6fb4d
  } catch { // time:2025-04-18T16:17:35.555Z line:35 uuid:7a59e109
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:17:35.555Z line:36 uuid:fedae1ea
  } // time:2025-04-18T16:17:35.555Z line:37 uuid:8247a598
} // time:2025-04-18T16:17:35.555Z line:38 uuid:1f1f6747
// time:2025-04-18T16:17:35.555Z line:39 uuid:f5a9a1af
function loadConfig() { // time:2025-04-18T16:17:35.555Z line:40 uuid:ab91d0a1
  try { // time:2025-04-18T16:17:35.555Z line:41 uuid:36551e6d
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:17:35.555Z line:42 uuid:b6f9edf0
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // time:2025-04-18T16:17:35.555Z line:43 uuid:104a33da
      console.log('Loaded configuration:', config); // time:2025-04-18T16:17:35.555Z line:44 uuid:7f6699cf
    } // time:2025-04-18T16:17:35.555Z line:45 uuid:a808ba51
  } catch (error) { // time:2025-04-18T16:17:35.555Z line:46 uuid:eaa01a26
    console.error('Error loading config:', error.message); // time:2025-04-18T16:17:35.555Z line:47 uuid:97f7e6e6
  } // time:2025-04-18T16:17:35.555Z line:48 uuid:881395f5
} // time:2025-04-18T16:17:35.555Z line:49 uuid:f924bc6c
// time:2025-04-18T16:17:35.555Z line:50 uuid:35e1ec51
function saveConfig() { // time:2025-04-18T16:17:35.555Z line:51 uuid:2b639dd7
  try { // time:2025-04-18T16:17:35.555Z line:52 uuid:f823ed28
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // time:2025-04-18T16:17:35.555Z line:53 uuid:f0913de8
    console.log('Configuration saved.'); // time:2025-04-18T16:17:35.555Z line:54 uuid:7e604fd6
  } catch (error) { // time:2025-04-18T16:17:35.555Z line:55 uuid:63147b44
    console.error('Error saving config:', error.message); // time:2025-04-18T16:17:35.555Z line:56 uuid:a357d7e9
  } // time:2025-04-18T16:17:35.555Z line:57 uuid:5fcb1b3c
} // time:2025-04-18T16:17:35.555Z line:58 uuid:a7077d1e
// time:2025-04-18T16:17:35.555Z line:59 uuid:a106895e
function addUUIDsToFile(filePath) { // time:2025-04-18T16:17:35.555Z line:60 uuid:abfe7854
  try { // time:2025-04-18T16:17:35.555Z line:61 uuid:c3f92e33
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:17:35.555Z line:62 uuid:6acc24ea
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:17:35.555Z line:63 uuid:3781d438
      return; // time:2025-04-18T16:17:35.555Z line:64 uuid:43ada26e
    } // time:2025-04-18T16:17:35.555Z line:65 uuid:77107f1b
// time:2025-04-18T16:17:35.555Z line:66 uuid:6461d201
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:17:35.555Z line:67 uuid:0a5f7f43
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:17:35.555Z line:68 uuid:32ba2803
// time:2025-04-18T16:17:35.555Z line:69 uuid:33a5df8d
// time:2025-04-18T16:17:35.555Z line:70 uuid:2fbe4953
    let metaParts = []; // time:2025-04-18T16:17:35.555Z line:71 uuid:766e2a5e
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:17:35.555Z line:72 uuid:9e5da26b
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:17:35.555Z line:73 uuid:7a6d12bc
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:17:35.555Z line:74 uuid:0422a8aa
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:17:35.555Z line:75 uuid:5d960210
// time:2025-04-18T16:17:35.555Z line:76 uuid:ed43d8ae
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.555Z line:77 uuid:28826a12
    const lines = content.split('\n'); // time:2025-04-18T16:17:35.555Z line:78 uuid:affeefe7
// time:2025-04-18T16:17:35.555Z line:79 uuid:39c1bed1
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:17:35.555Z line:80 uuid:8e7c082a
      const lineNumber = index + 1; // time:2025-04-18T16:17:35.555Z line:81 uuid:50bf4030
      let cleanLine = line; // time:2025-04-18T16:17:35.555Z line:82 uuid:2d5f9517
// time:2025-04-18T16:17:35.555Z line:83 uuid:00487564
      if (line.includes(' // time:2025-04-18T16:17:35.555Z line:84 uuid:221b0a47
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:17:35.555Z line:85 uuid:5025f902
      } // time:2025-04-18T16:17:35.555Z line:86 uuid:b3344a59
// time:2025-04-18T16:17:35.555Z line:87 uuid:7ee8667a
      let comment = ' // time:2025-04-18T16:17:35.555Z line:88 uuid:afb47199
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:17:35.555Z line:89 uuid:76a113b0
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:17:35.555Z line:90 uuid:883ce432
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:17:35.555Z line:91 uuid:9f497179
// time:2025-04-18T16:17:35.555Z line:92 uuid:fb2774d2
      if (cleanLine.trim() === '') { // time:2025-04-18T16:17:35.555Z line:93 uuid:f0d604b8
        return comment.trim(); // time:2025-04-18T16:17:35.555Z line:94 uuid:354e9659
      } // time:2025-04-18T16:17:35.555Z line:95 uuid:64d475d2
// time:2025-04-18T16:17:35.555Z line:96 uuid:d4fdf1ea
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:17:35.555Z line:97 uuid:7e6eb615
    }); // time:2025-04-18T16:17:35.555Z line:98 uuid:58f30375
// time:2025-04-18T16:17:35.555Z line:99 uuid:de4d304b
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:17:35.555Z line:100 uuid:b2f3c2a1
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:17:35.555Z line:101 uuid:cfdf5e08
  } catch (error) { // time:2025-04-18T16:17:35.555Z line:102 uuid:e6bf4e82
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.555Z line:103 uuid:075d9384
  } // time:2025-04-18T16:17:35.555Z line:104 uuid:05863565
} // time:2025-04-18T16:17:35.555Z line:105 uuid:b1eac293
// time:2025-04-18T16:17:35.555Z line:106 uuid:bc06c54c
function processDirectory(dirPath) { // time:2025-04-18T16:17:35.555Z line:107 uuid:2b73e4fd
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:17:35.555Z line:108 uuid:c63a74a3
// time:2025-04-18T16:17:35.555Z line:109 uuid:54cbd4f5
  for (const entry of entries) { // time:2025-04-18T16:17:35.555Z line:110 uuid:d48efbba
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:17:35.555Z line:111 uuid:9f89142b
// time:2025-04-18T16:17:35.555Z line:112 uuid:b2d048e3
    if (entry.isDirectory()) { // time:2025-04-18T16:17:35.555Z line:113 uuid:a00a84e2
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:17:35.555Z line:114 uuid:2e70b660
        processDirectory(fullPath); // time:2025-04-18T16:17:35.555Z line:115 uuid:58f06e2f
      } // time:2025-04-18T16:17:35.555Z line:116 uuid:a12b586f
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:17:35.555Z line:117 uuid:5739b74e
      addUUIDsToFile(fullPath); // time:2025-04-18T16:17:35.555Z line:118 uuid:ff99cbee
    } // time:2025-04-18T16:17:35.555Z line:119 uuid:75708e2b
  } // time:2025-04-18T16:17:35.555Z line:120 uuid:39cbd9a3
} // time:2025-04-18T16:17:35.555Z line:121 uuid:2b10f8af
// time:2025-04-18T16:17:35.555Z line:122 uuid:108e15e1
function showMenu() { // time:2025-04-18T16:17:35.555Z line:123 uuid:1d41ea2a
  const rl = readline.createInterface({ // time:2025-04-18T16:17:35.555Z line:124 uuid:936c48a1
    input: process.stdin, // time:2025-04-18T16:17:35.555Z line:125 uuid:435c483d
    output: process.stdout // time:2025-04-18T16:17:35.555Z line:126 uuid:d946bb1b
  }); // time:2025-04-18T16:17:35.555Z line:127 uuid:7dfe087b
// time:2025-04-18T16:17:35.555Z line:128 uuid:7600090b
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:17:35.555Z line:129 uuid:dd699fcd
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.555Z line:130 uuid:a2da8bec
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.555Z line:131 uuid:d727e357
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.555Z line:132 uuid:39c6bf2a
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.555Z line:133 uuid:7e70b796
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:17:35.555Z line:134 uuid:a842a195
  console.log('6. Save and Run'); // time:2025-04-18T16:17:35.555Z line:135 uuid:2ba6f512
  console.log('7. Exit'); // time:2025-04-18T16:17:35.555Z line:136 uuid:edcb9f85
// time:2025-04-18T16:17:35.555Z line:137 uuid:b14890de
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:17:35.555Z line:138 uuid:fb6d0e17
    switch(answer) { // time:2025-04-18T16:17:35.555Z line:139 uuid:2dd6dc4a
      case '1': // time:2025-04-18T16:17:35.555Z line:140 uuid:3351e53e
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:17:35.555Z line:141 uuid:2f2987e3
        rl.close(); // time:2025-04-18T16:17:35.555Z line:142 uuid:2e61e49e
        showMenu(); // time:2025-04-18T16:17:35.555Z line:143 uuid:7e53851f
        break; // time:2025-04-18T16:17:35.555Z line:144 uuid:02c7f103
      case '2': // time:2025-04-18T16:17:35.555Z line:145 uuid:c8f33b7d
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:17:35.555Z line:146 uuid:196fcc1a
        rl.close(); // time:2025-04-18T16:17:35.555Z line:147 uuid:a0441c3f
        showMenu(); // time:2025-04-18T16:17:35.555Z line:148 uuid:2bc3c6e1
        break; // time:2025-04-18T16:17:35.555Z line:149 uuid:5fc3c088
      case '3': // time:2025-04-18T16:17:35.555Z line:150 uuid:b78b9aa1
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:17:35.555Z line:151 uuid:47ac3343
        rl.close(); // time:2025-04-18T16:17:35.555Z line:152 uuid:081cac05
        showMenu(); // time:2025-04-18T16:17:35.555Z line:153 uuid:fcec2209
        break; // time:2025-04-18T16:17:35.555Z line:154 uuid:d23d491c
      case '4': // time:2025-04-18T16:17:35.555Z line:155 uuid:60349e3f
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:17:35.555Z line:156 uuid:de77cf90
        rl.close(); // time:2025-04-18T16:17:35.555Z line:157 uuid:bbe8f6a9
        showMenu(); // time:2025-04-18T16:17:35.555Z line:158 uuid:7c5ae795
        break; // time:2025-04-18T16:17:35.555Z line:159 uuid:67f029bf
      case '5': // time:2025-04-18T16:17:35.555Z line:160 uuid:ee26030d
        config = { // time:2025-04-18T16:17:35.555Z line:161 uuid:847a95d3
          includeBranch: true, // time:2025-04-18T16:17:35.555Z line:162 uuid:75961e1e
          includeCommit: true, // time:2025-04-18T16:17:35.555Z line:163 uuid:a67d6100
          includeTimestamp: true, // time:2025-04-18T16:17:35.555Z line:164 uuid:60f20bb8
          includeLineNumber: true // time:2025-04-18T16:17:35.555Z line:165 uuid:55a1e953
        }; // time:2025-04-18T16:17:35.555Z line:166 uuid:2c90c486
        rl.close(); // time:2025-04-18T16:17:35.555Z line:167 uuid:7664790f
        showMenu(); // time:2025-04-18T16:17:35.555Z line:168 uuid:61a86915
        break; // time:2025-04-18T16:17:35.555Z line:169 uuid:790f0929
      case '6': // time:2025-04-18T16:17:35.555Z line:170 uuid:46f36676
        saveConfig(); // time:2025-04-18T16:17:35.555Z line:171 uuid:f2a93e42
        rl.close(); // time:2025-04-18T16:17:35.555Z line:172 uuid:029592bf
        processDirectory(process.cwd()); // time:2025-04-18T16:17:35.555Z line:173 uuid:df6be728
        break; // time:2025-04-18T16:17:35.555Z line:174 uuid:4ae4c6d3
      case '7': // time:2025-04-18T16:17:35.555Z line:175 uuid:5d49fccc
        console.log('Exiting without changes.'); // time:2025-04-18T16:17:35.555Z line:176 uuid:b68e22e8
        rl.close(); // time:2025-04-18T16:17:35.555Z line:177 uuid:212c2023
        break; // time:2025-04-18T16:17:35.555Z line:178 uuid:e741a87e
      default: // time:2025-04-18T16:17:35.555Z line:179 uuid:b1ba8063
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:17:35.555Z line:180 uuid:6f259dc6
        rl.close(); // time:2025-04-18T16:17:35.555Z line:181 uuid:3e595b5e
        showMenu(); // time:2025-04-18T16:17:35.555Z line:182 uuid:05e2d179
    } // time:2025-04-18T16:17:35.555Z line:183 uuid:e57af330
  }); // time:2025-04-18T16:17:35.555Z line:184 uuid:1783e567
} // time:2025-04-18T16:17:35.555Z line:185 uuid:42541689
// time:2025-04-18T16:17:35.555Z line:186 uuid:288a60ab
// time:2025-04-18T16:17:35.555Z line:187 uuid:7a7535ee
function main() { // time:2025-04-18T16:17:35.555Z line:188 uuid:e532c2d3
  loadConfig(); // time:2025-04-18T16:17:35.555Z line:189 uuid:74ed7d8a
// time:2025-04-18T16:17:35.555Z line:190 uuid:6053d8c5
  if (process.argv.length > 2 && process.argv[2] === '--run') { // time:2025-04-18T16:17:35.555Z line:191 uuid:13af4b8e
// time:2025-04-18T16:17:35.555Z line:192 uuid:c5a63bc8
    processDirectory(process.cwd()); // time:2025-04-18T16:17:35.555Z line:193 uuid:9c3159e5
  } else { // time:2025-04-18T16:17:35.555Z line:194 uuid:9cd1ccda
// time:2025-04-18T16:17:35.555Z line:195 uuid:2a4771ab
    showMenu(); // time:2025-04-18T16:17:35.555Z line:196 uuid:b493f6e1
  } // time:2025-04-18T16:17:35.555Z line:197 uuid:bc6bbf37
} // time:2025-04-18T16:17:35.555Z line:198 uuid:1a39a13e
// time:2025-04-18T16:17:35.555Z line:199 uuid:1a2b115b
main(); // time:2025-04-18T16:17:35.555Z line:200 uuid:f076595f
// time:2025-04-18T16:17:35.555Z line:201 uuid:4c6e8ec4