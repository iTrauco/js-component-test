// time:2025-04-18T16:56:37.926Z uuid:b5ff98b4
// time:2025-04-18T16:56:37.926Z uuid:b5addd4f
// time:2025-04-18T16:56:37.926Z uuid:7c9687ac
// time:2025-04-18T16:56:37.926Z uuid:075b2134
// time:2025-04-18T16:56:37.926Z uuid:0f483581
// time:2025-04-18T16:56:37.926Z uuid:7a2301df
// time:2025-04-18T16:56:37.926Z uuid:fa94731a
// time:2025-04-18T16:56:37.926Z uuid:fa1a17e3
// time:2025-04-18T16:56:37.926Z uuid:ee28591d
// time:2025-04-18T16:56:37.926Z uuid:932792fa
const fs = require('fs'); // time:2025-04-18T16:56:37.926Z uuid:5e8cf18a
const path = require('path'); // time:2025-04-18T16:56:37.926Z uuid:0d02e071
const crypto = require('crypto'); // time:2025-04-18T16:56:37.926Z uuid:ce8ffe12
const { execSync } = require('child_process'); // time:2025-04-18T16:56:37.926Z uuid:96c8c1b2
const readline = require('readline'); // time:2025-04-18T16:56:37.926Z uuid:9fb4b5df
// time:2025-04-18T16:56:37.926Z uuid:8d4eb03b
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:56:37.926Z uuid:7ff5b851
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:56:37.926Z uuid:f3886ec9
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:56:37.926Z uuid:36747130
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:56:37.926Z uuid:7ea4d9de
// time:2025-04-18T16:56:37.926Z uuid:b3343e20
// time:2025-04-18T16:56:37.926Z uuid:995bad51
let config = { // time:2025-04-18T16:56:37.926Z uuid:27b1ce52
  includeBranch: true, // time:2025-04-18T16:56:37.926Z uuid:03c7b771
  includeCommit: true, // time:2025-04-18T16:56:37.926Z uuid:3f1c5e66
  includeTimestamp: true, // time:2025-04-18T16:56:37.926Z uuid:a6d4a3df
  includeLineNumber: true // time:2025-04-18T16:56:37.926Z uuid:196a7317
}; // time:2025-04-18T16:56:37.926Z uuid:5c7ce5c6
// time:2025-04-18T16:56:37.926Z uuid:c5750009
// time:2025-04-18T16:56:37.926Z uuid:fe140fea
let lastRunInfo = { // time:2025-04-18T16:56:37.926Z uuid:562e829e
  timestamp: null, // time:2025-04-18T16:56:37.926Z uuid:a5dcdf88
  files: [] // time:2025-04-18T16:56:37.926Z uuid:6e39f032
}; // time:2025-04-18T16:56:37.926Z uuid:40b7fb32
// time:2025-04-18T16:56:37.926Z uuid:6ca08873
function generateShortUUID() { // time:2025-04-18T16:56:37.926Z uuid:8684210a
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:56:37.926Z uuid:b508fe3c
} // time:2025-04-18T16:56:37.926Z uuid:f92db008
// time:2025-04-18T16:56:37.926Z uuid:559f7c82
function getGitInfo() { // time:2025-04-18T16:56:37.926Z uuid:b6b21602
  try { // time:2025-04-18T16:56:37.926Z uuid:88973002
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:56:37.926Z uuid:eff71808
    let branch = null; // time:2025-04-18T16:56:37.926Z uuid:bec2d01d
// time:2025-04-18T16:56:37.926Z uuid:5ccf633e
// time:2025-04-18T16:56:37.926Z uuid:6e4442c8
    try { // time:2025-04-18T16:56:37.926Z uuid:b562d0ff
      branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.926Z uuid:05d413e1
    } catch (e) { // time:2025-04-18T16:56:37.926Z uuid:d1c646cc
      console.log('Could not get branch via symbolic-ref:', e.message); // time:2025-04-18T16:56:37.926Z uuid:06947d05
    } // time:2025-04-18T16:56:37.926Z uuid:74cb41a5
// time:2025-04-18T16:56:37.926Z uuid:e992569d
// time:2025-04-18T16:56:37.926Z uuid:f60eda3c
    if (!branch) { // time:2025-04-18T16:56:37.926Z uuid:edab3453
      try { // time:2025-04-18T16:56:37.926Z uuid:d6506c89
        const gitStatusOutput = execSync('git status', { encoding: 'utf8' }); // time:2025-04-18T16:56:37.926Z uuid:5465ba4c
        const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/); // time:2025-04-18T16:56:37.926Z uuid:35550d50
        if (branchMatch && branchMatch[1]) { // time:2025-04-18T16:56:37.926Z uuid:fea4e135
          branch = branchMatch[1]; // time:2025-04-18T16:56:37.926Z uuid:9901da51
        } // time:2025-04-18T16:56:37.926Z uuid:25aade69
      } catch (e) { // time:2025-04-18T16:56:37.926Z uuid:53fddc7e
        console.log('Could not get branch via git status:', e.message); // time:2025-04-18T16:56:37.926Z uuid:56de47aa
      } // time:2025-04-18T16:56:37.926Z uuid:dd17db25
    } // time:2025-04-18T16:56:37.926Z uuid:8e89c4a7
// time:2025-04-18T16:56:37.926Z uuid:1af479b6
// time:2025-04-18T16:56:37.926Z uuid:e01ee86b
    if (!branch) { // time:2025-04-18T16:56:37.926Z uuid:c3e9e73b
      if (process.env.BRANCH_NAME) { // time:2025-04-18T16:56:37.926Z uuid:9fa04eaa
        branch = process.env.BRANCH_NAME; // time:2025-04-18T16:56:37.926Z uuid:49309f45
      } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:56:37.926Z uuid:0a0d6bae
        branch = process.env.GIT_BRANCH; // time:2025-04-18T16:56:37.926Z uuid:bb7f62a0
      } // time:2025-04-18T16:56:37.926Z uuid:2a2b58b7
    } // time:2025-04-18T16:56:37.926Z uuid:241170b1
