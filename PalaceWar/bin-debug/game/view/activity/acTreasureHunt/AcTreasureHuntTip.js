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
var AcTreasureHuntTip = (function (_super) {
    __extends(AcTreasureHuntTip, _super);
    function AcTreasureHuntTip() {
        var _this = _super.call(this) || this;
        _this._name = null;
        _this._length = 0;
        _this._bubbleText = null;
        _this._newTxtText = null;
        _this._messageStr = null;
        _this._codonLength = 0;
        return _this;
    }
    AcTreasureHuntTip.prototype.init = function (str, length, isTrue) {
        if (isTrue === void 0) { isTrue = false; }
        this._name = str;
        this._length = length;
        this.alpha = 0;
        var meeesageBg = BaseBitmap.create("ac_tw_bubble");
        meeesageBg.x = 55;
        this.addChild(meeesageBg);
        var bubbleName = 'treasurenpchead-1';
        var bubbleIcon = BaseLoadBitmap.create(bubbleName);
        bubbleIcon.width = 55;
        bubbleIcon.height = 58;
        this.addChild(bubbleIcon);
        this._messageStr = str;
        this._bubbleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
        this._bubbleText.setPosition(14 + meeesageBg.x, 8 + meeesageBg.y);
        this.addChild(this._bubbleText);
        this._bubbleText.width = meeesageBg.width - 14;
        this._bubbleText.text = this._messageStr;
        meeesageBg.height = this._bubbleText.textHeight + 30;
        this.height = meeesageBg.height;
        this.width = meeesageBg.width + bubbleIcon.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bubbleIcon, this, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, meeesageBg, bubbleIcon, [bubbleIcon.width, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._bubbleText, meeesageBg);
        this.setScale(0.01);
        egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 180).to({ scaleX: 0.9, scaleY: 0.9 }, 90).to({ scaleX: 1, scaleY: 1 }, 90).wait(100).call(this.textShootAnim, this);
    };
    AcTreasureHuntTip.prototype.textShootAnim = function () {
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
    AcTreasureHuntTip.prototype.showDisposeAnim = function () {
        egret.Tween.get(this).to({ alpha: 0 }, 500).call(this.dispose, this);
    };
    AcTreasureHuntTip.prototype.dispose = function () {
        egret.Tween.removeTweens(this._bubbleText);
        this._name = null;
        this._length = 0;
        this._bubbleText = null;
        this._messageStr = null;
        this._codonLength = 0;
        this._newTxtText = null;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntTip;
}(BaseDisplayObjectContainer));
__reflect(AcTreasureHuntTip.prototype, "AcTreasureHuntTip");
//# sourceMappingURL=AcTreasureHuntTip.js.map