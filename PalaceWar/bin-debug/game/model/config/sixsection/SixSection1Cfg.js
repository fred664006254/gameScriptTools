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
    /**
     * 皇城六部 兵部
     * author ycg
     * date 2020.5.7
     *
     */
    var Sixsection1Cfg;
    (function (Sixsection1Cfg) {
        Sixsection1Cfg.buildList = [];
        Sixsection1Cfg.directorList = [];
        Sixsection1Cfg.rechargeList = [];
        Sixsection1Cfg.shopCfg = null;
        function formatData(data) {
            for (var key in data) {
                this[key] = data[key];
                if (key == "build1") {
                    for (var k in data[key]) {
                        var item = new SixSection1BuildItem();
                        item.initData(data[key][k]);
                        item.id = k;
                        var index = Number(k.split("t")[1]);
                        item.index = index;
                        item.rowMaxNum = Math.ceil(item.seatNumber / item.perMaxSeat);
                        this.buildList.push(item);
                        this.buildList.sort(function (a, b) { return a.index - b.index; });
                    }
                }
                else if (key == "director1") {
                    for (var k in data[key]) {
                        var item = new SixSection1BuildItem();
                        item.initData(data[key][k]);
                        item.id = k;
                        var index = Number(k.split("s")[1]);
                        item.index = index;
                        this.directorList.push(item);
                        this.directorList.sort(function (a, b) { return a.index - b.index; });
                    }
                }
                else if (key == "recharge") {
                    for (var k in data[key]) {
                        var item = new SixSection1RechargeItem();
                        item.initData(data[key][k]);
                        item.id = Number(k) + 1;
                        this.rechargeList.push(item);
                    }
                }
                else if (key == "shop") {
                    if (!Sixsection1Cfg.shopCfg) {
                        Sixsection1Cfg.shopCfg = new Config.ShopItemCfg();
                    }
                    var allKey = Object.keys(this.shop);
                    Sixsection1Cfg.shopCfg.initData(this.shop[allKey[0]]);
                    Sixsection1Cfg.shopCfg.id = Number(allKey[0]);
                }
            }
            var stNum = 1;
            for (var i = 0; i < this.buildList.length; i++) {
                this.buildList[i].stRowNum = stNum;
                stNum = stNum + this.buildList[i].rowMaxNum;
            }
        }
        Sixsection1Cfg.formatData = formatData;
        function getBuildList() {
            return this.buildList;
        }
        Sixsection1Cfg.getBuildList = getBuildList;
        function getDirectorList() {
            return this.directorList;
        }
        Sixsection1Cfg.getDirectorList = getDirectorList;
        function getRechargeList() {
            return this.rechargeList;
        }
        Sixsection1Cfg.getRechargeList = getRechargeList;
        var SixSection1BuildItem = /** @class */ (function (_super) {
            __extends(SixSection1BuildItem, _super);
            function SixSection1BuildItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.index = 0;
                _this.id = null;
                // --seatNumber:基础席位数量
                _this.seatNumber = 0;
                // --lost:抢夺的资源比例
                _this.lost = 0;
                //--minGetTime:最小领取时间（单位：分）
                _this.minGetTime = 0;
                // --shujijingyanSpeed:书籍经验产出速度（每小时）
                _this.shujijingyanSpeed = 0;
                // --maxTime:有效产出时间（时）
                _this.maxTime = 0;
                // --influenceNeed:抢夺席位所需影响力
                _this.influenceNeed = 0;
                return _this;
            }
            return SixSection1BuildItem;
        }(BaseItemCfg));
        var SixSection1RechargeItem = /** @class */ (function (_super) {
            __extends(SixSection1RechargeItem, _super);
            function SixSection1RechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = 0;
                _this.sortId = 0;
                _this.needGem = 0;
                _this.getReward = null;
                return _this;
            }
            return SixSection1RechargeItem;
        }(BaseItemCfg));
    })(Sixsection1Cfg = Config.Sixsection1Cfg || (Config.Sixsection1Cfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=SixSection1Cfg.js.map