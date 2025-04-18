// time:2025-04-18T16:51:25.965Z uuid:cd6e73d0
// time:2025-04-18T16:51:25.965Z uuid:08370fd0
// time:2025-04-18T16:51:25.965Z uuid:0074f149
// time:2025-04-18T16:51:25.965Z uuid:b6b269d5
// time:2025-04-18T16:51:25.965Z uuid:67eaec18
// time:2025-04-18T16:51:25.965Z uuid:4e4bf461
// time:2025-04-18T16:51:25.965Z uuid:dd8148fe
// time:2025-04-18T16:51:25.965Z uuid:57651990
// time:2025-04-18T16:51:25.965Z uuid:7e43f9ec
// time:2025-04-18T16:51:25.965Z uuid:ee22d459
const fs = require('fs'); // time:2025-04-18T16:51:25.965Z uuid:dbe2a7dd
const path = require('path'); // time:2025-04-18T16:51:25.965Z uuid:eab21c5c
const crypto = require('crypto'); // time:2025-04-18T16:51:25.965Z uuid:dfb50596
const { execSync } = require('child_process'); // time:2025-04-18T16:51:25.965Z uuid:1f008f8b
const readline = require('readline'); // time:2025-04-18T16:51:25.965Z uuid:11a4aa22
// time:2025-04-18T16:51:25.965Z uuid:eb4f9001
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:51:25.965Z uuid:5e267d9c
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:51:25.965Z uuid:f5dae25b
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:51:25.965Z uuid:34911543
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:51:25.965Z uuid:d127afb2
// time:2025-04-18T16:51:25.965Z uuid:44227c76
// time:2025-04-18T16:51:25.965Z uuid:8e517eaf
let config = { // time:2025-04-18T16:51:25.965Z uuid:6714f715
  includeBranch: true, // time:2025-04-18T16:51:25.965Z uuid:438476fb
  includeCommit: true, // time:2025-04-18T16:51:25.965Z uuid:49b0d4af
  includeTimestamp: true, // time:2025-04-18T16:51:25.965Z uuid:5a4f128f
  includeLineNumber: true // time:2025-04-18T16:51:25.965Z uuid:e1721921
}; // time:2025-04-18T16:51:25.965Z uuid:f903af83
// time:2025-04-18T16:51:25.965Z uuid:03f7f5f7
// time:2025-04-18T16:51:25.965Z uuid:4e45d39b
let lastRunInfo = { // time:2025-04-18T16:51:25.965Z uuid:8055bea0
  timestamp: null, // time:2025-04-18T16:51:25.965Z uuid:f02e72fc
  files: [] // time:2025-04-18T16:51:25.965Z uuid:abe34761
}; // time:2025-04-18T16:51:25.965Z uuid:3fdd16cc
// time:2025-04-18T16:51:25.965Z uuid:62a49962
function generateShortUUID() { // time:2025-04-18T16:51:25.965Z uuid:51154806
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:51:25.965Z uuid:096ca3f4
} // time:2025-04-18T16:51:25.965Z uuid:c04dd163
// time:2025-04-18T16:51:25.965Z uuid:4a0dda6f
function getGitInfo() { // time:2025-04-18T16:51:25.965Z uuid:c88ca736
  try { // time:2025-04-18T16:51:25.965Z uuid:c2706951
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:51:25.965Z uuid:7635cd51
    let branch; // time:2025-04-18T16:51:25.965Z uuid:4d4bd4de
// time:2025-04-18T16:51:25.965Z uuid:0ed7e79b
// time:2025-04-18T16:51:25.965Z uuid:e5b1a3d8
    if (process.env.BRANCH_NAME) { // time:2025-04-18T16:51:25.965Z uuid:03f463ed
      branch = process.env.BRANCH_NAME; // time:2025-04-18T16:51:25.965Z uuid:efbe7c7a
    } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:51:25.965Z uuid:c48b5311
      branch = process.env.GIT_BRANCH; // time:2025-04-18T16:51:25.965Z uuid:40275a52
    } else { // time:2025-04-18T16:51:25.965Z uuid:280fb17a
// time:2025-04-18T16:51:25.965Z uuid:02f15e6c
      try { // time:2025-04-18T16:51:25.965Z uuid:f0629a38
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.965Z uuid:f250eb49
// time:2025-04-18T16:51:25.965Z uuid:65cdfc7e
// time:2025-04-18T16:51:25.965Z uuid:429b17d9
        if (!branch) { // time:2025-04-18T16:51:25.965Z uuid:ed59e612
          const gitStatusOutput = execSync('git status', { encoding: 'utf8' }); // time:2025-04-18T16:51:25.965Z uuid:d3574194
          const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/); // time:2025-04-18T16:51:25.965Z uuid:b745648d
          if (branchMatch && branchMatch[1]) { // time:2025-04-18T16:51:25.965Z uuid:a8975516
            branch = branchMatch[1]; // time:2025-04-18T16:51:25.965Z uuid:a0b6cdd8
          } // time:2025-04-18T16:51:25.965Z uuid:4a84c066
        } // time:2025-04-18T16:51:25.965Z uuid:88e8a390
      } catch (branchError) { // time:2025-04-18T16:51:25.965Z uuid:11c63512
        console.log('Error getting branch name:', branchError.message); // time:2025-04-18T16:51:25.965Z uuid:05ad2cac
      } // time:2025-04-18T16:51:25.965Z uuid:41fb19ce
    } // time:2025-04-18T16:51:25.965Z uuid:c57ddfcf
