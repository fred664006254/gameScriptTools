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
var AcFanliReviewVo = (function (_super) {
    __extends(AcFanliReviewVo, _super);
    function AcFanliReviewVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addskin = 0;
        _this.lotterynum = 0;
        _this.lotterysnum = 0;
        _this.preward = 0;
        _this.firstOpen = 0;
        return _this;
    }
    AcFanliReviewVo.prototype.initData = function (data) {
        var olv = this.lotterynum;
        for (var key in data) {
            this[key] = data[key];
        }
        if (olv < this.lotterynum) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FANLIREVIEW_RECALL_NUM_REFRESH);
        }
    };
    Object.defineProperty(AcFanliReviewVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFanliReviewVo.prototype.isFirstOpen = function () {
        return this.firstOpen == 0;
    };
    Object.defineProperty(AcFanliReviewVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.cfg) {
                return false;
            }
            var stageinfo = this.stageinfo;
            var lotterysnum = this.lotterysnum;
            var ReviewNum = this.cfg.ReviewNum;
            for (var index = 0; index < ReviewNum.length; index++) {
                var element = ReviewNum[index];
                if (element.needNum <= lotterysnum) {
                    if (!this.stageinfo["" + (index + 1)]) {
                        return true;
                    }
                }
            }
            return (this.firstOpen == 0 || this.lotterynum > 0);
        },
        enumerable: true,
        configurable: true
    });
    AcFanliReviewVo.prototype.isRightRed = function () {
        var stageinfo = this.stageinfo;
        var lotterysnum = this.lotterysnum;
        var ReviewNum = this.cfg.ReviewNum;
        var ReviewItemNum = this.cfg.ReviewItemNum;
        for (var index = 0; index < ReviewNum.length; index++) {
            var element = ReviewNum[index];
            if (element.needNum <= lotterysnum && element.needNum >= ReviewItemNum / 2 && !this.stageinfo["" + (index + 1)]) {
                return true;
            }
        }
        return false;
    };
    AcFanliReviewVo.prototype.isLeftRed = function () {
        var stageinfo = this.stageinfo;
        var lotterysnum = this.lotterysnum;
        var ReviewNum = this.cfg.ReviewNum;
        var ReviewItemNum = this.cfg.ReviewItemNum;
        for (var index = 0; index < ReviewNum.length; index++) {
            var element = ReviewNum[index];
            if (element.needNum <= lotterysnum && element.needNum < ReviewItemNum / 2 && !this.stageinfo["" + (index + 1)]) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcFanliReviewVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcFanliReviewVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcFanliReviewVo.prototype.getAcLocalTime = function (showHour, color) {
        if (color) {
            return LanguageManager.getlocal("acFanliReviewReward_Time", ["<font color=" + color + ">" + (showHour ? this.acTimeAndHour : this.acTime) + "</font>"]);
        }
        else {
            return LanguageManager.getlocal("acFanliReviewReward_Time", [showHour ? this.acTimeAndHour : this.acTime]);
        }
    };
    AcFanliReviewVo.prototype.dispose = function () {
        this.addskin = 0;
        this.lotterynum = 0;
        this.lotterysnum = 0;
        this.preward = 0;
        this.stageinfo = {};
        this.firstOpen = 0;
        _super.prototype.dispose.call(this);
    };
    return AcFanliReviewVo;
}(AcBaseVo));
__reflect(AcFanliReviewVo.prototype, "AcFanliReviewVo");
