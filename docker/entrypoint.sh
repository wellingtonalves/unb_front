#!/bin/sh

set -e
echo "[ . ][0%] Container Build - Starting Entrypoint of Application"
echo "[ **** ][40%] Run yarn install..."
yarn
echo "[ ********** ][100%] Container Build - Ending Entrypoint of Application"
exec "$@"
