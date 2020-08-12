#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branches=$1

# 第二个参数不是一定会有，目前只有本地多语言包会有
childPlat=$2

# if [[ $branches == "newhope2" ]]; then
# 	host="gdhc-newhope2-web01.leishenhuyu.com"
# elif [[ $branches =~ "local" ]]; then
# 	host="192.168.8.95"
# else
# 	echo "无此平台$branches"
# 	exit 1
# fi

host=`bash $DIR/./publish_getsshhost.sh $branches` || exit 1

# ssh -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_clienttest.sh'
if [[ $branches =~ "iosshenhe" ]]; then
	shplat=${branches/iosshenhe/}
	shplat=${shplat/_/}
	shplat=${shplat/test/}
	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client.sh '$shplat || exit 1
elif [[ $branches =~ "local" ]]; then
	if [[ $branches =~ "client" ]]; then
		ssh -o stricthostkeychecking=no -tt root@192.168.8.95  -p 22 'sudo bash /data/autodeploy/publish_all.sh' 'client' $childPlat || exit 1
	elif [[ $branches =~ "server" ]]; then
		ssh -o stricthostkeychecking=no -tt root@192.168.8.95  -p 22 'sudo bash /data/autodeploy/publish_all.sh' 'server' || exit 1
	else
		ssh -o stricthostkeychecking=no -tt root@192.168.8.95  -p 22 'sudo bash /data/autodeploy/publish_all.sh' || exit 1
	fi
else
	addstr=''
	if [[ $branches == "pt" ]]; then
		addstr='_'$branches
	fi
	# if [[ $branches == "th" ]]; then
		# if [[ $branches == "tw" ]]; then
		# 	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_clienttest.sh'
		# fi
	# 	host="gt-shenhe.raygame3.com"
	# 	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'bash /data/autodeploy/publish_agent.sh' test$branches  || exit 1
	# else
		ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_clienttest'$addstr'.sh'  || exit 1
	# fi
fi
# ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'echo " "'