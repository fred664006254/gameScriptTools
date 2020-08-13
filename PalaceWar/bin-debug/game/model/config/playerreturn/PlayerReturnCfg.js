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
    var PlayerreturnCfg;
    (function (PlayerreturnCfg) {
        /**
         * --领取回归奖励所需要的官品 从六品或以上
         */
        PlayerreturnCfg.playerStatusneed = 0;
        /**
         * --开启重归仕途所需未登录天数 未登录天数大于等于15天
         */
        PlayerreturnCfg.timeGap = 0;
        /**
         *  --回归时，特殊判断VIP等级
         */
        PlayerreturnCfg.needVip = 0;
        /**
         *--Vip3及以上玩家回归邮件奖励 备注：仅一次
            */
        PlayerreturnCfg.returnReward = '';
        /**
         * Vip3以下玩家回归邮件奖励
         */
        PlayerreturnCfg.returnReward1 = '';
        /**
         *    --连续登录奖励
            --days：连续登录天数
            --getReward：普通奖励
            --getRewardVIP：VIP奖励
            */
        PlayerreturnCfg.signReward = {};
        /**
         *  --回归期间充值奖励 7天内完成
        --needGem：充值额度 单位：元宝
        --getReward：充值奖励
            */
        PlayerreturnCfg.rechargeReward = {};
        /**
         *  --活动期间回归任务奖励 7天内完成
        --openType：跳转
        --questType：任务类型
        --value：进度
        --getReward：奖励
            */
        PlayerreturnCfg.taskReward = {};
        function formatData(data) {
            PlayerreturnCfg.playerStatusneed = data.playerStatusneed;
            PlayerreturnCfg.needVip = data.needVip;
            PlayerreturnCfg.timeGap = data.timeGap;
            PlayerreturnCfg.returnReward = data.returnReward;
            PlayerreturnCfg.returnReward1 = data.returnReward1;
            for (var key_1 in data.signReward) {
                var itemCfg = void 0;
                if (!PlayerreturnCfg.signReward.hasOwnProperty(String(key_1))) {
                    PlayerreturnCfg.signReward[String(key_1)] = new ReurnSignItemCfg();
                }
                itemCfg = PlayerreturnCfg.signReward[String(key_1)];
                itemCfg.initData(data.signReward[key_1]);
                itemCfg.id = Number(key_1);
            }
            for (var key in data.rechargeReward) {
                var itemCfg = void 0;
                if (!PlayerreturnCfg.rechargeReward.hasOwnProperty(String(key))) {
                    PlayerreturnCfg.rechargeReward[String(key)] = new ReturnRechargeItemCfg();
                }
                itemCfg = PlayerreturnCfg.rechargeReward[String(key)];
                itemCfg.initData(data.rechargeReward[key]);
                itemCfg.id = Number(key);
            }
            for (var key_2 in data.taskReward) {
                var itemCfg = void 0;
                if (!PlayerreturnCfg.taskReward.hasOwnProperty(String(key_2))) {
                    PlayerreturnCfg.taskReward[String(key_2)] = new ReturnTaskItemCfg();
                }
                itemCfg = PlayerreturnCfg.taskReward[String(key_2)];
                itemCfg.initData(data.taskReward[key_2]);
                itemCfg.taskId = Number(key_2);
            }
        }
        PlayerreturnCfg.formatData = formatData;
        var ReurnSignItemCfg = (function (_super) {
            __extends(ReurnSignItemCfg, _super);
            function ReurnSignItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ReurnSignItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReurnSignItemCfg.prototype, "rewardVipIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getRewardVIP, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ReurnSignItemCfg;
        }(BaseItemCfg));
        __reflect(ReurnSignItemCfg.prototype, "ReurnSignItemCfg");
        var ReturnRechargeItemCfg = (function (_super) {
            __extends(ReturnRechargeItemCfg, _super);
            function ReturnRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ReturnRechargeItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ReturnRechargeItemCfg;
        }(BaseItemCfg));
        __reflect(ReturnRechargeItemCfg.prototype, "ReturnRechargeItemCfg");
        var ReturnTaskItemCfg = (function (_super) {
            __extends(ReturnTaskItemCfg, _super);
            function ReturnTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(ReturnTaskItemCfg.prototype, "rewardIcons", {
                get: function () {
                    // this.getReward += (`18_0001_${this.zongziGet}`);
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ReturnTaskItemCfg;
        }(BaseItemCfg));
        __reflect(ReturnTaskItemCfg.prototype, "ReturnTaskItemCfg");
    })(PlayerreturnCfg = Config.PlayerreturnCfg || (Config.PlayerreturnCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=PlayerReturnCfg.js.map