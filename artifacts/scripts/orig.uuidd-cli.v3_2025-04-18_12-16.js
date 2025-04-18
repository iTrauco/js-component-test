// time:2025-04-18T16:17:35.534Z line:1 uuid:215ef442
// time:2025-04-18T16:17:35.534Z line:2 uuid:ad0db98d
// time:2025-04-18T16:17:35.534Z line:3 uuid:2d4fc9bc
// time:2025-04-18T16:17:35.534Z line:4 uuid:f08f0d24
// time:2025-04-18T16:17:35.534Z line:5 uuid:6c18603b
// time:2025-04-18T16:17:35.534Z line:6 uuid:ecbd58cc
// time:2025-04-18T16:17:35.534Z line:7 uuid:746084ab
// time:2025-04-18T16:17:35.534Z line:8 uuid:e5f18637
// time:2025-04-18T16:17:35.534Z line:9 uuid:dbbb5787
// time:2025-04-18T16:17:35.534Z line:10 uuid:2551c2ba
const fs = require('fs'); // time:2025-04-18T16:17:35.534Z line:11 uuid:0f27eca9
const path = require('path'); // time:2025-04-18T16:17:35.534Z line:12 uuid:6b6ae88e
const crypto = require('crypto'); // time:2025-04-18T16:17:35.534Z line:13 uuid:593d8c84
const { execSync } = require('child_process'); // time:2025-04-18T16:17:35.534Z line:14 uuid:3e975a9c
const readline = require('readline'); // time:2025-04-18T16:17:35.534Z line:15 uuid:336436c6
// time:2025-04-18T16:17:35.534Z line:16 uuid:3d9b6b7d
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:17:35.534Z line:17 uuid:3fdae817
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:17:35.534Z line:18 uuid:c7531c0a
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:17:35.534Z line:19 uuid:eec46a9c
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:17:35.534Z line:20 uuid:9835825d
// time:2025-04-18T16:17:35.534Z line:21 uuid:1cde41f6
// time:2025-04-18T16:17:35.534Z line:22 uuid:3a443209
let config = { // time:2025-04-18T16:17:35.534Z line:23 uuid:b3f64c69
  includeBranch: true, // time:2025-04-18T16:17:35.534Z line:24 uuid:55f56875
  includeCommit: true, // time:2025-04-18T16:17:35.534Z line:25 uuid:8165c282
  includeTimestamp: true, // time:2025-04-18T16:17:35.534Z line:26 uuid:deb5e048
  includeLineNumber: true // time:2025-04-18T16:17:35.534Z line:27 uuid:7fbba701
}; // time:2025-04-18T16:17:35.534Z line:28 uuid:960c7108
// time:2025-04-18T16:17:35.534Z line:29 uuid:193ab465
// time:2025-04-18T16:17:35.534Z line:30 uuid:842bdfc2
let lastRunInfo = { // time:2025-04-18T16:17:35.534Z line:31 uuid:29b82820
  timestamp: null, // time:2025-04-18T16:17:35.534Z line:32 uuid:b2404e09
  files: [] // time:2025-04-18T16:17:35.534Z line:33 uuid:25fb0862
}; // time:2025-04-18T16:17:35.534Z line:34 uuid:e181d780
// time:2025-04-18T16:17:35.534Z line:35 uuid:91428270
function generateShortUUID() { // time:2025-04-18T16:17:35.534Z line:36 uuid:26495d55
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:17:35.534Z line:37 uuid:86d0f630
} // time:2025-04-18T16:17:35.534Z line:38 uuid:8d30c97d
// time:2025-04-18T16:17:35.534Z line:39 uuid:a3bfce37
function getGitInfo() { // time:2025-04-18T16:17:35.534Z line:40 uuid:5766c27e
  try { // time:2025-04-18T16:17:35.534Z line:41 uuid:3ee946b7
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:17:35.534Z line:42 uuid:cd2cd5bf
    let branch; // time:2025-04-18T16:17:35.534Z line:43 uuid:20cafb89
// time:2025-04-18T16:17:35.534Z line:44 uuid:0df0371d
// time:2025-04-18T16:17:35.534Z line:45 uuid:b2b766b2
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:17:35.534Z line:46 uuid:98c3c447
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:17:35.534Z line:47 uuid:b06a95b3
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:17:35.534Z line:48 uuid:3ce0407a
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:17:35.534Z line:49 uuid:ddd88d3f
    } else { // time:2025-04-18T16:17:35.534Z line:50 uuid:d9929acc
// time:2025-04-18T16:17:35.534Z line:51 uuid:977a6d1f
      try { // time:2025-04-18T16:17:35.534Z line:52 uuid:fcbad018
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.534Z line:53 uuid:39be73af
// time:2025-04-18T16:17:35.534Z line:54 uuid:36057a58
// time:2025-04-18T16:17:35.534Z line:55 uuid:f9f982ec
        if (!branch) { // time:2025-04-18T16:17:35.534Z line:56 uuid:b84525dc
          const gitStatusOutput = execSync('git status', { encoding: 'utf8' }); // time:2025-04-18T16:17:35.534Z line:57 uuid:2edb8235
          const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/); // time:2025-04-18T16:17:35.534Z line:58 uuid:0d0d6ba7
          if (branchMatch && branchMatch[1]) { // time:2025-04-18T16:17:35.534Z line:59 uuid:61e91171
            branch = branchMatch[1]; // time:2025-04-18T16:17:35.534Z line:60 uuid:adad3264
          } // time:2025-04-18T16:17:35.534Z line:61 uuid:4c0d2da0
        } // time:2025-04-18T16:17:35.534Z line:62 uuid:78a5d0d5
      } catch (branchError) { // time:2025-04-18T16:17:35.534Z line:63 uuid:2e17a0a4
        console.log('Error getting branch name:', branchError.message); // time:2025-04-18T16:17:35.534Z line:64 uuid:3ddd2c49
      } // time:2025-04-18T16:17:35.534Z line:65 uuid:9364fe2d
    } // time:2025-04-18T16:17:35.534Z line:66 uuid:50d672cd
