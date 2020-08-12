#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
plat=$2
echo "发布线上1000测试tag:$tag plat:$plat"

echo "同步svn trunk"
$DIR/../syncSvn/updateTrunk.sh || exit 1
echo "同步svn tag"
$DIR/../syncSvn/updateTag.sh $tag || exit 1
echo "同步publish"
$DIR/../syncSvn/updatePublish.sh $plat || exit 1

tmpplat=$plat
if [[ $plat =~ "iosshenhe" ]] ;
then
    tmpplat='iosshenhe'
fi
for file in `ls $DIR/../../../publishclient/$tmpplat | grep 'gt_test'$tmpplat'_'`
do
    $DIR/../syncSvn/updatePublish.sh ${file//gt_test/} || exit 1
done

pretest=test;
if [[ $plat =~ "iosshenhe" ]] ;
then
    pretest=""
fi
sh $DIR/../../../client/tags/$tag/publish_h5_all.sh $pretest$plat || exit 1

# rsync -r --delete $DIR/../../../外网地址/$plat/gt_test$plat/ $DIR/../../../publishclient/$plat/gt_test$plat/ || exit 1

echo "提交publish"
$DIR/../syncSvn/commitPublish.sh $plat || exit 1

for file in `ls $DIR/../../../publishclient/$plat | grep 'gt_test'$plat'_'`
do
    $DIR/../syncSvn/commitPublish.sh ${file//gt_test/} || exit 1
done
