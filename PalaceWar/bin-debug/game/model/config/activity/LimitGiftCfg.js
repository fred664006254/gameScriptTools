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
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var LimitGiftCfg = /** @class */ (function () {
            function LimitGiftCfg() {
            }
            LimitGiftCfg.prototype.formatData = function (data) {
                this.limitType = data.limitType;
                var giftList = data.gift;
                this._GiftList = giftList.map(function (v) {
                    var _g = new LimitGiftItem();
                    _g.cost = v.cost;
                    _g.limit = v.limit;
                    _g.getReward = v.getReward;
                    _g.show = v.show || 0;
                    return _g;
                });
            };
            Object.defineProperty(LimitGiftCfg.prototype, "GiftList", {
                get: function () {
                    return this._GiftList || [];
                },
                enumerable: true,
                configurable: true
            });
            return LimitGiftCfg;
        }());
        AcCfg.LimitGiftCfg = LimitGiftCfg;
        var LimitGiftItem = /** @class */ (function (_super) {
            __extends(LimitGiftItem, _super);
            function LimitGiftItem() {
                return _super.call(this) || this;
            }
            return LimitGiftItem;
        }(BaseItemCfg));
        AcCfg.LimitGiftItem = LimitGiftItem;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LimitGiftCfg.js.map