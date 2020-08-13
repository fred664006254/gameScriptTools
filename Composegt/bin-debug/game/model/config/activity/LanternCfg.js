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
        var LanternCfg = (function () {
            function LanternCfg() {
            }
            //解析数据
            LanternCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new LanternTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                    }
                }
            };
            LanternCfg.prototype.getRewardItemVoList = function () {
                return GameData.formatRewardItem(this.lanternTextReward);
            };
            /**
             * 获得任务列表
             */
            LanternCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            return LanternCfg;
        }());
        AcCfg.LanternCfg = LanternCfg;
        __reflect(LanternCfg.prototype, "Config.AcCfg.LanternCfg");
        /**
         * 任务的
         */
        var LanternTaskItemCfg = (function (_super) {
            __extends(LanternTaskItemCfg, _super);
            function LanternTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return LanternTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.LanternTaskItemCfg = LanternTaskItemCfg;
        __reflect(LanternTaskItemCfg.prototype, "Config.AcCfg.LanternTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
