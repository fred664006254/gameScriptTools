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
        var LanternCfg = (function () {
            function LanternCfg() {
                /**展示时间 */
                this.extraTime = 1;
                /**开关 */
                this.switch = [];
                /**核心奖励 */
                this.coreReward = '';
                /**--每日免费答灯谜次数*/
                this.freeTimes = 1;
                /**--每回答一次增加进度*/
                this.addProcess = 1;
                /**元宵奖池*/
                this.LanternPool = [];
                /**玩家累计答灯谜次数 */
                this.answerList = {};
                /**活动期间的累计充值奖励 */
                this.recharge = {};
            }
            /**
             * 初始化数据
             */
            LanternCfg.prototype.formatData = function (data) {
                this.extraTime = data.extraTime;
                this.switch = data.switch;
                this.coreReward = data.coreReward;
                this.freeTimes = data.freeTimes;
                this.addProcess = data.addProcess;
                this.LanternPool = data.LanternPool;
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.recharge.hasOwnProperty(String(id))) {
                        this.recharge[String(id)] = new LanternRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(id)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
                for (var key in data.answerList) {
                    var itemCfg = void 0;
                    var id = Number(key) + 1;
                    if (!this.answerList.hasOwnProperty(String(id))) {
                        this.answerList[String(id)] = new LanternAnswerItemCfg();
                    }
                    itemCfg = this.answerList[String(id)];
                    itemCfg.initData(data.answerList[key]);
                    itemCfg.id = id;
                }
            };
            LanternCfg.prototype.getCoreRewardGemIdx = function () {
                var num = 5;
                // for(let i in this.recharge){
                //     let unit = this.recharge[i];
                //     if(unit.getReward.indexOf(`10_${this.coreReward}_1`) > -1){
                //         num = Number(i);
                //         break;
                //     }
                // }
                return num;
            };
            LanternCfg.prototype.getCoreRewardType = function (code) {
                var type = '';
                switch (Number(code)) {
                    case 1:
                    case 2:
                    case 3:
                        type = "servantskin";
                        break;
                }
                return type;
            };
            LanternCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.LanternPool) {
                    var unit = this.LanternPool;
                    rewards += unit[i][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            LanternCfg.prototype.getCoreRewardGemNum = function (code) {
                var num = this.answerList[5].answerfrequency; // 5;//Number(code) == 1 ? 10000 : 7500;
                // for(let i in this.recharge){
                //     let unit = this.recharge[i];
                //     if(unit.getReward.indexOf(`10_${this.coreReward}_1`) > -1){
                //         num = unit.needGem;
                //         break;
                //     }
                // }
                return num;
            };
            return LanternCfg;
        }());
        AcCfg.LanternCfg = LanternCfg;
        __reflect(LanternCfg.prototype, "Config.AcCfg.LanternCfg");
        /**累计充值奖励 */
        var LanternRechargeItemCfg = (function (_super) {
            __extends(LanternRechargeItemCfg, _super);
            function LanternRechargeItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LanternRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.LanternRechargeItemCfg = LanternRechargeItemCfg;
        __reflect(LanternRechargeItemCfg.prototype, "Config.AcCfg.LanternRechargeItemCfg");
        /**累计进度奖励 */
        var LanternAnswerItemCfg = (function (_super) {
            __extends(LanternAnswerItemCfg, _super);
            function LanternAnswerItemCfg() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return LanternAnswerItemCfg;
        }(BaseItemCfg));
        AcCfg.LanternAnswerItemCfg = LanternAnswerItemCfg;
        __reflect(LanternAnswerItemCfg.prototype, "Config.AcCfg.LanternAnswerItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=LanternCfg.js.map