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
        /**锦鲤活动Cfg */
        var LuckyCarpCfg = (function () {
            function LuckyCarpCfg() {
                /**锦鲤奖励 */
                this.rewardItemListCfg = [];
            }
            /**
             * 初始化数据
             */
            LuckyCarpCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "luckyReward") {
                        this.rewardItemListCfg.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new LuckyCarpRewardItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rewardItemListCfg.push(itemcfg);
                        }
                    }
                }
            };
            return LuckyCarpCfg;
        }());
        AcCfg.LuckyCarpCfg = LuckyCarpCfg;
        __reflect(LuckyCarpCfg.prototype, "Config.AcCfg.LuckyCarpCfg");
        /**奖励item */
        var LuckyCarpRewardItemCfg = (function (_super) {
            __extends(LuckyCarpRewardItemCfg, _super);
            function LuckyCarpRewardItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LuckyCarpRewardItemCfg;
        }(BaseItemCfg));
        AcCfg.LuckyCarpRewardItemCfg = LuckyCarpRewardItemCfg;
        __reflect(LuckyCarpRewardItemCfg.prototype, "Config.AcCfg.LuckyCarpRewardItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LuckyCarpCfg.js.map