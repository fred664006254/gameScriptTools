#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

plat=$1
echo "上传svn publish $plat"
if [[ "$plat" == "localtest" ]]; then
	cd $DIR/../../../publishclient/$plat || exit 1
else
	cd $DIR/../../../publishclient/$plat || exit 1
fi
svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
svn add * --force || exit 1
svn commit -m "自动打包上传" || exit 1