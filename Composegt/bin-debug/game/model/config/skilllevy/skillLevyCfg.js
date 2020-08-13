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
    var SkilllevyCfg;
    (function (SkilllevyCfg) {
        var skillLevyData = {};
        var skillLevyList = [];
        function formatData(data) {
            skillLevyData = {};
            skillLevyList = [];
            for (var sid in data) {
                var _item = new SkillLevyCfgItem();
                _item.skillId = sid;
                _item.levyId = data[sid].levyId;
                _item.addValue = data[sid].addValue;
                _item.unlockLevel = data[sid].unlockLevel;
                skillLevyData[sid] = _item;
                skillLevyList.push(_item);
            }
        }
        SkilllevyCfg.formatData = formatData;
        /**
         * 根据技能ID获取技能
         */
        function getSkillLevyById(skillId) {
            return skillLevyData[skillId];
        }
        SkilllevyCfg.getSkillLevyById = getSkillLevyById;
        /**
         * 根据门客ID获取技能
         */
        function getSkillLevyByServantId(servantId) {
            var _servant = Config.ServantCfg.getServantItemById(servantId);
            if (_servant.skillLevy) {
                return Config.SkilllevyCfg.getSkillLevyById(_servant.skillLevy);
            }
            else {
                return null;
            }
        }
        SkilllevyCfg.getSkillLevyByServantId = getSkillLevyByServantId;
        /**
         * 获取所有技能
         */
        function getAllSkillLevy() {
            return skillLevyList;
        }
        SkilllevyCfg.getAllSkillLevy = getAllSkillLevy;
    })(SkilllevyCfg = Config.SkilllevyCfg || (Config.SkilllevyCfg = {}));
    var SkillLevyCfgItem = (function (_super) {
        __extends(SkillLevyCfgItem, _super);
        function SkillLevyCfgItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SkillLevyCfgItem.prototype, "skillName", {
            /**技能名 */
            get: function () {
                return LanguageManager.getlocal("skillLevy_name" + this.skillId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillLevyCfgItem.prototype, "skillDes", {
            /**技能描述 */
            get: function () {
                var _levyName = LanguageManager.getlocal("levy_levyitem_title" + this.levyId);
                var _upNum = this.addValue * 100;
                return LanguageManager.getlocal("levy_skill_des", [_levyName, _upNum.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SkillLevyCfgItem.prototype, "skillIconKey", {
            /**技能图标 */
            get: function () {
                return "skillLevy_icon" + this.skillId;
            },
            enumerable: true,
            configurable: true
        });
        return SkillLevyCfgItem;
    }(BaseItemCfg));
    Config.SkillLevyCfgItem = SkillLevyCfgItem;
    __reflect(SkillLevyCfgItem.prototype, "Config.SkillLevyCfgItem");
})(Config || (Config = {}));
