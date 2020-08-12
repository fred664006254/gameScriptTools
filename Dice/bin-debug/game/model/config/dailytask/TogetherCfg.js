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
    var TogetherCfg;
    (function (TogetherCfg) {
        var together;
        var battleChallenge = [];
        var challengeTimeCfg = [];
        var battleMonsterNum = {};
        var maxRound = 0;
        /**战斗内的增幅消耗SP */
        var powerUpCost;
        function formatData(data) {
            if (!together) {
                together = new TogetherItemCfg();
            }
            together.initData(data);
            powerUpCost = data.powerUpCost;
            TogetherCfg.needSp = data.needSp;
            TogetherCfg.iniSp = data.iniSp;
            maxRound = data.battleChallenge.length;
            Config.BattleCfg.formatBattleChallengeCfg(data.battleChallenge, battleChallenge, challengeTimeCfg, battleMonsterNum);
        }
        TogetherCfg.formatData = formatData;
        function getPowerUpCostBylv(clv) {
            var maxLv = powerUpCost.length;
            clv = Math.min(maxLv, clv);
            return powerUpCost[clv - 1];
        }
        TogetherCfg.getPowerUpCostBylv = getPowerUpCostBylv;
        function getNeedCard(index) {
            if (!together || !together.needCard) {
                return 0;
            }
            if (index < 0) {
                index = 0;
            }
            else if (index >= together.needCard.length) {
                index = together.needCard.length - 1;
            }
            return together.needCard[index];
        }
        TogetherCfg.getNeedCard = getNeedCard;
        function getNeedCardList() {
            var need = [];
            if (together && together.needCard) {
                need = together.needCard;
            }
            else {
                need = [10, 20, 30, 40];
            }
            return need;
        }
        TogetherCfg.getNeedCardList = getNeedCardList;
        function getChallangeCfg(round) {
            var l = challengeTimeCfg.length;
            round = Math.min(round, l - 1);
            return challengeTimeCfg[round];
        }
        TogetherCfg.getChallangeCfg = getChallangeCfg;
        function getChallangeMsNum(round) {
            return battleMonsterNum[round];
        }
        TogetherCfg.getChallangeMsNum = getChallangeMsNum;
        function getMaxRound() {
            return maxRound;
        }
        TogetherCfg.getMaxRound = getMaxRound;
        /**
         * 获取下一次购买骰子消耗SP
         * @param num 已拥有骰子的个数，从0开始
         */
        function getNeedSpByNum(num) {
            // let idx=Math.floor(num/10);
            // idx=Math.min(idx,needSp.length-1);
            // let totalNum:number=0;
            // for(let i=0;i<=idx;i++)
            // {
            //     totalNum+=needSp[i];
            // }
            var totalNum = 0;
            var l = TogetherCfg.needSp.length;
            for (var i = 0; i <= num; i++) {
                var idx = Math.floor(i / 10);
                idx = Math.min(idx, l - 1);
                totalNum += TogetherCfg.needSp[idx];
            }
            return totalNum;
        }
        TogetherCfg.getNeedSpByNum = getNeedSpByNum;
        /**
         * 获得协同模式次数的最大值
         */
        function getOperationMaxNum() {
            var flag = Api.GameinfoVoApi.getIsBuyAssitance();
            return flag ? together.advancedNum : together.iniNum;
        }
        TogetherCfg.getOperationMaxNum = getOperationMaxNum;
        /**
         * 每次恢复使用的钻石数
         */
        function getNeedGem() {
            var num = Api.GameinfoVoApi.getOperationBuyNum();
            num = (num >= together.needGem.length) ? together.needGem.length - 1 : num;
            num = (num < 0) ? 0 : num;
            return together.needGem[num];
        }
        TogetherCfg.getNeedGem = getNeedGem;
        /**
         * 当前回合增加的卡数
         * @param round 回合数
         */
        function getCard(round) {
            return round > 50 ? together.getCard1 : together.getCard;
        }
        TogetherCfg.getCard = getCard;
        /**
         * 协同模式初始化最大值
         */
        function getIniNum() {
            return together.iniNum;
        }
        TogetherCfg.getIniNum = getIniNum;
    })(TogetherCfg = Config.TogetherCfg || (Config.TogetherCfg = {}));
    var TogetherItemCfg = (function (_super) {
        __extends(TogetherItemCfg, _super);
        function TogetherItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** 开启宝箱需要的卡牌 */
            _this.needCard = [];
            /** 每达到一关获得 X 张卡牌   第一关，获得X张，第Y关，获得 Y * X 张 */
            _this.getCard = 0;
            /** 协同宝箱ID */
            _this.cardBoxId = "";
            /**协同模式初始化最大值 */
            _this.iniNum = 0;
            /**购买高级协同模式后的的最大次数 */
            _this.advancedNum = 0;
            /** 需要的钻石数 */
            _this.needGem = [];
            _this.battleChallenge = [];
            /**50波以后，每回合增加卡牌数 */
            _this.getCard1 = 3;
            return _this;
        }
        return TogetherItemCfg;
    }(BaseItemCfg));
    Config.TogetherItemCfg = TogetherItemCfg;
    __reflect(TogetherItemCfg.prototype, "Config.TogetherItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=TogetherCfg.js.map