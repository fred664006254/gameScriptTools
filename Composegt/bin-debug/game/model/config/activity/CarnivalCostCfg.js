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
        var CarnivalCostCfg = (function () {
            function CarnivalCostCfg() {
                this.itemListCfg = {};
            }
            CarnivalCostCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new CarnivalCostItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            CarnivalCostCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            CarnivalCostCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return CarnivalCostCfg;
        }());
        AcCfg.CarnivalCostCfg = CarnivalCostCfg;
        __reflect(CarnivalCostCfg.prototype, "Config.AcCfg.CarnivalCostCfg");
        var CarnivalCostItemCfg = (function (_super) {
            __extends(CarnivalCostItemCfg, _super);
            function CarnivalCostItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CarnivalCostItemCfg;
        }(BaseItemCfg));
        AcCfg.CarnivalCostItemCfg = CarnivalCostItemCfg;
        __reflect(CarnivalCostItemCfg.prototype, "Config.AcCfg.CarnivalCostItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
