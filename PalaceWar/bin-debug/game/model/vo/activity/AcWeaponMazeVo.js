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
 * 神器迷宫
 * date 2020.4.23
 * author ycg
 * @class AcWeaponMazeVo
 */
var AcWeaponMazeVo = (function (_super) {
    __extends(AcWeaponMazeVo, _super);
    function AcWeaponMazeVo() {
        return _super.call(this) || this;
    }
    AcWeaponMazeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcWeaponMazeVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcWeaponMazeVo.prototype.getToolNum = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    //充值数量
    AcWeaponMazeVo.prototype.getRechargeNum = function () {
        if (this.rinfo && this.rinfo.v) {
            return this.rinfo.v;
        }
        return 0;
    };
    /**当前进度 */
    AcWeaponMazeVo.prototype.getProcessNum = function () {
        if (this.ainfo && this.ainfo.v) {
            return this.ainfo.v;
        }
        return 0;
    };
    //迷宫类型
    AcWeaponMazeVo.prototype.getMapType = function () {
        var currNum = this.getProcessNum();
        var num = Math.floor(currNum / 10) % 2 ? -1 : 1;
        if (num == 1) {
            return [1, -1, 1];
        }
        return [-1, 1, -1];
    };
    /**当前进度奖励是否领取 */
    AcWeaponMazeVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.ainfo && this.ainfo.flags && this.ainfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcWeaponMazeVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfgList();
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
    AcWeaponMazeVo.prototype.getCurrMaxProNum = function () {
        var data = this.cfg.getAchieveCfgList();
        return data[data.length - 1].needNum;
    };
    //可领奖励id
    AcWeaponMazeVo.prototype.getAchieveRewardId = function () {
        var data = this.cfg.getAchieveCfgList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].needNum) {
                    return data[i].id;
                }
            }
        }
        return 0;
    };
    //是否有可领取进度奖励
    AcWeaponMazeVo.prototype.isCangetAchieveReward = function () {
        var data = this.cfg.getAchieveCfgList();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchieveRewardById(data[i].id)) {
                if (this.getProcessNum() >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否已充值奖励可领取
    AcWeaponMazeVo.prototype.isGetRechargeRewardById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcWeaponMazeVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeCfgList();
        var count = rechargeData.length;
        var data = [];
        var currGem = this.getRechargeNum();
        for (var i = 0; i < count; i++) {
            if (this.isGetRechargeRewardById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData[i].id + count;
            }
            else if (currGem >= rechargeData[i].needGem) {
                rechargeData[i].sortId = rechargeData[i].id - count;
            }
            else {
                rechargeData[i].sortId = rechargeData[i].id;
            }
            data.push(rechargeData[i]);
        }
        data.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        return data;
    };
    //可令充值奖励id
    AcWeaponMazeVo.prototype.getRechargeRewardId = function () {
        var data = this.cfg.getRechargeCfgList();
        var currNum = this.getRechargeNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeRewardById(data[i].id) && currNum >= data[i].needGem) {
                return data[i].id;
            }
        }
        return 1;
    };
    //可令充值奖励id
    AcWeaponMazeVo.prototype.isCanGetRechargeReward = function () {
        var data = this.cfg.getRechargeCfgList();
        var currNum = this.getRechargeNum();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeRewardById(data[i].id) && currNum >= data[i].needGem) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcWeaponMazeVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCanGetRechargeReward() || this.isCanPlay();
        },
        enumerable: true,
        configurable: true
    });
    //是否有次数
    AcWeaponMazeVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || this.getToolNum() > 0)) {
            return true;
        }
        return false;
    };
    AcWeaponMazeVo.prototype.getTypeCode = function () {
        if (this.code == 2) {
            return 1;
        }
        else if (this.code == 4) {
            return 3;
        }
        return this.code;
    };
    AcWeaponMazeVo.prototype.getCoreShowNeed = function () {
        var data = this.cfg.getRechargeCfgList();
        if (this.getTypeCode() == 1) {
            for (var i = 0; i < data.length; i++) {
                var rewardArr = GameData.formatRewardItem(data[i].getReward);
                for (var k = 0; k < rewardArr.length; k++) {
                    var itemCfg = Config.ItemCfg.getItemCfgById(rewardArr[k].id);
                    if (itemCfg && itemCfg.getRewards) {
                        var rItem = GameData.formatRewardItem(itemCfg.getRewards);
                        for (var j = 0; j < rItem.length; j++) {
                            if (rItem[j].id == Number(this.cfg.coreReward)) {
                                return data[i].needGem;
                            }
                        }
                    }
                }
            }
        }
        else if (this.getTypeCode() == 3) {
            for (var i = 0; i < data.length; i++) {
                var rewardArr = GameData.formatRewardItem(data[i].getReward);
                for (var k = 0; k < rewardArr.length; k++) {
                    if (rewardArr[k].id == Number(this.cfg.coreReward)) {
                        return data[i].needGem;
                    }
                }
            }
        }
        return 0;
    };
    //
    AcWeaponMazeVo.prototype.getSepIndex = function () {
        return 4;
    };
    //倒计时
    AcWeaponMazeVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcWeaponMazeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcWeaponMazeVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeaponMazeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWeaponMazeVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWeaponMazeVo;
}(AcBaseVo));
__reflect(AcWeaponMazeVo.prototype, "AcWeaponMazeVo");
//# sourceMappingURL=AcWeaponMazeVo.js.map