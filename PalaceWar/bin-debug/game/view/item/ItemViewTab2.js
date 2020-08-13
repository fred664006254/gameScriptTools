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
var ItemViewTab2 = (function (_super) {
    __extends(ItemViewTab2, _super);
    function ItemViewTab2() {
        var _this = _super.call(this) || this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, _this.initView, _this);
        NetManager.request(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, {});
        return _this;
    }
    ItemViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2, this.refreshList, this);
        var bg1 = BaseBitmap.create("public_9_bg23");
        // bg1.y = 5;
        bg1.width = GameConfig.stageWidth - 20;
        bg1.height = GameConfig.stageHeigth - this.getViewTitleButtomY();
        bg1.x = 10;
        // this.addChild(bg1);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 563, bg1.height - 20);
        this._scrollList = ComponentManager.getScrollList(ComposeListItem, Api.itemVoApi.getComposeItemList(), rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(bg1.x + (bg1.width - rect.width) / 2, bg1.y + 10);
    };
    ItemViewTab2.prototype.refreshList = function () {
        if (this._scrollList) {
            this._scrollList.refreshData(Api.itemVoApi.getComposeItemList());
        }
    };
    ItemViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE, this.initView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2, this.refreshList, this);
        _super.prototype.dispose.call(this);
    };
    return ItemViewTab2;
}(CommonViewTab));
__reflect(ItemViewTab2.prototype, "ItemViewTab2");
var ComposeListItem = (function (_super) {
    __extends(ComposeListItem, _super);
    function ComposeListItem() {
        return _super.call(this) || this;
    }
    ComposeListItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, this.checkRedPoint, this);
        var itemCfg = data;
        this._itemCfg = itemCfg;
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 156;
        bg.height = 222;
        bg.setPosition(3, 3);
        this.addChild(bg);
        var nametTxt = itemCfg.nameTxt;
        nametTxt.setPosition(bg.x + (bg.width - nametTxt.width) / 2, bg.y + 10);
        this.addChild(nametTxt);
        var icon = itemCfg.getIconContainer(true);
        icon.setPosition(bg.x + (bg.width - icon.width) / 2, bg.y + nametTxt.y + nametTxt.height + 5);
        this.addChild(icon);
        this.width = bg.width + this.getSpaceX();
        if (itemCfg.timeLimit) {
            var mark = BaseBitmap.create("common_shopmark");
            // mark.setPosition(0,0);
            this.addChild(mark);
            var markTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeTimeLimitDesc"), 12);
            markTxt.anchorOffsetX = markTxt.width / 2;
            markTxt.anchorOffsetY = markTxt.height / 2;
            markTxt.rotation = -45;
            markTxt.setPosition(mark.width / 3 + 1, mark.height / 3 + 1);
            this.addChild(markTxt);
        }
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "composeBtn", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width) / 2, bg.y + bg.height - composeBtn.height - 10);
        this.addChild(composeBtn);
        this._composeBtn = composeBtn;
        this.checkRedPoint();
    };
    ComposeListItem.prototype.checkRedPoint = function () {
        if (this._composeBtn) {
            if (Api.itemVoApi.checkCanComposeById(this._itemCfg.id)) {
                App.CommonUtil.addIconToBDOC(this._composeBtn);
                var red = this._composeBtn.getChildByName("reddot");
                // if(red ){
                // 	red.x = 110;
                // 	red.y = 0;
                // }
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._composeBtn);
            }
        }
    };
    ComposeListItem.prototype.composeHandler = function () {
        if (Number(this._itemCfg.itemId) >= 1704 && Number(this._itemCfg.itemId) <= 1718) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMPOSEMULTIPOPUPVIEW, this._itemCfg.id);
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.COMPOSEPOPUPVIEW, this._itemCfg.id);
        }
    };
    /**
     * 不同格子X间距
     */
    ComposeListItem.prototype.getSpaceX = function () {
        return 46;
    };
    /**
     * 不同格子Y间距
     */
    ComposeListItem.prototype.getSpaceY = function () {
        return 20;
    };
    ComposeListItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE, this.checkRedPoint, this);
        this._itemCfg = null;
        this._composeBtn = null;
        _super.prototype.dispose.call(this);
    };
    return ComposeListItem;
}(ScrollListItem));
__reflect(ComposeListItem.prototype, "ComposeListItem");
//# sourceMappingURL=ItemViewTab2.js.map