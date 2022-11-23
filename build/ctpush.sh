#!/bin/sh

# Creates branch locally and remotely, and checks it out

git add .
echo "Enter a commit message"
read -a msg
git commit -m $msg
git push origin