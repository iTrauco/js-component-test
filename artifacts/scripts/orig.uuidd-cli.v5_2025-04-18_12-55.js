// time:2025-04-18T16:56:37.939Z uuid:531ed236
// time:2025-04-18T16:56:37.939Z uuid:bacc7cb6
// time:2025-04-18T16:56:37.939Z uuid:15fa4b23
// time:2025-04-18T16:56:37.939Z uuid:396f69c8
// time:2025-04-18T16:56:37.939Z uuid:2b5a56c7
// time:2025-04-18T16:56:37.939Z uuid:a6023aa8
// time:2025-04-18T16:56:37.939Z uuid:9127613c
// time:2025-04-18T16:56:37.939Z uuid:a2153c3a
// time:2025-04-18T16:56:37.939Z uuid:3268609c
// time:2025-04-18T16:56:37.939Z uuid:2745a78e
const fs = require('fs'); // time:2025-04-18T16:56:37.939Z uuid:aa466af6
const path = require('path'); // time:2025-04-18T16:56:37.939Z uuid:451afae9
const crypto = require('crypto'); // time:2025-04-18T16:56:37.939Z uuid:74abcdc3
const { execSync } = require('child_process'); // time:2025-04-18T16:56:37.939Z uuid:a64c06b3
const readline = require('readline'); // time:2025-04-18T16:56:37.939Z uuid:ff99d78d
// time:2025-04-18T16:56:37.939Z uuid:4fa83557
const CONFIG_FILE = '.uuid-cli-config.json'; // time:2025-04-18T16:56:37.939Z uuid:04fe2309
const BACKUP_DIR = '.uuid-cli-backups'; // time:2025-04-18T16:56:37.939Z uuid:f17ef502
const SCRIPT_FILENAME = path.basename(__filename); // time:2025-04-18T16:56:37.939Z uuid:0b671055
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR]; // time:2025-04-18T16:56:37.939Z uuid:d2b2640a
// time:2025-04-18T16:56:37.939Z uuid:f669fa24
// time:2025-04-18T16:56:37.939Z uuid:0aca3022
let config = { // time:2025-04-18T16:56:37.939Z uuid:e724f3f7
  includeBranch: true, // time:2025-04-18T16:56:37.939Z uuid:1916e46c
  includeCommit: true, // time:2025-04-18T16:56:37.939Z uuid:659cd37a
  includeTimestamp: true, // time:2025-04-18T16:56:37.939Z uuid:6d3068ca
  includeLineNumber: true, // time:2025-04-18T16:56:37.939Z uuid:279eac82
  excludeDirs: [...SKIP_DIRS] // time:2025-04-18T16:56:37.939Z uuid:ac69394b
}; // time:2025-04-18T16:56:37.939Z uuid:a9ea4f90
// time:2025-04-18T16:56:37.939Z uuid:cb62b4b7
// time:2025-04-18T16:56:37.939Z uuid:f13d9690
let lastRunInfo = { // time:2025-04-18T16:56:37.939Z uuid:8e7ad642
  timestamp: null, // time:2025-04-18T16:56:37.939Z uuid:120697ce
  files: [] // time:2025-04-18T16:56:37.939Z uuid:69ae6848
}; // time:2025-04-18T16:56:37.939Z uuid:71de337c
// time:2025-04-18T16:56:37.939Z uuid:0292ade6
function generateShortUUID() { // time:2025-04-18T16:56:37.939Z uuid:e2527645
  return crypto.randomBytes(4).toString('hex'); // time:2025-04-18T16:56:37.939Z uuid:2c3421ee
} // time:2025-04-18T16:56:37.939Z uuid:f49a2337
// time:2025-04-18T16:56:37.939Z uuid:c310b941
function getGitInfo() { // time:2025-04-18T16:56:37.939Z uuid:46f42d56
  try { // time:2025-04-18T16:56:37.939Z uuid:3e73efd6
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' }); // time:2025-04-18T16:56:37.939Z uuid:c0085e47
    let branch = null; // time:2025-04-18T16:56:37.939Z uuid:5bf3964f
// time:2025-04-18T16:56:37.939Z uuid:ab9b61bb
// time:2025-04-18T16:56:37.939Z uuid:4df840ea
    try { // time:2025-04-18T16:56:37.939Z uuid:01625ee5
      branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.939Z uuid:2cec0f51
    } catch (e) { // time:2025-04-18T16:56:37.939Z uuid:684a372f
      console.log('Could not get branch via symbolic-ref:', e.message); // time:2025-04-18T16:56:37.939Z uuid:e45a45f0
    } // time:2025-04-18T16:56:37.939Z uuid:8c43f8b9
// time:2025-04-18T16:56:37.939Z uuid:5e469b81
// time:2025-04-18T16:56:37.939Z uuid:411e4e47
    if (!branch) { // time:2025-04-18T16:56:37.939Z uuid:05b14218
      try { // time:2025-04-18T16:56:37.939Z uuid:893288a2
        const gitStatusOutput = execSync('git status', { encoding: 'utf8' }); // time:2025-04-18T16:56:37.939Z uuid:bc7873ad
        const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/); // time:2025-04-18T16:56:37.939Z uuid:e5d9b844
        if (branchMatch && branchMatch[1]) { // time:2025-04-18T16:56:37.939Z uuid:33abe3b5
          branch = branchMatch[1]; // time:2025-04-18T16:56:37.939Z uuid:07ef3a79
        } // time:2025-04-18T16:56:37.939Z uuid:54508b3c
      } catch (e) { // time:2025-04-18T16:56:37.939Z uuid:a59b64f6
        console.log('Could not get branch via git status:', e.message); // time:2025-04-18T16:56:37.939Z uuid:b0881d28
      } // time:2025-04-18T16:56:37.939Z uuid:a9ae383b
    } // time:2025-04-18T16:56:37.939Z uuid:6c604c27
// time:2025-04-18T16:56:37.939Z uuid:15d8c32b
// time:2025-04-18T16:56:37.939Z uuid:7e7fcc07
    if (!branch) { // time:2025-04-18T16:56:37.939Z uuid:c7878fd4
      if (process.env.BRANCH_NAME) { // time:2025-04-18T16:56:37.939Z uuid:b4d8fa89
        branch = process.env.BRANCH_NAME; // time:2025-04-18T16:56:37.939Z uuid:0bfd15f8
      } else if (process.env.GIT_BRANCH) { // time:2025-04-18T16:56:37.939Z uuid:900c9583
        branch = process.env.GIT_BRANCH; // time:2025-04-18T16:56:37.939Z uuid:560dfabe
      } // time:2025-04-18T16:56:37.939Z uuid:7085e15b
    } // time:2025-04-18T16:56:37.939Z uuid:3d26778c
// time:2025-04-18T16:56:37.939Z uuid:c9635d29
// time:2025-04-18T16:56:37.939Z uuid:42059100
    if (!branch) { // time:2025-04-18T16:56:37.939Z uuid:74272b49
      try { // time:2025-04-18T16:56:37.939Z uuid:2b25c6e2
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.939Z uuid:452e979d
      } catch (e) { // time:2025-04-18T16:56:37.939Z uuid:706311c5
        console.log('Could not get branch via show-current:', e.message); // time:2025-04-18T16:56:37.939Z uuid:12076cb0
      } // time:2025-04-18T16:56:37.939Z uuid:fbe18887
    } // time:2025-04-18T16:56:37.939Z uuid:df6db300
// time:2025-04-18T16:56:37.939Z uuid:79d000cd
// time:2025-04-18T16:56:37.939Z uuid:999e922a
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim(); // time:2025-04-18T16:56:37.939Z uuid:2ea1d8b1
// time:2025-04-18T16:56:37.939Z uuid:c79463f5
    console.log('Debug - Detected Git Info:', { branch, lastCommit }); // time:2025-04-18T16:56:37.939Z uuid:dc11dae7
    return { branch, lastCommit }; // time:2025-04-18T16:56:37.939Z uuid:c1e0ed0a
  } catch (error) { // time:2025-04-18T16:56:37.939Z uuid:f66da89c
    console.log('Git info detection error:', error.message); // time:2025-04-18T16:56:37.939Z uuid:d5ac3bbb
    return { branch: null, lastCommit: null }; // time:2025-04-18T16:56:37.939Z uuid:2335719c
  } // time:2025-04-18T16:56:37.939Z uuid:74d89b98
} // time:2025-04-18T16:56:37.939Z uuid:74441b82
// time:2025-04-18T16:56:37.939Z uuid:806f2e62
function loadConfig() { // time:2025-04-18T16:56:37.939Z uuid:db978473
  try { // time:2025-04-18T16:56:37.939Z uuid:8e0e69ab
    if (fs.existsSync(CONFIG_FILE)) { // time:2025-04-18T16:56:37.939Z uuid:2bdb6eff
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8'); // time:2025-04-18T16:56:37.939Z uuid:bb76a19c
      const data = JSON.parse(fileContent); // time:2025-04-18T16:56:37.939Z uuid:2d8916fa
// time:2025-04-18T16:56:37.939Z uuid:be2c9141
// time:2025-04-18T16:56:37.939Z uuid:70a10aee
      if (data.config) { // time:2025-04-18T16:56:37.939Z uuid:bb4082ad
        config = data.config; // time:2025-04-18T16:56:37.939Z uuid:a1a0733b
      } // time:2025-04-18T16:56:37.939Z uuid:6605bdf7
// time:2025-04-18T16:56:37.939Z uuid:19e7d614
// time:2025-04-18T16:56:37.939Z uuid:daf0c41d
      if (data.lastRun) { // time:2025-04-18T16:56:37.939Z uuid:813ea812
        lastRunInfo = data.lastRun; // time:2025-04-18T16:56:37.939Z uuid:5b21df8b
      } // time:2025-04-18T16:56:37.939Z uuid:a19e49e6
// time:2025-04-18T16:56:37.939Z uuid:a76b4bb2
      console.log('Loaded configuration:', config); // time:2025-04-18T16:56:37.939Z uuid:337b9a71
    } // time:2025-04-18T16:56:37.939Z uuid:a59a4598
  } catch (error) { // time:2025-04-18T16:56:37.939Z uuid:575360ea
    console.error('Error loading config:', error.message); // time:2025-04-18T16:56:37.939Z uuid:3653a7ac
  } // time:2025-04-18T16:56:37.939Z uuid:8e7584d4
} // time:2025-04-18T16:56:37.939Z uuid:e4da70d3
// time:2025-04-18T16:56:37.939Z uuid:37de6fa5
function saveConfig() { // time:2025-04-18T16:56:37.939Z uuid:3cebcbe1
  try { // time:2025-04-18T16:56:37.939Z uuid:216bbe98
// time:2025-04-18T16:56:37.939Z uuid:40c8896f
    const data = { // time:2025-04-18T16:56:37.939Z uuid:4da44b77
      config, // time:2025-04-18T16:56:37.939Z uuid:6dfcedf5
      lastRun: lastRunInfo // time:2025-04-18T16:56:37.939Z uuid:d9184412
    }; // time:2025-04-18T16:56:37.939Z uuid:c17d2f38
// time:2025-04-18T16:56:37.939Z uuid:5b27705f
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2)); // time:2025-04-18T16:56:37.939Z uuid:109685dd
    console.log('Configuration saved.'); // time:2025-04-18T16:56:37.939Z uuid:fa9d7451
  } catch (error) { // time:2025-04-18T16:56:37.939Z uuid:6c0f49b1
    console.error('Error saving config:', error.message); // time:2025-04-18T16:56:37.939Z uuid:4f407c8c
  } // time:2025-04-18T16:56:37.939Z uuid:325aae4f
} // time:2025-04-18T16:56:37.939Z uuid:53e5ece9
// time:2025-04-18T16:56:37.939Z uuid:83b34339
function ensureBackupDir() { // time:2025-04-18T16:56:37.939Z uuid:b048bf39
  if (!fs.existsSync(BACKUP_DIR)) { // time:2025-04-18T16:56:37.939Z uuid:4824c932
    fs.mkdirSync(BACKUP_DIR, { recursive: true }); // time:2025-04-18T16:56:37.939Z uuid:18fcaf78
    console.log(`Created backup directory: ${BACKUP_DIR}`); // time:2025-04-18T16:56:37.939Z uuid:d87a81d7
  } // time:2025-04-18T16:56:37.939Z uuid:fd29047f
} // time:2025-04-18T16:56:37.939Z uuid:6d1fdd4f
// time:2025-04-18T16:56:37.939Z uuid:46cb7fd7
function backupFile(filePath) { // time:2025-04-18T16:56:37.939Z uuid:fd6d9bb8
  try { // time:2025-04-18T16:56:37.939Z uuid:2d20db7a
    ensureBackupDir(); // time:2025-04-18T16:56:37.939Z uuid:e30d3381
// time:2025-04-18T16:56:37.939Z uuid:59de9577
    const content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.939Z uuid:3490b305
    const fileName = path.basename(filePath); // time:2025-04-18T16:56:37.939Z uuid:0cbcda45
    const relativePath = path.relative(process.cwd(), filePath); // time:2025-04-18T16:56:37.939Z uuid:d399bcc7
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`); // time:2025-04-18T16:56:37.939Z uuid:0aaac2a8
// time:2025-04-18T16:56:37.939Z uuid:a07a4eb0
    fs.writeFileSync(backupPath, content); // time:2025-04-18T16:56:37.939Z uuid:71fe86e4
    return { relativePath, backupPath }; // time:2025-04-18T16:56:37.939Z uuid:9ca8a6ef
  } catch (error) { // time:2025-04-18T16:56:37.939Z uuid:a892e1dc
    console.error(`Error backing up ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.939Z uuid:1ce22625
    return null; // time:2025-04-18T16:56:37.939Z uuid:45d80469
  } // time:2025-04-18T16:56:37.939Z uuid:19f835a7
} // time:2025-04-18T16:56:37.939Z uuid:9302a0ee
// time:2025-04-18T16:56:37.939Z uuid:18c1802b
function addUUIDsToFile(filePath) { // time:2025-04-18T16:56:37.939Z uuid:4a8c3712
  try { // time:2025-04-18T16:56:37.939Z uuid:1dc17914
    if (path.basename(filePath) === SCRIPT_FILENAME) { // time:2025-04-18T16:56:37.939Z uuid:871706c7
      console.log(`Skipping self: ${filePath}`); // time:2025-04-18T16:56:37.939Z uuid:9626d4ba
      return null; // time:2025-04-18T16:56:37.939Z uuid:ded097f3
    } // time:2025-04-18T16:56:37.939Z uuid:13f061b8
// time:2025-04-18T16:56:37.939Z uuid:a9cecc59
// time:2025-04-18T16:56:37.939Z uuid:79417915
    const backup = backupFile(filePath); // time:2025-04-18T16:56:37.939Z uuid:4a1407d2
    if (!backup) return null; // time:2025-04-18T16:56:37.939Z uuid:4be4a54a
// time:2025-04-18T16:56:37.939Z uuid:5c2e8948
    const { branch, lastCommit } = getGitInfo(); // time:2025-04-18T16:56:37.939Z uuid:fecab839
    const timestamp = new Date().toISOString(); // time:2025-04-18T16:56:37.939Z uuid:1e368909
// time:2025-04-18T16:56:37.939Z uuid:03752504
// time:2025-04-18T16:56:37.939Z uuid:533913ce
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`); // time:2025-04-18T16:56:37.939Z uuid:62fa447f
// time:2025-04-18T16:56:37.939Z uuid:98d5c508
// time:2025-04-18T16:56:37.939Z uuid:58e03b3e
    let metaParts = []; // time:2025-04-18T16:56:37.939Z uuid:afa8059e
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`); // time:2025-04-18T16:56:37.939Z uuid:11389665
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`); // time:2025-04-18T16:56:37.939Z uuid:a0cf7c69
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`); // time:2025-04-18T16:56:37.939Z uuid:6fb9fb56
    const metaInfo = metaParts.join('|'); // time:2025-04-18T16:56:37.939Z uuid:1c0629b6
