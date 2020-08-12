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
    /**
     * 商店配置类
     * author qianjun
     * @class ShopCfg
     */
    var ShopCfg;
    (function (ShopCfg) {
        //限定特价商店
        var discountShop = {};
        //每日特别商店
        var dailyShop = {};
        //皇家宝箱
        var specialBox = {};
        //黄金购买
        var buyGold = {};
        //表情符号
        var expressionGet = {};
        function formatData(data) {
            for (var key in data.discountShop) {
                var itemCfg = void 0;
                if (!discountShop.hasOwnProperty(String(key))) {
                    discountShop[String(key)] = new DiscountShopItemCfg();
                }
                itemCfg = discountShop[String(key)];
                itemCfg.initData(data.discountShop[key]);
                itemCfg.id = Number(key);
            }
            for (var key in data.dailyShop) {
                var itemCfg = void 0;
                if (!dailyShop.hasOwnProperty(String(key))) {
                    dailyShop[String(key)] = new DailyShopItemCfg();
                }
                itemCfg = dailyShop[String(key)];
                itemCfg.initData(data.dailyShop[key]);
                itemCfg.id = Number(key);
            }
            for (var key in data.specialBox) {
                var itemCfg = void 0;
                if (!specialBox.hasOwnProperty(String(key))) {
                    specialBox[String(key)] = new SpecialBoxShopItemCfg();
                }
                itemCfg = specialBox[String(key)];
                itemCfg.initData(data.specialBox[key]);
                itemCfg.id = Number(key);
            }
            for (var key in data.buyGold) {
                var itemCfg = void 0;
                if (!buyGold.hasOwnProperty(String(key))) {
                    buyGold[String(key)] = new BuyGoldShopItemCfg();
                }
                itemCfg = buyGold[String(key)];
                itemCfg.initData(data.buyGold[key]);
                itemCfg.id = Number(key);
            }
            for (var key in data.expressionGet) {
                var itemCfg = void 0;
                if (!expressionGet.hasOwnProperty(String(key))) {
                    expressionGet[String(key)] = new BuyExpressionShopItemCfg();
                }
                itemCfg = expressionGet[String(key)];
                itemCfg.initData(data.expressionGet[key]);
                itemCfg.id = Number(key);
            }
        }
        ShopCfg.formatData = formatData;
        function getSpecialBoxShopList() {
            var arr = [];
            for (var i in specialBox) {
                arr.push(specialBox[i]);
            }
            var max = arr.length;
            arr.sort(function (a, b) {
                if (a.id == max) {
                    return -1;
                }
                else if (b.id == max) {
                    return 1;
                }
                else {
                    return a.id - b.id;
                }
            });
            return arr;
        }
        ShopCfg.getSpecialBoxShopList = getSpecialBoxShopList;
        function getSpecialBoxCfgById(id) {
            var cfg = specialBox[id];
            return cfg;
        }
        ShopCfg.getSpecialBoxCfgById = getSpecialBoxCfgById;
        function getDiscountShopCfgById(id) {
            var cfg = discountShop[id];
            return cfg;
        }
        ShopCfg.getDiscountShopCfgById = getDiscountShopCfgById;
        /**
         * 根据cost值获取礼包名
         */
        function getDiscountNameByCost(cost) {
            var __name = "";
            for (var k in discountShop) {
                if (discountShop[k].cost == cost) {
                    __name = LangMger.getlocal("shopdiscountItemName" + k);
                    break;
                }
            }
            if (__name == "**") {
                __name = "";
            }
            return __name;
        }
        ShopCfg.getDiscountNameByCost = getDiscountNameByCost;
        function getDailyShopFreeRewardById(id, index, diceId) {
            var unit = dailyShop[index];
            var num = 1;
            var type = "";
            var boxId = "";
            var costNum = 0;
            var costType = "";
            //商品类型 1宝箱 2金币 3钻石 4-7卡片
            if (id == 1) {
                type = "box";
                boxId = unit.boxId;
                costType = unit.boxCostGem ? "gem" : "gold";
                costNum = unit.boxCostGem ? unit.boxCostGem : unit.boxCostGold;
            }
            else if (id == 2) {
                type = "gold";
                num = unit.gold;
            }
            else if (id == 3) {
                type = "gem";
                num = unit.gem;
            }
            else {
                type = "dice";
                costType = "gold";
                costNum = unit["card" + Math.floor(Number(diceId) / 100) + "Cost"];
            }
            return { num: num, type: type, boxId: boxId, costType: costType, costNum: costNum };
        }
        ShopCfg.getDailyShopFreeRewardById = getDailyShopFreeRewardById;
        function getBuyGoldShopList() {
            var arr = [];
            for (var i in buyGold) {
                arr.push(buyGold[i]);
            }
            return arr;
        }
        ShopCfg.getBuyGoldShopList = getBuyGoldShopList;
        function getBuyGoldCfgById(id) {
            var unit = buyGold[id];
            return unit;
        }
        ShopCfg.getBuyGoldCfgById = getBuyGoldCfgById;
        function getBuyExpressionShopList() {
            var arr = [];
            for (var i in expressionGet) {
                arr.push(expressionGet[i]);
            }
            return arr;
        }
        ShopCfg.getBuyExpressionShopList = getBuyExpressionShopList;
        function getBuyExpressionCfgById(id) {
            return expressionGet[id];
        }
        ShopCfg.getBuyExpressionCfgById = getBuyExpressionCfgById;
    })(ShopCfg = Config.ShopCfg || (Config.ShopCfg = {}));
    var DiscountShopItemCfg = (function (_super) {
        __extends(DiscountShopItemCfg, _super);
        function DiscountShopItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 礼包内，金币数量，有可能没有，没有则不显示
             */
            _this.gold = 0;
            /**
             * 礼包内，钻石数量，有可能没有，没有则不显示
             */
            _this.gem = 0;
            /**
             * 礼包内，固定卡牌
             */
            _this.card = 0;
            /**
             * 宝箱ID
             */
            _this.boxId = "";
            return _this;
        }
        Object.defineProperty(DiscountShopItemCfg.prototype, "name", {
            /**
             * 商品名称
             */
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        return DiscountShopItemCfg;
    }(BaseItemCfg));
    Config.DiscountShopItemCfg = DiscountShopItemCfg;
    __reflect(DiscountShopItemCfg.prototype, "Config.DiscountShopItemCfg");
    var DailyShopItemCfg = (function (_super) {
        __extends(DailyShopItemCfg, _super);
        function DailyShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DailyShopItemCfg;
    }(BaseItemCfg));
    Config.DailyShopItemCfg = DailyShopItemCfg;
    __reflect(DailyShopItemCfg.prototype, "Config.DailyShopItemCfg");
    var SpecialBoxShopItemCfg = (function (_super) {
        __extends(SpecialBoxShopItemCfg, _super);
        function SpecialBoxShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SpecialBoxShopItemCfg.prototype, "name", {
            get: function () {
                return LangMger.getlocal("boxname_" + this.boxId);
            },
            enumerable: true,
            configurable: true
        });
        return SpecialBoxShopItemCfg;
    }(BaseItemCfg));
    Config.SpecialBoxShopItemCfg = SpecialBoxShopItemCfg;
    __reflect(SpecialBoxShopItemCfg.prototype, "Config.SpecialBoxShopItemCfg");
    var BuyGoldShopItemCfg = (function (_super) {
        __extends(BuyGoldShopItemCfg, _super);
        function BuyGoldShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BuyGoldShopItemCfg;
    }(BaseItemCfg));
    Config.BuyGoldShopItemCfg = BuyGoldShopItemCfg;
    __reflect(BuyGoldShopItemCfg.prototype, "Config.BuyGoldShopItemCfg");
    var BuyExpressionShopItemCfg = (function (_super) {
        __extends(BuyExpressionShopItemCfg, _super);
        function BuyExpressionShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BuyExpressionShopItemCfg;
    }(BaseItemCfg));
    Config.BuyExpressionShopItemCfg = BuyExpressionShopItemCfg;
    __reflect(BuyExpressionShopItemCfg.prototype, "Config.BuyExpressionShopItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=ShopCfg.js.map