// time:2025-04-18T16:51:25.938Z uuid:9068b620
// time:2025-04-18T16:51:25.938Z uuid:0070f1df
// time:2025-04-18T16:51:25.938Z uuid:4f3832dd
// time:2025-04-18T16:51:25.938Z uuid:da91858d
// time:2025-04-18T16:51:25.938Z uuid:1b2dc2a4
// time:2025-04-18T16:51:25.938Z uuid:6a3d2ab5
// time:2025-04-18T16:51:25.938Z uuid:ed81df40
// time:2025-04-18T16:51:25.938Z uuid:7ca43f40
// time:2025-04-18T16:51:25.938Z uuid:fdfdf3d5
// time:2025-04-18T16:51:25.938Z uuid:b8b2be5a
const fs = require('fs'); // time:2025-04-18T16:51:25.938Z uuid:62e93ab1
const path = require('path'); // time:2025-04-18T16:51:25.938Z uuid:4e169726
const crypto = require('crypto'); // time:2025-04-18T16:51:25.938Z uuid:7296ad75
const { execSync } = require('child_process'); // time:2025-04-18T16:51:25.938Z uuid:3cbb9dde
const readline = require('readline'); // time:2025-04-18T16:51:25.938Z uuid:812b2ea2
// time:2025-04-18T16:51:25.938Z uuid:8cc3ce6e
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:51:25.938Z uuid:ec68449e
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:51:25.938Z uuid:1ddeeef0
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:51:25.938Z uuid:0c11ad94
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:51:25.938Z uuid:0ca270ab
// time:2025-04-18T16:51:25.938Z uuid:0a0a8b41
// time:2025-04-18T16:51:25.938Z uuid:820231e2
// time:2025-04-18T16:51:25.938Z uuid:e5e93518
// time:2025-04-18T16:51:25.938Z uuid:e5a1a7ab
// time:2025-04-18T16:51:25.938Z uuid:b240f549
let config = { // time:2025-04-18T16:51:25.938Z uuid:8417b1b8
  includeBranch: true, // time:2025-04-18T16:51:25.938Z uuid:a4b1fc51
  includeCommit: true, // time:2025-04-18T16:51:25.938Z uuid:5705756b
  includeTimestamp: true, // time:2025-04-18T16:51:25.938Z uuid:f7d0975f
  includeLineNumber: true // time:2025-04-18T16:51:25.938Z uuid:4a0e211f
}; // time:2025-04-18T16:51:25.938Z uuid:184cc601
// time:2025-04-18T16:51:25.938Z uuid:4be20cdd
// time:2025-04-18T16:51:25.938Z uuid:7af9b34f
let lastRunInfo = { // time:2025-04-18T16:51:25.938Z uuid:8be18ca3
  timestamp: null, // time:2025-04-18T16:51:25.938Z uuid:93e6583a
  files: [] // time:2025-04-18T16:51:25.938Z uuid:e620088e
}; // time:2025-04-18T16:51:25.938Z uuid:bb37a31e
// time:2025-04-18T16:51:25.938Z uuid:7e7bbbf5
function generateShortUUID() { // time:2025-04-18T16:51:25.938Z uuid:5d5ffb1c
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:51:25.938Z uuid:39890b25
} // time:2025-04-18T16:51:25.938Z uuid:6c93354e
// time:2025-04-18T16:51:25.938Z uuid:c8a63ecf
function getGitInfo() { // time:2025-04-18T16:51:25.938Z uuid:e2a39afa
  try { // time:2025-04-18T16:51:25.938Z uuid:82394de8
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:51:25.938Z uuid:d75dbc87
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.938Z uuid:613928c8
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.938Z uuid:e602f3c6
    return { branch, lastCommit }; // time:2025-04-18T16:51:25.938Z uuid:0a7b558d
  } catch { // time:2025-04-18T16:51:25.938Z uuid:19eac125
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:51:25.938Z uuid:57e5829f
  } // time:2025-04-18T16:51:25.938Z uuid:361802a5
} // time:2025-04-18T16:51:25.938Z uuid:5dc3d968
// time:2025-04-18T16:51:25.938Z uuid:26657de0
function loadConfig() { // time:2025-04-18T16:51:25.938Z uuid:664340d4
  try { // time:2025-04-18T16:51:25.938Z uuid:bce43474
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:51:25.938Z uuid:c9289737
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:51:25.938Z uuid:6967b9a7
      const data = JSON.parse(fileContent); // time:2025-04-18T16:51:25.938Z uuid:308992ac
// time:2025-04-18T16:51:25.938Z uuid:64077b20
// time:2025-04-18T16:51:25.938Z uuid:9b6b1223
      if (data.config) { // time:2025-04-18T16:51:25.938Z uuid:6b9b3a94
        config = data.config; // time:2025-04-18T16:51:25.938Z uuid:e00face5
      } // time:2025-04-18T16:51:25.938Z uuid:0012173c
// time:2025-04-18T16:51:25.938Z uuid:5693f8d1
// time:2025-04-18T16:51:25.938Z uuid:360d4f05
      if (data.lastRun) { // time:2025-04-18T16:51:25.938Z uuid:b3338a81
        lastRunInfo = data.lastRun; // time:2025-04-18T16:51:25.938Z uuid:533827ba
      } // time:2025-04-18T16:51:25.938Z uuid:72a567a2
// time:2025-04-18T16:51:25.938Z uuid:5fd11248
      console.log('Loaded configuration:', config); // time:2025-04-18T16:51:25.938Z uuid:c9670325
    } // time:2025-04-18T16:51:25.938Z uuid:12a918eb
  } catch (error) { // time:2025-04-18T16:51:25.938Z uuid:c9c734b6
    console.error('Error loading config:', error.message); // time:2025-04-18T16:51:25.938Z uuid:58081fb8
  } // time:2025-04-18T16:51:25.938Z uuid:f977dbb8
} // time:2025-04-18T16:51:25.938Z uuid:0644c5c0
// time:2025-04-18T16:51:25.938Z uuid:5c95ca49
function saveConfig() { // time:2025-04-18T16:51:25.938Z uuid:302e06a4
  try { // time:2025-04-18T16:51:25.938Z uuid:d9c04554
// time:2025-04-18T16:51:25.938Z uuid:0331edbf
    const data = { // time:2025-04-18T16:51:25.938Z uuid:8a5f25ce
      config, // time:2025-04-18T16:51:25.938Z uuid:5dcc29c2
      lastRun: lastRunInfo // time:2025-04-18T16:51:25.938Z uuid:f811917f
    }; // time:2025-04-18T16:51:25.938Z uuid:8ace6400
// time:2025-04-18T16:51:25.938Z uuid:550d1649
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:51:25.938Z uuid:396db8c7
    console.log('Configuration saved.'); // time:2025-04-18T16:51:25.938Z uuid:b55b913e
  } catch (error) { // time:2025-04-18T16:51:25.938Z uuid:e1affc65
    console.error('Error saving config:', error.message); // time:2025-04-18T16:51:25.938Z uuid:264413ce
  } // time:2025-04-18T16:51:25.938Z uuid:692006ed
} // time:2025-04-18T16:51:25.938Z uuid:e03317a7
// time:2025-04-18T16:51:25.938Z uuid:cbdc9386
function ensureBackupDir() { // time:2025-04-18T16:51:25.938Z uuid:29b18861
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:51:25.938Z uuid:d4780cb1
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:51:25.938Z uuid:7b6413bc
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:51:25.938Z uuid:cfca3a10
  } // time:2025-04-18T16:51:25.938Z uuid:764207ea
} // time:2025-04-18T16:51:25.938Z uuid:2b00f7c6
// time:2025-04-18T16:51:25.938Z uuid:f59ef738
function backupFile(filePath) { // time:2025-04-18T16:51:25.938Z uuid:d6f1d98e
  try { // time:2025-04-18T16:51:25.938Z uuid:5b9a55b1
    ensureBackupDir(); // time:2025-04-18T16:51:25.938Z uuid:d766b61c
// time:2025-04-18T16:51:25.938Z uuid:db0548ae
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.938Z uuid:f95e2676
    const fileName = path.basename(filePath); // time:2025-04-18T16:51:25.938Z uuid:9f51fb28
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:51:25.938Z uuid:71efa1aa
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:51:25.938Z uuid:22c609fc
// time:2025-04-18T16:51:25.938Z uuid:718137c0
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:51:25.938Z uuid:6a484664
    return { relativePath, backupPath }; // time:2025-04-18T16:51:25.938Z uuid:7e5cac1c
  } catch (error) { // time:2025-04-18T16:51:25.938Z uuid:cdd6bdea
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.938Z uuid:4647ce30
    return null; // time:2025-04-18T16:51:25.938Z uuid:48600e45
  } // time:2025-04-18T16:51:25.938Z uuid:0719d772
} // time:2025-04-18T16:51:25.938Z uuid:f6802975
// time:2025-04-18T16:51:25.938Z uuid:238195a0
function addUUIDsToFile(filePath) { // time:2025-04-18T16:51:25.938Z uuid:44617c0d
  try { // time:2025-04-18T16:51:25.938Z uuid:b24add3c
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:51:25.938Z uuid:75e72c9f
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:51:25.938Z uuid:350ed212
      return null; // time:2025-04-18T16:51:25.938Z uuid:ed8f7aed
    } // time:2025-04-18T16:51:25.938Z uuid:ae244b05
// time:2025-04-18T16:51:25.938Z uuid:41bea5a0
// time:2025-04-18T16:51:25.938Z uuid:699cbf48
    const backup = backupFile(filePath); // time:2025-04-18T16:51:25.938Z uuid:3e6a9986
    if (!backup) return null; // time:2025-04-18T16:51:25.938Z uuid:4076ccdd
// time:2025-04-18T16:51:25.938Z uuid:0c36f2be
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:51:25.938Z uuid:76226528
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:51:25.938Z uuid:910480bd
// time:2025-04-18T16:51:25.938Z uuid:2116f3d5
// time:2025-04-18T16:51:25.938Z uuid:6ecf0450
    let metaParts = []; // time:2025-04-18T16:51:25.938Z uuid:c1f843ff
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:51:25.938Z uuid:654f43f6
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:51:25.938Z uuid:4dda2873
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:51:25.938Z uuid:e8eaeb65
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:51:25.938Z uuid:bf1ca62c
// time:2025-04-18T16:51:25.938Z uuid:af8a435c
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.938Z uuid:dc0cb095
    const lines = content.split('\n'); // time:2025-04-18T16:51:25.938Z uuid:367dbbd4
// time:2025-04-18T16:51:25.938Z uuid:f657f79f
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:51:25.938Z uuid:b68d6975
      const lineNumber = index + 1; // time:2025-04-18T16:51:25.938Z uuid:83ba8039
      let cleanLine = line; // time:2025-04-18T16:51:25.938Z uuid:7cd467a6
// time:2025-04-18T16:51:25.938Z uuid:30de1af6
      if (line.includes(' // time:2025-04-18T16:51:25.938Z uuid:97b283cd
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:51:25.938Z uuid:59c3ee6d
      } // time:2025-04-18T16:51:25.938Z uuid:4c7226e8
// time:2025-04-18T16:51:25.938Z uuid:6c508f3e
      let comment = ' // time:2025-04-18T16:51:25.938Z uuid:24e51cc4
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:51:25.938Z uuid:fc75fc83
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:51:25.938Z uuid:1814ee1b
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:51:25.938Z uuid:aca328d2
// time:2025-04-18T16:51:25.938Z uuid:daa94938
      if (cleanLine.trim() === '') { // time:2025-04-18T16:51:25.938Z uuid:656956f1
        return comment.trim(); // time:2025-04-18T16:51:25.938Z uuid:3cab178c
      } // time:2025-04-18T16:51:25.938Z uuid:e1f17632
// time:2025-04-18T16:51:25.938Z uuid:4b682ed3
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:51:25.938Z uuid:a9b93a6c
    }); // time:2025-04-18T16:51:25.938Z uuid:e1739127
