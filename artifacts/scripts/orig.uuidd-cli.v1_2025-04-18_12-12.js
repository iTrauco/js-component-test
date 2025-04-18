// time:2025-04-18T16:56:37.883Z uuid:c43b5cf4
// time:2025-04-18T16:56:37.883Z uuid:10f52fb9
// time:2025-04-18T16:56:37.883Z uuid:3e716ef3
// time:2025-04-18T16:56:37.883Z uuid:a7babb04
// time:2025-04-18T16:56:37.883Z uuid:af84ca4e
// time:2025-04-18T16:56:37.883Z uuid:56a62e58
// time:2025-04-18T16:56:37.883Z uuid:a11b37e9
// time:2025-04-18T16:56:37.883Z uuid:21f68f86
// time:2025-04-18T16:56:37.883Z uuid:35de3661
// time:2025-04-18T16:56:37.883Z uuid:1b0d3e03
const fs = require('fs'); // time:2025-04-18T16:56:37.883Z uuid:7b288c8b
const path = require('path'); // time:2025-04-18T16:56:37.883Z uuid:ce5bb754
const crypto = require('crypto'); // time:2025-04-18T16:56:37.883Z uuid:18351423
const { execSync } = require('child_process'); // time:2025-04-18T16:56:37.883Z uuid:7f896d9e
const readline = require('readline'); // time:2025-04-18T16:56:37.883Z uuid:f8ee7d27
// time:2025-04-18T16:56:37.883Z uuid:2031d82d
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:56:37.883Z uuid:9cecd558
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:56:37.883Z uuid:31d3245d
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:56:37.883Z uuid:1df94651
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:56:37.883Z uuid:5e5afb64
// time:2025-04-18T16:56:37.883Z uuid:a19f12e0
// time:2025-04-18T16:56:37.883Z uuid:493f7461
// time:2025-04-18T16:56:37.883Z uuid:12f7d07e
// time:2025-04-18T16:56:37.883Z uuid:9deb23f5
// time:2025-04-18T16:56:37.883Z uuid:fd3d2425
let config = { // time:2025-04-18T16:56:37.883Z uuid:c6d4741a
  includeBranch: true, // time:2025-04-18T16:56:37.883Z uuid:361e0c71
  includeCommit: true, // time:2025-04-18T16:56:37.883Z uuid:367dc46a
  includeTimestamp: true, // time:2025-04-18T16:56:37.883Z uuid:8b4567f8
  includeLineNumber: true // time:2025-04-18T16:56:37.883Z uuid:d3cfb89c
}; // time:2025-04-18T16:56:37.883Z uuid:f57a3d25
// time:2025-04-18T16:56:37.883Z uuid:be344840
// time:2025-04-18T16:56:37.883Z uuid:7789850b
let lastRunInfo = { // time:2025-04-18T16:56:37.883Z uuid:1aaf954d
  timestamp: null, // time:2025-04-18T16:56:37.883Z uuid:8fad3f11
  files: [] // time:2025-04-18T16:56:37.883Z uuid:b5201c17
}; // time:2025-04-18T16:56:37.883Z uuid:6ca46b4d
// time:2025-04-18T16:56:37.883Z uuid:4a965535
function generateShortUUID() { // time:2025-04-18T16:56:37.883Z uuid:e58b7616
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:56:37.883Z uuid:60dbc56e
} // time:2025-04-18T16:56:37.883Z uuid:442ce627
// time:2025-04-18T16:56:37.883Z uuid:92f71938
function getGitInfo() { // time:2025-04-18T16:56:37.883Z uuid:2fdc244c
  try { // time:2025-04-18T16:56:37.883Z uuid:2603957d
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:56:37.883Z uuid:3e7dd1c2
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.883Z uuid:1e413958
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.883Z uuid:b0218f70
    return { branch, lastCommit }; // time:2025-04-18T16:56:37.883Z uuid:3e83af2e
  } catch { // time:2025-04-18T16:56:37.883Z uuid:fc205857
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:56:37.883Z uuid:7bf032ad
  } // time:2025-04-18T16:56:37.883Z uuid:bd887625
} // time:2025-04-18T16:56:37.883Z uuid:1864bfe4
// time:2025-04-18T16:56:37.883Z uuid:506cb999
function loadConfig() { // time:2025-04-18T16:56:37.883Z uuid:b82b55ed
  try { // time:2025-04-18T16:56:37.883Z uuid:cc838cbb
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:56:37.883Z uuid:d28e918c
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:56:37.883Z uuid:78d13ed8
      const data = JSON.parse(fileContent); // time:2025-04-18T16:56:37.883Z uuid:2075eaf3
// time:2025-04-18T16:56:37.883Z uuid:60c7e9fe
// time:2025-04-18T16:56:37.883Z uuid:4465bb9d
      if (data.config) { // time:2025-04-18T16:56:37.883Z uuid:20f57b55
        config = data.config; // time:2025-04-18T16:56:37.883Z uuid:fdf246e8
      } // time:2025-04-18T16:56:37.883Z uuid:3040019d
// time:2025-04-18T16:56:37.883Z uuid:7daed40b
// time:2025-04-18T16:56:37.883Z uuid:209dd1b9
      if (data.lastRun) { // time:2025-04-18T16:56:37.883Z uuid:b5d86a06
        lastRunInfo = data.lastRun; // time:2025-04-18T16:56:37.883Z uuid:a75eb114
      } // time:2025-04-18T16:56:37.883Z uuid:f29361d6
// time:2025-04-18T16:56:37.883Z uuid:a914bf32
      console.log('Loaded configuration:', config); // time:2025-04-18T16:56:37.883Z uuid:c33d3d15
    } // time:2025-04-18T16:56:37.883Z uuid:8a7ad9b2
  } catch (error) { // time:2025-04-18T16:56:37.883Z uuid:1c121115
    console.error('Error loading config:', error.message); // time:2025-04-18T16:56:37.883Z uuid:156481f1
  } // time:2025-04-18T16:56:37.883Z uuid:c315c378
} // time:2025-04-18T16:56:37.883Z uuid:3b52bba3
// time:2025-04-18T16:56:37.883Z uuid:13468e6f
function saveConfig() { // time:2025-04-18T16:56:37.883Z uuid:d3ed3a93
  try { // time:2025-04-18T16:56:37.883Z uuid:0758d87e
// time:2025-04-18T16:56:37.883Z uuid:1885160e
    const data = { // time:2025-04-18T16:56:37.883Z uuid:aa5edffa
      config, // time:2025-04-18T16:56:37.883Z uuid:40dee210
      lastRun: lastRunInfo // time:2025-04-18T16:56:37.883Z uuid:9446a849
    }; // time:2025-04-18T16:56:37.883Z uuid:765f89c4
// time:2025-04-18T16:56:37.883Z uuid:ce58c936
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:56:37.883Z uuid:ab7ecdf0
    console.log('Configuration saved.'); // time:2025-04-18T16:56:37.883Z uuid:1c3894ea
  } catch (error) { // time:2025-04-18T16:56:37.883Z uuid:969f5875
    console.error('Error saving config:', error.message); // time:2025-04-18T16:56:37.883Z uuid:fd17ba1a
  } // time:2025-04-18T16:56:37.883Z uuid:8fe422c5
} // time:2025-04-18T16:56:37.883Z uuid:a15a539a
// time:2025-04-18T16:56:37.883Z uuid:88144dba
function ensureBackupDir() { // time:2025-04-18T16:56:37.883Z uuid:dab581fa
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:56:37.883Z uuid:c835bf4e
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:56:37.883Z uuid:428adbd8
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:56:37.883Z uuid:c2eeb27b
  } // time:2025-04-18T16:56:37.883Z uuid:d1eca349
} // time:2025-04-18T16:56:37.883Z uuid:f7d28e3c
// time:2025-04-18T16:56:37.883Z uuid:c10213e9
function backupFile(filePath) { // time:2025-04-18T16:56:37.883Z uuid:8ea64163
  try { // time:2025-04-18T16:56:37.883Z uuid:b4545aab
    ensureBackupDir(); // time:2025-04-18T16:56:37.883Z uuid:6043d766
// time:2025-04-18T16:56:37.883Z uuid:4c7aec7f
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.883Z uuid:13503cdf
    const fileName = path.basename(filePath); // time:2025-04-18T16:56:37.883Z uuid:29a45fa4
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:56:37.883Z uuid:a9e86818
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:56:37.883Z uuid:174a8afd
// time:2025-04-18T16:56:37.883Z uuid:e08b78b4
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:56:37.883Z uuid:16857b4b
    return { relativePath, backupPath }; // time:2025-04-18T16:56:37.883Z uuid:7d43d9ed
  } catch (error) { // time:2025-04-18T16:56:37.883Z uuid:9a956aa9
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.883Z uuid:ff0c0d85
    return null; // time:2025-04-18T16:56:37.883Z uuid:864369a3
  } // time:2025-04-18T16:56:37.883Z uuid:a6cf9ce5
} // time:2025-04-18T16:56:37.883Z uuid:ad858cab
// time:2025-04-18T16:56:37.883Z uuid:c3989ab8
function addUUIDsToFile(filePath) { // time:2025-04-18T16:56:37.883Z uuid:2dcdc3dc
  try { // time:2025-04-18T16:56:37.883Z uuid:3c087e2d
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:56:37.883Z uuid:123eeab0
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:56:37.883Z uuid:bea4a03c
      return null; // time:2025-04-18T16:56:37.883Z uuid:ba351bad
    } // time:2025-04-18T16:56:37.883Z uuid:ecb88896
// time:2025-04-18T16:56:37.883Z uuid:ce3f4c81
// time:2025-04-18T16:56:37.883Z uuid:1294cc3d
    const backup = backupFile(filePath); // time:2025-04-18T16:56:37.883Z uuid:6d334cc4
    if (!backup) return null; // time:2025-04-18T16:56:37.883Z uuid:d5bfb1c9
// time:2025-04-18T16:56:37.883Z uuid:0dfbcb30
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:56:37.883Z uuid:43d2d16d
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:56:37.883Z uuid:d0b2f151
// time:2025-04-18T16:56:37.883Z uuid:a8caa2e0
// time:2025-04-18T16:56:37.883Z uuid:cd5f3702
    let metaParts = []; // time:2025-04-18T16:56:37.883Z uuid:ada4c4b6
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:56:37.883Z uuid:aaadca34
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:56:37.883Z uuid:e521f9aa
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:56:37.883Z uuid:0038cccc
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:56:37.883Z uuid:34a513a8
// time:2025-04-18T16:56:37.883Z uuid:f0ebcdad
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.883Z uuid:282ef712
    const lines = content.split('\n'); // time:2025-04-18T16:56:37.883Z uuid:2f91ef7e
// time:2025-04-18T16:56:37.883Z uuid:fffb4af1
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:56:37.883Z uuid:bcc8aa7d
      const lineNumber = index + 1; // time:2025-04-18T16:56:37.883Z uuid:4838967e
      let cleanLine = line; // time:2025-04-18T16:56:37.883Z uuid:0b6cd76c
// time:2025-04-18T16:56:37.883Z uuid:a1513a77
      if (line.includes(' // time:2025-04-18T16:56:37.883Z uuid:89441a24
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:56:37.883Z uuid:b1021545
      } // time:2025-04-18T16:56:37.883Z uuid:d5f70469
// time:2025-04-18T16:56:37.883Z uuid:36cb9ca9
      let comment = ' // time:2025-04-18T16:56:37.883Z uuid:7c2d6f36
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:56:37.883Z uuid:46b5bbf6
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:56:37.883Z uuid:157e2f4a
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:56:37.883Z uuid:29514e49
// time:2025-04-18T16:56:37.883Z uuid:f3c6cdb9
      if (cleanLine.trim() === '') { // time:2025-04-18T16:56:37.883Z uuid:59b4aa5f
        return comment.trim(); // time:2025-04-18T16:56:37.883Z uuid:7a696254
      } // time:2025-04-18T16:56:37.883Z uuid:58f3e201
// time:2025-04-18T16:56:37.883Z uuid:0cfe7e59
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:56:37.883Z uuid:79e3e2a0
    }); // time:2025-04-18T16:56:37.883Z uuid:df4d5825
