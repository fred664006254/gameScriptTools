var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var SeaWomanCfg = /** @class */ (function () {
            function SeaWomanCfg() {
                /**展示时间 */
                this.extraTime = 0;
                /**每充值x元宝获得一次翻牌次数 */
                this.cost = 0;
                /**每日免费次数 */
                this.freeTime = 0;
                /**兑换奖励及所需道具数量 */
                this.change = null;
                this.seaPool = null;
                this.seaPool2 = null;
                /**翻牌次数进度奖励 */
                this.chessNum = [];
            }
            SeaWomanCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (key == "chessNum") {
                        this.chessNum = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new SeaWomanChessNumItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = i + 1;
                            this.chessNum.push(itemcfg);
                        }
                    }
                    else {
                        this["" + key] = data[key];
                    }
                }
            };
            SeaWomanCfg.prototype.getPlayAwards = function () {
                return [this.seaPool, this.seaPool2];
            };
            return SeaWomanCfg;
        }());
        AcCfg.SeaWomanCfg = SeaWomanCfg;
        var SeaWomanChessNumItemCfg = /** @class */ (function (_super) {
            __extends(SeaWomanChessNumItemCfg, _super);
            function SeaWomanChessNumItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortId = 0;
                return _this;
            }
            return SeaWomanChessNumItemCfg;
        }(BaseItemCfg));
        AcCfg.SeaWomanChessNumItemCfg = SeaWomanChessNumItemCfg;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SeaWomanCfg.js.map