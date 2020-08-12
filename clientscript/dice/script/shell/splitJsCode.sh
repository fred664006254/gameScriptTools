#!/bin/bash
# 生成目标index的版本号 $1 目标index所在的目录
# $2 js/manifest 或者 res/resource/default
DIR=$(cd `dirname $0`; pwd)
cd $DIR

echo '开始处理js'
start_time=$(date +%s)
start_time0=$start_time
record()
{
    end_time=$(date +%s)
    cost_time=$[ $end_time-$start_time ]
    start_time=$end_time
    echo $* '(耗时:'$cost_time's)'
}

publisFile=$1
needSplit=$2

# 查找js文件名

cd $publisFile

if [[ $needSplit != '' ]];then

    # jsname 主js文件
    jsname=`cat manifest.json | grep main.min` || exit 1
    jsname=${jsname/*main.min/main.min}
    jsname=${jsname/.js\"*/.js}
    record '找到代码主js: '$jsname

    egretjsname=`cat manifest.json | grep game.min` || exit 1
    egretjsname=${egretjsname/*game.min/game.min}
    egretjsname=${egretjsname/.js\"*/.js}
    record '找到引擎js: '$egretjsname

    cd $publisFile/js
    record '开始处理:'$jsname
    record '生成临时文件...'
    cat $jsname | grep 'var Main=' > maintemp.min.js || exit 1
    sed -i ""  's/.*var Main=/var Main=/' maintemp.min.js || exit 1
    sed -i ""  's/Main.prototype,"Main");.*/Main.prototype,"Main");/' maintemp.min.js || exit 1
    record '合并Main到'$egretjsname
    cat maintemp.min.js >> $egretjsname || exit 1
    rm -rf maintemp.min.js
    record '合并完成并删除临时文件'
    crcgamejs=`crc32 $egretjsname`
    mv $egretjsname game.min_$crcgamejs.js || exit 1
    record '重命名:'$egretjsname '=>' game.min_$crcgamejs.js

    record '开始处理主js文件'
    sed -i ""  's/var Main=.*Main.prototype,"Main");//' $jsname || exit 1

    crcjs=`crc32 $jsname`
    mv $jsname main.min_$crcjs.js || exit 1
    record '重命名:'$jsname '=>' main.min_$crcjs.js

    cd $publisFile
    record '开始修改manifest版本号'
    sed -i ""  "s/$jsname/main.min_$crcjs.js/" manifest.json || exit 1
    sed -i ""  "s/$egretjsname/game.min_$crcgamejs.js/" manifest.json || exit 1

fi

trystr=`cat manifest.json | grep tween.min`
if [[ $trystr != '' ]];then
    echo '合并'
    needMerge='res,tween,socket,promise,particle';
    targetJs='';

    OLD_IFS="$IFS"
    IFS=","
    arr=($needMerge)
    IFS="$OLD_IFS"
    idx=0
    cd $publisFile
    for s in ${arr[@]}
    do
        let idx++
        tmpjs=$s
        tmpjs=`cat manifest.json | grep $tmpjs.min` || exit 1
        tmpjs=${tmpjs/*\"js/js}
        tmpjs=${tmpjs/.js\"*/.js}
        if [[ $idx -eq 1 ]];then
            targetJs=$tmpjs
            record '合并目标文件:'$targetJs
        else
            record '开始合并: '$tmpjs
            cat $tmpjs >> $targetJs
            rm -rf $tmpjs
            tmp2js=${tmpjs/*$s.min/$s.min}
            record '删除版本控制: '$tmpjs
            sed -i ""  "/$tmp2js/d" manifest.json || exit 1
        fi
    done
    record '修复manifest.json格式'
    dragonjs=`cat manifest.json | grep dragonBones.min` || exit 1
    dragonjs=${dragonjs/*dragonBones.min/dragonBones.min}
    dragonjs=${dragonjs/.js\"*/.js}
    sed -i ""  "s/$dragonjs\",/$dragonjs\"/" manifest.json || exit 1
    
fi

end_time0=$(date +%s)
echo '处理完成 (总耗时:'$[ $end_time0-$start_time0 ]'s)'
