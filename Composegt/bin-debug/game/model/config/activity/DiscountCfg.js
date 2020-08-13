var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var DiscountCfg = (function () {
            function DiscountCfg() {
                this.vipList = {};
            }
            DiscountCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    var itemCfg = void 0;
                    if (!this.vipList.hasOwnProperty(String(key))) {
                        this.vipList[String(key)] = new DiscountItemCfg();
                    }
                    itemCfg = this.vipList[String(key)];
                    itemCfg.initData(data[key]);
                    itemCfg.level = Number(key);
                }
            };
            return DiscountCfg;
        }());
        AcCfg.DiscountCfg = DiscountCfg;
        __reflect(DiscountCfg.prototype, "Config.AcCfg.DiscountCfg");
        var DiscountItemCfg = (function () {
            function DiscountItemCfg() {
            }
            DiscountItemCfg.prototype.initData = function (data) {
                this.needGem = data.needGem;
            };
            return DiscountItemCfg;
        }());
        AcCfg.DiscountItemCfg = DiscountItemCfg;
        __reflect(DiscountItemCfg.prototype, "Config.AcCfg.DiscountItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
