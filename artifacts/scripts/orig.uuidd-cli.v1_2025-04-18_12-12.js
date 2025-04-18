// time:2025-04-18T16:17:35.489Z line:1 uuid:6e77f201
// time:2025-04-18T16:17:35.489Z line:2 uuid:7535bb4c
// time:2025-04-18T16:17:35.489Z line:3 uuid:f2d2eaff
// time:2025-04-18T16:17:35.489Z line:4 uuid:5361d2f3
// time:2025-04-18T16:17:35.489Z line:5 uuid:a81932a6
// time:2025-04-18T16:17:35.489Z line:6 uuid:0e5355e3
// time:2025-04-18T16:17:35.489Z line:7 uuid:8023984a
// time:2025-04-18T16:17:35.489Z line:8 uuid:95808be3
// time:2025-04-18T16:17:35.489Z line:9 uuid:c4d89831
// time:2025-04-18T16:17:35.489Z line:10 uuid:84191694
const fs = require('fs'); // time:2025-04-18T16:17:35.489Z line:11 uuid:8164e089
const path = require('path'); // time:2025-04-18T16:17:35.489Z line:12 uuid:3af25455
const crypto = require('crypto'); // time:2025-04-18T16:17:35.489Z line:13 uuid:929fd8d7
const { execSync } = require('child_process'); // time:2025-04-18T16:17:35.489Z line:14 uuid:6771008c
const readline = require('readline'); // time:2025-04-18T16:17:35.489Z line:15 uuid:f7e1cb15
// time:2025-04-18T16:17:35.489Z line:16 uuid:818058e2
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:17:35.489Z line:17 uuid:3bda4596
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:17:35.489Z line:18 uuid:482275cd
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:17:35.489Z line:19 uuid:d8dcde8d
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:17:35.489Z line:20 uuid:c83b5e8e
// time:2025-04-18T16:17:35.489Z line:21 uuid:6bf805f3
// time:2025-04-18T16:17:35.489Z line:22 uuid:99bb184c
// time:2025-04-18T16:17:35.489Z line:23 uuid:331d161f
// time:2025-04-18T16:17:35.489Z line:24 uuid:9f3749cc
// time:2025-04-18T16:17:35.489Z line:25 uuid:49a0428e
let config = { // time:2025-04-18T16:17:35.489Z line:26 uuid:f8000ab8
  includeBranch: true, // time:2025-04-18T16:17:35.489Z line:27 uuid:2b4cc315
  includeCommit: true, // time:2025-04-18T16:17:35.489Z line:28 uuid:d99369cd
  includeTimestamp: true, // time:2025-04-18T16:17:35.489Z line:29 uuid:b3e3693d
  includeLineNumber: true // time:2025-04-18T16:17:35.489Z line:30 uuid:1982089d
}; // time:2025-04-18T16:17:35.489Z line:31 uuid:f1b0bc83
// time:2025-04-18T16:17:35.489Z line:32 uuid:139fe8eb
// time:2025-04-18T16:17:35.489Z line:33 uuid:a561d608
let lastRunInfo = { // time:2025-04-18T16:17:35.489Z line:34 uuid:19386d82
  timestamp: null, // time:2025-04-18T16:17:35.489Z line:35 uuid:cfd5fb4e
  files: [] // time:2025-04-18T16:17:35.489Z line:36 uuid:489543ad
}; // time:2025-04-18T16:17:35.489Z line:37 uuid:da25bb06
// time:2025-04-18T16:17:35.489Z line:38 uuid:a2f448e5
function generateShortUUID() { // time:2025-04-18T16:17:35.489Z line:39 uuid:10b994d6
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:17:35.489Z line:40 uuid:af484a86
} // time:2025-04-18T16:17:35.489Z line:41 uuid:7e47122c
// time:2025-04-18T16:17:35.489Z line:42 uuid:7e3fade3
function getGitInfo() { // time:2025-04-18T16:17:35.489Z line:43 uuid:abe8dd44
  try { // time:2025-04-18T16:17:35.489Z line:44 uuid:f66a16a6
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:17:35.489Z line:45 uuid:1f366251
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.489Z line:46 uuid:e07968da
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.489Z line:47 uuid:260abf73
    return { branch, lastCommit }; // time:2025-04-18T16:17:35.489Z line:48 uuid:8a735ef2
  } catch { // time:2025-04-18T16:17:35.489Z line:49 uuid:0912d59e
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:17:35.489Z line:50 uuid:b0d3cd6c
  } // time:2025-04-18T16:17:35.489Z line:51 uuid:2a22ed17
} // time:2025-04-18T16:17:35.489Z line:52 uuid:5ae1a596
// time:2025-04-18T16:17:35.489Z line:53 uuid:80722c3d
function loadConfig() { // time:2025-04-18T16:17:35.489Z line:54 uuid:72e46c90
  try { // time:2025-04-18T16:17:35.489Z line:55 uuid:48feddd6
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:17:35.489Z line:56 uuid:5bcc0438
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:17:35.489Z line:57 uuid:accdf672
      const data = JSON.parse(fileContent); // time:2025-04-18T16:17:35.489Z line:58 uuid:a747b4db
// time:2025-04-18T16:17:35.489Z line:59 uuid:afb3d81b
// time:2025-04-18T16:17:35.489Z line:60 uuid:860b51e8
      if (data.config) { // time:2025-04-18T16:17:35.489Z line:61 uuid:b379e22c
        config = data.config; // time:2025-04-18T16:17:35.489Z line:62 uuid:f453df4e
      } // time:2025-04-18T16:17:35.489Z line:63 uuid:496b6bf4
// time:2025-04-18T16:17:35.489Z line:64 uuid:a7cf1e6a
// time:2025-04-18T16:17:35.489Z line:65 uuid:04be01ef
      if (data.lastRun) { // time:2025-04-18T16:17:35.489Z line:66 uuid:35a3a228
        lastRunInfo = data.lastRun; // time:2025-04-18T16:17:35.489Z line:67 uuid:7aece5a2
      } // time:2025-04-18T16:17:35.489Z line:68 uuid:445a2ef0
// time:2025-04-18T16:17:35.489Z line:69 uuid:97398a8e
      console.log('Loaded configuration:', config); // time:2025-04-18T16:17:35.489Z line:70 uuid:12803b76
    } // time:2025-04-18T16:17:35.489Z line:71 uuid:8b0efd7f
  } catch (error) { // time:2025-04-18T16:17:35.489Z line:72 uuid:9c342f60
    console.error('Error loading config:', error.message); // time:2025-04-18T16:17:35.489Z line:73 uuid:0f796020
  } // time:2025-04-18T16:17:35.489Z line:74 uuid:6d4c145b
} // time:2025-04-18T16:17:35.489Z line:75 uuid:dfb4183a
// time:2025-04-18T16:17:35.489Z line:76 uuid:40353c37
function saveConfig() { // time:2025-04-18T16:17:35.489Z line:77 uuid:1229ca79
  try { // time:2025-04-18T16:17:35.489Z line:78 uuid:a917f5d3
// time:2025-04-18T16:17:35.489Z line:79 uuid:8b2f085d
    const data = { // time:2025-04-18T16:17:35.489Z line:80 uuid:4a05f984
      config, // time:2025-04-18T16:17:35.489Z line:81 uuid:3a2da32d
      lastRun: lastRunInfo // time:2025-04-18T16:17:35.489Z line:82 uuid:e4187952
    }; // time:2025-04-18T16:17:35.489Z line:83 uuid:6476f66d
// time:2025-04-18T16:17:35.489Z line:84 uuid:dc77f043
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:17:35.489Z line:85 uuid:d87c5136
    console.log('Configuration saved.'); // time:2025-04-18T16:17:35.489Z line:86 uuid:1e31d27f
  } catch (error) { // time:2025-04-18T16:17:35.489Z line:87 uuid:bb8f7cd5
    console.error('Error saving config:', error.message); // time:2025-04-18T16:17:35.489Z line:88 uuid:f451a121
  } // time:2025-04-18T16:17:35.489Z line:89 uuid:5cae5a73
} // time:2025-04-18T16:17:35.489Z line:90 uuid:831d5080
// time:2025-04-18T16:17:35.489Z line:91 uuid:10a74840
function ensureBackupDir() { // time:2025-04-18T16:17:35.489Z line:92 uuid:d2c5e8e7
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:17:35.489Z line:93 uuid:cc37c030
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:17:35.489Z line:94 uuid:90a241aa
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:17:35.489Z line:95 uuid:c4f57d3b
  } // time:2025-04-18T16:17:35.489Z line:96 uuid:e3c000b1
} // time:2025-04-18T16:17:35.489Z line:97 uuid:692418ad
// time:2025-04-18T16:17:35.489Z line:98 uuid:8cb9d6c9
function backupFile(filePath) { // time:2025-04-18T16:17:35.489Z line:99 uuid:49ef6cb3
  try { // time:2025-04-18T16:17:35.489Z line:100 uuid:647a5850
    ensureBackupDir(); // time:2025-04-18T16:17:35.489Z line:101 uuid:0be0c3a6
// time:2025-04-18T16:17:35.489Z line:102 uuid:f919e1d4
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.489Z line:103 uuid:6df3bd6b
    const fileName = path.basename(filePath); // time:2025-04-18T16:17:35.489Z line:104 uuid:9488aea4
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:17:35.489Z line:105 uuid:46f4a973
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:17:35.489Z line:106 uuid:1e89ac28
// time:2025-04-18T16:17:35.489Z line:107 uuid:b58110c2
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:17:35.489Z line:108 uuid:df32027e
    return { relativePath, backupPath }; // time:2025-04-18T16:17:35.489Z line:109 uuid:af60ded3
  } catch (error) { // time:2025-04-18T16:17:35.489Z line:110 uuid:624be8df
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.489Z line:111 uuid:a9ef5202
    return null; // time:2025-04-18T16:17:35.489Z line:112 uuid:85277736
  } // time:2025-04-18T16:17:35.489Z line:113 uuid:270ae3fe
} // time:2025-04-18T16:17:35.489Z line:114 uuid:299e38ca
// time:2025-04-18T16:17:35.489Z line:115 uuid:ae7f79d1
function addUUIDsToFile(filePath) { // time:2025-04-18T16:17:35.489Z line:116 uuid:e5ba2d82
  try { // time:2025-04-18T16:17:35.489Z line:117 uuid:d784c445
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:17:35.489Z line:118 uuid:eb6486b7
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:17:35.489Z line:119 uuid:9596d41c
      return null; // time:2025-04-18T16:17:35.489Z line:120 uuid:b090aa40
    } // time:2025-04-18T16:17:35.489Z line:121 uuid:f3cf90bf
// time:2025-04-18T16:17:35.489Z line:122 uuid:ebb895ee
// time:2025-04-18T16:17:35.489Z line:123 uuid:b476f699
    const backup = backupFile(filePath); // time:2025-04-18T16:17:35.489Z line:124 uuid:2c4c3dfd
    if (!backup) return null; // time:2025-04-18T16:17:35.489Z line:125 uuid:dd95c995
// time:2025-04-18T16:17:35.489Z line:126 uuid:e92ef5b2
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:17:35.489Z line:127 uuid:45ed8559
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:17:35.489Z line:128 uuid:c5cc1fc0
// time:2025-04-18T16:17:35.489Z line:129 uuid:3158ed57
// time:2025-04-18T16:17:35.489Z line:130 uuid:b99846a9
    let metaParts = []; // time:2025-04-18T16:17:35.489Z line:131 uuid:72bce8d7
    if (config.includeBranch && branch) metaParts.push(branch); // time:2025-04-18T16:17:35.489Z line:132 uuid:797ea7d8
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // time:2025-04-18T16:17:35.489Z line:133 uuid:c5718f87
    if (config.includeTimestamp) metaParts.push(timestamp); // time:2025-04-18T16:17:35.489Z line:134 uuid:dfa1b82b
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:17:35.489Z line:135 uuid:050a1147
// time:2025-04-18T16:17:35.489Z line:136 uuid:c3978842
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.489Z line:137 uuid:17d62c10
    const lines = content.split('\n'); // time:2025-04-18T16:17:35.489Z line:138 uuid:69ba9e84
// time:2025-04-18T16:17:35.489Z line:139 uuid:f66b9eaa
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:17:35.489Z line:140 uuid:99821677
      const lineNumber = index + 1; // time:2025-04-18T16:17:35.489Z line:141 uuid:2e54bac3
      let cleanLine = line; // time:2025-04-18T16:17:35.489Z line:142 uuid:c91186fc
// time:2025-04-18T16:17:35.489Z line:143 uuid:90afd300
      if (line.includes(' // time:2025-04-18T16:17:35.489Z line:144 uuid:92c9106d
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:17:35.489Z line:145 uuid:744d58c6
      } // time:2025-04-18T16:17:35.489Z line:146 uuid:c4f911fd
// time:2025-04-18T16:17:35.489Z line:147 uuid:7a5cc745
      let comment = ' // time:2025-04-18T16:17:35.489Z line:148 uuid:25694076
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:17:35.489Z line:149 uuid:124c012c
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:17:35.489Z line:150 uuid:ac2e816a
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:17:35.489Z line:151 uuid:b21614b0
// time:2025-04-18T16:17:35.489Z line:152 uuid:7d8bda1b
      if (cleanLine.trim() === '') { // time:2025-04-18T16:17:35.489Z line:153 uuid:cb8f100c
        return comment.trim(); // time:2025-04-18T16:17:35.489Z line:154 uuid:5b20ef59
      } // time:2025-04-18T16:17:35.489Z line:155 uuid:be04187f
// time:2025-04-18T16:17:35.489Z line:156 uuid:ee04c439
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:17:35.489Z line:157 uuid:acc649dd
    }); // time:2025-04-18T16:17:35.489Z line:158 uuid:b6c8cdcd
