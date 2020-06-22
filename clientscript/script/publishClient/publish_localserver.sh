#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

ssh -t root@192.168.8.82  -p 22 'sudo bash /data/autodeploy/publish_luascripts.sh'
