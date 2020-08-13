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
 * 搜查魏府 VO
 */
var AcSearchProofVo = (function (_super) {
    __extends(AcSearchProofVo, _super);
    function AcSearchProofVo() {
        var _this = _super.call(this) || this;
        _this.isfree = 0;
        _this.rinfo = null;
        _this.rewards = null;
        _this.num = 0;
        _this.perNum = 0;
        return _this;
    }
    AcSearchProofVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**check free time */
    AcSearchProofVo.prototype.isFree = function () {
        if (this.isfree == 1) {
            return true;
        }
        return false;
    };
    /** 道具数量 */
    AcSearchProofVo.prototype.getItemValue = function () {
        return this.v;
    };
    AcSearchProofVo.prototype.getnum = function () {
        return this.num;
    };
    /**charge value */
    AcSearchProofVo.prototype.getChargeValue = function () {
        return this.rinfo && this.rinfo.v ? this.rinfo.v : 0;
    };
    /**charge flag for id */
    AcSearchProofVo.prototype.getChargeFlag = function (chargeid) {
        return this.rinfo && this.rinfo.flags[chargeid] ? true : false;
    };
    /**
     * 获得charge列表
     */
    AcSearchProofVo.prototype.getSortRecharge = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var chargeData = cfg.rechargeItemListCfg;
        for (var i = 0; i < chargeData.length; i++) {
            if (this.getChargeFlag(chargeData[i].id)) {
                chargeData[i].sortId = chargeData.length + Number(chargeData[i].id);
                continue;
            }
            else if (this.getChargeValue() >= chargeData[i].needGem) {
                chargeData[i].sortId = (Number(chargeData[i].id)) - chargeData.length - 1;
                continue;
            }
            else {
                chargeData[i].sortId = Number(chargeData[i].id);
                continue;
            }
        }
        return chargeData;
    };
    /** 是否领过进度奖励了 */
    AcSearchProofVo.prototype.checkRewardFlag = function (id) {
        if (this.rewards[id]) {
            return true;
        }
        return false;
    };
    /**
    * 获得进度奖励的配置
    */
    AcSearchProofVo.prototype.getSortAchievementCfg = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.achievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if (this.checkRewardFlag(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
                continue;
            }
            else if (this.getnum() >= rechargeData[i].needNum) {
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
    /**进度奖励的小红点 */
    AcSearchProofVo.prototype.checkAchievementRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.achievementItemCfgList;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getnum() >= rechargeData[i].needNum) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcSearchProofVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            if (this.isStart == false) {
                return false;
            }
            return this.checkGameRedDot() || this.checkRechargeRedDot() || this.checkAchievementRedDot() || this.checkSkinRedDot();
        },
        enumerable: true,
        configurable: true
    });
    AcSearchProofVo.prototype.checkGameRedDot = function () {
        if (this.checkIsInEndShowTime()) {
            return false;
        }
        return this.isFree();
    };
    /**
    * 充值的小红点
    */
    AcSearchProofVo.prototype.checkRechargeRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rechargeData = cfg.rechargeItemListCfg;
        for (var i = 0; i < rechargeData.length; i++) {
            if ((!this.getChargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
                return true;
            }
        }
        return false;
    };
    /**
    * 充值的小红点
    */
    AcSearchProofVo.prototype.checkSkinRedDot = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rewardsVo = GameData.formatRewardItem(cfg.itemExchange[0].costProof)[0];
        var rewardsVo2 = GameData.formatRewardItem(cfg.itemExchange[0].getReward)[0];
        var rewardsVo3 = GameData.formatRewardItem(cfg.itemExchange[1].costProof)[0];
        var proofNum = Api.itemVoApi.getItemNumInfoVoById(GameData.formatRewardItem(cfg.mustGet2)[0].id);
        if (Api.itemVoApi.getItemInfoVoById(rewardsVo2.id) || Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.show))) {
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(String(cfg.show));
            if (!skincfg.canExchangeItem()) {
                if (proofNum >= rewardsVo3.num) {
                    return true;
                }
            }
            else {
                if (proofNum >= rewardsVo.num) {
                    return true;
                }
            }
        }
        else {
            if (proofNum >= rewardsVo.num) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcSearchProofVo.prototype, "acCountDown", {
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
    AcSearchProofVo.prototype.dispose = function () {
        this.isfree = 0;
        _super.prototype.dispose.call(this);
    };
    return AcSearchProofVo;
}(AcBaseVo));
__reflect(AcSearchProofVo.prototype, "AcSearchProofVo");
//# sourceMappingURL=AcSearchProofVo.js.map