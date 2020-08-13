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
var LevyVo = (function (_super) {
    __extends(LevyVo, _super);
    function LevyVo() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        _this.pinfo = {};
        _this.info = {};
        _this.attr = { grate: 0, frate: 0, srate: 0 };
        _this.st = {};
        _this.sinfo = {};
        return _this;
    }
    LevyVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
            this.st = {};
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESHVO_LEVY);
        }
    };
    LevyVo.prototype.dispose = function () {
        this.uid = 0;
        this.pinfo = {};
        this.info = {};
    };
    return LevyVo;
}(BaseVo));
__reflect(LevyVo.prototype, "LevyVo");
