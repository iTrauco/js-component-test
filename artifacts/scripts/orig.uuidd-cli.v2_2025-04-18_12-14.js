// time:2025-04-18T16:17:35.513Z line:1 uuid:2958a05d
// time:2025-04-18T16:17:35.513Z line:2 uuid:bf17b3e6
// time:2025-04-18T16:17:35.513Z line:3 uuid:7e8c378c
// time:2025-04-18T16:17:35.513Z line:4 uuid:eaf85373
// time:2025-04-18T16:17:35.513Z line:5 uuid:04af80c8
// time:2025-04-18T16:17:35.513Z line:6 uuid:d0fc5a3a
// time:2025-04-18T16:17:35.513Z line:7 uuid:a79eb0f1
// time:2025-04-18T16:17:35.513Z line:8 uuid:463481c8
// time:2025-04-18T16:17:35.513Z line:9 uuid:5b01cfc5
// time:2025-04-18T16:17:35.513Z line:10 uuid:df5c4520
const fs = require('fs'); // time:2025-04-18T16:17:35.513Z line:11 uuid:1d6ca874
const path = require('path'); // time:2025-04-18T16:17:35.513Z line:12 uuid:5212889c
const crypto = require('crypto'); // time:2025-04-18T16:17:35.513Z line:13 uuid:271ff403
const { execSync } = require('child_process'); // time:2025-04-18T16:17:35.513Z line:14 uuid:d0888ee4
const readline = require('readline'); // time:2025-04-18T16:17:35.513Z line:15 uuid:08a2815f
// time:2025-04-18T16:17:35.513Z line:16 uuid:477e8dec
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:17:35.513Z line:17 uuid:f03619af
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:17:35.513Z line:18 uuid:e606cd2e
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:17:35.513Z line:19 uuid:b8abba89
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:17:35.513Z line:20 uuid:4a697a94
// time:2025-04-18T16:17:35.513Z line:21 uuid:621c5e22
// time:2025-04-18T16:17:35.513Z line:22 uuid:f8ea414f
let config = { // time:2025-04-18T16:17:35.513Z line:23 uuid:109bf060
  includeBranch: true, // time:2025-04-18T16:17:35.513Z line:24 uuid:71b7293e
  includeCommit: true, // time:2025-04-18T16:17:35.513Z line:25 uuid:1dc38061
  includeTimestamp: true, // time:2025-04-18T16:17:35.513Z line:26 uuid:580fc192
  includeLineNumber: true // time:2025-04-18T16:17:35.513Z line:27 uuid:40fc25b6
}; // time:2025-04-18T16:17:35.513Z line:28 uuid:97e4a5c4
// time:2025-04-18T16:17:35.513Z line:29 uuid:ff4bfe01
// time:2025-04-18T16:17:35.513Z line:30 uuid:a01e22bc
let lastRunInfo = { // time:2025-04-18T16:17:35.513Z line:31 uuid:b3ef7929
  timestamp: null, // time:2025-04-18T16:17:35.513Z line:32 uuid:41abb9a0
  files: [] // time:2025-04-18T16:17:35.513Z line:33 uuid:926c9059
}; // time:2025-04-18T16:17:35.513Z line:34 uuid:8d95c725
// time:2025-04-18T16:17:35.513Z line:35 uuid:b3e16a3e
function generateShortUUID() { // time:2025-04-18T16:17:35.513Z line:36 uuid:b261d630
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:17:35.513Z line:37 uuid:3643e7a9
} // time:2025-04-18T16:17:35.513Z line:38 uuid:51752103
// time:2025-04-18T16:17:35.513Z line:39 uuid:d959a062
function getGitInfo() { // time:2025-04-18T16:17:35.513Z line:40 uuid:e20b2364
  try { // time:2025-04-18T16:17:35.513Z line:41 uuid:f0f4fb8f
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:17:35.513Z line:42 uuid:01773e68
    let branch; // time:2025-04-18T16:17:35.513Z line:43 uuid:ee8c9542
// time:2025-04-18T16:17:35.513Z line:44 uuid:6991eab6
// time:2025-04-18T16:17:35.513Z line:45 uuid:33dfa1e7
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:17:35.513Z line:46 uuid:7d8711ec
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:17:35.513Z line:47 uuid:b089783c
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:17:35.513Z line:48 uuid:ad1b4e0f
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:17:35.513Z line:49 uuid:6098e7b7
    } else { // time:2025-04-18T16:17:35.513Z line:50 uuid:7fd0b175
// time:2025-04-18T16:17:35.513Z line:51 uuid:6d793a1b
      branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.513Z line:52 uuid:26877088
    } // time:2025-04-18T16:17:35.513Z line:53 uuid:f89ba03c
// time:2025-04-18T16:17:35.513Z line:54 uuid:487a731b
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.513Z line:55 uuid:943f2b0e
    return { branch, lastCommit }; // time:2025-04-18T16:17:35.513Z line:56 uuid:05720ea3
  } catch (error) { // time:2025-04-18T16:17:35.513Z line:57 uuid:95bebab7
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:17:35.513Z line:58 uuid:79e03dd5
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:17:35.513Z line:59 uuid:6add44cc
  } // time:2025-04-18T16:17:35.513Z line:60 uuid:0b956a7e
} // time:2025-04-18T16:17:35.513Z line:61 uuid:76dc1815
// time:2025-04-18T16:17:35.513Z line:62 uuid:176d5ec5
function loadConfig() { // time:2025-04-18T16:17:35.513Z line:63 uuid:044281b6
  try { // time:2025-04-18T16:17:35.513Z line:64 uuid:5d26a8db
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:17:35.513Z line:65 uuid:87ea5bba
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:17:35.513Z line:66 uuid:5ea23e18
      const data = JSON.parse(fileContent); // time:2025-04-18T16:17:35.513Z line:67 uuid:8f2bd269
// time:2025-04-18T16:17:35.513Z line:68 uuid:917279af
// time:2025-04-18T16:17:35.513Z line:69 uuid:61cded4b
      if (data.config) { // time:2025-04-18T16:17:35.513Z line:70 uuid:cdee2577
        config = data.config; // time:2025-04-18T16:17:35.513Z line:71 uuid:f37dc6ea
      } // time:2025-04-18T16:17:35.513Z line:72 uuid:f3e95a5a
// time:2025-04-18T16:17:35.513Z line:73 uuid:960d7c6b
// time:2025-04-18T16:17:35.513Z line:74 uuid:32acf78e
      if (data.lastRun) { // time:2025-04-18T16:17:35.513Z line:75 uuid:1be9916a
        lastRunInfo = data.lastRun; // time:2025-04-18T16:17:35.513Z line:76 uuid:63f8ca91
      } // time:2025-04-18T16:17:35.513Z line:77 uuid:d1568932
// time:2025-04-18T16:17:35.513Z line:78 uuid:2969747e
      console.log('Loaded configuration:', config); // time:2025-04-18T16:17:35.513Z line:79 uuid:27c77a2a
    } // time:2025-04-18T16:17:35.513Z line:80 uuid:ba9bd8e0
  } catch (error) { // time:2025-04-18T16:17:35.513Z line:81 uuid:ea3afe20
    console.error('Error loading config:', error.message); // time:2025-04-18T16:17:35.513Z line:82 uuid:84784217
  } // time:2025-04-18T16:17:35.513Z line:83 uuid:037b037a
} // time:2025-04-18T16:17:35.513Z line:84 uuid:c3d44588
// time:2025-04-18T16:17:35.513Z line:85 uuid:0710d8e8
function saveConfig() { // time:2025-04-18T16:17:35.513Z line:86 uuid:b531343f
  try { // time:2025-04-18T16:17:35.513Z line:87 uuid:98c33a9d
// time:2025-04-18T16:17:35.513Z line:88 uuid:036a4d76
    const data = { // time:2025-04-18T16:17:35.513Z line:89 uuid:ab6a5b38
      config, // time:2025-04-18T16:17:35.513Z line:90 uuid:5fef1580
      lastRun: lastRunInfo // time:2025-04-18T16:17:35.513Z line:91 uuid:4edd3df4
    }; // time:2025-04-18T16:17:35.513Z line:92 uuid:b8426a95
// time:2025-04-18T16:17:35.513Z line:93 uuid:48385e7f
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:17:35.513Z line:94 uuid:f3c01d04
    console.log('Configuration saved.'); // time:2025-04-18T16:17:35.513Z line:95 uuid:9a35af2e
  } catch (error) { // time:2025-04-18T16:17:35.513Z line:96 uuid:59a0dbc6
    console.error('Error saving config:', error.message); // time:2025-04-18T16:17:35.513Z line:97 uuid:d35f5a0e
  } // time:2025-04-18T16:17:35.513Z line:98 uuid:c59f1373
} // time:2025-04-18T16:17:35.513Z line:99 uuid:ef88f581
// time:2025-04-18T16:17:35.513Z line:100 uuid:39e7d907
function ensureBackupDir() { // time:2025-04-18T16:17:35.513Z line:101 uuid:5d57f36c
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:17:35.513Z line:102 uuid:d4f6ca09
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:17:35.513Z line:103 uuid:cd643481
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:17:35.513Z line:104 uuid:fcebfa43
  } // time:2025-04-18T16:17:35.513Z line:105 uuid:b0558211
} // time:2025-04-18T16:17:35.513Z line:106 uuid:5c183b15
// time:2025-04-18T16:17:35.513Z line:107 uuid:8cb0ae4b
function backupFile(filePath) { // time:2025-04-18T16:17:35.513Z line:108 uuid:57b2e4d5
  try { // time:2025-04-18T16:17:35.513Z line:109 uuid:d54a1d88
    ensureBackupDir(); // time:2025-04-18T16:17:35.513Z line:110 uuid:ae3542ba
// time:2025-04-18T16:17:35.513Z line:111 uuid:0086f10d
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.513Z line:112 uuid:9c007b4e
    const fileName = path.basename(filePath); // time:2025-04-18T16:17:35.513Z line:113 uuid:03cc05fb
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:17:35.513Z line:114 uuid:39336288
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:17:35.513Z line:115 uuid:ba8b669b
// time:2025-04-18T16:17:35.513Z line:116 uuid:cc641438
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:17:35.513Z line:117 uuid:e35cc576
    return { relativePath, backupPath }; // time:2025-04-18T16:17:35.513Z line:118 uuid:c3606610
  } catch (error) { // time:2025-04-18T16:17:35.513Z line:119 uuid:48824345
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.513Z line:120 uuid:82670526
    return null; // time:2025-04-18T16:17:35.513Z line:121 uuid:38abb6ef
  } // time:2025-04-18T16:17:35.513Z line:122 uuid:205a34e0
} // time:2025-04-18T16:17:35.513Z line:123 uuid:56a79a22
// time:2025-04-18T16:17:35.513Z line:124 uuid:34b90d37
function addUUIDsToFile(filePath) { // time:2025-04-18T16:17:35.513Z line:125 uuid:8209b378
  try { // time:2025-04-18T16:17:35.513Z line:126 uuid:09c32d40
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:17:35.513Z line:127 uuid:629a9f0c
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:17:35.513Z line:128 uuid:525948b0
      return null; // time:2025-04-18T16:17:35.513Z line:129 uuid:d55731f6
    } // time:2025-04-18T16:17:35.513Z line:130 uuid:3529a3d0
// time:2025-04-18T16:17:35.513Z line:131 uuid:a96b14da
// time:2025-04-18T16:17:35.513Z line:132 uuid:c6cdbef6
    const backup = backupFile(filePath); // time:2025-04-18T16:17:35.513Z line:133 uuid:2743e7ed
    if (!backup) return null; // time:2025-04-18T16:17:35.513Z line:134 uuid:db4e7caf
// time:2025-04-18T16:17:35.513Z line:135 uuid:c4026515
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:17:35.513Z line:136 uuid:fee77ca7
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:17:35.513Z line:137 uuid:0a6f3d98
// time:2025-04-18T16:17:35.513Z line:138 uuid:adb0594b
// time:2025-04-18T16:17:35.513Z line:139 uuid:a077bb9b
    let metaParts = []; // time:2025-04-18T16:17:35.513Z line:140 uuid:4cb7b49f
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:17:35.513Z line:141 uuid:ffcef6bc
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:17:35.513Z line:142 uuid:08e316ac
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:17:35.513Z line:143 uuid:7130d617
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:17:35.513Z line:144 uuid:c72c0adf
// time:2025-04-18T16:17:35.513Z line:145 uuid:a1a27fd8
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.513Z line:146 uuid:ae09cc3a
    const lines = content.split('\n'); // time:2025-04-18T16:17:35.513Z line:147 uuid:295767ca
// time:2025-04-18T16:17:35.513Z line:148 uuid:86b0bd6a
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:17:35.513Z line:149 uuid:3a6f3502
      const lineNumber = index + 1; // time:2025-04-18T16:17:35.513Z line:150 uuid:1e70c164
      let cleanLine = line; // time:2025-04-18T16:17:35.513Z line:151 uuid:6eeebbc8
// time:2025-04-18T16:17:35.513Z line:152 uuid:88bc111d
      if (line.includes(' // time:2025-04-18T16:17:35.513Z line:153 uuid:7e58f6ec
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:17:35.513Z line:154 uuid:2a38e0ae
      } // time:2025-04-18T16:17:35.513Z line:155 uuid:998f1fbd
// time:2025-04-18T16:17:35.513Z line:156 uuid:17c6464a
      let comment = ' // time:2025-04-18T16:17:35.513Z line:157 uuid:13f0c1a6
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:17:35.513Z line:158 uuid:2ab1768d
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:17:35.513Z line:159 uuid:5ff15996
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:17:35.513Z line:160 uuid:10f862e8
// time:2025-04-18T16:17:35.513Z line:161 uuid:73caa7a9
      if (cleanLine.trim() === '') { // time:2025-04-18T16:17:35.513Z line:162 uuid:0ab5c966
        return comment.trim(); // time:2025-04-18T16:17:35.513Z line:163 uuid:d4c74589
      } // time:2025-04-18T16:17:35.513Z line:164 uuid:cd413bfa
// time:2025-04-18T16:17:35.513Z line:165 uuid:fa96d6bf
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:17:35.513Z line:166 uuid:7d5512a2
    }); // time:2025-04-18T16:17:35.513Z line:167 uuid:1342b32f
