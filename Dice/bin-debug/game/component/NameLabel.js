/**
 * 名称框
 * @author shaoliang
 * data 2019/7/5
 * @class NameLabel
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
var NameLabel = (function (_super) {
    __extends(NameLabel, _super);
    function NameLabel() {
        var _this = _super.call(this) || this;
        /** 背景 */
        _this._bg = null;
        /** 背景 */
        _this._name = null;
        return _this;
    }
    NameLabel.prototype.init = function (name, bgtype, size, color) {
        var resName = "public_label_" + bgtype;
        this._bg = BaseLoadBitmap.create(resName);
        this.addChild(this._bg);
        this._name = ComponentMgr.getTextField(name, size, color);
        this.addChild(this._name);
        var scale9 = Scale9gridCfg.getScale9gridCfg(resName);
        var sArray = scale9.split(",");
        var nameWidth = this._name.width > 80 ? this._name.width : 80;
        this._bg.width = Number(sArray[0]) * 2 + nameWidth;
        this._name.setPosition(this._bg.width / 2 - this._name.width / 2, Number(sArray[1]) - this._name.height / 2);
    };
    NameLabel.prototype.dispose = function () {
        this._bg = null;
        this._name = null;
        _super.prototype.dispose.call(this);
    };
    return NameLabel;
}(BaseDisplayObjectContainer));
__reflect(NameLabel.prototype, "NameLabel");
//# sourceMappingURL=NameLabel.js.map