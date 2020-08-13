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
        var JadeCfg = (function () {
            function JadeCfg() {
                this.cost = 0;
                this.rankListlim = 0;
                this.totalListmin = 0;
                this.rankList = [];
                this.totalList = [];
                this.taskList = [];
            }
            /**
             * 初始化数据
             */
            JadeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    // this[`${key}`]=data[key];
                    if (key == "cost") {
                        this.cost = data[key];
                    }
                    if (key == "rankListlim") {
                        this.rankListlim = data[key];
                    }
                    if (key == "totalListmin") {
                        this.totalListmin = data[key];
                    }
                    if (key == "rankList") {
                        this.rankList = [];
                        //  for(let i = 0;i < data[key].length;i++)
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new JadeRankItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.rankList.push(itemcfg);
                            i++;
                        }
                    }
                    if (key == "totalList") {
                        this.totalList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new JadeTotalItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.totalList.push(itemcfg);
                            i++;
                        }
                        this.totalList.sort(function (a, b) {
                            return Number(b.id) - Number(a.id);
                        });
                    }
                    if (key == "task") {
                        this.taskList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new JadeTaskItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.taskList.push(itemcfg);
                            i++;
                        }
                    }
                }
            };
            JadeCfg.prototype.getRankList = function () {
                return this.rankList;
            };
            JadeCfg.prototype.getTotalList = function () {
                return this.totalList;
            };
            /**
             * 获得任务列表
             */
            JadeCfg.prototype.getTaskList = function () {
                return this.taskList;
            };
            JadeCfg.prototype.getTaskValue = function (id) {
                for (var i = 0; i < this.taskList.length; i++) {
                    if (id = this.taskList[i].id) {
                        return this.taskList[i].value;
                    }
                }
                return null;
            };
            return JadeCfg;
        }());
        AcCfg.JadeCfg = JadeCfg;
        __reflect(JadeCfg.prototype, "Config.AcCfg.JadeCfg");
        /**
         * 排名奖励
         */
        var JadeRankItemCfg = (function (_super) {
            __extends(JadeRankItemCfg, _super);
            function JadeRankItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            JadeRankItemCfg.prototype.initData = function (data) {
                if (data) {
                    for (var key in data) {
                        if (key == "rank") {
                            this.rankV1 = data[key][0];
                            this.rankV2 = data[key][1];
                        }
                        else {
                            this[key] = data[key];
                        }
                    }
                }
            };
            return JadeRankItemCfg;
        }(BaseItemCfg));
        AcCfg.JadeRankItemCfg = JadeRankItemCfg;
        __reflect(JadeRankItemCfg.prototype, "Config.AcCfg.JadeRankItemCfg");
        /**
         * 累计奖励
         */
        var JadeTotalItemCfg = (function (_super) {
            __extends(JadeTotalItemCfg, _super);
            function JadeTotalItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            JadeTotalItemCfg.prototype.initData = function (data) {
                if (data) {
                    for (var key in data) {
                        // this[key]=data[key];
                        if (key == "rank") {
                            this.rankV1 = data[key][0];
                            this.rankV2 = data[key][1];
                        }
                        else {
                            this[key] = data[key];
                        }
                    }
                }
            };
            return JadeTotalItemCfg;
        }(BaseItemCfg));
        AcCfg.JadeTotalItemCfg = JadeTotalItemCfg;
        __reflect(JadeTotalItemCfg.prototype, "Config.AcCfg.JadeTotalItemCfg");
        /**
         * 任务的
         */
        var JadeTaskItemCfg = (function (_super) {
            __extends(JadeTaskItemCfg, _super);
            function JadeTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return JadeTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.JadeTaskItemCfg = JadeTaskItemCfg;
        __reflect(JadeTaskItemCfg.prototype, "Config.AcCfg.JadeTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
