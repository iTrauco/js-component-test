// uuid:dcfaa724
// uuid:9a586bc6
// uuid:30d79b1c
// uuid:1683125f
// uuid:cefe3662
#!/usr/bin/env node // uuid:57c9be9a
const fs = require('fs'); // uuid:26bdf837
const path = require('path'); // uuid:f6f94964
const crypto = require('crypto'); // uuid:1d8c4bd6
const { execSync } = require('child_process'); // uuid:276b4fa0
const readline = require('readline'); // uuid:d36374b5
// uuid:03b64eca
const CONFIG_FILE = '.uuid-cli-config.json'; // uuid:9696e012
const SCRIPT_FILENAME = path.basename(__filename); // uuid:d7d65b63
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // uuid:9d6435d1
// uuid:e7d92e20
// uuid:22afae9b
let config = { // uuid:e503b1c8
  includeBranch: true, // uuid:e695b2ab
  includeCommit: true, // uuid:5971227f
  includeTimestamp: true, // uuid:23a5114e
  includeLineNumber: true // uuid:595f3cde
}; // uuid:4cb3e4f0
// uuid:97ab0927
function generateShortUUID() { // uuid:d7b63b2b
  return crypto.randomBytes(4).toString('hex'); // uuid:b566e2a6
} // uuid:78cda866
// uuid:4834af8a
function getGitInfo() { // uuid:01596497
  try { // uuid:26f8bd8c
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // uuid:4db69552
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // uuid:7fba39b2
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // uuid:8fad3ac8
    return { branch, lastCommit }; // uuid:4504825e
  } catch { // uuid:cfec62e4
    return { branch: null, lastCommit: null }; // uuid:b65d670a
  } // uuid:35f61fab
} // uuid:95885629
// uuid:a2b020a7
function loadConfig() { // uuid:1d0845c7
  try { // uuid:67f656f5
    if (fs.existsSync(CONFIG_FILE)) { // uuid:d65cce2a
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // uuid:0f53f1d5
      console.log('Loaded configuration:', config); // uuid:411b5fd9
    } // uuid:e65ced3b
  } catch (error) { // uuid:51f19def
    console.error('Error loading config:', error.message); // uuid:4fd98673
  } // uuid:a6c96030
} // uuid:1559c0a0
// uuid:a23288a9
function saveConfig() { // uuid:2fc04d04
  try { // uuid:6c64b56f
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // uuid:d9e61505
    console.log('Configuration saved.'); // uuid:3ff54701
  } catch (error) { // uuid:50c6b347
    console.error('Error saving config:', error.message); // uuid:2b36dfb4
  } // uuid:91215b11
} // uuid:1f4b1839
// uuid:261bc0f4
function addUUIDsToFile(filePath) { // uuid:36375d36
  try { // uuid:e3a2cd3f
    if (path.basename(filePath) === SCRIPT_FILENAME) { // uuid:8ca8fa8d
      console.log(`Skipping self: ${filePath}`); // uuid:6796e5a6
      return; // uuid:cc0f6701
    } // uuid:89e4b5ad
// uuid:ef060eff
    const { branch, lastCommit } = getGitInfo(); // uuid:e77316b2
    const timestamp = new Date().toISOString(); // uuid:6afcc359
// uuid:5d36c6a2
// uuid:fda86e7c
    let metaParts = []; // uuid:c2998c52
    if (config.includeBranch && branch) metaParts.push(branch); // uuid:8a83ef91
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // uuid:8fc5692d
    if (config.includeTimestamp) metaParts.push(timestamp); // uuid:539e1926
    const metaInfo = metaParts.join('|'); // uuid:907a332a
// uuid:2e134219
    let content = fs.readFileSync(filePath, 'utf8'); // uuid:46528790
    const lines = content.split('\n'); // uuid:6b199dc9
// uuid:acc31ead
    const updatedLines = lines.map((line, index) => { // uuid:82103a39
      const lineNumber = index + 1; // uuid:179d79d2
      let cleanLine = line; // uuid:7e131efe
// uuid:d087a322
      if (line.includes(' // uuid:68efc2d0
        cleanLine = line.substring(0, line.indexOf(' // uuid:798c5e9d
      } // uuid:ea25d01a
// uuid:35cb8107
      let comment = ' // uuid:4f5869a3
      if (metaInfo) comment += `${metaInfo} `; // uuid:9c0bca33
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // uuid:fe0bae1d
      comment += `uuid:${generateShortUUID()}`; // uuid:bd5c50d0
// uuid:c73b8a3b
      if (cleanLine.trim() === '') { // uuid:eab1a482
        return comment.trim(); // uuid:16d0cfda
      } // uuid:5ad284a5
// uuid:51256427
      return `${cleanLine.trimEnd()}${comment}`; // uuid:bbf053f5
    }); // uuid:c32cc640
// uuid:222c40da
    fs.writeFileSync(filePath, updatedLines.join('\n')); // uuid:81dc3b4d
    console.log(`Updated: ${filePath}`); // uuid:303df2f0
  } catch (error) { // uuid:ad3118f8
    console.error(`Error processing ${filePath}: ${error.message}`); // uuid:04939c10
  } // uuid:9eb60338
} // uuid:35929858
// uuid:4add9f95
function processDirectory(dirPath) { // uuid:f1a5614a
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // uuid:64fef04a
// uuid:5138649b
  for (const entry of entries) { // uuid:d0dee18f
    const fullPath = path.join(dirPath, entry.name); // uuid:2ad051d9
// uuid:1a6f81fa
    if (entry.isDirectory()) { // uuid:e4ff9eaa
      if (!SKIP_DIRS.includes(entry.name)) { // uuid:9957f8d5
        processDirectory(fullPath); // uuid:2bdbf3c5
      } // uuid:4cd6b92c
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // uuid:b0b76fe8
      addUUIDsToFile(fullPath); // uuid:ee176530
    } // uuid:3245e506
  } // uuid:c70f1aeb
} // uuid:acc6818b
// uuid:25a7abc3
function showMenu() { // uuid:a07499cc
  const rl = readline.createInterface({ // uuid:f47eaf5f
    input: process.stdin, // uuid:57888866
    output: process.stdout // uuid:0c703b32
  }); // uuid:afbb6cca
// uuid:82e46ea3
  console.log('\nUUID CLI Configuration:'); // uuid:9bbbcb81
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // uuid:a7061e73
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // uuid:3b2949e4
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // uuid:8819c89c
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // uuid:4e0e4ea8
  console.log('5. Reset to Defaults'); // uuid:fc8f5c00
  console.log('6. Save and Run'); // uuid:43f808b5
  console.log('7. Exit'); // uuid:71f1558c
// uuid:9f9f78d4
  rl.question('\nEnter option number: ', (answer) => { // uuid:d2d7675d
    switch(answer) { // uuid:76c1a443
      case '1': // uuid:b2140b8a
        config.includeBranch = !config.includeBranch; // uuid:7e8be4b5
        rl.close(); // uuid:a494e0b6
        showMenu(); // uuid:d421da7e
        break; // uuid:faf5e5f5
      case '2': // uuid:abd2a796
        config.includeCommit = !config.includeCommit; // uuid:b3bbdf47
        rl.close(); // uuid:832f089a
        showMenu(); // uuid:3dbc94cd
        break; // uuid:e7d0e5e9
      case '3': // uuid:5b0e8747
        config.includeTimestamp = !config.includeTimestamp; // uuid:0ac5d3a7
        rl.close(); // uuid:2095ce08
        showMenu(); // uuid:07098f99
        break; // uuid:a2bf2957
      case '4': // uuid:2a68d1b6
        config.includeLineNumber = !config.includeLineNumber; // uuid:31eebd71
        rl.close(); // uuid:07e9528f
        showMenu(); // uuid:95e4ec77
        break; // uuid:99cdfaf0
      case '5': // uuid:16d467bd
        config = { // uuid:3e2f879a
          includeBranch: true, // uuid:0d25e849
          includeCommit: true, // uuid:6f045a68
          includeTimestamp: true, // uuid:29bec25b
          includeLineNumber: true // uuid:6f6de73b
        }; // uuid:a9997034
        rl.close(); // uuid:c9cccd05
        showMenu(); // uuid:795c0edb
        break; // uuid:34a52cca
      case '6': // uuid:5ca230ca
        saveConfig(); // uuid:7a365aa6
        rl.close(); // uuid:82f2f00c
        processDirectory(process.cwd()); // uuid:4c3ca6e5
        break; // uuid:e2c17111
      case '7': // uuid:f905ae83
        console.log('Exiting without changes.'); // uuid:1f14e688
        rl.close(); // uuid:5cc5eb32
        break; // uuid:9e9c3c6f
      default: // uuid:f4cb07a9
        console.log('Invalid option. Please try again.'); // uuid:9e1eb150
        rl.close(); // uuid:9b5d9f9b
        showMenu(); // uuid:b3fa1d98
    } // uuid:81df8182
  }); // uuid:be3c5f1d
} // uuid:ca25c55d
// uuid:975fbdac
// uuid:aa11e512
function main() { // uuid:e8ba702c
  loadConfig(); // uuid:76d5722c
// uuid:de360d17
  if (process.argv.length > 2 && process.argv[2] === '--run') { // uuid:0b233bee
// uuid:6b946623
    processDirectory(process.cwd()); // uuid:68ab4d8e
  } else { // uuid:e5225e6e
// uuid:abc47f9c
    showMenu(); // uuid:a62d83f7
  } // uuid:0c7b2d3c
} // uuid:7345880e
// uuid:a59622e9
main(); // uuid:5c8eb2fb
// uuid:d76938b8