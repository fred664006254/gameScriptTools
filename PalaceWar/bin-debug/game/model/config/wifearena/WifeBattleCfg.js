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
     * 红颜配置
     */
    var WifebattleCfg;
    (function (WifebattleCfg) {
        /**
         * 学习用了大典消耗道具
         */
        WifebattleCfg.costItem = "1";
        WifebattleCfg.shopList = [];
        WifebattleCfg.yongleCanonList = [];
        WifebattleCfg.rankBuff = 0;
        WifebattleCfg.wifeBattleBuff = [];
        function getWifeStudyCfgList() {
            return WifebattleCfg.yongleCanonList;
        }
        WifebattleCfg.getWifeStudyCfgList = getWifeStudyCfgList;
        function getWifeStudyCfgById(id) {
            if (Number(id) > WifebattleCfg.yongleCanonList.length) {
                return null;
            }
            else {
                return WifebattleCfg.yongleCanonList[Number(id) - 1];
            }
        }
        WifebattleCfg.getWifeStudyCfgById = getWifeStudyCfgById;
        function getShopItemById(id) {
            return WifebattleCfg.shop[id];
        }
        WifebattleCfg.getShopItemById = getShopItemById;
        function formatData(data) {
            for (var key in data) {
                if (key == "shop") {
                    var shopData = data[key];
                    WifebattleCfg["shop"] = data["shop"];
                    for (var shopkey in shopData) {
                        var wifebattleShopItemCfg = new WifebattleShopItemCfg();
                        wifebattleShopItemCfg.initData(shopData[shopkey]);
                        wifebattleShopItemCfg.id = String(shopkey);
                        WifebattleCfg.shop[shopkey] = wifebattleShopItemCfg;
                        WifebattleCfg.shopList.push(wifebattleShopItemCfg);
                    }
                    WifebattleCfg.shopList.sort(function (a, b) {
                        return Number(a.id) - Number(b.id);
                    });
                }
                else if (key == "yongleCanon") {
                    WifebattleCfg.yongleCanon = data[key];
                    for (var yonglekey in WifebattleCfg.yongleCanon) {
                        var itemCfg = new WifebattleStudyItemCfg();
                        itemCfg.initData(WifebattleCfg.yongleCanon[yonglekey]);
                        itemCfg.id = String(yonglekey);
                        WifebattleCfg.yongleCanonList.push(itemCfg);
                    }
                    WifebattleCfg.yongleCanonList.sort(function (a, b) {
                        return Number(a.id) - Number(b.id);
                    });
                }
                else {
                    WifebattleCfg[key] = data[key];
                }
            }
        }
        WifebattleCfg.formatData = formatData;
    })(WifebattleCfg = Config.WifebattleCfg || (Config.WifebattleCfg = {}));
    var WifebattleStudyItemCfg = (function (_super) {
        __extends(WifebattleStudyItemCfg, _super);
        function WifebattleStudyItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WifebattleStudyItemCfg;
    }(BaseItemCfg));
    Config.WifebattleStudyItemCfg = WifebattleStudyItemCfg;
    __reflect(WifebattleStudyItemCfg.prototype, "Config.WifebattleStudyItemCfg");
    /**
     * boss商店
     */
    var WifebattleShopItemCfg = (function (_super) {
        __extends(WifebattleShopItemCfg, _super);
        function WifebattleShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WifebattleShopItemCfg.prototype, "itemCfg", {
            get: function () {
                return Config.ItemCfg.getItemCfgById(this.item.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifebattleShopItemCfg.prototype, "name", {
            get: function () {
                var name = "";
                if (this.itemCfg) {
                    name = this.itemCfg.name;
                }
                return name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WifebattleShopItemCfg.prototype, "iconContainer", {
            get: function () {
                var obj = new BaseDisplayObjectContainer();
                if (this.itemCfg) {
                    obj = this.itemCfg.getIconContainer(true);
                }
                return obj;
            },
            enumerable: true,
            configurable: true
        });
        WifebattleShopItemCfg.prototype.getNeedScoreByNum = function () {
            return this.limitNum;
        };
        return WifebattleShopItemCfg;
    }(BaseItemCfg));
    Config.WifebattleShopItemCfg = WifebattleShopItemCfg;
    __reflect(WifebattleShopItemCfg.prototype, "Config.WifebattleShopItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=WifeBattleCfg.js.map