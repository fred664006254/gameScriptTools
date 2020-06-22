#!/bin/bash

SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd ../../../..  -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd ../../../..  -P "$( dirname "$SOURCE"  )" && pwd  )"
projectpath=/Users/publish/h5/gt_h5 || exit 1

if [[ ! -d $projectpath/client/rsdk-fb-js ]]; then
    git clone http://ke.chen%40rayjoy.com:chenke123@g.rjoy.com/zhili.yan/rsdk-fb-js.git $projectpath/client/rsdk-fb-js/
else
    cd $projectpath/client/rsdk-fb-js
    git pull
fi