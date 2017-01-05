#!/bin/bash

# Set Git config
git config --global user.name "ascoders"
git config --global user.email 576625322@qq.com
git remote add deploy git@github.com:ascoders/wokugame.git

git clone git@github.com:ascoders/wokugame.git branchs
cd branchs

git remote -v
git branch -a

git checkout -b built origin/built
mv ../built-production ./
git add -A
git commit -m "travis build"
git push