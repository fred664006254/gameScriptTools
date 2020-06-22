#!/bin/bash

# while [ -h "$SOURCE"  ]; do
#     DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
# done
# DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

DIR=$(cd `dirname $0`; pwd)

cd $DIR

svnfile=$1
if [[ $svnfile == '' ]];then
    echo '没有指定目录'
    exit 1
fi
cd $svnfile

moreStat=`svn stat | grep \\!`
if [[ $moreStat != '' ]];then
    svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
fi
svn add * --force || exit 1
svn commit -m "自动打包上传" || exit 1
