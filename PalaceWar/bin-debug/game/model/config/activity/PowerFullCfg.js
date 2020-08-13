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
        /**四大奸臣 魏忠贤衣装 权倾朝野*/
        var PowerFullCfg = /** @class */ (function () {
            function PowerFullCfg() {
                this.extraTime = 0;
                this.show = 0;
                this.freeTime = 0;
                this.needGem = 0;
                this.condition1 = {};
                this.getReward = null;
                this.shopList = [];
                this.achieveList = [];
                this.poolRewards = null;
                /**进度奖励对话 */
                this.rewardDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "2": { "nextId": null, "descId": 2, "bgId": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true }
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true },
                        "2": { "nextId": null, "descId": 2, "bgId": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true }
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true },
                        "2": { "nextId": null, "descId": 2, "bgId": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true }
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true },
                        "2": { "nextId": null, "descId": 2, "bgId": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true }
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgId": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true },
                        "2": { "nextId": null, "descId": 2, "bgId": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true }
                    }
                };
                /**开始剧情对话 */
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "bgName": "story_bg6", "personPic": "", "nameId": "", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "bgName": "story_bg6", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "bgName": "story_bg6", "personPic": "story_npc_7", "nameId": "storyNPCName10", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "bgName": "story_bg6", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "5": { "nextId": "6", "descId": 5, "bgId": 6, "bgName": "story_bg6", "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true },
                        "6": { "nextId": "7", "descId": 6, "bgId": 6, "bgName": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "7": { "nextId": "8", "descId": 7, "bgId": 6, "bgName": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true },
                        "8": { "nextId": "9", "descId": 8, "bgId": 6, "bgName": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "9": { "nextId": "10", "descId": 9, "bgId": 6, "bgName": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true },
                        "10": { "nextId": "11", "descId": 10, "bgId": 6, "bgName": "acpowerfull_bg-1", "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "11": { "nextId": null, "descId": 11, "bgId": 6, "bgName": "acpowerfull_bg-1", "personPic": "skin_full_20043", "personBone": "servant_full2_20043", "nameId": "servant_name2004", "clickContinue": true }
                    }
                };
                /**兑换对话 */
                this.exchangeDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "bgName": "", "personPic": "story_npc_7", "nameId": "storyNPCName39", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "servant_full_2004", "nameId": "servant_name2004", "clickContinue": true }
                    }
                };
            }
            /**
             * 初始化数据
             */
            PowerFullCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
                if (data.nightNum) {
                    this.achieveList = [];
                    var cfgData = data.nightNum;
                    for (var k in cfgData) {
                        var itemCfg = new PowerFullAchieveItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.achieveList.push(itemCfg);
                    }
                }
                if (data.shop) {
                    this.shopList = [];
                    var cfgData = data.shop;
                    for (var k in cfgData) {
                        var itemCfg = new PowerFullShopItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.shopList.push(itemCfg);
                    }
                }
                if (data.basePool) {
                    var str = "";
                    for (var k in data.basePool) {
                        str += data.basePool[k][0] + "|";
                    }
                    this.poolRewards = str.substring(0, str.length - 1);
                }
            };
            /**
             * 进度列表
             */
            PowerFullCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            /**
             * 奖池
             */
            PowerFullCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            /**
             * 商店
             */
            PowerFullCfg.prototype.getShopItemList = function () {
                return this.shopList;
            };
            return PowerFullCfg;
        }());
        AcCfg.PowerFullCfg = PowerFullCfg;
        /**
         * 进度
         */
        var PowerFullAchieveItemCfg = /** @class */ (function (_super) {
            __extends(PowerFullAchieveItemCfg, _super);
            function PowerFullAchieveItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.sortId = 0;
                _this.needNum = 0;
                _this.getReward = null;
                return _this;
            }
            return PowerFullAchieveItemCfg;
        }(BaseItemCfg));
        AcCfg.PowerFullAchieveItemCfg = PowerFullAchieveItemCfg;
        /**
         * 商店
         */
        var PowerFullShopItemCfg = /** @class */ (function (_super) {
            __extends(PowerFullShopItemCfg, _super);
            function PowerFullShopItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.costMoney = 0;
                _this.discount = 0;
                _this.getReward = null;
                return _this;
            }
            return PowerFullShopItemCfg;
        }(BaseItemCfg));
        AcCfg.PowerFullShopItemCfg = PowerFullShopItemCfg;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=PowerFullCfg.js.map