// time:2025-04-18T16:17:35.534Z line:67 uuid:91f355e2
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:17:35.534Z line:68 uuid:176b0f6e
    return { branch, lastCommit }; // time:2025-04-18T16:17:35.534Z line:69 uuid:d9b09a2e
  } catch (error) { // time:2025-04-18T16:17:35.534Z line:70 uuid:2078f029
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:17:35.534Z line:71 uuid:d18cd9f1
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:17:35.534Z line:72 uuid:9a1ac15b
  } // time:2025-04-18T16:17:35.534Z line:73 uuid:f1b19b6f
} // time:2025-04-18T16:17:35.534Z line:74 uuid:8bfbe9e3
// time:2025-04-18T16:17:35.534Z line:75 uuid:cda0a436
function loadConfig() { // time:2025-04-18T16:17:35.534Z line:76 uuid:5a76e0db
  try { // time:2025-04-18T16:17:35.534Z line:77 uuid:bdd0fa37
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:17:35.534Z line:78 uuid:f8c4e0d6
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:17:35.534Z line:79 uuid:214b1a4a
      const data = JSON.parse(fileContent); // time:2025-04-18T16:17:35.534Z line:80 uuid:8c776b61
// time:2025-04-18T16:17:35.534Z line:81 uuid:5587b00a
// time:2025-04-18T16:17:35.534Z line:82 uuid:1b3fdcb3
      if (data.config) { // time:2025-04-18T16:17:35.534Z line:83 uuid:7552cfec
        config = data.config; // time:2025-04-18T16:17:35.534Z line:84 uuid:ceac4474
      } // time:2025-04-18T16:17:35.534Z line:85 uuid:49c56dbb
// time:2025-04-18T16:17:35.534Z line:86 uuid:8b7a3a17
// time:2025-04-18T16:17:35.534Z line:87 uuid:fc76d0bb
      if (data.lastRun) { // time:2025-04-18T16:17:35.534Z line:88 uuid:9b01d1c3
        lastRunInfo = data.lastRun; // time:2025-04-18T16:17:35.534Z line:89 uuid:db6e98b0
      } // time:2025-04-18T16:17:35.534Z line:90 uuid:4dac3aec
// time:2025-04-18T16:17:35.534Z line:91 uuid:27fedd5f
      console.log('Loaded configuration:', config); // time:2025-04-18T16:17:35.534Z line:92 uuid:5c86ac56
    } // time:2025-04-18T16:17:35.534Z line:93 uuid:8e83f180
  } catch (error) { // time:2025-04-18T16:17:35.534Z line:94 uuid:3caab82c
    console.error('Error loading config:', error.message); // time:2025-04-18T16:17:35.534Z line:95 uuid:5ac04eb0
  } // time:2025-04-18T16:17:35.534Z line:96 uuid:790dc093
} // time:2025-04-18T16:17:35.534Z line:97 uuid:ad6033c8
// time:2025-04-18T16:17:35.534Z line:98 uuid:1cc04152
function saveConfig() { // time:2025-04-18T16:17:35.534Z line:99 uuid:5e6139f0
  try { // time:2025-04-18T16:17:35.534Z line:100 uuid:b1d27483
// time:2025-04-18T16:17:35.534Z line:101 uuid:b9aa423b
    const data = { // time:2025-04-18T16:17:35.534Z line:102 uuid:a9ef6c74
      config, // time:2025-04-18T16:17:35.534Z line:103 uuid:c0a79582
      lastRun: lastRunInfo // time:2025-04-18T16:17:35.534Z line:104 uuid:4c5eb834
    }; // time:2025-04-18T16:17:35.534Z line:105 uuid:2426a751
// time:2025-04-18T16:17:35.534Z line:106 uuid:7fddd1b1
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:17:35.534Z line:107 uuid:bc6b0f22
    console.log('Configuration saved.'); // time:2025-04-18T16:17:35.534Z line:108 uuid:eb442937
  } catch (error) { // time:2025-04-18T16:17:35.534Z line:109 uuid:8286418a
    console.error('Error saving config:', error.message); // time:2025-04-18T16:17:35.534Z line:110 uuid:538a51c0
  } // time:2025-04-18T16:17:35.534Z line:111 uuid:90152b2f
} // time:2025-04-18T16:17:35.534Z line:112 uuid:e461ba32
// time:2025-04-18T16:17:35.534Z line:113 uuid:9031e165
function ensureBackupDir() { // time:2025-04-18T16:17:35.534Z line:114 uuid:d682f024
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:17:35.534Z line:115 uuid:cd96de99
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:17:35.534Z line:116 uuid:5c72ae52
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:17:35.534Z line:117 uuid:1f584d11
  } // time:2025-04-18T16:17:35.534Z line:118 uuid:05b30db9
} // time:2025-04-18T16:17:35.534Z line:119 uuid:dd97c11d
// time:2025-04-18T16:17:35.534Z line:120 uuid:91b69888
function backupFile(filePath) { // time:2025-04-18T16:17:35.534Z line:121 uuid:598c3cfc
  try { // time:2025-04-18T16:17:35.534Z line:122 uuid:880953cf
    ensureBackupDir(); // time:2025-04-18T16:17:35.534Z line:123 uuid:82a5d21d
// time:2025-04-18T16:17:35.534Z line:124 uuid:ea2bda06
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.534Z line:125 uuid:ff5e973a
    const fileName = path.basename(filePath); // time:2025-04-18T16:17:35.534Z line:126 uuid:da4a7a82
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:17:35.534Z line:127 uuid:6bb196ea
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:17:35.534Z line:128 uuid:294c3438
// time:2025-04-18T16:17:35.534Z line:129 uuid:2e951ffa
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:17:35.534Z line:130 uuid:e287d8b3
    return { relativePath, backupPath }; // time:2025-04-18T16:17:35.534Z line:131 uuid:97e15093
  } catch (error) { // time:2025-04-18T16:17:35.534Z line:132 uuid:17f570fc
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.534Z line:133 uuid:49b2796b
    return null; // time:2025-04-18T16:17:35.534Z line:134 uuid:0dd2fc93
  } // time:2025-04-18T16:17:35.534Z line:135 uuid:4ea0c9e8
} // time:2025-04-18T16:17:35.534Z line:136 uuid:697387e7
// time:2025-04-18T16:17:35.534Z line:137 uuid:a36a6082
function addUUIDsToFile(filePath) { // time:2025-04-18T16:17:35.534Z line:138 uuid:a7d3132d
  try { // time:2025-04-18T16:17:35.534Z line:139 uuid:ca0f8c0f
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:17:35.534Z line:140 uuid:3d5643b2
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:17:35.534Z line:141 uuid:c69bf0d6
      return null; // time:2025-04-18T16:17:35.534Z line:142 uuid:51e917ca
    } // time:2025-04-18T16:17:35.534Z line:143 uuid:6a446629
// time:2025-04-18T16:17:35.534Z line:144 uuid:6a9a9946
// time:2025-04-18T16:17:35.534Z line:145 uuid:95623f40
    const backup = backupFile(filePath); // time:2025-04-18T16:17:35.534Z line:146 uuid:65f9d07c
    if (!backup) return null; // time:2025-04-18T16:17:35.534Z line:147 uuid:349884f4
// time:2025-04-18T16:17:35.534Z line:148 uuid:517018b9
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:17:35.534Z line:149 uuid:d28951ce
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:17:35.534Z line:150 uuid:e86defe9
// time:2025-04-18T16:17:35.534Z line:151 uuid:270dc0bf
// time:2025-04-18T16:17:35.534Z line:152 uuid:b79082bc
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`); // time:2025-04-18T16:17:35.534Z line:153 uuid:cce627eb
// time:2025-04-18T16:17:35.534Z line:154 uuid:6ebeb5f1
// time:2025-04-18T16:17:35.534Z line:155 uuid:dffd4e8e
    let metaParts = []; // time:2025-04-18T16:17:35.534Z line:156 uuid:c5e6fc7d
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`); // time:2025-04-18T16:17:35.534Z line:157 uuid:8bf3daf2
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`); // time:2025-04-18T16:17:35.534Z line:158 uuid:af981c53
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`); // time:2025-04-18T16:17:35.534Z line:159 uuid:9877510e
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:17:35.534Z line:160 uuid:2a81b174
// time:2025-04-18T16:17:35.534Z line:161 uuid:001558d5
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:17:35.534Z line:162 uuid:3e6c5f92
    const lines = content.split('\n'); // time:2025-04-18T16:17:35.534Z line:163 uuid:dc83e477
