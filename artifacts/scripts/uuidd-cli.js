// NEW VERSION - Original backed up to: orig.uuidd-cli.v2_2025-04-18_12-14.js 
// Version date: Fri Apr 18 12:15:00 PM EDT 2025 
// Git branch: HEAD 
// Last commit: test: branch still missing commit hash present 

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
  includeLineNumber: true
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
    let branch;
    
    // Try to get branch from environment variable first
    if (process.env.BRANCH_NAME) {
      branch = process.env.BRANCH_NAME;
    } else if (process.env.GIT_BRANCH) {
      branch = process.env.GIT_BRANCH;
    } else {
      // Fall back to git command - try multiple methods
      try {
        branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        
        // If branch is empty, try alternative command
        if (!branch) {
          const gitStatusOutput = execSync('git status', { encoding: 'utf8' });
          const branchMatch = gitStatusOutput.match(/On branch ([^\s]+)/);
          if (branchMatch && branchMatch[1]) {
            branch = branchMatch[1];
          }
        }
      } catch (branchError) {
        console.log('Error getting branch name:', branchError.message);
      }
    }
    
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
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
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) {
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
  console.log('5. Reset to Defaults');
  console.log('6. Save and Run');
  console.log('7. Rollback Last Run');
  console.log('8. Exit');
  
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
        config = {
          includeBranch: true,
          includeCommit: true,
          includeTimestamp: true,
          includeLineNumber: true
        };
        rl.close();
        showMenu();
        break;
      case '6':
        saveConfig();
        rl.close();
        runUUIDProcess();
        break;
      case '7':
        rl.close();
        rollbackLastRun();
        showMenu();
        break;
      case '8':
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

// Main entry point
function main() {
  loadConfig();
  
  if (process.argv.length > 2) {
    if (process.argv[2] === '--run') {
      // Direct run mode
      runUUIDProcess();
    } else if (process.argv[2] === '--rollback') {
      // Direct rollback mode
      rollbackLastRun();
    } else {
      console.log('Unknown command. Available commands: --run, --rollback');
    }
  } else {
    // Interactive mode
    showMenu();
  }
}

main();