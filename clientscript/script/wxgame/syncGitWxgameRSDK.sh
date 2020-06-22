#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR
echo "同步git微信小游戏sdk"
if [[ ! -d $DIR/../../cache/wxgamersdkgit ]]; then
	echo "clone git"
	mkdir -p $DIR/../../cache/wxgamersdkgit || exit 1
	cd $DIR/../../cache/wxgamersdkgit || exit 1
	git clone http://ke.chen%40rayjoy.com:chenke123@g.rjoy.com/zhili.yan/rsdk-dujiaoshou-js.git || exit 1
	cd $DIR
fi
echo "拉到最新"
cd $DIR/../../cache/wxgamersdkgit/rsdk-dujiaoshou-js || exit 1
git pull  || exit 1
cd $DIR || exit 1

echo "同步到工程"
rsync -r --delete $DIR/../../cache/wxgamersdkgit/rsdk-dujiaoshou-js/Libs/crypto/ $DIR/../../../client/trunk/Librarys/crypto/ || exit 1
rsync -r --delete $DIR/../../cache/wxgamersdkgit/rsdk-dujiaoshou-js/RSDK-dujiaoshou/src/rsdk/ $DIR/../../../client/trunk/Librarys/wxgameRSDK/src/ || exit 1
cp -f $DIR/../../../client/trunk/Librarys/crypto/bin/crypto.d.ts $DIR/../../../client/trunk/Librarys/wxgameRSDK/src/crypto.d.ts || exit 1

echo "编译成rsdk库"
cd $DIR/../../../client/trunk/Librarys || exit 1
/usr/local/bin/egret build wxgameRSDK || exit 1
cd $DIR || exit 1
 