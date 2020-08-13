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
        var MoonNightCfg = (function () {
            function MoonNightCfg() {
            }
            //解析数据
            MoonNightCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new MoonNightTaskItemCfg();
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
            MoonNightCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            return MoonNightCfg;
        }());
        AcCfg.MoonNightCfg = MoonNightCfg;
        __reflect(MoonNightCfg.prototype, "Config.AcCfg.MoonNightCfg");
        /**
         * 任务的
         */
        var MoonNightTaskItemCfg = (function (_super) {
            __extends(MoonNightTaskItemCfg, _super);
            function MoonNightTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return MoonNightTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.MoonNightTaskItemCfg = MoonNightTaskItemCfg;
        __reflect(MoonNightTaskItemCfg.prototype, "Config.AcCfg.MoonNightTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
