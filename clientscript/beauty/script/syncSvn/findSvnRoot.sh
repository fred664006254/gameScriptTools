#!/bin/bash

#根据路径获取.svn目录的路径

DIR=$(cd `dirname $0`; pwd)
cd $DIR

targetPath=$1

if [[ $targetPath == '' ]];then
    echo '需要指定目录'
    exit 1
fi

# l=${#targetPath}
function findRootDir()
{
    tmpPath=$1
    if [[ $1 == '/' ]];then
        echo $tmpPath '不是svn目录，退出'
        exit 1
    fi

    if [[ -d $tmpPath ]];then
        cd $tmpPath
        if [[ -d $tmpPath'/.svn' ]];then
            echo $tmpPath
        else
            cd ..
            findRootDir `pwd`
        fi
    else
        echo '不存在' $tmpPath '，退出'
        exit 1
    fi
}

findRootDir $targetPath