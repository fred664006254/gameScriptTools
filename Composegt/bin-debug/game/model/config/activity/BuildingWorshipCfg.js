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
        var BuildingWorshipCfg = (function () {
            function BuildingWorshipCfg() {
                this.AVGDialog_code4 = {
                    first: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true, "resEndId": "234" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_full_234", "nameId": "wifeName_234", "clickContinue": true, "resEndId": "234" },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "234" },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "wife_full_234", "nameId": "wifeName_234", "clickContinue": true, "resEndId": "234" },
                        "5": { "nextId": "6", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "234" },
                        "6": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "wife_full_234", "nameId": "wifeName_234", "clickContinue": true, "resEndId": "234" },
                    },
                };
            }
            //解析数据
            BuildingWorshipCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new BuildingWorshipTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                    }
                }
            };
            BuildingWorshipCfg.prototype.getDialogById = function (id, code) {
                var ccode = null;
                if (this["AVGDialog_code" + code]) {
                    ccode = code;
                }
                else {
                    ccode = 1;
                }
                if (id == "first") {
                    return this["AVGDialog_code" + ccode]["first"];
                }
            };
            BuildingWorshipCfg.prototype.getMaxBoxNeedNum = function () {
                return this.lotteryNum[this.lotteryNum.length - 1].needNum;
            };
            /**
             * 获得任务列表
             */
            BuildingWorshipCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            return BuildingWorshipCfg;
        }());
        AcCfg.BuildingWorshipCfg = BuildingWorshipCfg;
        __reflect(BuildingWorshipCfg.prototype, "Config.AcCfg.BuildingWorshipCfg");
        /**
         * 任务的
         */
        var BuildingWorshipTaskItemCfg = (function (_super) {
            __extends(BuildingWorshipTaskItemCfg, _super);
            function BuildingWorshipTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return BuildingWorshipTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.BuildingWorshipTaskItemCfg = BuildingWorshipTaskItemCfg;
        __reflect(BuildingWorshipTaskItemCfg.prototype, "Config.AcCfg.BuildingWorshipTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
