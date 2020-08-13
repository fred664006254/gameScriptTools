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
var AcGambleVo = (function (_super) {
    __extends(AcGambleVo, _super);
    function AcGambleVo() {
        var _this = _super.call(this) || this;
        _this._gambNum = 0;
        _this._gambRoundNum = 0;
        _this._round = null;
        _this._prevTime = 0;
        _this._prevRound = 0;
        /**
         * 今日是否全部结束
        */
        _this._isEnd = false;
        return _this;
    }
    AcGambleVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        this._gambNum = data.gambNum;
        this._gambRoundNum = data.gambRoundNum;
        this._round = data.round;
        //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
    };
    Object.defineProperty(AcGambleVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGambleVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.isStart) {
                return false;
            }
            var flag = false;
            for (var i in this._round) {
                var unit = this._round[i];
                if (typeof unit.reward == 'undefined' && unit.gemNum > 0) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },
        enumerable: true,
        configurable: true
    });
    AcGambleVo.prototype.isInActy = function () {
        var flag = false;
        if (GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400) {
            flag = true;
        }
        return flag;
    };
    /**
     * 获取当前场次
    */
    AcGambleVo.prototype.getCurTime = function () {
        return this._gambNum;
    };
    /**
     * 获取当前回合
    */
    AcGambleVo.prototype.getCurRound = function () {
        return this._gambRoundNum;
    };
    AcGambleVo.prototype.getIsEnd = function () {
        return this._gambNum > 3;
    };
    Object.defineProperty(AcGambleVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取当前回合的押注金额
    */
    AcGambleVo.prototype.getThisRoundGem = function (round) {
        if (round === void 0) { round = 0; }
        var baseGem = 0;
        if (round) {
            var unit = this._round[round];
            if (typeof unit.reward == 'undefined' && unit.gemNum > 0) {
                baseGem = unit.gemNum;
            }
        }
        else {
            for (var i in this._round) {
                var unit = this._round[i];
                if (typeof unit.reward == 'undefined' && unit.gemNum > 0) {
                    baseGem = unit.gemNum;
                    break;
                }
            }
        }
        return baseGem;
    };
    /**
     * 获取当前累计的奖金数目
    */
    AcGambleVo.prototype.getMyGem = function () {
        var num = 0;
        var baseGem = 0;
        for (var i in this._round) {
            var unit = this._round[i];
            if (typeof unit.reward == 'undefined' && unit.gemNum > 0) {
                baseGem = unit.gemNum;
                for (var j in unit.ret) {
                    if (unit.ret[j] == 1) {
                        var round = Number(j) + 1;
                        num = (baseGem * (this.cfg.gambPrize[round].stop.prize));
                    }
                }
                break;
            }
        }
        return num;
    };
    /**
     * 是否可以领取奖励
    */
    AcGambleVo.prototype.canGetReward = function () {
        var flag = false;
        for (var i in this._round) {
            var unit = this._round[i];
            if (typeof unit.reward == 'undefined' && unit.gemNum > 0) {
                for (var j in unit.ret) {
                    if (unit.ret[j] == 1) {
                        flag = true;
                        break;
                    }
                }
                break;
            }
        }
        return flag;
    };
    /**
     * 奖励信息
    */
    AcGambleVo.prototype.getRewardInfo = function () {
        var temp = null;
        for (var i in this._round) {
            var unit = this._round[i];
            if (typeof unit.reward == 'undefined' && unit.gemNum > 0) {
                temp = {};
                temp.time = Number(i) + 1;
                temp.round = unit.ret.length;
                break;
            }
        }
        return temp;
    };
    AcGambleVo.prototype.dispose = function () {
        this._isEnd = false;
        this._round = null;
        this._gambNum = this._gambRoundNum = 0;
        this._prevRound = this._prevTime = 0;
        _super.prototype.dispose.call(this);
    };
    return AcGambleVo;
}(AcBaseVo));
__reflect(AcGambleVo.prototype, "AcGambleVo");
//# sourceMappingURL=AcGambleVo.js.map