// time:2025-04-18T16:56:37.883Z uuid:f4d3e05a
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:56:37.883Z uuid:41a534a4
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:56:37.883Z uuid:8cbd8ae1
// time:2025-04-18T16:56:37.883Z uuid:ec81271c
    return backup; // time:2025-04-18T16:56:37.883Z uuid:755a8979
  } catch (error) { // time:2025-04-18T16:56:37.883Z uuid:e8d3fd7d
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.883Z uuid:34eaea23
    return null; // time:2025-04-18T16:56:37.883Z uuid:27b5f963
  } // time:2025-04-18T16:56:37.883Z uuid:f91d5a6a
} // time:2025-04-18T16:56:37.883Z uuid:a6ccc110
// time:2025-04-18T16:56:37.883Z uuid:bd590aa9
function processDirectory(dirPath) { // time:2025-04-18T16:56:37.883Z uuid:1ec0a05a
  const modifiedFiles = []; // time:2025-04-18T16:56:37.883Z uuid:ef220cfe
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:56:37.883Z uuid:ab0f11cd
// time:2025-04-18T16:56:37.883Z uuid:b77f0765
  for (const entry of entries) { // time:2025-04-18T16:56:37.883Z uuid:2287d20f
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:56:37.883Z uuid:c982062d
// time:2025-04-18T16:56:37.883Z uuid:b1536ffd
    if (entry.isDirectory()) { // time:2025-04-18T16:56:37.883Z uuid:44573f73
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:56:37.883Z uuid:4a28b2fb
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:56:37.883Z uuid:00c648ea
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:56:37.883Z uuid:0525d3a6
      } // time:2025-04-18T16:56:37.883Z uuid:4b2b3a17
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:56:37.883Z uuid:482c491e
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:56:37.883Z uuid:8f87aa40
      if (result) { // time:2025-04-18T16:56:37.883Z uuid:22405a54
        modifiedFiles.push(result); // time:2025-04-18T16:56:37.883Z uuid:7668f020
      } // time:2025-04-18T16:56:37.883Z uuid:b056a372
    } // time:2025-04-18T16:56:37.883Z uuid:0d2d9b38
  } // time:2025-04-18T16:56:37.883Z uuid:17006e69
