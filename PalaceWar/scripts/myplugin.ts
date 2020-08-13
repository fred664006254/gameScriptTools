/**
 * 示例自定义插件，您可以查阅 http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/cmdExtensionPlugin/index.html
 * 了解如何开发一个自定义插件
 */
export class CustomPlugin implements plugins.Command {
    private mainPath: string=""; //保存 main.min.js 路径
    private filestr = "";

    constructor() {
        let allChar = this.allChar;
        let toNames = this.toNames;
        let role = this.role;

        for (let i = 0; i < allChar.length*allChar.length; i++) {
            let tmp = (Math.floor(i/allChar.length) + 1) % allChar.length;
            toNames.push((tmp === 0? "" : allChar[tmp-1]) +allChar[i%allChar.length])
        }
        for (var i = 0; i < toNames.length; i++) {
            var rndIndex = Math.floor(Math.random() * toNames.length);
            var tmpChangeVar = toNames[rndIndex];
            toNames[rndIndex] = toNames[i];
            toNames[i] = tmpChangeVar;
        }
        for (var i = 0; i < role.length; i++) {
            role[i].push("_C" + toNames[i]);
        }
    }

    private role : any[]= [
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
    private allChar = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
    // 随机库
    private toNames : any[] = [];
    
    async onFile(file: plugins.File) {
        const extName = file.extname;
        if (extName == ".js") {
            const pos = file.path.lastIndexOf(".");
            const prefix = file.path.slice(0, pos);
            //拆分成两个包
            if(file.basename.indexOf("main.min.js") >= 0){
                //先混淆
                let role = this.role;
                let fileStr = file.contents.toString();
                // for (var i = 0; i < role.length; i++) {
                //     if (typeof(role[i][1]) === "string") {
                //         fileStr = fileStr.replace(role[i][0], role[i][1]);
                //     }
                // }
                //拆分
                this.mainPath = file.relative;
                let tmpSplitIndex = fileStr.indexOf("__reflect", fileStr.length/2);
                let splitIndex = fileStr.indexOf("var", tmpSplitIndex);

                let part1 = fileStr.substr(0, splitIndex);
                file.contents = new Buffer(part1);

                const tmp2 = fileStr.indexOf("BaseDisplayObjectContainer=");
                let headScript = fileStr.substr(0, tmp2);
                this.filestr = headScript.substr(0, headScript.length) + fileStr.substr(splitIndex + 4);
                
            }
        }
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {
        let part2 = this.filestr;
        const pos = this.mainPath.lastIndexOf(".");
        const prefix = this.mainPath.slice(0, pos);
        //拆分成两个包
        commandContext.createFile(`${prefix}2.js`, new Buffer(part2));
    }
}