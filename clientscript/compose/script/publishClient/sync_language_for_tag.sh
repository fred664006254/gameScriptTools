#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
echo "同步语言和屏蔽字 for tag $tag"

echo "同步svn"
$DIR/../syncSvn/updateTag.sh $tag || exit 1
$DIR/../syncSvn/updatePublicLanguage.sh || exit 1
$DIR/../syncSvn/updatePublicShield.sh || exit 1
tagV=${tag/Composegt_/}
# echo $DIR/../../../public/language/.tags/$tagV

if [[ -d $DIR/../../../public/language/.tags/$tagV ]];then
    tagversion=`sh $DIR/../syncSvn/findNewTag.sh`
    echo $tagV $tagversion
    if [[ $tagV == $tagversion ]];then
        echo '是最新的tag'$tagV
        rsync -r --exclude='*.svn*' --exclude='*_zhs.json' --exclude='publish' --exclude='*tags' $DIR/../../../public/language/publish/ $DIR/../../../public/language/.tags/$tagV/
        cd $DIR/../../../public/language/.tags/$tagV/
        svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
        svn add * --force || exit 1
        svn ci -m "同步tag“ $tagV “备份目录的语言文件"
        cd $DIR
    else
        echo '不是最新tag，不同步最新cn'
    fi
    rsync -r --delete --exclude='*.svn*' --exclude='*_zhs.json' --exclude='publish' --exclude='*tags' $DIR/../../../public/language/.tags/$tagV/* $DIR/../../../client/tags/$tag/resource/config/language/ || exit 1
# else
#     rsync -r --delete --exclude='*.svn*' --exclude='cn.json' --exclude='tw.json' --exclude='tags' $DIR/../../../public/language/ $DIR/../../../client/tags/$tag/resource/config/language/ || exit 1
else
    echo '不存在tag' $tagV 的cn备份，使用tag原有cn文件
fi
rsync -r --delete --exclude='*.svn*' $DIR/../../../public/shield/ $DIR/../../../client/tags/$tag/resource/config/shield/ || exit 1

echo "提交svn"
$DIR/../syncSvn/commitTagLanguage.sh $tag || exit 1
$DIR/../syncSvn/commitTagShield.sh $tag || exit 1
