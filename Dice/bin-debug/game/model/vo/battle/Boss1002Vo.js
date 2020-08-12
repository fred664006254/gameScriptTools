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
var Boss1002Vo = (function (_super) {
    __extends(Boss1002Vo, _super);
    function Boss1002Vo() {
        var _this = _super.call(this) || this;
        _this.effectNum = 0;
        return _this;
    }
    Boss1002Vo.prototype.initData = function (cfg) {
        this.skillcd = cfg.parameter[0] * 1000;
        this.effectNum = cfg.parameter[1];
        this.initcd = cfg.parameter[2] * 1000;
        ;
        _super.prototype.initData.call(this, cfg);
    };
    Boss1002Vo.prototype.dispose = function () {
        this.effectNum = 0;
        _super.prototype.dispose.call(this);
    };
    return Boss1002Vo;
}(BossVo));
__reflect(Boss1002Vo.prototype, "Boss1002Vo");
//# sourceMappingURL=Boss1002Vo.js.map