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
        /**投壶活动cfg */
        var ThrowArrowCfg = (function () {
            function ThrowArrowCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                this.superp = 0;
                this.throwArrowPoolListItemCfgList = [];
                this.throwArrowAchievementItemCfgList = [];
                this.throwArrowRechargeItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            ThrowArrowCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.throwArrowRechargeItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ThrowArrowRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.throwArrowRechargeItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "achievement") {
                        this.throwArrowAchievementItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ThrowArrowAchievementItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.throwArrowAchievementItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "poolList") {
                        this.throwArrowPoolListItemCfgList.length = 0;
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new ThrowArrowPoolListItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = Number(i) + 1;
                            this.throwArrowPoolListItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            ThrowArrowCfg.prototype.getLotteryType = function (shootSet) {
                for (var key in this.throwArrowPoolListItemCfgList) {
                    if (shootSet[0] == this.throwArrowPoolListItemCfgList[key].shootSet[0] && shootSet[1] == this.throwArrowPoolListItemCfgList[key].shootSet[1]
                        && shootSet[2] == this.throwArrowPoolListItemCfgList[key].shootSet[2]) {
                        return this.throwArrowPoolListItemCfgList[key].id;
                    }
                }
                return null;
            };
            /**最大的进度 */
            ThrowArrowCfg.prototype.getMaxAchievementValue = function () {
                for (var key in this.throwArrowAchievementItemCfgList) {
                    if (this.throwArrowAchievementItemCfgList[key].id == this.throwArrowAchievementItemCfgList.length) {
                        return this.throwArrowAchievementItemCfgList[key].needNum;
                    }
                }
            };
            return ThrowArrowCfg;
        }());
        AcCfg.ThrowArrowCfg = ThrowArrowCfg;
        __reflect(ThrowArrowCfg.prototype, "Config.AcCfg.ThrowArrowCfg");
        /**奖池列表 */
        var ThrowArrowPoolListItemCfg = (function (_super) {
            __extends(ThrowArrowPoolListItemCfg, _super);
            function ThrowArrowPoolListItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ThrowArrowPoolListItemCfg;
        }(BaseItemCfg));
        AcCfg.ThrowArrowPoolListItemCfg = ThrowArrowPoolListItemCfg;
        __reflect(ThrowArrowPoolListItemCfg.prototype, "Config.AcCfg.ThrowArrowPoolListItemCfg");
        /**进度奖励 */
        var ThrowArrowAchievementItemCfg = (function (_super) {
            __extends(ThrowArrowAchievementItemCfg, _super);
            function ThrowArrowAchievementItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ThrowArrowAchievementItemCfg;
        }(BaseItemCfg));
        AcCfg.ThrowArrowAchievementItemCfg = ThrowArrowAchievementItemCfg;
        __reflect(ThrowArrowAchievementItemCfg.prototype, "Config.AcCfg.ThrowArrowAchievementItemCfg");
        /**活动期间的累计充值奖励 */
        var ThrowArrowRechargeItemCfg = (function (_super) {
            __extends(ThrowArrowRechargeItemCfg, _super);
            function ThrowArrowRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ThrowArrowRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.ThrowArrowRechargeItemCfg = ThrowArrowRechargeItemCfg;
        __reflect(ThrowArrowRechargeItemCfg.prototype, "Config.AcCfg.ThrowArrowRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ThrowArrowCfg.js.map