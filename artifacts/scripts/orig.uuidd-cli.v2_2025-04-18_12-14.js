// time:2025-04-18T16:51:25.953Z uuid:038fb5ee
// time:2025-04-18T16:51:25.953Z uuid:4228f0fa
// time:2025-04-18T16:51:25.953Z uuid:ea725ec6
// time:2025-04-18T16:51:25.953Z uuid:ea34da64
// time:2025-04-18T16:51:25.953Z uuid:dc95050f
// time:2025-04-18T16:51:25.953Z uuid:703a3cc9
// time:2025-04-18T16:51:25.953Z uuid:a7922b25
// time:2025-04-18T16:51:25.953Z uuid:bac4b7bc
// time:2025-04-18T16:51:25.953Z uuid:d7ca8d45
// time:2025-04-18T16:51:25.953Z uuid:314f8471
const fs = require('fs'); // time:2025-04-18T16:51:25.953Z uuid:294ea885
const path = require('path'); // time:2025-04-18T16:51:25.953Z uuid:553d040c
const crypto = require('crypto'); // time:2025-04-18T16:51:25.953Z uuid:d5465072
const { execSync } = require('child_process'); // time:2025-04-18T16:51:25.953Z uuid:a78d7982
const readline = require('readline'); // time:2025-04-18T16:51:25.953Z uuid:368b0ff9
// time:2025-04-18T16:51:25.953Z uuid:34d1b720
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:51:25.953Z uuid:3160a501
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:51:25.953Z uuid:a9715682
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:51:25.953Z uuid:db6e95ba
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:51:25.953Z uuid:0b2d9347
// time:2025-04-18T16:51:25.953Z uuid:b2bb4e40
// time:2025-04-18T16:51:25.953Z uuid:017af9c6
let config = { // time:2025-04-18T16:51:25.953Z uuid:bdd02f19
  includeBranch: true, // time:2025-04-18T16:51:25.953Z uuid:fe77e9ef
  includeCommit: true, // time:2025-04-18T16:51:25.953Z uuid:614dcfc3
  includeTimestamp: true, // time:2025-04-18T16:51:25.953Z uuid:434d5cca
  includeLineNumber: true // time:2025-04-18T16:51:25.953Z uuid:6f37859e
}; // time:2025-04-18T16:51:25.953Z uuid:7510235c
// time:2025-04-18T16:51:25.953Z uuid:c89aff59
// time:2025-04-18T16:51:25.953Z uuid:26da5ad1
let lastRunInfo = { // time:2025-04-18T16:51:25.953Z uuid:32f032ba
  timestamp: null, // time:2025-04-18T16:51:25.953Z uuid:dac60d19
  files: [] // time:2025-04-18T16:51:25.953Z uuid:b0b5ed33
}; // time:2025-04-18T16:51:25.953Z uuid:8c12c028
// time:2025-04-18T16:51:25.953Z uuid:f85b50e9
function generateShortUUID() { // time:2025-04-18T16:51:25.953Z uuid:c7822c86
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:51:25.953Z uuid:ce872b32
} // time:2025-04-18T16:51:25.953Z uuid:2e660037
// time:2025-04-18T16:51:25.953Z uuid:ce2f6bff
function getGitInfo() { // time:2025-04-18T16:51:25.953Z uuid:aae149b2
  try { // time:2025-04-18T16:51:25.953Z uuid:4e0331e1
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:51:25.953Z uuid:780f4c20
    let branch; // time:2025-04-18T16:51:25.953Z uuid:499711cb
// time:2025-04-18T16:51:25.953Z uuid:bb33d013
// time:2025-04-18T16:51:25.953Z uuid:dc2658ac
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:51:25.953Z uuid:537c0a06
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:51:25.953Z uuid:c169419b
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:51:25.953Z uuid:a0b466cf
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:51:25.953Z uuid:03ba28be
    } else { // time:2025-04-18T16:51:25.953Z uuid:1c3c30e5
// time:2025-04-18T16:51:25.953Z uuid:b8c44fd1
      branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.953Z uuid:ecf21887
    } // time:2025-04-18T16:51:25.953Z uuid:d30c5f32
// time:2025-04-18T16:51:25.953Z uuid:9b61858d
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.953Z uuid:251a3a60
    return { branch, lastCommit }; // time:2025-04-18T16:51:25.953Z uuid:73eb077a
  } catch (error) { // time:2025-04-18T16:51:25.953Z uuid:8f986f1a
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:51:25.953Z uuid:1f1f37f8
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:51:25.953Z uuid:da3f7749
  } // time:2025-04-18T16:51:25.953Z uuid:02fbedf0
} // time:2025-04-18T16:51:25.953Z uuid:e306391e
// time:2025-04-18T16:51:25.953Z uuid:2e51b799
function loadConfig() { // time:2025-04-18T16:51:25.953Z uuid:f0d26074
  try { // time:2025-04-18T16:51:25.953Z uuid:87c8627a
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:51:25.953Z uuid:31623e0c
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:51:25.953Z uuid:50e8e3d2
      const data = JSON.parse(fileContent); // time:2025-04-18T16:51:25.953Z uuid:2709af45
// time:2025-04-18T16:51:25.953Z uuid:cb9f88b6
// time:2025-04-18T16:51:25.953Z uuid:16f692d3
      if (data.config) { // time:2025-04-18T16:51:25.953Z uuid:86602b5a
        config = data.config; // time:2025-04-18T16:51:25.953Z uuid:7df8d8d3
      } // time:2025-04-18T16:51:25.953Z uuid:a783eecd
// time:2025-04-18T16:51:25.953Z uuid:06dfa31d
// time:2025-04-18T16:51:25.953Z uuid:36d0de47
      if (data.lastRun) { // time:2025-04-18T16:51:25.953Z uuid:127621e3
        lastRunInfo = data.lastRun; // time:2025-04-18T16:51:25.953Z uuid:b1460dc4
      } // time:2025-04-18T16:51:25.953Z uuid:40ebc036
// time:2025-04-18T16:51:25.953Z uuid:f22802a2
      console.log('Loaded configuration:', config); // time:2025-04-18T16:51:25.953Z uuid:b70da256
    } // time:2025-04-18T16:51:25.953Z uuid:09b0ebe4
  } catch (error) { // time:2025-04-18T16:51:25.953Z uuid:bc94383c
    console.error('Error loading config:', error.message); // time:2025-04-18T16:51:25.953Z uuid:fa1e675b
  } // time:2025-04-18T16:51:25.953Z uuid:13c7abb1
} // time:2025-04-18T16:51:25.953Z uuid:cec24ebd
// time:2025-04-18T16:51:25.953Z uuid:43aced58
function saveConfig() { // time:2025-04-18T16:51:25.953Z uuid:948d46b4
  try { // time:2025-04-18T16:51:25.953Z uuid:a256690c
// time:2025-04-18T16:51:25.953Z uuid:cb4955d8
    const data = { // time:2025-04-18T16:51:25.953Z uuid:501e1c73
      config, // time:2025-04-18T16:51:25.953Z uuid:9bd47424
      lastRun: lastRunInfo // time:2025-04-18T16:51:25.953Z uuid:8a4328ab
    }; // time:2025-04-18T16:51:25.953Z uuid:962c45c8
// time:2025-04-18T16:51:25.953Z uuid:7e81094e
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:51:25.953Z uuid:cb3524dd
    console.log('Configuration saved.'); // time:2025-04-18T16:51:25.953Z uuid:14018395
  } catch (error) { // time:2025-04-18T16:51:25.953Z uuid:85470e18
    console.error('Error saving config:', error.message); // time:2025-04-18T16:51:25.953Z uuid:fc74a1be
  } // time:2025-04-18T16:51:25.953Z uuid:9305a48a
} // time:2025-04-18T16:51:25.953Z uuid:cf59c710
// time:2025-04-18T16:51:25.953Z uuid:32f8689a
function ensureBackupDir() { // time:2025-04-18T16:51:25.953Z uuid:fb5d3517
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:51:25.953Z uuid:b8da230f
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:51:25.953Z uuid:2be5519c
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:51:25.953Z uuid:2b7ba1ba
  } // time:2025-04-18T16:51:25.953Z uuid:71f85d87
} // time:2025-04-18T16:51:25.953Z uuid:b8caf1bd
// time:2025-04-18T16:51:25.953Z uuid:307f4c2c
function backupFile(filePath) { // time:2025-04-18T16:51:25.953Z uuid:9a3c12b7
  try { // time:2025-04-18T16:51:25.953Z uuid:3ab6ff9a
    ensureBackupDir(); // time:2025-04-18T16:51:25.953Z uuid:042e5179
// time:2025-04-18T16:51:25.953Z uuid:a15fa7fe
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.953Z uuid:4f479b8b
    const fileName = path.basename(filePath); // time:2025-04-18T16:51:25.953Z uuid:3e2b75ac
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:51:25.953Z uuid:8fd32637
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:51:25.953Z uuid:a0f8e40a
// time:2025-04-18T16:51:25.953Z uuid:b9ca9bae
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:51:25.953Z uuid:98daf5bb
    return { relativePath, backupPath }; // time:2025-04-18T16:51:25.953Z uuid:cf122658
  } catch (error) { // time:2025-04-18T16:51:25.953Z uuid:b54224c4
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.953Z uuid:c49d129b
    return null; // time:2025-04-18T16:51:25.953Z uuid:d2a83777
  } // time:2025-04-18T16:51:25.953Z uuid:ba7961bf
} // time:2025-04-18T16:51:25.953Z uuid:cf67b3e0
// time:2025-04-18T16:51:25.953Z uuid:e7052624
function addUUIDsToFile(filePath) { // time:2025-04-18T16:51:25.953Z uuid:644c03fc
  try { // time:2025-04-18T16:51:25.953Z uuid:d01710f1
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:51:25.953Z uuid:39a2f081
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:51:25.953Z uuid:b439eebf
      return null; // time:2025-04-18T16:51:25.953Z uuid:4043db06
    } // time:2025-04-18T16:51:25.953Z uuid:e3b403d2
// time:2025-04-18T16:51:25.953Z uuid:a84e0445
// time:2025-04-18T16:51:25.953Z uuid:5a76ef2e
    const backup = backupFile(filePath); // time:2025-04-18T16:51:25.953Z uuid:9df13f77
    if (!backup) return null; // time:2025-04-18T16:51:25.953Z uuid:ee27cc68
// time:2025-04-18T16:51:25.953Z uuid:6a35b0bb
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:51:25.953Z uuid:70ea7e71
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:51:25.953Z uuid:a2767123
// time:2025-04-18T16:51:25.953Z uuid:ccb310d5
// time:2025-04-18T16:51:25.953Z uuid:637875c3
    let metaParts = []; // time:2025-04-18T16:51:25.953Z uuid:adad500d
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:51:25.953Z uuid:8b6254c3
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:51:25.953Z uuid:c746c493
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:51:25.953Z uuid:bad86b68
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:51:25.953Z uuid:b74e312d
// time:2025-04-18T16:51:25.953Z uuid:94bee2b5
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.953Z uuid:cb3a470b
    const lines = content.split('\n'); // time:2025-04-18T16:51:25.953Z uuid:76ba4926
// time:2025-04-18T16:51:25.953Z uuid:aec706ed
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:51:25.953Z uuid:9da78f1e
      const lineNumber = index + 1; // time:2025-04-18T16:51:25.953Z uuid:1cbe83de
      let cleanLine = line; // time:2025-04-18T16:51:25.953Z uuid:47e3abc3
// time:2025-04-18T16:51:25.953Z uuid:6d6e27a9
      if (line.includes(' // time:2025-04-18T16:51:25.953Z uuid:d1ccb967
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:51:25.953Z uuid:71817962
      } // time:2025-04-18T16:51:25.953Z uuid:23a37851
// time:2025-04-18T16:51:25.953Z uuid:2a4deec0
      let comment = ' // time:2025-04-18T16:51:25.953Z uuid:c1f553e5
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:51:25.953Z uuid:a2124f94
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:51:25.953Z uuid:2265d4f8
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:51:25.953Z uuid:ae41d3c1
// time:2025-04-18T16:51:25.953Z uuid:b7d0078d
      if (cleanLine.trim() === '') { // time:2025-04-18T16:51:25.953Z uuid:bdf15456
        return comment.trim(); // time:2025-04-18T16:51:25.953Z uuid:d4b5751c
      } // time:2025-04-18T16:51:25.953Z uuid:24f4838f
// time:2025-04-18T16:51:25.953Z uuid:7adbe896
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:51:25.953Z uuid:d7001985
    }); // time:2025-04-18T16:51:25.953Z uuid:caee7767
