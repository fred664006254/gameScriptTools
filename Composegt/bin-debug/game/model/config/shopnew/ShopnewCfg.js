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
