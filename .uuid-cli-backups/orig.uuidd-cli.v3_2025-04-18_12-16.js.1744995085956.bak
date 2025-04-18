// time:2025-04-18T16:18:04.341Z line:1 uuid:556c99c3
// time:2025-04-18T16:18:04.341Z line:2 uuid:5f282acc
// time:2025-04-18T16:18:04.341Z line:3 uuid:52169169
// time:2025-04-18T16:18:04.341Z line:4 uuid:e1f6ea3e
// time:2025-04-18T16:18:04.341Z line:5 uuid:42217f84
// time:2025-04-18T16:18:04.341Z line:6 uuid:535e07c9
// time:2025-04-18T16:18:04.341Z line:7 uuid:f50d0259
// time:2025-04-18T16:18:04.341Z line:8 uuid:90af1a51
// time:2025-04-18T16:18:04.341Z line:9 uuid:73c13e20
// time:2025-04-18T16:18:04.341Z line:10 uuid:f1b7d0dd
const fs = require('fs'); // time:2025-04-18T16:18:04.341Z line:11 uuid:cb13dbc6
const path = require('path'); // time:2025-04-18T16:18:04.341Z line:12 uuid:520a1110
const crypto = require('crypto'); // time:2025-04-18T16:18:04.341Z line:13 uuid:39f9552d
const { execSync } = require('child_process'); // time:2025-04-18T16:18:04.341Z line:14 uuid:815411e5
const readline = require('readline'); // time:2025-04-18T16:18:04.341Z line:15 uuid:0300562c
// time:2025-04-18T16:18:04.341Z line:16 uuid:ec51c86e
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:18:04.341Z line:17 uuid:3995989c
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:18:04.341Z line:18 uuid:473cef44
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:18:04.341Z line:19 uuid:6400ab7b
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:18:04.341Z line:20 uuid:a687f946
// time:2025-04-18T16:18:04.341Z line:21 uuid:c51ae55a
// time:2025-04-18T16:18:04.341Z line:22 uuid:9c496307
let config = { // time:2025-04-18T16:18:04.341Z line:23 uuid:d285b94a
  includeBranch: true, // time:2025-04-18T16:18:04.341Z line:24 uuid:96cd7aed
  includeCommit: true, // time:2025-04-18T16:18:04.341Z line:25 uuid:40925364
  includeTimestamp: true, // time:2025-04-18T16:18:04.341Z line:26 uuid:3ff40da5
  includeLineNumber: true // time:2025-04-18T16:18:04.341Z line:27 uuid:eceec3db
}; // time:2025-04-18T16:18:04.341Z line:28 uuid:b2b64120
// time:2025-04-18T16:18:04.341Z line:29 uuid:51b07716
// time:2025-04-18T16:18:04.341Z line:30 uuid:90dd1650
let lastRunInfo = { // time:2025-04-18T16:18:04.341Z line:31 uuid:cfe48993
  timestamp: null, // time:2025-04-18T16:18:04.341Z line:32 uuid:7dfdd05b
  files: [] // time:2025-04-18T16:18:04.341Z line:33 uuid:bd4afd5b
}; // time:2025-04-18T16:18:04.341Z line:34 uuid:67a02498
// time:2025-04-18T16:18:04.341Z line:35 uuid:799ca292
function generateShortUUID() { // time:2025-04-18T16:18:04.341Z line:36 uuid:6c1c1b82
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:18:04.341Z line:37 uuid:807f5513
} // time:2025-04-18T16:18:04.341Z line:38 uuid:5dbc6880
// time:2025-04-18T16:18:04.341Z line:39 uuid:7b351c32
function getGitInfo() { // time:2025-04-18T16:18:04.341Z line:40 uuid:125cfb13
  try { // time:2025-04-18T16:18:04.341Z line:41 uuid:ef6dd2b5
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:18:04.341Z line:42 uuid:491a594c
    let branch; // time:2025-04-18T16:18:04.341Z line:43 uuid:534376e3
// time:2025-04-18T16:18:04.341Z line:44 uuid:5027fb45
// time:2025-04-18T16:18:04.341Z line:45 uuid:c7c88f03
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:18:04.341Z line:46 uuid:a8ddad63
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:18:04.341Z line:47 uuid:9afdd0b2
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:18:04.341Z line:48 uuid:7726c954
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:18:04.341Z line:49 uuid:189fb110
    } else { // time:2025-04-18T16:18:04.341Z line:50 uuid:f9559c77
// time:2025-04-18T16:18:04.341Z line:51 uuid:07838c02
      try { // time:2025-04-18T16:18:04.341Z line:52 uuid:07497d62
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.341Z line:53 uuid:9fb124e8
// time:2025-04-18T16:18:04.341Z line:54 uuid:89969f85
// time:2025-04-18T16:18:04.341Z line:55 uuid:244b34c9
        if (!branch) { // time:2025-04-18T16:18:04.341Z line:56 uuid:3f77d46a
          const gitStatusOutput = execSync('git status', { encoding: 'utf8' }); // time:2025-04-18T16:18:04.341Z line:57 uuid:bb916332
          const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/); // time:2025-04-18T16:18:04.341Z line:58 uuid:b8039577
          if (branchMatch && branchMatch[1]) { // time:2025-04-18T16:18:04.341Z line:59 uuid:6666169f
            branch = branchMatch[1]; // time:2025-04-18T16:18:04.341Z line:60 uuid:2bd8e604
          } // time:2025-04-18T16:18:04.341Z line:61 uuid:81c93388
        } // time:2025-04-18T16:18:04.341Z line:62 uuid:4d9fb70a
      } catch (branchError) { // time:2025-04-18T16:18:04.341Z line:63 uuid:a942d30a
        console.log('Error getting branch name:', branchError.message); // time:2025-04-18T16:18:04.341Z line:64 uuid:a1cb716d
      } // time:2025-04-18T16:18:04.341Z line:65 uuid:449413eb
    } // time:2025-04-18T16:18:04.341Z line:66 uuid:ab68d094