// time:2025-04-18T16:17:35.513Z line:168 uuid:8a86a451
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:17:35.513Z line:169 uuid:6f8ea257
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:17:35.513Z line:170 uuid:164d6b10
// time:2025-04-18T16:17:35.513Z line:171 uuid:8df04719
    return backup; // time:2025-04-18T16:17:35.513Z line:172 uuid:289bccfb
  } catch (error) { // time:2025-04-18T16:17:35.513Z line:173 uuid:4cf03fe0
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.513Z line:174 uuid:07905682
    return null; // time:2025-04-18T16:17:35.513Z line:175 uuid:0a07d0d4
  } // time:2025-04-18T16:17:35.513Z line:176 uuid:fc9c804b
} // time:2025-04-18T16:17:35.513Z line:177 uuid:6c475a0b
// time:2025-04-18T16:17:35.513Z line:178 uuid:4a876293
function processDirectory(dirPath) { // time:2025-04-18T16:17:35.513Z line:179 uuid:2f013add
  const modifiedFiles = []; // time:2025-04-18T16:17:35.513Z line:180 uuid:04072f84
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:17:35.513Z line:181 uuid:dc84f84b
// time:2025-04-18T16:17:35.513Z line:182 uuid:7836f94c
  for (const entry of entries) { // time:2025-04-18T16:17:35.513Z line:183 uuid:44dade0a
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:17:35.513Z line:184 uuid:96825f05
// time:2025-04-18T16:17:35.513Z line:185 uuid:579d1fd5
    if (entry.isDirectory()) { // time:2025-04-18T16:17:35.513Z line:186 uuid:1bc7f22a
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:17:35.513Z line:187 uuid:874515f9
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:17:35.513Z line:188 uuid:4fbd2d02
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:17:35.513Z line:189 uuid:cb39f156
      } // time:2025-04-18T16:17:35.513Z line:190 uuid:c595beee
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:17:35.513Z line:191 uuid:6bb842ea
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:17:35.513Z line:192 uuid:47af3bda
      if (result) { // time:2025-04-18T16:17:35.513Z line:193 uuid:0665736b
        modifiedFiles.push(result); // time:2025-04-18T16:17:35.513Z line:194 uuid:a794f01e
      } // time:2025-04-18T16:17:35.513Z line:195 uuid:08b31a75
    } // time:2025-04-18T16:17:35.513Z line:196 uuid:c8439f87
  } // time:2025-04-18T16:17:35.513Z line:197 uuid:6ad07696