// time:2025-04-18T16:51:25.953Z uuid:7c6ff136
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:51:25.953Z uuid:cad36346
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:51:25.953Z uuid:33cafe1e
// time:2025-04-18T16:51:25.953Z uuid:f9066736
    return backup; // time:2025-04-18T16:51:25.953Z uuid:6c167e36
  } catch (error) { // time:2025-04-18T16:51:25.953Z uuid:2075b7b8
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.953Z uuid:31d685ae
    return null; // time:2025-04-18T16:51:25.953Z uuid:0f9a9957
  } // time:2025-04-18T16:51:25.953Z uuid:8b86a965
} // time:2025-04-18T16:51:25.953Z uuid:2f7beba3
// time:2025-04-18T16:51:25.953Z uuid:b70e5763
function processDirectory(dirPath) { // time:2025-04-18T16:51:25.953Z uuid:489584a2
  const modifiedFiles = []; // time:2025-04-18T16:51:25.953Z uuid:8bd15891
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:51:25.953Z uuid:07d331b9
// time:2025-04-18T16:51:25.953Z uuid:3c8b0f5d
  for (const entry of entries) { // time:2025-04-18T16:51:25.953Z uuid:36a500f5
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:51:25.953Z uuid:d2a5fff9
// time:2025-04-18T16:51:25.953Z uuid:3f93a692
    if (entry.isDirectory()) { // time:2025-04-18T16:51:25.953Z uuid:80eb5012
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:51:25.953Z uuid:4c9dfb64
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:51:25.953Z uuid:e3f3ef2b
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:51:25.953Z uuid:36a26b81
      } // time:2025-04-18T16:51:25.953Z uuid:c0618ec3
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:51:25.953Z uuid:533820ed
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:51:25.953Z uuid:a394c979
      if (result) { // time:2025-04-18T16:51:25.953Z uuid:1e91038e
        modifiedFiles.push(result); // time:2025-04-18T16:51:25.953Z uuid:d6faa59f
      } // time:2025-04-18T16:51:25.953Z uuid:3a5ee356
    } // time:2025-04-18T16:51:25.953Z uuid:1e889aa2
  } // time:2025-04-18T16:51:25.953Z uuid:73c243a3
