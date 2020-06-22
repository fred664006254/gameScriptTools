#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR
echo "同步git微信小游戏sdk"
if [[ ! -d $DIR/../../cache/qqgamersdkgit ]]; then
	echo "clone git"
	mkdir -p $DIR/../../cache/qqgamersdkgit || exit 1
	cd $DIR/../../cache/qqgamersdkgit || exit 1
	git clone http://ke.chen%40rayjoy.com:chenke123@g.rjoy.com/zhili.yan/rsdk-dujiaoshou-js.git || exit 1
	cd $DIR
fi
echo "拉到最新"
cd $DIR/../../cache/qqgamersdkgit/rsdk-dujiaoshou-js || exit 1
git pull  || exit 1
cd $DIR || exit 1

echo "同步到工程"
rsync -r --delete $DIR/../../cache/qqgamersdkgit/rsdk-dujiaoshou-js/dist/qq/bin/rsdk-qq.js $DIR/../../../client/tags/Librarys/qqgameRSDK/rsdk-qq.js || exit 1
cd $DIR/../../../client/tags/Librarys/qqgameRSDK
svn commit -m "added newversion"
# rsync -r --delete $DIR/../../cache/qqgamersdkgit/rsdk-dujiaoshou-js/dist/fkvip/bin/rsdk-fk-wall-sdk.min.js $DIR/../../../client/trunk/Librarys/fkwxgameRSDK/rsdk-fk-wall-sdk.min.js || exit 1


