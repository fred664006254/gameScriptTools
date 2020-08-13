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
 * 夜观天象
 * date 2020.6.15
 * author ycg
 * @class AcNightSkyVo
 */
var AcNightSkyVo = (function (_super) {
    __extends(AcNightSkyVo, _super);
    function AcNightSkyVo() {
        return _super.call(this) || this;
    }
    AcNightSkyVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcNightSkyVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    AcNightSkyVo.prototype.getRechargeNum = function () {
        if (this.buyGem) {
            return this.buyGem;
        }
        return 0;
    };
    AcNightSkyVo.prototype.getNeedRecharge = function () {
        var num = this.getRechargeNum();
        var needNum = this.cfg.needGem - num % this.cfg.needGem;
        return needNum;
    };
    //道具数量
    AcNightSkyVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //兑换物品总获得数
    AcNightSkyVo.prototype.getSpecialTotalNum = function () {
        if (this.specialNum) {
            return this.specialNum;
        }
        return 0;
    };
    //兑换物品次数
    AcNightSkyVo.prototype.getSpecialNum = function () {
        if (this.specialCount) {
            return this.specialCount;
        }
        return 0;
    };
    /**当前进度 */
    AcNightSkyVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    /**当前进度奖励是否领取 */
    AcNightSkyVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcNightSkyVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchieveRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.getProcessNum() >= achieveData[i].needNum) {
                achieveData[i].sortId = achieveData[i].id - count;
            }
            else {
                achieveData[i].sortId = achieveData[i].id;
            }
            data.push(achieveData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    //获取当前最大进度
    AcNightSkyVo.prototype.getMaxProNum = function () {
        var data = this.cfg.getAchieveCfg();
        return data[data.length - 1].needNum;
    };
    AcNightSkyVo.prototype.getShowSkinData = function () {
        var data = this.cfg.change;
        var itemVo = GameData.formatRewardItem(data.needItem)[0];
        return itemVo;
    };
    Object.defineProperty(AcNightSkyVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanPlay() || this.isCanExchange();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcNightSkyVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有免费次数
    AcNightSkyVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    //是否可以兑换
    AcNightSkyVo.prototype.isCanExchange = function () {
        var str = this.cfg.change.needItem;
        var itemVo = GameData.formatRewardItem(str)[0];
        var itemData = Api.itemVoApi.getItemInfoVoById(itemVo.id);
        var currNum = 0;
        if (itemData) {
            currNum = itemData.num;
        }
        if (currNum >= itemVo.num) {
            return true;
        }
        return false;
    };
    //倒计时
    AcNightSkyVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcNightSkyVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcNightSkyVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    return AcNightSkyVo;
}(AcBaseVo));
__reflect(AcNightSkyVo.prototype, "AcNightSkyVo");
//# sourceMappingURL=AcNightSkyVo.js.map