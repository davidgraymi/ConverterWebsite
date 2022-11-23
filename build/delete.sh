#!/bin/sh

# Deletes local, remote, and reference branch

git push origin -d $1
git branch -d $1