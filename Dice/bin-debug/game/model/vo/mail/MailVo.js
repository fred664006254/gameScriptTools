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
 * 邮件vo
 * author dmj
 * date 2017/10/31
 * @class MailVo
 */
var MailVo = (function (_super) {
    __extends(MailVo, _super);
    function MailVo() {
        var _this = _super.call(this) || this;
        _this.mailInfoMap = {};
        /**未读取邮件数量 */
        _this.unread = 0;
        /**邮件总数  */
        _this.totalNum = 0;
        return _this;
    }
    MailVo.prototype.initData = function (data) {
        if (data && data.system) {
            var keys = Object.keys(data.system);
            this.totalNum = keys.length;
            this.unread = 0;
            for (var key in data.system) {
                if (data.system.hasOwnProperty(key)) {
                    var element = data.system[key];
                    this.mailInfoMap[key] = element;
                    if (element.isread == 0) {
                        this.unread++;
                    }
                }
            }
        }
    };
    MailVo.prototype.dispose = function () {
        this.mailInfoMap = null;
        this.unread = 0;
        this.totalNum = 0;
    };
    return MailVo;
}(BaseVo));
__reflect(MailVo.prototype, "MailVo");
//# sourceMappingURL=MailVo.js.map