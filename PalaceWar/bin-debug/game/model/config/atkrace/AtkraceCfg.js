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
     * 擂台配置
     */
    var AtkraceCfg;
    (function (AtkraceCfg) {
        /**
         * 解锁条件  拥有 X 个门客
         */
        var unlock;
        /**
         * 门客等级
         */
        var servantLv;
        var dailyNum;
        /**
         * 每次间隔时间 单位（秒）
         */
        var intervalTime;
        /**
         * 出使消耗道具
         */
        var fightAdd;
        /**
         * 复仇消耗道具
         */
        var revenge;
        /**
         * 挑战消耗道具
         */
        var challenge;
        /**
         * 追杀消耗道具 暂用道具
         */
        var hunt;
        /**
         * 额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
         */
        var parameter1;
        var parameter3;
        var iniAtt;
        var juniorAtt;
        var mediumAtt;
        var seniorAtt;
        //门客名望分阶
        var atkraceFameListCfg = [];
        AtkraceCfg.reputation1 = 0;
        AtkraceCfg.reputation2 = 0;
        AtkraceCfg.reputation3 = 0;
        AtkraceCfg.reputation4 = 0;
        AtkraceCfg.reputation5 = 0;
        function formatData(data) {
            unlock = data.unlock;
            servantLv = data.servantLv;
            dailyNum = data.dailyNum;
            intervalTime = data.intervalTime;
            fightAdd = data.fightAdd;
            revenge = data.revenge;
            challenge = data.challenge;
            hunt = data.hunt;
            parameter1 = data.parameter1;
            parameter3 = data.parameter3;
            iniAtt = data.iniAtt;
            juniorAtt = data.juniorAtt;
            mediumAtt = data.mediumAtt;
            seniorAtt = data.seniorAtt;
            AtkraceCfg.reputation1 = data.reputation1;
            AtkraceCfg.reputation2 = data.reputation2;
            AtkraceCfg.reputation3 = data.reputation3;
            AtkraceCfg.reputation4 = data.reputation4;
            AtkraceCfg.reputation5 = data.reputation5;
            if (data.reputation) {
                for (var key in data.reputation) {
                    var itemCfg = new AtkraceFameItemCfg();
                    itemCfg.initData(data.reputation[key]);
                    itemCfg.id = String(key);
                    atkraceFameListCfg.push(itemCfg);
                }
                atkraceFameListCfg.reverse();
            }
        }
        AtkraceCfg.formatData = formatData;
        /**
         * 每日武馆次数
         */
        function getDailyNum() {
            return dailyNum;
        }
        AtkraceCfg.getDailyNum = getDailyNum;
        /**
         * 额外出战系数
         */
        function getParameter1() {
            return parameter1;
        }
        AtkraceCfg.getParameter1 = getParameter1;
        /**
         * 门客等级限制
         */
        function getServantLv() {
            return servantLv;
        }
        AtkraceCfg.getServantLv = getServantLv;
        /**
         * 每次间隔时间 单位（秒）
         */
        function getIntervalTime() {
            return intervalTime;
        }
        AtkraceCfg.getIntervalTime = getIntervalTime;
        /**
         * 解锁条件  拥有 X 个门客
         */
        function getUnlock() {
            return unlock;
        }
        AtkraceCfg.getUnlock = getUnlock;
        /**
         * 初始属性
         */
        function getInitAtt(key) {
            return iniAtt[key];
        }
        AtkraceCfg.getInitAtt = getInitAtt;
        /**
         * 初级属性
         */
        function getJuniorAtt(key) {
            return juniorAtt[key];
        }
        AtkraceCfg.getJuniorAtt = getJuniorAtt;
        /**
         * 中级属性
         */
        function getMediumAtt(key) {
            return mediumAtt[key];
        }
        AtkraceCfg.getMediumAtt = getMediumAtt;
        /**
         * 高级属性
         */
        function getSeniorAtt(key) {
            return seniorAtt[key];
        }
        AtkraceCfg.getSeniorAtt = getSeniorAtt;
        function getFightAdd() {
            return fightAdd;
        }
        AtkraceCfg.getFightAdd = getFightAdd;
        /**
         * 上榜条件 击败多少名
         */
        function getbeatNum() {
            return parameter3;
        }
        AtkraceCfg.getbeatNum = getbeatNum;
        function getFameList() {
            return atkraceFameListCfg;
        }
        AtkraceCfg.getFameList = getFameList;
        function getFameCfgBylevel(fameLv) {
            var fameCfg = null;
            atkraceFameListCfg.forEach(function (element) {
                if (element.id == String(fameLv)) {
                    fameCfg = element;
                }
            });
            return fameCfg;
        }
        AtkraceCfg.getFameCfgBylevel = getFameCfgBylevel;
        function getNeedFameBylevel(fameLv) {
            fameLv = (Number(fameLv) + 1) > atkraceFameListCfg.length ? atkraceFameListCfg.length : (Number(fameLv) + 1);
            var needFame = getFameCfgBylevel(fameLv).expNeed;
            return needFame;
        }
        AtkraceCfg.getNeedFameBylevel = getNeedFameBylevel;
        function getMaxFamelevel() {
            return atkraceFameListCfg.length;
        }
        AtkraceCfg.getMaxFamelevel = getMaxFamelevel;
        var AtkraceFameItemCfg = (function (_super) {
            __extends(AtkraceFameItemCfg, _super);
            function AtkraceFameItemCfg() {
                return _super.call(this) || this;
            }
            return AtkraceFameItemCfg;
        }(BaseItemCfg));
        AtkraceCfg.AtkraceFameItemCfg = AtkraceFameItemCfg;
        __reflect(AtkraceFameItemCfg.prototype, "Config.AtkraceCfg.AtkraceFameItemCfg");
    })(AtkraceCfg = Config.AtkraceCfg || (Config.AtkraceCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=AtkraceCfg.js.map