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
        /**
         * 帮会集结
         * author wxz
         * date 2020.5.12
         * @namespace AggregationCfg
         */
        var AggregationCfg = (function () {
            function AggregationCfg() {
                this.getReward = null;
                this.taskList = [];
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_10631', personBone: "servant_full2_10631", "nameId": "servant_name1063", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 'wife_skin_2371', personBone: "wife_full3_2371", "nameId": "wifeName_237", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_10631", personBone: "servant_full2_10631", "nameId": "servant_name1063", "clickContinue": true },
                    }
                };
            }
            AggregationCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "showTime") {
                        this.extraTime = data[key];
                    }
                    if (key == "task") {
                        this.taskList = [];
                        for (var item in data[key]) {
                            var itemCfg = new AggregationTaskItem();
                            itemCfg.id = item;
                            itemCfg.initData(data[key][item]);
                            this.taskList.push(itemCfg);
                        }
                    }
                }
            };
            AggregationCfg.prototype.getTaskCfg = function () {
                return this.taskList;
            };
            AggregationCfg.prototype.getNeedById = function (id) {
                if (this.task && this.task[id] && this.task[id]["taskValue"]) {
                    return this.task[id]["taskValue"];
                }
                return 0;
            };
            return AggregationCfg;
        }());
        AcCfg.AggregationCfg = AggregationCfg;
        __reflect(AggregationCfg.prototype, "Config.AcCfg.AggregationCfg");
        /**任务奖励item */
        var AggregationTaskItem = (function (_super) {
            __extends(AggregationTaskItem, _super);
            function AggregationTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                _this.taskValue = null;
                /**奖励 */
                _this.getReward1 = null;
                _this.getReward2 = null;
                return _this;
            }
            return AggregationTaskItem;
        }(BaseItemCfg));
        AcCfg.AggregationTaskItem = AggregationTaskItem;
        __reflect(AggregationTaskItem.prototype, "Config.AcCfg.AggregationTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AggregationCfg.js.map