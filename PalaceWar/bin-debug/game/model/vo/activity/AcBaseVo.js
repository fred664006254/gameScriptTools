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
var AcBaseVo = /** @class */ (function (_super) {
    __extends(AcBaseVo, _super);
    function AcBaseVo() {
        var _this = _super.call(this) || this;
        /**
         * 是否在展示期排序过
         */
        _this.isShowed = false;
        /**
         *
        */
        _this.zids = 0;
        return _this;
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
     * 活动倒计时，格式：活动倒计时: 49:55:55
     */
    AcBaseVo.prototype.getAcCountDown = function (timeType, str1, str2) {
        if (timeType === void 0) { timeType = 1; }
        if (str1 === void 0) { str1 = "acComm_timeEnd"; }
        if (str2 === void 0) { str2 = "acComm_timeCount"; }
        var et = this.et - (this.config.extraTime || 0) * 86400;
        if (et < GameData.serverTime) {
            return LanguageManager.getlocal(str1);
        }
        return LanguageManager.getlocal(str2, [App.DateUtil.getFormatBySecond((et - GameData.serverTime), timeType)]);
    };
    /**
     * 活动开始结束时间，格式：活动日期: x月x日-x月x日
     */
    AcBaseVo.prototype.getAcTimeAndHour = function (str) {
        if (str === void 0) { str = "acComm_time"; }
        var et = this.et;
        if (this.config && this.config.extraTime) {
            et = this.et - this.config.extraTime * 86400;
        }
        return LanguageManager.getlocal(str, [App.DateUtil.getOpenLocalTime(this.st, et, true)]);
    };
    /**
     * 活动展示期
     */
    AcBaseVo.prototype.checkIsInEndShowTime = function () {
        var v = false;
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        // extraTime = 10;
        if (extraTime && (GameData.serverTime >= (this.et - extraTime * 86400))) {
            v = true;
        }
        return v;
    };
    /**
     * 活动在进入展示期那一秒
     */
    AcBaseVo.prototype.checkIsAtEndShowTime = function () {
        var v = false;
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        if (this.isShowed == false && extraTime && (GameData.serverTime >= (this.et - extraTime * 86400))) {
            this.isShowed = true;
            v = true;
        }
        return v;
    };
    /**
     * 活动展示期 剩余时间
     */
    AcBaseVo.prototype.getShowTime = function () {
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        var v = GameData.serverTime - (this.et - extraTime * 86400);
        return v;
    };
    /**
     * 活动剩余时间 (不含展示期)
     */
    AcBaseVo.prototype.getAcResidueTime = function () {
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        var v = this.et - GameData.serverTime - extraTime * 86400;
        return v;
    };
    /**
     * 活动是否有展示期
     */
    AcBaseVo.prototype.checkIsHasExtraTime = function () {
        var extraTime = Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code);
        return extraTime > 0;
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
            return App.DateUtil.getFormatBySecond((this.et - GameData.serverTime), 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBaseVo.prototype, "acCountDownNoExtra", {
        /**
         * 活动结束倒计时剔除展示期，格式：00：00：00
         */
        get: function () {
            var et = this.et;
            if (Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code)) {
                et = this.et - Config.AcCfg.getExtraTimeByIdAndCode(this.aid, this.code) * 86400;
            }
            return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
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
    Object.defineProperty(AcBaseVo.prototype, "isShowBanner", {
        /**
         *
         *是否显示活动banner，默认读取icon状态，如果有活动单独显示banner重写此方法
         */
        get: function () {
            return this.isShowIcon;
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
    Object.defineProperty(AcBaseVo.prototype, "isPreview", {
        /**
         * 检测是否活动是否在预告期间
         */
        get: function () {
            var result = false;
            var tempSt = this.st;
            if (Config.IconorderCfg.checkAcInGroup(this.aid)) {
                var icon = Config.IconorderCfg.getIconNameByName(this.aid, String(this.code));
                var gAcVo = Api.acVoApi.getGroupAcVo(icon);
                if (gAcVo && gAcVo.isStart) {
                    if (this.st > GameData.serverTime && this.st < gAcVo.et) {
                        result = true;
                    }
                }
            }
            else {
                result = (this.st && GameData.serverTime) ? this.st > GameData.serverTime : false;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取活动预告时间倒计时，格式为 00:00:00
     */
    AcBaseVo.prototype.getPreviewTime = function () {
        return App.DateUtil.getFormatBySecond((this.st - GameData.serverTime), 5);
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
    /**活动结束通用tip */
    AcBaseVo.prototype.showAcEndTip = function () {
        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
    };
    /**
     * 获取活动名称
     */
    AcBaseVo.prototype.getlocalName = function () {
        return Api.acVoApi.getAcLocalName(this.aid, this.code);
    };
    //是否是跨服联赛
    AcBaseVo.prototype.isCrossLeague = function () {
        var flag = false;
        var arr = [AcConst.AID_NEWACCROSSSERVERATKRACE, AcConst.AID_ACCROSSSERVERATKRACE, AcConst.AID_ACCROSSSERVERINTIMACY, AcConst.AID_ACCROSSSERVERPOWER, AcConst.AID_ACCROSSSERVERWIFEBATTLE];
        if (arr.indexOf(this.aid) > -1) {
            flag = this.zids && this.zids >= 6 && this.zids < 11;
        }
        return flag;
    };
    //是否跨服风云联赛
    AcBaseVo.prototype.isCrossFengYun = function () {
        var flag = false;
        var arr = [AcConst.AID_ACCROSSSERVERPOWER, AcConst.AID_ACCROSSSERVERINTIMACY, AcConst.AID_ACCROSSSERVERATKRACE];
        if (arr.indexOf(this.aid) > -1) {
            flag = this.zids && this.zids >= 11;
        }
        return flag;
    };
    AcBaseVo.prototype.dispose = function () {
        this.isShowed = false;
        this.zids = 0;
    };
    return AcBaseVo;
}(BaseVo));
//# sourceMappingURL=AcBaseVo.js.map