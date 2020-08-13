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
            return false;
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
    };
    return AcPunishVo;
}(AcBaseVo));
__reflect(AcPunishVo.prototype, "AcPunishVo");
