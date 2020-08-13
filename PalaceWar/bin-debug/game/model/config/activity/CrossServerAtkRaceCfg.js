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
         * 擂台配置
         */
        var CrossServerAtkRaceCfg = /** @class */ (function () {
            function CrossServerAtkRaceCfg() {
                this.lastTime = 0;
                this.needLv = 0;
                this.flagPeopleNum = 10;
                this.flagScoreNum1 = 10;
                this.flagScoreNum2 = 10;
                //任务
                this._taskList = [];
                //积分商店
                this._flagScoreShopList = [];
                //道具商店
                this._flagScoreShop2List = [];
            }
            CrossServerAtkRaceCfg.prototype.formatData = function (data) {
                this.unlock = data.unlock;
                this.servantLv = data.servantLv;
                this.dailyNum = data.dailyNum;
                this.intervalTime = data.intervalTime;
                this.fightAdd = data.fightAdd;
                this.revenge = data.revenge;
                this.challenge = data.challenge;
                this.hunt = data.hunt;
                this.parameter1 = data.parameter1;
                this.parameter3 = data.parameter3;
                this.iniAtt = data.iniAtt;
                this.juniorAtt = data.juniorAtt;
                this.mediumAtt = data.mediumAtt;
                this.seniorAtt = data.seniorAtt;
                this.winServer = data.winServer;
                this.loseServer = data.loseServer;
                this.rankList = data.rankList;
                this.rankList1 = data.rankList1;
                this.serverList1 = data.serverList1;
                this.change = data.change;
                this.extraTime = data.extraTime;
                this.flagScoreRebate = data.flagScoreRebate;
                this.needLv = data.needLv;
                this.lastTime = data.lastTime;
                this.flagPeopleNum = data.flagPeopleNum;
                this.flagScoreNum1 = data.flagScoreNum1;
                this.flagScoreNum2 = data.flagScoreNum2;
                if (data["task"]) {
                    this._taskList = [];
                    for (var k in data["task"]) {
                        var item = new CrossAtkraceTaskItemCfg();
                        item.initData(data["task"][k]);
                        item.id = Number(k) + 1;
                        this._taskList.push(item);
                    }
                }
                if (data["flagScoreShop"]) {
                    this._flagScoreShopList = [];
                    for (var k in data["flagScoreShop"]) {
                        var item = new CrossAtkraceFlagScoreItemCfg();
                        item.initData(data["flagScoreShop"][k]);
                        item.id = Number(k) + 1;
                        item.isItem = false;
                        this._flagScoreShopList.push(item);
                    }
                }
                if (data["flagScoreShop2"]) {
                    this._flagScoreShop2List = [];
                    for (var k in data["flagScoreShop2"]) {
                        var item = new CrossAtkraceFlagScoreItemCfg();
                        item.initData(data["flagScoreShop2"][k]);
                        item.id = Number(k) + 1;
                        item.isItem = true;
                        this._flagScoreShop2List.push(item);
                    }
                }
            };
            /**
             * 每日武馆次数
             */
            CrossServerAtkRaceCfg.prototype.getDailyNum = function () {
                return this.dailyNum;
            };
            /**
             * 额外出战系数
             */
            CrossServerAtkRaceCfg.prototype.getParameter1 = function () {
                return this.parameter1;
            };
            /**
             * 门客等级限制
             */
            CrossServerAtkRaceCfg.prototype.getServantLv = function () {
                return this.servantLv;
            };
            /**
             * 每次间隔时间 单位（秒）
             */
            CrossServerAtkRaceCfg.prototype.getIntervalTime = function () {
                return this.intervalTime;
            };
            /**
             * 解锁条件  拥有 X 个门客
             */
            CrossServerAtkRaceCfg.prototype.getUnlock = function () {
                return this.unlock;
            };
            /**
             * 初始属性
             */
            CrossServerAtkRaceCfg.prototype.getInitAtt = function (key) {
                return this.iniAtt[key];
            };
            /**
             * 初级属性
             */
            CrossServerAtkRaceCfg.prototype.getJuniorAtt = function (key) {
                return this.juniorAtt[key];
            };
            /**
             * 中级属性
             */
            CrossServerAtkRaceCfg.prototype.getMediumAtt = function (key) {
                return this.mediumAtt[key];
            };
            /**
             * 高级属性
             */
            CrossServerAtkRaceCfg.prototype.getSeniorAtt = function (key) {
                return this.seniorAtt[key];
            };
            CrossServerAtkRaceCfg.prototype.getFightAdd = function () {
                return this.fightAdd;
            };
            /**
             * 上榜条件 击败多少名
             */
            CrossServerAtkRaceCfg.prototype.getbeatNum = function () {
                return this.parameter3;
            };
            CrossServerAtkRaceCfg.prototype.getWinServerRewards = function () {
                return GameData.getRewardItemIcons(this.winServer, true, true);
            };
            CrossServerAtkRaceCfg.prototype.getLossServerRewards = function () {
                return GameData.getRewardItemIcons(this.loseServer, true, true);
            };
            CrossServerAtkRaceCfg.prototype.getServerRankRewards = function () {
                return this.rankList;
            };
            CrossServerAtkRaceCfg.prototype.getMulServerRewards = function (zonenum) {
                this.judgeParam(zonenum);
                return this.serverList1;
            };
            CrossServerAtkRaceCfg.prototype.getMulServerPRankRewards = function () {
                return this.rankList1;
            };
            CrossServerAtkRaceCfg.prototype.judgeParam = function (zonenum) {
                for (var i in this.serverList1) {
                    var unit = this.serverList1[i];
                    if (zonenum <= Number(unit.rank[1])) {
                        unit.rank[1] = zonenum;
                        break;
                    }
                }
                for (var j in this.serverList1) {
                    if (Number(i) < Number(j)) {
                        delete this.serverList1[j];
                    }
                }
            };
            //task
            CrossServerAtkRaceCfg.prototype.getTaskList = function () {
                return this._taskList;
            };
            CrossServerAtkRaceCfg.prototype.getShopList = function () {
                return this._flagScoreShopList;
            };
            //shop2
            CrossServerAtkRaceCfg.prototype.getShop2List = function () {
                return this._flagScoreShop2List;
            };
            return CrossServerAtkRaceCfg;
        }());
        AcCfg.CrossServerAtkRaceCfg = CrossServerAtkRaceCfg;
        var CrossAtkraceTaskItemCfg = /** @class */ (function (_super) {
            __extends(CrossAtkraceTaskItemCfg, _super);
            function CrossAtkraceTaskItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossAtkraceTaskItemCfg;
        }(BaseItemCfg));
        //旗帜积分商店
        var CrossAtkraceFlagScoreItemCfg = /** @class */ (function (_super) {
            __extends(CrossAtkraceFlagScoreItemCfg, _super);
            function CrossAtkraceFlagScoreItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CrossAtkraceFlagScoreItemCfg;
        }(BaseItemCfg));
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=CrossServerAtkRaceCfg.js.map