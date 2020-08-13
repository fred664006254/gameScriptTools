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
        * 金蛋赠礼 的 cfg
        * @author hyd
        * date 2019/9/4
        * @class SmashEggCfg
        */
        var SmashEggCfg = (function () {
            function SmashEggCfg() {
                this.extraTime = 0;
                this.freeTime = 0;
                this.getScore = 0;
                this.buy1 = null;
                this.buy2 = null;
                this.useItem = '';
                this.goldenEggNum = 0;
                this.goldenEggRatio = 0;
                this.itemExchange = null;
                this.normalEgg = null;
                this.goldenEgg = null;
                /**充值列表 */
                this.achievementItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            SmashEggCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.achievementItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemCfg = new SmashEggAchievementItemCfg();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = Number(i + 1);
                            this.achievementItemCfgList.push(itemCfg);
                        }
                    }
                }
            };
            //获取元宝消耗 1:单次  2:十次
            SmashEggCfg.prototype.getCost = function (type) {
                return GameData.formatRewardItem(this['buy' + type].cost)[0].num;
            };
            /**最大的进度 */
            SmashEggCfg.prototype.getMaxAchievementValue = function () {
                for (var key in this.achievementItemCfgList) {
                    if (this.achievementItemCfgList[key].id == this.achievementItemCfgList.length) {
                        return this.achievementItemCfgList[key].needNum;
                    }
                }
            };
            return SmashEggCfg;
        }());
        AcCfg.SmashEggCfg = SmashEggCfg;
        __reflect(SmashEggCfg.prototype, "Config.AcCfg.SmashEggCfg");
        /**活动期间，进度奖励 */
        var SmashEggAchievementItemCfg = (function (_super) {
            __extends(SmashEggAchievementItemCfg, _super);
            function SmashEggAchievementItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SmashEggAchievementItemCfg;
        }(BaseItemCfg));
        AcCfg.SmashEggAchievementItemCfg = SmashEggAchievementItemCfg;
        __reflect(SmashEggAchievementItemCfg.prototype, "Config.AcCfg.SmashEggAchievementItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SmashEggCfg.js.map