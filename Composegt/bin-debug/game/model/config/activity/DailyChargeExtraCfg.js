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
        var DailyChargeExtraCfg = (function () {
            function DailyChargeExtraCfg() {
                this.itemListCfg = {};
            }
            DailyChargeExtraCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new DailyChargeExtraItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            DailyChargeExtraCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            return DailyChargeExtraCfg;
        }());
        AcCfg.DailyChargeExtraCfg = DailyChargeExtraCfg;
        __reflect(DailyChargeExtraCfg.prototype, "Config.AcCfg.DailyChargeExtraCfg");
        var DailyChargeExtraItemCfg = (function (_super) {
            __extends(DailyChargeExtraItemCfg, _super);
            function DailyChargeExtraItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DailyChargeExtraItemCfg;
        }(BaseItemCfg));
        AcCfg.DailyChargeExtraItemCfg = DailyChargeExtraItemCfg;
        __reflect(DailyChargeExtraItemCfg.prototype, "Config.AcCfg.DailyChargeExtraItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
