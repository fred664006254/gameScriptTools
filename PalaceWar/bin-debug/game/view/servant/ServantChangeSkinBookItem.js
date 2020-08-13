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
 * 换装界面 下面的书籍item
 * author shaoliang
 * date 2019/7/12
 * @class ServantChangeSkinBookItem
 */
var ServantChangeSkinBookItem = (function (_super) {
    __extends(ServantChangeSkinBookItem, _super);
    function ServantChangeSkinBookItem() {
        return _super.call(this) || this;
    }
    ServantChangeSkinBookItem.prototype.initItem = function (index, data, parms) {
        var bookId = data;
        var skinId = parms[0];
        var isShowStar = parms[1];
        var attrImg = parms[2];
        var bookcfg = GameConfig.config.abilityCfg[bookId];
        if (isShowStar) {
            this.width = 290;
        }
        else {
            this.width = 245;
        }
        var attrBgStr = "public_9_managebg";
        if (attrImg) {
            attrBgStr = attrImg;
        }
        var attrbg = BaseBitmap.create(attrBgStr);
        attrbg.width = this.width - 30;
        attrbg.height = 71;
        attrbg.x = 25;
        attrbg.y = 10;
        this.addChild(attrbg);
        var attrIcon = BaseLoadBitmap.create("servant_skin_book" + bookcfg.type);
        this.addChild(attrIcon);
        // if (isShowStar)
        // {
        var starImg = this.getStars(bookcfg.num);
        starImg.x = attrIcon.x + 45 - starImg.width / 2;
        starImg.y = attrIcon.y + 65;
        this.addChild(starImg);
        // }
        var blv = Api.servantVoApi.getSerSkinBookId(skinId, bookId);
        var showCorner = false;
        if (Api.servantVoApi.getSerSkinBookId2(skinId, bookId)) {
            showCorner = true;
        }
        if (!blv || !isShowStar) {
            blv = 1;
        }
        var attrNameTxt = ComponentManager.getTextField(" ", 20, TextFieldConst.COLOR_BROWN);
        if (isShowStar) {
            attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + bookId) + "Lv" + blv;
        }
        else {
            attrNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt" + bookId);
        }
        attrNameTxt.x = attrIcon.x + 72;
        attrNameTxt.y = attrbg.y + 10;
        this.addChild(attrNameTxt);
        var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + bookcfg.type) + bookcfg.num * blv, 18, TextFieldConst.COLOR_BROWN);
        attrTxt.x = attrNameTxt.x + 13;
        attrTxt.y = attrNameTxt.y + 30;
        this.addChild(attrTxt);
        if (showCorner) {
            var corner = BaseLoadBitmap.create("public_got_corner");
            corner.x = attrbg.x + attrbg.width - 80;
            corner.y = attrbg.y + attrbg.height - 60;
            this.addChild(corner);
        }
    };
    ServantChangeSkinBookItem.prototype.getStars = function (num) {
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
    return ServantChangeSkinBookItem;
}(ScrollListItem));
__reflect(ServantChangeSkinBookItem.prototype, "ServantChangeSkinBookItem");
//# sourceMappingURL=ServantChangeSkinBookItem.js.map