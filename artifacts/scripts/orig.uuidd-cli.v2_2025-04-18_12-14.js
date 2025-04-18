// time:2025-04-18T16:56:37.897Z uuid:d5d504c1
// time:2025-04-18T16:56:37.897Z uuid:af5148a9
// time:2025-04-18T16:56:37.897Z uuid:526ab9a2
// time:2025-04-18T16:56:37.897Z uuid:ea472620
// time:2025-04-18T16:56:37.897Z uuid:93b09f5a
// time:2025-04-18T16:56:37.897Z uuid:7d2e4d96
// time:2025-04-18T16:56:37.897Z uuid:26516c17
// time:2025-04-18T16:56:37.897Z uuid:cba90ed1
// time:2025-04-18T16:56:37.897Z uuid:ea227d1c
// time:2025-04-18T16:56:37.897Z uuid:bffd273e
const fs = require('fs'); // time:2025-04-18T16:56:37.897Z uuid:fedd11c9
const path = require('path'); // time:2025-04-18T16:56:37.897Z uuid:33dfa31f
const crypto = require('crypto'); // time:2025-04-18T16:56:37.897Z uuid:e8a6d236
const { execSync } = require('child_process'); // time:2025-04-18T16:56:37.897Z uuid:e360e40b
const readline = require('readline'); // time:2025-04-18T16:56:37.897Z uuid:004b9bae
// time:2025-04-18T16:56:37.897Z uuid:044a4433
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:56:37.897Z uuid:69844bae
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:56:37.897Z uuid:58ab5474
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:56:37.897Z uuid:0f07cc65
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:56:37.897Z uuid:5fec0891
// time:2025-04-18T16:56:37.897Z uuid:34ece02f
// time:2025-04-18T16:56:37.897Z uuid:96419fec
let config = { // time:2025-04-18T16:56:37.897Z uuid:648a017a
  includeBranch: true, // time:2025-04-18T16:56:37.897Z uuid:88a2083e
  includeCommit: true, // time:2025-04-18T16:56:37.897Z uuid:7eee0031
  includeTimestamp: true, // time:2025-04-18T16:56:37.897Z uuid:2a254c6d
  includeLineNumber: true // time:2025-04-18T16:56:37.897Z uuid:5d5fe1e5
}; // time:2025-04-18T16:56:37.897Z uuid:e5ed6cb1
// time:2025-04-18T16:56:37.897Z uuid:769c6003
// time:2025-04-18T16:56:37.897Z uuid:50a10c82
let lastRunInfo = { // time:2025-04-18T16:56:37.897Z uuid:200ddab9
  timestamp: null, // time:2025-04-18T16:56:37.897Z uuid:692489c3
  files: [] // time:2025-04-18T16:56:37.897Z uuid:48ca4439
}; // time:2025-04-18T16:56:37.897Z uuid:ebfec148
// time:2025-04-18T16:56:37.897Z uuid:2a8d3214
function generateShortUUID() { // time:2025-04-18T16:56:37.897Z uuid:91a7e5c3
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:56:37.897Z uuid:10dcb602
} // time:2025-04-18T16:56:37.897Z uuid:48ed3f88
// time:2025-04-18T16:56:37.897Z uuid:a776a893
function getGitInfo() { // time:2025-04-18T16:56:37.897Z uuid:57883d1a
  try { // time:2025-04-18T16:56:37.897Z uuid:2ef134a4
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:56:37.897Z uuid:467f542f
    let branch; // time:2025-04-18T16:56:37.897Z uuid:bba60841
// time:2025-04-18T16:56:37.897Z uuid:c660b7af
// time:2025-04-18T16:56:37.897Z uuid:3ddc08ad
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:56:37.897Z uuid:bc09a47c
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:56:37.897Z uuid:27356599
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:56:37.897Z uuid:3331cd12
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:56:37.897Z uuid:a3142fa9
    } else { // time:2025-04-18T16:56:37.897Z uuid:71bd575d
// time:2025-04-18T16:56:37.897Z uuid:39828f93
      branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.897Z uuid:87d07509
    } // time:2025-04-18T16:56:37.897Z uuid:e356af0d
// time:2025-04-18T16:56:37.897Z uuid:98ea2fba
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.897Z uuid:72b924dc
    return { branch, lastCommit }; // time:2025-04-18T16:56:37.897Z uuid:74cb4537
  } catch (error) { // time:2025-04-18T16:56:37.897Z uuid:e7f13412
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:56:37.897Z uuid:c2206f2f
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:56:37.897Z uuid:9ab55ccf
  } // time:2025-04-18T16:56:37.897Z uuid:a4f47655
} // time:2025-04-18T16:56:37.897Z uuid:4000b9a2
// time:2025-04-18T16:56:37.897Z uuid:55fec732
function loadConfig() { // time:2025-04-18T16:56:37.897Z uuid:3e6c3917
  try { // time:2025-04-18T16:56:37.897Z uuid:1a71b077
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:56:37.897Z uuid:057eadb0
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:56:37.897Z uuid:33fcc1bd
      const data = JSON.parse(fileContent); // time:2025-04-18T16:56:37.897Z uuid:d268e0c5
// time:2025-04-18T16:56:37.897Z uuid:b0c1e5b0
// time:2025-04-18T16:56:37.897Z uuid:5af369b6
      if (data.config) { // time:2025-04-18T16:56:37.897Z uuid:24b87431
        config = data.config; // time:2025-04-18T16:56:37.897Z uuid:370176aa
      } // time:2025-04-18T16:56:37.897Z uuid:423f1afc
// time:2025-04-18T16:56:37.897Z uuid:cf3125b3
// time:2025-04-18T16:56:37.897Z uuid:9cfcd7c9
      if (data.lastRun) { // time:2025-04-18T16:56:37.897Z uuid:da63ea7a
        lastRunInfo = data.lastRun; // time:2025-04-18T16:56:37.897Z uuid:e73bcff3
      } // time:2025-04-18T16:56:37.897Z uuid:126dd15d
// time:2025-04-18T16:56:37.897Z uuid:2ee2c67a
      console.log('Loaded configuration:', config); // time:2025-04-18T16:56:37.897Z uuid:84513b67
    } // time:2025-04-18T16:56:37.897Z uuid:4f00a6f1
  } catch (error) { // time:2025-04-18T16:56:37.897Z uuid:417840c8
    console.error('Error loading config:', error.message); // time:2025-04-18T16:56:37.897Z uuid:85bd6793
  } // time:2025-04-18T16:56:37.897Z uuid:b93fa48e
} // time:2025-04-18T16:56:37.897Z uuid:48984449
// time:2025-04-18T16:56:37.897Z uuid:39b8161c
function saveConfig() { // time:2025-04-18T16:56:37.897Z uuid:6f98fd91
  try { // time:2025-04-18T16:56:37.897Z uuid:413a2e4c
// time:2025-04-18T16:56:37.897Z uuid:60da09c9
    const data = { // time:2025-04-18T16:56:37.897Z uuid:58e655be
      config, // time:2025-04-18T16:56:37.897Z uuid:41f15d21
      lastRun: lastRunInfo // time:2025-04-18T16:56:37.897Z uuid:27aa35f9
    }; // time:2025-04-18T16:56:37.897Z uuid:5103f08b
// time:2025-04-18T16:56:37.897Z uuid:db7d84e1
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:56:37.897Z uuid:2811e87e
    console.log('Configuration saved.'); // time:2025-04-18T16:56:37.897Z uuid:1fdfcfc8
  } catch (error) { // time:2025-04-18T16:56:37.897Z uuid:08ed7580
    console.error('Error saving config:', error.message); // time:2025-04-18T16:56:37.897Z uuid:0eed97fb
  } // time:2025-04-18T16:56:37.897Z uuid:ceecc1bd
} // time:2025-04-18T16:56:37.897Z uuid:8bf54a69
// time:2025-04-18T16:56:37.897Z uuid:4fc37d4f
function ensureBackupDir() { // time:2025-04-18T16:56:37.897Z uuid:8c4fd60f
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:56:37.897Z uuid:dee6f7bf
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:56:37.897Z uuid:3d36de28
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:56:37.897Z uuid:a9791bd5
  } // time:2025-04-18T16:56:37.897Z uuid:e823a69e
} // time:2025-04-18T16:56:37.897Z uuid:1bb2c7aa
// time:2025-04-18T16:56:37.897Z uuid:048cac2f
function backupFile(filePath) { // time:2025-04-18T16:56:37.897Z uuid:20d720c9
  try { // time:2025-04-18T16:56:37.897Z uuid:4d02e0de
    ensureBackupDir(); // time:2025-04-18T16:56:37.897Z uuid:1af809f5
// time:2025-04-18T16:56:37.897Z uuid:2c01faea
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.897Z uuid:cafc64b6
    const fileName = path.basename(filePath); // time:2025-04-18T16:56:37.897Z uuid:76a3b50b
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:56:37.897Z uuid:92e1437d
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:56:37.897Z uuid:de6df643
// time:2025-04-18T16:56:37.897Z uuid:59e2be18
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:56:37.897Z uuid:09324202
    return { relativePath, backupPath }; // time:2025-04-18T16:56:37.897Z uuid:2bea56a3
  } catch (error) { // time:2025-04-18T16:56:37.897Z uuid:078e4ed0
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.897Z uuid:2df26671
    return null; // time:2025-04-18T16:56:37.897Z uuid:fda2dc76
  } // time:2025-04-18T16:56:37.897Z uuid:c3cda4d2
} // time:2025-04-18T16:56:37.897Z uuid:c2f151e7
// time:2025-04-18T16:56:37.897Z uuid:9e6b388e
function addUUIDsToFile(filePath) { // time:2025-04-18T16:56:37.897Z uuid:ef0ade0a
  try { // time:2025-04-18T16:56:37.897Z uuid:0593a9d8
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:56:37.897Z uuid:b3abd130
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:56:37.897Z uuid:a802854d
      return null; // time:2025-04-18T16:56:37.897Z uuid:50cab34e
    } // time:2025-04-18T16:56:37.897Z uuid:e2ed5040
// time:2025-04-18T16:56:37.897Z uuid:215db5d7
// time:2025-04-18T16:56:37.897Z uuid:0dd40517
    const backup = backupFile(filePath); // time:2025-04-18T16:56:37.897Z uuid:a8dad06d
    if (!backup) return null; // time:2025-04-18T16:56:37.897Z uuid:8f015fef
// time:2025-04-18T16:56:37.897Z uuid:f207d88d
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:56:37.897Z uuid:22b18635
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:56:37.897Z uuid:f2ada8f1
// time:2025-04-18T16:56:37.897Z uuid:5392117a
// time:2025-04-18T16:56:37.897Z uuid:d687810e
    let metaParts = []; // time:2025-04-18T16:56:37.897Z uuid:34c9d1f2
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:56:37.897Z uuid:e364ec8e
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:56:37.897Z uuid:5805226c
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:56:37.897Z uuid:7ae20d1c
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:56:37.897Z uuid:e453d6a4
// time:2025-04-18T16:56:37.897Z uuid:b1cc33c4
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.897Z uuid:c53f97b2
    const lines = content.split('\n'); // time:2025-04-18T16:56:37.897Z uuid:688c7a51
// time:2025-04-18T16:56:37.897Z uuid:f2494d41
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:56:37.897Z uuid:15e853c5
      const lineNumber = index + 1; // time:2025-04-18T16:56:37.897Z uuid:b9ad7319
      let cleanLine = line; // time:2025-04-18T16:56:37.897Z uuid:d5128b22
// time:2025-04-18T16:56:37.897Z uuid:32409675
      if (line.includes(' // time:2025-04-18T16:56:37.897Z uuid:66d200f3
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:56:37.897Z uuid:a13524ae
      } // time:2025-04-18T16:56:37.897Z uuid:e566a016
// time:2025-04-18T16:56:37.897Z uuid:1bc95662
      let comment = ' // time:2025-04-18T16:56:37.897Z uuid:f5b47cfa
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:56:37.897Z uuid:aeaf08e1
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:56:37.897Z uuid:ec0a815c
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:56:37.897Z uuid:751c4e2e
// time:2025-04-18T16:56:37.897Z uuid:0fa84c65
      if (cleanLine.trim() === '') { // time:2025-04-18T16:56:37.897Z uuid:14efa846
        return comment.trim(); // time:2025-04-18T16:56:37.897Z uuid:da3f3d73
      } // time:2025-04-18T16:56:37.897Z uuid:d8ad359b
// time:2025-04-18T16:56:37.897Z uuid:3444207f
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:56:37.897Z uuid:3d65b740
    }); // time:2025-04-18T16:56:37.897Z uuid:8d95cbe7
