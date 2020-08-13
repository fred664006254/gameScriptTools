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
        var WorldCupCfg = (function () {
            function WorldCupCfg() {
                /**
                 * 玩家每天达到X活跃度可获得100足球币
                 */
                this.needAct = 0;
                /**
                 * 玩家每天达到120活跃度可获得足球币数量
                 */
                this.giftCoin = 0;
                /**
                 *单次购买可获得足球币的数量
                 */
                this.coinNum = 0;
                /**
                 * 购买一次需要花费的元宝
                 */
                this.cost = 0;
                /**
                 * --每天最多购买次数
                 */
                this.maxBuy = 0;
                /**
                 * 每次竞猜需要的足球币限制（每次竞猜都必须是100足球币的倍数）
                 */
                this.coinLimit = 0;
                /**
                 *  竞猜错误返还足球币比例
                 */
                this.ratio1 = 0;
                /**
                 *每天赔率
                 */
                this.odds = [];
                /**
                 * 活动商店
                 *  --limit：购买次数限制
                    --originalCost：原价（单位：元宝）
                    --needCoin：所需足球币
                    --discount：折扣
                    --goods：商品内容
                 */
                this.actMarket = {};
                /**
                --国家列表
                    --countryName：国家简称
                 */
                this.country = [];
            }
            WorldCupCfg.prototype.formatData = function (data) {
                for (var key_1 in data) {
                    if (typeof this[key_1] != 'undefined' && key_1 != 'actMarket') {
                        this[key_1] = data[key_1];
                    }
                }
                ;
                for (var key in data.actMarket) {
                    var itemCfg = void 0;
                    if (!this.actMarket.hasOwnProperty(String(key))) {
                        this.actMarket[String(key)] = new WorldCupMarketItemCfg();
                    }
                    itemCfg = this.actMarket[String(key)];
                    itemCfg.initData(data.actMarket[key]);
                    itemCfg.sortId = Number(key);
                }
            };
            return WorldCupCfg;
        }());
        AcCfg.WorldCupCfg = WorldCupCfg;
        __reflect(WorldCupCfg.prototype, "Config.AcCfg.WorldCupCfg");
        var WorldCupMarketItemCfg = (function (_super) {
            __extends(WorldCupMarketItemCfg, _super);
            function WorldCupMarketItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(WorldCupMarketItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.goods, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return WorldCupMarketItemCfg;
        }(BaseItemCfg));
        __reflect(WorldCupMarketItemCfg.prototype, "WorldCupMarketItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WorldCupCfg.js.map