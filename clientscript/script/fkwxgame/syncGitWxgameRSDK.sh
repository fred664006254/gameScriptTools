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
rsync -r --delete $DIR/../../cache/wxgamersdkgit/rsdk-dujiaoshou-js/dist/fkvip/bin/rsdk-fkvip.js $DIR/../../../client/trunk/Librarys/fkwxgameRSDK/rsdk-fkvip.js || exit 1


 