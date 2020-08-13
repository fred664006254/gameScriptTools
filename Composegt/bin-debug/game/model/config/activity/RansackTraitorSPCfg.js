var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var RansackTraitorSPCfg = (function () {
            function RansackTraitorSPCfg() {
                //搜查奸臣配置
                //充值X元宝获得1次搜查次数
                this.cost = undefined;
                //单次搜查证物分布空间
                this.Range = []; //{5,10,15,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340},
                //证物上限
                this.RansackItemNum = undefined;
                //搜查必获得证物ID
                this.RansackItemID = undefined;
                //10次搜查必获得1个证物
                this.RansackRewardNum = undefined;
                this.exchangeShop = null;
            }
            RansackTraitorSPCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                }
            };
            RansackTraitorSPCfg.prototype.getRewardSkinIdByIndex = function (index) {
                return this.exchangeShop[index];
            };
            return RansackTraitorSPCfg;
        }());
        AcCfg.RansackTraitorSPCfg = RansackTraitorSPCfg;
        __reflect(RansackTraitorSPCfg.prototype, "Config.AcCfg.RansackTraitorSPCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
