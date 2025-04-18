// time:2025-04-18T16:18:04.362Z line:1 uuid:ba4589e7
// time:2025-04-18T16:18:04.362Z line:2 uuid:7200cdb1
// time:2025-04-18T16:18:04.362Z line:3 uuid:ba18cbab
// time:2025-04-18T16:18:04.362Z line:4 uuid:15722dd9
// time:2025-04-18T16:18:04.362Z line:5 uuid:3ad6da4e
#!/usr/bin/env node // time:2025-04-18T16:18:04.362Z line:6 uuid:61a3d7e7
const fs = require('fs'); // time:2025-04-18T16:18:04.362Z line:7 uuid:f682a168
const path = require('path'); // time:2025-04-18T16:18:04.362Z line:8 uuid:dbf10369
const crypto = require('crypto'); // time:2025-04-18T16:18:04.362Z line:9 uuid:664cfa75
const { execSync } = require('child_process'); // time:2025-04-18T16:18:04.362Z line:10 uuid:754ab715
const readline = require('readline'); // time:2025-04-18T16:18:04.362Z line:11 uuid:529ec368
// time:2025-04-18T16:18:04.362Z line:12 uuid:7b2108b7
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:18:04.362Z line:13 uuid:c1911862
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:18:04.362Z line:14 uuid:56530ce0
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // time:2025-04-18T16:18:04.362Z line:15 uuid:40185096
// time:2025-04-18T16:18:04.362Z line:16 uuid:eea326fb
// time:2025-04-18T16:18:04.362Z line:17 uuid:c7e434e7
let config = { // time:2025-04-18T16:18:04.362Z line:18 uuid:9474676a
  includeBranch: true, // time:2025-04-18T16:18:04.362Z line:19 uuid:65d23b9c
  includeCommit: true, // time:2025-04-18T16:18:04.362Z line:20 uuid:5a334e7c
  includeTimestamp: true, // time:2025-04-18T16:18:04.362Z line:21 uuid:939b9df4
  includeLineNumber: true // time:2025-04-18T16:18:04.362Z line:22 uuid:243ae576
}; // time:2025-04-18T16:18:04.362Z line:23 uuid:82f9b68e
// time:2025-04-18T16:18:04.362Z line:24 uuid:f0e53214
function generateShortUUID() { // time:2025-04-18T16:18:04.362Z line:25 uuid:516ba172
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:18:04.362Z line:26 uuid:9896ee6e
} // time:2025-04-18T16:18:04.362Z line:27 uuid:891ce17b
// time:2025-04-18T16:18:04.362Z line:28 uuid:bd668965
function getGitInfo() { // time:2025-04-18T16:18:04.362Z line:29 uuid:0d8f5d95
  try { // time:2025-04-18T16:18:04.362Z line:30 uuid:b6d87784
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:18:04.362Z line:31 uuid:89d600cc
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.362Z line:32 uuid:95f1dc32
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.362Z line:33 uuid:188f911a
    return { branch, lastCommit }; // time:2025-04-18T16:18:04.362Z line:34 uuid:96dfbc61
  } catch { // time:2025-04-18T16:18:04.362Z line:35 uuid:ddab28e6
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:18:04.362Z line:36 uuid:0b962ce1
  } // time:2025-04-18T16:18:04.362Z line:37 uuid:5b105b9a
} // time:2025-04-18T16:18:04.362Z line:38 uuid:930d0d38
// time:2025-04-18T16:18:04.362Z line:39 uuid:003d5c13
function loadConfig() { // time:2025-04-18T16:18:04.362Z line:40 uuid:f58bac30
  try { // time:2025-04-18T16:18:04.362Z line:41 uuid:e7ddf7eb
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:18:04.362Z line:42 uuid:cba8270c
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // time:2025-04-18T16:18:04.362Z line:43 uuid:bbabf54d
      console.log('Loaded configuration:', config); // time:2025-04-18T16:18:04.362Z line:44 uuid:dee72f69
    } // time:2025-04-18T16:18:04.362Z line:45 uuid:dd4c719f
  } catch (error) { // time:2025-04-18T16:18:04.362Z line:46 uuid:787ccb11
    console.error('Error loading config:', error.message); // time:2025-04-18T16:18:04.362Z line:47 uuid:626e90ff
  } // time:2025-04-18T16:18:04.362Z line:48 uuid:13de1902
} // time:2025-04-18T16:18:04.362Z line:49 uuid:5465e698
// time:2025-04-18T16:18:04.362Z line:50 uuid:7ca34537
function saveConfig() { // time:2025-04-18T16:18:04.362Z line:51 uuid:a40cd208
  try { // time:2025-04-18T16:18:04.362Z line:52 uuid:feec9ddf
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // time:2025-04-18T16:18:04.362Z line:53 uuid:6019709c
    console.log('Configuration saved.'); // time:2025-04-18T16:18:04.362Z line:54 uuid:693e17ab
  } catch (error) { // time:2025-04-18T16:18:04.362Z line:55 uuid:29772777
    console.error('Error saving config:', error.message); // time:2025-04-18T16:18:04.362Z line:56 uuid:d61ce85e
  } // time:2025-04-18T16:18:04.362Z line:57 uuid:e69741e4
} // time:2025-04-18T16:18:04.362Z line:58 uuid:d58b5acf
// time:2025-04-18T16:18:04.362Z line:59 uuid:85564a8f
function addUUIDsToFile(filePath) { // time:2025-04-18T16:18:04.362Z line:60 uuid:ea07cd37
  try { // time:2025-04-18T16:18:04.362Z line:61 uuid:ba51c50e
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:18:04.362Z line:62 uuid:29acea57
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:18:04.362Z line:63 uuid:5535c285
      return; // time:2025-04-18T16:18:04.362Z line:64 uuid:9aba4b34
    } // time:2025-04-18T16:18:04.362Z line:65 uuid:1cf86636
// time:2025-04-18T16:18:04.362Z line:66 uuid:e28cb039
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:18:04.362Z line:67 uuid:77d01dc7
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:18:04.362Z line:68 uuid:3dafccbd
// time:2025-04-18T16:18:04.362Z line:69 uuid:21dd8c3e
// time:2025-04-18T16:18:04.362Z line:70 uuid:3975b736
    let metaParts = []; // time:2025-04-18T16:18:04.362Z line:71 uuid:45894a40
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:18:04.362Z line:72 uuid:8ca8d2da
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:18:04.362Z line:73 uuid:f3db7569
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:18:04.362Z line:74 uuid:d54a8924
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:18:04.362Z line:75 uuid:7ceadb78
// time:2025-04-18T16:18:04.362Z line:76 uuid:76ddb890
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.362Z line:77 uuid:8b407896
    const lines = content.split('\n'); // time:2025-04-18T16:18:04.362Z line:78 uuid:bce07f2d
// time:2025-04-18T16:18:04.362Z line:79 uuid:13c14e3e
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:18:04.362Z line:80 uuid:34fb9fe5
      const lineNumber = index + 1; // time:2025-04-18T16:18:04.362Z line:81 uuid:4a303e1e
      let cleanLine = line; // time:2025-04-18T16:18:04.362Z line:82 uuid:3d668b69
// time:2025-04-18T16:18:04.362Z line:83 uuid:ced1f5ec
      if (line.includes(' // time:2025-04-18T16:18:04.362Z line:84 uuid:21176f0b
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:18:04.362Z line:85 uuid:e829c646
      } // time:2025-04-18T16:18:04.362Z line:86 uuid:0281820f
// time:2025-04-18T16:18:04.362Z line:87 uuid:a9292be2
      let comment = ' // time:2025-04-18T16:18:04.362Z line:88 uuid:dbbfb4d8
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:18:04.362Z line:89 uuid:f67f8528
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:18:04.362Z line:90 uuid:56fdebc2
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:18:04.362Z line:91 uuid:82d356cd
// time:2025-04-18T16:18:04.362Z line:92 uuid:d1fa4687
      if (cleanLine.trim() === '') { // time:2025-04-18T16:18:04.362Z line:93 uuid:7d1886b4
        return comment.trim(); // time:2025-04-18T16:18:04.362Z line:94 uuid:8f514c7c
      } // time:2025-04-18T16:18:04.362Z line:95 uuid:8dd08807
// time:2025-04-18T16:18:04.362Z line:96 uuid:b042bab4
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:18:04.362Z line:97 uuid:ede88a8a
    }); // time:2025-04-18T16:18:04.362Z line:98 uuid:9d3b72dd
