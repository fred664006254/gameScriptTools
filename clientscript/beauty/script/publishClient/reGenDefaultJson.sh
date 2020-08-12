#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

# tag名
tag=$1

notupdate=$2

tagPath=$DIR/../../../client/tags/$tag

echo 'start update svn'

if [[ $notupdate == '' ]];then
    $DIR/../syncSvn/updateTag.sh $tag || exit 1
fi

echo 'start Gen Default.res.json'

$DIR/../syncRes/defaultGenOnly.sh $DIR/../../../client/tags/$tag/resource/ || exit 1

echo 'start commit'

$DIR/../syncSvn/addStatusAndCommit.sh $tagPath/resource  || exit 1

echo 'complete'