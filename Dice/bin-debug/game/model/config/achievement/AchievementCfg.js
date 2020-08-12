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
    var AchievementCfg;
    (function (AchievementCfg) {
        var achievementMap = {};
        function formatData(data) {
            var achievementList = data.achievementList;
            if (!achievementList) {
                return;
            }
            for (var key1 in achievementList) {
                if (achievementList.hasOwnProperty(key1)) {
                    var item = achievementList[key1];
                    if (!achievementMap[key1]) {
                        achievementMap[key1] = {};
                    }
                    for (var key2 in item) {
                        if (item.hasOwnProperty(key2)) {
                            var item2 = item[key2];
                            var acItem = new AchievementItemCfg();
                            acItem.initData(item2);
                            achievementMap[key1][key2] = acItem;
                        }
                    }
                }
            }
        }
        AchievementCfg.formatData = formatData;
        function getAchievement() {
            return achievementMap;
        }
        AchievementCfg.getAchievement = getAchievement;
        function getAchieveKeys() {
            var keys = Object.keys(achievementMap);
            return keys;
        }
        AchievementCfg.getAchieveKeys = getAchieveKeys;
        function getAchieveTitle(type) {
            var item = achievementMap[type];
            if (!item) {
                return "配置错误";
            }
            var stage = Api.AchievementVoApi.getStageByID(type);
            var data = item[stage];
            var des = "";
            des = LangMger.getlocal("achievementtitle" + data.type, [String(data.value), String(data.Need1)]);
            return des;
        }
        AchievementCfg.getAchieveTitle = getAchieveTitle;
        function getAchItemCfgByID(id, stage) {
            var cfg = achievementMap[id][stage];
            return cfg;
        }
        AchievementCfg.getAchItemCfgByID = getAchItemCfgByID;
    })(AchievementCfg = Config.AchievementCfg || (Config.AchievementCfg = {}));
    var AchievementItemCfg = (function (_super) {
        __extends(AchievementItemCfg, _super);
        function AchievementItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 0;
            _this.value = 0;
            _this.need1 = 0;
            _this.getReward = "";
            return _this;
        }
        AchievementItemCfg.prototype.initData = function (data) {
            if (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            }
        };
        AchievementItemCfg.prototype.dispose = function () {
            this.type = 0;
            this.value = 0;
            this.need1 = 0;
            this.getReward = "";
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(AchievementItemCfg.prototype, "Need1", {
            get: function () {
                if (this.type === 2002) {
                    return LangMger.getlocal("bridtype" + this.need1);
                }
                else {
                    return this.need1;
                }
            },
            enumerable: true,
            configurable: true
        });
        return AchievementItemCfg;
    }(BaseItemCfg));
    Config.AchievementItemCfg = AchievementItemCfg;
    __reflect(AchievementItemCfg.prototype, "Config.AchievementItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=AchievementCfg.js.map