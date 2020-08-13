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
        var BankBoxCfg = (function () {
            function BankBoxCfg() {
                this.bankBox = null;
                this.blackMarket = null;
                this.courier = null;
                this.gamble = null;
                this.hotel = null;
                this.marry = null;
                this.rechargeBoxItemListCfg = [];
                this.blackMarketListCfg = [];
                this.itemsList = {};
                this.extraTime = 0;
            }
            BankBoxCfg.prototype.formatData = function (data) {
                if (data.extraTime) {
                    this.extraTime = data.extraTime;
                }
                for (var key in data.boxList) {
                    var itemCfg = void 0;
                    if (!this.rechargeBoxItemListCfg.hasOwnProperty(String(key))) {
                        this.rechargeBoxItemListCfg[String(key)] = new RechargeBoxItemCfg2();
                    }
                    itemCfg = this.rechargeBoxItemListCfg[String(key)];
                    itemCfg.initData(data.boxList[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            BankBoxCfg.prototype.getBlackMarketArr = function () {
                var arr = [];
                for (var i = 0; i < this.blackMarket.length; i++) {
                    arr.push(this.blackMarket[i]);
                }
                return arr;
            };
            BankBoxCfg.prototype.getBoxListData = function () {
                var arr = [];
                for (var i = 0; i < this.rechargeBoxItemListCfg.length; i++) {
                    if (i == 0) {
                        arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - 1]);
                    }
                    else if (i == 1) {
                        arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1]);
                    }
                    else {
                        arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - i]);
                    }
                }
                return arr;
            };
            /**
             * 通过id取当前的cfg
             */
            BankBoxCfg.prototype.getBoxData = function (gears) {
                for (var i = 0; i < this.rechargeBoxItemListCfg.length; i++) {
                    var boxData = this.rechargeBoxItemListCfg[i];
                    if (boxData.needGem == gears) {
                        return boxData;
                    }
                }
            };
            return BankBoxCfg;
        }());
        AcCfg.BankBoxCfg = BankBoxCfg;
        __reflect(BankBoxCfg.prototype, "Config.AcCfg.BankBoxCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
    var RechargeBoxItemCfg2 = (function (_super) {
        __extends(RechargeBoxItemCfg2, _super);
        function RechargeBoxItemCfg2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RechargeBoxItemCfg2;
    }(BaseItemCfg));
    Config.RechargeBoxItemCfg2 = RechargeBoxItemCfg2;
    __reflect(RechargeBoxItemCfg2.prototype, "Config.RechargeBoxItemCfg2");
})(Config || (Config = {}));
//# sourceMappingURL=BankBoxCfg.js.map