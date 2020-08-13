var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var LuckBagCfg = (function () {
            function LuckBagCfg() {
                this._needGem = 0;
                this._needPoint = 0;
                //前端奖励预览 
                this._lotteryPool1 = [];
                this._lotteryPool2 = [];
                this._lotteryNum = [];
            }
            Object.defineProperty(LuckBagCfg.prototype, "lotteryPool", {
                get: function () {
                    return this._lotteryPool1.concat(this._lotteryPool2);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LuckBagCfg.prototype, "lotteryNum", {
                get: function () {
                    return this._lotteryNum;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LuckBagCfg.prototype, "needGem", {
                get: function () {
                    return this._needGem;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LuckBagCfg.prototype, "needPoint", {
                get: function () {
                    return this._needPoint;
                },
                enumerable: true,
                configurable: true
            });
            //解析数据
            LuckBagCfg.prototype.formatData = function (data) {
                if (data["needGem"]) {
                    this._needGem = data["needGem"];
                }
                if (data["needPoint"]) {
                    this._needPoint = data["needPoint"];
                }
                if (data["lotteryPool1"]) {
                    this._lotteryPool1 = data["lotteryPool1"];
                }
                if (data["lotteryPool2"]) {
                    this._lotteryPool2 = data["lotteryPool2"];
                }
                if (data["lotteryNum"]) {
                    this._lotteryNum = data["lotteryNum"];
                }
            };
            //根据宝箱id 显示奖励物品
            LuckBagCfg.prototype.getBoxRewardById = function (id) {
                if (this._lotteryNum[id]) {
                    return this._lotteryNum[id];
                }
                else {
                    return null;
                }
            };
            return LuckBagCfg;
        }());
        AcCfg.LuckBagCfg = LuckBagCfg;
        __reflect(LuckBagCfg.prototype, "Config.AcCfg.LuckBagCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
