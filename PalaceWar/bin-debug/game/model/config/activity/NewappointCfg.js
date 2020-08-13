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
        /**
         * 新服预约
         * author ycg
         * date 2020.6.28
         * @class NewAppointCfg
         */
        var NewappointCfg = /** @class */ (function () {
            function NewappointCfg() {
                this.giftList = [];
                this.taskList = [];
                this.shopList = [];
            }
            NewappointCfg.prototype.formatData = function (data) {
                App.LogUtil.log("NewappointCfg format");
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "giftBag") {
                        this.giftList = [];
                        for (var k in data[key]) {
                            var itemCfg = new NewappoinGiftItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.giftList.push(itemCfg);
                        }
                    }
                    else if (key == "task") {
                        this.taskList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new NewappoinTaskItem();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.taskList.push(itemCfg);
                        }
                    }
                    else if (key == "shop") {
                        this.shopList = [];
                        for (var k in data[key]) {
                            var element = data[key][k];
                            var itemCfg = new NewappoinShopItem();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.shopList.push(itemCfg);
                        }
                    }
                }
            };
            NewappointCfg.prototype.getGiftListCfg = function () {
                return this.giftList;
            };
            NewappointCfg.prototype.getTaskListCfg = function () {
                return this.taskList;
            };
            NewappointCfg.prototype.getShopListCfg = function () {
                return this.shopList;
            };
            return NewappointCfg;
        }());
        AcCfg.NewappointCfg = NewappointCfg;
        /**gift item */
        var NewappoinGiftItem = /** @class */ (function (_super) {
            __extends(NewappoinGiftItem, _super);
            function NewappoinGiftItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.needDay = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return NewappoinGiftItem;
        }(BaseItemCfg));
        AcCfg.NewappoinGiftItem = NewappoinGiftItem;
        /**gift item */
        var NewappoinTaskItem = /** @class */ (function (_super) {
            __extends(NewappoinTaskItem, _super);
            function NewappoinTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = 0;
                /**任务类型  1预约成功 2连续登陆x次 */
                _this.taskType = 0;
                /**任务需求值 */
                _this.taskValue = 0;
                /**奖励 */
                _this.getScore = 0;
                _this.sortId = 0;
                return _this;
            }
            return NewappoinTaskItem;
        }(BaseItemCfg));
        AcCfg.NewappoinTaskItem = NewappoinTaskItem;
        /**gift item */
        var NewappoinShopItem = /** @class */ (function (_super) {
            __extends(NewappoinShopItem, _super);
            function NewappoinShopItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**限购次数 */
                _this.limitTime = 0;
                /**花费积分 */
                _this.costScore = 0;
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return NewappoinShopItem;
        }(BaseItemCfg));
        AcCfg.NewappoinShopItem = NewappoinShopItem;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=NewappointCfg.js.map