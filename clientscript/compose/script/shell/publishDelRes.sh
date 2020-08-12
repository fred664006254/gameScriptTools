#!/bin/bash

SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

cd $filepath
publishFile=$1
plat=$2
isco=$3
platFile=$publishFile"/"$plat
cd $platFile

echo '清理' $plat

echo 'cleanuping'
svn cleanup
echo 'reverting'
svn revert -R .
echo 'removeing'
svn stat | grep \\\? | awk '{print $2}' | xargs rm -rf || exit 1
echo 'uping'
svn up

/usr/local/bin/node $filepath/../syncRes/publishDelRes.js $publishFile $plat
resourceFile=$platFile"/gt_"$plat"/resource"
if [[ $plat == 'lm' ]]; then
    resourceFile=$resourceFile'allin'
fi
echo 'isco'$isco
if [[ $isco != '' ]]; then
    if [ -d "$resourceFile" ]; then
        cd $resourceFile
        echo '提交svn'
        svn stat | grep \\! | awk '{print $2}' | xargs svn remove || exit 1
        # svn add * --force || exit 1
        svn commit -m "清理资源目录"
    fi
fi