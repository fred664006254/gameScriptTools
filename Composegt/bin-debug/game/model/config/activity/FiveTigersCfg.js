var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var FiveTigersCfg = (function () {
            function FiveTigersCfg() {
                this.cost = 0;
                this.servantSkinID = 0;
                this.servantID = 0;
                this.chipID = 0;
                this.chipNum = 0;
                this.exchangeNum = 0;
                this.exchangeItemID = 0;
                this.pool = null;
                this.progress = [];
                this.mainReward = '';
            }
            //解析数据
            FiveTigersCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
                //this.servantSkinID = 10431;
            };
            return FiveTigersCfg;
        }());
        AcCfg.FiveTigersCfg = FiveTigersCfg;
        __reflect(FiveTigersCfg.prototype, "Config.AcCfg.FiveTigersCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