// time:2025-04-18T16:51:25.965Z uuid:5abb1bbf
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:51:25.965Z uuid:cb0e4ac3
    return { branch, lastCommit }; // time:2025-04-18T16:51:25.965Z uuid:3d398376
  } catch (error) { // time:2025-04-18T16:51:25.965Z uuid:f436a153
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:51:25.965Z uuid:57803520
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:51:25.965Z uuid:d74082eb
  } // time:2025-04-18T16:51:25.965Z uuid:68fc8b67
} // time:2025-04-18T16:51:25.965Z uuid:f26b9309
// time:2025-04-18T16:51:25.965Z uuid:de6e99c4
function loadConfig() { // time:2025-04-18T16:51:25.965Z uuid:7aee28b7
  try { // time:2025-04-18T16:51:25.965Z uuid:4c242ef1
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:51:25.965Z uuid:5b139b44
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:51:25.965Z uuid:1fe0e61f
      const data = JSON.parse(fileContent); // time:2025-04-18T16:51:25.965Z uuid:1a92a091
// time:2025-04-18T16:51:25.965Z uuid:8d52451d
// time:2025-04-18T16:51:25.965Z uuid:da6d508c
      if (data.config) { // time:2025-04-18T16:51:25.965Z uuid:d38b9cbe
        config = data.config; // time:2025-04-18T16:51:25.965Z uuid:69916b74
      } // time:2025-04-18T16:51:25.965Z uuid:4b49f304
// time:2025-04-18T16:51:25.965Z uuid:59385eae
// time:2025-04-18T16:51:25.965Z uuid:2e8f8d65
      if (data.lastRun) { // time:2025-04-18T16:51:25.965Z uuid:88806949
        lastRunInfo = data.lastRun; // time:2025-04-18T16:51:25.965Z uuid:82eff842
      } // time:2025-04-18T16:51:25.965Z uuid:a81717a0
// time:2025-04-18T16:51:25.965Z uuid:4933771e
      console.log('Loaded configuration:', config); // time:2025-04-18T16:51:25.965Z uuid:bb9b0bc0
    } // time:2025-04-18T16:51:25.965Z uuid:a0e51bfb
  } catch (error) { // time:2025-04-18T16:51:25.965Z uuid:bcfecd89
    console.error('Error loading config:', error.message); // time:2025-04-18T16:51:25.965Z uuid:43639eeb
  } // time:2025-04-18T16:51:25.965Z uuid:bbe42b05
} // time:2025-04-18T16:51:25.965Z uuid:cef6be02
// time:2025-04-18T16:51:25.965Z uuid:ff838620
function saveConfig() { // time:2025-04-18T16:51:25.965Z uuid:02c38b7a
  try { // time:2025-04-18T16:51:25.965Z uuid:ae4272e3
// time:2025-04-18T16:51:25.965Z uuid:e598e655
    const data = { // time:2025-04-18T16:51:25.965Z uuid:580b3043
      config, // time:2025-04-18T16:51:25.965Z uuid:bc81f3ba
      lastRun: lastRunInfo // time:2025-04-18T16:51:25.965Z uuid:4e6873f8
    }; // time:2025-04-18T16:51:25.965Z uuid:f2db50ff
// time:2025-04-18T16:51:25.965Z uuid:596a1e07
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:51:25.965Z uuid:5c34470e
    console.log('Configuration saved.'); // time:2025-04-18T16:51:25.965Z uuid:6aeaf095
  } catch (error) { // time:2025-04-18T16:51:25.965Z uuid:6743aacf
    console.error('Error saving config:', error.message); // time:2025-04-18T16:51:25.965Z uuid:88231190
  } // time:2025-04-18T16:51:25.965Z uuid:a1601a8e
} // time:2025-04-18T16:51:25.965Z uuid:6a247ae8
// time:2025-04-18T16:51:25.965Z uuid:d27eddd9
function ensureBackupDir() { // time:2025-04-18T16:51:25.965Z uuid:560ac9c2
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:51:25.965Z uuid:2127c4d9
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:51:25.965Z uuid:31ea631f
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:51:25.965Z uuid:3a9ada09
  } // time:2025-04-18T16:51:25.965Z uuid:078a90b6
} // time:2025-04-18T16:51:25.965Z uuid:e8bce2e1
// time:2025-04-18T16:51:25.965Z uuid:a6999b70
function backupFile(filePath) { // time:2025-04-18T16:51:25.965Z uuid:e0916883
  try { // time:2025-04-18T16:51:25.965Z uuid:d517613a
    ensureBackupDir(); // time:2025-04-18T16:51:25.965Z uuid:a2dd6a8e
// time:2025-04-18T16:51:25.965Z uuid:c7c2cb31
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.965Z uuid:a03f9075
    const fileName = path.basename(filePath); // time:2025-04-18T16:51:25.965Z uuid:e1c7671c
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:51:25.965Z uuid:b130a6b6
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:51:25.965Z uuid:0263a194
// time:2025-04-18T16:51:25.965Z uuid:56cffcb0
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:51:25.965Z uuid:6587dcb2
    return { relativePath, backupPath }; // time:2025-04-18T16:51:25.965Z uuid:5d3be29f
  } catch (error) { // time:2025-04-18T16:51:25.965Z uuid:010f4d5e
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.965Z uuid:014c963d
    return null; // time:2025-04-18T16:51:25.965Z uuid:d8c24629
  } // time:2025-04-18T16:51:25.965Z uuid:049a5e03
} // time:2025-04-18T16:51:25.965Z uuid:e3dfdf39
// time:2025-04-18T16:51:25.965Z uuid:2b083286
function addUUIDsToFile(filePath) { // time:2025-04-18T16:51:25.965Z uuid:be6e271d
  try { // time:2025-04-18T16:51:25.965Z uuid:e33beee8
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:51:25.965Z uuid:3a108bc8
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:51:25.965Z uuid:ea0de1c4
      return null; // time:2025-04-18T16:51:25.965Z uuid:304fdd06
    } // time:2025-04-18T16:51:25.965Z uuid:5a432245
// time:2025-04-18T16:51:25.965Z uuid:85fa11b6
// time:2025-04-18T16:51:25.965Z uuid:7db5d7e1
    const backup = backupFile(filePath); // time:2025-04-18T16:51:25.965Z uuid:303c1fb3
    if (!backup) return null; // time:2025-04-18T16:51:25.965Z uuid:fbf2e591
// time:2025-04-18T16:51:25.965Z uuid:6286e71d
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:51:25.965Z uuid:fc0e3998
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:51:25.965Z uuid:500512f3
// time:2025-04-18T16:51:25.965Z uuid:33a7e933
// time:2025-04-18T16:51:25.965Z uuid:2d739e02
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`); // time:2025-04-18T16:51:25.965Z uuid:a38c725c
// time:2025-04-18T16:51:25.965Z uuid:628107b0
// time:2025-04-18T16:51:25.965Z uuid:258bcfc0
    let metaParts = []; // time:2025-04-18T16:51:25.965Z uuid:4bda5c75
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`); // time:2025-04-18T16:51:25.965Z uuid:3820d3a4
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`); // time:2025-04-18T16:51:25.965Z uuid:8393d223
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`); // time:2025-04-18T16:51:25.965Z uuid:60319de6
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:51:25.965Z uuid:bf7c70a9
// time:2025-04-18T16:51:25.965Z uuid:fab2b3a0
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:51:25.965Z uuid:0994f989
    const lines = content.split('\n'); // time:2025-04-18T16:51:25.965Z uuid:628ace1b
