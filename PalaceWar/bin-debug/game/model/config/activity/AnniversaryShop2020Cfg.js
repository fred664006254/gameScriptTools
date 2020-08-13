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
        var AnniversaryShop2020Cfg = (function () {
            function AnniversaryShop2020Cfg() {
                this.shop1DataList = [];
                this.shop2DataList = [];
            }
            AnniversaryShop2020Cfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "shop1List") {
                        this.shop1DataList = [];
                        for (var k in data[key]) {
                            var item = new AnniversaryShop2020Item();
                            item.initData(data[key][k]);
                            item.id = k;
                            this.shop1DataList.push(item);
                        }
                    }
                    else if (key == "shop2List") {
                        this.shop2DataList = [];
                        for (var k in data[key]) {
                            var item = new AnniversaryShop2020Item();
                            item.initData(data[key][k]);
                            item.id = k;
                            this.shop2DataList.push(item);
                        }
                    }
                }
            };
            AnniversaryShop2020Cfg.prototype.getShop1Cfg = function () {
                return this.shop1DataList;
            };
            AnniversaryShop2020Cfg.prototype.getShop2Cfg = function () {
                return this.shop2DataList;
            };
            AnniversaryShop2020Cfg.prototype.getShopCfgById = function (id, type) {
                var data = this.shop1DataList;
                if (type == 2) {
                    data = this.shop2DataList;
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == id) {
                        return data[i];
                    }
                }
                return null;
            };
            return AnniversaryShop2020Cfg;
        }());
        AcCfg.AnniversaryShop2020Cfg = AnniversaryShop2020Cfg;
        __reflect(AnniversaryShop2020Cfg.prototype, "Config.AcCfg.AnniversaryShop2020Cfg");
        var AnniversaryShop2020Item = (function (_super) {
            __extends(AnniversaryShop2020Item, _super);
            function AnniversaryShop2020Item() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.sortId = 0;
                return _this;
            }
            return AnniversaryShop2020Item;
        }(BaseItemCfg));
        AcCfg.AnniversaryShop2020Item = AnniversaryShop2020Item;
        __reflect(AnniversaryShop2020Item.prototype, "Config.AcCfg.AnniversaryShop2020Item");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AnniversaryShop2020Cfg.js.map