/**
 * 商店voapi
 * author:qianjun
 */
var Api;
(function (Api) {
    var ShopVoApi;
    (function (ShopVoApi) {
        var shopinfoVo;
        var touchType;
        var cfgId;
        var isbuyRoyal = false;
        var isbox = false;
        var boxid = "";
        var chargeid = "";
        var lightType = "";
        function formatData(data) {
            if (!shopinfoVo) {
                shopinfoVo = new ShopInfoVo();
            }
            shopinfoVo.initData(data);
        }
        ShopVoApi.formatData = formatData;
        function dispose() {
            if (shopinfoVo) {
                shopinfoVo.dispose();
                shopinfoVo = null;
            }
            touchType = "";
            cfgId = null;
            isbuyRoyal = false;
            isbox = false;
            boxid = "";
            chargeid = "";
            lightType = "";
        }
        ShopVoApi.dispose = dispose;
        function setLightType(name) {
            lightType = name;
        }
        ShopVoApi.setLightType = setLightType;
        function getLightType() {
            return lightType;
        }
        ShopVoApi.getLightType = getLightType;
        function getTodayDailyShopList() {
            var arr = [];
            for (var i in shopinfoVo.dailyshop) {
                var unit = shopinfoVo.dailyshop[i];
                arr.push(unit);
            }
            return arr;
        }
        ShopVoApi.getTodayDailyShopList = getTodayDailyShopList;
        function getTodayDiscountShopList() {
            var arr = [];
            var giftid = 2;
            if (shopinfoVo.gift && shopinfoVo.gift.id) {
                giftid = shopinfoVo.gift.id;
            }
            var unit = Config.ShopCfg.getDiscountShopCfgById(giftid);
            arr.push(unit);
            return arr;
        }
        ShopVoApi.getTodayDiscountShopList = getTodayDiscountShopList;
        function getDiscountShopItem() {
            var giftid = 1;
            if (shopinfoVo.gift && shopinfoVo.gift.id) {
                giftid = shopinfoVo.gift.id;
            }
            var unit = Config.ShopCfg.getDiscountShopCfgById(giftid);
            return unit;
        }
        ShopVoApi.getDiscountShopItem = getDiscountShopItem;
        function getTodayRefresLimitTime() {
            var num = App.DateUtil.getWeeTs(GameData.getServerTime()) + 86400 - GameData.getServerTime();
            return num;
        }
        ShopVoApi.getTodayRefresLimitTime = getTodayRefresLimitTime;
        function getPayInfoById(id) {
            var flag = false;
            if (id == "g7") {
                flag = Api.GameinfoVoApi.getIsBuyAssitance();
            }
            else if (id == Config.RoyalpassCfg.getRechargeType()) {
                flag = Api.GameinfoVoApi.getIsBuyRoyalPass();
            }
            return flag;
        }
        ShopVoApi.getPayInfoById = getPayInfoById;
        function setTouchType(type) {
            touchType = type;
        }
        ShopVoApi.setTouchType = setTouchType;
        function getTouchType() {
            return touchType;
        }
        ShopVoApi.getTouchType = getTouchType;
        function setTouchId(id) {
            cfgId = id;
        }
        ShopVoApi.setTouchId = setTouchId;
        function getTouchId() {
            return cfgId;
        }
        ShopVoApi.getTouchId = getTouchId;
        function setChargeId(id) {
            chargeid = id;
        }
        ShopVoApi.setChargeId = setChargeId;
        function getChargeId() {
            return chargeid;
        }
        ShopVoApi.getChargeId = getChargeId;
        function setIsBox(bool, id) {
            isbox = bool;
            boxid = id;
        }
        ShopVoApi.setIsBox = setIsBox;
        function getIsBox() {
            return isbox;
        }
        ShopVoApi.getIsBox = getIsBox;
        function getBoxId() {
            return boxid;
        }
        ShopVoApi.getBoxId = getBoxId;
        function setisbuyRoyal(flag) {
            isbuyRoyal = flag;
        }
        ShopVoApi.setisbuyRoyal = setisbuyRoyal;
        function getisbuyRoyal() {
            return isbuyRoyal;
        }
        ShopVoApi.getisbuyRoyal = getisbuyRoyal;
        function getTodayDailyShopHasBuyById(id) {
            var flag = false;
            var unit = shopinfoVo.dailyshop[id];
            if (unit && unit.hasBuy == 1) {
                flag = true;
            }
            return flag;
        }
        ShopVoApi.getTodayDailyShopHasBuyById = getTodayDailyShopHasBuyById;
        function getTodayDiscountShopHasBuy() {
            var flag = false;
            if (shopinfoVo.gift && shopinfoVo.gift.hasBuy && shopinfoVo.gift.hasBuy == 1) {
                flag = true;
            }
            return flag;
        }
        ShopVoApi.getTodayDiscountShopHasBuy = getTodayDiscountShopHasBuy;
        function getEmotionHasBuyById(id) {
            var flag = false;
            if (shopinfoVo && shopinfoVo.expression && shopinfoVo.expression[id] && shopinfoVo.expression[id] == 1) {
                flag = true;
            }
            return flag;
        }
        ShopVoApi.getEmotionHasBuyById = getEmotionHasBuyById;
    })(ShopVoApi = Api.ShopVoApi || (Api.ShopVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=ShopVoApi.js.map