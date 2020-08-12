#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "同步资源"

echo "同步svn"
$DIR/../syncSvn/revertAndUpdate.sh $DIR/../../../client/trunk/ || exit 1

rsync -avz --delete --exclude='*.svn*' $DIR/../../../client/trunk/resources/sound/ $DIR/../../../client/trunk/Composegt/resource/sound/
/usr/local/bin/node $DIR/Main.js $DIR/../../../client/trunk || { $DIR/../syncSvn/revertAndUpdate.sh $DIR/../../../client/trunk/ || exit 1; exit 1; } || exit 1
#/usr/local/bin/node $DIR/Main.js $DIR/../../../client/trunk || exit 1

$DIR/../syncSvn/commitTrunkResForSync.sh || exit 1