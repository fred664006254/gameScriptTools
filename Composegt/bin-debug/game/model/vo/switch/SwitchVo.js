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
var SwitchVo = (function (_super) {
    __extends(SwitchVo, _super);
    function SwitchVo() {
        var _this = _super.call(this) || this;
        _this.switchList = {};
        return _this;
    }
    SwitchVo.prototype.initData = function (data) {
        for (var key in data) {
            this.switchList[key] = data[key] ? Number(data[key]) : 0;
        }
    };
    SwitchVo.prototype.dispose = function () {
        this.switchList = {};
    };
    return SwitchVo;
}(BaseVo));
__reflect(SwitchVo.prototype, "SwitchVo");
