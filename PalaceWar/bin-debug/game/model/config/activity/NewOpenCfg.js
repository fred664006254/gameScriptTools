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
        var NewOpenCfg = (function () {
            function NewOpenCfg() {
                /**展示时间 */
                this.extraTime = 0;
                this.task = {};
                this.recharge = {};
                this.shop = {};
            }
            NewOpenCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.task = data.task;
                for (var key in data.costGem) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge[id]) {
                        this.recharge[id] = new NewOpenRechargeItemCfg();
                    }
                    itemCfg = this.recharge[id];
                    itemCfg.initData(data.costGem[key]);
                    itemCfg.id = id;
                }
                for (var key in data.shop) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.shop[id]) {
                        this.shop[id] = new NewOpenShopItemCfg();
                    }
                    itemCfg = this.shop[id];
                    itemCfg.initData(data.shop[key]);
                    itemCfg.id = id;
                }
            };
            return NewOpenCfg;
        }());
        AcCfg.NewOpenCfg = NewOpenCfg;
        __reflect(NewOpenCfg.prototype, "Config.AcCfg.NewOpenCfg");
        var NewOpenRechargeItemCfg = (function (_super) {
            __extends(NewOpenRechargeItemCfg, _super);
            function NewOpenRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(NewOpenRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return NewOpenRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.NewOpenRechargeItemCfg = NewOpenRechargeItemCfg;
        __reflect(NewOpenRechargeItemCfg.prototype, "Config.AcCfg.NewOpenRechargeItemCfg");
        var NewOpenShopItemCfg = (function (_super) {
            __extends(NewOpenShopItemCfg, _super);
            function NewOpenShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(NewOpenShopItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.formatRewardItem(this.getReward, true)[0];
                },
                enumerable: true,
                configurable: true
            });
            return NewOpenShopItemCfg;
        }(BaseItemCfg));
        AcCfg.NewOpenShopItemCfg = NewOpenShopItemCfg;
        __reflect(NewOpenShopItemCfg.prototype, "Config.AcCfg.NewOpenShopItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewOpenCfg.js.map