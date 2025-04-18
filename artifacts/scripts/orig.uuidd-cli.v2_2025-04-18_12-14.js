// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:1 uuid:048166ef
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:2 uuid:77fd57e3
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:3 uuid:22b538c4
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:4 uuid:b77e07fa
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:5 uuid:2637b2b9
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:6 uuid:a05a4e9f
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:7 uuid:ae4170d0
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:8 uuid:9f5cc7ff
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:9 uuid:fb376fa7
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:10 uuid:b26adf47
const fs = require('fs'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:11 uuid:72a1a001
const path = require('path'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:12 uuid:e1c6e963
const crypto = require('crypto'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:13 uuid:daf97822
const { execSync } = require('child_process'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:14 uuid:cf3ec166
const readline = require('readline'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:15 uuid:72bc79d3
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:16 uuid:4cc4a858
const CONFIG_FILE = '.uuid-cli-config.json'; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:17 uuid:9c64db49
const BACKUP_DIR = '.uuid-cli-backups'; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:18 uuid:4a80957c
const SCRIPT_FILENAME = path.basename(__filename); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:19 uuid:ca9199bd
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:20 uuid:028d88a0
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:21 uuid:f08ea876
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:22 uuid:37552308
let config = { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:23 uuid:ca5ae37d
  includeBranch: true, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:24 uuid:75362b92
  includeCommit: true, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:25 uuid:b4f6b326
  includeTimestamp: true, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:26 uuid:bf0de793
  includeLineNumber: true // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:27 uuid:b0526b56
}; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:28 uuid:9e5b3cda
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:29 uuid:5837485c
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:30 uuid:fa10e18e
let lastRunInfo = { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:31 uuid:870ccd4d
  timestamp: null, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:32 uuid:9f42db6c
  files: [] // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:33 uuid:6d05d915
}; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:34 uuid:83aae268
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:35 uuid:57bf0609
function generateShortUUID() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:36 uuid:3322c40b
  return crypto.randomBytes(4).toString('hex'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:37 uuid:0eb3c809
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:38 uuid:76cf98bd
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:39 uuid:beb84f8c
function getGitInfo() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:40 uuid:78ba8853
  try { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:41 uuid:53eafd71
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:42 uuid:bede1a9a
    let branch; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:43 uuid:d2f02e57
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:44 uuid:b24a008d
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:45 uuid:6d4af9f5
    if (process.env.BRANCH_NAME) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:46 uuid:c8dfc16f
      branch = process.env.BRANCH_NAME; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:47 uuid:60907dcb
    } else if (process.env.GIT_BRANCH) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:48 uuid:e120a9a0
      branch = process.env.GIT_BRANCH; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:49 uuid:2e8b3f7f
    } else { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:50 uuid:bd68f56f
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:51 uuid:84bb7ddf
      branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:52 uuid:ba40799b
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:53 uuid:7c5df415
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:54 uuid:fe4729a4
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:55 uuid:9217db04
    return { branch, lastCommit }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:56 uuid:44521ae3
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:57 uuid:c1b321a1
    console.log('Git info detection error:', error.message); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:58 uuid:beaf5388
    return { branch: null, lastCommit: null }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:59 uuid:c8c9b8cb
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:60 uuid:cb2b714d
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:61 uuid:4dd4e3ca
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:62 uuid:b24d0b2b
function loadConfig() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:63 uuid:d8d99504
  try { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:64 uuid:e3d16d68
    if (fs.existsSync(CONFIG_FILE)) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:65 uuid:984e2055
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:66 uuid:459da9be
      const data = JSON.parse(fileContent); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:67 uuid:11cb5cdb
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:68 uuid:66adab39
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:69 uuid:9c1a9e05
      if (data.config) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:70 uuid:b886a1ed
        config = data.config; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:71 uuid:1f6e7f75
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:72 uuid:be1bbc3e
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:73 uuid:deb2666c
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:74 uuid:4226588b
      if (data.lastRun) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:75 uuid:ddd12602
        lastRunInfo = data.lastRun; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:76 uuid:a7e399a8
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:77 uuid:c9e2d925
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:78 uuid:45240ef4
      console.log('Loaded configuration:', config); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:79 uuid:949b8872
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:80 uuid:ed8a53f8
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:81 uuid:244fefde
    console.error('Error loading config:', error.message); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:82 uuid:8674ca37
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:83 uuid:a0915ca0
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:84 uuid:26807bc0
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:85 uuid:3f885154
function saveConfig() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:86 uuid:0ddc0e0d
  try { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:87 uuid:29038cf9
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:88 uuid:d82d7ee2
    const data = { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:89 uuid:c1b09dcd
      config, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:90 uuid:3e0be080
      lastRun: lastRunInfo // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:91 uuid:0d3b6c3c
    }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:92 uuid:17b1958d
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:93 uuid:877dfb3b
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:94 uuid:725eb6c3
    console.log('Configuration saved.'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:95 uuid:cc1582b3
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:96 uuid:22d3952d
    console.error('Error saving config:', error.message); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:97 uuid:f6c84ba8
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:98 uuid:4cced3f5
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:99 uuid:8ab4b17b
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:100 uuid:5aa16f61
function ensureBackupDir() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:101 uuid:4c56de16
  if (!fs.existsSync(BACKUP_DIR)) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:102 uuid:559a0850
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:103 uuid:a52f4b42
    console.log(`Created backup directory: ${BACKUP_DIR}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:104 uuid:acc63b84
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:105 uuid:21ba895b
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:106 uuid:309dc575
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:107 uuid:fefa457f
function backupFile(filePath) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:108 uuid:e505ace3
  try { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:109 uuid:02afb3e9
    ensureBackupDir(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:110 uuid:f4d5eadc
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:111 uuid:cdd5d00b
    const content = fs.readFileSync(filePath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:112 uuid:1740d816
    const fileName = path.basename(filePath); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:113 uuid:85d5a9d5
    const relativePath = path.relative(process.cwd(), filePath); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:114 uuid:619312bb
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:115 uuid:9cdce426
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:116 uuid:54681822
    fs.writeFileSync(backupPath, content); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:117 uuid:dee10430
    return { relativePath, backupPath }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:118 uuid:51f63f60
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:119 uuid:d783bd8a
    console.error(`Error backing up ${filePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:120 uuid:a415fc11
    return null; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:121 uuid:169da5fe
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:122 uuid:46cdac83
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:123 uuid:933a9139
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:124 uuid:1caa44d0
function addUUIDsToFile(filePath) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:125 uuid:39356e05
  try { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:126 uuid:8590cf00
    if (path.basename(filePath) === SCRIPT_FILENAME) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:127 uuid:87b5f8a3
      console.log(`Skipping self: ${filePath}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:128 uuid:298713af
      return null; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:129 uuid:5d53e594
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:130 uuid:bde32f4a
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:131 uuid:9376ce75
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:132 uuid:c461d678
    const backup = backupFile(filePath); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:133 uuid:facc86d1
    if (!backup) return null; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:134 uuid:61c0ef22
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:135 uuid:68f1a64b
    const { branch, lastCommit } = getGitInfo(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:136 uuid:531291a8
    const timestamp = new Date().toISOString(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:137 uuid:c3babfa6
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:138 uuid:6e1362b0
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:139 uuid:f458511e
    let metaParts = []; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:140 uuid:4cb05fd4
    if (config.includeBranch && branch) metaParts.push(branch); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:141 uuid:1702833c
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:142 uuid:bdf5898c
    if (config.includeTimestamp) metaParts.push(timestamp); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:143 uuid:10aef11e
    const metaInfo = metaParts.join('|'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:144 uuid:ae04074e
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:145 uuid:d6021dac
    let content = fs.readFileSync(filePath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:146 uuid:a6fd914e
    const lines = content.split('\n'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:147 uuid:b9a3fa2e
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:148 uuid:2d01e5be
    const updatedLines = lines.map((line, index) => { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:149 uuid:1f492536
      const lineNumber = index + 1; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:150 uuid:40241e4b
      let cleanLine = line; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:151 uuid:b8f4a15d
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:152 uuid:f1e3d75e
      if (line.includes(' // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:153 uuid:1338a003
        cleanLine = line.substring(0, line.indexOf(' // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:154 uuid:5301cc38
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:155 uuid:fa858c79
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:156 uuid:b540d790
      let comment = ' // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:157 uuid:01ee1ff2
      if (metaInfo) comment += `${metaInfo} `; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:158 uuid:0f215d76
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:159 uuid:0bd1e3ed
      comment += `uuid:${generateShortUUID()}`; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:160 uuid:b6e8641a
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:161 uuid:8024a783
      if (cleanLine.trim() === '') { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:162 uuid:92a01839
        return comment.trim(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:163 uuid:4b2cde43
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:164 uuid:a9a0a77f
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:165 uuid:3cebfd87
      return `${cleanLine.trimEnd()}${comment}`; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:166 uuid:5af2c5bc
    }); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:167 uuid:986fbb5b
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:168 uuid:a9e4754a
    fs.writeFileSync(filePath, updatedLines.join('\n')); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:169 uuid:8bbbc1c8
    console.log(`Updated: ${filePath}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:170 uuid:77cf81e5
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:171 uuid:8d619835
    return backup; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:172 uuid:43e50e82
  } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:173 uuid:592281bc
    console.error(`Error processing ${filePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:174 uuid:4aed169f
    return null; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:175 uuid:20e6ec7f
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:176 uuid:77bf1eb3
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:177 uuid:0f147c7e
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:178 uuid:623b67a2
function processDirectory(dirPath) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:179 uuid:77a2c7d8
  const modifiedFiles = []; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:180 uuid:acb5d18f
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:181 uuid:32e4c3df
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:182 uuid:21f6d9b2
  for (const entry of entries) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:183 uuid:e97bb8bc
    const fullPath = path.join(dirPath, entry.name); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:184 uuid:58d16ef4
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:185 uuid:ec6ee867
    if (entry.isDirectory()) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:186 uuid:6c1bf276
      if (!SKIP_DIRS.includes(entry.name)) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:187 uuid:74c3fcd2
        const subDirResults = processDirectory(fullPath); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:188 uuid:41c0759e
        modifiedFiles.push(...subDirResults); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:189 uuid:3cd80858
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:190 uuid:abf46543
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:191 uuid:7b098795
      const result = addUUIDsToFile(fullPath); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:192 uuid:56486d56
      if (result) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:193 uuid:11630840
        modifiedFiles.push(result); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:194 uuid:17ebe422
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:195 uuid:c38f9de0
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:196 uuid:ae4c5ae4
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:197 uuid:5db8163a
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:198 uuid:783ec26a
  return modifiedFiles; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:199 uuid:abf7510f
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:200 uuid:4ca1c3c5
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:201 uuid:49498e8a
function rollbackLastRun() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:202 uuid:0f1d6233
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:203 uuid:484f5f8e
    console.log('No previous run found to rollback.'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:204 uuid:ede501e5
    return; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:205 uuid:bd5fc00b
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:206 uuid:d7832556
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:207 uuid:2c157847
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:208 uuid:00a71848
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:209 uuid:65fbdd43
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:210 uuid:41469430
  let successCount = 0; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:211 uuid:a8a27e80
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:212 uuid:fbd8f281
  for (const file of lastRunInfo.files) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:213 uuid:649f0d94
    try { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:214 uuid:af6b3e0c
      if (fs.existsSync(file.backupPath)) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:215 uuid:626a764a
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:216 uuid:beeb553f
        const targetPath = path.join(process.cwd(), file.relativePath); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:217 uuid:4c8aceb2
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:218 uuid:7c678258
        fs.writeFileSync(targetPath, backupContent); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:219 uuid:b66b795c
        console.log(`Restored: ${file.relativePath}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:220 uuid:9045cb6d
        successCount++; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:221 uuid:eca19b32
      } else { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:222 uuid:d65cdd45
        console.error(`Backup not found: ${file.backupPath}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:223 uuid:92548469
      } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:224 uuid:6134b4b2
    } catch (error) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:225 uuid:691b70ae
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:226 uuid:7367a3c8
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:227 uuid:54103186
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:228 uuid:6578ce38
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:229 uuid:217c8396
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:230 uuid:5c2c6187
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:231 uuid:f3b80173
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:232 uuid:672cbb14
  lastRunInfo = { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:233 uuid:c8f0a928
    timestamp: null, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:234 uuid:561f6d53
    files: [] // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:235 uuid:0fb0365a
  }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:236 uuid:de36c82f
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:237 uuid:246ec752
  saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:238 uuid:76b842f0
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:239 uuid:1a7dcca3
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:240 uuid:42ff6413
function runUUIDProcess() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:241 uuid:0dbaf092
  const modifiedFiles = processDirectory(process.cwd()); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:242 uuid:da90ecf9
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:243 uuid:a84b4912
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:244 uuid:7991b650
  lastRunInfo = { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:245 uuid:df42bb10
    timestamp: Date.now(), // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:246 uuid:c8641e53
    files: modifiedFiles // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:247 uuid:19354084
  }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:248 uuid:151dc2de
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:249 uuid:25206a64
  saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:250 uuid:5990c486
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:251 uuid:0955583a
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:252 uuid:f61a32d5
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:253 uuid:0bf5b10e
function showMenu() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:254 uuid:2f10d869
  const rl = readline.createInterface({ // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:255 uuid:74ba975c
    input: process.stdin, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:256 uuid:e0097906
    output: process.stdout // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:257 uuid:79f1c520
  }); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:258 uuid:78c14427
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:259 uuid:627b0e0e
  console.log('\nUUID CLI Configuration:'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:260 uuid:47f7ce2c
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:261 uuid:bbc9f7fc
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:262 uuid:03da7306
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:263 uuid:d7afbd9a
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:264 uuid:d966acd7
  console.log('5. Reset to Defaults'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:265 uuid:ad2ab922
  console.log('6. Save and Run'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:266 uuid:1bc058ac
  console.log('7. Rollback Last Run'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:267 uuid:d279c382
  console.log('8. Exit'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:268 uuid:17677644
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:269 uuid:0ce39b3a
  rl.question('\nEnter option number: ', (answer) => { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:270 uuid:de548a78
    switch(answer) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:271 uuid:45cec504
      case '1': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:272 uuid:c56f8a8d
        config.includeBranch = !config.includeBranch; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:273 uuid:31e057b4
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:274 uuid:6bf4f0ed
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:275 uuid:f3ed06e5
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:276 uuid:dde14230
      case '2': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:277 uuid:e8b9d0ba
        config.includeCommit = !config.includeCommit; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:278 uuid:277e66c3
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:279 uuid:01f253d6
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:280 uuid:4061ac5f
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:281 uuid:195de8c5
      case '3': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:282 uuid:bf965a1b
        config.includeTimestamp = !config.includeTimestamp; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:283 uuid:a6fa8119
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:284 uuid:58599a5a
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:285 uuid:f2f1d1e4
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:286 uuid:f4b0d186
      case '4': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:287 uuid:091fa9d7
        config.includeLineNumber = !config.includeLineNumber; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:288 uuid:d1e4d35d
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:289 uuid:ef32950a
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:290 uuid:3a40c4ed
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:291 uuid:ac9b48ae
      case '5': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:292 uuid:a31260f9
        config = { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:293 uuid:7fc5f823
          includeBranch: true, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:294 uuid:2c454f42
          includeCommit: true, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:295 uuid:fb60e4e5
          includeTimestamp: true, // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:296 uuid:c71c5030
          includeLineNumber: true // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:297 uuid:6d801b14
        }; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:298 uuid:0cbcfa86
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:299 uuid:ce25b541
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:300 uuid:dfb1cfef
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:301 uuid:a8b54a31
      case '6': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:302 uuid:24aabc9d
        saveConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:303 uuid:7201675c
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:304 uuid:34d323b5
        runUUIDProcess(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:305 uuid:689aa5e7
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:306 uuid:3f1fa44d
      case '7': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:307 uuid:312539c6
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:308 uuid:c0e5ca7b
        rollbackLastRun(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:309 uuid:7b8b6fbd
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:310 uuid:7b07cc46
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:311 uuid:076a6245
      case '8': // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:312 uuid:e4998862
        console.log('Exiting without changes.'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:313 uuid:ec82f617
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:314 uuid:65e5ca12
        break; // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:315 uuid:c6f27b18
      default: // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:316 uuid:d9ac1f12
        console.log('Invalid option. Please try again.'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:317 uuid:3b72be94
        rl.close(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:318 uuid:3b53c697
        showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:319 uuid:bedf99de
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:320 uuid:0a264c23
  }); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:321 uuid:613c8d33
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:322 uuid:335ab6e3
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:323 uuid:5acaae0a
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:324 uuid:5148a1c5
function main() { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:325 uuid:ab6e4d4d
  loadConfig(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:326 uuid:019f2eca
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:327 uuid:218fbd0e
  if (process.argv.length > 2) { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:328 uuid:eb50260c
    if (process.argv[2] === '--run') { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:329 uuid:b9c5ce47
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:330 uuid:d7894f12
      runUUIDProcess(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:331 uuid:6582f07e
    } else if (process.argv[2] === '--rollback') { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:332 uuid:e618a203
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:333 uuid:5c1ab96f
      rollbackLastRun(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:334 uuid:76bcabb2
    } else { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:335 uuid:dcb9ad6b
      console.log('Unknown command. Available commands: --run, --rollback'); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:336 uuid:aad6d617
    } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:337 uuid:3fe20a49
  } else { // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:338 uuid:e9907311
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:339 uuid:78636c46
    showMenu(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:340 uuid:9afe204b
  } // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:341 uuid:2a52750e
} // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:342 uuid:11973ad3
// commit:6a2a820|time:2025-04-18T16:15:26.984Z line:343 uuid:dd18613e
main(); // commit:6a2a820|time:2025-04-18T16:15:26.984Z line:344 uuid:973f2529