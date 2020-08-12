#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "同步语言"

echo "同步svn"
$DIR/../syncSvn/updateTrunk.sh language || exit 1 &
$DIR/../syncSvn/updatePublicLanguage.sh || exit 1 &
$DIR/../syncSvn/updatePublicShield.sh || exit 1 
# $DIR/../syncSvn/updatePublicNames.sh || exit 1
wait

rsync -r --delete --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' --exclude='cn.json' --exclude='cn_type.json' $DIR/../../../public/language/publish/ $DIR/../../../client/trunk/Composegt/resource/config/language/ || exit 1
rsync -r --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' $DIR/../../../public/language/ $DIR/../../../client/trunk/Composegt/resource/config/language/ || exit 1
rsync -r --delete --exclude='*.svn*' $DIR/../../../public/shield/ $DIR/../../../client/trunk/Composegt/resource/config/shield/ || exit 1
# rsync -r --delete --exclude='*.svn*' $DIR/../../../public/names/ $DIR/../../../client/trunk/Composegt/resource/config/names/ || exit 1

echo "提交svn"
$DIR/../syncSvn/commitTrunkLanguage.sh || exit 1
$DIR/../syncSvn/commitTrunkShield.sh || exit 1
# $DIR/../syncSvn/commitTrunkNames.sh || exit 1
