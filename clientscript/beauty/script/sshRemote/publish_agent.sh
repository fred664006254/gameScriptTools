#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

plat=$1
node=$2
host="192.168.12.113"
idx=0

function publish()
{
    if [ $idx -gt 5 ];then
        echo '尝试更新' $idx '次还不行，尽力了，手动更吧！'
        exit 1;
    else
        let idx+=1
        echo "第" $idx "次远程更新"
        if [[ $node == 'dabaomac' ]] || [[ $node =~ 'publicdabaomac' ]];then
            echo '打包机 直连'
            /Users/publish/h5/gt_h5/clientscript/script/sshRemote/publish_clienttest.sh $plat || { retrypublish || exit 1; };
        else
            echo '代理'
            /usr/local/bin/sshpass -p Mih3oB8P ssh -o stricthostkeychecking=no -tt gd_admin@$host 'bash /Users/publish/h5/gt_h5/clientscript/script/sshRemote/publish_clienttest.sh '$plat || { retrypublish || exit 1; };
        fi
    fi
}

function retrypublish() 
{
    publish || exit 1
}
publish $plat || exit 1