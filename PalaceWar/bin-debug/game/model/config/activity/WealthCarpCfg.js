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
        /**彩蛋活动Cfg */
        var WealthCarpCfg = (function () {
            function WealthCarpCfg() {
                /**彩蛋奖励 */
                this.rewardItemListCfg = [];
            }
            /**
             * 初始化数据
             */
            WealthCarpCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "wealthReward") {
                        this.rewardItemListCfg.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new WealthCarpRewardItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rewardItemListCfg.push(itemcfg);
                        }
                    }
                }
            };
            return WealthCarpCfg;
        }());
        AcCfg.WealthCarpCfg = WealthCarpCfg;
        __reflect(WealthCarpCfg.prototype, "Config.AcCfg.WealthCarpCfg");
        /**奖励item */
        var WealthCarpRewardItemCfg = (function (_super) {
            __extends(WealthCarpRewardItemCfg, _super);
            function WealthCarpRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return WealthCarpRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.WealthCarpRewardItemCfg = WealthCarpRewardItemCfg;
        __reflect(WealthCarpRewardItemCfg.prototype, "Config.AcCfg.WealthCarpRewardItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WealthCarpCfg.js.map