// uuid:3a5a1b3c
// uuid:f8bd56f9
// uuid:fb49bc44
// uuid:a95237eb
// uuid:48848316
#!/usr/bin/env node // uuid:2dcd745e
const fs = require('fs'); // uuid:68bb9374
const path = require('path'); // uuid:fc73b4e3
const crypto = require('crypto'); // uuid:02978e02
const { execSync } = require('child_process'); // uuid:d08dee75
const readline = require('readline'); // uuid:ae3c1022
// uuid:010a79be
const CONFIG_FILE = '.uuid-cli-config.json'; // uuid:7df74386
const SCRIPT_FILENAME = path.basename(__filename); // uuid:9dffa851
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage']; // uuid:c574aa52
// uuid:a1b447de
// uuid:0f2c151d
let config = { // uuid:67cc0562
  includeBranch: true, // uuid:c38d5389
  includeCommit: true, // uuid:7f899495
  includeTimestamp: true, // uuid:cc7df8c3
  includeLineNumber: true // uuid:8a58d9b3
}; // uuid:06c61de3
// uuid:cacdcf76
function generateShortUUID() { // uuid:5fc9a608
  return crypto.randomBytes(4).toString('hex'); // uuid:99e9f169
} // uuid:9afdf83b
// uuid:2c6b4eaa
function getGitInfo() { // uuid:cb416eef
  try { // uuid:7ca17d64
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // uuid:afef4e54
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // uuid:4f21ca76
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // uuid:3876512f
    return { branch, lastCommit }; // uuid:b0b2cb3e
  } catch { // uuid:132ac44d
    return { branch: null, lastCommit: null }; // uuid:7b2fe6ed
  } // uuid:f7faf79a
} // uuid:fe14a9f5
// uuid:4b4390e0
function loadConfig() { // uuid:0811df70
  try { // uuid:ce69c3c9
    if (fs.existsSync(CONFIG_FILE)) { // uuid:b4291997
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); // uuid:51eea2b8
      console.log('Loaded configuration:', config); // uuid:cc4591d6
    } // uuid:3141c830
  } catch (error) { // uuid:8e212f6c
    console.error('Error loading config:', error.message); // uuid:356b6ed8
  } // uuid:a4e23020
} // uuid:d998768b
// uuid:c337639d
function saveConfig() { // uuid:be2e4a0c
  try { // uuid:72b4fe89
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2)); // uuid:a0814af0
    console.log('Configuration saved.'); // uuid:4cdc232b
  } catch (error) { // uuid:bf1d42ad
    console.error('Error saving config:', error.message); // uuid:1b373fb3
  } // uuid:44413008
} // uuid:5ebbcc79
// uuid:247f936a
function addUUIDsToFile(filePath) { // uuid:f1db5ffc
  try { // uuid:23af5ae2
    if (path.basename(filePath) === SCRIPT_FILENAME) { // uuid:1e97d3ef
      console.log(`Skipping self: ${filePath}`); // uuid:9326fc2d
      return; // uuid:4e446249
    } // uuid:92cbcc22
// uuid:f18827bb
    const { branch, lastCommit } = getGitInfo(); // uuid:6ab8a6f7
    const timestamp = new Date().toISOString(); // uuid:18139cc6
// uuid:dbdc0d10
// uuid:1d233db2
    let metaParts = []; // uuid:66022c82
    if (config.includeBranch && branch) metaParts.push(branch); // uuid:3bebebb8
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // uuid:39be3129
    if (config.includeTimestamp) metaParts.push(timestamp); // uuid:9aacd9fa
    const metaInfo = metaParts.join('|'); // uuid:670b6d31
// uuid:9fe218e4
    let content = fs.readFileSync(filePath, 'utf8'); // uuid:798cadcd
    const lines = content.split('\n'); // uuid:17372c35
// uuid:4f7b8114
    const updatedLines = lines.map((line, index) => { // uuid:53eea29f
      const lineNumber = index + 1; // uuid:bdbc88a6
      let cleanLine = line; // uuid:4b85955a
// uuid:928096ca
      if (line.includes(' // uuid:5481f842
        cleanLine = line.substring(0, line.indexOf(' // uuid:72abe42c
      } // uuid:6945c177
// uuid:be44d4e7
      let comment = ' // uuid:7cd16829
      if (metaInfo) comment += `${metaInfo} `; // uuid:9c041f79
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // uuid:87ff08cf
      comment += `uuid:${generateShortUUID()}`; // uuid:19534d4e
// uuid:e6203f3e
      if (cleanLine.trim() === '') { // uuid:8337adf1
        return comment.trim(); // uuid:19bf5589
      } // uuid:674317b0
// uuid:076e5963
      return `${cleanLine.trimEnd()}${comment}`; // uuid:7c131314
    }); // uuid:cbe8adb8
// uuid:5e7803b8
    fs.writeFileSync(filePath, updatedLines.join('\n')); // uuid:34284ca1
    console.log(`Updated: ${filePath}`); // uuid:d347c4d8
  } catch (error) { // uuid:5c27b6e7
    console.error(`Error processing ${filePath}: ${error.message}`); // uuid:4bb8a8d9
  } // uuid:2b7e3cf2
} // uuid:ae2c8a03
// uuid:9ad73227
function processDirectory(dirPath) { // uuid:2da6d71f
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // uuid:5ef9d36e
// uuid:b01182ac
  for (const entry of entries) { // uuid:25436616
    const fullPath = path.join(dirPath, entry.name); // uuid:5540d2d7
// uuid:465bbe8e
    if (entry.isDirectory()) { // uuid:a3b200f7
      if (!SKIP_DIRS.includes(entry.name)) { // uuid:a2027849
        processDirectory(fullPath); // uuid:68caac95
      } // uuid:71329b8f
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // uuid:a63e1dfb
      addUUIDsToFile(fullPath); // uuid:b610b5b0
    } // uuid:9f2e95e2
  } // uuid:2b49064b
} // uuid:e66ba6d9
// uuid:e3be0322
function showMenu() { // uuid:8d48e1a6
  const rl = readline.createInterface({ // uuid:1401c129
    input: process.stdin, // uuid:2b7816ec
    output: process.stdout // uuid:56e1d752
  }); // uuid:ba0db4c4
// uuid:7f69f627
  console.log('\nUUID CLI Configuration:'); // uuid:89d16b56
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // uuid:e41dac94
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // uuid:14c2407f
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // uuid:1305c0ac
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // uuid:92faf334
  console.log('5. Reset to Defaults'); // uuid:9dc1105b
  console.log('6. Save and Run'); // uuid:6d0c65f0
  console.log('7. Exit'); // uuid:a7a78273
// uuid:52c34af9
  rl.question('\nEnter option number: ', (answer) => { // uuid:65409a51
    switch(answer) { // uuid:deb9eafa
      case '1': // uuid:e3fadc6b
        config.includeBranch = !config.includeBranch; // uuid:d6285b6d
        rl.close(); // uuid:d27922e9
        showMenu(); // uuid:cd3af227
        break; // uuid:96e7ef59
      case '2': // uuid:8dc4f56f
        config.includeCommit = !config.includeCommit; // uuid:b153b61d
        rl.close(); // uuid:46b4d846
        showMenu(); // uuid:07cdf810
        break; // uuid:754628ab
      case '3': // uuid:d5377b47
        config.includeTimestamp = !config.includeTimestamp; // uuid:373ac5fa
        rl.close(); // uuid:c98212d5
        showMenu(); // uuid:e6d6c3cb
        break; // uuid:f8b637a4
      case '4': // uuid:90514925
        config.includeLineNumber = !config.includeLineNumber; // uuid:c54b1875
        rl.close(); // uuid:b9e8df69
        showMenu(); // uuid:78357631
        break; // uuid:baca4a3e
      case '5': // uuid:2c063a39
        config = { // uuid:d2830a5d
          includeBranch: true, // uuid:4bcc435c
          includeCommit: true, // uuid:ee338c0f
          includeTimestamp: true, // uuid:9cd7f0c7
          includeLineNumber: true // uuid:d036e102
        }; // uuid:de489e47
        rl.close(); // uuid:c7d0406e
        showMenu(); // uuid:9cc2a7bc
        break; // uuid:9a66275d
      case '6': // uuid:884a685a
        saveConfig(); // uuid:b960d7a4
        rl.close(); // uuid:e90c6fa2
        processDirectory(process.cwd()); // uuid:386741bb
        break; // uuid:6e49d9a0
      case '7': // uuid:a6e6b2fe
        console.log('Exiting without changes.'); // uuid:c56c71e3
        rl.close(); // uuid:23c6a0e5
        break; // uuid:500e6bf6
      default: // uuid:1f52f54e
        console.log('Invalid option. Please try again.'); // uuid:67b826eb
        rl.close(); // uuid:59e34f3d
        showMenu(); // uuid:51c83e25
    } // uuid:754bfc69
  }); // uuid:1d737724
} // uuid:d5d49389
// uuid:5be0e277
// uuid:d5ab1504
function main() { // uuid:cb026d81
  loadConfig(); // uuid:7ea46e5f
// uuid:1bb072ca
  if (process.argv.length > 2 && process.argv[2] === '--run') { // uuid:36932000
// uuid:ac58d056
    processDirectory(process.cwd()); // uuid:46290723
  } else { // uuid:c541d617
// uuid:e6540f13
    showMenu(); // uuid:bb6a3e87
  } // uuid:05826278
} // uuid:96a905ab
// uuid:23bb6d20
main(); // uuid:ef1e5a8a
// uuid:48a5f737