// time:2025-04-18T16:56:37.883Z uuid:be9c5af1
  return modifiedFiles; // time:2025-04-18T16:56:37.883Z uuid:c05c5af5
} // time:2025-04-18T16:56:37.883Z uuid:6392a704
// time:2025-04-18T16:56:37.883Z uuid:3651a9d1
function rollbackLastRun() { // time:2025-04-18T16:56:37.883Z uuid:32d41dda
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:56:37.883Z uuid:75229bb5
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:56:37.883Z uuid:b52a55bd
    return; // time:2025-04-18T16:56:37.883Z uuid:07fd783b
  } // time:2025-04-18T16:56:37.883Z uuid:b8afb7a8
// time:2025-04-18T16:56:37.883Z uuid:5be6e522
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:56:37.883Z uuid:1aaa8b51
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:56:37.883Z uuid:201b5aee
// time:2025-04-18T16:56:37.883Z uuid:a1764fed
  let successCount = 0; // time:2025-04-18T16:56:37.883Z uuid:40fe12cc
// time:2025-04-18T16:56:37.883Z uuid:f6c4a25a
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:56:37.883Z uuid:697a274d
    try { // time:2025-04-18T16:56:37.883Z uuid:24f21507
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:56:37.883Z uuid:977d7942
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:56:37.883Z uuid:dbca0fc4
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:56:37.883Z uuid:8bb3de50
// time:2025-04-18T16:56:37.883Z uuid:db8bf3b7
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:56:37.883Z uuid:6ecea68e
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:56:37.883Z uuid:12169887
        successCount++; // time:2025-04-18T16:56:37.883Z uuid:0cada2e6
      } else { // time:2025-04-18T16:56:37.883Z uuid:ec7bf4df
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:56:37.883Z uuid:c6f2b28b
      } // time:2025-04-18T16:56:37.883Z uuid:73ee013d
    } catch (error) { // time:2025-04-18T16:56:37.883Z uuid:9a83e0d2
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:56:37.883Z uuid:ce56421c
    } // time:2025-04-18T16:56:37.883Z uuid:c6721768
  } // time:2025-04-18T16:56:37.883Z uuid:42710e94