// time:2025-04-18T16:17:35.513Z line:198 uuid:fd554b63
  return modifiedFiles; // time:2025-04-18T16:17:35.513Z line:199 uuid:082557a9
} // time:2025-04-18T16:17:35.513Z line:200 uuid:75fbe0a9
// time:2025-04-18T16:17:35.513Z line:201 uuid:8974f352
function rollbackLastRun() { // time:2025-04-18T16:17:35.513Z line:202 uuid:f9b279e5
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:17:35.513Z line:203 uuid:73486aa3
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:17:35.513Z line:204 uuid:6697fadd
    return; // time:2025-04-18T16:17:35.513Z line:205 uuid:2e740ba2
  } // time:2025-04-18T16:17:35.513Z line:206 uuid:15ef865f
// time:2025-04-18T16:17:35.513Z line:207 uuid:eea12a37
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:17:35.513Z line:208 uuid:f1f4948e
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:17:35.513Z line:209 uuid:e4c4ad59
// time:2025-04-18T16:17:35.513Z line:210 uuid:35fe8b1c
  let successCount = 0; // time:2025-04-18T16:17:35.513Z line:211 uuid:87f1606e
// time:2025-04-18T16:17:35.513Z line:212 uuid:8cada02c
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:17:35.513Z line:213 uuid:46798bc2
    try { // time:2025-04-18T16:17:35.513Z line:214 uuid:42054c99
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:17:35.513Z line:215 uuid:26a3fea7
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:17:35.513Z line:216 uuid:b0abd98d
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:17:35.513Z line:217 uuid:ed507530
// time:2025-04-18T16:17:35.513Z line:218 uuid:cd4f8a44
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:17:35.513Z line:219 uuid:df3790bb
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:17:35.513Z line:220 uuid:4a438329
        successCount++; // time:2025-04-18T16:17:35.513Z line:221 uuid:0303d3fc
      } else { // time:2025-04-18T16:17:35.513Z line:222 uuid:af9e4f31
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:17:35.513Z line:223 uuid:b1788571
      } // time:2025-04-18T16:17:35.513Z line:224 uuid:445f7605
    } catch (error) { // time:2025-04-18T16:17:35.513Z line:225 uuid:fee46050
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:17:35.513Z line:226 uuid:19961113
    } // time:2025-04-18T16:17:35.513Z line:227 uuid:a835319e
  } // time:2025-04-18T16:17:35.513Z line:228 uuid:928d39e0
