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
         * 携美同游
         * author ycg
         * date 2019.11.4
         * @namespace TravelWithBeautyCfg
         */
        var TravelWithBeautyCfg = (function () {
            function TravelWithBeautyCfg() {
                this.poolRewards = null;
                this.rechargeList = [];
                this.achievementList = [];
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_3035", "nameId": "wifeName_303", "clickContinue": true },
                    }
                };
                this.startDialog_3 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": '', "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "5": { "nextId": null, "descId": 5, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    }
                };
                //领取奖励剧情
                this.rewardDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_3035", "nameId": "wifeName_303", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_3035", "nameId": "wifeName_303", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "5": { "nextId": null, "descId": 5, "bgId": 6, "personPic": 'wife_skin_3035', "nameId": "wifeName_303", "clickContinue": true },
                    }
                };
                this.rewardDialog_3 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": '', "nameId": "", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": '', "nameId": "", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": '', "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    },
                    6: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    },
                    7: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2241", "nameId": "wifeName_224", "clickContinue": true },
                    },
                };
            }
            TravelWithBeautyCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var itemCfg = new TravelWithBeautyRecharageItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k) + 1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement") {
                        this.achievementList = [];
                        for (var k in data[key]) {
                            var itemCfg = new TravelWithBeautyAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k) + 1);
                            this.achievementList.push(itemCfg);
                        }
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
            TravelWithBeautyCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            TravelWithBeautyCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            TravelWithBeautyCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return TravelWithBeautyCfg;
        }());
        AcCfg.TravelWithBeautyCfg = TravelWithBeautyCfg;
        __reflect(TravelWithBeautyCfg.prototype, "Config.AcCfg.TravelWithBeautyCfg");
        /**累充item */
        var TravelWithBeautyRecharageItem = (function (_super) {
            __extends(TravelWithBeautyRecharageItem, _super);
            function TravelWithBeautyRecharageItem() {
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
            return TravelWithBeautyRecharageItem;
        }(BaseItemCfg));
        AcCfg.TravelWithBeautyRecharageItem = TravelWithBeautyRecharageItem;
        __reflect(TravelWithBeautyRecharageItem.prototype, "Config.AcCfg.TravelWithBeautyRecharageItem");
        /**进度奖励item */
        var TravelWithBeautyAchievementItem = (function (_super) {
            __extends(TravelWithBeautyAchievementItem, _super);
            function TravelWithBeautyAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return TravelWithBeautyAchievementItem;
        }(BaseItemCfg));
        AcCfg.TravelWithBeautyAchievementItem = TravelWithBeautyAchievementItem;
        __reflect(TravelWithBeautyAchievementItem.prototype, "Config.AcCfg.TravelWithBeautyAchievementItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=TravelWithBeautyCfg.js.map