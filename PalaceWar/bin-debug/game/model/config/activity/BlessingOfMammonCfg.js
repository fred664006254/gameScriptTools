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
         * 财神祝福
         * author yangchengguo
         * date 2020.2.13
         * @namespace BlessingOfMammonCfg
         */
        var BlessingOfMammonCfg = (function () {
            function BlessingOfMammonCfg() {
                this.boxListData = [];
            }
            BlessingOfMammonCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "boxList") {
                        this.boxListData = [];
                        for (var k in data[key]) {
                            var itemCfg = new BlessingOfMammonBoxItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.boxListData.push(itemCfg);
                        }
                    }
                }
            };
            BlessingOfMammonCfg.prototype.getBoxListCfg = function () {
                return this.boxListData;
            };
            return BlessingOfMammonCfg;
        }());
        AcCfg.BlessingOfMammonCfg = BlessingOfMammonCfg;
        __reflect(BlessingOfMammonCfg.prototype, "Config.AcCfg.BlessingOfMammonCfg");
        /**进度奖励item */
        var BlessingOfMammonBoxItemCfg = (function (_super) {
            __extends(BlessingOfMammonBoxItemCfg, _super);
            function BlessingOfMammonBoxItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需额度 */
                _this.needGem = null;
                /**奖励 */
                _this.getReward = null;
                _this.gemDrop = {};
                _this.sortId = 0;
                return _this;
            }
            return BlessingOfMammonBoxItemCfg;
        }(BaseItemCfg));
        AcCfg.BlessingOfMammonBoxItemCfg = BlessingOfMammonBoxItemCfg;
        __reflect(BlessingOfMammonBoxItemCfg.prototype, "Config.AcCfg.BlessingOfMammonBoxItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=BlessingOfMammonCfg.js.map