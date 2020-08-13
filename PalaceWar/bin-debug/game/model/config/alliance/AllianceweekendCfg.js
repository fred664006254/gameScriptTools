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
     * 帮战配置
     */
    var AllianceweekendCfg;
    (function (AllianceweekendCfg) {
        /**展示期 */
        AllianceweekendCfg.extraTime = 0;
        /**帮会等级限制 */
        AllianceweekendCfg.allianceLv = 0;
        /**开启时间 */
        AllianceweekendCfg.openTime = 0;
        /**战力符购买，全帮生效 */
        AllianceweekendCfg.powerUp = null;
        /** 门客出战恢复道具 */
        AllianceweekendCfg.needItem = null;
        /** 敌军属性 */
        AllianceweekendCfg.foeItemCfgList = [];
        /** 个人贡献 */
        AllianceweekendCfg.peScoreItemCfgList = [];
        /** npc配置 */
        AllianceweekendCfg.npcCfgList = [
            "story_npc_2",
            "story_npc_5",
            "dailyboss_lv_3",
            "story_npc_3",
            "story_npc_4",
            "dailyboss_lv_4",
            "dailyboss_lv_2",
            "story_npc_9",
            "wipeboss5",
            "wipeboss4",
            "dailyboss_lv_5",
            "wipeboss6",
            "wipeboss7",
        ];
        /** 初始化数据*/
        function formatData(data) {
            AllianceweekendCfg.extraTime = data.extraTime;
            AllianceweekendCfg.allianceLv = data.allianceLv;
            AllianceweekendCfg.openTime = data.openTime;
            AllianceweekendCfg.powerUp = data.powerUp;
            AllianceweekendCfg.needItem = data.needItem;
            for (var i = 0; i < data.foe.length; i++) {
                var itemCfg = new FoeItemCfg();
                itemCfg.initData(data.foe[i]);
                itemCfg.id = Number(i) + 1;
                itemCfg.npc = AllianceweekendCfg.npcCfgList[i];
                AllianceweekendCfg.foeItemCfgList.push(itemCfg);
            }
            for (var key in data.peScore) {
                var itemCfg = new PeScoreItemCfg();
                itemCfg.initData(data.peScore[key]);
                itemCfg.id = Number(key) + 1;
                AllianceweekendCfg.peScoreItemCfgList.push(itemCfg);
            }
        }
        AllianceweekendCfg.formatData = formatData;
        /**获得boss */
        function getFoeItemCfgForBossId(id) {
            for (var key in AllianceweekendCfg.foeItemCfgList) {
                if (AllianceweekendCfg.foeItemCfgList[key].id == id) {
                    return AllianceweekendCfg.foeItemCfgList[key];
                }
            }
            return null;
        }
        AllianceweekendCfg.getFoeItemCfgForBossId = getFoeItemCfgForBossId;
        /**敌人属性配置 根据帮会等级 */
        function getFoeItemCfgList() {
            var cfgList = [];
            var allLv = Api.allianceVoApi.getAllianceVo().level;
            for (var key in AllianceweekendCfg.foeItemCfgList) {
                if (allLv >= AllianceweekendCfg.foeItemCfgList[key].alLvUnlock) {
                    cfgList.push(AllianceweekendCfg.foeItemCfgList[key]);
                }
            }
            return cfgList;
        }
        AllianceweekendCfg.getFoeItemCfgList = getFoeItemCfgList;
        /**敌人属性的最好一个配置 */
        function lastFoeItemCfg() {
            var cfgList = getFoeItemCfgList();
            return cfgList[cfgList.length - 1];
        }
        AllianceweekendCfg.lastFoeItemCfg = lastFoeItemCfg;
        function getMovePosY() {
            var l = 0;
            var boss = Api.allianceWeekVoApi.getNowBoss();
            if (boss) {
                for (var i = 0; i < getFoeItemCfgList().length; i++) {
                    if (boss.id >= getFoeItemCfgList()[i].id) {
                        l++;
                    }
                }
                // l = getFoeItemCfgList().length - l;
            }
            else {
                l = getFoeItemCfgList().length;
            }
            return l;
        }
        AllianceweekendCfg.getMovePosY = getMovePosY;
        /**敌军Item */
        var FoeItemCfg = (function (_super) {
            __extends(FoeItemCfg, _super);
            function FoeItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /** id */
                _this.id = 0;
                /** Boss血量 */
                _this.bossHP = 0;
                /** 击杀积分和分数。给予BOSS最后一击才可获得击杀积分 */
                _this.killScore = 0;
                /** 单位分数血量。1分需要血量。最低为1分 */
                _this.unitScore = 0;
                /**帮会等级解锁 */
                _this.alLvUnlock = 0;
                /** 击杀奖励，全帮会都可获得。5个一行 */
                _this.getReward = null;
                /** npc */
                _this.npc = null;
                return _this;
            }
            return FoeItemCfg;
        }(BaseItemCfg));
        AllianceweekendCfg.FoeItemCfg = FoeItemCfg;
        __reflect(FoeItemCfg.prototype, "Config.AllianceweekendCfg.FoeItemCfg");
        /**敌军Item */
        var PeScoreItemCfg = (function (_super) {
            __extends(PeScoreItemCfg, _super);
            function PeScoreItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /** id */
                _this.id = 0;
                _this.sortId = 0;
                /** 分数 */
                _this.score = 0;
                /** 奖励 */
                _this.getReward = null;
                return _this;
            }
            return PeScoreItemCfg;
        }(BaseItemCfg));
        AllianceweekendCfg.PeScoreItemCfg = PeScoreItemCfg;
        __reflect(PeScoreItemCfg.prototype, "Config.AllianceweekendCfg.PeScoreItemCfg");
    })(AllianceweekendCfg = Config.AllianceweekendCfg || (Config.AllianceweekendCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AllianceweekendCfg.js.map