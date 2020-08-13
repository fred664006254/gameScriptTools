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
         * 神器迷宫
         * author ycg
         * date 2020.4.23
         * @namespace WeaponMazeCfg
         */
        var WeaponMazeCfg = (function () {
            function WeaponMazeCfg() {
                this._rechargeCfgList = [];
                this._achieveCfgList = [];
                this._poolRewardsList = [];
            }
            WeaponMazeCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this._rechargeCfgList = [];
                        for (var k in data[key]) {
                            var item = new WeaponMazeRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this._rechargeCfgList.push(item);
                        }
                    }
                    else if (key == "schedule") {
                        this._achieveCfgList = [];
                        for (var k in data[key]) {
                            var item = new WeaponMazeAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this._achieveCfgList.push(item);
                        }
                    }
                }
                //奖池
                var poolCfg = [];
                var poolStr2 = "";
                for (var k in this.pumpkinPool2) {
                    poolStr2 += this.pumpkinPool2[k][0] + "|";
                }
                var str2 = poolStr2.substring(0, poolStr2.length - 1);
                var poolData2 = { rewards: str2, type: 1 };
                poolCfg.push(poolData2);
                var poolStr = "";
                for (var k in this.pumpkinPool1) {
                    poolStr += this.pumpkinPool1[k][0] + "|";
                }
                var str1 = poolStr.substring(0, poolStr.length - 1);
                var poolData1 = { rewards: str1, type: 2 };
                poolCfg.push(poolData1);
                this._poolRewardsList = poolCfg;
            };
            WeaponMazeCfg.prototype.getRechargeCfgList = function () {
                return this._rechargeCfgList;
            };
            WeaponMazeCfg.prototype.getAchieveCfgList = function () {
                return this._achieveCfgList;
            };
            WeaponMazeCfg.prototype.getPoolRewards = function () {
                return this._poolRewardsList;
            };
            return WeaponMazeCfg;
        }());
        AcCfg.WeaponMazeCfg = WeaponMazeCfg;
        __reflect(WeaponMazeCfg.prototype, "Config.AcCfg.WeaponMazeCfg");
        /**进度奖励item */
        var WeaponMazeAchieveItem = (function (_super) {
            __extends(WeaponMazeAchieveItem, _super);
            function WeaponMazeAchieveItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需分数 */
                _this.needNum = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return WeaponMazeAchieveItem;
        }(BaseItemCfg));
        AcCfg.WeaponMazeAchieveItem = WeaponMazeAchieveItem;
        __reflect(WeaponMazeAchieveItem.prototype, "Config.AcCfg.WeaponMazeAchieveItem");
        /**充值奖励item */
        var WeaponMazeRechargeItem = (function (_super) {
            __extends(WeaponMazeRechargeItem, _super);
            function WeaponMazeRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需额度 */
                _this.needGem = 0;
                /**物品数量 */
                _this.specialGift = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return WeaponMazeRechargeItem;
        }(BaseItemCfg));
        AcCfg.WeaponMazeRechargeItem = WeaponMazeRechargeItem;
        __reflect(WeaponMazeRechargeItem.prototype, "Config.AcCfg.WeaponMazeRechargeItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=WeaponMazeCfg.js.map