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
        var CourtDutyCfg = (function () {
            function CourtDutyCfg() {
                this.yaMenTaskList = [];
                this.huangBangTaskList = [];
            }
            CourtDutyCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "yaMenTask") {
                        this.yaMenTaskList = [];
                        var count = 0;
                        var cfgArr = data[key];
                        App.LogUtil.log("cfgArr: " + cfgArr.length);
                        for (var i = 0; i < cfgArr.length; i++) {
                            // let dataList:CourtDutyTaskItem[] = [];
                            for (var k = 0; k < cfgArr[i].length; k++) {
                                count += 1;
                                var itemCfg = new CourtDutyTaskItem();
                                itemCfg.initData(cfgArr[i][k]);
                                itemCfg.id = count;
                                itemCfg.taskId = i + 1;
                                itemCfg.rKey = k + 1;
                                // dataList[k] = itemCfg;
                                this.yaMenTaskList.push(itemCfg);
                            }
                        }
                    }
                    else if (key == "huangBangTask") {
                        this.huangBangTaskList = [];
                        var count = 0;
                        var cfgArr = data[key];
                        App.LogUtil.log("cfgArr huangBangTask: " + cfgArr.length);
                        for (var i = 0; i < cfgArr.length; i++) {
                            // let dataList:CourtDutyTaskItem[] = [];
                            for (var k = 0; k < cfgArr[i].length; k++) {
                                var itemCfg = new CourtDutyTaskItem();
                                itemCfg.initData(cfgArr[i][k]);
                                count += 1;
                                itemCfg.id = count;
                                itemCfg.taskId = i + 1;
                                itemCfg.rKey = k + 1;
                                // dataList[k] = itemCfg;
                                this.huangBangTaskList.push(itemCfg);
                            }
                        }
                    }
                }
            };
            CourtDutyCfg.prototype.getYaMenTaskList = function () {
                return this.yaMenTaskList;
            };
            CourtDutyCfg.prototype.getHuangBangTaskList = function () {
                return this.huangBangTaskList;
            };
            return CourtDutyCfg;
        }());
        AcCfg.CourtDutyCfg = CourtDutyCfg;
        __reflect(CourtDutyCfg.prototype, "Config.AcCfg.CourtDutyCfg");
        /**item */
        var CourtDutyTaskItem = (function (_super) {
            __extends(CourtDutyTaskItem, _super);
            function CourtDutyTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.taskId = null;
                _this.id = null;
                _this.rKey = null;
                _this.openType = "";
                _this.questType = null;
                _this.getReward = null;
                _this.value = null;
                _this.sortId = 0;
                return _this;
            }
            return CourtDutyTaskItem;
        }(BaseItemCfg));
        AcCfg.CourtDutyTaskItem = CourtDutyTaskItem;
        __reflect(CourtDutyTaskItem.prototype, "Config.AcCfg.CourtDutyTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CourtDutyCfg.js.map