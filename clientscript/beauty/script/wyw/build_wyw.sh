#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

wywdir="tag34wyw"
echo "构建qq玩一玩"
cd $DIR/../../../client/tags/$wywdir || exit 1
rm -rf $DIR/../../../client/tags/$wywdir/bin-release/web/wyw || exit 1
/usr/local/bin/egret build -e || exit 1
/usr/local/bin/egret publish --version wyw || exit 1
cd $DIR

echo "复制wywBasePackage"
if [[ -d $DIR/../../cache/wywPackage ]]; then
	rm -rf $DIR/../../cache/wywPackage
fi
cp -rf $DIR/wywBasePackage $DIR/../../cache/wywPackage
cp -rf $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/manifest.json $DIR/../../cache/wywPackage/
cp -rf $DIR/../../../client/tags/$wywdir/bin-release/web/wyw/js $DIR/../../cache/wywPackage/

cd $DIR/../../cache/wywPackage || exit 1
rm -f ../wywPackage.zip || exit 1
zip -q -r ../wywPackage.zip ./* || exit 1