// time:2025-04-18T16:51:25.965Z uuid:db8f2bec
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:51:25.965Z uuid:618576d4
      const lineNumber = index + 1; // time:2025-04-18T16:51:25.965Z uuid:ca36425f
      let cleanLine = line; // time:2025-04-18T16:51:25.965Z uuid:528104bd
// time:2025-04-18T16:51:25.965Z uuid:c11cf849
      if (line.includes(' // time:2025-04-18T16:51:25.965Z uuid:71b09501
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:51:25.965Z uuid:8ccd15ef
      } // time:2025-04-18T16:51:25.965Z uuid:edb4dbe5
// time:2025-04-18T16:51:25.965Z uuid:58493d5d
      let comment = ' // time:2025-04-18T16:51:25.965Z uuid:6ec6ac4e
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:51:25.965Z uuid:54dd61d7
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:51:25.965Z uuid:a91d78a7
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:51:25.965Z uuid:f809890c
// time:2025-04-18T16:51:25.965Z uuid:a7bc884a
      if (cleanLine.trim() === '') { // time:2025-04-18T16:51:25.965Z uuid:c240e1ed
        return comment.trim(); // time:2025-04-18T16:51:25.965Z uuid:3bc3f3b8
      } // time:2025-04-18T16:51:25.965Z uuid:eba4e416
// time:2025-04-18T16:51:25.965Z uuid:caac26c1
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:51:25.965Z uuid:4d94ff49
    }); // time:2025-04-18T16:51:25.965Z uuid:333fe1a8
