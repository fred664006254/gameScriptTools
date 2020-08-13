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
        var CarnivalNightCfg = (function () {
            function CarnivalNightCfg() {
                this.show = 5001;
            }
            //解析数据
            CarnivalNightCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.task = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new CarnivalNightTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.task.push(itemcfg);
                                i++;
                            }
                        }
                        if (key == "mainReward") {
                            this.show = GameData.formatRewardItem(data[key])[0].id;
                        }
                        if (key == "batHP" || key == "bigPrize") {
                            this.acTask = this.acTask || [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new CarnivalNightTaskItemCfg2();
                                itemcfg.id = String(i + 1);
                                itemcfg.initData(data[key][k]);
                                this.acTask.push(itemcfg);
                                i++;
                            }
                        }
                    }
                }
            };
            /**
             * 获得任务列表
             */
            CarnivalNightCfg.prototype.getTaskList = function () {
                return this.task;
            };
            CarnivalNightCfg.prototype.getTaskListById = function (groupId) {
                //这个活动的group=2和group=3的在一个分页
                var length = this.task.length;
                var taskList = [];
                for (var i = 0; i < length; i++) {
                    if (groupId == 1) {
                        if (this.task[i].group == groupId) {
                            taskList.push(this.task[i]);
                        }
                    }
                    else {
                        if (this.task[i].group != 1) {
                            taskList.push(this.task[i]);
                        }
                    }
                }
                return taskList;
            };
            CarnivalNightCfg.prototype.getCurBossMaxHp = function (id) {
                id = Math.min(id, this.batHP.length);
                return this.batHP[id - 1].HP;
            };
            CarnivalNightCfg.prototype.getCurBossInfo = function (id) {
                id = Math.min(id, this.batHP.length);
                return this.batHP[id - 1];
            };
            return CarnivalNightCfg;
        }());
        AcCfg.CarnivalNightCfg = CarnivalNightCfg;
        __reflect(CarnivalNightCfg.prototype, "Config.AcCfg.CarnivalNightCfg");
        /**
         * 任务的
         */
        var CarnivalNightTaskItemCfg = (function (_super) {
            __extends(CarnivalNightTaskItemCfg, _super);
            function CarnivalNightTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CarnivalNightTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.CarnivalNightTaskItemCfg = CarnivalNightTaskItemCfg;
        __reflect(CarnivalNightTaskItemCfg.prototype, "Config.AcCfg.CarnivalNightTaskItemCfg");
        /**
        * 活动任务的
        */
        var CarnivalNightTaskItemCfg2 = (function (_super) {
            __extends(CarnivalNightTaskItemCfg2, _super);
            function CarnivalNightTaskItemCfg2() {
                return _super.call(this) || this;
            }
            CarnivalNightTaskItemCfg2.prototype.initData = function (data) {
                if (data["HP"]) {
                    this.typeId = 'batHP' + this.id;
                    this.getReward = data["getReward"];
                    this.value = Number(this.id);
                }
                else {
                    this.typeId = 'bigPrize' + this.id;
                    this.getReward = data["getReward"];
                    this.value = data["needValue"];
                }
            };
            CarnivalNightTaskItemCfg2.prototype.dispose = function () {
            };
            return CarnivalNightTaskItemCfg2;
        }(BaseClass));
        AcCfg.CarnivalNightTaskItemCfg2 = CarnivalNightTaskItemCfg2;
        __reflect(CarnivalNightTaskItemCfg2.prototype, "Config.AcCfg.CarnivalNightTaskItemCfg2");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
