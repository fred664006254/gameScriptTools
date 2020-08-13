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
        /**
         * 擂台配置
         */
        var NewCrossServerAtkRaceCfg = /** @class */ (function () {
            function NewCrossServerAtkRaceCfg() {
                this.buff = null;
                /**
                 * 每次获胜奖励
                 */
                this.victory = [];
                //名望席位
                this.fameSeatList = [];
                //江湖席位挑战花费元宝，超过最大取最大值
                this.presCost = [];
            }
            NewCrossServerAtkRaceCfg.prototype.formatData = function (data) {
                this.lowerLimit1 = data.lowerLimit1;
                this.lowerLimit2 = data.lowerLimit2;
                this.lowerLimit3 = data.lowerLimit3;
                this.extraTime = data.extraTime;
                this.starTime = data.starTime;
                this.endTime = data.endTime;
                this.dailyNum = data.dailyNum;
                this.intervalTime = data.intervalTime;
                this.fightAdd = data.fightAdd;
                this.revenge = data.revenge;
                this.challenge = data.challenge;
                this.hunt = data.hunt;
                this.parameter1 = data.parameter1;
                this.parameter2 = data.parameter2;
                this.parameter3 = data.parameter3;
                this.baseBuff = data.baseBuff;
                this.buff = data.buff;
                this.freePres = data.freePres;
                this.presCost = data.presCost;
                this.victory.length = 0;
                for (var key in data.victory) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.victory[id]) {
                        this.victory[id] = new NewCSARVitctoryItemCfg();
                    }
                    itemCfg = this.victory[id];
                    itemCfg.initData(data.victory[key]);
                    itemCfg.id = id;
                }
                for (var key in data.pres) {
                    var item = new NewCSARFameSeatItem();
                    item.initData(data.pres[key]);
                    item.id = key;
                    var index = Number(key.split("t")[1]);
                    item.index = index;
                    this.fameSeatList.push(item);
                    this.fameSeatList.sort(function (a, b) { return a.index - b.index; });
                }
                this.winServer = data.winServer;
                this.loseServer = data.loseServer;
                this.rankList = data.rankList;
                this.rankList1 = data.rankList1;
                this.serverList1 = data.serverList1;
            };
            /**
             * 每日武馆次数
             */
            NewCrossServerAtkRaceCfg.prototype.getDailyNum = function () {
                return this.dailyNum;
            };
            /**
             * 额外出战系数
             */
            NewCrossServerAtkRaceCfg.prototype.getParameter1 = function () {
                return this.parameter1;
            };
            /**
             * 名望席位
             */
            NewCrossServerAtkRaceCfg.prototype.getFameSeatList = function () {
                return this.fameSeatList;
            };
            /**
             * 每次间隔时间 单位（秒）
             */
            NewCrossServerAtkRaceCfg.prototype.getIntervalTime = function () {
                return this.intervalTime;
            };
            NewCrossServerAtkRaceCfg.prototype.getFightAdd = function () {
                return this.fightAdd;
            };
            /**
             * 上榜条件 击败多少名
             */
            NewCrossServerAtkRaceCfg.prototype.getbeatNum = function () {
                return this.parameter3;
            };
            NewCrossServerAtkRaceCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this.winServer, true, true);
            };
            NewCrossServerAtkRaceCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this.loseServer, true, true);
            };
            NewCrossServerAtkRaceCfg.prototype.getServerRankRewards = function () {
                return this.rankList;
            };
            NewCrossServerAtkRaceCfg.prototype.getMulServerRewards = function (zonenum) {
                this.judgeParam(zonenum);
                return this.serverList1;
            };
            NewCrossServerAtkRaceCfg.prototype.getMulServerPRankRewards = function () {
                return this.rankList1;
            };
            NewCrossServerAtkRaceCfg.prototype.judgeParam = function (zonenum) {
                for (var i in this.serverList1) {
                    var unit = this.serverList1[i];
                    if (zonenum <= Number(unit.rank[1])) {
                        unit.rank[1] = zonenum;
                        break;
                    }
                }
                for (var j in this.serverList1) {
                    if (Number(i) < Number(j)) {
                        delete this.serverList1[j];
                    }
                }
            };
            NewCrossServerAtkRaceCfg.prototype.getBaseBuff = function () {
                var buffAtk = 0;
                var buffCrit = 0;
                for (var k in this.baseBuff) {
                    var onebuff = this.baseBuff[k];
                    var needv = onebuff["1"].needAbility;
                    var servantCount = Api.atkracecrossVoApi.getNewCrossVo().getBuffBookValueCount(needv);
                    var oneValue1 = 0;
                    var oneValue2 = 0;
                    for (var j in onebuff) {
                        var threebuff = onebuff[j];
                        if (servantCount >= threebuff.servantNum) {
                            if (threebuff.addAtk) {
                                oneValue1 = threebuff.addAtk;
                            }
                            if (threebuff.addCrit) {
                                oneValue2 = threebuff.addCrit;
                            }
                        }
                        else {
                            break;
                        }
                    }
                    buffAtk += oneValue1;
                    buffCrit += oneValue2;
                }
                return [buffAtk, buffCrit];
            };
            NewCrossServerAtkRaceCfg.prototype.getBaseBuffListById = function (k) {
                var v = [];
                var onebuff = this.baseBuff[k];
                for (var j in onebuff) {
                    var threebuff = onebuff[j];
                    v.push(threebuff);
                }
                return v;
            };
            NewCrossServerAtkRaceCfg.prototype.getBaseBuffList = function () {
                var v = [];
                for (var k in this.baseBuff) {
                    var onebuff = this.baseBuff[k];
                    var needv = onebuff["1"].needAbility;
                    var servantCount = Api.atkracecrossVoApi.getNewCrossVo().getBuffBookValueCount(needv);
                    var oneValue1 = 0;
                    var oneValue2 = 0;
                    var level = 0;
                    var onetype = onebuff["1"].addAtk > 0 ? 1 : 2;
                    for (var j in onebuff) {
                        var threebuff = onebuff[j];
                        if (servantCount >= threebuff.servantNum) {
                            if (threebuff.addAtk) {
                                oneValue1 = threebuff.addAtk;
                            }
                            else if (threebuff.addCrit) {
                                oneValue2 = threebuff.addCrit;
                            }
                            level = Number(j);
                        }
                        else {
                            break;
                        }
                    }
                    var onev = { id: k, needv: needv, lv: level, type: onetype, v1: oneValue1, v2: oneValue2, maxLv: Object.keys(onebuff).length, sc: servantCount };
                    v.push(onev);
                }
                return v;
            };
            return NewCrossServerAtkRaceCfg;
        }());
        AcCfg.NewCrossServerAtkRaceCfg = NewCrossServerAtkRaceCfg;
        var NewCSARVitctoryItemCfg = /** @class */ (function (_super) {
            __extends(NewCSARVitctoryItemCfg, _super);
            function NewCSARVitctoryItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return NewCSARVitctoryItemCfg;
        }(BaseItemCfg));
        AcCfg.NewCSARVitctoryItemCfg = NewCSARVitctoryItemCfg;
        var NewCSARFameSeatItem = /** @class */ (function (_super) {
            __extends(NewCSARFameSeatItem, _super);
            function NewCSARFameSeatItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //第几个等级
                _this.index = 0;
                _this.id = null;
                // --seatNumber:基础席位数量
                _this.seatNumber = 0;
                return _this;
            }
            return NewCSARFameSeatItem;
        }(BaseItemCfg));
        AcCfg.NewCSARFameSeatItem = NewCSARFameSeatItem;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewCrossServerAtkRaceCfg.js.map