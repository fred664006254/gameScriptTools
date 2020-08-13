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
        var WishTreeCfg = (function () {
            function WishTreeCfg() {
                //单抽消耗：X元宝
                this.cost1 = "";
                this.cost2 = "";
                //兑换所需道具（皮肤券）  已拥有此皮肤后，不可再次兑换
                this.shopItemList = {};
                this.ownList = [];
                this.notOwnList = [];
            }
            WishTreeCfg.prototype.formatData = function (data) {
                if (data) {
                    this.cost1 = data.cost1;
                    this.cost2 = data.cost2;
                    for (var key in data.shop) {
                        var itemCfg = this.shopItemList[key];
                        if (!itemCfg) {
                            itemCfg = new WishTreeShopItem();
                            this.shopItemList[key] = itemCfg;
                        }
                        itemCfg.initData(data.shop[key]);
                        itemCfg.id = key;
                    }
                }
            };
            WishTreeCfg.prototype.dealList = function () {
                this.notOwnList = [];
                this.ownList = [];
                for (var key in this.shopItemList) {
                    var item = this.shopItemList[key];
                    if (!Api.wifeVoApi.getWifeInfoVoById(item.wifeId)) {
                        this.notOwnList.push(item);
                    }
                    else {
                        this.ownList.push(item);
                    }
                }
            };
            /**
             * 获取可购买的红颜id列表
             */
            WishTreeCfg.prototype.getWishWifeIdList = function () {
                this.dealList();
                return this.notOwnList.concat(this.ownList);
            };
            WishTreeCfg.prototype.getLastWishTimes = function () {
                this.dealList();
                return this.notOwnList.length;
            };
            WishTreeCfg.prototype.getMaxTimes = function () {
                return Object.keys(this.shopItemList).length;
            };
            // public getShowDataList()
            // {
            //     let list1 = [];
            //     let list2 = [];
            //     let idList = this.getWishWifeIdList();
            //     for (var index = 0; index < idList.length; index++) {
            //         if(Api.wifeVoApi.getWifeInfoVoById(idList[index]))
            //     }
            //     return resData;
            // }
            /**
             * 根据id取配置
             */
            WishTreeCfg.prototype.getWishCfgById = function (id) {
                return this.shopItemList[id];
            };
            return WishTreeCfg;
        }());
        AcCfg.WishTreeCfg = WishTreeCfg;
        __reflect(WishTreeCfg.prototype, "Config.AcCfg.WishTreeCfg");
        var WishTreeShopItem = (function (_super) {
            __extends(WishTreeShopItem, _super);
            function WishTreeShopItem() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = "";
                _this.wifeId = "";
                _this.needItem = "";
                _this.needNum = 0;
                return _this;
            }
            return WishTreeShopItem;
        }(BaseItemCfg));
        AcCfg.WishTreeShopItem = WishTreeShopItem;
        __reflect(WishTreeShopItem.prototype, "Config.AcCfg.WishTreeShopItem");
    })(AcCfg = Config.AcCfg || (Config.AcCfg = {}));
})(Config || (Config = {}));
