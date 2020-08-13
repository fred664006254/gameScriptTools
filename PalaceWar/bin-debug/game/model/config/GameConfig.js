var GameConfig;
(function (GameConfig) {
    GameConfig.stageWidth = NaN;
    GameConfig.stageHeigth = NaN;
    GameConfig.stageFullHeigth = NaN;
    GameConfig.stage = null;
    GameConfig.isLoaded = false;
    GameConfig.refreshUIResArr = ["gold", "food", "soldier", "gem", "level", "power", "exp"];
    GameConfig.platCfg = {};
    GameConfig.serverCfg = {};
    GameConfig.rookieCfg = {};
    GameConfig.version = "1.3.14";
    var wywreportData = {
        power: [2000, 5000, 10000, 50000, 100000, 200000, 500000, 1000000, 2000000]
    };
    /** 格式：数组第一位是安卓，第二位是IOS */
    GameConfig.areaCfg = {
        "asia": ["1003005045", "1003005047"],
        "euro": ["1003005046", "1003005048"]
    };
    GameConfig.areaSvrCfg = {
        "asia": "en",
        "euro": "en"
    };
    GameConfig.langList = [
        "en",
    ];
    GameConfig.localLangCfg = {
        "tw": "繁體中文",
        "en": "English",
        "pt": "Português"
    };
    GameConfig.noTipCmd = [
        "newboss.attack",
        "dailyboss.attack",
        "challenge.attack",
        // "atkrace.fight",
        "dinner.getdinnerdetail",
        // "laddertournament.fight",
        "policy.setread"
    ];
    /**
     * 根据统计ID获取大渠道标识
     * @param subAppId 默认统计ID，可不传，不传情况默认使用切区sdk传参的id
     */
    function getAreaBysubId(subAppId) {
        if (!subAppId) {
            subAppId = PlatformManager.getGameArea();
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
     * 差异化配置
     */
    var diffCfg = {};
    /**
     * 是否是新的差异化配置
     */
    GameConfig.isNewDiffCfg = false;
    /**
     * 差异化配置是否已经加载
     */
    GameConfig.isNewDiffCfgLoaded = false;
    /**
     * 流海屏流海高度
     */
    GameConfig.seaScreenTopH = 50;
    /**
     * iPhone X 底部横条
     */
    GameConfig.iphoneXButtomH = 30;
    /**
     * json配置文件
     */
    var config;
    (function (config) {
        // export let levelCfg:any={}; //已经解析，以后使用解析后的配置 Config.levelCfg
        config.searchbaseCfg = {};
        config.abilityCfg = {};
        config.abilitybaseCfg = {};
        config.challengeCfg = {};
        config.initCfg = {};
        config.interfaceCfg = {};
        config.itemCfg = {};
        config.modelCfg = {};
        config.servantbaseCfg = {};
        config.servantCfg = {};
        config.shopCfg = {};
        config.vipCfg = {};
        config.wifebaseCfg = {};
        config.wifeCfg = {};
        config.affairCfg = {};
        config.childCfg = {};
        config.childbaseCfg = {};
        config.challengestoryCfg = {};
        config.titleCfg = {};
        config.adultCfg = {};
        config.alliancebaseCfg = {};
        config.allianceCfg = {};
        config.bookroomCfg = {};
        config.studyatkbaseCfg = {};
        config.prisonbaseCfg = {};
        config.limitedrewardbaseCfg = {};
        config.conquestCfg = {};
        config.tradebaseCfg = {};
        config.wifeskinCfg = {};
        config.invitefriendCfg = {};
        config.shopnewCfg = {};
        config.buildingCfg = {};
        config.practicebaseCfg = {};
        config.wifestatusCfg = {};
        config.wifestatusbaseCfg = {};
        config.friendCfg = {};
        config.examCfg = {};
        config.emoticonCfg = {};
        /**
         * 场景配置
         */
        config.sceneCfg = {};
    })(config = GameConfig.config || (GameConfig.config = {}));
    function loadConfig() {
        var loadBigCfg = true; //PlatformManager.checkIsUseBigCfg();
        //test code 
        // loadBigCfg=true;
        // if(loadBigCfg)
        // {
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, loadOneCfgError, GameConfig);
        ResourceManager.loadItem(getConfigName(), loadOneCfgComplete, GameConfig);
        // }
        // else
        // {
        // 	ResourceManager.loadGroup("config",()=>
        // 	{
        // 		GameConfig.isLoaded=true;
        // 		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
        // 	},
        // 	loadOneCfgComplete,GameConfig);
        // }
    }
    GameConfig.loadConfig = loadConfig;
    function loadOneCfgError(e) {
        if (e.resItem.name == getConfigName()) {
            App.ResourceUtil.retrySwithCDN(e.resItem.name, function () {
                ResourceManager.loadItem(getConfigName(), loadOneCfgComplete, GameConfig);
            }, GameConfig);
        }
    }
    function loadOneCfgComplete(e) {
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, loadOneCfgError, GameConfig);
        if (e instanceof RES.ResourceEvent) {
            var resName = e.resItem.name;
            var name_1 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
            var cfgData = ResourceManager.getRes(resName);
            config[name_1] = cfgData;
            var configName = App.StringUtil.firstCharToUper(name_1);
            if (Config[configName] && Config[configName].formatData) {
                Config[configName].formatData(config[name_1]);
            }
        }
        else {
            if (typeof (e) == "object") {
                // for(let resName in e)
                // {
                // 	let name:string=resName.substr(0,resName.length-3)+App.StringUtil.firstCharToUper(resName.substr(resName.length-3));
                // 	config[name]=e[resName];
                // 	let configName:string=App.StringUtil.firstCharToUper(name);
                // 	// console.log(configName+"configName");
                // 	if(Config[configName]&&Config[configName].formatData)
                // 	{
                // 		Config[configName].formatData(config[name]);
                // 	}
                // }
                // GameConfig.isLoaded=true;
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
                var keysArray_1 = Object.keys(e);
                // let indx = 0;
                function runCachedFun(f) {
                    if (!keysArray_1.length) {
                        // alert("QAZ frame count "+indx);
                        egret.stopTick(runCachedFun, GameConfig);
                        GameConfig.isLoaded = true;
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
                    }
                    // indx++;
                    var timeFlag = egret.getTimer();
                    while (keysArray_1.length) {
                        var resName = keysArray_1.shift();
                        var name_2 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
                        config[name_2] = e[resName];
                        var configName = App.StringUtil.firstCharToUper(name_2);
                        // console.log(configName+"configName");
                        if (Config[configName] && Config[configName].formatData) {
                            Config[configName].formatData(config[name_2]);
                        }
                        if (egret.getTimer() - timeFlag > 30) {
                            break;
                        }
                    }
                    return false;
                }
                egret.startTick(runCachedFun, GameConfig);
            }
        }
    }
    function formatCfg2ByData(data, isNew) {
        for (var resName in data) {
            var name_3 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
            if (isNew) {
                if (!diffCfg.old) {
                    diffCfg.old = {};
                }
                diffCfg.old[name_3] = config[name_3];
            }
            else {
                if (!diffCfg["new"]) {
                    diffCfg["new"] = {};
                }
                diffCfg["new"][name_3] = config[name_3];
            }
            config[name_3] = data[resName];
            var configName = App.StringUtil.firstCharToUper(name_3);
            if (Config[configName] && Config[configName].formatData) {
                Config[configName].formatData(config[name_3]);
            }
        }
        GameConfig.isNewDiffCfg = isNew;
    }
    function loadNewConfig(callback) {
        var newCfgName = getConfigName() + "_new";
        if (RES.hasRes(newCfgName)) {
            return ResourceManager.loadItem(newCfgName, function (data) {
                formatCfg2ByData(data, true);
                GameConfig.isNewDiffCfgLoaded = true;
                if (callback) {
                    callback();
                }
            }, GameConfig);
        }
        if (callback) {
            callback();
        }
    }
    function switchNewOrOldCfg(useNew, successCallback, successCallbackThisObj, successCallbackParams) {
        if (GameConfig.isNewDiffCfg == !useNew) {
            if (useNew) {
                if (diffCfg["new"]) {
                    formatCfg2ByData(diffCfg["new"], true);
                    if (successCallback) {
                        return successCallback.apply(successCallbackThisObj, successCallbackParams);
                    }
                }
                else {
                    return loadNewConfig(function () {
                        successCallback.apply(successCallbackThisObj, successCallbackParams);
                    });
                }
            }
            else {
                if (diffCfg.old) {
                    formatCfg2ByData(diffCfg.old, false);
                    if (successCallback) {
                        return successCallback.apply(successCallbackThisObj, successCallbackParams);
                    }
                }
            }
        }
        return successCallback.apply(successCallbackThisObj, successCallbackParams);
    }
    GameConfig.switchNewOrOldCfg = switchNewOrOldCfg;
    function getConfigName() {
        var configResName;
        var languageResKey = GameData.getLanguageKey("gameconfig_"); //App.CommonUtil.getLanguageResKey();
        if (RES.hasRes(languageResKey)) {
            configResName = languageResKey;
        }
        else {
            configResName = "gameconfig_cn";
        }
        return configResName;
    }
    function preloadOneCfgComplete(e) {
        console.log("preloadOneCfgComplete ", e);
        if (e instanceof RES.ResourceEvent) {
            var resName = e.resItem.name;
            var name_4 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
            var cfgData = ResourceManager.getRes(resName);
            // config[name]=cfgData;
            var configName = App.StringUtil.firstCharToUper(name_4);
            if (Config.AcCfg[configName] && Config.AcCfg[configName].formatPreloadCfg) {
                Config.AcCfg[configName].formatPreloadCfg(config[name_4]);
            }
        }
        else {
            if (typeof (e) == "object") {
                var keysArray = Object.keys(e);
                // let indx = 0;
                console.log("preloadOneCfgComplete aaaa ", keysArray);
                for (var i = 0; i < keysArray.length; i++) {
                    var resName = keysArray[i];
                    if (resName != "v") {
                        var cfgData = e[resName];
                        var name_5 = resName.substr(0, resName.length - 3);
                        // config[name]=e[resName];
                        // let configName:string=App.StringUtil.firstCharToUper(name);
                        if (Config.AcCfg && Config.AcCfg.formatPreloadCfg) {
                            Config.AcCfg.formatPreloadCfg(name_5, cfgData);
                        }
                    }
                }
            }
        }
    }
    GameConfig.preloadOneCfgComplete = preloadOneCfgComplete;
    //预加载配置
    function getPreloadConfigName() {
        var configResName;
        var languageResKey = GameData.getLanguageKey("preloadconfig_"); //App.CommonUtil.getLanguageResKey();
        if (RES.hasRes(languageResKey)) {
            configResName = languageResKey;
        }
        else {
            configResName = "preloadconfig_cn";
        }
        return configResName;
    }
    GameConfig.getPreloadConfigName = getPreloadConfigName;
    /**
     * 获取品质颜色
     */
    function getQualityColor(quality) {
        var color = TextFieldConst.COLOR_QUALITY_WHITE;
        switch (Number(quality)) {
            case 1:
                color = TextFieldConst.COLOR_QUALITY_WHITE;
                break;
            case 2:
                color = TextFieldConst.COLOR_QUALITY_GREEN;
                break;
            case 3:
                color = TextFieldConst.COLOR_QUALITY_BLUE;
                break;
            case 4:
                color = TextFieldConst.COLOR_QUALITY_PURPLE;
                break;
            case 5:
                color = TextFieldConst.COLOR_QUALITY_RED;
                break;
            case 6:
                color = TextFieldConst.COLOR_RED_ORANGE;
                break;
            case 7:
                color = TextFieldConst.COLOR_QUALITY_ORANGE;
                break;
            case 8:
                color = TextFieldConst.COLOR_QUALITY_YELLOW2;
                break;
        }
        return color;
    }
    GameConfig.getQualityColor = getQualityColor;
    /**
     * 检测是否统计玩一玩权势
     */
    function checkWywReportPower(lastPower, power) {
        if (lastPower >= power) {
            return false;
        }
        var l = wywreportData.power.length;
        var findLast = false;
        var findNow = false;
        for (var i = 0; i < l; i++) {
            var value = wywreportData.power[i];
            if (lastPower < value && findLast == false) {
                findLast = true;
            }
            if (findLast) {
                if (power >= value) {
                    findNow = true;
                    return true;
                }
            }
        }
        return false;
    }
    GameConfig.checkWywReportPower = checkWywReportPower;
    /**
     * 特殊处理，港澳台，新加坡使用繁体
     */
    function getAreaLangKey() {
        var countryCode = PlatformManager.getGameCountryCode().toLowerCase();
        var gameLang = PlatformManager.getGameLanguage().toLowerCase();
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