// time:2025-04-18T16:56:37.939Z uuid:b02ee95e
    let content = fs.readFileSync(filePath, 'utf8'); // time:2025-04-18T16:56:37.939Z uuid:009482eb
    const lines = content.split('\n'); // time:2025-04-18T16:56:37.939Z uuid:bc514572
// time:2025-04-18T16:56:37.939Z uuid:afa51c72
    const updatedLines = lines.map((line, index) => { // time:2025-04-18T16:56:37.939Z uuid:e171d7e4
      const lineNumber = index + 1; // time:2025-04-18T16:56:37.939Z uuid:9981d9b3
      let cleanLine = line; // time:2025-04-18T16:56:37.939Z uuid:540cc533
// time:2025-04-18T16:56:37.939Z uuid:246008a3
      if (line.includes(' // time:2025-04-18T16:56:37.939Z uuid:2796739a
        cleanLine = line.substring(0, line.indexOf(' // time:2025-04-18T16:56:37.939Z uuid:58c7f7a4
      } // time:2025-04-18T16:56:37.939Z uuid:24063b2a
// time:2025-04-18T16:56:37.939Z uuid:31d5572d
      let comment = ' // time:2025-04-18T16:56:37.939Z uuid:1a5729c0
      if (metaInfo) comment += `${metaInfo} `; // time:2025-04-18T16:56:37.939Z uuid:b5350d45
      if (config.includeLineNumber) comment += `line:${lineNumber} `; // time:2025-04-18T16:56:37.939Z uuid:92f21578
      comment += `uuid:${generateShortUUID()}`; // time:2025-04-18T16:56:37.939Z uuid:ff8d05da
// time:2025-04-18T16:56:37.939Z uuid:18097f30
      if (cleanLine.trim() === '') { // time:2025-04-18T16:56:37.939Z uuid:d180d321
        return comment.trim(); // time:2025-04-18T16:56:37.939Z uuid:7da7716f
      } // time:2025-04-18T16:56:37.939Z uuid:fcda9c5a
// time:2025-04-18T16:56:37.939Z uuid:bbd180f8
      return `${cleanLine.trimEnd()}${comment}`; // time:2025-04-18T16:56:37.939Z uuid:28f6901d
    }); // time:2025-04-18T16:56:37.939Z uuid:0d6ecdb3
// time:2025-04-18T16:56:37.939Z uuid:97a75969
    fs.writeFileSync(filePath, updatedLines.join('\n')); // time:2025-04-18T16:56:37.939Z uuid:f0b0abb6
    console.log(`Updated: ${filePath}`); // time:2025-04-18T16:56:37.939Z uuid:ea761d0e
// time:2025-04-18T16:56:37.939Z uuid:93adf06e
    return backup; // time:2025-04-18T16:56:37.939Z uuid:e9392b07
  } catch (error) { // time:2025-04-18T16:56:37.939Z uuid:9f2a1d03
    console.error(`Error processing ${filePath}: ${error.message}`); // time:2025-04-18T16:56:37.939Z uuid:9a6264f9
    return null; // time:2025-04-18T16:56:37.939Z uuid:b0c96e0b
  } // time:2025-04-18T16:56:37.939Z uuid:2a9a3f00
} // time:2025-04-18T16:56:37.939Z uuid:99e37ec1
// time:2025-04-18T16:56:37.939Z uuid:3aceaee4
function processDirectory(dirPath) { // time:2025-04-18T16:56:37.939Z uuid:336311f0
  const modifiedFiles = []; // time:2025-04-18T16:56:37.939Z uuid:98a8826d
  const entries = fs.readdirSync(dirPath, { withFileTypes: true }); // time:2025-04-18T16:56:37.939Z uuid:a81783ec
// time:2025-04-18T16:56:37.939Z uuid:ef316b5a
  for (const entry of entries) { // time:2025-04-18T16:56:37.939Z uuid:09a1770a
    const fullPath = path.join(dirPath, entry.name); // time:2025-04-18T16:56:37.939Z uuid:5a67be5a
// time:2025-04-18T16:56:37.939Z uuid:2cdeaece
    if (entry.isDirectory()) { // time:2025-04-18T16:56:37.939Z uuid:a90baa18
      if (!config.excludeDirs.includes(entry.name)) { // time:2025-04-18T16:56:37.939Z uuid:4ca8c729
        const subDirResults = processDirectory(fullPath); // time:2025-04-18T16:56:37.939Z uuid:bde34fa1
        modifiedFiles.push(...subDirResults); // time:2025-04-18T16:56:37.939Z uuid:d2e4a56b
      } // time:2025-04-18T16:56:37.939Z uuid:2416547e
    } else if (entry.isFile() && /\.js$/.test(entry.name)) { // time:2025-04-18T16:56:37.939Z uuid:f808787d
      const result = addUUIDsToFile(fullPath); // time:2025-04-18T16:56:37.939Z uuid:77dc8619
      if (result) { // time:2025-04-18T16:56:37.939Z uuid:6c1af98a
        modifiedFiles.push(result); // time:2025-04-18T16:56:37.939Z uuid:320a4873
      } // time:2025-04-18T16:56:37.939Z uuid:6e2ecfd8
    } // time:2025-04-18T16:56:37.939Z uuid:a97f1300
  } // time:2025-04-18T16:56:37.939Z uuid:99b38371
// time:2025-04-18T16:56:37.939Z uuid:da80ebcb
  return modifiedFiles; // time:2025-04-18T16:56:37.939Z uuid:dd2e56fd
} // time:2025-04-18T16:56:37.939Z uuid:3fd373fc
// time:2025-04-18T16:56:37.939Z uuid:5a5770d1
function rollbackLastRun() { // time:2025-04-18T16:56:37.939Z uuid:a9e7f3be
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) { // time:2025-04-18T16:56:37.939Z uuid:8a6e7dcd
    console.log('No previous run found to rollback.'); // time:2025-04-18T16:56:37.939Z uuid:4d9cea60
    return; // time:2025-04-18T16:56:37.939Z uuid:f10be7eb
  } // time:2025-04-18T16:56:37.939Z uuid:ce4db793
// time:2025-04-18T16:56:37.939Z uuid:2c888ebf
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`); // time:2025-04-18T16:56:37.939Z uuid:7914a350
  console.log(`Files to restore: ${lastRunInfo.files.length}`); // time:2025-04-18T16:56:37.939Z uuid:4e5c925f
// time:2025-04-18T16:56:37.939Z uuid:6f348b21
  let successCount = 0; // time:2025-04-18T16:56:37.939Z uuid:22cc2daf
// time:2025-04-18T16:56:37.939Z uuid:d577cb4f
  for (const file of lastRunInfo.files) { // time:2025-04-18T16:56:37.939Z uuid:e41f0e0d
    try { // time:2025-04-18T16:56:37.939Z uuid:7339f2e6
      if (fs.existsSync(file.backupPath)) { // time:2025-04-18T16:56:37.939Z uuid:475ca31f
        const backupContent = fs.readFileSync(file.backupPath, 'utf8'); // time:2025-04-18T16:56:37.939Z uuid:22717744
        const targetPath = path.join(process.cwd(), file.relativePath); // time:2025-04-18T16:56:37.939Z uuid:db8fcaa4
// time:2025-04-18T16:56:37.939Z uuid:45bbdd66
        fs.writeFileSync(targetPath, backupContent); // time:2025-04-18T16:56:37.939Z uuid:7a2cab8f
        console.log(`Restored: ${file.relativePath}`); // time:2025-04-18T16:56:37.939Z uuid:5efd310b
        successCount++; // time:2025-04-18T16:56:37.939Z uuid:7aaef1b3
      } else { // time:2025-04-18T16:56:37.939Z uuid:1ed0d140
        console.error(`Backup not found: ${file.backupPath}`); // time:2025-04-18T16:56:37.939Z uuid:956c7666
      } // time:2025-04-18T16:56:37.939Z uuid:a2ffd78e
    } catch (error) { // time:2025-04-18T16:56:37.939Z uuid:6a635715
      console.error(`Error restoring ${file.relativePath}: ${error.message}`); // time:2025-04-18T16:56:37.939Z uuid:9965931b
    } // time:2025-04-18T16:56:37.939Z uuid:a068f770
  } // time:2025-04-18T16:56:37.939Z uuid:dfee5fd7
// time:2025-04-18T16:56:37.939Z uuid:cc1062ec
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`); // time:2025-04-18T16:56:37.939Z uuid:377d9520
// time:2025-04-18T16:56:37.939Z uuid:fa80b4bf
// time:2025-04-18T16:56:37.939Z uuid:5a40c4bb
  lastRunInfo = { // time:2025-04-18T16:56:37.939Z uuid:2d46a07a
    timestamp: null, // time:2025-04-18T16:56:37.939Z uuid:5d541315
    files: [] // time:2025-04-18T16:56:37.939Z uuid:c0257ab6
  }; // time:2025-04-18T16:56:37.939Z uuid:90841b4a
