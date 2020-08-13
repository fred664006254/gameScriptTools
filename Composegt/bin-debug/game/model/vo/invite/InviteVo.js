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
var InviteVo = (function (_super) {
    __extends(InviteVo, _super);
    function InviteVo() {
        var _this = _super.call(this) || this;
        _this.info = {};
        _this.rinfo = { invite: {}, power: {}, recharge: {} };
        return _this;
    }
    InviteVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    InviteVo.prototype.dispose = function () {
    };
    return InviteVo;
}(BaseVo));
__reflect(InviteVo.prototype, "InviteVo");
