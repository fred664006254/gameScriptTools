var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var SurprisedgiftCfg = (function () {
            function SurprisedgiftCfg() {
                this.ratio = 0;
                this.tokencost = [];
                this.drawlimited = 0;
                this.tokenlimited = 0;
                this.surprisedgift = [];
                this.totlelimited = 0;
            }
            /**
             * 初始化数据
             */
            SurprisedgiftCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                }
            };
            //活动期间每充值 10 元宝获得 1 个代币
            SurprisedgiftCfg.prototype.getRatio = function () {
                return this.ratio;
            };
            //抽奖消耗
            SurprisedgiftCfg.prototype.getCost = function () {
                return this.tokencost;
            };
            //每天抽奖次数限制
            SurprisedgiftCfg.prototype.getLimit = function () {
                return this.drawlimited;
            };
            // 惊喜回馈转盘
            SurprisedgiftCfg.prototype.getGiftList = function () {
                return this.surprisedgift;
            };
            return SurprisedgiftCfg;
        }());
        AcCfg.SurprisedgiftCfg = SurprisedgiftCfg;
        __reflect(SurprisedgiftCfg.prototype, "Config.AcCfg.SurprisedgiftCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
