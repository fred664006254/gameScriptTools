/**
 * 红颜技能经验转换道具弹板
 * author shaoliang
 * date 2019/8/20
 * @class WifeExpExchangePopupView
 */
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
var WifeExpExchangePopupView = (function (_super) {
    __extends(WifeExpExchangePopupView, _super);
    function WifeExpExchangePopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._cost = 0;
        _this._costText = null;
        return _this;
    }
    WifeExpExchangePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2"
        ]);
    };
    WifeExpExchangePopupView.prototype.initView = function () {
        this._useCallback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var id = this.param.data.id;
        this._vo = Api.wifeVoApi.getWifeInfoVoById(id);
        this._cost = Api.wifeVoApi.getTransformValue(id);
        this._maxNum = Math.floor(this._vo.exp / this._cost);
        if (this._maxNum > 100) {
            this._maxNum = 100;
        }
        if (this._maxNum == 0) {
            this._maxNum = 1;
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 240;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var itemCfg = Config.ItemCfg.getItemCfgById("1359");
        var temX = 35 + GameData.popupviewOffsetX;
        var temY = 23;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(itemCfg.iconBg);
        itembg.x = temX;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        var iconItem = GameData.getItemIcon(itemCfg, true);
        iconItem.x = temX;
        iconItem.y = temY;
        this.addChildToContainer(iconItem);
        var bg1 = BaseBitmap.create("public_9_bg1");
        bg1.width = 387;
        bg1.height = temH;
        bg1.x = temX + temW + 10;
        bg1.y = temY;
        this.addChildToContainer(bg1);
        var nameTF = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTF.setColor(TextFieldConst.COLOR_QUALITY_BLUE);
        nameTF.x = bg1.x + 8;
        nameTF.y = bg1.y + 8;
        this.addChildToContainer(nameTF);
        var effectDescTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkillExcangeDesc", [String(this._cost), this._vo.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        effectDescTF.x = nameTF.x;
        effectDescTF.y = nameTF.y + nameTF.height + 10;
        effectDescTF.width = 366;
        effectDescTF.lineSpacing = 5;
        this.addChildToContainer(effectDescTF);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = temX + 55;
        dragProgressBar.y = bg1.y + bg1.height + 77;
        this.addChildToContainer(dragProgressBar);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 90;
        this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
        this._numBg.y = bg1.y + bg1.height + 70;
        this.addChildToContainer(this._numBg);
        this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.y = this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2;
        this.addChildToContainer(this._selectedNumTF);
        this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        this._maxNumTF.y = this._numBg.y + this._numBg.height / 2 - this._maxNumTF.height / 2;
        this.addChildToContainer(this._maxNumTF);
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        var costbg = BaseBitmap.create("public_numbg");
        costbg.height = 34;
        costbg.width = bg.width;
        costbg.setPosition(bg.x, bg.y + 134);
        this.addChildToContainer(costbg);
        this._costText = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._costText.x = costbg.x;
        this._costText.y = costbg.y + costbg.height / 2 - this._costText.height / 2;
        this._costText.width = costbg.width;
        this.addChildToContainer(this._costText);
        this._costText.textAlign = egret.HorizontalAlign.CENTER;
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "wifeSkillExcangeSure", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = bg.y + bg.height + 15;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
        if (this._vo.exp >= this._cost) {
            App.CommonUtil.addIconToBDOC(useBtn);
            this._costText.text = LanguageManager.getlocal("wifeSkillExcangeCost", ["0x3aeb67", String(this._cost), String(this._vo.exp)]);
        }
        else {
            App.DisplayUtil.changeToGray(useBtn);
            this._costText.text = LanguageManager.getlocal("wifeSkillExcangeCost", ["0xbb2800", String(this._cost), String(this._vo.exp)]);
        }
    };
    WifeExpExchangePopupView.prototype.getTitleStr = function () {
        return "wifeSkillExcange";
    };
    WifeExpExchangePopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        this._costText.text = LanguageManager.getlocal("wifeSkillExcangeCost", ["0x3aeb67", String(this._cost * curNum), String(this._vo.exp)]);
    };
    WifeExpExchangePopupView.prototype.useHandler = function (param) {
        if (this._vo.exp < this._cost) {
            App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillExpNotEnough"));
            return;
        }
        this._useCallback.apply(this._handler, [this._useNum]);
        this.hide();
    };
    WifeExpExchangePopupView.prototype.dispose = function () {
        this._useCallback = null;
        this._useNum = 1;
        this._selectedNumTF = null;
        this._maxNum = 0;
        this._numBg = null;
        this._handler = null;
        this._cost = 0;
        this._vo = null;
        this._costText = null;
        this._maxNumTF = null;
        _super.prototype.dispose.call(this);
    };
    return WifeExpExchangePopupView;
}(PopupView));
__reflect(WifeExpExchangePopupView.prototype, "WifeExpExchangePopupView");
//# sourceMappingURL=WifeExpExchangePopupView.js.map