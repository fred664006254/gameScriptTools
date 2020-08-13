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
var AcAnswerVo = (function (_super) {
    __extends(AcAnswerVo, _super);
    function AcAnswerVo() {
        var _this = _super.call(this) || this;
        _this.anum = 0; //已答次数
        _this.cannum = 0;
        _this.point = 0; //当前活跃度
        _this.tscore = 0; //总积分
        _this.todaySt = 0;
        return _this;
    }
    AcAnswerVo.prototype.initData = function (data) {
        var oldPoint = this.point || 0;
        for (var key in data) {
            this[key] = data[key];
        }
        if (this.point != oldPoint) {
            //App.MessageHelper.dispatchEvent(MessageConst.EXAMANSWER_POINTCHANGE);
        }
    };
    Object.defineProperty(AcAnswerVo.prototype, "isStart", {
        get: function () {
            if ((this.st <= GameData.serverTime) && (this.et > GameData.serverTime)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcAnswerVo.prototype.isInExtra = function () {
        if (this.isInActivity() && this.config) {
            var extraTime = this.config.extraTime;
            if (extraTime) {
                return GameData.serverTime > this.et - 86400 * extraTime;
            }
        }
        return false;
    };
    Object.defineProperty(AcAnswerVo.prototype, "isShowRedDot", {
        get: function () {
            if (!this.isInActivity() || this.isInExtra()) {
                return false;
            }
            return this.point >= (this.anum + 1) * this.config.cost;
        },
        enumerable: true,
        configurable: true
    });
    AcAnswerVo.prototype.isInActivity = function () {
        return GameData.serverTime >= this.st && GameData.serverTime < this.et;
    };
    return AcAnswerVo;
}(AcBaseVo));
__reflect(AcAnswerVo.prototype, "AcAnswerVo");
