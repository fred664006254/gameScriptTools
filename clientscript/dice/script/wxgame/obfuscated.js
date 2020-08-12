
var fs = require('fs');
 
var arguments = process.argv.splice(2);
var filename = arguments[0];


/**
 * 规则
 */
var role = [
    [/BaseLoadDisplayObjectContiner/g],
    [/BaseDisplayObjectContainer/g],
    [/BaseLoadDragonBones/g],
    [/LocalStorageManager/g],
    [/BaseViewController/g],
    [/CircleProgressBar/g],
    [/BaseDisplayObject/g],
    [/SocketStateConst/g],
    [/ComponentManager/g],
    [/CustomMovieClip/g],
    [/ResourceManager/g],
    [/LanguageManager/g],
    [/SocketStateEnum/g],
    [/DragonBonesUtil/g],
    [/DragProgressBar/g],
    [/ViewController/g],
    [/BaseBitmapText/g],
    [/BaseLoadBitmap/g],
    [/BaseController/g],
    [/MessageHelper/g],
    [/BaseTextField/g],
    [/CollectEffect/g],
    [/SoundEffects/g],
    [/ResourceUtil/g],
    [/LayerManager/g],
    [/ClientSocket/g],
    [/ParticleUtil/g],
    [/TouchHelper/g],
    [/ProgressBar/g],
    [/TabBarGroup/g],
    [/DisplayUtil/g],
    [/DeviceUtil/g],
    [/BaseBitmap/g],
    [/CommonUtil/g],
    [/StringUtil/g],
    [/BaseButton/g],
    [/NetManager/g],
    [/NetLoading/g],
    [/BaseClass/g],
    [/BaseShape/g],
    [/BaseVoApi/g],
    [/BaseSound/g],
    [/RewardFly/g],
    [/VideoUtil/g],
    [/getlocal/g],
    [/BaseView/g],
    [/CheckBox/g],
    [/PowerFly/g],
    [/LoopLamp/g],
    [/MathUtil/g],
    [/DateUtil/g],
    [/LogUtil/g],
    [/SoundBg/g],
    [/BaseVo/g],
    [/TabBar/g],
    [/Base64/g],
    [/MainUINewTop/g],
    [/MainUITop/g],
    [/MainUI/g],
    [/LampRoll/g],
    [/PlatformCfg/g],
    [/RSDKHelper/g],
    [/WxGameInclude/g],
    [/PlatformManager/g],
    [/StatisticsHelper/g],
    [/ResBar/g],
    [/LoginLoading/g],
    [/LoginResLoader/g],
    [/SceneController/g],
    [/TimerManager/g],
    [/LoginManager/g],
    [/SoundManager/g],
    [/TickManager/g],
    [/BaseScene/g],
    [/ViewConst/g],
    [/LayoutConst/g],
    [/LocalStorageConst/g],
    [/TextFieldConst/g],
    [/NetRequestConst/g],
    [/NetPushConst/g],
    [/ItemEnums/g],
    [/RewardItemConst/g],
    [/ProgressBarConst/g],
    [/SoundConst/g],
    [/SceneConst/g],
    [/MessageConst/g],
    [/ButtonConst/g],
    [/GameData/g],
];
// 随机时要用到的字符
var allChar = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
// 随机库
var toNames = [];
for (var i = 0; i < allChar.length*allChar.length; i++) {
    var tmp = (Math.floor(i/allChar.length) + 1) % allChar.length;
    toNames.push((tmp === 0? "" : allChar[tmp-1]) +allChar[i%allChar.length])
}
// console.log(toNames);
for (var i = 0; i < toNames.length; i++) {
    var rndIndex = Math.floor(Math.random() * toNames.length);
    var tmpChangeVar = toNames[rndIndex];
    toNames[rndIndex] = toNames[i];
    toNames[i] = tmpChangeVar;
}

for (var i = 0; i < role.length; i++) {
    role[i].push("_C" + toNames[i]);
}
// console.log(role);
var Main = {
    main:function() {
        var fileStr = fs.readFileSync(filename, "utf-8");
        // console.log(fileStr);
        for (var i = 0; i < role.length; i++) {
            if (typeof(role[i][1]) === "string") {
                fileStr = fileStr.replace(role[i][0], role[i][1]);
            }
        }
        fs.writeFileSync(filename, fileStr);
    }
}
Main.main();