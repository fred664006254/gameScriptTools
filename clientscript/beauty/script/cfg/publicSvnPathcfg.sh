#!/bin/bash

#根据public子目录标识获取svn地址 

SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
cd $filepath

if [[ $1 == '' ]];then
    echo '缺少参数'
    exit 1
fi

echo http://svn.rjoy.com:9080/repos/jt/public/$1

