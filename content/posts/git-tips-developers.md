---
title: "Git Tips That Actually Save Time"
date: "2025-01-25"
excerpt: "Useful Git commands and tricks that I wish I knew earlier."
author: "TechBlog Team"
tags: ["Git", "DevOps", "Tools"]
readTime: "4 min read"
---

# Git Tips That Actually Save Time

Let's be real... we all use like 5 Git commands most of the time. But there's some good stuff that can make your life easier.

## Aliases Are Your Friend

First thing, set up some aliases. Add these to your `.gitconfig`:

```bash
[alias]
  co = checkout
  br = branch
  st = status
  last = log -1 HEAD
  undo = reset HEAD~1
```

Now you can type `git st` instead of `git status`. Small thing, but it adds up.

## Useful Commands

### See What Changed

Want to see what you changed before committing?

```bash
git diff --staged
```

### Oops, Wrong Branch

Started working on the wrong branch? No problem:

```bash
git stash
git checkout correct-branch
git stash pop
```

### Clean Commit History

Interactive rebase is powerful. You can squash commits, reorder them, edit messages:

```bash
git rebase -i HEAD~3  # Work with last 3 commits
```

### Find Who Broke It

Someone introduced a bug? Git blame shows you who changed each line:

```bash
git blame filename.js
```

But honestly, it's usually you from 6 months ago...

## Working with Remotes

### Update Your Fork

Keep your fork updated with the original repo:

```bash
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git merge upstream/main
```

### Delete Remote Branch

Cleaned up locally but the remote branch is still there?

```bash
git push origin --delete branch-name
```

## Pro Tips

- Use `git add -p` to stage specific parts of a file
- `git log --oneline --graph` gives you a nice visual history
- `.gitignore` works retroactively with `git rm -r --cached .`
- Commit early, commit often (you can always squash later)

The best Git tip? Don't be afraid to mess up. You can almost always undo things in Git. Just maybe don't force push to main...
