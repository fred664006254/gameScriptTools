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
echo $DIR
plat=$1
parentPlat=$2
childFile=$3
if [[ $plat == '' ]];then
    echo '需要指定目录'
    exit 1
fi
echo "更新svn publish $plat"
if [[ $plat =~ "iosshenhe" ]] ;
then
    plat=iosshenhe
fi
parentPlatFile=''
if [[ $parentPlat != '' ]]; then
    parentPlatFile=/$parentPlat
fi

platPath=$DIR/../../../publishclient$parentPlatFile/${plat//_*/} 
if [[ ! -d $platPath ]]; then
    svn checkout http://svn.leishenhuyu.com/compose/publish/client$parentPlatFile/${plat//_*/} $platPath || exit 1
fi

if [[ $2 == '' ]];then
    publishFile=`$DIR/../cfg/publishFilePathCfg.sh $1 '' $3`
else
    publishFile=`$DIR/../cfg/publishFilePathCfg.sh $1 $2 $3`
fi
echo $publishFile
$DIR/../syncSvn/revertAndUpdate.sh $publishFile || exit 1