// time:2025-04-18T16:56:37.897Z uuid:60948b48
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:56:37.897Z uuid:045bb6d3
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:56:37.897Z uuid:9a50383b
// time:2025-04-18T16:56:37.897Z uuid:998604f2
    return backup; // time:2025-04-18T16:56:37.897Z uuid:19c48b25
  } catch (error) { // time:2025-04-18T16:56:37.897Z uuid:e627bcff
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.897Z uuid:873b556e
    return null; // time:2025-04-18T16:56:37.897Z uuid:5397d345
  } // time:2025-04-18T16:56:37.897Z uuid:0956e389
} // time:2025-04-18T16:56:37.897Z uuid:cc23101b
// time:2025-04-18T16:56:37.897Z uuid:098bcdbd
function processDirectory(dirPath) { // time:2025-04-18T16:56:37.897Z uuid:d726b933
  const modifiedFiles = []; // time:2025-04-18T16:56:37.897Z uuid:7508eb37
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:56:37.897Z uuid:bef72c1d
// time:2025-04-18T16:56:37.897Z uuid:1821767c
  for (const entry of entries) { // time:2025-04-18T16:56:37.897Z uuid:02b29a11
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:56:37.897Z uuid:e472972e
// time:2025-04-18T16:56:37.897Z uuid:92e688f1
    if (entry.isDirectory()) { // time:2025-04-18T16:56:37.897Z uuid:cfd84850
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:56:37.897Z uuid:837bf8fe
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:56:37.897Z uuid:81364425
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:56:37.897Z uuid:33a9264a
      } // time:2025-04-18T16:56:37.897Z uuid:e331fdd3
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:56:37.897Z uuid:975a0c0d
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:56:37.897Z uuid:ca099fdf
      if (result) { // time:2025-04-18T16:56:37.897Z uuid:62984ef0
        modifiedFiles.push(result); // time:2025-04-18T16:56:37.897Z uuid:c4c5a82f
      } // time:2025-04-18T16:56:37.897Z uuid:a1fc28e9
    } // time:2025-04-18T16:56:37.897Z uuid:ac635cb3
  } // time:2025-04-18T16:56:37.897Z uuid:11dd7231
