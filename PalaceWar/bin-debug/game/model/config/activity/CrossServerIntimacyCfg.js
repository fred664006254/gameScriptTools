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
        var CrossServerIntimacyCfg = /** @class */ (function () {
            function CrossServerIntimacyCfg() {
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
            CrossServerIntimacyCfg.prototype.formatData = function (data) {
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
                            var item = new CrossServerImacyTaskItemCfg();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this._taskList.push(item);
                        }
                    }
                    else if (key == "flagScoreShop") {
                        this._flagScoreShopList = [];
                        for (var k in data[key]) {
                            var item = new CrossServerImacyFlagScoreItemCfg();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            item.isItem = false;
                            this._flagScoreShopList.push(item);
                        }
                    }
                    else if (key == "flagScoreShop2") {
                        this._flagScoreShop2List = [];
                        for (var k in data[key]) {
                            var item = new CrossServerImacyFlagScoreItemCfg();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            item.isItem = true;
                            this._flagScoreShop2List.push(item);
                        }
                    }
                }
            };
            CrossServerIntimacyCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this._winServer, true, true);
            };
            CrossServerIntimacyCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this._loseServer, true, true);
            };
            CrossServerIntimacyCfg.prototype.getMulServerRewards = function (zonenum) {
                this.judgeParam(zonenum);
                return this._serverList1;
            };
            CrossServerIntimacyCfg.prototype.getMulServerPRankRewards = function () {
                return this._rankList1;
            };
            CrossServerIntimacyCfg.prototype.judgeParam = function (zonenum) {
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
            CrossServerIntimacyCfg.prototype.getServerRankRewards = function () {
                return this._rankList;
            };
            //task
            CrossServerIntimacyCfg.prototype.getTaskList = function () {
                return this._taskList;
            };
            CrossServerIntimacyCfg.prototype.getShopList = function () {
                return this._flagScoreShopList;
            };
            //shop2
            CrossServerIntimacyCfg.prototype.getShop2List = function () {
                return this._flagScoreShop2List;
            };
            return CrossServerIntimacyCfg;
        }());
        AcCfg.CrossServerIntimacyCfg = CrossServerIntimacyCfg;
        //任务
        var CrossServerImacyTaskItemCfg = /** @class */ (function (_super) {
            __extends(CrossServerImacyTaskItemCfg, _super);
            function CrossServerImacyTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossServerImacyTaskItemCfg;
        }(BaseItemCfg));
        //旗帜积分商店
        var CrossServerImacyFlagScoreItemCfg = /** @class */ (function (_super) {
            __extends(CrossServerImacyFlagScoreItemCfg, _super);
            function CrossServerImacyFlagScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossServerImacyFlagScoreItemCfg;
        }(BaseItemCfg));
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CrossServerIntimacyCfg.js.map