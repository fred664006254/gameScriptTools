#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# tag名
tag=$1
tagPath=$DIR/../../../client/tags/$tag

echo 'start update svn'

$DIR/../syncSvn/updateTag.sh $tag || exit 1

echo 'start Gen Default.res.json'

$DIR/../syncRes/defaultGenOnly.sh $DIR/../../../client/tags/$tag/resource/ || exit 1

echo 'start commit'

$DIR/../syncSvn/addStatusAndCommit.sh $tagPath  || exit 1

echo 'complete'