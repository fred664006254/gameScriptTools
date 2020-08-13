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
 * 选择红颜弹板单个模块，可继承
 * author qianjun
 */
var WifeSelectedScrollItem = (function (_super) {
    __extends(WifeSelectedScrollItem, _super);
    function WifeSelectedScrollItem() {
        var _this = _super.call(this) || this;
        _this._selectedIndex = 0;
        _this._banishing = null;
        _this._useBtn = null;
        _this._type = 0;
        return _this;
    }
    WifeSelectedScrollItem.prototype.initItem = function (index, data, itemparam) {
        this._selectedIndex = index;
        this._data = data;
        this._type = itemparam;
        var wifeInfoVo = data;
        this._wifeInfoVo = wifeInfoVo;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 500;
        bg.height = 120;
        this.addChild(bg);
        var wifeHead = Api.wifebanishVoApi.getWifeHead(wifeInfoVo.id.toString());
        wifeHead.setPosition(16, bg.height / 2 - wifeHead.height / 2);
        this.addChild(wifeHead);
        var banishing = BaseBitmap.create("wife_banishing");
        banishing.setPosition(bg.width - banishing.width - 10, bg.height / 2 - banishing.height / 2);
        this.addChild(banishing);
        this._banishing = banishing;
        banishing.visible = Api.wifebanishVoApi.getIsWifeBanishing(this._wifeInfoVo.id.toString()) == 1;
        this.initWifeInfo();
        var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.clickBtnHandler, this);
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        useBtn.x = bg.width - useBtn.width - 10;
        useBtn.y = bg.height / 2 - useBtn.height / 2;
        this.addChild(useBtn);
        useBtn.visible = !banishing.visible;
        this._useBtn = useBtn;
        if (this._type == 2) {
            if (banishing.visible) {
                var banishContainer = new BaseDisplayObjectContainer();
                banishContainer.setPosition(wifeHead.x + 7, wifeHead.y + 18);
                this.addChild(banishContainer);
                var banishingbg = BaseBitmap.create("public_9_bg60");
                banishingbg.y = 64;
                banishingbg.height = 24;
                banishingbg.width = 50;
                banishContainer.addChild(banishingbg);
                var banishingbg2 = BaseBitmap.create("public_9_bg60");
                banishingbg2.y = 64;
                banishingbg2.height = 24;
                banishingbg2.width = 50;
                banishingbg2.scaleX = -1;
                banishingbg2.x = banishingbg.width + banishingbg2.width;
                banishContainer.addChild(banishingbg2);
                var banishingText = BaseBitmap.create("wife_banishing_text");
                banishingText.setPosition(banishingbg.width - banishingText.width / 2, 64);
                banishContainer.addChild(banishingText);
                useBtn.visible = true;
                banishing.visible = false;
            }
        }
    };
    /**重写该方法 */
    WifeSelectedScrollItem.prototype.initWifeInfo = function () {
        var nameTF = ComponentManager.getTextField(this._wifeInfoVo.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        nameTF.x = 140;
        nameTF.y = 25;
        this.addChild(nameTF);
        var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_speciality4") + "：" + this._wifeInfoVo.glamour, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        levelTF.x = 140;
        levelTF.y = 55;
        this.addChild(levelTF);
        this._levelTF = levelTF;
        this._attrTF = ComponentManager.getTextField(this.getAttrStr(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._attrTF.x = 140;
        this._attrTF.y = 85;
        this.addChild(this._attrTF);
    };
    WifeSelectedScrollItem.prototype.getAttrStr = function () {
        var attrStr = "";
        var tarItemId = WifeSelectedPopupView.USE_TYOE_ITEMID;
        if (this._type == 2) {
            attrStr = LanguageManager.getlocal("servant_skilllExp", [String(this._wifeInfoVo.exp)]);
        }
        else {
            attrStr = LanguageManager.getlocal("childIntimacy", [String(this._wifeInfoVo.intimacy)]);
        }
        return attrStr;
    };
    /** 按钮图片 */
    WifeSelectedScrollItem.prototype.getBtnResName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
    };
    /**按钮文字 */
    WifeSelectedScrollItem.prototype.getBtnLocalName = function () {
        return "useBtn";
    };
    /**等级按钮事件，可重写 */
    WifeSelectedScrollItem.prototype.clickBtnHandler = function (param) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_WIFE, { "index": this._selectedIndex, "id": this._wifeInfoVo.id });
    };
    /**刷新数据 */
    WifeSelectedScrollItem.prototype.update = function () {
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeInfoVo.id);
        this._attrTF.text = this.getAttrStr();
        this._levelTF.text = LanguageManager.getlocal("servantInfo_speciality4") + "：" + this._wifeInfoVo.glamour;
        this._banishing.visible = Api.wifebanishVoApi.getIsWifeBanishing(this._wifeInfoVo.id.toString()) == 1;
        this._useBtn.visible = !this._banishing.visible;
        if (this._type == 2) {
            if (this._banishing.visible) {
                this._useBtn.visible = true;
                this._banishing.visible = false;
            }
        }
    };
    WifeSelectedScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    WifeSelectedScrollItem.prototype.dispose = function () {
        this._attrTF = null;
        this._selectedIndex = null;
        this._wifeInfoVo = null;
        this._levelTF = null;
        this._banishing = null;
        this._useBtn = null;
        this._type = 0;
        _super.prototype.dispose.call(this);
    };
    return WifeSelectedScrollItem;
}(ScrollListItem));
__reflect(WifeSelectedScrollItem.prototype, "WifeSelectedScrollItem");
//# sourceMappingURL=WifeSelectedScrollItem.js.map