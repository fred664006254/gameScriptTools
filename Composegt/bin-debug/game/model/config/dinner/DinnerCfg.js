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
     * 婚宴配置
     */
    var DinnerCfg;
    (function (DinnerCfg) {
        /**
         * 宴会解锁所需官职
         */
        var needLv;
        /**
         * 每日赴宴的次数上限
         */
        var goToFeastNum;
        /**
         * 商店刷新时间 单位：秒
         */
        var shopReTime;
        /**
         * 商店刷新次数 每日重置
         */
        var shopReset;
        /**
         * 商店每次刷新物品 相同物品可重复
         */
        var shopItemNum;
        /**
         * 商店刷新消耗
         */
        var shopNeedGem;
        //高级赴宴vip限制1 
        var needVip;
        //高级赴宴vip限制2
        var joinLv;
        /**
         * 宴会列表
         */
        var feastList = {};
        /**
         * 参与宴会列表
         */
        var goToFeastList = {};
        /**
         * 商店物品列表
         */
        var shopList = {};
        /**
         * 商店刷新次数 每日重置
         */
        var serverShopReset;
        /**
         * 商店刷新消耗
         */
        var serverShopNeedGem;
        /**
         * 跨服商店物品列表
         */
        var serverShopList = {};
        var needItem = null;
        function formatData(data) {
            needLv = data.needLv;
            goToFeastNum = data.goToFeastNum;
            shopReTime = data.shopReTime;
            shopItemNum = data.shopItemNum;
            shopNeedGem = data.shopNeedGem;
            shopReset = data.shopReset;
            needItem = data.needItem;
            serverShopNeedGem = data.servershopNeedGem;
            serverShopReset = data.servershopReset;
            needVip = data.needVip;
            joinLv = data.joinLv;
            for (var key in data.feast) {
                var itemCfg = void 0;
                if (!feastList.hasOwnProperty(String(key))) {
                    feastList[String(key)] = new DinnerFeastItemCfg();
                }
                itemCfg = feastList[String(key)];
                itemCfg.initData(data.feast[key]);
                itemCfg.id = String(key);
            }
            for (var key in data.goToFeast) {
                var itemCfg = void 0;
                if (!goToFeastList.hasOwnProperty(String(key))) {
                    goToFeastList[String(key)] = new DinnerGoToFeastItemCfg();
                }
                itemCfg = goToFeastList[String(key)];
                itemCfg.initData(data.goToFeast[key]);
                itemCfg.id = String(key);
            }
            for (var key in data.shop) {
                var itemCfg = void 0;
                if (!shopList.hasOwnProperty(String(key))) {
                    shopList[String(key)] = new DinnerShopItemCfg();
                }
                itemCfg = shopList[String(key)];
                itemCfg.initData(data.shop[key]);
                itemCfg.id = String(key);
            }
            for (var key in data.servershop) {
                var itemCfg = void 0;
                if (!serverShopList.hasOwnProperty(String(key))) {
                    serverShopList[String(key)] = new DinnerShopItemCfg();
                }
                itemCfg = serverShopList[String(key)];
                itemCfg.initData(data.servershop[key]);
                itemCfg.id = String(key);
            }
        }
        DinnerCfg.formatData = formatData;
        function getFeastItemCfg(idx) {
            return feastList[idx.toString()];
        }
        DinnerCfg.getFeastItemCfg = getFeastItemCfg;
        function getFeastItemList() {
            return goToFeastList;
        }
        DinnerCfg.getFeastItemList = getFeastItemList;
        function getGoToFeastItemCfg(idx) {
            if (idx == 2) {
                if (Api.switchVoApi.checkOpen1524JoinDinner() && goToFeastList[idx.toString()].needGem) {
                    goToFeastList[idx.toString()].needGem = null;
                }
            }
            return goToFeastList[idx.toString()];
        }
        DinnerCfg.getGoToFeastItemCfg = getGoToFeastItemCfg;
        function getShopItemCfg(idx) {
            var returnlist = shopList[idx];
            //判断是否跨服
            if (Api.switchVoApi.checkIsCrossDinner()) {
                returnlist = serverShopList[idx];
            }
            return returnlist;
        }
        DinnerCfg.getShopItemCfg = getShopItemCfg;
        function getNeedLv() {
            return needLv;
        }
        DinnerCfg.getNeedLv = getNeedLv;
        function getNeedVip() {
            return needVip;
        }
        DinnerCfg.getNeedVip = getNeedVip;
        function getJoinLv() {
            return joinLv;
        }
        DinnerCfg.getJoinLv = getJoinLv;
        function getGoToFeastNum() {
            return goToFeastNum;
        }
        DinnerCfg.getGoToFeastNum = getGoToFeastNum;
        function getShopReTime() {
            return shopReTime;
        }
        DinnerCfg.getShopReTime = getShopReTime;
        function getShopReset() {
            var returnlist = shopReset;
            //判断是否跨服
            if (Api.switchVoApi.checkIsCrossDinner()) {
                returnlist = serverShopReset;
            }
            return returnlist;
        }
        DinnerCfg.getShopReset = getShopReset;
        function getNeedItem() {
            return needItem;
        }
        DinnerCfg.getNeedItem = getNeedItem;
        function getShopItemNum() {
            return shopItemNum;
        }
        DinnerCfg.getShopItemNum = getShopItemNum;
        function getShopNeedGem() {
            var returnData = shopNeedGem;
            //判断是否跨服
            if (Api.switchVoApi.checkIsCrossDinner()) {
                returnData = serverShopNeedGem;
            }
            return returnData;
        }
        DinnerCfg.getShopNeedGem = getShopNeedGem;
    })(DinnerCfg = Config.DinnerCfg || (Config.DinnerCfg = {}));
    var DinnerFeastItemCfg = (function (_super) {
        __extends(DinnerFeastItemCfg, _super);
        function DinnerFeastItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DinnerFeastItemCfg;
    }(BaseItemCfg));
    __reflect(DinnerFeastItemCfg.prototype, "DinnerFeastItemCfg");
    var DinnerGoToFeastItemCfg = (function (_super) {
        __extends(DinnerGoToFeastItemCfg, _super);
        function DinnerGoToFeastItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DinnerGoToFeastItemCfg;
    }(BaseItemCfg));
    __reflect(DinnerGoToFeastItemCfg.prototype, "DinnerGoToFeastItemCfg");
    var DinnerShopItemCfg = (function (_super) {
        __extends(DinnerShopItemCfg, _super);
        function DinnerShopItemCfg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 购买所需消耗的道具类型
             * 1  积分
             * 2  元宝
            */
            _this.type = 1;
            return _this;
        }
        return DinnerShopItemCfg;
    }(BaseItemCfg));
    __reflect(DinnerShopItemCfg.prototype, "DinnerShopItemCfg");
})(Config || (Config = {}));
