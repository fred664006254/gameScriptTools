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
var ConquestVo = (function (_super) {
    __extends(ConquestVo, _super);
    function ConquestVo() {
        var _this = _super.call(this) || this;
        /**
         * 玩家uid
         */
        _this.uid = 0;
        /**
         * 征伐分数
         */
        _this.point = 0;
        /**
         * 累计征伐次数
         */
        _this.tnum = 0;
        return _this;
    }
    ConquestVo.prototype.initData = function (data) {
        if (data) {
            if (data.uid != null) {
                this.uid = data.uid;
            }
            if (data.point != null) {
                this.point = data.point;
            }
            if (data.tnum != null) {
                this.tnum = data.tnum;
            }
            if (data.info != null) {
                this.info = data.info;
            }
        }
    };
    ConquestVo.prototype.dispose = function () {
        this.uid = 0;
        this.point = 0;
        this.tnum = 0;
        this.info = null;
    };
    return ConquestVo;
}(BaseVo));
__reflect(ConquestVo.prototype, "ConquestVo");
