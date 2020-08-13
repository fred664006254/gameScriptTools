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
         * 群雄逐鹿
         */
        var CrossServerHegemonyCfg = (function () {
            function CrossServerHegemonyCfg() {
                //  --展示时间
                this.extraTime = 2;
                // --预选赛轮次设定
                this.qualifyingRound = 24;
                // --预选赛每天战斗次数
                this.qualifyingDayFight = 3;
                //门客派遣CD时间
                this.CD = 60;
                //门客派遣元宝消耗
                this.cost = 50;
                //门客最大连胜场数
                this.servantMaxWin = 5;
                // --备战日时间
                this.readyTime = 1;
                // --休战日时间
                this.armisticeTime = 1;
                // --决赛队伍数
                this.finalAllianceNum = 32;
                // --每个门客每次群雄争霸只可参战X次
                this.servantLimit = 1;
                // --战斗胜利参与者赢得战斗积分
                this.fightScoreWin = 10;
                // --战斗失败参与者赢得战斗积分
                this.fightScoreLose = 10;
                //战旗的ID
                this.flagItemID = 0;
                // --战旗押注的队伍数
                this.flagTeamNum = 10;
                // --1个战旗的积分
                this.flagScoreNum = 10;
                // --【锦 囊 列 表】
                // --itemID:道具ID
                // --powerup:自己提升战斗力
                // --powerdown:敌方减少战斗力
                // --moreguest:额外派遣门客数量
                // --wins:本轮连胜上限
                this.itemList = [];
                // --【职 位 加 成】
                // --level:联盟等级
                // --leader_add:盟主加成
                // --associate_add:副盟主加成
                // --elite_add:精英加成
                // --member_add:成员加成
                // --tab:备注
                this.allianceOfficer = {};
                // --预赛帮众奖励
                // --rank:排行榜上限
                // --assetReward:帮会财富奖励
                // --getReward:奖励
                this.qualifyingReward1 = [];
                // --预赛帮众奖励
                // --rank:排行榜上限
                // --getReward:奖励
                this.qualifyingReward2 = [];
                // --决赛帮主奖励
                // --rank:排行榜上限
                // --assetReward:帮会财富奖励
                // --getReward:奖励
                this.finalReward1 = [];
                // --决赛帮众奖励
                // --rank:排行榜上限
                // --getReward:奖励
                this.finalReward2 = [];
                // --cost:兑换所需积分
                // --limitType:限购类型 0：不限购；1：每天限购；2：每周限购；3：每月限购
                // --limitNum:限购次数 0：无作用
                // --sell:商店内容
                this.flagScoreShop = [];
                // --cost:兑换所需积分
                // --limitType:限购类型 0：不限购；1：每天限购；2：每周限购；3：每月限购
                // --limitNum:限购次数 0：无作用
                // --sell:商店内容
                this.fightScoreShop = [];
                // --活动期间的助威任务   注：每日不重置
                // --openType:跳转
                // --questType:任务类型  特殊类型：1--登录X天；2--累计消耗 X元宝；10001--充值xx元宝
                // --value:进度
                // --special1:特殊奖励：战旗
                // --getReward:奖励
                this.task = {};
                this.taskList = [];
                // --压注队伍排名返还积分倍率
                // --rank:排行榜上限
                // --multiplying:奖励倍率
                this.flagScoreRebate = [];
                // --帮会充值列表
                // --totalValue:总额度:元宝
                // --individualValue:个人充值达到 X ，才可领奖
                // --getReward:奖励
                this.allianceRecharge = {};
                this.allianceRechargeList = [];
            }
            //得到当前物品消耗分数
            CrossServerHegemonyCfg.prototype.getCurFightScoreCost = function (id, buynum) {
                var shopCfg = this.fightScoreShop[Number(id) - 1];
                var cost = shopCfg.cost[buynum];
                return cost;
            };
            //得到当前物品消耗分数
            CrossServerHegemonyCfg.prototype.getCurFlagScoreCost = function (id, buynum) {
                var shopCfg = this.flagScoreShop[Number(id) - 1];
                var cost = shopCfg.cost[buynum];
                return cost;
            };
            /**
             *  --获取锦囊列表数据
             */
            CrossServerHegemonyCfg.prototype.getItemList = function () {
                return this.itemList;
            };
            CrossServerHegemonyCfg.prototype.getFinalRewardList = function () {
                //finalReward1
                //finalReward2
                var list = [];
                for (var i = 0; i < this.finalReward1.length; i++) {
                    var listObj = { master: this.finalReward1[i], member: this.finalReward2[i] };
                    list.push(listObj);
                }
                return list;
            };
            //根据排名获取奖励倍数
            CrossServerHegemonyCfg.prototype.getFlagRebateByRank = function (rank) {
                for (var i = 0; i < this.flagScoreRebate.length; i++) {
                    var fObj = this.flagScoreRebate[i];
                    if (fObj.rank[0] <= rank && fObj.rank[1] >= rank) {
                        return fObj.multiplying;
                    }
                }
                return 0;
            };
            //预赛帮众奖励
            CrossServerHegemonyCfg.prototype.getQualifyingRewardList = function () {
                //qualifyingReward1
                //qualifyingReward2
                var list = [];
                for (var i = 0; i < this.qualifyingReward1.length; i++) {
                    var listObj = { master: this.qualifyingReward1[i], member: this.qualifyingReward2[i] };
                    list.push(listObj);
                }
                return list;
            };
            /**
             * 各等级的加成
             */
            CrossServerHegemonyCfg.prototype.getAddition = function (po, level) {
                var info = null;
                var id = null;
                var addition;
                var addvalue;
                for (var key in this.allianceOfficer) {
                    if (Number(level) == Number(this.allianceOfficer[key].level)) {
                        id = key;
                        break;
                    }
                }
                switch (po) {
                    case 1:
                        addition = String(Math.round(Number(this.allianceOfficer[id].leader_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].leader_add)) + 1;
                        break;
                    case 2:
                        addition = String(Math.round(Number(this.allianceOfficer[id].associate_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].associate_add)) + 1;
                        break;
                    case 3:
                        addition = String(Math.round(Number(this.allianceOfficer[id].elite_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].elite_add)) + 1;
                        break;
                    case 4:
                        addition = String(Math.round(Number(this.allianceOfficer[id].member_add) * 100)) + "%";
                        addvalue = Math.round(Number(this.allianceOfficer[id].member_add)) + 1;
                        break;
                }
                info = { level: this.allianceOfficer[id].level, addition: addition, addvalue: addvalue };
                return info;
            };
            CrossServerHegemonyCfg.prototype.getFightScoreShopList = function () {
                return this.fightScoreShop;
            };
            CrossServerHegemonyCfg.prototype.getFlagScoreShopList = function () {
                return this.flagScoreShop;
            };
            CrossServerHegemonyCfg.prototype.getTaskListById = function (min, max) {
                var length = this.taskList.length;
                var taskList = [];
                for (var i = 0; i < length; i++) {
                    taskList.push(this.taskList[i]);
                }
                return taskList;
            };
            CrossServerHegemonyCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            CrossServerHegemonyCfg.prototype.getRechargeList = function () {
                return this.allianceRechargeList;
            };
            CrossServerHegemonyCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.qualifyingRound = data.qualifyingRound;
                this.qualifyingDayFight = data.qualifyingDayFight;
                this.CD = data.CD;
                this.cost = data.cost;
                this.servantMaxWin = data.servantMaxWin;
                this.readyTime = data.readyTime;
                this.armisticeTime = data.armisticeTime;
                this.finalAllianceNum = data.finalAllianceNum;
                this.servantLimit = data.servantLimit;
                this.fightScoreWin = data.fightScoreWin;
                this.fightScoreLose = data.fightScoreLose;
                // this.flagItemID = data.flagItemID;
                this.flagTeamNum = data.flagTeamNum;
                this.flagScoreNum = data.flagScoreNum;
                this.allianceOfficer = data.allianceOfficer;
                this.task = data.task;
                this.allianceRecharge = data.allianceRecharge;
                for (var key in data.itemList) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyItemListItemCfg();
                    itemCfg.initData(data.itemList[key]);
                    itemCfg.id = Number(key) + 1;
                    this.itemList.push(itemCfg);
                }
                for (var key in data.qualifyingReward1) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyQualifyingReward1ItemCfg();
                    itemCfg.initData(data.qualifyingReward1[key]);
                    itemCfg.id = Number(key) + 1;
                    this.qualifyingReward1.push(itemCfg);
                }
                for (var key in data.qualifyingReward2) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFinalReward2ItemCfg();
                    itemCfg.initData(data.qualifyingReward2[key]);
                    itemCfg.id = Number(key) + 1;
                    this.qualifyingReward2.push(itemCfg);
                }
                for (var key in data.finalReward1) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFinalReward1ItemCfg();
                    itemCfg.initData(data.finalReward1[key]);
                    itemCfg.id = Number(key) + 1;
                    this.finalReward1.push(itemCfg);
                }
                for (var key in data.finalReward2) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFinalReward2ItemCfg();
                    itemCfg.initData(data.finalReward2[key]);
                    itemCfg.id = Number(key) + 1;
                    this.finalReward2.push(itemCfg);
                }
                for (var key in data.flagScoreShop) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFlagScoreItemCfg();
                    itemCfg.initData(data.flagScoreShop[key]);
                    itemCfg.id = Number(key) + 1;
                    this.flagScoreShop.push(itemCfg);
                }
                for (var key in data.fightScoreShop) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFightScoreItemCfg();
                    itemCfg.initData(data.fightScoreShop[key]);
                    itemCfg.id = Number(key) + 1;
                    this.fightScoreShop.push(itemCfg);
                }
                // let taskIndex = 101;
                for (var key in data.task) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyTaskItemCfg();
                    itemCfg.initData(data.task[key]);
                    itemCfg.id = Number(key) + 1;
                    // taskIndex++;
                    this.taskList.push(itemCfg);
                }
                for (var key in data.flagScoreRebate) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFlagScoreRebateItemCfg();
                    itemCfg.initData(data.flagScoreRebate[key]);
                    itemCfg.id = Number(key) + 1;
                    this.flagScoreRebate.push(itemCfg);
                }
                for (var key_1 in data.allianceRecharge) {
                    var itemCfg = void 0;
                    itemCfg = new CSHegemonyFlagRechargeItemCfg();
                    itemCfg.initData(data.allianceRecharge[key_1]);
                    itemCfg.id = Number(key_1) + 1;
                    this.allianceRechargeList.push(itemCfg);
                }
            };
            return CrossServerHegemonyCfg;
        }());
        AcCfg.CrossServerHegemonyCfg = CrossServerHegemonyCfg;
        __reflect(CrossServerHegemonyCfg.prototype, "Config.AcCfg.CrossServerHegemonyCfg");
        //锦 囊 列 表
        var CSHegemonyItemListItemCfg = (function (_super) {
            __extends(CSHegemonyItemListItemCfg, _super);
            function CSHegemonyItemListItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyItemListItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyItemListItemCfg.prototype, "CSHegemonyItemListItemCfg");
        //预赛帮主奖励
        var CSHegemonyQualifyingReward1ItemCfg = (function (_super) {
            __extends(CSHegemonyQualifyingReward1ItemCfg, _super);
            function CSHegemonyQualifyingReward1ItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyQualifyingReward1ItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyQualifyingReward1ItemCfg.prototype, "CSHegemonyQualifyingReward1ItemCfg");
        //预赛帮众奖励
        var CSHegemonyQualifyingReward2ItemCfg = (function (_super) {
            __extends(CSHegemonyQualifyingReward2ItemCfg, _super);
            function CSHegemonyQualifyingReward2ItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyQualifyingReward2ItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyQualifyingReward2ItemCfg.prototype, "CSHegemonyQualifyingReward2ItemCfg");
        //决赛帮主奖励
        var CSHegemonyFinalReward1ItemCfg = (function (_super) {
            __extends(CSHegemonyFinalReward1ItemCfg, _super);
            function CSHegemonyFinalReward1ItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyFinalReward1ItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyFinalReward1ItemCfg.prototype, "CSHegemonyFinalReward1ItemCfg");
        //决赛帮众奖励
        var CSHegemonyFinalReward2ItemCfg = (function (_super) {
            __extends(CSHegemonyFinalReward2ItemCfg, _super);
            function CSHegemonyFinalReward2ItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyFinalReward2ItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyFinalReward2ItemCfg.prototype, "CSHegemonyFinalReward2ItemCfg");
        //旗帜积分商店
        var CSHegemonyFlagScoreItemCfg = (function (_super) {
            __extends(CSHegemonyFlagScoreItemCfg, _super);
            function CSHegemonyFlagScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyFlagScoreItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyFlagScoreItemCfg.prototype, "CSHegemonyFlagScoreItemCfg");
        //战斗积分商店
        var CSHegemonyFightScoreItemCfg = (function (_super) {
            __extends(CSHegemonyFightScoreItemCfg, _super);
            function CSHegemonyFightScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyFightScoreItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyFightScoreItemCfg.prototype, "CSHegemonyFightScoreItemCfg");
        //任务
        var CSHegemonyTaskItemCfg = (function (_super) {
            __extends(CSHegemonyTaskItemCfg, _super);
            function CSHegemonyTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyTaskItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyTaskItemCfg.prototype, "CSHegemonyTaskItemCfg");
        //压注队伍排名返还积分倍率
        var CSHegemonyFlagScoreRebateItemCfg = (function (_super) {
            __extends(CSHegemonyFlagScoreRebateItemCfg, _super);
            function CSHegemonyFlagScoreRebateItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyFlagScoreRebateItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyFlagScoreRebateItemCfg.prototype, "CSHegemonyFlagScoreRebateItemCfg");
        //帮会充值
        var CSHegemonyFlagRechargeItemCfg = (function (_super) {
            __extends(CSHegemonyFlagRechargeItemCfg, _super);
            function CSHegemonyFlagRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CSHegemonyFlagRechargeItemCfg;
        }(BaseItemCfg));
        __reflect(CSHegemonyFlagRechargeItemCfg.prototype, "CSHegemonyFlagRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CrossServerHegemonyCfg.js.map