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
        var RyeHarvestCfg = (function () {
            function RyeHarvestCfg() {
                /**充值列表 */
                this.rechargeItemListCfg = [];
                /**充值列表 */
                this.dailyTaskItemCfgList = {};
                // RyeHarvestDailyTaskItemCfg[] 
                /**商店 */
                this.shopCfgList = [];
            }
            /**
             * 初始化数据
             */
            RyeHarvestCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new RyeHarvestRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "shop") {
                        this.shopCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new RyeHarvestShopItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.shopCfgList.push(itemcfg);
                        }
                    }
                    if (key == "dailyTask") {
                        this.dailyTaskItemCfgList = {};
                        for (var i = 0; i < data[key].length; i++) {
                            var dailyTaskCfg = [];
                            for (var j = 0; j < data[key][i].length; j++) {
                                var itemcfg = new RyeHarvestDailyTaskItemCfg();
                                itemcfg.initData(data[key][i][j]);
                                itemcfg.id = Number(j) + 1;
                                dailyTaskCfg.push(itemcfg);
                            }
                            this.dailyTaskItemCfgList[String(i + 1)] = dailyTaskCfg;
                        }
                    }
                }
            };
            RyeHarvestCfg.prototype.getShopCfgList = function () {
                var shopCfg = [];
                for (var i = 0; i < this.shopCfgList.length; i++) {
                    var itemVo = GameData.formatRewardItem(this.shopCfgList[i].getReward)[0];
                    var itemVo2 = GameData.formatRewardItem(this.shopCfgList[i].needPart)[0];
                    if (!itemVo) {
                        continue;
                    }
                    // if (itemVo2) {
                    //     //这个场景如果没有获得显示这些配置
                    //     if ((!Api.otherInfoVoApi.isHasSceneNotAboutUnlock("104", "homeScene")) && itemVo2.type == 6) {
                    //         continue;
                    //     }
                    // }
                    shopCfg.push(this.shopCfgList[i]);
                }
                return shopCfg;
            };
            /**解析翻牌奖池 */
            RyeHarvestCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.pool) {
                    var unit = this.pool[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            RyeHarvestCfg.prototype.getSkinBone = function (code) {
                var cfg = null;
                var skinId = this.getSkin(code);
                switch (Number(code)) {
                    case 1:
                    case 2:
                        cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
                        break;
                }
                return cfg.bone ? cfg.bone : '';
            };
            RyeHarvestCfg.prototype.getSkinName = function (code) {
                var cfg = null;
                var skinId = this.getSkin(code);
                switch (Number(code)) {
                    case 1:
                    case 2:
                        cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
                        break;
                }
                return cfg.name ? cfg.name : '';
            };
            RyeHarvestCfg.prototype.getSkin = function (code) {
                var skin = '';
                switch (Number(code)) {
                    case 1:
                    case 2:
                        skin = "2081";
                        break;
                }
                return skin;
            };
            return RyeHarvestCfg;
        }());
        AcCfg.RyeHarvestCfg = RyeHarvestCfg;
        __reflect(RyeHarvestCfg.prototype, "Config.AcCfg.RyeHarvestCfg");
        /**每日任务 */
        var RyeHarvestDailyTaskItemCfg = (function (_super) {
            __extends(RyeHarvestDailyTaskItemCfg, _super);
            function RyeHarvestDailyTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RyeHarvestDailyTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.RyeHarvestDailyTaskItemCfg = RyeHarvestDailyTaskItemCfg;
        __reflect(RyeHarvestDailyTaskItemCfg.prototype, "Config.AcCfg.RyeHarvestDailyTaskItemCfg");
        /**兑换商店 */
        var RyeHarvestShopItemCfg = (function (_super) {
            __extends(RyeHarvestShopItemCfg, _super);
            function RyeHarvestShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RyeHarvestShopItemCfg;
        }(BaseItemCfg));
        AcCfg.RyeHarvestShopItemCfg = RyeHarvestShopItemCfg;
        __reflect(RyeHarvestShopItemCfg.prototype, "Config.AcCfg.RyeHarvestShopItemCfg");
        /**累计充值奖励 */
        var RyeHarvestRechargeItemCfg = (function (_super) {
            __extends(RyeHarvestRechargeItemCfg, _super);
            function RyeHarvestRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RyeHarvestRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.RyeHarvestRechargeItemCfg = RyeHarvestRechargeItemCfg;
        __reflect(RyeHarvestRechargeItemCfg.prototype, "Config.AcCfg.RyeHarvestRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
