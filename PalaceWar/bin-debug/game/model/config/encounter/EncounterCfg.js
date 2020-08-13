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
    /**
     * 情缘绘卷配置
     */
    var EncounterCfg;
    (function (EncounterCfg) {
        EncounterCfg.encounterList = [];
        EncounterCfg.needLv1 = 0;
        EncounterCfg.needLv2 = 0;
        function formatData(data) {
            // for(let i in data){
            //     encounterList.push(data[i]);
            // }
            var idx = 0;
            for (var i in data) {
                this[i] = data[i];
                var itemCfg = void 0;
                if (!EncounterCfg.encounterList.hasOwnProperty(String(idx))) {
                    EncounterCfg.encounterList[String(idx)] = new EncounterInfoCfg();
                }
                itemCfg = EncounterCfg.encounterList[String(idx)];
                itemCfg.id = idx + 1;
                itemCfg.need = data[i].need;
                itemCfg.kind = data[i].kind;
                itemCfg.turn = data[i].turn;
                itemCfg.coordinateOutside = {};
                for (var j in data[i]["coordinate-Outside"]) {
                    var unit = data[i]["coordinate-Outside"][j].split(',');
                    var needid = data[i].need[j];
                    var id = needid.split("_")[1];
                    itemCfg.coordinateOutside[id] = {
                        x: Number(unit[0]),
                        y: Number(unit[1]),
                    };
                }
                itemCfg.coordinateInside = {};
                for (var j in data[i]["coordinate-Inside"]) {
                    var unit = data[i]["coordinate-Inside"][j].split(',');
                    var needid = data[i].need[j];
                    var id = needid.split("_")[1];
                    itemCfg.coordinateInside[id] = {
                        x: Number(unit[0]),
                        y: Number(unit[1]),
                    };
                }
                itemCfg.coordinateName = {};
                for (var j in data[i]["coordinate-Name"]) {
                    var unit = data[i]["coordinate-Name"][j].split(',');
                    var needid = data[i].need[j];
                    var id = needid.split("_")[1];
                    itemCfg.coordinateName[id] = {
                        x: Number(unit[0]),
                        y: Number(unit[1]),
                    };
                }
                itemCfg.unlock = {};
                for (var j in data[i]["unlock"]) {
                    var unit = data[i]["unlock"][j].split(',');
                    var needid = data[i].need[j];
                    var id = needid.split("_")[1];
                    itemCfg.unlock[id] = {
                        x: Number(unit[0]),
                        y: Number(unit[1]),
                    };
                }
                itemCfg.add = [];
                itemCfg.type = i;
                var taskIndex = 0;
                var taskTmp = data[i][taskIndex + 1];
                itemCfg.process = [];
                itemCfg.collect = [];
                itemCfg.task = [];
                var taskCount = 0;
                var collectCount = 0;
                while (taskTmp) {
                    var encounterTaskItem = new EncounterTaskItemCfg();
                    encounterTaskItem.initData(taskTmp);
                    encounterTaskItem.id = taskIndex + 1;
                    for (var kk in taskTmp) {
                        if (taskTmp.type == 0 && kk != "type" && kk != "reward" && kk != "all_Child" && kk != "task_Value") {
                            var addCfg = new EncounterAddCfg();
                            addCfg.initData(taskTmp[kk]);
                            addCfg.id = kk;
                            encounterTaskItem.data.push(addCfg);
                        }
                        else {
                            if (taskTmp.type > 0 && kk != "type" && kk != "reward" && kk != "task_Value") {
                                var addCfg = new EncounterAddCfg();
                                addCfg.initData(taskTmp[kk]);
                                addCfg.id = kk;
                                encounterTaskItem.data.push(addCfg);
                            }
                        }
                    }
                    itemCfg.process.push(encounterTaskItem);
                    if (encounterTaskItem.type > 0) {
                        taskCount++;
                        encounterTaskItem.index = taskCount;
                        itemCfg.task.push(encounterTaskItem);
                    }
                    else {
                        collectCount++;
                        encounterTaskItem.index = collectCount;
                        itemCfg.collect.push(encounterTaskItem);
                    }
                    taskIndex++;
                    taskTmp = data[i][taskIndex + 1];
                }
                for (var j in data[i]) {
                    var unit = data[i][j];
                    if (j != "need") {
                        var servantinfocfg = new EncounterServantInfoCfg();
                        servantinfocfg.initData(unit);
                        servantinfocfg.addattr = {};
                        for (var k in unit) {
                            if (k != "all_Child" && k != "reward") {
                                var sid = k;
                                var tmp = unit[k];
                                var encounterAdd = new EncounterAddCfg();
                                encounterAdd.initData(tmp);
                                servantinfocfg.addattr[k] = encounterAdd;
                            }
                        }
                        itemCfg.add.push(servantinfocfg);
                    }
                }
                ++idx;
            }
        }
        EncounterCfg.formatData = formatData;
        function getEncountCfgByKind(kind) {
            var data = [];
            for (var k in this.encounterList) {
                var cfg = this.encounterList[k];
                if (cfg.kind == kind) {
                    data.push(cfg);
                }
            }
            if (data.length > 1) {
                data.sort(function (a, b) { return a.turn - b.turn; });
            }
            return data;
        }
        EncounterCfg.getEncountCfgByKind = getEncountCfgByKind;
        var EncounterInfoCfg = (function (_super) {
            __extends(EncounterInfoCfg, _super);
            function EncounterInfoCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * basic 要求人数 need []
                 */
                _this.need = [];
                /**
                 * 坐标配置
                 */
                _this.coordinateOutside = {};
                _this.coordinateInside = {};
                _this.coordinateName = {};
                _this.unlock = {};
                /**
                 * 加成信息
                */
                _this.add = [];
                /**
                 * 进度
                 */
                _this.process = [];
                //收集
                _this.collect = [];
                //养成任务
                _this.task = [];
                _this.collectOpen = false;
                _this.taskOpen = false;
                //选中的id
                _this.tabIndex = 1;
                //排序id
                _this.turn = 0;
                return _this;
            }
            return EncounterInfoCfg;
        }(BaseItemCfg));
        EncounterCfg.EncounterInfoCfg = EncounterInfoCfg;
        __reflect(EncounterInfoCfg.prototype, "Config.EncounterCfg.EncounterInfoCfg");
        var EncounterTaskItemCfg = (function (_super) {
            __extends(EncounterTaskItemCfg, _super);
            function EncounterTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.data = [];
                _this.reward = null;
                _this.type = 0;
                _this.task_Value = 0;
                _this.all_Child = 0;
                _this.index = 0;
                return _this;
            }
            return EncounterTaskItemCfg;
        }(BaseItemCfg));
        EncounterCfg.EncounterTaskItemCfg = EncounterTaskItemCfg;
        __reflect(EncounterTaskItemCfg.prototype, "Config.EncounterCfg.EncounterTaskItemCfg");
        var EncounterServantInfoCfg = (function (_super) {
            __extends(EncounterServantInfoCfg, _super);
            function EncounterServantInfoCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 加成信息
                */
                _this.addattr = {};
                _this.all_Child = 0;
                _this.reward = "";
                return _this;
            }
            return EncounterServantInfoCfg;
        }(BaseItemCfg));
        EncounterCfg.EncounterServantInfoCfg = EncounterServantInfoCfg;
        __reflect(EncounterServantInfoCfg.prototype, "Config.EncounterCfg.EncounterServantInfoCfg");
        // --need:需求
        // --strength:武力百分比
        // --intelligence:智力百分比
        // --politics:政治百分比
        // --charm:魅力百分比
        // --all:全属性百分比
        // --strength_Constant:武力固定值
        // --intelligence_Constant:智力固定值
        // --politics_Constant:政治固定值
        // --charm_Constant:魅力固定值
        // --all_Constant:全属性固定值
        // --wife_Intimacy :红颜亲密度固定值
        // --wife_Charm:红颜魅力固定值
        // --wife_exp:红颜经验加成百分比
        // --wife_Child:对应红颜子嗣属性加成百分比
        // --all_Child:所有子嗣属性加成百分比
        // --getReward:奖励道具
        //task_Value:情缘任务需求值
        //type:组内id类型
        //--specialType:特殊属性增加
        //--specialValue:特殊属性的增加值
        var EncounterAddCfg = (function (_super) {
            __extends(EncounterAddCfg, _super);
            function EncounterAddCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.strength = 0;
                _this.intelligence = 0;
                _this.politics = 0;
                _this.charm = 0;
                _this.all = 0;
                _this.strength_Constant = 0;
                _this.intelligence_Constant = 0;
                _this.politics_Constant = 0;
                _this.charm_Constant = 0;
                _this.all_Constant = 0;
                _this.wife_Intimacy = 0;
                _this.wife_Charm = 0;
                _this.wife_exp = 0;
                _this.wife_Child = 0;
                _this.type = 0;
                _this.task_Value = 0;
                _this.specialValue = 0;
                _this.specialType = 0;
                _this.id = null;
                return _this;
            }
            return EncounterAddCfg;
        }(BaseItemCfg));
        EncounterCfg.EncounterAddCfg = EncounterAddCfg;
        __reflect(EncounterAddCfg.prototype, "Config.EncounterCfg.EncounterAddCfg");
    })(EncounterCfg = Config.EncounterCfg || (Config.EncounterCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=EncounterCfg.js.map