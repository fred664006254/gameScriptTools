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
 * 排行榜玩家信息vo
 * author yanyuling
 * date 2017/10/26
 * @class RankUserVo
 */
var RankUserVo = (function (_super) {
    __extends(RankUserVo, _super);
    function RankUserVo() {
        var _this = _super.call(this) || this;
        _this.level = 0;
        _this.name = "";
        _this.vip = "";
        _this.power = "";
        _this.uid = "";
        _this.title = "";
        _this.total_imacy = "";
        _this.cid = "";
        return _this;
    }
    RankUserVo.prototype.initData = function (data) {
        if (data.level != null)
            this.level = Number(data.level);
        if (data.name != null)
            this.name = data.name;
        if (data.vip != null)
            this.vip = data.vip;
        if (data.power != null)
            this.power = data.power;
        if (data.uid != null)
            this.uid = data.uid;
        if (data.title != null)
            this.title = data.title;
        if (data.total_imacy != null)
            this.total_imacy = data.total_imacy;
        if (data.cid != null)
            this.cid = data.cid;
    };
    RankUserVo.prototype.dispose = function () {
        this.level = 0;
        this.name = "";
        this.vip = "";
        this.power = "";
        this.uid = "";
        this.title = "";
        this.total_imacy = "";
        this.cid = "";
    };
    return RankUserVo;
}(BaseVo));
__reflect(RankUserVo.prototype, "RankUserVo");
//# sourceMappingURL=RankUserVo.js.map