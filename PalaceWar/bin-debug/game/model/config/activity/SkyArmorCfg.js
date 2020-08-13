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
        var SkyArmorCfg = /** @class */ (function () {
            function SkyArmorCfg() {
                this.extraTime = 0;
                this.specialLimit = 0;
                this.cost1 = 1;
                this.cost10 = 10;
                this.change = null;
                this.needTime = 0;
                this.achieveList = [];
                this.rankItemList = [];
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
            SkyArmorCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "soundNum") {
                        for (var k in data[key]) {
                            var item = new SkyArmorAchieveItem();
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
                    else if (key == "rankReward") {
                        this.rankItemList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new SkyArmorRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankItemList.push(itemCfg);
                        }
                    }
                }
            };
            SkyArmorCfg.prototype.getAchieveList = function () {
                return this.achieveList;
            };
            SkyArmorCfg.prototype.getRankItemCfg = function () {
                return this.rankItemList;
            };
            SkyArmorCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return SkyArmorCfg;
        }());
        AcCfg.SkyArmorCfg = SkyArmorCfg;
        var SkyArmorAchieveItem = /** @class */ (function (_super) {
            __extends(SkyArmorAchieveItem, _super);
            function SkyArmorAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needNum = 0;
                _this.sortId = 0;
                return _this;
            }
            return SkyArmorAchieveItem;
        }(BaseItemCfg));
        AcCfg.SkyArmorAchieveItem = SkyArmorAchieveItem;
        /**
         * 排名奖励
         */
        var SkyArmorRankItemCfg = /** @class */ (function (_super) {
            __extends(SkyArmorRankItemCfg, _super);
            function SkyArmorRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            Object.defineProperty(SkyArmorRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.rank[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SkyArmorRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.rank[1];
                },
                enumerable: true,
                configurable: true
            });
            return SkyArmorRankItemCfg;
        }(BaseItemCfg));
        AcCfg.SkyArmorRankItemCfg = SkyArmorRankItemCfg;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SkyArmorCfg.js.map