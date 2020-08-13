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
var AcThxgivingVo = (function (_super) {
    __extends(AcThxgivingVo, _super);
    function AcThxgivingVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AcThxgivingVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THXGIVINGREFRESHVO);
    };
    Object.defineProperty(AcThxgivingVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThxgivingVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.et < GameData.serverTime) {
                return false;
            }
            // 抽奖红点
            if (this.cannum > 0) {
                return true;
            }
            if (!this.cfg) {
                return false;
            }
            // 宝箱
            for (var i = 0; i < this.cfg.feastList.length; i++) {
                var tmprcfg = this.cfg.feastList[i];
                if ((!this.flags || !this.flags[i + 1]) && this.scorenum >= tmprcfg.needNum) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 进度条百分比
     */
    AcThxgivingVo.prototype.getPercentageNum = function () {
        var tageNum = 0;
        if (!this.cfg) {
            return tageNum;
        }
        tageNum = this.scorenum / this.cfg.exchangeNum;
        if (tageNum > 1) {
            tageNum = 1;
        }
        return tageNum;
    };
    AcThxgivingVo.prototype.getBoxStatusById = function (boxIndex) {
        if (!this.cfg) {
            return 1;
        }
        var feastListCfg = this.cfg.feastList;
        //1未完成 2可领取 3已领取
        if (this.scorenum < feastListCfg[boxIndex].needNum) {
            return 1;
        }
        else {
            if (this.flags["" + (boxIndex + 1)]) {
                return 3;
            }
            else {
                return 2;
            }
        }
    };
    AcThxgivingVo.prototype.getAcCDStr = function () {
        var t = this.et - GameData.serverTime;
        if (t < 0) {
            t = 0;
        }
        var timeTxt = App.DateUtil.getFormatBySecond(t, 8);
        return timeTxt;
    };
    Object.defineProperty(AcThxgivingVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 活动开始结束时间，显示：活动日期：x月x日-x月x日
     */
    AcThxgivingVo.prototype.getAcLocalTime = function (showHour, color) {
        if (color) {
            return LanguageManager.getlocal("acLocalTime", ["<font color=" + color + ">" + (showHour ? this.acTimeAndHour : this.acTime) + "</font>"]);
        }
        else {
            return LanguageManager.getlocal("acLocalTime", [showHour ? this.acTimeAndHour : this.acTime]);
        }
    };
    AcThxgivingVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcThxgivingVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThxgivingVo;
}(AcBaseVo));
__reflect(AcThxgivingVo.prototype, "AcThxgivingVo");
