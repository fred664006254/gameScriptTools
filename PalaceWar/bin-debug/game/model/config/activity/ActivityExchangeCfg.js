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
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var ActivityExchangeCfg = (function () {
            function ActivityExchangeCfg() {
            }
            ActivityExchangeCfg.prototype.formatData = function (data) {
                var _this = this;
                this._itemList = [];
                var __list = data.itemExchange || [];
                __list.forEach(function (v) {
                    var _n = new ActivityExchangeCfgItem();
                    _n.sortId = v.sortId;
                    _n.limit = v.limit || 0;
                    _n.getReward = v.getReward;
                    _n.costItems = [];
                    var i = 1;
                    while (v["costItem" + i]) {
                        _n.costItems.push(v["costItem" + i]);
                        i++;
                    }
                    _this._itemList.push(_n);
                });
            };
            Object.defineProperty(ActivityExchangeCfg.prototype, "AllCfgItems", {
                get: function () {
                    return this._itemList || [];
                },
                enumerable: true,
                configurable: true
            });
            ActivityExchangeCfg.prototype.getLimitById = function (sortId) {
                var n = this._itemList.filter(function (v) { return v.sortId == sortId; });
                return n[0] ? n[0].limit : 0;
            };
            return ActivityExchangeCfg;
        }());
        AcCfg.ActivityExchangeCfg = ActivityExchangeCfg;
        __reflect(ActivityExchangeCfg.prototype, "Config.AcCfg.ActivityExchangeCfg");
        var ActivityExchangeCfgItem = (function (_super) {
            __extends(ActivityExchangeCfgItem, _super);
            function ActivityExchangeCfgItem() {
                return _super.call(this) || this;
            }
            return ActivityExchangeCfgItem;
        }(BaseItemCfg));
        AcCfg.ActivityExchangeCfgItem = ActivityExchangeCfgItem;
        __reflect(ActivityExchangeCfgItem.prototype, "Config.AcCfg.ActivityExchangeCfgItem");
        // interface ActivityExchangeCfgItem {
        //     sortId: number,             // 排序
        //     limit: number,              // 兑换次数限制
        //     costItems: string[],        // 消耗
        //     getReward: string           // 获得
        // }
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ActivityExchangeCfg.js.map