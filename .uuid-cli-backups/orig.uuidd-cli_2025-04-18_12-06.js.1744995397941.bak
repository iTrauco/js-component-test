// time:2025-04-18T16:51:25.976Z uuid:dfeb7a59
// time:2025-04-18T16:51:25.976Z uuid:85ea2de1
// time:2025-04-18T16:51:25.976Z uuid:ea3e8983
// time:2025-04-18T16:51:25.976Z uuid:55dbd2ef
// time:2025-04-18T16:51:25.976Z uuid:4821c3b5
#!/usr/bin/env node // time:2025-04-18T16:51:25.976Z uuid:322ba9de
const fs = require('fs'); // time:2025-04-18T16:51:25.976Z uuid:8b4b52ac
const path = require('path'); // time:2025-04-18T16:51:25.976Z uuid:2affbee7
const crypto = require('crypto'); // time:2025-04-18T16:51:25.976Z uuid:cc632e14
const { execSync } = require('child_process'); // time:2025-04-18T16:51:25.976Z uuid:2778fe0e
const readline = require('readline'); // time:2025-04-18T16:51:25.976Z uuid:dd3fd3ed
// time:2025-04-18T16:51:25.976Z uuid:cf447ab2
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:51:25.976Z uuid:33655dac
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:51:25.976Z uuid:7b9a9b1d
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // time:2025-04-18T16:51:25.976Z uuid:4119cc6a
// time:2025-04-18T16:51:25.976Z uuid:dc0851f1
// time:2025-04-18T16:51:25.976Z uuid:f72ee034
let config = { // time:2025-04-18T16:51:25.976Z uuid:e922028c
  includeBranch: true, // time:2025-04-18T16:51:25.976Z uuid:22ac5d81
  includeCommit: true, // time:2025-04-18T16:51:25.976Z uuid:7d753ae6
  includeTimestamp: true, // time:2025-04-18T16:51:25.976Z uuid:29460de9
  includeLineNumber: true // time:2025-04-18T16:51:25.976Z uuid:2163c4bf
}; // time:2025-04-18T16:51:25.976Z uuid:1eb16128
// time:2025-04-18T16:51:25.976Z uuid:59ddf87e
function generateShortUUID() { // time:2025-04-18T16:51:25.976Z uuid:e4a9f984
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:51:25.976Z uuid:25ddb323
} // time:2025-04-18T16:51:25.976Z uuid:a26531f1
// time:2025-04-18T16:51:25.976Z uuid:85ba54e9
function getGitInfo() { // time:2025-04-18T16:51:25.976Z uuid:aa9f29c5
  try { // time:2025-04-18T16:51:25.976Z uuid:92bac15d
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:51:25.976Z uuid:87d66804
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.976Z uuid:926d7e18
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.976Z uuid:62dedb60
    return { branch, lastCommit }; // time:2025-04-18T16:51:25.976Z uuid:ea0198e6
  } catch { // time:2025-04-18T16:51:25.976Z uuid:b72265ea
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:51:25.976Z uuid:a851cd7d
  } // time:2025-04-18T16:51:25.976Z uuid:888d709a
} // time:2025-04-18T16:51:25.976Z uuid:ad869c04
// time:2025-04-18T16:51:25.976Z uuid:16f848fc
function loadConfig() { // time:2025-04-18T16:51:25.976Z uuid:1e97aef8
  try { // time:2025-04-18T16:51:25.976Z uuid:865a2776
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:51:25.976Z uuid:ba808e84
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // time:2025-04-18T16:51:25.976Z uuid:2603bead
      console.log('Loaded configuration:', config); // time:2025-04-18T16:51:25.976Z uuid:7dc767af
    } // time:2025-04-18T16:51:25.976Z uuid:aa0bc3d9
  } catch (error) { // time:2025-04-18T16:51:25.976Z uuid:3b1d2937
    console.error('Error loading config:', error.message); // time:2025-04-18T16:51:25.976Z uuid:3ee1aede
  } // time:2025-04-18T16:51:25.976Z uuid:2f7a2208
} // time:2025-04-18T16:51:25.976Z uuid:234e9996
// time:2025-04-18T16:51:25.976Z uuid:7e7c1022
function saveConfig() { // time:2025-04-18T16:51:25.976Z uuid:b8ed9459
  try { // time:2025-04-18T16:51:25.976Z uuid:5d9d9664
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // time:2025-04-18T16:51:25.976Z uuid:d1c508c8
    console.log('Configuration saved.'); // time:2025-04-18T16:51:25.976Z uuid:9bdab746
  } catch (error) { // time:2025-04-18T16:51:25.976Z uuid:13bacf94
    console.error('Error saving config:', error.message); // time:2025-04-18T16:51:25.976Z uuid:8138b516
  } // time:2025-04-18T16:51:25.976Z uuid:0a103521
} // time:2025-04-18T16:51:25.976Z uuid:93719d8f
// time:2025-04-18T16:51:25.976Z uuid:848f7bf7
function addUUIDsToFile(filePath) { // time:2025-04-18T16:51:25.976Z uuid:417332e2
  try { // time:2025-04-18T16:51:25.976Z uuid:44aae85e
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:51:25.976Z uuid:4defb891
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:51:25.976Z uuid:48369ae2
      return; // time:2025-04-18T16:51:25.976Z uuid:c5413f93
    } // time:2025-04-18T16:51:25.976Z uuid:ed7684ff
// time:2025-04-18T16:51:25.976Z uuid:41a8e66e
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:51:25.976Z uuid:837681e6
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:51:25.976Z uuid:060e0872
// time:2025-04-18T16:51:25.976Z uuid:93a2691c
// time:2025-04-18T16:51:25.976Z uuid:4d9a51ab
    let metaParts = []; // time:2025-04-18T16:51:25.976Z uuid:526cdfc5
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:51:25.976Z uuid:f21f6529
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:51:25.976Z uuid:9a1198b1
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:51:25.976Z uuid:3217411a
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:51:25.976Z uuid:c7ef3b36
// time:2025-04-18T16:51:25.976Z uuid:fd1b2386
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.976Z uuid:859b791e
    const lines = content.split('\n'); // time:2025-04-18T16:51:25.976Z uuid:323d51e6
// time:2025-04-18T16:51:25.976Z uuid:15847edf
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:51:25.976Z uuid:918a0729
      const lineNumber = index + 1; // time:2025-04-18T16:51:25.976Z uuid:fd2a0cd4
      let cleanLine = line; // time:2025-04-18T16:51:25.976Z uuid:0c355c85
// time:2025-04-18T16:51:25.976Z uuid:2bf88a9f
      if (line.includes(' // time:2025-04-18T16:51:25.976Z uuid:7ddcc953
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:51:25.976Z uuid:85e64b35
      } // time:2025-04-18T16:51:25.976Z uuid:3862928f
// time:2025-04-18T16:51:25.976Z uuid:4b0531b1
      let comment = ' // time:2025-04-18T16:51:25.976Z uuid:c1e2b427
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:51:25.976Z uuid:b8dcea19
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:51:25.976Z uuid:849fc6f3
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:51:25.976Z uuid:3a794c4a
// time:2025-04-18T16:51:25.976Z uuid:6297edd0
      if (cleanLine.trim() === '') { // time:2025-04-18T16:51:25.976Z uuid:288156f7
        return comment.trim(); // time:2025-04-18T16:51:25.976Z uuid:5885ce52
      } // time:2025-04-18T16:51:25.976Z uuid:37d59a18
// time:2025-04-18T16:51:25.976Z uuid:ae25f4c4
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:51:25.976Z uuid:dedfc411
    }); // time:2025-04-18T16:51:25.976Z uuid:fec79ac5