// time:2025-04-18T16:56:37.897Z uuid:04b327a4
  return modifiedFiles; // time:2025-04-18T16:56:37.897Z uuid:fdf92a65
} // time:2025-04-18T16:56:37.897Z uuid:92fdaaa2
// time:2025-04-18T16:56:37.897Z uuid:de5d64ba
function rollbackLastRun() { // time:2025-04-18T16:56:37.897Z uuid:11f885f0
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:56:37.897Z uuid:1f1a53e9
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:56:37.897Z uuid:e81e0f02
    return; // time:2025-04-18T16:56:37.897Z uuid:9e0b2fbb
  } // time:2025-04-18T16:56:37.897Z uuid:adbd6b4b
// time:2025-04-18T16:56:37.897Z uuid:7b5b5d34
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:56:37.897Z uuid:50a32bfb
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:56:37.897Z uuid:d50ff684
// time:2025-04-18T16:56:37.897Z uuid:a34947fb
  let successCount = 0; // time:2025-04-18T16:56:37.897Z uuid:d363b976
// time:2025-04-18T16:56:37.897Z uuid:3a7bd91e
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:56:37.897Z uuid:23749bdc
    try { // time:2025-04-18T16:56:37.897Z uuid:51436b7e
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:56:37.897Z uuid:09ae893b
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:56:37.897Z uuid:21a2627e
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:56:37.897Z uuid:ec924443
// time:2025-04-18T16:56:37.897Z uuid:491cc9b8
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:56:37.897Z uuid:6b551305
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:56:37.897Z uuid:637ef247
        successCount++; // time:2025-04-18T16:56:37.897Z uuid:3ffb8084
      } else { // time:2025-04-18T16:56:37.897Z uuid:3538f09a
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:56:37.897Z uuid:5351be1c
      } // time:2025-04-18T16:56:37.897Z uuid:be5e682f
    } catch (error) { // time:2025-04-18T16:56:37.897Z uuid:1326b100
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:56:37.897Z uuid:86bef425
    } // time:2025-04-18T16:56:37.897Z uuid:d4761b97
  } // time:2025-04-18T16:56:37.897Z uuid:9059600c
