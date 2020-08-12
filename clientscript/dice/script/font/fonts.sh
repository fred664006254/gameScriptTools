#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR
 node node/getTxt.js
 node node/minFont.js

