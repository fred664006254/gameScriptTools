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
 * 邮件api
 * author dmj
 * date 2017/10/31
 * @class ShopVoApi
 */
var MailVoApi = (function (_super) {
    __extends(MailVoApi, _super);
    function MailVoApi() {
        return _super.call(this) || this;
    }
    /**
     * 解析邮件详情
     * @param data {content:内容，mid:邮件id，touch:附件}
     */
    MailVoApi.prototype.formatDetailData = function (data) {
        if (data) {
            var mid = Number(data.mid);
            var mailInfoVo = this.getMailInfoVoById(mid);
            if (mailInfoVo) {
                mailInfoVo.initData(data);
            }
        }
    };
    /**
     * 获取邮件列表
     */
    MailVoApi.prototype.getMailInfoVoList = function () {
        var mailInfoVoObj = this.mailVo.mailInfoVoObj;
        var arr = new Array();
        for (var key in mailInfoVoObj) {
            arr.push(mailInfoVoObj[key]);
        }
        arr.sort(this.sortA);
        return arr;
    };
    MailVoApi.prototype.sortA = function (a, b) {
        if (a.isread == b.isread) {
            return b.mid - a.mid;
        }
        return a.isread - b.isread;
    };
    /**
     * 未读取的邮件数量
     */
    MailVoApi.prototype.getUnreadNum = function () {
        return this.mailVo.unread;
    };
    /**
     * 根据邮件mid获取邮件vo
     * @param mid  邮件id
     */
    MailVoApi.prototype.getMailInfoVoById = function (mid) {
        if (this.mailVo) {
            var mailInfoVoObj = this.mailVo.mailInfoVoObj;
            if (mailInfoVoObj && mailInfoVoObj[mid.toString()]) {
                return mailInfoVoObj[mid.toString()];
            }
        }
        return null;
    };
    /**
     * 邮件总数
     */
    MailVoApi.prototype.getTotalNum = function () {
        return this.mailVo.totalNum;
    };
    MailVoApi.prototype.dispose = function () {
        this.mailVo = null;
        _super.prototype.dispose.call(this);
    };
    return MailVoApi;
}(BaseVoApi));
__reflect(MailVoApi.prototype, "MailVoApi");
