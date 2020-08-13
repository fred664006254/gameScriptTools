var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var BattlePassCfg = (function () {
            function BattlePassCfg() {
                this.extraTime = 0;
                /*轮数刷新时间(天)*/
                this.refresh = 0;
                /*每轮刷新任务数量(天)*/
                this.taskNum = 0;
                /*X天提醒玩家商店兑换(天)*/
                this.remind = 0;
                /*玩家单次活动期间最多只能购买X级政令等级*/
                this.lvLimit = 0;
                /*
                --战令分级显示
                --open:是否开启政令版本(1-开启，0不开启)
                --unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
                --unlockRecharge:解锁充值。玩家购买advanced后直接解锁intermediate
                --lvAdd:购买后直接赠送等级
                --unlockTask:open=1时，开放的任务
                */
                this.show = null;
                /*
                --普通任务 - 固定任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --openType:任务跳转
                --expGet:获得经验值
                */
                this.firmTask = null;
                /*
                --普通任务 - 随机任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --turn:X轮及X轮以后才可随机到该任务
                --right:任务随机权重
                --openType:任务跳转
                --expGet:获得经验值
                */
                this.randomTask = null;
                /*
                --特殊悬赏任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --openType:任务跳转
                --expGet:获得经验值
                */
                this.specialTask = null;
                /*
                --令牌兑换商店
                --limit:活动限购
                --cost:价格
                --goods:获得
                */
                this.shop = null;
                /*
                --政令奖励
                --expNeed:升级需要经验
                --specialGift:特殊档位标识。1
                --primary:普通政令奖励
                --intermediate:黄金政令奖励
                --advanced:传世政令奖励
                */
                this.battlePass = null;
                /**
                 * intermediate奖励展示
                 */
                this.show1 = '';
                /**
                 * advanced奖励展示
                 */
                this.show2 = '';
                /**
                 * --X等级下增加分割线。最核心奖励处
                */
                this.segmentation = 60;
                this.showDetail = [];
                //任务
                this._arr = [];
                this._taskObj = {};
            }
            BattlePassCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            //商店兑换
            BattlePassCfg.prototype.getShopArr = function () {
                var arr = [];
                /**
                 *   --令牌兑换商店
                --limit:活动限购
                --cost:价格
                --goods:获得
                 */
                for (var i in this.shop) {
                    var unit = this.shop[i];
                    arr.push({
                        limit: unit.limit,
                        cost: unit.cost || unit.costZhengling,
                        goods: unit.goods,
                        id: Number(i) + 1,
                    });
                }
                return arr;
            };
            //特殊悬赏
            BattlePassCfg.prototype.getSpecialTaskArr = function () {
                var arr = [];
                //特殊任务
                /**
                 * --特殊悬赏任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --openType:任务跳转
                --expGet:获得经验值
                 */
                for (var i in this.specialTask) {
                    var unit = this.specialTask[i];
                    // if((Number(unit.questType) == 120 && Api.switchVoApi.checkNewDailyBoss()) || (Number(unit.questType) == 953 && !Api.switchVoApi.checkNewDailyBoss())){
                    //     continue;
                    // }
                    arr.push({
                        questType: unit.questType,
                        sortId: unit.sortId,
                        value: unit.value,
                        value2: unit.value2,
                        times: unit.times,
                        openType: unit.openType,
                        expGet: unit.expGet
                    });
                }
                return arr;
            };
            BattlePassCfg.prototype.getTaskArr = function () {
                if (this._arr.length) {
                    return this._arr;
                }
                //固定任务
                /**
                 *  --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --openType:任务跳转
                --expGet:获得经验值
                 */
                var firmTaskArr = [];
                for (var i in this.firmTask) {
                    var unit = this.firmTask[i];
                    firmTaskArr.push({
                        questType: unit.questType,
                        sortId: unit.sortId,
                        value: unit.value,
                        value2: unit.value2,
                        times: unit.times,
                        openType: unit.openType,
                        expGet: unit.expGet
                    });
                }
                //随机任务
                /*--普通任务 - 随机任务
                --questType:任务类型
                --sortId:排序
                --value:任务参数
                --times:任务可完成次数，一轮
                --turn:X轮及X轮以后才可随机到该任务
                --right:任务随机权重
                --openType:任务跳转
                --expGet:获得经验值*/
                var randonmArr = [];
                for (var i in this.randomTask) {
                    var unit = this.randomTask[i];
                    randonmArr.push({
                        questType: unit.questType,
                        sortId: unit.sortId,
                        value: unit.value,
                        times: unit.times,
                        openType: unit.openType,
                        expGet: unit.expGet,
                        turn: unit.turn,
                        value2: unit.value2,
                    });
                }
                this._arr = this._arr.concat(firmTaskArr).concat(randonmArr);
                return this._arr;
            };
            Object.defineProperty(BattlePassCfg.prototype, "maxlevel", {
                /*当前最大等级*/
                get: function () {
                    var num = 0;
                    if (this.battlePass && this.battlePass.length) {
                        num = this.battlePass.length;
                    }
                    return num;
                },
                enumerable: true,
                configurable: true
            });
            //--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
            BattlePassCfg.prototype.getBattleInfo = function (type) {
                var tmp = null;
                // let arr = [`primary`, `intermediate`, `advanced`];
                if (this.show) {
                    for (var i in this.show) {
                        var unit = this.show[i];
                        if (unit.unlockBP === type) {
                            tmp = unit;
                        }
                    }
                }
                return tmp;
            };
            BattlePassCfg.prototype.getBattleCostArr = function () {
                var tmp = [];
                if (this.show) {
                    for (var i in this.show) {
                        var unit = this.show[i];
                        if (unit.cost) {
                            tmp.push({
                                open: unit.open,
                                unlockBP: unit.unlockBP,
                                cost: unit.cost,
                                lvAdd: unit.lvAdd,
                                index: Number(i) + 1
                            });
                        }
                    }
                }
                return tmp;
            };
            //--unlockBP:解锁的战令。Primary-初级。Intermediate-中级。Advanced-高级
            BattlePassCfg.prototype.getBattleInfoArr = function () {
                var tmp = [];
                var arr = ["advanced", "intermediate"];
                if (this.show) {
                    for (var k in arr) {
                        var str = arr[k];
                        for (var i in this.show) {
                            var unit = this.show[i];
                            if (str === unit.unlockBP) {
                                tmp.push(unit);
                                break;
                            }
                        }
                    }
                }
                return tmp;
            };
            //获取与传入等级的最接近的特殊奖励信息
            BattlePassCfg.prototype.getRecentSpecialReward = function (level) {
                var tmp = null;
                if (this.battlePass) {
                    for (var k = level; k <= this.battlePass.length; ++k) {
                        var unit = this.battlePass[k - 1];
                        if (unit && unit.specialGift) {
                            tmp = {
                                expNeed: unit.expNeed,
                                specialGift: unit.specialGift,
                                primary: unit.primary,
                                intermediate: unit.intermediate,
                                advanced: unit.advanced,
                                level: k,
                                special1: unit.special1,
                                special2: unit.special2,
                                special3: unit.special3,
                            };
                            break;
                        }
                    }
                }
                if (!tmp) {
                    var len = this.battlePass.length - 1;
                    for (var i = len; i >= 0; --i) {
                        var unit = this.battlePass[i];
                        if (unit && unit.specialGift) {
                            tmp = {
                                expNeed: unit.expNeed,
                                specialGift: unit.specialGift,
                                primary: unit.primary,
                                intermediate: unit.intermediate,
                                advanced: unit.advanced,
                                level: i + 1,
                                special1: unit.special1,
                                special2: unit.special2,
                                special3: unit.special3,
                            };
                            break;
                        }
                    }
                }
                return tmp;
            };
            BattlePassCfg.prototype.getSpecialRewardInfo = function (type) {
                var obj = {};
                var tmp = [];
                var info = [];
                if (this.battlePass) {
                    for (var k in this.battlePass) {
                        var unit = this.battlePass[k];
                        if (unit && unit.specialGift && unit[type]) {
                            tmp = tmp.concat(GameData.getRewardItemIcons(unit[type], true, false));
                            for (var i = 0; i < tmp.length; ++i) {
                                info.push(Number(k) + 1);
                            }
                        }
                    }
                }
                obj.icons = tmp;
                obj.info = info;
                return obj;
            };
            BattlePassCfg.prototype.getBattlePassReward = function () {
                // --expNeed:升级需要经验
                // --specialGift:特殊档位标识。1
                // --primary:普通政令奖励
                // --intermediate:黄金政令奖励
                // --advanced:传世政令奖励
                var arr = ["primary", "intermediate", ""];
                for (var i in this.battlePass) {
                }
                return this.battlePass;
            };
            BattlePassCfg.prototype.getTaskCfgByQuestType = function (questType) {
                if (this._taskObj[questType]) {
                    return this._taskObj[questType];
                }
                var arr = this.getTaskArr();
                var tmp = null;
                for (var i in arr) {
                    if (arr[i] && arr[i].questType === questType) {
                        tmp = arr[i];
                        break;
                    }
                }
                this._taskObj[questType] = tmp;
                return tmp;
            };
            BattlePassCfg.prototype.getSpecialTaskCfgByQuestType = function (questType) {
                var arr = this.getSpecialTaskArr();
                var tmp = null;
                for (var i in arr) {
                    if (arr[i] && arr[i].questType === questType) {
                        tmp = arr[i];
                        break;
                    }
                }
                return tmp;
            };
            return BattlePassCfg;
        }());
        AcCfg.BattlePassCfg = BattlePassCfg;
        __reflect(BattlePassCfg.prototype, "Config.AcCfg.BattlePassCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=BattlePassCfg.js.map