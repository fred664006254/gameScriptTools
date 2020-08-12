#!/bin/bash
DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "当前目录:"
pwd
if [[ -f ./IgnoreActivity.xlsx ]]; then
    cp -f ./IgnoreActivity.xlsx $DIR/
elif [[ -f ./IgnoreActivity.txt ]]; then
    cp -f ./IgnoreActivity.txt $DIR/
fi
cd $DIR

tag=$1
addappversion=$2
ignorelist=$3

echo "发布qq小游戏 tag:$tag"
echo "忽略名单 $ignorelist"
echo "同步svn tag"

$DIR/../syncSvn/updateTag.sh $tag || exit 1
echo "同步svn wxgameproj"
$DIR/../syncSvn/updateTag.sh qqgameproj || exit 1
# echo "同步publish"
# $DIR/../syncSvn/updatePublish.sh wanba || exit 1

rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/tags/qqgameproj/qqgame/ $DIR/../../../client/tags/${tag}_wxgame/ || exit 1

cp -f $DIR/changeFile/subpackage.ts $DIR/../../../client/tags/${tag}/scripts/wxgame/ || exit 1
cp -f $DIR/changeFile/config.wxgame.ts $DIR/../../../client/tags/${tag}/scripts/config.wxgame.ts || exit 1
# egret upgrade --egretversion 5.2.5 || exit 1
echo "删除不开的活动代码"
if [[ ! -d $DIR/../../../client/tags/activity2 ]]; then
    mkdir -p $DIR/../../../client/tags/activity2 || exit 1
fi
cp -R $DIR/../../../client/tags/${tag}/src/game/view/activity $DIR/../../../client/tags/activity2 || exit 1

if [[ -f $DIR/IgnoreActivity.xlsx ]]; then
    echo "处理xlsx文件"
    /usr/local/bin/node $DIR/../xlsxPlat/qqignorelist.js $DIR/IgnoreActivity.xlsx $DIR/
    /usr/local/bin/node $DIR/deletefile.js $DIR/../../../client/tags/${tag}/src/game/view/activity $DIR/qqgameignore.json true|| exit 1
elif [[ -f $DIR/IgnoreActivity.txt ]]; then
    echo "处理txt文件"
    usr/local/bin/node $DIR/deletefile.js $DIR/../../../client/tags/${tag}/src/game/view/activity $DIR/IgnoreActivity.txt || exit 1
fi

echo "发布"
cd $DIR/../../../client/tags/${tag} || exit 1
/usr/local/bin/egret publish --target wxgame || exit 1
cd $DIR

echo "复制和谐资源"
cp -R $DIR/../../../client/trunk/resoucres_multi/assets_hexie/* $DIR/../../../client/tags/${tag}_wxgame/resource/assets/ || exit 1

echo "复制sdk js"
cp $DIR/../../../client/tags/Librarys/qqgameRSDK/rsdk-qq.js $DIR/../../../client/tags/${tag}_wxgame/js/rsdk-qq.js  || exit 1
echo ''>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
echo 'require("js/rsdk-qq.js")'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
echo 'window["QQ_ISQQ"] = true'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
# echo 'window["VERINFO_VER"] = 2;'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1

echo "复制分包所需资源"
cp -f $DIR/changeFile/EgretSubPackageLoading.js $DIR/../../../client/tags/${tag}_wxgame/  || exit 1
cp -f $DIR/changeFile/game.js $DIR/../../../client/tags/${tag}_wxgame/  || exit 1
cp -f $DIR/changeFile/game.json $DIR/../../../client/tags/${tag}_wxgame/  || exit 1

echo "resource加md5"
/usr/local/bin/node $DIR/../versionMd5/buildResourcesVersionRenameCrc32.js $DIR/../../../client/tags/${tag}_wxgame/resource/default.res.json || exit 1

echo "default.res.json 加md5"
/usr/local/bin/node $DIR/../versionMd5/buildDefaultVersionForWxgame.js $DIR/../../../client/tags/${tag}_wxgame/ || exit 1
echo "混淆代码"
/usr/local/bin/node $DIR/obfuscated.js $DIR/../../../client/tags/${tag}_wxgame/stage1/main.min.js || exit 1
echo "类名挂到window上"
/usr/local/bin/node $DIR/includeAllFile.js $DIR/../../../client/tags/${tag}_wxgame/stage1/main.min.js || exit 1

echo "修改一些版本号"
cd $DIR/../../../client/tags/${tag} || exit 1
svnv=`svnversion -c |sed 's/^.*://' |sed 's/[A-Z]*$//'` || exit 1

cd $DIR
/usr/local/bin/node $DIR/modifyinfo.js $DIR/../../../client/tags/${tag}_wxgame/ $DIR/../../../publishclient/wanba/verinfo.json $addappversion $tag $svnv|| exit 1
echo "svn:$svnv" || exit 1

echo "拆分成两个子包"
if [ -d $DIR/../../../client/tags/${tag}_wxgame/stage2 ];then
    rm -rf $DIR/../../../client/tags/${tag}_wxgame/stage2 || exit 1
fi
cp -rf $DIR/../../../client/tags/${tag}_wxgame/stage1 $DIR/../../../client/tags/${tag}_wxgame/stage2 || exit 1
/usr/local/bin/node $DIR/splitMain.js $DIR/../../../client/tags/${tag}_wxgame/stage1/main.min.js $DIR/../../../client/tags/${tag}_wxgame/stage2/main.min.js || exit 1

rm -rf $DIR/../../../client/tags/${tag}_wxgame/resourceallin || exit 1
mv $DIR/../../../client/tags/${tag}_wxgame/resource $DIR/../../../client/tags/${tag}_wxgame/resourceallin || exit 1
echo "放到publish并上传"
rsync -avz $DIR/../../../client/tags/${tag}_wxgame/resourceallin/ $DIR/../../../publishclient/wanba/gt_wanba/resourceallin/ || exit 1
$DIR/../syncSvn/commitPublishNotOnlyTest.sh wanba || exit 1
echo "删除资源"
rm -rf $DIR/../../../client/tags/${tag}_wxgame/resourceallin || exit 1

echo "svn:$svnv" >> $DIR/../../../client/tags/${tag}_wxgame/svn.txt || exit 1
rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/tags/${tag}_wxgame/ $DIR/../../../client/tags/qqgameproj/qqgame/  || exit 1
$DIR/../syncSvn/commitTag.sh qqgameproj || exit 1

echo "资源同步到wanba"
sh /Users/publish/h5/gt_h5/clientscript/script/sshRemote/publish_client.sh qqgame || exit 1
echo "恢复代码"
if [[ -f $DIR/IgnoreActivity.xlsx ]]; then
    rm -f $DIR/IgnoreActivity.xlsx
elif [[ -f $DIR/IgnoreActivity.txt ]]; then
    rm -f $DIR/IgnoreActivity.txt
fi

if [[ -f $DIR/qqgameignore.json ]]; then
    rm -f $DIR/qqgameignore.json
fi

if [[ -f ./IgnoreActivity.xlsx ]]; then
    rm -f ./IgnoreActivity.xlsx
elif [[ -f ./IgnoreActivity.txt ]]; then
    rm -f ./IgnoreActivity.txt
fi

rm -rf $DIR/../../../client/tags/${tag}/src/game/view/activity
# cp -R ../activity2/activity src/game/view || exit 1
cp -R $DIR/../../../client/tags/activity2/activity $DIR/../../../client/tags/${tag}/src/game/view || exit 1
rm -rf $DIR/../../../client/tags/activity2