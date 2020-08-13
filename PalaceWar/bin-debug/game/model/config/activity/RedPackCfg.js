var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RedPackCfg = (function () {
            function RedPackCfg() {
                //红包总额
                this.totalGem = 0;
                //活动期间充值获得大于等于x元宝即可获得红包收益
                this.gemGet = 0;
                //获得元宝奖励元宝下限
                this.gemRewardMin = 0;
                //获得元宝奖励元宝上限限
                this.gemRewardMax = 0;
                //活动期间获得元宝次数
                this.giftLimit = 0;
            }
            /**
             * 初始化数据
             */
            RedPackCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            //红包总额
            RedPackCfg.prototype.getTotalGem = function () {
                return this.totalGem;
            };
            //活动期间充值获得大于等于x元宝即可获得红包收益
            RedPackCfg.prototype.getGemGet = function () {
                return this.gemGet;
            };
            //获得元宝奖励元宝下限
            RedPackCfg.prototype.getGemRewardMin = function () {
                return this.gemRewardMin;
            };
            //获得元宝奖励元宝上限限
            RedPackCfg.prototype.getGemRewardMax = function () {
                return this.gemRewardMax;
            };
            //活动期间获得元宝次数
            RedPackCfg.prototype.getGiftLimit = function () {
                return this.giftLimit;
            };
            return RedPackCfg;
        }());
        AcCfg.RedPackCfg = RedPackCfg;
        __reflect(RedPackCfg.prototype, "Config.AcCfg.RedPackCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=RedPackCfg.js.map