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
    var EmperorwarCfg;
    (function (EmperorwarCfg) {
        EmperorwarCfg.rankRewardList = {};
        EmperorwarCfg.cheerRewardList = {};
        EmperorwarCfg.shop = {};
        function formatData(data) {
            EmperorwarCfg.condition1 = data.condition1;
            EmperorwarCfg.condition2 = data.condition2;
            EmperorwarCfg.condition3 = data.condition3;
            EmperorwarCfg.secondTime = data.secondTime;
            EmperorwarCfg.auctionTime = data.auctionTime;
            EmperorwarCfg.cheerTime = data.cheerTime;
            EmperorwarCfg.battleTime = data.battleTime;
            EmperorwarCfg.servant = data.servant;
            EmperorwarCfg.itemNeed = data.itemNeed;
            EmperorwarCfg.exchangeNum = data.exchangeNum;
            EmperorwarCfg.battlelastTime = data.battlelastTime;
            EmperorwarCfg.limit = data.limit;
            EmperorwarCfg.enterMin = data.enterMin;
            EmperorwarCfg.cheerLv = data.cheerLv;
            EmperorwarCfg.cheerCost = data.cheerCost;
            EmperorwarCfg.cheerEffect = data.cheerEffect;
            EmperorwarCfg.cheerAddAtk = data.cheerAddAtk;
            for (var key in data.rankRewardList) {
                var itemCfg = void 0;
                if (!EmperorwarCfg.rankRewardList.hasOwnProperty(String(key))) {
                    EmperorwarCfg.rankRewardList[String(key)] = new EmperorwarRankRewardItemCfg();
                }
                itemCfg = EmperorwarCfg.rankRewardList[String(key)];
                itemCfg.initData(data.rankRewardList[key]);
                itemCfg.id = String(key);
            }
            for (var key in data.cheerRewardList) {
                var itemCfg = void 0;
                if (!EmperorwarCfg.cheerRewardList.hasOwnProperty(String(key))) {
                    EmperorwarCfg.cheerRewardList[String(key)] = new EmperorwarCheerRewardItemCfg();
                }
                itemCfg = EmperorwarCfg.cheerRewardList[String(key)];
                itemCfg.initData(data.cheerRewardList[key]);
                itemCfg.id = String(key);
            }
            for (var key in data.shop) {
                var itemCfg = void 0;
                if (!EmperorwarCfg.shop.hasOwnProperty(String(key))) {
                    EmperorwarCfg.shop[String(key)] = new EmperorwarShopItemCfg();
                }
                itemCfg = EmperorwarCfg.shop[String(key)];
                itemCfg.initData(data.shop[key]);
                itemCfg.sortId = Number(key);
            }
        }
        EmperorwarCfg.formatData = formatData;
    })(EmperorwarCfg = Config.EmperorwarCfg || (Config.EmperorwarCfg = {}));
    var EmperorwarRankRewardItemCfg = (function (_super) {
        __extends(EmperorwarRankRewardItemCfg, _super);
        function EmperorwarRankRewardItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EmperorwarRankRewardItemCfg.prototype, "minRank", {
            get: function () {
                return this.rank[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmperorwarRankRewardItemCfg.prototype, "maxRank", {
            get: function () {
                return this.rank[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmperorwarRankRewardItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons(this.getReward, true, true);
            },
            enumerable: true,
            configurable: true
        });
        return EmperorwarRankRewardItemCfg;
    }(BaseItemCfg));
    __reflect(EmperorwarRankRewardItemCfg.prototype, "EmperorwarRankRewardItemCfg");
    var EmperorwarCheerRewardItemCfg = (function (_super) {
        __extends(EmperorwarCheerRewardItemCfg, _super);
        function EmperorwarCheerRewardItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EmperorwarCheerRewardItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons(this.getReward, true, true);
            },
            enumerable: true,
            configurable: true
        });
        return EmperorwarCheerRewardItemCfg;
    }(BaseItemCfg));
    __reflect(EmperorwarCheerRewardItemCfg.prototype, "EmperorwarCheerRewardItemCfg");
    var EmperorwarShopItemCfg = (function (_super) {
        __extends(EmperorwarShopItemCfg, _super);
        function EmperorwarShopItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(EmperorwarShopItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons(this.content, true, false);
            },
            enumerable: true,
            configurable: true
        });
        return EmperorwarShopItemCfg;
    }(BaseItemCfg));
    __reflect(EmperorwarShopItemCfg.prototype, "EmperorwarShopItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=EmperorwarCfg.js.map