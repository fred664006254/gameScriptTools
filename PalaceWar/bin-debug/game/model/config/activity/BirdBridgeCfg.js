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
        var BirdBridgeCfg = /** @class */ (function () {
            function BirdBridgeCfg() {
                /**展示时间 */
                this.extraTime = 0;
                //每次行动消耗道具
                this.needItem = null;
                /**每日免费次数 */
                this.freeTime = 0;
                this.basePool = null;
                /**许愿奖励  */
                this.wish = [];
                /**  活动期间的累计充值奖励  */
                this.teaRecharge = [];
                /** 个人进度奖励  */
                this.achievementOne = [];
                /**  全服进度奖励  */
                this.achievementAll = [];
            }
            BirdBridgeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (key == "wish") {
                        this.wish = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BirdBridgeWishItem();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = i + 1;
                            var rewardVo = GameData.formatRewardItem(itemcfg.getReward)[0];
                            var itemCfg = Config.ItemCfg.getItemCfgById(rewardVo.id);
                            if (rewardVo.type == 6 && itemCfg && itemCfg.servantSkinID) {
                                if (!Api.switchVoApi.checkIsServantSkinState(String(itemCfg.servantSkinID))) {
                                    continue;
                                }
                            }
                            this.wish.push(itemcfg);
                        }
                    }
                    else if (key == "teaRecharge") {
                        this.teaRecharge = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BirdBridgeRechargeItem();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = i + 1;
                            this.teaRecharge.push(itemcfg);
                        }
                    }
                    else if (key == "achievementOne") {
                        this.achievementOne = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BirdBridgeAchievementOneItem();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = i + 1;
                            this.achievementOne.push(itemcfg);
                        }
                    }
                    else if (key == "achievementAll") {
                        this.achievementAll = [];
                        for (var i = 0; i < data[key].length; i++) {
                            var itemcfg = new BirdBridgeAchievementAllItem();
                            itemcfg.initData(data[key][i]);
                            itemcfg.id = i + 1;
                            this.achievementAll.push(itemcfg);
                        }
                    }
                    else {
                        this["" + key] = data[key];
                    }
                }
            };
            BirdBridgeCfg.prototype.getWishCfg = function (idx) {
                for (var i = 0; i < this.wish.length; i++) {
                    var onecfg = this.wish[i];
                    if (onecfg.id == idx) {
                        return onecfg;
                    }
                }
                return null;
            };
            BirdBridgeCfg.prototype.getPoolRewards = function () {
                var str = "";
                for (var k in this.basePool) {
                    str += this.basePool[k][0] + "|";
                }
                str = str.substring(0, str.length - 1);
                return str;
            };
            return BirdBridgeCfg;
        }());
        AcCfg.BirdBridgeCfg = BirdBridgeCfg;
        var BirdBridgeWishItem = /** @class */ (function (_super) {
            __extends(BirdBridgeWishItem, _super);
            function BirdBridgeWishItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortId = 0;
                return _this;
            }
            return BirdBridgeWishItem;
        }(BaseItemCfg));
        AcCfg.BirdBridgeWishItem = BirdBridgeWishItem;
        var BirdBridgeRechargeItem = /** @class */ (function (_super) {
            __extends(BirdBridgeRechargeItem, _super);
            function BirdBridgeRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needGem = 0;
                _this.sortId = 0;
                return _this;
            }
            return BirdBridgeRechargeItem;
        }(BaseItemCfg));
        AcCfg.BirdBridgeRechargeItem = BirdBridgeRechargeItem;
        var BirdBridgeAchievementOneItem = /** @class */ (function (_super) {
            __extends(BirdBridgeAchievementOneItem, _super);
            function BirdBridgeAchievementOneItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needNum = 0;
                _this.sortId = 0;
                return _this;
            }
            return BirdBridgeAchievementOneItem;
        }(BaseItemCfg));
        AcCfg.BirdBridgeAchievementOneItem = BirdBridgeAchievementOneItem;
        var BirdBridgeAchievementAllItem = /** @class */ (function (_super) {
            __extends(BirdBridgeAchievementAllItem, _super);
            function BirdBridgeAchievementAllItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = null;
                _this.needNum1 = 0;
                _this.needNum2 = 0;
                _this.sortId = 0;
                return _this;
            }
            return BirdBridgeAchievementAllItem;
        }(BaseItemCfg));
        AcCfg.BirdBridgeAchievementAllItem = BirdBridgeAchievementAllItem;
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=BirdBridgeCfg.js.map