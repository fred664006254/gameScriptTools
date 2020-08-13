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
        var AskGodCfg = /** @class */ (function () {
            function AskGodCfg() {
                this.extraTime = 0;
                this.specialLimit = 0;
                this.cost = 0;
                this.needTime = 0;
                this.basePool = null;
                this.getReward = null;
                this.special = null;
                this.achieveList = [];
                this.shops = [];
                this.poolRewards = null;
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'storyNPCName1', "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 'skin_full_10631', personBone: "servant_full2_10631", "nameId": "servant_name1001", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "wife_skin_2371", personBone: "wife_full3_2371", "nameId": "wifeName_246", "clickContinue": true },
                        "5": { "nextId": "6", "descId": 5, "bgId": 6, "personPic": "storyNPCName1", "clickContinue": true },
                        "6": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "wife_skin_2371", personBone: "wife_full3_2371", "nameId": "wifeName_246", "clickContinue": true }
                    }
                };
            }
            AskGodCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "nightNum") {
                        for (var k in data[key]) {
                            var item = new AskGodAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "shop") {
                        for (var k in data[key]) {
                            var item = new AskGodShopItem();
                            item.initData(data[key][k]);
                            var type = item.getReward.split("_")[0];
                            if (type == "16") {
                                if (!Api.switchVoApi.checkIsSkinState(item.getReward.split("_")[1])) {
                                    continue;
                                }
                            }
                            else {
                                if (type == "6") {
                                    var itemCfg = Config.ItemCfg.getItemCfgById(item.getReward.split("_")[1]);
                                    if (itemCfg && itemCfg.getRewards && itemCfg.getRewards.split("_")[0] == "19") {
                                        if (!Api.switchVoApi.checkIsServantSkinState(itemCfg.getRewards.split("_")[1])) {
                                            continue;
                                        }
                                    }
                                }
                                if (type == "11") {
                                    if (!Api.switchVoApi.checkIsTitleState(item.getReward.split("_")[1])) {
                                        continue;
                                    }
                                }
                            }
                            item.id = Number(k) + 1;
                            this.shops.push(item);
                        }
                    }
                    else if (key == "basePool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            AskGodCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            AskGodCfg.prototype.getShopList = function () {
                return this.shops;
            };
            AskGodCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            Object.defineProperty(AskGodCfg.prototype, "cost10", {
                get: function () {
                    return Math.floor(this.cost * 10 * this.discount);
                },
                enumerable: true,
                configurable: true
            });
            return AskGodCfg;
        }());
        AcCfg.AskGodCfg = AskGodCfg;
        var AskGodAchieveItem = /** @class */ (function (_super) {
            __extends(AskGodAchieveItem, _super);
            function AskGodAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needNum = 0;
                _this.sortId = 0;
                return _this;
            }
            return AskGodAchieveItem;
        }(BaseItemCfg));
        AcCfg.AskGodAchieveItem = AskGodAchieveItem;
        var AskGodShopItem = /** @class */ (function (_super) {
            __extends(AskGodShopItem, _super);
            function AskGodShopItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needItem = "";
                _this.needNum = 0;
                _this.limitTime = 0;
                _this.discount = 0;
                _this.getReward = "";
                return _this;
            }
            return AskGodShopItem;
        }(BaseItemCfg));
        AcCfg.AskGodShopItem = AskGodShopItem;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AskGodCfg.js.map