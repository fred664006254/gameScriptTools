var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        /**
         * 限时活动配置类
         * author dmj
         * date 2017/11/07
         * @class LimitedRewardCfg
         */
        var LimitedRewardCfg = (function () {
            function LimitedRewardCfg() {
            }
            LimitedRewardCfg.prototype.formatData = function (data) {
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            return LimitedRewardCfg;
        }());
        AcCfg.LimitedRewardCfg = LimitedRewardCfg;
        __reflect(LimitedRewardCfg.prototype, "Config.AcCfg.LimitedRewardCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
