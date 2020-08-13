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
        /**
         * 巾帼英雄
         * author ycg
         * date 2019.11.11
         * @namespace HeroineCfg
         */
        var HeroineCfg = (function () {
            function HeroineCfg() {
                this.poolRewards = null;
                this.rechargeList = [];
                this.achievementList = [];
                this.rewardDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20101", "nameId": "servant_name2010", "clickContinue": true },
                    }
                };
                this.rewardDialog_3 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20091", "nameId": "servant_name2009", "clickContinue": true },
                    }
                };
                this.rewardDialog_5 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20111", "nameId": "servant_name2011", "clickContinue": true },
                    }
                };
                this.rewardDialog_7 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20121", "nameId": "servant_name2012", "clickContinue": true },
                    }
                };
                this.rewardDialog_9 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_20131", "nameId": "servant_name2013", "clickContinue": true },
                    }
                };
            }
            HeroineCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var itemCfg = new HeroineRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "processingReward") {
                        this.achievementList = [];
                        for (var k in data[key]) {
                            var itemCfg = new HeroineAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achievementList.push(itemCfg);
                        }
                        this.achievementList.sort(function (a, b) { return a.id - b.id; });
                    }
                    else if (key == "pool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            HeroineCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            HeroineCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            HeroineCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return HeroineCfg;
        }());
        AcCfg.HeroineCfg = HeroineCfg;
        __reflect(HeroineCfg.prototype, "Config.AcCfg.HeroineCfg");
        /**累充item */
        var HeroineRechargeItem = (function (_super) {
            __extends(HeroineRechargeItem, _super);
            function HeroineRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**充值金额 */
                _this.needGem = 0;
                /**充值奖励 */
                _this.getReward = null;
                /**特殊物品 */
                _this.specialGift = 0;
                _this.sortId = 0;
                return _this;
            }
            return HeroineRechargeItem;
        }(BaseItemCfg));
        AcCfg.HeroineRechargeItem = HeroineRechargeItem;
        __reflect(HeroineRechargeItem.prototype, "Config.AcCfg.HeroineRechargeItem");
        /**进度奖励item */
        var HeroineAchievementItem = (function (_super) {
            __extends(HeroineAchievementItem, _super);
            function HeroineAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**血量进度 */
                _this.ratetime = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return HeroineAchievementItem;
        }(BaseItemCfg));
        AcCfg.HeroineAchievementItem = HeroineAchievementItem;
        __reflect(HeroineAchievementItem.prototype, "Config.AcCfg.HeroineAchievementItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=HeroineCfg.js.map