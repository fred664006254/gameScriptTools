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
 * 邮件详情
 * author dmj
 * date 2017/10/31
 * @class MailInfoVo
 */
var MailInfoVo = (function (_super) {
    __extends(MailInfoVo, _super);
    function MailInfoVo() {
        var _this = _super.call(this) || this;
        /**邮件发送时间 */
        _this.ts = 0;
        /**是否读过 */
        _this.isread = 0;
        /**邮件库id */
        _this.mid = 0;
        /**邮件标题 */
        _this.title = "";
        /**邮件奖励 */
        _this.rewards = "";
        /**邮件内容 */
        _this.content = null;
        return _this;
    }
    MailInfoVo.prototype.initData = function (data) {
        if (data) {
            this.mid = data.id || this.mid;
            this.title = data.title || "";
            this.content = data.content || "";
            this.ts = data.ts || "";
            this.rewards = data.rewards || "";
            this.isread = data.isread || 0;
        }
    };
    Object.defineProperty(MailInfoVo.prototype, "timeStr", {
        /**接收邮件的时间 */
        get: function () {
            return App.DateUtil.getFormatBySecond(this.ts, 6);
        },
        enumerable: true,
        configurable: true
    });
    MailInfoVo.prototype.dispose = function () {
        this.ts = 0;
        this.isread = 0;
        this.mid = 0;
        this.title = "";
        this.content = null;
    };
    return MailInfoVo;
}(BaseVo));
__reflect(MailInfoVo.prototype, "MailInfoVo");
//# sourceMappingURL=MailInfoVo.js.map