// time:2025-04-18T16:56:37.883Z uuid:8667d13a
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:56:37.883Z uuid:65cecac9
// time:2025-04-18T16:56:37.883Z uuid:887f78b8
// time:2025-04-18T16:56:37.883Z uuid:83baa03e
  lastRunInfo = { // time:2025-04-18T16:56:37.883Z uuid:d1d28a41
    timestamp: null, // time:2025-04-18T16:56:37.883Z uuid:7dbc0b5d
    files: [] // time:2025-04-18T16:56:37.883Z uuid:4efabc1f
  }; // time:2025-04-18T16:56:37.883Z uuid:0710978b
// time:2025-04-18T16:56:37.883Z uuid:28810b86
  saveConfig(); // time:2025-04-18T16:56:37.883Z uuid:1150cb46
} // time:2025-04-18T16:56:37.883Z uuid:809c637a
// time:2025-04-18T16:56:37.883Z uuid:61a72bd4
function runUUIDProcess() { // time:2025-04-18T16:56:37.883Z uuid:59707895
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:56:37.883Z uuid:735d3dd0
// time:2025-04-18T16:56:37.883Z uuid:bb77398d
// time:2025-04-18T16:56:37.883Z uuid:f126286f
  lastRunInfo = { // time:2025-04-18T16:56:37.883Z uuid:ef4c5440
    timestamp: Date.now(), // time:2025-04-18T16:56:37.883Z uuid:54544c63
    files: modifiedFiles // time:2025-04-18T16:56:37.883Z uuid:71affbf4
  }; // time:2025-04-18T16:56:37.883Z uuid:8579381e
// time:2025-04-18T16:56:37.883Z uuid:9c355fe9
  saveConfig(); // time:2025-04-18T16:56:37.883Z uuid:6d2a8ab7
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:56:37.883Z uuid:aff11de8
} // time:2025-04-18T16:56:37.883Z uuid:3e690e85
// time:2025-04-18T16:56:37.883Z uuid:45d77ec8
function showMenu() { // time:2025-04-18T16:56:37.883Z uuid:21630a11
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.883Z uuid:68c1e500
    input: process.stdin, // time:2025-04-18T16:56:37.883Z uuid:98c3a825
    output: process.stdout // time:2025-04-18T16:56:37.883Z uuid:d93f739f
  }); // time:2025-04-18T16:56:37.883Z uuid:71a28932