// time:2025-04-18T16:51:25.953Z uuid:1f75d78b
  return modifiedFiles; // time:2025-04-18T16:51:25.953Z uuid:b8f806ad
} // time:2025-04-18T16:51:25.953Z uuid:68156b0d
// time:2025-04-18T16:51:25.953Z uuid:5818a42d
function rollbackLastRun() { // time:2025-04-18T16:51:25.953Z uuid:fb71198c
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:51:25.953Z uuid:eac8b565
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:51:25.953Z uuid:c386fc93
    return; // time:2025-04-18T16:51:25.953Z uuid:7bf8a879
  } // time:2025-04-18T16:51:25.953Z uuid:a1d6fab9
// time:2025-04-18T16:51:25.953Z uuid:ee3b3157
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:51:25.953Z uuid:2dcb81ff
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:51:25.953Z uuid:9f410447
// time:2025-04-18T16:51:25.953Z uuid:4734f7e6
  let successCount = 0; // time:2025-04-18T16:51:25.953Z uuid:8d4b5dec
// time:2025-04-18T16:51:25.953Z uuid:7695083c
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:51:25.953Z uuid:c03e87f3
    try { // time:2025-04-18T16:51:25.953Z uuid:cecedf5b
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:51:25.953Z uuid:16586794
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:51:25.953Z uuid:562ac89d
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:51:25.953Z uuid:48239fec
// time:2025-04-18T16:51:25.953Z uuid:3ecd7c28
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:51:25.953Z uuid:63553cc8
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:51:25.953Z uuid:a7f65488
        successCount++; // time:2025-04-18T16:51:25.953Z uuid:b452c363
      } else { // time:2025-04-18T16:51:25.953Z uuid:172f0046
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:51:25.953Z uuid:1cc18db9
      } // time:2025-04-18T16:51:25.953Z uuid:60fa25af
    } catch (error) { // time:2025-04-18T16:51:25.953Z uuid:b77254f6
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:51:25.953Z uuid:0cf08c20
    } // time:2025-04-18T16:51:25.953Z uuid:eeb05955
  } // time:2025-04-18T16:51:25.953Z uuid:178a27d6
