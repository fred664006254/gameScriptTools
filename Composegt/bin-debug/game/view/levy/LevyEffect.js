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
var LevyEffect = (function (_super) {
    __extends(LevyEffect, _super);
    function LevyEffect() {
        var _this = _super.call(this) || this;
        _this._bitmapList = [];
        _this._maxNum = 3;
        _this._numCount = 0;
        return _this;
    }
    LevyEffect.prototype.start = function (resKey, startPoint, endPoint, displayContainer, endCallback, endCallbackThisObj, endCallbackParams) {
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._numCount = 0;
        this._callback = endCallback;
        this._callbackThisObj = endCallbackThisObj;
        this._callbackParams = endCallbackParams;
        App.DisplayUtil.addFactorFunc(BaseBitmap);
        var showWidth = 250;
        for (var i = 0; i < this._maxNum; i++) {
            var bmp = BaseBitmap.create(resKey);
            bmp.alpha = 0;
            var randX = Math.max(0, startPoint.x - 30) + Math.random() * 60;
            var randValueY = Math.random() > 0.5 ? 1 : -1;
            var randY = startPoint.y + randValueY * Math.random() * 30;
            bmp.setPosition(randX, randY);
            bmp["tweenMoveList"] = [egret.Point.create(bmp.x, bmp.y), egret.Point.create(endPoint.x, bmp.y), egret.Point.create(endPoint.x, endPoint.y)];
            egret.Tween.get(bmp).to({ alpha: 1 }, 0 + Math.random() * 100).call(this.startMove, this);
            displayContainer.addChild(bmp);
            this._bitmapList.push(bmp);
        }
    };
    LevyEffect.prototype.startMove = function () {
        var ths = this;
        this._numCount++;
        if (this._numCount == this._maxNum) {
            var l = this._bitmapList.length;
            for (var i = l - 1; i >= 0; i--) {
                egret.Tween.removeTweens(this._bitmapList[i]);
                egret.Tween.get(this._bitmapList[i]).wait(10 + Math.random() * 300).to({ factor: 1 }, 450).call(function (bmp) {
                    bmp.dispose();
                    bmp["tweenMoveList"] = undefined;
                    BaseBitmap.release(bmp);
                    ths._bitmapList.splice(i, 1);
                    ths._numCount--;
                    if (ths._numCount == 0) {
                        if (ths._callback) {
                            ths._callback.apply(ths._callbackThisObj, ths._callbackParams);
                        }
                        ths._callback = null;
                        ths._callbackThisObj = null;
                        ths._callbackParams = null;
                    }
                }.bind(this, this._bitmapList[i]));
            }
        }
    };
    LevyEffect.prototype.dispose = function () {
    };
    return LevyEffect;
}(BaseClass));
__reflect(LevyEffect.prototype, "LevyEffect");
