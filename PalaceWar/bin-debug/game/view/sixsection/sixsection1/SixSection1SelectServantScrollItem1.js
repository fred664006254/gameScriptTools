var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
*
* date 2020.
* author ycg
* @name SixSection1SelectServantScrollItem1
*/
var SixSection1SelectServantScrollItem1 = /** @class */ (function (_super) {
    __extends(SixSection1SelectServantScrollItem1, _super);
    function SixSection1SelectServantScrollItem1() {
        var _this = _super.call(this) || this;
        _this._useBtn = null;
        _this._selFlag = null;
        _this._isSel = false;
        return _this;
    }
    SixSection1SelectServantScrollItem1.prototype.initItem = function (index, data, param) {
        var _this = this;
        this.width = 510;
        var servantId = data;
        var servantInfoObj = Api.servantVoApi.getServantObj(servantId);
        var bg = BaseBitmap.create("public_popupscrollitembg");
        this.addChild(bg);
        var deltaScale = 0.55;
        var cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBoxImgPath);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(deltaScale);
        cardbg.x = bg.x + 20;
        cardbg.y = bg.y + 10;
        cardbg.name = "cardbg";
        this.addChild(cardbg);
        var servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);
        var nameBg = BaseBitmap.create("public_titlebg");
        nameBg.setPosition(cardbg.x + cardbg.width * deltaScale + 8, cardbg.y);
        this.addChild(nameBg);
        var nameTxt = ComponentManager.getTextField(servantInfoObj.servantName, 22, ServantScrollItem.getQualityColor(servantInfoObj.clv));
        nameTxt.x = nameBg.x + 10;
        nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var lvTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantLevel", ["" + servantInfoObj.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        lvTxt.setPosition(nameTxt.x, nameBg.y + nameBg.height + 5);
        this.addChild(lvTxt);
        var talentTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantTalent", ["" + servantInfoObj.getTotalBookValue(1)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        talentTxt.setPosition(lvTxt.x, lvTxt.y + lvTxt.height + 5);
        this.addChild(talentTxt);
        // let totalAttr = App.StringUtil.changeIntToText(servantInfoObj.total);
        var totalAttr = App.StringUtil.changeIntToText(servantInfoObj.getTotalAttrValye(1));
        var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SelectServantAttr", ["" + totalAttr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        attrTxt.setPosition(lvTxt.x, talentTxt.y + talentTxt.height + 5);
        this.addChild(attrTxt);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sixSection1SelectServantUse", function () {
            if (param.callback) {
                var isCan = param.callback.apply(param.obj);
                if (!isCan) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SelectServantFullTip"));
                    return;
                }
            }
            _this.update(true);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SIXSECTION1_SELSERVANT_REFRESH, { type: "servant", id: servantId, index: index });
        }, this);
        useBtn.setPosition(bg.x + bg.width - useBtn.width - 15, bg.y + bg.height / 2 - useBtn.height / 2);
        this.addChild(useBtn);
        this._useBtn = useBtn;
        var useFlag = BaseBitmap.create("awservantstate1");
        useFlag.setScale(1);
        useFlag.setPosition(bg.x + bg.width - useFlag.width * useFlag.scaleX - 15, bg.y + bg.height / 2 - useFlag.height * useFlag.scaleY / 2);
        this.addChild(useFlag);
        useFlag.visible = false;
        this._selFlag = useFlag;
        if (Api.sixsection1VoApi.isUsedServant(servantId)) {
            this.update(true);
        }
        else {
            this.update(false);
        }
    };
    SixSection1SelectServantScrollItem1.prototype.update = function (isSel) {
        this._isSel = isSel;
        if (this._isSel) {
            this._useBtn.visible = false;
            this._selFlag.visible = true;
        }
        else {
            this._useBtn.visible = true;
            this._selFlag.visible = false;
        }
    };
    SixSection1SelectServantScrollItem1.prototype.getSpaceX = function () {
        return 5;
    };
    SixSection1SelectServantScrollItem1.prototype.getSpaceY = function () {
        return 5;
    };
    SixSection1SelectServantScrollItem1.prototype.dispose = function () {
        this._selFlag = null;
        this._useBtn = null;
        this._isSel = false;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SelectServantScrollItem1;
}(ScrollListItem));
//# sourceMappingURL=SixSection1SelectServantScrollItem1.js.map