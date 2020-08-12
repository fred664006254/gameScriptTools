#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "上传svn trunk language"
cd $DIR/../../../client/trunk/Dice/resource/config/language/ || exit 1
removel=`svn stat | grep \\! | awk '{print $2}' | xargs`
if [[ ${#removel} != 0 ]] ; 
then
    svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
fi
svn add * --force || exit 1
svn commit -m "自动打包上传 cn" || exit 1