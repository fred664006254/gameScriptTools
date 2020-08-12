#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "只生成default"

/usr/local/bin/node $DIR/defaultGenOnly.js $1
