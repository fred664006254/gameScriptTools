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
     * 成就配置
     */
    var AchievementCfg;
    (function (AchievementCfg) {
        var achievenmentListCfg = [];
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!achievenmentListCfg.hasOwnProperty(String(key))) {
                    achievenmentListCfg[String(key)] = new AchievementItemCfg();
                }
                itemCfg = achievenmentListCfg[String(key)];
                itemCfg.id = String(key);
                itemCfg.initData(data[key]);
            }
        }
        AchievementCfg.formatData = formatData;
        function getAchievementCfgById(id) {
            return achievenmentListCfg[String(id)];
        }
        AchievementCfg.getAchievementCfgById = getAchievementCfgById;
        function getAchievemenCfgList() {
            return achievenmentListCfg;
        }
        AchievementCfg.getAchievemenCfgList = getAchievemenCfgList;
        /**
         * 获取最大长度
         */
        function getMaxLength() {
            return Object.keys(achievenmentListCfg).length;
        }
        AchievementCfg.getMaxLength = getMaxLength;
    })(AchievementCfg = Config.AchievementCfg || (Config.AchievementCfg = {}));
    var AchievementItemCfg = (function (_super) {
        __extends(AchievementItemCfg, _super);
        function AchievementItemCfg() {
            return _super.call(this) || this;
        }
        Object.defineProperty(AchievementItemCfg.prototype, "value", {
            get: function () {
                if (this.id == "106") {
                    var tmpValue = [];
                    var maxCh = ChallengeCfg.getChallengeTotalPass();
                    for (var index = 0; index < this._value.length; index++) {
                        if (this._value[index] > maxCh) {
                            break;
                        }
                        tmpValue.push(this._value[index]);
                    }
                    return tmpValue;
                }
                return this._value;
            },
            set: function (values) {
                this._value = values;
            },
            enumerable: true,
            configurable: true
        });
        AchievementItemCfg.prototype.getMaxV = function () {
            var val = this.value;
            return val[val.length - 1];
        };
        Object.defineProperty(AchievementItemCfg.prototype, "name", {
            /**成就名称 */
            get: function () {
                return LanguageManager.getlocal("achievementName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievementItemCfg.prototype, "acIcon", {
            /**成就icon */
            get: function () {
                var str = "achievementicon_" + this.icon;
                if (Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(str + "_blueType")) {
                    str = str + "_blueType";
                }
                return str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievementItemCfg.prototype, "nameIcon", {
            /**成就icon */
            get: function () {
                var str = "achievementname_" + this.icon;
                if (Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(str + "_blueType")) {
                    str = str + "_blueType";
                }
                return str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievementItemCfg.prototype, "isShieldWhenShenhe", {
            /**
             * 是否需要屏蔽审核服
             */
            get: function () {
                if (Api.switchVoApi.checkOpenShenhe()) {
                    if (this.id == "703") {
                        return true;
                    }
                }
                return false;
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