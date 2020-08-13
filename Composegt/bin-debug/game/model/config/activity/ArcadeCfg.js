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
        /**
        * 电玩大本营 的 cfg
        * @author 张朝阳
        * date 2019/6/3
        * @class ArcadeCfg
        */
        var ArcadeCfg = (function () {
            function ArcadeCfg() {
                //--展示期
                this.extraTime = 1;
                //--充值X元宝获得1个代币
                this.cost = 100;
                //奖池初始奖金--第一轮
                this.initialPrize = 1688;
                //奖池单位增加(每1抽)
                this.addPrize = 40;
                //十连抽折扣
                this.discount = 1;
                //累计X抽后开奖一次；期望积累2w元宝再发
                this.totalNum = 500;
                //奖金额度-总奖池*prizeLimit
                this.prizeLimit = 0.5;
                /** 玩一次消耗X个代币 */
                this.costCoin = 0;
                /** 共有X个图标 */
                this.picNum = 0;
                /** 核心奖励展示 */
                this.show = 0;
                /** 展示皮肤需要X元宝 */
                this.showGem = 0;
                this.poolList = null;
                /**任务列表 */
                this.taskItemListCfg = [];
                /**充值列表 */
                this.rechargeItemListCfg = [];
                this.poolListItemCfg = [];
                this.claimListItemCfg = [];
            }
            /**
             * 初始化数据
             */
            ArcadeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["" + key] = data[key];
                    if (key == "task") {
                        this.taskItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ArcadeTaskItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.rechargeItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ArcadeRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "poolList") {
                        this.poolListItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ArcadePoolItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.poolListItemCfg.push(itemcfg);
                        }
                    }
                    if (key == "claim") {
                        this.claimListItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ArcadeClaimItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.claimListItemCfg.push(itemcfg);
                        }
                    }
                }
            };
            ArcadeCfg.prototype.getTaskValue = function (id) {
                for (var i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id = this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].value;
                    }
                }
                return null;
            };
            /**分数 */
            ArcadeCfg.prototype.getScoreForType = function (type) {
                return this.poolList[type].moonCoin;
            };
            return ArcadeCfg;
        }());
        AcCfg.ArcadeCfg = ArcadeCfg;
        __reflect(ArcadeCfg.prototype, "Config.AcCfg.ArcadeCfg");
        /**
         * 活动期间的活跃任务   注：每日不重置
         */
        var ArcadeTaskItemCfg = (function (_super) {
            __extends(ArcadeTaskItemCfg, _super);
            function ArcadeTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**跳转 */
                _this.openType = null;
                return _this;
            }
            return ArcadeTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.ArcadeTaskItemCfg = ArcadeTaskItemCfg;
        __reflect(ArcadeTaskItemCfg.prototype, "Config.AcCfg.ArcadeTaskItemCfg");
        /**
         * 充值的
         */
        var ArcadeRechargeItemCfg = (function (_super) {
            __extends(ArcadeRechargeItemCfg, _super);
            function ArcadeRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ArcadeRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.ArcadeRechargeItemCfg = ArcadeRechargeItemCfg;
        __reflect(ArcadeRechargeItemCfg.prototype, "Config.AcCfg.ArcadeRechargeItemCfg");
        /**
         * 兑换
         */
        var ArcadeClaimItemCfg = (function (_super) {
            __extends(ArcadeClaimItemCfg, _super);
            function ArcadeClaimItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ArcadeClaimItemCfg;
        }(BaseItemCfg));
        AcCfg.ArcadeClaimItemCfg = ArcadeClaimItemCfg;
        __reflect(ArcadeClaimItemCfg.prototype, "Config.AcCfg.ArcadeClaimItemCfg");
        /**
         * 奖池列表
         */
        var ArcadePoolItemCfg = (function (_super) {
            __extends(ArcadePoolItemCfg, _super);
            function ArcadePoolItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ArcadePoolItemCfg.prototype.rewardPoolList = function () {
                var rewards = "";
                for (var key in this.prizePool) {
                    rewards += this.prizePool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            return ArcadePoolItemCfg;
        }(BaseItemCfg));
        AcCfg.ArcadePoolItemCfg = ArcadePoolItemCfg;
        __reflect(ArcadePoolItemCfg.prototype, "Config.AcCfg.ArcadePoolItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
