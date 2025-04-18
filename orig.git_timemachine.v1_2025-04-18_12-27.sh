# Original file: git_timemachine.sh 
# Version date: Fri Apr 18 12:28:01 PM EDT 2025 
# Git branch: feat/git-time-machine 
# Last commit: test: script keeps breaking w/ zsh syntax nuances, porting to node 

# NEW VERSION - Original backed up to: orig.git_timemachine_2025-04-18_12-26.sh 
# Version date: Fri Apr 18 12:26:29 PM EDT 2025 
# Git branch: feat/git-time-machine 
# Last commit: test: script requires ability to navigate recurseively between local branches and then commit states 
# Function to list available branches
list_branches() {
    echo "Available branches:"
    echo "================="
    
    current_displayed_branch=$(git branch --show-current)
    
    # Use git branch to show branches with current indicator
    git branch | while read branch_line; do
        if echo "$branch_line" | grep -q "^\*"; then
            # Current branch
            echo "$branch_line"
        else
            echo "$branch_line"
        fi
    done
    
    echo "================="
}

# Function to switch to a different branch
switch_branch() {
    branch_name=$1
    
    # Check if branch exists
    if ! git show-ref --verify --quiet refs/heads/"$branch_name"; then
        echo "Error: Branch '$branch_name' does not exist!"
        return 1
    fi
    
    echo "Switching to branch: $branch_name"
    git checkout "$branch_name" --quiet
    CURRENT_BRANCH="$branch_name"
    
    # Reload commits for this branch
    load_commits "$CURRENT_BRANCH"
    list_commits
}#!/bin/sh

# Git Time Machine - Navigate between branches and commits
# Save as git_timemachine.sh and make executable with:
# chmod +x git_timemachine.sh

# Initialize variables
COMMIT_LIST=""
COMMIT_DATES=""
COMMIT_MSGS=""
CURRENT_INDEX=-1
BRANCH=""
CURRENT_BRANCH=""
ORIGINAL_BRANCH=""
ORIGINAL_POSITION=""
LIMIT=10
BRANCH_LIST=""

# Function to display help message
show_help() {
    echo "Git Time Machine - Navigate between branches and commits"
    echo ""
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -b, --branch <branch>   Specify which branch to start with (default: current branch)"
    echo "  -n, --number <number>   Number of recent commits to load per branch (default: 10)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Navigation Commands:"
    echo "  n, next      - Move to newer commit"
    echo "  p, prev      - Move to older commit"
    echo "  g, goto <n>  - Go to specific commit number"
    echo "  l, list      - List available commits in current branch"
    echo "  c, current   - Show current position"
    echo "  r, return    - Return to original position"
    echo "  b, branches  - List available branches"
    echo "  s, switch <branch> - Switch to different branch"
    echo "  q, quit      - Exit the time machine"
    echo ""
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo "Error: Not in a git repository!"
        exit 1
    fi
}

# Function to load branches
load_branches() {
    echo "Loading branches..."
    BRANCH_LIST=$(git branch | sed 's/^[ *]*//' | tr '\n' ' ')
    
    # Save original branch
    ORIGINAL_BRANCH=$(git branch --show-current)
    CURRENT_BRANCH=$ORIGINAL_BRANCH
    
    echo "Available branches: $BRANCH_LIST"
    echo "Current branch: $CURRENT_BRANCH"
}

# Function to load commit history for a branch
load_commits() {
    branch_name=$1
    if [ -z "$branch_name" ]; then
        branch_name=$CURRENT_BRANCH
    fi
    
    echo "Loading commits for branch: $branch_name"
    
    # Store the commits in temporary files to avoid subshell issues
    git log --pretty=format:"%H" --date=short -n "$LIMIT" "$branch_name" > /tmp/git_tm_hashes.txt
    git log --pretty=format:"%ad" --date=short -n "$LIMIT" "$branch_name" > /tmp/git_tm_dates.txt
    git log --pretty=format:"%s" --date=short -n "$LIMIT" "$branch_name" > /tmp/git_tm_msgs.txt
    
    # Read the files
    COMMIT_LIST=$(cat /tmp/git_tm_hashes.txt | tr '\n' ' ')
    COMMIT_DATES=$(cat /tmp/git_tm_dates.txt | tr '\n' ' ')
    COMMIT_MSGS=$(cat /tmp/git_tm_msgs.txt | tr '\n' '::')
    
    # Cleanup
    rm -f /tmp/git_tm_hashes.txt /tmp/git_tm_dates.txt /tmp/git_tm_msgs.txt
    
    # Set current position to the most recent commit
    CURRENT_INDEX=1
}

