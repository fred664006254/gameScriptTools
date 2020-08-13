/**
 * 表情包vo
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonVo
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
var EmoticonVo = (function (_super) {
    __extends(EmoticonVo, _super);
    function EmoticonVo() {
        var _this = _super.call(this) || this;
        _this.emoticonId = null;
        return _this;
    }
    EmoticonVo.prototype.initData = function (data) {
        if (data.info) {
            this.emoticonId = data.info;
        }
    };
    EmoticonVo.prototype.dispose = function () {
    };
    return EmoticonVo;
}(BaseVo));
__reflect(EmoticonVo.prototype, "EmoticonVo");
//# sourceMappingURL=EmoticonVo.js.map