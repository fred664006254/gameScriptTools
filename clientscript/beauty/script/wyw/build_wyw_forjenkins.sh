#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
addappversion=$2
wywdir=$tag

echo "发布玩一玩 tag:$tag addappversion:$appversion"

echo "同步svn tag"
$DIR/../syncSvn/updateTag.sh $tag || exit 1
echo "同步publish"
$DIR/../syncSvn/updatePublish.sh lm || exit 1

cd $DIR/../../../client/tags/$wywdir || exit 1
rm -rf $DIR/../../../client/tags/$wywdir/bin-release/web/wyw || exit 1
# echo "指定引擎到5.2.0"
# /usr/local/bin/egret upgrade --egretversion 5.2.0
echo "构建qq玩一玩"
/usr/local/bin/egret build -e || exit 1
/usr/local/bin/egret publish --version wyw || exit 1

hexiemultifile=$DIR/../../../client/trunk/resoucres_multi/assets_hexie
if [ -d "$hexiemultifile" ]; then
	svn up $hexiemultifile
	echo 存在和谐版本资源 || exit 1
	echo 开始合并和谐资源 || exit 1
	cp -R $hexiemultifile/* $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/resource/assets/
fi

echo "包含和谐sound"
hexiemultisound=$DIR/../../../client/trunk/resources/sound_hexie || exit 1
if [ -d "$hexiemultisound" ]; then
	echo 存在和谐版本音效资源 || exit 1
	echo 开始合并和谐音效资源 || exit 1
	cp -R $hexiemultisound/* $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/resource/sound/ || exit 1
fi

cd $DIR
echo "resource加md5"
/usr/local/bin/node $DIR/../versionMd5/buildResourcesVersionRenameCrc32.js $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/resource/default.res.json || exit 1

echo "default.res.json 加md5"
/usr/local/bin/node $DIR/../versionMd5/buildDefaultVersion.js $DIR/../../../client/tags/$wywdir/bin-release/web/wyw || exit 1

echo "修改一些版本号"
cd $DIR/../../../client/tags/$wywdir
svnv=`svnversion -c |sed 's/^.*://' |sed 's/[A-Z]*$//'`
cd $DIR
/usr/local/bin/node $DIR/modifyinfo.js $DIR/../../../client/tags/$wywdir/bin-release/web/wyw $DIR/../../../publishclient/lm/gt_lm/verinfo.json $addappversion $tag $svnv || exit 1

echo "放到publish并上传"
rsync -avz $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/resource/ $DIR/../../../publishclient/lm/gt_lm/resourceallin/ || exit 1
$DIR/../syncSvn/commitPublishNotOnlyTest.sh lm || exit 1
echo "资源同步到cdn，即时生效"
$DIR/../sshRemote/publish_client.sh lm || exit 1

echo "复制wywBasePackage"
if [[ -d $DIR/../../cache/wywPackage ]]; then
	rm -rf $DIR/../../cache/wywPackage
fi
cp -rf $DIR/wywBasePackage $DIR/../../cache/wywPackage
cp -rf $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/manifest.json $DIR/../../cache/wywPackage/
cp -rf $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/js $DIR/../../cache/wywPackage/

echo "打成zip包"
cd $DIR/../../cache/wywPackage || exit 1
rm -f ../wywPackage.zip || exit 1
zip -q -r ../wywPackage.zip ./* || exit 1

echo "移动到web目录下以供下载"
cp ../wywPackage.zip /Users/k/me/Tomcat/webapps/ROOT/gt/wywzip/wywzip_tag_${tag}.zip || exit 1
echo "点击下载"
echo "http://192.168.11.231:8080/gt/wywzip/wywzip_tag_${tag}.zip"