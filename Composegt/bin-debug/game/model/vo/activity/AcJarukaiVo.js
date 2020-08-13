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
var AcJarukaiVo = (function (_super) {
    __extends(AcJarukaiVo, _super);
    function AcJarukaiVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 红莲勇士 玩家充值元宝数"
        _this.chargenum = null;
        // 红莲勇士 玩家本次活动获得头盔数
        _this.thenum = null;
        // 红莲勇士 玩家剩余可突击次数
        _this.lotterynum = null;
        _this.lotterysnum = null;
        // 红莲勇士 玩家以往累积数
        _this.accumulatenum = null;
        // 抽奖次数领取
        _this.stageinfo = null;
        return _this;
    }
    AcJarukaiVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FIVETIGERS_REFRESHVO);
    };
    Object.defineProperty(AcJarukaiVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiVo.prototype, "acCountDown", {
        get: function () {
            var et = this.et - (this.config.extraTime || 0) * 86400;
            if (et < GameData.serverTime) {
                return LanguageManager.getlocal("acPunishEnd");
            }
            return LanguageManager.getlocal("acChaseBanditTopTime", [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcJarukaiVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            if (this.lotterynum > 0 && this.lotterysnum < this.cfg.exchangeNum) {
                return true;
            }
            var helmetNum = this.cfg.progress;
            for (var i = 0; i < helmetNum.length; i++) {
                if (helmetNum[i].needNum <= this.lotterysnum && (!this.stageinfo[i + 1])) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcJarukaiVo.prototype.checkBoxCollected = function (boxIndex) {
        if (this.stageinfo[boxIndex + 1]) {
            return true;
        }
        return false;
    };
    AcJarukaiVo.prototype.maxHelmetNeedNum = function () {
        return this.cfg.exchangeNum;
    };
    Object.defineProperty(AcJarukaiVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return LanguageManager.getlocal("acChaseBanditTopDate", [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
        },
        enumerable: true,
        configurable: true
    });
    AcJarukaiVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcJarukaiVo.prototype.dispose = function () {
        this.v = null;
        // 红莲勇士 玩家本次活动获得头盔数
        this.thenum = null;
        // 红莲勇士 玩家剩余可突击次数
        this.lotterynum = null;
        // 红莲勇士 玩家以往累积数
        this.accumulatenum = null;
        // 红莲勇士 得到头盔数"
        this.lotterysnum = null;
        // 抽奖次数领取
        this.stageinfo = null;
        _super.prototype.dispose.call(this);
    };
    return AcJarukaiVo;
}(AcBaseVo));
__reflect(AcJarukaiVo.prototype, "AcJarukaiVo");
