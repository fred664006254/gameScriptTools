var Config;
(function (Config) {
    var ShopnewCfg;
    (function (ShopnewCfg) {
        var shopItemList = [];
        function formatData(data) {
            for (var key in data) {
                var shopItemCfg = new Config.ShopItemCfg();
                shopItemCfg = data[key];
                shopItemList.push(shopItemCfg);
            }
        }
        ShopnewCfg.formatData = formatData;
        function getNewShopArr() {
            var maxVip = Config.VipCfg.getMaxLevel();
            var obj1 = shopItemList[0];
            var buyNumLength = obj1.buyNum.length;
            if (buyNumLength < maxVip) {
                for (var i = 0; i < shopItemList.length; i++) {
                    var obj = shopItemList[i];
                    for (var j = 0; j <= maxVip; j++) {
                        if (obj.buyNum) {
                            var lastNum = obj.buyNum[obj.buyNum.length - 1];
                            if (j >= buyNumLength && j <= maxVip - 1) {
                                obj.buyNum[j] = lastNum;
                            }
                        }
                    }
                }
                return shopItemList;
            }
            return shopItemList;
        }
        ShopnewCfg.getNewShopArr = getNewShopArr;
        /**
         * 通过商品id获取单个商品配置
         * @param id 商品id
         */
        function getnewShopItemCfgById(id) {
            for (var i = 0; i < shopItemList.length; i++) {
                if (shopItemList[i].sortId == id) {
                    return shopItemList[i];
                }
            }
        }
        ShopnewCfg.getnewShopItemCfgById = getnewShopItemCfgById;
    })(ShopnewCfg = Config.ShopnewCfg || (Config.ShopnewCfg = {}));
})(Config || (Config = {}));
//# sourceMappingURL=ShopnewCfg.js.map