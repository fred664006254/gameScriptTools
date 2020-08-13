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
        var CrossServerGemExpendCfg = (function () {
            function CrossServerGemExpendCfg() {
                this.type = 11101;
                this.rankList = [];
                this.extraTime = 0;
            }
            CrossServerGemExpendCfg.prototype.formatData = function (data) {
                if (data.extraTime) {
                    this.extraTime = data.extraTime;
                }
                this.rankList = [];
                var i = 0;
                for (var k in data.rankList) {
                    var itemcfg = new GemExpendItemCfg();
                    itemcfg.initData(data.rankList[k]);
                    itemcfg.id = String(i + 1);
                    this.rankList.push(itemcfg);
                    i++;
                }
            };
            CrossServerGemExpendCfg.prototype.getRankList = function () {
                return this.rankList;
            };
            return CrossServerGemExpendCfg;
        }());
        AcCfg.CrossServerGemExpendCfg = CrossServerGemExpendCfg;
        __reflect(CrossServerGemExpendCfg.prototype, "Config.AcCfg.CrossServerGemExpendCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
    var GemExpendItemCfg = (function (_super) {
        __extends(GemExpendItemCfg, _super);
        function GemExpendItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 名次范围
             */
            _this.rank = {};
            return _this;
        }
        GemExpendItemCfg.prototype.formatData = function (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        };
        Object.defineProperty(GemExpendItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons(this.reward, true, false);
            },
            enumerable: true,
            configurable: true
        });
        return GemExpendItemCfg;
    }(BaseItemCfg));
    Config.GemExpendItemCfg = GemExpendItemCfg;
    __reflect(GemExpendItemCfg.prototype, "Config.GemExpendItemCfg");
})(Config || (Config = {}));
