var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 魏征活动
         */
        var WeiZhengCfg = (function () {
            function WeiZhengCfg() {
                /**
                 * --展示时间
                 */
                this.extraTime = 0;
                /**
                 *  --兑换：玩家兑换皮肤后，后续变成兑换碎片
                --costShu:消耗谏书
                --getReward:奖励
                 */
                this.claim = null;
                /**
                 * --补领任务的消耗，活动期间，补领的次数越多，消耗越高，超过最大值取最大值
                 */
                this.missCost = [];
                /**
                 *  --活动任务
                    --questType:任务类型
                    --sortId:排序
                    --value:任务参数
                    --openType:任务跳转
                    --getReward:获得奖励
                 */
                this.task = null;
                /**
                 * --活动期间累计充值奖励
                 --needGem:所需额度：单位（元宝）
                    --getReward:奖励
                */
                this.recharge = null;
            }
            WeiZhengCfg.prototype.getSkinId = function (code) {
                var skinid = "";
                switch (Number(code)) {
                    case 1:
                        skinid = "10501";
                        break;
                }
                return skinid;
            };
            WeiZhengCfg.prototype.getSkinBone = function (code) {
                var cfg = null;
                switch (Number(code)) {
                    case 1:
                    case 2:
                        cfg = Config.ServantskinCfg.getServantSkinItemById(this.getSkinId(code));
                        break;
                }
                return cfg.bone ? cfg.bone : '';
            };
            WeiZhengCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.claim = data.claim;
                this.missCost = data.missCost;
                this.task = data.task;
                this.recharge = data.recharge;
            };
            return WeiZhengCfg;
        }());
        AcCfg.WeiZhengCfg = WeiZhengCfg;
        __reflect(WeiZhengCfg.prototype, "Config.AcCfg.WeiZhengCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WeiZhengCfg.js.map