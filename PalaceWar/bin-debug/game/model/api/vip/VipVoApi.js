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
var VipVoApi = (function (_super) {
    __extends(VipVoApi, _super);
    function VipVoApi() {
        var _this = _super.call(this) || this;
        _this.noRewardArr = [];
        return _this;
    }
    VipVoApi.prototype.checkMaxVipLevel = function () {
        return Api.playerVoApi.getPlayerVipLevel() >= Config.VipCfg.getMaxLevel();
    };
    VipVoApi.prototype.getNextVipLvNeedRechargeGemNum = function () {
        var num = 0;
        var curPlayerBuyGem = Api.playerVoApi.getPlayerVipExp();
        var nextLevel = Api.playerVoApi.getPlayerVipLevel() + 1;
        nextLevel = Math.min(Config.VipCfg.getMaxLevel(), nextLevel);
        // vip折扣
        var acBasevo = Api.acVoApi.checkIsVipDiscount();
        if (acBasevo) {
            // let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[nextLevel];
            var itemCfg = null;
            if (acBasevo.code == 1) {
                itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[nextLevel];
            }
            else {
                itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 4).vipList[nextLevel];
            }
            if (itemCfg) {
                num = itemCfg.needGem - curPlayerBuyGem;
            }
        }
        else {
            var itemCfg = Config.VipCfg.getVipCfgByLevel(nextLevel);
            if (itemCfg) {
                num = itemCfg.needGem - curPlayerBuyGem;
            }
        }
        return Math.max(0, num);
    };
    VipVoApi.prototype.getNextVipNeedGemNum = function () {
        var num = 0;
        var nextLevel = Api.playerVoApi.getPlayerVipLevel() + 1;
        nextLevel = Math.min(Config.VipCfg.getMaxLevel(), nextLevel);
        // vip折扣
        var acBasevo = Api.acVoApi.checkIsVipDiscount();
        if (acBasevo) {
            var itemCfg = null;
            if (acBasevo.code == 1) {
                itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[nextLevel];
            }
            else {
                itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 4).vipList[nextLevel];
            }
            if (itemCfg) {
                num = itemCfg.needGem;
            }
        }
        else {
            var itemCfg = Config.VipCfg.getVipCfgByLevel(nextLevel);
            if (itemCfg) {
                num = itemCfg.needGem;
            }
        }
        return num;
    };
    /**
     * 获取当前VIP等级的配置
     */
    VipVoApi.prototype.getCurLevelVipCfg = function () {
        return this.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel());
    };
    /**
     * 根据vip等级获取配置
     * @param vipLevel
     */
    VipVoApi.prototype.getVipCfgByLevel = function (vipLevel) {
        return Config.VipCfg.getVipCfgByLevel(vipLevel);
    };
    VipVoApi.prototype.getCanRewardLevelList = function () {
        var resultArr = [];
        var playerVipLevel = Api.playerVoApi.getPlayerVipLevel();
        for (var i = 0; i <= playerVipLevel; i++) {
            var extraRewardVoList = Config.VipCfg.getVipCfgByLevel(i).extraRewardVoList;
            if ((!Api.shopVoApi.getVipRewardInfo(i)) && extraRewardVoList && extraRewardVoList.length > 0) {
                resultArr.push(i);
            }
        }
        return resultArr;
    };
    VipVoApi.prototype.getShowVipLevel = function () {
        var canRewardList = this.getCanRewardLevelList();
        if (canRewardList.length > 0) {
            return Math.max(0, canRewardList[0]);
        }
        else {
            return Api.playerVoApi.getPlayerVipLevel() + 1;
        }
    };
    VipVoApi.prototype.getDailyLuckNum = function () {
        return this.getCurLevelVipCfg().dailyLuckNum;
    };
    VipVoApi.prototype.checkRedPoint = function () {
        return this.getReddot();
    };
    VipVoApi.prototype.getReddot = function () {
        var currVip = Api.playerVoApi.getPlayerVipLevel();
        for (var i = 0; i <= currVip; i++) {
            if (Api.vipVoApi.getVipCfgByLevel(i).reward) {
                var boo = Api.switchVoApi.checkVip1Privilege();
                {
                    if (boo == false && i == 1) {
                        continue;
                    }
                    else {
                        if (!Api.shopVoApi.getVipRewardInfo(i)) {
                            if (currVip >= i) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
            }
        }
    };
    VipVoApi.prototype.getNoRewardBoo = function (num) {
        if (!Api.vipVoApi.getVipCfgByLevel(num).reward) {
            return true;
        }
        return false;
    };
    VipVoApi.prototype.getMaxbtnNum = function () {
        var maxShowLv = Config.VipCfg.getMaxLevel();
        if (GameData.limitVipLv && GameData.limitVipLv.length > 0) {
            var l = GameData.limitVipLv.length;
            for (var i = 0; i < l; i++) {
                if (Api.playerVoApi.getPlayerVipLevel() < GameData.limitVipLv[i]) {
                    maxShowLv = GameData.limitVipLv[i];
                    break;
                }
            }
        }
        return maxShowLv;
    };
    /**
     * 根据等级获取新的vip图标
     * @param vipLevel vip等级
     */
    VipVoApi.prototype.getVipIcon2 = function (vipLevel) {
        return ComponentManager.getVipIcon2(vipLevel);
    };
    //根据字段取vip 解锁等级
    VipVoApi.prototype.getNeedVip = function (unStr) {
        if (unStr === void 0) { unStr = ''; }
        var vipNum = Config.VipCfg.getVipUnlockByLevel(unStr);
        return vipNum;
    };
    return VipVoApi;
}(BaseVoApi));
__reflect(VipVoApi.prototype, "VipVoApi");
//# sourceMappingURL=VipVoApi.js.map