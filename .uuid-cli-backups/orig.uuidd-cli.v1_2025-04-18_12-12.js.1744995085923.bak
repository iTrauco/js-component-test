// time:2025-04-18T16:18:04.298Z line:1 uuid:396ab1e4
// time:2025-04-18T16:18:04.298Z line:2 uuid:5bcb1f7e
// time:2025-04-18T16:18:04.298Z line:3 uuid:ae521304
// time:2025-04-18T16:18:04.298Z line:4 uuid:332baf75
// time:2025-04-18T16:18:04.298Z line:5 uuid:7bf00918
// time:2025-04-18T16:18:04.298Z line:6 uuid:0b74b411
// time:2025-04-18T16:18:04.298Z line:7 uuid:25ce53c6
// time:2025-04-18T16:18:04.298Z line:8 uuid:29ff2101
// time:2025-04-18T16:18:04.298Z line:9 uuid:031ce381
// time:2025-04-18T16:18:04.298Z line:10 uuid:7fc753c7
const fs = require('fs'); // time:2025-04-18T16:18:04.298Z line:11 uuid:b54b481c
const path = require('path'); // time:2025-04-18T16:18:04.298Z line:12 uuid:db236c9b
const crypto = require('crypto'); // time:2025-04-18T16:18:04.298Z line:13 uuid:9caba70e
const { execSync } = require('child_process'); // time:2025-04-18T16:18:04.298Z line:14 uuid:eb6a4636
const readline = require('readline'); // time:2025-04-18T16:18:04.298Z line:15 uuid:6ce4ed2e
// time:2025-04-18T16:18:04.298Z line:16 uuid:3ce536d8
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:18:04.298Z line:17 uuid:67068500
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:18:04.298Z line:18 uuid:95e4e36c
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:18:04.298Z line:19 uuid:f47fd07b
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:18:04.298Z line:20 uuid:1747bc9d
// time:2025-04-18T16:18:04.298Z line:21 uuid:de2b29f5
// time:2025-04-18T16:18:04.298Z line:22 uuid:85f9e51e
// time:2025-04-18T16:18:04.298Z line:23 uuid:c5f2a63d
// time:2025-04-18T16:18:04.298Z line:24 uuid:2b146db7
// time:2025-04-18T16:18:04.298Z line:25 uuid:98dcda83
let config = { // time:2025-04-18T16:18:04.298Z line:26 uuid:7c041201
  includeBranch: true, // time:2025-04-18T16:18:04.298Z line:27 uuid:830ea55e
  includeCommit: true, // time:2025-04-18T16:18:04.298Z line:28 uuid:a5ad6b8c
  includeTimestamp: true, // time:2025-04-18T16:18:04.298Z line:29 uuid:bcb7225c
  includeLineNumber: true // time:2025-04-18T16:18:04.298Z line:30 uuid:1c965342
}; // time:2025-04-18T16:18:04.298Z line:31 uuid:069902d7
// time:2025-04-18T16:18:04.298Z line:32 uuid:59b4f158
// time:2025-04-18T16:18:04.298Z line:33 uuid:f7e88e66
let lastRunInfo = { // time:2025-04-18T16:18:04.298Z line:34 uuid:2f7d1dfe
  timestamp: null, // time:2025-04-18T16:18:04.298Z line:35 uuid:971c38ab
  files: [] // time:2025-04-18T16:18:04.298Z line:36 uuid:8108956d
}; // time:2025-04-18T16:18:04.298Z line:37 uuid:855cb1e7
// time:2025-04-18T16:18:04.298Z line:38 uuid:6ea35eb0
function generateShortUUID() { // time:2025-04-18T16:18:04.298Z line:39 uuid:9bffd197
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:18:04.298Z line:40 uuid:0056c83f
} // time:2025-04-18T16:18:04.298Z line:41 uuid:649acf4b
// time:2025-04-18T16:18:04.298Z line:42 uuid:6e7b9b16
function getGitInfo() { // time:2025-04-18T16:18:04.298Z line:43 uuid:16217abb
  try { // time:2025-04-18T16:18:04.298Z line:44 uuid:5fc6c372
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:18:04.298Z line:45 uuid:9fe0c9ff
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.298Z line:46 uuid:ae063c41
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.298Z line:47 uuid:11c18bdc
    return { branch, lastCommit }; // time:2025-04-18T16:18:04.298Z line:48 uuid:6d82d5ba
  } catch { // time:2025-04-18T16:18:04.298Z line:49 uuid:edda838d
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:18:04.298Z line:50 uuid:f3191912
  } // time:2025-04-18T16:18:04.298Z line:51 uuid:011874c6
} // time:2025-04-18T16:18:04.298Z line:52 uuid:50dadf07
// time:2025-04-18T16:18:04.298Z line:53 uuid:4ec6ae5f
function loadConfig() { // time:2025-04-18T16:18:04.298Z line:54 uuid:d5d27be7
  try { // time:2025-04-18T16:18:04.298Z line:55 uuid:00caaeae
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:18:04.298Z line:56 uuid:d89d3d05
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:18:04.298Z line:57 uuid:32b804fb
      const data = JSON.parse(fileContent); // time:2025-04-18T16:18:04.298Z line:58 uuid:50811221
// time:2025-04-18T16:18:04.298Z line:59 uuid:f430d704
// time:2025-04-18T16:18:04.298Z line:60 uuid:2a65eb19
      if (data.config) { // time:2025-04-18T16:18:04.298Z line:61 uuid:879eedb5
        config = data.config; // time:2025-04-18T16:18:04.298Z line:62 uuid:3975aa51
      } // time:2025-04-18T16:18:04.298Z line:63 uuid:1a8b4185
// time:2025-04-18T16:18:04.298Z line:64 uuid:7f6ca48d
// time:2025-04-18T16:18:04.298Z line:65 uuid:95260a8b
      if (data.lastRun) { // time:2025-04-18T16:18:04.298Z line:66 uuid:e0e147f9
        lastRunInfo = data.lastRun; // time:2025-04-18T16:18:04.298Z line:67 uuid:5fa7550d
      } // time:2025-04-18T16:18:04.298Z line:68 uuid:a8d2131d
// time:2025-04-18T16:18:04.298Z line:69 uuid:e5958e2f
      console.log('Loaded configuration:', config); // time:2025-04-18T16:18:04.298Z line:70 uuid:cedccfec
    } // time:2025-04-18T16:18:04.298Z line:71 uuid:c18ea6c0
  } catch (error) { // time:2025-04-18T16:18:04.298Z line:72 uuid:990d4cec
    console.error('Error loading config:', error.message); // time:2025-04-18T16:18:04.298Z line:73 uuid:0d16df23
  } // time:2025-04-18T16:18:04.298Z line:74 uuid:a7b6360f
} // time:2025-04-18T16:18:04.298Z line:75 uuid:da91df08
// time:2025-04-18T16:18:04.298Z line:76 uuid:e026e13b
function saveConfig() { // time:2025-04-18T16:18:04.298Z line:77 uuid:02c760d3
  try { // time:2025-04-18T16:18:04.298Z line:78 uuid:cce74310
// time:2025-04-18T16:18:04.298Z line:79 uuid:39613cfb
    const data = { // time:2025-04-18T16:18:04.298Z line:80 uuid:a3e9bacd
      config, // time:2025-04-18T16:18:04.298Z line:81 uuid:9212f62d
      lastRun: lastRunInfo // time:2025-04-18T16:18:04.298Z line:82 uuid:2dc8cf55
    }; // time:2025-04-18T16:18:04.298Z line:83 uuid:795b22ee
// time:2025-04-18T16:18:04.298Z line:84 uuid:bf46ccdd
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:18:04.298Z line:85 uuid:85f9d1ca
    console.log('Configuration saved.'); // time:2025-04-18T16:18:04.298Z line:86 uuid:e9839c9c
  } catch (error) { // time:2025-04-18T16:18:04.298Z line:87 uuid:7e21a42d
    console.error('Error saving config:', error.message); // time:2025-04-18T16:18:04.298Z line:88 uuid:f2b573b9
  } // time:2025-04-18T16:18:04.298Z line:89 uuid:c4748d03
} // time:2025-04-18T16:18:04.298Z line:90 uuid:8156e487
// time:2025-04-18T16:18:04.298Z line:91 uuid:eabdd8f8
function ensureBackupDir() { // time:2025-04-18T16:18:04.298Z line:92 uuid:5c5046de
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:18:04.298Z line:93 uuid:8ce17b2e
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:18:04.298Z line:94 uuid:decdd753
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:18:04.298Z line:95 uuid:3c3c0b6a
  } // time:2025-04-18T16:18:04.298Z line:96 uuid:b477d0ae
} // time:2025-04-18T16:18:04.298Z line:97 uuid:5021f647
// time:2025-04-18T16:18:04.298Z line:98 uuid:0ffe150c
function backupFile(filePath) { // time:2025-04-18T16:18:04.298Z line:99 uuid:b4d0fe78
  try { // time:2025-04-18T16:18:04.298Z line:100 uuid:fe296559
    ensureBackupDir(); // time:2025-04-18T16:18:04.298Z line:101 uuid:4f09e0c3
// time:2025-04-18T16:18:04.298Z line:102 uuid:d2ba2ec3
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.298Z line:103 uuid:1c746286
    const fileName = path.basename(filePath); // time:2025-04-18T16:18:04.298Z line:104 uuid:4811451f
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:18:04.298Z line:105 uuid:f80d1fb0
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:18:04.298Z line:106 uuid:eaf07ebe
// time:2025-04-18T16:18:04.298Z line:107 uuid:783a8a40
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:18:04.298Z line:108 uuid:79d78d63
    return { relativePath, backupPath }; // time:2025-04-18T16:18:04.298Z line:109 uuid:4a1d1086
  } catch (error) { // time:2025-04-18T16:18:04.298Z line:110 uuid:edae93bd
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.298Z line:111 uuid:f73cdeb0
    return null; // time:2025-04-18T16:18:04.298Z line:112 uuid:05f5d818
  } // time:2025-04-18T16:18:04.298Z line:113 uuid:49799655
} // time:2025-04-18T16:18:04.298Z line:114 uuid:1757245e
// time:2025-04-18T16:18:04.298Z line:115 uuid:1672d8e0
function addUUIDsToFile(filePath) { // time:2025-04-18T16:18:04.298Z line:116 uuid:fc810aaf
  try { // time:2025-04-18T16:18:04.298Z line:117 uuid:d0d2552f
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:18:04.298Z line:118 uuid:77b9826e
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:18:04.298Z line:119 uuid:42e0bceb
      return null; // time:2025-04-18T16:18:04.298Z line:120 uuid:222fe5a9
    } // time:2025-04-18T16:18:04.298Z line:121 uuid:561282cb
// time:2025-04-18T16:18:04.298Z line:122 uuid:23168160
// time:2025-04-18T16:18:04.298Z line:123 uuid:1d6de69e
    const backup = backupFile(filePath); // time:2025-04-18T16:18:04.298Z line:124 uuid:3791657d
    if (!backup) return null; // time:2025-04-18T16:18:04.298Z line:125 uuid:4f16f40c
// time:2025-04-18T16:18:04.298Z line:126 uuid:de08aba4
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:18:04.298Z line:127 uuid:d2b308ff
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:18:04.298Z line:128 uuid:050154c7
// time:2025-04-18T16:18:04.298Z line:129 uuid:0b95c956
// time:2025-04-18T16:18:04.298Z line:130 uuid:52ccb012
    let metaParts = []; // time:2025-04-18T16:18:04.298Z line:131 uuid:51022dc7
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:18:04.298Z line:132 uuid:d67ba382
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:18:04.298Z line:133 uuid:1b93c54a
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:18:04.298Z line:134 uuid:348aa199
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:18:04.298Z line:135 uuid:c018f4e5
// time:2025-04-18T16:18:04.298Z line:136 uuid:fff11e01
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.298Z line:137 uuid:7b266edd
    const lines = content.split('\n'); // time:2025-04-18T16:18:04.298Z line:138 uuid:33cddfa8
// time:2025-04-18T16:18:04.298Z line:139 uuid:0f20cdde
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:18:04.298Z line:140 uuid:0a56aa91
      const lineNumber = index + 1; // time:2025-04-18T16:18:04.298Z line:141 uuid:e9bab238
      let cleanLine = line; // time:2025-04-18T16:18:04.298Z line:142 uuid:30bd2389
// time:2025-04-18T16:18:04.298Z line:143 uuid:69bba0a1
      if (line.includes(' // time:2025-04-18T16:18:04.298Z line:144 uuid:d842e796
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:18:04.298Z line:145 uuid:8b9b40d3
      } // time:2025-04-18T16:18:04.298Z line:146 uuid:4f1485ff
// time:2025-04-18T16:18:04.298Z line:147 uuid:ce9dbb1e
      let comment = ' // time:2025-04-18T16:18:04.298Z line:148 uuid:1c38f66c
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:18:04.298Z line:149 uuid:086cddf4
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:18:04.298Z line:150 uuid:120f2c7f
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:18:04.298Z line:151 uuid:2063261d
// time:2025-04-18T16:18:04.298Z line:152 uuid:2ec13e40
      if (cleanLine.trim() === '') { // time:2025-04-18T16:18:04.298Z line:153 uuid:1d3d62e0
        return comment.trim(); // time:2025-04-18T16:18:04.298Z line:154 uuid:b4986b61
      } // time:2025-04-18T16:18:04.298Z line:155 uuid:7e0f0b7b
// time:2025-04-18T16:18:04.298Z line:156 uuid:8bfd061b
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:18:04.298Z line:157 uuid:8c465bd1
    }); // time:2025-04-18T16:18:04.298Z line:158 uuid:ae96a30e
