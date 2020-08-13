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
var BiographyVo = (function (_super) {
    __extends(BiographyVo, _super);
    function BiographyVo() {
        var _this = _super.call(this) || this;
        _this.lastday = 0;
        _this.updated_at = 0;
        //当前传记信息[id] = {id=1001,st=111}
        _this.info = null;
        _this.list = [];
        return _this;
    }
    BiographyVo.prototype.initData = function (data) {
        if (data.lastday != null) {
            this.lastday = data.lastday;
        }
        if (data.updated_at != null) {
            this.updated_at = data.updated_at;
        }
        if (data.info != null) {
            this.info = data.info;
        }
        if (data.list != null && data.list.length > 0) {
            this.list = data.list;
        }
    };
    BiographyVo.prototype.dispose = function () {
        this.lastday = 0;
        this.updated_at = 0;
        this.info = null;
        this.list.length = 0;
    };
    return BiographyVo;
}(BaseVo));
__reflect(BiographyVo.prototype, "BiographyVo");
//# sourceMappingURL=BiographyVo.js.map