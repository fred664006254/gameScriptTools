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
        /**女优活动3 依依不舍 */
        var YiyibusheCfg = (function () {
            function YiyibusheCfg() {
                /**进度奖励 */
                this.achievementList = [];
                this.AVGDialog = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "5": { "nextId": null, "descId": 5, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                    },
                    6: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    },
                    7: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    },
                    8: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    },
                    9: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    },
                    10: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'wife_skin_2341', "nameId": "wifeName_234", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2341", "nameId": "wifeName_234", "clickContinue": true },
                    }
                };
            }
            /**
             * 初始化数据
             */
            YiyibusheCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achievementList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new YiyibusheAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i + 1);
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
            YiyibusheCfg.prototype.getAchievementList = function () {
                return this.achievementList;
            };
            YiyibusheCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return YiyibusheCfg;
        }());
        AcCfg.YiyibusheCfg = YiyibusheCfg;
        __reflect(YiyibusheCfg.prototype, "Config.AcCfg.YiyibusheCfg");
        /**进度奖励item */
        var YiyibusheAchievementItem = (function (_super) {
            __extends(YiyibusheAchievementItem, _super);
            function YiyibusheAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**所需进度 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return YiyibusheAchievementItem;
        }(BaseItemCfg));
        AcCfg.YiyibusheAchievementItem = YiyibusheAchievementItem;
        __reflect(YiyibusheAchievementItem.prototype, "Config.AcCfg.YiyibusheAchievementItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=YiyibusheCfg.js.map