// Original file: git_time_machine.js 
// Version date: Fri Apr 18 12:30:03 PM EDT 2025 
// Git branch: feat/git-time-machine 
// Last commit: test: script keeps breaking w/ zsh syntax nuances, porting to node 

#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

// Initialize variables
let commits = [];
let branches = [];
let currentIndex = -1;
let currentBranch = '';
let originalBranch = '';
let originalPosition = '';
let limit = 10;

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if we're in a git repository
function checkGitRepo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    console.error('Error: Not in a git repository!');
    return false;
  }
}

// Load branches
function loadBranches() {
  console.log('Loading branches...');
  
  // Get all branches
  const output = execSync('git branch').toString().trim();
  branches = output.split('\n').map(b => b.trim().replace(/^\* /, ''));
  
  // Get current branch
  originalBranch = execSync('git branch --show-current').toString().trim();
  currentBranch = originalBranch;
  
  console.log(`Available branches: ${branches.join(', ')}`);
  console.log(`Current branch: ${currentBranch}`);
}

// Load commits for a branch
function loadCommits(branchName = null) {
  const branch = branchName || currentBranch;
  
  console.log(`Loading commits for branch: ${branch}`);
  
  // Get commit info
  const output = execSync(`git log --pretty=format:"%H|%ad|%s" --date=short -n ${limit} ${branch}`).toString().trim();
  
  // Clear previous commits
  commits = [];
  
  // Parse commits
  if (output) {
    commits = output.split('\n').map(line => {
      const [hash, date, message] = line.split('|');
      return { hash, date, message };
    });
  }
  
  // Set current position to the most recent commit
  currentIndex = commits.length > 0 ? 0 : -1;
}

// Initialize
function initialize() {
  // Save original position
  originalPosition = execSync('git rev-parse HEAD').toString().trim();
  
  // Load branches and commits
  loadBranches();
  loadCommits(currentBranch);
}

// List commits
function listCommits() {
  console.log('Available commits:');
  console.log('===================');
  
  if (commits.length === 0) {
    console.log('No commits found');
  } else {
    commits.forEach((commit, i) => {
      const marker = i === currentIndex ? '>' : ' ';
      console.log(`${marker} [${i}] ${commit.date} - ${commit.message}`);
    });
  }
  
  console.log('===================');
}

// List branches
function listBranches() {
  console.log('Available branches:');
  console.log('===================');
  
  branches.forEach(branch => {
    const marker = branch === currentBranch ? '* ' : '  ';
    console.log(`${marker}${branch}`);
  });
  
  console.log('===================');
}

// Show current position
function showCurrent() {
  if (currentIndex >= 0 && commits.length > 0) {
    const commit = commits[currentIndex];
    console.log(`Current position: [${currentIndex}] ${commit.date} - ${commit.message}`);
    console.log(`Current branch: ${currentBranch}`);
  } else {
    console.log('No position selected');
    console.log(`Current branch: ${currentBranch}`);
  }
}

// Go to specific commit
function gotoCommit(idx) {
  idx = parseInt(idx);
  
  if (isNaN(idx) || idx < 0 || idx >= commits.length) {
    console.log('Error: Invalid commit index!');
    return;
  }
  
  const commit = commits[idx];
  console.log(`Checking out: [${idx}] ${commit.date} - ${commit.message}`);
  
  try {
    execSync(`git checkout ${commit.hash} --quiet`);
    currentIndex = idx;
    showCurrent();
  } catch (e) {
    console.error(`Error checking out commit: ${e.message}`);
  }
}

// Go to next (newer) commit
function nextCommit() {
  if (currentIndex > 0) {
    gotoCommit(currentIndex - 1);
  } else {
    console.log('Already at the newest commit!');
  }
}

// Go to previous (older) commit
function prevCommit() {
  if (currentIndex < commits.length - 1) {
    gotoCommit(currentIndex + 1);
  } else {
    console.log('Already at the oldest commit!');
  }
}

// Return to original position
function returnToOriginal() {
  console.log('Returning to original position...');
  
  try {
    execSync(`git checkout ${originalPosition} --quiet`);
    
    // Find the current index again
    for (let i = 0; i < commits.length; i++) {
      if (commits[i].hash === originalPosition) {
        currentIndex = i;
        break;
      }
    }
    
    showCurrent();
  } catch (e) {
    console.error(`Error returning to original position: ${e.message}`);
  }
}

// Switch to a different branch
function switchBranch(branchName) {
  if (!branchName) {
    console.log('Error: Branch name required!');
    return;
  }
  
  if (!branches.includes(branchName)) {
    console.log(`Error: Branch '${branchName}' does not exist!`);
    return;
  }
  
  console.log(`Switching to branch: ${branchName}`);
  
  try {
    execSync(`git checkout ${branchName} --quiet`);
    currentBranch = branchName;
    
    // Reload commits for this branch
    loadCommits(currentBranch);
    listCommits();
  } catch (e) {
    console.error(`Error switching branch: ${e.message}`);
  }
}

// Help message
function showHelp() {
  console.log('Git Time Machine - Navigate between branches and commits');
  console.log('');
  console.log('Navigation Commands:');
  console.log('  n, next      - Move to newer commit');
  console.log('  p, prev      - Move to older commit');
  console.log('  g <n>, goto <n>  - Go to specific commit number');
  console.log('  l, list      - List available commits in current branch');
  console.log('  c, current   - Show current position');
  console.log('  r, return    - Return to original position');
  console.log('  b, branches  - List available branches');
  console.log('  s <branch>, switch <branch> - Switch to different branch');
  console.log('  h, help      - Show this help message');
  console.log('  q, quit      - Exit the time machine');
  console.log('');
}

// Main command processor
function processCommand(input) {
  const [command, ...args] = input.trim().split(' ');
  
  switch (command) {
    case 'n':
    case 'next':
      nextCommit();
      break;
    case 'p':
    case 'prev':
      prevCommit();
      break;
    case 'g':
    case 'goto':
      gotoCommit(args[0]);
      break;
    case 'l':
    case 'list':
      listCommits();
      break;
    case 'c':
    case 'current':
      showCurrent();
      break;
    case 'r':
    case 'return':
      returnToOriginal();
      break;
    case 'b':
    case 'branches':
      listBranches();
      break;
    case 's':
    case 'switch':
      switchBranch(args[0]);
      break;
    case 'h':
    case 'help':
      showHelp();
      break;
    case 'q':
    case 'quit':
      console.log('Exiting Git Time Machine...');
      // Return to original branch and position
      try {
        execSync(`git checkout ${originalBranch} --quiet`);
        execSync(`git checkout ${originalPosition} --quiet`);
      } catch (e) {
        console.error(`Error returning to original state: ${e.message}`);
      }
      rl.close();
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log("Type 'h' for help.");
      break;
  }
}

// Main loop
function startTimeMachine() {
  if (!checkGitRepo()) {
    rl.close();
    return;
  }
  
  initialize();
  listCommits();
  showHelp();
  
  function prompt() {
    rl.question('\nEnter command: ', (answer) => {
      if (answer.trim() === 'q' || answer.trim() === 'quit') {
        processCommand(answer);
      } else {
        processCommand(answer);
        prompt();
      }
    });
  }
  
  prompt();
}

// Start the time machine
startTimeMachine();