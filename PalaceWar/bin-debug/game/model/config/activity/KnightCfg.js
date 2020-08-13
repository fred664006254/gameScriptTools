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
        var KnightCfg = (function () {
            function KnightCfg() {
                this.extraTime = 0;
                this.achieveList = [];
                this.rechargeList = [];
                this.poolRewards = null;
            }
            KnightCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        for (var k in data[key]) {
                            var item = new KnightRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "achievement") {
                        for (var k in data[key]) {
                            var item = new KnightAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "poolList") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            Object.defineProperty(KnightCfg.prototype, "cost1", {
                get: function () {
                    return 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(KnightCfg.prototype, "cost10", {
                get: function () {
                    return 10;
                },
                enumerable: true,
                configurable: true
            });
            KnightCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            KnightCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            KnightCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return KnightCfg;
        }());
        AcCfg.KnightCfg = KnightCfg;
        __reflect(KnightCfg.prototype, "Config.AcCfg.KnightCfg");
        var KnightRechargeItem = (function (_super) {
            __extends(KnightRechargeItem, _super);
            function KnightRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortId = 0;
                return _this;
            }
            return KnightRechargeItem;
        }(BaseItemCfg));
        AcCfg.KnightRechargeItem = KnightRechargeItem;
        __reflect(KnightRechargeItem.prototype, "Config.AcCfg.KnightRechargeItem");
        var KnightAchieveItem = (function (_super) {
            __extends(KnightAchieveItem, _super);
            function KnightAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.npcHp = 0;
                _this.sortId = 0;
                return _this;
            }
            return KnightAchieveItem;
        }(BaseItemCfg));
        AcCfg.KnightAchieveItem = KnightAchieveItem;
        __reflect(KnightAchieveItem.prototype, "Config.AcCfg.KnightAchieveItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=KnightCfg.js.map