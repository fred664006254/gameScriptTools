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
    //成长基金
    var GrowgoldCfg;
    (function (GrowgoldCfg) {
        /**
         * 激活基金的价位
         */
        GrowgoldCfg.unlockRecharge = null;
        /**
         * 未购买时的展示期
         */
        GrowgoldCfg.showTime = 0;
        /**
         * 返额力度X倍，前端用
         */
        GrowgoldCfg.power = 0;
        /**
         * 购买后的最长展示期
         */
        GrowgoldCfg.maxShowTime = 0;
        GrowgoldCfg.task = [];
        function formatData(data) {
            GrowgoldCfg.unlockRecharge = data.unlockRecharge;
            GrowgoldCfg.showTime = data.showTime;
            GrowgoldCfg.power = data.power;
            // maxShowTime = data.maxShowTime;
            GrowgoldCfg.task.length = 0;
            for (var key in data.task) {
                var itemCfg = new GrowgoldTaskItemCfg();
                itemCfg.initData(data.task[key]);
                itemCfg.id = Number(key) + 1;
                GrowgoldCfg.task.push(itemCfg);
            }
        }
        GrowgoldCfg.formatData = formatData;
    })(GrowgoldCfg = Config.GrowgoldCfg || (Config.GrowgoldCfg = {}));
    var GrowgoldTaskItemCfg = /** @class */ (function (_super) {
        __extends(GrowgoldTaskItemCfg, _super);
        function GrowgoldTaskItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GrowgoldTaskItemCfg;
    }(BaseItemCfg));
    Config.GrowgoldTaskItemCfg = GrowgoldTaskItemCfg;
})(Config || (Config = {}));
//# sourceMappingURL=GrowgoldCfg.js.map