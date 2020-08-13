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
var AcEnjoyNightVo = (function (_super) {
    __extends(AcEnjoyNightVo, _super);
    function AcEnjoyNightVo() {
        var _this = _super.call(this) || this;
        //当前位置
        _this.pos = 0;
        _this.isfree = 0;
        //是否需要播动画
        _this.needplay = 0;
        _this.achievement = null;
        _this.recharge = null;
        _this.buildingTimes = {};
        _this.shop = {};
        _this.task = {};
        _this.tmpReward = null;
        _this.selIdx = 0;
        return _this;
    }
    AcEnjoyNightVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    AcEnjoyNightVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    AcEnjoyNightVo.prototype.isActyEnd = function () {
        var flag = false;
        if (GameData.serverTime >= this.et) {
            flag = true;
        }
        return flag;
    };
    AcEnjoyNightVo.prototype.getCountCd = function () {
        var et = this.et - 86400;
        var count = et - GameData.serverTime;
        var str = '';
        str = App.DateUtil.getFormatBySecond(count, 1);
        return str;
    };
    AcEnjoyNightVo.prototype.getBoxNum = function () {
        return this.v;
    };
    Object.defineProperty(AcEnjoyNightVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightVo.prototype.getCurMapId = function () {
        return this.pos;
    };
    AcEnjoyNightVo.prototype.getMapTimes = function () {
        var t = 0;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var map = cfg.map[this.pos];
        if (map.buildingType && this.buildingTimes[map.buildingType]) {
            t = this.buildingTimes[map.buildingType];
        }
        return t % 4 + 1;
    };
    AcEnjoyNightVo.prototype.getRechargeNum = function () {
        var rv = 0;
        if (this.recharge && this.recharge.v) {
            rv = this.recharge.v;
        }
        return rv;
    };
    AcEnjoyNightVo.prototype.getRechargeFlag = function (idx) {
        var flag = true;
        if (this.recharge && this.recharge.flags && this.recharge.flags[idx]) {
            flag = false;
        }
        return flag;
    };
    AcEnjoyNightVo.prototype.isFree = function () {
        return this.isfree == 1;
        // return true;
    };
    AcEnjoyNightVo.prototype.getAchievementVallue = function () {
        var rv = 0;
        if (this.achievement && this.achievement.v) {
            rv = this.achievement.v;
        }
        return rv;
    };
    AcEnjoyNightVo.prototype.isCanExchange = function () {
        var b = false;
        var hasNum = Api.itemVoApi.getItemNumInfoVoById("2009");
        if (hasNum > 0) {
            var scenesid = this.cfg.getExchangeSceneId();
            if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid, "cityScene")) {
                b = true;
            }
            else {
                var needparts = this.cfg.exchangeScene.needParts;
                var needNum = needparts.split("_")[2];
                if (hasNum >= Number(needNum)) {
                    b = true;
                }
            }
        }
        return b;
    };
    Object.defineProperty(AcEnjoyNightVo.prototype, "isShowRedDot", {
        get: function () {
            return this.checkAchievementRedDot() || this.checkTaskRedDot() || this.checkRechargeRedDot() || this.checkBoxRedDot() || this.isCanExchange();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 宝箱的小红点
     */
    AcEnjoyNightVo.prototype.checkAchievementRedDot = function () {
        if (GameData.serverTime < this.et) {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var keys = Object.keys(cfg.achievement);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var achi = cfg.achievement[key];
                if ((!this.checkAchievementFlag(achi.id)) && this.getAchievementVallue() >= achi.needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 奖励是否领取了
     */
    AcEnjoyNightVo.prototype.checkAchievementFlag = function (id) {
        if (this.achievement.flags[id] && this.achievement.flags[id] == 1) {
            return true;
        }
        return false;
    };
    AcEnjoyNightVo.prototype.getMapLv = function () {
        var lv = 1;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var keys = Object.keys(cfg.achievement);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = cfg.achievement[key];
            if ((this.checkAchievementFlag(onecfg.id))) {
                if (onecfg.mapChange && onecfg.mapChange > lv) {
                    lv = onecfg.mapChange;
                }
            }
        }
        return lv;
    };
    /**
    * 充值的小红点
    */
    AcEnjoyNightVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var keys = Object.keys(cfg.recharge);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = cfg.recharge[key];
            if ((this.getRechargeFlag(onecfg.id)) && this.getRechargeNum() >= onecfg.needGem) {
                return true;
            }
        }
        return false;
    };
    AcEnjoyNightVo.prototype.checkTaskRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var keys = Object.keys(cfg.task);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var onecfg = cfg.task[key];
            if ((!this.getTaskFlag(onecfg.taskId)) && this.getTaskNum(onecfg.questType) >= onecfg.value) {
                return true;
            }
        }
        return false;
    };
    AcEnjoyNightVo.prototype.checkBoxRedDot = function () {
        return this.isInActivity() && this.getBoxNum() > 0;
    };
    AcEnjoyNightVo.prototype.getShopNum = function (id) {
        var num = 0;
        if (this.shop && this.shop[id]) {
            num = this.shop[id];
        }
        return num;
    };
    AcEnjoyNightVo.prototype.getTaskNum = function (id) {
        var num = 0;
        if (this.task && this.task.v && this.task.v[id]) {
            num = this.task.v[id];
        }
        return num;
    };
    AcEnjoyNightVo.prototype.getTaskFlag = function (id) {
        var num = 0;
        if (this.task && this.task.flags && this.task.flags[id]) {
            num = this.task.flags[id];
        }
        return num;
    };
    AcEnjoyNightVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    AcEnjoyNightVo.prototype.dispose = function () {
        this.achievement = null;
        this.recharge = null;
        this.pos = 0;
        this.isfree = 0;
        this.needplay = 0;
        this.v = 0;
        this.buildingTimes = {};
        this.shop = {};
    };
    return AcEnjoyNightVo;
}(AcBaseVo));
__reflect(AcEnjoyNightVo.prototype, "AcEnjoyNightVo");
//# sourceMappingURL=AcEnjoyNightVo.js.map