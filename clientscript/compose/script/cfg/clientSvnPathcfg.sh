#!/bin/bash

#根据标识获取svn地址 

SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
cd $filepath

if [[ $1 == 'trunk' ]]; then
    echo http://svn.rjoy.com:9080/repos/compose/client/trunk
elif [[ $1 == 'branches' ]]; then
    echo http://svn.rjoy.com:9080/repos/compose/client/branches
elif [[ $1 == 'tags' ]]; then
    echo http://svn.rjoy.com:9080/repos/compose/client/tags
fi

