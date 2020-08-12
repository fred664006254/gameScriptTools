#!/bin/bash
# 生成目标目录default.res.json的版本号 $1 目标index所在的目录

DIR=$(cd `dirname $0`; pwd)
cd $DIR

gameFile=$1
plat=$2
# gameFile='/Users/develop/h5/gt_h5/publishclient/localtest/local/gt_local'
defaultPath=''
scriptpath=$DIR/../versionMd5

if [[ $gameFile == '' ]];then
    echo '需要指定目录'
    exit 1
fi

l=${#gameFile}
lastchar=${gameFile:$l-1:$l}
if [[ $lastchar == '/' ]];then
    gameFile=${gameFile:0:$l-1}
elif [[ ${gameFile:$l-5:$l} == '.json' ]];then
    defaultPath=$gameFile
fi

if [[ $defaultPath == '' ]];then
    if [[ -f $gameFile/index.html ]];then
        indexPath=$gameFile/index.html
    elif [[ -f $gameFile/index.php ]];then
        indexPath=$gameFile/index.php
    fi
fi

defaultStr=`cat $indexPath | grep 'var defaultResJsonName='`
defaultStr=${defaultStr// /}
defaultStr=${defaultStr//vardefaultResJsonName=\"/}
defaultStr=${defaultStr//\"*/}
if [[ $defaultStr == '' ]];then
    defaultStr='default.res.json'
fi

if [[ $defaultPath == '' ]];then
    defaultPath=$gameFile/resource/$defaultStr
fi
echo $defaultPath
if [[ "$plat" =~ "shenhe" ]] ; then
    echo $plat " 问号带md5"
    /usr/local/bin/node $scriptpath/buildResourcesVersion.js $defaultPath || exit 1
else
    echo "所有平台 用改文件名的方式"
    if [[ "$plat" == "en" ]] ; then
        /usr/local/bin/node $scriptpath/buildResourcesVersionRename.js $defaultPath 3 || exit 1
    else
        /usr/local/bin/node $scriptpath/buildResourcesVersionRename.js $defaultPath || exit 1
    fi
fi