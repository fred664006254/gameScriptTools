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
        _this._resurl = '';
        _this._handler = null;
        _this._handlerObj = null;
        _this._params = null;
        return _this;
    }
    CheckBox.prototype.init = function (desc, res, fontsize, txtColor) {
        if (!res) {
            res = "public_select";
        }
        if (!fontsize) {
            fontsize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        }
        this._resurl = res;
        this._selectBox = BaseBitmap.create(res);
        this._selectBox.addTouchTap(this.selectHandler, this);
        this.addChild(this._selectBox);
        if (desc) {
            this._txt = ComponentManager.getTextField(desc, fontsize, (!isNaN(txtColor)) ? txtColor : TextFieldConst.COLOR_WARN_YELLOW);
            this._txt.setPosition(this._selectBox.x + this._selectBox.width + 5, this._selectBox.y + (this._selectBox.height - this._txt.height) / 2);
            this.addChild(this._txt);
        }
    };
    CheckBox.prototype.selectHandler = function () {
        this.isSelected = !this.isSelected;
        if (this._handler) {
            this._handler.apply(this._handlerObj, [this, this._params]);
        }
        SoundManager.playEffect(SoundConst.EFFECT_CLICK);
    };
    CheckBox.prototype.addChangeStatusHanlder = function (handler, hanlderObj, params) {
        this._handler = handler;
        this._handlerObj = hanlderObj;
        this._params = params;
    };
    Object.defineProperty(CheckBox.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (_isSelected) {
            this._isSelected = _isSelected;
            this._selectBox.texture = ResourceManager.getRes(this._isSelected ? this._resurl + "_down" : this._resurl);
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.removeClilck = function () {
        this._selectBox.removeTouchTap();
    };
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
        this._handler = this._handlerObj = this._params = null;
        _super.prototype.dispose.call(this);
    };
    return CheckBox;
}(BaseDisplayObjectContainer));
__reflect(CheckBox.prototype, "CheckBox");
//# sourceMappingURL=CheckBox.js.map