// time:2025-04-18T16:51:25.965Z uuid:31cf369e
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:51:25.965Z uuid:8ec802f6
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:51:25.965Z uuid:de1433f8
// time:2025-04-18T16:51:25.965Z uuid:65342598
    return backup; // time:2025-04-18T16:51:25.965Z uuid:e0594dd0
  } catch (error) { // time:2025-04-18T16:51:25.965Z uuid:ca7f95ae
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:51:25.965Z uuid:f08aa437
    return null; // time:2025-04-18T16:51:25.965Z uuid:27a15230
  } // time:2025-04-18T16:51:25.965Z uuid:696ec9dc
} // time:2025-04-18T16:51:25.965Z uuid:3fea22fd
// time:2025-04-18T16:51:25.965Z uuid:9493e01b
function processDirectory(dirPath) { // time:2025-04-18T16:51:25.965Z uuid:3b1384e4
  const modifiedFiles = []; // time:2025-04-18T16:51:25.965Z uuid:89b4f3fc
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:51:25.965Z uuid:62c4ed49
// time:2025-04-18T16:51:25.965Z uuid:2397fd8a
  for (const entry of entries) { // time:2025-04-18T16:51:25.965Z uuid:315e18e5
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:51:25.965Z uuid:7d212fb9
// time:2025-04-18T16:51:25.965Z uuid:5eaee3b0
    if (entry.isDirectory()) { // time:2025-04-18T16:51:25.965Z uuid:d7563c7d
      if (!SKIP_DIRS.includes(entry.name)) { // time:2025-04-18T16:51:25.965Z uuid:c6102c89
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:51:25.965Z uuid:14b6bbd5
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:51:25.965Z uuid:d0c0ae77
      } // time:2025-04-18T16:51:25.965Z uuid:a5777f63
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:51:25.965Z uuid:d0936b01
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:51:25.965Z uuid:57f16ae7
      if (result) { // time:2025-04-18T16:51:25.965Z uuid:dac9e234
        modifiedFiles.push(result); // time:2025-04-18T16:51:25.965Z uuid:7833809b
      } // time:2025-04-18T16:51:25.965Z uuid:6d80f132
    } // time:2025-04-18T16:51:25.965Z uuid:55db8c4d
  } // time:2025-04-18T16:51:25.965Z uuid:f61f0d67
// time:2025-04-18T16:51:25.965Z uuid:04f29640
  return modifiedFiles; // time:2025-04-18T16:51:25.965Z uuid:60805624
} // time:2025-04-18T16:51:25.965Z uuid:e0b59504
// time:2025-04-18T16:51:25.965Z uuid:c1dc36e4
function rollbackLastRun() { // time:2025-04-18T16:51:25.965Z uuid:3bcadbcb
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:51:25.965Z uuid:f0b0e5ac
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:51:25.965Z uuid:ecbfa2d3
    return; // time:2025-04-18T16:51:25.965Z uuid:0a46bbfc
  } // time:2025-04-18T16:51:25.965Z uuid:c5e3e480
