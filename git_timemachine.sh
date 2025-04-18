#!/bin/sh

# Git Time Machine - Navigate between commits easily
# Save as git-timemachine or git_timemachine.sh and make executable with:
# chmod +x git_timemachine.sh

# Initialize variables
COMMIT_LIST=""
COMMIT_DATES=""
COMMIT_MSGS=""
CURRENT_INDEX=-1
BRANCH=""
ORIGINAL_POSITION=""
LIMIT=10

# Function to display help message
show_help() {
    echo "Git Time Machine - Navigate between commits easily"
    echo ""
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -b, --branch <branch>   Specify which branch to use (default: current branch)"
    echo "  -n, --number <number>   Number of recent commits to load (default: 10)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Navigation Commands:"
    echo "  n, next      - Move to newer commit"
    echo "  p, prev      - Move to older commit"
    echo "  g, goto <n>  - Go to specific commit number"
    echo "  l, list      - List available commits"
    echo "  c, current   - Show current position"
    echo "  r, return    - Return to original position"
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

# Function to load commit history
load_commits() {
    # Save original position
    ORIGINAL_POSITION=$(git rev-parse HEAD)
    
    echo "Loading commit history..."
    
    # Store the commits in temporary files to avoid subshell issues
    git log --pretty=format:"%H" --date=short -n "$LIMIT" $BRANCH > /tmp/git_tm_hashes.txt
    git log --pretty=format:"%ad" --date=short -n "$LIMIT" $BRANCH > /tmp/git_tm_dates.txt
    git log --pretty=format:"%s" --date=short -n "$LIMIT" $BRANCH > /tmp/git_tm_msgs.txt
    
    # Read the files
    COMMIT_LIST=$(cat /tmp/git_tm_hashes.txt | tr '\n' ' ')
    COMMIT_DATES=$(cat /tmp/git_tm_dates.txt | tr '\n' ' ')
    COMMIT_MSGS=$(cat /tmp/git_tm_msgs.txt | tr '\n' '::')
    
    # Cleanup
    rm -f /tmp/git_tm_hashes.txt /tmp/git_tm_dates.txt /tmp/git_tm_msgs.txt
    
    # Set current position to the most recent commit
    CURRENT_INDEX=1
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
load_commits
list_commits

# Interactive loop
while true; do
    echo ""
    echo "Enter command (n=next, p=prev, g=goto, l=list, c=current, r=return, q=quit):"
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
            ;;
        r|return)
            return_to_original
            ;;
        q|quit)
            echo "Exiting Git Time Machine..."
            return_to_original
            exit 0
            ;;
        *)
            echo "Unknown command. Type 'l' to list commits, 'q' to quit."
            ;;
    esac
done