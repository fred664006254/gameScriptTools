/**
 * yanyuling
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
var AcFanliGuidStory = (function (_super) {
    __extends(AcFanliGuidStory, _super);
    function AcFanliGuidStory() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._curIdx = 0;
        _this._config = null;
        _this._showManTab = [];
        return _this;
    }
    AcFanliGuidStory.prototype.getResourceList = function () {
        return ["prisonview_1", "skip_btn1",
        ];
    };
    AcFanliGuidStory.prototype.initView = function () {
        //public_bottombg1
        var maskBmp = BaseBitmap.create("public_9_black");
        maskBmp.alpha = 0.75;
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = GameConfig.stageHeigth;
        this.addChild(maskBmp);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        maskBmp.addTouchTap(this.clickPage, this, null);
        this._tipBB = BaseBitmap.create("public_bottombg1");
        this._tipBB.height = 170;
        this._tipBB.setPosition(GameConfig.stageWidth / 2 - this._tipBB.width / 2, GameConfig.stageHeigth - this._tipBB.height - 0);
        this.addChild(this._tipBB);
        this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        this._continueText.setPosition(this._tipBB.x + this._tipBB.width - this._continueText.width - 50, this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
        this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN2;
        this.addChild(this._continueText);
        this.textAnim(this._continueText);
        this._titleBg = BaseBitmap.create("prisonview_1");
        this._titleBg.setPosition(0, this._tipBB.y - 60);
        this.addChild(this._titleBg);
        this._titleBg.visible = false;
        this._titleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL);
        this._titleText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2 - 20;
        this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
        this.addChild(this._titleText);
        this._descText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._descText.width = GameConfig.stageWidth - 60;
        this._descText.lineSpacing = 8;
        this._descText.setPosition(30, this._tipBB.y + 38);
        this.addChild(this._descText);
        var _skipBtnBg = BaseBitmap.create("public_9_wordbg");
        _skipBtnBg.skewX = 180;
        _skipBtnBg.height = 66;
        _skipBtnBg.setPosition(GameConfig.stageWidth / 2 - _skipBtnBg.width / 2, 66);
        this.addChild(_skipBtnBg);
        var _skipBtn = ComponentManager.getButton("skip_btn1", null, this.hide, this);
        _skipBtn.setPosition(PlatformManager.hasSpcialCloseBtn() ? 10 : (GameConfig.stageWidth - _skipBtn.width - 10), 10);
        this.addChild(_skipBtn);
        this.clickPage();
    };
    AcFanliGuidStory.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    AcFanliGuidStory.prototype.clickPage = function () {
        if (this._curIdx >= 6) {
            this.hide();
            ViewController.getInstance().openView(ViewConst.POPUP.ACFANLIREVIEWRECALLVIEW);
        }
        else {
            // let curKey:string = this._config[this._curIdx];
            // let curCfg:any = Config.ChallengestoryCfg.getChallengestoryCfgById(curKey);
            this._descText.text = LanguageManager.getlocal("rookieStoryDesc" + (5000 + this._curIdx));
            for (var k in this._showManTab) {
                this.removeChild(this._showManTab[k]);
            }
            this._showManTab.length = 0;
            this._titleBg.visible = true;
            if (this._curIdx == 1 || this._curIdx == 4) {
                var userContainer = Api.playerVoApi.getMyPortrait();
                // userContainer.setPosition(0,GameConfig.stageHeigth-userContainer.height-157);
                if (userContainer.width > 700) {
                    userContainer.x = this.width / 2 - 180;
                }
                else {
                    userContainer.x = this.width / 2 - userContainer.width / 2 * userContainer.scaleX;
                }
                userContainer.y = GameConfig.stageHeigth - userContainer.height - 10 + 50 + 100;
                this.addChildAt(userContainer, 3);
                this._showManTab.push(userContainer);
                var maskRect = new egret.Rectangle();
                maskRect.setTo(0, 0, userContainer.width, 450);
                userContainer.mask = maskRect;
                this._titleText.text = LanguageManager.getlocal("storyNPCName1");
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2 - 20;
                this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
            }
            else if (this._curIdx == 2 || this._curIdx == 5) {
                this._titleText.text = LanguageManager.getlocal("servant_name1034");
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2 - 20;
                this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
                var npcMan = BaseLoadBitmap.create("servant_full_1034");
                npcMan.width = 640;
                npcMan.height = 482;
                npcMan.setScale(0.8);
                var offsetY = 0;
                npcMan.setPosition(GameConfig.stageWidth / 2 - npcMan.width / 2 * npcMan.scaleX, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 - offsetY + 50 + 80);
                this.addChildAt(npcMan, 3);
                this._showManTab.push(npcMan);
            }
            else {
                this._titleText.text = "";
                this._titleBg.visible = false;
            }
            this._curIdx++;
        }
    };
    AcFanliGuidStory.prototype.callback = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    AcFanliGuidStory.prototype.getBgName = function () {
        return null;
    };
    AcFanliGuidStory.prototype.getTitleStr = function () {
        return null;
    };
    AcFanliGuidStory.prototype.getButtomLineBg = function () {
        return null;
    };
    AcFanliGuidStory.prototype.getCloseBtnName = function () {
        return null;
    };
    AcFanliGuidStory.prototype.getTitleBgName = function () {
        return null;
    };
    AcFanliGuidStory.prototype.dispose = function () {
        if (this._continueText) {
            egret.Tween.removeTweens(this._continueText);
        }
        this._continueText = null;
        this._callbackF = null;
        this._obj = null;
        this._curIdx = 0;
        this._config = null;
        this._showManTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AcFanliGuidStory;
}(BaseView));
__reflect(AcFanliGuidStory.prototype, "AcFanliGuidStory");
