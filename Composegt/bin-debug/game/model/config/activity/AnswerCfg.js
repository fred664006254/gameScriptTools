var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var AnswerCfg = (function () {
            function AnswerCfg() {
                //答题总次数
                this.answerTime = 3;
                //单次答题数量
                this.answerNum = 10;
                //答题初始时间要求：秒
                this.timeLimit = 30;
                //每秒时间扣除分数
                this.timeCost = 2;
                //答错给予基础分
                this.answerWrong = 5;
                //答对给予最高分
                this.answerRight = 100;
                //题库列表
                //rightAnswer:正确答案
                //weight:筛选权重
                //prizePool:奖池
                this.poolList = [];
                //活动期间的积分范围的额外奖励
                //scoreRange:积分范围
                //getReward:奖励
                this.ranklist = [];
                this.totalRanking = [];
                this.titleId = 4114;
            }
            AnswerCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                        if (key == 'mainReward') {
                            this.titleId = GameData.formatRewardItem(data[key])[0].id;
                        }
                    }
                }
            };
            return AnswerCfg;
        }());
        AcCfg.AnswerCfg = AnswerCfg;
        __reflect(AnswerCfg.prototype, "Config.AcCfg.AnswerCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
