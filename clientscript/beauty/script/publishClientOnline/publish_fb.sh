#!/bin/bash
zip=$1
log=$2
plat=$3
if [ "$log" = "" ]
then
    log='Graph API upload'
fi

echo '开始上传' $plat
token=''
if [[ $plat == "fbtw" ]];then
    token='EAAYsfZAxiFmMBAIVLn0hv4hEV0vOujpFsKgEzcxMSUTrLvQXD0El6XnOg2ZChSv670QUUWquSO4xZBRFFW9Gkbb9UZBo12kGrRnbdsUVB6bhO6ookiGqF6KfZBqYKeuzYNHZAK04TnSL2S0cdrIUEDrRJAM591gmotIne1jHHXnAZDZD'
    echo '开始上传facebook小游戏zip包'
    curl -X POST https://graph-video.facebook.com/1523695954415165/assets  -F 'access_token='$token -F 'type=BUNDLE' -F 'asset=@'$zip -F 'comment='$log || exit 1
    echo 'facebook游戏zip包上传完成，请到facebook开发者后台操作测试'
    # open https://developers.facebook.com/apps/652787608466112/hosting/?business_id=1676672979303457
else
    token='EAAYsfZAxiFmMBABQGzm11SGAVJ8cPyiGk8hpctMXfVWUTFjcVsSJ4QO0HoNZBSuhoUPX9UcQe8gnlcsP3lQigqZCq8G71TRKSREQBrKLpz4EpYHBpRzZBkx4fLmNaOmZAb5FLFIzZBF4uGSxMWpYubcpVIXZAxcBFW6ipZBDoAqFyAZDZD';
    echo '开始上传facebook小游戏zip包'
    curl -X POST https://graph-video.facebook.com/262644120947598/assets  -F 'access_token='$token -F 'type=BUNDLE' -F 'asset=@'$zip -F 'comment='$log || exit 1
    echo 'facebook游戏zip包上传完成，请到facebook开发者后台操作测试'
    # open https://developers.facebook.com/apps/328119171335665/instant-games/hosting/?business_id=2065310210353562
fi
