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
        var DestroySameCfg = (function () {
            function DestroySameCfg() {
                /**展示时间 */
                this.extraTime = 0;
                /** 核心奖励*/
                this.coreReward = '';
                /**
                 *  核心奖励展开-神器ID
                 */
                this.coreReward1 = '';
                /**基础消除造成伤害。消除1个 */
                this.baseScore = 0;
                /**额外消除伤害。每额外消除1个，造成 X 伤害 */
                this.bonusScore = 0;
                /**
                --全服的击杀奖励
                --bossHp:血量
                --getReward:奖励
                 */
                this.bossList = {};
                /**
                 *  --活动期间的累计充值奖励
                    --needGem:所需额度：单位（元宝）
                    --specialGift:消除次数
                    --getReward:奖励
                 */
                this.recharge = {};
                /**
                 * --活动任务-特殊的限时方式，同类型的要扩展式的，不是分天的！
                --任务描述:备注
                --openType:跳转
                --questType:任务类型  特殊类型：1101：一次性消除【parameter1】个【parameter2】类型的南瓜达到【value】次
                --parameter1:参数1：南瓜个数
                --parameter2:参数2:南瓜类型
                --value:进度
                --getReward:奖励
                */
                this.task = {};
                this.pumpkinPool1 = [];
                this.pumpkinPool2 = [];
                this.pumpkinPool3 = [];
                this.shop = {};
            }
            //解析数据
            DestroySameCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.baseScore = data.baseScore;
                this.bonusScore = data.bonusScore;
                this.pumpkinPool1 = data.pumpkinPool1;
                this.pumpkinPool2 = data.pumpkinPool2;
                this.pumpkinPool3 = data.pumpkinPool3;
                this.coreReward = data.coreReward;
                this.coreReward1 = data.coreReward1;
                for (var key in data.bossList) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.bossList[id]) {
                        this.bossList[id] = new DSBossItemCfg();
                    }
                    itemCfg = this.bossList[id];
                    itemCfg.initData(data.bossList[key]);
                    itemCfg.id = id;
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge[id]) {
                        this.recharge[id] = new DSRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                this.task = data.task;
                if (data.shop) {
                    for (var key_1 in data.shop) {
                        var itemCfg = void 0;
                        var id = Number(key_1) + 1;
                        if (!this.shop[id]) {
                            this.shop[id] = new DSShopItemCfg();
                        }
                        itemCfg = this.shop[id];
                        itemCfg.initData(data.shop[key_1]);
                        itemCfg.id = id;
                    }
                }
            };
            DestroySameCfg.prototype.getSkin = function (code) {
                var skinId = "";
                // switch(Number(code)){
                //     case 1:
                //         skinId = this.coreReward;//2321`;
                //         break;
                // }
                return this.coreReward;
            };
            DestroySameCfg.prototype.getShopCfgList = function () {
                var arr = [];
                for (var i in this.shop) {
                    arr.push(this.shop[i]);
                }
                arr.sort(function (a, b) {
                    return a.sortId - b.sortId;
                });
                return arr;
            };
            return DestroySameCfg;
        }());
        AcCfg.DestroySameCfg = DestroySameCfg;
        __reflect(DestroySameCfg.prototype, "Config.AcCfg.DestroySameCfg");
        var DSBossItemCfg = (function (_super) {
            __extends(DSBossItemCfg, _super);
            function DSBossItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DSBossItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DSBossItemCfg;
        }(BaseItemCfg));
        AcCfg.DSBossItemCfg = DSBossItemCfg;
        __reflect(DSBossItemCfg.prototype, "Config.AcCfg.DSBossItemCfg");
        var DSRechargeItemCfg = (function (_super) {
            __extends(DSRechargeItemCfg, _super);
            function DSRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DSRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return DSRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.DSRechargeItemCfg = DSRechargeItemCfg;
        __reflect(DSRechargeItemCfg.prototype, "Config.AcCfg.DSRechargeItemCfg");
        /**兑换商店 */
        var DSShopItemCfg = (function (_super) {
            __extends(DSShopItemCfg, _super);
            function DSShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DSShopItemCfg;
        }(BaseItemCfg));
        AcCfg.DSShopItemCfg = DSShopItemCfg;
        __reflect(DSShopItemCfg.prototype, "Config.AcCfg.DSShopItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DestroySameCfg.js.map