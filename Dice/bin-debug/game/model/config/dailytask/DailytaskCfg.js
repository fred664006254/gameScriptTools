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
    var DailytaskCfg;
    (function (DailytaskCfg) {
        var mustTasks = {};
        var randomTasks = {};
        function formatData(data) {
            if (!data)
                return;
            for (var key in data.mustTask) {
                var item = void 0;
                if (!mustTasks.hasOwnProperty(String(key))) {
                    mustTasks[String(key)] = new MustTaskCfg();
                }
                item = mustTasks[String(key)];
                item.initData(data.mustTask[key]);
                item.id = String(key);
            }
            for (var key in data.randomTask) {
                var item = void 0;
                if (!randomTasks.hasOwnProperty(String(key))) {
                    randomTasks[String(key)] = new RandomTaskCfg();
                }
                item = randomTasks[String(key)];
                item.initData(data.randomTask[key]);
                item.id = String(key);
            }
        }
        DailytaskCfg.formatData = formatData;
        function getMustTaskByID(taskID) {
            return mustTasks[taskID];
        }
        DailytaskCfg.getMustTaskByID = getMustTaskByID;
        function getMustTaskGold(taskID) {
            var num = 0;
            if (Api.UserinfoVoApi.getLevel() >= mustTasks[taskID].gold.length) {
                num = mustTasks[taskID].gold[mustTasks[taskID].gold.length - 1];
            }
            else if (Api.UserinfoVoApi.getLevel() <= 1) {
                num = mustTasks[taskID].gold[0];
            }
            else {
                num = mustTasks[taskID].gold[Api.UserinfoVoApi.getLevel() - 1];
            }
            return num;
        }
        DailytaskCfg.getMustTaskGold = getMustTaskGold;
        function getMustTaskGem(taskID) {
            var num = 0;
            if (Api.UserinfoVoApi.getLevel() >= mustTasks[taskID].gem.length) {
                num = mustTasks[taskID].gem[mustTasks[taskID].gem.length - 1];
            }
            else if (Api.UserinfoVoApi.getLevel() <= 1) {
                num = mustTasks[taskID].gem[0];
            }
            else {
                num = mustTasks[taskID].gem[Api.UserinfoVoApi.getLevel() - 1];
            }
            return num;
        }
        DailytaskCfg.getMustTaskGem = getMustTaskGem;
        function getMustTaskCard(taskID) {
            var num = 0;
            if (Api.UserinfoVoApi.getLevel() >= mustTasks[taskID].card1Num.length) {
                num = mustTasks[taskID].card1Num[mustTasks[taskID].card1Num.length - 1];
            }
            else if (Api.UserinfoVoApi.getLevel() <= 1) {
                num = mustTasks[taskID].card1Num[0];
            }
            else {
                num = mustTasks[taskID].card1Num[Api.UserinfoVoApi.getLevel() - 1];
            }
            return num;
        }
        DailytaskCfg.getMustTaskCard = getMustTaskCard;
        function getMustTaskReward(taskID, rewardID) {
            switch (rewardID) {
                case 0:
                    return getMustTaskGold(taskID);
                case 1:
                    return getMustTaskGem(taskID);
                case 2:
                    return getMustTaskCard(taskID);
                default:
                    break;
            }
        }
        DailytaskCfg.getMustTaskReward = getMustTaskReward;
        function getRandomTaskByID(taskID) {
            return randomTasks[taskID];
        }
        DailytaskCfg.getRandomTaskByID = getRandomTaskByID;
        function getRandomTaskGoldByID(taskID) {
            var level = Api.UserinfoVoApi.getLevel();
            return randomTasks[taskID].gold[level] ? randomTasks[taskID].gold[level] : 0;
        }
        DailytaskCfg.getRandomTaskGoldByID = getRandomTaskGoldByID;
        function getRandomTaskGemByID(taskID) {
            var level = Api.UserinfoVoApi.getLevel();
            return randomTasks[taskID].gem[level] ? randomTasks[taskID].gem[level] : 0;
        }
        DailytaskCfg.getRandomTaskGemByID = getRandomTaskGemByID;
    })(DailytaskCfg = Config.DailytaskCfg || (Config.DailytaskCfg = {}));
    /**
     * 每日刷新任务
     */
    var MustTaskCfg = (function (_super) {
        __extends(MustTaskCfg, _super);
        function MustTaskCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 每日任务的金币奖励，这个跟等级有关系
             */
            _this.gold = [];
            /**
             * 每日任务的砖石奖励，跟等级有关系
             */
            _this.gem = [];
            /**
             * 每日任务的卡牌建立，跟等级有关系
             */
            _this.card1Num = [];
            return _this;
        }
        return MustTaskCfg;
    }(BaseItemCfg));
    Config.MustTaskCfg = MustTaskCfg;
    __reflect(MustTaskCfg.prototype, "Config.MustTaskCfg");
    var RandomTaskCfg = (function (_super) {
        __extends(RandomTaskCfg, _super);
        function RandomTaskCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 任务 ID
             */
            _this.id = '';
            /**
             * 任务权重
             */
            _this.weight = 0;
            /**
             * 任务类型
             */
            _this.taskType = '';
            /**
             * 任务值
             */
            _this.value = 0;
            /**
             * 任务额外参数 1
             */
            _this.need1 = 0;
            /**
             * 任务额外参数 2
             */
            _this.need2 = 0;
            return _this;
        }
        Object.defineProperty(RandomTaskCfg.prototype, "lvgold", {
            /**
             * 获取等级对应的金币
             */
            get: function () {
                var level = Api.UserinfoVoApi.getLevel();
                var g = 0;
                if (level < 0) {
                    g = 0;
                }
                else if (level > this.gold.length) {
                    g = this.gold[this.gold.length - 1];
                }
                else {
                    g = this.gold[level - 1];
                }
                return !g ? 0 : g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RandomTaskCfg.prototype, "lvgem", {
            /**
             * 获取等级对应的钻石
             */
            get: function () {
                var level = Api.UserinfoVoApi.getLevel();
                if (level < 0) {
                    return 0;
                }
                else if (level >= this.gold.length) {
                    return !this.gem[this.gem.length - 1] ? 0 : this.gem[this.gem.length - 1];
                }
                else {
                    return !this.gem[level - 1] ? 0 : this.gem[level - 1];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RandomTaskCfg.prototype, "rewardStr", {
            get: function () {
                return "2_1_" + this.lvgold + "|1_1_" + this.lvgem;
            },
            enumerable: true,
            configurable: true
        });
        RandomTaskCfg.prototype.dispose = function () {
            this.gem = [];
            this.gold = [];
            this.id = '';
            this.need1 = 0;
            this.need2 = 0;
            this.taskType = '';
            this.value = 0;
            this.weight = 0;
        };
        return RandomTaskCfg;
    }(BaseItemCfg));
    Config.RandomTaskCfg = RandomTaskCfg;
    __reflect(RandomTaskCfg.prototype, "Config.RandomTaskCfg");
})(Config || (Config = {}));
//# sourceMappingURL=DailytaskCfg.js.map