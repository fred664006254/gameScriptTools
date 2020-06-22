#!/bin/bash

# SOURCE="$0"
# while [ -h "$SOURCE"  ]; do
#     filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
# done
# filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
filepath=$(cd `dirname $0`; pwd)
cd $filepath

echo "发布本地测试包"

plat=$1
childFile=$2

if [[ $plat == '' ]];then
    plat="local"
fi

echo "同步svn"
$filepath/../syncSvn/updateTrunk.sh $childFile || exit 1 &
$filepath/../syncSvn/updatePublish.sh $plat localtest || exit 1
wait
echo "发布"
# if [[ $childFile == 'json' ]];then
#     echo $childFile
# elif [[ $childFile == 'language' ]];then
#     $filepath/../syncSvn/updatePublicLanguage.sh || exit 1

#     defaultname=`ls $filepath/../../../publishclient/localtest/local/gt_local/resource/default*.res.json`
#     echo "default:" $defaultname
#     /usr/local/bin/node $filepath/../versionMd5/buildResourcesVersionRename.js $defaultname || exit 1
# else
    if [[ $childFile != '' ]];then
        # rsync -r --delete --exclude='*.svn*' --exclude='*tags' $filepath/../../../client/trunk/PalaceWar/resource/config/language/ $filepath/../../../publishclient/localtest/local/gt_local/resource/config/language/
        fromChildFile=`sh $filepath/../cfg/clientFilePathCfg.sh trunk PalaceWar $childFile`
        toChildFile=`sh  ../cfg/publishFilePathCfg.sh $plat localtest $childFile`
        echo 'from' $fromChildFile
        echo 'to' $toChildFile

        rsync -r --delete --exclude='*.svn*' --exclude='*tags' $fromChildFile $toChildFile
    fi
    if [[ $plat == 'euilocal' ]];then
        sh $filepath/../../../client/tags/PalaceWarEuiTag/publish_h5_all.sh $plat 'local' $childFile || exit 1
    else
        sh $filepath/../../../client/trunk/PalaceWar/publish_h5_all.sh $plat 'local' $childFile || exit 1
    fi
# fi

echo "提交svn"
$filepath/../syncSvn/commitPublish.sh $plat localtest || exit 1
