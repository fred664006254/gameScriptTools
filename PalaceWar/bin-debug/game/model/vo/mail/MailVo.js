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
        _this.mailInfoVoObj = null;
        /**未读取邮件数量 */
        _this.unread = 0;
        /**邮件总数  */
        _this.totalNum = 0;
        return _this;
    }
    MailVo.prototype.initData = function (data) {
        if (data) {
            if (data.system) {
                if (this.mailInfoVoObj == null) {
                    this.mailInfoVoObj = {};
                }
                if (data.system.c) {
                    var list = data.system.c;
                    for (var key in list) {
                        var mid = list[key].mid;
                        if (this.mailInfoVoObj[mid]) {
                            this.mailInfoVoObj[mid].initData(list[key]);
                        }
                        else {
                            var mailInfoVo = new MailInfoVo();
                            mailInfoVo.initData(list[key]);
                            this.mailInfoVoObj[mid] = mailInfoVo;
                        }
                    }
                    if (Object.keys(data.system.c).length == 0) {
                        this.totalNum = 0;
                    }
                    else {
                        this.totalNum = list.length;
                    }
                }
            }
            if (data.unread) {
                this.unread = data.unread.system;
            }
        }
    };
    MailVo.prototype.dispose = function () {
        this.mailInfoVoObj = null;
        this.unread = null;
        this.totalNum = 0;
    };
    return MailVo;
}(BaseVo));
__reflect(MailVo.prototype, "MailVo");
//# sourceMappingURL=MailVo.js.map