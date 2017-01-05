#!/bin/bash

# Set Git config
git config --global user.name "ascoders"
git config --global user.email 576625322@qq.com
git remote add deploy git@github.com:ascoders/wokugame.git

# Clone built branch
git clone -b built git@github.com:ascoders/wokugame.git branchs
cd branchs

rm -rf built-production
mv ../built-production ./

git add -A
git commit -m "travis build"
git push origin built