# Function to initialize the time machine
initialize() {
    # Save original position
    ORIGINAL_POSITION=$(git rev-parse HEAD)
    
    # Load branches and commits
    load_branches
    load_commits "$CURRENT_BRANCH"
}

# Function to get commit hash by index
get_commit() {
    echo "$COMMIT_LIST" | tr ' ' '\n' | sed -n "$1p"
}

# Function to get commit date by index
get_date() {
    echo "$COMMIT_DATES" | tr ' ' '\n' | sed -n "$1p"
}

# Function to get commit message by index
get_message() {
    echo "$COMMIT_MSGS" | tr '::' '\n' | sed -n "$1p"
}

# Function to count commits
count_commits() {
    echo "$COMMIT_LIST" | tr ' ' '\n' | grep -c .
}

# Function to list available commits
list_commits() {
    echo "Available commits:"
    echo "==================="
    
    count=$(count_commits)
    i=1
    while [ "$i" -le "$count" ]; do
        marker=" "
        if [ "$i" -eq "$CURRENT_INDEX" ]; then
            marker=">"
        fi
        date=$(get_date "$i")
        msg=$(get_message "$i")
        echo "$marker [$i] $date - $msg"
        i=$((i + 1))
    done
    
    echo "==================="
}

# Function to show current position
show_current() {
    if [ "$CURRENT_INDEX" -ge 0 ]; then
        date=$(get_date "$CURRENT_INDEX")
        msg=$(get_message "$CURRENT_INDEX")
        echo "Current position: [$CURRENT_INDEX] $date - $msg"
    else
        echo "No position selected yet"
    fi
}

# Function to go to a specific commit
goto_commit() {
    local idx=$1
    count=$(count_commits)
    
    if [ "$idx" -lt 1 ] || [ "$idx" -gt "$count" ]; then
        echo "Error: Invalid commit index!"
        return 1
    fi
    
    date=$(get_date "$idx")
    msg=$(get_message "$idx")
    commit=$(get_commit "$idx")
    
    echo "Checking out: [$idx] $date - $msg"
    git checkout "$commit" --quiet
    CURRENT_INDEX=$idx
    show_current
}

# Function to go to the next (newer) commit
next_commit() {
    if [ "$CURRENT_INDEX" -gt 1 ]; then
        goto_commit $((CURRENT_INDEX - 1))
    else
        echo "Already at the newest commit!"
    fi
}

# Function to go to the previous (older) commit
prev_commit() {
    count=$(count_commits)
    if [ "$CURRENT_INDEX" -lt "$count" ]; then
        goto_commit $((CURRENT_INDEX + 1))
    else
        echo "Already at the oldest commit!"
    fi
}

# Function to return to the original position
return_to_original() {
    echo "Returning to original position..."
    git checkout "$ORIGINAL_POSITION" --quiet
    
    # Find the current index again
    count=$(count_commits)
    i=1
    while [ "$i" -le "$count" ]; do
        commit=$(get_commit "$i")
        if [ "$commit" = "$ORIGINAL_POSITION" ]; then
            CURRENT_INDEX=$i
            break
        fi
        i=$((i + 1))
    done
    
    show_current
}

# Parse command line arguments
while [ $# -gt 0 ]; do
    case $1 in
        -b|--branch)
            BRANCH="$2"
            shift 2
            ;;
        -n|--number)
            LIMIT="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Main program
check_git_repo
initialize
list_commits

# Interactive loop
while true; do
    echo ""
    echo "Enter command (n=next, p=prev, g=goto, l=list, c=current, r=return, b=branches, s=switch, q=quit):"
    read command args
    
    case "$command" in
        n|next)
            next_commit
            ;;
        p|prev)
            prev_commit
            ;;
        g|goto)
            goto_commit "$args"
            ;;
        l|list)
            list_commits
            ;;
        c|current)
            show_current
            echo "Current branch: $CURRENT_BRANCH"
            ;;
        r|return)
            return_to_original
            ;;
        b|branches)
            list_branches
            ;;
        s|switch)
            switch_branch "$args"
            ;;
        q|quit)
            echo "Exiting Git Time Machine..."
            # Return to original position and branch
            git checkout "$ORIGINAL_BRANCH" --quiet
            git checkout "$ORIGINAL_POSITION" --quiet
            exit 0
            ;;
        *)
            echo "Unknown command. Type 'l' to list commits, 'b' to list branches, 'q' to quit."
            ;;
    esac
done