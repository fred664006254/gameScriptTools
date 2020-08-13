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
 * 皇帝登陆炫耀机制
 * @author 张朝阳
 * data 2018/6/4
 * @class GodLoginFlaunt
 */
var GodLogin = (function (_super) {
    __extends(GodLogin, _super);
    function GodLogin() {
        var _this = _super.call(this) || this;
        _this._config = null;
        _this._tipBg = null;
        _this._tipWord = null;
        _this._godName = null;
        return _this;
    }
    /**
     * 显示皇帝登陆
     */
    GodLogin.prototype.show = function (godName) {
        if (ViewController.getInstance().checkHasShowedView())
            return;
        // this._config = Config.DailyluckCfg.getDailylucyCfgByName(key);
        this._godName = godName;
        ResourceManager.loadResources(["godlogin_tips_bg", "godlogin_tips_effect", "godlogin_tips_world"], [], this.init, null, this);
    };
    /**
     * 入口函数
     */
    GodLogin.prototype.init = function () {
        this._tipBg = BaseBitmap.create("godlogin_tips_bg");
        this._tipBg.anchorOffsetX = this._tipBg.width / 2;
        this._tipBg.anchorOffsetY = this._tipBg.height / 2;
        this._tipBg.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 5);
        this.addChild(this._tipBg);
        this._tipBg.scaleX = 0;
        this._tipBg.scaleY = 0;
        egret.Tween.get(this._tipBg).to({ scaleX: 1.5, scaleY: 1.5 }, 165).to({ scaleX: 0.9, scaleY: 0.9 }, 100).call(this.showWord, this).to({ scaleX: 1, scaleY: 1 }, 66).call(this.showName, this);
    };
    /**
     * 播放 皇上驾到 动画
     */
    GodLogin.prototype.showWord = function () {
        this._tipWord = BaseBitmap.create("godlogin_tips_world");
        this._tipWord.anchorOffsetX = this._tipWord.width / 2;
        this._tipWord.anchorOffsetY = this._tipWord.height / 2;
        this._tipWord.setPosition(this._tipBg.x, this._tipBg.y - this._tipBg.height / 2 + this._tipWord.height / 2 + 3);
        this._tipWord.scaleX = 10;
        this._tipWord.scaleY = 10;
        this.addChild(this._tipWord);
        // let realPos:egret.Point = egret.Point.create(GameConfig.stageWidth/2 - this._tipWord.width,this._tipBg.y + this._tipBg.height/2 - this._tipWord.height/2);
        egret.Tween.get(this._tipWord).wait(66).to({ scaleX: 0.95, scaleY: 0.95 }, 330).call(this.showEffect, this).to({ scaleX: 1.15, scaleY: 1.15 }, 66).to({ scaleX: 1, scaleY: 1 }, 66); //.call(this.showName,this);
    };
    /**
     * 播放文本动画
     */
    GodLogin.prototype.showName = function () {
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("godloginTips", [this._godName]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTF.anchorOffsetX = nameTF.width / 2;
        nameTF.anchorOffsetY = nameTF.height / 2;
        nameTF.alpha = 0;
        nameTF.setPosition(this._tipBg.x, this._tipBg.y + this._tipBg.height / 2 - nameTF.height / 2 - 6);
        this.addChild(nameTF);
        egret.Tween.get(nameTF).wait(66).to({ alpha: 1 }, 660, egret.Ease.quartIn); //.call(this.hide,this);
        // this.hide();
    };
    /**
     * 播放特效
     */
    GodLogin.prototype.showEffect = function () {
        var topEffect = BaseBitmap.create("godlogin_tips_effect");
        this.addChild(topEffect);
        topEffect.anchorOffsetY = topEffect.height / 2;
        topEffect.anchorOffsetX = topEffect.width / 2;
        topEffect.setPosition(-topEffect.width, this._tipBg.y - this._tipBg.height / 2);
        topEffect.alpha = 0;
        egret.Tween.get(topEffect).to({ x: GameConfig.stageWidth + topEffect.width }, 924);
        egret.Tween.get(topEffect).to({ alpha: 1 }, 231, egret.Ease.quartIn).wait(429).to({ alpha: 0 }, 231, egret.Ease.quartIn);
        var bottomEffect = BaseBitmap.create("godlogin_tips_effect");
        this.addChild(bottomEffect);
        bottomEffect.anchorOffsetY = bottomEffect.height / 2;
        bottomEffect.anchorOffsetX = bottomEffect.width / 2;
        bottomEffect.setPosition(GameConfig.stageWidth + bottomEffect.width, this._tipBg.y + this._tipBg.height / 2);
        bottomEffect.alpha = 1;
        egret.Tween.get(bottomEffect).to({ x: -bottomEffect.width }, 924);
        egret.Tween.get(bottomEffect).to({ alpha: 1 }, 231).wait(429).to({ alpha: 0 }, 231).wait(495).call(this.hide, this);
        // egret.Tween.get(bottomEffect).wait(0).to({alpha:0},231,egret.Ease.quadIn);
    };
    /**
     * 移除动画
     */
    GodLogin.prototype.hide = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 495).call(this.remove, this);
    };
    GodLogin.prototype.remove = function () {
        LayerManager.msgLayer.removeChild(this);
    };
    GodLogin.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._config = null;
        this._tipBg = null;
        this._tipWord = null;
        this._godName = null;
        _super.prototype.dispose.call(this);
    };
    return GodLogin;
}(BaseDisplayObjectContainer));
__reflect(GodLogin.prototype, "GodLogin");
//# sourceMappingURL=GodLogin.js.map