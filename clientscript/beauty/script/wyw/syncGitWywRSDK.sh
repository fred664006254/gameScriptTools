#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

if [[ ! -d $DIR/../../cache/wywrsdkgit ]]; then
	echo "clone git"
	mkdir -p $DIR/../../cache/wywrsdkgit || exit 1
	cd $DIR/../../cache/wywrsdkgit || exit 1
	git clone http://ke.chen%40rjoy.com:chenke123@g.rjoy.com/zhili.yan/rsdk-limi-js.git || exit 1
	cd $DIR
fi
echo "拉到最新"
cd $DIR/../../cache/wywrsdkgit/rsdk-limi-js || exit 1
git pull  || exit 1
cd $DIR || exit 1

echo "同步到工程"
rsync -r --delete $DIR/../../cache/wywrsdkgit/rsdk-limi-js/RSDK-LIMI/release/ $DIR/wywBasePackage/rsdk/ || exit 1
