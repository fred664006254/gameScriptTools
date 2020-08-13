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
        * 客栈 的 cfg
        * @author 张朝阳
        * date 2018/12/7
        * @class HotelCfg
        */
        var HotelCfg = (function () {
            function HotelCfg() {
                /** 单抽一次的价格 */
                this.hotelCost = 0;
                /** 连续购买十次的折扣 */
                this.hotelDiscount = 0;
                /**展示时间 */
                this.extraTime = 0;
                /**任务列表 */
                this.taskItemListCfg = [];
                /**充值列表 */
                this.rechargeItemCfg = [];
                this.lotteryItemCfg = [];
            }
            /**
             * 初始化数据
             */
            HotelCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this["" + key] = data[key];
                    if (key == "hotelTask") {
                        this.taskItemListCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new HotelTaskItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "hotelRecharge") {
                        this.rechargeItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new HotelRechargeItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.rechargeItemCfg.push(itemcfg);
                        }
                    }
                    if (key == "hotelLotteryNum") {
                        this.lotteryItemCfg = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new HotelLotteryItemCfg();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = String(i + 1);
                            this.lotteryItemCfg.push(itemcfg);
                        }
                    }
                    console.log("11");
                }
            };
            /**
             * 获得充值列表
             */
            HotelCfg.prototype.rechargeList = function () {
                return this.rechargeItemCfg;
            };
            /**
             * 获得任务列表
             */
            HotelCfg.prototype.getTaskList = function () {
                return this.taskItemListCfg;
            };
            HotelCfg.prototype.getTaskValue = function (id) {
                for (var i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id = this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].value;
                    }
                }
                return null;
            };
            /**
             * 获得宝箱列表
             */
            HotelCfg.prototype.getBoxList = function () {
                return this.lotteryItemCfg;
            };
            return HotelCfg;
        }());
        AcCfg.HotelCfg = HotelCfg;
        __reflect(HotelCfg.prototype, "Config.AcCfg.HotelCfg");
        /**
         * 任务的
         */
        var HotelTaskItemCfg = (function (_super) {
            __extends(HotelTaskItemCfg, _super);
            function HotelTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return HotelTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.HotelTaskItemCfg = HotelTaskItemCfg;
        __reflect(HotelTaskItemCfg.prototype, "Config.AcCfg.HotelTaskItemCfg");
        /**
         * 充值的
         */
        var HotelRechargeItemCfg = (function (_super) {
            __extends(HotelRechargeItemCfg, _super);
            function HotelRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return HotelRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.HotelRechargeItemCfg = HotelRechargeItemCfg;
        __reflect(HotelRechargeItemCfg.prototype, "Config.AcCfg.HotelRechargeItemCfg");
        /**
         * 宝箱的
         */
        var HotelLotteryItemCfg = (function (_super) {
            __extends(HotelLotteryItemCfg, _super);
            function HotelLotteryItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return HotelLotteryItemCfg;
        }(BaseItemCfg));
        AcCfg.HotelLotteryItemCfg = HotelLotteryItemCfg;
        __reflect(HotelLotteryItemCfg.prototype, "Config.AcCfg.HotelLotteryItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=HotelCfg.js.map