#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "发布本地分支包"
branche=$1
echo "同步svn"
$DIR/../syncSvn/updateBranche.sh $branche || exit 1
$DIR/../syncSvn/updatePublish.sh 'branche' localtest || exit 1
echo "发布"
sh $DIR/../../../client/branches/$branche/publish_h5_all.sh 'tags' 'local' || exit 1

echo "提交svn"
$DIR/../syncSvn/commitPublish.sh 'branche' localtest || exit 1