// time:2025-04-18T16:56:37.897Z uuid:2a4faa4a
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:56:37.897Z uuid:09a0a65f
// time:2025-04-18T16:56:37.897Z uuid:d3c13e95
// time:2025-04-18T16:56:37.897Z uuid:31d8a983
  lastRunInfo = { // time:2025-04-18T16:56:37.897Z uuid:fd04c302
    timestamp: null, // time:2025-04-18T16:56:37.897Z uuid:64d38ef6
    files: [] // time:2025-04-18T16:56:37.897Z uuid:02b3a082
  }; // time:2025-04-18T16:56:37.897Z uuid:0fdd38e5
// time:2025-04-18T16:56:37.897Z uuid:259d8086
  saveConfig(); // time:2025-04-18T16:56:37.897Z uuid:d8627441
} // time:2025-04-18T16:56:37.897Z uuid:6ca5461b
// time:2025-04-18T16:56:37.897Z uuid:cdb42388
function runUUIDProcess() { // time:2025-04-18T16:56:37.897Z uuid:0e449699
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:56:37.897Z uuid:6e3478fc
// time:2025-04-18T16:56:37.897Z uuid:dbb9c6c5
// time:2025-04-18T16:56:37.897Z uuid:bbb58e8e
  lastRunInfo = { // time:2025-04-18T16:56:37.897Z uuid:87a5114c
    timestamp: Date.now(), // time:2025-04-18T16:56:37.897Z uuid:7859bf93
    files: modifiedFiles // time:2025-04-18T16:56:37.897Z uuid:39adf1cb
  }; // time:2025-04-18T16:56:37.897Z uuid:77c37b2a
// time:2025-04-18T16:56:37.897Z uuid:0ff5393d
  saveConfig(); // time:2025-04-18T16:56:37.897Z uuid:1bf12c39
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:56:37.897Z uuid:3fc7be66
} // time:2025-04-18T16:56:37.897Z uuid:1e6bf321
// time:2025-04-18T16:56:37.897Z uuid:b3118f6d
function showMenu() { // time:2025-04-18T16:56:37.897Z uuid:b65c4709
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.897Z uuid:4c9a0831
    input: process.stdin, // time:2025-04-18T16:56:37.897Z uuid:578bbd2c
    output: process.stdout // time:2025-04-18T16:56:37.897Z uuid:7246f3e4
  }); // time:2025-04-18T16:56:37.897Z uuid:9cf7d888
