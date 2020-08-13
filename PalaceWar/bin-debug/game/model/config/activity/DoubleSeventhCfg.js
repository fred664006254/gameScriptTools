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
                this.exchange = {};
                /**
                 * 兑换商店
                 */
                this.shop = {};
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
                        "1": { "nextId": "2", "descId": 5, "bgId": 6, "personPic": "wife_skin_3032", "nameId": "wifeName_303", "clickContinue": true, "resEndId": "213" },
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
                this.AVGDialog_code4 = {
                    buildId1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 3, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 5, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 8, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 9, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 10, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 11, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 12, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 13, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 14, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 16, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": "4", "descId": 17, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "4": { "nextId": null, "descId": 18, "bgId": 6, "personPic": "skin_full_10332", "nameId": "servant_name1033", "clickContinue": true, "resEndId": "213" },
                    },
                };
                this.AVGDialog_code5 = {
                    buildId1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": "servant_full_1030", "nameId": "servant_name1030", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId2: {
                        "1": { "nextId": "2", "descId": 3, "bgId": 6, "personPic": "servant_full_1029", "nameId": "servant_name1029", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId3: {
                        "1": { "nextId": "2", "descId": 5, "bgId": 6, "personPic": "wife_full_208", "nameId": "wifeName_208", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId4: {
                        "1": { "nextId": "2", "descId": 7, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 8, "bgId": 6, "personPic": "searchnpc_full81", "nameId": "searchPersonName71", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId5: {
                        "1": { "nextId": "2", "descId": 9, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 10, "bgId": 6, "personPic": "wife_full_102", "nameId": "wifeName_102", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId6: {
                        "1": { "nextId": "2", "descId": 11, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 12, "bgId": 6, "personPic": "searchnpc_full71", "nameId": "searchPersonName81", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId7: {
                        "1": { "nextId": "2", "descId": 13, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": null, "descId": 14, "bgId": 6, "personPic": "searchnpc_full41", "nameId": "searchPersonName41", "clickContinue": true, "resEndId": "213" },
                    },
                    buildId8: {
                        "1": { "nextId": "2", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "2": { "nextId": "3", "descId": 16, "bgId": 6, "personPic": "wife_full_302", "nameId": "wifeName_302", "clickContinue": true, "resEndId": "213" },
                        "3": { "nextId": "4", "descId": 17, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "213" },
                        "4": { "nextId": null, "descId": 18, "bgId": 6, "personPic": "wife_full_302", "nameId": "wifeName_302", "clickContinue": true, "resEndId": "213" },
                    },
                };
            }
            //商店兑换
            DoubleSeventhCfg.prototype.getShopArr = function () {
                var arr = [];
                for (var i in this.shop) {
                    var unit = this.shop[i];
                    if (unit.getReward == "6_1740_1") {
                        if (Api.switchVoApi.checkOpenServantLevel450()) {
                            arr.push(unit);
                        }
                    }
                    else {
                        arr.push(unit);
                    }
                }
                return arr;
            };
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
                this.exchange = data.exchange;
                for (var key in data.shop) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.shop[id]) {
                        this.shop[id] = new SevenShopCfg();
                    }
                    itemCfg = this.shop[id];
                    itemCfg.initData(data.shop[key]);
                    itemCfg.id = id;
                }
            };
            DoubleSeventhCfg.prototype.getSkin = function (code) {
                var skinid = '';
                switch (Number(code)) {
                    case 1:
                        skinid = "1091";
                        break;
                    case 2:
                        skinid = "2131";
                        break;
                    case 3:
                        skinid = "3032";
                        break;
                    case 4:
                        skinid = "10332";
                        break;
                }
                return skinid;
            };
            DoubleSeventhCfg.prototype.getDialogByBuildId = function (id, code) {
                if (String(code) === "1") {
                    return this.AVGDialog["buildId" + id];
                }
                else {
                    return this["AVGDialog_code" + code]["buildId" + id];
                }
            };
            DoubleSeventhCfg.prototype.getExchangeSceneId = function () {
                if (!this.exchange || !this.exchange.getReward) {
                    return null;
                }
                var scenestr = this.exchange.getReward;
                return scenestr.split("_")[1];
            };
            DoubleSeventhCfg.prototype.getExchangeNeedItemId = function () {
                if (!this.exchange || !this.exchange.needPart) {
                    return null;
                }
                var scenestr = this.exchange.needPart;
                return scenestr.split("_")[1];
            };
            DoubleSeventhCfg.prototype.getExchangeNeedItemNum = function () {
                if (!this.exchange || !this.exchange.needPart) {
                    return null;
                }
                var scenestr = this.exchange.needPart;
                var numstr = scenestr.split("_")[2];
                return Number(numstr);
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
        var SevenShopCfg = (function (_super) {
            __extends(SevenShopCfg, _super);
            function SevenShopCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(SevenShopCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false)[0];
                },
                enumerable: true,
                configurable: true
            });
            return SevenShopCfg;
        }(BaseItemCfg));
        AcCfg.SevenShopCfg = SevenShopCfg;
        __reflect(SevenShopCfg.prototype, "Config.AcCfg.SevenShopCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DoubleSeventhCfg.js.map