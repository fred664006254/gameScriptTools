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
 *普通位图文字，只支持图集用法，暂时只能用数字和英文字母
 *
 * @class TextureText
 * @extends {BaseDisplayObjectContainer}
 */
var TextureText = (function (_super) {
    __extends(TextureText, _super);
    function TextureText() {
        var _this = _super.call(this) || this;
        _this._preName = null;
        _this._showStr = '';
        _this._letterSpacing = 0;
        return _this;
    }
    TextureText.prototype.init = function (preName) {
        this._preName = preName;
    };
    TextureText.prototype.setString = function (str) {
        if (this._showStr == str) {
            return;
        }
        var num = this.numChildren;
        str = str || '';
        var l = str.length;
        for (var index = 0; index < l; index++) {
            var idxStr = str[index];
            var bmp = null;
            if (index < num) {
                bmp = this.getChildAt(index);
                bmp.setRes(this._preName + idxStr);
            }
            else {
                bmp = BaseBitmap.create(this._preName + idxStr);
                this.addChildAt(bmp, index);
            }
            bmp.x = (bmp.width + this._letterSpacing) * index;
        }
        if (num > l) {
            for (var index = l; index < num; index++) {
                var bmp = this.getChildAt(l);
                bmp && bmp.dispose();
            }
        }
        this._showStr = str || '';
    };
    Object.defineProperty(TextureText.prototype, "letterSpacing", {
        get: function () {
            return this._letterSpacing;
        },
        set: function (value) {
            this._letterSpacing = value;
        },
        enumerable: true,
        configurable: true
    });
    TextureText.prototype.dispose = function () {
        this._preName = null;
        this._showStr = '';
        this._letterSpacing = 0;
        _super.prototype.dispose.call(this);
    };
    return TextureText;
}(BaseDisplayObjectContainer));
__reflect(TextureText.prototype, "TextureText");
//# sourceMappingURL=TextureText.js.map