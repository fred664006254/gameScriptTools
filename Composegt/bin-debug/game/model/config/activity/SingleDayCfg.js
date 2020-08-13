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
        var SingleDayCfg = (function () {
            function SingleDayCfg() {
                /**
                 * --活动期间累计充值奖励
                 *      --needGem：所需额度：单位（元宝）
                        --getReward：奖励
                 */
                this.recharge = {};
                /**
                 *  --活动期间累计消费元宝奖励(产红包)
                        --needGem：所需额度：单位（元宝）
                        --getReward：奖励
                 */
                this.useGem = {};
                /**
                 * --服装店道具列表(皮肤和称号),展示金额为price * rebate
                    --itemID：道具
                    --price：原价格
                    --rebate：折扣
                    --limit：限购数量
                 */
                this.skinList = {};
                /**
                 *   --活动期间累计消费元宝排行奖励(产皮肤)
                        --rank：排名
                        --getReward：奖励
                 */
                this.gemRank = {};
                /**
                 *--奇珍异宝,展示金额为price * rebate
                    --itemID：道具
                    --price：原价价格
                    --rebate：折扣
                    --limit：限购数量
                 */
                this.itemsList = {};
                /**
                 * 代金券配置
                */
                this.coupon = {};
                this.AVGDialog = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [] },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [] },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [] },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [] },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_1011", "nameId": "wifeName_101", "clickContinue": true, "param": [this.startTime / 3600 + ":00", this.endTime / 3600 + ":00"] },
                    }
                };
            }
            SingleDayCfg.prototype.formatData = function (data) {
                this.startTime = data.startTime;
                this.endTime = data.endTime;
                this.luckyPacketCD = data.luckyPacketCD;
                this.rankNeed = data.rankNeed;
                this.luckyPacketPurchase = data.luckyPacketPurchase;
                this.couponLimit = data.couponLimit;
                this.pocketLimit = data.pocketLimit;
                this.deductionLimit = data.deductionLimit;
                for (var key in data.coupon) {
                    var itemCfg = void 0;
                    if (!this.coupon.hasOwnProperty(String(key))) {
                        this.coupon[String(key)] = new SDCouponItemCfg();
                    }
                    itemCfg = this.coupon[String(key)];
                    itemCfg.initData(data.coupon[key]);
                    itemCfg.id = Number(key);
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    if (!this.recharge.hasOwnProperty(String(key))) {
                        this.recharge[String(key)] = new SDRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = Number(key);
                }
                for (var key in data.useGem) {
                    var itemCfg = void 0;
                    if (!this.useGem.hasOwnProperty(String(key))) {
                        this.useGem[String(key)] = new SDUseGemItemCfg();
                    }
                    itemCfg = this.useGem[String(key)];
                    itemCfg.initData(data.useGem[key]);
                    itemCfg.id = Number(key);
                }
                for (var key in data.gemRank) {
                    var itemCfg = void 0;
                    if (!this.gemRank.hasOwnProperty(String(key))) {
                        this.gemRank[String(key)] = new SDGemRankItemCfg();
                    }
                    itemCfg = this.gemRank[String(key)];
                    itemCfg.initData(data.gemRank[key]);
                    // itemCfg.getReward += (`|20_0001_${data.task[key].zongziGet}`);
                    itemCfg.id = Number(key);
                }
                for (var key in data.skinList) {
                    var tmpdata = data.skinList[key];
                    var rvo = GameData.formatRewardItem(tmpdata.itemID)[0];
                    //过滤没有开启的皮肤
                    if (rvo.type == 16 && !Config.WifeskinCfg.isSkinOPend("" + rvo.id)) {
                        continue;
                    }
                    if (rvo.type == 11 && !Config.TitleCfg.isTitleOPend("" + rvo.id)) {
                        continue;
                    }
                    var itemCfg = void 0;
                    if (!this.skinList.hasOwnProperty(String(key))) {
                        this.skinList[String(key)] = new SDSkinListItemCfg();
                    }
                    itemCfg = this.skinList[String(key)];
                    itemCfg.initData(data.skinList[key]);
                    itemCfg.id = Number(key);
                }
                for (var key in data.itemsList) {
                    var itemCfg = void 0;
                    if (!this.itemsList.hasOwnProperty(String(key))) {
                        this.itemsList[String(key)] = new SDItemsListItemCfg();
                    }
                    itemCfg = this.itemsList[String(key)];
                    itemCfg.initData(data.itemsList[key]);
                    itemCfg.id = Number(key);
                }
            };
            return SingleDayCfg;
        }());
        AcCfg.SingleDayCfg = SingleDayCfg;
        __reflect(SingleDayCfg.prototype, "Config.AcCfg.SingleDayCfg");
        var SDCouponItemCfg = (function (_super) {
            __extends(SDCouponItemCfg, _super);
            function SDCouponItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SDCouponItemCfg;
        }(BaseItemCfg));
        __reflect(SDCouponItemCfg.prototype, "SDCouponItemCfg");
        var SDRechargeItemCfg = (function (_super) {
            __extends(SDRechargeItemCfg, _super);
            function SDRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SDRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return SDRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.SDRechargeItemCfg = SDRechargeItemCfg;
        __reflect(SDRechargeItemCfg.prototype, "Config.AcCfg.SDRechargeItemCfg");
        var SDUseGemItemCfg = (function (_super) {
            __extends(SDUseGemItemCfg, _super);
            function SDUseGemItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SDUseGemItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return SDUseGemItemCfg;
        }(BaseItemCfg));
        AcCfg.SDUseGemItemCfg = SDUseGemItemCfg;
        __reflect(SDUseGemItemCfg.prototype, "Config.AcCfg.SDUseGemItemCfg");
        var SDGemRankItemCfg = (function (_super) {
            __extends(SDGemRankItemCfg, _super);
            function SDGemRankItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SDGemRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SDGemRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SDGemRankItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, true);
                },
                enumerable: true,
                configurable: true
            });
            return SDGemRankItemCfg;
        }(BaseItemCfg));
        __reflect(SDGemRankItemCfg.prototype, "SDGemRankItemCfg");
        var SDSkinListItemCfg = (function (_super) {
            __extends(SDSkinListItemCfg, _super);
            function SDSkinListItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SDSkinListItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.itemID, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return SDSkinListItemCfg;
        }(BaseItemCfg));
        __reflect(SDSkinListItemCfg.prototype, "SDSkinListItemCfg");
        var SDItemsListItemCfg = (function (_super) {
            __extends(SDItemsListItemCfg, _super);
            function SDItemsListItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SDItemsListItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.itemID, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return SDItemsListItemCfg;
        }(BaseItemCfg));
        AcCfg.SDItemsListItemCfg = SDItemsListItemCfg;
        __reflect(SDItemsListItemCfg.prototype, "Config.AcCfg.SDItemsListItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
