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
        _this.tabIdx = 0;
        /**是否为滑动列表 水平 */
        _this._isScrollH = false;
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
    Object.defineProperty(TabBar.prototype, "isScrollH", {
        get: function () {
            return this._isScrollH;
        },
        /**
         * 是否为水平滑动
         * @param scroll
         */
        set: function (scroll) {
            this._isScrollH = scroll;
        },
        enumerable: true,
        configurable: true
    });
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
        if (this._buttonName == ButtonConst.BTN2_TAB || this._buttonName == ButtonConst.BTN_BIG_TAB2 || this._buttonName == ButtonConst.BTN2_SMALL_TAB) {
            if (!this._butterfly) {
                this._butterfly = ComponentManager.getCustomMovieClip("tabhudie", 8); //BaseBitmap.create("btn2_tab_fly");
                this._butterfly.width = 33;
                this._butterfly.height = 31;
                //this._butterfly.scaleX = -1;
                this._butterfly.playWithTime(-1);
                var parent_1 = this.parent;
                if (!this.isScrollH) {
                    while (parent_1 && !(parent_1 instanceof TabBarGroup)) {
                        parent_1 = parent_1.parent;
                    }
                }
                if (parent_1) {
                    this._butterfly.setPosition(this.x + this.width - this._butterfly.width / 2 - 2, this.y - this._butterfly.height / 2);
                    parent_1.addChild(this._butterfly);
                }
            }
            this.setHudiePos();
            this._butterfly.visible = isSelected;
        }
    };
    TabBar.prototype.isSelected = function () {
        return this._selected;
    };
    TabBar.prototype.setHudiePos = function () {
        if (this._butterfly) {
            this._butterfly.setPosition(this.x + this.width - this._butterfly.width / 2 - 2, this.y - this._butterfly.height / 2);
        }
    };
    /**
     * 设置按钮锁定状态
     * @param isLocked
     */
    TabBar.prototype.setLocked = function (isLocked) {
        if (this._locked != isLocked) {
            this._locked = isLocked;
            if (isLocked == true) {
                this.addLockIcon();
            }
            else {
                this.removeLockIcon();
                this.setGray(false);
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
            this.setGray(true);
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
            this.removeChild(this._lockIcon);
            this._lockIcon = null;
        }
        this._selected = null;
        this._locked = null;
        this._butterfly = null;
        this.tabIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return TabBar;
}(BaseButton));
__reflect(TabBar.prototype, "TabBar");
//# sourceMappingURL=TabBar.js.map