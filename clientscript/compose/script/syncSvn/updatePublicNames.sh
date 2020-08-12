#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

echo "更新svn public names"

if [[ ! -d $DIR/../../../public/names ]]; then
    svn checkout http://svn.rjoy.com:9080/repos/compose/public/names $DIR/../../../public/names
fi

svn cleanup $DIR/../../../public/names || exit 1
svn stat $DIR/../../../public/names | grep \\? | awk '{print $2}' | xargs rm -rf || exit 1
svn revert -R $DIR/../../../public/names  || exit 1
svn update $DIR/../../../public/names || exit 1
