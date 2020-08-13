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
var AcRankActiveVo = (function (_super) {
    __extends(AcRankActiveVo, _super);
    function AcRankActiveVo() {
        var _this = _super.call(this) || this;
        _this.nextaid = "";
        return _this;
    }
    AcRankActiveVo.prototype.initData = function (data) {
        _super.prototype.initData.call(this, data);
        if (data.nextaid) {
            this.nextaid = data.nextaid;
        }
    };
    /**
     *  获取冲榜活动产出资格的对应活动aid
     * */
    AcRankActiveVo.prototype.getCrossActivityAid = function () {
        var str = '';
        if (this.nextaid && this.nextaid !== '') {
            str = this.nextaid;
        }
        return str;
    };
    return AcRankActiveVo;
}(AcBaseVo));
__reflect(AcRankActiveVo.prototype, "AcRankActiveVo");
//# sourceMappingURL=AcRankActiveVo.js.map