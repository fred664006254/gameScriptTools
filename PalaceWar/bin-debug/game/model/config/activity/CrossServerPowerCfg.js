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
         * 亲密配置
         */
        var CrossServerPowerCfg = /** @class */ (function () {
            function CrossServerPowerCfg() {
                //发奖规则
                this.rewardList = [];
                //助威人排名返还
                this.flagScoreRebate = [];
                //任务
                this._taskList = [];
                //积分商店
                this._flagScoreShopList = [];
                //道具商店
                this._flagScoreShop2List = [];
            }
            CrossServerPowerCfg.prototype.formatData = function (data) {
                this._winServer = data.winServer;
                this._loseServer = data.loseServer;
                this._rankList = data.rankList;
                this._rankList1 = data.rankList1;
                this._serverList1 = data.serverList1;
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "task") {
                        this._taskList = [];
                        for (var k in data[key]) {
                            var item = new CrossServerPowerTaskItemCfg();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this._taskList.push(item);
                        }
                    }
                    else if (key == "flagScoreShop") {
                        this._flagScoreShopList = [];
                        for (var k in data[key]) {
                            var item = new CrossServerPowerFlagScoreItemCfg();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            item.isItem = false;
                            this._flagScoreShopList.push(item);
                        }
                    }
                    else if (key == "flagScoreShop2") {
                        this._flagScoreShop2List = [];
                        for (var k in data[key]) {
                            var item = new CrossServerPowerFlagScoreItemCfg();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            item.isItem = true;
                            this._flagScoreShop2List.push(item);
                        }
                    }
                }
            };
            CrossServerPowerCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this._winServer, true, true);
            };
            CrossServerPowerCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this._loseServer, true, true);
            };
            CrossServerPowerCfg.prototype.getMulServerRewards = function (zonenum) {
                this.judgeParam(zonenum);
                return this._serverList1;
            };
            CrossServerPowerCfg.prototype.getMulServerPRankRewards = function () {
                return this._rankList1;
            };
            CrossServerPowerCfg.prototype.judgeParam = function (zonenum) {
                for (var i in this._serverList1) {
                    var unit = this._serverList1[i];
                    if (zonenum <= Number(unit.rank[1])) {
                        unit.rank[1] = zonenum;
                        break;
                    }
                }
                for (var j in this._serverList1) {
                    if (Number(i) < Number(j)) {
                        delete this._serverList1[j];
                    }
                }
            };
            CrossServerPowerCfg.prototype.getServerRankRewards = function () {
                return this._rankList;
            };
            //task
            CrossServerPowerCfg.prototype.getTaskList = function () {
                return this._taskList;
            };
            //shop
            CrossServerPowerCfg.prototype.getShopList = function () {
                return this._flagScoreShopList;
            };
            //shop2
            CrossServerPowerCfg.prototype.getShop2List = function () {
                return this._flagScoreShop2List;
            };
            return CrossServerPowerCfg;
        }());
        AcCfg.CrossServerPowerCfg = CrossServerPowerCfg;
        //任务
        var CrossServerPowerTaskItemCfg = /** @class */ (function (_super) {
            __extends(CrossServerPowerTaskItemCfg, _super);
            function CrossServerPowerTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossServerPowerTaskItemCfg;
        }(BaseItemCfg));
        //旗帜积分商店
        var CrossServerPowerFlagScoreItemCfg = /** @class */ (function (_super) {
            __extends(CrossServerPowerFlagScoreItemCfg, _super);
            function CrossServerPowerFlagScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossServerPowerFlagScoreItemCfg;
        }(BaseItemCfg));
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CrossServerPowerCfg.js.map