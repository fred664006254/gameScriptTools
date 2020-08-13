/**
 * 关卡剧情
 * date 2017/10/14
 * @class ChallengeStory
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
var ChallengeStory = (function (_super) {
    __extends(ChallengeStory, _super);
    function ChallengeStory() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._curIdx = 0;
        _this._config = null;
        _this._showManTab = [];
        return _this;
    }
    ChallengeStory.prototype.isShowOpenAni = function () {
        return false;
    };
    ChallengeStory.prototype.getResourceList = function () {
        this._callbackF = this.param.data.f;
        this._obj = this.param.data.o;
        this._config = this.param.data.dialogue.split("_");
        var tempTab = {};
        var guidePic = _super.prototype.getResourceList.call(this);
        for (var k in this._config) {
            var v = this._config[k];
            var tempCfg = Config.ChallengestoryCfg.getChallengestoryCfgById(v);
            if (tempCfg.icon != "0" && tempCfg.icon != "1") {
                if (!tempTab[tempCfg.icon]) {
                    tempTab[tempCfg.icon] = 1;
                }
            }
        }
        guidePic = Object.keys(tempTab);
        return guidePic.concat([
            "prisonview_1",
            "searchstoryview_bottom"
        ]);
    };
    ChallengeStory.prototype.init = function () {
        //public_bottombg1
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = GameConfig.stageHeigth;
        this.addChild(maskBmp);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        maskBmp.addTouchTap(this.clickPage, this, null);
        this._tipBB = BaseBitmap.create("searchstoryview_bottom");
        this._tipBB.height = 170;
        this._tipBB.setPosition(GameConfig.stageWidth / 2 - this._tipBB.width / 2, GameConfig.stageHeigth - this._tipBB.height - 0);
        this.addChild(this._tipBB);
        this._continueText = ComponentManager.getTextField(LanguageManager.getlocal("clickContinue"), 20);
        this._continueText.setPosition(this._tipBB.x + this._tipBB.width - this._continueText.width - 50, this._tipBB.y + this._tipBB.height - this._continueText.height - 20);
        this._continueText.textColor = TextFieldConst.COLOR_WARN_GREEN;
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
        this._descText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._descText.width = GameConfig.stageWidth - 60;
        this._descText.lineSpacing = 8;
        this._descText.setPosition(30, this._tipBB.y + 48);
        this.addChild(this._descText);
        this.clickPage();
    };
    ChallengeStory.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    ChallengeStory.prototype.clickPage = function () {
        if (this._curIdx >= this._config.length) {
            this.callback();
        }
        else {
            var curKey = this._config[this._curIdx];
            var curCfg = Config.ChallengestoryCfg.getChallengestoryCfgById(curKey);
            this._descText.text = LanguageManager.getlocal("challengeStoryDesc" + curKey);
            for (var k in this._showManTab) {
                this.removeChild(this._showManTab[k]);
            }
            this._showManTab.length = 0;
            if (curCfg.icon == "0") {
            }
            else if (curCfg.icon == "1") {
                var userContainer = Api.playerVoApi.getMyPortrait();
                // userContainer.setPosition(0,GameConfig.stageHeigth-userContainer.height-157);
                if (userContainer.width > 700) {
                    userContainer.x = this.width / 2 - 180;
                }
                else {
                    userContainer.x = this.width / 2 - userContainer.width / 2 * userContainer.scaleX;
                }
                userContainer.y = GameConfig.stageHeigth - userContainer.height - 10 + 50 + 120;
                // userContainer.setPosition(GameConfig.stageWidth/2-userContainer.width/2, GameConfig.stageHeigth - userContainer.height - 10 + 50 +80);
                this.addChildAt(userContainer, 1);
                this._showManTab.push(userContainer);
                var maskRect = new egret.Rectangle();
                maskRect.setTo(0, 0, userContainer.width, 430);
                userContainer.mask = maskRect;
            }
            else {
                var npcMan = BaseBitmap.create(curCfg.icon);
                npcMan.setScale(0.8);
                var offsetY = 0;
                if (curCfg.icon.substring(0, 4) == "wife") {
                    npcMan.setScale(460 / npcMan.height);
                    offsetY = 20;
                }
                npcMan.setPosition(GameConfig.stageWidth / 2 - npcMan.width / 2 * npcMan.scaleX, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 - offsetY + 50 + 80);
                this.addChildAt(npcMan, 1);
                this._showManTab.push(npcMan);
            }
            if (curCfg.name == "0") {
                // this._descText.y = this._tipBB.y+45;
                this._titleText.text = "";
                this._titleBg.visible = false;
            }
            else {
                // this._descText.y = this._tipBB.y+88;
                this._titleText.text = LanguageManager.getlocal(curCfg.name);
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2 - 20;
                this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
                this._titleBg.visible = true;
            }
            this._curIdx++;
        }
    };
    ChallengeStory.prototype.callback = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    ChallengeStory.prototype.initView = function () {
    };
    ChallengeStory.prototype.dispose = function () {
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
    return ChallengeStory;
}(BaseView));
__reflect(ChallengeStory.prototype, "ChallengeStory");
