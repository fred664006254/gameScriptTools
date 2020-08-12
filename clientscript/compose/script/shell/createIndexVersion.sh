#!/bin/bash
# 生成目标index的版本号 $1 目标index所在的目录
DIR=$(cd `dirname $0`; pwd)
cd $DIR

gameFile=$1
# gameFile='/Users/develop/h5/compose/publishclient/localtest/local/gt_local/'
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

if [ -f $gameFile/$manifestname ];then
    mv $gameFile/$manifestname $gameFile/.$manifestname
    rm -rf $gameFile/manifest_*.json
    mv $gameFile/.$manifestname $gameFile/$manifestname
    
    newmanifestname='manifest_'`crc32 $gameFile/$manifestname`'.json'
    mv $gameFile/$manifestname $gameFile/$newmanifestname
fi

if [ -f $gameFile/resource/$defaultname ];then
    mv $gameFile/resource/$defaultname $gameFile/resource/.$defaultname
    rm -rf $gameFile/resource/default_*.res.json
    mv $gameFile/resource/.$defaultname $gameFile/resource/$defaultname
    
    newdefaultname='default_'`crc32 $gameFile/resource/$defaultname`'.res.json'
    mv $gameFile/resource/$defaultname $gameFile/resource/$newdefaultname
fi

echo $manifestname '>>' $newmanifestname
echo $defaultname '>>' $newdefaultname

if [[ $gameFile =~ "/wanba/" ]] || [[ $gameFile =~ "/3k/" ]];then
    cp -r $gameFile/resource/$newdefaultname $gameFile/resource/default.res.json
    cp -r $gameFile/$newmanifestname $gameFile/manifest.json
fi

if [ -f $indexPath ];then
    cd $gameFile/
    sed -i ""  "s/var defaultResJsonName=\"default.*/var defaultResJsonName=\"$newdefaultname\";/" $indexName
    sed -i ""  "s/var manifestJsonName=\"manifest.*/var manifestJsonName=\"$newmanifestname\";/" $indexName
fi