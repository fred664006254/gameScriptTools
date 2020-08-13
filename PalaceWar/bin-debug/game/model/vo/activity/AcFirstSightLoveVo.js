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
 * 女优活动1 依见钟情
 * author ycg
 * date 2019.10.14
 */
var AcFirstSightLoveVo = (function (_super) {
    __extends(AcFirstSightLoveVo, _super);
    function AcFirstSightLoveVo() {
        var _this = _super.call(this) || this;
        _this.totalLove = 0;
        return _this;
    }
    AcFirstSightLoveVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**个人倾心值 */
    AcFirstSightLoveVo.prototype.getCurrLove = function () {
        if (this.v) {
            return this.v;
        }
        return 0;
    };
    /**总倾心值 */
    AcFirstSightLoveVo.prototype.getTotalLove = function () {
        return this.totalLove;
    };
    /**进度次数 */
    AcFirstSightLoveVo.prototype.getAchieveNumById = function (id) {
        var achieveList = this.cfg.festivalList1;
        var currId = "" + id;
        for (var i = 0; i < achieveList.length; i++) {
            if (String(id) == achieveList[i].id) {
                if (achieveList[i].cost) {
                    currId = achieveList[i].cost;
                    break;
                }
            }
        }
        if (this.ainfo && this.ainfo[currId]) {
            return this.ainfo[currId];
        }
        return 0;
    };
    /**进度条两端数据 */
    AcFirstSightLoveVo.prototype.getTotalLoveNumBlock = function () {
        var dataList = this.cfg.festivalList2;
        // App.LogUtil.log("totallove: "+this.totalLove);
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            // App.LogUtil.log("data.nedlve: "+data.needFavor);
            if (dataList[i + 1]) {
                if (this.totalLove >= data.needFavor) {
                    if (this.totalLove < dataList[i + 1].needFavor) {
                        return { min: data.needFavor, max: dataList[i + 1].needFavor };
                    }
                }
                else {
                    return { min: 0, max: data.needFavor };
                }
            }
            else {
                return { min: dataList[i - 1].needFavor, max: data.needFavor };
            }
        }
    };
    AcFirstSightLoveVo.prototype.getCurrRewardId = function () {
        var data = this.cfg.festivalList2;
        for (var i = 0; i < data.length; i++) {
            if (!this.getAchieveRewardById(data[i].id) && this.totalLove >= data[i].needFavor && this.v >= data[i].needFavor1) {
                return i;
            }
        }
        return 0;
    };
    /**奖励领取情况 */
    AcFirstSightLoveVo.prototype.getAchieveRewardById = function (id) {
        if (this.rewards && this.rewards[id]) {
            return true;
        }
        return false;
    };
    //倒计时
    AcFirstSightLoveVo.prototype.getCountDown = function () {
        var et = this.et - this.cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    AcFirstSightLoveVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
    };
    Object.defineProperty(AcFirstSightLoveVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var et = this.et - 86400 * this.cfg.extraTime;
            App.LogUtil.log("acTicout do=wn: " + et);
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveVo.prototype.isShowRewardRedDot = function () {
        var data = this.cfg.festivalList2;
        for (var i = 0; i < data.length; i++) {
            if (!this.getAchieveRewardById(data[i].id) && this.totalLove >= data[i].needFavor && this.v >= data[i].needFavor1) {
                return true;
            }
        }
        return false;
    };
    AcFirstSightLoveVo.prototype.isShowBmRedDot = function () {
        if (this.isInActivity() && this.getCurrLove() >= this.cfg.favorNeed && !this.bm) {
            return true;
        }
        return false;
    };
    Object.defineProperty(AcFirstSightLoveVo.prototype, "isShowRedDot", {
        get: function () {
            return this.isShowRewardRedDot() || this.isShowBmRedDot();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFirstSightLoveVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveVo;
}(AcBaseVo));
__reflect(AcFirstSightLoveVo.prototype, "AcFirstSightLoveVo");
//# sourceMappingURL=AcFirstSightLoveVo.js.map