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
rm -rf ./dockers
rm -rf ./scripts
rm ./package.json
rm ./Dockerfile
rm ./yarn.lock
rm ./docker-compose.yml

mv ../built-production ./
mv ../built ./
mv ../dockers ./
mv ../scripts ./
mv ../package.json ./
mv ../Dockerfile ./
mv ../yarn.lock ./
mv ../docker-compose.yml ./

# Push
git add -A
git commit -m "travis build"
git push origin built