var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var GroupWifeBattleCfg = /** @class */ (function () {
            function GroupWifeBattleCfg() {
                /**
                 * 展示时间
                 * */
                this.extraTime = 1;
                /**
                 * 个人参与条件：个人有X名红颜被册封
                 * */
                this.unlock_wifeStar = 1;
                /**
                 * 玩家每天可免费参加X次
                */
                this.freeTime = 4;
                /**
                 * 挑战CD  单位：秒
                 * */
                this.coolDownTime = 3600;
                /**
                 * --红颜连胜上限
                 * */
                this.battleTime = 3;
                /**
                 *  --不同功能所需道具
                    --refresh:刷新随机挑战次数
                    --chanllge:挑战，复仇，追杀
                    --protect:保护同帮派成员
                 * */
                this.needItem = null;
                /**
                 *  --保护规则
                    --maxTime1:每轮保护次数上限
                    --maxTime2:每轮被保护次数上限
                    --limitNum:同时只能被x个人保护
                 * */
                this.portect = null;
                /**
                 * 每1位红颜被册封提供的冲榜才情加成，百分制%
                 */
                this.talentStatusBuff = 5;
                /**
                 *  --随机战斗进攻方胜利加分 = 胜利基础分数 + 击败人数 * 奖励分数
                    --victoryScoreBaseParam:基础分
                    --victoryScoreNumParam:奖励分
                 * */
                this.victoryScore = null;
                /**
                 *  --随机战斗进攻方失败加分 = 失败基础分数 + 击败人数 * 奖励分数
                    --lostScoreBaseParam:基础分
                    --lostScoreNumParam:奖励分
                 * */
                this.lostScore = null;
                /**
                 *  --比拼战斗进攻方胜利加分 = 胜利基础分数 + 击败人数 * 奖励分数
                    --victoryScoreBaseParam2:基础分
                    --victoryScoreNumParam2:奖励分
                 * */
                this.victoryScore2 = null;
                /**
                 *  --比拼战斗进攻方失败加分 = 失败基础分数 + 击败人数 * 奖励分数
                    --lostScoreBaseParam2:基础分
                    --lostScoreNumParam2:奖励分
                 * */
                this.lostScore2 = null;
                /**
                 *  --防守方失败减分 = 失败基础分数 + 攻击方剩余人数*积分系数
                    --defScoreBaseParam:基础分
                    --lostScoreNumParam3:积分系数
                 * */
                this.defScore = null;
                /**
                 * --淘汰轮次
                    --time:淘汰时间
                    --btmLine:淘汰名次下限
                 * */
                this.weedOut = [];
                /**
                 *观赛奖励
                */
                this.audienceReward = [];
                /**
                 *观赛任务
                */
                this.audienceTask = [];
                /**
                 *  --发奖规则
                    --serverNum:服务器数量
                    --serverReward:帮会奖励字段
                    --personReward:个人奖励字段
                */
                this.rewardList = [];
                /**
                 *帮会排名奖励
                */
                this.allianceRank = [];
                /**
                 *个人排名奖励
                 */
                this.indivdualRank = [];
            }
            GroupWifeBattleCfg.prototype.getFightAdd = function () {
                return this.fightAdd.split('_')[1];
            };
            GroupWifeBattleCfg.prototype.formatData = function (data) {
                for (var i in data) {
                    this[i] = data[i];
                }
            };
            return GroupWifeBattleCfg;
        }());
        AcCfg.GroupWifeBattleCfg = GroupWifeBattleCfg;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GroupWifeBattleCfg.js.map