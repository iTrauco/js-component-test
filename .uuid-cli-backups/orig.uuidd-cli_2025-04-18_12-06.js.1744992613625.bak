// Original file: uuidd-cli.js 
// Version date: Fri Apr 18 12:06:26 PM EDT 2025 
// Git branch: HEAD 
// Last commit: feat: uuidd cli anhor testing 

#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const readline = require('readline');

const CONFIG_FILE = '.uuid-cli-config.json';
const SCRIPT_FILENAME = path.basename(__filename);
const SKIP_DIRS = ['node_modules', 'dist', 'build', '.git', 'coverage'];

// Default configuration
let config = {
  includeBranch: true,
  includeCommit: true,
  includeTimestamp: true,
  includeLineNumber: true
};

function generateShortUUID() {
  return crypto.randomBytes(4).toString('hex');
}

function getGitInfo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const lastCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    return { branch, lastCommit };
  } catch {
    return { branch: null, lastCommit: null };
  }
}

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      console.log('Loaded configuration:', config);
    }
  } catch (error) {
    console.error('Error loading config:', error.message);
  }
}

function saveConfig() {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('Configuration saved.');
  } catch (error) {
    console.error('Error saving config:', error.message);
  }
}

function addUUIDsToFile(filePath) {
  try {
    if (path.basename(filePath) === SCRIPT_FILENAME) {
      console.log(`Skipping self: ${filePath}`);
      return;
    }
    
    const { branch, lastCommit } = getGitInfo();
    const timestamp = new Date().toISOString();
    
    // Build meta info string based on config
    let metaParts = [];
    if (config.includeBranch && branch) metaParts.push(branch);
    if (config.includeCommit && lastCommit) metaParts.push(lastCommit);
    if (config.includeTimestamp) metaParts.push(timestamp);
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
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.includes(entry.name)) {
        processDirectory(fullPath);
      }
    } else if (entry.isFile() && /\.js$/.test(entry.name)) {
      addUUIDsToFile(fullPath);
    }
  }
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
  console.log('7. Exit');

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
        processDirectory(process.cwd());
        break;
      case '7':
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
  
  if (process.argv.length > 2 && process.argv[2] === '--run') {
    // Direct run mode
    processDirectory(process.cwd());
  } else {
    // Interactive mode
    showMenu();
  }
}

main();
