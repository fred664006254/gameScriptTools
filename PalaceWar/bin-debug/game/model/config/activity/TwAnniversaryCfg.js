var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config;
(function (Config) {
    var AcCfg;
    (function (AcCfg) {
        var TwAnniversaryCfg = (function () {
            function TwAnniversaryCfg() {
                this.bankBox = null;
                this.blackMarket = null;
                this.courier = null;
                this.gamble = null;
                this.hotel = null;
                this.marry = null;
                this.rechargeBoxItemListCfg = [];
                this.blackMarketListCfg = [];
                this.itemsList = {};
            }
            TwAnniversaryCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.bankBox) {
                        this.bankBox = data.bankBox;
                        this.initBox();
                    }
                    if (data.blackMarket) {
                        this.blackMarket = data.blackMarket;
                        this.initBlackMarket();
                    }
                    if (data.courier) {
                        this.courier = data.courier;
                    }
                    if (data.gamble) {
                        this.courier = data.gamble;
                    }
                    if (data.hotel) {
                        this.courier = data.hotel;
                    }
                    if (data.marry) {
                        this.courier = data.marry;
                    }
                }
            };
            TwAnniversaryCfg.prototype.initBox = function () {
                for (var key in this.bankBox.boxList) {
                    var itemCfg = void 0;
                    if (!this.rechargeBoxItemListCfg.hasOwnProperty(String(key))) {
                        this.rechargeBoxItemListCfg[String(key)] = new Config.RechargeBoxItemCfg2();
                    }
                    itemCfg = this.rechargeBoxItemListCfg[String(key)];
                    itemCfg.initData(this.bankBox.boxList[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            TwAnniversaryCfg.prototype.initBlackMarket = function () {
                for (var key in this.blackMarket.blackMkt) {
                    var itemCfg = void 0;
                    if (!this.blackMarketListCfg.hasOwnProperty(String(key))) {
                        this.blackMarketListCfg[String(key)] = new Config.BlackItemsListItemCfg();
                    }
                    itemCfg = this.blackMarketListCfg[String(key)];
                    itemCfg.initData(this.blackMarket.blackMkt[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            TwAnniversaryCfg.prototype.getBlackMarketArr = function () {
                var arr = [];
                for (var i = 0; i < this.blackMarket.blackMkt.length; i++) {
                    arr.push(this.blackMarket.blackMkt[i]);
                }
                return arr;
            };
            TwAnniversaryCfg.prototype.getBoxListData = function () {
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
            TwAnniversaryCfg.prototype.getBoxData = function (gears) {
                for (var i = 0; i < this.rechargeBoxItemListCfg.length; i++) {
                    var boxData = this.rechargeBoxItemListCfg[i];
                    if (boxData.needGem == gears) {
                        return boxData;
                    }
                }
            };
            return TwAnniversaryCfg;
        }());
        AcCfg.TwAnniversaryCfg = TwAnniversaryCfg;
        __reflect(TwAnniversaryCfg.prototype, "Config.AcCfg.TwAnniversaryCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=TwAnniversaryCfg.js.map