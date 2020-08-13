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
var AcLimitGiftVo = /** @class */ (function (_super) {
    __extends(AcLimitGiftVo, _super);
    function AcLimitGiftVo() {
        var _this = _super.call(this) || this;
        _this.buyNum = {};
        return _this;
    }
    AcLimitGiftVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
    Object.defineProperty(AcLimitGiftVo.prototype, "config", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLimitGiftVo.prototype, "isHasFreeCharge", {
        /**
         * 是否有可领取的免费礼包
         * 借此判断tab红点
         */
        get: function () {
            var _mf = this.config.GiftList.filter(function (v) { return v.cost == "0"; });
            if (_mf[0]) {
                var _has = this.getBuyNumByCost(_mf[0].cost);
                return _has < _mf[0].limit;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    AcLimitGiftVo.prototype.getBuyNumByCost = function (cost) {
        return this.buyNum[cost] || 0;
    };
    Object.defineProperty(AcLimitGiftVo.prototype, "isShowRedDot", {
        /**
         * 检测活动是否显示红点，true：显示
         */
        get: function () {
            var _volist = Api.acVoApi.getActivityVoListByAid(this.aid);
            for (var i = 0; i < _volist.length; i++) {
                if (_volist[i].isHasFreeCharge && !_volist[i].isEnd) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AcLimitGiftVo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLimitGiftVo;
}(AcBaseVo));
//# sourceMappingURL=AcLimitGiftVo.js.map