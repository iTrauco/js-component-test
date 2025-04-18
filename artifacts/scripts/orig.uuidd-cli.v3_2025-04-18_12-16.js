// time:2025-04-18T16:56:37.913Z uuid:744df9ec
// time:2025-04-18T16:56:37.913Z uuid:ae59aa37
// time:2025-04-18T16:56:37.913Z uuid:f6be8814
// time:2025-04-18T16:56:37.913Z uuid:41604997
// time:2025-04-18T16:56:37.913Z uuid:52e76126
// time:2025-04-18T16:56:37.913Z uuid:d7e1d56e
// time:2025-04-18T16:56:37.913Z uuid:4774b774
// time:2025-04-18T16:56:37.913Z uuid:74625847
// time:2025-04-18T16:56:37.913Z uuid:f7707daf
// time:2025-04-18T16:56:37.913Z uuid:e87548d0
const fs = require('fs'); // time:2025-04-18T16:56:37.913Z uuid:906a53e0
const path = require('path'); // time:2025-04-18T16:56:37.913Z uuid:9e241b29
const crypto = require('crypto'); // time:2025-04-18T16:56:37.913Z uuid:113ba98f
const { execSync } = require('child_process'); // time:2025-04-18T16:56:37.913Z uuid:314c30a0
const readline = require('readline'); // time:2025-04-18T16:56:37.913Z uuid:9a72d75b
// time:2025-04-18T16:56:37.913Z uuid:f703c605
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:56:37.913Z uuid:8d6f38f3
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:56:37.913Z uuid:afecae6e
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:56:37.913Z uuid:994684a2
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:56:37.913Z uuid:4d796cc6
// time:2025-04-18T16:56:37.913Z uuid:d87020e3
// time:2025-04-18T16:56:37.913Z uuid:fe47e480
let config = { // time:2025-04-18T16:56:37.913Z uuid:49ae6d28
  includeBranch: true, // time:2025-04-18T16:56:37.913Z uuid:b47be471
  includeCommit: true, // time:2025-04-18T16:56:37.913Z uuid:89014ae5
  includeTimestamp: true, // time:2025-04-18T16:56:37.913Z uuid:d013fdbe
  includeLineNumber: true // time:2025-04-18T16:56:37.913Z uuid:d83bc53b
}; // time:2025-04-18T16:56:37.913Z uuid:fd7ca1e4
// time:2025-04-18T16:56:37.913Z uuid:25198684
// time:2025-04-18T16:56:37.913Z uuid:37365353
let lastRunInfo = { // time:2025-04-18T16:56:37.913Z uuid:31f18aea
  timestamp: null, // time:2025-04-18T16:56:37.913Z uuid:3dc40d8a
  files: [] // time:2025-04-18T16:56:37.913Z uuid:ecb82b4b
}; // time:2025-04-18T16:56:37.913Z uuid:ee2d461b
// time:2025-04-18T16:56:37.913Z uuid:6b45bb70
function generateShortUUID() { // time:2025-04-18T16:56:37.913Z uuid:b64b61cb
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:56:37.913Z uuid:53c976f6
} // time:2025-04-18T16:56:37.913Z uuid:b9657952
// time:2025-04-18T16:56:37.913Z uuid:c68477da
function getGitInfo() { // time:2025-04-18T16:56:37.913Z uuid:07c1233e
  try { // time:2025-04-18T16:56:37.913Z uuid:b7ade18d
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:56:37.913Z uuid:56feefc4
    let branch; // time:2025-04-18T16:56:37.913Z uuid:7542e793
// time:2025-04-18T16:56:37.913Z uuid:606343e2
// time:2025-04-18T16:56:37.913Z uuid:2f5bb7f7
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:56:37.913Z uuid:008f9a7f
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:56:37.913Z uuid:c93011d0
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:56:37.913Z uuid:81de9f1b
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:56:37.913Z uuid:c9cbb40b
    } else { // time:2025-04-18T16:56:37.913Z uuid:728db230
// time:2025-04-18T16:56:37.913Z uuid:67496b4a
      try { // time:2025-04-18T16:56:37.913Z uuid:232074c6
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.913Z uuid:f4a372c3
// time:2025-04-18T16:56:37.913Z uuid:3dac0de2
// time:2025-04-18T16:56:37.913Z uuid:be9c3fbc
        if (!branch) { // time:2025-04-18T16:56:37.913Z uuid:56d26966
          const gitStatusOutput = execSync('git status', { encoding: 'utf8' }); // time:2025-04-18T16:56:37.913Z uuid:5025e7aa
          const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/); // time:2025-04-18T16:56:37.913Z uuid:d484b767
          if (branchMatch && branchMatch[1]) { // time:2025-04-18T16:56:37.913Z uuid:2b10765b
            branch = branchMatch[1]; // time:2025-04-18T16:56:37.913Z uuid:61355ebc
          } // time:2025-04-18T16:56:37.913Z uuid:0d65dbe4
        } // time:2025-04-18T16:56:37.913Z uuid:49198be4
      } catch (branchError) { // time:2025-04-18T16:56:37.913Z uuid:8d39d7aa
        console.log('Error getting branch name:', branchError.message); // time:2025-04-18T16:56:37.913Z uuid:deccb6ab
      } // time:2025-04-18T16:56:37.913Z uuid:f25f7421
    } // time:2025-04-18T16:56:37.913Z uuid:d545d377
