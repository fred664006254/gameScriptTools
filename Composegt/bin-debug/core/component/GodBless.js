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
var GodBless = (function (_super) {
    __extends(GodBless, _super);
    function GodBless() {
        var _this = _super.call(this) || this;
        _this._config = null;
        _this._tipBg = null;
        _this._tipWord = null;
        return _this;
    }
    GodBless.prototype.show = function (key) {
        this._config = Config.DailyluckCfg.getDailylucyCfgByName(key);
        ResourceManager.loadResources(["godbless_tip_bg", "godbless_tip_bg2", "godbless_tip_word", "godbless_" + this._config.name], [], this.init, null, this);
    };
    GodBless.prototype.init = function () {
        this._tipBg = BaseBitmap.create("godbless_tip_bg");
        this._tipBg.anchorOffsetX = this._tipBg.width;
        this._tipBg.setPosition(GameConfig.stageWidth / 2, 50);
        var tipBg2 = BaseBitmap.create("godbless_tip_bg");
        tipBg2.anchorOffsetX = tipBg2.width;
        tipBg2.setPosition(GameConfig.stageWidth / 2, 50);
        this.addChild(this._tipBg);
        this.addChild(tipBg2);
        this._tipBg.scaleX = 0;
        tipBg2.scaleX = 0;
        egret.Tween.get(this._tipBg).to({ scaleX: 1 }, 300).wait(100).call(this.showWord, this);
        egret.Tween.get(tipBg2).to({ scaleX: -1 }, 300);
    };
    GodBless.prototype.showWord = function () {
        this._tipWord = BaseBitmap.create("godbless_tip_word");
        this._tipWord.setPosition(GameConfig.stageWidth / 2 - this._tipWord.width * 1.5, this._tipBg.y + this._tipBg.height / 2 - this._tipWord.height);
        this._tipWord.scaleX = 2;
        this._tipWord.scaleY = 2;
        this.addChild(this._tipWord);
        var realPos = egret.Point.create(GameConfig.stageWidth / 2 - this._tipWord.width, this._tipBg.y + this._tipBg.height / 2 - this._tipWord.height / 2);
        egret.Tween.get(this._tipWord).to({ scaleX: 1, scaleY: 1, x: realPos.x, y: realPos.y }, 500).call(this.showName, this);
    };
    GodBless.prototype.showName = function () {
        var name = BaseBitmap.create("godbless_" + this._config.name);
        name.setPosition(GameConfig.stageWidth, this._tipBg.y + this._tipBg.height / 2 - name.height / 2);
        this.addChild(name);
        egret.Tween.get(name).to({ x: GameConfig.stageWidth / 2 }, 500).call(this.showDesc, this).wait(1000).call(this.hide, this);
    };
    GodBless.prototype.showDesc = function () {
        var descContainer = new BaseDisplayObjectContainer();
        descContainer.y = this._tipBg.y + 140;
        this.addChild(descContainer);
        var descBg = BaseBitmap.create("godbless_tip_bg2");
        descBg.setPosition(GameConfig.stageWidth / 2 - descBg.width, 0);
        descContainer.addChild(descBg);
        var descBg2 = BaseBitmap.create("godbless_tip_bg2");
        descBg2.scaleX = -1;
        descBg2.setPosition(GameConfig.stageWidth / 2 + descBg2.width, descBg.y);
        descContainer.addChild(descBg2);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("godbless_desc_" + this._config.name, [this._config.times.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descText.setPosition(GameConfig.stageWidth / 2 - descText.width / 2, descBg.y + descBg.height / 2 - descText.height / 2);
        descContainer.addChild(descText);
        egret.Tween.get(descContainer).to({ y: descContainer.y - 50 }, 500);
    };
    GodBless.prototype.hide = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 300).call(this.remove, this);
    };
    GodBless.prototype.remove = function () {
        LayerManager.msgLayer.removeChild(this);
    };
    GodBless.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._config = null;
        this._tipBg = null;
        this._tipWord = null;
        _super.prototype.dispose.call(this);
    };
    return GodBless;
}(BaseDisplayObjectContainer));
__reflect(GodBless.prototype, "GodBless");
