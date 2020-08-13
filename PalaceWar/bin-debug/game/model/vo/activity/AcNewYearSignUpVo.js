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
 * 除夕7天签到vo
 */
var AcNewYearSignUpVo = (function (_super) {
    __extends(AcNewYearSignUpVo, _super);
    function AcNewYearSignUpVo() {
        return _super.call(this) || this;
    }
    AcNewYearSignUpVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    /**购买的次数 */
    AcNewYearSignUpVo.prototype.getBuySign = function () {
        return this.buySign;
    };
    /**获得cd时间 */
    AcNewYearSignUpVo.prototype.getBallonTs = function () {
        return this.ballonTs;
    };
    /** 获得领取次数 */
    AcNewYearSignUpVo.prototype.getBallonValue = function () {
        return this.ballonNum;
    };
    /**
     * 	当前第几天
     */
    AcNewYearSignUpVo.prototype.getNowDay = function () {
        return this.diffday;
    };
    /**
     * 奖励是否被领取
     */
    AcNewYearSignUpVo.prototype.isReceiveReward = function (id) {
        if (this.cinfo[id]) {
            if (this.cinfo[id] == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    /**是否有这个奖励 */
    AcNewYearSignUpVo.prototype.isHaveReward = function (id) {
        if (this.cinfo[id] == null) {
            return false;
        }
        else {
            return true;
        }
    };
    /**是否领取了七日奖励 */
    AcNewYearSignUpVo.prototype.isReceiveSevenReward = function () {
        if (this.cinfo["all"]) {
            return true;
        }
        return false;
    };
    /**是否有领取七日奖励的资格 */
    AcNewYearSignUpVo.prototype.isHaveReceiveSevenReward = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.et - 86400 * cfg.extraTime - GameData.serverTime < 0) {
            return false;
        }
        if (this.cinfo["all"] == null) {
            var totalDay = 7;
            if (this.code == 2) {
                totalDay = 3;
            }
            var day = 0;
            for (var key in this.cinfo) {
                if (this.cinfo[key] == 1 && Number(key) > 0) {
                    day++;
                }
                else {
                    if (Number(key) <= totalDay) {
                        return false;
                    }
                }
            }
            if (day >= totalDay) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    /**是否可以打开板子 */
    AcNewYearSignUpVo.prototype.isShowSharkView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        return cfg && (this.getBallonTs() + cfg.rewardCD) <= GameData.serverTime && GameData.isOpenNewYearSignUpView && this.getBallonValue() < cfg.limitation && ViewController.getInstance().checkHasShowedView() == false && (this.et - cfg.extraTime * 86400) > GameData.serverTime;
    };
    Object.defineProperty(AcNewYearSignUpVo.prototype, "isShowRedDot", {
        /**
         * 红点显示
         */
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            if (this.et - 86400 * cfg.extraTime - GameData.serverTime < 0) {
                return false;
            }
            var totalDay = 7;
            if (this.code == 2) {
                totalDay = 3;
            }
            for (var key in this.cinfo) {
                if (this.cinfo[key] == 0 && Number(key) <= totalDay && Number(key) > 0) {
                    return true;
                }
            }
            return (!this.isReceiveSevenReward()) && this.isHaveReceiveSevenReward();
        },
        enumerable: true,
        configurable: true
    });
    //倒计时
    AcNewYearSignUpVo.prototype.getCountDown = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var et = this.et - cfg.extraTime * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal("acPunishEnd");
        }
        return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
    };
    Object.defineProperty(AcNewYearSignUpVo.prototype, "acTimeAndHour", {
        //活动日期时间显示
        get: function () {
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var et = this.et - 86400 * cfg.extraTime;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearSignUpVo.prototype.dispose = function () {
        this.cinfo = null;
        this.diffday = 0;
        this.ballonTs = 0;
        this.ballonNum = 0;
        this.buySign = 0;
        _super.prototype.dispose.call(this);
    };
    return AcNewYearSignUpVo;
}(AcBaseVo));
__reflect(AcNewYearSignUpVo.prototype, "AcNewYearSignUpVo");
//# sourceMappingURL=AcNewYearSignUpVo.js.map