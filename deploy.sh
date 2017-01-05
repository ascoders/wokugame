#!/bin/bash

# Set Git config
git config --global user.name "ascoders"
git config --global user.email 576625322@qq.com
git remote add deploy git@github.com:ascoders/wokugame.git

# Checkout to built branch
git fetch
git checkout -b built deploy/built
git add -A
git commit -m "build"

# Push to built branch
git push deploy built