// time:2025-04-18T16:51:25.938Z uuid:81be36ec
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:51:25.938Z uuid:b7853895
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:51:25.938Z uuid:7bd911a2
// time:2025-04-18T16:51:25.938Z uuid:81d0c7c0
    return backup; // time:2025-04-18T16:51:25.938Z uuid:fd00e87e
  } catch (error) { // time:2025-04-18T16:51:25.938Z uuid:57927d4e
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.938Z uuid:f845ebca
    return null; // time:2025-04-18T16:51:25.938Z uuid:ea5cea6a
  } // time:2025-04-18T16:51:25.938Z uuid:09975a86
} // time:2025-04-18T16:51:25.938Z uuid:fba2a7a6
// time:2025-04-18T16:51:25.938Z uuid:e0cca5b5
function processDirectory(dirPath) { // time:2025-04-18T16:51:25.938Z uuid:49eaf6e0
  const modifiedFiles = []; // time:2025-04-18T16:51:25.938Z uuid:fbc8ba79
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:51:25.938Z uuid:c53169b4
// time:2025-04-18T16:51:25.938Z uuid:fb2c41cf
  for (const entry of entries) { // time:2025-04-18T16:51:25.938Z uuid:e2094bd5
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:51:25.938Z uuid:8e9a753d
// time:2025-04-18T16:51:25.938Z uuid:329f7f5a
    if (entry.isDirectory()) { // time:2025-04-18T16:51:25.938Z uuid:7105bdf2
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:51:25.938Z uuid:834b4ded
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:51:25.938Z uuid:f93f6384
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:51:25.938Z uuid:0861f63c
      } // time:2025-04-18T16:51:25.938Z uuid:1c6695ae
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:51:25.938Z uuid:49561c3a
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:51:25.938Z uuid:79786dd9
      if (result) { // time:2025-04-18T16:51:25.938Z uuid:fc1d437a
        modifiedFiles.push(result); // time:2025-04-18T16:51:25.938Z uuid:3f4e09aa
      } // time:2025-04-18T16:51:25.938Z uuid:98691d61
    } // time:2025-04-18T16:51:25.938Z uuid:df1db8cf
  } // time:2025-04-18T16:51:25.938Z uuid:2818081d