// time:2025-04-18T16:51:25.965Z uuid:a9ce88c2
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:51:25.965Z uuid:218d9873
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:51:25.965Z uuid:c557316a
// time:2025-04-18T16:51:25.965Z uuid:2aa8b670
  let successCount = 0; // time:2025-04-18T16:51:25.965Z uuid:d4a626ec
// time:2025-04-18T16:51:25.965Z uuid:853bc9ce
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:51:25.965Z uuid:75d436eb
    try { // time:2025-04-18T16:51:25.965Z uuid:3df41206
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:51:25.965Z uuid:57259ef1
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:51:25.965Z uuid:1570e048
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:51:25.965Z uuid:4e50b7a8
// time:2025-04-18T16:51:25.965Z uuid:d5e427c2
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:51:25.965Z uuid:0537d15a
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:51:25.965Z uuid:9a345a16
        successCount++; // time:2025-04-18T16:51:25.965Z uuid:493436b1
      } else { // time:2025-04-18T16:51:25.965Z uuid:0aff6190
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:51:25.965Z uuid:4dd7f5fe
      } // time:2025-04-18T16:51:25.965Z uuid:9adeab3a
    } catch (error) { // time:2025-04-18T16:51:25.965Z uuid:f79b4058
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:51:25.965Z uuid:5de05cf9
    } // time:2025-04-18T16:51:25.965Z uuid:30babcf0
  } // time:2025-04-18T16:51:25.965Z uuid:f7b22eb5
// time:2025-04-18T16:51:25.965Z uuid:498fe628
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:51:25.965Z uuid:28437daf
// time:2025-04-18T16:51:25.965Z uuid:17700f38
// time:2025-04-18T16:51:25.965Z uuid:86f6ecc0
  lastRunInfo = { // time:2025-04-18T16:51:25.965Z uuid:6bdf4956
    timestamp: null, // time:2025-04-18T16:51:25.965Z uuid:5f8f6a18
    files: [] // time:2025-04-18T16:51:25.965Z uuid:70c5fe4e
  }; // time:2025-04-18T16:51:25.965Z uuid:651c23af
