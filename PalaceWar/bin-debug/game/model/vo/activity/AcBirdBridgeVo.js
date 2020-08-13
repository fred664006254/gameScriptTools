var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcBirdBridgeVo = /** @class */ (function (_super) {
    __extends(AcBirdBridgeVo, _super);
    function AcBirdBridgeVo() {
        var _this = _super.call(this) || this;
        _this.isfree = 0;
        _this.ainfo = null;
        _this.rinfo = null;
        _this.winfo = null;
        return _this;
    }
    Object.defineProperty(AcBirdBridgeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBirdBridgeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    //是否免费
    AcBirdBridgeVo.prototype.isFree = function () {
        if (this.isfree > 0) {
            return true;
        }
        return false;
    };
    AcBirdBridgeVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcBirdBridgeVo.prototype.getItemNum = function () {
        var itemId = this.cfg.needItem.split("_")[1];
        return Api.itemVoApi.getItemNumInfoVoById(itemId);
    };
    Object.defineProperty(AcBirdBridgeVo.prototype, "isShowRedDot", {
        //红点
        get: function () {
            return this.isCangetAchievementOneReward() || this.isCangetAchievementAllReward() || this.isCangetRechargeReward()
                || this.isCanPlay() || this.isCanGetCurWish();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgeVo.prototype, "isShowDetailRedDot", {
        get: function () {
            return this.isCangetAchievementOneReward() || this.isCangetAchievementAllReward() || this.isCangetRechargeReward();
        },
        enumerable: true,
        configurable: true
    });
    //是否有可领取充值奖励
    AcBirdBridgeVo.prototype.isCangetRechargeReward = function () {
        var data = this.cfg.teaRecharge;
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetRechargeRewardById(data[i].id)) {
                if (this.rinfo.v >= data[i].needGem) {
                    return true;
                }
            }
        }
        return false;
    };
    /**当前充值奖励是否领取 */
    AcBirdBridgeVo.prototype.isGetRechargeRewardById = function (id) {
        if (this.rinfo && this.rinfo.flags && this.rinfo.flags[id]) {
            return true;
        }
        return false;
    };
    AcBirdBridgeVo.prototype.getSortRechargeCfg = function () {
        var achieveData = this.cfg.teaRecharge;
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetRechargeRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.rinfo.v >= achieveData[i].needGem) {
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
    AcBirdBridgeVo.prototype.getSortAchievementOneCfg = function () {
        var achieveData = this.cfg.achievementOne;
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchievementOneRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo[0].v >= achieveData[i].needNum) {
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
    //全服奖励的个人奖励限制
    AcBirdBridgeVo.prototype.isCanGetAchievementAllWithAchievementOneById = function (id) {
        var allcfg = this.cfg.achievementAll[id - 1];
        // let onecfg = this.cfg.achievementOne[allcfg.needNum1-1];
        if (this.ainfo[0].v >= allcfg.needNum1) {
            return true;
        }
        return false;
    };
    //全服奖励的个人奖励限制
    AcBirdBridgeVo.prototype.getAchievementAllNeedAchievementOneTimesById = function (id) {
        var allcfg = this.cfg.achievementAll[id - 1];
        // let onecfg = this.cfg.achievementOne[allcfg.needNum1-1];
        return allcfg.needNum1;
    };
    AcBirdBridgeVo.prototype.getSortAchievementAllCfg = function () {
        var achieveData = this.cfg.achievementAll;
        var count = achieveData.length;
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.isGetAchievementAllRewardById(achieveData[i].id)) {
                achieveData[i].sortId = achieveData[i].id + count;
            }
            else if (this.ainfo[1].isCanGetAchievementAllWithAchievementOneById >= achieveData[i].needNum2 && this.isCanGetAchievementAllWithAchievementOneById(achieveData[i].id)) {
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
    //是否有可领取进度奖励
    AcBirdBridgeVo.prototype.isCangetAchievementOneReward = function () {
        var data = this.cfg.achievementOne;
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementOneRewardById(data[i].id)) {
                if (this.ainfo[0].v >= data[i].needNum) {
                    return true;
                }
            }
        }
        return false;
    };
    /**当前进度奖励是否领取 */
    AcBirdBridgeVo.prototype.isGetAchievementAllRewardById = function (id) {
        if (this.ainfo && this.ainfo[1].flags && this.ainfo[1].flags[id]) {
            return true;
        }
        return false;
    };
    //是否有可领取进度奖励
    AcBirdBridgeVo.prototype.isCangetAchievementAllReward = function () {
        var data = this.cfg.achievementAll;
        for (var i = 0; i < data.length; i++) {
            if (!this.isGetAchievementAllRewardById(data[i].id)) {
                if (this.ainfo[1].v >= data[i].needNum2 && this.isCanGetAchievementAllWithAchievementOneById(data[i].id)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**当前进度奖励是否领取 */
    AcBirdBridgeVo.prototype.isGetAchievementOneRewardById = function (id) {
        if (this.ainfo && this.ainfo[0].flags && this.ainfo[0].flags[id]) {
            return true;
        }
        return false;
    };
    // 1, 2,可领，3,已领
    AcBirdBridgeVo.prototype.getAchievementOneType = function (id) {
        var type = 1;
        if (this.isGetAchievementOneRewardById(id)) {
            type = 3;
        }
        else {
            var neednum = this.cfg.achievementOne[id - 1].needNum;
            if (this.ainfo[0].v >= neednum) {
                type = 2;
            }
        }
        return type;
    };
    AcBirdBridgeVo.prototype.getWishValueById = function (id) {
        var v = 0;
        if (this.winfo && this.winfo.v && this.winfo.v[String(id)]) {
            var cfg = this.cfg.getWishCfg(id);
            v = this.winfo.v[String(id)] - this.getWishGotTimesById(id) * cfg.needTime;
        }
        return v;
    };
    AcBirdBridgeVo.prototype.getWishGotTimesById = function (id) {
        var v = 0;
        if (this.winfo && this.winfo.flags && this.winfo.flags[String(id)]) {
            v = this.winfo.flags[String(id)];
        }
        return v;
    };
    AcBirdBridgeVo.prototype.isWishMax = function () {
        var data = this.cfg.wish;
        for (var i = 0; i < data.length; i++) {
            if (data[i].limitTime > this.getWishGotTimesById(data[i].id)) {
                return false;
            }
        }
        return true;
    };
    AcBirdBridgeVo.prototype.isWishMaxById = function (id) {
        var data = this.cfg.getWishCfg(id);
        if (data.limitTime > this.getWishGotTimesById(data.id)) {
            return false;
        }
        return true;
    };
    AcBirdBridgeVo.prototype.isCanGetCurWish = function () {
        var idx = this.winfo.idx;
        if (idx && this.isWishMaxById(idx) == false) {
            var cfg = this.cfg.getWishCfg(idx);
            if (this.getWishValueById(idx) >= cfg.needTime) {
                return true;
            }
        }
        return false;
    };
    AcBirdBridgeVo.prototype.getCurCanWishMaxNum = function () {
        var idx = this.winfo.idx;
        var num = 0;
        if (idx && this.isWishMaxById(idx) == false) {
            var cfg = this.cfg.getWishCfg(idx);
            if (cfg.needTime > this.getWishValueById(idx)) {
                num = Math.min(this.getItemNum(), (cfg.needTime - this.getWishValueById(idx)));
            }
        }
        return num;
    };
    //是否有免费次数
    AcBirdBridgeVo.prototype.isCanPlay = function () {
        if (this.isInActivity() && (this.isFree() || (this.getItemNum() > 0 && this.isWishMax() == false))) {
            return true;
        }
        return false;
    };
    AcBirdBridgeVo.prototype.getAchievementAllLevel = function () {
        var lv = 0;
        var data = this.cfg.achievementAll;
        for (var i = 0; i < data.length; i++) {
            if (this.ainfo[1].v >= data[i].needNum2) {
                lv = data[i].id;
            }
            else {
                break;
            }
        }
        return lv;
    };
    AcBirdBridgeVo.prototype.dispose = function () {
        this.isfree = 0;
        this.ainfo = null;
        this.rinfo = null;
        this.winfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcBirdBridgeVo;
}(AcBaseVo));
//# sourceMappingURL=AcBirdBridgeVo.js.map