#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

if [[ $1 == '' ]];then
    echo '请指定渠道'
    exit 1
fi

language=$1 || exit 1
echo "发布本地语言包$language"

echo "同步svn"
$DIR/../syncSvn/updateTrunk.sh || exit 1
$DIR/../syncSvn/updatePublish.sh $language localtest || exit 1

sh $DIR/../../../client/trunk/PalaceWar/publish_h5_all.sh $language local || exit 1

# rsync -r --delete $DIR/../../../外网地址/$language $DIR/../../../publishclient/localtest/ || exit 1

echo "提交svn"
$DIR/../syncSvn/commitPublish.sh $language localtest || exit 1
