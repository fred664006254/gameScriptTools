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
var AffairVo = (function (_super) {
    __extends(AffairVo, _super);
    function AffairVo() {
        return _super.call(this) || this;
    }
    AffairVo.prototype.initData = function (data) {
        if (data.ainfo) {
            // if(data.ainfo.num)
            // {
            this.num = data.ainfo.num;
            this.st = data.ainfo.st;
            this.opt = data.ainfo.afid;
            // }
        }
    };
    AffairVo.prototype.dispose = function () {
        this.num = undefined;
        this.st = undefined;
        this.opt = undefined;
    };
    return AffairVo;
}(BaseVo));
__reflect(AffairVo.prototype, "AffairVo");
