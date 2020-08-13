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
        var MerryXmasCfg = (function () {
            function MerryXmasCfg() {
                this.ratio = 0;
                this.cost = [];
                this.cost2 = 0;
                this.discount = 0;
                this.firstFloor = [];
                this.secondFloor = [];
                this.thirdFloor = [];
                this.finalFloor = [];
                this.taskList = [];
                this.infinityFloor = [];
                this.progress = [];
                this.wifeSkinID = 0;
            }
            /**
             * 初始化数据
             */
            MerryXmasCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "task") {
                        this.taskList = this.taskList || [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new MerryXmasTaskItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.taskList.push(itemcfg);
                            i++;
                        }
                    }
                    if (key == "progress") {
                        this.taskList = this.taskList || [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new MerryXmasTaskItemCfg();
                            itemcfg.initData(data[key][k], true);
                            itemcfg.id = String(i + 1);
                            this.taskList.push(itemcfg);
                            i++;
                        }
                    }
                }
                this.wifeSkinID = 2091;
            };
            MerryXmasCfg.prototype.getDiscount = function () {
                return this.discount;
            };
            MerryXmasCfg.prototype.getCost = function (index) {
                return this.cost[2 - index];
            };
            MerryXmasCfg.prototype.getFinalFloor = function () {
                return this.finalFloor[0][0];
            };
            MerryXmasCfg.prototype.getCost2 = function () {
                return this.cost2;
            };
            MerryXmasCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            MerryXmasCfg.prototype.getResultList = function () {
                return [this.thirdFloor, this.secondFloor, this.firstFloor];
            };
            MerryXmasCfg.prototype.getResultByFloor = function (f) {
                switch (f) {
                    case 1:
                        return this.firstFloor;
                    case 2:
                        return this.secondFloor;
                    case 3:
                        return this.thirdFloor;
                    case 4:
                        return this.infinityFloor;
                }
            };
            MerryXmasCfg.prototype.getTaskValue = function (id) {
                for (var i = 0; i < this.taskList.length; i++) {
                    if (id = this.taskList[i].id) {
                        return this.taskList[i].value;
                    }
                }
                return null;
            };
            MerryXmasCfg.prototype.getTaskListById = function (min, max) {
                var length = this.taskList.length;
                var taskList = [];
                for (var i = 0; i < length; i++) {
                    if (min < 4) {
                        if (this.taskList[i].group >= min && this.taskList[i].group <= max) {
                            taskList.push(this.taskList[i]);
                        }
                    }
                    else {
                        if (this.taskList[i].progress == "progress") {
                            taskList.push(this.taskList[i]);
                        }
                    }
                }
                return taskList;
            };
            return MerryXmasCfg;
        }());
        AcCfg.MerryXmasCfg = MerryXmasCfg;
        __reflect(MerryXmasCfg.prototype, "Config.AcCfg.MerryXmasCfg");
        /**
         * 任务的
         */
        var MerryXmasTaskItemCfg = (function (_super) {
            __extends(MerryXmasTaskItemCfg, _super);
            function MerryXmasTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MerryXmasTaskItemCfg.prototype.initData = function (data, isProgress) {
                if (data) {
                    if (isProgress) {
                        this.progress = "progress";
                        this.value = data["needNum"];
                        this.getReward = data["getReward"];
                        this.questType = "progress";
                    }
                    else {
                        for (var key in data) {
                            this[key] = data[key];
                        }
                    }
                }
            };
            return MerryXmasTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MerryXmasTaskItemCfg = MerryXmasTaskItemCfg;
        __reflect(MerryXmasTaskItemCfg.prototype, "Config.AcCfg.MerryXmasTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