// time:2025-04-18T16:17:35.534Z line:164 uuid:837d1f41
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:17:35.534Z line:165 uuid:5c29b809
      const lineNumber = index + 1; // time:2025-04-18T16:17:35.534Z line:166 uuid:62ae2eab
      let cleanLine = line; // time:2025-04-18T16:17:35.534Z line:167 uuid:59697b56
// time:2025-04-18T16:17:35.534Z line:168 uuid:48dc077d
      if (line.includes(' // time:2025-04-18T16:17:35.534Z line:169 uuid:2c74bafd
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:17:35.534Z line:170 uuid:aab13c3c
      } // time:2025-04-18T16:17:35.534Z line:171 uuid:2466fb0a
// time:2025-04-18T16:17:35.534Z line:172 uuid:a7f4411d
      let comment = ' // time:2025-04-18T16:17:35.534Z line:173 uuid:9cc6addc
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:17:35.534Z line:174 uuid:680c9464
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:17:35.534Z line:175 uuid:63c71c8e
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:17:35.534Z line:176 uuid:d8ecfba1
// time:2025-04-18T16:17:35.534Z line:177 uuid:84713f0b
      if (cleanLine.trim() === '') { // time:2025-04-18T16:17:35.534Z line:178 uuid:29f6b4b2
        return comment.trim(); // time:2025-04-18T16:17:35.534Z line:179 uuid:92f2d1b7
      } // time:2025-04-18T16:17:35.534Z line:180 uuid:e0c2bd52
// time:2025-04-18T16:17:35.534Z line:181 uuid:d0cba415
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:17:35.534Z line:182 uuid:c0857e64
    }); // time:2025-04-18T16:17:35.534Z line:183 uuid:f1f37042
