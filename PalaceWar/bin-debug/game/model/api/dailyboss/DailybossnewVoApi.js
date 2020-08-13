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
var DailybossnewVoApi = (function (_super) {
    __extends(DailybossnewVoApi, _super);
    function DailybossnewVoApi() {
        return _super.call(this) || this;
    }
    DailybossnewVoApi.prototype.formatData = function (data) {
        _super.prototype.formatData.call(this, data);
    };
    DailybossnewVoApi.prototype.checkNpcMessage = function () {
        // if (Api.switchVoApi.checkOpenDailybossTogather() && Api.countryWarVoApi.countryWarRedPoint())
        // {
        // 	return true;
        // }
        if (this.getStatus() == 1 && this.hasServantCanFight()) {
            return true;
        }
        return false;
    };
    //已出战门客数量
    DailybossnewVoApi.prototype.hasServantCanFight = function () {
        var n = 0;
        if (this.dailybossnewVo && this.dailybossnewVo.servant) {
            for (var key in this.dailybossnewVo.servant) {
                if (this.dailybossnewVo.servant[key] != 0) {
                    n++;
                }
            }
        }
        return Api.servantVoApi.getServantCount() > n;
    };
    DailybossnewVoApi.prototype.checkServantcanStatus = function (id) {
        return (this.dailybossnewVo && this.dailybossnewVo.servant[id] != null) ? this.dailybossnewVo.servant[id] : 0;
    };
    DailybossnewVoApi.prototype.findBestServant = function () {
        var servantId;
        var allKey = Api.servantVoApi.getServantInfoIdListWithSort(1);
        allKey.sort(function (a, b) {
            var value1 = Api.servantVoApi.getServantCombatWithId(a);
            var valueb = Api.servantVoApi.getServantCombatWithId(b);
            return valueb - value1;
        });
        var l = allKey.length;
        for (var i = 0; i < l; i++) {
            if (!this.checkServantcanStatus(allKey[i])) {
                servantId = allKey[i];
                break;
            }
        }
        return servantId;
    };
    DailybossnewVoApi.prototype.getScore = function () {
        return this.dailybossnewVo ? this.dailybossnewVo.score : 0;
    };
    DailybossnewVoApi.prototype.getShopItemByNum = function (id) {
        return (this.dailybossnewVo && this.dailybossnewVo.shop[id]) ? this.dailybossnewVo.shop[id] : 0;
    };
    DailybossnewVoApi.prototype.getShopItemNeedScore = function (id) {
        var cfg = Config.DailybossnewCfg.getShopItemById(Number(id));
        var needScore = cfg.getNeedScoreByNum(Api.dailybossnewVoApi.getShopItemByNum(Number(id)));
        return needScore;
    };
    DailybossnewVoApi.prototype.getBossType = function () {
        return 2;
    };
    /**
     * 返回boss战状态0开始状态,1开始,2结束等待下一轮
     */
    DailybossnewVoApi.prototype.getStatus = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossnewCfg.getStatus(leftSecond);
    };
    DailybossnewVoApi.prototype.getStatusByName = function (name) {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossnewCfg.getStatusByName(leftSecond, name);
    };
    DailybossnewVoApi.prototype.getNextStartLeftTime = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossnewCfg.getNextStartLeftTime(leftSecond);
    };
    DailybossnewVoApi.prototype.getNextStartLeftTimeByName = function (name) {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossnewCfg.getNextStartLeftTimeByName(leftSecond, name);
    };
    DailybossnewVoApi.prototype.getEndTimeByName = function (name) {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossnewCfg.getEndTimeByName(leftSecond, name);
    };
    DailybossnewVoApi.prototype.getLeftTime = function () {
        var leftSecond = App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
        return Config.DailybossnewCfg.getLeftTime(leftSecond);
    };
    //是否领取昨日奖励 0: 无奖励  1:未领取  2:已领取
    DailybossnewVoApi.prototype.getRewardFlag = function () {
        var f = 0;
        if (this.dailybossnewVo && this.dailybossnewVo.info && this.dailybossnewVo.info.rewardFlag) {
            f = this.dailybossnewVo.info.rewardFlag;
        }
        return f;
    };
    DailybossnewVoApi.prototype.dispose = function () {
        this.dailybossnewVo = null;
        _super.prototype.dispose.call(this);
    };
    return DailybossnewVoApi;
}(BaseVoApi));
__reflect(DailybossnewVoApi.prototype, "DailybossnewVoApi");
//# sourceMappingURL=DailybossnewVoApi.js.map