// time:2025-04-18T16:56:37.926Z uuid:fda74a0c
// time:2025-04-18T16:56:37.926Z uuid:4ba78707
    if (!branch) { // time:2025-04-18T16:56:37.926Z uuid:759422f7
      try { // time:2025-04-18T16:56:37.926Z uuid:05b19a70
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.926Z uuid:f835cd77
      } catch (e) { // time:2025-04-18T16:56:37.926Z uuid:287d5d05
        console.log('Could not get branch via show-current:', e.message); // time:2025-04-18T16:56:37.926Z uuid:22121c3f
      } // time:2025-04-18T16:56:37.926Z uuid:952f26d1
    } // time:2025-04-18T16:56:37.926Z uuid:4d7e6d56
// time:2025-04-18T16:56:37.926Z uuid:aa8dbbc1
// time:2025-04-18T16:56:37.926Z uuid:89a6c1f1
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.926Z uuid:c7a71a40
// time:2025-04-18T16:56:37.926Z uuid:818fb2d6
    console.log('Debug - Detected Git Info:', { branch, lastCommit }); // time:2025-04-18T16:56:37.926Z uuid:a09786ce
    return { branch, lastCommit }; // time:2025-04-18T16:56:37.926Z uuid:90127245
  } catch (error) { // time:2025-04-18T16:56:37.926Z uuid:b28dcbb0
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:56:37.926Z uuid:79c1ca9c
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:56:37.926Z uuid:bb94b59d
  } // time:2025-04-18T16:56:37.926Z uuid:288ef5f5
} // time:2025-04-18T16:56:37.926Z uuid:b318b441
// time:2025-04-18T16:56:37.926Z uuid:7f2beca4
function loadConfig() { // time:2025-04-18T16:56:37.926Z uuid:2ddd5605
  try { // time:2025-04-18T16:56:37.926Z uuid:e82dfc70
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:56:37.926Z uuid:e23629a4
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:56:37.926Z uuid:22344c23
      const data = JSON.parse(fileContent); // time:2025-04-18T16:56:37.926Z uuid:9080a85f
// time:2025-04-18T16:56:37.926Z uuid:ee43c5f5
// time:2025-04-18T16:56:37.926Z uuid:5a7e19fa
      if (data.config) { // time:2025-04-18T16:56:37.926Z uuid:f32eadb7
        config = data.config; // time:2025-04-18T16:56:37.926Z uuid:0756adf3
      } // time:2025-04-18T16:56:37.926Z uuid:d43d8f72
// time:2025-04-18T16:56:37.926Z uuid:207dcf62
// time:2025-04-18T16:56:37.926Z uuid:d29a531c
      if (data.lastRun) { // time:2025-04-18T16:56:37.926Z uuid:2bc53f96
        lastRunInfo = data.lastRun; // time:2025-04-18T16:56:37.926Z uuid:28912c70
      } // time:2025-04-18T16:56:37.926Z uuid:ef92dbee
// time:2025-04-18T16:56:37.926Z uuid:ffaa166c
      console.log('Loaded configuration:', config); // time:2025-04-18T16:56:37.926Z uuid:da59e4ce
    } // time:2025-04-18T16:56:37.926Z uuid:7fdb3e42
  } catch (error) { // time:2025-04-18T16:56:37.926Z uuid:860015f6
    console.error('Error loading config:', error.message); // time:2025-04-18T16:56:37.926Z uuid:8dd0461a
  } // time:2025-04-18T16:56:37.926Z uuid:5a1cd027
} // time:2025-04-18T16:56:37.926Z uuid:4f20faa9
// time:2025-04-18T16:56:37.926Z uuid:0afb1228
function saveConfig() { // time:2025-04-18T16:56:37.926Z uuid:71151eba
  try { // time:2025-04-18T16:56:37.926Z uuid:0ea5d828
// time:2025-04-18T16:56:37.926Z uuid:1426d473
    const data = { // time:2025-04-18T16:56:37.926Z uuid:0257548a
      config, // time:2025-04-18T16:56:37.926Z uuid:d1e33b9a
      lastRun: lastRunInfo // time:2025-04-18T16:56:37.926Z uuid:307605b6
    }; // time:2025-04-18T16:56:37.926Z uuid:86499275
// time:2025-04-18T16:56:37.926Z uuid:024b220e
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:56:37.926Z uuid:34fcc855
    console.log('Configuration saved.'); // time:2025-04-18T16:56:37.926Z uuid:003b258d
  } catch (error) { // time:2025-04-18T16:56:37.926Z uuid:46c202c4
    console.error('Error saving config:', error.message); // time:2025-04-18T16:56:37.926Z uuid:a0b978aa
  } // time:2025-04-18T16:56:37.926Z uuid:85beddd3
} // time:2025-04-18T16:56:37.926Z uuid:ba358c2f
// time:2025-04-18T16:56:37.926Z uuid:b667699f
function ensureBackupDir() { // time:2025-04-18T16:56:37.926Z uuid:dcf5381d
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:56:37.926Z uuid:34a462ad
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:56:37.926Z uuid:5df6cae8
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:56:37.926Z uuid:398f681a
  } // time:2025-04-18T16:56:37.926Z uuid:8483224a
} // time:2025-04-18T16:56:37.926Z uuid:40450981
// time:2025-04-18T16:56:37.926Z uuid:00dfa805
function backupFile(filePath) { // time:2025-04-18T16:56:37.926Z uuid:d1733fcb
  try { // time:2025-04-18T16:56:37.926Z uuid:3aa61439
    ensureBackupDir(); // time:2025-04-18T16:56:37.926Z uuid:b16dad25
// time:2025-04-18T16:56:37.926Z uuid:4ac01811
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.926Z uuid:d9c41a0e
    const fileName = path.basename(filePath); // time:2025-04-18T16:56:37.926Z uuid:8754f2a9
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:56:37.926Z uuid:38e7e461
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:56:37.926Z uuid:d77f8c81
// time:2025-04-18T16:56:37.926Z uuid:87ace225
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:56:37.926Z uuid:c729daa4
    return { relativePath, backupPath }; // time:2025-04-18T16:56:37.926Z uuid:8d9d491c
  } catch (error) { // time:2025-04-18T16:56:37.926Z uuid:1d626cc0
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.926Z uuid:880fc9ee
    return null; // time:2025-04-18T16:56:37.926Z uuid:5306f0a3
  } // time:2025-04-18T16:56:37.926Z uuid:d943d334
} // time:2025-04-18T16:56:37.926Z uuid:1a3aa789
// time:2025-04-18T16:56:37.926Z uuid:f10d90f6
function addUUIDsToFile(filePath) { // time:2025-04-18T16:56:37.926Z uuid:10f9f120
  try { // time:2025-04-18T16:56:37.926Z uuid:e5f77409
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:56:37.926Z uuid:18714584
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:56:37.926Z uuid:3f7eaa81
      return null; // time:2025-04-18T16:56:37.926Z uuid:ac8cbed4
    } // time:2025-04-18T16:56:37.926Z uuid:72a6b884
// time:2025-04-18T16:56:37.926Z uuid:11939f2a
// time:2025-04-18T16:56:37.926Z uuid:a2961f76
    const backup = backupFile(filePath); // time:2025-04-18T16:56:37.926Z uuid:d273a91c
    if (!backup) return null; // time:2025-04-18T16:56:37.926Z uuid:cd2cf829
// time:2025-04-18T16:56:37.926Z uuid:4f64b31f
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:56:37.926Z uuid:2f109232
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:56:37.926Z uuid:7259a098
// time:2025-04-18T16:56:37.926Z uuid:80328005
// time:2025-04-18T16:56:37.926Z uuid:c323175b
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`); // time:2025-04-18T16:56:37.926Z uuid:2e685ff3
// time:2025-04-18T16:56:37.926Z uuid:81f15dcd
// time:2025-04-18T16:56:37.926Z uuid:98c390cf
    let metaParts = []; // time:2025-04-18T16:56:37.926Z uuid:7bf770c6
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`); // time:2025-04-18T16:56:37.926Z uuid:f14b25c3
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`); // time:2025-04-18T16:56:37.926Z uuid:b79a99fd
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`); // time:2025-04-18T16:56:37.926Z uuid:61dd4e27
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:56:37.926Z uuid:9cece54b
// time:2025-04-18T16:56:37.926Z uuid:71c2dc2e
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.926Z uuid:d15fadef
    const lines = content.split('\n'); // time:2025-04-18T16:56:37.926Z uuid:3d95440b
