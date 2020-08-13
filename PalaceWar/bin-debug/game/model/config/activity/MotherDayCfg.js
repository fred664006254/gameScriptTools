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
        var MotherDayCfg = (function () {
            function MotherDayCfg() {
                /**充值列表 */
                this.rechargeItemListCfg = [];
                /**充值列表 */
                this.dailyTaskItemCfgList = {};
                // MotherDayDailyTaskItemCfg[] 
                /**商店 */
                this.shopCfgList = [];
            }
            /**
             * 初始化数据
             */
            MotherDayCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MotherDayRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "shop") {
                        this.shopCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new MotherDayShopItemCfg();
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
                                var itemcfg = new MotherDayDailyTaskItemCfg();
                                itemcfg.initData(data[key][i][j]);
                                itemcfg.id = Number(j) + 1;
                                dailyTaskCfg.push(itemcfg);
                            }
                            this.dailyTaskItemCfgList[String(i + 1)] = dailyTaskCfg;
                        }
                    }
                }
            };
            MotherDayCfg.prototype.getShopCfgList = function (code) {
                var shopCfg = [];
                for (var i = 0; i < this.shopCfgList.length; i++) {
                    var itemVo = GameData.formatRewardItem(this.shopCfgList[i].getReward)[0];
                    var itemVo2 = GameData.formatRewardItem(this.shopCfgList[i].needPart)[0];
                    if (!itemVo) {
                        continue;
                    }
                    if (itemVo2) {
                        //这个场景如果没有获得显示这些配置
                        var sceneid = Number(code) == 7 ? "105" : "104";
                        if ((!Api.otherInfoVoApi.isHasSceneNotAboutUnlock(sceneid, "homeScene")) && itemVo2.type == 6) {
                            continue;
                        }
                    }
                    shopCfg.push(this.shopCfgList[i]);
                }
                return shopCfg;
            };
            /**解析翻牌奖池 */
            MotherDayCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.pool) {
                    var unit = this.pool[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            MotherDayCfg.prototype.getSkinBone = function (code) {
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
            MotherDayCfg.prototype.getSkinName = function (code) {
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
            MotherDayCfg.prototype.getSkin = function (code) {
                var skin = '';
                switch (Number(code)) {
                    case 1:
                    case 2:
                        skin = "2081";
                        break;
                    case 5:
                        skin = "1071";
                        break;
                    case 6:
                        skin = "2122";
                        break;
                }
                return skin;
            };
            return MotherDayCfg;
        }());
        AcCfg.MotherDayCfg = MotherDayCfg;
        __reflect(MotherDayCfg.prototype, "Config.AcCfg.MotherDayCfg");
        /**每日任务 */
        var MotherDayDailyTaskItemCfg = (function (_super) {
            __extends(MotherDayDailyTaskItemCfg, _super);
            function MotherDayDailyTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MotherDayDailyTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MotherDayDailyTaskItemCfg = MotherDayDailyTaskItemCfg;
        __reflect(MotherDayDailyTaskItemCfg.prototype, "Config.AcCfg.MotherDayDailyTaskItemCfg");
        /**兑换商店 */
        var MotherDayShopItemCfg = (function (_super) {
            __extends(MotherDayShopItemCfg, _super);
            function MotherDayShopItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MotherDayShopItemCfg;
        }(BaseItemCfg));
        AcCfg.MotherDayShopItemCfg = MotherDayShopItemCfg;
        __reflect(MotherDayShopItemCfg.prototype, "Config.AcCfg.MotherDayShopItemCfg");
        /**累计充值奖励 */
        var MotherDayRechargeItemCfg = (function (_super) {
            __extends(MotherDayRechargeItemCfg, _super);
            function MotherDayRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MotherDayRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.MotherDayRechargeItemCfg = MotherDayRechargeItemCfg;
        __reflect(MotherDayRechargeItemCfg.prototype, "Config.AcCfg.MotherDayRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MotherDayCfg.js.map