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
var AcPunishVo = (function (_super) {
    __extends(AcPunishVo, _super);
    function AcPunishVo() {
        var _this = _super.call(this) || this;
        //惩戒女囚:"惩戒女囚:商店积分
        _this.score = 0;
        //惩戒女囚:"惩戒女囚:活跃积分
        _this.v = 0;
        //惩戒女囚:今日击杀奖励是否已领取
        _this.get = false;
        //新增 暴击位置
        _this.crit = 1;
        //新增 体力
        _this.energy = 0;
        //新增 道具使用情况
        _this.useNum = null;
        return _this;
    }
    AcPunishVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.item != null) {
            this.item = data.item;
        }
        if (data.shop != null) {
            this.shop = data.shop;
        }
        if (data.score != null) {
            this.score = data.score;
        }
        if (data.get != null) {
            this.get = data.get;
        }
        if (data.v != null) {
            this.v = data.v;
        }
    };
    Object.defineProperty(AcPunishVo.prototype, "isShowRedDot", {
        get: function () {
            // let cfgObj = <Config.AcCfg.DailyChargeCfg>Config.AcCfg.getCfgByActivityIdAndCode("dailyCharge","1");
            // let list = cfgObj.getList();
            // for (var key in list) {
            // 	if (!this.flags[key] && list[key]["needGem"] <= this.v)
            // 	{
            // 		return true;
            // 	}
            // }
            //return false;
            return this.checkHasGoldenTimes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPunishVo.prototype, "isDuringActive", {
        /**
         * 活动是否处于进行状态；
         */
        get: function () {
            if (this.isStart) {
                var et = this.et;
                if (this.config && this.config.extraTime) {
                    et = this.et - this.config.extraTime * 86400;
                }
                if (et >= GameData.serverTime) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPunishVo.prototype, "day", {
        get: function () {
            var st = this.st;
            return Math.ceil((GameData.serverTime - st) / 86400);
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcPunishVo.prototype.getCountDown = function () {
        var et = this.et - this.config.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    //道具使用数量
    AcPunishVo.prototype.getToolUseNum = function (id) {
        if (this.useNum && this.useNum["" + id]) {
            return this.useNum["" + id];
        }
        return 0;
    };
    //是否在活动期间内 活动最后一天的22时之后活动结束
    AcPunishVo.prototype.isInActivity = function () {
        if (this.isStart) {
            var et = this.et;
            if (this.config && this.config.extraTime) {
                et = this.et - (this.config.extraTime) * 86400;
            }
            if (GameData.serverTime > et) {
                return false;
            }
            if (this.config && this.config.activeTime[1]) {
                var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
                et = zeroTime + this.config.activeTime[1] * 3600;
            }
            // App.LogUtil.log("punish et: "+et + " GameData.serverTime: "+GameData.serverTime);
            if (et > GameData.serverTime) {
                return true;
            }
        }
        return false;
    };
    //是否在每天的活动时间内 1 未开启  2 已结束 3 进行中 4 活动结束
    AcPunishVo.prototype.inDayOpenState = function () {
        if (this.isInActivity()) {
            var zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
            if (GameData.serverTime - zeroTime < 3600 * this.config.activeTime[0]) {
                return 1;
            }
            else if (GameData.serverTime - zeroTime > 3600 * this.config.activeTime[1]) {
                return 2;
            }
            else {
                return 3;
            }
        }
        return 4;
    };
    AcPunishVo.prototype.checkHasGoldenTimes = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var onecfg = cfg.punishList[1];
        var maxNum = onecfg.buyLimit;
        var num = 0;
        if (this.item["1"]) {
            num = this.item["1"];
        }
        if (num >= maxNum) {
            return false;
        }
        if (this.isInActivity()) {
            return true;
        }
        return false;
    };
    //是否在每天的活动开启
    AcPunishVo.prototype.dispose = function () {
        this.item = null;
        ;
        //惩戒女囚:商店购买信息
        this.shop = null;
        ;
        //惩戒女囚:"惩戒女囚:商店积分
        this.score = 0;
        ;
        //惩戒女囚:"惩戒女囚:活跃积分
        this.v = 0;
        //惩戒女囚:今日击杀奖励是否已领取
        this.get = false;
        this.crit = 1;
        this.energy = 0;
        this.useNum = null;
    };
    return AcPunishVo;
}(AcBaseVo));
__reflect(AcPunishVo.prototype, "AcPunishVo");
//# sourceMappingURL=AcPunishVo.js.map