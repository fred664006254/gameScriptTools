#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

host=''
branches=$1
if [[ $branches == "newhope2" ]]; then
	host="gdhc-newhope2-web01.leishenhuyu.com"
elif [[ $branches =~ "local" ]]; then
	host="192.168.8.95"
elif [[ $branches =~ "iosshenhe" ]]; then
	host="gdhc-ios-shenhe.leishenhuyu.com"

else
	echo "无此平台$branches"
	exit 1
fi

echo $host