// time:2025-04-18T16:51:25.976Z uuid:d373ee40
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:51:25.976Z uuid:be23cacd
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:51:25.976Z uuid:3e8cc5ad
  } catch (error) { // time:2025-04-18T16:51:25.976Z uuid:17505467
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.976Z uuid:eb722d7e
  } // time:2025-04-18T16:51:25.976Z uuid:5c1f4cf3
} // time:2025-04-18T16:51:25.976Z uuid:3800fde0
// time:2025-04-18T16:51:25.976Z uuid:f81fb725
function processDirectory(dirPath) { // time:2025-04-18T16:51:25.976Z uuid:b233b25d
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:51:25.976Z uuid:7a42d375
// time:2025-04-18T16:51:25.976Z uuid:0ce8f33f
  for (const entry of entries) { // time:2025-04-18T16:51:25.976Z uuid:a9700f22
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:51:25.976Z uuid:375a52eb
// time:2025-04-18T16:51:25.976Z uuid:abbeb00d
    if (entry.isDirectory()) { // time:2025-04-18T16:51:25.976Z uuid:72466d6e
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:51:25.976Z uuid:efd51ced
        processDirectory(fullPath); // time:2025-04-18T16:51:25.976Z uuid:b90ba9a5
      } // time:2025-04-18T16:51:25.976Z uuid:dd6afa87
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:51:25.976Z uuid:d0caf141
      addUUIDsToFile(fullPath); // time:2025-04-18T16:51:25.976Z uuid:4f42c30e
    } // time:2025-04-18T16:51:25.976Z uuid:ee9c71af
  } // time:2025-04-18T16:51:25.976Z uuid:d177a866
} // time:2025-04-18T16:51:25.976Z uuid:54aa411e
// time:2025-04-18T16:51:25.976Z uuid:87cfe199
function showMenu() { // time:2025-04-18T16:51:25.976Z uuid:2cde4251
  const rl = readline.createInterface({ // time:2025-04-18T16:51:25.976Z uuid:81e5c046
    input: process.stdin, // time:2025-04-18T16:51:25.976Z uuid:0e0af947
    output: process.stdout // time:2025-04-18T16:51:25.976Z uuid:d042e39d
  }); // time:2025-04-18T16:51:25.976Z uuid:e502bee6
// time:2025-04-18T16:51:25.976Z uuid:6082e03e
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:51:25.976Z uuid:88f7b6ae
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.976Z uuid:602cff22
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.976Z uuid:e9a2379d
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.976Z uuid:9f20dd61
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.976Z uuid:7d09270d
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:51:25.976Z uuid:2ffa5ba8
  console.log('6. Save and Run'); // time:2025-04-18T16:51:25.976Z uuid:9c202230
  console.log('7. Exit'); // time:2025-04-18T16:51:25.976Z uuid:69ed76c0
// time:2025-04-18T16:51:25.976Z uuid:7056d600
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:51:25.976Z uuid:9f9551c2
    switch(answer) { // time:2025-04-18T16:51:25.976Z uuid:94da26f7
      case '1': // time:2025-04-18T16:51:25.976Z uuid:f9b798fb
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:51:25.976Z uuid:9a1558d0
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:c7badb28
        showMenu(); // time:2025-04-18T16:51:25.976Z uuid:b4c54ce9
        break; // time:2025-04-18T16:51:25.976Z uuid:e88201b4
      case '2': // time:2025-04-18T16:51:25.976Z uuid:5179b4a8
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:51:25.976Z uuid:a3a3f70d
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:61c5b9e9
        showMenu(); // time:2025-04-18T16:51:25.976Z uuid:0a2528a1
        break; // time:2025-04-18T16:51:25.976Z uuid:bd94044e
      case '3': // time:2025-04-18T16:51:25.976Z uuid:6b35abee
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:51:25.976Z uuid:75cff997
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:30bf47b6
        showMenu(); // time:2025-04-18T16:51:25.976Z uuid:84b9d01b
        break; // time:2025-04-18T16:51:25.976Z uuid:0aa8b0cf
      case '4': // time:2025-04-18T16:51:25.976Z uuid:628a9cd7
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:51:25.976Z uuid:0ebec272
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:f93fac33
        showMenu(); // time:2025-04-18T16:51:25.976Z uuid:4d9eda95
        break; // time:2025-04-18T16:51:25.976Z uuid:f237a236
      case '5': // time:2025-04-18T16:51:25.976Z uuid:07163504
        config = { // time:2025-04-18T16:51:25.976Z uuid:ae1beda2
          includeBranch: true, // time:2025-04-18T16:51:25.976Z uuid:c96352f5
          includeCommit: true, // time:2025-04-18T16:51:25.976Z uuid:cb01497d
          includeTimestamp: true, // time:2025-04-18T16:51:25.976Z uuid:d2a83fa4
          includeLineNumber: true // time:2025-04-18T16:51:25.976Z uuid:369c9c68
        }; // time:2025-04-18T16:51:25.976Z uuid:248fb5bb
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:42645eab
        showMenu(); // time:2025-04-18T16:51:25.976Z uuid:9514df2b
        break; // time:2025-04-18T16:51:25.976Z uuid:0c027544
      case '6': // time:2025-04-18T16:51:25.976Z uuid:6a4d1ed0
        saveConfig(); // time:2025-04-18T16:51:25.976Z uuid:92ad4d21
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:46a9bf55
        processDirectory(process.cwd()); // time:2025-04-18T16:51:25.976Z uuid:583d365e
        break; // time:2025-04-18T16:51:25.976Z uuid:20536c58
      case '7': // time:2025-04-18T16:51:25.976Z uuid:1561e00f
        console.log('Exiting without changes.'); // time:2025-04-18T16:51:25.976Z uuid:7d89e21d
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:decad2a0
        break; // time:2025-04-18T16:51:25.976Z uuid:df21ad7d
      default: // time:2025-04-18T16:51:25.976Z uuid:dbddfd79
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:51:25.976Z uuid:815f4b44
        rl.close(); // time:2025-04-18T16:51:25.976Z uuid:0c41d09a
        showMenu(); // time:2025-04-18T16:51:25.976Z uuid:176fbe93
    } // time:2025-04-18T16:51:25.976Z uuid:09c7c8e4
  }); // time:2025-04-18T16:51:25.976Z uuid:2800d849
} // time:2025-04-18T16:51:25.976Z uuid:6e265e11
// time:2025-04-18T16:51:25.976Z uuid:f272ae6b
// time:2025-04-18T16:51:25.976Z uuid:1c95acd4
function main() { // time:2025-04-18T16:51:25.976Z uuid:bf71171b
  loadConfig(); // time:2025-04-18T16:51:25.976Z uuid:71bd9ee2
// time:2025-04-18T16:51:25.976Z uuid:d269144b
  if (process.argv.length > 2 && process.argv[2] === '--run') { // time:2025-04-18T16:51:25.976Z uuid:df244766
// time:2025-04-18T16:51:25.976Z uuid:c36279de
    processDirectory(process.cwd()); // time:2025-04-18T16:51:25.976Z uuid:4fa51505
  } else { // time:2025-04-18T16:51:25.976Z uuid:43e758d1
// time:2025-04-18T16:51:25.976Z uuid:c042fa4e
    showMenu(); // time:2025-04-18T16:51:25.976Z uuid:e9450020
  } // time:2025-04-18T16:51:25.976Z uuid:c11e171b
} // time:2025-04-18T16:51:25.976Z uuid:3853b573
// time:2025-04-18T16:51:25.976Z uuid:970000da
main(); // time:2025-04-18T16:51:25.976Z uuid:6e522db0
// time:2025-04-18T16:51:25.976Z uuid:d6a58164