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
 * 圆形进度条
 * author dky
 * date 2017/11/6
 * @class CircleProgressBar
 */
var CircleProgressBar = (function (_super) {
    __extends(CircleProgressBar, _super);
    function CircleProgressBar() {
        var _this = _super.call(this) || this;
        _this._percentage = 0;
        return _this;
    }
    CircleProgressBar.prototype.init = function (barName) {
        this._bitmap = BaseBitmap.create(barName);
        this.addChild(this._bitmap);
        this._shape = new egret.Shape();
        this._shape.x = this.width / 2;
        this._shape.y = this.height / 2;
        this.addChild(this._shape);
        this._bitmap.mask = this._shape;
        // this._shape.graphics.clear();
        // this._shape.graphics.beginFill(0x00ffff, 1);
        // this._shape.graphics.moveTo(this._bitmap.width/2, this._bitmap.height/2);
        // this._shape.graphics.lineTo(this._bitmap.width, 0);
        // this._shape.graphics.drawArc(0, 0, this._bitmap.width/2, 0, this._percentage * Math.PI / 180);
        // this._shape.graphics.lineTo(0, 0);
        // this._shape.graphics.endFill();
        this._shape.rotation = 90;
    };
    CircleProgressBar.prototype.setPercentage = function (percentage) {
        this._shape.graphics.clear();
        var par = percentage * 360 / 100;
        if (par <= 0) {
            return;
        }
        if (par > 360) {
            par = 360;
        }
        this._shape.graphics.beginFill(0x00ffff, 1);
        this._shape.graphics.moveTo(this._bitmap.width / 2, this._bitmap.height / 2);
        this._shape.graphics.lineTo(this._bitmap.width, 0);
        this._shape.graphics.drawArc(0, 0, this._bitmap.width / 2, 0, par * Math.PI / 180);
        this._shape.graphics.lineTo(0, 0);
        this._shape.graphics.endFill();
    };
    CircleProgressBar.prototype.dispose = function () {
        if (this._shape) {
            this._shape = null;
        }
        this._percentage = 0;
        this._bitmap = null;
        _super.prototype.dispose.call(this);
    };
    return CircleProgressBar;
}(BaseDisplayObjectContainer));
__reflect(CircleProgressBar.prototype, "CircleProgressBar");
