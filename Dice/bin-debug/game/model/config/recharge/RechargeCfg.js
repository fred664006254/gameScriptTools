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
    /**
     * 充值配置
     */
    var RechargeCfg;
    (function (RechargeCfg) {
        /**
         * 货币类型
         */
        RechargeCfg.moneyType = "CNY";
        /**
         * 充值配置是否已经初始化
         */
        var isInit = false;
        // let orderIdData:{[key:string]:string}=null;
        var moneyNameCfg = {
            wanba: { QZ1: "星币", SQ1: "星币", QZ2: "星币", SQ2: "秀币", QQLive1: "星币", QQLive2: "秀币" }
        };
        function getMoneyName() {
            var moneyName;
            if (PlatMgr.checkIsWanbaSp() || PlatMgr.checkIsQQGameSp()) {
                try {
                    var data = window["OPEN_DATA"];
                    var platform = data.platform;
                    var app = data.qua.app;
                    moneyName = moneyNameCfg.wanba[app + platform];
                }
                catch (e) {
                }
            }
            else if (PlatMgr.checkisLocalPrice()) {
                moneyName = GameData.platMoney;
            }
            return moneyName;
        }
        RechargeCfg.getMoneyName = getMoneyName;
        var normalRechargeListCfg;
        var rechargeListCfg = {};
        function formatData(data) {
            for (var key in data) {
                var itemCfg = void 0;
                if (!rechargeListCfg.hasOwnProperty(String(key))) {
                    rechargeListCfg[String(key)] = new RechargeItemCfg();
                }
                itemCfg = rechargeListCfg[String(key)];
                itemCfg.initData(data[key]);
                itemCfg.orderid = getOrderId(key);
                if (RechargeCfg.moneyType) {
                    itemCfg.cost = data[key][RechargeCfg.moneyType];
                }
                itemCfg.id = String(key);
            }
            isInit = true;
            formatLocalPriceCfg();
        }
        RechargeCfg.formatData = formatData;
        function getOrderId(id) {
            var orderId = id;
            var nid = Number(id.replace("g", ""));
            var idx = Math.floor(nid / 100);
            if (idx) {
                orderId = "gift" + idx;
            }
            return orderId;
        }
        // export function formatOrderid(oData:{[key:string]:string}):void
        // {
        // 	if(isInit)
        // 	{
        // 		for(let key in oData)
        // 		{
        // 			if(oData.hasOwnProperty(key))
        // 			{
        // 				let itemCfg:RechargeItemCfg=rechargeListCfg[key];
        // 				if(itemCfg)
        // 				{
        // 					itemCfg.orderid=oData[key];
        // 					itemCfg.cost=itemCfg[moneyType];
        // 				}
        // 			}
        // 		}
        // 	}
        // 	// else
        // 	// {
        // 	// 	orderIdData=oData;
        // 	// }
        // }
        function formatLocalPriceCfg() {
            if (isInit && (GameData.platMoneyData || GameData.platMoneyData2)) {
                //"productNo":string,"price":string,"currency":string
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    if (GameData.platMoneyData) {
                        var platCfg = itemCfg.orderid ? GameData.platMoneyData[itemCfg.orderid] : null;
                        if (platCfg) {
                            itemCfg.platFullPrice = platCfg.price;
                        }
                    }
                    var pricestr = String(itemCfg.cost);
                    if (GameData.platMoneyData2 && GameData.platMoneyData2[pricestr]) {
                        var oneprice = GameData.platMoneyData2[pricestr];
                        itemCfg.platFullPrice = oneprice.priceLocaleSymbol + oneprice.price;
                    }
                }
            }
        }
        RechargeCfg.formatLocalPriceCfg = formatLocalPriceCfg;
        /**
         * 获取特权充值档位
         */
        function getSpecailVipList() {
            var arr = ["g7", "g8"];
            var list = Config.ShopCfg.getBuyExpressionShopList();
            arr = arr.concat(list);
            return arr;
        }
        RechargeCfg.getSpecailVipList = getSpecailVipList;
        /**
         * 获取普通充值档
         */
        function getNormalRechargeCfg() {
            if (normalRechargeListCfg == null) {
                normalRechargeListCfg = [];
                for (var key in rechargeListCfg) {
                    var itemCfg = rechargeListCfg[key];
                    var gemCost = Number(itemCfg.gemCost);
                    if (PlatMgr.checkIsShenHeYiWan() && (key == "g7" || key == "g8")) {
                        itemCfg.sortId = key == "g7" ? 9 : 10;
                    }
                    if (itemCfg.sortId) {
                        normalRechargeListCfg.push(itemCfg);
                    }
                }
                normalRechargeListCfg.sort(function (a, b) {
                    return a.sortId < b.sortId ? 1 : -1;
                });
            }
            return normalRechargeListCfg;
        }
        RechargeCfg.getNormalRechargeCfg = getNormalRechargeCfg;
        /**
         * 根据key取对应档位的配置
         * @param key
         */
        function getRechargeItemCfgByKey(id) {
            for (var key in rechargeListCfg) {
                var itemCfg = rechargeListCfg[key];
                if (itemCfg.id == id) {
                    return itemCfg;
                }
            }
            return null;
        }
        RechargeCfg.getRechargeItemCfgByKey = getRechargeItemCfgByKey;
        function getPlatFullPriceById(id) {
            var itemcfg = getRechargeItemCfgByKey(id);
            return itemcfg ? itemcfg.platFullPrice : "";
        }
        RechargeCfg.getPlatFullPriceById = getPlatFullPriceById;
    })(RechargeCfg = Config.RechargeCfg || (Config.RechargeCfg = {}));
    var RechargeItemCfg = (function (_super) {
        __extends(RechargeItemCfg, _super);
        function RechargeItemCfg() {
            var _this = _super.call(this) || this;
            /**
             * 购买钻石
             */
            _this.gemCost = 0;
            return _this;
        }
        Object.defineProperty(RechargeItemCfg.prototype, "name", {
            get: function () {
                return LangMger.getlocal("rechargeName_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RechargeItemCfg.prototype, "desc", {
            get: function () {
                return LangMger.getlocal("rechargeDesc_" + this.id);
            },
            enumerable: true,
            configurable: true
        });
        return RechargeItemCfg;
    }(BaseItemCfg));
    Config.RechargeItemCfg = RechargeItemCfg;
    __reflect(RechargeItemCfg.prototype, "Config.RechargeItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=RechargeCfg.js.map