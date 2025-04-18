// NEW VERSION - Original backed up to: orig.git_time_machine_2025-04-18_12-29.js 
// Version date: Fri Apr 18 12:30:03 PM EDT 2025 
// Git branch: feat/git-time-machine 
// Last commit: test: script keeps breaking w/ zsh syntax nuances, porting to node 

const { execSync } = require('child_process');
const readline = require('readline');

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Core variables
let commits = [];
let branches = [];
let currentIndex = -1;
let currentBranch = '';
let originalBranch = '';
let originalPosition = '';

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
  try {
    const output = execSync('git branch').toString().trim();
    branches = output.split('\n').map(b => b.trim().replace(/^\* /, ''));
    originalBranch = execSync('git branch --show-current').toString().trim();
    currentBranch = originalBranch;
    return true;
  } catch (e) {
    console.error(`Error loading branches: ${e.message}`);
    return false;
  }
}

// Load commits for a branch
function loadCommits(branchName) {
  const branch = branchName || currentBranch;
  
  try {
    const output = execSync(`git log --pretty=format:"%H|%ad|%s" --date=short -n 20 ${branch}`).toString().trim();
    
    commits = [];
    if (output) {
      commits = output.split('\n').map(line => {
        const [hash, date, message] = line.split('|');
        return { hash, date, message };
      });
    }
    
    currentIndex = commits.length > 0 ? 0 : -1;
    return true;
  } catch (e) {
    console.error(`Error loading commits: ${e.message}`);
    return false;
  }
}

// Initialize
function initialize() {
  try {
    originalPosition = execSync('git rev-parse HEAD').toString().trim();
    return loadBranches() && loadCommits(currentBranch);
  } catch (e) {
    console.error(`Error initializing: ${e.message}`);
    return false;
  }
}

// List commits
function listCommits() {
  console.log('\nCommits in branch:', currentBranch);
  console.log('-------------------');
  
  if (commits.length === 0) {
    console.log('No commits found');
  } else {
    commits.forEach((commit, i) => {
      const marker = i === currentIndex ? '>' : ' ';
      console.log(`${marker} [${i}] ${commit.date} - ${commit.message}`);
    });
  }
}

// List branches
function listBranches() {
  console.log('\nAvailable branches:');
  console.log('------------------');
  
  branches.forEach(branch => {
    const marker = branch === currentBranch ? '*' : ' ';
    console.log(`${marker} ${branch}`);
  });
}

// Show current position
function showCurrent() {
  if (currentIndex >= 0 && commits.length > 0) {
    const commit = commits[currentIndex];
    console.log(`Current: [${currentIndex}] ${commit.date} - ${commit.message} (${currentBranch})`);
  } else {
    console.log(`Current branch: ${currentBranch}, no commit selected`);
  }
}

// Go to specific commit
function gotoCommit(idx) {
  idx = parseInt(idx);
  
  if (isNaN(idx) || idx < 0 || idx >= commits.length) {
    console.log('Invalid commit number');
    return;
  }
  
  try {
    execSync(`git checkout ${commits[idx].hash} --quiet`);
    currentIndex = idx;
    showCurrent();
  } catch (e) {
    console.error(`Error checking out commit: ${e.message}`);
  }
}

// Switch to a different branch
function switchBranch(branchName) {
  if (!branches.includes(branchName)) {
    console.log(`Branch '${branchName}' not found`);
    return;
  }
  
  try {
    execSync(`git checkout ${branchName} --quiet`);
    currentBranch = branchName;
    loadCommits(currentBranch);
    listCommits();
  } catch (e) {
    console.error(`Error switching branch: ${e.message}`);
  }
}

// Show menu
function showMenu() {
  console.log('\nCommands:');
  console.log('  1. View commits');
  console.log('  2. View branches');
  console.log('  3. Switch branch');
  console.log('  4. Next commit (newer)');
  console.log('  5. Prev commit (older)');
  console.log('  6. Go to commit #');
  console.log('  7. Show current');
  console.log('  8. Return to starting point');
  console.log('  9. Quit');
}

// Interactive menu loop
function startMenu() {
  showMenu();
  
  rl.question('\nEnter choice (1-9): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        listCommits();
        startMenu();
        break;
      case '2':
        listBranches();
        startMenu();
        break;
      case '3':
        rl.question('Enter branch name: ', (branch) => {
          switchBranch(branch.trim());
          startMenu();
        });
        break;
      case '4':
        if (currentIndex > 0) {
          gotoCommit(currentIndex - 1);
        } else {
          console.log('Already at the newest commit');
        }
        startMenu();
        break;
      case '5':
        if (currentIndex < commits.length - 1) {
          gotoCommit(currentIndex + 1);
        } else {
          console.log('Already at the oldest commit');
        }
        startMenu();
        break;
      case '6':
        rl.question('Enter commit number: ', (num) => {
          gotoCommit(num.trim());
          startMenu();
        });
        break;
      case '7':
        showCurrent();
        startMenu();
        break;
      case '8':
        try {
          execSync(`git checkout ${originalPosition} --quiet`);
          console.log('Returned to starting point');
          
          // Update current index
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
        startMenu();
        break;
      case '9':
        console.log('Exiting...');
        // Return to original state
        try {
          execSync(`git checkout ${originalBranch} --quiet`);
        } catch (e) {
          console.error(`Error returning to original branch: ${e.message}`);
        }
        rl.close();
        break;
      default:
        console.log('Invalid choice');
        startMenu();
        break;
    }
  });
}

// Main program
function main() {
  console.log('Git Time Machine');
  console.log('---------------');
  
  if (!checkGitRepo()) {
    rl.close();
    return;
  }
  
  if (!initialize()) {
    console.log('Failed to initialize. Exiting...');
    rl.close();
    return;
  }
  
  showCurrent();
  startMenu();
}

// Start the program
main();
