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
var DailybossVoApi = (function (_super) {
    __extends(DailybossVoApi, _super);
    function DailybossVoApi() {
        var _this = _super.call(this) || this;
        _this.bossKillTime = 0;
        _this.needcheckweapon = 0;
        return _this;
    }
    DailybossVoApi.prototype.formatData = function (data) {
        _super.prototype.formatData.call(this, data);
    };
    DailybossVoApi.prototype.checkNpcMessage = function () {
        if (Api.switchVoApi.checkOpenDailybossTogather() && Api.countryWarVoApi.countryWarRedPoint()) {
            return true;
        }
        if (this.getStatus() == 1 && this.hasServantCanFight() && this.canKeepFghting()) {
            return true;
        }
        if (Api.switchVoApi.checkNewDailyBoss() && (Api.dailybossnewVoApi.getStatus() == 1 && Api.dailybossnewVoApi.hasServantCanFight() || Api.dailybossnewVoApi.getRewardFlag() == 1)) {
            return true;
        }
        if (Api.acVoApi.getActivityVoListByAid("ladderTournament").length > 0) {
            var acvo = Api.acVoApi.getActivityVoListByAid("ladderTournament")[0];
            if (acvo.isShowRedDot) {
                return true;
            }
        }
        return false;
    };
    //已出战门客数量
    DailybossVoApi.prototype.hasServantCanFight = function () {
        var n = 0;
        if (this.dailybossVo && this.dailybossVo.servant) {
            for (var key in this.dailybossVo.servant) {
                if (this.dailybossVo.servant[key] != 0) {
                    n++;
                }
            }
        }
        return Api.servantVoApi.getServantCount() > n;
    };
    DailybossVoApi.prototype.canKeepFghting = function () {
        if (this.getBossType() == 1) {
            if (this.dailybossVo && this.dailybossVo.info && this.dailybossVo.info.bossLv) {
                if (this.dailybossVo.info.bossLv > Api.dailybossVoApi.getMaxRound() && this.getClearFlag()) {
                    return false;
                }
            }
        }
        else {
            if (Api.switchVoApi.checkNewDailyBoss()) {
                return false;
            }
            if (Api.dailybossVoApi.bossKillTime > 0 && App.DateUtil.checkIsToday(Api.dailybossVoApi.bossKillTime)) {
                return false;
            }
        }
        return true;
    };
    DailybossVoApi.prototype.checkServantcanStatus = function (id) {
        return this.dailybossVo.servant[id] != null ? this.dailybossVo.servant[id] : 0;
    };
    DailybossVoApi.prototype.findBestServant = function (bossLife) {
        if (!bossLife) {
            bossLife = 0;
        }
        var servantId;
        var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
        allKey.sort(function (a, b) {
            var value1 = Api.servantVoApi.getServantCombatWithId(a);
            var valueb = Api.servantVoApi.getServantCombatWithId(b);
            return value1 - valueb;
        });
        var l = allKey.length;
        for (var i = 0; i < l; i++) {
            if (!this.checkServantcanStatus(allKey[i])) {
                servantId = allKey[i];
                if (Api.servantVoApi.getServantCombatWithId(allKey[i]) >= bossLife) {
                    break;
                }
            }
        }
        return servantId;
    };
    DailybossVoApi.prototype.getScore = function () {
        return this.dailybossVo ? this.dailybossVo.score : 0;
    };
    DailybossVoApi.prototype.getShopItemByNum = function (id) {
        return (this.dailybossVo && this.dailybossVo.shop[id]) ? this.dailybossVo.shop[id] : 0;
    };
    DailybossVoApi.prototype.getShopItemNeedScore = function (id) {
        var cfg = Config.DailybossCfg.getShopItemById(id);
        var needScore = cfg.getNeedScoreByNum(Api.dailybossVoApi.getShopItemByNum(id));
        return needScore;
    };
    DailybossVoApi.prototype.getBossType = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        var end1Time = Config.DailybossCfg.boss1Time[1] * App.DateUtil.hourSeconds;
        return leftSecond > end1Time ? 2 : 1;
    };
    /**
     * 返回boss战状态0开始状态,1开始,2结束等待下一轮
     */
    DailybossVoApi.prototype.getStatus = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossCfg.getStatus(leftSecond);
    };
    DailybossVoApi.prototype.getStatusByName = function (name) {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossCfg.getStatusByName(leftSecond, name);
    };
    DailybossVoApi.prototype.getNextStartLeftTime = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossCfg.getNextStartLeftTime(leftSecond);
    };
    DailybossVoApi.prototype.getNextStartLeftTimeByName = function (name) {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossCfg.getNextStartLeftTimeByName(leftSecond, name);
    };
    DailybossVoApi.prototype.getEndTimeByName = function (name) {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossCfg.getEndTimeByName(leftSecond, name);
    };
    DailybossVoApi.prototype.getLeftTime = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossCfg.getLeftTime(leftSecond);
    };
    DailybossVoApi.prototype.getBossLocalTimeStr = function () {
        if (Api.switchVoApi.checkNewDailyBoss()) {
            return LanguageManager.getlocal("dailybossLocalTimeDesc", [LanguageManager.getlocal("dailybossTimeTitle1"), Config.DailybossCfg.getInTimeStr(1)]);
        }
        return LanguageManager.getlocal("dailybossLocalTimeDesc", [LanguageManager.getlocal("dailybossTimeTitle1"), Config.DailybossCfg.getInTimeStr(1)]) + "\n" + LanguageManager.getlocal("dailybossLocalTimeDesc", [LanguageManager.getlocal("dailybossTimeTitle2"), Config.DailybossCfg.getInTimeStr(2)]);
    };
    /**
     * 是否已领取了通关奖励
     */
    DailybossVoApi.prototype.getClearFlag = function () {
        if (this.dailybossVo && this.dailybossVo.info && this.dailybossVo.info.clearFlag) {
            return this.dailybossVo.info.clearFlag;
        }
        return false;
    };
    // public isShowNpc():boolean
    // {
    // 	return false;
    // }
    DailybossVoApi.prototype.getMaxRound = function () {
        return Config.DailybossCfg.boss1MaxNum;
    };
    DailybossVoApi.prototype.dispose = function () {
        this.bossKillTime = 0;
        this.needcheckweapon = 0;
        _super.prototype.dispose.call(this);
    };
    return DailybossVoApi;
}(BaseVoApi));
__reflect(DailybossVoApi.prototype, "DailybossVoApi");
//# sourceMappingURL=DailybossVoApi.js.map