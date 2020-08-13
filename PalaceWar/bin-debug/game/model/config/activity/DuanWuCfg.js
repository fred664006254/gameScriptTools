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
        var DuanWuCfg = (function () {
            function DuanWuCfg() {
                /**展示时间 */
                this.extraTime = 0;
                /**
                 *  --活动期间的累计充值奖励
                    --needGem:所需额度：单位（元宝）
                    --zongZiGet:粽子奖励
                    --getReward:奖励
                 */
                this.recharge = {};
                /**
                 * --活动期间的活跃任务   注：每日不重置
                    --openType:跳转
                    --questType:任务类型
                    --value:进度
                    --xiongHuangGet:雄黄酒
                    --getReward:奖励
                 */
                this.task = {};
                /**
                 * --活动期间的活跃任务   注：每日不重置
                    --openType:跳转
                    --questType:任务类型
                    --value:进度
                    --xiongHuangGet:雄黄酒
                    --getReward:奖励
                 */
                this.shopTask = {};
                /**
                 * --商店
                    --item:道具
                    --price:价格
                    --rebate:折扣
                    --limit:限购
                 */
                this.shop = {};
                /**
                 * --兑换
                    --item:道具
                    --costZongZi:需要粽子
                    --costXiongHuang:需要雄黄酒
                    --costDaGao:需要打糕
                    --limit:活动限购
                    --getXiongHuang:得到雄黄
                    --getDaGao:得到打糕
                 */
                this.claim = {};
            }
            DuanWuCfg.prototype.formatData = function (data) {
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge[id]) {
                        this.recharge[id] = new DWRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.task) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.task[id]) {
                        this.task[id] = new DWTaskItemCfg();
                    }
                    itemCfg = this.task[id];
                    itemCfg.initData(data.task[key]);
                    itemCfg.taskId = id;
                }
                this.shopTask = data.shopTask;
                this.extraTime = data.extraTime;
                for (var key in data.shop) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.shop[id]) {
                        this.shop[id] = new DWShopItemCfg();
                    }
                    itemCfg = this.shop[id];
                    itemCfg.initData(data.shop[key]);
                    itemCfg.id = id;
                }
                for (var key in data.claim) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.claim[id]) {
                        this.claim[id] = new DWClaimItemCfg();
                    }
                    itemCfg = this.claim[id];
                    itemCfg.initData(data.claim[key]);
                    itemCfg.id = id;
                }
            };
            return DuanWuCfg;
        }());
        AcCfg.DuanWuCfg = DuanWuCfg;
        __reflect(DuanWuCfg.prototype, "Config.AcCfg.DuanWuCfg");
        var DWRechargeItemCfg = (function (_super) {
            __extends(DWRechargeItemCfg, _super);
            function DWRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DWRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DWRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.DWRechargeItemCfg = DWRechargeItemCfg;
        __reflect(DWRechargeItemCfg.prototype, "Config.AcCfg.DWRechargeItemCfg");
        var DWTaskItemCfg = (function (_super) {
            __extends(DWTaskItemCfg, _super);
            function DWTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                  获得雄黄酒
                 */
                _this.xiongHuangGet = 0;
                return _this;
            }
            Object.defineProperty(DWTaskItemCfg.prototype, "rewardIcons", {
                get: function () {
                    // this.getReward += (`18_0001_${this.zongziGet}`);
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DWTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.DWTaskItemCfg = DWTaskItemCfg;
        __reflect(DWTaskItemCfg.prototype, "Config.AcCfg.DWTaskItemCfg");
        var DWShopItemCfg = (function (_super) {
            __extends(DWShopItemCfg, _super);
            function DWShopItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 折扣
                 */
                _this.rebate = 1;
                return _this;
            }
            Object.defineProperty(DWShopItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.item, true, false)[0];
                },
                enumerable: true,
                configurable: true
            });
            return DWShopItemCfg;
        }(BaseItemCfg));
        AcCfg.DWShopItemCfg = DWShopItemCfg;
        __reflect(DWShopItemCfg.prototype, "Config.AcCfg.DWShopItemCfg");
        var DWClaimItemCfg = (function (_super) {
            __extends(DWClaimItemCfg, _super);
            function DWClaimItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DWClaimItemCfg;
        }(BaseItemCfg));
        AcCfg.DWClaimItemCfg = DWClaimItemCfg;
        __reflect(DWClaimItemCfg.prototype, "Config.AcCfg.DWClaimItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DuanWuCfg.js.map