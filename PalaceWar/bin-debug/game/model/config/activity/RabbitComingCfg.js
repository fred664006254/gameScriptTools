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
        var RabbitComingCfg = (function () {
            function RabbitComingCfg() {
                /**展示期 */
                this.extraTime = 0;
                /*开关*/
                this.switch = [];
                /**核心奖励 */
                this.corePrize = "";
                /**投喂一次巧克力获得的积分 中心区对应奖池1，其他区对应奖池2*/
                this.drawCost1 = 0;
                /**十连抽获得X积 */
                this.drawCost2 = 0;
                /**个人拥有X积分才可以上榜 */
                this.pointsOwned1 = 0;
                /**消耗巧克力抽奖的奖池 */
                this.poolList = {};
                /**活动期间个人拥有积分排行榜奖励 */
                this.individualRank = {};
                /**活动期间帮会拥有积分排行榜奖励 */
                this.allianceRank = {};
                /**累计投喂巧克力奖励 */
                this.achievement = {};
                /**活动期间的累计充值奖励 */
                this.recharge = {};
                /**每购买一次消耗X元宝 */
                this.cost = 0;
                /**活动期间的活跃任务 */
                this.task = {};
            }
            /**
             * 初始化数据
             */
            RabbitComingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (typeof data[key] != 'object') {
                        this[key] = data[key];
                    }
                }
                this.poolList = data.poolList;
                for (var key in data.individualRank) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.individualRank.hasOwnProperty(String(key))) {
                        this.individualRank[String(key)] = new RabbitComingPrankItemCfg();
                    }
                    itemCfg = this.individualRank[String(key)];
                    itemCfg.initData(data.individualRank[key]);
                    itemCfg.id = id;
                }
                for (var key in data.allianceRank) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.allianceRank.hasOwnProperty(String(key))) {
                        this.allianceRank[String(key)] = new RabbitComingAllirankItemCfg();
                    }
                    itemCfg = this.allianceRank[String(key)];
                    itemCfg.initData(data.allianceRank[key]);
                    itemCfg.id = id;
                }
                for (var key in data.achievement) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.achievement.hasOwnProperty(String(key))) {
                        this.achievement[String(key)] = new RabbitComingProgressItemCfg();
                    }
                    itemCfg = this.achievement[String(key)];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = id;
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.recharge.hasOwnProperty(String(key))) {
                        this.recharge[String(key)] = new RabbitComingRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.task) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.task.hasOwnProperty(String(key))) {
                        this.task[String(key)] = new RabbitComingTaskItemCfg();
                    }
                    itemCfg = this.task[String(key)];
                    itemCfg.initData(data.task[key]);
                    itemCfg.id = id;
                }
            };
            /**解析翻牌奖池 */
            RabbitComingCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.poolList[1].prizePool) {
                    var unit = this.poolList[1].prizePool[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            /**
            * 炫光特效
            */
            RabbitComingCfg.prototype.isSpecial = function (data) {
                for (var i in this.poolList[1].prizePool) {
                    var unit = this.poolList[1].prizePool[i];
                    if (unit[0] === data && unit[2] == 1) {
                        return true;
                    }
                }
                return false;
            };
            RabbitComingCfg.prototype.getTotalProgress = function () {
                return this.achievement[Object.keys(this.achievement).length].needNum;
            };
            RabbitComingCfg.prototype.getSkinBone = function (code) {
                var cfg = null;
                if (this.corePrize) {
                    switch (Number(code)) {
                        case 1:
                        case 2:
                            cfg = Config.WifeskinCfg.getWifeCfgById(this.corePrize); //
                            break;
                    }
                }
                return cfg && cfg.bone ? cfg.bone : '';
            };
            RabbitComingCfg.prototype.getSkinName = function (code) {
                var cfg = null;
                if (this.corePrize) {
                    switch (Number(code)) {
                        case 1:
                        case 2:
                            cfg = Config.WifeskinCfg.getWifeCfgById(this.corePrize);
                            break;
                    }
                }
                return cfg && cfg.name ? cfg.name : '';
            };
            RabbitComingCfg.prototype.getSkin = function (code) {
                var skin = '';
                switch (Number(code)) {
                    case 1:
                    case 2:
                        skin = this.corePrize.toString();
                        break;
                }
                return skin;
            };
            // public getServantNeed():number{
            //     if (this.servant)
            //     {
            //         for (let k in this.recharge)
            //         {
            //             let v = this.recharge[k];
            //             let rewards = GameData.formatRewardItem(v.getReward);
            //             for (let i = 0 ; i< rewards.length; i++)
            //             {
            //                 let onevo = rewards[i];
            //                 if (onevo.type == 8 && onevo.id == Number(this.servant))
            //                 {
            //                     return v.needGem;
            //                 }
            //             }
            //         }
            //     }
            //     return 0; 
            // }
            RabbitComingCfg.prototype.getWifeNeed = function () {
                if (this.corePrize) {
                    for (var k in this.recharge) {
                        var v = this.recharge[k];
                        var rewards = GameData.formatRewardItem(v.getReward);
                        for (var i = 0; i < rewards.length; i++) {
                            var onevo = rewards[i];
                            if (onevo.type == 16 && onevo.id == Number(this.corePrize)) {
                                return v.needGem;
                            }
                        }
                    }
                }
                return 0;
            };
            return RabbitComingCfg;
        }());
        AcCfg.RabbitComingCfg = RabbitComingCfg;
        __reflect(RabbitComingCfg.prototype, "Config.AcCfg.RabbitComingCfg");
        var RabbitComingPrankItemCfg = (function (_super) {
            __extends(RabbitComingPrankItemCfg, _super);
            function RabbitComingPrankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--活动期间个人拥有积分排行榜奖励
                --rank:排名
                --getReward:奖励
                 */
                _this.id = 0;
                _this.rank = [];
                _this.getReward = '';
                return _this;
            }
            return RabbitComingPrankItemCfg;
        }(BaseItemCfg));
        AcCfg.RabbitComingPrankItemCfg = RabbitComingPrankItemCfg;
        __reflect(RabbitComingPrankItemCfg.prototype, "Config.AcCfg.RabbitComingPrankItemCfg");
        var RabbitComingAllirankItemCfg = (function (_super) {
            __extends(RabbitComingAllirankItemCfg, _super);
            function RabbitComingAllirankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--活动期间个人拥有积分排行榜奖励
                --rank:排名
                --getReward1:帮主奖励
                --getReward2:成员奖励
                 */
                _this.id = 0;
                _this.rank = [];
                _this.getReward1 = '';
                _this.getReward2 = '';
                return _this;
            }
            return RabbitComingAllirankItemCfg;
        }(BaseItemCfg));
        AcCfg.RabbitComingAllirankItemCfg = RabbitComingAllirankItemCfg;
        __reflect(RabbitComingAllirankItemCfg.prototype, "Config.AcCfg.RabbitComingAllirankItemCfg");
        var RabbitComingProgressItemCfg = (function (_super) {
            __extends(RabbitComingProgressItemCfg, _super);
            function RabbitComingProgressItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--累计投喂巧克力奖励
                --needNum:累计投喂巧克力次数（进度）
                --getReward:达成累计次数获得的奖励
                 */
                _this.id = 0;
                _this.needNum = 0;
                _this.getReward = '';
                return _this;
            }
            return RabbitComingProgressItemCfg;
        }(BaseItemCfg));
        AcCfg.RabbitComingProgressItemCfg = RabbitComingProgressItemCfg;
        __reflect(RabbitComingProgressItemCfg.prototype, "Config.AcCfg.RabbitComingProgressItemCfg");
        var RabbitComingRechargeItemCfg = (function (_super) {
            __extends(RabbitComingRechargeItemCfg, _super);
            function RabbitComingRechargeItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--累计投喂巧克力奖励
                --needGem:所需额度：单位（元宝）
                --show:达到X档位，才能看到此档位
                --specialGift:获得巧克力个数
                --getReward:奖励
                 */
                _this.id = 0;
                _this.needGem = 0;
                _this.specialGift = 0;
                _this.show = 0;
                _this.getReward = '';
                return _this;
            }
            return RabbitComingRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.RabbitComingRechargeItemCfg = RabbitComingRechargeItemCfg;
        __reflect(RabbitComingRechargeItemCfg.prototype, "Config.AcCfg.RabbitComingRechargeItemCfg");
        var RabbitComingTaskItemCfg = (function (_super) {
            __extends(RabbitComingTaskItemCfg, _super);
            function RabbitComingTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--活动期间的活跃任务    注：每日不重置
                --openType:跳转
                --questType:任务类型
                --value:进度
                --specialGift:特殊奖励
                --getReward:奖励
                 */
                _this.id = 0;
                _this.openType = "";
                _this.questType = 0;
                _this.value = 0;
                _this.specialGift = 0;
                _this.getReward = '';
                return _this;
            }
            return RabbitComingTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.RabbitComingTaskItemCfg = RabbitComingTaskItemCfg;
        __reflect(RabbitComingTaskItemCfg.prototype, "Config.AcCfg.RabbitComingTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RabbitComingCfg.js.map