// time:2025-04-18T16:56:37.926Z uuid:3652878a
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:56:37.926Z uuid:db5ee8d1
      const lineNumber = index + 1; // time:2025-04-18T16:56:37.926Z uuid:971e767d
      let cleanLine = line; // time:2025-04-18T16:56:37.926Z uuid:67438b1c
// time:2025-04-18T16:56:37.926Z uuid:25ef75d0
      if (line.includes(' // time:2025-04-18T16:56:37.926Z uuid:a58ea5e4
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:56:37.926Z uuid:6ca2b7ae
      } // time:2025-04-18T16:56:37.926Z uuid:1b8fff02
// time:2025-04-18T16:56:37.926Z uuid:27a5d745
      let comment = ' // time:2025-04-18T16:56:37.926Z uuid:bf0ce823
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:56:37.926Z uuid:f6a2e644
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:56:37.926Z uuid:811281c7
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:56:37.926Z uuid:d21e8120
// time:2025-04-18T16:56:37.926Z uuid:880553a7
      if (cleanLine.trim() === '') { // time:2025-04-18T16:56:37.926Z uuid:06cfb40f
        return comment.trim(); // time:2025-04-18T16:56:37.926Z uuid:81fb086d
      } // time:2025-04-18T16:56:37.926Z uuid:2c85d57c
// time:2025-04-18T16:56:37.926Z uuid:6f6e9711
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:56:37.926Z uuid:f0f01b12
    }); // time:2025-04-18T16:56:37.926Z uuid:03139f9f
