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
        var SingleDay2019Cfg = (function () {
            function SingleDay2019Cfg() {
                /**展示时间 */
                this.extraTime = 0;
                this.switch = [];
                /**【功能1】转盘抽奖-普通奖池*/
                this.pool1 = [];
                /*--【功能1】转盘抽奖-高级奖池*/
                this.pool2 = [];
                /*--进入高级奖池的次数标识，抽奖次数达到 pool2Times 的时候，会进行一次几率判定，判定成功，走pool2,不成功，走pool1*/
                this.pool2Times = [];
                /*--进入高级奖池的概率  百分制  每次几率判定的几率  超过最大值取最大值*/
                this.pool2Ratio = [];
                /*-超出pool2Times后，每 X 次，进行一次几率判定*/
                this.exTimes = 0;
                /*功能3】元宝消耗冲榜-上榜条件：活动期间消耗元宝数量大于等于 X 可上榜*/
                this.needGemCost = 0;
                /**
                 * --【功能2】充值奖励列表
                --needGem:所需额度：单位（元宝）
                --specialReward:特殊奖励：元宝转盘所需道具
                --getReward:奖励
                 */
                this.recharge = {};
                /**
                 *  --【功能3】元宝消耗冲榜-排名奖励
                --rank:排名
                --getReward:奖励
                 */
                this.gemRank = {};
                /**
                 * --【功能4】限时返场的商店
                    --price:原价格
                    --rebate:折扣
                    --limit:限购数量
                    --item:道具
                 */
                this.shop1List = {};
                /**
                 * --【功能5】折扣礼包道具
                --type:类型 1：礼包类  2：道具类
                --price:原价价格
                --rebate:折扣
                --limit:限购数量
                --item:道具
                 */
                this.shop2List = {};
            }
            //解析数据
            SingleDay2019Cfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.pool1 = data.pool1;
                this.pool2 = data.pool2;
                this.pool2Times = data.pool2Times;
                this.pool2Ratio = data.pool2Ratio;
                this.exTimes = data.exTimes;
                this.switch = data.switch;
                this.needGemCost = data.needGemCost;
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.recharge[id]) {
                        this.recharge[id] = new SingleDayNewRechargeItem();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.gemRank) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.gemRank[id]) {
                        this.gemRank[id] = new SingleDayNewGemRankItem();
                    }
                    itemCfg = this.gemRank[id];
                    itemCfg.initData(data.gemRank[key]);
                    itemCfg.id = id;
                }
                for (var key in data.shop1List) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.shop1List[id]) {
                        this.shop1List[id] = new SingleDayNewShop1Item();
                    }
                    itemCfg = this.shop1List[id];
                    itemCfg.initData(data.shop1List[key]);
                    itemCfg.id = id;
                }
                for (var key in data.shop2List) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.shop2List[id]) {
                        this.shop2List[id] = new SingleDayNewShop2Item();
                    }
                    itemCfg = this.shop2List[id];
                    itemCfg.initData(data.shop2List[key]);
                    itemCfg.id = id;
                }
            };
            SingleDay2019Cfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.pool1) {
                    var unit = this.pool1[i];
                    if (unit[1] > 0) {
                        rewards += unit[0] + "|";
                    }
                }
                for (var i in this.pool2) {
                    var unit = this.pool2[i];
                    if (unit[1] > 0) {
                        rewards += unit[0] + "|";
                    }
                }
                return rewards.substring(0, rewards.length - 1);
            };
            SingleDay2019Cfg.prototype.getMaxRank = function () {
                var max = 0;
                var unit = this.gemRank[Object.keys(this.gemRank).length];
                if (unit && unit.rank && unit.rank[1]) {
                    max = unit.rank[1];
                }
                return max;
            };
            SingleDay2019Cfg.prototype.getTitle = function () {
                var str = "";
                var arr = this.switch[0].split("title_name");
                if (arr[1]) {
                    str = arr[1];
                }
                return str;
            };
            return SingleDay2019Cfg;
        }());
        AcCfg.SingleDay2019Cfg = SingleDay2019Cfg;
        __reflect(SingleDay2019Cfg.prototype, "Config.AcCfg.SingleDay2019Cfg");
        var SingleDayNewRechargeItem = (function (_super) {
            __extends(SingleDayNewRechargeItem, _super);
            function SingleDayNewRechargeItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SingleDayNewRechargeItem;
        }(BaseItemCfg));
        AcCfg.SingleDayNewRechargeItem = SingleDayNewRechargeItem;
        __reflect(SingleDayNewRechargeItem.prototype, "Config.AcCfg.SingleDayNewRechargeItem");
        var SingleDayNewGemRankItem = (function (_super) {
            __extends(SingleDayNewGemRankItem, _super);
            function SingleDayNewGemRankItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SingleDayNewGemRankItem.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SingleDayNewGemRankItem.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return SingleDayNewGemRankItem;
        }(BaseItemCfg));
        AcCfg.SingleDayNewGemRankItem = SingleDayNewGemRankItem;
        __reflect(SingleDayNewGemRankItem.prototype, "Config.AcCfg.SingleDayNewGemRankItem");
        var SingleDayNewShop1Item = (function (_super) {
            __extends(SingleDayNewShop1Item, _super);
            function SingleDayNewShop1Item() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SingleDayNewShop1Item;
        }(BaseItemCfg));
        AcCfg.SingleDayNewShop1Item = SingleDayNewShop1Item;
        __reflect(SingleDayNewShop1Item.prototype, "Config.AcCfg.SingleDayNewShop1Item");
        var SingleDayNewShop2Item = (function (_super) {
            __extends(SingleDayNewShop2Item, _super);
            function SingleDayNewShop2Item() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SingleDayNewShop2Item;
        }(BaseItemCfg));
        AcCfg.SingleDayNewShop2Item = SingleDayNewShop2Item;
        __reflect(SingleDayNewShop2Item.prototype, "Config.AcCfg.SingleDayNewShop2Item");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SingleDay2019Cfg.js.map