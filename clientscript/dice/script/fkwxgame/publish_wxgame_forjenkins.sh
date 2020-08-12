#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
isupgrade=$2

echo "version isupgrade: $isupgrade"

echo "发布疯狂微信小游戏 tag:$tag"

echo "同步svn tag"
$DIR/../syncSvn/updateTag.sh $tag || exit 1
echo "同步svn wxgameproj"
$DIR/../syncSvn/updateTag.sh wxgameproj || exit 1
echo "同步publish"
$DIR/../syncSvn/updatePublish.sh wx || exit 1


# ************* 从这里开始发布debug版 ***************
rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/tags/wxgameproj/wxgame/ $DIR/../../../client/tags/${tag}_wxgame/ || exit 1

echo "########### publish debug start"

cp -f $DIR/changeFile/subpackage.ts $DIR/../../../client/tags/${tag}/scripts/wxgame/ || exit 1
cp -f $DIR/changeFile/debugcfg/config.wxgame.ts $DIR/../../../client/tags/${tag}/scripts/config.wxgame.ts || exit 1
cd $DIR/../../../client/tags/${tag} || exit 1

echo "build"
/usr/local/bin/egret b -e
echo "发布"
/usr/local/bin/egret publish --target wxgame || exit 1
cd $DIR

mv -f $DIR/../../../client/tags/${tag}_wxgame/js/main.js $DIR/../../../client/tags/${tag}_wxgame/stage1/main.min.js || exit 1

echo "复制sdk js"
cp $DIR/../../../client/tags/Librarys/fkwxgameRSDK/rsdk-fkvip.js $DIR/../../../client/tags/${tag}_wxgame/js/rsdk-fkvip.js  || exit 1
echo ''>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
echo 'require("js/rsdk-fkvip.js")'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
echo 'window["WX_ISWX"] = true'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
# echo 'window["VERINFO_VER"] = 4;'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
_old_ver=`cut -d'=' -f2 ${DIR}/../../../client/tags/${tag}_wxgame/version.txt` || exit 1
_new_ver=$_old_ver || exit 1
if [ $isupgrade == "true" ];then
    _new_ver=`expr ${_old_ver} + 1` || exit 1
    echo "版本号升级： ${_old_ver} >>>>>> ${_new_ver}" || exit 1
    echo "version=${_new_ver}">${DIR}/../../../client/tags/${tag}_wxgame/version.txt || exit 1
fi
echo "version change: ${_old_ver} >>>>>> ${_new_ver}"
echo 'window["VERINFO_VER"] = '"${_new_ver};">>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1

echo "复制分包所需资源"
cp -f $DIR/changeFile/EgretSubPackageLoading.js $DIR/../../../client/tags/${tag}_wxgame/  || exit 1
cp -f $DIR/changeFile/game.js $DIR/../../../client/tags/${tag}_wxgame/  || exit 1
cp -f $DIR/changeFile/game.json $DIR/../../../client/tags/${tag}_wxgame/  || exit 1

echo "resource加md5"
/usr/local/bin/node $DIR/../versionMd5/buildResourcesVersionRenameCrc32.js $DIR/../../../client/tags/${tag}_wxgame/resource/default.res.json || exit 1

echo "重写EgretSubPackageLoading.js中背景图路径"
/usr/local/bin/node $DIR/changeLoginBgUrl.js $DIR/../../../client/tags/${tag}_wxgame/resource/default.res.json $DIR/../../../client/tags/${tag}_wxgame/EgretSubPackageLoading.js

echo "default.res.json 加md5"
/usr/local/bin/node $DIR/../versionMd5/buildDefaultVersionForWxgame.js $DIR/../../../client/tags/${tag}_wxgame/ || exit 1

echo "类名挂到window上"
/usr/local/bin/node $DIR/includeAllFile.js $DIR/../../../client/tags/${tag}_wxgame/stage1/main.min.js || exit 1

echo "修改一些版本号"
cd $DIR/../../../client/tags/${tag} || exit 1
svnv=`svnversion -c |sed 's/^.*://' |sed 's/[A-Z]*$//'` || exit 1
cd $DIR
/usr/local/bin/node $DIR/modifyinfo.js $DIR/../../../client/tags/${tag}_wxgame/ $svnv || exit 1
echo "svn:$svnv" || exit 1

echo "">$DIR/../../../client/tags/${tag}_wxgame/stage2/main.min.js || exit 1

rm -rf $DIR/../../../client/tags/${tag}_wxgame/resourceallin || exit 1

rm -rf $DIR/../../../client/tags/${tag}_wxgame/resource || exit 1

rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/tags/${tag}_wxgame/ $DIR/../../../client/tags/wxgameproj/wxgame_debug/  || exit 1

rm -rf $DIR/../../../client/tags/${tag}_wxgame || exit 1

echo "########### publish debug over"
# ************* debug发布结束 **********************

rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/tags/wxgameproj/wxgame/ $DIR/../../../client/tags/${tag}_wxgame/ || exit 1

