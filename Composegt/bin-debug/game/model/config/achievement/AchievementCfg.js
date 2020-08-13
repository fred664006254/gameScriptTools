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
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
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
                return "achievementicon_" + this.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AchievementItemCfg.prototype, "nameIcon", {
            /**成就icon */
            get: function () {
                return "achievementname_" + this.icon;
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
