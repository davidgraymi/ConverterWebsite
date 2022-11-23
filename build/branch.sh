#!/bin/sh

# Creates branch locally and remotely, and checks it out

git branch $1
git push --set-upstream origin $1
git checkout $1