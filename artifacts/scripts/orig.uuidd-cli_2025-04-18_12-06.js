// time:2025-04-18T16:56:37.951Z uuid:c5b049c6
// time:2025-04-18T16:56:37.951Z uuid:74d1c9f6
// time:2025-04-18T16:56:37.951Z uuid:8a3c35b8
// time:2025-04-18T16:56:37.951Z uuid:ed3552fa
// time:2025-04-18T16:56:37.951Z uuid:84cebb43
#!/usr/bin/env node // time:2025-04-18T16:56:37.951Z uuid:72034158
const fs = require('fs'); // time:2025-04-18T16:56:37.951Z uuid:408bd242
const path = require('path'); // time:2025-04-18T16:56:37.951Z uuid:006ccdfa
const crypto = require('crypto'); // time:2025-04-18T16:56:37.951Z uuid:3adf97a3
const { execSync } = require('child_process'); // time:2025-04-18T16:56:37.951Z uuid:8bafb0bb
const readline = require('readline'); // time:2025-04-18T16:56:37.951Z uuid:771a48df
// time:2025-04-18T16:56:37.951Z uuid:ad39ca46
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:56:37.951Z uuid:577e37af
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:56:37.951Z uuid:e292f619
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // time:2025-04-18T16:56:37.951Z uuid:742ba696
// time:2025-04-18T16:56:37.951Z uuid:360810a2
// time:2025-04-18T16:56:37.951Z uuid:4026c949
let config = { // time:2025-04-18T16:56:37.951Z uuid:1f17f728
  includeBranch: true, // time:2025-04-18T16:56:37.951Z uuid:3c177c08
  includeCommit: true, // time:2025-04-18T16:56:37.951Z uuid:49110fff
  includeTimestamp: true, // time:2025-04-18T16:56:37.951Z uuid:2ca07bef
  includeLineNumber: true // time:2025-04-18T16:56:37.951Z uuid:4325a802
}; // time:2025-04-18T16:56:37.951Z uuid:9259fc45
// time:2025-04-18T16:56:37.951Z uuid:0b4b6205
function generateShortUUID() { // time:2025-04-18T16:56:37.951Z uuid:f27f1c97
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:56:37.951Z uuid:e829a08d
} // time:2025-04-18T16:56:37.951Z uuid:ecaf106a
// time:2025-04-18T16:56:37.951Z uuid:7d37a374
function getGitInfo() { // time:2025-04-18T16:56:37.951Z uuid:e4814a63
  try { // time:2025-04-18T16:56:37.951Z uuid:59867fde
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:56:37.951Z uuid:f3c7fd51
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.951Z uuid:7ef3d1d7
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.951Z uuid:85e21407
    return { branch, lastCommit }; // time:2025-04-18T16:56:37.951Z uuid:dea12268
  } catch { // time:2025-04-18T16:56:37.951Z uuid:2be564fb
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:56:37.951Z uuid:b17e240c
  } // time:2025-04-18T16:56:37.951Z uuid:16bef3d9
} // time:2025-04-18T16:56:37.951Z uuid:4883738d
// time:2025-04-18T16:56:37.951Z uuid:c222cda8
function loadConfig() { // time:2025-04-18T16:56:37.951Z uuid:3cc46431
  try { // time:2025-04-18T16:56:37.951Z uuid:7504300d
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:56:37.951Z uuid:e871daf5
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // time:2025-04-18T16:56:37.951Z uuid:c898f099
      console.log('Loaded configuration:', config); // time:2025-04-18T16:56:37.951Z uuid:c548ae8b
    } // time:2025-04-18T16:56:37.951Z uuid:2cc5e987
  } catch (error) { // time:2025-04-18T16:56:37.951Z uuid:74aefed1
    console.error('Error loading config:', error.message); // time:2025-04-18T16:56:37.951Z uuid:47787310
  } // time:2025-04-18T16:56:37.951Z uuid:91222274
} // time:2025-04-18T16:56:37.951Z uuid:5b659c75
// time:2025-04-18T16:56:37.951Z uuid:82537269
function saveConfig() { // time:2025-04-18T16:56:37.951Z uuid:f6e4d1fb
  try { // time:2025-04-18T16:56:37.951Z uuid:baf04e5b
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // time:2025-04-18T16:56:37.951Z uuid:bc683cc6
    console.log('Configuration saved.'); // time:2025-04-18T16:56:37.951Z uuid:1b3d5862
  } catch (error) { // time:2025-04-18T16:56:37.951Z uuid:fd4226c1
    console.error('Error saving config:', error.message); // time:2025-04-18T16:56:37.951Z uuid:c5c500b9
  } // time:2025-04-18T16:56:37.951Z uuid:505cbc9e
} // time:2025-04-18T16:56:37.951Z uuid:14ac6f71
// time:2025-04-18T16:56:37.951Z uuid:1b1b2e3b
function addUUIDsToFile(filePath) { // time:2025-04-18T16:56:37.951Z uuid:18047692
  try { // time:2025-04-18T16:56:37.951Z uuid:d57682bf
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:56:37.951Z uuid:23c158e6
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:56:37.951Z uuid:41c92648
      return; // time:2025-04-18T16:56:37.951Z uuid:8a3414f4
    } // time:2025-04-18T16:56:37.951Z uuid:013b00b3
// time:2025-04-18T16:56:37.951Z uuid:4db6baa0
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:56:37.951Z uuid:9225d26f
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:56:37.951Z uuid:dca71227
// time:2025-04-18T16:56:37.951Z uuid:4945cd9f
// time:2025-04-18T16:56:37.951Z uuid:7f7b2680
    let metaParts = []; // time:2025-04-18T16:56:37.951Z uuid:271f8c55
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:56:37.951Z uuid:fe73a429
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:56:37.951Z uuid:090c6f70
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:56:37.951Z uuid:a8ab45c0
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:56:37.951Z uuid:759a26e5
// time:2025-04-18T16:56:37.951Z uuid:bdc606c2
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.951Z uuid:9beb3c28
    const lines = content.split('\n'); // time:2025-04-18T16:56:37.951Z uuid:cf2c3f66
// time:2025-04-18T16:56:37.951Z uuid:9c0fda5b
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:56:37.951Z uuid:eb138723
      const lineNumber = index + 1; // time:2025-04-18T16:56:37.951Z uuid:e49f69be
      let cleanLine = line; // time:2025-04-18T16:56:37.951Z uuid:4ac804ee
// time:2025-04-18T16:56:37.951Z uuid:a172e7c0
      if (line.includes(' // time:2025-04-18T16:56:37.951Z uuid:903b985a
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:56:37.951Z uuid:d546cabd
      } // time:2025-04-18T16:56:37.951Z uuid:d822a607
// time:2025-04-18T16:56:37.951Z uuid:6f195336
      let comment = ' // time:2025-04-18T16:56:37.951Z uuid:fb87bf1c
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:56:37.951Z uuid:b92f429a
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:56:37.951Z uuid:193d5ded
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:56:37.951Z uuid:c860634e
// time:2025-04-18T16:56:37.951Z uuid:6cf9b9e1
      if (cleanLine.trim() === '') { // time:2025-04-18T16:56:37.951Z uuid:56335b67
        return comment.trim(); // time:2025-04-18T16:56:37.951Z uuid:080e3104
      } // time:2025-04-18T16:56:37.951Z uuid:1f828494
// time:2025-04-18T16:56:37.951Z uuid:be8cfc66
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:56:37.951Z uuid:4c814c2a
    }); // time:2025-04-18T16:56:37.951Z uuid:65e14148
