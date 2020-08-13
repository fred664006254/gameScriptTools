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
 * 特殊奖励--获得子嗣
 * @author 张朝阳
 * date 2019/3/27
 * @class SpecialChildGetView
 */
var SpecialChildGetView = (function (_super) {
    __extends(SpecialChildGetView, _super);
    function SpecialChildGetView() {
        var _this = _super.call(this) || this;
        _this._buttombg = null;
        _this._titleTF = null;
        _this._titleTFLine = null;
        _this._childId = null;
        _this._buttomContainer = null;
        _this._topContainer = null;
        /**淡光 */
        _this._shimmer = null;
        /**光刺1 */
        _this._thorn1 = null;
        /**光刺2 */
        _this._thorn2 = null;
        _this._childPic = null;
        return _this;
    }
    /**创建view */
    SpecialChildGetView.prototype.createView = function (id) {
        var _this = this;
        var childrenInfoVo = Api.childVoApi.getChildrenInfoVoById(String(id));
        //分阶段引导
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            Api.rookieVoApi.curGuideKey = "child";
            Api.rookieVoApi.insertWaitingGuide({ "idx": "child_1" }, true);
            //功能解锁
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_FUNCTION_TXT);
        }
        if (Api.childVoApi.getCnum() == 3) {
            PlatformManager.analyticsByHyKey("achieved_3kids");
        }
        else if (Api.childVoApi.getCnum() == 10) {
            PlatformManager.analyticsByHyKey("achieved_10kids");
        }
        this._shimmer = BaseLoadBitmap.create("specialview_effect_yellow");
        this._shimmer.width = 320;
        this._shimmer.height = 413;
        this._shimmer.anchorOffsetX = this._shimmer.width / 2;
        this._shimmer.anchorOffsetY = this._shimmer.height / 2;
        this._shimmer.setScale(2);
        this._shimmer.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth - 492);
        this._container.addChild(this._shimmer);
        this._shimmer.alpha = 0;
        this._thorn1 = BaseLoadBitmap.create("specialview_effect_yellowthorn");
        this._thorn1.width = 320;
        this._thorn1.height = 413;
        this._thorn1.anchorOffsetX = this._thorn1.width / 2;
        this._thorn1.anchorOffsetY = this._thorn1.height / 2;
        this._thorn1.setScale(1.25);
        this._thorn1.alpha = 1;
        this._thorn1.rotation = 0;
        this._thorn1.blendMode = egret.BlendMode.ADD;
        this._thorn1.setPosition(this._shimmer.x, this._shimmer.y);
        this._container.addChild(this._thorn1);
        egret.Tween.get(this._thorn1, { loop: true }).call(function () {
            _this._thorn1.rotation = 0;
        }, this).to({ alpha: 0.2, rotation: 180 }, 10000).to({ alpha: 1, rotation: 360 }, 10000);
        this._thorn1.setVisible(false);
        this._thorn2 = BaseLoadBitmap.create("specialview_effect_yellowthorn");
        this._thorn2.width = 320;
        this._thorn2.height = 413;
        this._thorn2.anchorOffsetX = this._thorn2.width / 2;
        this._thorn2.anchorOffsetY = this._thorn2.height / 2;
        this._thorn2.setScale(1.25);
        this._thorn2.alpha = 0.2;
        this._thorn2.rotation = 180;
        this._thorn2.blendMode = egret.BlendMode.ADD;
        this._thorn2.setPosition(this._shimmer.x, this._shimmer.y);
        this._container.addChild(this._thorn2);
        egret.Tween.get(this._thorn2, { loop: true }).call(function () {
            _this._thorn2.rotation = 180;
        }, this).to({ alpha: 1, rotation: 0 }, 10000).to({ alpha: 0.2, rotation: -180 }, 10000);
        this._thorn2.setVisible(false);
        this._childPic = BaseBitmap.create("childview_baby");
        this._childPic.setPosition(GameConfig.stageWidth / 2 - this._childPic.width / 2, GameConfig.stageHeigth - 670);
        this._container.addChild(this._childPic);
        this._buttomContainer = new BaseDisplayObjectContainer();
        this._buttomContainer.width = 640;
        this._buttomContainer.anchorOffsetX = this._buttomContainer.width / 2;
        this._buttomContainer.x = 320;
        this._container.addChild(this._buttomContainer);
        this._buttombg = BaseLoadBitmap.create("specialview_buttombg1");
        this._buttombg.width = 640;
        this._buttombg.height = 230;
        this._buttombg.setPosition(0, GameConfig.stageHeigth - 310);
        this._buttomContainer.addChild(this._buttombg);
        if (Api.switchVoApi.checkCloseText2()) {
            this._topContainer = new BaseDisplayObjectContainer();
            this._topContainer.width = 640;
            this._topContainer.anchorOffsetX = this._buttomContainer.width / 2;
            this._topContainer.x = 320;
            this._container.addChild(this._topContainer);
            var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(childrenInfoVo.motherId);
            var sexstr = childrenInfoVo.sex == 1 ? LanguageManager.getlocal("childBoyName") : LanguageManager.getlocal("childGirlName");
            var txtbg = BaseLoadBitmap.create("childview_getchildtextbg");
            txtbg.width = 567;
            txtbg.height = 127;
            txtbg.setPosition(GameConfig.stageWidth / 2 - txtbg.width / 2, this._childPic.y - txtbg.height - 10);
            this._topContainer.addChild(txtbg);
            var descType = String(Math.floor((Math.random() * 10)) + 1);
            var txtTF = ComponentManager.getTextField(LanguageManager.getlocal("getcChildDes" + descType, [wifeInfoVo.name, sexstr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            txtTF.width = 480;
            txtTF.setPosition(txtbg.x + txtbg.width / 2 - txtTF.width / 2, txtbg.y + txtbg.height / 2 - txtTF.height / 2);
            this._topContainer.addChild(txtTF);
        }
        var lookTip = ComponentManager.getTextField(LanguageManager.getlocal("wifeLookChild"), TextFieldConst.FONTSIZE_TITLE_SMALL);
        lookTip.setPosition(GameConfig.stageWidth / 2 - lookTip.width / 2, this._buttombg.y + 70);
        this._buttomContainer.addChild(lookTip);
        var sureBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "wifeLookChildYes", this.sureBtnClick, this);
        sureBtn.setPosition(lookTip.x + lookTip.width / 2 + 40, lookTip.y + lookTip.height + 30);
        this._buttomContainer.addChild(sureBtn);
        var noBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "wifeLookChildNo", this.noBtnClick, this);
        noBtn.setColor(TextFieldConst.COLOR_BLACK);
        noBtn.setPosition(lookTip.x + lookTip.width / 2 - noBtn.width - 40, sureBtn.y);
        this._buttomContainer.addChild(noBtn);
        this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("child_quality") + LanguageManager.getlocal("child_quality" + childrenInfoVo.quality), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._titleTF.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTF.width / 2, this._buttombg.y + 35 - this._titleTF.height / 2);
        this._buttomContainer.addChild(this._titleTF);
        this._titleTFLine = BaseBitmap.create("public_line3");
        this._titleTFLine.width = 281 + this._titleTF.width;
        this._titleTFLine.setPosition(this._buttombg.x + this._buttombg.width / 2 - this._titleTFLine.width / 2, this._titleTF.y + this._titleTF.height / 2 - this._titleTFLine.height / 2);
        this._buttomContainer.addChild(this._titleTFLine);
        //如果不是第一个孩子  第一个孩子会强弹分享(此处会判断平台和开关和第一个孩子的条件)
        if (!Api.shareVoApi.checkCanShowShare(ShareVoApi.TYPE_CHILD, null)) {
            // 分享按钮
            App.ShareGuideUtil.addShareNode(this.container, App.ShareGuideUtil.TYPE_CHILDGET);
        }
        this.playAni();
    };
    SpecialChildGetView.prototype.playAni = function () {
        var _this = this;
        _super.prototype.playAni.call(this);
        this._shimmer.alpha = 0;
        this._thorn1.setVisible(false);
        this._thorn2.setVisible(false);
        this._buttomContainer.scaleX = 0;
        egret.Tween.get(this._buttomContainer).to({ scaleX: 1 }, 350).call(function () {
            egret.Tween.removeTweens(_this._buttomContainer);
        }, this);
        egret.Tween.get(this._shimmer).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.removeTweens(_this._shimmer);
            _this._thorn1.setVisible(true);
            _this._thorn2.setVisible(true);
        }, this);
        if (this._topContainer) {
            this._topContainer.scaleX = 0;
            egret.Tween.get(this._topContainer).to({ scaleX: 1 }, 350).call(function () {
                egret.Tween.removeTweens(_this._topContainer);
            }, this);
        }
        this._childPic.alpha = 0;
        egret.Tween.get(this._childPic).wait(500).to({ alpha: 1 }, 100).call(function () {
            egret.Tween.removeTweens(_this._childPic);
        }, this);
    };
    SpecialChildGetView.prototype.sureBtnClick = function () {
        //添加强制分享逻辑
        Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD, null, this.sureBtnClickEvent, this);
    };
    SpecialChildGetView.prototype.sureBtnClickEvent = function () {
        //分阶段引导
        if (Api.childVoApi.getChildNum() == 1 && Api.adultVoApi.getAdultNum() == 0 && Api.adultVoApi.getAdultMarryNum() == 0) {
            this.hide();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHILD_GUIDE);
            return;
        }
        ViewController.getInstance().hideAllView();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
        this._childId = this.param.data;
        ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, { childId: this._childId });
    };
    SpecialChildGetView.prototype.noBtnClick = function () {
        //添加强制分享逻辑
        Api.shareVoApi.showShare(ShareVoApi.TYPE_CHILD, null, this.noBtnClickEvent, this);
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    SpecialChildGetView.prototype.noBtnClickEvent = function () {
        this.hide();
    };
    SpecialChildGetView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "childview_baby", "shareBtn",
        ]);
    };
    SpecialChildGetView.prototype.dispose = function () {
        egret.Tween.removeTweens(this._childPic);
        egret.Tween.removeTweens(this._shimmer);
        egret.Tween.removeTweens(this._thorn1);
        egret.Tween.removeTweens(this._thorn2);
        if (this._topContainer) {
            egret.Tween.removeTweens(this._topContainer);
        }
        egret.Tween.removeTweens(this._buttomContainer);
        this._buttomContainer = null;
        this._topContainer = null;
        this._childPic = null;
        this._buttombg = null;
        this._titleTF = null;
        this._titleTFLine = null;
        this._childId = null;
        _super.prototype.dispose.call(this);
    };
    return SpecialChildGetView;
}(SpecialBaseView));
__reflect(SpecialChildGetView.prototype, "SpecialChildGetView");
//# sourceMappingURL=SpecialChildGetView.js.map