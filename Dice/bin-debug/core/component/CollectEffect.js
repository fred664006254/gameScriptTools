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
var CollectEffect = (function (_super) {
    __extends(CollectEffect, _super);
    function CollectEffect() {
        var _this = _super.call(this) || this;
        _this._bitmapList = [];
        _this._maxNum = 20;
        _this._numCount = 0;
        return _this;
    }
    CollectEffect.prototype.start = function (resKey, startPoint, endPoint, endCallback, endCallbackThisObj, endCallbackParams) {
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._numCount = 0;
        this._callback = endCallback;
        this._callbackThisObj = endCallbackThisObj;
        this._callbackParams = endCallbackParams;
        // App.DisplayUtil.addFactorFunc(BaseBitmap);
        var showWidth = 250;
        for (var i = 0; i < this._maxNum; i++) {
            var startX = startPoint.x;
            var startY = startPoint.y;
            var bmp = BaseBitmap.create(resKey);
            // bmp.alpha=1;
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
            bmp.setScale(App.MathUtil.getRandom(5, 7) / 10);
            bmp.setPosition(startX, startY);
            var disX = App.MathUtil.getRandom(-120, 120);
            var disY = App.MathUtil.getRandom(-120, 120);
            var randX = startX + disX;
            var randY = startY + disY;
            var randRotation = App.MathUtil.getRandom(-720, 720);
            // let endX = randX+(disX >= 0 ? 30 : -30);
            // let endY = randY+(disY >= 0 ? 30 : -30);
            // let minX:number=Math.max(0,Math.min(startPoint.x,endPoint.x)-100);
            // let maxX:number=Math.min(GameConfig.stageWidth,Math.max(startPoint.x,endPoint.x)+100);
            // let randX:number=minX+Math.random()*(maxX-minX);
            // let randValueY:number=Math.random()>0.5?1:-1;
            // let randY:number=startPoint.y+randValueY*Math.random()*30;
            // bmp.setPosition(randX,randY);
            bmp["tweenMoveList"] = [egret.Point.create(randX, randY), egret.Point.create(endPoint.x, randY), egret.Point.create(endPoint.x, endPoint.y)];
            egret.Tween.get(bmp).to({ x: randX, y: randY, rotation: randRotation }, 600).wait(30).call(this.startMove, this);
            LayerMgr.msgLayer.addChild(bmp);
            this._bitmapList.push(bmp);
        }
    };
    CollectEffect.prototype.startMove = function () {
        var ths = this;
        this._numCount++;
        if (this._numCount == this._maxNum) {
            var l = this._bitmapList.length;
            for (var i = l - 1; i >= 0; i--) {
                var unit = this._bitmapList[i];
                egret.Tween.removeTweens(unit);
                var endPoint = unit["tweenMoveList"][2];
                egret.Tween.get(unit).to({ x: endPoint.x, y: endPoint.y, rotation: 0 }, Math.abs(App.MathUtil.getDistance(endPoint, unit["tweenMoveList"][0]))).call(function (bmp) {
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
    CollectEffect.prototype.dispose = function () {
    };
    return CollectEffect;
}(BaseClass));
__reflect(CollectEffect.prototype, "CollectEffect");
//# sourceMappingURL=CollectEffect.js.map