// time:2025-04-18T16:18:04.362Z line:99 uuid:cf576920
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:18:04.362Z line:100 uuid:09997573
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:18:04.362Z line:101 uuid:5febe7dd
  } catch (error) { // time:2025-04-18T16:18:04.362Z line:102 uuid:72b835a4
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.362Z line:103 uuid:3a4c3a80
  } // time:2025-04-18T16:18:04.362Z line:104 uuid:9073d62f
} // time:2025-04-18T16:18:04.362Z line:105 uuid:a1ebfcb2
// time:2025-04-18T16:18:04.362Z line:106 uuid:2ad7d6b1
function processDirectory(dirPath) { // time:2025-04-18T16:18:04.362Z line:107 uuid:7ea82c8d
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:18:04.362Z line:108 uuid:98304d64
// time:2025-04-18T16:18:04.362Z line:109 uuid:72b7acf9
  for (const entry of entries) { // time:2025-04-18T16:18:04.362Z line:110 uuid:52f90ccc
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:18:04.362Z line:111 uuid:5dcbf454
// time:2025-04-18T16:18:04.362Z line:112 uuid:638b0fd5
    if (entry.isDirectory()) { // time:2025-04-18T16:18:04.362Z line:113 uuid:f8c3eb5d
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:18:04.362Z line:114 uuid:641e4d92
        processDirectory(fullPath); // time:2025-04-18T16:18:04.362Z line:115 uuid:d251dabb
      } // time:2025-04-18T16:18:04.362Z line:116 uuid:8a561326
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:18:04.362Z line:117 uuid:adba3baa
      addUUIDsToFile(fullPath); // time:2025-04-18T16:18:04.362Z line:118 uuid:58093a46
    } // time:2025-04-18T16:18:04.362Z line:119 uuid:ccf65411
  } // time:2025-04-18T16:18:04.362Z line:120 uuid:cbd2b795
} // time:2025-04-18T16:18:04.362Z line:121 uuid:5f263d5d
// time:2025-04-18T16:18:04.362Z line:122 uuid:bdf7bec5
function showMenu() { // time:2025-04-18T16:18:04.362Z line:123 uuid:f2798512
  const rl = readline.createInterface({ // time:2025-04-18T16:18:04.362Z line:124 uuid:70057af6
    input: process.stdin, // time:2025-04-18T16:18:04.362Z line:125 uuid:5000e9aa
    output: process.stdout // time:2025-04-18T16:18:04.362Z line:126 uuid:697fadf7
  }); // time:2025-04-18T16:18:04.362Z line:127 uuid:c07dca64
// time:2025-04-18T16:18:04.362Z line:128 uuid:de5a2b96
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:18:04.362Z line:129 uuid:6e54204c
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.362Z line:130 uuid:6934b137
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.362Z line:131 uuid:5ed750b1
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.362Z line:132 uuid:9429bda3
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.362Z line:133 uuid:94cfb79c
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:18:04.362Z line:134 uuid:224e5978
  console.log('6. Save and Run'); // time:2025-04-18T16:18:04.362Z line:135 uuid:ceeb4562
  console.log('7. Exit'); // time:2025-04-18T16:18:04.362Z line:136 uuid:388966e8
// time:2025-04-18T16:18:04.362Z line:137 uuid:e691b085
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:18:04.362Z line:138 uuid:bd1107af
    switch(answer) { // time:2025-04-18T16:18:04.362Z line:139 uuid:bd72203b
      case '1': // time:2025-04-18T16:18:04.362Z line:140 uuid:3562066c
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:18:04.362Z line:141 uuid:da003ca2
        rl.close(); // time:2025-04-18T16:18:04.362Z line:142 uuid:544dc241
        showMenu(); // time:2025-04-18T16:18:04.362Z line:143 uuid:3753912e
        break; // time:2025-04-18T16:18:04.362Z line:144 uuid:b037e2e4
      case '2': // time:2025-04-18T16:18:04.362Z line:145 uuid:73e5524f
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:18:04.362Z line:146 uuid:d9bde0dd
        rl.close(); // time:2025-04-18T16:18:04.362Z line:147 uuid:d540a02d
        showMenu(); // time:2025-04-18T16:18:04.362Z line:148 uuid:318f214d
        break; // time:2025-04-18T16:18:04.362Z line:149 uuid:6b6fb7f1
      case '3': // time:2025-04-18T16:18:04.362Z line:150 uuid:b0291e6d
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:18:04.362Z line:151 uuid:ca0b8fc5
        rl.close(); // time:2025-04-18T16:18:04.362Z line:152 uuid:f561c115
        showMenu(); // time:2025-04-18T16:18:04.362Z line:153 uuid:e57fab68
        break; // time:2025-04-18T16:18:04.362Z line:154 uuid:8853a337
      case '4': // time:2025-04-18T16:18:04.362Z line:155 uuid:aa2760a0
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:18:04.362Z line:156 uuid:e3bf8069
        rl.close(); // time:2025-04-18T16:18:04.362Z line:157 uuid:d268a890
        showMenu(); // time:2025-04-18T16:18:04.362Z line:158 uuid:f57cb08b
        break; // time:2025-04-18T16:18:04.362Z line:159 uuid:e9529207
      case '5': // time:2025-04-18T16:18:04.362Z line:160 uuid:4d18f41e
        config = { // time:2025-04-18T16:18:04.362Z line:161 uuid:561d5123
          includeBranch: true, // time:2025-04-18T16:18:04.362Z line:162 uuid:202da7e0
          includeCommit: true, // time:2025-04-18T16:18:04.362Z line:163 uuid:81eed9ba
          includeTimestamp: true, // time:2025-04-18T16:18:04.362Z line:164 uuid:ee358611
          includeLineNumber: true // time:2025-04-18T16:18:04.362Z line:165 uuid:059fbf06
        }; // time:2025-04-18T16:18:04.362Z line:166 uuid:4f861015
        rl.close(); // time:2025-04-18T16:18:04.362Z line:167 uuid:d47f5ba5
        showMenu(); // time:2025-04-18T16:18:04.362Z line:168 uuid:177495ef
        break; // time:2025-04-18T16:18:04.362Z line:169 uuid:edc57e8b
      case '6': // time:2025-04-18T16:18:04.362Z line:170 uuid:1d6c91a0
        saveConfig(); // time:2025-04-18T16:18:04.362Z line:171 uuid:b6850cca
        rl.close(); // time:2025-04-18T16:18:04.362Z line:172 uuid:dc45367f
        processDirectory(process.cwd()); // time:2025-04-18T16:18:04.362Z line:173 uuid:6f5ab753
        break; // time:2025-04-18T16:18:04.362Z line:174 uuid:5e5addc3
      case '7': // time:2025-04-18T16:18:04.362Z line:175 uuid:cfab825d
        console.log('Exiting without changes.'); // time:2025-04-18T16:18:04.362Z line:176 uuid:de01e7dc
        rl.close(); // time:2025-04-18T16:18:04.362Z line:177 uuid:19a8045f
        break; // time:2025-04-18T16:18:04.362Z line:178 uuid:2178d34d
      default: // time:2025-04-18T16:18:04.362Z line:179 uuid:1cd1752d
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:18:04.362Z line:180 uuid:6e9cdfc9
        rl.close(); // time:2025-04-18T16:18:04.362Z line:181 uuid:3b13c677
        showMenu(); // time:2025-04-18T16:18:04.362Z line:182 uuid:361512b4
    } // time:2025-04-18T16:18:04.362Z line:183 uuid:a03a7d36
  }); // time:2025-04-18T16:18:04.362Z line:184 uuid:02180546
} // time:2025-04-18T16:18:04.362Z line:185 uuid:38ec5804
// time:2025-04-18T16:18:04.362Z line:186 uuid:64dd7296
// time:2025-04-18T16:18:04.362Z line:187 uuid:4c820d99
function main() { // time:2025-04-18T16:18:04.362Z line:188 uuid:65739e31
  loadConfig(); // time:2025-04-18T16:18:04.362Z line:189 uuid:a9bf7646
// time:2025-04-18T16:18:04.362Z line:190 uuid:481922dd
  if (process.argv.length > 2 && process.argv[2] === '--run') { // time:2025-04-18T16:18:04.362Z line:191 uuid:463c1816
// time:2025-04-18T16:18:04.362Z line:192 uuid:304c3eb6
    processDirectory(process.cwd()); // time:2025-04-18T16:18:04.362Z line:193 uuid:2de6227a
  } else { // time:2025-04-18T16:18:04.362Z line:194 uuid:89754cd9
// time:2025-04-18T16:18:04.362Z line:195 uuid:28623f7d
    showMenu(); // time:2025-04-18T16:18:04.362Z line:196 uuid:87b7c253
  } // time:2025-04-18T16:18:04.362Z line:197 uuid:636fb641
} // time:2025-04-18T16:18:04.362Z line:198 uuid:9af6b780
// time:2025-04-18T16:18:04.362Z line:199 uuid:b56bc594
main(); // time:2025-04-18T16:18:04.362Z line:200 uuid:a2e602f1
// time:2025-04-18T16:18:04.362Z line:201 uuid:47d860a0