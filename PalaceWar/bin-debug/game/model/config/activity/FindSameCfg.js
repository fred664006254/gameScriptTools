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
        var FindSameCfg = (function () {
            function FindSameCfg() {
                this.rechargeList = [];
                this.achievementList = [];
                this.taskList = [];
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personBone": "servant_full2_10492", "personPic": 'skin_full_10492', "nameId": "servant_name1049", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personBone": "wife_full3_2162", "personPic": 'wife_skin_2162', "nameId": "wifeName_216", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personBone": "servant_full2_10492", "personPic": "skin_full_10492", "nameId": "servant_name1049", "clickContinue": true },
                    }
                };
                this.startDialog_2 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personBone": "servant_full2_10492", "personPic": 'skin_full_10492', "nameId": "servant_name1049", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personBone": "wife_full3_2162", "personPic": 'wife_skin_2162', "nameId": "wifeName_216", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personBone": "servant_full2_10492", "personPic": "skin_full_10492", "nameId": "servant_name1049", "clickContinue": true },
                    }
                };
                this.AVGDialog = {
                    "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "linkgame_npc", "nameId": "Linkgame_npc_name", "clickContinue": true, "resEndId": "109" },
                    "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "linkgame_npc", "nameId": "Linkgame_npc_name", "clickContinue": true, "resEndId": "109" },
                    "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "109" },
                };
            }
            FindSameCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                    if (key == "recharge") {
                        this.rechargeList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new FindSameRecharageItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement") {
                        this.achievementList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new FindSameAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "pumpkinPool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                    else if (key == "chessTask") {
                        this.taskList = [];
                        var count = 1;
                        for (var i = 0; i < data[key].length; i++) {
                            for (var item in data[key][i]) {
                                var itemCfg = new FindSameTaskItem();
                                itemCfg.initData(data[key][i][item]);
                                itemCfg.id = String(count);
                                itemCfg.fid = String(i + 1);
                                itemCfg.sid = item;
                                this.taskList.push(itemCfg);
                                count++;
                            }
                        }
                    }
                }
            };
            Object.defineProperty(FindSameCfg.prototype, "GRID_WIDTH", {
                /** 网格数宽度 */
                get: function () {
                    return this.maxX + 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FindSameCfg.prototype, "GRID_HEIGHT", {
                /** 网格数高度 */
                get: function () {
                    return this.maxY + 2;
                },
                enumerable: true,
                configurable: true
            });
            FindSameCfg.prototype.getDialogByBuildId = function () {
                return this.AVGDialog;
            };
            FindSameCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            FindSameCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            FindSameCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            FindSameCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            return FindSameCfg;
        }());
        AcCfg.FindSameCfg = FindSameCfg;
        __reflect(FindSameCfg.prototype, "Config.AcCfg.FindSameCfg");
        /**累充item */
        var FindSameRecharageItem = (function (_super) {
            __extends(FindSameRecharageItem, _super);
            function FindSameRecharageItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**充值金额 */
                _this.needGem = 0;
                /**充值奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return FindSameRecharageItem;
        }(BaseItemCfg));
        AcCfg.FindSameRecharageItem = FindSameRecharageItem;
        __reflect(FindSameRecharageItem.prototype, "Config.AcCfg.FindSameRecharageItem");
        /**进度奖励item */
        var FindSameAchievementItem = (function (_super) {
            __extends(FindSameAchievementItem, _super);
            function FindSameAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return FindSameAchievementItem;
        }(BaseItemCfg));
        AcCfg.FindSameAchievementItem = FindSameAchievementItem;
        __reflect(FindSameAchievementItem.prototype, "Config.AcCfg.FindSameAchievementItem");
        /**活动任务item */
        var FindSameTaskItem = (function (_super) {
            __extends(FindSameTaskItem, _super);
            function FindSameTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**任务类型*/
                _this.questType = 0;
                /**跳转类型 */
                _this.openType = null;
                /**进度 */
                _this.value = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return FindSameTaskItem;
        }(BaseItemCfg));
        AcCfg.FindSameTaskItem = FindSameTaskItem;
        __reflect(FindSameTaskItem.prototype, "Config.AcCfg.FindSameTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=FindSameCfg.js.map