cp -f $DIR/changeFile/subpackage.ts $DIR/../../../client/tags/${tag}/scripts/wxgame/ || exit 1
cp -f $DIR/changeFile/config.wxgame.ts $DIR/../../../client/tags/${tag}/scripts/config.wxgame.ts || exit 1
cd $DIR/../../../client/tags/${tag} || exit 1
# echo "指定引擎到5.2.5"
# /usr/local/bin/egret upgrade --egretversion 5.2.5 || exit 1
# echo '切换资源库ing...'
# **继续使用RES库
# sed -i '' "s/\"res\"/\"assetsmanager\"/" egretProperties.json
/usr/local/bin/egret b -e
echo '切换资源库完成,使用assetsmanager库'
echo "发布"
/usr/local/bin/egret publish --target wxgame || exit 1
cd $DIR

# echo "复制和谐资源"
# **暂时没有河蟹资源
# cp -R $DIR/../../../client/trunk/resoucres_multi/assets_hexie/* $DIR/../../../client/tags/${tag}_wxgame/resource/assets/ || exit 1

echo "复制sdk js"
cp $DIR/../../../client/tags/Librarys/fkwxgameRSDK/rsdk-fkvip.js $DIR/../../../client/tags/${tag}_wxgame/js/rsdk-fkvip.js  || exit 1
echo ''>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
echo 'require("js/rsdk-fkvip.js")'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
echo 'window["WX_ISWX"] = true'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
# echo 'window["VERINFO_VER"] = 4;'>>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1
_old_ver=`cut -d'=' -f2 ${DIR}/../../../client/tags/${tag}_wxgame/version.txt` || exit 1
_new_ver=$_old_ver || exit 1
if [ $isupgrade == "true" ];then
    _new_ver=`expr ${_old_ver} + 1` || exit 1
    echo "版本号升级： ${_old_ver} >>>>>> ${_new_ver}" || exit 1
    echo "version=${_new_ver}">${DIR}/../../../client/tags/${tag}_wxgame/version.txt || exit 1
fi
echo "version change: ${_old_ver} >>>>>> ${_new_ver}"
echo 'window["VERINFO_VER"] = '"${_new_ver};">>$DIR/../../../client/tags/${tag}_wxgame/manifest.js || exit 1

cp -f $DIR/../../../client/tags/${tag}_wxgame/manifest.js $DIR/../../../client/tags/wxgameproj/wxgame_debug/ || exit 1

echo "复制分包所需资源"
cp -f $DIR/changeFile/EgretSubPackageLoading.js $DIR/../../../client/tags/${tag}_wxgame/  || exit 1
cp -f $DIR/changeFile/game.js $DIR/../../../client/tags/${tag}_wxgame/  || exit 1
cp -f $DIR/changeFile/game.json $DIR/../../../client/tags/${tag}_wxgame/  || exit 1

echo "resource加md5"
/usr/local/bin/node $DIR/../versionMd5/buildResourcesVersionRenameCrc32.js $DIR/../../../client/tags/${tag}_wxgame/resource/default.res.json || exit 1

echo "重写EgretSubPackageLoading.js中背景图路径"
/usr/local/bin/node $DIR/changeLoginBgUrl.js $DIR/../../../client/tags/${tag}_wxgame/resource/default.res.json $DIR/../../../client/tags/${tag}_wxgame/EgretSubPackageLoading.js

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
/usr/local/bin/node $DIR/modifyinfo.js $DIR/../../../client/tags/${tag}_wxgame/ $svnv || exit 1
echo "svn:$svnv" || exit 1


echo "拆分成两个子包"
if [ -d $DIR/../../../client/tags/${tag}_wxgame/stage2 ];then
    rm -rf $DIR/../../../client/tags/${tag}_wxgame/stage2 || exit 1
fi
cp -rf $DIR/../../../client/tags/${tag}_wxgame/stage1 $DIR/../../../client/tags/${tag}_wxgame/stage2 || exit 1
/usr/local/bin/node $DIR/splitMain.js $DIR/../../../client/tags/${tag}_wxgame/stage1/main.min.js $DIR/../../../client/tags/${tag}_wxgame/stage2/main.min.js || exit 1

rm -rf $DIR/../../../client/tags/${tag}_wxgame/resourceallin || exit 1
# mv $DIR/../../../client/tags/${tag}_wxgame/resource $DIR/../../../client/tags/${tag}_wxgame/resourceallin || exit 1
echo "放到publish并上传"
rsync -avz $DIR/../../../client/tags/${tag}_wxgame/resource/ $DIR/../../../publishclient/wx/gt_wx/resource/ || exit 1
$DIR/../syncSvn/commitPublishNotOnlyTest.sh wx || exit 1
echo "删除资源"
# **保留default.res.json并修改文件夹名为resource
rm -rf $DIR/../../../client/tags/${tag}_wxgame/resource
# rm -rf $DIR/../../../client/tags/${tag}_wxgame/resource/config || exit 1
# rm -rf $DIR/../../../client/tags/${tag}_wxgame/resource/other || exit 1
# rm -rf $DIR/../../../client/tags/${tag}_wxgame/resource/sound || exit 1
# rm -rf $DIR/../../../client/tags/${tag}_wxgame/resource/assets || exit 1

echo "svn:$svnv" >> $DIR/../../../client/tags/${tag}_wxgame/svn.txt || exit 1
rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/tags/${tag}_wxgame/ $DIR/../../../client/tags/wxgameproj/wxgame/  || exit 1
$DIR/../syncSvn/commitTag.sh wxgameproj || exit 1

$DIR/../sshRemote/publish_client.sh wx || exit 1
# ssh -tt opsteam@"193.112.135.151"  -p 10220 'sudo bash /data/autodeploy/publish_client_wx.sh'