// time:2025-04-18T16:17:35.489Z line:159 uuid:f2348449
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:17:35.489Z line:160 uuid:af92955d
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:17:35.489Z line:161 uuid:1c7be7fd
// time:2025-04-18T16:17:35.489Z line:162 uuid:b1317887
    return backup; // time:2025-04-18T16:17:35.489Z line:163 uuid:9b6f5418
  } catch (error) { // time:2025-04-18T16:17:35.489Z line:164 uuid:cfbffce7
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.489Z line:165 uuid:19e94a1d
    return null; // time:2025-04-18T16:17:35.489Z line:166 uuid:2e145fd1
  } // time:2025-04-18T16:17:35.489Z line:167 uuid:4f0b12de
} // time:2025-04-18T16:17:35.489Z line:168 uuid:57a85020
// time:2025-04-18T16:17:35.489Z line:169 uuid:87bcde7b
function processDirectory(dirPath) { // time:2025-04-18T16:17:35.489Z line:170 uuid:cf1d6df7
  const modifiedFiles = []; // time:2025-04-18T16:17:35.489Z line:171 uuid:72a606f2
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:17:35.489Z line:172 uuid:175c1a95
// time:2025-04-18T16:17:35.489Z line:173 uuid:da7f98a3
  for (const entry of entries) { // time:2025-04-18T16:17:35.489Z line:174 uuid:d8fb9084
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:17:35.489Z line:175 uuid:97772aa9
// time:2025-04-18T16:17:35.489Z line:176 uuid:97fdb2fc
    if (entry.isDirectory()) { // time:2025-04-18T16:17:35.489Z line:177 uuid:751e51ec
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:17:35.489Z line:178 uuid:3eacdb39
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:17:35.489Z line:179 uuid:52d5cc61
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:17:35.489Z line:180 uuid:18638572
      } // time:2025-04-18T16:17:35.489Z line:181 uuid:7c326887
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:17:35.489Z line:182 uuid:58044866
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:17:35.489Z line:183 uuid:e619eab6
      if (result) { // time:2025-04-18T16:17:35.489Z line:184 uuid:a8ec564f
        modifiedFiles.push(result); // time:2025-04-18T16:17:35.489Z line:185 uuid:88bfb7c1
      } // time:2025-04-18T16:17:35.489Z line:186 uuid:ccbdced2
    } // time:2025-04-18T16:17:35.489Z line:187 uuid:5e3e1e98
  } // time:2025-04-18T16:17:35.489Z line:188 uuid:35d510a9
