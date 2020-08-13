/**
 * author zsl
 * date 2018/8/1
 * @class BubbleTip
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
var AcBubbleTip = (function (_super) {
    __extends(AcBubbleTip, _super);
    function AcBubbleTip() {
        var _this = _super.call(this) || this;
        _this._name = null;
        _this._length = 0;
        _this._bubbleText = null;
        _this._newTxtText = null;
        _this._messageStr = null;
        _this._codonLength = 0;
        return _this;
    }
    /** length  文字状态*/
    /** isTrue  true 可以领奖状态   */
    AcBubbleTip.prototype.init = function (name, length, isTrue) {
        if (isTrue === void 0) { isTrue = false; }
        this._name = name;
        this._length = length;
        var meeesageBg = BaseBitmap.create("ac_tw_bubble");
        meeesageBg.x = 55;
        this.addChild(meeesageBg);
        var bubbleName = null;
        var iconName = name.toLowerCase();
        if (RES.hasRes("ac_bubble_" + iconName)) {
            bubbleName = "ac_bubble_" + iconName;
        }
        if (bubbleName) {
            var bubbleIcon = BaseLoadBitmap.create(bubbleName);
            bubbleIcon.width = 55;
            bubbleIcon.height = 58;
            bubbleIcon.x = -13;
            this.addChild(bubbleIcon);
            meeesageBg.x = 40;
            meeesageBg.y = 15;
        }
        if (isTrue) {
            this._messageStr = LanguageManager.getlocal("bubble_tip_" + name + App.MathUtil.getRandom(1, length) + "_2");
        }
        else {
            this._messageStr = LanguageManager.getlocal("bubble_tip_" + name + App.MathUtil.getRandom(1, length) + "_1");
        }
        this._bubbleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._bubbleText.setPosition(14 + meeesageBg.x, 8 + meeesageBg.y);
        this.addChild(this._bubbleText);
        this._bubbleText.width = meeesageBg.width - 14;
        if (this._messageStr.length >= 9) {
            meeesageBg.height = 77;
            meeesageBg.y = meeesageBg.height / 2 - bubbleIcon.height / 2 - 15;
            this._bubbleText.y = this._bubbleText.y - 11;
        }
        if (this._messageStr.length > 18) {
            this._bubbleText.y = this._bubbleText.y - 7;
        }
        this.setScale(0.01);
        egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2 }, 180).to({ scaleX: 0.9, scaleY: 0.9 }, 90).to({ scaleX: 1, scaleY: 1 }, 90).wait(100).call(this.textShootAnim, this);
    };
    AcBubbleTip.prototype.textShootAnim = function () {
        this._codonLength += 1;
        if (this._codonLength > this._messageStr.length) {
            this._bubbleText.text = this._messageStr;
            egret.Tween.get(this._bubbleText).wait(3000).call(this.showDisposeAnim, this);
        }
        else {
            this._bubbleText.text = this._messageStr.substr(0, this._codonLength);
            egret.Tween.get(this._bubbleText).wait(100).call(this.textShootAnim, this);
        }
    };
    AcBubbleTip.prototype.showDisposeAnim = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 500).call(this.dispose, this);
    };
    AcBubbleTip.prototype.dispose = function () {
        egret.Tween.removeTweens(this._bubbleText);
        this._name = null;
        this._length = 0;
        this._bubbleText = null;
        this._messageStr = null;
        this._codonLength = 0;
        this._newTxtText = null;
        _super.prototype.dispose.call(this);
    };
    return AcBubbleTip;
}(BaseDisplayObjectContainer));
__reflect(AcBubbleTip.prototype, "AcBubbleTip");
//# sourceMappingURL=AcBubbleTip.js.map