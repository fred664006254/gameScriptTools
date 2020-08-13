//新手引导背景，实现遮罩
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
var GuideBackground = (function (_super) {
    __extends(GuideBackground, _super);
    function GuideBackground() {
        var _this = _super.call(this) || this;
        _this._bgs = null;
        _this._stageWidth = 0;
        _this._stageHeight = 0;
        _this._bgalpha = 0.3;
        return _this;
    }
    GuideBackground.prototype.init = function (f, h, bgalpha) {
        this._bgs = new Array();
        this._handle = h;
        this._Function = f;
        this._bgalpha = bgalpha || 0.3;
        this.touchEnabled = true;
        this._stageWidth = GameConfig.stageWidth;
        this._stageHeight = GameConfig.stageHeigth;
    };
    /**
     * Draw
     * @param deductRec 抠出矩形区域
     */
    GuideBackground.prototype.draw = function (deductRec, bgalpha) {
        if (bgalpha === void 0) { bgalpha = 0; }
        this.removeAllChild();
        for (var k in this._bgs) {
            if (this._bgs[k]) {
                this._bgs[k].dispose();
            }
        }
        this._bgs.length = 0;
        var alphaV = bgalpha;
        if (deductRec.fromBottom) {
            deductRec.y = GameConfig.stageHeigth - deductRec.fromBottom;
        }
        var minX = Math.max(deductRec.x, 0);
        var minY = Math.max(deductRec.y, 0);
        var maxX = Math.min(deductRec.x + deductRec.w, this._stageWidth);
        var maxY = Math.min(deductRec.y + deductRec.h, this._stageHeight);
        // 旧方式，画4个矩形
        // this.addBg(alphaV,0, 0, this._stageWidth , minY);
        // this.addBg(alphaV,0, minY, minX, deductRec.h);
        // this.addBg(alphaV,maxX, minY, this._stageWidth-maxX, deductRec.h);
        // this.addBg(alphaV,0, maxY, this._stageWidth, this._stageHeight-maxY);
        if (App.DeviceUtil.isRuntime2()) {
            this.addBg(alphaV, 0, 0, this._stageWidth, minY);
            this.addBg(alphaV, 0, minY, minX, deductRec.h);
            this.addBg(alphaV, maxX, minY, this._stageWidth - maxX, deductRec.h);
            this.addBg(alphaV, 0, maxY, this._stageWidth, this._stageHeight - maxY);
        }
        else {
            var bg;
            if (this._bgs.length) {
                bg = this._bgs.pop();
                bg.graphics.clear();
            }
            else {
                bg = new BaseShape();
                bg.addTouchTap(this.clickFunc, this, null);
            }
            // bg.graphics.beginFill(0x000000);
            bg.x = minX - 255 * 5 / 2;
            bg.y = minY - 255 * 5 / 2;
            bg.graphics.lineStyle(255, 0x000000, alphaV, true, "normal", egret.CapsStyle.SQUARE, egret.JointStyle.MITER);
            bg.graphics.drawRect(0, 0, 255 / 2 + 255 / 2 + deductRec.w / 5, 255 / 2 + 255 / 2 + deductRec.h / 5);
            // bg.anchorOffsetX = bg.width/2; 
            // bg.anchorOffsetY = bg.height/2;
            var xx = bg.x;
            var yy = bg.y;
            // bg.x = (bg.x + bg.anchorOffsetX*5 )
            // bg.y = (bg.y + bg.anchorOffsetY*5);
            bg.setScale(15);
            bg.x = bg.x - (bg.width * bg.scaleX - bg.width * 5) / 4;
            bg.y = bg.y - (bg.width * bg.scaleY - bg.width * 5) / 4;
            // 
            // bg.graphics.endFill();
            // bg.alpha = $a;
            // egret.Tween.get(bg, {loop : false}).to({scaleX : 5, scaleY : 5, x:xx+ bg.anchorOffsetX*5,y:yy+ bg.anchorOffsetY*5},500)
            egret.Tween.get(bg, { loop: false }).to({ scaleX: 5, scaleY: 5, x: xx, y: yy }, 200);
            // egret.CapsStyle.ROUND
            this.addChild(bg);
        }
        // 新方式，画一个边框很粗的空心矩形
        this.width = this._stageWidth;
        this.height = this._stageHeight;
    };
    GuideBackground.prototype.drawScreen = function (bgalpha) {
        if (bgalpha === void 0) { bgalpha = 0; }
        this.removeAllChild();
        for (var k in this._bgs) {
            if (this._bgs[k]) {
                this._bgs[k].dispose();
            }
        }
        this._bgs.length = 0;
        this.addBg(bgalpha, 0, 0, this._stageWidth, this._stageHeight);
        this.width = this._stageWidth;
        this.height = this._stageHeight;
    };
    /**
     * 添加一个bg
     * @param $x 初始X
     * @param $y 初始Y
     * @param $w 宽
     * @param $h 高
     */
    GuideBackground.prototype.addBg = function ($a, $x, $y, $w, $h) {
        // var bg:BaseBitmap;
        // if(this._bgs.length){
        //     bg = <BaseBitmap>this._bgs.pop();
        // }else{
        //     bg = BaseBitmap.create("public_9_bg11");
        //     bg.addTouchTap(this.clickFunc,this);
        // }
        //  bg.touchEnabled =true;
        // bg.alpha = $a;
        // bg.x = $x;
        // bg.y = $y;
        // bg.width = $w;
        // bg.height = $h;
        var bg;
        if (this._bgs.length) {
            bg = this._bgs.pop();
            bg.graphics.clear();
        }
        else {
            bg = new BaseShape();
            bg.addTouchTap(this.clickFunc, this, null);
        }
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect($x, $y, $w, $h);
        bg.graphics.endFill();
        bg.alpha = $a;
        this.addChild(bg);
    };
    GuideBackground.prototype.clickFunc = function () {
        this._Function.apply(this._handle);
        //this._Function();
    };
    /**
     * 移除所有对象
     */
    GuideBackground.prototype.removeAllChild = function () {
        while (this.numChildren) {
            var bg = this.removeChildAt(0);
            bg.touchEnabled = false;
            this._bgs.push(bg);
        }
    };
    /**
     * 销毁
     */
    GuideBackground.prototype.dispose = function () {
        this.removeChildren();
        for (var k1 in this._bgs) {
            this._bgs[k1].dispose();
        }
        this._bgs.length = 0;
        ;
        this._Function = null;
        this._handle = null;
        _super.prototype.dispose.call(this);
    };
    return GuideBackground;
}(BaseDisplayObjectContainer));
__reflect(GuideBackground.prototype, "GuideBackground");
