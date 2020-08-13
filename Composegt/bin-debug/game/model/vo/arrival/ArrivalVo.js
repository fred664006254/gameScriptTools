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
 * 签到vo
 * author dmj
 * date 2017/11/04
 * @class ArrivalVo
 */
var ArrivalVo = (function (_super) {
    __extends(ArrivalVo, _super);
    function ArrivalVo() {
        var _this = _super.call(this) || this;
        /**签到状态，1已领奖 0未领奖 */
        _this.flag = 0;
        /**累积签到多少天 */
        _this.arrival_count = 0;
        return _this;
    }
    ArrivalVo.prototype.initData = function (data) {
        if (data) {
            if (data.info != null) {
                this.flag = Number(data.info);
            }
            if (data.arrival_count != null) {
                if (this.flag == 0) {
                    this.arrival_count = Number(data.arrival_count) + 1;
                }
                else {
                    this.arrival_count = Number(data.arrival_count);
                }
            }
        }
    };
    ArrivalVo.prototype.dispose = function () {
        this.flag = 0;
        this.arrival_count = 0;
    };
    return ArrivalVo;
}(BaseVo));
__reflect(ArrivalVo.prototype, "ArrivalVo");
