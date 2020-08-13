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
        var ThxgivingCfg = (function () {
            function ThxgivingCfg() {
            }
            //解析数据
            ThxgivingCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];
                    }
                    if (key == "feast") {
                        this.feastList = [];
                        var i = 0;
                        for (var k in data[key]) {
                            var itemcfg = new ThxgivingFeastItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i + 1);
                            this.feastList.push(itemcfg);
                            i++;
                        }
                    }
                }
            };
            ThxgivingCfg.prototype.getMaxBoxNeedNum = function () {
                return this.exchangeNum;
            };
            ThxgivingCfg.prototype.getFeastList = function () {
                return this.feastList;
            };
            return ThxgivingCfg;
        }());
        AcCfg.ThxgivingCfg = ThxgivingCfg;
        __reflect(ThxgivingCfg.prototype, "Config.AcCfg.ThxgivingCfg");
        var ThxgivingFeastItemCfg = (function (_super) {
            __extends(ThxgivingFeastItemCfg, _super);
            function ThxgivingFeastItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * 奖励
                 */
                _this.getReward = "";
                return _this;
            }
            Object.defineProperty(ThxgivingFeastItemCfg.prototype, "rewardIcons", {
                get: function () {
                    return GameData.getRewardItemIcons(this.getReward, true, false);
                },
                enumerable: true,
                configurable: true
            });
            return ThxgivingFeastItemCfg;
        }(BaseItemCfg));
        AcCfg.ThxgivingFeastItemCfg = ThxgivingFeastItemCfg;
        __reflect(ThxgivingFeastItemCfg.prototype, "Config.AcCfg.ThxgivingFeastItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
