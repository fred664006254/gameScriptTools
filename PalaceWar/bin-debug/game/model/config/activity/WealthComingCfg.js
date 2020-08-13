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
        var WealthComingCfg = (function () {
            function WealthComingCfg() {
                /**财运与触发概率关系 */
                this.luckyRateItemCfgList = [];
                /**财运进度奖励奖池 */
                this.rewardProcessItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            WealthComingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "luckyRate") {
                        this.luckyRateItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new LuckyRateItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.luckyRateItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "rewardProcess") {
                        this.rewardProcessItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new RewardProcessItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rewardProcessItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            /**解析财神奖池 */
            WealthComingCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var key in this.wealthGod) {
                    rewards += this.wealthGod[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            return WealthComingCfg;
        }());
        AcCfg.WealthComingCfg = WealthComingCfg;
        __reflect(WealthComingCfg.prototype, "Config.AcCfg.WealthComingCfg");
        /**
         * 财运与触发概率关系item
         */
        var LuckyRateItemCfg = (function (_super) {
            __extends(LuckyRateItemCfg, _super);
            function LuckyRateItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LuckyRateItemCfg.prototype, "minRange", {
                /**财运范围最小值 */
                get: function () {
                    return this.range[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LuckyRateItemCfg.prototype, "maxRange", {
                /**财运范围最小值 */
                get: function () {
                    return this.range[1];
                },
                enumerable: true,
                configurable: true
            });
            return LuckyRateItemCfg;
        }(BaseItemCfg));
        AcCfg.LuckyRateItemCfg = LuckyRateItemCfg;
        __reflect(LuckyRateItemCfg.prototype, "Config.AcCfg.LuckyRateItemCfg");
        /**
         * 财运进度奖励item
         */
        var RewardProcessItemCfg = (function (_super) {
            __extends(RewardProcessItemCfg, _super);
            function RewardProcessItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RewardProcessItemCfg;
        }(BaseItemCfg));
        AcCfg.RewardProcessItemCfg = RewardProcessItemCfg;
        __reflect(RewardProcessItemCfg.prototype, "Config.AcCfg.RewardProcessItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WealthComingCfg.js.map