// time:2025-04-18T16:56:37.913Z uuid:8bbaf151
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.913Z uuid:ec149720
    return { branch, lastCommit }; // time:2025-04-18T16:56:37.913Z uuid:a65a2347
  } catch (error) { // time:2025-04-18T16:56:37.913Z uuid:2abe1d7a
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:56:37.913Z uuid:e3e85fcc
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:56:37.913Z uuid:73dde927
  } // time:2025-04-18T16:56:37.913Z uuid:fb68ee32
} // time:2025-04-18T16:56:37.913Z uuid:da84d7d3
// time:2025-04-18T16:56:37.913Z uuid:3dd9bd6b
function loadConfig() { // time:2025-04-18T16:56:37.913Z uuid:deabef1f
  try { // time:2025-04-18T16:56:37.913Z uuid:d4164cad
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:56:37.913Z uuid:5cc9cb5e
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:56:37.913Z uuid:a8eea7b5
      const data = JSON.parse(fileContent); // time:2025-04-18T16:56:37.913Z uuid:64805d34
// time:2025-04-18T16:56:37.913Z uuid:d4935967
// time:2025-04-18T16:56:37.913Z uuid:9d16ccfe
      if (data.config) { // time:2025-04-18T16:56:37.913Z uuid:518f39ec
        config = data.config; // time:2025-04-18T16:56:37.913Z uuid:fc7fee7d
      } // time:2025-04-18T16:56:37.913Z uuid:bdeb6f4f
// time:2025-04-18T16:56:37.913Z uuid:44775ab5
// time:2025-04-18T16:56:37.913Z uuid:45e8d209
      if (data.lastRun) { // time:2025-04-18T16:56:37.913Z uuid:47625b9a
        lastRunInfo = data.lastRun; // time:2025-04-18T16:56:37.913Z uuid:84d48212
      } // time:2025-04-18T16:56:37.913Z uuid:ce7fe893
// time:2025-04-18T16:56:37.913Z uuid:3a1224cd
      console.log('Loaded configuration:', config); // time:2025-04-18T16:56:37.913Z uuid:8fa5e096
    } // time:2025-04-18T16:56:37.913Z uuid:bb6e693a
  } catch (error) { // time:2025-04-18T16:56:37.913Z uuid:ddbc5c89
    console.error('Error loading config:', error.message); // time:2025-04-18T16:56:37.913Z uuid:50d18e9e
  } // time:2025-04-18T16:56:37.913Z uuid:8f202f2e
} // time:2025-04-18T16:56:37.913Z uuid:b0235bdd
// time:2025-04-18T16:56:37.913Z uuid:b9c4115c
function saveConfig() { // time:2025-04-18T16:56:37.913Z uuid:43c5503f
  try { // time:2025-04-18T16:56:37.913Z uuid:b6353193
// time:2025-04-18T16:56:37.913Z uuid:960b33c2
    const data = { // time:2025-04-18T16:56:37.913Z uuid:0f08060a
      config, // time:2025-04-18T16:56:37.913Z uuid:334314c7
      lastRun: lastRunInfo // time:2025-04-18T16:56:37.913Z uuid:0b6b9c5d
    }; // time:2025-04-18T16:56:37.913Z uuid:7dcf53b1
// time:2025-04-18T16:56:37.913Z uuid:7f860820
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:56:37.913Z uuid:d3c2b104
    console.log('Configuration saved.'); // time:2025-04-18T16:56:37.913Z uuid:84866e71
  } catch (error) { // time:2025-04-18T16:56:37.913Z uuid:d500856e
    console.error('Error saving config:', error.message); // time:2025-04-18T16:56:37.913Z uuid:5fdd50cd
  } // time:2025-04-18T16:56:37.913Z uuid:a66ce4e1
} // time:2025-04-18T16:56:37.913Z uuid:ea682589
// time:2025-04-18T16:56:37.913Z uuid:e55f7c4a
function ensureBackupDir() { // time:2025-04-18T16:56:37.913Z uuid:73710f0a
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:56:37.913Z uuid:fba8ef94
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:56:37.913Z uuid:6f885ff4
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:56:37.913Z uuid:d1fd5eb7
  } // time:2025-04-18T16:56:37.913Z uuid:96df4bf7
} // time:2025-04-18T16:56:37.913Z uuid:e2880eed
// time:2025-04-18T16:56:37.913Z uuid:b43c8029
function backupFile(filePath) { // time:2025-04-18T16:56:37.913Z uuid:373df1a3
  try { // time:2025-04-18T16:56:37.913Z uuid:b0f6dc77
    ensureBackupDir(); // time:2025-04-18T16:56:37.913Z uuid:b284e59f
// time:2025-04-18T16:56:37.913Z uuid:3ca04c5e
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.913Z uuid:a77b18af
    const fileName = path.basename(filePath); // time:2025-04-18T16:56:37.913Z uuid:b5d3b136
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:56:37.913Z uuid:53479b64
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:56:37.913Z uuid:246e468b
// time:2025-04-18T16:56:37.913Z uuid:e80552aa
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:56:37.913Z uuid:490fff6d
    return { relativePath, backupPath }; // time:2025-04-18T16:56:37.913Z uuid:04fc07d6
  } catch (error) { // time:2025-04-18T16:56:37.913Z uuid:72513d5a
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.913Z uuid:8af8760e
    return null; // time:2025-04-18T16:56:37.913Z uuid:9be6be39
  } // time:2025-04-18T16:56:37.913Z uuid:503ca889
} // time:2025-04-18T16:56:37.913Z uuid:812918dc
// time:2025-04-18T16:56:37.913Z uuid:105c568f
function addUUIDsToFile(filePath) { // time:2025-04-18T16:56:37.913Z uuid:98d8ae27
  try { // time:2025-04-18T16:56:37.913Z uuid:85ec1d57
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:56:37.913Z uuid:61432d5a
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:56:37.913Z uuid:895eee02
      return null; // time:2025-04-18T16:56:37.913Z uuid:931ea57c
    } // time:2025-04-18T16:56:37.913Z uuid:0a52a4de
// time:2025-04-18T16:56:37.913Z uuid:0869ddba
// time:2025-04-18T16:56:37.913Z uuid:b6f9f03d
    const backup = backupFile(filePath); // time:2025-04-18T16:56:37.913Z uuid:228dff74
    if (!backup) return null; // time:2025-04-18T16:56:37.913Z uuid:96aceb1a
// time:2025-04-18T16:56:37.913Z uuid:6db08a04
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:56:37.913Z uuid:86671acc
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:56:37.913Z uuid:9152a949
// time:2025-04-18T16:56:37.913Z uuid:01c051d0
// time:2025-04-18T16:56:37.913Z uuid:500d3399
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`); // time:2025-04-18T16:56:37.913Z uuid:9a584b98
// time:2025-04-18T16:56:37.913Z uuid:662fff54
// time:2025-04-18T16:56:37.913Z uuid:5bba319c
    let metaParts = []; // time:2025-04-18T16:56:37.913Z uuid:d785ed50
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`); // time:2025-04-18T16:56:37.913Z uuid:5584c7a9
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`); // time:2025-04-18T16:56:37.913Z uuid:30921cd6
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`); // time:2025-04-18T16:56:37.913Z uuid:c876195f
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:56:37.913Z uuid:3be711f6
// time:2025-04-18T16:56:37.913Z uuid:3e212b09
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.913Z uuid:54e05cf1
    const lines = content.split('\n'); // time:2025-04-18T16:56:37.913Z uuid:260934d9
