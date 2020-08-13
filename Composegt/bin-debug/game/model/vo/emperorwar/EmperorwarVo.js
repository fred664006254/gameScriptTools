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
var EmperorwarVo = (function (_super) {
    __extends(EmperorwarVo, _super);
    function EmperorwarVo() {
        var _this = _super.call(this) || this;
        _this.version = 0;
        _this.ak = 0;
        _this.status = 0;
        /**
         * 编号
         */
        _this.number = 0;
        /**
         * 报名时间
         */
        _this.bmst = 0;
        /**
         * 报名消耗
         */
        _this.pemcost = 0;
        /**
         * 门客信息  {sinfo={}}
         */
        _this.info = {};
        /**
         * 人气
         */
        _this.getcheer = 0;
        /**
         * 助威别人  {uid=0,num=0}
         */
        _this.cheerinfo = {};
        /**
         * 领奖信息   {et=0,bmflag=0,winflag=0}
         */
        _this.winfo = {};
        /**
         *
         */
        _this.updated_at = 0;
        return _this;
    }
    EmperorwarVo.prototype.initData = function (data) {
        if (data) {
            if (data.version != null) {
                this.version = data.version;
            }
            if (data.ak != null) {
                this.ak = data.ak;
            }
            if (data.status != null) {
                this.status = data.status;
            }
            if (data.number != null) {
                this.number = data.number;
            }
            if (data.bmst != null) {
                this.bmst = data.bmst;
            }
            if (data.pemcost != null) {
                this.pemcost = data.pemcost;
            }
            if (data.info != null) {
                this.info = data.info;
            }
            if (data.getcheer != null) {
                this.getcheer = data.getcheer;
            }
            if (data.cheerinfo != null) {
                this.cheerinfo = data.cheerinfo;
            }
            if (data.winfo != null) {
                this.winfo = data.winfo;
            }
            if (data.updated_at != null) {
                this.updated_at = data.updated_at;
            }
        }
    };
    EmperorwarVo.prototype.dispose = function () {
        this.version = 0;
        this.ak = 0;
        this.status = 0;
        this.number = 0;
        this.bmst = 0;
        this.pemcost = 0;
        this.info = {};
        this.getcheer = 0;
        this.cheerinfo = {};
        this.winfo = {};
        this.updated_at = 0;
    };
    return EmperorwarVo;
}(BaseVo));
__reflect(EmperorwarVo.prototype, "EmperorwarVo");