// time:2025-04-18T16:17:35.489Z line:189 uuid:25e6fd69
  return modifiedFiles; // time:2025-04-18T16:17:35.489Z line:190 uuid:53f74815
} // time:2025-04-18T16:17:35.489Z line:191 uuid:dc00b29a
// time:2025-04-18T16:17:35.489Z line:192 uuid:d2f5e4db
function rollbackLastRun() { // time:2025-04-18T16:17:35.489Z line:193 uuid:8fc83b68
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:17:35.489Z line:194 uuid:a955f264
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:17:35.489Z line:195 uuid:3816a636
    return; // time:2025-04-18T16:17:35.489Z line:196 uuid:8886344b
  } // time:2025-04-18T16:17:35.489Z line:197 uuid:68e8116f
// time:2025-04-18T16:17:35.489Z line:198 uuid:6d4fa0b8
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:17:35.489Z line:199 uuid:53d80bad
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:17:35.489Z line:200 uuid:37f2ea77
// time:2025-04-18T16:17:35.489Z line:201 uuid:9605e6c5
  let successCount = 0; // time:2025-04-18T16:17:35.489Z line:202 uuid:58c06d9f
// time:2025-04-18T16:17:35.489Z line:203 uuid:8713a6e4
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:17:35.489Z line:204 uuid:ddf125ad
    try { // time:2025-04-18T16:17:35.489Z line:205 uuid:457482c9
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:17:35.489Z line:206 uuid:fba1153c
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:17:35.489Z line:207 uuid:28844bc6
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:17:35.489Z line:208 uuid:1ccfb5cb
// time:2025-04-18T16:17:35.489Z line:209 uuid:c6fbc9c1
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:17:35.489Z line:210 uuid:1deade6f
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:17:35.489Z line:211 uuid:ee4b3f86
        successCount++; // time:2025-04-18T16:17:35.489Z line:212 uuid:f3911982
      } else { // time:2025-04-18T16:17:35.489Z line:213 uuid:2374a40b
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:17:35.489Z line:214 uuid:ce9c0c22
      } // time:2025-04-18T16:17:35.489Z line:215 uuid:b81d8273
    } catch (error) { // time:2025-04-18T16:17:35.489Z line:216 uuid:c0f78c4d
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:17:35.489Z line:217 uuid:493acb3a
    } // time:2025-04-18T16:17:35.489Z line:218 uuid:fa0538d6
  } // time:2025-04-18T16:17:35.489Z line:219 uuid:4203ad63