// time:2025-04-18T16:56:37.913Z uuid:ba1d349d
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:56:37.913Z uuid:cced539f
      const lineNumber = index + 1; // time:2025-04-18T16:56:37.913Z uuid:58a4199e
      let cleanLine = line; // time:2025-04-18T16:56:37.913Z uuid:8a61966d
// time:2025-04-18T16:56:37.913Z uuid:0ce54af7
      if (line.includes(' // time:2025-04-18T16:56:37.913Z uuid:17dd58c2
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:56:37.913Z uuid:965ae2a9
      } // time:2025-04-18T16:56:37.913Z uuid:86d45753
// time:2025-04-18T16:56:37.913Z uuid:616e61c8
      let comment = ' // time:2025-04-18T16:56:37.913Z uuid:d6968a21
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:56:37.913Z uuid:47b722eb
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:56:37.913Z uuid:920e51c6
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:56:37.913Z uuid:4af352b9
// time:2025-04-18T16:56:37.913Z uuid:afc647ee
      if (cleanLine.trim() === '') { // time:2025-04-18T16:56:37.913Z uuid:97eba97e
        return comment.trim(); // time:2025-04-18T16:56:37.913Z uuid:d3ae274c
      } // time:2025-04-18T16:56:37.913Z uuid:781f4b6a
// time:2025-04-18T16:56:37.913Z uuid:75df1e67
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:56:37.913Z uuid:74b5f00a
    }); // time:2025-04-18T16:56:37.913Z uuid:f69abfc2
