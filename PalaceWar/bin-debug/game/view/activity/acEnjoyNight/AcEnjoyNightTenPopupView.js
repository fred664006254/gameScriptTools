// TypeScript file
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
var AcEnjoyNightTenPopupView = (function (_super) {
    __extends(AcEnjoyNightTenPopupView, _super);
    function AcEnjoyNightTenPopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._myConfirmBtn = null;
        "";
        return _this;
    }
    Object.defineProperty(AcEnjoyNightTenPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightTenPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightTenPopupView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightTenPopupView.prototype.getTitleStr = function () {
        return "acEnjoyNightResultPopupViewTitle-" + this.uicode;
    };
    AcEnjoyNightTenPopupView.prototype.initView = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 650;
        bg.setPosition(this.viewBg.width / 2 - bg.width / 2, 20);
        this.addChildToContainer(bg);
        var oldArr = this.param.data.info;
        var rect = new egret.Rectangle(0, 0, 510, 640);
        var newArr = [];
        for (var i = oldArr.length - 1; i >= 0; i--) {
            newArr.push(oldArr[i]);
        }
        var scrollList = ComponentManager.getScrollList(AcEnjoyNightTenItem, newArr, rect, { code: this.code, aid: this.aid });
        scrollList.x = 5 + bg.x;
        scrollList.y = 5 + bg.y;
        this.addChildToContainer(scrollList);
        this._myConfirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this);
        this._myConfirmBtn.setPosition(this.viewBg.width / 2 - this._myConfirmBtn.width / 2, bg.y + 12 + bg.height);
        this.addChildToContainer(this._myConfirmBtn);
        // this._myConfirmBtn.setEnable(false);
    };
    AcEnjoyNightTenPopupView.prototype.hide = function () {
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj);
        }
        _super.prototype.hide.call(this);
    };
    AcEnjoyNightTenPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcEnjoyNightTenPopupView.prototype.dispose = function () {
        this._myConfirmBtn = null;
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightTenPopupView;
}(PopupView));
__reflect(AcEnjoyNightTenPopupView.prototype, "AcEnjoyNightTenPopupView");
//# sourceMappingURL=AcEnjoyNightTenPopupView.js.map