// time:2025-04-18T16:18:04.322Z line:1 uuid:53b5a441
// time:2025-04-18T16:18:04.322Z line:2 uuid:e8676f15
// time:2025-04-18T16:18:04.322Z line:3 uuid:0bc8b465
// time:2025-04-18T16:18:04.322Z line:4 uuid:30376f9b
// time:2025-04-18T16:18:04.322Z line:5 uuid:073e326d
// time:2025-04-18T16:18:04.322Z line:6 uuid:a5264fca
// time:2025-04-18T16:18:04.322Z line:7 uuid:dc24284a
// time:2025-04-18T16:18:04.322Z line:8 uuid:53b96842
// time:2025-04-18T16:18:04.322Z line:9 uuid:8b15fb18
// time:2025-04-18T16:18:04.322Z line:10 uuid:a980c92a
const fs = require('fs'); // time:2025-04-18T16:18:04.322Z line:11 uuid:caed5ca6
const path = require('path'); // time:2025-04-18T16:18:04.322Z line:12 uuid:cb941ebd
const crypto = require('crypto'); // time:2025-04-18T16:18:04.322Z line:13 uuid:785fe66e
const { execSync } = require('child_process'); // time:2025-04-18T16:18:04.322Z line:14 uuid:75cbd49e
const readline = require('readline'); // time:2025-04-18T16:18:04.322Z line:15 uuid:6df706c9
// time:2025-04-18T16:18:04.322Z line:16 uuid:6d5c649a
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:18:04.322Z line:17 uuid:4bdc744f
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:18:04.322Z line:18 uuid:3c0ee979
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:18:04.322Z line:19 uuid:83be6d46
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:18:04.322Z line:20 uuid:d461cad0
// time:2025-04-18T16:18:04.322Z line:21 uuid:2b20521e
// time:2025-04-18T16:18:04.322Z line:22 uuid:708d8dda
let config = { // time:2025-04-18T16:18:04.322Z line:23 uuid:b46e801f
  includeBranch: true, // time:2025-04-18T16:18:04.322Z line:24 uuid:3dbd5f7f
  includeCommit: true, // time:2025-04-18T16:18:04.322Z line:25 uuid:94ed9e44
  includeTimestamp: true, // time:2025-04-18T16:18:04.322Z line:26 uuid:15ef31c1
  includeLineNumber: true // time:2025-04-18T16:18:04.322Z line:27 uuid:7fefbdb8
}; // time:2025-04-18T16:18:04.322Z line:28 uuid:432a0b90
// time:2025-04-18T16:18:04.322Z line:29 uuid:257be91c
// time:2025-04-18T16:18:04.322Z line:30 uuid:6dade883
let lastRunInfo = { // time:2025-04-18T16:18:04.322Z line:31 uuid:465de136
  timestamp: null, // time:2025-04-18T16:18:04.322Z line:32 uuid:3af29ab7
  files: [] // time:2025-04-18T16:18:04.322Z line:33 uuid:e2fd610f
}; // time:2025-04-18T16:18:04.322Z line:34 uuid:85c18e45
// time:2025-04-18T16:18:04.322Z line:35 uuid:8a346f4e
function generateShortUUID() { // time:2025-04-18T16:18:04.322Z line:36 uuid:b107dc6e
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:18:04.322Z line:37 uuid:fda9ffa8
} // time:2025-04-18T16:18:04.322Z line:38 uuid:06b7ce21
// time:2025-04-18T16:18:04.322Z line:39 uuid:0c69ebbd
function getGitInfo() { // time:2025-04-18T16:18:04.322Z line:40 uuid:616c425c
  try { // time:2025-04-18T16:18:04.322Z line:41 uuid:439e064b
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:18:04.322Z line:42 uuid:7b6279dc
    let branch; // time:2025-04-18T16:18:04.322Z line:43 uuid:4afab97e
// time:2025-04-18T16:18:04.322Z line:44 uuid:a1026be5
// time:2025-04-18T16:18:04.322Z line:45 uuid:d955032e
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:18:04.322Z line:46 uuid:1a202c87
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:18:04.322Z line:47 uuid:5261d383
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:18:04.322Z line:48 uuid:d0bc0bc7
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:18:04.322Z line:49 uuid:e3888238
    } else { // time:2025-04-18T16:18:04.322Z line:50 uuid:2dda8224
// time:2025-04-18T16:18:04.322Z line:51 uuid:ae93ccd2
      branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.322Z line:52 uuid:2cec6137
    } // time:2025-04-18T16:18:04.322Z line:53 uuid:96c0ddf0
// time:2025-04-18T16:18:04.322Z line:54 uuid:c88623b0
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.322Z line:55 uuid:837ddd8f
    return { branch, lastCommit }; // time:2025-04-18T16:18:04.322Z line:56 uuid:d8241ce4
  } catch (error) { // time:2025-04-18T16:18:04.322Z line:57 uuid:c0e8de95
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:18:04.322Z line:58 uuid:23b338c6
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:18:04.322Z line:59 uuid:ae495a9c
  } // time:2025-04-18T16:18:04.322Z line:60 uuid:8af19748
} // time:2025-04-18T16:18:04.322Z line:61 uuid:6129d406
// time:2025-04-18T16:18:04.322Z line:62 uuid:33bfc327
function loadConfig() { // time:2025-04-18T16:18:04.322Z line:63 uuid:2694cf3d
  try { // time:2025-04-18T16:18:04.322Z line:64 uuid:d3b960d4
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:18:04.322Z line:65 uuid:145013e7
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:18:04.322Z line:66 uuid:a641fdbb
      const data = JSON.parse(fileContent); // time:2025-04-18T16:18:04.322Z line:67 uuid:37d37e4a
// time:2025-04-18T16:18:04.322Z line:68 uuid:68f9c8f2
// time:2025-04-18T16:18:04.322Z line:69 uuid:7f4e725b
      if (data.config) { // time:2025-04-18T16:18:04.322Z line:70 uuid:a3cd6dd2
        config = data.config; // time:2025-04-18T16:18:04.322Z line:71 uuid:ba2a4aaf
      } // time:2025-04-18T16:18:04.322Z line:72 uuid:5607aade
// time:2025-04-18T16:18:04.322Z line:73 uuid:b5820818
// time:2025-04-18T16:18:04.322Z line:74 uuid:7930f898
      if (data.lastRun) { // time:2025-04-18T16:18:04.322Z line:75 uuid:53295163
        lastRunInfo = data.lastRun; // time:2025-04-18T16:18:04.322Z line:76 uuid:06d21b43
      } // time:2025-04-18T16:18:04.322Z line:77 uuid:3393ce78
// time:2025-04-18T16:18:04.322Z line:78 uuid:cadf6bf1
      console.log('Loaded configuration:', config); // time:2025-04-18T16:18:04.322Z line:79 uuid:2f0924fa
    } // time:2025-04-18T16:18:04.322Z line:80 uuid:2053d3b5
  } catch (error) { // time:2025-04-18T16:18:04.322Z line:81 uuid:35505e62
    console.error('Error loading config:', error.message); // time:2025-04-18T16:18:04.322Z line:82 uuid:a877f906
  } // time:2025-04-18T16:18:04.322Z line:83 uuid:a25ff180
} // time:2025-04-18T16:18:04.322Z line:84 uuid:9d1eb8bc
// time:2025-04-18T16:18:04.322Z line:85 uuid:64472743
function saveConfig() { // time:2025-04-18T16:18:04.322Z line:86 uuid:8664b036
  try { // time:2025-04-18T16:18:04.322Z line:87 uuid:f6c8c464
// time:2025-04-18T16:18:04.322Z line:88 uuid:5e898c22
    const data = { // time:2025-04-18T16:18:04.322Z line:89 uuid:a6192187
      config, // time:2025-04-18T16:18:04.322Z line:90 uuid:1f924dc8
      lastRun: lastRunInfo // time:2025-04-18T16:18:04.322Z line:91 uuid:82d0dc15
    }; // time:2025-04-18T16:18:04.322Z line:92 uuid:04c934a6
// time:2025-04-18T16:18:04.322Z line:93 uuid:2235516a
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:18:04.322Z line:94 uuid:9e1fdec3
    console.log('Configuration saved.'); // time:2025-04-18T16:18:04.322Z line:95 uuid:3351b775
  } catch (error) { // time:2025-04-18T16:18:04.322Z line:96 uuid:4d78f178
    console.error('Error saving config:', error.message); // time:2025-04-18T16:18:04.322Z line:97 uuid:da9556e0
  } // time:2025-04-18T16:18:04.322Z line:98 uuid:71469cb8
} // time:2025-04-18T16:18:04.322Z line:99 uuid:76c854af
// time:2025-04-18T16:18:04.322Z line:100 uuid:0bb26c86
function ensureBackupDir() { // time:2025-04-18T16:18:04.322Z line:101 uuid:6597327a
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:18:04.322Z line:102 uuid:7a42bfc4
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:18:04.322Z line:103 uuid:10a30ce8
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:18:04.322Z line:104 uuid:cd59dd70
  } // time:2025-04-18T16:18:04.322Z line:105 uuid:3e1b8fc0
} // time:2025-04-18T16:18:04.322Z line:106 uuid:0004069b
// time:2025-04-18T16:18:04.322Z line:107 uuid:59fd15fe
function backupFile(filePath) { // time:2025-04-18T16:18:04.322Z line:108 uuid:cb3adfbe
  try { // time:2025-04-18T16:18:04.322Z line:109 uuid:4a72d291
    ensureBackupDir(); // time:2025-04-18T16:18:04.322Z line:110 uuid:0074fb65
// time:2025-04-18T16:18:04.322Z line:111 uuid:e5ef8df2
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.322Z line:112 uuid:fa651818
    const fileName = path.basename(filePath); // time:2025-04-18T16:18:04.322Z line:113 uuid:ba1e630f
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:18:04.322Z line:114 uuid:2c71b300
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:18:04.322Z line:115 uuid:80c033a6
// time:2025-04-18T16:18:04.322Z line:116 uuid:948d98fd
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:18:04.322Z line:117 uuid:2eb43200
    return { relativePath, backupPath }; // time:2025-04-18T16:18:04.322Z line:118 uuid:1ff5b60d
  } catch (error) { // time:2025-04-18T16:18:04.322Z line:119 uuid:378af6ed
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.322Z line:120 uuid:bf7e1796
    return null; // time:2025-04-18T16:18:04.322Z line:121 uuid:4a4be525
  } // time:2025-04-18T16:18:04.322Z line:122 uuid:e08ca9a2
} // time:2025-04-18T16:18:04.322Z line:123 uuid:b89bbdf0
// time:2025-04-18T16:18:04.322Z line:124 uuid:3ba507d7
function addUUIDsToFile(filePath) { // time:2025-04-18T16:18:04.322Z line:125 uuid:9ccfd6c1
  try { // time:2025-04-18T16:18:04.322Z line:126 uuid:284247cb
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:18:04.322Z line:127 uuid:6033567e
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:18:04.322Z line:128 uuid:e139bbe4
      return null; // time:2025-04-18T16:18:04.322Z line:129 uuid:d7ede81f
    } // time:2025-04-18T16:18:04.322Z line:130 uuid:482eab86
// time:2025-04-18T16:18:04.322Z line:131 uuid:77ff99e1
// time:2025-04-18T16:18:04.322Z line:132 uuid:10dea5d5
    const backup = backupFile(filePath); // time:2025-04-18T16:18:04.322Z line:133 uuid:84e4e420
    if (!backup) return null; // time:2025-04-18T16:18:04.322Z line:134 uuid:9673ba89
// time:2025-04-18T16:18:04.322Z line:135 uuid:91561d99
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:18:04.322Z line:136 uuid:b5ff0c23
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:18:04.322Z line:137 uuid:3d5e2346
// time:2025-04-18T16:18:04.322Z line:138 uuid:538b6158
// time:2025-04-18T16:18:04.322Z line:139 uuid:fd6566b5
    let metaParts = []; // time:2025-04-18T16:18:04.322Z line:140 uuid:bee108dd
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:18:04.322Z line:141 uuid:7749fd93
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:18:04.322Z line:142 uuid:f1ff520a
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:18:04.322Z line:143 uuid:511b6f3c
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:18:04.322Z line:144 uuid:1fe28b35
// time:2025-04-18T16:18:04.322Z line:145 uuid:7a026654
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.322Z line:146 uuid:8e42f40a
    const lines = content.split('\n'); // time:2025-04-18T16:18:04.322Z line:147 uuid:cfe1a780
// time:2025-04-18T16:18:04.322Z line:148 uuid:781920be
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:18:04.322Z line:149 uuid:2bed3c1a
      const lineNumber = index + 1; // time:2025-04-18T16:18:04.322Z line:150 uuid:bdd6a10c
      let cleanLine = line; // time:2025-04-18T16:18:04.322Z line:151 uuid:49123f81
// time:2025-04-18T16:18:04.322Z line:152 uuid:dbf9f64d
      if (line.includes(' // time:2025-04-18T16:18:04.322Z line:153 uuid:9cd12088
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:18:04.322Z line:154 uuid:3aa04453
      } // time:2025-04-18T16:18:04.322Z line:155 uuid:5c741cdc
// time:2025-04-18T16:18:04.322Z line:156 uuid:4bafae8f
      let comment = ' // time:2025-04-18T16:18:04.322Z line:157 uuid:c535be18
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:18:04.322Z line:158 uuid:3173c22a
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:18:04.322Z line:159 uuid:cb1e0a83
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:18:04.322Z line:160 uuid:6c4fe58a
// time:2025-04-18T16:18:04.322Z line:161 uuid:f40c28b8
      if (cleanLine.trim() === '') { // time:2025-04-18T16:18:04.322Z line:162 uuid:26adb3f8
        return comment.trim(); // time:2025-04-18T16:18:04.322Z line:163 uuid:db4092da
      } // time:2025-04-18T16:18:04.322Z line:164 uuid:1d4d8f81
// time:2025-04-18T16:18:04.322Z line:165 uuid:bdf40a30
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:18:04.322Z line:166 uuid:0886b35f
    }); // time:2025-04-18T16:18:04.322Z line:167 uuid:377fa736
