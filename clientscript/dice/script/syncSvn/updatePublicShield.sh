#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "更新svn public shield"

if [[ ! -d $DIR/../../../public/shield ]]; then
    svn checkout http://svn.rjoy.com:9080/repos/dice/public/shield $DIR/../../../public/shield
fi

svn cleanup $DIR/../../../public/shield || exit 1
svn stat $DIR/../../../public/shield | grep \\? | awk '{print $2}' | xargs rm -rf || exit 1
svn revert -R $DIR/../../../public/shield  || exit 1
svn update $DIR/../../../public/shield || exit 1