// time:2025-04-18T16:17:35.534Z line:184 uuid:0105d8b2
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:17:35.534Z line:185 uuid:c22d9d81
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:17:35.534Z line:186 uuid:71ea1e4c
// time:2025-04-18T16:17:35.534Z line:187 uuid:e412209c
    return backup; // time:2025-04-18T16:17:35.534Z line:188 uuid:3d997e89
  } catch (error) { // time:2025-04-18T16:17:35.534Z line:189 uuid:0fd85391
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:17:35.534Z line:190 uuid:09c92920
    return null; // time:2025-04-18T16:17:35.534Z line:191 uuid:c8677a5b
  } // time:2025-04-18T16:17:35.534Z line:192 uuid:69d880f6
} // time:2025-04-18T16:17:35.534Z line:193 uuid:f93465ef
// time:2025-04-18T16:17:35.534Z line:194 uuid:28b35cda
function processDirectory(dirPath) { // time:2025-04-18T16:17:35.534Z line:195 uuid:2ce135eb
  const modifiedFiles = []; // time:2025-04-18T16:17:35.534Z line:196 uuid:422f3f7b
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:17:35.534Z line:197 uuid:90b53cd4
// time:2025-04-18T16:17:35.534Z line:198 uuid:3e7ae723
  for (const entry of entries) { // time:2025-04-18T16:17:35.534Z line:199 uuid:88ca9b0c
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:17:35.534Z line:200 uuid:a9914808
// time:2025-04-18T16:17:35.534Z line:201 uuid:64708ef1
    if (entry.isDirectory()) { // time:2025-04-18T16:17:35.534Z line:202 uuid:1d90b2c6
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:17:35.534Z line:203 uuid:daea7041
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:17:35.534Z line:204 uuid:13c04f62
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:17:35.534Z line:205 uuid:ee0a2fd9
      } // time:2025-04-18T16:17:35.534Z line:206 uuid:2cdcf5e8
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:17:35.534Z line:207 uuid:d5868cf3
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:17:35.534Z line:208 uuid:6b321167
      if (result) { // time:2025-04-18T16:17:35.534Z line:209 uuid:4a3ff4f4
        modifiedFiles.push(result); // time:2025-04-18T16:17:35.534Z line:210 uuid:d62f99b9
      } // time:2025-04-18T16:17:35.534Z line:211 uuid:370c8612
    } // time:2025-04-18T16:17:35.534Z line:212 uuid:696c646b
  } // time:2025-04-18T16:17:35.534Z line:213 uuid:f6fdd5b4
