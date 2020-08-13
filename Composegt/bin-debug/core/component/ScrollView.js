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
 * author 陈可
 * date 2017/9/20
 * @class ScrollView
 */
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView(content) {
        var _this = _super.call(this, content) || this;
        _this.content = undefined;
        _this._touchTapHelper = null;
        _this._touchHelper = null;
        _this._arrow = null;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStageHandler, _this);
        _this.addEventListener(egret.Event.COMPLETE, _this.moveHandler, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    //添加到舞台，然后初始化
    ScrollView.prototype.onAddToStage = function (event) {
        // this.setArrow();
    };
    ScrollView.prototype.removeFromStageHandler = function (e) {
        egret.ScrollTween.removeTweens(this);
    };
    ScrollView.prototype.setContent = function (content) {
        _super.prototype.setContent.call(this, content);
        this.content = content;
    };
    Object.defineProperty(ScrollView.prototype, "x", {
        get: function () {
            return egret.superGetter(ScrollView, this, "x");
        },
        set: function (value) {
            var tmpX = this.x;
            egret.superSetter(ScrollView, this, "x", value);
            if (tmpX !== value) {
                if (this._arrow && this._arrow.stage) {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, this._arrow, this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "y", {
        get: function () {
            return egret.superGetter(ScrollView, this, "y");
        },
        set: function (value) {
            var tmpY = this.y;
            egret.superSetter(ScrollView, this, "y", value);
            if (tmpY !== value) {
                if (this._arrow && this._arrow.stage) {
                    App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._arrow, this);
                    var startY = this._arrow.y;
                    egret.Tween.removeTweens(this._arrow);
                    egret.Tween.get(this._arrow, { loop: true }).to({ y: startY - 10, alpha: 0 }, 800).to({ y: startY, alpha: 1 }, 800);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "scrollLeft", {
        get: function () {
            return egret.superGetter(ScrollView, this, "scrollLeft");
        },
        set: function (flag) {
            egret.superSetter(ScrollView, this, "scrollLeft", flag);
            if (this._moveCallBack) {
                this._moveCallBack.call(this._moveCallBackObj);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "visible", {
        get: function () {
            return egret.superGetter(ScrollView, this, "visible");
        },
        set: function (flag) {
            egret.superSetter(ScrollView, this, "visible", flag);
            if (this._arrow) {
                this._arrow.visible = this.visible;
                if (this._arrow.visible) {
                    this._arrow.visible = this.checkShowArrow();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ScrollView.prototype.setArrow = function () {
        var content = this.parent;
        if (content) {
            if (this._arrow) {
                App.DisplayUtil.setLayoutPosition(LayoutConst.bottom, this._arrow, this);
                egret.Tween.removeTweens(this._arrow);
            }
            else {
                var arrow = BaseLoadBitmap.create("popupview_rulearrow");
                arrow.width = 31;
                arrow.height = 27;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, arrow, this, [0, 0]);
                content.addChild(arrow);
                this._arrow = arrow;
            }
            this._arrow.visible = this.visible;
            if (this._arrow.visible) {
                this._arrow.visible = this.checkShowArrow();
            }
            var startY = this._arrow.y;
            egret.Tween.get(this._arrow, { loop: true }).to({ y: startY - 10, alpha: 0 }, 800).to({ y: startY, alpha: 1 }, 800);
        }
    };
    ScrollView.prototype.removeContent = function () {
        egret.ScrollTween.removeTweens(this);
        _super.prototype.removeContent.call(this);
        var content = this.content;
        this.content = null;
        return content;
    };
    ScrollView.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.checkShowArrow();
    };
    /**
     * 添加触摸回调
     */
    ScrollView.prototype.addTouchTap = function (touchTapHandler, touchTapHandlerThisObj, touchTapHandlerParams) {
        var ths = this;
        if (this._touchTapHelper == null) {
            //局部调用，勿改
            var tapHandler = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (event.type == egret.TouchEvent.TOUCH_END) {
                    if (touchTapHandler) {
                        var params = [event];
                        if (args && args.length > 0) {
                            params.concat(args);
                        }
                        touchTapHandler.apply(touchTapHandlerThisObj, params);
                    }
                }
            };
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler, this, touchTapHandlerParams);
        }
    };
    /**
     * 箭头翻阅提示
     */
    ScrollView.prototype.checkShowArrow = function () {
        var view = this;
        var flag = false;
        var content = view.content;
        var height = content.height - view.height;
        if (this.verticalScrollPolicy != 'off') {
            if (height > 0 && view.scrollTop < height) {
                flag = true;
            }
        }
        return flag;
    };
    ScrollView.prototype.bindMoveCompleteCallback = function (callback, callbackObj) {
        this._moveCallBack = callback;
        this._moveCallBackObj = callbackObj;
        if (this._arrow) {
            this._arrow.visible = this.checkShowArrow();
        }
    };
    ScrollView.prototype.moveHandler = function (e) {
        if (this._moveCallBack) {
            this._moveCallBack.call(this._moveCallBackObj);
        }
        if (this._arrow) {
            this._arrow.visible = this.checkShowArrow();
        }
    };
    /**
     * 移除触摸
     */
    ScrollView.prototype.removeTouchTap = function () {
        if (this._touchTapHelper) {
            this._touchTapHelper.removeTouch();
            this._touchTapHelper = null;
        }
    };
    ScrollView.prototype.addTouch = function (touchHandler, touchHandlerThisObj, touchHandlerParams) {
        if (!this._touchHelper) {
            this._touchHelper = TouchHelper.addTouch(this.content, touchHandler, touchHandlerThisObj, touchHandlerParams);
        }
    };
    ScrollView.prototype.removeTouch = function () {
        if (this._touchHelper) {
            this._touchHelper.removeTouch();
            this._touchHelper = null;
        }
    };
    ScrollView.prototype.setContentPosY = function (posy) {
        if (this.content) {
            this.content.y = posy;
        }
    };
    ScrollView.prototype.dispose = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStageHandler, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.COMPLETE, this.moveHandler, this);
        try {
            this._removeEvents();
            this._onTouchEnd(null);
        }
        catch (e) {
        }
        if (this._arrow) {
            this._arrow.dispose();
        }
        this._arrow = null;
        egret.ScrollTween.removeTweens(this);
        this._moveCallBack = null;
        this._moveCallBackObj = null;
        if (this.numChildren > 0) {
            var content = this.removeContent();
            if (content instanceof egret.DisplayObjectContainer) {
                App.DisplayUtil.destory(content);
            }
        }
        this._content = null;
    };
    return ScrollView;
}(egret.ScrollView));
__reflect(ScrollView.prototype, "ScrollView", ["base.Ibase"]);