// time:2025-04-18T16:56:37.939Z uuid:f4298acf
  saveConfig(); // time:2025-04-18T16:56:37.939Z uuid:fce0436a
} // time:2025-04-18T16:56:37.939Z uuid:2ad41851
// time:2025-04-18T16:56:37.939Z uuid:0c1adc90
function runUUIDProcess() { // time:2025-04-18T16:56:37.939Z uuid:a4a8e262
  const modifiedFiles = processDirectory(process.cwd()); // time:2025-04-18T16:56:37.939Z uuid:4a7e401d
// time:2025-04-18T16:56:37.939Z uuid:89f56a63
// time:2025-04-18T16:56:37.939Z uuid:5f77ba94
  lastRunInfo = { // time:2025-04-18T16:56:37.939Z uuid:cda9a7b9
    timestamp: Date.now(), // time:2025-04-18T16:56:37.939Z uuid:9795942e
    files: modifiedFiles // time:2025-04-18T16:56:37.939Z uuid:3b91c484
  }; // time:2025-04-18T16:56:37.939Z uuid:6d9d62a0
// time:2025-04-18T16:56:37.939Z uuid:dc1f8ee7
  saveConfig(); // time:2025-04-18T16:56:37.939Z uuid:400a19f9
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`); // time:2025-04-18T16:56:37.939Z uuid:bb58d43a
} // time:2025-04-18T16:56:37.939Z uuid:24c559ea
// time:2025-04-18T16:56:37.939Z uuid:4393ec0e
function showMenu() { // time:2025-04-18T16:56:37.939Z uuid:62734c27
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.939Z uuid:92ccfadb
    input: process.stdin, // time:2025-04-18T16:56:37.939Z uuid:4f9f5294
    output: process.stdout // time:2025-04-18T16:56:37.939Z uuid:56447ed6
  }); // time:2025-04-18T16:56:37.939Z uuid:f600f9fa
// time:2025-04-18T16:56:37.939Z uuid:c53d7a88
  console.log('\nUUID CLI Configuration:'); // time:2025-04-18T16:56:37.939Z uuid:f5763e5e
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.939Z uuid:e0189af3
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.939Z uuid:a0c7b9d6
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.939Z uuid:9dd70d33
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No')); // time:2025-04-18T16:56:37.939Z uuid:881d224b
  console.log('5. Manage Excluded Directories'); // time:2025-04-18T16:56:37.939Z uuid:fb34b5db
  console.log('6. Reset to Defaults'); // time:2025-04-18T16:56:37.939Z uuid:790630fe
  console.log('7. Save and Run'); // time:2025-04-18T16:56:37.939Z uuid:c82a7356
  console.log('8. Rollback Last Run'); // time:2025-04-18T16:56:37.939Z uuid:5c77177d
  console.log('9. Exit'); // time:2025-04-18T16:56:37.939Z uuid:3e714899
// time:2025-04-18T16:56:37.939Z uuid:5d46892d
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.939Z uuid:1053eac4
    switch(answer) { // time:2025-04-18T16:56:37.939Z uuid:3e7b432b
      case '1': // time:2025-04-18T16:56:37.939Z uuid:37ec2fe6
        config.includeBranch = !config.includeBranch; // time:2025-04-18T16:56:37.939Z uuid:dcc59f4c
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:b412d0f7
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:e17ebfc7
        break; // time:2025-04-18T16:56:37.939Z uuid:f0653b79
      case '2': // time:2025-04-18T16:56:37.939Z uuid:e4e0d7dd
        config.includeCommit = !config.includeCommit; // time:2025-04-18T16:56:37.939Z uuid:93b8cc27
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:d7bc2866
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:cbde4d58
        break; // time:2025-04-18T16:56:37.939Z uuid:2710d83c
      case '3': // time:2025-04-18T16:56:37.939Z uuid:f82c8e0d
        config.includeTimestamp = !config.includeTimestamp; // time:2025-04-18T16:56:37.939Z uuid:69a10cd2
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:06ed18b6
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:03e6e745
        break; // time:2025-04-18T16:56:37.939Z uuid:5f5074d3
      case '4': // time:2025-04-18T16:56:37.939Z uuid:c3c8a37f
        config.includeLineNumber = !config.includeLineNumber; // time:2025-04-18T16:56:37.939Z uuid:995eaa7b
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:45bd21ff
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:3e3cd60a
        break; // time:2025-04-18T16:56:37.939Z uuid:8910e429
      case '5': // time:2025-04-18T16:56:37.939Z uuid:73ea7370
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:e58ff368
        showDirectoryMenu(); // time:2025-04-18T16:56:37.939Z uuid:e405c323
        break; // time:2025-04-18T16:56:37.939Z uuid:1cca4d15
      case '6': // time:2025-04-18T16:56:37.939Z uuid:e61d9205
        config = { // time:2025-04-18T16:56:37.939Z uuid:70fce670
          includeBranch: true, // time:2025-04-18T16:56:37.939Z uuid:437cecdc
          includeCommit: true, // time:2025-04-18T16:56:37.939Z uuid:dacd1137
          includeTimestamp: true, // time:2025-04-18T16:56:37.939Z uuid:23b8676c
          includeLineNumber: true, // time:2025-04-18T16:56:37.939Z uuid:55ed64eb
          excludeDirs: [...SKIP_DIRS] // time:2025-04-18T16:56:37.939Z uuid:d7b6d6f1
        }; // time:2025-04-18T16:56:37.939Z uuid:a24796d9
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:2469c2ff
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:06583426
        break; // time:2025-04-18T16:56:37.939Z uuid:76673b7d
      case '7': // time:2025-04-18T16:56:37.939Z uuid:3f527a82
        saveConfig(); // time:2025-04-18T16:56:37.939Z uuid:3ec22aa4
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:1af4901d
        runUUIDProcess(); // time:2025-04-18T16:56:37.939Z uuid:89dfa0a7
        break; // time:2025-04-18T16:56:37.939Z uuid:745e3946
      case '8': // time:2025-04-18T16:56:37.939Z uuid:c2e2236b
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:2b2acf1e
        rollbackLastRun(); // time:2025-04-18T16:56:37.939Z uuid:4d9f150d
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:6b0cb4a2
        break; // time:2025-04-18T16:56:37.939Z uuid:0984f757
      case '9': // time:2025-04-18T16:56:37.939Z uuid:ea020c58
        console.log('Exiting without changes.'); // time:2025-04-18T16:56:37.939Z uuid:ab5765c7
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:c5116661
        break; // time:2025-04-18T16:56:37.939Z uuid:3d32c431
      default: // time:2025-04-18T16:56:37.939Z uuid:cab4f090
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.939Z uuid:5097b252
        rl.close(); // time:2025-04-18T16:56:37.939Z uuid:63635dc7
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:5879959f
    } // time:2025-04-18T16:56:37.939Z uuid:782affe5
  }); // time:2025-04-18T16:56:37.939Z uuid:24e86639
} // time:2025-04-18T16:56:37.939Z uuid:867aaf04
// time:2025-04-18T16:56:37.939Z uuid:503fbba3
function showDirectoryMenu() { // time:2025-04-18T16:56:37.939Z uuid:623ac3f3
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.939Z uuid:e4def299
    input: process.stdin, // time:2025-04-18T16:56:37.939Z uuid:9a50e240
    output: process.stdout // time:2025-04-18T16:56:37.939Z uuid:bff9e620
  }); // time:2025-04-18T16:56:37.939Z uuid:da2284b4
// time:2025-04-18T16:56:37.939Z uuid:a5622f72
  console.log('\nExcluded Directories Management:'); // time:2025-04-18T16:56:37.939Z uuid:1b719410
  console.log('Currently excluded:'); // time:2025-04-18T16:56:37.939Z uuid:e7f11c2d
// time:2025-04-18T16:56:37.939Z uuid:55e9aaa7
  if (config.excludeDirs.length === 0) { // time:2025-04-18T16:56:37.939Z uuid:a8247815
    console.log('No directories excluded.'); // time:2025-04-18T16:56:37.939Z uuid:0d01432d
  } else { // time:2025-04-18T16:56:37.939Z uuid:80e249e9
    config.excludeDirs.forEach((dir, index) => { // time:2025-04-18T16:56:37.939Z uuid:bc9d7c02
      console.log(`${index + 1}. ${dir}`); // time:2025-04-18T16:56:37.939Z uuid:53114be1
    }); // time:2025-04-18T16:56:37.939Z uuid:1625b58d
  } // time:2025-04-18T16:56:37.939Z uuid:98c970fe
// time:2025-04-18T16:56:37.939Z uuid:2daeaa98
  console.log('\nOptions:'); // time:2025-04-18T16:56:37.939Z uuid:f88b19f3
  console.log('1. Add directory to exclude'); // time:2025-04-18T16:56:37.939Z uuid:e02d95b2
  console.log('2. Remove directory from exclude list'); // time:2025-04-18T16:56:37.939Z uuid:e6f70a60
  console.log('3. Back to main menu'); // time:2025-04-18T16:56:37.939Z uuid:71fe034d
// time:2025-04-18T16:56:37.939Z uuid:a473b01c
  rl.question('\nEnter option number: ', (answer) => { // time:2025-04-18T16:56:37.939Z uuid:59659ba8
    rl.close(); // time:2025-04-18T16:56:37.939Z uuid:22de3ce8
// time:2025-04-18T16:56:37.939Z uuid:26dc21d8
    switch(answer) { // time:2025-04-18T16:56:37.939Z uuid:2b973bba
      case '1': // time:2025-04-18T16:56:37.939Z uuid:675aeb11
        addExcludeDirectory(); // time:2025-04-18T16:56:37.939Z uuid:52df2dc8
        break; // time:2025-04-18T16:56:37.939Z uuid:0d4495af
      case '2': // time:2025-04-18T16:56:37.939Z uuid:068419e5
        removeExcludeDirectory(); // time:2025-04-18T16:56:37.939Z uuid:23be02d6
        break; // time:2025-04-18T16:56:37.939Z uuid:c1377391
      case '3': // time:2025-04-18T16:56:37.939Z uuid:bb74ba67
        showMenu(); // time:2025-04-18T16:56:37.939Z uuid:76911a7f
        break; // time:2025-04-18T16:56:37.939Z uuid:f80a71fc
      default: // time:2025-04-18T16:56:37.939Z uuid:bdc2e327
        console.log('Invalid option. Please try again.'); // time:2025-04-18T16:56:37.939Z uuid:763cff90
        showDirectoryMenu(); // time:2025-04-18T16:56:37.939Z uuid:f7c63eaf
    } // time:2025-04-18T16:56:37.939Z uuid:e7d2f035
  }); // time:2025-04-18T16:56:37.939Z uuid:7f4d90a5
} // time:2025-04-18T16:56:37.939Z uuid:e0771199
// time:2025-04-18T16:56:37.939Z uuid:f43e2aa9
function addExcludeDirectory() { // time:2025-04-18T16:56:37.939Z uuid:5c7ca6b0
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.939Z uuid:fc05ae4b
    input: process.stdin, // time:2025-04-18T16:56:37.939Z uuid:d02313bf
    output: process.stdout // time:2025-04-18T16:56:37.939Z uuid:326e0e54
  }); // time:2025-04-18T16:56:37.939Z uuid:0027320c
// time:2025-04-18T16:56:37.939Z uuid:60248834
  rl.question('Enter directory name to exclude: ', (dir) => { // time:2025-04-18T16:56:37.939Z uuid:03575a38
    if (dir && dir.trim()) { // time:2025-04-18T16:56:37.939Z uuid:b4a20a71
      const trimmedDir = dir.trim(); // time:2025-04-18T16:56:37.939Z uuid:5dbd9de9
// time:2025-04-18T16:56:37.939Z uuid:6b938f7b
      if (!config.excludeDirs.includes(trimmedDir)) { // time:2025-04-18T16:56:37.939Z uuid:21c8c586
        config.excludeDirs.push(trimmedDir); // time:2025-04-18T16:56:37.939Z uuid:22633af7
        console.log(`Added "${trimmedDir}" to exclude list.`); // time:2025-04-18T16:56:37.939Z uuid:a879ff46
      } else { // time:2025-04-18T16:56:37.939Z uuid:30dfb56b
        console.log(`"${trimmedDir}" is already in the exclude list.`); // time:2025-04-18T16:56:37.939Z uuid:7272f725
      } // time:2025-04-18T16:56:37.939Z uuid:d70812de
    } // time:2025-04-18T16:56:37.939Z uuid:f5a1bc6f
// time:2025-04-18T16:56:37.939Z uuid:13489d2c
    rl.close(); // time:2025-04-18T16:56:37.939Z uuid:aee74167
    showDirectoryMenu(); // time:2025-04-18T16:56:37.939Z uuid:230f15fb
  }); // time:2025-04-18T16:56:37.939Z uuid:a3c1881b
} // time:2025-04-18T16:56:37.939Z uuid:25098f42
// time:2025-04-18T16:56:37.939Z uuid:4a8a32c3
function removeExcludeDirectory() { // time:2025-04-18T16:56:37.939Z uuid:f89a3d08
  if (config.excludeDirs.length === 0) { // time:2025-04-18T16:56:37.939Z uuid:51154e73
    console.log('No directories to remove.'); // time:2025-04-18T16:56:37.939Z uuid:1744859d
    showDirectoryMenu(); // time:2025-04-18T16:56:37.939Z uuid:60238013
    return; // time:2025-04-18T16:56:37.939Z uuid:9040d64c
  } // time:2025-04-18T16:56:37.939Z uuid:f1a523d0
// time:2025-04-18T16:56:37.939Z uuid:aca3cb13
  const rl = readline.createInterface({ // time:2025-04-18T16:56:37.939Z uuid:14525c91
    input: process.stdin, // time:2025-04-18T16:56:37.939Z uuid:d55e4185
    output: process.stdout // time:2025-04-18T16:56:37.939Z uuid:35370721
  }); // time:2025-04-18T16:56:37.939Z uuid:61bc4344
// time:2025-04-18T16:56:37.939Z uuid:0af8e8b5
  rl.question('Enter number of directory to remove (or 0 to cancel): ', (input) => { // time:2025-04-18T16:56:37.939Z uuid:1f90a633
    const index = parseInt(input, 10) - 1; // time:2025-04-18T16:56:37.939Z uuid:fee3d3f3
// time:2025-04-18T16:56:37.939Z uuid:eb3e164e
    if (index === -1) { // time:2025-04-18T16:56:37.939Z uuid:4188f9b3
// time:2025-04-18T16:56:37.939Z uuid:64d1f785
      rl.close(); // time:2025-04-18T16:56:37.939Z uuid:1ff11d4a
      showDirectoryMenu(); // time:2025-04-18T16:56:37.939Z uuid:3653ea83
      return; // time:2025-04-18T16:56:37.939Z uuid:18010dad
    } // time:2025-04-18T16:56:37.939Z uuid:1914221a
// time:2025-04-18T16:56:37.939Z uuid:ec6210d3
    if (isNaN(index) || index < 0 || index >= config.excludeDirs.length) { // time:2025-04-18T16:56:37.939Z uuid:ff6688ca
      console.log('Invalid number. Please try again.'); // time:2025-04-18T16:56:37.939Z uuid:62a823fb
    } else { // time:2025-04-18T16:56:37.939Z uuid:57eea00f
      const removedDir = config.excludeDirs[index]; // time:2025-04-18T16:56:37.939Z uuid:4d2b324c
// time:2025-04-18T16:56:37.939Z uuid:b1beaf7a
// time:2025-04-18T16:56:37.939Z uuid:ffb43c32
      if (SKIP_DIRS.includes(removedDir)) { // time:2025-04-18T16:56:37.939Z uuid:c7bc5e17
        console.log(`Cannot remove built-in excluded directory "${removedDir}".`); // time:2025-04-18T16:56:37.939Z uuid:1b71e0f3
      } else { // time:2025-04-18T16:56:37.939Z uuid:6ee0ac9c
        config.excludeDirs.splice(index, 1); // time:2025-04-18T16:56:37.939Z uuid:85dea4fb
        console.log(`Removed "${removedDir}" from exclude list.`); // time:2025-04-18T16:56:37.939Z uuid:8b543168
      } // time:2025-04-18T16:56:37.939Z uuid:98a199c8
    } // time:2025-04-18T16:56:37.939Z uuid:31809837
// time:2025-04-18T16:56:37.939Z uuid:db29d062
    rl.close(); // time:2025-04-18T16:56:37.939Z uuid:eab67eaa
    showDirectoryMenu(); // time:2025-04-18T16:56:37.939Z uuid:d636fe78
  }); // time:2025-04-18T16:56:37.939Z uuid:5992dba2
} // time:2025-04-18T16:56:37.939Z uuid:45857e1c
// time:2025-04-18T16:56:37.939Z uuid:dc10a308
// time:2025-04-18T16:56:37.939Z uuid:298392f5
function main() { // time:2025-04-18T16:56:37.939Z uuid:dc7778f8
  loadConfig(); // time:2025-04-18T16:56:37.939Z uuid:c3d3b499
// time:2025-04-18T16:56:37.939Z uuid:c33af919
  if (process.argv.length > 2) { // time:2025-04-18T16:56:37.939Z uuid:a36dde96
    if (process.argv[2] === '--run') { // time:2025-04-18T16:56:37.939Z uuid:bb0d6ada
// time:2025-04-18T16:56:37.939Z uuid:1d17c949
      runUUIDProcess(); // time:2025-04-18T16:56:37.939Z uuid:c6298927
    } else if (process.argv[2] === '--rollback') { // time:2025-04-18T16:56:37.939Z uuid:45a3a955
// time:2025-04-18T16:56:37.939Z uuid:5c6f3b9e
      rollbackLastRun(); // time:2025-04-18T16:56:37.939Z uuid:6ab6a0cb
    } else if (process.argv[2] === '--exclude' && process.argv.length > 3) { // time:2025-04-18T16:56:37.939Z uuid:22a22599
// time:2025-04-18T16:56:37.939Z uuid:cb965951
      const dir = process.argv[3].trim(); // time:2025-04-18T16:56:37.939Z uuid:64be9112
      if (dir && !config.excludeDirs.includes(dir)) { // time:2025-04-18T16:56:37.939Z uuid:f7aad896
        config.excludeDirs.push(dir); // time:2025-04-18T16:56:37.939Z uuid:c2490acb
        console.log(`Added "${dir}" to exclude list.`); // time:2025-04-18T16:56:37.939Z uuid:cb338c20
        saveConfig(); // time:2025-04-18T16:56:37.939Z uuid:93ac0be0
      } else { // time:2025-04-18T16:56:37.939Z uuid:161c9278
        console.log(`"${dir}" is already in exclude list or invalid.`); // time:2025-04-18T16:56:37.939Z uuid:220b42c3
      } // time:2025-04-18T16:56:37.939Z uuid:5a418f8b
    } else if (process.argv[2] === '--list-exclude') { // time:2025-04-18T16:56:37.939Z uuid:8258ab81
// time:2025-04-18T16:56:37.939Z uuid:477054e6
      console.log('Excluded directories:'); // time:2025-04-18T16:56:37.939Z uuid:a8dd70fc
      config.excludeDirs.forEach(dir => console.log(`- ${dir}`)); // time:2025-04-18T16:56:37.939Z uuid:972ca502
    } else { // time:2025-04-18T16:56:37.939Z uuid:c1ad18eb
      console.log('Unknown command. Available commands: --run, --rollback, --exclude <dir>, --list-exclude'); // time:2025-04-18T16:56:37.939Z uuid:eafa89d4
    } // time:2025-04-18T16:56:37.939Z uuid:44909024
  } else { // time:2025-04-18T16:56:37.939Z uuid:ab95f7e6
// time:2025-04-18T16:56:37.939Z uuid:7f259fcf
    showMenu(); // time:2025-04-18T16:56:37.939Z uuid:1bbb905b
  } // time:2025-04-18T16:56:37.939Z uuid:c35b8d80
} // time:2025-04-18T16:56:37.939Z uuid:b3c80ed3
// time:2025-04-18T16:56:37.939Z uuid:26b701a8
main(); // time:2025-04-18T16:56:37.939Z uuid:d389abfb