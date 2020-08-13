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
        var SpringOutingCfg = (function () {
            function SpringOutingCfg() {
                this.rechargeCost = 0;
                this.cost = 0;
                this.getReward = null;
                this.taskList = null;
                this.sceneNum = 9;
                this.AVGDialog_code1 = {
                    first: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id0: {
                        "1": { "nextId": "2", "descId": 4, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id1: {
                        "1": { "nextId": "2", "descId": 7, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 8, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": null, "descId": 9, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id2: {
                        "1": { "nextId": "2", "descId": 10, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 11, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": "4", "descId": 12, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "4": { "nextId": null, "descId": 13, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id3: {
                        "1": { "nextId": "2", "descId": 14, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": null, "descId": 16, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id4: {
                        "1": { "nextId": "2", "descId": 17, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 18, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": null, "descId": 19, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id5: {
                        "1": { "nextId": "2", "descId": 20, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 21, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": "4", "descId": 22, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "4": { "nextId": "5", "descId": 23, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "5": { "nextId": null, "descId": 24, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                    id6: {
                        "1": { "nextId": "2", "descId": 25, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                        "2": { "nextId": "3", "descId": 26, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "107" },
                        "3": { "nextId": null, "descId": 27, "bgId": 6, "personPic": "wife_skin_1071", "nameId": "wifeName_107", "clickContinue": true, "resEndId": "107" },
                    },
                };
                this.AVGDialog_code3 = {
                    first: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": null, "descId": 3, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id0: {
                        "1": { "nextId": "2", "descId": 4, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id1: {
                        "1": { "nextId": "2", "descId": 7, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 8, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": null, "descId": 9, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id2: {
                        "1": { "nextId": "2", "descId": 10, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 11, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": "4", "descId": 12, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "4": { "nextId": null, "descId": 13, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id3: {
                        "1": { "nextId": "2", "descId": 14, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 15, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": null, "descId": 16, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id4: {
                        "1": { "nextId": "2", "descId": 17, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 18, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": null, "descId": 19, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id5: {
                        "1": { "nextId": "2", "descId": 20, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 21, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": "4", "descId": 22, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "4": { "nextId": "5", "descId": 23, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "5": { "nextId": null, "descId": 24, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                    id6: {
                        "1": { "nextId": "2", "descId": 25, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                        "2": { "nextId": "3", "descId": 26, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "220" },
                        "3": { "nextId": null, "descId": 27, "bgId": 6, "personPic": "wife_skin_2201", "nameId": "wifeName_220", "clickContinue": true, "resEndId": "220" },
                    },
                };
            }
            SpringOutingCfg.prototype.getCost = function () {
                return this.cost;
            };
            SpringOutingCfg.prototype.getRechargeCost = function () {
                return this.rechargeCost;
            };
            /**
             * 初始化数据
             */
            SpringOutingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "task") {
                        this.taskList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemCfg = new SpringOutingTaskItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(i + 1);
                            this.taskList.push(itemCfg);
                            i++;
                        }
                    }
                }
            };
            SpringOutingCfg.prototype.getMaxBoxNeedNum = function () {
                return this.lotteryNum[this.lotteryNum.length - 1].needNum;
            };
            /**
             * 获得任务列表
             */
            SpringOutingCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            SpringOutingCfg.prototype.getDialogById = function (id, code) {
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
            return SpringOutingCfg;
        }());
        AcCfg.SpringOutingCfg = SpringOutingCfg;
        __reflect(SpringOutingCfg.prototype, "Config.AcCfg.SpringOutingCfg");
        /**
         * 任务的
         */
        var SpringOutingTaskItemCfg = (function (_super) {
            __extends(SpringOutingTaskItemCfg, _super);
            function SpringOutingTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return SpringOutingTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.SpringOutingTaskItemCfg = SpringOutingTaskItemCfg;
        __reflect(SpringOutingTaskItemCfg.prototype, "Config.AcCfg.SpringOutingTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
