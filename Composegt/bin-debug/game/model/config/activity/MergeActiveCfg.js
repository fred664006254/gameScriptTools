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
        var MergeActiveCfg = (function () {
            function MergeActiveCfg() {
            }
            //解析数据
            MergeActiveCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new MergeActiveTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                    }
                }
            };
            /**
             * 获得任务列表
             */
            MergeActiveCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            return MergeActiveCfg;
        }());
        AcCfg.MergeActiveCfg = MergeActiveCfg;
        __reflect(MergeActiveCfg.prototype, "Config.AcCfg.MergeActiveCfg");
        /**
         * 任务的
         */
        var MergeActiveTaskItemCfg = (function (_super) {
            __extends(MergeActiveTaskItemCfg, _super);
            function MergeActiveTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return MergeActiveTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MergeActiveTaskItemCfg = MergeActiveTaskItemCfg;
        __reflect(MergeActiveTaskItemCfg.prototype, "Config.AcCfg.MergeActiveTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
