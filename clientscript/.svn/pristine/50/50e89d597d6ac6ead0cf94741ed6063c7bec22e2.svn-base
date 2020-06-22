#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "上传svn trunk res"
cd $DIR/../../../client/trunk/PalaceWar/resource || exit 1
svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
svn add * --force || exit 1
svn commit -m "自动同步资源 PalaceWar/resource" || exit 1

cd $DIR/../../../client/trunk/resoucres_multi || exit 1
svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
svn add * --force || exit 1
svn commit -m "自动同步资源 multi" || exit 1

cd $DIR/../../../client/trunk || exit 1
svn commit resMd5.json -m "自动同步资源 resMd5" || exit 1