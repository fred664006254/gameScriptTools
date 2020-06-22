#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "生成微信上类名挂window文件"
/usr/local/bin/node wxinclude.js