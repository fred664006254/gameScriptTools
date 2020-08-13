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
var AcChargeReturnGemVo = (function (_super) {
    __extends(AcChargeReturnGemVo, _super);
    function AcChargeReturnGemVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flag = 0;
        _this.red = 0;
        return _this;
    }
    AcChargeReturnGemVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
    };
    Object.defineProperty(AcChargeReturnGemVo.prototype, "isShowIcon", {
        /**
         * 是否显示活动icon，设置后自动显示或者隐藏活动
         */
        get: function () {
            return this.flag <= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChargeReturnGemVo.prototype, "isShowRedDot", {
        /**
         * 检测活动是否显示红点，true：显示
         */
        get: function () {
            return this.red === 1;
        },
        enumerable: true,
        configurable: true
    });
    AcChargeReturnGemVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChargeReturnGemVo;
}(AcBaseVo));
__reflect(AcChargeReturnGemVo.prototype, "AcChargeReturnGemVo");
