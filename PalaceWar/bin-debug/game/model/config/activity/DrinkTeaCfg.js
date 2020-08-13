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
        var DrinkTeaCfg = (function () {
            function DrinkTeaCfg() {
                this.extraTime = 0;
                this.achieveList = [];
                this.rechargeList = [];
                this.poolRewards = null;
            }
            DrinkTeaCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "teaRecharge") {
                        for (var k in data[key]) {
                            var item = new DrinkTeaRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "achievement") {
                        for (var k in data[key]) {
                            var item = new DrinkTeaAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "chessPool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            Object.defineProperty(DrinkTeaCfg.prototype, "cost1", {
                get: function () {
                    return 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DrinkTeaCfg.prototype, "cost10", {
                get: function () {
                    return 10;
                },
                enumerable: true,
                configurable: true
            });
            DrinkTeaCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            DrinkTeaCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            DrinkTeaCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return DrinkTeaCfg;
        }());
        AcCfg.DrinkTeaCfg = DrinkTeaCfg;
        __reflect(DrinkTeaCfg.prototype, "Config.AcCfg.DrinkTeaCfg");
        var DrinkTeaRechargeItem = (function (_super) {
            __extends(DrinkTeaRechargeItem, _super);
            function DrinkTeaRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortId = 0;
                return _this;
            }
            return DrinkTeaRechargeItem;
        }(BaseItemCfg));
        AcCfg.DrinkTeaRechargeItem = DrinkTeaRechargeItem;
        __reflect(DrinkTeaRechargeItem.prototype, "Config.AcCfg.DrinkTeaRechargeItem");
        var DrinkTeaAchieveItem = (function (_super) {
            __extends(DrinkTeaAchieveItem, _super);
            function DrinkTeaAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needNum = 0;
                _this.sortId = 0;
                return _this;
            }
            return DrinkTeaAchieveItem;
        }(BaseItemCfg));
        AcCfg.DrinkTeaAchieveItem = DrinkTeaAchieveItem;
        __reflect(DrinkTeaAchieveItem.prototype, "Config.AcCfg.DrinkTeaAchieveItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DrinkTeaCfg.js.map