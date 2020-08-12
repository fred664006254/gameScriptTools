#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "发布本地tag包"
tag=$1
echo "同步svn"
$DIR/../syncSvn/updateTag.sh $tag || exit 1
$DIR/../syncSvn/updatePublish.sh 'tag' localtest || exit 1
$DIR/../syncSvn/updateTrunk.sh || exit 1

echo "生成配置"
# rsync -r --delete --exclude='*.svn*' $DIR/../../../public/shield/ $DIR/../../../client/tags/$tag/resource/config/shield/ || exit 1
# rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/trunk/Composegt/resource/config/json/ $DIR/../../../client/tags/$tag/resource/config/json/ || exit 1

configPath='/Users/publish/h5/compose/config'
jsonPath=$DIR/../../../client/tags/$tag/resource/config/json/

svn update
cd $configPath
svn update

cd $jsonPath
svn revert -R .
svn update
/usr/local/bin/lua  /Users/publish/h5/compose/clientscript/script/lua/tool/merge.lua $configPath $jsonPath || exit 1

echo "提交svn"
$DIR/../syncSvn/commitTag.sh $tag || exit 1
echo "发布1111"
echo $DIR/../../../client/tags/$tag/
sh $DIR/../../../client/tags/$tag/publish_h5_all.sh 'tag' 'local' || exit 1

echo "提交svn"
$DIR/../syncSvn/commitPublish.sh 'tag' localtest || exit 1