// time:2025-04-18T16:56:37.883Z uuid:2b8975bc
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:56:37.883Z uuid:5e83d42f
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.883Z uuid:4e2790cb
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.883Z uuid:76a77564
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.883Z uuid:a4d7a184
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.883Z uuid:5f583861
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:56:37.883Z uuid:99444bad
  console.log('6. Save and Run'); // time:2025-04-18T16:56:37.883Z uuid:e0f590d4
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:56:37.883Z uuid:caf2b154
  console.log('8. Exit'); // time:2025-04-18T16:56:37.883Z uuid:3872a970
// time:2025-04-18T16:56:37.883Z uuid:8a8d5c22
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.883Z uuid:caaaa0bb
    switch(answer) { // time:2025-04-18T16:56:37.883Z uuid:7699620b
      case '1': // time:2025-04-18T16:56:37.883Z uuid:db433e27
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:56:37.883Z uuid:c515fa00
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:a8e5e3bb
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:fec44355
        break; // time:2025-04-18T16:56:37.883Z uuid:a4bba5d2
      case '2': // time:2025-04-18T16:56:37.883Z uuid:f0fbba7a
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:56:37.883Z uuid:c6b8536e
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:f851e710
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:7282301f
        break; // time:2025-04-18T16:56:37.883Z uuid:9252324d
      case '3': // time:2025-04-18T16:56:37.883Z uuid:e060b373
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:56:37.883Z uuid:89fa542d
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:7724b00e
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:28037db0
        break; // time:2025-04-18T16:56:37.883Z uuid:a03df6c9
      case '4': // time:2025-04-18T16:56:37.883Z uuid:d684ad25
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:56:37.883Z uuid:c76bb5ba
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:fdaea369
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:a0bead02
        break; // time:2025-04-18T16:56:37.883Z uuid:cd06add3
      case '5': // time:2025-04-18T16:56:37.883Z uuid:4ab89f13
        config = { // time:2025-04-18T16:56:37.883Z uuid:0b94547e
          includeBranch: true, // time:2025-04-18T16:56:37.883Z uuid:ccac9cbf
          includeCommit: true, // time:2025-04-18T16:56:37.883Z uuid:238734e3
          includeTimestamp: true, // time:2025-04-18T16:56:37.883Z uuid:4e9f2b88
          includeLineNumber: true // time:2025-04-18T16:56:37.883Z uuid:06c2a333
        }; // time:2025-04-18T16:56:37.883Z uuid:dec55c66
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:9e81c6e8
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:64d9e5c0
        break; // time:2025-04-18T16:56:37.883Z uuid:2ca26191
      case '6': // time:2025-04-18T16:56:37.883Z uuid:0f902304
        saveConfig(); // time:2025-04-18T16:56:37.883Z uuid:104abece
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:5f91c78e
        runUUIDProcess(); // time:2025-04-18T16:56:37.883Z uuid:02eedafa
        break; // time:2025-04-18T16:56:37.883Z uuid:b0726fd5
      case '7': // time:2025-04-18T16:56:37.883Z uuid:9a0c4789
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:858e0a69
        rollbackLastRun(); // time:2025-04-18T16:56:37.883Z uuid:60575eee
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:d7340431
        break; // time:2025-04-18T16:56:37.883Z uuid:67d2ad56
      case '8': // time:2025-04-18T16:56:37.883Z uuid:3dc984a6
        console.log('Exiting without changes.'); // time:2025-04-18T16:56:37.883Z uuid:8ce92922
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:64a867ed
        break; // time:2025-04-18T16:56:37.883Z uuid:d8f92f77
      default: // time:2025-04-18T16:56:37.883Z uuid:0d419b2d
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.883Z uuid:d0227d51
        rl.close(); // time:2025-04-18T16:56:37.883Z uuid:2038f65f
        showMenu(); // time:2025-04-18T16:56:37.883Z uuid:94e63fc1
    } // time:2025-04-18T16:56:37.883Z uuid:5391e18e
  }); // time:2025-04-18T16:56:37.883Z uuid:2b19eb17
} // time:2025-04-18T16:56:37.883Z uuid:88994a69
// time:2025-04-18T16:56:37.883Z uuid:0aeee5d2
// time:2025-04-18T16:56:37.883Z uuid:8d025eb9
function main() { // time:2025-04-18T16:56:37.883Z uuid:d062c548
  loadConfig(); // time:2025-04-18T16:56:37.883Z uuid:cc8e2815
// time:2025-04-18T16:56:37.883Z uuid:66cf074d
  if (process.argv.length > 2) { // time:2025-04-18T16:56:37.883Z uuid:13829fc7
    if (process.argv[2] === '--run') { // time:2025-04-18T16:56:37.883Z uuid:c44f4dbb
// time:2025-04-18T16:56:37.883Z uuid:2a6582f0
      runUUIDProcess(); // time:2025-04-18T16:56:37.883Z uuid:eac5642a
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:56:37.883Z uuid:339d91eb
// time:2025-04-18T16:56:37.883Z uuid:6d850eae
      rollbackLastRun(); // time:2025-04-18T16:56:37.883Z uuid:554ebd10
    } else { // time:2025-04-18T16:56:37.883Z uuid:b146784d
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:56:37.883Z uuid:2c3b3d44
    } // time:2025-04-18T16:56:37.883Z uuid:5d536312
  } else { // time:2025-04-18T16:56:37.883Z uuid:ce8696bf
// time:2025-04-18T16:56:37.883Z uuid:ca539b3a
    showMenu(); // time:2025-04-18T16:56:37.883Z uuid:6f95d89f
  } // time:2025-04-18T16:56:37.883Z uuid:4d3ddc34
} // time:2025-04-18T16:56:37.883Z uuid:a4b25858
// time:2025-04-18T16:56:37.883Z uuid:bfcd347b
main(); // time:2025-04-18T16:56:37.883Z uuid:b3e636ca