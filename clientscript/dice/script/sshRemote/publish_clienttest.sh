#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branches=$1

testStr='test'
# 第二个参数不是一定会有，目前只有本地多语言包会有
childPlat=$2

if [[ $branches == "test" ]]; then
	host="106.52.201.222"
	testStr=''
elif [[ $branches == "wx" ]]; then
	host="lz-wx-web001.leishengame.com"
elif [[ $branches == "ls" ]]; then
	host="lz-ls-web01.leishengame.com"
elif [[ $branches =~ "local" ]]; then
	host="192.168.8.95"
else
	echo "无此平台$branches"
	exit 1
fi
# ssh -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_clienttest.sh'
if [[ $branches =~ "iosshenhe" ]]; then
	shplat=${branches/iosshenhe/}
	shplat=${shplat/_/}
	shplat=${shplat/test/}
	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client.sh '$shplat || exit 1

elif [[ $branches =~ "local" ]]; then
	if [[ $branches =~ "client" ]]; then
		/usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /data/autodeploy/publish_all.sh' 'client' $childPlat || exit 1
	elif [[ $branches =~ "server" ]]; then
		/usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /data/autodeploy/publish_all.sh' 'server' || exit 1
	else
		/usr/local/bin/sshpass -p Game@888 ssh -o stricthostkeychecking=no -tt root@192.168.8.95 'bash /data/autodeploy/publish_all.sh' || exit 1
	fi
else
	addstr=''
	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client'$testStr$addstr'.sh'  || exit 1
fi
# ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'echo " "'