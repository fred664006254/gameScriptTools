#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

/usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /data/autodeploy/publish_luascripts.sh'
