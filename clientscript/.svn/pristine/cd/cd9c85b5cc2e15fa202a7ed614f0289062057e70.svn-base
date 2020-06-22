#!/bin/bash

SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

cd $filepath

# 项目目录
# filepath=$(cd "$(dirname "$0")"; pwd)

# 碎图父目录
filepath2=$(cd ../../../ "$(dirname "$0")"; pwd)

plat=$1
operaparam=$2
cleanplat=$3

if [ "$plat" = "" ]
then
    echo "没有参数，退出" || exit 1
    exit 1
fi

publishfile=$filepath2/publishclient/$plat/
trunkfile=$filepath2/client/trunk/PalaceWar/template
testfile=$filepath2/publishclient/$plat/gt_test$plat/
zhengshifile=$filepath2/publishclient/$plat/gt_$plat/

echo 打包路径：$publishfile
# line=`sed -n '/test/=' 1.html`
# echo $line

cd $publishfile

# exit

echo "重置 $plat 目录资源到最新svn"
svnst=`svn st`
if [ "$svnst" = "" ]
then
    echo "无文件改变" || exit 1
else
    svn revert -R .
    rm -rf `svn st`
fi
svn up

syncTestToZS()
{
    echo 'st'
    local zsplat=$plat
    local plat=$1
    local testfile=$filepath2/publishclient/$zsplat/gt_test$plat/
    local zhengshifile=$filepath2/publishclient/$zsplat/gt_$plat/
    cd $publishfile

    # exit
    if [ "$cleanplat" = "" ];then
        svn up $trunkfile

        if [ -f "$publishfile/gt_$plat/index.php" ]; then
            if [ -f "$publishfile/gt_$plat/index.html" ]; then
                rm -rf $publishfile/gt_$plat/index.html || exit 1
            fi
            cp -rf $trunkfile/index.php $publishfile/gt_$plat/index.php || exit 1

            manifestline=`grep 'var manifestJsonName="manifest' $testfile'index.php'` || exit 1
            defaultline=`grep 'var defaultResJsonName="default' $testfile'index.php'` || exit 1
            cd $publishfile/gt_$plat
            if [[ $manifestline != '' ]];then
                sed -i ""  "s/var manifestJsonName=\"manifest.*/$manifestline/" index.php || exit 1
            fi
            if [[ $defaultline != '' ]];then
                sed -i ""  "s/var defaultResJsonName=\"default.*/$defaultline/" index.php || exit 1
            fi

        elif [ -f "$publishfile/gt_$plat/index.html" ]; then
            if [ ! -d /Library/WebServer/Documents/publish ];
            then
                echo '不存在 /Library/WebServer/Documents/publish 目录，无法生成最新index'
                exit 1
            else
                cp -rf $trunkfile/index.php /Library/WebServer/Documents/publish/ || exit 1
                curl -d "publishplat=$plat" 127.0.0.1/publish/index.php > $publishfile/gt_$plat/index.html || exit 1
                manifestline=`grep 'var manifestJsonName="manifest' $testfile'index.html'` || exit 1
                defaultline=`grep 'var defaultResJsonName="default' $testfile'index.html'` || exit 1
                echo 'find mani' $manifestline
                echo 'find def' $defaultline
                cd $publishfile/gt_$plat
                if [[ $defaultline != '' ]];then
                    sed -i ""  "s/var defaultResJsonName=\"default.*/$defaultline/" index.html || exit 1
                fi
                if [[ $manifestline != '' ]];then
                    sed -i ""  "s/var manifestJsonName=\"manifest.*/$manifestline/" index.html || exit 1
                fi
            fi
        fi
    else
        echo "清理资源不生成index"
    fi
    cd $publishfile
    zhengshitagname=''
    if [ -f "$publishfile/gt_$plat/svn.log" ]; then
        zhengshitagname=`sed "s/.*tags\///" gt_$plat/svn.log`
    fi
    tagname=''
    if [ -f "$publishfile/gt_test$plat/svn.log" ]; then
        cp -r gt_test$plat/svn.log gt_$plat/svn.log || exit 1
        tagname=`sed "s/.*tags\///" gt_$plat/svn.log`
        echo "请确认本次更新版本：$tagname"
        
        if [ "$operaparam" != "onlineauto" ] ;
        then
            read -r -p "确定版本号没问题y，否则n [Y/n] " input
            case $input in
                [yY][eE][sS]|[yY])
                    echo "Yes，继续执行发布"
                    ;;

                [nN][oO]|[nN])
                    echo "打错包了，退出"
                    exit 1
                        ;;

                *)
                echo "输的什么鬼，同步终止"
                exit 1
                ;;
            esac
        fi

        echo `sed 's/ svn.*//' $publishfile/gt_$plat/svn.log` > svn1.log || exit 1
        tags=`sed 's/.*\.//' svn1.log`
        # if [ $tags -gt 30 ];then
        #     if [ -d "$publishfile/gt_$plat/resource/assets/view/rechargevipvIew" ]; then
        #         mv $publishfile/gt_$plat/resource/assets/view/rechargevipvIew $publishfile/gt_$plat/resource/assets/view/rechargevipview
        #         difff=`svn st $publishfile/gt_$plat/resource/assets/view/`
        #         if [ "$difff" = "" ]
        #         then
        #             echo ''
        #         else
        #             rm -rf $publishfile/gt_$plat/resource/assets/view/rechargevipview
        #             svn remove $publishfile/gt_$plat/resource/assets/view/rechargevipvIew
        #         fi
        #         # svn commit $publishfile/gt_$plat/resource/assets/view/rechargevipvIew -m "发现充值界面改名，已处理"
        #     fi
        # fi
        rm -rf svn1.log
    else
        echo "没有充值资源目录改名，不处理"
    fi

    echo "不清理正式目录代码"
    # rm -rf gt_$plat/js/

    # if [[ "$plat" == "wanba" ]] || [[ "$plat" == "th" ]] ; then
        # echo "$plat 不清理资源"
    # else
    #     echo "$plat 开始清理资源"
    #     rm -rf gt_$plat/resource/
    # fi

    if [ "$cleanplat" = "" ]
    then
        echo "$plat 不清理资源"
    else
        echo "存在第三个参数，清理 $plat /resource"
        if [ "$zhengshitagname" = "$tagname" ]
        then
            rm -rf gt_$plat/resource/
        else
            echo "$plat 正式目录和测试目录版本不一致，终止同步 $zhengshitagname $tagname"
            svn revert -R .
            exit 1
        fi
    fi


    # echo $publishfile'gt_'$plat
    echo "开始cp代码和资源"
    cp -r gt_test$plat/js/ gt_$plat/js/ || exit 1
    cp -r gt_test$plat/resource/ gt_$plat/resource/ || exit 1
    cp -r gt_test$plat/manifest*.json gt_$plat/ || exit 1
    if [ -d gt_test$plat/loading/ ]; then
        cp -r gt_test$plat/loading/ gt_$plat/loading/ || exit 1
    fi
    if [ -d gt_test$plat/rsdk/ ]; then
        cp -r gt_test$plat/rsdk/ gt_$plat/rsdk/ || exit 1
    fi

    cd $publishfile'gt_'$plat

    echo "添加svn状态"
    svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1

    if [ "$cleanplat" = "" ];then
        svn add * --force || exit 1
    else
        diffM=`svn stat | grep \\M | awk '{print $2}'`
        diffA=`svn stat | grep \\\? | awk '{print $2}'`
        if [[ $diffM != "" ]] || [[ $diffA != "" ]];then
            echo "有非删除状态文件，不自动提交";
            echo "新增文件："$diffA
            echo "修改的文件："$diffM
            exit 1
        fi
    fi

    if [[ "$plat" == "" ]] ; then
        echo "添加index版本号"
        svnv=`svnversion -c |sed 's/^.*://' |sed 's/[A-Z]*$//'`
        sed -i "" 's/var mainJsonVersion=.*/var mainJsonVersion='$svnv';/' index.php
    else
        echo "$plat 不添加index固定版本号"
    fi

    if [ "$operaparam" = "" ] || [ "$operaparam" = "onlineauto" ] ;
    then
        echo "开始提交svn"
        svn commit -m "脚本同步正式目录，$tagname"
    else
        echo "存在第二个参数，不提交"
    fi
}
syncTestToZS $plat
for file in `ls $filepath2/publishclient/$plat/ | grep 'gt_test'$plat'_'`
do
    echo '11'$plat $file
    syncTestToZS ${file//gt_test/} || exit 1
done
