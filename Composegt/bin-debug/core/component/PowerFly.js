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
 * 战斗力飘动动画
 * author dky
 * date 2017/12/14
 * @class PowerFly
 */
var PowerFly = (function (_super) {
    __extends(PowerFly, _super);
    function PowerFly() {
        var _this = _super.call(this) || this;
        _this._temScale = 0.6;
        return _this;
    }
    PowerFly.prototype.init = function (power) {
        SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        var temX = 0;
        var temY = 0;
        var iconBt = null;
        var bgPic = "public_9_powertipbg";
        var numBg = BaseBitmap.create(bgPic);
        // numBg.width = 300;
        // numBg.setScale(this._temScale);
        container.addChild(numBg);
        var message = LanguageManager.getlocal("powerAdd") + power;
        var msgTF = ComponentManager.getBitmapText(message, "crit_fnt");
        container.addChild(msgTF);
        numBg.width = msgTF.width + 90;
        msgTF.x = 45;
        msgTF.y = numBg.height / 2 - msgTF.height / 2;
        // container.x = -container.width/2;
        container.anchorOffsetX = container.width / 2;
        container.anchorOffsetY = container.height / 2;
        this.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
        container.setScale(0.1);
        this._tw = egret.Tween.get(container);
        this._tw.to({ scaleX: 1.2, scaleY: 1.2 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 50)
            .to({ y: -80, alpha: 0.5 }, 1500)
            .call(this.onComplete, this);
    };
    PowerFly.prototype.onComplete = function () {
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        this.dispose();
    };
    PowerFly.prototype.dispose = function () {
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        this._temScale = 0.6;
        _super.prototype.dispose.call(this);
    };
    return PowerFly;
}(BaseDisplayObjectContainer));
__reflect(PowerFly.prototype, "PowerFly");
