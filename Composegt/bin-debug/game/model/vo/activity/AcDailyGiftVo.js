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
var AcDailyGiftVo = (function (_super) {
    __extends(AcDailyGiftVo, _super);
    function AcDailyGiftVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.freegift = null;
        //已经全部充值
        _this.isRecharged = false;
        return _this;
    }
    AcDailyGiftVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYGIFT_REFRESHVO);
        var count = 0;
        var isR = true;
        for (var key in this.ainfo) {
            count++;
            if (this.ainfo[key] == 1) {
            }
            else {
                isR = false;
            }
        }
        if (count == 3) {
            this.isRecharged = isR;
        }
        else {
            this.isRecharged = false;
        }
    };
    Object.defineProperty(AcDailyGiftVo.prototype, "isShowRedDot", {
        get: function () {
            if (this.freegift == 1) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDailyGiftVo.prototype, "isShowIcon", {
        /**重写
         * 是否在活动开始期间，true：在期间，false:已结束或者未开始
         */
        get: function () {
            if (this.freegift == 1 || !this.isRecharged) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcDailyGiftVo.prototype.dispose = function () {
        this.ainfo = null;
        this.freegift = null;
        this.isRecharged = false;
    };
    return AcDailyGiftVo;
}(AcBaseVo));
__reflect(AcDailyGiftVo.prototype, "AcDailyGiftVo");