// time:2025-04-18T16:18:04.341Z line:67 uuid:556e9e5e
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:18:04.341Z line:68 uuid:cd201af5
    return { branch, lastCommit }; // time:2025-04-18T16:18:04.341Z line:69 uuid:ef582682
  } catch (error) { // time:2025-04-18T16:18:04.341Z line:70 uuid:79007382
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:18:04.341Z line:71 uuid:a7303e56
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:18:04.341Z line:72 uuid:4cc352df
  } // time:2025-04-18T16:18:04.341Z line:73 uuid:2805245a
} // time:2025-04-18T16:18:04.341Z line:74 uuid:8409ce33
// time:2025-04-18T16:18:04.341Z line:75 uuid:d2bc6a62
function loadConfig() { // time:2025-04-18T16:18:04.341Z line:76 uuid:d03bd615
  try { // time:2025-04-18T16:18:04.341Z line:77 uuid:576a1e06
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:18:04.341Z line:78 uuid:d2666488
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:18:04.341Z line:79 uuid:b28f3c38
      const data = JSON.parse(fileContent); // time:2025-04-18T16:18:04.341Z line:80 uuid:580c095f
// time:2025-04-18T16:18:04.341Z line:81 uuid:f6e48bb1
// time:2025-04-18T16:18:04.341Z line:82 uuid:5c5e3bd8
      if (data.config) { // time:2025-04-18T16:18:04.341Z line:83 uuid:6d85391a
        config = data.config; // time:2025-04-18T16:18:04.341Z line:84 uuid:318ccb92
      } // time:2025-04-18T16:18:04.341Z line:85 uuid:a98304be
// time:2025-04-18T16:18:04.341Z line:86 uuid:f945b078
// time:2025-04-18T16:18:04.341Z line:87 uuid:ee1111d7
      if (data.lastRun) { // time:2025-04-18T16:18:04.341Z line:88 uuid:f71cf5e6
        lastRunInfo = data.lastRun; // time:2025-04-18T16:18:04.341Z line:89 uuid:daee8bec
      } // time:2025-04-18T16:18:04.341Z line:90 uuid:8cf90b3d
// time:2025-04-18T16:18:04.341Z line:91 uuid:a24faaeb
      console.log('Loaded configuration:', config); // time:2025-04-18T16:18:04.341Z line:92 uuid:dbcf85c7
    } // time:2025-04-18T16:18:04.341Z line:93 uuid:4a61f54d
  } catch (error) { // time:2025-04-18T16:18:04.341Z line:94 uuid:db848cb4
    console.error('Error loading config:', error.message); // time:2025-04-18T16:18:04.341Z line:95 uuid:af10e1f1
  } // time:2025-04-18T16:18:04.341Z line:96 uuid:74a5e116
} // time:2025-04-18T16:18:04.341Z line:97 uuid:e8388d06
// time:2025-04-18T16:18:04.341Z line:98 uuid:0a1e5e57
function saveConfig() { // time:2025-04-18T16:18:04.341Z line:99 uuid:fc1d9875
  try { // time:2025-04-18T16:18:04.341Z line:100 uuid:a578974f
// time:2025-04-18T16:18:04.341Z line:101 uuid:f63bd756
    const data = { // time:2025-04-18T16:18:04.341Z line:102 uuid:ef9ca9d3
      config, // time:2025-04-18T16:18:04.341Z line:103 uuid:8c66f73a
      lastRun: lastRunInfo // time:2025-04-18T16:18:04.341Z line:104 uuid:8723d264
    }; // time:2025-04-18T16:18:04.341Z line:105 uuid:91ac5e3b
// time:2025-04-18T16:18:04.341Z line:106 uuid:c30e17d6
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:18:04.341Z line:107 uuid:0136c251
    console.log('Configuration saved.'); // time:2025-04-18T16:18:04.341Z line:108 uuid:e1f5dce6
  } catch (error) { // time:2025-04-18T16:18:04.341Z line:109 uuid:83477d1c
    console.error('Error saving config:', error.message); // time:2025-04-18T16:18:04.341Z line:110 uuid:f7757145
  } // time:2025-04-18T16:18:04.341Z line:111 uuid:72c5545a
} // time:2025-04-18T16:18:04.341Z line:112 uuid:0b3c3aaa
// time:2025-04-18T16:18:04.341Z line:113 uuid:af1e9369
function ensureBackupDir() { // time:2025-04-18T16:18:04.341Z line:114 uuid:71067c3b
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:18:04.341Z line:115 uuid:a0c404fb
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:18:04.341Z line:116 uuid:2cd50442
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:18:04.341Z line:117 uuid:1a6a3f2c
  } // time:2025-04-18T16:18:04.341Z line:118 uuid:3e88436f
} // time:2025-04-18T16:18:04.341Z line:119 uuid:03c3352c
// time:2025-04-18T16:18:04.341Z line:120 uuid:96d59427
function backupFile(filePath) { // time:2025-04-18T16:18:04.341Z line:121 uuid:b1c09025
  try { // time:2025-04-18T16:18:04.341Z line:122 uuid:10880ade
    ensureBackupDir(); // time:2025-04-18T16:18:04.341Z line:123 uuid:51dfdb42
// time:2025-04-18T16:18:04.341Z line:124 uuid:e91f50f8
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.341Z line:125 uuid:9fb3d430
    const fileName = path.basename(filePath); // time:2025-04-18T16:18:04.341Z line:126 uuid:823a6458
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:18:04.341Z line:127 uuid:6b3470e1
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:18:04.341Z line:128 uuid:5444b2a9
// time:2025-04-18T16:18:04.341Z line:129 uuid:c135822d
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:18:04.341Z line:130 uuid:f0a4c3f8
    return { relativePath, backupPath }; // time:2025-04-18T16:18:04.341Z line:131 uuid:7b59e63c
  } catch (error) { // time:2025-04-18T16:18:04.341Z line:132 uuid:ef14da13
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.341Z line:133 uuid:f57b019f
    return null; // time:2025-04-18T16:18:04.341Z line:134 uuid:d5a6552c
  } // time:2025-04-18T16:18:04.341Z line:135 uuid:7b971bbc
} // time:2025-04-18T16:18:04.341Z line:136 uuid:58138760
// time:2025-04-18T16:18:04.341Z line:137 uuid:6b9489ab
function addUUIDsToFile(filePath) { // time:2025-04-18T16:18:04.341Z line:138 uuid:979c71b2
  try { // time:2025-04-18T16:18:04.341Z line:139 uuid:f365d2a0
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:18:04.341Z line:140 uuid:3f7d00c3
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:18:04.341Z line:141 uuid:dba68ae2
      return null; // time:2025-04-18T16:18:04.341Z line:142 uuid:3ef41a5d
    } // time:2025-04-18T16:18:04.341Z line:143 uuid:a3de2e83
// time:2025-04-18T16:18:04.341Z line:144 uuid:3d36db5f
// time:2025-04-18T16:18:04.341Z line:145 uuid:535822b3
    const backup = backupFile(filePath); // time:2025-04-18T16:18:04.341Z line:146 uuid:0f93cf9b
    if (!backup) return null; // time:2025-04-18T16:18:04.341Z line:147 uuid:3990ef60
// time:2025-04-18T16:18:04.341Z line:148 uuid:6b11c194
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:18:04.341Z line:149 uuid:2430a3a9
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:18:04.341Z line:150 uuid:8b1d19b2
// time:2025-04-18T16:18:04.341Z line:151 uuid:905ed394
// time:2025-04-18T16:18:04.341Z line:152 uuid:a0742884
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`); // time:2025-04-18T16:18:04.341Z line:153 uuid:cc8f3a41
// time:2025-04-18T16:18:04.341Z line:154 uuid:f7c2fe68
// time:2025-04-18T16:18:04.341Z line:155 uuid:8784410b
    let metaParts = []; // time:2025-04-18T16:18:04.341Z line:156 uuid:d02b12ad
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`); // time:2025-04-18T16:18:04.341Z line:157 uuid:403abf3e
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`); // time:2025-04-18T16:18:04.341Z line:158 uuid:7d422d90
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`); // time:2025-04-18T16:18:04.341Z line:159 uuid:38c43b45
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:18:04.341Z line:160 uuid:1a191a00
// time:2025-04-18T16:18:04.341Z line:161 uuid:faa11632
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:18:04.341Z line:162 uuid:7bdd3854
    const lines = content.split('\n'); // time:2025-04-18T16:18:04.341Z line:163 uuid:3a6d4a2b
