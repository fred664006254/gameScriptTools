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
        var TotalRechargeCfg = (function () {
            function TotalRechargeCfg() {
                this.itemListCfg = {};
            }
            TotalRechargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new TotalRechargeCfgItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            TotalRechargeCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            TotalRechargeCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return TotalRechargeCfg;
        }());
        AcCfg.TotalRechargeCfg = TotalRechargeCfg;
        __reflect(TotalRechargeCfg.prototype, "Config.AcCfg.TotalRechargeCfg");
        var TotalRechargeCfgItemCfg = (function (_super) {
            __extends(TotalRechargeCfgItemCfg, _super);
            function TotalRechargeCfgItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TotalRechargeCfgItemCfg;
        }(BaseItemCfg));
        AcCfg.TotalRechargeCfgItemCfg = TotalRechargeCfgItemCfg;
        __reflect(TotalRechargeCfgItemCfg.prototype, "Config.AcCfg.TotalRechargeCfgItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
