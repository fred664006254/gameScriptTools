var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var ConquerMainLandCfg = (function () {
            function ConquerMainLandCfg() {
                /**展示时间 */
                this.extraTime = 1;
                /**驻扎城池结算时间（s）：占领每达到 X 秒获得一次积分*/
                this.settleTime = 0;
                /** --队务详情
                    --numberOfTeam:玩家队伍数量限制
                    --main:每队门客数
                    --warTime:每名门客每日初始参战次数
                    --cd:每名门客出战次数恢复CD，单位:秒，积累次数最大不可超过初始上限
                    --buyTime:使用元宝恢复次数消耗(超上限取上限)
                    --successive:每名门客最高连胜，超过后下场 */
                this.teamInfo = null;
                /** --时间与分数倍率。倍率为0的时间段为休战期
                    --startTime:开始时间
                    --endTime:结束时间
                    --buff:分数倍率：获得分数 = 位置分数 * 分数倍率*/
                this.timeAndBuff = null;
                /**--建筑加分
                    --buildingNum:该类建筑数量
                    --segmentation:可容纳队伍数
                    --initial:初始守城军战力
                    --getScore:位置分数 */
                this.mainLand = null;
                /**--活动任务
                    --questType:任务类型
                    --sortId:排序：上一任务完成后才显示下一个任务
                    --value:任务参数
                    --openType:任务跳转
                    --specialReward:获得奖励 */
                this.task = null;
                /**--募兵令增加兵力，队伍中，每名门客增加 X*/
                this.addPower = 0;
                /**--个人排名奖励
                    --idvRank:排名
                    --getReward:奖励*/
                this.indivdualRank = null;
                /**--区服排名奖励
                --serRank:排名
                --getReward:奖励*/
                this.serverRank = null;
                //嘉奖令  立即获取X分钟的奖励
                this.addReward = 0;
            }
            /**
             * 初始化数据
             */
            ConquerMainLandCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            return ConquerMainLandCfg;
        }());
        AcCfg.ConquerMainLandCfg = ConquerMainLandCfg;
        __reflect(ConquerMainLandCfg.prototype, "Config.AcCfg.ConquerMainLandCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ConquerMainLandCfg.js.map