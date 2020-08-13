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
/**
 * 门客详情 丹药信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItems
 */
var ServantInfoItems = (function (_super) {
    __extends(ServantInfoItems, _super);
    function ServantInfoItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._totalNum = 0;
        return _this;
    }
    ServantInfoItems.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.refreshListView, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE, this.refreshItemTipFromDispatch, this);
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = 480;
        line1.x = GameConfig.stageWidth / 2 - line1.width / 2;
        line1.y = 90;
        this.addChild(line1);
        var itemTip = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        itemTip.textColor = TextFieldConst.COLOR_BROWN;
        itemTip.y = 90;
        this.addChild(itemTip);
        this._itemTip = itemTip;
        var itemList = [];
        var attItem = GameConfig.config.servantbaseCfg.attItem;
        for (var index = 0; index < attItem.length; index++) {
            var id = attItem[index];
            var itemVO = Api.itemVoApi.getItemInfoVoById(id);
            if (itemVO && itemVO.num > 0) {
                itemList.push(itemVO);
            }
        }
        this._emptyTip = ComponentManager.getTextField(LanguageManager.getlocal("servantInfoItemsEmpty"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // itemTip.textColor = TextFieldConst.COLOR_BROWN;
        this._emptyTip.x = GameConfig.stageWidth / 2 - this._emptyTip.width / 2;
        this._emptyTip.y = bottomH / 2;
        this._emptyTip.visible = false;
        this.addChild(this._emptyTip);
        if (itemList.length == 0) {
            this._emptyTip.visible = true;
        }
        for (var key in itemList) {
            this._totalNum += itemList[key].num;
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 150);
        ServantInfoItemsScrollItem.servantId = this._servantId;
        var scrollView = ComponentManager.getScrollList(ServantInfoItemsScrollItem, itemList, rect);
        scrollView.y = 120;
        scrollView.x = 24;
        this._scrollView = scrollView;
        this.addChild(scrollView);
        this.refreshItemTip();
    };
    ServantInfoItems.prototype.refreshItemTipFromDispatch = function (event) {
        var num = event.data;
        this.refreshItemTip(num);
    };
    ServantInfoItems.prototype.refreshItemTip = function (changeNum) {
        if (changeNum) {
            this._totalNum -= changeNum;
        }
        this._itemTip.text = LanguageManager.getlocal("servant_itemip", [String(this._totalNum)]);
        this._itemTip.x = GameConfig.stageWidth / 2 - this._itemTip.width / 2;
    };
    ServantInfoItems.prototype.refreshListView = function () {
        var itemList = [];
        var attItem = GameConfig.config.servantbaseCfg.attItem;
        this._totalNum = 0;
        for (var index = 0; index < attItem.length; index++) {
            var id = attItem[index];
            var itemVO = Api.itemVoApi.getItemInfoVoById(id);
            if (itemVO && itemVO.num > 0) {
                this._totalNum += itemVO.num;
                itemList.push(itemVO);
            }
        }
        if (itemList.length == 0) {
            this._emptyTip.visible = true;
        }
        this.refreshItemTip();
        this._scrollView.refreshData(itemList);
    };
    ServantInfoItems.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_SERVANT_ITEMLIST, this.refreshListView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE, this.refreshItemTipFromDispatch, this);
        this._servantId = null;
        this._scrollView = null;
        this._itemTip = null;
        this._totalNum = 0;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoItems.prototype, "ServantInfoItems");
//# sourceMappingURL=ServantInfoItems.js.map