// time:2025-04-18T16:18:04.341Z line:164 uuid:74991acd
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:18:04.341Z line:165 uuid:6c4665bc
      const lineNumber = index + 1; // time:2025-04-18T16:18:04.341Z line:166 uuid:b498bd80
      let cleanLine = line; // time:2025-04-18T16:18:04.341Z line:167 uuid:3d85c082
// time:2025-04-18T16:18:04.341Z line:168 uuid:35acc7ee
      if (line.includes(' // time:2025-04-18T16:18:04.341Z line:169 uuid:0ebc6e12
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:18:04.341Z line:170 uuid:1dbf44c8
      } // time:2025-04-18T16:18:04.341Z line:171 uuid:0e0306a5
// time:2025-04-18T16:18:04.341Z line:172 uuid:3c842a32
      let comment = ' // time:2025-04-18T16:18:04.341Z line:173 uuid:29f23c75
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:18:04.341Z line:174 uuid:1fb6ef21
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:18:04.341Z line:175 uuid:370a4502
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:18:04.341Z line:176 uuid:5b6b678d
// time:2025-04-18T16:18:04.341Z line:177 uuid:b01ed72d
      if (cleanLine.trim() === '') { // time:2025-04-18T16:18:04.341Z line:178 uuid:21ac2c71
        return comment.trim(); // time:2025-04-18T16:18:04.341Z line:179 uuid:47e9e54b
      } // time:2025-04-18T16:18:04.341Z line:180 uuid:edc88a27
// time:2025-04-18T16:18:04.341Z line:181 uuid:32af7841
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:18:04.341Z line:182 uuid:7fba8936
    }); // time:2025-04-18T16:18:04.341Z line:183 uuid:b0ce46c5