// time:2025-04-18T16:18:04.298Z line:159 uuid:93dc64e5
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:18:04.298Z line:160 uuid:2f5a5b60
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:18:04.298Z line:161 uuid:7222e6e7
// time:2025-04-18T16:18:04.298Z line:162 uuid:15a6dee0
    return backup; // time:2025-04-18T16:18:04.298Z line:163 uuid:ebffb79d
  } catch (error) { // time:2025-04-18T16:18:04.298Z line:164 uuid:2208f8df
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.298Z line:165 uuid:b7fde4ba
    return null; // time:2025-04-18T16:18:04.298Z line:166 uuid:092c0745
  } // time:2025-04-18T16:18:04.298Z line:167 uuid:132f7843
} // time:2025-04-18T16:18:04.298Z line:168 uuid:0473bfc0
// time:2025-04-18T16:18:04.298Z line:169 uuid:88f1f097
function processDirectory(dirPath) { // time:2025-04-18T16:18:04.298Z line:170 uuid:ee9cd09a
  const modifiedFiles = []; // time:2025-04-18T16:18:04.298Z line:171 uuid:e5e3c6ac
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:18:04.298Z line:172 uuid:e92c43b3
// time:2025-04-18T16:18:04.298Z line:173 uuid:7483273a
  for (const entry of entries) { // time:2025-04-18T16:18:04.298Z line:174 uuid:d0484f08
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:18:04.298Z line:175 uuid:8cd39ca6
// time:2025-04-18T16:18:04.298Z line:176 uuid:f42b85f1
    if (entry.isDirectory()) { // time:2025-04-18T16:18:04.298Z line:177 uuid:e11c8946
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:18:04.298Z line:178 uuid:4fde673d
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:18:04.298Z line:179 uuid:e669dcf8
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:18:04.298Z line:180 uuid:b376f129
      } // time:2025-04-18T16:18:04.298Z line:181 uuid:d9f30b59
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:18:04.298Z line:182 uuid:6e35e186
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:18:04.298Z line:183 uuid:3277912c
      if (result) { // time:2025-04-18T16:18:04.298Z line:184 uuid:e519a066
        modifiedFiles.push(result); // time:2025-04-18T16:18:04.298Z line:185 uuid:499036f0
      } // time:2025-04-18T16:18:04.298Z line:186 uuid:af75cd7f
    } // time:2025-04-18T16:18:04.298Z line:187 uuid:00ec9472
  } // time:2025-04-18T16:18:04.298Z line:188 uuid:6892fcad
