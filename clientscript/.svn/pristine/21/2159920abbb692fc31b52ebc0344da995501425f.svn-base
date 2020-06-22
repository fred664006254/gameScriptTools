#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR
tagname="tagz"
echo "添加无用类"
/usr/local/bin/node $DIR/unusedCode.js $DIR/../../../client/tags/${tagname}/src/core/utils || exit 1

echo "发布微信小游戏"
cd $DIR/../../../client/tags/${tagname} || exit 1
/usr/local/bin/egret publish --target wxgame || exit 1
cd $DIR

echo "复制sdk js"
cp $DIR/../../../client/tags/Librarys/wxgameRSDK/bin/wxgameRSDK.min.js $DIR/../../../client/tags/${tagname}_wxgame/js/wxgameRSDK.min.js  || exit 1
cp $DIR/../../../client/tags/Librarys/crypto/bin/crypto.min.js $DIR/../../../client/tags/${tagname}_wxgame/js/crypto.min.js || exit 1
echo '; window.RSDK = RSDK; window.productInfo = productInfo;'>>$DIR/../../../client/tags/${tagname}_wxgame/js/wxgameRSDK.min.js || exit 1
echo ''>>$DIR/../../../client/tags/${tagname}_wxgame/manifest.js || exit 1
echo 'require("js/crypto.min.js")'>>$DIR/../../../client/tags/${tagname}_wxgame/manifest.js || exit 1
echo 'require("js/wxgameRSDK.min.js")'>>$DIR/../../../client/tags/${tagname}_wxgame/manifest.js || exit 1

echo "复制changeFile"
# cp $DIR/changeFile/EgretSubPackageLoading.js $DIR/../../../client/tags/${tagname}_wxgame/EgretSubPackageLoading.js  || exit 1
# cp $DIR/changeFile/game.js $DIR/../../../client/tags/${tagname}_wxgame/game.js  || exit 1
# cp $DIR/changeFile/game.json $DIR/../../../client/tags/${tagname}_wxgame/game.json  || exit 1

echo "资源加版本号"
mkdir $DIR/../../../client/tags/${tagname}_wxgame/resource/t
/usr/local/bin/node $DIR/../versionMd5/buildResourcesVersionOneDir.js $DIR/../../../client/tags/${tagname}_wxgame/resource/default.res.json || exit 1
echo "混淆代码"
/usr/local/bin/node $DIR/obfuscated.js $DIR/../../../client/tags/${tagname}_wxgame/js/main.min.js
echo "类名挂到window上"
/usr/local/bin/node $DIR/includeAllFile.js $DIR/../../../client/tags/${tagname}_wxgame/js/main.min.js

echo "压缩并删除资源"
cd $DIR/../../../client/tags/${tagname}_wxgame || exit 1
# rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource || exit 1
# zip -q -r resource.zip resource || exit 1
# mv -f resource.zip ../ || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/assets || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/config || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/other || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/sound || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/t || exit 1
# rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/packs || exit 1
cd $DIR || exit 1