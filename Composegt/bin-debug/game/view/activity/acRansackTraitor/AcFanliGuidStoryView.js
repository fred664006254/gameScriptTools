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
var AcFanliGuidStoryView = (function (_super) {
    __extends(AcFanliGuidStoryView, _super);
    function AcFanliGuidStoryView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._curIdx = 0;
        _this._config = null;
        _this._showManTab = [];
        _this._isFind = false;
        _this._acvo = undefined;
        _this._txtKeyList = [];
        return _this;
    }
    AcFanliGuidStoryView.prototype.getResourceList = function () {
        return ["prisonview_1", "skip_btn1",
        ];
    };
    AcFanliGuidStoryView.prototype.initView = function () {
        this._isFind = this.param.data.idFind;
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        this._acvo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var cfg = this._acvo.config;
        var skinId = cfg.getRewardSkinId();
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        this._searchSerId = skincfg.id;
        this._traitorId = cfg.TraitorId;
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
        // let singlenum = this.acVo["singlenum"];
        // if(  %6 == 0 && this.acVo.singlenum > 0){
        var isfll = this._acvo.isFineAll();
        if (isfll) {
            this._txtKeyList.push("acRansackTraitor_story20_1" + "code" + this.param.data.code);
            this._txtKeyList.push("acRansackTraitor_story20_2" + "code" + this.param.data.code);
        }
        else {
            if (this._isFind) {
                AcFanliGuidStoryView._storyRandIdx2 = AcFanliGuidStoryView._storyRandIdx2 % 3 + 1;
                var idx = Math.ceil(this._acvo.chipnum / 6);
                this._txtKeyList.push("acRansackTraitor_story" + idx + "_1" + "code" + this.param.data.code);
                this._txtKeyList.push("acRansackTraitor_story" + idx + "_2" + "code" + this.param.data.code);
                AcFanliGuidStoryView._storyRandIdx2++;
            }
            else {
                AcFanliGuidStoryView._storyRandIdx = AcFanliGuidStoryView._storyRandIdx % 2 + 10;
                this._txtKeyList.push("acRansackTraitor_story" + AcFanliGuidStoryView._storyRandIdx + "_1" + "code" + this.param.data.code);
                this._txtKeyList.push("acRansackTraitor_story" + AcFanliGuidStoryView._storyRandIdx + "_2" + "code" + this.param.data.code);
                AcFanliGuidStoryView._storyRandIdx++;
            }
        }
        this.clickPage();
    };
    AcFanliGuidStoryView.prototype.textAnim = function (t) {
        egret.Tween.removeTweens(t);
        var oldx = t.x;
        var oldy = t.y;
        var newx = t.x - t.width * 0.1;
        var newy = t.y - t.height * 0.1;
        egret.Tween.get(t).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).to({ scaleX: 1.2, scaleY: 1.2, x: newx, y: newy }, 600).to({ scaleX: 1, scaleY: 1, x: oldx, y: oldy }, 600).call(this.textAnim, this, [t]);
    };
    AcFanliGuidStoryView.prototype.clickPage = function () {
        if (this._curIdx >= this._txtKeyList.length) {
            this.hide();
            return;
        }
        var isfll = this._acvo.isFineAll();
        {
            this._descText.text = LanguageManager.getlocal(this._txtKeyList[this._curIdx]);
            for (var k in this._showManTab) {
                this.removeChild(this._showManTab[k]);
            }
            this._showManTab.length = 0;
            this._titleBg.visible = true;
            var isShowMe = false;
            if ((!isfll && this._curIdx == 1) || (this._curIdx == 0 && isfll)) {
                isShowMe = true;
            }
            if (isShowMe) {
                var userContainer = Api.playerVoApi.getMyPortrait();
                if (userContainer.width > 700) {
                    userContainer.x = GameConfig.stageWidth / 2 - 180;
                }
                else {
                    userContainer.x = GameConfig.stageWidth / 2 - userContainer.width / 2;
                }
                userContainer.y = GameConfig.stageHeigth - userContainer.height - 10 + 50 + 140;
                this.addChildAt(userContainer, 3);
                this._showManTab.push(userContainer);
                var maskRect = new egret.Rectangle();
                maskRect.setTo(0, 0, userContainer.width, 430);
                userContainer.mask = maskRect;
                this._titleText.text = LanguageManager.getlocal("storyNPCName1");
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2 - 20;
                this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
            }
            else {
                this._titleText.text = LanguageManager.getlocal("servant_name" + this._traitorId);
                this._titleText.x = this._titleBg.x + this._titleBg.width / 2 - this._titleText.width / 2 - 20;
                this._titleText.y = this._titleBg.y + this._titleBg.height / 2 - this._titleText.height / 2;
                var npcMan = BaseLoadBitmap.create("skin_full_" + this._searchSerId);
                npcMan.width = 640;
                npcMan.height = 482;
                npcMan.setScale(0.8);
                var offsetY = 0;
                npcMan.setPosition(GameConfig.stageWidth / 2 - npcMan.width / 2 * npcMan.scaleX, GameConfig.stageHeigth - npcMan.height * npcMan.scaleY - 272 - offsetY + 50 + 80);
                this.addChildAt(npcMan, 3);
                this._showManTab.push(npcMan);
                // }else{
                //     this._titleText.text = "";
                // 	this._titleBg.visible = false;
            }
            this._curIdx++;
        }
    };
    AcFanliGuidStoryView.prototype.callback = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        this.hide();
    };
    AcFanliGuidStoryView.prototype.getBgName = function () {
        return null;
    };
    AcFanliGuidStoryView.prototype.getTitleStr = function () {
        return null;
    };
    AcFanliGuidStoryView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcFanliGuidStoryView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcFanliGuidStoryView.prototype.getTitleBgName = function () {
        return null;
    };
    AcFanliGuidStoryView.prototype.dispose = function () {
        if (this._continueText) {
            egret.Tween.removeTweens(this._continueText);
        }
        this._continueText = null;
        this._callbackF = null;
        this._obj = null;
        this._curIdx = 0;
        this._config = null;
        this._showManTab.length = 0;
        this._isFind = false;
        this._searchSerId = null;
        this._acvo = null;
        this._txtKeyList = [];
        _super.prototype.dispose.call(this);
    };
    AcFanliGuidStoryView._storyRandIdx = 0;
    AcFanliGuidStoryView._storyRandIdx2 = 0;
    return AcFanliGuidStoryView;
}(BaseView));
__reflect(AcFanliGuidStoryView.prototype, "AcFanliGuidStoryView");
