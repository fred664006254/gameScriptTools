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
var Boss1003Vo = (function (_super) {
    __extends(Boss1003Vo, _super);
    function Boss1003Vo() {
        var _this = _super.call(this) || this;
        _this.radius = 0;
        _this.healhpscale = 0;
        return _this;
    }
    Boss1003Vo.prototype.initData = function (cfg) {
        this.skillcd = cfg.parameter[0] * 1000;
        this.radius = cfg.parameter[1];
        this.healhpscale = cfg.parameter[2];
        this.initcd = cfg.parameter[3] * 1000;
        ;
        _super.prototype.initData.call(this, cfg);
    };
    Boss1003Vo.prototype.dispose = function () {
        this.radius = 0;
        this.healhpscale = 0;
        _super.prototype.dispose.call(this);
    };
    return Boss1003Vo;
}(BossVo));
__reflect(Boss1003Vo.prototype, "Boss1003Vo");
//# sourceMappingURL=Boss1003Vo.js.map