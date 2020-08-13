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
var CheckBox = (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        var _this = _super.call(this) || this;
        _this._isSelected = false;
        _this._selectDownRes = "public_select_down";
        _this._selectRes = "public_select";
        _this._callback = null;
        _this._target = null;
        return _this;
    }
    /**
     * desc 描述
     * notouch 是否添加点击事件
     * textsize 描述尺寸
     * textcolor 描述颜色
     * selectdownres 点击后的图片
     * selectres 点击前的图片
     */
    CheckBox.prototype.init = function (desc, noTouch, textSize, textColor, selectDownRes, selectRes) {
        if (selectDownRes) {
            this._selectDownRes = selectDownRes;
        }
        if (selectRes) {
            this._selectRes = selectRes;
        }
        this._selectBox = BaseBitmap.create(this._selectRes);
        if (!noTouch) {
            this._selectBox.addTouchTap(this.selectHandler, this);
        }
        this.addChild(this._selectBox);
        if (desc) {
            this._txt = ComponentManager.getTextField(desc, textSize ? textSize : TextFieldConst.FONTSIZE_CONTENT_SMALL, textColor ? textColor : TextFieldConst.COLOR_WARN_YELLOW);
            this._txt.setPosition(this._selectBox.x + this._selectBox.width + 5, this._selectBox.y + (this._selectBox.height - this._txt.height) / 2);
            this.addChild(this._txt);
        }
    };
    CheckBox.prototype.setCallback = function (callback, target) {
        this._callback = callback;
        this._target = target;
    };
    CheckBox.prototype.selectHandler = function () {
        this.isSelected = !this.isSelected;
        SoundManager.playEffect(SoundConst.EFFECT_CLICK);
        if (this._callback && this._target) {
            this._callback.apply(this._target, [this.isSelected]);
        }
    };
    Object.defineProperty(CheckBox.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (_isSelected) {
            this._isSelected = _isSelected;
            this._selectBox.texture = ResourceManager.getRes(this._isSelected ? this._selectDownRes : this._selectRes);
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.checkSelected = function () {
        return this.isSelected;
    };
    CheckBox.prototype.setSelected = function (_isSelected) {
        this.isSelected = Boolean(_isSelected);
    };
    CheckBox.prototype.dispose = function () {
        this._isSelected = false;
        this._selectBox = null;
        this._txt = null;
        this._callback = null;
        this._target = null;
        _super.prototype.dispose.call(this);
    };
    return CheckBox;
}(BaseDisplayObjectContainer));
__reflect(CheckBox.prototype, "CheckBox");
