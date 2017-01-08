#!/bin/bash

# Set Git config
git config --global user.name "ascoders"
git config --global user.email 576625322@qq.com
git remote add deploy git@github.com:ascoders/wokugame.git

# Clone built branch
git clone -b built --depth 1 git@github.com:ascoders/wokugame.git branchs
cd branchs

# Move build result
rm -rf ./built-production
rm -rf ./built
rm ./package.json
rm ./Dockerfile
rm ./yarn.lock

mv ../built-production ./
mv ../built ./
mv ../package.json ./
mv ../Dockerfile ./
mv ../yarn.lock ./

# Push
git add -A
git commit -m "travis build"
git push origin built