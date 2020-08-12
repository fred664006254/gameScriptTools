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
     * jjc配置
     * author qianjun
     * @class FairarenaCfg
     */
    var FairarenaCfg;
    (function (FairarenaCfg) {
        //--入场消耗 X 钻石  100钻石
        var costGem = 0;
        //--失败 X 场后，结束
        var failNum = 0;
        //--胜场奖励 以及匹配条件
        var winReward = {};
        //刷卡权重
        var diceRatio = {};
        /**竞技场中骰子的等级 */
        var diceLv = 0;
        /**竞技场中的所有骰子暴击伤害 */
        var diceCrit = 0;
        /**初始 sp 值 */
        FairarenaCfg.iniSp = 0;
        /**每次召唤骰子的 sp 递增值 */
        var needSp = [];
        /**战斗内powerUP 消耗的 SP */
        var powerUpCost = [];
        /**公平竞技场每轮的时间 */
        var battleTime = [];
        /**转换倍率 */
        FairarenaCfg.addMonster = 1;
        /**转换后的怪出现的时间 */
        FairarenaCfg.addMonsterDelay = 0;
        /**对战模式中每个玩家的血量值 */
        var playerHp = 0;
        /**每轮 boss 血量值 */
        var bossBaseHp = 0;
        /**每轮击杀 boss 后获得的 SP 值 */
        var bossSp = [];
        var battleChallenge = [];
        var challengeTimeCfg = [];
        var battleMonsterNum = {};
        function formatData(data) {
            costGem = data.costGem;
            failNum = data.failNum;
            diceLv = data.diceLv;
            diceCrit = data.diceCrit;
            FairarenaCfg.iniSp = data.iniSp;
            needSp = data.needSp;
            powerUpCost = data.powerUpCost;
            battleTime = data.battleTime;
            FairarenaCfg.addMonster = data.addMonster;
            FairarenaCfg.addMonsterDelay = data.addMonsterDelay;
            playerHp = data.playerHp;
            bossBaseHp = data.bossBaseHp;
            bossSp = data.bossSp;
            for (var key in data.winReward) {
                var itemCfg = void 0;
                if (!winReward.hasOwnProperty(String(key))) {
                    winReward[String(key)] = new WinRewardItem();
                }
                itemCfg = winReward[String(key)];
                itemCfg.initData(data.winReward[key]);
                itemCfg.id = Number(key);
            }
            Config.BattleCfg.formatBattleChallengeCfg(data.battleChallenge, battleChallenge, challengeTimeCfg, battleMonsterNum);
        }
        FairarenaCfg.formatData = formatData;
        function getChallangeCfg(round) {
            var l = Math.min(round, challengeTimeCfg.length - 1);
            return challengeTimeCfg[l];
        }
        FairarenaCfg.getChallangeCfg = getChallangeCfg;
        function getChallangeMsNum(round) {
            return battleMonsterNum[round];
        }
        FairarenaCfg.getChallangeMsNum = getChallangeMsNum;
        function getItemCfgByRoundAndKey(round, cfgKey) {
            return battleChallenge[round][cfgKey];
        }
        FairarenaCfg.getItemCfgByRoundAndKey = getItemCfgByRoundAndKey;
        /**
         * 获取下一次购买骰子消耗SP
         * @param num 已拥有骰子的个数，从0开始
         */
        function getNeedSpByNum(num) {
            var totalNum = 0;
            var l = needSp.length;
            for (var i = 0; i <= num; i++) {
                var idx = Math.floor(i / 10);
                idx = Math.min(idx, l - 1);
                totalNum += needSp[idx];
            }
            // BattleCfg.formatBattleChallengeCfg(data.battleChallenge,battleChallenge,challengeTimeCfg,battleMonsterNum);
            return totalNum;
        }
        FairarenaCfg.getNeedSpByNum = getNeedSpByNum;
        function getPowerUpCostBylv(clv) {
            var maxLv = powerUpCost.length;
            clv = Math.min(maxLv, clv);
            return powerUpCost[clv - 1];
        }
        FairarenaCfg.getPowerUpCostBylv = getPowerUpCostBylv;
        /**
         * 获取奖励类型
         * @param winnum 胜场数
         */
        function getWinRewardItem(winnum) {
            var item = winReward[String(winnum)];
            if (!item) {
                return null;
            }
            if (item.getGem && item.getGem != 0) {
                return {
                    type: 2,
                    reward: item.getGem
                };
            }
            else if (item.getGold && item.getGold != 0) {
                return {
                    type: 1,
                    reward: item.getGold
                };
            }
            else if (item.getBoxId && item.getBoxId != '') {
                return {
                    type: 3,
                    reward: item.getBoxId
                };
            }
            else {
                return {
                    type: 0,
                    reward: item.getBoxId
                };
            }
        }
        FairarenaCfg.getWinRewardItem = getWinRewardItem;
        /**
         * 奖励字符串
         * @param winnum 胜场数
         */
        function getFormatStr(winnum) {
            var item = winReward[String(winnum)];
            if (!item) {
                return null;
            }
            if (item.getGem && item.getGem != 0) {
                return "1_1_" + item.getGem;
            }
            else if (item.getGold && item.getGold != 0) {
                return "2_1_" + item.getGold;
            }
            else {
                return null;
            }
        }
        FairarenaCfg.getFormatStr = getFormatStr;
        /**
         * 胜利次数，达到次数后公平竞技场结束
         */
        function getMaxWinNum() {
            var winnum = 0;
            if (winReward) {
                winnum = Object.keys(winReward).length;
            }
            return winnum;
        }
        FairarenaCfg.getMaxWinNum = getMaxWinNum;
        /**
         * 失败次数，达到次数后公平竞技场结束
         */
        function getFailNum() {
            return failNum;
        }
        FairarenaCfg.getFailNum = getFailNum;
        /**
         * 公平竞技场门票的钻石数
         */
        function getCostGem() {
            return costGem;
        }
        FairarenaCfg.getCostGem = getCostGem;
        /**
         * 公平竞技场的小鸟等级
         */
        function getDiceLv() {
            return diceLv;
        }
        FairarenaCfg.getDiceLv = getDiceLv;
        /**公平竞技场的暴击伤害 */
        function getDiceCrip() {
            return diceCrit;
        }
        FairarenaCfg.getDiceCrip = getDiceCrip;
        /**初始的 sp 值 */
        function getIniSp() {
            return FairarenaCfg.iniSp;
        }
        FairarenaCfg.getIniSp = getIniSp;
        function getNeedSp() {
            return needSp;
        }
        FairarenaCfg.getNeedSp = getNeedSp;
        function getPowerUpCost() {
            return powerUpCost;
        }
        FairarenaCfg.getPowerUpCost = getPowerUpCost;
        function getBattleTime() {
            return battleTime;
        }
        FairarenaCfg.getBattleTime = getBattleTime;
        function getAddMonster() {
            return FairarenaCfg.addMonster;
        }
        FairarenaCfg.getAddMonster = getAddMonster;
        function getAddMonsterDelay() {
            return FairarenaCfg.addMonsterDelay;
        }
        FairarenaCfg.getAddMonsterDelay = getAddMonsterDelay;
        function getPlayerHp() {
            return playerHp;
        }
        FairarenaCfg.getPlayerHp = getPlayerHp;
        function getBossBaseHp() {
            return bossBaseHp;
        }
        FairarenaCfg.getBossBaseHp = getBossBaseHp;
        function getBossSp() {
            return bossSp;
        }
        FairarenaCfg.getBossSp = getBossSp;
    })(FairarenaCfg = Config.FairarenaCfg || (Config.FairarenaCfg = {}));
    var WinRewardItem = (function (_super) {
        __extends(WinRewardItem, _super);
        function WinRewardItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WinRewardItem;
    }(BaseItemCfg));
    Config.WinRewardItem = WinRewardItem;
    __reflect(WinRewardItem.prototype, "Config.WinRewardItem");
})(Config || (Config = {}));
//# sourceMappingURL=FairarenaCfg.js.map