// time:2025-04-18T16:18:04.298Z line:189 uuid:021ab85b
  return modifiedFiles; // time:2025-04-18T16:18:04.298Z line:190 uuid:9726c6bd
} // time:2025-04-18T16:18:04.298Z line:191 uuid:8be86d2b
// time:2025-04-18T16:18:04.298Z line:192 uuid:5c0d71a0
function rollbackLastRun() { // time:2025-04-18T16:18:04.298Z line:193 uuid:474b722e
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:18:04.298Z line:194 uuid:b2a6a4ea
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:18:04.298Z line:195 uuid:42664089
    return; // time:2025-04-18T16:18:04.298Z line:196 uuid:c48e3cb4
  } // time:2025-04-18T16:18:04.298Z line:197 uuid:30ef8923
// time:2025-04-18T16:18:04.298Z line:198 uuid:aae9d001
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:18:04.298Z line:199 uuid:12820f92
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:18:04.298Z line:200 uuid:eea72ebb
// time:2025-04-18T16:18:04.298Z line:201 uuid:0c2125d9
  let successCount = 0; // time:2025-04-18T16:18:04.298Z line:202 uuid:10bd2ef3
// time:2025-04-18T16:18:04.298Z line:203 uuid:519ac4f8
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:18:04.298Z line:204 uuid:1eaeebb9
    try { // time:2025-04-18T16:18:04.298Z line:205 uuid:8bfdeb6b
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:18:04.298Z line:206 uuid:9becb66e
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:18:04.298Z line:207 uuid:829e0f5b
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:18:04.298Z line:208 uuid:9ec810a5
// time:2025-04-18T16:18:04.298Z line:209 uuid:b7391cdd
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:18:04.298Z line:210 uuid:34fd5ca5
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:18:04.298Z line:211 uuid:c2e2e71c
        successCount++; // time:2025-04-18T16:18:04.298Z line:212 uuid:5b8ae9a6
      } else { // time:2025-04-18T16:18:04.298Z line:213 uuid:58c35355
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:18:04.298Z line:214 uuid:2801b259
      } // time:2025-04-18T16:18:04.298Z line:215 uuid:59bd9a38
    } catch (error) { // time:2025-04-18T16:18:04.298Z line:216 uuid:319ef9dc
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:18:04.298Z line:217 uuid:5ad98c58
    } // time:2025-04-18T16:18:04.298Z line:218 uuid:42e323ed
  } // time:2025-04-18T16:18:04.298Z line:219 uuid:3d58a24a