// time:2025-04-18T16:56:37.913Z uuid:8510b60a
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:56:37.913Z uuid:c378106a
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:56:37.913Z uuid:bcc26a6a
// time:2025-04-18T16:56:37.913Z uuid:bdcbc6b0
    return backup; // time:2025-04-18T16:56:37.913Z uuid:42abaf76
  } catch (error) { // time:2025-04-18T16:56:37.913Z uuid:ca106434
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.913Z uuid:a2ffe585
    return null; // time:2025-04-18T16:56:37.913Z uuid:07acd4f3
  } // time:2025-04-18T16:56:37.913Z uuid:71659aed
} // time:2025-04-18T16:56:37.913Z uuid:3277af76
// time:2025-04-18T16:56:37.913Z uuid:3aaa9f51
function processDirectory(dirPath) { // time:2025-04-18T16:56:37.913Z uuid:8fce7d55
  const modifiedFiles = []; // time:2025-04-18T16:56:37.913Z uuid:81011eac
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:56:37.913Z uuid:34a10c70
// time:2025-04-18T16:56:37.913Z uuid:344a233f
  for (const entry of entries) { // time:2025-04-18T16:56:37.913Z uuid:e27a221a
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:56:37.913Z uuid:a814b838
// time:2025-04-18T16:56:37.913Z uuid:4b6ea29f
    if (entry.isDirectory()) { // time:2025-04-18T16:56:37.913Z uuid:860b1d9b
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:56:37.913Z uuid:95776b41
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:56:37.913Z uuid:9ee3fd21
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:56:37.913Z uuid:e8e91f13
      } // time:2025-04-18T16:56:37.913Z uuid:c09f70c2
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:56:37.913Z uuid:518b4a35
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:56:37.913Z uuid:04738537
      if (result) { // time:2025-04-18T16:56:37.913Z uuid:3e359091
        modifiedFiles.push(result); // time:2025-04-18T16:56:37.913Z uuid:728e4379
      } // time:2025-04-18T16:56:37.913Z uuid:b3ea4554
    } // time:2025-04-18T16:56:37.913Z uuid:cf44186a
  } // time:2025-04-18T16:56:37.913Z uuid:0bcbf105
