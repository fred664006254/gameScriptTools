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
    var BattleCfg;
    (function (BattleCfg) {
        /**战斗内的增幅消耗SP */
        var powerUpCost;
        //对战模式，第一轮时间   单位：秒
        var battleTime;
        var battleChallenge = [];
        var challengeTimeCfg = [];
        var battleMonsterNum = {};
        var newPlayerbattleChallenge = [];
        var newPlayerchallengeTimeCfg = [];
        var newPlayerbattleMonsterNum = {};
        function formatData(data) {
            BattleCfg.robotTime = data.robotTime;
            BattleCfg.playerHp = data.playerHp;
            battleTime = data.battleTime;
            BattleCfg.bossId = data.bossId;
            BattleCfg.bossBaseHp = data.bossBaseHp;
            BattleCfg.bossSp = data.bossSp;
            powerUpCost = data.powerUpCost;
            BattleCfg.needSp = data.needSp;
            BattleCfg.addMonster = data.addMonster;
            BattleCfg.addMonsterDelay = data.addMonsterDelay;
            BattleCfg.iniSp = data.iniSp;
            formatBattleChallengeCfg(data.battleChallenge, battleChallenge, challengeTimeCfg, battleMonsterNum);
            formatBattleChallengeCfg(data.newPlayerChallenge, newPlayerbattleChallenge, newPlayerchallengeTimeCfg, newPlayerbattleMonsterNum);
        }
        BattleCfg.formatData = formatData;
        function formatBattleChallengeCfg(battleChallengeData, tbattleChallenge, tchallengeTimeCfg, tbattleMonsterNum) {
            var tmpBattleChallenge = battleChallengeData;
            var l = tmpBattleChallenge.length;
            for (var i = 0; i < l; i++) {
                var count = 0;
                var roundTimeCfg = {};
                var roundCfg = {};
                var tmproundCfg = tmpBattleChallenge[i];
                var tmproundKeys = Object.keys(tmproundCfg);
                tmproundKeys.sort(function (a, b) {
                    return Number(a) - Number(b);
                });
                var kl = tmproundKeys.length;
                for (var ki = 0; ki < kl; ki++) {
                    var key = tmproundKeys[ki];
                    if (tmproundCfg.hasOwnProperty(key)) {
                        var monsters = tmproundCfg[key];
                        var itemCfg = new ChallengeItemCfg();
                        itemCfg.initData(monsters);
                        itemCfg.round = i;
                        itemCfg.cfgKey = key;
                        roundCfg[key] = itemCfg;
                        var startTimeMs = itemCfg.startTime;
                        var internalTime = itemCfg.internalTime;
                        var num = itemCfg.monsterNum;
                        for (var i2 = 0; i2 < num; i2++) {
                            var t = startTimeMs + i2 * internalTime;
                            if (!roundTimeCfg[t]) {
                                roundTimeCfg[t] = [];
                            }
                            roundTimeCfg[t].push(itemCfg);
                            count++;
                        }
                    }
                }
                tbattleChallenge[i] = roundCfg;
                tchallengeTimeCfg[i] = roundTimeCfg;
                tbattleMonsterNum[i] = count;
            }
        }
        BattleCfg.formatBattleChallengeCfg = formatBattleChallengeCfg;
        function getItemCfgByRoundAndKey(round, cfgKey) {
            var isGuiding = Api.GameinfoVoApi.getIsGuiding();
            return isGuiding ? newPlayerbattleChallenge[round][cfgKey] : battleChallenge[round][cfgKey];
        }
        BattleCfg.getItemCfgByRoundAndKey = getItemCfgByRoundAndKey;
        function getbtTimeByRound(round) {
            var idx = Math.min(round, battleTime.length - 1);
            return battleTime[idx];
        }
        BattleCfg.getbtTimeByRound = getbtTimeByRound;
        function getPowerUpCostBylv(clv) {
            var maxLv = powerUpCost.length;
            clv = Math.min(maxLv, clv);
            return powerUpCost[clv - 1];
        }
        BattleCfg.getPowerUpCostBylv = getPowerUpCostBylv;
        function getChallangeCfg(round) {
            var isGuiding = Api.GameinfoVoApi.getIsGuiding();
            if (isGuiding) {
                var nl = Math.min(round, newPlayerchallengeTimeCfg.length - 1);
                return newPlayerchallengeTimeCfg[nl];
            }
            var l = Math.min(round, challengeTimeCfg.length - 1);
            return challengeTimeCfg[l];
        }
        BattleCfg.getChallangeCfg = getChallangeCfg;
        function getChallangeMsNum(round) {
            var isGuiding = Api.GameinfoVoApi.getIsGuiding();
            return isGuiding ? newPlayerbattleMonsterNum[round] : battleMonsterNum[round];
        }
        BattleCfg.getChallangeMsNum = getChallangeMsNum;
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
            var l = BattleCfg.needSp.length;
            for (var i = 0; i <= num; i++) {
                var idx = Math.floor(i / 10);
                idx = Math.min(idx, l - 1);
                totalNum += BattleCfg.needSp[idx];
            }
            return totalNum;
        }
        BattleCfg.getNeedSpByNum = getNeedSpByNum;
        function getMonsterIcon(type) {
            return "monster" + type;
        }
        BattleCfg.getMonsterIcon = getMonsterIcon;
        function getBossIcon(bossId) {
            return "boss" + bossId;
        }
        BattleCfg.getBossIcon = getBossIcon;
        function getBossHp(round, leftHp) {
            if (leftHp === void 0) { leftHp = 0; }
            return BattleCfg.bossBaseHp * (round + 1) + Math.floor(leftHp * 0.5);
        }
        BattleCfg.getBossHp = getBossHp;
        function getBossSp(round) {
            return BattleCfg.bossSp[Math.min(round, BattleCfg.bossSp.length - 1)];
        }
        BattleCfg.getBossSp = getBossSp;
        /**
         * 随机bossID
         * todo
         */
        function getBossId() {
            var bossArr = ["1002", "1004"];
            return 1003;
        }
        BattleCfg.getBossId = getBossId;
    })(BattleCfg = Config.BattleCfg || (Config.BattleCfg = {}));
    var MonsterItemCfg = (function (_super) {
        __extends(MonsterItemCfg, _super);
        function MonsterItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MonsterItemCfg;
    }(BaseItemCfg));
    Config.MonsterItemCfg = MonsterItemCfg;
    __reflect(MonsterItemCfg.prototype, "Config.MonsterItemCfg");
    var ChallengeItemCfg = (function (_super) {
        __extends(ChallengeItemCfg, _super);
        function ChallengeItemCfg() {
            return _super.call(this) || this;
        }
        // public getStartTimeMs():number
        // {
        //     return this.startTime*1000;
        // }
        // public getInternalTime():number
        // {
        //     return this.internalTime*1000;
        // }
        ChallengeItemCfg.prototype.getHpByLv = function (lv) {
            var maxL = this.monsterHp.length;
            lv = Math.max(1, Math.min(maxL, lv));
            return this.monsterHp[lv - 1];
        };
        return ChallengeItemCfg;
    }(MonsterItemCfg));
    Config.ChallengeItemCfg = ChallengeItemCfg;
    __reflect(ChallengeItemCfg.prototype, "Config.ChallengeItemCfg");
    var SnakeMaonsterItemCfg = (function (_super) {
        __extends(SnakeMaonsterItemCfg, _super);
        function SnakeMaonsterItemCfg() {
            return _super.call(this) || this;
        }
        return SnakeMaonsterItemCfg;
    }(MonsterItemCfg));
    Config.SnakeMaonsterItemCfg = SnakeMaonsterItemCfg;
    __reflect(SnakeMaonsterItemCfg.prototype, "Config.SnakeMaonsterItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=BattleCfg.js.map