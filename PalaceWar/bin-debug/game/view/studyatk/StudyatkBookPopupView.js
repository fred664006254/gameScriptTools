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
        this._tipTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt", [Api.studyatkVoApi.getStudySkillInfoTotalExp()]);
        this._tipTxt.x = this.viewBg.width / 2 - this._tipTxt.width / 2;
        this._tipTxt.y = 20;
        this._nodeContainer.addChild(this._tipTxt);
        var bottomBg = BaseBitmap.create("public_9_bg39");
        bottomBg.width = 520;
        bottomBg.height = 522;
        bottomBg.name = "bottomBg";
        // bottomBg.height = 240;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 50;
        this._nodeContainer.addChild(bottomBg);
        var dataList = Config.StudyatkCfg.getStudyatkList();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bottomBg.width, bottomBg.height - 10);
        var scrollList = ComponentManager.getScrollList(StudyatkBookScrollItem, Object.keys(dataList), rect);
        scrollList.y = bottomBg.y + 5;
        scrollList.x = bottomBg.x;
        this._scrollList = scrollList;
        this._nodeContainer.addChild(scrollList);
        this.scrollPos();
        this.upgradeCallback();
    };
    StudyatkBookPopupView.prototype.scrollPos = function () {
        var idx = Api.studyatkVoApi.getStudySkillInfoLv();
        var topH = idx * 120;
        this._scrollList.setScrollTopByIndex(idx);
    };
    StudyatkBookPopupView.prototype.upgradeCallback = function () {
        this._tipTxt.text = LanguageManager.getlocal("studyatkBook_tipTxt", [Api.studyatkVoApi.getStudySkillInfoTotalExp()]);
    };
    StudyatkBookPopupView.prototype.getShowHeight = function () {
        return 660;
    };
    // protected getBgExtraHeight():number
    // {
    // 	return -130;
    // }
    StudyatkBookPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.upgradeCallback, this);
        this._nodeContainer = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkBookPopupView;
}(PopupView));
__reflect(StudyatkBookPopupView.prototype, "StudyatkBookPopupView");
//# sourceMappingURL=StudyatkBookPopupView.js.map