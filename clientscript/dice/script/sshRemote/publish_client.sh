#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branches=$1
if [[ $branches == "wx" ]]; then
	host="lz-wx-web001.leishengame.com"
elif [[ $branches == "ls" ]]; then
	host="lz-ls-web01.leishengame.com"
elif [[ $branches =~ "iosshenhe" ]]; then
	host="lz-ios-shenhe.leishengame.com"

else
	echo "无此平台$branches"
	exit 1
fi
# ssh -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_clienttest.sh'
if [[ $branches =~ "iosshenhe" ]]; then
	shplat=${branches/iosshenhe/}
	shplat=${shplat/_/}
	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client.sh '$shplat || exit 1
else
	addstr=''
	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client'$addstr'.sh' || exit 1
fi
# ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'echo " "'