// time:2025-04-18T16:17:35.489Z line:220 uuid:57e1b555
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:17:35.489Z line:221 uuid:30831f36
// time:2025-04-18T16:17:35.489Z line:222 uuid:7cf3de9f
// time:2025-04-18T16:17:35.489Z line:223 uuid:7d2bf586
  lastRunInfo = { // time:2025-04-18T16:17:35.489Z line:224 uuid:604fcf99
    timestamp: null, // time:2025-04-18T16:17:35.489Z line:225 uuid:bb87da30
    files: [] // time:2025-04-18T16:17:35.489Z line:226 uuid:ee4af7e6
  }; // time:2025-04-18T16:17:35.489Z line:227 uuid:11dd9730
// time:2025-04-18T16:17:35.489Z line:228 uuid:eeb1ceda
  saveConfig(); // time:2025-04-18T16:17:35.489Z line:229 uuid:f16db460
} // time:2025-04-18T16:17:35.489Z line:230 uuid:52e6e04f
// time:2025-04-18T16:17:35.489Z line:231 uuid:8341d98f
function runUUIDProcess() { // time:2025-04-18T16:17:35.489Z line:232 uuid:696e8c02
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:17:35.489Z line:233 uuid:241b5f86
// time:2025-04-18T16:17:35.489Z line:234 uuid:9ff75054
// time:2025-04-18T16:17:35.489Z line:235 uuid:d73969fd
  lastRunInfo = { // time:2025-04-18T16:17:35.489Z line:236 uuid:9e8169bc
    timestamp: Date.now(), // time:2025-04-18T16:17:35.489Z line:237 uuid:da913dcd
    files: modifiedFiles // time:2025-04-18T16:17:35.489Z line:238 uuid:c5a82f09
  }; // time:2025-04-18T16:17:35.489Z line:239 uuid:2c5f5bc4
// time:2025-04-18T16:17:35.489Z line:240 uuid:f045f470
  saveConfig(); // time:2025-04-18T16:17:35.489Z line:241 uuid:cf98fe4e
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:17:35.489Z line:242 uuid:7063ea2b
} // time:2025-04-18T16:17:35.489Z line:243 uuid:6f8e86c2
// time:2025-04-18T16:17:35.489Z line:244 uuid:d3b33477
function showMenu() { // time:2025-04-18T16:17:35.489Z line:245 uuid:d626ba2b
  const rl = readline.createInterface({ // time:2025-04-18T16:17:35.489Z line:246 uuid:05ee2c2c
    input: process.stdin, // time:2025-04-18T16:17:35.489Z line:247 uuid:7b543125
    output: process.stdout // time:2025-04-18T16:17:35.489Z line:248 uuid:feea27bd
  }); // time:2025-04-18T16:17:35.489Z line:249 uuid:213f892d
// time:2025-04-18T16:17:35.489Z line:250 uuid:bfd80029
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:17:35.489Z line:251 uuid:38cc94d4
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.489Z line:252 uuid:4d5da391
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.489Z line:253 uuid:6b09474c
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.489Z line:254 uuid:2642fd64
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.489Z line:255 uuid:22e7b5a5
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:17:35.489Z line:256 uuid:c007ac00
  console.log('6. Save and Run'); // time:2025-04-18T16:17:35.489Z line:257 uuid:283b5f7c
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:17:35.489Z line:258 uuid:5486168c
  console.log('8. Exit'); // time:2025-04-18T16:17:35.489Z line:259 uuid:0861d349
// time:2025-04-18T16:17:35.489Z line:260 uuid:a76d7b45
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:17:35.489Z line:261 uuid:ad2f3185
    switch(answer) { // time:2025-04-18T16:17:35.489Z line:262 uuid:9bb32b2f
      case '1': // time:2025-04-18T16:17:35.489Z line:263 uuid:c0bb86f7
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:17:35.489Z line:264 uuid:d8cbf9c9
        rl.close(); // time:2025-04-18T16:17:35.489Z line:265 uuid:205c9ea5
        showMenu(); // time:2025-04-18T16:17:35.489Z line:266 uuid:3d7bae74
        break; // time:2025-04-18T16:17:35.489Z line:267 uuid:8c0cca55
      case '2': // time:2025-04-18T16:17:35.489Z line:268 uuid:94d0135c
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:17:35.489Z line:269 uuid:7fc5607e
        rl.close(); // time:2025-04-18T16:17:35.489Z line:270 uuid:7e2a3b89
        showMenu(); // time:2025-04-18T16:17:35.489Z line:271 uuid:d49a99fc
        break; // time:2025-04-18T16:17:35.489Z line:272 uuid:e337c1f4
      case '3': // time:2025-04-18T16:17:35.489Z line:273 uuid:e30dcea9
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:17:35.489Z line:274 uuid:7c6477e1
        rl.close(); // time:2025-04-18T16:17:35.489Z line:275 uuid:b71b79b6
        showMenu(); // time:2025-04-18T16:17:35.489Z line:276 uuid:45598de7
        break; // time:2025-04-18T16:17:35.489Z line:277 uuid:94d9ac50
      case '4': // time:2025-04-18T16:17:35.489Z line:278 uuid:66ad26ac
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:17:35.489Z line:279 uuid:2b19d14a
        rl.close(); // time:2025-04-18T16:17:35.489Z line:280 uuid:43329dfa
        showMenu(); // time:2025-04-18T16:17:35.489Z line:281 uuid:d8c64fb2
        break; // time:2025-04-18T16:17:35.489Z line:282 uuid:5791895b
      case '5': // time:2025-04-18T16:17:35.489Z line:283 uuid:b473f528
        config = { // time:2025-04-18T16:17:35.489Z line:284 uuid:c14cec4d
          includeBranch: true, // time:2025-04-18T16:17:35.489Z line:285 uuid:fd16e06d
          includeCommit: true, // time:2025-04-18T16:17:35.489Z line:286 uuid:721cd053
          includeTimestamp: true, // time:2025-04-18T16:17:35.489Z line:287 uuid:7e8fb3fe
          includeLineNumber: true // time:2025-04-18T16:17:35.489Z line:288 uuid:3a164586
        }; // time:2025-04-18T16:17:35.489Z line:289 uuid:97d34c17
        rl.close(); // time:2025-04-18T16:17:35.489Z line:290 uuid:e9e50714
        showMenu(); // time:2025-04-18T16:17:35.489Z line:291 uuid:9b1e7276
        break; // time:2025-04-18T16:17:35.489Z line:292 uuid:8994a98b
      case '6': // time:2025-04-18T16:17:35.489Z line:293 uuid:5b4ddf47
        saveConfig(); // time:2025-04-18T16:17:35.489Z line:294 uuid:847b88ca
        rl.close(); // time:2025-04-18T16:17:35.489Z line:295 uuid:f551c630
        runUUIDProcess(); // time:2025-04-18T16:17:35.489Z line:296 uuid:cb56b84a
        break; // time:2025-04-18T16:17:35.489Z line:297 uuid:6ec0bd03
      case '7': // time:2025-04-18T16:17:35.489Z line:298 uuid:0637894e
        rl.close(); // time:2025-04-18T16:17:35.489Z line:299 uuid:8440d13a
        rollbackLastRun(); // time:2025-04-18T16:17:35.489Z line:300 uuid:187de10f
        showMenu(); // time:2025-04-18T16:17:35.489Z line:301 uuid:c492121e
        break; // time:2025-04-18T16:17:35.489Z line:302 uuid:4af4bf20
      case '8': // time:2025-04-18T16:17:35.489Z line:303 uuid:bcc17d77
        console.log('Exiting without changes.'); // time:2025-04-18T16:17:35.489Z line:304 uuid:fff32d59
        rl.close(); // time:2025-04-18T16:17:35.489Z line:305 uuid:97f893aa
        break; // time:2025-04-18T16:17:35.489Z line:306 uuid:f4c0248f
      default: // time:2025-04-18T16:17:35.489Z line:307 uuid:84a62f84
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:17:35.489Z line:308 uuid:5408fc94
        rl.close(); // time:2025-04-18T16:17:35.489Z line:309 uuid:8606fcab
        showMenu(); // time:2025-04-18T16:17:35.489Z line:310 uuid:d2b66563
    } // time:2025-04-18T16:17:35.489Z line:311 uuid:9de98c4b
  }); // time:2025-04-18T16:17:35.489Z line:312 uuid:d1906fca
} // time:2025-04-18T16:17:35.489Z line:313 uuid:0d48949e
// time:2025-04-18T16:17:35.489Z line:314 uuid:bcc147e2
// time:2025-04-18T16:17:35.489Z line:315 uuid:d61cabd5
function main() { // time:2025-04-18T16:17:35.489Z line:316 uuid:625c4438
  loadConfig(); // time:2025-04-18T16:17:35.489Z line:317 uuid:9a852287
// time:2025-04-18T16:17:35.489Z line:318 uuid:dad45ca8
  if (process.argv.length > 2) { // time:2025-04-18T16:17:35.489Z line:319 uuid:ceda2f83
    if (process.argv[2] === '--run') { // time:2025-04-18T16:17:35.489Z line:320 uuid:bb4723ac
// time:2025-04-18T16:17:35.489Z line:321 uuid:0369a042
      runUUIDProcess(); // time:2025-04-18T16:17:35.489Z line:322 uuid:6e8871a7
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:17:35.489Z line:323 uuid:224bf178
// time:2025-04-18T16:17:35.489Z line:324 uuid:42cbf83a
      rollbackLastRun(); // time:2025-04-18T16:17:35.489Z line:325 uuid:e6a09f11
    } else { // time:2025-04-18T16:17:35.489Z line:326 uuid:66f4ccae
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:17:35.489Z line:327 uuid:9308b838
    } // time:2025-04-18T16:17:35.489Z line:328 uuid:ad515ec5
  } else { // time:2025-04-18T16:17:35.489Z line:329 uuid:f1571fdf
// time:2025-04-18T16:17:35.489Z line:330 uuid:7fef988f
    showMenu(); // time:2025-04-18T16:17:35.489Z line:331 uuid:6d3ee004
  } // time:2025-04-18T16:17:35.489Z line:332 uuid:b5daa9ad
} // time:2025-04-18T16:17:35.489Z line:333 uuid:74270c77
// time:2025-04-18T16:17:35.489Z line:334 uuid:508e94f4
main(); // time:2025-04-18T16:17:35.489Z line:335 uuid:b1458816