// time:2025-04-18T16:56:37.951Z uuid:74c965c8
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:56:37.951Z uuid:5bbf0597
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:56:37.951Z uuid:33d6e480
  } catch (error) { // time:2025-04-18T16:56:37.951Z uuid:390eee87
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.951Z uuid:7a57d5df
  } // time:2025-04-18T16:56:37.951Z uuid:3f993910
} // time:2025-04-18T16:56:37.951Z uuid:6705b86f
// time:2025-04-18T16:56:37.951Z uuid:d76c74a8
function processDirectory(dirPath) { // time:2025-04-18T16:56:37.951Z uuid:9269a12a
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:56:37.951Z uuid:231bea60
// time:2025-04-18T16:56:37.951Z uuid:83f26ddb
  for (const entry of entries) { // time:2025-04-18T16:56:37.951Z uuid:95fd6219
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:56:37.951Z uuid:408586e5
// time:2025-04-18T16:56:37.951Z uuid:26704344
    if (entry.isDirectory()) { // time:2025-04-18T16:56:37.951Z uuid:44319b8a
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:56:37.951Z uuid:6b150032
        processDirectory(fullPath); // time:2025-04-18T16:56:37.951Z uuid:751e294f
      } // time:2025-04-18T16:56:37.951Z uuid:76290d51
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:56:37.951Z uuid:3bc67834
      addUUIDsToFile(fullPath); // time:2025-04-18T16:56:37.951Z uuid:e41cbb38
    } // time:2025-04-18T16:56:37.951Z uuid:606ce82e
  } // time:2025-04-18T16:56:37.951Z uuid:fdb04d6e
} // time:2025-04-18T16:56:37.951Z uuid:37202002
// time:2025-04-18T16:56:37.951Z uuid:8bd049a2
function showMenu() { // time:2025-04-18T16:56:37.951Z uuid:051e818e
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.951Z uuid:7edd50d5
    input: process.stdin, // time:2025-04-18T16:56:37.951Z uuid:a2fe1d11
    output: process.stdout // time:2025-04-18T16:56:37.951Z uuid:f140ea1d
  }); // time:2025-04-18T16:56:37.951Z uuid:2f69164d
// time:2025-04-18T16:56:37.951Z uuid:20683797
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:56:37.951Z uuid:a3b40630
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.951Z uuid:257e9a51
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.951Z uuid:a74d927c
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.951Z uuid:63afca0b
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.951Z uuid:1204f48d
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:56:37.951Z uuid:e4c4b6ab
  console.log('6. Save and Run'); // time:2025-04-18T16:56:37.951Z uuid:7646bf90
  console.log('7. Exit'); // time:2025-04-18T16:56:37.951Z uuid:6fc6605d
