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
var AcRescueVo = (function (_super) {
    __extends(AcRescueVo, _super);
    //每日充值的钻石数
    // public power:number = 0;
    //当前体力
    // public power:number = 0;
    // public rflage:{[key:string]:number};
    function AcRescueVo() {
        var _this = _super.call(this) || this;
        //营救红颜:"营救红颜:商店积分
        _this.score = 0;
        //营救红颜:"营救红颜:活跃积分
        _this.v = 0;
        //营救红颜:今日击杀奖励是否已领取
        _this.get = false;
        //暴击连击信息
        _this.critical = 0;
        //当前暴击ID
        _this.criticalIndex = 0;
        //当前体力
        _this.power = 0;
        //当日充值的钻石数
        _this.daygemnum = 0;
        return _this;
    }
    AcRescueVo.prototype.initData = function (data) {
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
        if (data.critical != null) {
            this.critical = data.critical;
        }
        if (data.criticalIndex != null) {
            this.criticalIndex = data.criticalIndex;
        }
        if (data.power != null) {
            this.power = data.power;
        }
        if (data.rflage != null) {
            this.rflage = data.rflage;
        }
        if (data.daygemnum != null) {
            this.daygemnum = data.daygemnum;
        }
        if (data.rechangeindex != null) {
            this.rechangeindex = data.rechangeindex;
        }
    };
    AcRescueVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    Object.defineProperty(AcRescueVo.prototype, "isShowRedDot", {
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
    Object.defineProperty(AcRescueVo.prototype, "isDuringActive", {
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
    AcRescueVo.prototype.getRechargeText = function () {
        var str = LanguageManager.getlocal("rescueGetMaxTip");
        var activeCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // 没领取完
        var nextIndex = (Number(this.rechangeindex) + 1).toString();
        if (activeCfg.rechangeReward[nextIndex]) {
            //可领取
            if (this.daygemnum >= activeCfg.rechangeReward[nextIndex].needGem) {
                var rewardItemvo = GameData.formatRewardItem(activeCfg.rechangeReward[nextIndex].reward)[0];
                str = LanguageManager.getlocal("rescueGetCurRechargeTip", [rewardItemvo.num.toString()]);
            }
            else {
                var lessNum = activeCfg.rechangeReward[nextIndex].needGem - this.daygemnum;
                var rewardItemvo = GameData.formatRewardItem(activeCfg.rechangeReward[nextIndex].reward)[0];
                str = LanguageManager.getlocal("rescueGetRechargeTip", [lessNum.toString(), rewardItemvo.num.toString()]);
            }
        }
        else {
            str = LanguageManager.getlocal("rescueGetMaxTip");
        }
        return str;
    };
    /**
     * 1 未领取 2未完成 3领取完成
     */
    AcRescueVo.prototype.getRechargeState = function () {
        var state = 0;
        var activeCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        //没领取完
        var nextIndex = (Number(this.rechangeindex) + 1).toString();
        if (activeCfg.rechangeReward[nextIndex]) {
            //可领取
            if (this.daygemnum >= activeCfg.rechangeReward[nextIndex].needGem) {
                state = 1;
            }
            else {
                state = 2;
            }
        }
        else {
            state = 3;
        }
        return state;
    };
    AcRescueVo.prototype.dispose = function () {
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
    return AcRescueVo;
}(AcBaseVo));
__reflect(AcRescueVo.prototype, "AcRescueVo");
