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
var AcLuckBagVo = (function (_super) {
    __extends(AcLuckBagVo, _super);
    function AcLuckBagVo() {
        var _this = _super.call(this) || this;
        _this.p = 0; //总充值钻石数
        _this.lp = 0; //当天获得的活跃点数
        _this.pnum = 0; //充值获得的抽奖次数
        _this.lnum = 0; //活跃度获得的抽奖次数
        _this.unum = 0; //使用的抽奖次数
        _this.sinfo = null;
        return _this;
    }
    Object.defineProperty(AcLuckBagVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLuckBagVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKBAG_REFRESHVO);
    };
    Object.defineProperty(AcLuckBagVo.prototype, "totalCount", {
        get: function () {
            return this.unum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckBagVo.prototype, "remainderCount", {
        get: function () {
            return this.pnum + this.lnum - this.unum;
        },
        enumerable: true,
        configurable: true
    });
    AcLuckBagVo.prototype.isCollected = function (boxId) {
        if (this.sinfo && this.sinfo[boxId.toString()] && this.sinfo[boxId.toString()] == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(AcLuckBagVo.prototype, "isShowRedDot", {
        // private get cfg() : Config.AcCfg.MayDayCfg{
        // 	return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        // }
        get: function () {
            if (this.pnum + this.lnum - this.unum > 0) {
                return true;
            }
            var cfg = this.cfg;
            if (!cfg) {
                return false;
            }
            var curTurn = this.totalCount;
            for (var i in cfg.lotteryNum) {
                var unit = cfg.lotteryNum[i];
                if (curTurn >= unit.needNum && this.isCollected(Number(i) + 1) == false) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLuckBagVo.prototype, "acTimeAndHour", {
        get: function () {
            var et = this.et - 86400;
            return App.DateUtil.getOpenLocalTime(this.st, et, true);
        },
        enumerable: true,
        configurable: true
    });
    AcLuckBagVo.prototype.dispose = function () {
        this.p = 0; //总充值钻石数
        this.lp = 0;
        this.pnum = 0;
        this.lnum = 0;
        this.unum = 0;
    };
    return AcLuckBagVo;
}(AcBaseVo));
__reflect(AcLuckBagVo.prototype, "AcLuckBagVo");
