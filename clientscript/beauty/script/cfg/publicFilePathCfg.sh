#!/bin/bash
#根据标识获取public目录路径 

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

# 根据标识获取目录路径
function getClientFilePath()
{
    clientfilepath=$filepath/../../../public/$1
    if [ -d $clientfilepath ];then
        echo $clientfilepath
    else
        echo  不存在目录 $clientfilepath 请先svn checkout
        exit 1
    fi
}

getClientFilePath $1
