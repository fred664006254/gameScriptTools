var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var WifeBattleRankCfg = (function () {
            function WifeBattleRankCfg() {
                this.rankBuff = 0;
                this.wifeBattleBuff = [];
            }
            //解析数据
            WifeBattleRankCfg.prototype.formatData = function (data) {
                // if(data["rankBuff"]){
                //     this.rankBuff = data["rankBuff"];
                // }
                if (data) {
                    for (var key in data) {
                        this[key] = data[key];
                    }
                }
            };
            return WifeBattleRankCfg;
        }());
        AcCfg.WifeBattleRankCfg = WifeBattleRankCfg;
        __reflect(WifeBattleRankCfg.prototype, "Config.AcCfg.WifeBattleRankCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
