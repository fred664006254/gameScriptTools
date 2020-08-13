/**
  * 海滨伊人 次数领奖
  * @author shaoliang
  * date 2020/7/9
  * @class SeaWomanPlayNode
  */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SeaWomanPlayNode = /** @class */ (function (_super) {
    __extends(SeaWomanPlayNode, _super);
    function SeaWomanPlayNode() {
        var _this = _super.call(this) || this;
        _this._code = null;
        _this._id = 0;
        _this._iconId = 0;
        _this._myClip = null;
        _this._iconNode = null;
        _this._icon = null;
        _this._iconbg = null;
        _this._closedFrames = [];
        _this._openingFrames = [];
        _this._openedByFrames = [];
        _this._closingFrames = [];
        _this._show = false;
        _this._empty = false;
        _this.ballClip1 = null;
        _this.ballClip2 = null;
        return _this;
    }
    SeaWomanPlayNode.prototype.init = function (id, code, f, o) {
        var _this = this;
        this._id = id;
        this._code = code;
        this._closedFrames = ["seawoman_effect_open1"];
        this._openedByFrames = ["seawoman_effect_open5"];
        for (var i = 2; i <= 5; i++) {
            this._openingFrames.push("seawoman_effect_open" + i);
        }
        for (var i = 4; i >= 1; i--) {
            this._closingFrames.push("seawoman_effect_open" + i);
        }
        this._myClip = ComponentManager.getCustomMovieClip();
        this._myClip.frameRate = 35;
        this.addChild(this._myClip);
        var tempicon = BaseBitmap.create("seawoman_effect_open1");
        this._iconNode = new BaseDisplayObjectContainer();
        this._iconNode.setPosition(tempicon.width / 2, tempicon.height / 2);
        this.addChild(this._iconNode);
        var icon = BaseBitmap.create("seawoman_icon1-" + code);
        this._iconNode.addChild(icon);
        this._icon = icon;
        var iconbg = BaseBitmap.create("seawoman_iconbg-" + code);
        this._iconNode.addChild(iconbg);
        this._iconbg = iconbg;
        this._iconNode.anchorOffsetX = this._iconNode.width / 2;
        this._iconNode.anchorOffsetY = this._iconNode.height / 2;
        this.addTouchTap(function () {
            if (_this._empty) {
                return;
            }
            f.apply(o, [_this]);
        }, this);
    };
    SeaWomanPlayNode.prototype.setInfo = function (v) {
        this._icon.texture = ResourceManager.getRes("seawoman_icon" + v.icon + "-" + this._code);
        this._iconId = v.icon;
        var show = v.onlyshow ? true : false;
        this.setShow(show, false, null, null);
        this._empty = false;
        this.visible = true;
    };
    SeaWomanPlayNode.prototype.setShow = function (show, anim, f, o) {
        var _this = this;
        this._show = show;
        if (show) {
            if (anim) {
                if (this.ballClip1) {
                    this.ballClip1.dispose();
                    this.ballClip1 = null;
                }
                this.ballClip1 = ComponentManager.getCustomMovieClip();
                var frameArray = [];
                for (var i = 1; i <= 8; i++) {
                    frameArray.push("seawoman_effect_openball" + i);
                }
                this.ballClip1.frameImages = frameArray;
                this.ballClip1.frameRate = 35;
                this.ballClip1.setPosition(-15, -40);
                this.addChild(this.ballClip1);
                this.ballClip1.setEndCallBack(function () {
                    _this.ballClip1.dispose();
                    _this.ballClip1 = null;
                    if (f && o) {
                        f.apply(o);
                    }
                }, this);
                this._myClip.frameImages = this._openingFrames;
                this._myClip.playWithTime(1);
                this._myClip.setFrameEvent(3, function () {
                    if (_this.ballClip1) {
                        _this.ballClip1.playWithTime(1);
                    }
                    _this._iconNode.visible = true;
                    _this._iconbg.visible = (_this._iconId != 1);
                    _this._myClip.removeFrameEvent();
                    _this._iconNode.setScale(0.2);
                    egret.Tween.get(_this._iconNode).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 50);
                }, this);
            }
            else {
                this._iconNode.visible = true;
                this._iconbg.visible = (this._iconId != 1);
                this._myClip.frameImages = this._openedByFrames;
                this._myClip.playWithTime(1);
            }
        }
        else {
            if (anim) {
                this._iconNode.visible = false;
                this._myClip.frameImages = this._closingFrames;
                this._myClip.playWithTime(1);
                this._myClip.setEndCallBack(function () {
                    if (f && o) {
                        f.apply(o);
                    }
                    _this._myClip.setEndCallBack(null, null);
                }, this);
            }
            else {
                this._iconNode.visible = false;
                this._myClip.frameImages = this._closedFrames;
                this._myClip.playWithTime(1);
            }
        }
    };
    SeaWomanPlayNode.prototype.setEmpty = function () {
        this._empty = true;
        // this._iconNode.visible = false;
        // this._myClip.frameImages = this._openedByFrames;
        // this._myClip.playWithTime(1);
        this.visible = false;
    };
    SeaWomanPlayNode.prototype.setRemove = function (f, o) {
        var _this = this;
        this._empty = true;
        this._iconNode.visible = false;
        if (this.ballClip2) {
            this.ballClip2.dispose();
            this.ballClip2 = null;
        }
        this.ballClip2 = ComponentManager.getCustomMovieClip();
        var frameArray = [];
        for (var i = 1; i <= 6; i++) {
            frameArray.push("seawoman_effect_bomb" + i);
        }
        this.ballClip2.frameImages = frameArray;
        this.ballClip2.frameRate = 35;
        this.ballClip2.setPosition(-50, -40);
        this.addChild(this.ballClip2);
        this.ballClip2.setEndCallBack(function () {
            _this.ballClip2.dispose();
            _this.ballClip2 = null;
            if (f && o) {
                f.apply(o);
            }
            _this.visible = false;
        }, this);
        this.ballClip2.playWithTime(1);
    };
    SeaWomanPlayNode.prototype.setShake = function (v) {
        egret.Tween.removeTweens(this);
        this.rotation = 0;
        if (v) {
            egret.Tween.get(this, { loop: true }).to({ rotation: 10 }, 50).to({ rotation: -10 }, 100).to({ rotation: 10 }, 100).to({ rotation: 0 }, 50).wait(500);
        }
    };
    SeaWomanPlayNode.prototype.dispose = function () {
        this._code = null;
        this._id = 0;
        this._myClip = null;
        this._iconNode = null;
        this._closedFrames.length = 0;
        this._openingFrames.length = 0;
        this._openedByFrames.length = 0;
        this.ballClip1 = null;
        this.ballClip2 = null;
        this._show = false;
        this._iconId = 0;
        this._icon = null;
        this._iconbg = null;
        this._empty = false;
        this._closingFrames.length = 0;
        _super.prototype.dispose.call(this);
    };
    return SeaWomanPlayNode;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=SeaWomanPlayNode.js.map