// time:2025-04-18T16:51:25.965Z uuid:0939d39f
  saveConfig(); // time:2025-04-18T16:51:25.965Z uuid:2e12f171
} // time:2025-04-18T16:51:25.965Z uuid:5d534c28
// time:2025-04-18T16:51:25.965Z uuid:fa195dda
function runUUIDProcess() { // time:2025-04-18T16:51:25.965Z uuid:d074e629
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:51:25.965Z uuid:d93dc5e0
// time:2025-04-18T16:51:25.965Z uuid:81ee2bdc
// time:2025-04-18T16:51:25.965Z uuid:4745d658
  lastRunInfo = { // time:2025-04-18T16:51:25.965Z uuid:2285ad20
    timestamp: Date.now(), // time:2025-04-18T16:51:25.965Z uuid:a1d13c59
    files: modifiedFiles // time:2025-04-18T16:51:25.965Z uuid:ec2ebc1d
  }; // time:2025-04-18T16:51:25.965Z uuid:099bfb07
// time:2025-04-18T16:51:25.965Z uuid:afffb96d
  saveConfig(); // time:2025-04-18T16:51:25.965Z uuid:8461a6cc
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:51:25.965Z uuid:143cfc51
} // time:2025-04-18T16:51:25.965Z uuid:94aa24c3
// time:2025-04-18T16:51:25.965Z uuid:256305cc
function showMenu() { // time:2025-04-18T16:51:25.965Z uuid:f9051720
  const rl = readline.createInterface({ // time:2025-04-18T16:51:25.965Z uuid:36133bfb
    input: process.stdin, // time:2025-04-18T16:51:25.965Z uuid:3195414b
    output: process.stdout // time:2025-04-18T16:51:25.965Z uuid:620b08fc
  }); // time:2025-04-18T16:51:25.965Z uuid:1977c041
// time:2025-04-18T16:51:25.965Z uuid:a00220b2
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:51:25.965Z uuid:9a71b060
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.965Z uuid:7c38e427
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.965Z uuid:339fc3f6
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.965Z uuid:1d324ccd
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:51:25.965Z uuid:62597967
  console.log('5. Reset to Defaults'); // time:2025-04-18T16:51:25.965Z uuid:0001d9dc
  console.log('6. Save and Run'); // time:2025-04-18T16:51:25.965Z uuid:3f1f7e1f
  console.log('7. Rollback Last Run'); // time:2025-04-18T16:51:25.965Z uuid:779f4e12
  console.log('8. Exit'); // time:2025-04-18T16:51:25.965Z uuid:68d883f6
// time:2025-04-18T16:51:25.965Z uuid:25528f9c
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:51:25.965Z uuid:d68086fa
    switch(answer) { // time:2025-04-18T16:51:25.965Z uuid:a55b7e7a
      case '1': // time:2025-04-18T16:51:25.965Z uuid:03387ae6
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:51:25.965Z uuid:e253b739
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:9f9dfab2
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:d27cd70d
        break; // time:2025-04-18T16:51:25.965Z uuid:c7c5462a
      case '2': // time:2025-04-18T16:51:25.965Z uuid:a3ae7d61
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:51:25.965Z uuid:d539ec8f
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:7c0ef413
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:012e0b82
        break; // time:2025-04-18T16:51:25.965Z uuid:ff2ce6ad
      case '3': // time:2025-04-18T16:51:25.965Z uuid:30ba4f57
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:51:25.965Z uuid:79f19c68
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:555a116e
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:5cbbc33d
        break; // time:2025-04-18T16:51:25.965Z uuid:85da0097
      case '4': // time:2025-04-18T16:51:25.965Z uuid:769f6e19
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:51:25.965Z uuid:c6aa0070
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:65745f4b
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:9aaea1ef
        break; // time:2025-04-18T16:51:25.965Z uuid:d79031cb
      case '5': // time:2025-04-18T16:51:25.965Z uuid:5f1476a9
        config = { // time:2025-04-18T16:51:25.965Z uuid:b25c3ab9
          includeBranch: true, // time:2025-04-18T16:51:25.965Z uuid:6803b434
          includeCommit: true, // time:2025-04-18T16:51:25.965Z uuid:ab13b71c
          includeTimestamp: true, // time:2025-04-18T16:51:25.965Z uuid:27907d9f
          includeLineNumber: true // time:2025-04-18T16:51:25.965Z uuid:59f9b19c
        }; // time:2025-04-18T16:51:25.965Z uuid:2ea2fb67
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:4d7c9a1d
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:bd37c362
        break; // time:2025-04-18T16:51:25.965Z uuid:1fc4e4d4
      case '6': // time:2025-04-18T16:51:25.965Z uuid:dfac3453
        saveConfig(); // time:2025-04-18T16:51:25.965Z uuid:7ae026be
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:08847f2c
        runUUIDProcess(); // time:2025-04-18T16:51:25.965Z uuid:62a97f95
        break; // time:2025-04-18T16:51:25.965Z uuid:ec895fb7
      case '7': // time:2025-04-18T16:51:25.965Z uuid:70bb2021
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:1e0a6871
        rollbackLastRun(); // time:2025-04-18T16:51:25.965Z uuid:e2b1ea22
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:468a1bf2
        break; // time:2025-04-18T16:51:25.965Z uuid:6aeff63f
      case '8': // time:2025-04-18T16:51:25.965Z uuid:76ac185d
        console.log('Exiting without changes.'); // time:2025-04-18T16:51:25.965Z uuid:4de2d05f
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:0e4bcc1a
        break; // time:2025-04-18T16:51:25.965Z uuid:2c78cb32
      default: // time:2025-04-18T16:51:25.965Z uuid:35c4e99b
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:51:25.965Z uuid:e3cb6443
        rl.close(); // time:2025-04-18T16:51:25.965Z uuid:f192eb1a
        showMenu(); // time:2025-04-18T16:51:25.965Z uuid:cf9e5961
    } // time:2025-04-18T16:51:25.965Z uuid:714755ee
  }); // time:2025-04-18T16:51:25.965Z uuid:fbbcc9bb
} // time:2025-04-18T16:51:25.965Z uuid:304d3956
// time:2025-04-18T16:51:25.965Z uuid:904f441b
// time:2025-04-18T16:51:25.965Z uuid:a3b2e7ba
function main() { // time:2025-04-18T16:51:25.965Z uuid:455373da
  loadConfig(); // time:2025-04-18T16:51:25.965Z uuid:62463bcb
// time:2025-04-18T16:51:25.965Z uuid:24115748
  if (process.argv.length > 2) { // time:2025-04-18T16:51:25.965Z uuid:cab44716
    if (process.argv[2] === '--run') { // time:2025-04-18T16:51:25.965Z uuid:cb53ba81
// time:2025-04-18T16:51:25.965Z uuid:6e70f4df
      runUUIDProcess(); // time:2025-04-18T16:51:25.965Z uuid:6224fa95
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:51:25.965Z uuid:aa2dea4b
// time:2025-04-18T16:51:25.965Z uuid:92e3dd4a
      rollbackLastRun(); // time:2025-04-18T16:51:25.965Z uuid:894e90e1
    } else { // time:2025-04-18T16:51:25.965Z uuid:37bc7246
      console.log('Unknown command. Available commands: --run, --rollback'); // time:2025-04-18T16:51:25.965Z uuid:f7bafdf6
    } // time:2025-04-18T16:51:25.965Z uuid:a585da88
  } else { // time:2025-04-18T16:51:25.965Z uuid:753a9307
// time:2025-04-18T16:51:25.965Z uuid:4bd8cf8a
    showMenu(); // time:2025-04-18T16:51:25.965Z uuid:f9595b3f
  } // time:2025-04-18T16:51:25.965Z uuid:2e5400c0
} // time:2025-04-18T16:51:25.965Z uuid:43cb4135
// time:2025-04-18T16:51:25.965Z uuid:26b0ef58
main(); // time:2025-04-18T16:51:25.965Z uuid:c2b5fdd2