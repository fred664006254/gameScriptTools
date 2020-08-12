#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "发布本地tag包"
tag=$1
echo "同步svn"
$DIR/../syncSvn/updateTag.sh $tag || exit 1
$DIR/../syncSvn/updatePublish.sh 'tag' localtest || exit 1
echo "发布"
sh $DIR/../../../client/tags/$tag/publish_h5_all.sh 'tags' 'local' || exit 1

echo "提交svn"
$DIR/../syncSvn/commitPublish.sh 'tag' localtest || exit 1
