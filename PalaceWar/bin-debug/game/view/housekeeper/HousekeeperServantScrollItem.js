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
 * 自动选择门课客item
 * author shaoliang
 * date 2020.4.26
 * @class HousekeeperServantScrollItem
 */
var HousekeeperServantScrollItem = (function (_super) {
    __extends(HousekeeperServantScrollItem, _super);
    function HousekeeperServantScrollItem() {
        var _this = _super.call(this) || this;
        _this._servantId = "";
        _this._isSelect = false;
        _this._selectBg = null;
        return _this;
    }
    HousekeeperServantScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._servantId = data.id;
        var servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 510;
        bottomBg.height = 120;
        bottomBg.x = 9;
        this.addChild(bottomBg);
        var deltaScale = 0.55;
        var cardbg = BaseLoadBitmap.create(servantInfoObj.qualityBoxImgPath);
        cardbg.width = 194;
        cardbg.height = 192;
        cardbg.setScale(deltaScale);
        cardbg.x = 20;
        cardbg.y = 8;
        cardbg.name = "cardbg";
        this.addChild(cardbg);
        var servantImg = BaseLoadBitmap.create(servantInfoObj.halfImgPath);
        servantImg.width = 180;
        servantImg.height = 177;
        servantImg.x = cardbg.x + cardbg.width / 2 - servantImg.width / 2 - 5;
        servantImg.y = cardbg.y + cardbg.height / 2 - servantImg.height / 2 - 2;
        servantImg.setScale(deltaScale);
        this.addChild(servantImg);
        var nameTxt = ComponentManager.getTextField("", 20);
        nameTxt.textColor = ServantScrollItem.getQualityColor(servantInfoObj.clv);
        nameTxt.text = servantInfoObj.servantName;
        nameTxt.x = cardbg.x + cardbg.width * deltaScale + 10;
        nameTxt.y = 13;
        this.addChild(nameTxt);
        var lvTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantLevel", ["" + servantInfoObj.level]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        lvTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 4);
        this.addChild(lvTxt);
        var bookExpTxt = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomServantBookExp", ["" + servantInfoObj.abilityExp]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        bookExpTxt.setPosition(nameTxt.x, lvTxt.y + lvTxt.height + 4);
        this.addChild(bookExpTxt);
        var skillExpTxt = ComponentManager.getTextField("", 20);
        skillExpTxt.text = LanguageManager.getlocal("bookRoomServantSkillExp", [String(servantInfoObj.skillExp)]);
        skillExpTxt.x = nameTxt.x;
        skillExpTxt.y = bookExpTxt.y + bookExpTxt.height + 4;
        this.addChild(skillExpTxt);
        var selectBg = BaseBitmap.create("public_select");
        selectBg.setPosition(bottomBg.x + bottomBg.width - selectBg.width - 20, bottomBg.y + bottomBg.height / 2 - selectBg.height / 2);
        this.addChild(selectBg);
        selectBg.addTouchTap(this.selectBtnClick, this);
        this._selectBg = selectBg;
        if (data.type == 1) {
            this._isSelect = true;
            this._selectBg.setRes("public_select_down");
        }
    };
    HousekeeperServantScrollItem.prototype.selectBtnClick = function (target, param) {
        var autoSelView = ViewController.getInstance().getView(ViewConst.COMMON.HOUSEKEEPERSERVANTPOPUPVIEW);
        this._isSelect = !this._isSelect;
        var selBtnImg = "public_select";
        if (this._isSelect) {
            selBtnImg = "public_select_down";
            if (!autoSelView.isCanSelect()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoPosIsFull"));
                return;
            }
        }
        if (this._selectBg) {
            this._selectBg.setRes(selBtnImg);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, { servantId: this._servantId, isSelect: this._isSelect });
    };
    HousekeeperServantScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    HousekeeperServantScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    HousekeeperServantScrollItem.prototype.dispose = function () {
        this._servantId = "";
        this._isSelect = false;
        this._selectBg = null;
        _super.prototype.dispose.call(this);
    };
    return HousekeeperServantScrollItem;
}(ScrollListItem));
__reflect(HousekeeperServantScrollItem.prototype, "HousekeeperServantScrollItem");
//# sourceMappingURL=HousekeeperServantScrollItem.js.map