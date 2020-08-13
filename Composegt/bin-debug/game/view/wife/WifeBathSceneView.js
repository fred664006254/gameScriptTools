/**
 * 场景宠幸动画界面
 * author dukunayng
 * date 2017/10/10
 * @class WifeLoveAniView
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
var WifeBathSceneView = (function (_super) {
    __extends(WifeBathSceneView, _super);
    function WifeBathSceneView() {
        var _this = _super.call(this) || this;
        // id 红颜ID
        _this._wifeId = null;
        _this._sceneId = null;
        _this._chuanglian = null;
        return _this;
    }
    WifeBathSceneView.prototype.getResourceList = function () {
        var rewardPic = _super.prototype.getResourceList.call(this);
        if (this.param.data) {
            this._wifeId = this.param.data.id;
            this._sceneId = this.param.data.sceneId;
        }
        return rewardPic.concat(["taoxin", "taoxin_json", "taoxinani",
            "wifebathscene_lovewordsbg",
            "wifescene_bg_" + this._sceneId
        ]);
    };
    WifeBathSceneView.prototype.getTitleBgName = function () {
        return null;
    };
    WifeBathSceneView.prototype.getTitleStr = function () {
        return null;
    };
    WifeBathSceneView.prototype.getBgName = function () {
        //根据sceneid 重新设置背景
        if (RES.hasRes("wife_scenefull_" + this._sceneId + "_ske") && App.DeviceUtil.CheckWebglRenderMode() && !Api.switchVoApi.checkCloseBone()) {
            return null;
        }
        else {
            return "wifescene_bg_" + this._sceneId;
        }
    };
    WifeBathSceneView.prototype.isShowOpenAni = function () {
        return false;
    };
    // 初始化背景
    WifeBathSceneView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (bgName == "commonview_bg1" && (this.viewBg instanceof BaseBitmap)) {
                this.viewBg.fillMode = egret.BitmapFillMode.REPEAT;
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.height = 1136;
            this.viewBg.y = GameConfig.stageHeigth / 2 - 1136 / 2;
        }
    };
    WifeBathSceneView.prototype.initView = function () {
        // let id = this._wifeId;
        var _this = this;
        this._wifeMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._wifeMaskBmp.width = GameConfig.stageWidth;
        this._wifeMaskBmp.height = GameConfig.stageHeigth;
        this._wifeMaskBmp.touchEnabled = true;
        this._wifeMaskBmp.alpha = 0;
        this.addChild(this._wifeMaskBmp);
        this._wifeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._wifeContainer);
        if (RES.hasRes("chuanglian_ske") && App.DeviceUtil.CheckWebglRenderMode() && !Api.switchVoApi.checkCloseBone()) {
            egret.Tween.get(this)
                .wait(500)
                .call(function () {
                _this.showWifeAni();
            });
            this._chuanglian = App.DragonBonesUtil.getLoadDragonBones("chuanglian", 1);
            this._chuanglian.stop();
            this._chuanglian.x = 320;
            this._chuanglian.y = GameConfig.stageHeigth / 2;
            this.addChild(this._chuanglian);
            egret.Tween.get(this._chuanglian)
                .wait(1000)
                .call(function () {
                _this._chuanglian.playDragonMovie("idle", 1);
            });
        }
        else {
            this.showWifeAni();
        }
    };
    WifeBathSceneView.prototype.showWifeAni = function () {
        if (this._container) {
            this.removeChild(this._container);
        }
        if (RES.hasRes("wife_scenefull_" + this._sceneId + "_ske") && App.DeviceUtil.CheckWebglRenderMode() && !Api.switchVoApi.checkCloseBone()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("wife_scenefull_" + this._sceneId);
            // droWifeIcon.setScale(1.3)
            droWifeIcon.x = 310;
            droWifeIcon.y = GameConfig.stageHeigth + (1136 - GameConfig.stageHeigth) / 2;
            // this.addChildToContainer(droWifeIcon);
            this._wifeContainer.addChild(droWifeIcon);
            // this._wifePic.visible = false;
        }
        else {
            // let droWifeIcon = BaseLoadBitmap.create("wife_scenefull_"+this._sceneId);
            // droWifeIcon.width = 640;
            // droWifeIcon.height = 840;
            // droWifeIcon.x = 0;
            // droWifeIcon.y = GameConfig.stageHeigth /2  - droWifeIcon.height/2 + 70;
            // this._wifeContainer.addChild(droWifeIcon);
        }
        egret.Tween.get(this._wifeContainer).to({ alpha: 1 }, 1000).wait(700).call(this.changePic, this);
        egret.Tween.get(this._wifeContainer).wait(1200).call(this.changePic2, this);
        // egret.Tween.get( this._wifeMaskBmp ).to( { alpha:0.8 }, 1000 );
        //红颜说的话背景
        var wordsBg = BaseBitmap.create("wifebathscene_lovewordsbg");
        // wordsBg.width = 430;
        // wordsBg.height = 90;
        wordsBg.x = 140;
        wordsBg.y = 0;
        this._wifeContainer.addChild(wordsBg);
        //红颜说的话
        var words = LanguageManager.getlocal("wifeSceneWords_" + this._sceneId + "_1");
        var wifeWordsText = ComponentManager.getTextField(words, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        wifeWordsText.setColor(TextFieldConst.COLOR_BROWN);
        wifeWordsText.width = 300;
        wifeWordsText.x = wordsBg.x + wordsBg.width / 2 - wifeWordsText.width / 2;
        wifeWordsText.y = wordsBg.y + 49 - wifeWordsText.height / 2;
        this._wifeContainer.addChild(wifeWordsText);
        if (this._sceneId == "20801") {
            wordsBg.visible = false;
            wifeWordsText.visible = false;
        }
    };
    WifeBathSceneView.prototype.changePic2 = function () {
        var upgradeClip = ComponentManager.getCustomMovieClip("taoxinani_", 14, 100);
        upgradeClip.setScale(2);
        upgradeClip.x = 0;
        upgradeClip.y = 320;
        this.addChild(upgradeClip);
        upgradeClip.playWithTime(1);
        upgradeClip.setEndCallBack(function () {
            upgradeClip.visible = false;
        }, this);
    };
    WifeBathSceneView.prototype.playWifeSound = function () {
        var soundName = "effect_wife_" + this._sceneId;
        SoundManager.playEffect(soundName);
    };
    WifeBathSceneView.prototype.changePic = function () {
        var _this = this;
        SoundManager.pauseBg();
        if (!Api.wifeVoApi.getWifeIsBlue(this._wifeId)) {
            SoundManager.playEffect(SoundConst.EFFECT_WIFE_LOVE);
        }
        this.playWifeSound();
        if (this.param.data.rewards) {
            var rewards = GameData.formatRewardItem(this.param.data.rewards);
            if (rewards && rewards.length > 0) {
                App.CommonUtil.playRewardFlyAction(rewards);
            }
        }
        //脱衣后桃心
        var taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
        taoxinFullParticle.x = 0;
        taoxinFullParticle.y = GameConfig.stageHeigth - 560;
        // taoxinFullParticle.y = GameConfig.stageHeigth - 860;
        taoxinFullParticle.start();
        taoxinFullParticle.scaleX = 2;
        taoxinFullParticle.scaleY = 2;
        this.addChild(taoxinFullParticle);
        var timeNum = 0;
        egret.Tween.get(this._wifeContainer).wait(timeNum).call(function () {
            _this.addTouchTap(_this.touchTap, _this, null);
        });
    };
    WifeBathSceneView.prototype.touchTap = function () {
        this.hide();
        SoundManager.resumeBg();
        if (this.param.data.childData && !Api.rookieVoApi.isInGuiding) {
            ViewController.getInstance().openView(ViewConst.BASE.WIFEGETCHILDVIEW, this.param.data.childData);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFE_LOVECOM);
        // if(Api.rookieVoApi.isInGuiding){
        // 	Api.rookieVoApi.checkWaitingGuide();
        // }
    };
    WifeBathSceneView.prototype.dispose = function () {
        this._wifeId = null;
        this._container = null;
        this._wifeContainer = null;
        this._taoxinParticle = null;
        this._wifeMaskBmp = null;
        this._sceneId = null;
        _super.prototype.dispose.call(this);
    };
    return WifeBathSceneView;
}(BaseView));
__reflect(WifeBathSceneView.prototype, "WifeBathSceneView");
