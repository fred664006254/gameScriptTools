var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 其他杂项api
 * author yanyuling
 * date 2017/10/27
 * @class PlayerVoApi
 */
var OtherInfoVoApi = (function (_super) {
    __extends(OtherInfoVoApi, _super);
    // private jd618CollectFlag:boolean = true;
    function OtherInfoVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 检测是否已膜拜
     */
    OtherInfoVoApi.prototype.isRankVisited = function (idx) {
        if (idx == 0) {
            return this.otherInfoVo.power;
        }
        if (idx == 1) {
            return this.otherInfoVo.challenge;
        }
        if (idx == 2) {
            return this.otherInfoVo.imacy;
        }
        if (idx == 3) {
            return this.otherInfoVo.gpower;
        }
        if (idx == 4) {
            return this.otherInfoVo.galliance;
        }
        if (idx == 5) {
            return this.otherInfoVo.gbiography;
        }
    };
    OtherInfoVoApi.prototype.getOtherInfo = function () {
        return this.otherInfoVo;
    };
    /**
    * 检测是否领取绑定奖励
    */
    OtherInfoVoApi.prototype.isGetBindingReward = function () {
        if (this.otherInfoVo.info.bindFlag && this.otherInfoVo.info.bindFlag == 1) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.getPalaceFlag = function () {
        return this.otherInfoVo.palace_flag;
    };
    //获取禁言剩余时间
    OtherInfoVoApi.prototype.getBanet = function () {
        return this.otherInfoVo.banet;
    };
    //获取禁言剩余时间
    OtherInfoVoApi.prototype.getCrossBanet = function () {
        return this.otherInfoVo.info.crossBanet;
    };
    //获取糖果屋领取情况
    OtherInfoVoApi.prototype.getCandyGetInfo = function () {
        return this.otherInfoVo.info.candy;
    };
    //疯狂游乐场关分享信息
    OtherInfoVoApi.prototype.getFkShareInfo = function () {
        return this.otherInfoVo.info.fkShare;
    };
    //疯狂游乐场关关注信息
    OtherInfoVoApi.prototype.getFkFocusInfo = function () {
        return this.otherInfoVo.info.fkFocus;
    };
    //疯狂游乐场分享红点
    OtherInfoVoApi.prototype.getFkIsshowRed = function () {
        if (!this.otherInfoVo.info.fkShare) {
            return false;
        }
        var rewards = Config.GameprojectCfg.rewardFKYLC2;
        var keys = Object.keys(rewards);
        var l = keys.length;
        var fkVo = Api.otherInfoVoApi.getFkShareInfo();
        for (var i = 0; i < l; i++) {
            var rewardStr = rewards[keys[i]];
            //state 1 未领取 2已经领取 3未达成
            var state = 1;
            if (!fkVo) {
                state = 3;
            }
            else {
                if (fkVo.n >= Number(keys[i])) {
                    if (fkVo.get[keys[i]] == 1) {
                        state = 2;
                    }
                    else {
                        state = 1;
                    }
                }
                else {
                    state = 3;
                }
            }
            if (state == 1) {
                return true;
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.checkShowWanbaDesktopIcon = function () {
        return PlatformManager.isSupportDesktopIcon() && !this.checkWanbaHasSendDesktop();
    };
    OtherInfoVoApi.prototype.checkShowWanbaShareIcon = function () {
        return PlatformManager.isSupportShare() && !this.checkWanbaDailyHasShared();
    };
    OtherInfoVoApi.prototype.checkWanbaHasSendDesktop = function () {
        return this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbsendFlag;
    };
    OtherInfoVoApi.prototype.checkWanbaDailyHasShared = function () {
        return this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.wbdailyshareFlag;
    };
    // 3k实名认证已领取 true 未领取
    OtherInfoVoApi.prototype.checkrealnamerewards = function () {
        if (this.otherInfoVo.info.author3k) {
            return false;
        }
        return true;
    };
    OtherInfoVoApi.prototype.getServantSortId = function () {
        var sortId = this.otherInfoVo.info.sortId;
        return sortId ? sortId : 1;
    };
    OtherInfoVoApi.prototype.getWifeSortId = function () {
        var wsortId = this.otherInfoVo.info.wsortId;
        return wsortId ? wsortId : 1;
    };
    OtherInfoVoApi.prototype.getUnlockList = function () {
        if (this.otherInfoVo.info) {
            var arr = this.otherInfoVo.info.unlockList;
        }
        return arr;
    };
    //功能解锁名字
    OtherInfoVoApi.prototype.getFunctionName = function () {
        var arr2 = this.getopenArr();
        if (arr2 == null) {
            return null;
        }
        var str = LanguageManager.getlocal("functionModuleDes" + arr2[0].key);
        return str;
    };
    //1 如果 有开关功能的功能预览  在本类getfunLength、getopenArr 这两个方法内加开关，
    //2 可参考 亲家，内阁等功能
    // 功能预览 显示列表 开关打开的， 
    OtherInfoVoApi.prototype.getopenArr = function (type) {
        if (type === void 0) { type = 0; }
        //领取数据  
        var arr = Api.otherInfoVoApi.getUnlockList();
        var arr2 = [];
        arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        var arr3 = []; //已经领取过的
        var arr4 = []; //可以领取的
        var arr5 = []; //不可以领取的
        for (var i = 0; i < arr2.length; i++) {
            if (arr && arr[arr2[i].key] == 1) {
                arr3.push(arr2[i]);
                if (arr3.length == this.getfunLength() && type != 1) {
                    return null;
                }
            }
            else {
                var currentName = arr2[i].gameName;
                if (currentName == "sadun" || currentName == "council" || currentName == "servantExile" || currentName == "wifebanish") {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    // 亲家
                    if (Api.switchVoApi.checkopenSadun() && arr2[i].gameName == "sadun") {
                        if (isShowNpc) {
                            arr4.push(arr2[i]);
                        }
                        else {
                            arr5.push(arr2[i]);
                        }
                    }
                    else if (arr2[i].gameName == "council" && Api.switchVoApi.checkOpenCouncil()) {
                        if (isShowNpc) {
                            arr4.push(arr2[i]);
                        }
                        else {
                            arr5.push(arr2[i]);
                        }
                    }
                    else if (arr2[i].gameName == "servantExile" && Api.switchVoApi.checkOpenExile()) {
                        if (isShowNpc) {
                            arr4.push(arr2[i]);
                        }
                        else {
                            arr5.push(arr2[i]);
                        }
                    }
                    else if (arr2[i].gameName == "wifebanish" && Api.switchVoApi.checkOpenBanish()) {
                        if (isShowNpc) {
                            arr4.push(arr2[i]);
                        }
                        else {
                            arr5.push(arr2[i]);
                        }
                    }
                }
                else if (currentName == "servantWeapon") {
                    if (Api.switchVoApi.checkWeaponFunctionOnly()) {
                        var isShowNpc = Api.weaponVoApi.isShowNpc();
                        if (isShowNpc) {
                            arr4.push(arr2[i]);
                        }
                        else {
                            arr5.push(arr2[i]);
                        }
                    }
                }
                else if (currentName == "wifeBattle") {
                    if (Api.switchVoApi.checkOpenWifeBattle()) {
                        if (Api.wifebattleVoApi.isShowNpc()) {
                            arr4.push(arr2[i]);
                        }
                        else {
                            arr5.push(arr2[i]);
                        }
                    }
                }
                else if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc) {
                        arr4.push(arr2[i]);
                    }
                    else {
                        arr5.push(arr2[i]);
                    }
                }
            }
        }
        arr3.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr4.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr5.sort(function (a, b) {
            if (a.sortId > b.sortId)
                return 1;
            else if (a.sortId == b.sortId)
                return 0;
            return -1;
        });
        arr2 = arr4.concat(arr5).concat(arr3);
        return arr2;
    };
    //当前解锁的长度
    OtherInfoVoApi.prototype.getfunLength = function () {
        var arr = Api.otherInfoVoApi.getUnlockList();
        var arr2 = [];
        arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        var arr3 = []; //已经领取过的
        var arr4 = []; //可以领取的
        var arr5 = []; //不可以领取的
        for (var i = 0; i < arr2.length; i++) {
            if (arr && arr[arr2[i].key] == 1) {
                arr3.push(arr2[i]);
            }
            else {
                var currentName = arr2[i].gameName;
                if (currentName == "sadun" || currentName == "council" || currentName == "servantExile" || currentName == "wifebanish" || currentName == "wifeBattle") {
                    // 亲家
                    if (Api.switchVoApi.checkopenSadun() && arr2[i].gameName == "sadun") {
                        arr5.push(arr2[i]);
                    }
                    else if (arr2[i].gameName == "council" && Api.switchVoApi.checkOpenCouncil()) {
                        arr5.push(arr2[i]);
                    }
                    else if (arr2[i].gameName == "servantExile" && Api.switchVoApi.checkOpenExile()) {
                        arr5.push(arr2[i]);
                    }
                    else if (arr2[i].gameName == "wifebanish" && Api.switchVoApi.checkOpenBanish()) {
                        arr5.push(arr2[i]);
                    }
                    else if (currentName == "wifeBattle" && Api.switchVoApi.checkOpenWifeBattle()) {
                        arr5.push(arr2[i]);
                    }
                }
                else if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    arr4.push(arr2[i]);
                }
            }
        }
        arr2 = arr4.concat(arr5).concat(arr3);
        return arr2.length;
    };
    //功能解锁红点
    OtherInfoVoApi.prototype.getFunctionRedhot = function () {
        var arr2 = Config.UnlocklistCfg.getUnlockItemCfgList();
        if (arr2 == null) {
            return false;
        }
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.unlockList) {
            var arr = this.otherInfoVo.info.unlockList;
            var boo = false;
            for (var i = 0; i < arr2.length; i++) {
                if (arr2[i].gameName == "wifeBattle") {
                    if (Api.switchVoApi.checkOpenWifeBattle()) {
                        if (Api.wifebattleVoApi.isShowNpc() && arr[arr2[i].key] != 1) {
                            boo = true;
                            return boo;
                        }
                    }
                }
                else if (Api[arr2[i].gameName + "VoApi"] && Api[arr2[i].gameName + "VoApi"].isShowNpc) {
                    var isShowNpc = Api[arr2[i].gameName + "VoApi"].isShowNpc();
                    if (isShowNpc && arr[arr2[i].key] != 1) {
                        boo = true;
                        return boo;
                    }
                }
            }
            return boo;
        }
        else {
            return false;
        }
    };
    OtherInfoVoApi.prototype.getCoverState = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.cover) {
            return this.otherInfoVo.info.cover;
        }
        else {
            return 0;
        }
    };
    /** 获取港台绑定账号奖励领取状态 */
    OtherInfoVoApi.prototype.getFBBindFlag = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.gtfbbindFlag) {
            return this.otherInfoVo.info.gtfbbindFlag;
        }
        else {
            return 0;
        }
    };
    OtherInfoVoApi.prototype.certification = function () {
        if (this.otherInfoVo.certification) {
            return true;
        }
        return false;
    };
    /**
     * 是否是新用户的
     */
    OtherInfoVoApi.prototype.isnewuser = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.isnewuser) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.isJD618RewardEnable = function () {
        if (this.isJDActiveIconVisible()) {
            var jd618 = this.otherInfoVo.jd618;
            if (jd618 && jd618.flag == 0) {
                return true;
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.isJDActiveIconVisible = function () {
        var jd618 = this.otherInfoVo.jd618;
        if (jd618 && jd618.st <= GameData.serverTime && jd618.et >= GameData.serverTime) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.getJD618ActivetyTimeStr = function () {
        if (this.isJDActiveIconVisible()) {
            var lt = this.otherInfoVo.jd618.et;
            if (lt - GameData.serverTime <= 86400 * 2) {
                return App.DateUtil.getFormatBySecond(lt - GameData.serverTime, 5);
            }
        }
        return "";
    };
    /**
     * 获取分享奖励的领取次数
     */
    OtherInfoVoApi.prototype.getShareGuideCount = function () {
        var count = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.shareguide) {
            return this.otherInfoVo.info.shareguide;
        }
        return count;
    };
    /**
     * 新分享面板的信息
     */
    OtherInfoVoApi.prototype.getGeneralShareInfo = function () {
        return this.otherInfoVo.info.generalshare;
    };
    /**
    * 玩吧回归礼包
    */
    OtherInfoVoApi.prototype.getReturnrewardWB6 = function () {
        return this.otherInfoVo.info.returnrewardWB6;
        // return 1;
    };
    OtherInfoVoApi.prototype.checkWanbaEGameHasReward = function () {
        return this.otherInfoVo.info && this.otherInfoVo.info.qqes && this.otherInfoVo.info.qqes.rflag;
    };
    OtherInfoVoApi.prototype.isEmpireOnlineNotice = function () {
        return this.otherInfoVo.banEmMsg != 1;
    };
    OtherInfoVoApi.prototype.getCurSceneId = function (sceneName) {
        if (sceneName === void 0) { sceneName = "homeScene"; }
        if (!this.otherInfoVo) {
            return "";
        }
        if (sceneName == "homeScene") {
            return this.otherInfoVo.skinWared ? String(this.otherInfoVo.skinWared) : "101";
        }
        else if (sceneName == "cityScene") {
            // return "202";
            return this.otherInfoVo.skinWared2 ? String(this.otherInfoVo.skinWared2) : "201";
        }
        else {
            return this.otherInfoVo.skinWared3 ? String(this.otherInfoVo.skinWared3) : "301";
        }
    };
    OtherInfoVoApi.prototype.setCurSceneId = function (s, sceneName) {
        if (sceneName === void 0) { sceneName = "homeScene"; }
        if (sceneName == "homeScene") {
            this.otherInfoVo.skinWared = s;
        }
        else if (sceneName == "cityScene") {
            this.otherInfoVo.skinWared2 = s;
        }
        else {
            this.otherInfoVo.skinWared3 = s;
        }
    };
    OtherInfoVoApi.prototype.getSceneResName = function (sceneName, sceneId) {
        if (sceneName === void 0) { sceneName = "homeScene"; }
        if (!this.otherInfoVo) {
            return "";
        }
        var sid = this.getCurSceneId(sceneName);
        if (sceneId) {
            sid = sceneId;
        }
        sceneName = sceneName.toLowerCase();
        var resName = sceneName + "_" + sid;
        if (sid == "202") {
            resName += "_" + this.getCitySceneType();
        }
        else if (sid == "303") {
            var stype = GameData.serverTime % 100 >= 50 ? "2" : "2";
            resName += ("_" + stype);
        }
        if (!RES.hasRes(resName)) {
            resName = sceneName;
            if (sceneName == "searchscene") {
                resName = "searchbg1";
            }
        }
        return resName;
    };
    OtherInfoVoApi.prototype.getCitySceneType = function () {
        var key = LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID());
        if (key == "" || key == "0") {
            return String(GameData.getTimeIsnterval());
        }
        else {
            return key;
        }
    };
    /**
     * 本身是否拥有这个场景，不关心 他有没有解锁
     */
    OtherInfoVoApi.prototype.isHasSceneNotAboutUnlock = function (id, sceneName) {
        if (sceneName === void 0) { sceneName = "homeScene"; }
        if (id == "101") {
            return true;
        }
        var hadSkins;
        if (sceneName == "homeScene") {
            hadSkins = this.otherInfoVo.skinHad;
        }
        else if (sceneName == "cityScene") {
            hadSkins = this.otherInfoVo.skinHad2;
        }
        else {
            hadSkins = this.otherInfoVo.skinHad3;
        }
        if (hadSkins && hadSkins[id]) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.isHasScene = function (id, sceneName) {
        if (sceneName === void 0) { sceneName = "homeScene"; }
        if (id == "101") {
            return true;
        }
        var hadSkins;
        if (sceneName == "homeScene") {
            hadSkins = this.otherInfoVo.skinHad;
        }
        else if (sceneName == "cityScene") {
            hadSkins = this.otherInfoVo.skinHad2;
        }
        else {
            hadSkins = this.otherInfoVo.skinHad3;
        }
        if (hadSkins) {
            var allId = Object.keys(hadSkins);
            for (var k in allId) {
                var key = allId[k];
                if (key == id && hadSkins[key] == 1) {
                    return true;
                }
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.isHasSceneUnlock = function (id, sceneName) {
        var hadSkins;
        if (sceneName == "homeScene") {
            hadSkins = this.otherInfoVo.skinHad;
        }
        else if (sceneName == "cityScene") {
            hadSkins = this.otherInfoVo.skinHad2;
        }
        else {
            hadSkins = this.otherInfoVo.skinHad3;
        }
        if (hadSkins) {
            var allId = Object.keys(hadSkins);
            for (var k in allId) {
                var key = allId[k];
                if (key == id && hadSkins[key] == 2) {
                    return true;
                }
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.isHasSceneRedot = function () {
        var allScene = Config.SceneCfg.getAllScene();
        for (var h = 0; h < allScene.length; h++) {
            var allKeys = Config.SceneCfg.getSceneAllId(allScene[h]);
            for (var i = 0; i < allKeys.length; i++) {
                if (!Api.otherInfoVoApi.isHasScene(allKeys[i])) {
                    var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName(allScene[h], allKeys[i]).personalityCfg;
                    if (abilitycfg && abilitycfg.unlock && abilitycfg.unlock <= Api.playerVoApi.getPlayerLevel()) {
                        return true;
                    }
                    else if (abilitycfg && abilitycfg.activityUnlock && Api.otherInfoVoApi.isHasSceneUnlock(allKeys[i], allScene[h])) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    OtherInfoVoApi.prototype.isSceneCanScroll = function (sceneName) {
        return Config.SceneCfg.getIsSceneScroll(this.getCurSceneId(sceneName));
    };
    /**
     * 检测玩吧双11icon是否显示
     */
    OtherInfoVoApi.prototype.checkOpenWB11Icon = function () {
        return GameData.serverTime >= 1541692800 && GameData.serverTime < 1541951999;
    };
    OtherInfoVoApi.prototype.checkShowAcitivePop = function () {
        return (this.otherInfoVo.setactivitypop != 1);
    };
    /**
     * 获取本服开服时间
     * */
    OtherInfoVoApi.prototype.getServerOpenDay = function () {
        var num = 0;
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.opendate) {
            num = Math.ceil((GameData.serverTime - this.otherInfoVo.info.opendate) / 86400);
        }
        return num;
    };
    OtherInfoVoApi.prototype.checkUserMsg = function () {
        if (Object.keys(this.otherInfoVo.userMsg).length > 0) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.getPushInfo = function () {
        return this.otherInfoVo.pushInfo;
    };
    OtherInfoVoApi.prototype.getOpenHideVip = function () {
        var flag = false;
        if (this.otherInfoVo.info && this.otherInfoVo.info.hideVip) {
            flag = true;
        }
        return flag;
    };
    OtherInfoVoApi.prototype.getDangjiaNpc = function () {
        var str = "";
        if (this.otherInfoVo.info && this.otherInfoVo.info.dangjia && Number(this.otherInfoVo.info.dangjia) != 101) {
            str = this.otherInfoVo.info.dangjia + "";
        }
        return str;
    };
    OtherInfoVoApi.prototype.getDangjiaWifeId = function () {
        var str = this.getDangjiaNpc();
        var strArray = str.split("_");
        return strArray[0];
    };
    /**红颜脱衣 */
    OtherInfoVoApi.prototype.getWifeUndress = function () {
        return this.otherInfoVo.wifeUndress;
    };
    OtherInfoVoApi.prototype.getOtherInfoVo = function () {
        return this.otherInfoVo;
    };
    OtherInfoVoApi.prototype.getCrosschatNum = function () {
        return this.otherInfoVo.crosschatNum;
    };
    OtherInfoVoApi.prototype.getAutoFastNum = function () {
        return this.otherInfoVo.autoFastNum;
    };
    OtherInfoVoApi.prototype.checkHasNewYear = function () {
        if (this.otherInfoVo && this.otherInfoVo.citySkinNewYear && this.otherInfoVo.citySkinNewYear > GameData.serverTime) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.checkHasHomeNewYear = function () {
        if (this.otherInfoVo && this.otherInfoVo.homeSkinNewYear && this.otherInfoVo.homeSkinNewYear > GameData.serverTime) {
            return true;
        }
        return false;
    };
    OtherInfoVoApi.prototype.getOpenFunUnlockList2 = function () {
        if (this.otherInfoVo && this.otherInfoVo.info && this.otherInfoVo.info.unlockList2) {
            return this.otherInfoVo.info.unlockList2;
        }
        return null;
    };
    OtherInfoVoApi.prototype.dispose = function () {
        this.otherInfoVo = null;
        _super.prototype.dispose.call(this);
    };
    return OtherInfoVoApi;
}(BaseVoApi));
__reflect(OtherInfoVoApi.prototype, "OtherInfoVoApi");
//# sourceMappingURL=OtherInfoVoApi.js.map