// time:2025-04-18T16:17:35.534Z line:214 uuid:0506e0e7
  return modifiedFiles; // time:2025-04-18T16:17:35.534Z line:215 uuid:add62a75
} // time:2025-04-18T16:17:35.534Z line:216 uuid:3dc98ce5
// time:2025-04-18T16:17:35.534Z line:217 uuid:2fec02fe
function rollbackLastRun() { // time:2025-04-18T16:17:35.534Z line:218 uuid:8ebb5e0c
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:17:35.534Z line:219 uuid:2de69d75
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:17:35.534Z line:220 uuid:4973ed4f
    return; // time:2025-04-18T16:17:35.534Z line:221 uuid:695115aa
  } // time:2025-04-18T16:17:35.534Z line:222 uuid:c9b5024c
// time:2025-04-18T16:17:35.534Z line:223 uuid:dd85354e
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:17:35.534Z line:224 uuid:c7fc6a26
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:17:35.534Z line:225 uuid:64fbbf05
// time:2025-04-18T16:17:35.534Z line:226 uuid:267aeed1
  let successCount = 0; // time:2025-04-18T16:17:35.534Z line:227 uuid:7291364a
// time:2025-04-18T16:17:35.534Z line:228 uuid:f2019851
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:17:35.534Z line:229 uuid:841d7dd3
    try { // time:2025-04-18T16:17:35.534Z line:230 uuid:344c60a1
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:17:35.534Z line:231 uuid:4bd39029
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:17:35.534Z line:232 uuid:cfd7850e
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:17:35.534Z line:233 uuid:8f01c2f0
// time:2025-04-18T16:17:35.534Z line:234 uuid:0022487c
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:17:35.534Z line:235 uuid:db14b258
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:17:35.534Z line:236 uuid:32c51517
        successCount++; // time:2025-04-18T16:17:35.534Z line:237 uuid:38e31b63
      } else { // time:2025-04-18T16:17:35.534Z line:238 uuid:6372fd38
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:17:35.534Z line:239 uuid:727ca3de
      } // time:2025-04-18T16:17:35.534Z line:240 uuid:46e3a341
    } catch (error) { // time:2025-04-18T16:17:35.534Z line:241 uuid:c9b4c076
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:17:35.534Z line:242 uuid:739435b2
    } // time:2025-04-18T16:17:35.534Z line:243 uuid:a1dc95b1
  } // time:2025-04-18T16:17:35.534Z line:244 uuid:05542bbf
