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
        var GambleCfg = (function () {
            function GambleCfg() {
                /**
                 *押金范围
                 */
                this.gambDeposit = [];
                /**
                 * 赌坊奖励设置
                 */
                this.gambPrize = {};
            }
            GambleCfg.prototype.formatData = function (data) {
                this.gambNum = data.gambNum;
                this.extraTime = data.extraTime;
                this.gambDeposit = data.gambDeposit;
                // if(data.exchange){
                //     this.exchange = data.exchange;
                // }
                for (var key in data.gambPrize) {
                    var itemCfg = void 0;
                    var index = Number(key);
                    if (!this.gambPrize.hasOwnProperty(String(index))) {
                        this.gambPrize[String(index)] = new GambPrizeItem();
                    }
                    itemCfg = this.gambPrize[String(index)];
                    itemCfg.initData(data.gambPrize[index]);
                    itemCfg.id = index;
                }
            };
            return GambleCfg;
        }());
        AcCfg.GambleCfg = GambleCfg;
        __reflect(GambleCfg.prototype, "Config.AcCfg.GambleCfg");
        var GambPrizeItem = (function (_super) {
            __extends(GambPrizeItem, _super);
            function GambPrizeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * wrong
                 */
                _this.wrong = {};
                /**
                 * stop
                 */
                _this.stop = {};
                return _this;
            }
            return GambPrizeItem;
        }(BaseItemCfg));
        __reflect(GambPrizeItem.prototype, "GambPrizeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=GambleCfg.js.map