// time:2025-04-18T16:51:25.938Z uuid:bc97e24f
  return modifiedFiles; // time:2025-04-18T16:51:25.938Z uuid:90a3eb49
} // time:2025-04-18T16:51:25.938Z uuid:a96ef398
// time:2025-04-18T16:51:25.938Z uuid:6f7ea5cb
function rollbackLastRun() { // time:2025-04-18T16:51:25.938Z uuid:5598c315
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:51:25.938Z uuid:962155f7
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:51:25.938Z uuid:c8f3ba9a
    return; // time:2025-04-18T16:51:25.938Z uuid:df55ba0c
  } // time:2025-04-18T16:51:25.938Z uuid:1466d9a3
// time:2025-04-18T16:51:25.938Z uuid:a293ba45
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:51:25.938Z uuid:e5bc24dd
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:51:25.938Z uuid:b2e7286f
// time:2025-04-18T16:51:25.938Z uuid:8e3bfd1a
  let successCount = 0; // time:2025-04-18T16:51:25.938Z uuid:a73362d7
// time:2025-04-18T16:51:25.938Z uuid:34c4f916
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:51:25.938Z uuid:9a1d832d
    try { // time:2025-04-18T16:51:25.938Z uuid:72296fda
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:51:25.938Z uuid:3b9b4dcb
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:51:25.938Z uuid:365282f2
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:51:25.938Z uuid:a6ff69fa
// time:2025-04-18T16:51:25.938Z uuid:27f6da06
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:51:25.938Z uuid:1fc64c58
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:51:25.938Z uuid:ba0e9102
        successCount++; // time:2025-04-18T16:51:25.938Z uuid:05bdfb5d
      } else { // time:2025-04-18T16:51:25.938Z uuid:b5cfa702
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:51:25.938Z uuid:54c45ad1
      } // time:2025-04-18T16:51:25.938Z uuid:1727c318
    } catch (error) { // time:2025-04-18T16:51:25.938Z uuid:49c55544
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:51:25.938Z uuid:52007788
    } // time:2025-04-18T16:51:25.938Z uuid:5aa70b22
  } // time:2025-04-18T16:51:25.938Z uuid:ccef1ceb
