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
        var BeatXiongNuCfg = (function () {
            function BeatXiongNuCfg() {
                /**展示期 */
                this.extraTime = 0;
                /*开关*/
                this.switch = [];
                /**核心奖励 */
                this.show = "";
                /**每日免费次数*/
                this.freeTime = 0;
                /**每出击一次消耗 X 士气（士气大于等于10可以十连出击）*/
                this.consume = 0;
                /**每出击一次增加进度 */
                this.addProcess = 0;
                /**抽奖奖池 */
                this.pool = [];
                /**累计出击奖励 */
                this.achievement = {};
                /**活动期间的累计充值奖励 */
                this.recharge = {};
            }
            /**
             * 初始化数据
             */
            BeatXiongNuCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (typeof data[key] != 'object') {
                        this[key] = data[key];
                    }
                }
                this.pool = data.pool;
                for (var key in data.achievement) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.achievement.hasOwnProperty(String(key))) {
                        this.achievement[String(key)] = new BeatXiongNuProgressItemCfg();
                    }
                    itemCfg = this.achievement[String(key)];
                    itemCfg.initData(data.achievement[key]);
                    itemCfg.id = id;
                }
                for (var key in data.recharge) {
                    var itemCfg = void 0;
                    var id = Number(key);
                    if (!this.recharge.hasOwnProperty(String(key))) {
                        this.recharge[String(key)] = new BeatXiongNuRechargeItemCfg();
                    }
                    itemCfg = this.recharge[String(key)];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id = id;
                }
            };
            /**解析奖池 */
            BeatXiongNuCfg.prototype.getWealthGod = function () {
                var rewards = "";
                for (var i in this.pool) {
                    var unit = this.pool[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            };
            BeatXiongNuCfg.prototype.getTotalProgress = function () {
                return this.achievement[Object.keys(this.achievement).length].specialnum;
            };
            BeatXiongNuCfg.prototype.getSkinBone = function (code) {
                var cfg = null;
                if (this.show) {
                    switch (Number(code)) {
                        case 1:
                        case 2:
                            cfg = Config.ServantskinCfg.getServantSkinItemById(this.show); //
                            break;
                    }
                }
                return cfg && cfg.bone ? cfg.bone : '';
            };
            BeatXiongNuCfg.prototype.getSkinName = function (code) {
                var cfg = null;
                if (this.show) {
                    switch (Number(code)) {
                        case 1:
                        case 2:
                            cfg = Config.ServantskinCfg.getServantSkinItemById(this.show); //
                            break;
                    }
                }
                return cfg && cfg.name ? cfg.name : '';
            };
            BeatXiongNuCfg.prototype.getSkin = function (code) {
                var skin = '';
                switch (Number(code)) {
                    case 1:
                    case 2:
                        skin = this.show.toString();
                        break;
                }
                return skin;
            };
            BeatXiongNuCfg.prototype.getProcessNum = function (code) {
                var arr = [];
                switch (Number(code)) {
                    case 1:
                        arr = [5, 4, 3, 2, 1];
                        break;
                }
                return arr;
            };
            // public getServantNeed():number{
            //     if (this.servant)
            //     {
            //         for (let k in this.recharge)
            //         {
            //             let v = this.recharge[k];
            //             let rewards = GameData.formatRewardItem(v.getReward);
            //             for (let i = 0 ; i< rewards.length; i++)
            //             {
            //                 let onevo = rewards[i];
            //                 if (onevo.type == 8 && onevo.id == Number(this.servant))
            //                 {
            //                     return v.needGem;
            //                 }
            //             }
            //         }
            //     }
            //     return 0; 
            // }
            BeatXiongNuCfg.prototype.getGemNeed = function () {
                if (this.show) {
                    for (var k in this.recharge) {
                        var v = this.recharge[k];
                        var rewards = GameData.formatRewardItem(v.getReward);
                        for (var i = 0; i < rewards.length; i++) {
                            var onevo = rewards[i];
                            if (onevo.id == Number(this.show)) {
                                return v.needGem;
                            }
                        }
                    }
                }
                return 0;
            };
            return BeatXiongNuCfg;
        }());
        AcCfg.BeatXiongNuCfg = BeatXiongNuCfg;
        __reflect(BeatXiongNuCfg.prototype, "Config.AcCfg.BeatXiongNuCfg");
        var BeatXiongNuProgressItemCfg = (function (_super) {
            __extends(BeatXiongNuProgressItemCfg, _super);
            function BeatXiongNuProgressItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--累计出击奖励
                --specialnum:累计出击次数（进度）
                --getReward:达成累计次数获得的奖励
                 */
                _this.id = 0;
                _this.specialnum = 0;
                _this.getReward = '';
                return _this;
            }
            return BeatXiongNuProgressItemCfg;
        }(BaseItemCfg));
        AcCfg.BeatXiongNuProgressItemCfg = BeatXiongNuProgressItemCfg;
        __reflect(BeatXiongNuProgressItemCfg.prototype, "Config.AcCfg.BeatXiongNuProgressItemCfg");
        var BeatXiongNuRechargeItemCfg = (function (_super) {
            __extends(BeatXiongNuRechargeItemCfg, _super);
            function BeatXiongNuRechargeItemCfg() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 *--累计投喂巧克力奖励
                --needGem:所需额度：单位（元宝）
                --show:达到X档位，才能看到此档位
                --specialGift:获得巧克力个数
                --getReward:奖励
                 */
                _this.id = 0;
                _this.needGem = 0;
                _this.specialGift = 0;
                _this.getReward = '';
                return _this;
            }
            return BeatXiongNuRechargeItemCfg;
        }(BaseItemCfg));
        AcCfg.BeatXiongNuRechargeItemCfg = BeatXiongNuRechargeItemCfg;
        __reflect(BeatXiongNuRechargeItemCfg.prototype, "Config.AcCfg.BeatXiongNuRechargeItemCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=BeatXiongNuCfg.js.map