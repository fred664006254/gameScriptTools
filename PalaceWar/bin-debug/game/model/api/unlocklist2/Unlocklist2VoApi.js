var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 功能解锁弹窗特效
 * author ycg
 * date 2020.6.19
 */
var Unlocklist2VoApi = /** @class */ (function (_super) {
    __extends(Unlocklist2VoApi, _super);
    function Unlocklist2VoApi() {
        var _this = _super.call(this) || this;
        _this._isAtHome = true;
        _this._isShowing = false;
        _this._showList = [];
        _this._baseId = null;
        _this._isInGuide = false;
        _this._isNeedWait = false;
        return _this;
    }
    //是否在府内
    Unlocklist2VoApi.prototype.setAtHome = function (isAtHome) {
        this._isAtHome = isAtHome;
    };
    Unlocklist2VoApi.prototype.getAtHome = function () {
        return this._isAtHome;
    };
    //是否可以刷新界面按钮
    Unlocklist2VoApi.prototype.setShowBase = function (name) {
        this._baseId = name;
    };
    Unlocklist2VoApi.prototype.clearBaseId = function () {
        this._baseId = null;
    };
    Object.defineProperty(Unlocklist2VoApi.prototype, "cfg", {
        //解锁列表
        get: function () {
            return Config.Unlocklist2Cfg;
        },
        enumerable: true,
        configurable: true
    });
    //是否在解锁列表内
    Unlocklist2VoApi.prototype.isInUnlockList = function (name) {
        if (!name) {
            return false;
        }
        var cfgList = this.cfg.getUnLockCfgList();
        for (var i = 0; i < cfgList.length; i++) {
            if (name == cfgList[i].gameName) {
                return true;
            }
        }
        return false;
    };
    //是否需要判断功能解锁
    Unlocklist2VoApi.prototype.checkShowOpenFunc = function () {
        if (Api.switchVoApi.checkOpenUnlockFuncEffect()) {
            var unlockData = Api.otherInfoVoApi.getOpenFunUnlockList2();
            if (unlockData) {
                return true;
            }
        }
        return false;
    };
    Unlocklist2VoApi.prototype.isNeedShowById = function (id) {
        var unlockData = Api.otherInfoVoApi.getOpenFunUnlockList2();
        if (unlockData) {
            if (unlockData[id]) {
                return false;
            }
            return true;
        }
        return false;
    };
    //是否需要弹特效
    Unlocklist2VoApi.prototype.isInNeedShowEffect = function (name) {
        if (!name) {
            return false;
        }
        if (this.isInUnlockList(name)) {
            var cfgList = Config.Unlocklist2Cfg.getUnlockCfgListByShow(true);
            for (var i = 0; i < cfgList.length; i++) {
                if (name == cfgList[i].gameName) {
                    if (this.isNeedShowById(cfgList[i].id) || this._baseId == cfgList[i].id) {
                        return true;
                    }
                    break;
                }
            }
        }
        return false;
    };
    Unlocklist2VoApi.prototype.checkWaitingShowInHome = function () {
        if (!this.checkShowOpenFunc()) {
            return;
        }
        this._isShowing = false;
        this._showList = [];
        var cfgList = Config.Unlocklist2Cfg.getNeedShowCfgListByType(2);
        App.LogUtil.log("checkWaitingShowInHome " + this._isAtHome);
        if (this._isAtHome) {
            cfgList = Config.Unlocklist2Cfg.getNeedShowCfgListByType(1);
            var friendCfg = this.getNeedShowCfgByName("friend");
            if (friendCfg) {
                this._showList.push(friendCfg);
            }
        }
        App.LogUtil.log("checkWaitingShowInHome 1");
        if (!cfgList) {
            return;
        }
        App.LogUtil.log("checkWaitingShowInHome 2");
        for (var i = 0; i < cfgList.length; i++) {
            if (cfgList[i].unlockOpen == 1) {
                var key = cfgList[i].gameName;
                var functionName = "checkOpen" + App.StringUtil.firstCharToUper(key);
                if (Api.switchVoApi[functionName]) {
                    if (!Api.switchVoApi[functionName]()) {
                        continue;
                    }
                }
                if (Api[key + "VoApi"] && Api[key + "VoApi"].isShowNpc) {
                    if (Api[key + "VoApi"].isShowNpc() && this.isInNeedShowEffect(key)) {
                        this._showList.push(cfgList[i]);
                    }
                }
            }
        }
        console.log("checkwaitingshowinhome ", this._showList);
        App.LogUtil.log("this.isInHomeCanShow() " + this.isInHomeCanShow());
        if (this._showList.length > 0 && this.isInHomeCanShow()) {
            if (!this._isAtHome) {
                this._isShowing = true;
                var data = this.getHomeEffectCfg(this._showList[0]);
                this._showList.shift();
                if (data.scrollX > -1) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_CITYSCENE_SCROLL, { data: data });
                }
                ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, { data: data });
            }
            else {
                var key = this._showList[0].gameName;
                var data = {};
                if (key == "friend") {
                    // this._isShowing = true;
                    if (Api.switchVoApi.checkOpenHouseBtnUp()) {
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_FUNCTION_OPEN_HOUSEFUNC, { key: "friend" });
                        data = {
                            icon: "mainui_friends_btn",
                            data: this._showList[0],
                            iconX: GameConfig.stageWidth - 116,
                            iconY: GameConfig.stageHeigth - 374,
                            iconW: 76,
                            iconH: 76
                        };
                    }
                    else {
                        data = {
                            icon: "mainui_friends_btn",
                            data: this._showList[0],
                            iconX: GameConfig.stageWidth - 76,
                            iconY: GameConfig.stageHeigth - 231,
                            iconW: 76,
                            iconH: 76
                        };
                    }
                    App.LogUtil.log("checkwaitingshowinhome data " + key);
                    ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, { data: data });
                }
            }
        }
    };
    Unlocklist2VoApi.prototype.getHomeEffectCfg = function (data) {
        var sceneName = "homeScene";
        var bgKey = "home";
        var nameX = 0;
        var nameY = 0;
        var scrollX = -1;
        var sceneWidth = 640;
        var sceneHeight = 1136;
        var nameBgW = 35;
        var nameBgH = 96;
        if (data.position == 2) {
            sceneName = "cityScene";
            bgKey = "city";
            var curCfg = Config.SceneCfg.getSceneCfgBySceneName(sceneName, Api.otherInfoVoApi.getCurSceneId(sceneName));
            if (Api.otherInfoVoApi.isSceneCanScroll(sceneName)) {
                if (data.gameName == "alliance") { //帮会
                    scrollX = 640;
                }
                else if (data.gameName == "studyatk") { //演武场
                    scrollX = 0;
                }
                else if (data.gameName == "conquest") { //征伐
                    scrollX = 0;
                }
                else if (data.gameName == "trade") { //商贸
                    scrollX = 1280;
                }
                else if (data.gameName == "council") { //议事院
                    scrollX = 640;
                }
                sceneWidth = 1920;
                sceneHeight = 1003;
            }
            nameY = curCfg.namePosCfg[data.gameName + "name"] ? curCfg.namePosCfg[data.gameName + "name"].y : curCfg.posCfg[data.gameName].y;
            nameX = curCfg.namePosCfg[data.gameName + "name"] ? curCfg.namePosCfg[data.gameName + "name"].x : curCfg.posCfg[data.gameName].x;
        }
        else if (data.position == 1) {
            var curCfg = Config.SceneCfg.getSceneCfgBySceneName(sceneName, Api.otherInfoVoApi.getCurSceneId(sceneName));
            if (Api.otherInfoVoApi.isSceneCanScroll(sceneName)) {
            }
            nameY = curCfg.namePosCfg[data.gameName + "name"] ? curCfg.namePosCfg[data.gameName + "name"].y : curCfg.posCfg[data.gameName].y;
            nameX = curCfg.namePosCfg[data.gameName + "name"] ? curCfg.namePosCfg[data.gameName + "name"].x : curCfg.posCfg[data.gameName].x;
        }
        var nameBg = bgKey + "npc" + data.gameName + "name";
        if (PlatformManager.checkIsTextHorizontal()) {
            nameBgW = 148;
            nameBgH = 30;
        }
        return {
            data: data,
            iconX: nameX,
            iconY: nameY,
            icon: nameBg,
            iconW: nameBgW,
            iconH: nameBgH,
            sceneWidth: sceneWidth,
            sceneHeight: sceneHeight,
            scrollX: scrollX,
            isHome: true
        };
    };
    //是否需要显示解锁，府内府外建筑除外
    Unlocklist2VoApi.prototype.checkNeedShowByName = function (name) {
        if (!name) {
            return false;
        }
        var cfg = this.cfg.getUnlockCfgByName(name);
        if (!cfg) {
            return false;
        }
        if (name == "friend" || name == "servantExile" || name == "wifebanish" || name == "wifebattle") {
            if (Api[name + "VoApi"] && Api[name + "VoApi"].isShowNpc) {
                if (Api[name + "VoApi"].isShowNpc() && this.isInNeedShowEffect(name)) {
                    return true;
                }
            }
        }
        else if (name == "practice") {
            if (Api[name + "VoApi"] && Api[name + "VoApi"].isPlayerPracticeEnable) {
                if (Api[name + "VoApi"].isPlayerPracticeEnable() && this.isInNeedShowEffect(name)) {
                    return true;
                }
            }
        }
        else if (name == "officialCareer") {
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv() && this.isInNeedShowEffect(name)) {
                return true;
            }
        }
        return false;
    };
    //是否可以显示按钮 在此加条件时需确认是否有voApi, isshownpc中是否有开关判断
    Unlocklist2VoApi.prototype.checkIsCanShowFunc = function (name) {
        if (!name) {
            return true;
        }
        var cfg = this.cfg.getUnlockCfgByName(name);
        if (!cfg) {
            return true;
        }
        if (name == "friend" || name == "servantExile" || name == "wifebanish" || name == "wifebattle") {
            if (Api[name + "VoApi"] && Api[name + "VoApi"].isShowNpc) {
                if (Api[name + "VoApi"].isShowNpc() && (!this.isInNeedShowEffect(name))) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else if (name == "practice") {
            if (Api[name + "VoApi"] && Api[name + "VoApi"].isPlayerPracticeEnable) {
                if (Api[name + "VoApi"].isPlayerPracticeEnable() && (!this.isInNeedShowEffect(name))) {
                    return true;
                }
            }
        }
        else if (name == "officialCareer") {
            if (Api.switchVoApi.checkOpenOfficialCareer() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv() && (!this.isInNeedShowEffect(name))) {
                return true;
            }
        }
        return false;
    };
    //功能按钮配置
    Unlocklist2VoApi.prototype.getNeedShowCfgByName = function (name) {
        if (!name) {
            return null;
        }
        var isShow = this.checkNeedShowByName(name);
        if (isShow) {
            var cfg = this.cfg.getUnlockCfgByName(name);
            if (!cfg) {
                return null;
            }
            return cfg;
        }
        return null;
    };
    /** 功能内 解锁*/
    Unlocklist2VoApi.prototype.checkWaitingShowByName = function (name) {
        var data = this.getWaitingShowDataByName(name);
        if (data) {
            ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, { data: data });
        }
    };
    //功能内系列解锁
    Unlocklist2VoApi.prototype.checkWaitingShowInFunc = function (type, name) {
        if (!type && (!name)) {
            return;
        }
        if (!this.isCanShow()) {
            return;
        }
        if (!this.checkShowOpenFunc()) {
            return;
        }
        App.LogUtil.log("checkWaitingShowInFunc " + type);
        if (type) {
            var inFuncList = [];
            if (type == "wife") {
                var checkList = ["wifebanish", "wifebattle"];
                for (var i = 0; i < checkList.length; i++) {
                    var data = this.getWaitingShowDataByName(checkList[i]);
                    if (data) {
                        inFuncList.push(data);
                    }
                }
            }
            else if (type == "player") {
                var checkList = ["practice", "officialCareer"];
                for (var i = 0; i < checkList.length; i++) {
                    var data = this.getWaitingShowDataByName(checkList[i]);
                    if (data) {
                        inFuncList.push(data);
                    }
                }
            }
            console.log("infunclist ", inFuncList);
            if (inFuncList.length > 0) {
                ViewController.getInstance().openView(ViewConst.COMMON.UNLOCKFUNCTIONVIEW, { data: inFuncList[0] });
            }
        }
        else if (name) {
            this.checkWaitingShowByName(name);
        }
    };
    Unlocklist2VoApi.prototype.getWaitingShowDataByName = function (name) {
        if (!name) {
            return null;
        }
        if (this.checkNeedShowByName(name)) {
            var data = {};
            var cfg = this.cfg.getUnlockCfgByName(name);
            if (!cfg) {
                return;
            }
            if (name == "servantExile") {
                data = {
                    data: cfg,
                    icon: "btn2_big_tab",
                    iconStr: "servantViewTab2Title_exile",
                    iconX: GameConfig.stageWidth / 2,
                    iconY: 94,
                    iconW: 218,
                    iconH: 50,
                    type: "servant"
                };
            }
            else if (name == "wifebanish") {
                data = {
                    data: cfg,
                    icon: "wifebanish_btn",
                    iconStr: "",
                    iconX: GameConfig.stageWidth - 141,
                    iconY: 95,
                    iconW: 136,
                    iconH: 116,
                    type: "wife"
                };
            }
            else if (name == "wifebattle") {
                data = {
                    data: cfg,
                    icon: "wifebattleshanzi",
                    iconStr: "",
                    iconX: GameConfig.stageWidth - 173,
                    iconY: GameConfig.stageHeigth - 253,
                    iconW: 158,
                    iconH: 153,
                    type: "wife"
                };
            }
            else if (name == "practice") {
                data = {
                    data: cfg,
                    icon: "player_tab2",
                    iconStr: "",
                    iconX: this.checkIsCanShowFunc("officialCareer") ? 340 : 473,
                    iconY: GameConfig.stageHeigth - 117,
                    iconW: 120,
                    iconH: 120,
                    type: "player"
                };
            }
            else if (name == "officialCareer") {
                data = {
                    data: cfg,
                    icon: "player_tab4",
                    iconStr: "",
                    iconX: this.checkIsCanShowFunc("practice") ? 500 : 473,
                    iconY: GameConfig.stageHeigth - 117,
                    iconW: 120,
                    iconH: 120,
                    type: "player"
                };
            }
            return data;
        }
        return null;
    };
    //是否可以展示特效
    Unlocklist2VoApi.prototype.isInHomeCanShow = function () {
        var hasView = ViewController.getInstance().checkHasShowedView();
        App.LogUtil.log("isInHomeCanShow " + this.isCanShow() + " hasview " + hasView + " this._isNeedWait " + this._isNeedWait);
        if (this.isCanShow() && (!hasView) && (!this._isNeedWait)) {
            return true;
        }
        return false;
    };
    Unlocklist2VoApi.prototype.isCanShow = function () {
        App.LogUtil.log("isCanShow " + Api.rookieVoApi.isGuiding + " Api.rookieVoApi.isInGuiding " + Api.rookieVoApi.isInGuiding + " isinGuideFlag " + this._isInGuide);
        if (this._isShowing || Api.rookieVoApi.isGuiding || Api.rookieVoApi.isInGuiding || this._isInGuide) {
            return false;
        }
        return true;
    };
    Unlocklist2VoApi.prototype.dispose = function () {
        this._isAtHome = true;
        this._isShowing = false;
        this._showList = [];
        this._baseId = null;
        this._isInGuide = false;
        this._isNeedWait = false;
        _super.prototype.dispose.call(this);
    };
    return Unlocklist2VoApi;
}(BaseVoApi));
//# sourceMappingURL=Unlocklist2VoApi.js.map