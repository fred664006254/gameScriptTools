/**
 * 武穆遗书
 * author yanyuling
 * date 2017/11/30
 * @class StudyatkBookPopupView
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
var StudyatkBookPopupView = (function (_super) {
    __extends(StudyatkBookPopupView, _super);
    function StudyatkBookPopupView() {
        return _super.call(this) || this;
    }
    StudyatkBookPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.upgradeCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var txtBg = BaseBitmap.create("public_tc_bg02");
        txtBg.x = this.viewBg.width / 2 - txtBg.width / 2;
        txtBg.y = 15;
        this._nodeContainer.addChild(txtBg);
        this._tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt", [App.StringUtil.changeIntToText(Api.studyatkVoApi.getStudySkillInfoTotalExp())]);
        this._tipTxt.x = this.viewBg.width / 2 - this._tipTxt.width / 2;
        this._tipTxt.y = txtBg.y + txtBg.height / 2 - this._tipTxt.height / 2 + 2;
        this._nodeContainer.addChild(this._tipTxt);
        var bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 540;
        bottomBg.height = 610 + 27;
        bottomBg.name = "bottomBg";
        // bottomBg.height = 240;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = this._tipTxt.y + this._tipTxt.height + 30;
        this._nodeContainer.addChild(bottomBg);
        var dataList = Config.StudyatkCfg.getStudyatkList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, 600 + 10);
        var scrollList = ComponentManager.getScrollList(StudyatkBookScrollItem, Object.keys(dataList), rect);
        scrollList.x = bottomBg.x + 5;
        scrollList.y = bottomBg.y + 5 + 7;
        this._scrollList = scrollList;
        this._nodeContainer.addChild(scrollList);
        this.scrollPos();
        this.upgradeCallback();
    };
    StudyatkBookPopupView.prototype.scrollPos = function () {
        var idx = Api.studyatkVoApi.getStudySkillInfoLv();
        this._scrollList.setScrollTopByIndex(idx);
    };
    StudyatkBookPopupView.prototype.upgradeCallback = function () {
        this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt", [App.StringUtil.changeIntToText(Api.studyatkVoApi.getStudySkillInfoTotalExp())]);
    };
    StudyatkBookPopupView.prototype.getShowHeight = function () {
        return 851.5;
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    // protected getBgExtraHeight():number
    // {
    // 	return 70;
    // }
    StudyatkBookPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_unlock",
            "public_grasp"
        ]);
    };
    StudyatkBookPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.upgradeCallback, this);
        this._nodeContainer = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkBookPopupView;
}(PopupView));
__reflect(StudyatkBookPopupView.prototype, "StudyatkBookPopupView");