// time:2025-04-18T16:18:04.322Z line:168 uuid:434bbc13
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:18:04.322Z line:169 uuid:e6ae8ef5
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:18:04.322Z line:170 uuid:9c889a16
// time:2025-04-18T16:18:04.322Z line:171 uuid:90cd770b
    return backup; // time:2025-04-18T16:18:04.322Z line:172 uuid:f25afe06
  } catch (error) { // time:2025-04-18T16:18:04.322Z line:173 uuid:a1237dbb
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.322Z line:174 uuid:adb95a6a
    return null; // time:2025-04-18T16:18:04.322Z line:175 uuid:71e912fb
  } // time:2025-04-18T16:18:04.322Z line:176 uuid:f02fe92b
} // time:2025-04-18T16:18:04.322Z line:177 uuid:f8097b7e
// time:2025-04-18T16:18:04.322Z line:178 uuid:85a3eac2
function processDirectory(dirPath) { // time:2025-04-18T16:18:04.322Z line:179 uuid:9ca5a775
  const modifiedFiles = []; // time:2025-04-18T16:18:04.322Z line:180 uuid:35f39276
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:18:04.322Z line:181 uuid:14218cad
// time:2025-04-18T16:18:04.322Z line:182 uuid:fcb46c75
  for (const entry of entries) { // time:2025-04-18T16:18:04.322Z line:183 uuid:801c0e3d
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:18:04.322Z line:184 uuid:71dce192
// time:2025-04-18T16:18:04.322Z line:185 uuid:680ea0a9
    if (entry.isDirectory()) { // time:2025-04-18T16:18:04.322Z line:186 uuid:2a7a54fa
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:18:04.322Z line:187 uuid:e98a8cf3
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:18:04.322Z line:188 uuid:68c48436
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:18:04.322Z line:189 uuid:bd5419c6
      } // time:2025-04-18T16:18:04.322Z line:190 uuid:e6cd1652
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:18:04.322Z line:191 uuid:b25a15f7
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:18:04.322Z line:192 uuid:f694fd70
      if (result) { // time:2025-04-18T16:18:04.322Z line:193 uuid:592766db
        modifiedFiles.push(result); // time:2025-04-18T16:18:04.322Z line:194 uuid:28b4f784
      } // time:2025-04-18T16:18:04.322Z line:195 uuid:3b02df5c
    } // time:2025-04-18T16:18:04.322Z line:196 uuid:69e0072e
  } // time:2025-04-18T16:18:04.322Z line:197 uuid:cccd0437
