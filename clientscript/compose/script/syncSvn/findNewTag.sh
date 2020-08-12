#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR


# svn log http://svn.rjoy.com:9080/repos/compose/client/tags/Composegt_1.1.0/favicon.ico --stop-on-copy | grep 'r[0-9]' |sed 's/ |.*//'|sed 's/.*r//'
# exit 0

tags=`svn ls http://svn.rjoy.com:9080/repos/compose/client/tags`
tags=${tags// / };
tagarr=($tags);
newestVersion=0
newestTag=''
# echo '查找最新tag ing...'
for tagname in ${tagarr[*]}
do
    taglog=`svn log http://svn.rjoy.com:9080/repos/compose/client/tags/"$tagname"favicon.ico --stop-on-copy | grep 'r[0-9]' |sed 's/ |.*//'|sed 's/.*r//'`
    # echo $tagname $taglog
    lastnum=${tagname:$l-2:1}
    l=${#tagname}
    n1=`echo $lastnum|sed 's/[0-9]//g'`
    if [[ $tagname =~ "Composegt_" ]] && [[ $n1 != $lastnum ]] ;then
        if [ $taglog -gt $newestVersion ];then
            newestVersion=$taglog
            newestTag=$tagname
        fi
    fi
done
# echo '找到了...'
newestTag=${newestTag//Composegt_/ };
newestTag=${newestTag//\// };
# echo 最新tag: $newestTag 创建tag的svn版本号 $newestVersion
echo $newestTag

# vs=${newestTag//./ };
# vsarr=($vs);
# l=${#vsarr[*]}
# newVersion=''
# idx=0
# for vnum in ${vsarr[*]}
# do
#     echo $vnum
#     let idx+=1
#     if [[ $idx -eq $l ]];then
#         let vnum+=1
#     fi
#     if [[ $newVersion == '' ]];then
#         newVersion=$newVersion$vnum
#     else
#         newVersion=$newVersion.$vnum
#     fi
# done
# echo $newVersion