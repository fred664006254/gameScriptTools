var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RansackTraitorCfg = (function () {
            function RansackTraitorCfg() {
                //搜查奸臣配置
                //充值X元宝获得1次搜查次数
                this.cost = undefined;
                //单次搜查证物分布空间
                this.Range = []; //{5,10,15,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340},
                //证物上限
                this.RansackItemNum = undefined;
                //奸臣皮肤ID
                this.TraitorSkinId = undefined;
                //100个证物获得奸臣皮肤
                this.RansackReward = undefined;
                //10次搜查必获得1个证物
                this.RansackRewardNum = undefined;
                //每次搜查获得道具
                this.RansackPool = [];
                //皮肤对应门客id
                this.TraitorId = undefined;
                //10次搜查必获得1个证物
                this.RansackItem = undefined;
                //搜查必获得证物ID
                this.RansackItemID = undefined;
            }
            RansackTraitorCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            };
            RansackTraitorCfg.prototype.getRewardSkinId = function () {
                return this.TraitorSkinId;
                // return this.RansackReward.split("_")[1];
            };
            return RansackTraitorCfg;
        }());
        AcCfg.RansackTraitorCfg = RansackTraitorCfg;
        __reflect(RansackTraitorCfg.prototype, "Config.AcCfg.RansackTraitorCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
