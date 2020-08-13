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
var CouncilVo = (function (_super) {
    __extends(CouncilVo, _super);
    function CouncilVo() {
        return _super.call(this) || this;
    }
    CouncilVo.prototype.initData = function (data) {
        if (data) {
        }
    };
    Object.defineProperty(CouncilVo.prototype, "maxJoinNum", {
        get: function () {
            return Config.CouncilCfg.maxPlayer;
        },
        enumerable: true,
        configurable: true
    });
    CouncilVo.prototype.dispose = function () {
    };
    return CouncilVo;
}(BaseVo));
__reflect(CouncilVo.prototype, "CouncilVo");
//# sourceMappingURL=CouncilVo.js.map