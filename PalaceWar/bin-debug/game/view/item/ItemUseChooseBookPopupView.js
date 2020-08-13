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
var ItemUseChooseBookPopupView = (function (_super) {
    __extends(ItemUseChooseBookPopupView, _super);
    function ItemUseChooseBookPopupView() {
        var _this = _super.call(this) || this;
        _this._skinId = null;
        _this._itemId = 0;
        _this._scrollContainer = null;
        _this._hadBooks = [];
        _this._clickBookId = null;
        return _this;
    }
    ItemUseChooseBookPopupView.prototype.getTitleStr = function () {
        return "itemChooseBook";
    };
    ItemUseChooseBookPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_star", "skin_bookbg", "skin_detail_probg", "public_got",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
        ]);
    };
    ItemUseChooseBookPopupView.prototype.initView = function () {
        this._skinId = this.param.data.skinId;
        this._itemId = this.param.data.itemid;
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(this._skinId);
        var servant = Api.servantVoApi.getServantObj(skincfg.servantId);
        var skinvo = servant.skin[Number(this._skinId)];
        if (skinvo) {
            this._hadBooks = skinvo.getbookIdList();
        }
        var desc = ComponentManager.getTextField(LanguageManager.getlocal("itemChooseBookDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        desc.width = 490;
        desc.lineSpacing = 5;
        desc.setPosition(this.viewBg.width / 2 - desc.width / 2, 16);
        this.addChildToContainer(desc);
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 522;
        itemBg.height = 482;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, desc.y + desc.height + 10);
        this.addChildToContainer(itemBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, this.viewBg.width, itemBg.height - 20);
        // 中部可滑动区域
        this._scrollContainer = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(this._scrollContainer, rect);
        this.addChildToContainer(scrollView);
        scrollView.setPosition(0, itemBg.y + 10);
        for (var k in skincfg.ability) {
            var idx = Number(k);
            var bgContainer = this.getBookInfoContainer(skincfg.ability[k]);
            bgContainer.setPosition(57 + 255 * (idx % 2) + GameData.popupviewOffsetX, 8 + 230 * Math.floor(idx / 2));
            this._scrollContainer.addChild(bgContainer);
        }
        if (this._hadBooks.length > 0) {
            var rewardvo = GameData.formatRewardItem(skincfg.returnItem)[0];
            var fragment = ComponentManager.getTextField(LanguageManager.getlocal("itemChooseBookFragment", [String(rewardvo.num), rewardvo.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
            fragment.width = 490;
            fragment.lineSpacing = 5;
            fragment.setPosition(this.viewBg.width / 2 - fragment.width / 2, itemBg.y + itemBg.height + 10);
            this.addChildToContainer(fragment);
        }
    };
    ItemUseChooseBookPopupView.prototype.getBookInfoContainer = function (bookid) {
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("skin_detail_probg");
        itemBg.width = 197;
        itemBg.height = 217;
        bgContainer.addChild(itemBg);
        var itemName = ComponentManager.getTextField(LanguageManager.getlocal("servant_attrNameTxt" + bookid), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_WHITE);
        itemName.width = itemBg.width;
        itemName.textAlign = egret.HorizontalAlign.CENTER;
        itemName.lineSpacing = 2;
        itemName.verticalAlign = egret.VerticalAlign.BOTTOM;
        itemName.setPosition(itemBg.width / 2 - itemName.width / 2, 13);
        bgContainer.addChild(itemName);
        var bookcfg = GameConfig.config.abilityCfg[bookid];
        var biconBg = BaseBitmap.create("skin_bookbg");
        biconBg.setPosition(itemBg.width / 2 - biconBg.width / 2, itemName.y + itemName.height + 15);
        bgContainer.addChild(biconBg);
        var bicon = BaseBitmap.create("servant_infoPro" + bookcfg.type);
        bicon.setPosition(itemBg.width / 2 - bicon.width / 2, itemName.y + itemName.height + 18);
        bgContainer.addChild(bicon);
        var starsp = this.getServantBookStars(bookcfg.num);
        starsp.x = bicon.x + bicon.width / 2 - starsp.width / 2;
        starsp.y = bicon.y + 70;
        bgContainer.addChild(starsp);
        if (GameData.isInArray(bookid, this._hadBooks)) {
            var gotpic = BaseBitmap.create("public_got");
            gotpic.setPosition(itemBg.width / 2 - gotpic.width / 2, itemBg.height - gotpic.height - 12);
            bgContainer.addChild(gotpic);
        }
        else {
            var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "adultChoose", this.chooseItem, this, [bookid]);
            exchangeBtn.setPosition(itemBg.width / 2 - exchangeBtn.width / 2, itemBg.height - exchangeBtn.height - 12);
            exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
            bgContainer.addChild(exchangeBtn);
        }
        return bgContainer;
    };
    ItemUseChooseBookPopupView.prototype.getServantBookStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    ItemUseChooseBookPopupView.prototype.chooseItem = function (bookid) {
        this._clickBookId = bookid;
        var bookName = LanguageManager.getlocal("servant_attrNameTxt" + bookid);
        var tipKey;
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(this._skinId);
        if (this._hadBooks.length >= skincfg.ability.length - 1) {
            tipKey = "itemChooseBookTip2";
        }
        else {
            tipKey = "itemChooseBookTip1";
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal(tipKey, [bookName]),
            callback: this.realChoose,
            handler: this,
            needCancel: true,
            txtcolor: 0x000000
        });
    };
    ItemUseChooseBookPopupView.prototype.realChoose = function () {
        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE, { "itemId": this._itemId, "chooseId": this._clickBookId });
        this.hide();
    };
    ItemUseChooseBookPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    ItemUseChooseBookPopupView.prototype.dispose = function () {
        this._skinId = null;
        this._itemId = 0;
        this._scrollContainer = null;
        this._hadBooks.length = 0;
        this._clickBookId = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUseChooseBookPopupView;
}(PopupView));
__reflect(ItemUseChooseBookPopupView.prototype, "ItemUseChooseBookPopupView");
//# sourceMappingURL=ItemUseChooseBookPopupView.js.map