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
 * 万物复苏
 * date 2020.2.26
 * author ycg
 * @class AcRecoveryVo
 */
var AcRecoveryVo = (function (_super) {
    __extends(AcRecoveryVo, _super);
    function AcRecoveryVo() {
        return _super.call(this) || this;
    }
    AcRecoveryVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    //是否免费
    AcRecoveryVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    //道具数量
    AcRecoveryVo.prototype.getToolNum = function () {
        if (this.coin) {
            return this.coin;
        }
        return 0;
    };
    /**充值 */
    AcRecoveryVo.prototype.getCurrRecharge = function () {
        if (this.charge && this.charge.v) {
            return this.charge.v;
        }
        return 0;
    };
    /**是否已领取充值奖励 */
    AcRecoveryVo.prototype.isGetChargeRewardById = function (id) {
        if (this.charge && this.charge.flags && this.charge.flags[id]) {
            return true;
        }
        return false;
    };
    AcRecoveryVo.prototype.getSortRechargeCfg = function () {
        var rechargeData = this.cfg.getRechargeCfg();
        var count = rechargeData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetChargeRewardById(rechargeData[i].id)) {
                rechargeData[i].sortId = rechargeData[i].id + count;
            }
            else if (this.getCurrRecharge() >= rechargeData[i].needGem) {
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
    /**当前进度 */
    AcRecoveryVo.prototype.getProcessNum = function () {
        if (this.lottery && this.lottery.v) {
            return this.lottery.v;
        }
        return 0;
    };
    /**分阶段显示 */
    AcRecoveryVo.prototype.getProSeprateIndex = function () {
        return 5;
    };
    AcRecoveryVo.prototype.getCurrMaxProNum = function () {
        var currIndex = this.getCurrProIndex();
        var sepIndex = this.getProSeprateIndex();
        var data = this.cfg.getAchieveCfg();
        if (!currIndex && currIndex != 0) {
            return data[data.length - 1].needNum;
        }
        else if (currIndex + 1 <= sepIndex) {
            return data[sepIndex - 1].needNum;
        }
        else {
            return data[currIndex].needNum;
        }
    };
    /**当前进度 index */
    AcRecoveryVo.prototype.getCurrProIndex = function () {
        var data = this.cfg.getAchieveCfg();
        var currScore = this.getProcessNum();
        for (var i = 0; i < data.length; i++) {
            if (currScore < data[i].needNum) {
                return i;
            }
        }
        return null;
    };
    /**当前进度奖励是否领取 */
    AcRecoveryVo.prototype.isGetAchieveRewardById = function (id) {
        if (this.lottery && this.lottery.flags && this.lottery.flags[id]) {
            return true;
        }
        return false;
    };
    AcRecoveryVo.prototype.getSortAchievementCfg = function () {
        var achieveData = this.cfg.getAchieveCfg();
        // let currIndex = this.getCurrProIndex();
        // let sepIndex = this.getProSeprateIndex();
        var count = achieveData.length;
        // if (currIndex || currIndex == 0){
        //     if (currIndex < sepIndex){
        //         count = sepIndex;
        //     }
        //     else{
        //         count = currIndex + 1;
        //     }
        // }
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
    //获取展示对应的数据
    AcRecoveryVo.prototype.getShowSkinData = function () {
        var data = this.cfg.getAchieveCfg();
        for (var i = 0; i < data.length; i++) {
            var rewardsArr = data[i].getReward.split("|");
            for (var k = 0; k < rewardsArr.length; k++) {
                var itemId = rewardsArr[k].split("_")[1];
                var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
                if (this.code == 1 || this.code == 2) {
                    if (itemCfg.servantSkinID) {
                        return { needNum: data[i].needNum, index: i, skinId: itemCfg.servantSkinID };
                    }
                }
            }
        }
        return { needNum: null, index: null, skinId: null };
    };
    Object.defineProperty(AcRecoveryVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchieveReward() || this.isCangetChargeReward() || this.isCanPlay();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取进度奖励
    AcRecoveryVo.prototype.isCangetAchieveReward = function () {
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
    //是否有可领取充值奖励
    AcRecoveryVo.prototype.isCangetChargeReward = function () {
        var data = this.cfg.getRechargeCfg();
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetChargeRewardById(data[i].id)) {
                if (this.getCurrRecharge() >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    //是否有免费次数
    AcRecoveryVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && this.isFree()) {
            return true;
        }
        return false;
    };
    //倒计时
    AcRecoveryVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcRecoveryVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcRecoveryVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    //拉霸机 随机数组
    AcRecoveryVo.prototype.getRandGameRewardByType = function (type) {
        var count = 10;
        var rewardArr = [];
        //三个皮肤
        if (type == 1 || type == 2) {
            var sp = App.MathUtil.getRandom(2, 4);
            if (type == 1) {
                sp = 1;
            }
            for (var i = 0; i < 3; i++) {
                var arr = [];
                for (var k = 0; k < count - 1; k++) {
                    var randNum = App.MathUtil.getRandom(1, 4);
                    arr.push(randNum);
                }
                arr.push(sp);
                rewardArr.push(arr);
            }
        }
        else if (type == 3) {
            //两个相同
            var spArr = this.getDiffRandNum(2);
            var spIndex = App.MathUtil.getRandom(0, 2);
            for (var i = 0; i < 3; i++) {
                var arr = [];
                for (var k = 0; k < count - 1; k++) {
                    var randNum = App.MathUtil.getRandom(1, 4);
                    arr.push(randNum);
                }
                if (i < 2) {
                    arr.push(spArr[i]);
                }
                else {
                    arr.push(spArr[spIndex]);
                }
                rewardArr.push(arr);
            }
        }
        else if (type == 4) {
            //三个不相同
            var spArr = this.getDiffRandNum(3);
            for (var i = 0; i < 3; i++) {
                var arr = [];
                for (var k = 0; k < count - 1; k++) {
                    var randNum = App.MathUtil.getRandom(1, 4);
                    arr.push(randNum);
                }
                arr.push(spArr[i]);
                rewardArr.push(arr);
            }
        }
        return rewardArr;
    };
    AcRecoveryVo.prototype.getDiffRandNum = function (count) {
        var rand = App.MathUtil.getRandom(1, 4);
        var arr = [];
        arr.push(rand);
        while (arr.length < count) {
            rand = App.MathUtil.getRandom(1, 4);
            if (!GameData.isInArray(rand, arr)) {
                arr.push(rand);
            }
        }
        return arr;
    };
    return AcRecoveryVo;
}(AcBaseVo));
__reflect(AcRecoveryVo.prototype, "AcRecoveryVo");
//# sourceMappingURL=AcRecoveryVo.js.map