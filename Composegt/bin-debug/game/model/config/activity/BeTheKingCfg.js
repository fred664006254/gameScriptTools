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
        var BeTheKingCfg = (function () {
            function BeTheKingCfg() {
                this.cost = 0;
                this.prestigeRate1 = 0;
                this.prestigeRate2 = 0;
                this.votekingwinRate = 0;
                this.rankList = [];
                this.serverList1 = [];
                this.voteExchange = [];
                // public task:{unlock:string, questType:number,value:number,voteNum:number,getReward:string}[][] = [];
                this._taskList = {};
                this.rankNo1reward1 = "11_3101_1"; // --（单服和跨服）第一名奖励头像框
                this.rankNo1reward2 = "11_4006_1";
                this.voteReward = "";
                this.servantExchange = [];
            }
            /**
             * 初始化数据
             */
            BeTheKingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (key == "task") {
                            var task = data[key];
                            for (var taskK in task) {
                                var element = this._taskList[taskK];
                                if (!this._taskList.hasOwnProperty(taskK)) {
                                    element = this._taskList[taskK] = {};
                                }
                                for (var taskStage in task[taskK]) {
                                    var taskcfg = this._taskList[taskK][taskStage];
                                    if (!element.hasOwnProperty(taskStage)) {
                                        this._taskList[taskK][taskStage] = taskcfg = new BeTheKingTaskItemCfg();
                                    }
                                    taskcfg.id = taskK;
                                    taskcfg.stage = taskStage;
                                    taskcfg.initData(task[taskK][taskStage]);
                                }
                            }
                        }
                        else {
                            this[key] = data[key];
                        }
                    }
                }
            };
            BeTheKingCfg.prototype.getTaskListById = function (taskid, stage) {
                if (!stage) {
                    return this._taskList[taskid];
                }
                return this._taskList[taskid][stage];
            };
            BeTheKingCfg.prototype.getTaskItemLists = function (id) {
                var list = [];
                for (var key in this._taskList) {
                    if (Number(key) > Number(id) + 1) {
                        continue;
                    }
                    if (this._taskList.hasOwnProperty(key)) {
                        var element = this._taskList[key];
                        for (var key2 in element) {
                            if (element.hasOwnProperty(key2)) {
                                list.push(element[key2]);
                            }
                        }
                    }
                }
                return list;
            };
            return BeTheKingCfg;
        }());
        AcCfg.BeTheKingCfg = BeTheKingCfg;
        __reflect(BeTheKingCfg.prototype, "Config.AcCfg.BeTheKingCfg");
        /**
         * 任务的
         */
        var BeTheKingTaskItemCfg = (function (_super) {
            __extends(BeTheKingTaskItemCfg, _super);
            function BeTheKingTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return BeTheKingTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.BeTheKingTaskItemCfg = BeTheKingTaskItemCfg;
        __reflect(BeTheKingTaskItemCfg.prototype, "Config.AcCfg.BeTheKingTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
