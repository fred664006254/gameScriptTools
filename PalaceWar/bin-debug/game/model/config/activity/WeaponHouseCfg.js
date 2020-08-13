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
         * 神兵宝库
         * author yangtao
         * date 2020.6.10
         * @class WeaponHouseCfg
         */
        var WeaponHouseCfg = (function () {
            function WeaponHouseCfg() {
                this.scheduleOne = {};
                this.scheduleAll = {};
                this.addScoreList = []; //积分规则
                this.rechargeList = []; //充值奖励
                this.rechargeOneList = []; //个人奖励
                this.rechargeAllList = []; //全服奖励
                this.rankOneItemList = []; //个人排行榜
                this.rankAllItemList = []; //帮会排行榜
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'searchnpc_full92', personBone: "searchnpc_full92", "nameId": "storyNPCName39", "clickContinue": true },
                        "2": { "nextId": null, "descId": 2, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                    }
                };
            }
            WeaponHouseCfg.prototype.formatData = function (data) {
                this.scheduleOne = data.scheduleOne;
                this.scheduleAll = data.scheduleAll;
                this.getTime = data.getTime;
                this.costMoney = data.costMoney;
                this.refreshRatio = data.refreshRatio;
                this.limitScore = data.limitScore;
                this.costTime = data.costTime;
                this.baseScore = data.baseScore;
                this.addTime = data.addTime;
                this.baseTime = data.baseTime;
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "addScore") {
                        this.addScoreList = [];
                        for (var k in data[key]) {
                            var itemCfg = new AddScoreListItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            itemCfg.weaponLv = data[key][k].weaponLv;
                            itemCfg.lvScore = data[key][k].lvScore;
                            this.addScoreList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge") {
                        this.rechargeList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new RechargeListItem();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "scheduleOne") {
                        this.rechargeOneList = [];
                        for (var k in data[key]) {
                            var element = data[key];
                            if (k == "1") {
                                var recharge1ItemList = [];
                                for (var j in element[k]) {
                                    var itemCfg = new ScheduleOne1Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge1ItemList.push(itemCfg);
                                }
                                recharge1ItemList["stageId"] = Number(k) + 1;
                                this.rechargeOneList.push(recharge1ItemList);
                            }
                            else {
                                var recharge2ItemList = [];
                                for (var j in element[k]) {
                                    var itemCfg = new ScheduleOne2Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge2ItemList.push(itemCfg);
                                }
                                recharge2ItemList["stageId"] = Number(k) + 1;
                                this.rechargeOneList.push(recharge2ItemList);
                            }
                        }
                    }
                    else if (key == "scheduleAll") {
                        this.rechargeAllList = [];
                        for (var k in data[key]) {
                            var element = data[key];
                            if (k == "1") {
                                var recharge1ItemList = [];
                                for (var j in element[k]) {
                                    var itemCfg = new ScheduleOne1Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge1ItemList.push(itemCfg);
                                }
                                recharge1ItemList["stageId"] = Number(k) + 1;
                                this.rechargeAllList.push(recharge1ItemList);
                            }
                            else {
                                var recharge2ItemList = [];
                                for (var j in element[k]) {
                                    this.rechargeOneList.push(recharge2ItemList);
                                    var itemCfg = new ScheduleOne2Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge2ItemList.push(itemCfg);
                                }
                                recharge2ItemList["stageId"] = Number(k) + 1;
                                this.rechargeAllList.push(recharge2ItemList);
                            }
                        }
                    }
                    else if (key == "rankOne") {
                        this.rankOneItemList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new WeaponRankOneItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankOneItemList.push(itemCfg);
                        }
                    }
                    else if (key == "rankAll") {
                        this.rankAllItemList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new WeaponRankAllItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankAllItemList.push(itemCfg);
                        }
                    }
                }
            };
            WeaponHouseCfg.prototype.getRechargeList = function () {
                return this.rechargeList;
            };
            WeaponHouseCfg.prototype.getRankOneItemList = function () {
                return this.rankOneItemList;
            };
            WeaponHouseCfg.prototype.getRankAllItemList = function () {
                return this.rankAllItemList;
            };
            return WeaponHouseCfg;
        }());
        AcCfg.WeaponHouseCfg = WeaponHouseCfg;
        __reflect(WeaponHouseCfg.prototype, "Config.AcCfg.WeaponHouseCfg");
        /**积分item */
        var AddScoreListItem = (function (_super) {
            __extends(AddScoreListItem, _super);
            function AddScoreListItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**等级 */
                _this.weaponLv = 0;
                /**积分 */
                _this.lvScore = 0;
                return _this;
            }
            return AddScoreListItem;
        }(BaseItemCfg));
        AcCfg.AddScoreListItem = AddScoreListItem;
        __reflect(AddScoreListItem.prototype, "Config.AcCfg.AddScoreListItem");
        /**充值item */
        var RechargeListItem = (function (_super) {
            __extends(RechargeListItem, _super);
            function RechargeListItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**元宝 */
                _this.needGem = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return RechargeListItem;
        }(BaseItemCfg));
        AcCfg.RechargeListItem = RechargeListItem;
        __reflect(RechargeListItem.prototype, "Config.AcCfg.RechargeListItem");
        /**任务类型1 item */
        var ScheduleOne1Item = (function (_super) {
            __extends(ScheduleOne1Item, _super);
            function ScheduleOne1Item() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**阶段id */
                _this.stageId = null;
                /**类型 */
                _this.taskType = 0;
                /**所需积分 */
                _this.needNum = null;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ScheduleOne1Item;
        }(BaseItemCfg));
        AcCfg.ScheduleOne1Item = ScheduleOne1Item;
        __reflect(ScheduleOne1Item.prototype, "Config.AcCfg.ScheduleOne1Item");
        /**任务类型2 item */
        var ScheduleOne2Item = (function (_super) {
            __extends(ScheduleOne2Item, _super);
            function ScheduleOne2Item() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**阶段id */
                _this.stageId = null;
                /**类型 */
                _this.taskType = 0;
                //value1:所需神器等级
                _this.value1 = 0;
                //value1:所需次数
                _this.value2 = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ScheduleOne2Item;
        }(BaseItemCfg));
        AcCfg.ScheduleOne2Item = ScheduleOne2Item;
        __reflect(ScheduleOne2Item.prototype, "Config.AcCfg.ScheduleOne2Item");
        /**
         * 个人排名奖励
         */
        var WeaponRankOneItemCfg = (function (_super) {
            __extends(WeaponRankOneItemCfg, _super);
            function WeaponRankOneItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            return WeaponRankOneItemCfg;
        }(BaseItemCfg));
        AcCfg.WeaponRankOneItemCfg = WeaponRankOneItemCfg;
        __reflect(WeaponRankOneItemCfg.prototype, "Config.AcCfg.WeaponRankOneItemCfg");
        /**
         * 帮会排名奖励
         */
        var WeaponRankAllItemCfg = (function (_super) {
            __extends(WeaponRankAllItemCfg, _super);
            function WeaponRankAllItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.rank = [];
                _this.getReward1 = '';
                _this.getReward2 = '';
                return _this;
            }
            return WeaponRankAllItemCfg;
        }(BaseItemCfg));
        AcCfg.WeaponRankAllItemCfg = WeaponRankAllItemCfg;
        __reflect(WeaponRankAllItemCfg.prototype, "Config.AcCfg.WeaponRankAllItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WeaponHouseCfg.js.map