// time:2025-04-18T16:51:25.953Z uuid:2f174a8f
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:51:25.953Z uuid:d9c25503
// time:2025-04-18T16:51:25.953Z uuid:325cfe2b
// time:2025-04-18T16:51:25.953Z uuid:393a0d97
  lastRunInfo = { // time:2025-04-18T16:51:25.953Z uuid:ac78bbfe
    timestamp: null, // time:2025-04-18T16:51:25.953Z uuid:4e333ce6
    files: [] // time:2025-04-18T16:51:25.953Z uuid:a73d044f
  }; // time:2025-04-18T16:51:25.953Z uuid:744d1f72
// time:2025-04-18T16:51:25.953Z uuid:4cf5b214
  saveConfig(); // time:2025-04-18T16:51:25.953Z uuid:0537c64c
} // time:2025-04-18T16:51:25.953Z uuid:6e934c3e
// time:2025-04-18T16:51:25.953Z uuid:6c6ecfdd
function runUUIDProcess() { // time:2025-04-18T16:51:25.953Z uuid:cc2adebc
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:51:25.953Z uuid:ceee0624
// time:2025-04-18T16:51:25.953Z uuid:16a13c1e
// time:2025-04-18T16:51:25.953Z uuid:974c54c5
  lastRunInfo = { // time:2025-04-18T16:51:25.953Z uuid:f81431cb
    timestamp: Date.now(), // time:2025-04-18T16:51:25.953Z uuid:aab4683e
    files: modifiedFiles // time:2025-04-18T16:51:25.953Z uuid:8de7647c
  }; // time:2025-04-18T16:51:25.953Z uuid:340af783
// time:2025-04-18T16:51:25.953Z uuid:57776b25
  saveConfig(); // time:2025-04-18T16:51:25.953Z uuid:0cb7e449
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:51:25.953Z uuid:1de5717c
} // time:2025-04-18T16:51:25.953Z uuid:c5b65e17
// time:2025-04-18T16:51:25.953Z uuid:c38fa46c
function showMenu() { // time:2025-04-18T16:51:25.953Z uuid:9eedc888
  const rl = readline.createInterface({ // time:2025-04-18T16:51:25.953Z uuid:90c97be4
    input: process.stdin, // time:2025-04-18T16:51:25.953Z uuid:6725a56d
    output: process.stdout // time:2025-04-18T16:51:25.953Z uuid:6a53dee8
  }); // time:2025-04-18T16:51:25.953Z uuid:bc36f802
// time:2025-04-18T16:51:25.953Z uuid:adeb0468
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:51:25.953Z uuid:502db708
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.953Z uuid:d1020c28
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.953Z uuid:c4639ebd
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.953Z uuid:f379e921
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.953Z uuid:be504cb2
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:51:25.953Z uuid:084d11e4
  console.log('6. Save and Run'); // time:2025-04-18T16:51:25.953Z uuid:ad6b87d2
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:51:25.953Z uuid:0620f776
  console.log('8. Exit'); // time:2025-04-18T16:51:25.953Z uuid:b9b82558
// time:2025-04-18T16:51:25.953Z uuid:7a1c6feb
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:51:25.953Z uuid:113a7f08
    switch(answer) { // time:2025-04-18T16:51:25.953Z uuid:24f703b7
      case '1': // time:2025-04-18T16:51:25.953Z uuid:c2946308
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:51:25.953Z uuid:c21b0c98
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:04a74abe
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:604f34cd
        break; // time:2025-04-18T16:51:25.953Z uuid:67866b6d
      case '2': // time:2025-04-18T16:51:25.953Z uuid:8573536b
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:51:25.953Z uuid:27ecc046
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:c1a62fb2
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:4caf6164
        break; // time:2025-04-18T16:51:25.953Z uuid:4366c00e
      case '3': // time:2025-04-18T16:51:25.953Z uuid:eb270850
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:51:25.953Z uuid:c52e40a9
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:6196f60b
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:746094ab
        break; // time:2025-04-18T16:51:25.953Z uuid:214a1860
      case '4': // time:2025-04-18T16:51:25.953Z uuid:0bd29438
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:51:25.953Z uuid:abcd2432
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:41147ae0
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:8b6a69b9
        break; // time:2025-04-18T16:51:25.953Z uuid:47ef91bd
      case '5': // time:2025-04-18T16:51:25.953Z uuid:b9045691
        config = { // time:2025-04-18T16:51:25.953Z uuid:50f21c8c
          includeBranch: true, // time:2025-04-18T16:51:25.953Z uuid:026f99b3
          includeCommit: true, // time:2025-04-18T16:51:25.953Z uuid:bb31a415
          includeTimestamp: true, // time:2025-04-18T16:51:25.953Z uuid:178bb09e
          includeLineNumber: true // time:2025-04-18T16:51:25.953Z uuid:86282387
        }; // time:2025-04-18T16:51:25.953Z uuid:0e75d303
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:002d54df
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:86ec12fa
        break; // time:2025-04-18T16:51:25.953Z uuid:cf8540ad
      case '6': // time:2025-04-18T16:51:25.953Z uuid:eaea7b81
        saveConfig(); // time:2025-04-18T16:51:25.953Z uuid:04f9575e
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:580d809e
        runUUIDProcess(); // time:2025-04-18T16:51:25.953Z uuid:90ab0193
        break; // time:2025-04-18T16:51:25.953Z uuid:8f7028e4
      case '7': // time:2025-04-18T16:51:25.953Z uuid:80b9a06f
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:f7a88dfb
        rollbackLastRun(); // time:2025-04-18T16:51:25.953Z uuid:66ee105c
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:137058cf
        break; // time:2025-04-18T16:51:25.953Z uuid:a17c8fcb
      case '8': // time:2025-04-18T16:51:25.953Z uuid:7ae5d38a
        console.log('Exiting without changes.'); // time:2025-04-18T16:51:25.953Z uuid:8a19ef71
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:299efef3
        break; // time:2025-04-18T16:51:25.953Z uuid:b20cc4d1
      default: // time:2025-04-18T16:51:25.953Z uuid:3fc925e3
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:51:25.953Z uuid:dcd9567d
        rl.close(); // time:2025-04-18T16:51:25.953Z uuid:f1ee1747
        showMenu(); // time:2025-04-18T16:51:25.953Z uuid:3fdc4f35
    } // time:2025-04-18T16:51:25.953Z uuid:7ac6502a
  }); // time:2025-04-18T16:51:25.953Z uuid:e7252de3
} // time:2025-04-18T16:51:25.953Z uuid:011bf5cf
// time:2025-04-18T16:51:25.953Z uuid:061fbb9a
// time:2025-04-18T16:51:25.953Z uuid:854df4ab
function main() { // time:2025-04-18T16:51:25.953Z uuid:a29e3492
  loadConfig(); // time:2025-04-18T16:51:25.953Z uuid:20811dbf
// time:2025-04-18T16:51:25.953Z uuid:667d6cba
  if (process.argv.length > 2) { // time:2025-04-18T16:51:25.953Z uuid:d0639389
    if (process.argv[2] === '--run') { // time:2025-04-18T16:51:25.953Z uuid:59a0517e
// time:2025-04-18T16:51:25.953Z uuid:2857302d
      runUUIDProcess(); // time:2025-04-18T16:51:25.953Z uuid:7a24616f
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:51:25.953Z uuid:342bde5a
// time:2025-04-18T16:51:25.953Z uuid:6e79f7c6
      rollbackLastRun(); // time:2025-04-18T16:51:25.953Z uuid:c15227e2
    } else { // time:2025-04-18T16:51:25.953Z uuid:480f42d8
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:51:25.953Z uuid:12e3aac5
    } // time:2025-04-18T16:51:25.953Z uuid:106f3c65
  } else { // time:2025-04-18T16:51:25.953Z uuid:0a23786a
// time:2025-04-18T16:51:25.953Z uuid:0ad22d86
    showMenu(); // time:2025-04-18T16:51:25.953Z uuid:bc684b7c
  } // time:2025-04-18T16:51:25.953Z uuid:d64b3024
} // time:2025-04-18T16:51:25.953Z uuid:6576dfb2
// time:2025-04-18T16:51:25.953Z uuid:b628a780
main(); // time:2025-04-18T16:51:25.953Z uuid:a60c3b6b