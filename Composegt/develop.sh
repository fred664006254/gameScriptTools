filepath=$(cd "$(dirname "$0")"; pwd)
cd $filepath
if [ "$1" = "build" -o "$1" = "onlycn" ]
then
    language="language"
    shield="shield"
    fromPath1=../../public
    fromPath2=../../../public
    fromPath3=../PalaceWarpublic
    toPath=$filepath/resource/config
    if [ -d $fromPath1/$language/ ]; then
        cp -rf $fromPath1/$language/* $toPath/language/
        echo cn文件从 $fromPath1/$language/ 覆盖到 $toPath/language/
    elif [ -d $fromPath2/$language/ ]; then
        cp -rf $fromPath2/$language/* $toPath/language/
        echo cn文件从 $fromPath2/$language/ 覆盖到 $toPath/language/
    elif [ -d $fromPath3/$language/ ]; then
        cp -rf $fromPath3/$language/* $toPath/language/
        echo cn文件从 $fromPath3/$language/ 覆盖到 $toPath/language/
    fi

    if [ -d $fromPath1/$shield/ ]; then
        cp -rf $fromPath1/$shield/* $toPath/shield/
        echo shield文件从 $fromPath1/$shield/ 覆盖到 $toPath/shield/
    elif [ -d $fromPath2/$shield/ ]; then
        cp -rf $fromPath2/$shield/* $toPath/shield/
        echo shield文件从 $fromPath2/$shield/ 覆盖到 $toPath/shield/
    elif [ -d $fromPath3/$shield/ ]; then
        cp -rf $fromPath3/$shield/* $toPath/shield/
        echo shield文件从 $fromPath3/$shield/ 覆盖到 $toPath/shield/
    fi

    if [ "$1" = "build" ]; then
        egret build -sourcemap
    fi
elif [ "$2" = "clean" ]
then
    egret build -e
elif [ "$3" = "publish" ]
then
    egret build publish
fi