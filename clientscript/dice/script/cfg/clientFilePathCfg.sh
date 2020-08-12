#!/bin/bash
#根据标识获取前端目录路径 

SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
cd $filepath

# 根据标识获取目录路径
function getClientFilePath()
{
    clientfilepath=''
    if [[ $3 == '' ]]; then
        if [[ $1 == 'trunk' ]]; then
            clientfilepath=$filepath/../../../client/trunk
        elif [[ $1 == 'branches' ]]; then
            clientfilepath=$filepath/../../../client/branches
        elif [[ $1 == 'tags' ]]; then
            clientfilepath=$filepath/../../../client/tags
        fi
    else
        clientfilepath=`getClientChildFilePath $1 $2 $3`
    fi
    if [ -d $clientfilepath ];then
        echo $clientfilepath
    else
        # echo  不存在目录 $clientfilepath 请先svn checkout
        # exit 1
        echo $clientfilepath
    fi
}

# 根据标识和子目录标识获取目录路径
function getClientChildFilePath()
{
    if [[ $3 == '' ]]; then 
        echo $1 没有指定子目录名
        exit 1
    fi
    projectFile=$2
    if [[ $1 == 'trunk' ]] && [[ $projectFile == '' ]] ; then
        projectFile='Dice'
    fi
    if [[ $3 == 'language' ]] || [[ $3 == 'json' ]] ; then
        echo `getClientFilePath $1`/$projectFile/resource/config/$3/
    fi
}

getClientFilePath $1 $2 $3
