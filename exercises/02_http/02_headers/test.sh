#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

if [ ! -d "/usr/local/lib/node_modules/eslint" ]; then
    echo "looks like you don't have eslint installed... fixing this."
    npm install -g eslint
fi

eval "eslint . >/dev/null; exit $?"

if [exit]; then
    echo "looks like you have some issue with your code..."
    echo "run the ${GREEN}eslint .${NC} command to see what needs fixing"
    echo " when your code is fixed run this script again."
    exit 1 
fi

# npm uninstall -g eslint

exit 0

# Black        0;30     Dark Gray     1;30
# Red          0;31     Light Red     1;31
# Green        0;32     Light Green   1;32
# Brown/Orange 0;33     Yellow        1;33
# Blue         0;34     Light Blue    1;34
# Purple       0;35     Light Purple  1;35
# Cyan         0;36     Light Cyan    1;36
# Light Gray   0;37     White         1;37