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
         * 棋社对弈
         * author ycg
         * date 2020.5.6
         * @namespace CheeeCfg
         */
        var ChessCfg = (function () {
            function ChessCfg() {
                this.change = null;
                this.show1 = 0;
                this.show2 = 0;
                this.getReward = null;
                this.poolRewards = null;
                this.achieveList = [];
                this.rechargeList = [];
                this.taskList = [];
                this.long = 0;
                this.weight = 0;
                this.checkerBoard = [];
                this.sepcialLimit = 0;
                //开始剧情
                this.startDialog_1 = {
                    1: {
                        "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": 'skin_full_10631', personBone: "servant_full2_10631", "nameId": "servant_name1063", "clickContinue": true },
                        "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": 'wife_skin_2371', personBone: "wife_full3_2371", "nameId": "wifeName_237", "clickContinue": true },
                        "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": 1, "nameId": "storyNPCName1", "clickContinue": true },
                        "4": { "nextId": null, "descId": 4, "bgId": 6, "personPic": "skin_full_10631", personBone: "servant_full2_10631", "nameId": "servant_name1063", "clickContinue": true },
                    }
                };
            }
            Object.defineProperty(ChessCfg.prototype, "cost1", {
                // public cost1:number = 1;
                // public cost10:number = 10;
                get: function () {
                    return this.cost;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ChessCfg.prototype, "cost10", {
                get: function () {
                    return Math.floor(10 * this.cost * this.discount);
                },
                enumerable: true,
                configurable: true
            });
            ChessCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "chessNum") {
                        for (var k in data[key]) {
                            var item = new ChessAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "chessRecharge") {
                        for (var k in data[key]) {
                            var item = new ChessRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "chessTask") {
                        this.taskList = [];
                        var count = 1;
                        for (var i = 0; i < data[key].length; i++) {
                            for (var item in data[key][i]) {
                                var itemCfg = new AcCfg.FindSameTaskItem();
                                itemCfg.initData(data[key][i][item]);
                                itemCfg.id = String(count);
                                itemCfg.fid = String(i + 1);
                                itemCfg.sid = item;
                                this.taskList.push(itemCfg);
                                count++;
                            }
                        }
                    }
                    else if (key == "chessPool") {
                        var str = "";
                        for (var k in data[key]) {
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            };
            ChessCfg.prototype.getAchieveCfg = function () {
                return this.achieveList;
            };
            ChessCfg.prototype.getRechargeCfg = function () {
                return this.rechargeList;
            };
            ChessCfg.prototype.getTaskCfg = function () {
                return this.taskList;
            };
            ChessCfg.prototype.getPoolRewards = function () {
                return this.poolRewards;
            };
            return ChessCfg;
        }());
        AcCfg.ChessCfg = ChessCfg;
        __reflect(ChessCfg.prototype, "Config.AcCfg.ChessCfg");
        //**进度奖励item */
        var ChessAchieveItem = (function (_super) {
            __extends(ChessAchieveItem, _super);
            function ChessAchieveItem() {
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
            return ChessAchieveItem;
        }(BaseItemCfg));
        AcCfg.ChessAchieveItem = ChessAchieveItem;
        __reflect(ChessAchieveItem.prototype, "Config.AcCfg.ChessAchieveItem");
        /**充值奖励item */
        var ChessRechargeItem = (function (_super) {
            __extends(ChessRechargeItem, _super);
            function ChessRechargeItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                /**所需额度 */
                _this.needGem = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ChessRechargeItem;
        }(BaseItemCfg));
        AcCfg.ChessRechargeItem = ChessRechargeItem;
        __reflect(ChessRechargeItem.prototype, "Config.AcCfg.ChessRechargeItem");
        /**任务奖励item */
        var ChessTaskItem = (function (_super) {
            __extends(ChessTaskItem, _super);
            function ChessTaskItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**id */
                _this.id = null;
                _this.openType = null;
                _this.questType = 0;
                _this.value = 0;
                /**奖励 */
                _this.getReward = null;
                _this.sortId = 0;
                return _this;
            }
            return ChessTaskItem;
        }(BaseItemCfg));
        AcCfg.ChessTaskItem = ChessTaskItem;
        __reflect(ChessTaskItem.prototype, "Config.AcCfg.ChessTaskItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ChessCfg.js.map