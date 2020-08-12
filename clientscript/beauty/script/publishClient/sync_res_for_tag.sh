#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

tag=$1
echo "检查并同步差异资源 for tag $tag"
tagrespath=$DIR/../../../public/resources
echo "同步svn"
$DIR/../syncSvn/revertAndUpdate.sh $tagrespath || exit 1
tagV=${tag/PalaceWar_/}

tagversion=`sh $DIR/../syncSvn/findNewTag.sh`
tagpath=$tagrespath/tags/$tagV
if [[ -d $tagpath ]];then
    echo $tagV $tagversion
    /usr/local/bin/node $DIR/../syncRes/syncTagRes.js $tagV || exit 1

    echo "提交public资源";
    sh $DIR/../syncSvn/addStatusAndCommit.sh $tagrespath
    sh $DIR/reGenDefaultJson.sh $tag 1
    # tagresource=`sh $DIR/../cfg/clientFilePathCfg.sh tags`/$tag/resource
    # echo "提交差异资源" $tagresource
    # sh $DIR/../syncSvn/addStatusAndCommit.sh $tagresource
else
    if [[ $tagV == $tagversion ]];then
        echo '不存在tag目录，但当前tag为最新版本'$tagV'，尝试从public/resources读取'
        /usr/local/bin/node $DIR/../syncRes/syncTagRes.js $tagV || exit 1
        
        echo "提交public资源";
        sh $DIR/../syncSvn/addStatusAndCommit.sh $tagrespath
        sh $DIR/reGenDefaultJson.sh $tag 1
        # tagresource=`sh $DIR/../cfg/clientFilePathCfg.sh tags`/$tag/resource
        # echo "提交差异资源" $tagresource
        # sh $DIR/../syncSvn/addStatusAndCommit.sh $tagresource
    else
        echo '不存在tag目录，并且当前tag不是最新版本，跳过查找Tag差异资源，最新版本为'$tagversion
    fi
fi

echo "tag $tagV 差异资源同步完成"

# function read_dir(){
#     for file in `ls $1`
#     do
#         if [ -d $1"/"$file ] 
#         then
#             read_dir $1"/"$file
#         else
#             echo $1"/"$file 
#         fi
#     done
# } 
# read_dir $1
