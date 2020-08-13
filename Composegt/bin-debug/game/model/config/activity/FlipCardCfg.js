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
        var FlipCardCfg = (function () {
            function FlipCardCfg() {
                //价格区间
                this.costRange = [];
                //铜色1张卡牌进度值
                this.copperyCardValue = 1;
                // --银色1张卡牌进度值
                this.silveryCardValue = 2;
                //--金色1张卡牌进度值
                this.goldenCardValu = 4;
                //--进度兑换
                this.valueMax = 150;
                //--银卡数量；必然有1个位置是银卡，可能有1个位置是金卡（不是金卡时是铜卡），其余是铜卡
                this.silveryCardNum = 1;
                //--金卡出现概率；6张牌中最多1个
                this.goldenCardRate = 0.1;
                //--刷新卡牌价格（元宝）
                this.refrestPrice = 50;
                //--抽取铜卡奖励池
                this.copperyPool = [];
                // {
                // 	{"6_1301_1",70,0,0},
                // 	{"6_1303_2",20,0,0},
                // 	{"6_1302_3",10,0,0},
                // },
                this.wifeID = undefined;
                //--抽取银卡奖励池
                this.silveryPool = [];
                //--抽取金卡奖励池
                this.goldenPool = [];
                this.ReviewNum = [];
                this._task = [];
                this.taskList = [];
            }
            Object.defineProperty(FlipCardCfg.prototype, "task", {
                get: function () {
                    return this.taskList;
                },
                enumerable: true,
                configurable: true
            });
            FlipCardCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (key == "task") {
                            this.taskList = [];
                            var i = 0;
                            for (var k in data[key]) {
                                var itemcfg = new FlipCardTaskItemCfg();
                                itemcfg.initData(data[key][k]);
                                itemcfg.id = String(i + 1);
                                this.taskList.push(itemcfg);
                                i++;
                            }
                        }
                        else {
                            this[key] = data[key];
                        }
                    }
                }
            };
            FlipCardCfg.prototype.getCardAddVaule = function (ctype) {
                if (ctype == 3) {
                    return this.copperyCardValue;
                }
                else if (ctype == 2) {
                    return this.silveryCardValue;
                }
                else if (ctype == 1) {
                    return this.goldenCardValu;
                }
                return 0;
            };
            FlipCardCfg.prototype.getWifeID = function () {
                return this.wifeID;
            };
            return FlipCardCfg;
        }());
        AcCfg.FlipCardCfg = FlipCardCfg;
        __reflect(FlipCardCfg.prototype, "Config.AcCfg.FlipCardCfg");
        /**
         * 任务的
         */
        var FlipCardTaskItemCfg = (function (_super) {
            __extends(FlipCardTaskItemCfg, _super);
            function FlipCardTaskItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.openType = null;
                return _this;
            }
            return FlipCardTaskItemCfg;
        }(BaseItemCfg));
        AcCfg.FlipCardTaskItemCfg = FlipCardTaskItemCfg;
        __reflect(FlipCardTaskItemCfg.prototype, "Config.AcCfg.FlipCardTaskItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
/**
 * ["activity.getflipcardreward"] = "翻牌活动-单次翻牌奖励",
    --参数 activeId 活动Id
    --参数 抽奖 tid   X
    --返回 model activity
    --返回 model rewards奖励信息
    
    
    ["activity.getflipcardallreward"] = "翻牌活动-剩余牌全部翻奖励",
    --参数 activeId 活动Id
    --返回 model activity
    --返回 model rewards奖励信息
    
    
    ["activity.getflipcardreplace"] = "翻牌活动-刷新牌组",
    --参数 activeId 活动Id
    --返回 model activity
    
    
    ["activity.getflipcardboxreward"] = "翻牌活动-领取箱子奖励",
    --参数 activeId 活动Id
    --参数 gid：第几阶段
    --返回 model activity
    --返回 model rewards奖励信息
    
    
    ["activity.getflipcardtaskreward"] = "翻牌活动-领取任务奖励",
    --参数 activeId 活动Id
    --参数 taskId 任务档位id
    --返回 model activity,userinfo,item
    --返回 data.rewards 奖励



 */
