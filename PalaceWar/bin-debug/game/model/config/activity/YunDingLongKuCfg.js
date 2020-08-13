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
        var YunDingLongKuCfg = (function () {
            function YunDingLongKuCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                this.battleUseItemCfgList = [];
                this.battleItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            YunDingLongKuCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "battleUse") {
                        this.battleUseItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new AcCfg.BattleUseItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.battleUseItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "battleList") {
                        this.battleItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new AcCfg.BattleItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.battleItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            return YunDingLongKuCfg;
        }());
        AcCfg.YunDingLongKuCfg = YunDingLongKuCfg;
        __reflect(YunDingLongKuCfg.prototype, "Config.AcCfg.YunDingLongKuCfg");
        /**
         * 消耗的
         */
        var YunDingLongKuBattleUseItemCfg = (function (_super) {
            __extends(YunDingLongKuBattleUseItemCfg, _super);
            function YunDingLongKuBattleUseItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(YunDingLongKuBattleUseItemCfg.prototype, "drawPoolReward", {
                /**奖励 */
                get: function () {
                    var rewardStr = "";
                    for (var i = 0; i < this.drawPool.length; i++) {
                        if (i == this.drawPool.length - 1) {
                            rewardStr += this.drawPool[i][0];
                        }
                        else {
                            rewardStr += this.drawPool[i][0] + "|";
                        }
                    }
                    return rewardStr;
                },
                enumerable: true,
                configurable: true
            });
            return YunDingLongKuBattleUseItemCfg;
        }(BaseItemCfg));
        AcCfg.YunDingLongKuBattleUseItemCfg = YunDingLongKuBattleUseItemCfg;
        __reflect(YunDingLongKuBattleUseItemCfg.prototype, "Config.AcCfg.YunDingLongKuBattleUseItemCfg");
        var YunDingLongKuBattleItemCfg = (function (_super) {
            __extends(YunDingLongKuBattleItemCfg, _super);
            function YunDingLongKuBattleItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return YunDingLongKuBattleItemCfg;
        }(BaseItemCfg));
        AcCfg.YunDingLongKuBattleItemCfg = YunDingLongKuBattleItemCfg;
        __reflect(YunDingLongKuBattleItemCfg.prototype, "Config.AcCfg.YunDingLongKuBattleItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=YunDingLongKuCfg.js.map