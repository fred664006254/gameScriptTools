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
var PromoteVo = (function (_super) {
    __extends(PromoteVo, _super);
    function PromoteVo() {
        var _this = _super.call(this) || this;
        /*
        ["model.promote"] = "分封模型",
        ["model.promote.king"] = "是否是皇帝1:是",
        ["model.promote.position"] = "分封的官职",
        ["model.promote.ptime"] = "分封的时间",
        ["model.promote.version"] = "分封的期号(服务端用)"
        */
        _this.info = {};
        _this.king = 0;
        _this.position = 1;
        _this.ptime = 0;
        _this.version = 0;
        _this.et = 0;
        return _this;
    }
    PromoteVo.prototype.initData = function (data) {
        var view = this;
        for (var i in data) {
            // if(typeof view[i] != 'undefined'){
            view[i] = data[i];
            // }
        }
    };
    PromoteVo.prototype.dispose = function () {
        this.et = 0;
    };
    return PromoteVo;
}(BaseVo));
__reflect(PromoteVo.prototype, "PromoteVo");
//# sourceMappingURL=PromoteVo.js.map