// time:2025-04-18T16:56:37.897Z uuid:01a3e213
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:56:37.897Z uuid:a7ce4072
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.897Z uuid:cdcd3edc
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.897Z uuid:13a481fb
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.897Z uuid:c63f7b75
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.897Z uuid:b7ad1a00
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:56:37.897Z uuid:e4c126b4
  console.log('6. Save and Run'); // time:2025-04-18T16:56:37.897Z uuid:4dfb3c47
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:56:37.897Z uuid:372560d9
  console.log('8. Exit'); // time:2025-04-18T16:56:37.897Z uuid:f7638221
// time:2025-04-18T16:56:37.897Z uuid:e1e87cf2
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.897Z uuid:a82300db
    switch(answer) { // time:2025-04-18T16:56:37.897Z uuid:3538b3ef
      case '1': // time:2025-04-18T16:56:37.897Z uuid:b11d83ce
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:56:37.897Z uuid:9c90aeb8
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:79ff1a0c
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:b6415126
        break; // time:2025-04-18T16:56:37.897Z uuid:4dee5a16
      case '2': // time:2025-04-18T16:56:37.897Z uuid:6351dcfb
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:56:37.897Z uuid:884cf15b
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:c10806fb
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:c4352aed
        break; // time:2025-04-18T16:56:37.897Z uuid:767fd59f
      case '3': // time:2025-04-18T16:56:37.897Z uuid:360cab36
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:56:37.897Z uuid:e96cb0ab
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:d2b942db
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:e56de37a
        break; // time:2025-04-18T16:56:37.897Z uuid:6d186bfc
      case '4': // time:2025-04-18T16:56:37.897Z uuid:2aef01e4
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:56:37.897Z uuid:4acaa10a
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:9d52fdd2
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:1542cd6b
        break; // time:2025-04-18T16:56:37.897Z uuid:78c093e4
      case '5': // time:2025-04-18T16:56:37.897Z uuid:a3819dba
        config = { // time:2025-04-18T16:56:37.897Z uuid:0bef57c4
          includeBranch: true, // time:2025-04-18T16:56:37.897Z uuid:3ba22aba
          includeCommit: true, // time:2025-04-18T16:56:37.897Z uuid:85be5ac9
          includeTimestamp: true, // time:2025-04-18T16:56:37.897Z uuid:24f81546
          includeLineNumber: true // time:2025-04-18T16:56:37.897Z uuid:605c7219
        }; // time:2025-04-18T16:56:37.897Z uuid:dcede33e
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:8122239f
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:5921f38c
        break; // time:2025-04-18T16:56:37.897Z uuid:c3cd3c14
      case '6': // time:2025-04-18T16:56:37.897Z uuid:1763cc7b
        saveConfig(); // time:2025-04-18T16:56:37.897Z uuid:0d32b8b7
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:a90c394d
        runUUIDProcess(); // time:2025-04-18T16:56:37.897Z uuid:ac7f8ec6
        break; // time:2025-04-18T16:56:37.897Z uuid:b0854131
      case '7': // time:2025-04-18T16:56:37.897Z uuid:7a158cce
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:98f94576
        rollbackLastRun(); // time:2025-04-18T16:56:37.897Z uuid:e4b15360
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:6fe3f9d5
        break; // time:2025-04-18T16:56:37.897Z uuid:d74df5fd
      case '8': // time:2025-04-18T16:56:37.897Z uuid:624b4bfb
        console.log('Exiting without changes.'); // time:2025-04-18T16:56:37.897Z uuid:28cd2687
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:d5a9fa25
        break; // time:2025-04-18T16:56:37.897Z uuid:31d3e25f
      default: // time:2025-04-18T16:56:37.897Z uuid:fbd05f00
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.897Z uuid:386eacdd
        rl.close(); // time:2025-04-18T16:56:37.897Z uuid:c5eb315f
        showMenu(); // time:2025-04-18T16:56:37.897Z uuid:867f2a91
    } // time:2025-04-18T16:56:37.897Z uuid:396ebac8
  }); // time:2025-04-18T16:56:37.897Z uuid:d79f59a5
} // time:2025-04-18T16:56:37.897Z uuid:7d6e61bc
// time:2025-04-18T16:56:37.897Z uuid:00fad3d7
// time:2025-04-18T16:56:37.897Z uuid:fe2293b9
function main() { // time:2025-04-18T16:56:37.897Z uuid:4c3c4729
  loadConfig(); // time:2025-04-18T16:56:37.897Z uuid:de8b2dfd
// time:2025-04-18T16:56:37.897Z uuid:c4410991
  if (process.argv.length > 2) { // time:2025-04-18T16:56:37.897Z uuid:75fd21ad
    if (process.argv[2] === '--run') { // time:2025-04-18T16:56:37.897Z uuid:21cc5c98
// time:2025-04-18T16:56:37.897Z uuid:162fcfca
      runUUIDProcess(); // time:2025-04-18T16:56:37.897Z uuid:004108a2
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:56:37.897Z uuid:d8e7efda
// time:2025-04-18T16:56:37.897Z uuid:7f9e4f7c
      rollbackLastRun(); // time:2025-04-18T16:56:37.897Z uuid:54ec71cd
    } else { // time:2025-04-18T16:56:37.897Z uuid:2c2113f5
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:56:37.897Z uuid:a7714424
    } // time:2025-04-18T16:56:37.897Z uuid:14e0afef
  } else { // time:2025-04-18T16:56:37.897Z uuid:d8a01054
// time:2025-04-18T16:56:37.897Z uuid:909c89d4
    showMenu(); // time:2025-04-18T16:56:37.897Z uuid:316833e8
  } // time:2025-04-18T16:56:37.897Z uuid:1d4a9be0
} // time:2025-04-18T16:56:37.897Z uuid:90a9b90e
// time:2025-04-18T16:56:37.897Z uuid:47b105d0
main(); // time:2025-04-18T16:56:37.897Z uuid:5a5153d0