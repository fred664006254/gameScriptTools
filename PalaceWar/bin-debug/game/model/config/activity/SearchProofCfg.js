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
        /**
        * 搜查魏府 的 cfg
        * @author 张朝阳
        * date 2019/6/3
        * @class ArcadeCfg
        */
        var SearchProofCfg = (function () {
            function SearchProofCfg() {
                this.extraTime = 0;
                this.freeTime = 0;
                this.mustGet1 = 0;
                this.mustGet2 = null;
                this.itemExchange = null;
                this.rewardPool = null;
                this.exchange = null;
                /**充值列表 */
                this.rechargeItemListCfg = [];
                /**充值列表 */
                this.achievementItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            SearchProofCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["" + key] = data[key];
                    if (key == "recharge") {
                        this.rechargeItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new SearchProofRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "achievement") {
                        this.achievementItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new SearchProofAchievementItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i + 1);
                            this.achievementItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            /**奖池 */
            SearchProofCfg.prototype.rewardPoolList = function () {
                var rewards = "";
                for (var key in this.rewardPool) {
                    rewards += this.rewardPool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            /**最大的进度 */
            SearchProofCfg.prototype.getMaxAchievementValue = function () {
                for (var key in this.achievementItemCfgList) {
                    if (this.achievementItemCfgList[key].id == this.achievementItemCfgList.length) {
                        return this.achievementItemCfgList[key].needNum;
                    }
                }
            };
            return SearchProofCfg;
        }());
        AcCfg.SearchProofCfg = SearchProofCfg;
        __reflect(SearchProofCfg.prototype, "Config.AcCfg.SearchProofCfg");
        /**
         * 充值的
         */
        var SearchProofRechargeItemCfg = (function (_super) {
            __extends(SearchProofRechargeItemCfg, _super);
            function SearchProofRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SearchProofRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.SearchProofRechargeItemCfg = SearchProofRechargeItemCfg;
        __reflect(SearchProofRechargeItemCfg.prototype, "Config.AcCfg.SearchProofRechargeItemCfg");
        /**活动期间，进度奖励 */
        var SearchProofAchievementItemCfg = (function (_super) {
            __extends(SearchProofAchievementItemCfg, _super);
            function SearchProofAchievementItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SearchProofAchievementItemCfg;
        }(BaseItemCfg));
        AcCfg.SearchProofAchievementItemCfg = SearchProofAchievementItemCfg;
        __reflect(SearchProofAchievementItemCfg.prototype, "Config.AcCfg.SearchProofAchievementItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SearchProofCfg.js.map