// time:2025-04-18T16:56:37.926Z uuid:ee018bb6
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:56:37.926Z uuid:0a04ac78
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:56:37.926Z uuid:35c6c47f
// time:2025-04-18T16:56:37.926Z uuid:01444048
    return backup; // time:2025-04-18T16:56:37.926Z uuid:db7bfe0b
  } catch (error) { // time:2025-04-18T16:56:37.926Z uuid:3b72b756
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.926Z uuid:274bbb5f
    return null; // time:2025-04-18T16:56:37.926Z uuid:60da8cc9
  } // time:2025-04-18T16:56:37.926Z uuid:d63fa175
} // time:2025-04-18T16:56:37.926Z uuid:e6ff3d69
// time:2025-04-18T16:56:37.926Z uuid:c564d3fd
function processDirectory(dirPath) { // time:2025-04-18T16:56:37.926Z uuid:7efefd56
  const modifiedFiles = []; // time:2025-04-18T16:56:37.926Z uuid:9dc0ef30
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:56:37.926Z uuid:65c221af
// time:2025-04-18T16:56:37.926Z uuid:d0ec3ef6
  for (const entry of entries) { // time:2025-04-18T16:56:37.926Z uuid:ef28e62f
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:56:37.926Z uuid:7c0f5e33
// time:2025-04-18T16:56:37.926Z uuid:b9ffdf21
    if (entry.isDirectory()) { // time:2025-04-18T16:56:37.926Z uuid:181deec4
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:56:37.926Z uuid:e1cc1fb6
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:56:37.926Z uuid:b2536168
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:56:37.926Z uuid:29d94674
      } // time:2025-04-18T16:56:37.926Z uuid:69dede80
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:56:37.926Z uuid:92d0a5ab
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:56:37.926Z uuid:3ab1ad42
      if (result) { // time:2025-04-18T16:56:37.926Z uuid:8c9b9170
        modifiedFiles.push(result); // time:2025-04-18T16:56:37.926Z uuid:426f68cd
      } // time:2025-04-18T16:56:37.926Z uuid:f90c40cd
    } // time:2025-04-18T16:56:37.926Z uuid:d2956f33
  } // time:2025-04-18T16:56:37.926Z uuid:3614b1fd
