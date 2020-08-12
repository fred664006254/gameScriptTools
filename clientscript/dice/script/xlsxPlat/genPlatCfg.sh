#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "生成平台配置"
rm -rf $DIR/../../../client/trunk/Dice/resource/config/plat/
mkdir $DIR/../../../client/trunk/Dice/resource/config/plat/
/usr/local/bin/node $DIR/app.js $DIR/../../config/plat/plat.xlsx $DIR/../../../client/trunk/Dice/resource/config/plat/