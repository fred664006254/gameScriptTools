#!/bin/bash
#根据标识获取前端目录路径  $1 渠道 $2 localtest或者0或者不传 $3 子目录

# SOURCE="$0"
# while [ -h "$SOURCE"  ]; do
#     filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
# done
# filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

filepath=$(cd `dirname $0`; pwd)

cd $filepath

if [[ $1 == '' ]];then
    echo '需要指定目录'
    exit 1
fi

plat=$1
parentPlat=$2
childFile=$3

# 根据标识获取目录路径
function getClientFilePath()
{
    localFile=''
    testStr=''
    zhengshiPlat=$1
    if [[ $2 == '' ]]; then
        localFile=''
        if [[ $1 =~ "iosshenhe" ]];
        then
            zhengshiPlat="iosshenhe"
        elif [[ $1 == "test" ]];then
            testStr=""
        else
            testStr='test'
        fi
    else
        localFile='/'$2
    fi
    zhengshiPlat=${zhengshiPlat//_*/} || exit 1
    clientfilepath=$filepath/../../../publishclient$localFile/$zhengshiPlat/gt_$testStr$1
    if [[ $3 != '' ]]; then
        if [[ $2 != '' ]]; then
            clientfilepath=`getClientChildFilePath $1 $2 $3`
        else
            clientfilepath=`getClientChildFilePath $1 '' $3`
        fi
    fi
    if [ -d "$clientfilepath" ];then
        echo $clientfilepath
    else
        # echo  不存在目录 $clientfilepath 请先svn checkout
        echo $clientfilepath
        # exit 1
    fi
}

# 根据标识和子目录标识获取目录路径
function getClientChildFilePath()
{
    if [[ $3 == '' ]]; then 
        echo $1 没有指定子目录名
        exit 1
    fi
    if [[ $3 == 'language' ]] || [[ $3 == 'json' ]] ; then
        echo `getClientFilePath $1 $2`/resource/config/$3
    fi
}
if [[ $2 == '' ]];then
    getClientFilePath $1 '' $3
else
    getClientFilePath $1 $2 $3
fi
