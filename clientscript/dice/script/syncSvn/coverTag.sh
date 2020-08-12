#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
echo "使用trunk强制覆盖 tag $tag"


svn remove http://svn.rjoy.com:9080/repos/dice/client/tags/$tag -m 'remove'$tag

svn copy http://svn.rjoy.com:9080/repos/dice/client/trunk/Dice http://svn.rjoy.com:9080/repos/dice/client/tags/$tag -m 'covertag'$tag 