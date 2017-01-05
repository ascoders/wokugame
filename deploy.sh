#!/bin/bash

# Set Git config
git config --global user.name "ascoders"
git config --global user.email 576625322@qq.com
git remote add deploy git@github.com:ascoders/wokugame.git

# Checkout to built branch
#git remote -v
#git branch -a
#
#echo "set branches"
#git remote set-branches --add deploy built
#git fetch
#
#echo "set finish"
#
#git remote -v
#git branch -a
#
#git checkout -b built -- deploy/built

git branch built deploy/built

git checkout built

git add -A
git commit -m "build"

# Push to built branch
git push deploy built