// time:2025-04-18T16:17:35.534Z line:245 uuid:ec58496a
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:17:35.534Z line:246 uuid:cb1c6ee5
// time:2025-04-18T16:17:35.534Z line:247 uuid:cdd6cd90
// time:2025-04-18T16:17:35.534Z line:248 uuid:cbe40806
  lastRunInfo = { // time:2025-04-18T16:17:35.534Z line:249 uuid:0a9ffa33
    timestamp: null, // time:2025-04-18T16:17:35.534Z line:250 uuid:e9c18a2b
    files: [] // time:2025-04-18T16:17:35.534Z line:251 uuid:5d0b5310
  }; // time:2025-04-18T16:17:35.534Z line:252 uuid:341eb720
// time:2025-04-18T16:17:35.534Z line:253 uuid:28a82ad8
  saveConfig(); // time:2025-04-18T16:17:35.534Z line:254 uuid:4a0a0bc5
} // time:2025-04-18T16:17:35.534Z line:255 uuid:082922e7
// time:2025-04-18T16:17:35.534Z line:256 uuid:1c6fab49
function runUUIDProcess() { // time:2025-04-18T16:17:35.534Z line:257 uuid:5c2b07c7
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:17:35.534Z line:258 uuid:0f64567d
// time:2025-04-18T16:17:35.534Z line:259 uuid:9a567205
// time:2025-04-18T16:17:35.534Z line:260 uuid:5fc7f59c
  lastRunInfo = { // time:2025-04-18T16:17:35.534Z line:261 uuid:4e3920d5
    timestamp: Date.now(), // time:2025-04-18T16:17:35.534Z line:262 uuid:042cc871
    files: modifiedFiles // time:2025-04-18T16:17:35.534Z line:263 uuid:74bc53a6
  }; // time:2025-04-18T16:17:35.534Z line:264 uuid:af0584ee
// time:2025-04-18T16:17:35.534Z line:265 uuid:c080ed84
  saveConfig(); // time:2025-04-18T16:17:35.534Z line:266 uuid:64485c5d
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:17:35.534Z line:267 uuid:bf8aee6a
} // time:2025-04-18T16:17:35.534Z line:268 uuid:f3323765
// time:2025-04-18T16:17:35.534Z line:269 uuid:f79854e4
function showMenu() { // time:2025-04-18T16:17:35.534Z line:270 uuid:aafb2f34
  const rl = readline.createInterface({ // time:2025-04-18T16:17:35.534Z line:271 uuid:2fdbee79
    input: process.stdin, // time:2025-04-18T16:17:35.534Z line:272 uuid:f7fdb13f
    output: process.stdout // time:2025-04-18T16:17:35.534Z line:273 uuid:b4c69a01
  }); // time:2025-04-18T16:17:35.534Z line:274 uuid:1c2c8f9b
// time:2025-04-18T16:17:35.534Z line:275 uuid:be4a98a0
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:17:35.534Z line:276 uuid:c6aa5363
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.534Z line:277 uuid:7c724e2f
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.534Z line:278 uuid:8bf6fa33
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.534Z line:279 uuid:4a69fe41
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:17:35.534Z line:280 uuid:4ca189ec
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:17:35.534Z line:281 uuid:a5248821
  console.log('6. Save and Run'); // time:2025-04-18T16:17:35.534Z line:282 uuid:da9e6e1b
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:17:35.534Z line:283 uuid:13a7579f
  console.log('8. Exit'); // time:2025-04-18T16:17:35.534Z line:284 uuid:ef423e1a
// time:2025-04-18T16:17:35.534Z line:285 uuid:7e1acec0
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:17:35.534Z line:286 uuid:902e1deb
    switch(answer) { // time:2025-04-18T16:17:35.534Z line:287 uuid:b4b7cdad
      case '1': // time:2025-04-18T16:17:35.534Z line:288 uuid:4ade87a9
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:17:35.534Z line:289 uuid:efc5081f
        rl.close(); // time:2025-04-18T16:17:35.534Z line:290 uuid:27f62566
        showMenu(); // time:2025-04-18T16:17:35.534Z line:291 uuid:9fbb718a
        break; // time:2025-04-18T16:17:35.534Z line:292 uuid:128a6857
      case '2': // time:2025-04-18T16:17:35.534Z line:293 uuid:45acc34c
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:17:35.534Z line:294 uuid:90011414
        rl.close(); // time:2025-04-18T16:17:35.534Z line:295 uuid:cec26744
        showMenu(); // time:2025-04-18T16:17:35.534Z line:296 uuid:c2fc689b
        break; // time:2025-04-18T16:17:35.534Z line:297 uuid:947d4572
      case '3': // time:2025-04-18T16:17:35.534Z line:298 uuid:04417cdc
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:17:35.534Z line:299 uuid:fdf46ec3
        rl.close(); // time:2025-04-18T16:17:35.534Z line:300 uuid:66cb614c
        showMenu(); // time:2025-04-18T16:17:35.534Z line:301 uuid:88046456
        break; // time:2025-04-18T16:17:35.534Z line:302 uuid:897b83d2
      case '4': // time:2025-04-18T16:17:35.534Z line:303 uuid:400682c3
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:17:35.534Z line:304 uuid:7e6f5536
        rl.close(); // time:2025-04-18T16:17:35.534Z line:305 uuid:6df2c246
        showMenu(); // time:2025-04-18T16:17:35.534Z line:306 uuid:ea6da340
        break; // time:2025-04-18T16:17:35.534Z line:307 uuid:6c2b7422
      case '5': // time:2025-04-18T16:17:35.534Z line:308 uuid:9137e565
        config = { // time:2025-04-18T16:17:35.534Z line:309 uuid:ebd24233
          includeBranch: true, // time:2025-04-18T16:17:35.534Z line:310 uuid:2aec9075
          includeCommit: true, // time:2025-04-18T16:17:35.534Z line:311 uuid:2eed298a
          includeTimestamp: true, // time:2025-04-18T16:17:35.534Z line:312 uuid:47bc00cc
          includeLineNumber: true // time:2025-04-18T16:17:35.534Z line:313 uuid:7b6a6c64
        }; // time:2025-04-18T16:17:35.534Z line:314 uuid:8c349c71
        rl.close(); // time:2025-04-18T16:17:35.534Z line:315 uuid:e4958d88
        showMenu(); // time:2025-04-18T16:17:35.534Z line:316 uuid:af8f8cff
        break; // time:2025-04-18T16:17:35.534Z line:317 uuid:37006743
      case '6': // time:2025-04-18T16:17:35.534Z line:318 uuid:9c4a8ce1
        saveConfig(); // time:2025-04-18T16:17:35.534Z line:319 uuid:483732a9
        rl.close(); // time:2025-04-18T16:17:35.534Z line:320 uuid:256a6a70
        runUUIDProcess(); // time:2025-04-18T16:17:35.534Z line:321 uuid:93c97d46
        break; // time:2025-04-18T16:17:35.534Z line:322 uuid:d86ba1a7
      case '7': // time:2025-04-18T16:17:35.534Z line:323 uuid:b30e8da3
        rl.close(); // time:2025-04-18T16:17:35.534Z line:324 uuid:c29bd244
        rollbackLastRun(); // time:2025-04-18T16:17:35.534Z line:325 uuid:fababbdf
        showMenu(); // time:2025-04-18T16:17:35.534Z line:326 uuid:c01a96f6
        break; // time:2025-04-18T16:17:35.534Z line:327 uuid:bfa5d2dd
      case '8': // time:2025-04-18T16:17:35.534Z line:328 uuid:77ba1357
        console.log('Exiting without changes.'); // time:2025-04-18T16:17:35.534Z line:329 uuid:2cefb106
        rl.close(); // time:2025-04-18T16:17:35.534Z line:330 uuid:fb990224
        break; // time:2025-04-18T16:17:35.534Z line:331 uuid:ac30e8e6
      default: // time:2025-04-18T16:17:35.534Z line:332 uuid:78373ebf
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:17:35.534Z line:333 uuid:78a84a9f
        rl.close(); // time:2025-04-18T16:17:35.534Z line:334 uuid:db9e3633
        showMenu(); // time:2025-04-18T16:17:35.534Z line:335 uuid:66dc9ab0
    } // time:2025-04-18T16:17:35.534Z line:336 uuid:340a60e2
  }); // time:2025-04-18T16:17:35.534Z line:337 uuid:93024cec
} // time:2025-04-18T16:17:35.534Z line:338 uuid:89449667
// time:2025-04-18T16:17:35.534Z line:339 uuid:2c297efd
// time:2025-04-18T16:17:35.534Z line:340 uuid:c1e18a90
function main() { // time:2025-04-18T16:17:35.534Z line:341 uuid:c885a15d
  loadConfig(); // time:2025-04-18T16:17:35.534Z line:342 uuid:9b7e54b3
// time:2025-04-18T16:17:35.534Z line:343 uuid:6bf8e048
  if (process.argv.length > 2) { // time:2025-04-18T16:17:35.534Z line:344 uuid:4095a856
    if (process.argv[2] === '--run') { // time:2025-04-18T16:17:35.534Z line:345 uuid:c805f660
// time:2025-04-18T16:17:35.534Z line:346 uuid:0ac1c927
      runUUIDProcess(); // time:2025-04-18T16:17:35.534Z line:347 uuid:73323e5d
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:17:35.534Z line:348 uuid:b82f6040
// time:2025-04-18T16:17:35.534Z line:349 uuid:5f9f3f0c
      rollbackLastRun(); // time:2025-04-18T16:17:35.534Z line:350 uuid:c05f5145
    } else { // time:2025-04-18T16:17:35.534Z line:351 uuid:f7345490
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:17:35.534Z line:352 uuid:d52b0357
    } // time:2025-04-18T16:17:35.534Z line:353 uuid:6dfe7025
  } else { // time:2025-04-18T16:17:35.534Z line:354 uuid:8b879fef
// time:2025-04-18T16:17:35.534Z line:355 uuid:d9cf7b3e
    showMenu(); // time:2025-04-18T16:17:35.534Z line:356 uuid:4f58ca17
  } // time:2025-04-18T16:17:35.534Z line:357 uuid:1fa5d0d2
} // time:2025-04-18T16:17:35.534Z line:358 uuid:59723ec5
// time:2025-04-18T16:17:35.534Z line:359 uuid:0381d024
main(); // time:2025-04-18T16:17:35.534Z line:360 uuid:68f9fd80