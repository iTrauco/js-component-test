// Original file: uuidd-cli.js 
// Version date: Fri Apr 18 12:59:43 PM EDT 2025 
// Git branch: fix/uuidd-cli-script-ok 
// Last commit: test: bug in script, reworking 

// NEW VERSION - Original backed up to: orig.uuidd-cli.v5_2025-04-18_12-55.js 
// Version date: Fri Apr 18 12:55:07 PM EDT 2025 
// Git branch: fix/uuidd-cli-script-ok 
// Last commit: enhancing script with directory exclusion logic stored in state config 

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const readline = require('readline');

const CONFIG_FILE = '.uuid-cli-config.json';
const BACKUP_DIR = '.uuid-cli-backups';
const SCRIPT_FILENAME = path.basename(__filename);
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage', BACKUP_DIR];

// Default configuration
let config = {
  includeBranch: true,
  includeCommit: true,
  includeTimestamp: true,
  includeLineNumber: true,
  excludeDirs: [...SKIP_DIRS]
};

// Track the last run info
let lastRunInfo = {
  timestamp: null,
  files: []
};

function generateShortUUID() {
  return crypto.randomBytes(4).toString('hex');
}

function getGitInfo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    let branch = null;
    
    // Method 1: Try symbolic-ref HEAD
    try {
      branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim();
    } catch (e) {
      console.log('Could not get branch via symbolic-ref:', e.message);
    }
    
    // Method 2: Try git status if still null
    if (!branch) {
      try {
        const gitStatusOutput = execSync('git status', { encoding: 'utf8' });
        const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/);
        if (branchMatch && branchMatch[1]) {
          branch = branchMatch[1];
        }
      } catch (e) {
        console.log('Could not get branch via git status:', e.message);
      }
    }
    
    // Method 3: Try environment variables if still null
    if (!branch) {
      if (process.env.BRANCH_NAME) {
        branch = process.env.BRANCH_NAME;
      } else if (process.env.GIT_BRANCH) {
        branch = process.env.GIT_BRANCH;
      }
    }
    
    // Method 4: Last attempt with show-current
    if (!branch) {
      try {
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      } catch (e) {
        console.log('Could not get branch via show-current:', e.message);
      }
    }
    
    // Get commit info
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    
    console.log('Debug - Detected Git Info:', { branch, lastCommit });
    return { branch, lastCommit };
  } catch (error) {
    console.log('Git info detection error:', error.message);
    return { branch: null, lastCommit: null };
  }
}

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const fileContent = fs.readFileSync(CONFIG_FILE, 'utf8');
      const data = JSON.parse(fileContent);
      
      // Load config
      if (data.config) {
        config = data.config;
      }
      
      // Load last run info
      if (data.lastRun) {
        lastRunInfo = data.lastRun;
      }
      
      console.log('Loaded configuration:', config);
    }
  } catch (error) {
    console.error('Error loading config:', error.message);
  }
}

function saveConfig() {
  try {
    // Save both config and last run info
    const data = {
      config,
      lastRun: lastRunInfo
    };
    
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
    console.log('Configuration saved.');
  } catch (error) {
    console.error('Error saving config:', error.message);
  }
}

function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`Created backup directory: ${BACKUP_DIR}`);
  }
}

function backupFile(filePath) {
  try {
    ensureBackupDir();
    
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const relativePath = path.relative(process.cwd(), filePath);
    const backupPath = path.join(BACKUP_DIR, `${fileName}.${Date.now()}.bak`);
    
    fs.writeFileSync(backupPath, content);
    return { relativePath, backupPath };
  } catch (error) {
    console.error(`Error backing up ${filePath}: ${error.message}`);
    return null;
  }
}

