/**
 * 剧情回忆选择章节
 * author shaoliang
 * date 2019/4/12
 * @class StoryrecallChooosePopupView
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
var StoryrecallChooosePopupView = (function (_super) {
    __extends(StoryrecallChooosePopupView, _super);
    function StoryrecallChooosePopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        return _this;
    }
    StoryrecallChooosePopupView.prototype.getTitleStr = function () {
        return "loctombjump-1";
    };
    StoryrecallChooosePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2", "aclotteryview_bar_1"
        ]);
    };
    StoryrecallChooosePopupView.prototype.initView = function () {
        this._useCallback = this.param.data.f;
        this._handler = this.param.data.o;
        this._maxNum = this.param.data.maxNum;
        this._useNum = this.param.data.num;
        if (this._maxNum == 0) {
            this._maxNum = 1;
        }
        var titleBg = BaseBitmap.create("aclotteryview_bar_1");
        titleBg.scaleX = (this.viewBg.width - 28 - GameData.popupviewOffsetX * 2) / titleBg.width;
        titleBg.setPosition(14 + GameData.popupviewOffsetX, 10);
        this.addChildToContainer(titleBg);
        var chooseTip = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_choose"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        chooseTip.setPosition(30 + GameData.popupviewOffsetX, titleBg.y + titleBg.height / 2 - chooseTip.height / 2);
        this.addChildToContainer(chooseTip);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 173;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = chooseTip.y + chooseTip.height + 28;
        this.addChildToContainer(bg);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this, null, 1, 365, this.param.data.num);
        dragProgressBar.x = this.viewBg.width / 2 - dragProgressBar.width / 2 + 54;
        dragProgressBar.y = bg.y + 98;
        this.addChildToContainer(dragProgressBar);
        var firstChapter = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_page2", ["1"]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        firstChapter.setPosition(45 + GameData.popupviewOffsetX, bg.y + 65);
        this.addChildToContainer(firstChapter);
        var lastChapter = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_page2", [String(this._maxNum)]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        lastChapter.setPosition(this.viewBg.width - 47 - lastChapter.width - GameData.popupviewOffsetX, bg.y + 65);
        this.addChildToContainer(lastChapter);
        var numBg = BaseBitmap.create("public_9_bg5");
        numBg.width = 240;
        numBg.setPosition(this.viewBg.width / 2 - numBg.width / 2, bg.y + 28);
        this.addChildToContainer(numBg);
        this._selectedNumTF = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_page1", [String(this._useNum), LanguageManager.getlocal("challengeTitle" + this._useNum)]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        this._selectedNumTF.setPosition(this.viewBg.width / 2 - this._selectedNumTF.width / 2, numBg.y + numBg.height / 2 - this._selectedNumTF.height / 2);
        this.addChildToContainer(this._selectedNumTF);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "confirmBtn", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = bg.y + bg.height + 15;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
    };
    StoryrecallChooosePopupView.prototype.useHandler = function (param) {
        this._useCallback.apply(this._handler, [this._useNum]);
        this.hide();
    };
    StoryrecallChooosePopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = LanguageManager.getlocal("storyRecall_page1", [String(this._useNum), LanguageManager.getlocal("challengeTitle" + curNum)]);
        this._selectedNumTF.x = this.viewBg.width / 2 - this._selectedNumTF.width / 2;
    };
    StoryrecallChooosePopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    StoryrecallChooosePopupView.prototype.dispose = function () {
        this._useCallback = null;
        this._useNum = 1;
        if (this._selectedNumTF) {
            this.removeChildFromContainer(this._selectedNumTF);
            this._selectedNumTF.dispose();
            this._selectedNumTF = null;
        }
        this._maxNum = 0;
        this._handler = null;
        _super.prototype.dispose.call(this);
    };
    return StoryrecallChooosePopupView;
}(PopupView));
__reflect(StoryrecallChooosePopupView.prototype, "StoryrecallChooosePopupView");
//# sourceMappingURL=StoryrecallChoosePopupView.js.map