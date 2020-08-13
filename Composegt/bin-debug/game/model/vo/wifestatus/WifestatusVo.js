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
 * 册封系统vo
 * author dky
 * date 2018/4/25
 * @class WifestatusVo
 */
var WifestatusVo = (function (_super) {
    __extends(WifestatusVo, _super);
    function WifestatusVo() {
        var _this = _super.call(this) || this;
        //"星星数值
        _this.star = 0;
        //解锁到的位分位置
        _this.level = "";
        _this.info = null;
        return _this;
    }
    WifestatusVo.prototype.initData = function (data) {
        if (data) {
            if (data.star != null) {
                this.star = Number(data.star);
            }
            if (data.level != null) {
                this.level = String(data.level);
            }
            if (data.info != null) {
                this.info = data.info;
            }
        }
    };
    WifestatusVo.prototype.dispose = function () {
        //军团id
        this.star = null;
        //军团创建者uid
        this.level = null;
        this.info = 0;
    };
    return WifestatusVo;
}(BaseVo));
__reflect(WifestatusVo.prototype, "WifestatusVo");
