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
    var MaintaskCfg;
    (function (MaintaskCfg) {
        var mainTaskList = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!mainTaskList.hasOwnProperty(String(key))) {
                    mainTaskList[String(key)] = new MaintaskItemCfg();
                }
                itemCfg = mainTaskList[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.taskId = String(key);
            }
        }
        MaintaskCfg.formatData = formatData;
        function getTaskCfgByTaskId(taskId) {
            return mainTaskList[taskId];
        }
        MaintaskCfg.getTaskCfgByTaskId = getTaskCfgByTaskId;
    })(MaintaskCfg = Config.MaintaskCfg || (Config.MaintaskCfg = {}));
    var MaintaskItemCfg = (function (_super) {
        __extends(MaintaskItemCfg, _super);
        function MaintaskItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MaintaskItemCfg;
    }(BaseItemCfg));
    __reflect(MaintaskItemCfg.prototype, "MaintaskItemCfg");
    var CommonTaskItemCfg = (function (_super) {
        __extends(CommonTaskItemCfg, _super);
        function CommonTaskItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CommonTaskItemCfg;
    }(BaseItemCfg));
    Config.CommonTaskItemCfg = CommonTaskItemCfg;
    __reflect(CommonTaskItemCfg.prototype, "Config.CommonTaskItemCfg");
})(Config || (Config = {}));
