#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

branches=$1
if [[ $branches == "wanba" ]]; then
	# host="gt-wanba-web01.raygame3.com"
	host="118.89.36.157"
elif [[ $branches == "3k" ]]; then
	host="gt-cn-in.raygame3.com"
elif [[ $branches == "tw" ]]; then
	host="149.129.66.135"
elif [[ $branches == "xly" ]]; then
	# host="gt-xly-web01.raygame3.com"
	host="111.231.246.66"
elif [[ $branches == "yyb" ]]; then
	host="gt-yyb-web01.raygame3.com"
elif [[ $branches == "fkylc" ]]; then
	host="gt-fkylc-web01.raygame3.com"
elif [[ $branches == "xzy" ]]; then
	host="gt-xzy-web01.raygame3.com"
elif [[ $branches == "kr" ]]; then
	host="gt-kr-web01.mayngames.co.kr"
elif [[ $branches == "ewan" ]]; then
	host="gt-ewan-web01.raygame3.com"
elif [[ $branches == "49y" ]]; then
	host="gt-49y-web01.raygame3.com"
elif [[ $branches == "fkcw" ]]; then
	host="gt-fkcw-web01.raygame3.com"
elif [[ $branches == "cps" ]]; then
	host="gt-cps-web01.raygame3.com"
elif [[ $branches == "ty" ]]; then
	host="gt-ty-web01.raygame3.com"
elif [[ $branches == "xl" ]]; then
	host="gt-xl-web01.raygame3.com"
elif [[ $branches == "th" ]]; then
	host="gt-th-web01.heyyogame.com"
elif [[ $branches == "jj" ]]; then
	# host="gt-jj-web01.raygame3.com"	
	host="193.112.197.247"
elif [[ $branches == "mm" ]]; then
	host="gt-mm-web01.raygame3.com"	
elif [[ $branches == "en" ]] || [[ $branches == "pt" ]]; then
	# host="gt-en-web01.heyyogame.com"
	host="52.72.207.249"
elif [[ $branches == "ru" ]]; then
	host="gt-ru-web01.heyyogame.com"	
elif [[ $branches == "lm" ]]; then
	host="gt-lm-web01.raygame3.com"	
elif [[ $branches == "idn" ]]; then
	host="gt-idn-web01.raygame3.com"
elif [[ $branches == "xy" ]]; then
	host="gt-xy-web01.raygame3.com"	
elif [[ $branches == "qqgame" ]]; then
	host="gt-wanba-web01.raygame3.com"
elif [[ $branches =~ "iosshenhe" ]]; then
	host="gt-shenhe.raygame3.com"

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