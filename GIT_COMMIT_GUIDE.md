# Guide: Pushing Commits for Each File Separately

This guide explains how to commit and push individual files with proper commit messages in Git.

## Method 1: Using git add for Individual Files

### Step 1: Check Status

```
bash
git status
```

### Step 2: Stage Individual Files

Stage one file at a time:

```
bash
git add filename1.js
```

Or stage multiple files individually (one at a time):

```
bash
git add src/config/config.js
git add src/services/riskEngine.js
git add src/routes/checkout.js
```

### Step 3: Commit Each File Separately

After staging a file, commit it with a descriptive message:

```
bash
git commit -m "Add configuration module for risk engine settings"
```

### Step 4: Push to Remote

```
bash
git push origin master
```

## Method 2: Commit Each File Immediately (Recommended)

For more control, stage and commit each file individually in sequence:

### Example Workflow:

```
bash
# Stage and commit first file
git add src/config/config.js
git commit -m "Add configuration module with environment variables"

# Stage and commit second file
git add src/services/riskEngine.js
git commit -m "Implement core risk engine service"

# Stage and commit third file
git add src/routes/checkout.js
git commit -m "Add checkout route with risk validation"

# Stage and commit fourth file
git add src/app.js
git commit -m "Initialize Express app with middleware"

# Stage and commit test file
git add tests/riskEngine.test.js
git commit -m "Add unit tests for risk engine"

# Now push all commits
git push origin master
```

## Method 3: Using -p Flag (Patch Mode)

For more granular control within files:

```
bash
git add -p filename.js
```

This allows you to interactively select specific hunks to stage.

## Best Practices for Commit Messages

1. **Use imperative mood**: "Add feature" not "Added feature"
2. **Keep first line under 50 characters**
3. **Describe what changed and why**
4. **Reference issue numbers if applicable**

### Good Commit Message Examples:

```
Add risk scoring algorithm to transaction engine

Implemented ML-based risk scoring that analyzes:
- Transaction amount patterns
- User history metrics
- Device fingerprinting data

Fixes #123
```

```
Update configuration module with environment variables

Added support for:
- API_TIMEOUT settings
- RISK_THRESHOLD configuration
- LOG_LEVEL environment variable
```

## Quick Reference Commands

```
bash
# See what will be committed
git diff --cached

# See differences
git diff

# Unstage a file
git reset HEAD filename.js

# Amend last commit (if not pushed)
git commit --amend -m "New message"

# View commit history
git log --oneline
```

## Important Notes

- **Always run `git status`** before committing to see what files are modified
- **Push after each commit** or batch several commits together
- **Never push sensitive data** (check .gitignore)
- **Write meaningful commit messages** that explain the "why" not just the "what"
