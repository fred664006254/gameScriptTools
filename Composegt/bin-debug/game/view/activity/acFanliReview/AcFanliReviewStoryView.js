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
 * author yanyuling
 */
var AcFanliReviewStoryView = (function (_super) {
    __extends(AcFanliReviewStoryView, _super);
    function AcFanliReviewStoryView() {
        return _super.call(this) || this;
    }
    AcFanliReviewStoryView.prototype.initView = function () {
        var _blackBg = BaseBitmap.create("guideGrayBg");
        _blackBg.height = GameConfig.stageHeigth;
        _blackBg.width = GameConfig.stageWidth;
        this.addChild(_blackBg);
        var bg = BaseBitmap.create("fanliReview_bg2");
        bg.x = GameConfig.stageWidth / 2 - bg.width / 2;
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        ;
        this.addChild(bg);
        var clostBtn = ComponentManager.getButton("fanliReview_close", "", this.tapHandler, this);
        clostBtn.x = bg.x + bg.width - clostBtn.width - 5;
        clostBtn.y = bg.y + 15;
        this.addChild(clostBtn);
        var namebg = BaseBitmap.create("fanliReview_namebg");
        namebg.x = bg.x + 70;
        namebg.y = bg.y + 40;
        this.addChild(namebg);
        var sid = this.param.data.sid;
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameTxt.text = LanguageManager.getlocal("acFanliReviewView_story_title" + sid);
        nameTxt.x = namebg.x + 45;
        nameTxt.y = namebg.y + 25;
        this.addChild(nameTxt);
        var conNode = new BaseDisplayObjectContainer();
        // this._bottomnodeContainer.y = GameConfig.stageHeigth - 
        var contenttxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        contenttxt.multiline = true;
        contenttxt.lineSpacing = 5;
        contenttxt.width = 510;
        contenttxt.text = LanguageManager.getlocal("acFanliReviewView_story_content" + sid);
        contenttxt.x = 10;
        contenttxt.y = 10;
        conNode.addChild(contenttxt);
        conNode.height += 30;
        var rect = new egret.Rectangle(0, 0, 530, bg.height - 170);
        var scrList = ComponentManager.getScrollView(conNode, rect);
        scrList.x = namebg.x;
        scrList.y = namebg.y + 60;
        this.addChild(scrList);
    };
    AcFanliReviewStoryView.prototype.tapHandler = function () {
        var callBack = this.param.data.callBack;
        if (callBack) {
            callBack.apply(this.param.data.obj);
        }
        this.hide();
    };
    AcFanliReviewStoryView.prototype.getBgName = function () {
        return null;
    };
    AcFanliReviewStoryView.prototype.getResourceList = function () {
        return [];
    };
    AcFanliReviewStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcFanliReviewStoryView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcFanliReviewStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcFanliReviewStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    AcFanliReviewStoryView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFanliReviewStoryView;
}(CommonView));
__reflect(AcFanliReviewStoryView.prototype, "AcFanliReviewStoryView");
