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
 * 诸葛亮传活动VO
 */
var AcLiangBiographyVo = (function (_super) {
    __extends(AcLiangBiographyVo, _super);
    function AcLiangBiographyVo() {
        return _super.call(this) || this;
    }
    //  self.info[k].isfree = 1 --首次免费
    //         self.info[k].v = 0 --总七星灯数量
    //         self.info[k].rinfo = {v = 0,flags={}} --充值信息
    //         self.info[k].rewards = {}--奖励领取情况
    //         self.info[k].num = 0 --七星灯进度
    AcLiangBiographyVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**总七星灯数量 */
    AcLiangBiographyVo.prototype.getItemValue = function () {
        return this.v;
    };
    /**首次免费 */
    AcLiangBiographyVo.prototype.isFree = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        if (this.isfree == 1) {
            return true;
        }
        return false;
    };
    /**七星灯进度 */
    AcLiangBiographyVo.prototype.getNum = function () {
        return this.num;
    };
    /**充值进度 */
    AcLiangBiographyVo.prototype.getChargeValue = function () {
        return this.rinfo.v;
    };
    /**是否领过奖励了 */
    AcLiangBiographyVo.prototype.checkRechargeFlag = function (id) {
        if (this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    /** 是否领过进度奖励了 */
    AcLiangBiographyVo.prototype.checkRewardFlag = function (id) {
        if (this.rewards[id]) {
            return true;
        }
        return false;
    };
    /**
    * 获得充值奖励的配置
    */
    AcLiangBiographyVo.prototype.getSortRechargeCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.liangBiographyRechargeItemCfgList;
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
    Object.defineProperty(AcLiangBiographyVo.prototype, "acCountDown", {
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
    Object.defineProperty(AcLiangBiographyVo.prototype, "isShowRedDot", {
        /**小红点 */
        get: function () {
            return this.isFree() || this.checkRechargeRedDot() || this.checkProgressRedDot() || this.checkHasNumRedDot();
        },
        enumerable: true,
        configurable: true
    });
    /**可回顾次数 */
    AcLiangBiographyVo.prototype.checkHasNumRedDot = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        if (this.getItemValue() > 0) {
            return true;
        }
        return false;
    };
    /**
    * 充值的小红点
    */
    AcLiangBiographyVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.liangBiographyRechargeItemCfgList;
        if (!rechargeData) {
            return false;
        }
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRechargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    /**
    * 进度的小红点
    */
    AcLiangBiographyVo.prototype.checkProgressRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.liangBiographyProcessingRewardItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getNum() >= rechargeData[i].reviewTime) {
                return true;
            }
        }
        return false;
    };
    AcLiangBiographyVo.prototype.dispose = function () {
        this.isfree = 0;
        this.v = 0;
        this.rinfo = null;
        ;
        this.rewards = null;
        this.num = 0;
        _super.prototype.dispose.call(this);
    };
    return AcLiangBiographyVo;
}(AcBaseVo));
__reflect(AcLiangBiographyVo.prototype, "AcLiangBiographyVo");
//# sourceMappingURL=AcLiangBiographyVo.js.map