// time:2025-04-18T16:17:35.513Z line:229 uuid:c6511560
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:17:35.513Z line:230 uuid:2408dab5
// time:2025-04-18T16:17:35.513Z line:231 uuid:bf86bbeb
// time:2025-04-18T16:17:35.513Z line:232 uuid:dcc2086f
  lastRunInfo = { // time:2025-04-18T16:17:35.513Z line:233 uuid:6d1efa01
    timestamp: null, // time:2025-04-18T16:17:35.513Z line:234 uuid:3a2f771d
    files: [] // time:2025-04-18T16:17:35.513Z line:235 uuid:0bffe59f
  }; // time:2025-04-18T16:17:35.513Z line:236 uuid:4baf0c88
// time:2025-04-18T16:17:35.513Z line:237 uuid:ef05c3db
  saveConfig(); // time:2025-04-18T16:17:35.513Z line:238 uuid:40fe29f7
} // time:2025-04-18T16:17:35.513Z line:239 uuid:a8608b6f
// time:2025-04-18T16:17:35.513Z line:240 uuid:8e01bbf1
function runUUIDProcess() { // time:2025-04-18T16:17:35.513Z line:241 uuid:78813354
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:17:35.513Z line:242 uuid:0d43d1fc
// time:2025-04-18T16:17:35.513Z line:243 uuid:02110251
// time:2025-04-18T16:17:35.513Z line:244 uuid:552e852c
  lastRunInfo = { // time:2025-04-18T16:17:35.513Z line:245 uuid:55f6b451
    timestamp: Date.now(), // time:2025-04-18T16:17:35.513Z line:246 uuid:8d11f4b8
    files: modifiedFiles // time:2025-04-18T16:17:35.513Z line:247 uuid:f6ab9b67
  }; // time:2025-04-18T16:17:35.513Z line:248 uuid:e375e0c9
// time:2025-04-18T16:17:35.513Z line:249 uuid:693a8cd2
  saveConfig(); // time:2025-04-18T16:17:35.513Z line:250 uuid:1218a66f
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:17:35.513Z line:251 uuid:248efe4f
} // time:2025-04-18T16:17:35.513Z line:252 uuid:a96d1e77
// time:2025-04-18T16:17:35.513Z line:253 uuid:c286e6a0
function showMenu() { // time:2025-04-18T16:17:35.513Z line:254 uuid:ee93fc8e
  const rl = readline.createInterface({ // time:2025-04-18T16:17:35.513Z line:255 uuid:bfa5970d
    input: process.stdin, // time:2025-04-18T16:17:35.513Z line:256 uuid:e4adc136
    output: process.stdout // time:2025-04-18T16:17:35.513Z line:257 uuid:406fb50a
  }); // time:2025-04-18T16:17:35.513Z line:258 uuid:d98ec506
// time:2025-04-18T16:17:35.513Z line:259 uuid:79eb6921
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:17:35.513Z line:260 uuid:59974049
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.513Z line:261 uuid:2d248629
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.513Z line:262 uuid:192ec0ba
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.513Z line:263 uuid:286364c7
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.513Z line:264 uuid:56f1d675
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:17:35.513Z line:265 uuid:fe6fc078
  console.log('6. Save and Run'); // time:2025-04-18T16:17:35.513Z line:266 uuid:ed1db9f3
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:17:35.513Z line:267 uuid:8d199ebd
  console.log('8. Exit'); // time:2025-04-18T16:17:35.513Z line:268 uuid:31d46a6f
// time:2025-04-18T16:17:35.513Z line:269 uuid:c9e4e581
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:17:35.513Z line:270 uuid:78ebdc73
    switch(answer) { // time:2025-04-18T16:17:35.513Z line:271 uuid:a9b2f73f
      case '1': // time:2025-04-18T16:17:35.513Z line:272 uuid:3b4853c7
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:17:35.513Z line:273 uuid:78bf1034
        rl.close(); // time:2025-04-18T16:17:35.513Z line:274 uuid:18efd0e4
        showMenu(); // time:2025-04-18T16:17:35.513Z line:275 uuid:2908b728
        break; // time:2025-04-18T16:17:35.513Z line:276 uuid:3cfe96a9
      case '2': // time:2025-04-18T16:17:35.513Z line:277 uuid:3db40f2c
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:17:35.513Z line:278 uuid:071eb937
        rl.close(); // time:2025-04-18T16:17:35.513Z line:279 uuid:84468624
        showMenu(); // time:2025-04-18T16:17:35.513Z line:280 uuid:053de858
        break; // time:2025-04-18T16:17:35.513Z line:281 uuid:074f9094
      case '3': // time:2025-04-18T16:17:35.513Z line:282 uuid:26b2f12d
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:17:35.513Z line:283 uuid:739a2ae3
        rl.close(); // time:2025-04-18T16:17:35.513Z line:284 uuid:fb3ba0ad
        showMenu(); // time:2025-04-18T16:17:35.513Z line:285 uuid:68feea3c
        break; // time:2025-04-18T16:17:35.513Z line:286 uuid:20dd8a2d
      case '4': // time:2025-04-18T16:17:35.513Z line:287 uuid:0178f48d
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:17:35.513Z line:288 uuid:4fab5a0a
        rl.close(); // time:2025-04-18T16:17:35.513Z line:289 uuid:64787fa1
        showMenu(); // time:2025-04-18T16:17:35.513Z line:290 uuid:e6d39893
        break; // time:2025-04-18T16:17:35.513Z line:291 uuid:abd29f88
      case '5': // time:2025-04-18T16:17:35.513Z line:292 uuid:c9a2d615
        config = { // time:2025-04-18T16:17:35.513Z line:293 uuid:e2e4d3bf
          includeBranch: true, // time:2025-04-18T16:17:35.513Z line:294 uuid:efb55ee8
          includeCommit: true, // time:2025-04-18T16:17:35.513Z line:295 uuid:95f37da6
          includeTimestamp: true, // time:2025-04-18T16:17:35.513Z line:296 uuid:6ee369eb
          includeLineNumber: true // time:2025-04-18T16:17:35.513Z line:297 uuid:f21dfa89
        }; // time:2025-04-18T16:17:35.513Z line:298 uuid:499ec8e6
        rl.close(); // time:2025-04-18T16:17:35.513Z line:299 uuid:e9c90368
        showMenu(); // time:2025-04-18T16:17:35.513Z line:300 uuid:850fa479
        break; // time:2025-04-18T16:17:35.513Z line:301 uuid:aa3903f0
      case '6': // time:2025-04-18T16:17:35.513Z line:302 uuid:02d81258
        saveConfig(); // time:2025-04-18T16:17:35.513Z line:303 uuid:f1617fe0
        rl.close(); // time:2025-04-18T16:17:35.513Z line:304 uuid:489ae4cc
        runUUIDProcess(); // time:2025-04-18T16:17:35.513Z line:305 uuid:95a3211e
        break; // time:2025-04-18T16:17:35.513Z line:306 uuid:e6f52746
      case '7': // time:2025-04-18T16:17:35.513Z line:307 uuid:b7d831b4
        rl.close(); // time:2025-04-18T16:17:35.513Z line:308 uuid:ec6d2354
        rollbackLastRun(); // time:2025-04-18T16:17:35.513Z line:309 uuid:939246a2
        showMenu(); // time:2025-04-18T16:17:35.513Z line:310 uuid:5a74a07c
        break; // time:2025-04-18T16:17:35.513Z line:311 uuid:0677cc47
      case '8': // time:2025-04-18T16:17:35.513Z line:312 uuid:92150eb6
        console.log('Exiting without changes.'); // time:2025-04-18T16:17:35.513Z line:313 uuid:9098fc77
        rl.close(); // time:2025-04-18T16:17:35.513Z line:314 uuid:9fb331d7
        break; // time:2025-04-18T16:17:35.513Z line:315 uuid:74ee8076
      default: // time:2025-04-18T16:17:35.513Z line:316 uuid:5c55796e
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:17:35.513Z line:317 uuid:41518e8a
        rl.close(); // time:2025-04-18T16:17:35.513Z line:318 uuid:b9629447
        showMenu(); // time:2025-04-18T16:17:35.513Z line:319 uuid:3adeb115
    } // time:2025-04-18T16:17:35.513Z line:320 uuid:76bbaf1f
  }); // time:2025-04-18T16:17:35.513Z line:321 uuid:8cffff3b
} // time:2025-04-18T16:17:35.513Z line:322 uuid:7389e7e9
// time:2025-04-18T16:17:35.513Z line:323 uuid:363599bd
// time:2025-04-18T16:17:35.513Z line:324 uuid:7758bd67
function main() { // time:2025-04-18T16:17:35.513Z line:325 uuid:df15ed95
  loadConfig(); // time:2025-04-18T16:17:35.513Z line:326 uuid:bcdd6cca
// time:2025-04-18T16:17:35.513Z line:327 uuid:f49366fb
  if (process.argv.length > 2) { // time:2025-04-18T16:17:35.513Z line:328 uuid:3441cc4f
    if (process.argv[2] === '--run') { // time:2025-04-18T16:17:35.513Z line:329 uuid:fa5467b8
// time:2025-04-18T16:17:35.513Z line:330 uuid:ef87d64e
      runUUIDProcess(); // time:2025-04-18T16:17:35.513Z line:331 uuid:b851099d
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:17:35.513Z line:332 uuid:6671e089
// time:2025-04-18T16:17:35.513Z line:333 uuid:98d4687e
      rollbackLastRun(); // time:2025-04-18T16:17:35.513Z line:334 uuid:5b5ab350
    } else { // time:2025-04-18T16:17:35.513Z line:335 uuid:86186bfe
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:17:35.513Z line:336 uuid:0e2fc3f4
    } // time:2025-04-18T16:17:35.513Z line:337 uuid:04c693b3
  } else { // time:2025-04-18T16:17:35.513Z line:338 uuid:676066be
// time:2025-04-18T16:17:35.513Z line:339 uuid:0c7a5fe2
    showMenu(); // time:2025-04-18T16:17:35.513Z line:340 uuid:e4eea69c
  } // time:2025-04-18T16:17:35.513Z line:341 uuid:ba7d6a07
} // time:2025-04-18T16:17:35.513Z line:342 uuid:9bdffbc6
// time:2025-04-18T16:17:35.513Z line:343 uuid:71ed7301
main(); // time:2025-04-18T16:17:35.513Z line:344 uuid:12eaaa9c