// time:2025-04-18T16:56:37.913Z uuid:e65d8030
  return modifiedFiles; // time:2025-04-18T16:56:37.913Z uuid:6d9bd1bf
} // time:2025-04-18T16:56:37.913Z uuid:0e187dba
// time:2025-04-18T16:56:37.913Z uuid:fb010a2a
function rollbackLastRun() { // time:2025-04-18T16:56:37.913Z uuid:54a0f2dc
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:56:37.913Z uuid:14031776
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:56:37.913Z uuid:37d686fc
    return; // time:2025-04-18T16:56:37.913Z uuid:11511273
  } // time:2025-04-18T16:56:37.913Z uuid:8a4a348b
// time:2025-04-18T16:56:37.913Z uuid:cd363097
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:56:37.913Z uuid:ea4f14f9
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:56:37.913Z uuid:3b080d0f
// time:2025-04-18T16:56:37.913Z uuid:01158f59
  let successCount = 0; // time:2025-04-18T16:56:37.913Z uuid:308725c9
// time:2025-04-18T16:56:37.913Z uuid:5183f486
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:56:37.913Z uuid:06733cc9
    try { // time:2025-04-18T16:56:37.913Z uuid:8489471b
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:56:37.913Z uuid:66b6c972
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:56:37.913Z uuid:18e7751c
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:56:37.913Z uuid:2cd6b4d9
// time:2025-04-18T16:56:37.913Z uuid:38fac743
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:56:37.913Z uuid:9d4a075c
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:56:37.913Z uuid:2f64fdf9
        successCount++; // time:2025-04-18T16:56:37.913Z uuid:f8c02a1b
      } else { // time:2025-04-18T16:56:37.913Z uuid:ed15bf5c
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:56:37.913Z uuid:9e9f5ed8
      } // time:2025-04-18T16:56:37.913Z uuid:71a39a8d
    } catch (error) { // time:2025-04-18T16:56:37.913Z uuid:4a0c1a5f
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:56:37.913Z uuid:3e50abee
    } // time:2025-04-18T16:56:37.913Z uuid:5d17a356
  } // time:2025-04-18T16:56:37.913Z uuid:3be5a201
// time:2025-04-18T16:56:37.913Z uuid:7b565c0b
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:56:37.913Z uuid:ccefd9f2
// time:2025-04-18T16:56:37.913Z uuid:2e7ce646
// time:2025-04-18T16:56:37.913Z uuid:df3a98ac
  lastRunInfo = { // time:2025-04-18T16:56:37.913Z uuid:2b33440f
    timestamp: null, // time:2025-04-18T16:56:37.913Z uuid:7ff841d2
    files: [] // time:2025-04-18T16:56:37.913Z uuid:f7fd6fac
  }; // time:2025-04-18T16:56:37.913Z uuid:114ce26e
