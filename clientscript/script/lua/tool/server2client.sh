#!/bin/bash
cd /data/autodeploy/gt_config
svn update

/opt/tankserver/embedded/bin/lua /data/autodeploy/tool/server2client.lua

cd /data/autodeploy/gt_client/cfg
svn add * > /dev/null 2>&1
svn commit -m "自动更新配置文件"

sh /data/autodeploy/merge.sh || exit 1
