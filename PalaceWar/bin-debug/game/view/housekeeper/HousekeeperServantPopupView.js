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
 * 管家门客自动选择
 * author shaoliang
 * date 2020.4.26
 * @class HousekeeperServantPopupView
 */
var HousekeeperServantPopupView = (function (_super) {
    __extends(HousekeeperServantPopupView, _super);
    function HousekeeperServantPopupView() {
        var _this = _super.call(this) || this;
        _this._currSelNum = null;
        _this._selectSerList = [];
        _this._function = null;
        _this._obj = null;
        _this._maxNum = 0;
        return _this;
    }
    HousekeeperServantPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);
        this._function = this.param.data.f;
        this._obj = this.param.data.o;
        var bookCfg = GameConfig.config.bookroomCfg;
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_select_servant"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        txt1.x = 40 + GameData.popupviewOffsetX;
        txt1.y = 20;
        this.addChildToContainer(txt1);
        var selNum = ComponentManager.getTextField(LanguageManager.getlocal("bookRoomSelectServantNum", ["", ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        selNum.x = txt1.x;
        selNum.y = txt1.y + 30;
        this.addChildToContainer(selNum);
        this._currSelNum = selNum;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 574;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = selNum.y + 30;
        this.addChildToContainer(bg);
        var studyBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "allianceInfoSave", this.studyBtnClick, this);
        studyBtn.setPosition(bg.x + bg.width / 2 - studyBtn.width / 2, bg.y + bg.height + 8);
        this.addChildToContainer(studyBtn);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        var idList = Api.servantVoApi.getServantInfoIdListWithSort(2);
        this._maxNum = Api.bookroomVoApi.getMaxleng();
        var parmsstr = Api.housekeeperVoApi.getCheckParms("bookroom");
        this._selectSerList = parmsstr.split("|");
        var servantNum = this._selectSerList.length;
        if (servantNum == 1 && this._selectSerList[0] == "") {
            servantNum = 0;
            this._selectSerList.length = 0;
        }
        selNum.text = LanguageManager.getlocal("bookRoomSelectServantNum", [String(servantNum), String(this._maxNum)]);
        var array = [];
        for (var i = 0; i < idList.length; i++) {
            var oneid = idList[i];
            var isSelected = GameData.isInArray(oneid, this._selectSerList);
            array.push({ id: oneid, type: isSelected ? 1 : 2 });
        }
        var scrollList = ComponentManager.getScrollList(HousekeeperServantScrollItem, array, rect);
        scrollList.x = bg.x;
        scrollList.y = bg.y + 5;
        this.addChildToContainer(scrollList);
    };
    //是否可以选择
    HousekeeperServantPopupView.prototype.isCanSelect = function () {
        if (this._maxNum > this._selectSerList.length) {
            return true;
        }
        return false;
    };
    HousekeeperServantPopupView.prototype.selectServant = function (data) {
        if (data && data.data) {
            if (data.data.isSelect) {
                this._selectSerList.push(data.data.servantId);
            }
            else {
                this.removeServantFromList(data.data.servantId);
            }
            var maxPosNum = Api.bookroomVoApi.getMaxleng();
            var studyNum = 0; //Api.bookroomVoApi.getInStudyServantNum();
            this._currSelNum.text = LanguageManager.getlocal("bookRoomSelectServantNum", ["" + (studyNum + this._selectSerList.length), "" + maxPosNum]);
        }
    };
    HousekeeperServantPopupView.prototype.removeServantFromList = function (id) {
        for (var i = 0; i < this._selectSerList.length; i++) {
            if (this._selectSerList[i] == id) {
                this._selectSerList.splice(i, 1);
                return;
            }
        }
    };
    HousekeeperServantPopupView.prototype.studyBtnClick = function () {
        if (this._selectSerList.length <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_autoNotSelect"));
            return;
        }
        this._function.apply(this._obj, [this._selectSerList]);
        this.hide();
    };
    HousekeeperServantPopupView.prototype.getShowHeight = function () {
        return 800;
    };
    HousekeeperServantPopupView.prototype.getTitleStr = function () {
        return "bookRoom_autoSelectTitleStr";
    };
    HousekeeperServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AUTOSTUDY_SELECTSERVANT, this.selectServant, this);
        this._maxNum = 0;
        this._currSelNum = null;
        this._selectSerList.length = 0;
        this._function = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return HousekeeperServantPopupView;
}(PopupView));
__reflect(HousekeeperServantPopupView.prototype, "HousekeeperServantPopupView");
//# sourceMappingURL=HousekeeperServantPopupView.js.map