// time:2025-04-18T16:56:37.926Z uuid:0ac4e764
  return modifiedFiles; // time:2025-04-18T16:56:37.926Z uuid:2ada3e1b
} // time:2025-04-18T16:56:37.926Z uuid:b56f6880
// time:2025-04-18T16:56:37.926Z uuid:ab8b93e4
function rollbackLastRun() { // time:2025-04-18T16:56:37.926Z uuid:4b1dfa4b
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:56:37.926Z uuid:f727557f
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:56:37.926Z uuid:2f27b4d3
    return; // time:2025-04-18T16:56:37.926Z uuid:d029ac55
  } // time:2025-04-18T16:56:37.926Z uuid:c4a8ae94
// time:2025-04-18T16:56:37.926Z uuid:7afbdf2c
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:56:37.926Z uuid:2927befc
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:56:37.926Z uuid:d9870fac
// time:2025-04-18T16:56:37.926Z uuid:9ea7c28a
  let successCount = 0; // time:2025-04-18T16:56:37.926Z uuid:16516a1d
// time:2025-04-18T16:56:37.926Z uuid:cbca89b8
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:56:37.926Z uuid:9bbd4d03
    try { // time:2025-04-18T16:56:37.926Z uuid:4dc0eaf7
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:56:37.926Z uuid:ab39212a
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:56:37.926Z uuid:d44df6ca
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:56:37.926Z uuid:8d0b85d9
// time:2025-04-18T16:56:37.926Z uuid:b1426317
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:56:37.926Z uuid:6f3caf67
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:56:37.926Z uuid:d3372de3
        successCount++; // time:2025-04-18T16:56:37.926Z uuid:069e426a
      } else { // time:2025-04-18T16:56:37.926Z uuid:fbd823bb
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:56:37.926Z uuid:89bd95fb
      } // time:2025-04-18T16:56:37.926Z uuid:af72dbe8
    } catch (error) { // time:2025-04-18T16:56:37.926Z uuid:a227bb8a
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:56:37.926Z uuid:c5e8a498
    } // time:2025-04-18T16:56:37.926Z uuid:f92067eb
  } // time:2025-04-18T16:56:37.926Z uuid:d85f859a
