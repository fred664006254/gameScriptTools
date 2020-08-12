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
var Boss1001Vo = (function (_super) {
    __extends(Boss1001Vo, _super);
    function Boss1001Vo() {
        var _this = _super.call(this) || this;
        _this.monster3num = 0;
        _this.monster3hpscale = 0;
        _this.monster3speed = 0;
        _this.monster2num = 0;
        _this.monster2hpscale = 0;
        _this.monster2speed = 0;
        return _this;
    }
    Boss1001Vo.prototype.initData = function (cfg) {
        this.skillcd = cfg.parameter[0] * 1000;
        this.monster3num = cfg.parameter[1];
        this.monster3hpscale = cfg.parameter[2];
        this.monster3speed = cfg.parameter[3];
        this.monster2num = cfg.parameter[4];
        this.monster2hpscale = cfg.parameter[5];
        this.monster2speed = cfg.parameter[6];
        this.initcd = cfg.parameter[7] * 1000;
        _super.prototype.initData.call(this, cfg);
    };
    Boss1001Vo.prototype.dispose = function () {
        this.monster3num = 0;
        this.monster3hpscale = 0;
        this.monster3speed = 0;
        this.monster2num = 0;
        this.monster2hpscale = 0;
        this.monster2speed = 0;
        _super.prototype.dispose.call(this);
    };
    return Boss1001Vo;
}(BossVo));
__reflect(Boss1001Vo.prototype, "Boss1001Vo");
//# sourceMappingURL=Boss1001Vo.js.map