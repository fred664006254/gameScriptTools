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
                var maxVip = Config.VipCfg.getMaxLevel();
                for (var key in this.itemListCfg) {
                    if (sheetType == this.itemListCfg[key].sheetType) {
                        arr.push(this.itemListCfg[key]);
                    }
                }
                //处理 vip超出配置
                var obj1 = arr[0];
                var buyNumLength = obj1.buyNum.length;
                if (buyNumLength < maxVip) {
                    for (var i = 0; i < arr.length; i++) {
                        var obj = arr[i];
                        for (var j = 0; j <= maxVip; j++) {
                            var lastNum = obj.buyNum[obj.buyNum.length - 1];
                            if (j >= buyNumLength && j <= maxVip - 1) {
                                obj.buyNum[j] = lastNum;
                            }
                        }
                    }
                    return arr;
                }
                else {
                    return arr;
                }
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
//# sourceMappingURL=VipShopCfg.js.map