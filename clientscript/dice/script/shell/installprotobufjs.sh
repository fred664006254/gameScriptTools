#!/bin/bash
SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

cd $filepath


if [[ `which npm` == '' ]]; then
    echo '请先安装node和npm'|| exit 1
    # brew install 
fi

npm ls -g --depth 0&>npmlog
if [[ `cat npmlog` =~ 'protobufjs' ]]; then
    echo '找到 protobufjs，无需重复安装'
else
    npm install protobufjs -g
fi

if [[ `cat npmlog` =~ 'egret/protobuf' ]]; then
    echo '找到 egret/protobuf，无需重复安装'
else
    npm install @egret/protobuf -g
fi
rm -rf npmlog

echo 'protobuf安装完成'
