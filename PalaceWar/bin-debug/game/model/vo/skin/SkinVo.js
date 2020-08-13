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
 * 皮肤vo
 * author yanyuling
 * date 2018/08/13
 * @class SkinVo
 */
var SkinVo = (function (_super) {
    __extends(SkinVo, _super);
    function SkinVo() {
        var _this = _super.call(this) || this;
        _this.sinfo = [];
        _this.winfo = [];
        _this.showTime = 0;
        return _this;
    }
    SkinVo.prototype.initData = function (data) {
        if (data) {
            if (data.sinfo) {
                this.sinfo = data.sinfo;
            }
            if (data.winfo) {
                this.winfo = data.winfo;
            }
            if (data.showTime) {
                this.showTime = data.showTime;
            }
        }
    };
    SkinVo.prototype.dispose = function () {
        this.sinfo = [];
        this.winfo = [];
        this.showTime = 0;
    };
    return SkinVo;
}(BaseVo));
__reflect(SkinVo.prototype, "SkinVo");
//# sourceMappingURL=SkinVo.js.map