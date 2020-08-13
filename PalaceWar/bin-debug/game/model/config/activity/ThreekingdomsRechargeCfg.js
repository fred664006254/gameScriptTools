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
         * 三国活动
         * author yangchengguo
         * date 2020.1.14
         * @namespace ThreekingdomsRechargeCfg
         */
        var ThreekingdomsRechargeCfg = (function () {
            function ThreekingdomsRechargeCfg() {
                this.achieveList = [];
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_20171', "nameId": "servantSkinName20171", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "skin_full_20171", "nameId": "servantSkinName20171", "clickContinue": true },
                    }
                };
                this.startDialog_3 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_20151', "nameId": "servantSkinName20151", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "skin_full_20151", "nameId": "servantSkinName20151", "clickContinue": true },
                    }
                };
                this.startDialog_5 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_20161', "nameId": "servantSkinName20161", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "skin_full_20161", "nameId": "servantSkinName20161", "clickContinue": true },
                    }
                };
                this.startDialog_7 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_20141', "nameId": "servantSkinName20141", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "skin_full_20141", "nameId": "servantSkinName20141", "clickContinue": true },
                    }
                };
                this.startDialog_9 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_20181', "nameId": "servantSkinName20181", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "skin_full_20181", "nameId": "servantSkinName20181", "clickContinue": true },
                    }
                };
            }
            ThreekingdomsRechargeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achieveList = [];
                        for (var k in data[key]) {
                            var itemCfg = new ThreekingdomsAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k) + 1);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "poolList") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            ThreekingdomsRechargeCfg.prototype.getAchieveData = function () {
                return this.achieveList;
            };
            ThreekingdomsRechargeCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return ThreekingdomsRechargeCfg;
        }());
        AcCfg.ThreekingdomsRechargeCfg = ThreekingdomsRechargeCfg;
        __reflect(ThreekingdomsRechargeCfg.prototype, "Config.AcCfg.ThreekingdomsRechargeCfg");
        /**进度奖励item */
        var ThreekingdomsAchievementItem = (function (_super) {
            __extends(ThreekingdomsAchievementItem, _super);
            function ThreekingdomsAchievementItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**充值id */
                _this.id = null;
                /**所需分数 */
                _this.specialnum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ThreekingdomsAchievementItem;
        }(BaseItemCfg));
        AcCfg.ThreekingdomsAchievementItem = ThreekingdomsAchievementItem;
        __reflect(ThreekingdomsAchievementItem.prototype, "Config.AcCfg.ThreekingdomsAchievementItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ThreekingdomsRechargeCfg.js.map