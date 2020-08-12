/*
 *@description: 气泡容器
 *@author: hwc
 *@date: 2020-04-15 19:36:11
 *@version 0.0.1
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
var BubbleBox = (function (_super) {
    __extends(BubbleBox, _super);
    function BubbleBox() {
        var _this = _super.call(this) || this;
        _this._tryangleURL = "";
        _this._bgURL = "";
        return _this;
    }
    Object.defineProperty(BubbleBox.prototype, "TryangleURL", {
        get: function () {
            return this._tryangleURL;
        },
        set: function (value) {
            if (!value || value == "" || value == this._tryangleURL)
                return;
            this._tryangleURL = value;
            if (!this._tryangle) {
                var t = BaseBitmap.create(this._tryangleURL);
                this.addChild(t);
                t.x = this._tryanglex || 0;
                t.y = 0;
                this._tryangle = t;
            }
            else {
                this._tryangle.texture = ResMgr.getRes(this._tryangleURL);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleBox.prototype, "TryangleX", {
        get: function () {
            return this._tryanglex;
        },
        set: function (value) {
            if (value < 10 + this._tryangle.width / 2) {
                this._tryanglex = 10 + this._tryangle.width / 2;
            }
            else if (value > this._bgwidth - this._tryangle.width / 2 - 10) {
                this._tryanglex = this._bgwidth - this._tryangle.width / 2 - 10;
            }
            else {
                this._tryanglex = value;
            }
            this._tryangle.x = this._tryanglex - this._tryangle.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleBox.prototype, "Bgurl", {
        get: function () {
            return this._bgURL;
        },
        set: function (value) {
            if (!value || value == "" || value == this._bgURL)
                return;
            this._bgURL = value;
            if (!this._viewbg) {
                var view = BaseBitmap.create(this._bgURL);
                this.addChild(view);
                view.x = 0;
                view.y = this._tryangle.height;
                this._viewbg = view;
            }
            else {
                this._viewbg.texture = ResMgr.getRes(this._bgURL);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleBox.prototype, "BgWidth", {
        get: function () {
            return this._bgwidth;
        },
        set: function (value) {
            if (!value || value < 0 || this._bgwidth == value || !this._viewbg)
                return;
            this._bgwidth = value;
            this._viewbg.width = this._bgwidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BubbleBox.prototype, "BgHeight", {
        get: function () {
            return this._bgheight;
        },
        set: function (value) {
            if (!value || value < 0 || this._bgheight == value || !this._viewbg)
                return;
            this._bgheight = value;
            this._viewbg.height = this._bgheight;
        },
        enumerable: true,
        configurable: true
    });
    BubbleBox.prototype.initView = function (tryangleURL, bgURL, bgwidth, bgheight, tryanglex, dy) {
        tryangleURL = tryangleURL || "";
        bgURL = bgURL || "";
        bgwidth = bgwidth || 0;
        bgheight = bgheight || 0;
        this._bgwidth = bgwidth;
        this._bgheight = bgheight;
        this._tryangleURL = tryangleURL;
        this._bgURL = bgURL;
        var triangle = BaseBitmap.create(tryangleURL);
        this._tryanglex = tryanglex || bgwidth / 2 - triangle.width / 2;
        this.addChild(triangle);
        triangle.x = tryanglex || bgwidth / 2 - triangle.width / 2;
        triangle.y = 0;
        this._tryangle = triangle;
        this.TryangleX = triangle.x + triangle.width / 2;
        var bubble = BaseBitmap.create(bgURL);
        this.addChild(bubble);
        bubble.x = 0;
        bubble.y = triangle.y + triangle.height - 1 - dy;
        bubble.height = bgheight;
        bubble.width = bgwidth;
        this._viewbg = bubble;
        var con = new BaseDisplayObjectContainer();
        con.x = bubble.x;
        con.y = bubble.y;
        this.container = con;
        this.addChild(this.container);
    };
    BubbleBox.prototype.addChildCon = function (obj) {
        if (obj) {
            this.container.addChild(obj);
        }
    };
    BubbleBox.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BubbleBox;
}(BaseDisplayObjectContainer));
__reflect(BubbleBox.prototype, "BubbleBox");
//# sourceMappingURL=BubbleBox.js.map