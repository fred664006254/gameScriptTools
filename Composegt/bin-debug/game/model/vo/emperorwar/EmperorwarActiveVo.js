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
var EmperorwarActiveVo = (function (_super) {
    __extends(EmperorwarActiveVo, _super);
    function EmperorwarActiveVo() {
        var _this = _super.call(this) || this;
        /**
         * 1 正在进行的  2 将要开启的  3 已完成的最近一期
         */
        _this.flag = 0;
        _this.id = 0;
        _this.updated_at = 0;
        _this.version = 0;
        _this.info = "";
        _this.et = 0;
        return _this;
    }
    EmperorwarActiveVo.prototype.initData = function (data) {
        if (data) {
            if (data.flag != null) {
                this.flag = Number(data.flag);
            }
            if (data.id != null) {
                this.id = Number(data.id);
            }
            if (data.updated_at != null) {
                this.updated_at = Number(data.updated_at);
            }
            if (data.version != null) {
                this.version = Number(data.version);
            }
            if (data.info != null) {
                this.info = data.info;
            }
            if (data.et != null) {
                this.et = Number(data.et);
            }
        }
    };
    EmperorwarActiveVo.prototype.dispose = function () {
        this.flag = 0;
        this.id = 0;
        this.updated_at = 0;
        this.version = 0;
        this.info = "";
        this.et = 0;
    };
    return EmperorwarActiveVo;
}(BaseVo));
__reflect(EmperorwarActiveVo.prototype, "EmperorwarActiveVo");