// time:2025-04-18T16:51:25.938Z uuid:c8023e12
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:51:25.938Z uuid:badedc1b
// time:2025-04-18T16:51:25.938Z uuid:83c2482a
// time:2025-04-18T16:51:25.938Z uuid:93a83f50
  lastRunInfo = { // time:2025-04-18T16:51:25.938Z uuid:8bec219c
    timestamp: null, // time:2025-04-18T16:51:25.938Z uuid:526db39c
    files: [] // time:2025-04-18T16:51:25.938Z uuid:5037d913
  }; // time:2025-04-18T16:51:25.938Z uuid:43faefc7
// time:2025-04-18T16:51:25.938Z uuid:408683a9
  saveConfig(); // time:2025-04-18T16:51:25.938Z uuid:45fddcdc
} // time:2025-04-18T16:51:25.938Z uuid:2c224b26
// time:2025-04-18T16:51:25.938Z uuid:c9b57f91
function runUUIDProcess() { // time:2025-04-18T16:51:25.938Z uuid:18dc286f
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:51:25.938Z uuid:f2464b32
// time:2025-04-18T16:51:25.938Z uuid:bfda93ad
// time:2025-04-18T16:51:25.938Z uuid:ccdd886a
  lastRunInfo = { // time:2025-04-18T16:51:25.938Z uuid:2706e44a
    timestamp: Date.now(), // time:2025-04-18T16:51:25.938Z uuid:fc4922d5
    files: modifiedFiles // time:2025-04-18T16:51:25.938Z uuid:41e9bdc3
  }; // time:2025-04-18T16:51:25.938Z uuid:c9806897
// time:2025-04-18T16:51:25.938Z uuid:72449a46
  saveConfig(); // time:2025-04-18T16:51:25.938Z uuid:a74dbe20
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:51:25.938Z uuid:795fabfa
} // time:2025-04-18T16:51:25.938Z uuid:2fe86ce8
// time:2025-04-18T16:51:25.938Z uuid:c8a65e16
function showMenu() { // time:2025-04-18T16:51:25.938Z uuid:df47e5c7
  const rl = readline.createInterface({ // time:2025-04-18T16:51:25.938Z uuid:3ceef5f2
    input: process.stdin, // time:2025-04-18T16:51:25.938Z uuid:4f0a227f
    output: process.stdout // time:2025-04-18T16:51:25.938Z uuid:291ed2db
  }); // time:2025-04-18T16:51:25.938Z uuid:9f3fea5a
// time:2025-04-18T16:51:25.938Z uuid:29b0db00
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:51:25.938Z uuid:c9195fb6
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.938Z uuid:ddecfec2
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.938Z uuid:ff480c48
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.938Z uuid:c63d7020
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.938Z uuid:726f28f4
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:51:25.938Z uuid:4842d761
  console.log('6. Save and Run'); // time:2025-04-18T16:51:25.938Z uuid:89d60698
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:51:25.938Z uuid:33a8774b
  console.log('8. Exit'); // time:2025-04-18T16:51:25.938Z uuid:2abfa85d
// time:2025-04-18T16:51:25.938Z uuid:57d9d17d
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:51:25.938Z uuid:c6dee6f8
    switch(answer) { // time:2025-04-18T16:51:25.938Z uuid:fdec828f
      case '1': // time:2025-04-18T16:51:25.938Z uuid:6955f597
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:51:25.938Z uuid:41a7a451
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:e6e9f12c
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:62caed26
        break; // time:2025-04-18T16:51:25.938Z uuid:555dce78
      case '2': // time:2025-04-18T16:51:25.938Z uuid:7dcd0fdc
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:51:25.938Z uuid:8e2b6625
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:99f82c22
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:7bfb3c5d
        break; // time:2025-04-18T16:51:25.938Z uuid:cc28a27f
      case '3': // time:2025-04-18T16:51:25.938Z uuid:2dfb7d6a
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:51:25.938Z uuid:3385efe2
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:0c0072b1
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:8128382f
        break; // time:2025-04-18T16:51:25.938Z uuid:28e2f9d2
      case '4': // time:2025-04-18T16:51:25.938Z uuid:ab8cf928
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:51:25.938Z uuid:e8beea92
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:0914d226
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:b5e4e321
        break; // time:2025-04-18T16:51:25.938Z uuid:0141d6ad
      case '5': // time:2025-04-18T16:51:25.938Z uuid:508f4877
        config = { // time:2025-04-18T16:51:25.938Z uuid:2cba161a
          includeBranch: true, // time:2025-04-18T16:51:25.938Z uuid:3bd2cd6c
          includeCommit: true, // time:2025-04-18T16:51:25.938Z uuid:5932f6c4
          includeTimestamp: true, // time:2025-04-18T16:51:25.938Z uuid:651b8447
          includeLineNumber: true // time:2025-04-18T16:51:25.938Z uuid:1988e70a
        }; // time:2025-04-18T16:51:25.938Z uuid:a9ad9e72
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:8ac9a735
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:c892d254
        break; // time:2025-04-18T16:51:25.938Z uuid:cb147199
      case '6': // time:2025-04-18T16:51:25.938Z uuid:9f43381b
        saveConfig(); // time:2025-04-18T16:51:25.938Z uuid:1a629b37
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:5225ca81
        runUUIDProcess(); // time:2025-04-18T16:51:25.938Z uuid:3e55667f
        break; // time:2025-04-18T16:51:25.938Z uuid:a33b6118
      case '7': // time:2025-04-18T16:51:25.938Z uuid:3b656d65
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:ccfde1aa
        rollbackLastRun(); // time:2025-04-18T16:51:25.938Z uuid:56e27358
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:0f8c34da
        break; // time:2025-04-18T16:51:25.938Z uuid:1b1ef5a7
      case '8': // time:2025-04-18T16:51:25.938Z uuid:014501b8
        console.log('Exiting without changes.'); // time:2025-04-18T16:51:25.938Z uuid:6d019c4d
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:9a3df57e
        break; // time:2025-04-18T16:51:25.938Z uuid:7b6e186e
      default: // time:2025-04-18T16:51:25.938Z uuid:e7ae0bfe
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:51:25.938Z uuid:de452df8
        rl.close(); // time:2025-04-18T16:51:25.938Z uuid:76e8d793
        showMenu(); // time:2025-04-18T16:51:25.938Z uuid:6a721acf
    } // time:2025-04-18T16:51:25.938Z uuid:98ebbbcb
  }); // time:2025-04-18T16:51:25.938Z uuid:5be33ea8
} // time:2025-04-18T16:51:25.938Z uuid:b55acfa7
// time:2025-04-18T16:51:25.938Z uuid:c99a8a34
// time:2025-04-18T16:51:25.938Z uuid:b0fa0b97
function main() { // time:2025-04-18T16:51:25.938Z uuid:36e76ae0
  loadConfig(); // time:2025-04-18T16:51:25.938Z uuid:079fe1fe
// time:2025-04-18T16:51:25.938Z uuid:d743c8f7
  if (process.argv.length > 2) { // time:2025-04-18T16:51:25.938Z uuid:f486ddb5
    if (process.argv[2] === '--run') { // time:2025-04-18T16:51:25.938Z uuid:461bcf9f
// time:2025-04-18T16:51:25.938Z uuid:f54a5e83
      runUUIDProcess(); // time:2025-04-18T16:51:25.938Z uuid:8859f847
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:51:25.938Z uuid:ca172d2c
// time:2025-04-18T16:51:25.938Z uuid:8bdd6b33
      rollbackLastRun(); // time:2025-04-18T16:51:25.938Z uuid:39974bfe
    } else { // time:2025-04-18T16:51:25.938Z uuid:4a111fcb
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:51:25.938Z uuid:846e1214
    } // time:2025-04-18T16:51:25.938Z uuid:1da8ba61
  } else { // time:2025-04-18T16:51:25.938Z uuid:8923eaef
// time:2025-04-18T16:51:25.938Z uuid:4f289390
    showMenu(); // time:2025-04-18T16:51:25.938Z uuid:d2e15f85
  } // time:2025-04-18T16:51:25.938Z uuid:230abef4
} // time:2025-04-18T16:51:25.938Z uuid:ae527bda
// time:2025-04-18T16:51:25.938Z uuid:02a00d93
main(); // time:2025-04-18T16:51:25.938Z uuid:143a85ae