var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**情系良缘 */
        var GoodMatchCfg = /** @class */ (function () {
            function GoodMatchCfg() {
                this.extraTime = 0;
                this.show = 0;
                this.freeTime = 0;
                this.needGem = 0;
                this.achieveList = [];
                this.serverAchieveList = [];
                this.poolRewardsList = [];
                /**进度奖励对话 */
                this.rewardDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "servant_full_1001", "personBone": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "", "personBone": "", "nameId": "", "clickContinue": true }
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true }
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true }
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true }
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_full_250", "personBone": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true }
                    }
                };
                /**开始剧情对话 */
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "bgName": "story_bg6", "personPic": "", "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "bgName": "story_bg6", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "bgName": "story_bg6", "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "bgName": "story_bg6", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "5": { "nextId": "6", "descId": 5, "bgId": 6, "bgName": "acgoodmatch_bg-1", "personPic": "", "nameId": "", "clickContinue": true },
                        "6": { "nextId": "7", "descId": 6, "bgId": 6, "bgName": "acgoodmatch_bg-1", "personPic": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true },
                        "7": { "nextId": "8", "descId": 7, "bgId": 6, "bgName": "acgoodmatch_bg-1", "personPic": 1, "personBone": "storyNPCName1", "nameId": "", "clickContinue": true },
                        "8": { "nextId": null, "descId": 8, "bgId": 6, "bgName": "acgoodmatch_bg-1", "personPic": "wife_full_250", "nameId": "wifeName_250", "clickContinue": true }
                    }
                };
            }
            /**
             * 初始化数据
             */
            GoodMatchCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
                if (data.achievementOne) {
                    this.achieveList = [];
                    var cfgData = data.achievementOne;
                    for (var k in cfgData) {
                        var itemCfg = new GoodMatchAchieveItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.achieveList.push(itemCfg);
                    }
                }
                if (data.achievementAll) {
                    this.serverAchieveList = [];
                    var cfgData = data.achievementAll;
                    for (var k in cfgData) {
                        var itemCfg = new GoodMatchAchieveItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.serverAchieveList.push(itemCfg);
                    }
                }
                if (data.matchPool) {
                    this.poolRewardsList = [];
                    var cfgData = data.matchPool;
                    for (var k in cfgData) {
                        var itemCfg = new GoodMatchPoolItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        var str = "";
                        var pools = cfgData[k].poolItem;
                        for (var key in pools) {
                            str += pools[key][0] + "|";
                        }
                        itemCfg.getRewards = str.substring(0, str.length - 1);
                        this.poolRewardsList.push(itemCfg);
                    }
                }
            };
            /**
             * 进度列表
             */
            GoodMatchCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            /**
             * 全服进度列表
             */
            GoodMatchCfg.prototype.getServerAchieveList = function () {
                return this.serverAchieveList;
            };
            /**
             * 奖池
             */
            GoodMatchCfg.prototype.getPoolRewards = function () {
                return this.poolRewardsList;
            };
            return GoodMatchCfg;
        }());
        AcCfg.GoodMatchCfg = GoodMatchCfg;
        /**
         * 进度
         */
        var GoodMatchAchieveItemCfg = /** @class */ (function (_super) {
            __extends(GoodMatchAchieveItemCfg, _super);
            function GoodMatchAchieveItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.sortId = 0;
                _this.needNum = 0;
                _this.getReward = null;
                _this.needNum1 = 0;
                _this.needNum2 = 0;
                return _this;
            }
            return GoodMatchAchieveItemCfg;
        }(BaseItemCfg));
        AcCfg.GoodMatchAchieveItemCfg = GoodMatchAchieveItemCfg;
        /**
         * 奖池
         */
        var GoodMatchPoolItemCfg = /** @class */ (function (_super) {
            __extends(GoodMatchPoolItemCfg, _super);
            function GoodMatchPoolItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.poolItem = null;
                _this.getRewards = null;
                return _this;
            }
            return GoodMatchPoolItemCfg;
        }(BaseItemCfg));
        AcCfg.GoodMatchPoolItemCfg = GoodMatchPoolItemCfg;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GoodMatchCfg.js.map