#!/bin/bash

configPath='/Users/publish/h5/dice/config'
jsonPath='/Users/publish/h5/dice/client/trunk/Dice/resource/config/json/'

if [[ $1 == 'tag' ]];then
    configPath='/Users/publish/h5/dice/client/trunk/config'
    jsonPath='/Users/publish/h5/dice/client/trunk/config/json/'
fi

cd  /Users/publish/h5/dice/clientscript/script/lua/tool
svn update
cd $configPath
svn update

cd $jsonPath
svn revert -R .
svn update

/opt/tankserver/embedded/bin/lua  /Users/publish/h5/dice/clientscript/script/lua/tool/merge.lua $configPath $jsonPath || exit 1

cd $jsonPath

addst=`svn stat | grep \\\? | awk '{print $2}'`

if [[ $addst != "" ]];then
    svn stat | grep \\\? | awk '{print $2}' | xargs svn add
fi

svnv=`svnversion -c $configPath |sed 's/^.*://' |sed 's/[A-Z]*$//'`

svn commit -m "自动更新配置文件，对应config目录版本号 $svnv"