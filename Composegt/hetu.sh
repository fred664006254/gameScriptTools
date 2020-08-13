# 项目目录
filepath=$(cd "$(dirname "$0")"; pwd)

# 碎图父目录
filepath2=$(cd .. "$(dirname "$0")"; pwd)

prespath=$filepath/resource/assets

respath=$filepath2/resources/assets
onlypath=$1
isallmulu="1"

# 按目录找文件
function getdir(){
    for element in `ls $1`
    do  
        dir_or_file=$1"/"$element
        if [ -d $dir_or_file ]
        then 
            if [ "$onlypath" = "" ]
            then
                checkfileDic $dir_or_file
                if [ "$isallmulu" = "1" ]
                then
                    tmpsss=""
                else
                    if [[ "$dir_or_file" =~ "icon" ]];then
                        # icon目录不处理
                        tmpsss=""
                    elif [[ "$dir_or_file" =~ "public" ]];then
                        # public目录都是合图到public目录下面
                        hetu $dir_or_file ${dir_or_file/$respath/$prespath}.json
                    elif [[ "$dir_or_file" =~ "effect" ]];then
                            # effect目录都是合图到effect目录下面
                            hetu $dir_or_file ${dir_or_file/$respath/$prespath}.json
                    elif [[ "$dir_or_file" =~ "view" ]];then
                        if [[ "$element" =~ "view" ]];then
                            # view目录下对应view界面合并到对应view目录
                            hetu $dir_or_file ${dir_or_file/$respath/$prespath}/$element.json
                        else
                            # 每个view界面目录下面的子目录合并到对应view目录
                            hetu $dir_or_file ${dir_or_file/$respath/$prespath}.json
                        fi
                    fi
                fi
                getdir $dir_or_file
            else
                if [ "$onlypath" = "$element" ]
                then
                    checkfileDic $dir_or_file
                    if [ "$isallmulu" = "1" ]
                    then
                        tmpsss=""
                    else
                        if [[ "$dir_or_file" =~ "icon" ]];then
                            # icon目录不处理
                            echo 注意,icon无需不合图
                        elif [[ "$dir_or_file" =~ "public" ]];then
                            # public目录都是合图到public目录下面
                            hetu $dir_or_file ${dir_or_file/$respath/$prespath}.json
                        elif [[ "$dir_or_file" =~ "effect" ]];then
                            # effect目录都是合图到effect目录下面
                            hetu $dir_or_file ${dir_or_file/$respath/$prespath}.json
                        elif [[ "$dir_or_file" =~ "view" ]];then
                            if [[ "$element" =~ "view" ]];then
                                # view目录下对应view界面合并到对应view目录
                                hetu $dir_or_file ${dir_or_file/$respath/$prespath}/$element.json
                            else
                                # 每个view界面目录下面的子目录合并到对应view目录
                                hetu $dir_or_file ${dir_or_file/$respath/$prespath}.json
                            fi
                        fi
                    fi
                fi
                getdir $dir_or_file
            fi
        # else
        #     echo $dir_or_file
        fi
    done
}
function hetu(){
    ssss=1
    echo 正在合图 $1 to $2
    /Applications/TextureMerger.app/Contents/MacOS/TextureMerger -p $1 -o $2
}

function checkfileDic(){
    isallmulu="1"
    for element1 in `ls $1`
    do
        dir_or_file1=$1"/"$element1
        if [ -d $dir_or_file1 ]
        then
            tmptst="1"
        else
            exjjj="${element1##*.}"
            if [ "$exjjj" = "jpg" ] || [ "$exjjj" = "png" ] || [ "$exjjj" = "jpeg" ]
            then
                isallmulu="0"
            fi
        fi
    done
    # if [ "$isallmulu" = "1" ]
    # then
    #     echo $1 是全目录
    # else
    #     echo 
    # fi
}
if [ "$onlypath" = "" ]
then
    echo 请指定文件名，后续会支持自动合图
else
    getdir $respath
fi