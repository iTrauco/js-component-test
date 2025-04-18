// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:1 uuid:a98abdca
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:2 uuid:f6d175a0
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:3 uuid:e8385b36
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:4 uuid:eba943f9
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:5 uuid:d9d93687
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:6 uuid:b5e8c716
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:7 uuid:db8fe7da
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:8 uuid:410fb80e
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:9 uuid:28911ad8
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:10 uuid:13d29026
const fs = require('fs'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:11 uuid:f6b77710
const path = require('path'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:12 uuid:7fe41803
const crypto = require('crypto'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:13 uuid:f497a0b7
const { execSync } = require('child_process'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:14 uuid:31e42f8a
const readline = require('readline'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:15 uuid:ddb42bdd
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:16 uuid:7ebd4e74
const CONFIG_FILE = '.uuid-cli-config.json'; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:17 uuid:3f70962c
const BACKUP_DIR = '.uuid-cli-backups'; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:18 uuid:e23e9ecc
const SCRIPT_FILENAME = path.basename(__filename); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:19 uuid:97d2c91a
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:20 uuid:2680b405
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:21 uuid:b12e5ccb
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:22 uuid:4c84d5fb
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:23 uuid:c5c8cf6f
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:24 uuid:f2cb4057
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:25 uuid:ee0df9c0
let config = { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:26 uuid:3af53e32
  includeBranch: true, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:27 uuid:1662537d
  includeCommit: true, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:28 uuid:b2de1bac
  includeTimestamp: true, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:29 uuid:638baf76
  includeLineNumber: true // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:30 uuid:86bca973
}; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:31 uuid:07b0d615
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:32 uuid:77331d58
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:33 uuid:558a196e
let lastRunInfo = { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:34 uuid:cc5251c4
  timestamp: null, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:35 uuid:f817d1fe
  files: [] // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:36 uuid:c3c93aab
}; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:37 uuid:2788419c
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:38 uuid:85ce1b4e
function generateShortUUID() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:39 uuid:2c363114
  return crypto.randomBytes(4).toString('hex'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:40 uuid:b30af715
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:41 uuid:df7b32ea
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:42 uuid:6f7e4475
function getGitInfo() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:43 uuid:835ee2d0
  try { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:44 uuid:9e4107c7
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:45 uuid:9b25849b
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:46 uuid:b21c6b5d
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:47 uuid:87f11f6d
    return { branch, lastCommit }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:48 uuid:3261b9be
  } catch { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:49 uuid:e4799a64
    return { branch: null, lastCommit: null }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:50 uuid:9ec5e650
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:51 uuid:b54a996b
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:52 uuid:bc18614a
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:53 uuid:c4dd3daa
function loadConfig() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:54 uuid:dce3f7e9
  try { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:55 uuid:05fe1492
    if (fs.existsSync(CONFIG_FILE)) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:56 uuid:354fff91
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:57 uuid:cb464eb8
      const data = JSON.parse(fileContent); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:58 uuid:2cc8e81a
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:59 uuid:16327dca
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:60 uuid:16c31abd
      if (data.config) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:61 uuid:36e77ae6
        config = data.config; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:62 uuid:3f0c6583
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:63 uuid:9351744f
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:64 uuid:37742107
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:65 uuid:5a028533
      if (data.lastRun) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:66 uuid:fd56db66
        lastRunInfo = data.lastRun; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:67 uuid:3e788832
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:68 uuid:a32603af
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:69 uuid:9e078adf
      console.log('Loaded configuration:', config); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:70 uuid:0476e7ef
    } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:71 uuid:29f06d77
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:72 uuid:18501ffa
    console.error('Error loading config:', error.message); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:73 uuid:dcecc9db
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:74 uuid:001f2cc7
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:75 uuid:3f013ef3
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:76 uuid:56d30bf3
function saveConfig() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:77 uuid:11e4dd61
  try { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:78 uuid:d23a9876
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:79 uuid:c51f0399
    const data = { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:80 uuid:101225a1
      config, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:81 uuid:bab8972b
      lastRun: lastRunInfo // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:82 uuid:38a03578
    }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:83 uuid:a60852fb
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:84 uuid:1e7dc949
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:85 uuid:4bc4228d
    console.log('Configuration saved.'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:86 uuid:6b29c812
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:87 uuid:0c6daffe
    console.error('Error saving config:', error.message); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:88 uuid:59b56e23
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:89 uuid:e6e4db0c
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:90 uuid:0acef157
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:91 uuid:1ff983cb
function ensureBackupDir() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:92 uuid:10c7ef5c
  if (!fs.existsSync(BACKUP_DIR)) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:93 uuid:f678441d
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:94 uuid:2d4437a1
    console.log(`Created backup directory: ${BACKUP_DIR}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:95 uuid:a6b0b8db
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:96 uuid:fa744499
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:97 uuid:5f9b3efc
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:98 uuid:e89e96c4
function backupFile(filePath) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:99 uuid:1e58df8e
  try { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:100 uuid:b2ec3794
    ensureBackupDir(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:101 uuid:48ea0fe6
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:102 uuid:b20d064a
    const content = fs.readFileSync(filePath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:103 uuid:70ed49c7
    const fileName = path.basename(filePath); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:104 uuid:7b914cd4
    const relativePath = path.relative(process.cwd(), filePath); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:105 uuid:de76d1b4
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:106 uuid:e08e95be
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:107 uuid:cc18e4c7
    fs.writeFileSync(backupPath, content); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:108 uuid:17318bbb
    return { relativePath, backupPath }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:109 uuid:5aa2bb40
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:110 uuid:0dcbd8e9
    console.error(`Error backing up ${filePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:111 uuid:ff14087d
    return null; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:112 uuid:d23348b5
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:113 uuid:52a95136
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:114 uuid:530b2f21
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:115 uuid:de0fb795
function addUUIDsToFile(filePath) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:116 uuid:bdad17c8
  try { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:117 uuid:2306c9ff
    if (path.basename(filePath) === SCRIPT_FILENAME) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:118 uuid:6a52c2dc
      console.log(`Skipping self: ${filePath}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:119 uuid:942159c5
      return null; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:120 uuid:5e0c39d4
    } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:121 uuid:6e42eb7b
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:122 uuid:b8b9983c
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:123 uuid:b533c9f4
    const backup = backupFile(filePath); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:124 uuid:91713deb
    if (!backup) return null; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:125 uuid:509f82da
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:126 uuid:469eb903
    const { branch, lastCommit } = getGitInfo(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:127 uuid:62409a1c
    const timestamp = new Date().toISOString(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:128 uuid:48ddb29a
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:129 uuid:0b9efa55
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:130 uuid:553d297a
    let metaParts = []; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:131 uuid:400f7e74
    if (config.includeBranch && branch) metaParts.push(branch); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:132 uuid:e1821b59
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:133 uuid:be4efce5
    if (config.includeTimestamp) metaParts.push(timestamp); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:134 uuid:6204259c
    const metaInfo = metaParts.join('|'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:135 uuid:0aedf15e
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:136 uuid:38417657
    let content = fs.readFileSync(filePath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:137 uuid:d81e0958
    const lines = content.split('\n'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:138 uuid:52269aa8
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:139 uuid:b177a745
    const updatedLines = lines.map((line, index) => { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:140 uuid:8b532f91
      const lineNumber = index + 1; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:141 uuid:fa91fff9
      let cleanLine = line; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:142 uuid:18e65f7c
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:143 uuid:c940c52f
      if (line.includes(' // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:144 uuid:1ab8b129
        cleanLine = line.substring(0, line.indexOf(' // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:145 uuid:0daa7f86
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:146 uuid:48182223
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:147 uuid:af90fa93
      let comment = ' // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:148 uuid:15d1a4e8
      if (metaInfo) comment += `${metaInfo} `; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:149 uuid:364ff66f
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:150 uuid:839c2304
      comment += `uuid:${generateShortUUID()}`; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:151 uuid:f7cc9346
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:152 uuid:2fd3414f
      if (cleanLine.trim() === '') { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:153 uuid:4ecb2de7
        return comment.trim(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:154 uuid:00107c37
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:155 uuid:aaf0bc9d
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:156 uuid:02858330
      return `${cleanLine.trimEnd()}${comment}`; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:157 uuid:faf9e3f6
    }); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:158 uuid:c117286b
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:159 uuid:80092a11
    fs.writeFileSync(filePath, updatedLines.join('\n')); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:160 uuid:db8fca75
    console.log(`Updated: ${filePath}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:161 uuid:c1eda43a
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:162 uuid:585ab2e2
    return backup; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:163 uuid:47b7e018
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:164 uuid:810cc390
    console.error(`Error processing ${filePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:165 uuid:1bab9c96
    return null; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:166 uuid:c23fb77a
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:167 uuid:d3dfdfb6
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:168 uuid:e07ada2d
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:169 uuid:2a87d9ec
function processDirectory(dirPath) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:170 uuid:108b01f0
  const modifiedFiles = []; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:171 uuid:d6c633c5
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:172 uuid:b75c4c11
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:173 uuid:569f4245
  for (const entry of entries) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:174 uuid:1a1b4400
    const fullPath = path.join(dirPath, entry.name); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:175 uuid:dbd426a7
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:176 uuid:9b578118
    if (entry.isDirectory()) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:177 uuid:e3ebbac9
      if (!SKIP_DIRS.includes(entry.name)) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:178 uuid:0e831703
        const subDirResults = processDirectory(fullPath); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:179 uuid:f1fdceb8
        modifiedFiles.push(...subDirResults); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:180 uuid:cfa84362
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:181 uuid:ed44c887
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:182 uuid:f46bcaf5
      const result = addUUIDsToFile(fullPath); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:183 uuid:24eb4a74
      if (result) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:184 uuid:179f0e87
        modifiedFiles.push(result); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:185 uuid:a2bdc80b
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:186 uuid:33bd2078
    } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:187 uuid:86d4f50d
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:188 uuid:f74d5cca
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:189 uuid:a85022d0
  return modifiedFiles; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:190 uuid:8e28b3d6
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:191 uuid:5e6d7a43
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:192 uuid:a753aff9
function rollbackLastRun() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:193 uuid:64262e13
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:194 uuid:d246d50e
    console.log('No previous run found to rollback.'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:195 uuid:7a71c7e1
    return; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:196 uuid:c486dd1d
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:197 uuid:f46885d5
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:198 uuid:a459fdad
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:199 uuid:c26a60cf
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:200 uuid:a2aa37c1
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:201 uuid:ac3d35c9
  let successCount = 0; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:202 uuid:03ce3ced
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:203 uuid:07d7290e
  for (const file of lastRunInfo.files) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:204 uuid:e4e55f1f
    try { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:205 uuid:900a8314
      if (fs.existsSync(file.backupPath)) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:206 uuid:97f8d736
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:207 uuid:47da143d
        const targetPath = path.join(process.cwd(), file.relativePath); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:208 uuid:b003cd56
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:209 uuid:5e84fdaa
        fs.writeFileSync(targetPath, backupContent); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:210 uuid:57185f1d
        console.log(`Restored: ${file.relativePath}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:211 uuid:0d900840
        successCount++; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:212 uuid:1f9df7ce
      } else { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:213 uuid:5951d152
        console.error(`Backup not found: ${file.backupPath}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:214 uuid:0b0d1e96
      } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:215 uuid:8109bba5
    } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:216 uuid:42db514e
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:217 uuid:9aea91e5
    } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:218 uuid:1f3cb993
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:219 uuid:eed83921
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:220 uuid:e249e3e2
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:221 uuid:704bbb72
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:222 uuid:7add8162
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:223 uuid:f93fb089
  lastRunInfo = { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:224 uuid:1abe9631
    timestamp: null, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:225 uuid:c4c2a8fe
    files: [] // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:226 uuid:a61e73b6
  }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:227 uuid:be5ff674
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:228 uuid:65f9a2b6
  saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:229 uuid:73d99a44
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:230 uuid:5ee12b82
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:231 uuid:bbc79bfb
function runUUIDProcess() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:232 uuid:a72833b5
  const modifiedFiles = processDirectory(process.cwd()); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:233 uuid:98fbc048
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:234 uuid:5d3ac638
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:235 uuid:fcbc123b
  lastRunInfo = { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:236 uuid:e911627d
    timestamp: Date.now(), // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:237 uuid:4f07f788
    files: modifiedFiles // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:238 uuid:16411e71
  }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:239 uuid:64d573fb
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:240 uuid:8e308134
  saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:241 uuid:dbe25860
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:242 uuid:59cd034d
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:243 uuid:3f5bc1d5
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:244 uuid:4ee51197
function showMenu() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:245 uuid:b1b4f969
  const rl = readline.createInterface({ // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:246 uuid:55a4f867
    input: process.stdin, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:247 uuid:da386da9
    output: process.stdout // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:248 uuid:da8a757d
  }); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:249 uuid:f3981eeb
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:250 uuid:b2655db5
  console.log('\nUUID CLI Configuration:'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:251 uuid:058b8a79
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:252 uuid:4bda987a
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:253 uuid:a84bdea7
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:254 uuid:30a82466
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:255 uuid:bbd775d7
  console.log('5. Reset to Defaults'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:256 uuid:5a5e4678
  console.log('6. Save and Run'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:257 uuid:65986abf
  console.log('7. Rollback Last Run'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:258 uuid:c47d1b25
  console.log('8. Exit'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:259 uuid:210c46c9
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:260 uuid:0fc56571
  rl.question('\nEnter option number: ', (answer) => { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:261 uuid:a25c6f2a
    switch(answer) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:262 uuid:9f69b8b9
      case '1': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:263 uuid:37c96625
        config.includeBranch = !config.includeBranch; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:264 uuid:10d5f470
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:265 uuid:75b3abcd
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:266 uuid:a4c62271
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:267 uuid:b09a1243
      case '2': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:268 uuid:188c609b
        config.includeCommit = !config.includeCommit; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:269 uuid:a4a4520f
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:270 uuid:f6ef45d8
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:271 uuid:9fc869c8
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:272 uuid:35093c40
      case '3': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:273 uuid:fd1e51e3
        config.includeTimestamp = !config.includeTimestamp; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:274 uuid:2c01301c
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:275 uuid:aaa33d33
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:276 uuid:8b5e5896
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:277 uuid:36d66f64
      case '4': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:278 uuid:160823e5
        config.includeLineNumber = !config.includeLineNumber; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:279 uuid:593eaec6
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:280 uuid:e1a24684
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:281 uuid:7b3025ca
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:282 uuid:d506847b
      case '5': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:283 uuid:efa58938
        config = { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:284 uuid:f5af5f79
          includeBranch: true, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:285 uuid:97d1b684
          includeCommit: true, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:286 uuid:4663e393
          includeTimestamp: true, // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:287 uuid:78abeea4
          includeLineNumber: true // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:288 uuid:826002b9
        }; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:289 uuid:ab792fc5
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:290 uuid:7db9582b
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:291 uuid:4ea57d6c
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:292 uuid:4a53ff31
      case '6': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:293 uuid:1c505cbf
        saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:294 uuid:5a737728
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:295 uuid:3d6a00ea
        runUUIDProcess(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:296 uuid:f00bd8a9
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:297 uuid:409cfae4
      case '7': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:298 uuid:c7a82f93
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:299 uuid:78012e87
        rollbackLastRun(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:300 uuid:93ffe6ff
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:301 uuid:995d7a2d
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:302 uuid:dd94e39d
      case '8': // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:303 uuid:463912e2
        console.log('Exiting without changes.'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:304 uuid:c01fe30c
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:305 uuid:0dce1b38
        break; // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:306 uuid:e83f19b1
      default: // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:307 uuid:0af26e4e
        console.log('Invalid option. Please try again.'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:308 uuid:d8d66d44
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:309 uuid:3e1d9b4a
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:310 uuid:7efc6271
    } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:311 uuid:a321dd1d
  }); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:312 uuid:fb23f860
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:313 uuid:528df6a1
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:314 uuid:bdf069f7
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:315 uuid:258c5cd4
function main() { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:316 uuid:e0467665
  loadConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:317 uuid:c438aca5
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:318 uuid:5b6d27e2
  if (process.argv.length > 2) { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:319 uuid:493551bb
    if (process.argv[2] === '--run') { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:320 uuid:9552e8b5
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:321 uuid:90e4bb83
      runUUIDProcess(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:322 uuid:9e2a9daa
    } else if (process.argv[2] === '--rollback') { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:323 uuid:d390eb98
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:324 uuid:d28b76b5
      rollbackLastRun(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:325 uuid:3d040ccb
    } else { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:326 uuid:c2f17db9
      console.log('Unknown command. Available commands: --run, --rollback'); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:327 uuid:fc79a1a1
    } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:328 uuid:ff4a1382
  } else { // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:329 uuid:62644dd2
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:330 uuid:78b775cd
    showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:331 uuid:27df0f00
  } // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:332 uuid:c57f6142
} // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:333 uuid:506fdffe
// commit:6a2a820|time:2025-04-18T16:15:26.964Z line:334 uuid:de324934
main(); // commit:6a2a820|time:2025-04-18T16:15:26.964Z line:335 uuid:d09e494a