#!/bin/bash
# 项目目录
SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

cd $filepath

platname=$1 || exit 1
localpath=$2 || exit 1
childFile=$3 || exit 1
# 碎图父目录
projectpath=$(cd ../../.. "$(dirname "$0")"; pwd) || exit 1
filepath2=$projectpath/publishclient || exit 1

echo 发布 $localpath
if [ "$localpath" = "local" ]
then
    filepath2=$projectpath/publishclient/localtest || exit 1
fi
scriptpath=$projectpath/clientscript/script/versionMd5 || exit 1
clientpath=$(cd ../.. "$(dirname "$0")"; pwd) || exit 1
hexieplat='wanba,3k,xly,ty,xl,49y,cps,jj,fkcw,fkylc,wanba,wyw,mm,xy,lm,'

svnv=`svnversion -c |sed 's/^.*://' |sed 's/[A-Z]*$//'`
# exit 
if [ "$platname" = "test" ] || [ "$platname" = "plat" ]
then
 zhengshiname="test" || exit 1
 echo "test目录打包" || exit 1
# elif [[ $platname =~ "iosshenhe" ]]
# then
#     zhengshiname="iosshenhe" || exit 1
else
    zhengshiname=${platname//_test/} || exit 1
    zhengshiname=${zhengshiname//test/} || exit 1
    zhengshiname=${zhengshiname//_*/} || exit 1
fi


if [ "$platname" = "" ]
then
    echo "没有参数，退出" || exit 1
    exit
fi
echo '第三个参数' $childFile
if [[ $childFile == '' ]];then
    echo "开始合并最新的sound"
    rsync -r --delete --exclude='*.svn*' --exclude='*.git*' $clientpath/trunk/resources/sound/ $filepath/resource/sound/
    soundfilestatus=`svn st "$filepath/resource/sound"`
    if [[ $soundfilestatus != '' ]];then
        svn stat $filepath/resource/sound | grep \\! | awk '{print $2}' | xargs svn remove
        svn add $filepath/resource/sound/* --force
        svn ci $filepath/resource/sound/ -m '发布版本触发合并最新sound'
    fi
    echo $filepath2 || exit 1
    if [ ! -d $filepath2/$zhengshiname/gt_$platname ]
    then
        mkdir -p $filepath2/$zhengshiname/gt_$platname
    fi

    echo 删除上次 gt_$platname 发布版本文件 || exit 1
    rm -rf $filepath/bin-release/web/gt_$platname || exit 1
    echo 开始发布h5版本 || exit 1
    /usr/local/bin/egret publish --version gt_$platname || exit 1
    echo 处理loading icon || exit 1
    if [ -f $filepath/loding.jpg ];
    then
        cp $filepath/loding.jpg $filepath/bin-release/web/gt_$platname/loding.jpg || exit 1
    fi
    if [ -d $filepath/loading/ ];
    then
        cp -r $filepath/loading $filepath/bin-release/web/gt_$platname || exit 1
    fi

    if [ -f $filepath/vconsole.min.js ];
    then
        cp -r $filepath/vconsole.min.js $filepath/bin-release/web/gt_$platname/vconsole.min.js || exit 1
    fi
fi

# ${a/_*/}

# 处理资源
replaceResource()
{
    local defaultplatname=$platname
    local platname=$1
    if [[ $childFile == '' ]];then
        echo 删除gt_ $platname 的resource目录 || exit 1
        rm -rf $filepath2/$zhengshiname/gt_$platname/resource || exit 1
        echo 删除gt_ $platname 的js目录 || exit 1
        rm -rf $filepath2/$zhengshiname/gt_$platname/js || exit 1
        echo 复制文件 || exit 1
        cp -R $filepath/bin-release/web/gt_$defaultplatname/* $filepath2/$zhengshiname/gt_$platname || exit 1
        # echo 复制完成，删除原始文件目录 || exit 1
        # rm -rf $filepath/bin-release/web/gt_$platname || exit 1

        if [ -f "$filepath2/$zhengshiname/gt_$platname/index.php" ]; then
            if [ -f "$filepath2/$zhengshiname/gt_$platname/index.html" ]; then
                rm -rf $filepath2/$zhengshiname/gt_$platname/index.html || exit 1
            fi
            cp -rf $filepath/template/index.php $filepath2/$zhengshiname/gt_$platname/
        else

            if [ ! -d /Library/WebServer/Documents/publish/dice ]
            then
                sudo mkdir -p -m 777 /Library/WebServer/Documents/publish/dice
                sudo cp -rf $filepath/template/index.php /Library/WebServer/Documents/publish/dice/
            else
                cp -rf $filepath/template/index.php /Library/WebServer/Documents/publish/dice/
            fi

            if [ "$localpath" = "local" ]
            then
                curl -d "publishplat=$platname&local=$localpath" 127.0.0.1/publish/dice/index.php > $filepath2/$zhengshiname/gt_$platname/index.html
            else
                curl -d "publishplat=$platname" 127.0.0.1/publish/dice/index.php > $filepath2/$zhengshiname/gt_$platname/index.html
            fi

            # if [ -d $filepath2/$zhengshiname/gt_$zhengshiname ]
            # then

            #     publishparam2=""
            #     if [ "$localpath" = "local" ]
            #     then
            #         curl -d "publishplat=$zhengshiname&local=$localpath" 127.0.0.1/publish/index.php > $filepath2/$zhengshiname/gt_$zhengshiname/index.html
            #     else
            #         curl -d "publishplat=$zhengshiname" 127.0.0.1/publish/index.php > $filepath2/$zhengshiname/gt_$zhengshiname/index.html
            #     fi
            # fi
        fi

        # 二次覆盖 渠道资源目录 ，使用于 审核目录先使用默认渠道资源你替换，再使用渠道单独审核资源替换情况
        multifile2=''
        multifilePre=''
        if [ "$zhengshiname" = "iosshenhe" ]
        then
            echo '是审核服，检测多语言资源目录重定向' $platname
            shenheplat=${platname//iosshenhe_/} || exit 1
            shenheplat=${shenheplat//_*/} || exit 1
            multifile=$clientpath/trunk/resoucres_multi/assets_$shenheplat || exit 1
            if [[ $shenheplat != $platname ]];then
                multifile2=$clientpath/trunk/resoucres_multi/assets_$platname || exit 1
            fi
        else
            # multifile=$clientpath/trunk/resoucres_multi/assets_$zhengshiname || exit 1
            multifile=`getMultiResPath $platname 'assets' 'pre'`
            multifileEnd=`getMultiResPath $platname 'assets' 'end'`
            echo "multifile" $multifile
        fi
        if [[ "$platname" == "testidn" ]] || [[ "$platname" == "fben" ]]; then
            multifile=$clientpath/trunk/resoucres_multi/assets_en || exit 1
            multifileEnd=''
        elif [[ "$platname" == "fbtw" ]]; then
            multifile=$clientpath/trunk/resoucres_multi/assets_tw || exit 1
            multifileEnd=''
        fi

        if [ -d "$multifile" ]; then
            echo 存在多语言默认大区版本资源 $multifile || exit 1
            echo 开始合并多语言默认大区资源资源 || exit 1
            echo "$multifile/* $filepath2/$zhengshiname/gt_$platname/resource/assets/"
            cp -R $multifile/* $filepath2/$zhengshiname/gt_$platname/resource/assets/ || exit 1
        fi

        if [ -d "$multifileEnd" ]; then
            echo 存在大区包多语言版本资源 $multifileEnd || exit 1
            echo 开始合并大区包多语言资源资源 || exit 1
            echo "$multifileEnd/* $filepath2/$zhengshiname/gt_$platname/resource/assets/"
            cp -R $multifileEnd/* $filepath2/$zhengshiname/gt_$platname/resource/assets/ || exit 1
        fi

# 开始处理en_tw这种格式

        areaMultifile=`getMultiResPath $platname 'assets' ''`
        if [ -d "$areaMultifile" ]; then
            echo 存在大区单独多语言版本资源 $areaMultifile || exit 1
            echo 开始合并大区单独多语言资源资源 || exit 1
            echo "$areaMultifile/* $filepath2/$zhengshiname/gt_$platname/resource/assets/"
            cp -R $areaMultifile/* $filepath2/$zhengshiname/gt_$platname/resource/assets/ || exit 1
        fi

# 处理完毕
        if [ -d "$multifile2" ]; then
            echo 存在多语言版本资源 $multifile2 || exit 1
            echo 开始合并多语言资源资源 || exit 1
            echo "$multifile2/* $filepath2/$zhengshiname/gt_$platname/resource/assets/"
            cp -R $multifile2/* $filepath2/$zhengshiname/gt_$platname/resource/assets/ || exit 1
        fi

        if [[ $hexieplat =~ $zhengshiname ]]
        then
        echo "包含和谐"
        hexiemultifile=$clientpath/trunk/resoucres_multi/assets_hexie || exit 1
        if [ -d "$hexiemultifile" ]; then
            echo 存在和谐版本资源 || exit 1
            echo 开始合并和谐资源 || exit 1
            cp -R $hexiemultifile/* $filepath2/$zhengshiname/gt_$platname/resource/assets/ || exit 1
        fi
        else
        echo "不包含和谐"
        fi

        multsoundfile=''
        multsoundfileEnd=''
        if [ "$zhengshiname" = "iosshenhe" ]
        then
            echo '是审核服，检测多语言音效目录重定向' $platname
            shenheplat=${platname//iosshenhe_/} || exit 1
            shenheplat=${shenheplat//_*/} || exit 1
            multsoundfile=$clientpath/trunk/resources/sound_$shenheplat || exit 1
            if [[ $shenheplat != $platname ]];then
                multsoundfile=$clientpath/trunk/resources/sound_$platname || exit 1
            fi
        else
            # multsoundfile=$clientpath/trunk/resources/sound_$zhengshiname || exit 1
            multsoundfile=`getMultiResPath $platname 'sound' 'pre'`
            multsoundfileEnd=`getMultiResPath $platname 'sound' 'end'`
            echo $multsoundfile $multsoundfileEnd
        fi
        if [ -d "$multsoundfile" ]; then
            echo 存在多语言默认大区版本音效 $multsoundfile || exit 1
            echo 开始合并多语言默认大区音效 || exit 1
            cp -R $multsoundfile/* $filepath2/$zhengshiname/gt_$platname/resource/sound/ || exit 1
        else
            yuanshisoundfild=$clientpath/trunk/resources/sound_$zhengshiname || exit 1
            if [[ "$platname" == "testidn" ]] || [[ "$platname" == "fben" ]]; then
                yuanshisoundfild=$clientpath/trunk/resources/sound_en || exit 1
                multsoundfileEnd=''
            elif [[ "$platname" == "fbtw" ]]; then
                yuanshisoundfild=$clientpath/trunk/resources/sound_tw || exit 1
                multsoundfileEnd=''
            fi
            if [ -d "$yuanshisoundfild" ]; then
                echo 存在多语言默认大区版本音效原始目录 $yuanshisoundfild || exit 1
                echo 开始合并多语言默认大区音效原始目录 || exit 1
                cp -R $yuanshisoundfild/* $filepath2/$zhengshiname/gt_$platname/resource/sound/ || exit 1
            fi
        fi

        if [ -d "$multsoundfileEnd" ]; then
            echo 存在大区多语言版本音效 $multsoundfileEnd || exit 1
            echo 开始合并大区多语言音效 || exit 1
            cp -R $multsoundfileEnd/* $filepath2/$zhengshiname/gt_$platname/resource/sound/ || exit 1
        fi

        # 开始处理大区音频资源
        areaMultsoundfile=`getMultiResPath $platname 'sound' ''`
        if [ -d "$areaMultsoundfile" ]; then
            echo 存在大区单独多语言版本音效 $areaMultsoundfile || exit 1
            echo 开始合并大区单独多语言音效 || exit 1
            cp -R $areaMultsoundfile/* $filepath2/$zhengshiname/gt_$platname/resource/sound/ || exit 1
        fi
        # 处理完毕

        if [[ $hexieplat =~ $zhengshiname ]];
        then
            echo "包含和谐"
            hexiemultisound=$clientpath/trunk/resources/sound_hexie || exit 1
            if [ -d "$hexiemultisound" ]; then
                echo 存在和谐版本音效资源 || exit 1
                echo 开始合并和谐音效资源 || exit 1
                cp -R $hexiemultisound/* $filepath2/$zhengshiname/gt_$platname/resource/sound/ || exit 1
            fi
        fi
        echo 记录svn版本号 || exit 1
        echo $filepath svn版本号 $svnv > $filepath2/$zhengshiname/gt_$platname/svn.log || exit 1

    fi


    echo 开始添加资源版本号 || exit 1
    sh $projectpath/clientscript/script/shell/createDefaultVersion.sh $filepath2/$zhengshiname/gt_$platname $zhengshiname || exit 1

    if [[ "$platname" = "fben" ]] || [[ "$platname" = "fbtw" ]]
    then
        if [ ! -d $filepath2/$zhengshiname/gt_$platname ]
        then
            echo "缺少fbrsdk目录，"$filepath2/$zhengshiname/gt_$platname
            exit 1
        else
            echo '开始合并rsdk'
            cp -r $clientpath/rsdk-fb-js/RSDK-FB/release/ $filepath2/$zhengshiname/gt_$platname/rsdk/ ||exit 1
            echo 'rsdk合并完毕'
        fi

        if [ -f $projectpath/clientscript/script/publishClientOnline/fb/fbapp-config.json ]; then
            cp -r $projectpath/clientscript/script/publishClientOnline/fb/fbapp-config.json $filepath2/$zhengshiname/gt_$platname/
        fi
        
        log=`cat $filepath2/$zhengshiname/gt_$platname/svn.log`
        zhengshitagname=`sed "s/.*tags\///" $filepath2/$zhengshiname/gt_$platname/svn.log`
        if [ "$log" = "$zhengshitagname" ]
        then
            zhengshitagname=`sed "s/.*trunk\///" $filepath2/$zhengshiname/gt_$platname/svn.log`
        fi
        zhengshitagname=${zhengshitagname// svn版本号 /_}
        cd $filepath2/$zhengshiname/gt_$platname || exit 1
        rm -rf ./resource/other/wifeVideo
        rm -rf $filepath2/$zhengshiname/*.zip || exit 1
        echo '开始生成zip压缩包::'$zhengshitagname.zip
        zip -r -m -q $filepath2/$zhengshiname/$zhengshitagname.zip ./ || exit 1
        echo 'zip压缩包生成完成'
        sh $projectpath/clientscript/script/publishClientOnline/publish_fb.sh $filepath2/$zhengshiname/$zhengshitagname.zip $zhengshitagname $platname ||exit 1
    else
        if [[ ! -d $projectpath/client/rsdk-framework-js/ ]]; then
            git clone http://ke.chen%40rayjoy.com:chenke123@g.rjoy.com/plattech-rsdkh5/rsdk-framework-js/ $projectpath/client/rsdk-framework-js/
        else
            cd $projectpath/client/rsdk-framework-js/
            git pull
        fi
        # cp -R $projectpath/client/rsdk-js-release/* $filepath2/$zhengshiname/gt_$platname/rsdk/ || exit 1
        rsync -r --exclude='*.svn*' --exclude='*.git*' $projectpath/client/rsdk-framework-js/RSDK/release/ $filepath2/$zhengshiname/gt_$platname/rsdk/ || exit 1
        echo '开始处理版本号'
        sh $projectpath/clientscript/script/shell/createIndexVersion.sh $filepath2/$zhengshiname/gt_$platname/ || exit 1
        echo 发布成功，需要手动点提交 || exit 1
    fi
}

# $1 目录名 en en_tw en_pt
# $2 子目录标识 sound assets
# $3 取目录方式  例如en_tw，取默认大渠道en参数传为pre，取语言包tw参数传为end，取完整目录名传空字符''
getMultiResPath()
{
    local multiKey='';
    
    # 渠道名 en en_tw en_pt
    local platname=$1
    platname=${platname//_test/} || exit 1
    platname=${platname//test/} || exit 1

    #子目录标识 
    local reskey=$2

    # 是否是不经过处理的原始路径
    local directPath=$3

    local pathPre='';

    if [[ $reskey == 'assets' ]];then
        pathPre=$clientpath'/trunk/resoucres_multi/assets_'
    elif [[ $reskey == 'sound' ]];then
        pathPre=$clientpath'/trunk/resources/sound_'
    fi
    
    # 语言包标识
    local langFile=${platname//*_/} || exit 1
    # 默认大渠道标识
    local defaultArea=${platname//_*/} || exit 1

    if [[ $directPath == '' ]];then
        resultPath=''
        if [[ $platname != $langFile ]];then
            if [[ -d $pathPre$platname ]]; then
                resultPath=$pathPre$platname
            fi
        fi
    else
        resultPath=$pathPre$defaultArea
        if [[ ! -d $resultPath ]]; then
            resultPath=''
        else
            if [[ $defaultArea != $langFile ]]; then
                if [[ $directPath == 'end' ]];then
                    if [[ -d $pathPre$langFile ]]; then
                        resultPath=$pathPre$langFile
                    else
                        resultPath=''
                    fi
                fi
            else
                if [[ $directPath == 'end' ]];then
                    resultPath=''
                fi
            fi
        fi
    fi

    echo $resultPath
}

replaceResource $platname
if [[ $platname =~ "iosshenhe" ]];then
    echo 'shenhe不处理子目录'
else
    for file in `ls $filepath2/$zhengshiname/ | grep $platname'_'`
    do
        replaceResource ${file//gt_/}
    done
fi
echo 发布完成，删除原始备份目录 || exit 1
rm -rf $filepath/bin-release/web/gt_$platname || exit 1
