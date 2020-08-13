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
        var MazeCfg = (function () {
            function MazeCfg() {
                /** 单抽一次的价格 */
                this._cost = 0;
                /** 连续购买十次的折扣 */
                this._discount = 0;
                /** 奖励池类型1 */
                this._typePool1 = [];
                /** 奖励池类型2 */
                this._typePool2 = [];
                /** 奖励池类型3 */
                this._typePool3 = [];
                /** 奖励池类型4 */
                this._typePool4 = [];
                /** 奖励池类型5 */
                this._typePool5 = [];
                /** 排行榜入榜最低次数 */
                this._rankNeedNum = 0;
                /** 排行榜单奖励 */
                this._rankReward = [];
                /** 累积充值奖励进度 */
                this._recharge = [];
                this._getReward = null;
                this._task = [];
                this.taskItemListCfg = [];
                this.rechargeItemCfg = [];
            }
            /**
             * 初始化数据
             */
            MazeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["_" + key] = data[key];
                    if (key == "task") {
                        this.taskItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new TaskItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.rechargeItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new RechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rechargeItemCfg.push(itemcfg);
                        }
                    }
                }
            };
            Object.defineProperty(MazeCfg.prototype, "cost", {
                /**
                 * 获得单次购买的价格
                 */
                get: function () {
                    return this._cost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MazeCfg.prototype, "discount", {
                /**
                * 获得连续购买十次的折扣
                */
                get: function () {
                    return this._discount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MazeCfg.prototype, "rankNeedNum", {
                // /**
                //  * 获得获取的奖励
                //  */
                // public get reward() : string{
                //     return this._getReward;
                // }
                /**
                 * 获得排行榜入榜最低次数
                 */
                get: function () {
                    return this._rankNeedNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MazeCfg.prototype, "rankReward", {
                /**
                 * 获得排行榜单奖励
                 */
                get: function () {
                    return this._rankReward;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MazeCfg.prototype, "recharge", {
                /**
                 * 获得累积充值奖励进度
                 */
                get: function () {
                    return this.rechargeItemCfg;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MazeCfg.prototype, "task", {
                /**
                 * 获得任务列表
                 */
                get: function () {
                    // let aa = this.taskItemListCfg;
                    return this.taskItemListCfg;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 奖励池类型
             */
            MazeCfg.prototype.typePool = function (type) {
                switch (type) {
                    case 1:
                        return this._typePool1;
                    case 2:
                        return this._typePool2;
                    case 3:
                        return this._typePool3;
                    case 4:
                        return this._typePool4;
                    case 5:
                        return this._typePool5;
                }
            };
            /**
             * 获得奖励
             */
            MazeCfg.prototype.getChargeRewardById = function (id) {
                if (this._recharge[id]) {
                    return this._recharge[id];
                }
                else {
                    return null;
                }
            };
            /**
             * 获得任务的openType
             */
            MazeCfg.prototype.getTaskType = function (id) {
                for (var i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id == this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].openType;
                    }
                }
            };
            MazeCfg.prototype.getRewardIcon = function () {
                return this._getReward;
            };
            return MazeCfg;
        }());
        AcCfg.MazeCfg = MazeCfg;
        __reflect(MazeCfg.prototype, "Config.AcCfg.MazeCfg");
        var TaskItemCfg = (function (_super) {
            __extends(TaskItemCfg, _super);
            function TaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return TaskItemCfg;
        }(BaseItemCfg));
        AcCfg.TaskItemCfg = TaskItemCfg;
        __reflect(TaskItemCfg.prototype, "Config.AcCfg.TaskItemCfg");
        var RechargeItemCfg = (function (_super) {
            __extends(RechargeItemCfg, _super);
            function RechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.RechargeItemCfg = RechargeItemCfg;
        __reflect(RechargeItemCfg.prototype, "Config.AcCfg.RechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MazeCfg.js.map