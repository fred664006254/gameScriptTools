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
 * 皇宫vo
 * author yanyuling
 * date 2017/11/01
 * @class PalaceRoleInfoVo
 */
var PalaceRoleInfoVo = (function (_super) {
    __extends(PalaceRoleInfoVo, _super);
    function PalaceRoleInfoVo() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        _this.sign = "";
        _this.vip = 0;
        _this.level = 0;
        _this.pic = 0;
        _this.titleId = "";
        _this.name = "";
        _this.rank = [];
        _this.titlelv = 0;
        return _this;
    }
    PalaceRoleInfoVo.prototype.initData = function (data) {
        if (data.uid) {
            this.uid = data.uid;
            this.sign = data.sign;
            this.vip = data.vip;
            this.level = data.level;
            this.pic = data.pic;
            this.name = data.name;
            this.titlelv = data.titlelv;
        }
        if (data.rank) {
            this.rank = data.rank;
        }
    };
    PalaceRoleInfoVo.prototype.dispose = function () {
        this.uid = 0;
        this.sign = "";
        this.vip = 0;
        this.level = 0;
        this.pic = 0;
        this.titleId = "";
        this.name = "";
        this.rank = [];
        this.titlelv = 0;
    };
    return PalaceRoleInfoVo;
}(BaseVo));
__reflect(PalaceRoleInfoVo.prototype, "PalaceRoleInfoVo");
