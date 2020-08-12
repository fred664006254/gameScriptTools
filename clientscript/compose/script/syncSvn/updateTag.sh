#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
echo "更新svn tag $tag"

if [[ ! -d $DIR/../../../client/tags/$tag ]]; then
    svn checkout http://svn.rjoy.com:9080/repos/compose/client/tags/$tag $DIR/../../../client/tags/$tag
fi

svn cleanup $DIR/../../../client/tags/$tag || exit 1
svn stat $DIR/../../../client/tags/$tag | grep \\? | awk '{print $2}' | xargs rm -rf || exit 1
svn revert -R $DIR/../../../client/tags/$tag  || exit 1
svn update $DIR/../../../client/tags/$tag || exit 1

if [[ ! -d $DIR/../../../client/tags/Librarys ]]; then
	ln -s $DIR/../../../client/trunk/Librarys $DIR/../../../client/tags || exit 1
fi
