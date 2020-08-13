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
 * 选择门客弹板单个模块，可继承
 * author dmj
 * date 2017/9/28
 * @class ServantSelectedScrollItem
 */
var ServantSelectedScrollItem = (function (_super) {
    __extends(ServantSelectedScrollItem, _super);
    function ServantSelectedScrollItem() {
        var _this = _super.call(this) || this;
        _this._selectedIndex = 0;
        return _this;
    }
    ServantSelectedScrollItem.prototype.initItem = function (index, data, itemparam) {
        this._selectedIndex = index;
        this._data = data;
        this._code = itemparam;
        var servantInfoVo = data;
        this._servantInfoVo = servantInfoVo;
        var bg = BaseBitmap.create("public_listbg3");
        bg.width = 524; //500;
        bg.height = 135;
        this.addChild(bg);
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 129;
        // leftBg.height = 106.5;
        // leftBg.x = 5.5;
        // leftBg.y = 5.5;
        // this.addChild(leftBg);
        this.initServantIcon(servantInfoVo);
        this.initServantInfo();
        var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.clickBtnHandler, this);
        // useBtn.setColor(TextFieldConst.COLOR_BLACK);
        useBtn.x = bg.width - useBtn.width - 15;
        useBtn.y = bg.height / 2 - useBtn.height / 2;
        this.addChild(useBtn);
    };
    ServantSelectedScrollItem.prototype.initServantIcon = function (servantInfoVo) {
        var temW = 100 + 10;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPath);
        iconBgBt.x = 20;
        iconBgBt.y = 10;
        this.addChild(iconBgBt);
        // iconBgBt.scaleX = temW/194;
        // iconBgBt.scaleY = temW/192;
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        // iconBt.scaleX = (temW-10)/180;
        // iconBt.scaleY = (temW-10)/177;
        iconBt.scaleX = (temW - 15) / 180;
        iconBt.scaleY = (temW - 15) / 177;
    };
    /**重写该方法 */
    ServantSelectedScrollItem.prototype.initServantInfo = function () {
        var nameBg = BaseBitmap.create("public_biaoti2");
        nameBg.width = 160;
        nameBg.x = 150;
        nameBg.y = 10;
        var nameTF = ComponentManager.getTextField(this._servantInfoVo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTF.setColor(TextFieldConst.COLOR_BROWN);
        nameTF.x = nameBg.x + nameBg.width / 2 - nameTF.width / 2; //140;
        nameTF.y = nameBg.y + nameBg.height / 2 - nameTF.height / 2; //30;
        this.addChild(nameBg);
        this.addChild(nameTF);
        var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + this._servantInfoVo.level, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        levelTF.setColor(TextFieldConst.COLOR_BROWN);
        levelTF.x = 140 + 15;
        levelTF.y = 55;
        this.addChild(levelTF);
        this._attrTF = ComponentManager.getTextField(this.getAttrStr(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._attrTF.setColor(TextFieldConst.COLOR_BROWN);
        this._attrTF.x = levelTF.x;
        this._attrTF.y = 85;
        this.addChild(this._attrTF);
    };
    ServantSelectedScrollItem.prototype.getAttrStr = function () {
        var attrStr = "servant_infoAttr";
        var tarItemId = ServantSelectedPopupView.USE_TYOE_ITEMID;
        if (tarItemId == 1020 || tarItemId == 1021) {
            attrStr = LanguageManager.getlocal("servant_bookAttr", [String(this._servantInfoVo.abilityExp)]);
        }
        else if (tarItemId == 1029 || tarItemId == 1030) {
            attrStr = LanguageManager.getlocal("servant_skillAttr", [String(this._servantInfoVo.skillExp)]);
        }
        else {
            attrStr = LanguageManager.getlocal("servant_infoAttr") + this._servantInfoVo.total;
        }
        return attrStr;
    };
    /** 按钮图片 */
    ServantSelectedScrollItem.prototype.getBtnResName = function () {
        return ButtonConst.BTN_SMALL_YELLOW;
    };
    /**按钮文字 */
    ServantSelectedScrollItem.prototype.getBtnLocalName = function () {
        return "useBtn";
    };
    /**等级按钮事件，可重写 */
    ServantSelectedScrollItem.prototype.clickBtnHandler = function (param) {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTED_SERVANT, { "index": this._selectedIndex, "id": this._servantInfoVo.servantId });
    };
    /**刷新数据 */
    ServantSelectedScrollItem.prototype.update = function () {
        this._servantInfoVo = Api.servantVoApi.getServantObj(this._servantInfoVo.servantId);
        this._attrTF.text = this.getAttrStr();
    };
    ServantSelectedScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    ServantSelectedScrollItem.prototype.dispose = function () {
        this._attrTF = null;
        this._selectedIndex = null;
        this._servantInfoVo = null;
        _super.prototype.dispose.call(this);
    };
    return ServantSelectedScrollItem;
}(ScrollListItem));
__reflect(ServantSelectedScrollItem.prototype, "ServantSelectedScrollItem");
