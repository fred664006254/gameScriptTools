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
 * 剧情回忆
 * author shaoliang
 * date 2019/4/12
 * @class StoryrecallView
 */
var StoryrecallView = (function (_super) {
    __extends(StoryrecallView, _super);
    function StoryrecallView() {
        var _this = _super.call(this) || this;
        _this._itemContainer = null;
        _this._frontPage = null;
        _this._nextPage = null;
        _this._curPageText = null;
        _this._curPage = 0;
        _this._prePageNum = 0;
        _this._maxPage = 0;
        _this._maxChapter = 0;
        _this._titleText = null;
        _this._descText = null;
        _this._itemTab = [];
        return _this;
    }
    StoryrecallView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "storyrecall_bg", "storyrecalleffect", "story_3page_1", "story_3page_2", "story_3page_3", "story_3page_4",
            "story_page_1", "story_page_2", "story_page_3", "story_page_4",
        ]);
    };
    StoryrecallView.prototype.getTitleStr = function () {
        return null;
    };
    StoryrecallView.prototype.getTitleBgName = function () {
        return null;
    };
    StoryrecallView.prototype.getBgName = function () {
        return "storyrecall_bg";
    };
    StoryrecallView.prototype.getCloseBtnName = function () {
        return "storyrecall_close";
    };
    StoryrecallView.prototype.showRule = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.RULEINFOPOPUPVIEW, LanguageManager.getlocal("storyrecall_ruleInfo"));
    };
    StoryrecallView.prototype.initView = function () {
        this._ruleBtn = ComponentManager.getButton("storyrecall_ask", "", this.showRule, this);
        this._ruleBtn.x = 30 + (PlatformManager.hasSpcialCloseBtn() ? 100 : 0);
        this._ruleBtn.y = 30;
        this.addChild(this._ruleBtn);
        this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 30 : (this.viewBg.width - this.closeBtn.width - 30);
        this.closeBtn.y = this._ruleBtn.y;
        this._itemContainer = new BaseDisplayObjectContainer();
        this.addChild(this._itemContainer);
        var title = BaseBitmap.create("storyrecall_title");
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2, 45);
        this.addChild(title);
        var mask = BaseBitmap.create("storyrecall_mask");
        mask.height = GameConfig.stageHeigth;
        this.addChild(mask);
        var maxBigStory = ChallengeCfg.getMaxStoryBigId();
        this._maxChapter = Api.challengeVoApi.getCurBigChannelId() < maxBigStory ? Api.challengeVoApi.getCurBigChannelId() : maxBigStory;
        //底部
        var titleStr = String(this._maxChapter - 1) + ". " + LanguageManager.getlocal("challengeTitle" + (this._maxChapter - 1));
        this._titleText = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._titleText.setPosition(GameConfig.stageWidth / 2 - this._titleText.width / 2, GameConfig.stageHeigth - 246);
        this.addChild(this._titleText);
        this._descText = ComponentManager.getTextField(LanguageManager.getlocal("challengeDesc" + (this._maxChapter - 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._descText.width = GameConfig.stageWidth - 108;
        this._descText.lineSpacing = 6;
        this._descText.setPosition(54, this._titleText.y + this._titleText.height + 14);
        this.addChild(this._descText);
        var choosePage = ComponentManager.getButton("storyrecall_choosepage", "", this.choosePageHandle, this);
        choosePage.setPosition(GameConfig.stageWidth / 2 - choosePage.width / 2, GameConfig.stageHeigth - 70);
        this.addChild(choosePage);
        this._frontPage = ComponentManager.getButton("storyrecall_front", "", this.changePageHandle, this, [1]);
        this._frontPage.setPosition(68, GameConfig.stageHeigth - 96);
        this.addChild(this._frontPage);
        this._nextPage = ComponentManager.getButton("storyrecall_nextpage", "", this.changePageHandle, this, [2]);
        this._nextPage.setPosition(GameConfig.stageWidth - this._nextPage.width - 68, GameConfig.stageHeigth - 96);
        this.addChild(this._nextPage);
        this._curPageText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        this._curPageText.y = GameConfig.stageHeigth - 90;
        this.addChild(this._curPageText);
        //
        this._prePageNum = Math.floor((GameConfig.stageHeigth - 442) / 72);
        this._maxPage = Math.ceil((this._maxChapter - 1) / this._prePageNum);
        this._curPage = this._maxPage;
        if (Api.challengeVoApi.lastRecallId > 0) {
            this._curPage = Math.ceil(Api.challengeVoApi.lastRecallId / this._prePageNum);
            this.resetInfo(Api.challengeVoApi.lastRecallId);
        }
        this.resetItemInfo();
    };
    StoryrecallView.prototype.resetItemInfo = function () {
        this._curPageText.text = LanguageManager.getlocal("storyRecall_page", [String(this._curPage)]);
        this._curPageText.x = GameConfig.stageWidth / 2 - this._curPageText.width / 2;
        this._frontPage.setEnable(!(this._curPage <= 1));
        this._nextPage.setEnable(!(this._curPage >= this._maxPage));
        if (this._itemTab.length > 0) {
            for (var i = 0; i < this._itemTab.length; i++) {
                this._itemContainer.removeChild(this._itemTab[i]);
                this._itemTab[i].dispose();
            }
            this._itemTab.length = 0;
        }
        var startIdx = 1 + (this._curPage - 1) * this._prePageNum;
        var endIdx = this._curPage * this._prePageNum;
        if (this._maxPage <= this._curPage) {
            endIdx = this._maxChapter - 1;
        }
        var index = 0;
        for (var j = startIdx; j <= endIdx; j++) {
            var container = this.getItemByBigId(j);
            container.setPosition(GameConfig.stageWidth / 2 - container.width / 2, 152 + 72 * index);
            this._itemContainer.addChild(container);
            container.addTouchTap(this.touchChapterHandle, this, [j]);
            this._itemTab.push(container);
            index++;
        }
    };
    StoryrecallView.prototype.getItemByBigId = function (bid) {
        var container = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create("storyrecall_itembg");
        bg.width = 514;
        bg.height = 60;
        container.addChild(bg);
        var chapter = ComponentManager.getTextField(LanguageManager.getlocal("storyRecall_chapter", [String(bid)]), 30, TextFieldConst.COLOR_LIGHT_BLACK);
        chapter.setPosition(16, bg.height / 2 - chapter.height / 2);
        container.addChild(chapter);
        var name = ComponentManager.getTextField(LanguageManager.getlocal("challengeTitle" + bid), 30, TextFieldConst.COLOR_LIGHT_BLACK);
        name.setPosition(chapter.x + chapter.width + 40, chapter.y);
        container.addChild(name);
        return container;
    };
    StoryrecallView.prototype.touchChapterHandle = function (event, idx) {
        ViewController.getInstance().openView(ViewConst.COMMON.STORYCHALLENGEVIEW, { info: idx, f: this.resetInfo, o: this });
    };
    StoryrecallView.prototype.resetInfo = function (bid) {
        Api.challengeVoApi.lastRecallId = bid;
        var titleStr = String(bid) + ". " + LanguageManager.getlocal("challengeTitle" + (bid));
        this._titleText.text = titleStr;
        this._titleText.x = (GameConfig.stageWidth / 2 - this._titleText.width / 2);
        this.addChild(this._titleText);
        this._descText.text = LanguageManager.getlocal("challengeDesc" + bid);
        var num = Math.ceil(bid / this._prePageNum);
        if (this._curPage != num) {
            this._curPage = num;
            this.resetItemInfo();
        }
    };
    StoryrecallView.prototype.choosePageHandle = function () {
        if (this._maxPage == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("storyrecall_noRecord"));
            return;
        }
        var curNum = Api.challengeVoApi.lastRecallId > 0 ? Api.challengeVoApi.lastRecallId : (this._maxChapter - 1);
        ViewController.getInstance().openView(ViewConst.POPUP.STORYRECALLCHOOOSEPOPUPVIEW, { maxNum: this._maxChapter - 1, f: this.choosePageCallback, o: this, num: curNum });
    };
    StoryrecallView.prototype.choosePageCallback = function (n) {
        var num = Math.ceil(n / this._prePageNum);
        if (this._curPage != num) {
            var offset = num - this._curPage;
            this._curPage = num;
            var pageType = void 0;
            if (offset > 0) {
                pageType = 1;
            }
            else {
                pageType = 2;
                offset = 0 - offset;
            }
            if (offset > 3) {
                offset = 3;
            }
            var effect = new StoryPageEffect();
            LayerManager.maskLayer.addChild(effect);
            effect.init(offset, pageType);
            // this.showMaskAnim(offset,pageType);
            this.resetItemInfo();
        }
    };
    StoryrecallView.prototype.changePageHandle = function (parms) {
        var pageType;
        if (parms == 1) {
            this._curPage--;
            pageType = 2;
        }
        else {
            this._curPage++;
            pageType = 1;
        }
        var effect = new StoryPageEffect();
        LayerManager.maskLayer.addChild(effect);
        effect.init(1, pageType);
        // this.showMaskAnim(1,pageType);
        this.resetItemInfo();
    };
    StoryrecallView.prototype.showMaskAnim = function (page, type) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this);
        var maskPanl = BaseBitmap.create();
        maskPanl.texture = renderTexture;
        this.addChild(maskPanl);
        // maskPanl.mask = new egret.Rectangle(0, 0, 320, GameConfig.stageHeigth);
        var tweenTime;
        if (type == 1) {
            tweenTime = (page == 2 ? 570 : 500);
            egret.Tween.get(maskPanl).wait(tweenTime).call(function () {
                maskPanl.mask = new egret.Rectangle(0, 0, 320, GameConfig.stageHeigth);
            }).wait(140).call(function () {
                maskPanl.mask = new egret.Rectangle(0, 0, 140, GameConfig.stageHeigth);
            }).wait(100)
                .call(function () {
                maskPanl.dispose();
            });
        }
        else {
            tweenTime = (page == 2 ? 470 : 400);
            egret.Tween.get(maskPanl).wait(tweenTime).call(function () {
                maskPanl.mask = new egret.Rectangle(180, 0, 460, GameConfig.stageHeigth);
            }).wait(70).call(function () {
                maskPanl.mask = new egret.Rectangle(320, 0, 320, GameConfig.stageHeigth);
            }).wait(70).call(function () {
                maskPanl.mask = new egret.Rectangle(360, 0, 280, GameConfig.stageHeigth);
            }).wait(100)
                .call(function () {
                maskPanl.dispose();
            });
        }
    };
    StoryrecallView.prototype.dispose = function () {
        this._itemContainer = null;
        this._curPageText = null;
        this._frontPage = null;
        this._nextPage = null;
        this._curPage = 0;
        this._prePageNum = 0;
        this._maxPage = 0;
        this._itemTab.length = 0;
        this._maxChapter = 0;
        this._titleText = null;
        this._descText = null;
        _super.prototype.dispose.call(this);
    };
    return StoryrecallView;
}(CommonView));
__reflect(StoryrecallView.prototype, "StoryrecallView");
//# sourceMappingURL=StoryrecallView.js.map