// time:2025-04-18T16:18:04.341Z line:184 uuid:375c7c58
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:18:04.341Z line:185 uuid:4e17268d
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:18:04.341Z line:186 uuid:3a3c8e19
// time:2025-04-18T16:18:04.341Z line:187 uuid:34278d22
    return backup; // time:2025-04-18T16:18:04.341Z line:188 uuid:61d25024
  } catch (error) { // time:2025-04-18T16:18:04.341Z line:189 uuid:ba4032e5
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:18:04.341Z line:190 uuid:db27f823
    return null; // time:2025-04-18T16:18:04.341Z line:191 uuid:d14e9835
  } // time:2025-04-18T16:18:04.341Z line:192 uuid:d5ecb61e
} // time:2025-04-18T16:18:04.341Z line:193 uuid:bf84675e
// time:2025-04-18T16:18:04.341Z line:194 uuid:eefbaeb7
function processDirectory(dirPath) { // time:2025-04-18T16:18:04.341Z line:195 uuid:6739aaa0
  const modifiedFiles = []; // time:2025-04-18T16:18:04.341Z line:196 uuid:8f8d1943
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:18:04.341Z line:197 uuid:be51f129
// time:2025-04-18T16:18:04.341Z line:198 uuid:d291107f
  for (const entry of entries) { // time:2025-04-18T16:18:04.341Z line:199 uuid:e9f386ed
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:18:04.341Z line:200 uuid:06ebe987
// time:2025-04-18T16:18:04.341Z line:201 uuid:84cb7e92
    if (entry.isDirectory()) { // time:2025-04-18T16:18:04.341Z line:202 uuid:491669b3
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:18:04.341Z line:203 uuid:1dabfd09
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:18:04.341Z line:204 uuid:9d4e9440
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:18:04.341Z line:205 uuid:a63f9c77
      } // time:2025-04-18T16:18:04.341Z line:206 uuid:45e63082
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:18:04.341Z line:207 uuid:70b5e9fd
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:18:04.341Z line:208 uuid:88871a36
      if (result) { // time:2025-04-18T16:18:04.341Z line:209 uuid:2e710c29
        modifiedFiles.push(result); // time:2025-04-18T16:18:04.341Z line:210 uuid:e89e56b0
      } // time:2025-04-18T16:18:04.341Z line:211 uuid:7a715d02
    } // time:2025-04-18T16:18:04.341Z line:212 uuid:4badae84
  } // time:2025-04-18T16:18:04.341Z line:213 uuid:07a94c4f
