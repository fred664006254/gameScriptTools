#!/bin/bash

# while [ -h "$SOURCE"  ]; do
#     DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
# done
# DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

DIR=$(cd `dirname $0`; pwd)
cd $DIR

targetPath=$1

# svn cleanup $1 || exit 1
if [[ `svn st` != '' ]];then
    lockst=`svn stat $targetPath | grep \\L`
    clashst = `svn stat $targetPath | grep ^C`
    if [[ $lockst != '' ]] || [[ $clashst != '' ]] ;then
        svnpath=`$DIR/findSvnRoot.sh $targetPath`
        echo '.svn目录' $svnpath
        svn cleanup $svnpath
    fi
    svn revert -R $targetPath  || exit 1
    svn stat $targetPath | grep \\? | awk '{print $2}' | xargs rm -rf || exit 1
fi
svn update $targetPath || exit 1
