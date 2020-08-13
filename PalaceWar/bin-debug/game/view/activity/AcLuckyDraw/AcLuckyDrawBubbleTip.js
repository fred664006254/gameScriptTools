/**
 * author qianjun
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
var AcLuckyDrawBubbleTip = (function (_super) {
    __extends(AcLuckyDrawBubbleTip, _super);
    function AcLuckyDrawBubbleTip() {
        var _this = _super.call(this) || this;
        _this._name = null;
        _this._length = 0;
        _this._bubbleText = null;
        _this._messageStr = null;
        _this._codonLength = 0;
        return _this;
    }
    AcLuckyDrawBubbleTip.prototype.init = function (name, msg) {
        this._name = name;
        var meeesageBg = BaseBitmap.create("mainui_bubble");
        this.addChild(meeesageBg);
        var bubbleName = name;
        if (bubbleName) {
            var bubbleIcon = BaseLoadBitmap.create(bubbleName);
            this.addChild(bubbleIcon);
            meeesageBg.x = 30;
            meeesageBg.y = 10;
        }
        this._messageStr = msg;
        this._bubbleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._bubbleText.setPosition(14 + meeesageBg.x, 10 + meeesageBg.y);
        this.addChild(this._bubbleText);
        this.setScale(0.01);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height;
        egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2 }, 180).to({ scaleX: 0.9, scaleY: 0.9 }, 90).to({ scaleX: 1, scaleY: 1 }, 90).wait(100).call(this.textShootAnim, this);
    };
    AcLuckyDrawBubbleTip.prototype.textShootAnim = function () {
        this._codonLength += 1;
        if (this._codonLength > this._messageStr.length) {
            this._bubbleText.text = this._messageStr;
            // egret.Tween.get(this._bubbleText).wait(3000).call(this.showDisposeAnim,this);
        }
        else {
            this._bubbleText.text = this._messageStr.substr(0, this._codonLength);
            egret.Tween.get(this._bubbleText).wait(100).call(this.textShootAnim, this);
        }
    };
    // private showDisposeAnim():void
    // {
    //     egret.Tween.get(this).to({alpha:0},500).call(this.dispose,this);
    // }
    AcLuckyDrawBubbleTip.prototype.dispose = function () {
        egret.Tween.removeTweens(this._bubbleText);
        this._name = null;
        this._bubbleText = null;
        this._messageStr = null;
        this._codonLength = 0;
        _super.prototype.dispose.call(this);
    };
    return AcLuckyDrawBubbleTip;
}(BaseDisplayObjectContainer));
__reflect(AcLuckyDrawBubbleTip.prototype, "AcLuckyDrawBubbleTip");
//# sourceMappingURL=AcLuckyDrawBubbleTip.js.map