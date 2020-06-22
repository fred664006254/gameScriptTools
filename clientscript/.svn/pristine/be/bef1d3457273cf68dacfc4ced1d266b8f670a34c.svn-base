#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branche=$1
echo "更新svn branche $branche"

if [[ ! -d $DIR/../../../client/branches/$branche ]]; then
    svn checkout http://svn.rjoy.com:9080/repos/jt/client/branches/$branche $DIR/../../../client/branches/$branche
fi

svn cleanup $DIR/../../../client/branches/$branche || exit 1
svn stat $DIR/../../../client/branches/$branche | grep \\? | awk '{print $2}' | xargs rm -rf || exit 1
svn revert -R $DIR/../../../client/branches/$branche  || exit 1
svn update $DIR/../../../client/branches/$branche || exit 1

if [[ ! -d $DIR/../../../client/branches/Librarys ]]; then
	ln -s $DIR/../../../client/trunk/Librarys $DIR/../../../client/branches || exit 1
fi
