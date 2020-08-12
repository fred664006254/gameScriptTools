#!/bin/bash

while [ -h "$SOURCE"  ]; do
    DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
cd $DIR

echo "更新svn public language"

if [[ ! -d $DIR/../../../public/language ]]; then
    svn checkout http://svn.rjoy.com:9080/repos/dice/public/language $DIR/../../../public/language
fi

svn cleanup $DIR/../../../public/language || exit 1
svn stat $DIR/../../../public/language | grep \\? | awk '{print $2}' | xargs rm -rf || exit 1
svn revert -R $DIR/../../../public/language  || exit 1
svn update $DIR/../../../public/language || exit 1
