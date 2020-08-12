#!/bin/bash

# 参数说明 $1 渠道名 $2 localtest或者空 $3 子目录名
# while [ -h "$SOURCE"  ]; do
#     DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
# done
# DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

DIR=$(cd `dirname $0`; pwd)

cd $DIR

if [[ $1 == '' ]];then
    echo '需要指定目录'
    exit 1
fi

plat=$1
parentPlat=$2
childFile=$3

publishFile=''
echo "上传svn publish $plat"
if [[ "$plat" == "localtest" ]]; then
	publishFile=$DIR/../../../publishclient/$plat || exit 1
elif [[ "$plat" =~ "iosshenhe" ]]; then
	publishFile=$DIR/../../../publishclient/iosshenhe/gt_$plat || exit 1
else
	publishFile=$DIR/../../../publishclient/$plat/gt_test$plat || exit 1
fi

parentPlatFile=''
if [[ $parentPlat != '' ]]; then
    parentPlatFile=/$parentPlat
fi

if [[ $parentPlat == '' ]];then
    publishFile=`$DIR/../cfg/publishFilePathCfg.sh $1 '' $3`
else
    publishFile=`$DIR/../cfg/publishFilePathCfg.sh $1 $2 $3`
fi
echo $publishFile

$DIR/../syncSvn/addStatusAndCommit.sh $publishFile