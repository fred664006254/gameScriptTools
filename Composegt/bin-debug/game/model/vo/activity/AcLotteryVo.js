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
var AcLotteryVo = (function (_super) {
    __extends(AcLotteryVo, _super);
    function AcLotteryVo() {
        var _this = _super.call(this) || this;
        //次数
        _this.total = 0;
        //每轮参与次数{"1":{st:xx,num:xx},"2":{st:xx,num:xx}}
        _this.cinfo = [];
        //次数奖励情况
        _this.numflags = [];
        //最新看到的中奖版本
        _this.seewinnum = 0;
        return _this;
    }
    Object.defineProperty(AcLotteryVo.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLotteryVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LOTTERY_REFRESHVO);
    };
    AcLotteryVo.prototype.isCollected = function (boxId) {
        if (this.numflags && this.numflags[boxId.toString()] && this.numflags[boxId.toString()] == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Object.defineProperty(AcLotteryVo.prototype, "totalCount", {
        get: function () {
            return this.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotteryVo.prototype, "isShowRedDot", {
        get: function () {
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
    AcLotteryVo.prototype.dispose = function () {
    };
    return AcLotteryVo;
}(AcBaseVo));
__reflect(AcLotteryVo.prototype, "AcLotteryVo");
