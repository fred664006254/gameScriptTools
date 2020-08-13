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
        var BlackMarketCfg = (function () {
            function BlackMarketCfg() {
                this.bankBox = null;
                this.blackMarket = null;
                this.courier = null;
                this.gamble = null;
                this.hotel = null;
                this.marry = null;
                // private rechargeBoxItemListCfg:RechargeBoxItemCfg2[] = [];
                this.blackMarketListCfg = [];
                // public itemsList:Object={};
                /** 展示时间 */
                this.extraTime = 0;
                // public getBoxListData():RechargeBoxItemCfg2[]
                // {
                // 	let arr:RechargeBoxItemCfg2[] = [];
                // 	for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
                // 	{
                // 		if(i == 0)
                // 		{
                // 			arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - 1]);
                // 		}
                // 		else if(i == 1)
                // 		{
                // 			arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1]);
                // 		}
                // 		else
                // 		{
                // 			arr.push(this.rechargeBoxItemListCfg[this.rechargeBoxItemListCfg.length - 1 - i]);
                // 		} 
                // 	}
                // 	return arr;
                // }
                // /**
                //  * 通过id取当前的cfg
                //  */
                // public getBoxData(gears:string):RechargeBoxItemCfg
                // {
                // 	for(let i = 0;i<this.rechargeBoxItemListCfg.length;i++)
                // 	{
                // 		let boxData = this.rechargeBoxItemListCfg[i];
                // 		if(boxData.needGem == gears)
                // 		{
                // 			return boxData;
                // 		}
                // 	}
                // } 
            }
            BlackMarketCfg.prototype.formatData = function (data) {
                for (var key in data) {
                    if (data.blackMkt) {
                        this.blackMarket = data.blackMkt;
                        this.initBlackMarket();
                    }
                    if (data.extraTime) {
                        this.extraTime = data.extraTime;
                    }
                }
            };
            BlackMarketCfg.prototype.initBlackMarket = function () {
                for (var key in this.blackMarket) {
                    var itemCfg = void 0;
                    if (!this.blackMarketListCfg.hasOwnProperty(String(key))) {
                        this.blackMarketListCfg[String(key)] = new BlackItemsListItemCfg();
                    }
                    itemCfg = this.blackMarketListCfg[String(key)];
                    itemCfg.initData(this.blackMarket[key]);
                    itemCfg.id = Number(key) + 1;
                }
            };
            BlackMarketCfg.prototype.getBlackMarketArr = function () {
                // let arr:BlackItemsListItemCfg[] = [];
                // for(let i = 0;i<this.blackMarket.length;i++)
                // {
                // 	arr.push(this.blackMarket[i])
                // }
                return this.blackMarketListCfg;
            };
            return BlackMarketCfg;
        }());
        AcCfg.BlackMarketCfg = BlackMarketCfg;
        __reflect(BlackMarketCfg.prototype, "Config.AcCfg.BlackMarketCfg");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
    var BlackItemsListItemCfg = (function (_super) {
        __extends(BlackItemsListItemCfg, _super);
        function BlackItemsListItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BlackItemsListItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons(this.item, true, false);
            },
            enumerable: true,
            configurable: true
        });
        return BlackItemsListItemCfg;
    }(BaseItemCfg));
    Config.BlackItemsListItemCfg = BlackItemsListItemCfg;
    __reflect(BlackItemsListItemCfg.prototype, "Config.BlackItemsListItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=BlackMarketCfg.js.map