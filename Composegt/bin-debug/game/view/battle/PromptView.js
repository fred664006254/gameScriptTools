/**
 * 温馨提示，也用于战斗失败
 * author shaoliang
 * date 2017/9/29
 * @class PromptView
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
var PromptView = (function (_super) {
    __extends(PromptView, _super);
    function PromptView() {
        var _this = _super.call(this) || this;
        // 1，战斗失败， 2，没兵了   3，没钱啦 4,擂台失败 5.贸易失败
        _this._type = null;
        _this._callbackF = null;
        _this._obj = null;
        return _this;
    }
    PromptView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._type = this.param.data.type;
            if (this._type == 1 || this._type == 2 || this._type == 4) {
                rewardPic.push("battle_fail_word");
            }
        }
        return rewardPic.concat([
            "promotion_scroll",
            "promotion_scroll_1",
            "dailyboss_shengli_bg",
            "atkrace_xian_1",
            "arena_bottom_bg",
            "battle_fail_word",
        ]);
    };
    PromptView.prototype.getTitleBgName = function () {
        return null;
    };
    PromptView.prototype.getTitleStr = function () {
        return null;
    };
    PromptView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    PromptView.prototype.initView = function () {
    };
    PromptView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.addTouchTap(this.touchTap, this, null);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        if (this._type == 1 && Api.otherInfoVoApi.getFirstchallengefail() != 1 && !Api.rookieVoApi.curGuideKey) {
            Api.rookieVoApi._waitingGuide.length = 0;
            Api.rookieVoApi.curGuideKey = "firstchallengefail";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "firstchallengefail_1" });
            // Api.rookieVoApi.isGuiding = true;
            Api.rookieVoApi.checkWaitingGuide();
            // Api.rookieVoApi.showRookieView();
            this.request(NetRequestConst.REQUEST_OTHERINFO_SETFIRSTCHALLENGEFAIL, {});
        }
        if (this._type == 1 || this._type == 2 || this._type == 4 || this._type == 5) {
            /*
            let winBg:BaseBitmap = BaseBitmap.create("public_rule_bg");
            winBg.setPosition(GameConfig.stageWidth/2  - winBg.width, GameConfig.stageHeigth - 568 - winBg.height/2 );
            this.addChildToContainer(winBg);

            let winBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
            winBg2.scaleX = -1;
            winBg2.setPosition(GameConfig.stageWidth/2  + winBg2.width -1, GameConfig.stageHeigth- 568 - winBg2.height/2);
            this.addChildToContainer(winBg2);
            */
            var scrollContainer = new BaseDisplayObjectContainer();
            var scrollLeft = BaseBitmap.create("promotion_scroll");
            scrollLeft.scaleX = -1;
            scrollLeft.x = scrollLeft.width;
            scrollLeft.y = 0;
            var scrollRight = BaseBitmap.create("promotion_scroll");
            scrollRight.x = GameConfig.stageWidth - scrollRight.width;
            scrollRight.y = 0;
            var scrollBg = BaseBitmap.create("promotion_scroll_1");
            scrollBg.x = GameConfig.stageWidth / 2 - scrollBg.width / 2;
            scrollBg.y = scrollLeft.height / 2 - scrollBg.height / 2;
            scrollContainer.width = GameConfig.stageWidth;
            scrollContainer.height = scrollRight.height;
            scrollContainer.x = 0;
            scrollContainer.y = GameConfig.stageHeigth / 2 - scrollContainer.height / 2 - 50;
            this.addChildToContainer(scrollContainer);
            scrollContainer.addChild(scrollBg);
            scrollContainer.addChild(scrollLeft);
            scrollContainer.addChild(scrollRight);
            var winBg = scrollContainer;
            var awardBg = BaseBitmap.create("dailyboss_shengli_bg");
            awardBg.width = 500;
            awardBg.height = 150;
            awardBg.setPosition(GameConfig.stageWidth / 2 - awardBg.width / 2, GameConfig.stageHeigth / 2 - awardBg.height / 2 + 2 - 80); //winBg.y + winBg.height/2  - awardBg.height/2 + 20);
            this.addChildToContainer(awardBg);
            App.DisplayUtil.changeToGray(scrollLeft);
            App.DisplayUtil.changeToGray(scrollRight);
            App.DisplayUtil.changeToGray(scrollBg);
            var winText = BaseBitmap.create("battle_fail_word");
            winText.setPosition(GameConfig.stageWidth / 2 - winText.width / 2, scrollContainer.y - winText.height / 2 + 25 - 20);
            this.addChildToContainer(winText);
            if (this._type == 4) {
                var battleFail = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                battleFail.setPosition(winBg.width / 2 - battleFail.width / 2 - 20, winBg.y + 115);
                battleFail.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                this.addChildToContainer(battleFail);
                var scroe = "-1";
                if (Api.switchVoApi.checkOpenAtkraceScoreFix()) {
                    scroe = "-0";
                }
                var moraleAdd = ComponentManager.getTextField(scroe, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED);
                moraleAdd.setPosition(battleFail.x + battleFail.width + 10, battleFail.y);
                this.addChildToContainer(moraleAdd);
            }
            else {
                var battleFail = ComponentManager.getTextField(LanguageManager.getlocal("battleFail"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                if (this._type == 5) {
                    battleFail.text = LanguageManager.getlocal("battleFail2");
                }
                battleFail.setPosition(winBg.width / 2 - battleFail.width / 2, winBg.y + 115);
                battleFail.textColor = TextFieldConst.COLOR_WHITE;
                this.addChildToContainer(battleFail);
            }
            var battleFail2 = ComponentManager.getTextField(LanguageManager.getlocal("battleFailTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            battleFail2.setPosition(winBg.width / 2 - battleFail2.width / 2, winBg.y + 170);
            battleFail2.textColor = TextFieldConst.COLOR_WHITE;
            this.addChildToContainer(battleFail2);
            SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);
            this.container.anchorOffsetX = GameConfig.stageWidth / 2;
            this.container.anchorOffsetY = GameConfig.stageHeigth / 2;
            this.container.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
            this.container.scaleX = 0.1;
            this.container.scaleY = 1;
            egret.Tween.get(this.container).to({ scaleX: 1, scaleY: 1 }, 120); //.to({scaleX:1.1,scaleY:1.1},100) 
        }
        if (this._type != 4) {
            var tipBB = BaseBitmap.create("arena_bottom_bg"); //public_tipbg  public_9_wordbg.png 
            // tipBB.height = 264;
            tipBB.setPosition(GameConfig.stageWidth / 2 - tipBB.width / 2, GameConfig.stageHeigth - tipBB.height + 7);
            this.addChild(tipBB);
            var promptTip = ComponentManager.getTextField(LanguageManager.getlocal("promptTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            promptTip.setPosition(GameConfig.stageWidth / 2 - promptTip.width / 2, tipBB.y + 22);
            promptTip.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
            this.addChild(promptTip);
            var line = BaseBitmap.create("atkrace_xian_1");
            line.x = GameConfig.stageWidth / 2 - line.width / 2;
            line.y = tipBB.y + 62;
            this.addChild(line);
            var indext = 2;
            if (MainUI.getInstance().getUnlockIndex() >= 10) {
                indext = 3;
            }
            for (var i = 1; i <= indext; i++) {
                var preKey = "promptTip";
                if (this._type == 5) {
                    preKey = "tradepromptTip";
                }
                var promptContent = ComponentManager.getTextField(LanguageManager.getlocal(preKey + i), TextFieldConst.FONTSIZE_CONTENT_COMMON);
                promptContent.setPosition(48, tipBB.y + 100 + 70 * (i - 1) - promptContent.height / 2);
                this.addChild(promptContent);
                var sureBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.sureBtnClick, this, [i]);
                sureBtn.setPosition(463, tipBB.y + 100 + 70 * (i - 1) - sureBtn.height / 2);
                // sureBtn.setColor(TextFieldConst.COLOR_BLACK);
                this.addChild(sureBtn);
                var line_1 = BaseBitmap.create("atkrace_xian_1");
                line_1.x = GameConfig.stageWidth / 2 - line_1.width / 2;
                line_1.y = tipBB.y + 62 + i * 70;
                this.addChild(line_1);
            }
        }
    };
    PromptView.prototype.sureBtnClick = function (idx) {
        var type = idx;
        ViewController.getInstance().hideAllView();
        if (type == 2) {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
        }
        else if (type == 1) {
            // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
        }
        else if (type == 3) {
            ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
        }
        //手动调用士兵限时礼包强弹
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY2);
    };
    PromptView.prototype.touchTap = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        //手动调用士兵限时礼包强弹
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY2);
        this.hide();
    };
    PromptView.prototype.dispose = function () {
        this._type = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return PromptView;
}(BaseView));
__reflect(PromptView.prototype, "PromptView");