// time:2025-04-18T16:18:04.341Z line:214 uuid:8214ac3b
  return modifiedFiles; // time:2025-04-18T16:18:04.341Z line:215 uuid:5f922aad
} // time:2025-04-18T16:18:04.341Z line:216 uuid:6c3516f3
// time:2025-04-18T16:18:04.341Z line:217 uuid:a77bc632
function rollbackLastRun() { // time:2025-04-18T16:18:04.341Z line:218 uuid:b4a476c9
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:18:04.341Z line:219 uuid:24be820d
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:18:04.341Z line:220 uuid:4e862468
    return; // time:2025-04-18T16:18:04.341Z line:221 uuid:ed2ec6ce
  } // time:2025-04-18T16:18:04.341Z line:222 uuid:f7a25f63
// time:2025-04-18T16:18:04.341Z line:223 uuid:f5fd35f7
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:18:04.341Z line:224 uuid:de952d80
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:18:04.341Z line:225 uuid:d31fac4b
// time:2025-04-18T16:18:04.341Z line:226 uuid:32757064
  let successCount = 0; // time:2025-04-18T16:18:04.341Z line:227 uuid:d63a9172
// time:2025-04-18T16:18:04.341Z line:228 uuid:c58eb25b
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:18:04.341Z line:229 uuid:9fb41d75
    try { // time:2025-04-18T16:18:04.341Z line:230 uuid:47f3e5dd
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:18:04.341Z line:231 uuid:38a69a42
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:18:04.341Z line:232 uuid:fcecbd32
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:18:04.341Z line:233 uuid:064dba74
// time:2025-04-18T16:18:04.341Z line:234 uuid:4c90b74d
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:18:04.341Z line:235 uuid:ae93bf54
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:18:04.341Z line:236 uuid:c1584d8f
        successCount++; // time:2025-04-18T16:18:04.341Z line:237 uuid:0a6e549d
      } else { // time:2025-04-18T16:18:04.341Z line:238 uuid:a90eaec3
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:18:04.341Z line:239 uuid:9f0b6efc
      } // time:2025-04-18T16:18:04.341Z line:240 uuid:e698c75b
    } catch (error) { // time:2025-04-18T16:18:04.341Z line:241 uuid:0c60e1ed
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:18:04.341Z line:242 uuid:df233e0f
    } // time:2025-04-18T16:18:04.341Z line:243 uuid:ab02a28a
  } // time:2025-04-18T16:18:04.341Z line:244 uuid:1aa55721
