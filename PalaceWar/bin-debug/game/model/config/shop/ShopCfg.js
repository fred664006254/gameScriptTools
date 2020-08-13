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
     * 商店配置类
     * author dmj
     * date 2017/10/28
     * @class ShopCfg
     */
    var ShopCfg;
    (function (ShopCfg) {
        //检查购买物品的时候是否需要弹出消费提示框的元宝阈值
        //大于等于这个值 显示消费提示框
        ShopCfg.buyItemCheckVal = 600;
        ShopCfg.buyItemNum = 5;
        var shopItemList = {};
        function formatData(data) {
            for (var key in data) {
                if (!shopItemList.hasOwnProperty(String(key))) {
                    shopItemList[String(key)] = {};
                }
                var innerData = data[key];
                for (var key2 in innerData) {
                    var shopItemCfg = shopItemList[String(key)][key2];
                    if (!shopItemCfg) {
                        shopItemCfg = new ShopItemCfg();
                        shopItemList[String(key)][key2] = shopItemCfg;
                    }
                    shopItemCfg.initData(innerData[key2]);
                    shopItemCfg.id = Number(key2);
                }
            }
        }
        ShopCfg.formatData = formatData;
        /**
         * 通过商品id获取单个商品配置
         * @param id 商品id
         */
        function getShopItemCfgById(id, version) {
            if (id == 4001) {
                return Config.Signup500dayCfg.shopCfg;
            }
            else if (id == 6101) {
                return Config.Sixsection1Cfg.shopCfg;
            }
            return shopItemList[version][String(id)];
        }
        ShopCfg.getShopItemCfgById = getShopItemCfgById;
        /**
         * 获取类型获取页签配置
         * @param sheetType
         */
        function getShopItemCfgListByType(sheetType, version) {
            var arr = new Array();
            var tmpV = version;
            for (var key in shopItemList[tmpV]) {
                if (sheetType == shopItemList[tmpV][key].sheetType) {
                    arr.push(shopItemList[tmpV][key]);
                }
            }
            if (sheetType == 3 && Api.arrivalVoApi.isShowed500Rewards()) {
                arr.push(Config.Signup500dayCfg.shopCfg);
            }
            if (sheetType == 3 && Api.sixsection1VoApi.isOpenSixSection1()) {
                arr.push(Config.Sixsection1Cfg.shopCfg);
            }
            return arr;
        }
        ShopCfg.getShopItemCfgListByType = getShopItemCfgListByType;
    })(ShopCfg = Config.ShopCfg || (Config.ShopCfg = {}));
    var ShopItemCfg = (function (_super) {
        __extends(ShopItemCfg, _super);
        function ShopItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 折扣
             */
            _this.discount = 0;
            /**
             * 道具原价
             */
            _this.preCost = 0;
            _this.shopGiftName = 0;
            return _this;
        }
        Object.defineProperty(ShopItemCfg.prototype, "name", {
            /**
             * 商品名称
             */
            get: function () {
                if (this.shopGiftName > 0) {
                    return LanguageManager.getlocal("shopGiftName" + this.shopGiftName);
                }
                var tmpId = String(this.id);
                if (this.sheetType == 3) {
                    tmpId = App.StringUtil.splitString(this.content, "_")[1];
                }
                return LanguageManager.getlocal("itemName_" + tmpId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopItemCfg.prototype, "limitType", {
            /**
             * 限制类型 -1 无限制 1 日限制 2 周限制
             */
            get: function () {
                return this.limit[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopItemCfg.prototype, "limitNum", {
            /**
             * 限制数量 -1 无限制,  x 限制的具体数量
             */
            get: function () {
                return this.limit[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopItemCfg.prototype, "limitNumDesc", {
            /**
             * 限购数描述
             */
            get: function () {
                return LanguageManager.getlocal("shopLimitBuy", [this.limitNum.toString()]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopItemCfg.prototype, "contentList", {
            /**
             * 获取显示内容列表
             */
            get: function () {
                if (this.sheetType == 3) {
                    // let contentId = App.StringUtil.splitString(this.content,"_")[1];
                    // let itemcfg = Config.ItemCfg.getItemCfgById(contentId);
                    // let rewards = itemcfg.getRewards;
                    var rewards = this.content;
                    var voList = Api.acVoApi.getActivityVoListByAid("punish");
                    if (voList.length > 0) {
                        for (var id in voList) {
                            var acVo = voList[id];
                            var code = acVo.code;
                            if (code > 1 && acVo.isDuringActive) {
                                if (rewards.search("_180")) {
                                    var changeReward = Config.AcCfg.getCfgByActivityIdAndCode("punish", code).changeReward;
                                    var rewardTab = rewards.split("|");
                                    for (var index = 0; index < rewardTab.length; index++) {
                                        var element = rewardTab[index];
                                        if (element.search("_180") > 0) {
                                            var tmpT = App.StringUtil.splitString(element, "_");
                                            var tmpId = Number(tmpT[1]);
                                            if (changeReward[tmpT[1]]) {
                                                tmpT[1] = changeReward[tmpT[1]];
                                            }
                                            rewardTab[index] = tmpT.join("_");
                                        }
                                    }
                                    rewards = rewardTab.join("|");
                                }
                            }
                        }
                    }
                    return GameData.formatRewardItem(rewards);
                }
                return GameData.formatRewardItem(this.content);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopItemCfg.prototype, "needVipDesc", {
            /**
             * 购买需要vip等级限制描述
             */
            get: function () {
                if (this.needVip > 0) {
                    return LanguageManager.getlocal("shopVipLimit", [this.needVip.toString()]);
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShopItemCfg.prototype, "discountDesc", {
            /**
             * 折扣描述
             */
            get: function () {
                return LanguageManager.getlocal("discountTitle", [this.discount * 10 + ""]);
            },
            enumerable: true,
            configurable: true
        });
        return ShopItemCfg;
    }(BaseItemCfg));
    Config.ShopItemCfg = ShopItemCfg;
    __reflect(ShopItemCfg.prototype, "Config.ShopItemCfg");
})(Config || (Config = {}));
//# sourceMappingURL=ShopCfg.js.map