// time:2025-04-18T16:56:37.913Z uuid:90aa8c06
  saveConfig(); // time:2025-04-18T16:56:37.913Z uuid:d01cc655
} // time:2025-04-18T16:56:37.913Z uuid:5363f44f
// time:2025-04-18T16:56:37.913Z uuid:75ad41bc
function runUUIDProcess() { // time:2025-04-18T16:56:37.913Z uuid:c259e8df
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:56:37.913Z uuid:895f302f
// time:2025-04-18T16:56:37.913Z uuid:1581063b
// time:2025-04-18T16:56:37.913Z uuid:22f319e7
  lastRunInfo = { // time:2025-04-18T16:56:37.913Z uuid:8aedfe33
    timestamp: Date.now(), // time:2025-04-18T16:56:37.913Z uuid:75c46738
    files: modifiedFiles // time:2025-04-18T16:56:37.913Z uuid:9421b0aa
  }; // time:2025-04-18T16:56:37.913Z uuid:97614329
// time:2025-04-18T16:56:37.913Z uuid:988fb08b
  saveConfig(); // time:2025-04-18T16:56:37.913Z uuid:3ab44e9a
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:56:37.913Z uuid:f4cfcb66
} // time:2025-04-18T16:56:37.913Z uuid:081ccf28
// time:2025-04-18T16:56:37.913Z uuid:27575f3a
function showMenu() { // time:2025-04-18T16:56:37.913Z uuid:6f77ecf4
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.913Z uuid:2890d675
    input: process.stdin, // time:2025-04-18T16:56:37.913Z uuid:457fb6d3
    output: process.stdout // time:2025-04-18T16:56:37.913Z uuid:d711b31a
  }); // time:2025-04-18T16:56:37.913Z uuid:0927fe59
// time:2025-04-18T16:56:37.913Z uuid:9c9311c7
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:56:37.913Z uuid:1d99dad6
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.913Z uuid:e38632fd
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.913Z uuid:9b8c6f00
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.913Z uuid:2c409cff
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.913Z uuid:b4db2add
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:56:37.913Z uuid:39f98d68
  console.log('6. Save and Run'); // time:2025-04-18T16:56:37.913Z uuid:c090cf7d
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:56:37.913Z uuid:5327e3c1
  console.log('8. Exit'); // time:2025-04-18T16:56:37.913Z uuid:97d56f19