// time:2025-04-18T16:18:04.341Z line:245 uuid:0445a93c
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:18:04.341Z line:246 uuid:996c6962
// time:2025-04-18T16:18:04.341Z line:247 uuid:7461c367
// time:2025-04-18T16:18:04.341Z line:248 uuid:cee3186f
  lastRunInfo = { // time:2025-04-18T16:18:04.341Z line:249 uuid:29ad9c15
    timestamp: null, // time:2025-04-18T16:18:04.341Z line:250 uuid:00194f39
    files: [] // time:2025-04-18T16:18:04.341Z line:251 uuid:acefa589
  }; // time:2025-04-18T16:18:04.341Z line:252 uuid:3e8c27f6
// time:2025-04-18T16:18:04.341Z line:253 uuid:3aed59a9
  saveConfig(); // time:2025-04-18T16:18:04.341Z line:254 uuid:49c9763a
} // time:2025-04-18T16:18:04.341Z line:255 uuid:6565b35e
// time:2025-04-18T16:18:04.341Z line:256 uuid:67750a84
function runUUIDProcess() { // time:2025-04-18T16:18:04.341Z line:257 uuid:d76a1453
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:18:04.341Z line:258 uuid:4b4be3bd
// time:2025-04-18T16:18:04.341Z line:259 uuid:58e4b1fe
// time:2025-04-18T16:18:04.341Z line:260 uuid:9027548d
  lastRunInfo = { // time:2025-04-18T16:18:04.341Z line:261 uuid:be6dcfd4
    timestamp: Date.now(), // time:2025-04-18T16:18:04.341Z line:262 uuid:3bb529a4
    files: modifiedFiles // time:2025-04-18T16:18:04.341Z line:263 uuid:516d4b49
  }; // time:2025-04-18T16:18:04.341Z line:264 uuid:7eb5a938
// time:2025-04-18T16:18:04.341Z line:265 uuid:83e4d5f9
  saveConfig(); // time:2025-04-18T16:18:04.341Z line:266 uuid:a23ed84f
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:18:04.341Z line:267 uuid:ff74310e
} // time:2025-04-18T16:18:04.341Z line:268 uuid:588df0af
// time:2025-04-18T16:18:04.341Z line:269 uuid:3dfbefba
function showMenu() { // time:2025-04-18T16:18:04.341Z line:270 uuid:71ed12dc
  const rl = readline.createInterface({ // time:2025-04-18T16:18:04.341Z line:271 uuid:7094a065
    input: process.stdin, // time:2025-04-18T16:18:04.341Z line:272 uuid:eab17690
    output: process.stdout // time:2025-04-18T16:18:04.341Z line:273 uuid:9d03d007
  }); // time:2025-04-18T16:18:04.341Z line:274 uuid:74d812bc
// time:2025-04-18T16:18:04.341Z line:275 uuid:2138c452
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:18:04.341Z line:276 uuid:802e15ab
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.341Z line:277 uuid:5e6805be
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.341Z line:278 uuid:1097626f
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.341Z line:279 uuid:99d9edb2
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:18:04.341Z line:280 uuid:392e6ad0
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:18:04.341Z line:281 uuid:a9682b8c
  console.log('6. Save and Run'); // time:2025-04-18T16:18:04.341Z line:282 uuid:194ae0eb
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:18:04.341Z line:283 uuid:b9b20535
  console.log('8. Exit'); // time:2025-04-18T16:18:04.341Z line:284 uuid:ce9081f1
// time:2025-04-18T16:18:04.341Z line:285 uuid:8c159610
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:18:04.341Z line:286 uuid:b0b4fb8d
    switch(answer) { // time:2025-04-18T16:18:04.341Z line:287 uuid:9880cc54
      case '1': // time:2025-04-18T16:18:04.341Z line:288 uuid:f9667520
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:18:04.341Z line:289 uuid:7b52f7e5
        rl.close(); // time:2025-04-18T16:18:04.341Z line:290 uuid:77c6fab5
        showMenu(); // time:2025-04-18T16:18:04.341Z line:291 uuid:21130234
        break; // time:2025-04-18T16:18:04.341Z line:292 uuid:4dcd7548
      case '2': // time:2025-04-18T16:18:04.341Z line:293 uuid:365fe3c2
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:18:04.341Z line:294 uuid:9066dc1b
        rl.close(); // time:2025-04-18T16:18:04.341Z line:295 uuid:fc1cd15d
        showMenu(); // time:2025-04-18T16:18:04.341Z line:296 uuid:229c069f
        break; // time:2025-04-18T16:18:04.341Z line:297 uuid:51033819
      case '3': // time:2025-04-18T16:18:04.341Z line:298 uuid:96ea2428
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:18:04.341Z line:299 uuid:fe3d6db6
        rl.close(); // time:2025-04-18T16:18:04.341Z line:300 uuid:19fb1c0c
        showMenu(); // time:2025-04-18T16:18:04.341Z line:301 uuid:61bcaa3c
        break; // time:2025-04-18T16:18:04.341Z line:302 uuid:9d8a6ffd
      case '4': // time:2025-04-18T16:18:04.341Z line:303 uuid:449ea43f
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:18:04.341Z line:304 uuid:a5187e79
        rl.close(); // time:2025-04-18T16:18:04.341Z line:305 uuid:cef29394
        showMenu(); // time:2025-04-18T16:18:04.341Z line:306 uuid:156d73e4
        break; // time:2025-04-18T16:18:04.341Z line:307 uuid:ef66237e
      case '5': // time:2025-04-18T16:18:04.341Z line:308 uuid:e9a6452b
        config = { // time:2025-04-18T16:18:04.341Z line:309 uuid:3ab0bc15
          includeBranch: true, // time:2025-04-18T16:18:04.341Z line:310 uuid:a7e235a1
          includeCommit: true, // time:2025-04-18T16:18:04.341Z line:311 uuid:ae5dd3e7
          includeTimestamp: true, // time:2025-04-18T16:18:04.341Z line:312 uuid:fe8e3c72
          includeLineNumber: true // time:2025-04-18T16:18:04.341Z line:313 uuid:25453526
        }; // time:2025-04-18T16:18:04.341Z line:314 uuid:3a9ced38
        rl.close(); // time:2025-04-18T16:18:04.341Z line:315 uuid:05dad109
        showMenu(); // time:2025-04-18T16:18:04.341Z line:316 uuid:b22f16ec
        break; // time:2025-04-18T16:18:04.341Z line:317 uuid:3fab244d
      case '6': // time:2025-04-18T16:18:04.341Z line:318 uuid:6fcae874
        saveConfig(); // time:2025-04-18T16:18:04.341Z line:319 uuid:580e644e
        rl.close(); // time:2025-04-18T16:18:04.341Z line:320 uuid:be512791
        runUUIDProcess(); // time:2025-04-18T16:18:04.341Z line:321 uuid:234aea72
        break; // time:2025-04-18T16:18:04.341Z line:322 uuid:30a1580c
      case '7': // time:2025-04-18T16:18:04.341Z line:323 uuid:80558151
        rl.close(); // time:2025-04-18T16:18:04.341Z line:324 uuid:af82af9d
        rollbackLastRun(); // time:2025-04-18T16:18:04.341Z line:325 uuid:a6357b62
        showMenu(); // time:2025-04-18T16:18:04.341Z line:326 uuid:ef3a8a38
        break; // time:2025-04-18T16:18:04.341Z line:327 uuid:0d039675
      case '8': // time:2025-04-18T16:18:04.341Z line:328 uuid:c88ca99a
        console.log('Exiting without changes.'); // time:2025-04-18T16:18:04.341Z line:329 uuid:2f1c1517
        rl.close(); // time:2025-04-18T16:18:04.341Z line:330 uuid:a0aaee10
        break; // time:2025-04-18T16:18:04.341Z line:331 uuid:126db7a5
      default: // time:2025-04-18T16:18:04.341Z line:332 uuid:62a51d68
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:18:04.341Z line:333 uuid:5bc56c2f
        rl.close(); // time:2025-04-18T16:18:04.341Z line:334 uuid:418a18cc
        showMenu(); // time:2025-04-18T16:18:04.341Z line:335 uuid:83f601f8
    } // time:2025-04-18T16:18:04.341Z line:336 uuid:999450ce
  }); // time:2025-04-18T16:18:04.341Z line:337 uuid:3c5783d4
} // time:2025-04-18T16:18:04.341Z line:338 uuid:8e7aa47a
// time:2025-04-18T16:18:04.341Z line:339 uuid:39133a8e
// time:2025-04-18T16:18:04.341Z line:340 uuid:3a89ebb4
function main() { // time:2025-04-18T16:18:04.341Z line:341 uuid:f6e37ebd
  loadConfig(); // time:2025-04-18T16:18:04.341Z line:342 uuid:903c317c
// time:2025-04-18T16:18:04.341Z line:343 uuid:f3005217
  if (process.argv.length > 2) { // time:2025-04-18T16:18:04.341Z line:344 uuid:33afc2de
    if (process.argv[2] === '--run') { // time:2025-04-18T16:18:04.341Z line:345 uuid:0e3bde75
// time:2025-04-18T16:18:04.341Z line:346 uuid:8348352a
      runUUIDProcess(); // time:2025-04-18T16:18:04.341Z line:347 uuid:8f1d4670
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:18:04.341Z line:348 uuid:0b241400
// time:2025-04-18T16:18:04.341Z line:349 uuid:7c82f4b6
      rollbackLastRun(); // time:2025-04-18T16:18:04.341Z line:350 uuid:57f849e5
    } else { // time:2025-04-18T16:18:04.341Z line:351 uuid:55b1ddac
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:18:04.341Z line:352 uuid:08b4b621
    } // time:2025-04-18T16:18:04.341Z line:353 uuid:2a29a1dc
  } else { // time:2025-04-18T16:18:04.341Z line:354 uuid:241f7009
// time:2025-04-18T16:18:04.341Z line:355 uuid:675b747c
    showMenu(); // time:2025-04-18T16:18:04.341Z line:356 uuid:b0f80769
  } // time:2025-04-18T16:18:04.341Z line:357 uuid:38880720
} // time:2025-04-18T16:18:04.341Z line:358 uuid:e17bbd1a
// time:2025-04-18T16:18:04.341Z line:359 uuid:4244f39e
main(); // time:2025-04-18T16:18:04.341Z line:360 uuid:247b27cf