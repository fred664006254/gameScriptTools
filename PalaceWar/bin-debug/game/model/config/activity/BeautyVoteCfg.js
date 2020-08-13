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
        /**花魁活动cfg */
        var BeautyVoteCfg = (function () {
            function BeautyVoteCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                /**官品限制 */
                this.lvLimit = 0;
                /**每日免费花朵数 */
                this.freeVote = 0;
                /** 献花1朵后获得积分 */
                this.getScore = 0;
                /**充值元宝与鲜花兑换比例，10比1 */
                this.exchange = 0;
                /**每日元宝购买花朵次数 */
                this.limit = 0;
                /**元宝购买价格 */
                this.cost = 0;
                /**每次元宝购买获得花朵数量 */
                this.getNum = 0;
                /**活动时间表 */
                this.beautyVoteScheduleItemCfgList = [];
                /**活动期间的每日充值奖励 */
                this.beautyVoteRechargeItemCfgList = [];
                /**积分商城 */
                this.beautyVoteScoreMarketItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            BeautyVoteCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "schedule") {
                        this.beautyVoteScheduleItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BeautyVoteScheduleItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.beautyVoteScheduleItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.beautyVoteRechargeItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BeautyVoteRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.beautyVoteRechargeItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "scoreMarket") {
                        this.beautyVoteScoreMarketItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BeautyVoteScoreMarketItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.beautyVoteScoreMarketItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            /**单个时间表 */
            BeautyVoteCfg.prototype.getSingleScheduleTimeforId = function (roundId) {
                for (var i = 0; i < this.beautyVoteScheduleItemCfgList.length; i++) {
                    if (this.beautyVoteScheduleItemCfgList[i].id == roundId) {
                        return this.beautyVoteScheduleItemCfgList[i];
                    }
                }
                return null;
            };
            return BeautyVoteCfg;
        }());
        AcCfg.BeautyVoteCfg = BeautyVoteCfg;
        __reflect(BeautyVoteCfg.prototype, "Config.AcCfg.BeautyVoteCfg");
        /**活动时间表 */
        var BeautyVoteScheduleItemCfg = (function (_super) {
            __extends(BeautyVoteScheduleItemCfg, _super);
            function BeautyVoteScheduleItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BeautyVoteScheduleItemCfg;
        }(BaseItemCfg));
        AcCfg.BeautyVoteScheduleItemCfg = BeautyVoteScheduleItemCfg;
        __reflect(BeautyVoteScheduleItemCfg.prototype, "Config.AcCfg.BeautyVoteScheduleItemCfg");
        /**活动期间的每日充值奖励 */
        var BeautyVoteRechargeItemCfg = (function (_super) {
            __extends(BeautyVoteRechargeItemCfg, _super);
            function BeautyVoteRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BeautyVoteRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.BeautyVoteRechargeItemCfg = BeautyVoteRechargeItemCfg;
        __reflect(BeautyVoteRechargeItemCfg.prototype, "Config.AcCfg.BeautyVoteRechargeItemCfg");
        /**积分商城（投放一个头像框） */
        var BeautyVoteScoreMarketItemCfg = (function (_super) {
            __extends(BeautyVoteScoreMarketItemCfg, _super);
            function BeautyVoteScoreMarketItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BeautyVoteScoreMarketItemCfg;
        }(BaseItemCfg));
        AcCfg.BeautyVoteScoreMarketItemCfg = BeautyVoteScoreMarketItemCfg;
        __reflect(BeautyVoteScoreMarketItemCfg.prototype, "Config.AcCfg.BeautyVoteScoreMarketItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=BeautyVoteCfg.js.map