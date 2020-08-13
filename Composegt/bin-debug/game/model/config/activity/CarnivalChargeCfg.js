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
        var CarnivalChargeCfg = (function () {
            function CarnivalChargeCfg() {
                this.itemListCfg = {};
            }
            CarnivalChargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new CarnivalChargeItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            CarnivalChargeCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            CarnivalChargeCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return CarnivalChargeCfg;
        }());
        AcCfg.CarnivalChargeCfg = CarnivalChargeCfg;
        __reflect(CarnivalChargeCfg.prototype, "Config.AcCfg.CarnivalChargeCfg");
        var CarnivalChargeItemCfg = (function (_super) {
            __extends(CarnivalChargeItemCfg, _super);
            function CarnivalChargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CarnivalChargeItemCfg;
        }(BaseItemCfg));
        AcCfg.CarnivalChargeItemCfg = CarnivalChargeItemCfg;
        __reflect(CarnivalChargeItemCfg.prototype, "Config.AcCfg.CarnivalChargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
