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
        var DailyChargeCfg = (function () {
            function DailyChargeCfg() {
                this.itemListCfg = {};
            }
            DailyChargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new DailyChargeItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            DailyChargeCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            DailyChargeCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return DailyChargeCfg;
        }());
        AcCfg.DailyChargeCfg = DailyChargeCfg;
        __reflect(DailyChargeCfg.prototype, "Config.AcCfg.DailyChargeCfg");
        var DailyChargeItemCfg = (function (_super) {
            __extends(DailyChargeItemCfg, _super);
            function DailyChargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DailyChargeItemCfg;
        }(BaseItemCfg));
        AcCfg.DailyChargeItemCfg = DailyChargeItemCfg;
        __reflect(DailyChargeItemCfg.prototype, "Config.AcCfg.DailyChargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DailyChargeCfg.js.map