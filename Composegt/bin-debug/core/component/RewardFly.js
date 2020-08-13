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
 * 奖励物品icon、文字飘动动画
 * author dmj
 * date 2017/9/27
 * @class RewardFly
 */
var RewardFly = (function (_super) {
    __extends(RewardFly, _super);
    function RewardFly() {
        var _this = _super.call(this) || this;
        _this._temScale = 0.6;
        return _this;
    }
    RewardFly.prototype.init = function (icon, message, itemtype) {
        if (itemtype === void 0) { itemtype = 0; }
        SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
        var container = new BaseDisplayObjectContainer();
        this.addChild(container);
        var temX = 0;
        var temY = 0;
        var iconBt = null;
        var bgPic = "public_itemtipbg2";
        if (icon) {
            bgPic = "public_itemtipbg";
        }
        var numBg = BaseBitmap.create(bgPic);
        // numBg.width = 300;
        // numBg.setScale(this._temScale);
        container.addChild(numBg);
        // temX = numBg.width * this._temScale;
        // temY = numBg.height * this._temScale/2;
        if (icon) {
            var iconBg = BaseBitmap.create("public_tipiconbg");
            // iconBg.setScale(this._temScale);
            container.addChild(iconBg);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 100, 100);
            iconBt = BaseLoadBitmap.create(icon, rect);
            iconBt.setScale(this._temScale);
            if (itemtype == 10 || itemtype == 8) {
                iconBt.scaleX = iconBt.scaleY = 0.5;
            }
            container.addChild(iconBt);
            // temX = iconBt.width * this._temScale;
            // temY = iconBt.height * this._temScale/2;
            // iconBt.setScale(0.7);
            numBg.x = 40;
            numBg.y = iconBt.y + iconBt.height * 0.7 / 2 - numBg.height / 2 - 5;
        }
        var msgTF = ComponentManager.getBitmapText(message, TextFieldConst.FONTNAME_ITEMTIP);
        if (iconBt) {
            temX = iconBt.width * iconBt.scaleX;
            temY = iconBt.height * iconBt.scaleY / 2;
        }
        msgTF.x = temX;
        msgTF.y = temY - msgTF.height / 2;
        numBg.width = msgTF.width + 50;
        msgTF.x = temX;
        if (iconBt) {
            msgTF.y = iconBt.y + iconBt.height * 0.7 / 2 - msgTF.height / 2;
            msgTF.y = numBg.y + numBg.height / 2 - msgTF.height / 2;
        }
        else {
            msgTF.x = numBg.x + (numBg.width - msgTF.width) / 2;
            msgTF.y = numBg.y + numBg.height / 2 - msgTF.height / 2;
        }
        container.addChild(msgTF);
        // if(message)
        // {
        // 	let msgTF:BaseTextField = ComponentManager.getTextField(message,30);
        // 	if(iconBt)
        // 	{
        // 		temX = iconBt.width * iconBt.scaleX;
        // 		temY = iconBt.height * iconBt.scaleY/2;
        // 	}
        // 	msgTF.x = temX;
        // 	if(iconBt)
        // 	{
        // 		msgTF.y = iconBt.y + iconBt.height*0.7/2 - msgTF.height/2;
        // 	}
        // 	else
        // 	{
        // 		msgTF.x=numBg.x+(numBg.width-msgTF.width)/2;
        // 		msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
        // 	}
        // 	container.addChild(msgTF);
        // 	if(msgTF.width+30>numBg.width)
        // 	{
        // 		numBg.width = msgTF.width + 30;
        // 	}
        // }
        container.x = -container.width / 2;
        this._tw = egret.Tween.get(container);
        this._tw.to({ y: -80 }, 1500).call(this.onComplete, this);
    };
    RewardFly.prototype.onComplete = function () {
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        this.dispose();
    };
    RewardFly.prototype.dispose = function () {
        if (this._tw) {
            egret.Tween.removeTweens(this._tw);
            this._tw = null;
        }
        this._temScale = 0.6;
        _super.prototype.dispose.call(this);
    };
    return RewardFly;
}(BaseDisplayObjectContainer));
__reflect(RewardFly.prototype, "RewardFly");
