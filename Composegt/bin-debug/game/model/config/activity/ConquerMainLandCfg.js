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
                /**--个人排名奖励
                    --idvRank:排名
                    --getReward:奖励*/
                this.indivdualRank = null;
                /**--区服排名奖励
                --serRank:排名
                --getReward:奖励*/
                this.serverRank = null;
                this.mainReward = 0;
                this.prankList = [];
                this.zrankList = [];
                this.servantAttBuff = null;
            }
            /**
             * 初始化数据
             */
            ConquerMainLandCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == 'indivdualRank') {
                        this.prankList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new ConquerMainLandRankItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.prankList.push(itemcfg);
                            i++;
                        }
                    }
                    if (key == 'serverRank') {
                        this.zrankList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new ConquerMainLandRankItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.zrankList.push(itemcfg);
                            i++;
                        }
                    }
                }
            };
            Object.defineProperty(ConquerMainLandCfg.prototype, "maxBuffLevel", {
                get: function () {
                    return this.servantAttBuff.length;
                },
                enumerable: true,
                configurable: true
            });
            return ConquerMainLandCfg;
        }());
        AcCfg.ConquerMainLandCfg = ConquerMainLandCfg;
        __reflect(ConquerMainLandCfg.prototype, "Config.AcCfg.ConquerMainLandCfg");
        var ConquerMainLandRankItemCfg = (function (_super) {
            __extends(ConquerMainLandRankItemCfg, _super);
            function ConquerMainLandRankItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.getReward = "";
                return _this;
            }
            /**
             * 奖励
             */
            ConquerMainLandRankItemCfg.prototype.initData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                        if (key == 'idvRank' || key == 'serRank') {
                            this.lower = data[key][1];
                            this.upper = data[key][0];
                        }
                    }
                }
            };
            Object.defineProperty(ConquerMainLandRankItemCfg.prototype, "minRank", {
                get: function () {
                    return this.upper;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ConquerMainLandRankItemCfg.prototype, "maxRank", {
                get: function () {
                    return this.lower;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ConquerMainLandRankItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ConquerMainLandRankItemCfg;
        }(BaseItemCfg));
        AcCfg.ConquerMainLandRankItemCfg = ConquerMainLandRankItemCfg;
        __reflect(ConquerMainLandRankItemCfg.prototype, "Config.AcCfg.ConquerMainLandRankItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
