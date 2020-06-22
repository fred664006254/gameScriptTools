#!/bin/bash
# 生成目标index的版本号 $1 目标index所在的目录
# $2 js/manifest 或者 res/resource/default
DIR=$(cd `dirname $0`; pwd)
cd $DIR

gameFile=$1
target=$2
# gameFile='/Users/develop/h5/gt_h5/publishclient/localtest/local/gt_local/'
indexPath=''
indexName=''

if [[ $gameFile == '' ]];then
    echo '需要指定目录'
    exit 1
fi
l=${#gameFile}
lastchar=${gameFile:$l-1:$l}
if [[ $lastchar == '/' ]];then
    gameFile=${gameFile:0:$l-1}
elif [[ ${gameFile:$l-5:$l} == '.html' ]];then
    indexPath=$gameFile
    indexName="index.html"
elif [[ ${gameFile:$l-4:$l} == '.php' ]];then
    indexPath=$gameFile
    indexName="index.php"
fi

if [[ $indexPath == '' ]];then
    if [[ -f $gameFile/index.html ]];then
        indexPath=$gameFile/index.html
        indexName="index.html"
    elif [[ -f $gameFile/index.php ]];then
        indexPath=$gameFile/index.php
        indexName="index.php"
    fi
fi

defaultStr=`cat $indexPath | grep 'var defaultResJsonName='`
defaultStr=${defaultStr// /}
defaultStr=${defaultStr//vardefaultResJsonName=\"/}
defaultStr=${defaultStr//\"*/}

manifestStr=`cat $indexPath | grep 'var manifestJsonName='`
manifestStr=${manifestStr// /}
manifestStr=${manifestStr//varmanifestJsonName=\"/}
manifestStr=${manifestStr//\"*/}

if [[ $manifestStr == '' ]];then
    manifestname='manifest.json'
else
    manifestname=$manifestStr
fi

if [[ $defaultStr == '' ]];then
    defaultname='default.res.json'
else
    defaultname=$defaultStr
fi
if [[ $target == 'js' ]] || [[ $target =~ 'manifest' ]];then
    echo $manifestname
elif [[ $target == 'default' ]] || [[ $target =~ 'res' ]];then
    echo $defaultname
fi