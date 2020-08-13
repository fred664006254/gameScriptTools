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
var ChangebgIcon = (function (_super) {
    __extends(ChangebgIcon, _super);
    function ChangebgIcon() {
        var _this = _super.call(this) || this;
        _this._status = 1; // 1 已解锁  2 未解锁
        _this._circle = null;
        _this._using = null;
        _this._idx = 0;
        _this._callbackF = null;
        _this._obj = null;
        _this._lockedTab = [];
        return _this;
    }
    //
    ChangebgIcon.prototype.init = function (key, idx, status, f, o) {
        this._status = status;
        this._obj = o;
        this._callbackF = f;
        this._idx = idx;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 100, 100);
        var icon = BaseLoadBitmap.create("changebg_icon_" + key);
        this.addChild(icon);
        icon.addTouchTap(this.touchHandle, this);
        if (status == 2) {
            var mask = BaseBitmap.create("changebg_mask");
            this.addChild(mask);
            var lock = BaseBitmap.create("changebg_lock");
            lock.setPosition(mask.width / 2 - lock.width / 2, mask.height / 2 - lock.height / 2);
            this.addChild(lock);
            this._lockedTab.push(mask);
            this._lockedTab.push(lock);
        }
        this._circle = BaseBitmap.create("changebg_circle");
        this.addChild(this._circle);
        this._circle.visible = false;
        this._using = BaseBitmap.create("changebg_using");
        this._using.x = this._circle.width / 2 - this._using.width / 2;
        this.addChild(this._using);
        this._using.visible = false;
        var nameBg = BaseBitmap.create("changebg_namebg");
        nameBg.scaleX = 100 / nameBg.width;
        this.addChild(nameBg);
        var name = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_" + key), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.lineSpacing = 4;
        name.width = 100;
        name.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(name);
        nameBg.y = this._circle.height - name.height - 4;
        nameBg.height = name.height + 8;
        name.y = nameBg.y + 4;
        this.name = "ChangebgIcon";
    };
    ChangebgIcon.prototype.touchHandle = function () {
        this._callbackF.apply(this._obj, [this._idx]);
    };
    ChangebgIcon.prototype.setSelect = function (s) {
        this._circle.visible = s;
    };
    ChangebgIcon.prototype.setUsing = function (s) {
        this._using.visible = s;
    };
    ChangebgIcon.prototype.setUnlock = function () {
        for (var k = 0; k < this._lockedTab.length; k++) {
            this.removeChild(this._lockedTab[k]);
        }
        this._lockedTab.length = 0;
    };
    ChangebgIcon.prototype.dispose = function () {
        this._status = 1;
        this._circle = null;
        this._using = null;
        this._idx = 0;
        this._callbackF = null;
        this._obj = null;
        this._lockedTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ChangebgIcon;
}(BaseDisplayObjectContainer));
__reflect(ChangebgIcon.prototype, "ChangebgIcon");
//# sourceMappingURL=ChangebgIcon.js.map