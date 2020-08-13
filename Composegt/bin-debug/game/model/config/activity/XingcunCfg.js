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
        var XingcunCfg = (function () {
            function XingcunCfg() {
                this.totalScoreReward = undefined;
                this.dailyTask = {}; //string:XingcunTaskCfg[] }[] = [];
                this.completeTaskReward = [];
            }
            XingcunCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (key == "dailyTask") {
                            for (var key2 in data["dailyTask"]) {
                                if (!this.dailyTask[key2]) {
                                    this.dailyTask[key2] = [];
                                }
                                var daydata = data["dailyTask"][key2];
                                for (var key3 in daydata) {
                                    if (daydata.hasOwnProperty(key3)) {
                                        var element = daydata[key3];
                                        var task = new XingcunTaskCfg();
                                        task.initData(element);
                                        task.id = key3;
                                        this.dailyTask[key2].push(task);
                                    }
                                }
                            }
                        }
                        else {
                            this[key] = data[key];
                        }
                    }
                }
            };
            XingcunCfg.prototype.getRewardSerId = function () {
                var reward = this.totalScoreReward.reward;
                return reward.split("_")[1];
            };
            return XingcunCfg;
        }());
        AcCfg.XingcunCfg = XingcunCfg;
        __reflect(XingcunCfg.prototype, "Config.AcCfg.XingcunCfg");
        var XingcunTaskCfg = (function (_super) {
            __extends(XingcunTaskCfg, _super);
            function XingcunTaskCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return XingcunTaskCfg;
        }(BaseItemCfg));
        AcCfg.XingcunTaskCfg = XingcunTaskCfg;
        __reflect(XingcunTaskCfg.prototype, "Config.AcCfg.XingcunTaskCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
