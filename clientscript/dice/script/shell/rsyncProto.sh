#!/bin/bash
# 同步protobuf配置文件

DIR=$(cd `dirname $0`; pwd)
cd $DIR

start_time=$(date +%s)
start_time0=$start_time
record()
{
    end_time=$(date +%s)
    cost_time=$[ $end_time-$start_time ]
    start_time=$end_time
    echo $* '(耗时:'$cost_time's)'
}

protofile=$DIR/../../../publicscript/proto

record '更新 '$protofile

$DIR/../syncSvn/revertAndUpdate.sh $protofile

trunkProject=$DIR/../../../client/trunk/Dice

protolib=$trunkProject/protobuf

record '更新 '$protolib

$DIR/../syncSvn/revertAndUpdate.sh $protolib

rsync -avzr --delete $DIR/../../../publicscript/proto/ $protolib/protofile/

cd $trunkProject

record '生成js...'
/usr/local/bin/pb-egret generate $trunkProject

record '提交proto和js'
$DIR/../syncSvn/addStatusAndCommit.sh $protolib

end_time0=$(date +%s)
echo 'generate complete (总耗时:'$[ $end_time0-$start_time0 ]'s)'