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
var AcBaseVo = (function (_super) {
    __extends(AcBaseVo, _super);
    function AcBaseVo() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcBaseVo.prototype, "aidAndCode", {
        // public get aType():string
        // {
        // 	return "";
        // }
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBaseVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcBaseVo.prototype, "config", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "acTime", {
        /**
         * 活动开始结束时间，格式：x月x日-x月x日
         */
        get: function () {
            return App.DateUtil.getOpenLocalTime(this.st, this.et, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "acTimeAndHour", {
        /**
         * 活动开始结束时间，格式：x月x日-x月x日
         */
        get: function () {
            var et = this.et;
            if (this.config && this.config.extraTime) {
                et = this.et - this.config.extraTime * 86400;
            }
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 活动展示期
     */
    AcBaseVo.prototype.checkIsInEndShowTime = function () {
        var v = false;
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        // extraTime = 10;
        if (extraTime && (GameData.serverTime > (this.et - extraTime * 86400))) {
            v = true;
        }
        return v;
    };
    AcBaseVo.prototype.getShowTime = function () {
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        var v = GameData.serverTime - (this.et - extraTime * 86400);
        return v;
    };
    /**
     * 活动开始结束时间，显示：活动日期：x月x日-x月x日
     */
    AcBaseVo.prototype.getAcLocalTime = function (showHour, color) {
        if (color) {
            return LanguageManager.getlocal("acLocalTime", ["<font color=" + color + ">" + (showHour ? this.acTimeAndHour : this.acTime) + "</font>"]);
        }
        else {
            return LanguageManager.getlocal("acLocalTime", [showHour ? this.acTimeAndHour : this.acTime]);
        }
    };
    Object.defineProperty(AcBaseVo.prototype, "acCountDown", {
        /**
         * 活动结束倒计时，格式：00：00：00
         */
        get: function () {
            return App.DateUtil.getFormatBySecond(Math.max(0, (this.et - GameData.serverTime)), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "acLocalCountDown", {
        /**
         * 活动结束倒计时，显示：活动结束倒计时00：00：00
         */
        get: function () {
            return LanguageManager.getlocal("acLocalCountDown", [this.acCountDown]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "isStart", {
        /**
         * 是否在活动开始期间，true：在期间，false:已结束或者未开始
         */
        get: function () {
            if ((this.st <= GameData.serverTime) && (this.et > GameData.serverTime)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "isShowIcon", {
        /**
         * 是否显示活动icon，设置后自动显示或者隐藏活动
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "isShowRedDot", {
        /**
         * 检测活动是否显示红点，true：显示
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取天数显示奖励  num＝1 累天充值
     */
    AcBaseVo.prototype.getShowNum = function (num) {
        if (num === void 0) { num = 0; }
        if (this.atype == "7" || num == 1) {
            var endTime = App.DateUtil.getWeeTs(this.et);
            var starTime = App.DateUtil.getWeeTs(this.st);
            var tNum = Math.ceil((endTime - starTime) / 86400);
            if (this.et == endTime) {
                return tNum;
            }
            else {
                return tNum + 1;
            }
        }
    };
    Object.defineProperty(AcBaseVo.prototype, "isEnd", {
        /**
         * 当前活动是否已经结束
         */
        get: function () {
            return GameData.serverTime > this.et;
        },
        enumerable: true,
        configurable: true
    });
    AcBaseVo.prototype.dispose = function () {
    };
    return AcBaseVo;
}(BaseVo));
__reflect(AcBaseVo.prototype, "AcBaseVo");
