#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

romate=$1

if [[ $romate =~ 'server' ]];then
    $DIR/../lua/tool/merge.sh
else
    /usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /Users/publish/h5/dice/clientscript/script/lua/tool/merge.sh ' || exit 1;
fi
