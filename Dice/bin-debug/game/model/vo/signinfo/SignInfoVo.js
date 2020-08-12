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
var SignInfoVo = (function (_super) {
    __extends(SignInfoVo, _super);
    function SignInfoVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**已经签到天数 */
        _this.days = 0;
        /**今日是否签到0未 1已签 */
        _this.hasSign = 0;
        /**改名次数 */
        _this.renameNum = 0;
        /**是否首充 */
        _this.payFlag = 0;
        /**跨天时间 */
        _this.lastday = 0;
        /**杂项 */
        _this.info = null;
        return _this;
    }
    SignInfoVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    SignInfoVo.prototype.dispose = function () {
        this.days = 0;
        this.hasSign = 0;
        this.renameNum = 0;
        this.payFlag = 0;
        this.lastday = 0;
        this.info = null;
    };
    return SignInfoVo;
}(BaseVo));
__reflect(SignInfoVo.prototype, "SignInfoVo");
//# sourceMappingURL=SignInfoVo.js.map