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
var AcDraftVo = (function (_super) {
    __extends(AcDraftVo, _super);
    function AcDraftVo() {
        var _this = _super.call(this) || this;
        _this.ainfo = null;
        _this.binfo = null;
        _this.cinfo = null;
        return _this;
    }
    AcDraftVo.prototype.initData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
        if (data.ainfo) {
            this.ainfo = data.ainfo;
        }
        if (data.binfo) {
            this.binfo = data.binfo;
        }
        if (data.cinfo) {
            this.cinfo = data.cinfo;
        }
        //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DBDAY_FRESH_ITEM);
    };
    AcDraftVo.prototype.dispose = function () {
        this.ainfo = null;
        this.binfo = null;
        this.cinfo = null;
    };
    AcDraftVo.prototype.getCurFlower = function () {
        return 0;
    };
    return AcDraftVo;
}(AcBaseVo));
__reflect(AcDraftVo.prototype, "AcDraftVo");
//# sourceMappingURL=AcDraftVo.js.map