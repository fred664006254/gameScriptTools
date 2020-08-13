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
    var ServantskillCfg;
    (function (ServantskillCfg) {
        var servantSkillListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!servantSkillListCfg.hasOwnProperty(String(key))) {
                    servantSkillListCfg[String(key)] = new ServantskillItemCfg();
                }
                itemCfg = servantSkillListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.id = String(key);
            }
        }
        ServantskillCfg.formatData = formatData;
        function hasSpecialSkill(seravntId) {
            var cfg = Config.ServantCfg.getServantItemById(seravntId);
            return typeof cfg.skillActive != "undefined";
        }
        ServantskillCfg.hasSpecialSkill = hasSpecialSkill;
        function getSpecialSkill(seravntId) {
            var arr = [];
            if (this.hasSpecialSkill(seravntId)) {
                var id = 1;
                while (servantSkillListCfg["" + seravntId + id]) {
                    arr.push("" + seravntId + id);
                    ++id;
                }
            }
            return arr;
        }
        ServantskillCfg.getSpecialSkill = getSpecialSkill;
        function getSpecialSkillItemCfg(skillId) {
            return servantSkillListCfg[skillId];
        }
        ServantskillCfg.getSpecialSkillItemCfg = getSpecialSkillItemCfg;
        /**
         * 获取技能名
         */
        function getSkillNameById(skillId) {
            return LanguageManager.getlocal("servant_skillname" + skillId);
        }
        ServantskillCfg.getSkillNameById = getSkillNameById;
        /**获取技能ICON */
        function getSkillIconKeyById(skillId) {
            var res = "servant_skill_icon" + skillId;
            if (!RES.hasRes(res)) {
                res = 'servant_skill_icon1';
            }
            return res;
        }
        ServantskillCfg.getSkillIconKeyById = getSkillIconKeyById;
    })(ServantskillCfg = Config.ServantskillCfg || (Config.ServantskillCfg = {}));
    var ServantskillItemCfg = (function (_super) {
        __extends(ServantskillItemCfg, _super);
        function ServantskillItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServantskillItemCfg.prototype.getDescStr = function () {
            var str = '';
            //触发方式
            for (var i = 0; i < this.effect.length; ++i) {
                var unit = this.effect[i];
                if (unit.triggerType) {
                    str += LanguageManager.getlocal("servantSkillDesc_Special_triggerType" + unit.triggerType, [unit.percent + '']) + "\uFF0C";
                }
                if (unit.effectType) {
                    var arr = [];
                    if (unit.addType) {
                        var str_1 = LanguageManager.getlocal("servantSkillDesc_Special_addType" + unit.addType, [unit.addNum + '']);
                        arr.push(str_1);
                    }
                    if (unit.atkNum) {
                        arr.push(unit.atkNum + "");
                    }
                    var value = '';
                    if (unit.atkscale) {
                        value = unit.atkscale < 1 ? (unit.atkscale * 100).toFixed(0) : unit.atkscale.toString();
                    }
                    else if (unit.value) {
                        value = unit.value < 1 ? (unit.value * 100).toFixed(0) : unit.value.toString();
                    }
                    arr.push(value);
                    str += LanguageManager.getlocal("servantSkillDesc_Special_effectType" + unit.effectType, arr) + "\uFF0C";
                }
                if (unit.maxNum) {
                    str += LanguageManager.getlocal("servantSkillDesc_Special_maxNum" + (unit.maxNum == 1 ? 1 : 2), [unit.maxNum + '']) + "\uFF0C";
                }
                if (unit.turn) {
                    str += LanguageManager.getlocal("servantSkillDesc_Special_turn", [unit.turn + '']) + "\uFF0C";
                }
                str = str.substring(0, str.length - 1) + "\n";
            }
            return str;
        };
        return ServantskillItemCfg;
    }(BaseItemCfg));
    __reflect(ServantskillItemCfg.prototype, "ServantskillItemCfg");
})(Config || (Config = {}));
