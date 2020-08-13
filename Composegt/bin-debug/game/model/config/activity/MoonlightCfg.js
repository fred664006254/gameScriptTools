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
        var MoonlightCfg = (function () {
            function MoonlightCfg() {
            }
            // private taskList1:MoonlightTaskItemCfg[];
            // private taskList2:MoonlightTaskItemCfg[];
            // private taskList3:MoonlightTaskItemCfg[];
            //解析数据
            MoonlightCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new MoonlightTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                    }
                }
            };
            MoonlightCfg.prototype.getTaskListById = function (groupId) {
                var length = this.taskList.length;
                var taskList = [];
                for (var i = 0; i < length; i++) {
                    if (this.taskList[i].group == groupId) {
                        taskList.push(this.taskList[i]);
                    }
                }
                return taskList;
            };
            MoonlightCfg.prototype.getMaxBoxNeedNum = function () {
                return this.drawNum[this.drawNum.length - 1].needNum;
            };
            /**
             * 获得任务列表
             */
            MoonlightCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            return MoonlightCfg;
        }());
        AcCfg.MoonlightCfg = MoonlightCfg;
        __reflect(MoonlightCfg.prototype, "Config.AcCfg.MoonlightCfg");
        /**
         * 任务的
         */
        var MoonlightTaskItemCfg = (function (_super) {
            __extends(MoonlightTaskItemCfg, _super);
            function MoonlightTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return MoonlightTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MoonlightTaskItemCfg = MoonlightTaskItemCfg;
        __reflect(MoonlightTaskItemCfg.prototype, "Config.AcCfg.MoonlightTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
