var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var BattleGroundCfg = (function () {
            function BattleGroundCfg() {
                /**
                 * 展示时间
                 * */
                this.extraTime = 1;
                /**
                 * 一键擂台禁用时间,单位(分钟)
                */
                this.disableTime = 0;
                /**
                 * 跨服数量
                 * */
                this.serverNum = 0;
                /**
                 * 第一名帮会奖励头像框
                 */
                this.titleID = 0;
                /**
                 * --初始加成
                --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
                --effect:加成值。例：0.5=50%
                --costPoint:消耗士气
                --costGem:消耗元宝
                 * */
                this.iniAtt = null;
                /**
                * --初始加成
               --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
               --effect:加成值。例：0.5=50%
               --costPoint:消耗士气
               --weight:权重
                * */
                this.juniorAtt = null;
                /**
                 * --中级加成
                --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
                --effect:加成值。例：0.5=50%
                --costPoint:消耗士气
                --weight:权重
                 * */
                this.mediumAtt = null;
                /**
                 * --高级加成
                --att:加成属性。1：临时攻击  2：临时技能伤害  3：临时血量加成
                --effect:加成值。例：0.5=50%
                --costPoint:消耗士气
                --weight:权重
                 * */
                this.seniorAtt = null;
                /**
                 *-解锁条件  拥有 X 个门客
                 * */
                this.unlock = 0;
                /**
                 * 选取敌方角色的随机波动名次
                 */
                this.range = [];
                /**
                 * 每击杀3个门客，获得一个翻牌奖励
                 */
                this.rewardTurn = 0;
                /**
                 * 每次获胜奖励
                 * --score:衙门积分
                --abilityExp:书籍经验
                --point:士气数量
                 */
                this.victory = null;
                /**
                 * 每次失败  衙门分数-1
                 */
                this.fail = 0;
                /**
                 * 追杀时，战胜敌方，敌方分数-2
                 */
                this.huntScore = 0;
                /**
                 * 绝地衙门积分下限
                 */
                this.lowestScore = 0;
                /**
                 * 翻牌奖励  在翻牌时，随机1个奖励  其余5张牌，1张和随机出的奖励一样  其余4张再随4个不重复的（和已获得的也不重复）
                 */
                this.rewardPool = null;
                /**
                 * --淘汰轮次
                    --time:淘汰时间
                    --btmLine:淘汰名次下限
                 * */
                this.weedOut = [];
                /**
                 *个人排名奖励
                 */
                this.indivdualRank = [];
                /**
                 *帮会排名奖励
                */
                this.allianceRank = [];
            }
            BattleGroundCfg.prototype.formatData = function (data) {
                for (var i in data) {
                    this[i] = data[i];
                }
            };
            /**
             * 每日武馆次数
             */
            BattleGroundCfg.prototype.getDailyNum = function () {
                return this.dailyNum;
            };
            /**
             * 额外出战系数
             */
            BattleGroundCfg.prototype.getParameter1 = function () {
                return this.parameter1;
            };
            /**
             * 门客等级限制
             */
            BattleGroundCfg.prototype.getServantLv = function () {
                return this.servantLv;
            };
            /**
             * 每次间隔时间 单位（秒）
             */
            BattleGroundCfg.prototype.getIntervalTime = function () {
                return this.intervalTime;
            };
            /**
             * 解锁条件  拥有 X 个门客
             */
            BattleGroundCfg.prototype.getUnlock = function () {
                return this.unlock;
            };
            /**
             * 初始属性
             */
            BattleGroundCfg.prototype.getInitAtt = function (key) {
                return this.iniAtt[Number(key) - 1];
            };
            /**
             * 初级属性
             */
            BattleGroundCfg.prototype.getJuniorAtt = function (key) {
                return this.juniorAtt[Number(key) - 1];
            };
            /**
             * 中级属性
             */
            BattleGroundCfg.prototype.getMediumAtt = function (key) {
                return this.mediumAtt[Number(key) - 1];
            };
            /**
             * 高级属性
             */
            BattleGroundCfg.prototype.getSeniorAtt = function (key) {
                return this.seniorAtt[Number(key) - 1];
            };
            BattleGroundCfg.prototype.getFightAdd = function () {
                return this.fightAdd.split('_')[1];
            };
            /**
             * 上榜条件 击败多少名
             */
            BattleGroundCfg.prototype.getbeatNum = function () {
                return this.parameter3;
            };
            return BattleGroundCfg;
        }());
        AcCfg.BattleGroundCfg = BattleGroundCfg;
        __reflect(BattleGroundCfg.prototype, "Config.AcCfg.BattleGroundCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
