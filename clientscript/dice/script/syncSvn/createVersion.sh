#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branches=$1
addBigV=$2
if [[ $addBigV != 'true' ]];then
    addBigV=''
fi
# version=$2  
version=`sh $DIR/findNewTag.sh`
echo $version
vs=${version//./ };
vsarr=($vs);
l=${#vsarr[*]}
ml=$l
let ml-=1
newVersion=''
idx=0
for vnum in ${vsarr[*]}
do
    let idx+=1
    if [[ $idx -eq $ml ]];then
        if [[ $addBigV != '' ]];then
            let vnum+=1
        fi
    elif [[ $idx -eq $l ]];then
        if [[ $addBigV != '' ]];then
            vnum=0
        else
            let vnum+=1
        fi
    fi
    if [[ $newVersion == '' ]];then
        newVersion=$newVersion$vnum
    else
        newVersion=$newVersion.$vnum
    fi
done
echo $newVersion
version=$newVersion

if [[ $branches =~ "b" ]];then
    branches="branches"
elif [[ $branches =~ "t" ]];then
    branches="tags"
fi

echo '参数分支名' $branches '版本' $version


echo '目标svn库目录' $branches/Dice_$version


svn list http://svn.rjoy.com:9080/repos/dice/client/$branches/Dice_$version || canCreate='1'
# sh ./updatePublicLanguage.sh
if [[ $canCreate == '1' ]]; then
    echo '生成trunk配置'
    /usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /data/autodeploy/merge.sh server' || exit 1
    echo '同步cn'
    sh $DIR/../publishClient/sync_language.sh || exit 1

    echo "创建tag $version 版本库"
    svn cp -m "打tag $version" http://svn.rjoy.com:9080/repos/dice/client/trunk/Dice http://svn.rjoy.com:9080/repos/dice/client/$branches/Dice_$version || exit 1

    if [[ ! -d $DIR/../../../public/language/.tags/$version ]]; then
        echo "生成tag $version 对应cn目录"
        mkdir $DIR/../../../public/language/.tags/$version
        rsync -r --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='.DS_Store' --exclude='*_zhs.json' $DIR/../../../public/language/ $DIR/../../../public/language/publish/
        rsync -r --delete --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='.DS_Store' --exclude='*_zhs.json' $DIR/../../../public/language/publish/ $DIR/../../../public/language/.tags/$version
        svn add $DIR/../../../public/language/.tags/$version
        svn ci $DIR/../../../public/language/.tags/$version $DIR/../../../public/language/publish/ -m "打tag $version 脚本创建对应版本的cn目录"
    fi

    sh $DIR/revertAndUpdate.sh  $DIR/../../../config/ || exit 1

    if [[ -d $DIR/../../../client/trunk/config ]]; then
        cd $DIR/../../../client/trunk/config
        svn up
        echo "处理 tag $version 对应配置"
        rsync -r --delete --exclude='*.svn*' --exclude='.DS_Store' $DIR/../../../config/ $DIR/../../../client/trunk/config
        svn stat | grep \\! | awk '{print $2}' | xargs svn remove
        svn revert -R json/
        svn add * --force
        svn ci -m "脚本打tag $version"
        echo '生成tag配置'
        /usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /data/autodeploy/merge_online.sh' || echo 'tag配置生成失败了，需要手动操作'
    fi
    echo '打tag成功'
else
    echo '已经存在tag' $version ，跳过并报错
    exit 1
fi