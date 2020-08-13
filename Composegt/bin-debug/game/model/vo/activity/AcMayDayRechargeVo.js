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
var AcMayDayRechargeVo = (function (_super) {
    __extends(AcMayDayRechargeVo, _super);
    function AcMayDayRechargeVo() {
        var _this = _super.call(this) || this;
        _this.lotterynum = 0;
        _this.ainfo = null;
        return _this;
    }
    AcMayDayRechargeVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM);
    };
    //获取抽奖的次数
    AcMayDayRechargeVo.prototype.getTurnTotal = function () {
        if (this.ainfo) {
            return this.ainfo.v;
        }
        else {
            return 0;
        }
    };
    /*转盘进度宝箱领取判断*/
    AcMayDayRechargeVo.prototype.isGetTurnProgress = function (id) {
        if (this.ainfo && this.ainfo.flags) {
            for (var key in this.ainfo.flags) {
                if (this.ainfo.flags[id] == 1) {
                    return true;
                }
            }
            return false;
        }
    };
    Object.defineProperty(AcMayDayRechargeVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayRechargeVo.prototype.getpublicRedhot1 = function () {
        //奖励进度宝箱
        var cfg = this.cfg;
        if (!cfg) {
            return false;
        }
        var curTurn = this.getTurnTotal();
        for (var i in cfg.lotteryNum) {
            var unit = cfg.lotteryNum[i];
            if (curTurn >= unit.needNum && this.isGetTurnProgress(Number(i) + 1) == false) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(AcMayDayRechargeVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.getpublicRedhot1()) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMayDayRechargeVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcMayDayRechargeVo.prototype.getArr = function (key) {
        var arr = [];
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (!cfg) {
            return [];
        }
        var celeBrateList = cfg;
        for (var i in celeBrateList) {
            if (i == key) {
                for (var key2 in celeBrateList[i]) {
                    if (celeBrateList[i][key2]) {
                        var currObj = celeBrateList[i][key2];
                        if (currObj.needGem || currObj.questType || currObj.discount || currObj.limit) {
                            celeBrateList[i][key2].key = Number(key2) + 1;
                            if (celeBrateList[i][key2].key) {
                                arr.push(celeBrateList[i][key2]);
                            }
                        }
                    }
                }
            }
        }
        return arr;
    };
    AcMayDayRechargeVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    AcMayDayRechargeVo.prototype.dispose = function () {
        this.ainfo = null;
    };
    return AcMayDayRechargeVo;
}(AcBaseVo));
__reflect(AcMayDayRechargeVo.prototype, "AcMayDayRechargeVo");
