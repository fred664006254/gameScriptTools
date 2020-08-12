#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "上传svn trunk shield"
cd $DIR/../../../client/trunk/Composegt/resource/config/shield/ || exit 1
svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
svn add * --force || exit 1
svn commit -m "自动打包上传 shield" || exit 1