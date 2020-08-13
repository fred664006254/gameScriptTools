var GameConfig;
(function (GameConfig) {
    GameConfig.stageWidth = NaN;
    GameConfig.stageHeigth = NaN;
    GameConfig.stage = null;
    GameConfig.isLoaded = false;
    GameConfig.refreshUIResArr = ["gold", "food", "soldier", "gem", "level", "power", "exp"];
    GameConfig.platCfg = {};
    GameConfig.serverCfg = {};
    GameConfig.rookieCfg = {};
    /**
     * 差异化配置
     */
    var diffCfg = {};
    /**
     * 是否是新的差异化配置
     */
    var isNewDiffCfg = false;
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
        config.signupCfg = {};
        /**
         * 场景配置
         */
        config.sceneCfg = {};
        config.wanbagamegiftCfg = {};
        config.loginweekCfg = {};
        config.challengelvCfg = {};
    })(config = GameConfig.config || (GameConfig.config = {}));
    function loadConfig() {
        var loadBigCfg = true; //PlatformManager.checkIsUseBigCfg();
        //test code 
        // loadBigCfg=true;
        if (loadBigCfg) {
            ResourceManager.loadItem(getConfigName(), loadOneCfgComplete, GameConfig);
        }
        else {
            ResourceManager.loadGroup("config", function () {
                GameConfig.isLoaded = true;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
            }, loadOneCfgComplete, GameConfig);
        }
    }
    GameConfig.loadConfig = loadConfig;
    function loadOneCfgComplete(e) {
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
                for (var resName in e) {
                    var name_2 = resName.substr(0, resName.length - 3) + App.StringUtil.firstCharToUper(resName.substr(resName.length - 3));
                    config[name_2] = decoderCfg(resName, e[resName]); //e[resName];
                    var configName = App.StringUtil.firstCharToUper(name_2);
                    if (Config[configName] && Config[configName].formatData) {
                        Config[configName].formatData(config[name_2]);
                    }
                    else {
                        if (configName == "ChallengeCfg") {
                            ChallengeCfg.formatData(config[name_2]);
                        }
                    }
                }
                GameConfig.isLoaded = true;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_GAMECONFIG_LOADED);
            }
        }
    }
    var decodeCfg = {
        "servantbasecfg": ["upLv", "needItem", "reward", "abilityLv", "upgradeNeed", "skillUpgradeExp", "attItem", "skill", "servantLvList"],
        "challengecfg": ["big", "middle", "middleNum", "small", "smallNum", "type", "show", "atk", "soldier", "reward", "dialogue", "unlockPrison", "unlockMapGroup", "minLevelLimit", "showBoss", "dropRatio", "drop"],
        "maintaskcfg": ["unlockId", "questType", "openType", "openNeed", "need", "reward", "value"],
        "lerycfg": ["launch", "interval", "gold", "food", "soldier", "buffCount", "buffGroup", "progress", "condType", "condNum", "levyBuffID", "attType", "resType", "rate"],
        "personinfocfg": ["levyID", "goldCost", "weight", "exp", "firstReward", "rewards", "gold"]
    };
    var words = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    function decoderCfg(name, cfg) {
        var keycfg = decodeCfg[name];
        if (keycfg) {
            var str = JSON.stringify(cfg);
            var isreplace = false;
            for (var key in keycfg) {
                if (keycfg.hasOwnProperty(key)) {
                    var v = keycfg[key];
                    var needRep = words[key];
                    str = str.replace(new RegExp("#" + needRep, "g"), keycfg[key]);
                    // console.log("#"+needRep,keycfg[key]);
                    isreplace = true;
                }
            }
            isreplace && (cfg = JSON.parse(str));
        }
        return cfg;
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
                if (!diffCfg.new) {
                    diffCfg.new = {};
                }
                diffCfg.new[name_3] = config[name_3];
            }
            config[name_3] = data[resName];
            var configName = App.StringUtil.firstCharToUper(name_3);
            if (Config[configName] && Config[configName].formatData) {
                Config[configName].formatData(config[name_3]);
            }
        }
        isNewDiffCfg = isNew;
    }
    function loadNewConfig(callback) {
        var newCfgName = getConfigName() + "_new";
        if (GameData.isNewCfgFlag == 1) {
        }
        else {
            newCfgName = getConfigName() + "_new_" + GameData.isNewCfgFlag;
        }
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
        if (isNewDiffCfg == !useNew) {
            if (useNew) {
                if (diffCfg.new) {
                    formatCfg2ByData(diffCfg.new, true);
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
        var languageResKey = PlatformManager.getSpid();
        if (PlatformManager.checkIsLocal() || PlatformManager.checkIsIOSShenheSp()) {
            var tmpcnName = App.CommonUtil.getOption("language");
            if (tmpcnName && RES.hasRes("gameconfig_" + tmpcnName)) {
                languageResKey = tmpcnName;
            }
            else {
                if (PlatformManager.checkIsIOSShenheSp() && PlatformManager.checkIsTWBSp()) {
                    languageResKey = "tw";
                }
                if (PlatformManager.checkIsQQXYXSp()) {
                    languageResKey = "wanba";
                }
            }
        }
        // else if (PlatformManager.checkIsZjlySp())
        // {
        // 	languageResKey="zjly";
        // }
        if (RES.hasRes("gameconfig_" + languageResKey)) {
            configResName = "gameconfig_" + languageResKey;
        }
        else {
            configResName = "gameconfig_cn";
        }
        if (App.CommonUtil.getOption("configKey")) {
            configResName = "gameconfig_" + App.CommonUtil.getOption("configKey");
        }
        return configResName;
    }
})(GameConfig || (GameConfig = {}));