// time:2025-04-18T16:18:04.298Z line:220 uuid:88bc0524
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:18:04.298Z line:221 uuid:fbfde525
// time:2025-04-18T16:18:04.298Z line:222 uuid:517b47c1
// time:2025-04-18T16:18:04.298Z line:223 uuid:52506569
  lastRunInfo = { // time:2025-04-18T16:18:04.298Z line:224 uuid:abff0bb6
    timestamp: null, // time:2025-04-18T16:18:04.298Z line:225 uuid:be04bdff
    files: [] // time:2025-04-18T16:18:04.298Z line:226 uuid:d13896f5
  }; // time:2025-04-18T16:18:04.298Z line:227 uuid:436cbfd5
// time:2025-04-18T16:18:04.298Z line:228 uuid:ffd20145
  saveConfig(); // time:2025-04-18T16:18:04.298Z line:229 uuid:e6db2d5c
} // time:2025-04-18T16:18:04.298Z line:230 uuid:685abcf7
// time:2025-04-18T16:18:04.298Z line:231 uuid:a458acea
function runUUIDProcess() { // time:2025-04-18T16:18:04.298Z line:232 uuid:103d9cd2
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:18:04.298Z line:233 uuid:a1a93ed0
// time:2025-04-18T16:18:04.298Z line:234 uuid:3d2b4f5f
// time:2025-04-18T16:18:04.298Z line:235 uuid:43c9a5e8
  lastRunInfo = { // time:2025-04-18T16:18:04.298Z line:236 uuid:f73d804e
    timestamp: Date.now(), // time:2025-04-18T16:18:04.298Z line:237 uuid:82f15ee0
    files: modifiedFiles // time:2025-04-18T16:18:04.298Z line:238 uuid:f42da98b
  }; // time:2025-04-18T16:18:04.298Z line:239 uuid:855c3fef
// time:2025-04-18T16:18:04.298Z line:240 uuid:61a0fa4e
  saveConfig(); // time:2025-04-18T16:18:04.298Z line:241 uuid:1aa56ac6
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:18:04.298Z line:242 uuid:1d89dc38
} // time:2025-04-18T16:18:04.298Z line:243 uuid:d9486ad7
// time:2025-04-18T16:18:04.298Z line:244 uuid:a2c5439e
function showMenu() { // time:2025-04-18T16:18:04.298Z line:245 uuid:34c3fd1a
  const rl = readline.createInterface({ // time:2025-04-18T16:18:04.298Z line:246 uuid:d7a76602
    input: process.stdin, // time:2025-04-18T16:18:04.298Z line:247 uuid:f3747691
    output: process.stdout // time:2025-04-18T16:18:04.298Z line:248 uuid:4568b11e
  }); // time:2025-04-18T16:18:04.298Z line:249 uuid:fcaf9cc1
// time:2025-04-18T16:18:04.298Z line:250 uuid:cf52e61f
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:18:04.298Z line:251 uuid:76b1f5e9
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.298Z line:252 uuid:047f1d08
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.298Z line:253 uuid:1e11dd7a
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.298Z line:254 uuid:3f222cf7
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.298Z line:255 uuid:1b84cf00
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:18:04.298Z line:256 uuid:21af63a9
  console.log('6. Save and Run'); // time:2025-04-18T16:18:04.298Z line:257 uuid:12a6616d
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:18:04.298Z line:258 uuid:3abeb08e
  console.log('8. Exit'); // time:2025-04-18T16:18:04.298Z line:259 uuid:2349d9b5
// time:2025-04-18T16:18:04.298Z line:260 uuid:6c4e2181
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:18:04.298Z line:261 uuid:3f1a9282
    switch(answer) { // time:2025-04-18T16:18:04.298Z line:262 uuid:46b706d2
      case '1': // time:2025-04-18T16:18:04.298Z line:263 uuid:71e90055
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:18:04.298Z line:264 uuid:11c137cb
        rl.close(); // time:2025-04-18T16:18:04.298Z line:265 uuid:ae9646fb
        showMenu(); // time:2025-04-18T16:18:04.298Z line:266 uuid:884368f0
        break; // time:2025-04-18T16:18:04.298Z line:267 uuid:ddec8b6b
      case '2': // time:2025-04-18T16:18:04.298Z line:268 uuid:b1a04209
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:18:04.298Z line:269 uuid:7068429b
        rl.close(); // time:2025-04-18T16:18:04.298Z line:270 uuid:1afd6c8c
        showMenu(); // time:2025-04-18T16:18:04.298Z line:271 uuid:b5dce453
        break; // time:2025-04-18T16:18:04.298Z line:272 uuid:f981d1bc
      case '3': // time:2025-04-18T16:18:04.298Z line:273 uuid:a1efb079
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:18:04.298Z line:274 uuid:e09d325e
        rl.close(); // time:2025-04-18T16:18:04.298Z line:275 uuid:a3f6c2fe
        showMenu(); // time:2025-04-18T16:18:04.298Z line:276 uuid:2bd7b994
        break; // time:2025-04-18T16:18:04.298Z line:277 uuid:ebc8396f
      case '4': // time:2025-04-18T16:18:04.298Z line:278 uuid:388b0ac7
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:18:04.298Z line:279 uuid:1022a7d9
        rl.close(); // time:2025-04-18T16:18:04.298Z line:280 uuid:8fd1b671
        showMenu(); // time:2025-04-18T16:18:04.298Z line:281 uuid:2ea68d56
        break; // time:2025-04-18T16:18:04.298Z line:282 uuid:66aa23e8
      case '5': // time:2025-04-18T16:18:04.298Z line:283 uuid:acefce9b
        config = { // time:2025-04-18T16:18:04.298Z line:284 uuid:dd9c3271
          includeBranch: true, // time:2025-04-18T16:18:04.298Z line:285 uuid:b229c695
          includeCommit: true, // time:2025-04-18T16:18:04.298Z line:286 uuid:7cf734af
          includeTimestamp: true, // time:2025-04-18T16:18:04.298Z line:287 uuid:89d59587
          includeLineNumber: true // time:2025-04-18T16:18:04.298Z line:288 uuid:695271c4
        }; // time:2025-04-18T16:18:04.298Z line:289 uuid:3a80db76
        rl.close(); // time:2025-04-18T16:18:04.298Z line:290 uuid:07f4c9bd
        showMenu(); // time:2025-04-18T16:18:04.298Z line:291 uuid:34714ab3
        break; // time:2025-04-18T16:18:04.298Z line:292 uuid:cd6c60a1
      case '6': // time:2025-04-18T16:18:04.298Z line:293 uuid:eae8d92a
        saveConfig(); // time:2025-04-18T16:18:04.298Z line:294 uuid:998a48a2
        rl.close(); // time:2025-04-18T16:18:04.298Z line:295 uuid:1306b4ba
        runUUIDProcess(); // time:2025-04-18T16:18:04.298Z line:296 uuid:90d3a5e4
        break; // time:2025-04-18T16:18:04.298Z line:297 uuid:b0772433
      case '7': // time:2025-04-18T16:18:04.298Z line:298 uuid:ad99265f
        rl.close(); // time:2025-04-18T16:18:04.298Z line:299 uuid:6ed77307
        rollbackLastRun(); // time:2025-04-18T16:18:04.298Z line:300 uuid:feacddc1
        showMenu(); // time:2025-04-18T16:18:04.298Z line:301 uuid:c153570e
        break; // time:2025-04-18T16:18:04.298Z line:302 uuid:b1975ec5
      case '8': // time:2025-04-18T16:18:04.298Z line:303 uuid:671c7d46
        console.log('Exiting without changes.'); // time:2025-04-18T16:18:04.298Z line:304 uuid:a8a187ff
        rl.close(); // time:2025-04-18T16:18:04.298Z line:305 uuid:793459a6
        break; // time:2025-04-18T16:18:04.298Z line:306 uuid:7718e61c
      default: // time:2025-04-18T16:18:04.298Z line:307 uuid:bfe77593
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:18:04.298Z line:308 uuid:88b4e49c
        rl.close(); // time:2025-04-18T16:18:04.298Z line:309 uuid:bf1ccbad
        showMenu(); // time:2025-04-18T16:18:04.298Z line:310 uuid:195c917d
    } // time:2025-04-18T16:18:04.298Z line:311 uuid:7207a425
  }); // time:2025-04-18T16:18:04.298Z line:312 uuid:49c23279
} // time:2025-04-18T16:18:04.298Z line:313 uuid:0a23cc9d
// time:2025-04-18T16:18:04.298Z line:314 uuid:c782bf6c
// time:2025-04-18T16:18:04.298Z line:315 uuid:7227d45f
function main() { // time:2025-04-18T16:18:04.298Z line:316 uuid:1e459ba6
  loadConfig(); // time:2025-04-18T16:18:04.298Z line:317 uuid:d9c2cd43
// time:2025-04-18T16:18:04.298Z line:318 uuid:f782e069
  if (process.argv.length > 2) { // time:2025-04-18T16:18:04.298Z line:319 uuid:61ae669d
    if (process.argv[2] === '--run') { // time:2025-04-18T16:18:04.298Z line:320 uuid:5817204c
// time:2025-04-18T16:18:04.298Z line:321 uuid:5ea66344
      runUUIDProcess(); // time:2025-04-18T16:18:04.298Z line:322 uuid:5173619c
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:18:04.298Z line:323 uuid:7b572dcf
// time:2025-04-18T16:18:04.298Z line:324 uuid:7e1c425b
      rollbackLastRun(); // time:2025-04-18T16:18:04.298Z line:325 uuid:9825853d
    } else { // time:2025-04-18T16:18:04.298Z line:326 uuid:72a00bec
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:18:04.298Z line:327 uuid:0ec0d178
    } // time:2025-04-18T16:18:04.298Z line:328 uuid:c31bb79f
  } else { // time:2025-04-18T16:18:04.298Z line:329 uuid:a5cf682a
// time:2025-04-18T16:18:04.298Z line:330 uuid:d7c0c92c
    showMenu(); // time:2025-04-18T16:18:04.298Z line:331 uuid:5671838e
  } // time:2025-04-18T16:18:04.298Z line:332 uuid:67c3b0a5
} // time:2025-04-18T16:18:04.298Z line:333 uuid:7f87bc3a
// time:2025-04-18T16:18:04.298Z line:334 uuid:a37cf885
main(); // time:2025-04-18T16:18:04.298Z line:335 uuid:f443f64f