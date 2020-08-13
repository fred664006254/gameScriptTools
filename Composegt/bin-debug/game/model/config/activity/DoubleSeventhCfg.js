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
        var DoubleSeventhCfg = (function () {
            function DoubleSeventhCfg() {
                /**
                 * --活动期间累计充值奖励
                 *  --needGem：所需额度：单位（元宝）
                    --getReward：奖励
                 */
                this.recharge = {};
                this.AVGDialog = {
                    buildId1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 3, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": "3", "descId": 4, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                        "3": { "nextId": null, "descId": 5, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 6, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": "3", "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                        "3": { "nextId": null, "descId": 8, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 9, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": null, "descId": 10, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 11, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": null, "descId": 12, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 13, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": null, "descId": 14, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 15, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": null, "descId": 16, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 17, "bgId": 6, "personPic": "wife_skin_1091", "nameId": "wifeName_109", "clickContinue": true, "resEndId": "109" },
                        "2": { "nextId": null, "descId": 18, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                    },
                };
                this.AVGDialog_code2 = {
                    buildId1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 6, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": null, "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 8, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 9, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 10, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 11, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 12, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 13, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 14, "bgId": 6, "personPic": "alliance_monster5", "nameId": "acDoubleSeventhMonsterNpc", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": null, "descId": 16, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 17, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 18, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": null, "descId": 19, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "skinName2131", "clickContinue": true, "resEndId": "213" },
                    },
                };
                this.AVGDialog_code3 = {
                    buildId1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                        "5": { "nextId": null, "descId": 5, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 6, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": null, "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 8, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": null, "descId": 9, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 10, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": "3", "descId": 11, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                        "3": { "nextId": null, "descId": 12, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 13, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": null, "descId": 14, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": null, "descId": 16, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 17, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": "3", "descId": 18, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                        "3": { "nextId": null, "descId": 19, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 20, "bgId": 6, "personPic": "wife_skin_2101", "nameId": "wifeName_210", "clickContinue": true, "resEndId": "210" },
                        "2": { "nextId": null, "descId": 21, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "210" },
                    },
                };
            }
            DoubleSeventhCfg.prototype.formatData = function (data) {
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    if (!this.recharge.hasOwnProperty((Number(key) + 1).toString())) {
                        this.recharge[Number(key) + 1] = new SevenRechargeItemCfg();
                    }
                    itemCfg = this.recharge[Number(key) + 1];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            DoubleSeventhCfg.prototype.getDialogByBuildId = function (id, code) {
                if (String(code) === "1") {
                    return this.AVGDialog["buildId" + id];
                }
                else {
                    return this["AVGDialog_code" + code]["buildId" + id];
                }
            };
            return DoubleSeventhCfg;
        }());
        AcCfg.DoubleSeventhCfg = DoubleSeventhCfg;
        __reflect(DoubleSeventhCfg.prototype, "Config.AcCfg.DoubleSeventhCfg");
        var SevenRechargeItemCfg = (function (_super) {
            __extends(SevenRechargeItemCfg, _super);
            function SevenRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SevenRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return SevenRechargeItemCfg;
        }(BaseItemCfg));
        __reflect(SevenRechargeItemCfg.prototype, "SevenRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
