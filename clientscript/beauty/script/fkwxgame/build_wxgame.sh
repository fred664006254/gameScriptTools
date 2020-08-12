#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR
tagname="tag2"
echo "构建疯狂微信小游戏"
cd $DIR/../../../client/tags/${tagname} || exit 1
/usr/local/bin/egret build --target wxgame || exit 1
cd $DIR

echo "复制sdk js"
cp $DIR/../../../client/tags/Librarys/fkwxgameRSDK/rsdk-fkvip.js $DIR/../../../client/tags/${tagname}_wxgame/js/rsdk-fkvip.js  || exit 1
echo ''>>$DIR/../../../client/tags/${tagname}_wxgame/manifest.js || exit 1
echo 'require("js/rsdk-fkvip.js")'>>$DIR/../../../client/tags/${tagname}_wxgame/manifest.js || exit 1
echo 'window["FKWX_ISFKWX"] = true'>>$DIR/../../../client/tags/${tagname}_wxgame/manifest.js || exit 1

echo "复制changeFile"
# cp $DIR/changeFile/EgretSubPackageLoading.js $DIR/../../../client/tags/${tagname}_wxgame/EgretSubPackageLoading.js  || exit 1
# cp $DIR/changeFile/game.js $DIR/../../../client/tags/${tagname}_wxgame/game.js  || exit 1
# cp $DIR/changeFile/game.json $DIR/../../../client/tags/${tagname}_wxgame/game.json  || exit 1

echo "资源加版本号"
/usr/local/bin/node $DIR/../versionMd5/buildResourcesVersion.js $DIR/../../../client/tags/${tagname}_wxgame/resource/default.res.json || exit 1

echo "压缩并删除资源"
cd $DIR/../../../client/tags/${tagname}_wxgame || exit 1
# rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource || exit 1
# zip -q -r resource.zip resource || exit 1
# mv -f resource.zip ../ || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/assets || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/config || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/other || exit 1
rm -rf $DIR/../../../client/tags/${tagname}_wxgame/resource/sound || exit 1
cd $DIR || exit 1