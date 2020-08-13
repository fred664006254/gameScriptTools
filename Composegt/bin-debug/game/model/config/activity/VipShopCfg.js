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
        var VipShopCfg = (function () {
            function VipShopCfg() {
                this.itemListCfg = {};
            }
            VipShopCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.itemListCfg.hasOwnProperty(String(key))) {
                        this.itemListCfg[String(key)] = new VipShopItemCfg();
                    }
                    itemCfg = this.itemListCfg[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.id = String(key);
                }
            };
            VipShopCfg.prototype.getList = function (sheetType) {
                var arr = new Array();
                for (var key in this.itemListCfg) {
                    if (sheetType == this.itemListCfg[key].sheetType) {
                        arr.push(this.itemListCfg[key]);
                    }
                }
                return arr;
            };
            VipShopCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return VipShopCfg;
        }());
        AcCfg.VipShopCfg = VipShopCfg;
        __reflect(VipShopCfg.prototype, "Config.AcCfg.VipShopCfg");
        var VipShopItemCfg = (function (_super) {
            __extends(VipShopItemCfg, _super);
            function VipShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return VipShopItemCfg;
        }(BaseItemCfg));
        AcCfg.VipShopItemCfg = VipShopItemCfg;
        __reflect(VipShopItemCfg.prototype, "Config.AcCfg.VipShopItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
