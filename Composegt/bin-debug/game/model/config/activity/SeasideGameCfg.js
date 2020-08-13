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
        var SeasideGameCfg = (function () {
            function SeasideGameCfg() {
                this.AVGDialog_code1 = {
                    first: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true, "resEndId": "204" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_skin_2041", "nameId": "wifeName_204", "clickContinue": true, "resEndId": "204" },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "204" },
                        "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "wife_skin_2041", "nameId": "wifeName_204", "clickContinue": true, "resEndId": "204" },
                        "5": { "nextId": "6", "descId": 5, "bgId": 6, "personPic": "servant_full_1001", "nameId": "servant_name1001", "clickContinue": true, "resEndId": "204" },
                        "6": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "204" },
                    }
                };
            }
            //解析数据
            SeasideGameCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new SeasideGameTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                    }
                }
            };
            SeasideGameCfg.prototype.getTaskListById = function (groupId) {
                var length = this.taskList.length;
                var taskList = [];
                for (var i = 0; i < length; i++) {
                    if (this.taskList[i].group == groupId) {
                        taskList.push(this.taskList[i]);
                    }
                }
                return taskList;
            };
            SeasideGameCfg.prototype.getMaxBoxNeedNum = function () {
                return this.drawNum[this.drawNum.length - 1].needNum;
            };
            /**
             * 获得任务列表
             */
            SeasideGameCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            SeasideGameCfg.prototype.getDialogById = function (id, code) {
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
                else {
                    return this["AVGDialog_code" + ccode]["id" + id];
                }
            };
            return SeasideGameCfg;
        }());
        AcCfg.SeasideGameCfg = SeasideGameCfg;
        __reflect(SeasideGameCfg.prototype, "Config.AcCfg.SeasideGameCfg");
        /**
         * 任务的
         */
        var SeasideGameTaskItemCfg = (function (_super) {
            __extends(SeasideGameTaskItemCfg, _super);
            function SeasideGameTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //跳转
                _this.openType = null;
                return _this;
            }
            return SeasideGameTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.SeasideGameTaskItemCfg = SeasideGameTaskItemCfg;
        __reflect(SeasideGameTaskItemCfg.prototype, "Config.AcCfg.SeasideGameTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
