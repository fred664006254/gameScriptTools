#!/bin/bash
filepath=$(cd "$(dirname "$0")"; pwd)
cd $filepath
language="language"
shield="shield"
names="names"
fromPath1=../../public
fromPath2=../../../public
fromPath3=../PalaceWarpublic
toPath=$filepath/resource/config
if [ -d $fromPath1/$language/ ]; then
    rsync -r --delete --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' --exclude='cn.json' --exclude='cn_type.json' $fromPath1/$language/publish/ $toPath/language/
    rsync -r --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' $fromPath1/$language/ $toPath/language/
    echo cn文件从 $fromPath1/$language/ 覆盖到 $toPath/language/
elif [ -d $fromPath2/$language/ ]; then
    rsync -r --delete --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' --exclude='cn.json' --exclude='cn_type.json' $fromPath2/$language/publish/ $toPath/language/
    rsync -r --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' $fromPath2/$language/ $toPath/language/
    echo cn文件从 $fromPath2/$language/ 覆盖到 $toPath/language/
elif [ -d $fromPath3/$language/ ]; then
    rsync -r --delete --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' --exclude='cn.json' --exclude='cn_type.json' $fromPath2/$language/publish/ $toPath/language/
    rsync -r --exclude='*.svn*' --exclude='*tags' --exclude='publish' --exclude='*_zhs.json' $fromPath3/$language/ $toPath/language/
    echo cn文件从 $fromPath3/$language/ 覆盖到 $toPath/language/
fi
egret build -e