#!/bin/bash

# while [ -h "$SOURCE"  ]; do
#     DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
# done
# DIR="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

DIR=$(cd `dirname $0`; pwd)

cd $DIR

echo "更新svn trunk" $1

if [[ ! -d $DIR/../../../client/trunk ]]; then
    svn checkout http://svn.rjoy.com:9080/repos/dice/client/trunk $DIR/../../../client/trunk
fi

childFile=''
if [[ $1 != '' ]];then
     childFile=`$DIR/../cfg/clientFilePathCfg.sh trunk Dice $1`
     $DIR/../syncSvn/revertAndUpdate.sh $childFile
else
    $DIR/../syncSvn/revertAndUpdate.sh $DIR/../../../client/trunk
fi

