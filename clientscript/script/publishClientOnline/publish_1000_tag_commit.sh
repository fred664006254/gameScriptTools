#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

plat=$1
echo "开始提交线上测试目录:$plat"

$DIR/../syncSvn/commitPublish.sh $plat || exit 1

for file in `ls $DIR/../../../publishclient/$plat | grep 'gt_test'$plat'_'`
do
    $DIR/../syncSvn/commitPublish.sh ${file//gt_test/} || exit 1
done
