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
    /**索引列表 排重  */
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
        // this._aidList = new Array();
        if (data) {
            if (data.system) {
                // if(this.mailInfoVoObj == null)
                // {
                this.mailInfoVoObj = {};
                // }
                if (data.system.c) {
                    var list = data.system.c;
                    var aidList = {};
                    for (var key in list) {
                        //邮件排除重复
                        if (list[key].extra && list[key].extra.aid) {
                            var aid = list[key].extra.aid + "#" + list[key].extra.mt;
                            if (!aidList[aid]) {
                                if (aid.indexOf("punish") != -1 || aid.indexOf("rankActive") != -1 || aid.indexOf("rescue") != -1) {
                                    aidList[aid] = 1;
                                }
                            }
                            else {
                                continue;
                            }
                        }
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
                    this.totalNum = list.length;
                    if (!this.totalNum) {
                        this.totalNum = 0;
                    }
                }
                // if(data.system.mids && data.system.mids[0])
                // {
                // 	this.totalNum =data.system.mids.length;// Number(data.system.mids[0])
                // }
            }
            if (data.unread) {
                this.unread = data.unread.system;
            }
        }
    };
    MailVo.prototype.dispose = function () {
        this.mailInfoVoObj = null;
        this.unread = null;
        this.totalNum = null;
    };
    return MailVo;
}(BaseVo));
__reflect(MailVo.prototype, "MailVo");