// time:2025-04-18T16:18:04.322Z line:198 uuid:e1206a59
  return modifiedFiles; // time:2025-04-18T16:18:04.322Z line:199 uuid:4d016239
} // time:2025-04-18T16:18:04.322Z line:200 uuid:ce85501a
// time:2025-04-18T16:18:04.322Z line:201 uuid:5457a392
function rollbackLastRun() { // time:2025-04-18T16:18:04.322Z line:202 uuid:2b01138a
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:18:04.322Z line:203 uuid:94326d38
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:18:04.322Z line:204 uuid:340bb063
    return; // time:2025-04-18T16:18:04.322Z line:205 uuid:fa46a810
  } // time:2025-04-18T16:18:04.322Z line:206 uuid:f46eeb10
// time:2025-04-18T16:18:04.322Z line:207 uuid:0921a6b5
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:18:04.322Z line:208 uuid:9d559f8f
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:18:04.322Z line:209 uuid:4e50c22f
// time:2025-04-18T16:18:04.322Z line:210 uuid:a7a4ee28
  let successCount = 0; // time:2025-04-18T16:18:04.322Z line:211 uuid:3ea8fe0b
// time:2025-04-18T16:18:04.322Z line:212 uuid:a60d196a
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:18:04.322Z line:213 uuid:5fb37061
    try { // time:2025-04-18T16:18:04.322Z line:214 uuid:af738788
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:18:04.322Z line:215 uuid:9c74a97e
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:18:04.322Z line:216 uuid:5f173159
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:18:04.322Z line:217 uuid:5d375ec5
// time:2025-04-18T16:18:04.322Z line:218 uuid:041e543f
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:18:04.322Z line:219 uuid:9da8c8b3
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:18:04.322Z line:220 uuid:c8617136
        successCount++; // time:2025-04-18T16:18:04.322Z line:221 uuid:1ab245c2
      } else { // time:2025-04-18T16:18:04.322Z line:222 uuid:61dfa654
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:18:04.322Z line:223 uuid:963a21ed
      } // time:2025-04-18T16:18:04.322Z line:224 uuid:7221521f
    } catch (error) { // time:2025-04-18T16:18:04.322Z line:225 uuid:f6dcd1f5
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:18:04.322Z line:226 uuid:c7d4e6cf
    } // time:2025-04-18T16:18:04.322Z line:227 uuid:5cd0f270
  } // time:2025-04-18T16:18:04.322Z line:228 uuid:d9aaf29e