// time:2025-04-18T16:56:37.951Z uuid:b22172ee
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.951Z uuid:314a15c6
    switch(answer) { // time:2025-04-18T16:56:37.951Z uuid:93463025
      case '1': // time:2025-04-18T16:56:37.951Z uuid:e0641aad
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:56:37.951Z uuid:673d6a7c
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:88afb677
        showMenu(); // time:2025-04-18T16:56:37.951Z uuid:1377acbb
        break; // time:2025-04-18T16:56:37.951Z uuid:1a8fdadd
      case '2': // time:2025-04-18T16:56:37.951Z uuid:13ccdff2
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:56:37.951Z uuid:51db335c
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:29146b63
        showMenu(); // time:2025-04-18T16:56:37.951Z uuid:fc3c3fb9
        break; // time:2025-04-18T16:56:37.951Z uuid:09fdf34f
      case '3': // time:2025-04-18T16:56:37.951Z uuid:73808153
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:56:37.951Z uuid:9872a626
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:e34cf37f
        showMenu(); // time:2025-04-18T16:56:37.951Z uuid:033af040
        break; // time:2025-04-18T16:56:37.951Z uuid:ba11809b
      case '4': // time:2025-04-18T16:56:37.951Z uuid:44297441
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:56:37.951Z uuid:9db9121a
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:676a78c7
        showMenu(); // time:2025-04-18T16:56:37.951Z uuid:5f7bd7e0
        break; // time:2025-04-18T16:56:37.951Z uuid:a07b9e6b
      case '5': // time:2025-04-18T16:56:37.951Z uuid:b2e3a60a
        config = { // time:2025-04-18T16:56:37.951Z uuid:48901969
          includeBranch: true, // time:2025-04-18T16:56:37.951Z uuid:2006f208
          includeCommit: true, // time:2025-04-18T16:56:37.951Z uuid:703ed8ea
          includeTimestamp: true, // time:2025-04-18T16:56:37.951Z uuid:1db84320
          includeLineNumber: true // time:2025-04-18T16:56:37.951Z uuid:da2e8249
        }; // time:2025-04-18T16:56:37.951Z uuid:5885e435
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:2245bdcb
        showMenu(); // time:2025-04-18T16:56:37.951Z uuid:c48b4a39
        break; // time:2025-04-18T16:56:37.951Z uuid:2077da4c
      case '6': // time:2025-04-18T16:56:37.951Z uuid:cce8d5a2
        saveConfig(); // time:2025-04-18T16:56:37.951Z uuid:d9ab7080
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:ee05e34c
        processDirectory(process.cwd()); // time:2025-04-18T16:56:37.951Z uuid:b50758b7
        break; // time:2025-04-18T16:56:37.951Z uuid:b3d8ecf3
      case '7': // time:2025-04-18T16:56:37.951Z uuid:5853d60b
        console.log('Exiting without changes.'); // time:2025-04-18T16:56:37.951Z uuid:ad889a98
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:89225f59
        break; // time:2025-04-18T16:56:37.951Z uuid:92ba59d7
      default: // time:2025-04-18T16:56:37.951Z uuid:6d6c7ea1
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.951Z uuid:74f4f995
        rl.close(); // time:2025-04-18T16:56:37.951Z uuid:1e5e1380
        showMenu(); // time:2025-04-18T16:56:37.951Z uuid:bd9da47d
    } // time:2025-04-18T16:56:37.951Z uuid:ea4b38cf
  }); // time:2025-04-18T16:56:37.951Z uuid:4e87326a
} // time:2025-04-18T16:56:37.951Z uuid:5abfca7b
// time:2025-04-18T16:56:37.951Z uuid:9d4162b5
// time:2025-04-18T16:56:37.951Z uuid:b3823ad6
function main() { // time:2025-04-18T16:56:37.951Z uuid:7e278a81
  loadConfig(); // time:2025-04-18T16:56:37.951Z uuid:8f2e3431
// time:2025-04-18T16:56:37.951Z uuid:97fb9b47
  if (process.argv.length > 2 && process.argv[2] === '--run') { // time:2025-04-18T16:56:37.951Z uuid:96a5b29b
// time:2025-04-18T16:56:37.951Z uuid:22ccdc4c
    processDirectory(process.cwd()); // time:2025-04-18T16:56:37.951Z uuid:0def7eb2
  } else { // time:2025-04-18T16:56:37.951Z uuid:69af90a8
// time:2025-04-18T16:56:37.951Z uuid:b2d6b630
    showMenu(); // time:2025-04-18T16:56:37.951Z uuid:436791b0
  } // time:2025-04-18T16:56:37.951Z uuid:744aac93
} // time:2025-04-18T16:56:37.951Z uuid:4b57c037
// time:2025-04-18T16:56:37.951Z uuid:41fdd060
main(); // time:2025-04-18T16:56:37.951Z uuid:17960cfc
// time:2025-04-18T16:56:37.951Z uuid:9cd840b6