// time:2025-04-18T16:56:37.913Z uuid:09aaa54d
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.913Z uuid:a7011dce
    switch(answer) { // time:2025-04-18T16:56:37.913Z uuid:84dc4e59
      case '1': // time:2025-04-18T16:56:37.913Z uuid:11c45c4f
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:56:37.913Z uuid:dcb532d0
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:ad09180f
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:725b9103
        break; // time:2025-04-18T16:56:37.913Z uuid:ae1fb1a5
      case '2': // time:2025-04-18T16:56:37.913Z uuid:49cbad13
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:56:37.913Z uuid:30bb2ce7
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:e35ab2df
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:4d8409a2
        break; // time:2025-04-18T16:56:37.913Z uuid:7506032c
      case '3': // time:2025-04-18T16:56:37.913Z uuid:1de3dcc9
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:56:37.913Z uuid:1ce464c2
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:db381845
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:4823a9f4
        break; // time:2025-04-18T16:56:37.913Z uuid:6afafc5a
      case '4': // time:2025-04-18T16:56:37.913Z uuid:c5c3a103
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:56:37.913Z uuid:05d74418
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:e225a0cf
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:0f46f575
        break; // time:2025-04-18T16:56:37.913Z uuid:787576aa
      case '5': // time:2025-04-18T16:56:37.913Z uuid:03e8226d
        config = { // time:2025-04-18T16:56:37.913Z uuid:6d8c94a4
          includeBranch: true, // time:2025-04-18T16:56:37.913Z uuid:9423ffe9
          includeCommit: true, // time:2025-04-18T16:56:37.913Z uuid:15697796
          includeTimestamp: true, // time:2025-04-18T16:56:37.913Z uuid:f031ce80
          includeLineNumber: true // time:2025-04-18T16:56:37.913Z uuid:4fe4acae
        }; // time:2025-04-18T16:56:37.913Z uuid:51caf1db
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:5f55e4bf
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:a8832291
        break; // time:2025-04-18T16:56:37.913Z uuid:8289fd74
      case '6': // time:2025-04-18T16:56:37.913Z uuid:496ad8bb
        saveConfig(); // time:2025-04-18T16:56:37.913Z uuid:c09dd20f
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:45b29765
        runUUIDProcess(); // time:2025-04-18T16:56:37.913Z uuid:58105ee9
        break; // time:2025-04-18T16:56:37.913Z uuid:eb10dde7
      case '7': // time:2025-04-18T16:56:37.913Z uuid:4959b058
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:0de4b301
        rollbackLastRun(); // time:2025-04-18T16:56:37.913Z uuid:00b50e2b
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:6a1febb1
        break; // time:2025-04-18T16:56:37.913Z uuid:8910acd0
      case '8': // time:2025-04-18T16:56:37.913Z uuid:f845271e
        console.log('Exiting without changes.'); // time:2025-04-18T16:56:37.913Z uuid:9978ad03
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:e59b86be
        break; // time:2025-04-18T16:56:37.913Z uuid:29e431bb
      default: // time:2025-04-18T16:56:37.913Z uuid:afe5a844
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.913Z uuid:cf030f9a
        rl.close(); // time:2025-04-18T16:56:37.913Z uuid:2031c417
        showMenu(); // time:2025-04-18T16:56:37.913Z uuid:b826b5fa
    } // time:2025-04-18T16:56:37.913Z uuid:73b9a788
  }); // time:2025-04-18T16:56:37.913Z uuid:360a51e6
} // time:2025-04-18T16:56:37.913Z uuid:6dd808ad
// time:2025-04-18T16:56:37.913Z uuid:8d20786d
// time:2025-04-18T16:56:37.913Z uuid:8974bb9c
function main() { // time:2025-04-18T16:56:37.913Z uuid:e7186f0a
  loadConfig(); // time:2025-04-18T16:56:37.913Z uuid:b1bd1f3a
// time:2025-04-18T16:56:37.913Z uuid:44e5beee
  if (process.argv.length > 2) { // time:2025-04-18T16:56:37.913Z uuid:ba4bafdf
    if (process.argv[2] === '--run') { // time:2025-04-18T16:56:37.913Z uuid:69498ffa
// time:2025-04-18T16:56:37.913Z uuid:2e3db07f
      runUUIDProcess(); // time:2025-04-18T16:56:37.913Z uuid:8ba9a9d2
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:56:37.913Z uuid:3278fbef
// time:2025-04-18T16:56:37.913Z uuid:3a90154b
      rollbackLastRun(); // time:2025-04-18T16:56:37.913Z uuid:6d773bc1
    } else { // time:2025-04-18T16:56:37.913Z uuid:d2d40efc
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:56:37.913Z uuid:a2ce96e0
    } // time:2025-04-18T16:56:37.913Z uuid:a4611351
  } else { // time:2025-04-18T16:56:37.913Z uuid:8bd7b7f6
// time:2025-04-18T16:56:37.913Z uuid:cc2d4e20
    showMenu(); // time:2025-04-18T16:56:37.913Z uuid:56c37639
  } // time:2025-04-18T16:56:37.913Z uuid:f358113a
} // time:2025-04-18T16:56:37.913Z uuid:9a5d8dbe
// time:2025-04-18T16:56:37.913Z uuid:f0660878
main(); // time:2025-04-18T16:56:37.913Z uuid:db074d50