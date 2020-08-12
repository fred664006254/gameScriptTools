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
var Boss1004Vo = (function (_super) {
    __extends(Boss1004Vo, _super);
    function Boss1004Vo() {
        return _super.call(this) || this;
    }
    Boss1004Vo.prototype.initData = function (cfg) {
        this.skillcd = cfg.parameter[0] * 1000;
        this.initcd = cfg.parameter[1] * 1000;
        ;
        _super.prototype.initData.call(this, cfg);
    };
    Boss1004Vo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Boss1004Vo;
}(BossVo));
__reflect(Boss1004Vo.prototype, "Boss1004Vo");
//# sourceMappingURL=Boss1004Vo.js.map