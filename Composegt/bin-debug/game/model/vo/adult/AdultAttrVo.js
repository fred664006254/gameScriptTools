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
 * 成年属性vo
 * author dky
 * date 2017/10/28
 * @class AdultAttrVo
 */
var AdultAttrVo = (function (_super) {
    __extends(AdultAttrVo, _super);
    function AdultAttrVo() {
        var _this = _super.call(this) || this;
        // 武力
        _this.forceTotal = 0;
        // 智力
        _this.brainsTotal = 0;
        // 政治
        _this.politicsTotal = 0;
        // 魅力
        _this.charmTotal = 0;
        // 总和
        _this.attTotal = 0;
        return _this;
    }
    AdultAttrVo.prototype.initData = function (data) {
        if (data) {
            if (data) {
                this.forceTotal = Number(data[0]);
                this.brainsTotal = Number(data[1]);
                this.politicsTotal = Number(data[2]);
                this.charmTotal = Number(data[3]);
                this.attTotal = this.forceTotal + this.brainsTotal + this.politicsTotal + this.charmTotal;
            }
        }
    };
    AdultAttrVo.prototype.dispose = function () {
        this.forceTotal = 0;
        this.brainsTotal = 0;
        this.politicsTotal = 0;
        this.charmTotal = 0;
    };
    return AdultAttrVo;
}(BaseVo));
__reflect(AdultAttrVo.prototype, "AdultAttrVo");