// time:2025-04-18T16:18:04.322Z line:229 uuid:4beed939
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:18:04.322Z line:230 uuid:f5fc6bc1
// time:2025-04-18T16:18:04.322Z line:231 uuid:dbf35364
// time:2025-04-18T16:18:04.322Z line:232 uuid:3b4842cf
  lastRunInfo = { // time:2025-04-18T16:18:04.322Z line:233 uuid:faa48509
    timestamp: null, // time:2025-04-18T16:18:04.322Z line:234 uuid:96c1e2b9
    files: [] // time:2025-04-18T16:18:04.322Z line:235 uuid:5ccf3241
  }; // time:2025-04-18T16:18:04.322Z line:236 uuid:d63699fa
// time:2025-04-18T16:18:04.322Z line:237 uuid:707f0f49
  saveConfig(); // time:2025-04-18T16:18:04.322Z line:238 uuid:e6a3c858
} // time:2025-04-18T16:18:04.322Z line:239 uuid:aaeb176d
// time:2025-04-18T16:18:04.322Z line:240 uuid:3bfc4647
function runUUIDProcess() { // time:2025-04-18T16:18:04.322Z line:241 uuid:cfe4f6d7
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:18:04.322Z line:242 uuid:2688a7d3
// time:2025-04-18T16:18:04.322Z line:243 uuid:cb99a182
// time:2025-04-18T16:18:04.322Z line:244 uuid:e5733690
  lastRunInfo = { // time:2025-04-18T16:18:04.322Z line:245 uuid:d27ed362
    timestamp: Date.now(), // time:2025-04-18T16:18:04.322Z line:246 uuid:524f8c5b
    files: modifiedFiles // time:2025-04-18T16:18:04.322Z line:247 uuid:dc979b0b
  }; // time:2025-04-18T16:18:04.322Z line:248 uuid:c46d061b
// time:2025-04-18T16:18:04.322Z line:249 uuid:212fc4bd
  saveConfig(); // time:2025-04-18T16:18:04.322Z line:250 uuid:576e0a87
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:18:04.322Z line:251 uuid:060f83f8
} // time:2025-04-18T16:18:04.322Z line:252 uuid:2ff7fd66
// time:2025-04-18T16:18:04.322Z line:253 uuid:c630077e
function showMenu() { // time:2025-04-18T16:18:04.322Z line:254 uuid:d39c821d
  const rl = readline.createInterface({ // time:2025-04-18T16:18:04.322Z line:255 uuid:955eb4a3
    input: process.stdin, // time:2025-04-18T16:18:04.322Z line:256 uuid:e97ad157
    output: process.stdout // time:2025-04-18T16:18:04.322Z line:257 uuid:0982b9f9
  }); // time:2025-04-18T16:18:04.322Z line:258 uuid:42cbb5bd
// time:2025-04-18T16:18:04.322Z line:259 uuid:a83351f0
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:18:04.322Z line:260 uuid:927a438f
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.322Z line:261 uuid:407520e2
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.322Z line:262 uuid:93e9af2a
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.322Z line:263 uuid:a49a1b40
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.322Z line:264 uuid:82e7cb65
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:18:04.322Z line:265 uuid:a6dc03ca
  console.log('6. Save and Run'); // time:2025-04-18T16:18:04.322Z line:266 uuid:cc71c73c
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:18:04.322Z line:267 uuid:f3a7e4a4
  console.log('8. Exit'); // time:2025-04-18T16:18:04.322Z line:268 uuid:6230083f
// time:2025-04-18T16:18:04.322Z line:269 uuid:bb934a90
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:18:04.322Z line:270 uuid:491ceb4e
    switch(answer) { // time:2025-04-18T16:18:04.322Z line:271 uuid:ed49a6c9
      case '1': // time:2025-04-18T16:18:04.322Z line:272 uuid:3513b907
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:18:04.322Z line:273 uuid:6306336b
        rl.close(); // time:2025-04-18T16:18:04.322Z line:274 uuid:72eb41f5
        showMenu(); // time:2025-04-18T16:18:04.322Z line:275 uuid:72398567
        break; // time:2025-04-18T16:18:04.322Z line:276 uuid:f5801cbd
      case '2': // time:2025-04-18T16:18:04.322Z line:277 uuid:bfb0d15f
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:18:04.322Z line:278 uuid:4974e385
        rl.close(); // time:2025-04-18T16:18:04.322Z line:279 uuid:27107616
        showMenu(); // time:2025-04-18T16:18:04.322Z line:280 uuid:193bbc85
        break; // time:2025-04-18T16:18:04.322Z line:281 uuid:c28d810b
      case '3': // time:2025-04-18T16:18:04.322Z line:282 uuid:21bac606
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:18:04.322Z line:283 uuid:7bb00fad
        rl.close(); // time:2025-04-18T16:18:04.322Z line:284 uuid:85746514
        showMenu(); // time:2025-04-18T16:18:04.322Z line:285 uuid:cd592fd4
        break; // time:2025-04-18T16:18:04.322Z line:286 uuid:71934516
      case '4': // time:2025-04-18T16:18:04.322Z line:287 uuid:fe7b0199
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:18:04.322Z line:288 uuid:d58d3ab9
        rl.close(); // time:2025-04-18T16:18:04.322Z line:289 uuid:1b365e4e
        showMenu(); // time:2025-04-18T16:18:04.322Z line:290 uuid:212c6259
        break; // time:2025-04-18T16:18:04.322Z line:291 uuid:6f42c6d3
      case '5': // time:2025-04-18T16:18:04.322Z line:292 uuid:68546eb4
        config = { // time:2025-04-18T16:18:04.322Z line:293 uuid:79a3a037
          includeBranch: true, // time:2025-04-18T16:18:04.322Z line:294 uuid:d62aae09
          includeCommit: true, // time:2025-04-18T16:18:04.322Z line:295 uuid:3e4e28f2
          includeTimestamp: true, // time:2025-04-18T16:18:04.322Z line:296 uuid:e628ec35
          includeLineNumber: true // time:2025-04-18T16:18:04.322Z line:297 uuid:c19a6c7b
        }; // time:2025-04-18T16:18:04.322Z line:298 uuid:3edf7422
        rl.close(); // time:2025-04-18T16:18:04.322Z line:299 uuid:c9d1894b
        showMenu(); // time:2025-04-18T16:18:04.322Z line:300 uuid:7f28a215
        break; // time:2025-04-18T16:18:04.322Z line:301 uuid:307e52f9
      case '6': // time:2025-04-18T16:18:04.322Z line:302 uuid:92404a5c
        saveConfig(); // time:2025-04-18T16:18:04.322Z line:303 uuid:bc3871e0
        rl.close(); // time:2025-04-18T16:18:04.322Z line:304 uuid:1c64d12a
        runUUIDProcess(); // time:2025-04-18T16:18:04.322Z line:305 uuid:8244bc0c
        break; // time:2025-04-18T16:18:04.322Z line:306 uuid:5f40b412
      case '7': // time:2025-04-18T16:18:04.322Z line:307 uuid:e03f8daa
        rl.close(); // time:2025-04-18T16:18:04.322Z line:308 uuid:e598e92f
        rollbackLastRun(); // time:2025-04-18T16:18:04.322Z line:309 uuid:b2edee84
        showMenu(); // time:2025-04-18T16:18:04.322Z line:310 uuid:098c49eb
        break; // time:2025-04-18T16:18:04.322Z line:311 uuid:e2dee576
      case '8': // time:2025-04-18T16:18:04.322Z line:312 uuid:ad1bfbb3
        console.log('Exiting without changes.'); // time:2025-04-18T16:18:04.322Z line:313 uuid:a895e55a
        rl.close(); // time:2025-04-18T16:18:04.322Z line:314 uuid:f7b63065
        break; // time:2025-04-18T16:18:04.322Z line:315 uuid:1ad6be62
      default: // time:2025-04-18T16:18:04.322Z line:316 uuid:9dee741a
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:18:04.322Z line:317 uuid:dfac40e1
        rl.close(); // time:2025-04-18T16:18:04.322Z line:318 uuid:76d430ef
        showMenu(); // time:2025-04-18T16:18:04.322Z line:319 uuid:5b6fdaeb
    } // time:2025-04-18T16:18:04.322Z line:320 uuid:4f2c0b48
  }); // time:2025-04-18T16:18:04.322Z line:321 uuid:552851d8
} // time:2025-04-18T16:18:04.322Z line:322 uuid:bcb85bf6
// time:2025-04-18T16:18:04.322Z line:323 uuid:8e58c28a
// time:2025-04-18T16:18:04.322Z line:324 uuid:d7fe1200
function main() { // time:2025-04-18T16:18:04.322Z line:325 uuid:ac3302be
  loadConfig(); // time:2025-04-18T16:18:04.322Z line:326 uuid:6f95c28b
// time:2025-04-18T16:18:04.322Z line:327 uuid:644b5ecb
  if (process.argv.length > 2) { // time:2025-04-18T16:18:04.322Z line:328 uuid:0f9ec2b6
    if (process.argv[2] === '--run') { // time:2025-04-18T16:18:04.322Z line:329 uuid:48b30ac2
// time:2025-04-18T16:18:04.322Z line:330 uuid:fb49b7a6
      runUUIDProcess(); // time:2025-04-18T16:18:04.322Z line:331 uuid:a81900fc
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:18:04.322Z line:332 uuid:a688b36d
// time:2025-04-18T16:18:04.322Z line:333 uuid:718661c7
      rollbackLastRun(); // time:2025-04-18T16:18:04.322Z line:334 uuid:f0791ad5
    } else { // time:2025-04-18T16:18:04.322Z line:335 uuid:280d74cb
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:18:04.322Z line:336 uuid:c63c9d1b
    } // time:2025-04-18T16:18:04.322Z line:337 uuid:015aa6e2
  } else { // time:2025-04-18T16:18:04.322Z line:338 uuid:98c503be
// time:2025-04-18T16:18:04.322Z line:339 uuid:80ff1022
    showMenu(); // time:2025-04-18T16:18:04.322Z line:340 uuid:0cdbe5c9
  } // time:2025-04-18T16:18:04.322Z line:341 uuid:b5f54e5e
} // time:2025-04-18T16:18:04.322Z line:342 uuid:4aaa9d3d
// time:2025-04-18T16:18:04.322Z line:343 uuid:4a7aace0
main(); // time:2025-04-18T16:18:04.322Z line:344 uuid:f121a690