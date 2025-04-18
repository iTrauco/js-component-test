// b129d2f|2025-04-18T16:13:59.565Z line:1 uuid:fab658d6
// b129d2f|2025-04-18T16:13:59.565Z line:2 uuid:43329496
// b129d2f|2025-04-18T16:13:59.565Z line:3 uuid:6baece07
// b129d2f|2025-04-18T16:13:59.565Z line:4 uuid:27b9b46e
// b129d2f|2025-04-18T16:13:59.565Z line:5 uuid:a00e35ae
// b129d2f|2025-04-18T16:13:59.565Z line:6 uuid:f838d038
// b129d2f|2025-04-18T16:13:59.565Z line:7 uuid:9f9b3170
// b129d2f|2025-04-18T16:13:59.565Z line:8 uuid:7a115cec
// b129d2f|2025-04-18T16:13:59.565Z line:9 uuid:f93be08a
// b129d2f|2025-04-18T16:13:59.565Z line:10 uuid:3fc33dfa
const fs = require('fs'); // b129d2f|2025-04-18T16:13:59.565Z line:11 uuid:6bcd8423
const path = require('path'); // b129d2f|2025-04-18T16:13:59.565Z line:12 uuid:6c864355
const crypto = require('crypto'); // b129d2f|2025-04-18T16:13:59.565Z line:13 uuid:0e63f461
const { execSync } = require('child_process'); // b129d2f|2025-04-18T16:13:59.565Z line:14 uuid:f7aa8895
const readline = require('readline'); // b129d2f|2025-04-18T16:13:59.565Z line:15 uuid:d688f2ca
// b129d2f|2025-04-18T16:13:59.565Z line:16 uuid:82576667
const CONFIG_FILE = '.uuid-cli-config.json'; // b129d2f|2025-04-18T16:13:59.565Z line:17 uuid:fe02e306
const BACKUP_DIR = '.uuid-cli-backups'; // b129d2f|2025-04-18T16:13:59.565Z line:18 uuid:596c5ec0
const SCRIPT_FILENAME = path.basename(__filename); // b129d2f|2025-04-18T16:13:59.565Z line:19 uuid:ed0d71f8
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // b129d2f|2025-04-18T16:13:59.565Z line:20 uuid:17c5e187
// b129d2f|2025-04-18T16:13:59.565Z line:21 uuid:46197ba5
// b129d2f|2025-04-18T16:13:59.565Z line:22 uuid:b95c5c65
// b129d2f|2025-04-18T16:13:59.565Z line:23 uuid:e4fcfeda
// b129d2f|2025-04-18T16:13:59.565Z line:24 uuid:71b31d08
// b129d2f|2025-04-18T16:13:59.565Z line:25 uuid:1c77757c
let config = { // b129d2f|2025-04-18T16:13:59.565Z line:26 uuid:cfe9992f
  includeBranch: true, // b129d2f|2025-04-18T16:13:59.565Z line:27 uuid:564bfde4
  includeCommit: true, // b129d2f|2025-04-18T16:13:59.565Z line:28 uuid:a08a549c
  includeTimestamp: true, // b129d2f|2025-04-18T16:13:59.565Z line:29 uuid:ca86a874
  includeLineNumber: true // b129d2f|2025-04-18T16:13:59.565Z line:30 uuid:7953869f
}; // b129d2f|2025-04-18T16:13:59.565Z line:31 uuid:ef60c9be
// b129d2f|2025-04-18T16:13:59.565Z line:32 uuid:24d6ed6f
// b129d2f|2025-04-18T16:13:59.565Z line:33 uuid:3ee91551
let lastRunInfo = { // b129d2f|2025-04-18T16:13:59.565Z line:34 uuid:7d042789
  timestamp: null, // b129d2f|2025-04-18T16:13:59.565Z line:35 uuid:f769a688
  files: [] // b129d2f|2025-04-18T16:13:59.565Z line:36 uuid:0df5a8df
}; // b129d2f|2025-04-18T16:13:59.565Z line:37 uuid:44eebf1b
// b129d2f|2025-04-18T16:13:59.565Z line:38 uuid:499df97d
function generateShortUUID() { // b129d2f|2025-04-18T16:13:59.565Z line:39 uuid:ac52e1b3
  return crypto.randomBytes(4).toString('hex'); // b129d2f|2025-04-18T16:13:59.565Z line:40 uuid:17040b75
} // b129d2f|2025-04-18T16:13:59.565Z line:41 uuid:1aaf5449
// b129d2f|2025-04-18T16:13:59.565Z line:42 uuid:9ed4e9ff
function getGitInfo() { // b129d2f|2025-04-18T16:13:59.565Z line:43 uuid:a715bd43
  try { // b129d2f|2025-04-18T16:13:59.565Z line:44 uuid:14f2d58d
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // b129d2f|2025-04-18T16:13:59.565Z line:45 uuid:76d788d3
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // b129d2f|2025-04-18T16:13:59.565Z line:46 uuid:2867e1ec
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // b129d2f|2025-04-18T16:13:59.565Z line:47 uuid:faf1a652
    return { branch, lastCommit }; // b129d2f|2025-04-18T16:13:59.565Z line:48 uuid:8c38b964
  } catch { // b129d2f|2025-04-18T16:13:59.565Z line:49 uuid:8ab9d75e
    return { branch: null, lastCommit: null }; // b129d2f|2025-04-18T16:13:59.565Z line:50 uuid:1eb51609
  } // b129d2f|2025-04-18T16:13:59.565Z line:51 uuid:2926e9c6
} // b129d2f|2025-04-18T16:13:59.565Z line:52 uuid:549b3719
// b129d2f|2025-04-18T16:13:59.565Z line:53 uuid:7aed2561
function loadConfig() { // b129d2f|2025-04-18T16:13:59.565Z line:54 uuid:d7e80c59
  try { // b129d2f|2025-04-18T16:13:59.565Z line:55 uuid:52718e4a
    if (fs.existsSync(CONFIG_FILE)) { // b129d2f|2025-04-18T16:13:59.565Z line:56 uuid:4e12b94b
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // b129d2f|2025-04-18T16:13:59.565Z line:57 uuid:6f5b8d15
      const data = JSON.parse(fileContent); // b129d2f|2025-04-18T16:13:59.565Z line:58 uuid:c630961d
// b129d2f|2025-04-18T16:13:59.565Z line:59 uuid:d88ec4dc
// b129d2f|2025-04-18T16:13:59.565Z line:60 uuid:9ef8a93d
      if (data.config) { // b129d2f|2025-04-18T16:13:59.565Z line:61 uuid:b9750b39
        config = data.config; // b129d2f|2025-04-18T16:13:59.565Z line:62 uuid:6f25f938
      } // b129d2f|2025-04-18T16:13:59.565Z line:63 uuid:dcb734c3
// b129d2f|2025-04-18T16:13:59.565Z line:64 uuid:2ea7f3bd
// b129d2f|2025-04-18T16:13:59.565Z line:65 uuid:0e473f67
      if (data.lastRun) { // b129d2f|2025-04-18T16:13:59.565Z line:66 uuid:969efa6b
        lastRunInfo = data.lastRun; // b129d2f|2025-04-18T16:13:59.565Z line:67 uuid:3449424b
      } // b129d2f|2025-04-18T16:13:59.565Z line:68 uuid:62860248
// b129d2f|2025-04-18T16:13:59.565Z line:69 uuid:88dba44b
      console.log('Loaded configuration:', config); // b129d2f|2025-04-18T16:13:59.565Z line:70 uuid:6efbb6a2
    } // b129d2f|2025-04-18T16:13:59.565Z line:71 uuid:893e5a2f
  } catch (error) { // b129d2f|2025-04-18T16:13:59.565Z line:72 uuid:04ca5c30
    console.error('Error loading config:', error.message); // b129d2f|2025-04-18T16:13:59.565Z line:73 uuid:67e3e098
  } // b129d2f|2025-04-18T16:13:59.565Z line:74 uuid:16770300
} // b129d2f|2025-04-18T16:13:59.565Z line:75 uuid:a7b57212
// b129d2f|2025-04-18T16:13:59.565Z line:76 uuid:decf842d
function saveConfig() { // b129d2f|2025-04-18T16:13:59.565Z line:77 uuid:aa11c8ec
  try { // b129d2f|2025-04-18T16:13:59.565Z line:78 uuid:48abd456
// b129d2f|2025-04-18T16:13:59.565Z line:79 uuid:d2b47e58
    const data = { // b129d2f|2025-04-18T16:13:59.565Z line:80 uuid:7f2ee0bd
      config, // b129d2f|2025-04-18T16:13:59.565Z line:81 uuid:a92f9aa5
      lastRun: lastRunInfo // b129d2f|2025-04-18T16:13:59.565Z line:82 uuid:73e88ae1
    }; // b129d2f|2025-04-18T16:13:59.565Z line:83 uuid:70e6ef7b
// b129d2f|2025-04-18T16:13:59.565Z line:84 uuid:9ff3cecc
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // b129d2f|2025-04-18T16:13:59.565Z line:85 uuid:24b88d46
    console.log('Configuration saved.'); // b129d2f|2025-04-18T16:13:59.565Z line:86 uuid:42a8c014
  } catch (error) { // b129d2f|2025-04-18T16:13:59.565Z line:87 uuid:356c7393
    console.error('Error saving config:', error.message); // b129d2f|2025-04-18T16:13:59.565Z line:88 uuid:596e6ab2
  } // b129d2f|2025-04-18T16:13:59.565Z line:89 uuid:d435aed8
} // b129d2f|2025-04-18T16:13:59.565Z line:90 uuid:50943677
// b129d2f|2025-04-18T16:13:59.565Z line:91 uuid:39039b23
function ensureBackupDir() { // b129d2f|2025-04-18T16:13:59.565Z line:92 uuid:cb19dc27
  if (!fs.existsSync(BACKUP_DIR)) { // b129d2f|2025-04-18T16:13:59.565Z line:93 uuid:7c21e22e
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // b129d2f|2025-04-18T16:13:59.565Z line:94 uuid:ec9b26c0
    console.log(`Created backup directory: ${BACKUP_DIR}`); // b129d2f|2025-04-18T16:13:59.565Z line:95 uuid:aa4c19df
  } // b129d2f|2025-04-18T16:13:59.565Z line:96 uuid:c1314efc
} // b129d2f|2025-04-18T16:13:59.565Z line:97 uuid:03744a26
// b129d2f|2025-04-18T16:13:59.565Z line:98 uuid:3e63182a
function backupFile(filePath) { // b129d2f|2025-04-18T16:13:59.565Z line:99 uuid:a008cfb6
  try { // b129d2f|2025-04-18T16:13:59.565Z line:100 uuid:a18b7663
    ensureBackupDir(); // b129d2f|2025-04-18T16:13:59.565Z line:101 uuid:e60eb567
// b129d2f|2025-04-18T16:13:59.565Z line:102 uuid:b0ea5e21
    const content = fs.readFileSync(filePath, 'utf8'); // b129d2f|2025-04-18T16:13:59.565Z line:103 uuid:1c50d790
    const fileName = path.basename(filePath); // b129d2f|2025-04-18T16:13:59.565Z line:104 uuid:8ddecd14
    const relativePath = path.relative(process.cwd(), filePath); // b129d2f|2025-04-18T16:13:59.565Z line:105 uuid:e4e679c9
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // b129d2f|2025-04-18T16:13:59.565Z line:106 uuid:88c1d02e
// b129d2f|2025-04-18T16:13:59.565Z line:107 uuid:05b0dc72
    fs.writeFileSync(backupPath, content); // b129d2f|2025-04-18T16:13:59.565Z line:108 uuid:f117502e
    return { relativePath, backupPath }; // b129d2f|2025-04-18T16:13:59.565Z line:109 uuid:9df8854a
  } catch (error) { // b129d2f|2025-04-18T16:13:59.565Z line:110 uuid:cc927290
    console.error(`Error backing up ${filePath}: ${error.message}`); // b129d2f|2025-04-18T16:13:59.565Z line:111 uuid:2f1f665c
    return null; // b129d2f|2025-04-18T16:13:59.565Z line:112 uuid:2a2e11c8
  } // b129d2f|2025-04-18T16:13:59.565Z line:113 uuid:2405f5a7
} // b129d2f|2025-04-18T16:13:59.565Z line:114 uuid:0af0c567
// b129d2f|2025-04-18T16:13:59.565Z line:115 uuid:634600b0
function addUUIDsToFile(filePath) { // b129d2f|2025-04-18T16:13:59.565Z line:116 uuid:1e160114
  try { // b129d2f|2025-04-18T16:13:59.565Z line:117 uuid:04e6f6c8
    if (path.basename(filePath) === SCRIPT_FILENAME) { // b129d2f|2025-04-18T16:13:59.565Z line:118 uuid:63195be4
      console.log(`Skipping self: ${filePath}`); // b129d2f|2025-04-18T16:13:59.565Z line:119 uuid:d478d1af
      return null; // b129d2f|2025-04-18T16:13:59.565Z line:120 uuid:8a4f6c36
    } // b129d2f|2025-04-18T16:13:59.565Z line:121 uuid:1cc8bed0
// b129d2f|2025-04-18T16:13:59.565Z line:122 uuid:a75fb987
// b129d2f|2025-04-18T16:13:59.565Z line:123 uuid:275b1037
    const backup = backupFile(filePath); // b129d2f|2025-04-18T16:13:59.565Z line:124 uuid:97dadfb4
    if (!backup) return null; // b129d2f|2025-04-18T16:13:59.565Z line:125 uuid:482cde87
// b129d2f|2025-04-18T16:13:59.565Z line:126 uuid:c6c327bd
    const { branch, lastCommit } = getGitInfo(); // b129d2f|2025-04-18T16:13:59.565Z line:127 uuid:0bc3180e
    const timestamp = new Date().toISOString(); // b129d2f|2025-04-18T16:13:59.565Z line:128 uuid:062171d8
// b129d2f|2025-04-18T16:13:59.565Z line:129 uuid:fb620427
// b129d2f|2025-04-18T16:13:59.565Z line:130 uuid:80041182
    let metaParts = []; // b129d2f|2025-04-18T16:13:59.565Z line:131 uuid:e977ab03
    if (config.includeBranch && branch) metaParts.push(branch); // b129d2f|2025-04-18T16:13:59.565Z line:132 uuid:f5f707a3
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // b129d2f|2025-04-18T16:13:59.565Z line:133 uuid:66b5e505
    if (config.includeTimestamp) metaParts.push(timestamp); // b129d2f|2025-04-18T16:13:59.565Z line:134 uuid:4478bdb7
    const metaInfo = metaParts.join('|'); // b129d2f|2025-04-18T16:13:59.565Z line:135 uuid:e5f447c6
// b129d2f|2025-04-18T16:13:59.565Z line:136 uuid:aca32490
    let content = fs.readFileSync(filePath, 'utf8'); // b129d2f|2025-04-18T16:13:59.565Z line:137 uuid:6d1b0283
    const lines = content.split('\n'); // b129d2f|2025-04-18T16:13:59.565Z line:138 uuid:8f85f669
// b129d2f|2025-04-18T16:13:59.565Z line:139 uuid:fb4c2287
    const updatedLines = lines.map((line, index) => { // b129d2f|2025-04-18T16:13:59.565Z line:140 uuid:7ecfe1ef
      const lineNumber = index + 1; // b129d2f|2025-04-18T16:13:59.565Z line:141 uuid:ab1ee0a9
      let cleanLine = line; // b129d2f|2025-04-18T16:13:59.565Z line:142 uuid:539173e0
// b129d2f|2025-04-18T16:13:59.565Z line:143 uuid:b64c7cd4
      if (line.includes(' // b129d2f|2025-04-18T16:13:59.565Z line:144 uuid:19d4f2a6
        cleanLine = line.substring(0, line.indexOf(' // b129d2f|2025-04-18T16:13:59.565Z line:145 uuid:84564224
      } // b129d2f|2025-04-18T16:13:59.565Z line:146 uuid:361cc1eb
// b129d2f|2025-04-18T16:13:59.565Z line:147 uuid:33b5814e
      let comment = ' // b129d2f|2025-04-18T16:13:59.565Z line:148 uuid:11bd7fae
      if (metaInfo) comment += `${metaInfo} `; // b129d2f|2025-04-18T16:13:59.565Z line:149 uuid:fda01a34
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // b129d2f|2025-04-18T16:13:59.565Z line:150 uuid:16daa869
      comment += `uuid:${generateShortUUID()}`; // b129d2f|2025-04-18T16:13:59.565Z line:151 uuid:4e8f3bde
// b129d2f|2025-04-18T16:13:59.565Z line:152 uuid:cf08570c
      if (cleanLine.trim() === '') { // b129d2f|2025-04-18T16:13:59.565Z line:153 uuid:f8f8b9c8
        return comment.trim(); // b129d2f|2025-04-18T16:13:59.565Z line:154 uuid:ced2eabd
      } // b129d2f|2025-04-18T16:13:59.565Z line:155 uuid:8ea56d65
// b129d2f|2025-04-18T16:13:59.565Z line:156 uuid:abc2e1df
      return `${cleanLine.trimEnd()}${comment}`; // b129d2f|2025-04-18T16:13:59.565Z line:157 uuid:c1f2f4f0
    }); // b129d2f|2025-04-18T16:13:59.565Z line:158 uuid:60961d60
// b129d2f|2025-04-18T16:13:59.565Z line:159 uuid:205c72bd
    fs.writeFileSync(filePath, updatedLines.join('\n')); // b129d2f|2025-04-18T16:13:59.565Z line:160 uuid:d1b556ab
    console.log(`Updated: ${filePath}`); // b129d2f|2025-04-18T16:13:59.565Z line:161 uuid:9da109e5
// b129d2f|2025-04-18T16:13:59.565Z line:162 uuid:61b9be08
    return backup; // b129d2f|2025-04-18T16:13:59.565Z line:163 uuid:25bbb87c
  } catch (error) { // b129d2f|2025-04-18T16:13:59.565Z line:164 uuid:39bce940
    console.error(`Error processing ${filePath}: ${error.message}`); // b129d2f|2025-04-18T16:13:59.565Z line:165 uuid:1ff19e19
    return null; // b129d2f|2025-04-18T16:13:59.565Z line:166 uuid:3019212e
  } // b129d2f|2025-04-18T16:13:59.565Z line:167 uuid:b6f977af
} // b129d2f|2025-04-18T16:13:59.565Z line:168 uuid:03eba232
// b129d2f|2025-04-18T16:13:59.565Z line:169 uuid:b5a69956
function processDirectory(dirPath) { // b129d2f|2025-04-18T16:13:59.565Z line:170 uuid:1cd7b260
  const modifiedFiles = []; // b129d2f|2025-04-18T16:13:59.565Z line:171 uuid:45a85734
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // b129d2f|2025-04-18T16:13:59.565Z line:172 uuid:17ba8c6e
// b129d2f|2025-04-18T16:13:59.565Z line:173 uuid:e05c094b
  for (const entry of entries) { // b129d2f|2025-04-18T16:13:59.565Z line:174 uuid:2ebdde7c
    const fullPath = path.join(dirPath, entry.name); // b129d2f|2025-04-18T16:13:59.565Z line:175 uuid:7d99319b
// b129d2f|2025-04-18T16:13:59.565Z line:176 uuid:69415f94
    if (entry.isDirectory()) { // b129d2f|2025-04-18T16:13:59.565Z line:177 uuid:08a42900
      if (!SKIP_DIRS.includes(entry.name)) { // b129d2f|2025-04-18T16:13:59.565Z line:178 uuid:5589e9e2
        const subDirResults = processDirectory(fullPath); // b129d2f|2025-04-18T16:13:59.565Z line:179 uuid:182d639c
        modifiedFiles.push(...subDirResults); // b129d2f|2025-04-18T16:13:59.565Z line:180 uuid:4b4d443e
      } // b129d2f|2025-04-18T16:13:59.565Z line:181 uuid:71a9af65
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // b129d2f|2025-04-18T16:13:59.565Z line:182 uuid:c1a6548d
      const result = addUUIDsToFile(fullPath); // b129d2f|2025-04-18T16:13:59.565Z line:183 uuid:6917993c
      if (result) { // b129d2f|2025-04-18T16:13:59.565Z line:184 uuid:cf3feecc
        modifiedFiles.push(result); // b129d2f|2025-04-18T16:13:59.565Z line:185 uuid:e5eef96b
      } // b129d2f|2025-04-18T16:13:59.565Z line:186 uuid:9990dc9e
    } // b129d2f|2025-04-18T16:13:59.565Z line:187 uuid:6ec48d3d
  } // b129d2f|2025-04-18T16:13:59.565Z line:188 uuid:12d9d7ef
// b129d2f|2025-04-18T16:13:59.565Z line:189 uuid:e13e99aa
  return modifiedFiles; // b129d2f|2025-04-18T16:13:59.565Z line:190 uuid:d84fb5c0
} // b129d2f|2025-04-18T16:13:59.565Z line:191 uuid:1f15c842
// b129d2f|2025-04-18T16:13:59.565Z line:192 uuid:3c32f56e
function rollbackLastRun() { // b129d2f|2025-04-18T16:13:59.565Z line:193 uuid:bbef3800
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // b129d2f|2025-04-18T16:13:59.565Z line:194 uuid:8d4c0f65
    console.log('No previous run found to rollback.'); // b129d2f|2025-04-18T16:13:59.565Z line:195 uuid:1b61f666
    return; // b129d2f|2025-04-18T16:13:59.565Z line:196 uuid:041477ce
  } // b129d2f|2025-04-18T16:13:59.565Z line:197 uuid:0d18f789
// b129d2f|2025-04-18T16:13:59.565Z line:198 uuid:b2b224b9
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // b129d2f|2025-04-18T16:13:59.565Z line:199 uuid:881a3276
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // b129d2f|2025-04-18T16:13:59.565Z line:200 uuid:fb1e8b9c
// b129d2f|2025-04-18T16:13:59.565Z line:201 uuid:74155c0b
  let successCount = 0; // b129d2f|2025-04-18T16:13:59.565Z line:202 uuid:ed022fff
// b129d2f|2025-04-18T16:13:59.565Z line:203 uuid:6defa829
  for (const file of lastRunInfo.files) { // b129d2f|2025-04-18T16:13:59.565Z line:204 uuid:1c2e7419
    try { // b129d2f|2025-04-18T16:13:59.565Z line:205 uuid:88ef8c41
      if (fs.existsSync(file.backupPath)) { // b129d2f|2025-04-18T16:13:59.565Z line:206 uuid:1b4ff80f
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // b129d2f|2025-04-18T16:13:59.565Z line:207 uuid:994fc2ba
        const targetPath = path.join(process.cwd(), file.relativePath); // b129d2f|2025-04-18T16:13:59.565Z line:208 uuid:890b038d
// b129d2f|2025-04-18T16:13:59.565Z line:209 uuid:89329997
        fs.writeFileSync(targetPath, backupContent); // b129d2f|2025-04-18T16:13:59.565Z line:210 uuid:a99de59d
        console.log(`Restored: ${file.relativePath}`); // b129d2f|2025-04-18T16:13:59.565Z line:211 uuid:74ef37d9
        successCount++; // b129d2f|2025-04-18T16:13:59.565Z line:212 uuid:a20c3a8b
      } else { // b129d2f|2025-04-18T16:13:59.565Z line:213 uuid:2ea5413f
        console.error(`Backup not found: ${file.backupPath}`); // b129d2f|2025-04-18T16:13:59.565Z line:214 uuid:7a86a242
      } // b129d2f|2025-04-18T16:13:59.565Z line:215 uuid:225ec897
    } catch (error) { // b129d2f|2025-04-18T16:13:59.565Z line:216 uuid:d4b09f0e
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // b129d2f|2025-04-18T16:13:59.565Z line:217 uuid:468fa41f
    } // b129d2f|2025-04-18T16:13:59.565Z line:218 uuid:3271beb2
  } // b129d2f|2025-04-18T16:13:59.565Z line:219 uuid:c0ed6c0f
// b129d2f|2025-04-18T16:13:59.565Z line:220 uuid:5ce9e2d5
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // b129d2f|2025-04-18T16:13:59.565Z line:221 uuid:e1ae13e0
// b129d2f|2025-04-18T16:13:59.565Z line:222 uuid:cc58315f
// b129d2f|2025-04-18T16:13:59.565Z line:223 uuid:6c9ed095
  lastRunInfo = { // b129d2f|2025-04-18T16:13:59.565Z line:224 uuid:2532cb7b
    timestamp: null, // b129d2f|2025-04-18T16:13:59.565Z line:225 uuid:ab678bce
    files: [] // b129d2f|2025-04-18T16:13:59.565Z line:226 uuid:a0d441f5
  }; // b129d2f|2025-04-18T16:13:59.565Z line:227 uuid:2e580ed3
// b129d2f|2025-04-18T16:13:59.565Z line:228 uuid:2e7b72b9
  saveConfig(); // b129d2f|2025-04-18T16:13:59.565Z line:229 uuid:4ff0a665
} // b129d2f|2025-04-18T16:13:59.565Z line:230 uuid:2ed912e7
// b129d2f|2025-04-18T16:13:59.565Z line:231 uuid:c550ae0a
function runUUIDProcess() { // b129d2f|2025-04-18T16:13:59.565Z line:232 uuid:c58cb6fd
  const modifiedFiles = processDirectory(process.cwd()); // b129d2f|2025-04-18T16:13:59.565Z line:233 uuid:3bdb9a5f
// b129d2f|2025-04-18T16:13:59.565Z line:234 uuid:89790c33
// b129d2f|2025-04-18T16:13:59.565Z line:235 uuid:ff56095f
  lastRunInfo = { // b129d2f|2025-04-18T16:13:59.565Z line:236 uuid:4fc6bff0
    timestamp: Date.now(), // b129d2f|2025-04-18T16:13:59.565Z line:237 uuid:7e17b401
    files: modifiedFiles // b129d2f|2025-04-18T16:13:59.565Z line:238 uuid:b35e7068
  }; // b129d2f|2025-04-18T16:13:59.565Z line:239 uuid:71a39f43
// b129d2f|2025-04-18T16:13:59.565Z line:240 uuid:39859560
  saveConfig(); // b129d2f|2025-04-18T16:13:59.565Z line:241 uuid:4639d92b
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // b129d2f|2025-04-18T16:13:59.565Z line:242 uuid:ea0fbd2c
} // b129d2f|2025-04-18T16:13:59.565Z line:243 uuid:d21b6c99
// b129d2f|2025-04-18T16:13:59.565Z line:244 uuid:f644a018
function showMenu() { // b129d2f|2025-04-18T16:13:59.565Z line:245 uuid:3c112cab
  const rl = readline.createInterface({ // b129d2f|2025-04-18T16:13:59.565Z line:246 uuid:401ca613
    input: process.stdin, // b129d2f|2025-04-18T16:13:59.565Z line:247 uuid:48b34774
    output: process.stdout // b129d2f|2025-04-18T16:13:59.565Z line:248 uuid:f0a150e5
  }); // b129d2f|2025-04-18T16:13:59.565Z line:249 uuid:c5919d63
// b129d2f|2025-04-18T16:13:59.565Z line:250 uuid:8df5c3f9
  console.log('\nUUID CLI Configuration:'); // b129d2f|2025-04-18T16:13:59.565Z line:251 uuid:ce6d5cf2
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.565Z line:252 uuid:b0da84d3
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.565Z line:253 uuid:ce714e35
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.565Z line:254 uuid:619dd938
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // b129d2f|2025-04-18T16:13:59.565Z line:255 uuid:26f35930
  console.log('5. Reset to Defaults'); // b129d2f|2025-04-18T16:13:59.565Z line:256 uuid:0d1b1b4d
  console.log('6. Save and Run'); // b129d2f|2025-04-18T16:13:59.565Z line:257 uuid:8af08560
  console.log('7. Rollback Last Run'); // b129d2f|2025-04-18T16:13:59.565Z line:258 uuid:7fa1f2d8
  console.log('8. Exit'); // b129d2f|2025-04-18T16:13:59.565Z line:259 uuid:9665487f
// b129d2f|2025-04-18T16:13:59.565Z line:260 uuid:94454490
  rl.question('\nEnter option number: ', (answer) => { // b129d2f|2025-04-18T16:13:59.565Z line:261 uuid:ac453c0a
    switch(answer) { // b129d2f|2025-04-18T16:13:59.565Z line:262 uuid:2d14b076
      case '1': // b129d2f|2025-04-18T16:13:59.565Z line:263 uuid:027f3d4c
        config.includeBranch = !config.includeBranch; // b129d2f|2025-04-18T16:13:59.565Z line:264 uuid:283ea24a
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:265 uuid:0bbb0fea
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:266 uuid:37ba3563
        break; // b129d2f|2025-04-18T16:13:59.565Z line:267 uuid:a7acb067
      case '2': // b129d2f|2025-04-18T16:13:59.565Z line:268 uuid:d0a77da9
        config.includeCommit = !config.includeCommit; // b129d2f|2025-04-18T16:13:59.565Z line:269 uuid:35ecbd8e
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:270 uuid:d55df9ca
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:271 uuid:fe5625d9
        break; // b129d2f|2025-04-18T16:13:59.565Z line:272 uuid:d07bc64d
      case '3': // b129d2f|2025-04-18T16:13:59.565Z line:273 uuid:d887bc5d
        config.includeTimestamp = !config.includeTimestamp; // b129d2f|2025-04-18T16:13:59.565Z line:274 uuid:ea0b9233
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:275 uuid:97dfa229
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:276 uuid:38ab7c5a
        break; // b129d2f|2025-04-18T16:13:59.565Z line:277 uuid:ac7be1de
      case '4': // b129d2f|2025-04-18T16:13:59.565Z line:278 uuid:6ea2cb93
        config.includeLineNumber = !config.includeLineNumber; // b129d2f|2025-04-18T16:13:59.565Z line:279 uuid:8eaf645d
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:280 uuid:63dabda7
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:281 uuid:7023a2a9
        break; // b129d2f|2025-04-18T16:13:59.565Z line:282 uuid:04e29223
      case '5': // b129d2f|2025-04-18T16:13:59.565Z line:283 uuid:3262a526
        config = { // b129d2f|2025-04-18T16:13:59.565Z line:284 uuid:e61c2feb
          includeBranch: true, // b129d2f|2025-04-18T16:13:59.565Z line:285 uuid:3b3da5d9
          includeCommit: true, // b129d2f|2025-04-18T16:13:59.565Z line:286 uuid:9aa527ba
          includeTimestamp: true, // b129d2f|2025-04-18T16:13:59.565Z line:287 uuid:1757313d
          includeLineNumber: true // b129d2f|2025-04-18T16:13:59.565Z line:288 uuid:1831a159
        }; // b129d2f|2025-04-18T16:13:59.565Z line:289 uuid:a2c94a01
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:290 uuid:49c42704
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:291 uuid:d4c14883
        break; // b129d2f|2025-04-18T16:13:59.565Z line:292 uuid:7c14dc8e
      case '6': // b129d2f|2025-04-18T16:13:59.565Z line:293 uuid:28c6120d
        saveConfig(); // b129d2f|2025-04-18T16:13:59.565Z line:294 uuid:ea0fb88e
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:295 uuid:88ba8176
        runUUIDProcess(); // b129d2f|2025-04-18T16:13:59.565Z line:296 uuid:df5133e7
        break; // b129d2f|2025-04-18T16:13:59.565Z line:297 uuid:366b5999
      case '7': // b129d2f|2025-04-18T16:13:59.565Z line:298 uuid:0363d170
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:299 uuid:51ae41bb
        rollbackLastRun(); // b129d2f|2025-04-18T16:13:59.565Z line:300 uuid:83544388
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:301 uuid:61359bd5
        break; // b129d2f|2025-04-18T16:13:59.565Z line:302 uuid:b36d62e5
      case '8': // b129d2f|2025-04-18T16:13:59.565Z line:303 uuid:18b5d975
        console.log('Exiting without changes.'); // b129d2f|2025-04-18T16:13:59.565Z line:304 uuid:94286815
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:305 uuid:ee472fc6
        break; // b129d2f|2025-04-18T16:13:59.565Z line:306 uuid:1e2c80bc
      default: // b129d2f|2025-04-18T16:13:59.565Z line:307 uuid:fdd5431e
        console.log('Invalid option. Please try again.'); // b129d2f|2025-04-18T16:13:59.565Z line:308 uuid:4862f6b8
        rl.close(); // b129d2f|2025-04-18T16:13:59.565Z line:309 uuid:4f8d6cea
        showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:310 uuid:e6a4cf4f
    } // b129d2f|2025-04-18T16:13:59.565Z line:311 uuid:f5f91f45
  }); // b129d2f|2025-04-18T16:13:59.565Z line:312 uuid:67c7ad99
} // b129d2f|2025-04-18T16:13:59.565Z line:313 uuid:37e8cf2f
// b129d2f|2025-04-18T16:13:59.565Z line:314 uuid:9404f296
// b129d2f|2025-04-18T16:13:59.565Z line:315 uuid:6f39ba4b
function main() { // b129d2f|2025-04-18T16:13:59.565Z line:316 uuid:5be688b2
  loadConfig(); // b129d2f|2025-04-18T16:13:59.565Z line:317 uuid:bab19f18
// b129d2f|2025-04-18T16:13:59.565Z line:318 uuid:44d735ce
  if (process.argv.length > 2) { // b129d2f|2025-04-18T16:13:59.565Z line:319 uuid:27d917ee
    if (process.argv[2] === '--run') { // b129d2f|2025-04-18T16:13:59.565Z line:320 uuid:d58f5b34
// b129d2f|2025-04-18T16:13:59.565Z line:321 uuid:fe4a3d68
      runUUIDProcess(); // b129d2f|2025-04-18T16:13:59.565Z line:322 uuid:c0eb2d8e
    } else if (process.argv[2] === '--rollback') { // b129d2f|2025-04-18T16:13:59.565Z line:323 uuid:b708aa1a
// b129d2f|2025-04-18T16:13:59.565Z line:324 uuid:4e3988d7
      rollbackLastRun(); // b129d2f|2025-04-18T16:13:59.565Z line:325 uuid:8c7d9026
    } else { // b129d2f|2025-04-18T16:13:59.565Z line:326 uuid:7948f6c5
      console.log('Unknown command. Available commands: --run, --rollback'); // b129d2f|2025-04-18T16:13:59.565Z line:327 uuid:ae49e8ef
    } // b129d2f|2025-04-18T16:13:59.565Z line:328 uuid:17439296
  } else { // b129d2f|2025-04-18T16:13:59.565Z line:329 uuid:d2f021f1
// b129d2f|2025-04-18T16:13:59.565Z line:330 uuid:849c6e5e
    showMenu(); // b129d2f|2025-04-18T16:13:59.565Z line:331 uuid:b5e6e93b
  } // b129d2f|2025-04-18T16:13:59.565Z line:332 uuid:2c019ae0
} // b129d2f|2025-04-18T16:13:59.565Z line:333 uuid:bb3e49f6
// b129d2f|2025-04-18T16:13:59.565Z line:334 uuid:b7e75081
main(); // b129d2f|2025-04-18T16:13:59.565Z line:335 uuid:ba7c4f57