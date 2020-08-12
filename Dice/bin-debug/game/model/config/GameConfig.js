var GameConfig;
(function (GameConfig) {
    GameConfig.stageWidth = NaN;
    GameConfig.stageHeigth = NaN;
    GameConfig.stageFullHeigth = NaN;
    GameConfig.stageMaxHeight = 1280;
    GameConfig.stageMinHeight = 1136;
    GameConfig.stageMinWidth = 640;
    GameConfig.stage = null;
    GameConfig.isLoaded = false;
    var gameConfigName = null;
    /** 格式：数组第一位是安卓，第二位是IOS */
    GameConfig.areaCfg = {
        "asia": ["1003005045", "1003005047"],
        "euro": ["1003005046", "1003005048"]
    };
    GameConfig.areaSvrCfg = {
        "asia": "en",
        "euro": "en",
    };
    GameConfig.langList = [
        "en",
    ];
    GameConfig.localLangCfg = {
        "tw": "繁體中文",
        "en": "English",
        "pt": "Português",
    };
    /**
     * 怪物检测区域，按类型配置
     */
    GameConfig.monsterSize = {
        "1": { w: 60, h: 56 },
        "2": { w: 36, h: 32 },
        "3": { w: 102, h: 96 },
        "4": { w: 102, h: 96 },
    };
    GameConfig.noTipCmd = [];
    function init() {
        GameConfig.stage = egret.MainContext.instance.stage;
        var screenWidth = egret.MainContext.instance.stage.stageWidth;
        var screenHeight = egret.MainContext.instance.stage.stageHeight;
        if (App.DeviceUtil.checkIsIpadScreen()) {
            // pad屏
            GameConfig.stageWidth = GameConfig.stageMinWidth;
            GameConfig.stageHeigth = GameConfig.stageMinHeight;
        }
        else {
            // 正常屏或全面屏
            GameConfig.stageWidth = screenWidth;
            GameConfig.stageHeigth = Math.min(screenHeight, GameConfig.stageMaxHeight);
        }
    }
    GameConfig.init = init;
    /**
     * 根据统计ID获取大渠道标识
     * @param subAppId 默认统计ID，可不传，不传情况默认使用切区sdk传参的id
     */
    function getAreaBysubId(subAppId) {
        if (!subAppId) {
            subAppId = PlatMgr.getGameArea();
        }
        for (var key in GameConfig.areaCfg) {
            if (GameConfig.areaCfg.hasOwnProperty(key)) {
                var areaItem = GameConfig.areaCfg[key];
                if (areaItem.indexOf(subAppId) > -1) {
                    return key;
                }
            }
        }
        return "";
    }
    GameConfig.getAreaBysubId = getAreaBysubId;
    function getAreaTab() {
        var area = GameConfig.getAreaBysubId();
        var areaArr = Object.keys(GameConfig.areaCfg);
        var idx = areaArr.indexOf(area);
        areaArr.splice(idx, 1);
        areaArr.unshift(area);
        var tabStrArr = [];
        areaArr.forEach(function (element) {
            tabStrArr.push("areaTab_" + element);
        });
        return { area: areaArr, tab: tabStrArr };
    }
    GameConfig.getAreaTab = getAreaTab;
    function getSubAppIdByArea(area) {
        var id = "";
        if (GameConfig.areaCfg[area]) {
            if (App.DeviceUtil.isIOS()) {
                id = GameConfig.areaCfg[area][1];
            }
            else {
                id = GameConfig.areaCfg[area][0];
            }
        }
        return id;
    }
    GameConfig.getSubAppIdByArea = getSubAppIdByArea;
    /**
     * 流海屏流海高度
     */
    GameConfig.seaScreenTopH = 50;
    /**
     * iPhone X 底部横条
     */
    GameConfig.iphoneXButtomH = 30;
    function formatCfg() {
        var gameCfg = ResMgr.getRes(getConfigName());
        var keysArray = Object.keys(gameCfg);
        function runCachedFun(f) {
            if (!keysArray.length) {
                egret.stopTick(runCachedFun, GameConfig);
                GameConfig.isLoaded = true;
            }
            var timeFlag = egret.getTimer();
            while (keysArray.length) {
                var resName = keysArray.shift();
                var name_1 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
                var cfg = gameCfg[resName];
                GameConfig[name_1] = cfg;
                var configName = App.StringUtil.firstCharToUper(name_1);
                if (Config[configName] && Config[configName].formatData) {
                    Config[configName].formatData(cfg);
                }
                if (egret.getTimer() - timeFlag > 30) {
                    break;
                }
            }
            return false;
        }
        egret.startTick(runCachedFun, GameConfig);
    }
    GameConfig.formatCfg = formatCfg;
    function getConfigName() {
        if (!gameConfigName) {
            var configResName = void 0;
            var languageResKey = GameData.getLanguageKey("gameconfig_"); //App.CommonUtil.getLanguageResKey();
            if (RES.hasRes(languageResKey)) {
                configResName = languageResKey;
            }
            else {
                configResName = "gameconfig_cn";
            }
            gameConfigName = configResName;
        }
        return gameConfigName;
    }
    GameConfig.getConfigName = getConfigName;
    /**
     * 获取品质颜色
     */
    function getQualityColor(quality) {
        var color = ColorEnums.white;
        switch (Number(quality)) {
            case 1:
                color = ColorEnums.normal;
                break;
            case 2:
                color = ColorEnums.rare;
                break;
            case 3:
                color = ColorEnums.epic;
                break;
            case 4:
                color = ColorEnums.legend;
                break;
            default:
                color = ColorEnums.normal;
        }
        return color;
    }
    GameConfig.getQualityColor = getQualityColor;
    /**
     * 特殊处理，港澳台，新加坡使用繁体
     */
    function getAreaLangKey() {
        var countryCode = PlatMgr.getGameCountryCode().toLowerCase();
        var gameLang = PlatMgr.getGameLanguage().toLowerCase();
        var cnKey = gameLang;
        if (GameConfig.langList.indexOf(gameLang) < 0) {
            if (gameLang == "zh" && GameConfig.langList.indexOf("tw") > -1) {
                cnKey = "tw";
            }
        }
        if (!GameConfig.langList[cnKey]) {
            cnKey = "en";
        }
        return cnKey;
    }
    GameConfig.getAreaLangKey = getAreaLangKey;
})(GameConfig || (GameConfig = {}));
//# sourceMappingURL=GameConfig.js.map