// time:2025-04-18T16:56:37.926Z uuid:f60bd0a6
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:56:37.926Z uuid:3d036492
// time:2025-04-18T16:56:37.926Z uuid:af4f781b
// time:2025-04-18T16:56:37.926Z uuid:74ab64f0
  lastRunInfo = { // time:2025-04-18T16:56:37.926Z uuid:bf0f297e
    timestamp: null, // time:2025-04-18T16:56:37.926Z uuid:7304c3cd
    files: [] // time:2025-04-18T16:56:37.926Z uuid:1c17ce91
  }; // time:2025-04-18T16:56:37.926Z uuid:8a0861e1
// time:2025-04-18T16:56:37.926Z uuid:824250c6
  saveConfig(); // time:2025-04-18T16:56:37.926Z uuid:e54ba82e
} // time:2025-04-18T16:56:37.926Z uuid:f49de78f
// time:2025-04-18T16:56:37.926Z uuid:adef8ce5
function runUUIDProcess() { // time:2025-04-18T16:56:37.926Z uuid:f48bbc28
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:56:37.926Z uuid:8ce4bdeb
// time:2025-04-18T16:56:37.926Z uuid:e15c594e
// time:2025-04-18T16:56:37.926Z uuid:4f09f5eb
  lastRunInfo = { // time:2025-04-18T16:56:37.926Z uuid:36593ebd
    timestamp: Date.now(), // time:2025-04-18T16:56:37.926Z uuid:b8a0a1d9
    files: modifiedFiles // time:2025-04-18T16:56:37.926Z uuid:dec763d8
  }; // time:2025-04-18T16:56:37.926Z uuid:dfee03e1
// time:2025-04-18T16:56:37.926Z uuid:fef2dd89
  saveConfig(); // time:2025-04-18T16:56:37.926Z uuid:b9b4e5cf
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:56:37.926Z uuid:09d87c7c
} // time:2025-04-18T16:56:37.926Z uuid:a59acb68
// time:2025-04-18T16:56:37.926Z uuid:a7e6886d
function showMenu() { // time:2025-04-18T16:56:37.926Z uuid:4ddd981c
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.926Z uuid:9d45c747
    input: process.stdin, // time:2025-04-18T16:56:37.926Z uuid:5b926cb2
    output: process.stdout // time:2025-04-18T16:56:37.926Z uuid:9f7a3e55
  }); // time:2025-04-18T16:56:37.926Z uuid:2df699ba
// time:2025-04-18T16:56:37.926Z uuid:07e49aff
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:56:37.926Z uuid:b23f44c5
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.926Z uuid:5d935962
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.926Z uuid:36ec2367
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.926Z uuid:4df81f1a
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.926Z uuid:cf85d595
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:56:37.926Z uuid:b0d2e1f2
  console.log('6. Save and Run'); // time:2025-04-18T16:56:37.926Z uuid:d0333071
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:56:37.926Z uuid:463899b3
  console.log('8. Exit'); // time:2025-04-18T16:56:37.926Z uuid:163c8f73
