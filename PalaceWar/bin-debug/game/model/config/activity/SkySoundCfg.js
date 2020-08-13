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
        var SkySoundCfg = (function () {
            function SkySoundCfg() {
                this.extraTime = 0;
                this.cost1 = 1;
                this.cost10 = 10;
                this.change = null;
                this.achieveList = [];
                this.exchangeList = [];
                this.poolRewards = null;
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgName": "", "bgId": 6, "personPic": 'servant_full_1001', personBone: "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgName": "", "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": "5", "descId": 4, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": "wife_full_246", personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "5": { "nextId": "6", "descId": 5, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "6": { "nextId": null, "descId": 6, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": "wife_full_246", personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true }
                    }
                };
                //进度剧情
                this.achDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true }
                    },
                    2: {
                        "1": { "nextId": "2", "descId": 1, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true }
                    },
                    3: {
                        "1": { "nextId": "2", "descId": 1, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true }
                    },
                    4: {
                        "1": { "nextId": "2", "descId": 1, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgName": "", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgName": "", "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgName": "", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true }
                    },
                    5: {
                        "1": { "nextId": "2", "descId": 1, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgName": "", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgName": "", "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgName": "", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true }
                    },
                    6: {
                        "1": { "nextId": "2", "descId": 1, "bgName": "acskysound_bg-1", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgName": "", "bgId": 6, "personPic": 'wife_full_246', personBone: "wife_full_246", "nameId": "wifeName_246", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": 1, "nameId": 'storyNPCName1', "clickContinue": true }
                    },
                };
            }
            SkySoundCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "soundNum") {
                        for (var k in data[key]) {
                            var item = new SkySoundAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "soundPool1") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                    else if (key == "exchange") {
                        for (var k in data[key]) {
                            var item = new SkySoundExchangeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.exchangeList.push(item);
                        }
                    }
                }
            };
            SkySoundCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            SkySoundCfg.prototype.getExchangeList = function () {
                return this.exchangeList;
            };
            SkySoundCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return SkySoundCfg;
        }());
        AcCfg.SkySoundCfg = SkySoundCfg;
        __reflect(SkySoundCfg.prototype, "Config.AcCfg.SkySoundCfg");
        var SkySoundAchieveItem = (function (_super) {
            __extends(SkySoundAchieveItem, _super);
            function SkySoundAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needNum = 0;
                _this.sortId = 0;
                return _this;
            }
            return SkySoundAchieveItem;
        }(BaseItemCfg));
        AcCfg.SkySoundAchieveItem = SkySoundAchieveItem;
        __reflect(SkySoundAchieveItem.prototype, "Config.AcCfg.SkySoundAchieveItem");
        var SkySoundExchangeItem = (function (_super) {
            __extends(SkySoundExchangeItem, _super);
            function SkySoundExchangeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.limit = 0;
                _this.sortId = 0;
                return _this;
            }
            return SkySoundExchangeItem;
        }(BaseItemCfg));
        AcCfg.SkySoundExchangeItem = SkySoundExchangeItem;
        __reflect(SkySoundExchangeItem.prototype, "Config.AcCfg.SkySoundExchangeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SkySoundCfg.js.map