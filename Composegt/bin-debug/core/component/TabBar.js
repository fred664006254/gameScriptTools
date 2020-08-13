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
 * 页签按钮
 * author dmj
 * date 2017/9/12
 * @class TabBar
 */
var TabBar = (function (_super) {
    __extends(TabBar, _super);
    function TabBar() {
        var _this = _super.call(this) || this;
        /**是否为锁定状态，true：锁定 */
        _this._locked = false;
        return _this;
    }
    TabBar.prototype.eventHandler = function (event) {
        if (_super.prototype.isEnable.call(this) == false) {
            return;
        }
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.setBigin(true);
                _super.prototype.updateButtonImage.call(this, BaseButton.BTN_STATE2);
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this.isBegin()) {
                    this.callbackHanler([this]);
                    this.setBigin(false);
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                _super.prototype.updateButtonImage.call(this, BaseButton.BTN_STATE1);
                this.setBigin(false);
                break;
        }
    };
    /**
     * 设置按钮选中状态
     * @param isSelected
     */
    TabBar.prototype.setSelected = function (isSelected) {
        this._selected = isSelected;
        if (isSelected == true) {
            _super.prototype.updateButtonImage.call(this, BaseButton.BTN_STATE2);
        }
        else {
            _super.prototype.updateButtonImage.call(this, BaseButton.BTN_STATE1);
        }
        this.touchEnabled = !isSelected;
    };
    TabBar.prototype.isSelected = function () {
        return this._selected;
    };
    /**
     * 设置按钮锁定状态
     * @param isLocked
     */
    TabBar.prototype.setLocked = function (isLocked) {
        if (this._locked != isLocked) {
            this._locked = isLocked;
            if (isLocked == true) {
                // this.addLockIcon();
            }
            else {
                this.removeLockIcon();
            }
        }
    };
    TabBar.prototype.isLocked = function () {
        return this._locked;
    };
    TabBar.prototype.addLockIcon = function () {
        if (this._lockIcon == null) {
            this._lockIcon = BaseBitmap.create("lockIcon");
            App.LogUtil.log("lockIcon: " + this._lockIcon + "w:" + this.width + "w2:" + this._lockIcon.width + " h:=" + this.height + "h2:=" + this._lockIcon.height);
            this._lockIcon.x = this.width - this._lockIcon.width - 5;
            this._lockIcon.y = this.height / 2 - this._lockIcon.height / 2;
            this.addChild(this._lockIcon);
        }
        else {
            this._lockIcon.visible = true;
        }
    };
    TabBar.prototype.removeLockIcon = function () {
        if (this._lockIcon && this.contains(this._lockIcon)) {
            this.removeChild(this._lockIcon);
            this._lockIcon = null;
        }
    };
    TabBar.prototype.dispose = function () {
        if (this._lockIcon && this.contains(this._lockIcon)) {
            BaseBitmap.release(this._lockIcon);
            this.removeChild(this._lockIcon);
            this._lockIcon = null;
        }
        this._selected = null;
        this._locked = null;
        _super.prototype.dispose.call(this);
    };
    return TabBar;
}(BaseButton));
__reflect(TabBar.prototype, "TabBar");
