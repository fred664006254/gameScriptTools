#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
plat=$2
eui=$3
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
if [[ $eui ]] ;then
    cd /Users/publish/h5/gt_h5/client/tags/PalaceWarEuiTag || exit 1
    if [[  -d /Users/publish/h5/gt_h5/client/tags/PalaceWarEuiTag/bin-release ]]; then
        rm -rf bin-release || exit 1
        svn delete bin-release || exit 1
        svn commit bin-release -m "" || exit 1
    fi
    echo 'cleanuping'
    svn cleanup
    svn revert -R . || exit 1
    svn update || exit 1

    echo "copy To euiTag"
    cd /Users/publish/h5/gt_h5/client/tags/$tag
    svn update || exit 1
    cp -R /Users/publish/h5/gt_h5/client/tags/$tag/src /Users/publish/h5/gt_h5/client/tags/PalaceWarEuiTag || exit 1
    cp -R /Users/publish/h5/gt_h5/client/tags/$tag/resource /Users/publish/h5/gt_h5/client/tags/PalaceWarEuiTag || exit 1

    cd /Users/publish/h5/gt_h5/client/tags/PalaceWarEuiTag
    svn add * --force || exit 1
    svn commit -m "自动打包上传" || exit 
    sh $DIR/../../../client/tags/PalaceWarEuiTag/publish_h5_all.sh $pretest$plat || exit 1

else 
    sh $DIR/../../../client/tags/$tag/publish_h5_all.sh $pretest$plat || exit 1
fi

# rsync -r --delete $DIR/../../../外网地址/$plat/gt_test$plat/ $DIR/../../../publishclient/$plat/gt_test$plat/ || exit 1

# echo "提交publish"
# $DIR/../syncSvn/commitPublish.sh $plat || exit 1

# for file in `ls $DIR/../../../publishclient/$plat | grep 'gt_test'$plat'_'`
# do
#     $DIR/../syncSvn/commitPublish.sh ${file//gt_test/} || exit 1
# done
