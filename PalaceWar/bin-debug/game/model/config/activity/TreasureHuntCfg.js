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
        var TreasureHuntCfg = (function () {
            function TreasureHuntCfg() {
                /**
                 * 展示时间
                 * */
                this.extraTime = 1;
                /**
                 * 地图奖励
                 * */
                this.map = {};
                /**
                 * 特殊格子奖池
                 * */
                this.specialPoint = {};
                /**
                 * --活动期间累计充值奖励
                 *  --needGem：所需额度：单位（元宝）
                    --getReward：奖励
                 */
                this.recharge = {};
                /**
                 *财神生效次数
                */
                this.wealthGodTimes = 0;
                /**
                 *财神附加奖励
                */
                this.wealthGod = [];
                /**
                 *圈数奖励
                */
                this.circleReward = {};
                /*
                *每日任务
                */
                this.dailyTask = {};
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
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 6, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": null, "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 8, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 9, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 10, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 11, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 12, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 13, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 14, "bgId": 6, "personPic": "nanguajiangshi", "nameId": "acDoubleSeventhMonsterNpc", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": null, "descId": 16, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 17, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 18, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": null, "descId": 19, "bgId": 6, "personPic": "wife_skin_2131", "nameId": "wifeName_213", "clickContinue": true, "resEndId": "213" },
                    },
                };
                this.AVGDialog_code3 = {
                    buildId1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 3, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 5, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 8, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 9, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 10, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 11, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 12, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 13, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 14, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 16, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": "4", "descId": 17, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "4": { "nextId": null, "descId": 18, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
                    },
                };
            }
            TreasureHuntCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.wealthGodTimes = data.wealthGodTimes;
                this.wealthGod = data.wealthGod;
                this.dailyTask = data.dailyTask;
                for (var key in data.map) {
                    var itemCfg = void 0;
                    var index = Number(key) + 1;
                    if (!this.map.hasOwnProperty(index.toString())) {
                        this.map[index] = new TreasureMapItemCfg();
                    }
                    itemCfg = this.map[index];
                    itemCfg.initData(data.map[key]);
                    itemCfg.id = index;
                }
                for (var key in data.specialPoint) {
                    var itemCfg = void 0;
                    var index = Number(key) + 1;
                    if (!this.specialPoint.hasOwnProperty(index.toString())) {
                        this.specialPoint[index] = new TreasureSpecialItemCfg();
                    }
                    itemCfg = this.specialPoint[index];
                    itemCfg.arr = data.specialPoint[key];
                    itemCfg.id = index;
                }
                for (var key in data.circleReward) {
                    var itemCfg = void 0;
                    var index = Number(key) + 1;
                    if (!this.circleReward.hasOwnProperty(index.toString())) {
                        this.circleReward[index] = new TreasureCircleItemCfg();
                    }
                    itemCfg = this.circleReward[index];
                    itemCfg.initData(data.circleReward[key]);
                    itemCfg.id = index;
                }
            };
            TreasureHuntCfg.prototype.getDialogByBuildId = function (id, code) {
                if (String(code) === "1") {
                    return this.AVGDialog["buildId" + id];
                }
                else {
                    return this["AVGDialog_code" + code]["buildId" + id];
                }
            };
            //任务或者奖励 2 任务  1奖励
            TreasureHuntCfg.prototype.getTaskorReward = function (showNum, day) {
                if (showNum === void 0) { showNum = 0; }
                if (day === void 0) { day = 1; }
                var arr = [];
                var dailyTask = this.dailyTask[day];
                for (var key in dailyTask) {
                    if (dailyTask[key].show == showNum) {
                        dailyTask[key].name = key;
                        arr.push(dailyTask[key]);
                    }
                }
                arr.sort(function (a, b) {
                    if (a.sortId > b.sortId)
                        return 1;
                    else if (a.sortId == b.sortId)
                        return 0;
                    return -1;
                });
                return arr;
            };
            return TreasureHuntCfg;
        }());
        AcCfg.TreasureHuntCfg = TreasureHuntCfg;
        __reflect(TreasureHuntCfg.prototype, "Config.AcCfg.TreasureHuntCfg");
        var TreasureMapItemCfg = (function (_super) {
            __extends(TreasureMapItemCfg, _super);
            function TreasureMapItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreasureMapItemCfg;
        }(BaseItemCfg));
        __reflect(TreasureMapItemCfg.prototype, "TreasureMapItemCfg");
        var TreasureSpecialItemCfg = (function (_super) {
            __extends(TreasureSpecialItemCfg, _super);
            function TreasureSpecialItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreasureSpecialItemCfg;
        }(BaseItemCfg));
        __reflect(TreasureSpecialItemCfg.prototype, "TreasureSpecialItemCfg");
        var TreasureCircleItemCfg = (function (_super) {
            __extends(TreasureCircleItemCfg, _super);
            function TreasureCircleItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreasureCircleItemCfg;
        }(BaseItemCfg));
        AcCfg.TreasureCircleItemCfg = TreasureCircleItemCfg;
        __reflect(TreasureCircleItemCfg.prototype, "Config.AcCfg.TreasureCircleItemCfg");
        //任务奖励
        var TreasureRewardItemCfg = (function (_super) {
            __extends(TreasureRewardItemCfg, _super);
            function TreasureRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TreasureRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.TreasureRewardItemCfg = TreasureRewardItemCfg;
        __reflect(TreasureRewardItemCfg.prototype, "Config.AcCfg.TreasureRewardItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=TreasureHuntCfg.js.map