// time:2025-04-18T16:56:37.926Z uuid:33b27c5a
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.926Z uuid:276eb1cd
    switch(answer) { // time:2025-04-18T16:56:37.926Z uuid:38bf5ec2
      case '1': // time:2025-04-18T16:56:37.926Z uuid:6660d5c9
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:56:37.926Z uuid:8b2f063d
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:5b8b7704
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:e4a85f08
        break; // time:2025-04-18T16:56:37.926Z uuid:6fa0948d
      case '2': // time:2025-04-18T16:56:37.926Z uuid:910c3ea1
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:56:37.926Z uuid:f5006bc4
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:86e055d7
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:5e32a1cc
        break; // time:2025-04-18T16:56:37.926Z uuid:50b09889
      case '3': // time:2025-04-18T16:56:37.926Z uuid:660b137b
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:56:37.926Z uuid:175e1e40
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:a1f9c5fc
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:bb7604cc
        break; // time:2025-04-18T16:56:37.926Z uuid:9e813f0f
      case '4': // time:2025-04-18T16:56:37.926Z uuid:5d46c482
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:56:37.926Z uuid:fe89ceac
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:b945be01
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:c6479644
        break; // time:2025-04-18T16:56:37.926Z uuid:08db3348
      case '5': // time:2025-04-18T16:56:37.926Z uuid:59b5b5a1
        config = { // time:2025-04-18T16:56:37.926Z uuid:cb497652
          includeBranch: true, // time:2025-04-18T16:56:37.926Z uuid:9a6bc5b3
          includeCommit: true, // time:2025-04-18T16:56:37.926Z uuid:3c447854
          includeTimestamp: true, // time:2025-04-18T16:56:37.926Z uuid:e2d43337
          includeLineNumber: true // time:2025-04-18T16:56:37.926Z uuid:2627138e
        }; // time:2025-04-18T16:56:37.926Z uuid:a906c0c5
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:a34b51a4
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:b742651a
        break; // time:2025-04-18T16:56:37.926Z uuid:3c159d92
      case '6': // time:2025-04-18T16:56:37.926Z uuid:e36c068b
        saveConfig(); // time:2025-04-18T16:56:37.926Z uuid:2d595d63
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:af4dfa24
        runUUIDProcess(); // time:2025-04-18T16:56:37.926Z uuid:fc0c5896
        break; // time:2025-04-18T16:56:37.926Z uuid:93ab00d9
      case '7': // time:2025-04-18T16:56:37.926Z uuid:bf0d6880
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:d32e22a3
        rollbackLastRun(); // time:2025-04-18T16:56:37.926Z uuid:0499adb8
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:c9066340
        break; // time:2025-04-18T16:56:37.926Z uuid:592fdf25
      case '8': // time:2025-04-18T16:56:37.926Z uuid:56a40e8d
        console.log('Exiting without changes.'); // time:2025-04-18T16:56:37.926Z uuid:22e4382e
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:41d4ee35
        break; // time:2025-04-18T16:56:37.926Z uuid:1dfaf84b
      default: // time:2025-04-18T16:56:37.926Z uuid:61028e15
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.926Z uuid:fd1257c4
        rl.close(); // time:2025-04-18T16:56:37.926Z uuid:de2e49f6
        showMenu(); // time:2025-04-18T16:56:37.926Z uuid:9c53d1fb
    } // time:2025-04-18T16:56:37.926Z uuid:4a9f6247
  }); // time:2025-04-18T16:56:37.926Z uuid:9cd5b9de
} // time:2025-04-18T16:56:37.926Z uuid:ebbc6da5
// time:2025-04-18T16:56:37.926Z uuid:0c8857fb
// time:2025-04-18T16:56:37.926Z uuid:f2e47562
function main() { // time:2025-04-18T16:56:37.926Z uuid:9862b942
  loadConfig(); // time:2025-04-18T16:56:37.926Z uuid:6e8758ea
// time:2025-04-18T16:56:37.926Z uuid:5c169340
  if (process.argv.length > 2) { // time:2025-04-18T16:56:37.926Z uuid:9156b8e0
    if (process.argv[2] === '--run') { // time:2025-04-18T16:56:37.926Z uuid:e6067f53
// time:2025-04-18T16:56:37.926Z uuid:60c72ab7
      runUUIDProcess(); // time:2025-04-18T16:56:37.926Z uuid:1b3b8ce7
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:56:37.926Z uuid:9ca2c0db
// time:2025-04-18T16:56:37.926Z uuid:cbaad36a
      rollbackLastRun(); // time:2025-04-18T16:56:37.926Z uuid:ab8a143b
    } else { // time:2025-04-18T16:56:37.926Z uuid:782edd11
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:56:37.926Z uuid:da1157cb
    } // time:2025-04-18T16:56:37.926Z uuid:d288e311
  } else { // time:2025-04-18T16:56:37.926Z uuid:88b8760d
// time:2025-04-18T16:56:37.926Z uuid:7ea17446
    showMenu(); // time:2025-04-18T16:56:37.926Z uuid:556c3856
  } // time:2025-04-18T16:56:37.926Z uuid:5086ae7f
} // time:2025-04-18T16:56:37.926Z uuid:40313b71
// time:2025-04-18T16:56:37.926Z uuid:3d24a014
main(); // time:2025-04-18T16:56:37.926Z uuid:1f6c06f0