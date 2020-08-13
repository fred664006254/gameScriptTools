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
        var bg = BaseBitmap.create("public_9_bg1");
        bg.width = 500;
        bg.height = 107;
        this.addChild(bg);
        this.initServantIcon(servantInfoVo);
        this.initServantInfo();
        var useBtn = ComponentManager.getButton(this.getBtnResName(), this.getBtnLocalName(), this.clickBtnHandler, this);
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        useBtn.x = bg.width - useBtn.width - 10;
        useBtn.y = bg.height / 2 - useBtn.height / 2;
        this.addChild(useBtn);
    };
    ServantSelectedScrollItem.prototype.initServantIcon = function (servantInfoVo) {
        var temW = 100;
        var iconBgBt = BaseLoadBitmap.create(servantInfoVo.qualityBoxImgPath);
        iconBgBt.x = 10;
        iconBgBt.y = 3.5;
        this.addChild(iconBgBt);
        iconBgBt.scaleX = temW / 194;
        iconBgBt.scaleY = temW / 192;
        var iconBt = BaseLoadBitmap.create(servantInfoVo.halfImgPath);
        iconBt.x = iconBgBt.x + 5;
        iconBt.y = iconBgBt.y + 5;
        this.addChild(iconBt);
        iconBt.scaleX = (temW - 10) / 180;
        iconBt.scaleY = (temW - 10) / 177;
        if (servantInfoVo.isServantExile()) {
            var exileBM = BaseBitmap.create("public_servantexilelogo");
            exileBM.setScale(iconBgBt.scaleX);
            exileBM.setPosition(iconBgBt.x + 194 * iconBgBt.scaleX - exileBM.width * iconBgBt.scaleX, iconBgBt.y);
            this.addChild(exileBM);
        }
    };
    /**重写该方法 */
    ServantSelectedScrollItem.prototype.initServantInfo = function () {
        var nameTF = ComponentManager.getTextField(this._servantInfoVo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTF.setColor(TextFieldConst.COLOR_WHITE);
        nameTF.x = 120;
        nameTF.y = 15;
        this.addChild(nameTF);
        var levelTF = ComponentManager.getTextField(LanguageManager.getlocal("servant_infoLv") + this._servantInfoVo.level, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        levelTF.setColor(TextFieldConst.COLOR_WHITE);
        levelTF.x = 120;
        levelTF.y = 45;
        this.addChild(levelTF);
        this._attrTF = ComponentManager.getTextField(this.getAttrStr(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._attrTF.setColor(TextFieldConst.COLOR_WHITE);
        this._attrTF.x = 120;
        this._attrTF.y = 75;
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
        if (this._data.type && this._data.type == ServantSelectedPopupView.TYPE_EMPWAR) {
            attrStr = LanguageManager.getlocal("servant_infoAttr") + this._servantInfoVo.total;
        }
        return attrStr;
    };
    /** 按钮图片 */
    ServantSelectedScrollItem.prototype.getBtnResName = function () {
        return ButtonConst.BTN_NORMAL_YELLOW;
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
//# sourceMappingURL=ServantSelectedScrollItem.js.map