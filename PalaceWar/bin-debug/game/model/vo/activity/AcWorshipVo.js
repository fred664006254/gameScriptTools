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
 * 筑阁祭天活动VO
 */
var AcWorshipVo = (function (_super) {
    __extends(AcWorshipVo, _super);
    function AcWorshipVo() {
        return _super.call(this) || this;
    }
    //  self.info[k].isfree = 1 --首次免费
    //             self.info[k].v = 0 --建筑进度
    //             self.info[k].rinfo = {v = 0,flags={}} --充值信息
    //             self.info[k].rewards = {}--进度奖励领取情况
    AcWorshipVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /** 建筑进度 */
    AcWorshipVo.prototype.getItemValue = function () {
        return this.v;
    };
    /**首次免费 */
    AcWorshipVo.prototype.isFree = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        if (this.isfree == 1) {
            return true;
        }
        return false;
    };
    /**充值进度 */
    AcWorshipVo.prototype.getChargeValue = function () {
        return this.rinfo.v;
    };
    /**是否领过奖励了 */
    AcWorshipVo.prototype.checkRechargeFlag = function (id) {
        if (this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    /** 是否领过进度奖励了 */
    AcWorshipVo.prototype.checkRewardFlag = function (id) {
        if (this.rewards[id]) {
            return true;
        }
        return false;
    };
    /**
    * 获得充值奖励的配置
    */
    AcWorshipVo.prototype.getSortRechargeCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.worshipRechargeItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkRechargeFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getChargeValue() >= rechargeData[i].needGem) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    /**
    * 获得进度奖励的配置
    */
    AcWorshipVo.prototype.getSortAchievementCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.worshipAchievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkRewardFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getItemValue() >= rechargeData[i].needNum) {
                rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
                continue;
            }
            else {
                rechargeData[i].sortId = Number(rechargeData[i].id);
                continue;
            }
        }
        return rechargeData;
    };
    Object.defineProperty(AcWorshipVo.prototype, "acCountDown", {
        // /**是否领取了 */
        // public checkRechargeFlag(id: number) {
        // 	if (this.cinfo.flags[id]) {
        // 		return true;
        // 	}
        // 	return false;
        // }
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            var et = this.et - this.config.extraTime * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorshipVo.prototype, "isShowRedDot", {
        /**小红点 */
        get: function () {
            return this.isFree() || this.checkRechargeRedDot() || this.checkAchievementRedDot();
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 充值的小红点
    */
    AcWorshipVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.worshipRechargeItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRechargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    /**进度奖励的小红点 */
    AcWorshipVo.prototype.checkAchievementRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.worshipAchievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getItemValue() >= rechargeData[i].needNum) {
                return true;
            }
        }
        return false;
    };
    AcWorshipVo.prototype.dispose = function () {
        this.isfree = 0;
        this.v = 0;
        this.rinfo = null;
        ;
        this.rewards = null;
        _super.prototype.dispose.call(this);
    };
    return AcWorshipVo;
}(AcBaseVo));
__reflect(AcWorshipVo.prototype, "AcWorshipVo");
//# sourceMappingURL=AcWorshipVo.js.map