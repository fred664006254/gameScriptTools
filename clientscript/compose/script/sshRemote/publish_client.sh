#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branches=$1
# if [[ $branches == "newhope2" ]]; then
# 	host="gdhc-newhope2-web01.leishenhuyu.com"
# elif [[ $branches =~ "iosshenhe" ]]; then
# 	host="gdhc-ios-shenhe.leishenhuyu.com"

# else
# 	echo "无此平台$branches"
# 	exit 1
# fi


host=`bash $DIR/./publish_getsshhost.sh $branches` || exit 1

# ssh -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_clienttest.sh'
if [[ $branches =~ "iosshenhe" ]]; then
	shplat=${branches/iosshenhe/}
	shplat=${shplat/_/}
	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client.sh '$shplat || exit 1
else
	addstr=''
	if [[ $branches == "pt" ]]; then
		addstr='_'$branches
	fi
	if [[ $branches == "qqgame" ]]; then
		# if [[ $branches == "tw" ]]; then
		# 	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client.sh'
		# fi
	# 	host="gt-shenhe.raygame3.com"
	# 	ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'bash /data/autodeploy/publish_agent.sh' $branches  || exit 1
	# elif [[ $branches == "qqgame" ]]; then
		host="gt-wanba-web01.raygame3.com"
		ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client_qqgame.sh' || exit 1
	
	else
		ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'sudo bash /data/autodeploy/publish_client'$addstr'.sh' || exit 1
	fi
fi
# ssh -o stricthostkeychecking=no -tt opsteam@$host  -p 10220 'echo " "'