function addUUIDsToFile(filePath) {
  try {
    if (path.basename(filePath) === SCRIPT_FILENAME) {
      console.log(`Skipping self: ${filePath}`);
      return null;
    }
    
    // Create backup first
    const backup = backupFile(filePath);
    if (!backup) return null;
    
    const { branch, lastCommit } = getGitInfo();
    const timestamp = new Date().toISOString();
    
    // Debug log for git info
    console.log(`Git info for ${filePath}: branch=${branch}, commit=${lastCommit}`);
    
    // Build meta info string based on config
    let metaParts = [];
    if (config.includeBranch && branch) metaParts.push(`branch:${branch}`);
    if (config.includeCommit && lastCommit) metaParts.push(`commit:${lastCommit}`);
    if (config.includeTimestamp) metaParts.push(`time:${timestamp}`);
    const metaInfo = metaParts.join('|');
    
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    const updatedLines = lines.map((line, index) => {
      const lineNumber = index + 1;
      let cleanLine = line;
      
      if (line.includes('// ')) {
        cleanLine = line.substring(0, line.indexOf('// '));
      }
      
      let comment = ' // ';
      if (metaInfo) comment += `${metaInfo} `;
      if (config.includeLineNumber) comment += `line:${lineNumber} `;
      comment += `uuid:${generateShortUUID()}`;
      
      if (cleanLine.trim() === '') {
        return comment.trim();
      }
      
      return `${cleanLine.trimEnd()}${comment}`;
    });
    
    fs.writeFileSync(filePath, updatedLines.join('\n'));
    console.log(`Updated: ${filePath}`);
    
    return backup;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return null;
  }
}

function processDirectory(dirPath) {
  const modifiedFiles = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  // Initialize excludeDirs if undefined
  if (!config.excludeDirs) {
    config.excludeDirs = [...SKIP_DIRS];
  }
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      if (!config.excludeDirs.includes(entry.name)) {
        const subDirResults = processDirectory(fullPath);
        modifiedFiles.push(...subDirResults);
      }
    } else if (entry.isFile() && /\.js$/.test(entry.name)) {
      const result = addUUIDsToFile(fullPath);
      if (result) {
        modifiedFiles.push(result);
      }
    }
  }
  
  return modifiedFiles;
}

function rollbackLastRun() {
  if (!lastRunInfo.timestamp || lastRunInfo.files.length === 0) {
    console.log('No previous run found to rollback.');
    return;
  }
  
  console.log(`Rolling back run from ${new Date(lastRunInfo.timestamp).toLocaleString()}`);
  console.log(`Files to restore: ${lastRunInfo.files.length}`);
  
  let successCount = 0;
  
  for (const file of lastRunInfo.files) {
    try {
      if (fs.existsSync(file.backupPath)) {
        const backupContent = fs.readFileSync(file.backupPath, 'utf8');
        const targetPath = path.join(process.cwd(), file.relativePath);
        
        fs.writeFileSync(targetPath, backupContent);
        console.log(`Restored: ${file.relativePath}`);
        successCount++;
      } else {
        console.error(`Backup not found: ${file.backupPath}`);
      }
    } catch (error) {
      console.error(`Error restoring ${file.relativePath}: ${error.message}`);
    }
  }
  
  console.log(`Rollback completed. Restored ${successCount} of ${lastRunInfo.files.length} files.`);
  
  // Clear the last run info
  lastRunInfo = {
    timestamp: null,
    files: []
  };
  
  saveConfig();
}

function runUUIDProcess() {
  const modifiedFiles = processDirectory(process.cwd());
  
  // Update last run info
  lastRunInfo = {
    timestamp: Date.now(),
    files: modifiedFiles
  };
  
  saveConfig();
  console.log(`Run completed. Modified ${modifiedFiles.length} files.`);
}

function showMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\nUUID CLI Configuration:');
  console.log('1. Include Branch Name: ' + (config.includeBranch ? 'Yes' : 'No'));
  console.log('2. Include Last Commit: ' + (config.includeCommit ? 'Yes' : 'No'));
  console.log('3. Include Timestamp: ' + (config.includeTimestamp ? 'Yes' : 'No'));
  console.log('4. Include Line Numbers: ' + (config.includeLineNumber ? 'Yes' : 'No'));
  console.log('5. Manage Excluded Directories');
  console.log('6. Reset to Defaults');
  console.log('7. Save and Run');
  console.log('8. Rollback Last Run');
  console.log('9. Exit');
  
  rl.question('\nEnter option number: ', (answer) => {
    switch(answer) {
      case '1':
        config.includeBranch = !config.includeBranch;
        rl.close();
        showMenu();
        break;
      case '2':
        config.includeCommit = !config.includeCommit;
        rl.close();
        showMenu();
        break;
      case '3':
        config.includeTimestamp = !config.includeTimestamp;
        rl.close();
        showMenu();
        break;
      case '4':
        config.includeLineNumber = !config.includeLineNumber;
        rl.close();
        showMenu();
        break;
      case '5':
        rl.close();
        showDirectoryMenu();
        break;
      case '6':
        config = {
          includeBranch: true,
          includeCommit: true,
          includeTimestamp: true,
          includeLineNumber: true,
          excludeDirs: [...SKIP_DIRS]
        };
        rl.close();
        showMenu();
        break;
      case '7':
        saveConfig();
        rl.close();
        runUUIDProcess();
        break;
      case '8':
        rl.close();
        rollbackLastRun();
        showMenu();
        break;
      case '9':
        console.log('Exiting without changes.');
        rl.close();
        break;
      default:
        console.log('Invalid option. Please try again.');
        rl.close();
        showMenu();
    }
  });
}

function showDirectoryMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('\nExcluded Directories Management:');
  console.log('Currently excluded:');
  
  // Initialize excludeDirs if undefined
  if (!config.excludeDirs) {
    config.excludeDirs = [...SKIP_DIRS];
  }
  
  if (config.excludeDirs.length === 0) {
    console.log('No directories excluded.');
  } else {
    config.excludeDirs.forEach((dir, index) => {
      console.log(`${index + 1}. ${dir}`);
    });
  }
  
  console.log('\nOptions:');
  console.log('1. Add directory to exclude');
  console.log('2. Remove directory from exclude list');
  console.log('3. Back to main menu');
  
  rl.question('\nEnter option number: ', (answer) => {
    rl.close();
    
    switch(answer) {
      case '1':
        addExcludeDirectory();
        break;
      case '2':
        removeExcludeDirectory();
        break;
      case '3':
        showMenu();
        break;
      default:
        console.log('Invalid option. Please try again.');
        showDirectoryMenu();
    }
  });
}

function addExcludeDirectory() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Enter directory name to exclude: ', (dir) => {
    if (dir && dir.trim()) {
      const trimmedDir = dir.trim();
      
      if (!config.excludeDirs.includes(trimmedDir)) {
        config.excludeDirs.push(trimmedDir);
        console.log(`Added "${trimmedDir}" to exclude list.`);
      } else {
        console.log(`"${trimmedDir}" is already in the exclude list.`);
      }
    }
    
    rl.close();
    showDirectoryMenu();
  });
}

function removeExcludeDirectory() {
  if (config.excludeDirs.length === 0) {
    console.log('No directories to remove.');
    showDirectoryMenu();
    return;
  }
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Enter number of directory to remove (or 0 to cancel): ', (input) => {
    const index = parseInt(input, 10) - 1;
    
    if (index === -1) {
      // User entered 0, cancel
      rl.close();
      showDirectoryMenu();
      return;
    }
    
    if (isNaN(index) || index < 0 || index >= config.excludeDirs.length) {
      console.log('Invalid number. Please try again.');
    } else {
      const removedDir = config.excludeDirs[index];
      
      // Don't allow removing built-in directories
      if (SKIP_DIRS.includes(removedDir)) {
        console.log(`Cannot remove built-in excluded directory "${removedDir}".`);
      } else {
        config.excludeDirs.splice(index, 1);
        console.log(`Removed "${removedDir}" from exclude list.`);
      }
    }
    
    rl.close();
    showDirectoryMenu();
  });
}

// Main entry point
function main() {
  loadConfig();
  
  // Initialize excludeDirs if undefined
  if (!config.excludeDirs) {
    config.excludeDirs = [...SKIP_DIRS];
  }
  
  if (process.argv.length > 2) {
    if (process.argv[2] === '--run') {
      // Direct run mode
      runUUIDProcess();
    } else if (process.argv[2] === '--rollback') {
      // Direct rollback mode
      rollbackLastRun();
    } else if (process.argv[2] === '--exclude' && process.argv.length > 3) {
      // Add directory to exclude list
      const dir = process.argv[3].trim();
      if (dir && !config.excludeDirs.includes(dir)) {
        config.excludeDirs.push(dir);
        console.log(`Added "${dir}" to exclude list.`);
        saveConfig();
      } else {
        console.log(`"${dir}" is already in exclude list or invalid.`);
      }
    } else if (process.argv[2] === '--list-exclude') {
      // List excluded directories
      console.log('Excluded directories:');
      config.excludeDirs.forEach(dir => console.log(`- ${dir}`));
    } else {
      console.log('Unknown command. Available commands: --run, --rollback, --exclude <dir>, --list-exclude');
    }
  } else {
    // Interactive mode
    showMenu();
  }
}

main();