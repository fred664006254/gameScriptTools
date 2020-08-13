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
        var MarryCfg = (function () {
            function MarryCfg() {
                /** 展示时间 */
                this.extraTime = 0;
                this.battleUseItemCfgList = [];
                this.battleItemCfgList = [];
            }
            /**
             * 初始化数据
             */
            MarryCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "battleUse") {
                        this.battleUseItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BattleUseItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.battleUseItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "battleList") {
                        this.battleItemCfgList = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BattleItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.battleItemCfgList.push(itemcfg);
                        }
                    }
                }
            };
            /**
             * 宝箱
             */
            MarryCfg.prototype.getBattleItemCfgList = function () {
                return this.battleItemCfgList;
            };
            MarryCfg.prototype.getBattleUseItemCfgList = function () {
                return this.battleUseItemCfgList;
            };
            return MarryCfg;
        }());
        AcCfg.MarryCfg = MarryCfg;
        __reflect(MarryCfg.prototype, "Config.AcCfg.MarryCfg");
        /**
         * 消耗的
         */
        var BattleUseItemCfg = (function (_super) {
            __extends(BattleUseItemCfg, _super);
            function BattleUseItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(BattleUseItemCfg.prototype, "drawPoolReward", {
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
            return BattleUseItemCfg;
        }(BaseItemCfg));
        AcCfg.BattleUseItemCfg = BattleUseItemCfg;
        __reflect(BattleUseItemCfg.prototype, "Config.AcCfg.BattleUseItemCfg");
        var BattleItemCfg = (function (_super) {
            __extends(BattleItemCfg, _super);
            function BattleItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BattleItemCfg;
        }(BaseItemCfg));
        AcCfg.BattleItemCfg = BattleItemCfg;
        __reflect(BattleItemCfg.prototype, "Config.AcCfg.BattleItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=MarryCfg.js.map