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
        var DailyActivityCfg = (function () {
            function DailyActivityCfg() {
                this.itemListCfg = {};
            }
            DailyActivityCfg.prototype.formatData = function (data) {
                if (data && data.dailyActivity) {
                    var dailyActivity = data.dailyActivity;
                    for (var key in dailyActivity) {
                        var itemCfg = void 0;
                        if (!this.itemListCfg.hasOwnProperty(String(key))) {
                            this.itemListCfg[String(key)] = new DailyActivityItemCfg();
                        }
                        itemCfg = this.itemListCfg[String(key)];
                        itemCfg.initData(dailyActivity[key]);
                        itemCfg.id = String(key);
                    }
                }
            };
            DailyActivityCfg.prototype.getList = function () {
                return this.itemListCfg;
            };
            DailyActivityCfg.prototype.getRechargeItemById = function (id) {
                return this.itemListCfg[id];
            };
            return DailyActivityCfg;
        }());
        AcCfg.DailyActivityCfg = DailyActivityCfg;
        __reflect(DailyActivityCfg.prototype, "Config.AcCfg.DailyActivityCfg");
        var DailyActivityItemCfg = (function (_super) {
            __extends(DailyActivityItemCfg, _super);
            function DailyActivityItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DailyActivityItemCfg;
        }(BaseItemCfg));
        AcCfg.DailyActivityItemCfg = DailyActivityItemCfg;
        __reflect(DailyActivityItemCfg.prototype, "Config.AcCfg.DailyActivityItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=DailyActivityCfg.js.map