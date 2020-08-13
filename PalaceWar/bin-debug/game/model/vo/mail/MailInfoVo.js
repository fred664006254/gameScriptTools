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
        /**收件时间 */
        _this.st = 0;
        /**是否有附件 */
        _this.istouch = 0;
        /**是否读过 */
        _this.isread = 0;
        /**邮件库id */
        _this.mid = 0;
        /**邮件标题 */
        _this.title = "";
        /**邮件奖励 */
        _this.touch = "";
        /**是否领过奖励 */
        _this.hadget = 0;
        /**邮件内容 */
        _this.content = null;
        _this.extra = null;
        return _this;
    }
    MailInfoVo.prototype.initData = function (data) {
        if (data.st != null) {
            this.st = Number(data.st);
        }
        if (data.istouch != null) {
            this.istouch = Number(data.istouch);
        }
        if (data.isread != null) {
            this.isread = Number(data.isread);
        }
        if (data.mid != null) {
            this.mid = Number(data.mid);
        }
        if (data.title != null) {
            this.title = String(data.title);
            if (this.title == "xinshoufulititle1") {
                this.title = LanguageManager.getlocal("xinshoufulititle1");
            }
            else if (this.title == "xinshoufulititle2") {
                this.title = LanguageManager.getlocal("xinshoufulititle2");
            }
        }
        if (data.touch != null) {
            this.touch = String(data.touch);
        }
        if (data.hadget != null) {
            this.hadget = Number(data.hadget);
        }
        if (data.content != null) {
            this.content = String(data.content);
            if (this.content == "xinshoufuli1") {
                this.content = LanguageManager.getlocal("xinshoufuli1");
            }
            else if (this.content == "xinshoufuli2") {
                this.content = LanguageManager.getlocal("xinshoufuli2");
            }
        }
        if (data.extra != null) {
            this.extra = data.extra;
            if (data.extra.mt != null) {
                this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")));
                var str = '';
                //众筹大奖的邮件
                var realMtType = String(data.extra.mt).split("_")[0];
                if (realMtType == "50") {
                    var mailCode = String(data.extra.aid).split(".")[0];
                    var aid = mailCode;
                    if (mailCode.indexOf("-") > -1) {
                        aid = mailCode.split("-")[0];
                        mailCode = mailCode.split("-")[1];
                    }
                    else {
                        mailCode = "";
                    }
                    var newStr = mailCode; //mailCode.substr(8,1);
                    this.title = LanguageManager.getlocal("systemMailTitleType" + realMtType + "_" + newStr + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")));
                    str = LanguageManager.getlocal("systemMailContentType" + realMtType + "_" + newStr + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")), [App.DateUtil.getFormatBySecond(data.extra.pa[0], 2), data.extra.pa[1]]);
                }
                else if (String(data.extra.mt) == '33') {
                    var obj = data.extra.pa;
                    var eventName = LanguageManager.getlocal("discussViewEventName" + obj.eventId + "_" + (obj.randevent ? obj.randevent : '1'));
                    if (obj.thistime) {
                        str = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, [eventName, obj.myrank.toString(), obj.exp.split('_')[2]]);
                    }
                    else {
                        str = LanguageManager.getlocal("systemMailContentType" + data.extra.mt + "_last", [eventName, obj.myrank.toString(), obj.exp.split('_')[2]]);
                    }
                    for (var i in obj.servantData) {
                        var unit = obj.servantData[i];
                        str += LanguageManager.getlocal("systemMailContentType33_extra", [Config.ServantCfg.getServantItemById(i).name, unit.split('_')[2]]);
                    }
                }
                else if (String(data.extra.mt) == '110_6' || String(data.extra.mt) == "110_8") {
                    var obj = data.extra.pa;
                    this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")));
                    str = LanguageManager.getlocal("systemMailContentType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")), [LanguageManager.getlocal("acThreeKingdomsTeam" + obj[0] + "-1"), obj[1]]);
                }
                else if (String(data.extra.mt) == '110_2') {
                    var obj = data.extra.pa;
                    this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")));
                    str = LanguageManager.getlocal("systemMailContentType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")), [App.DateUtil.getFormatBySecond(obj[0], 13), obj[1]]);
                }
                else {
                    var strTab = App.StringUtil.formatStringParms(data.extra.pa);
                    this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")), strTab);
                    str = LanguageManager.getlocal("systemMailContentType" + data.extra.mt + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")), strTab);
                    if (realMtType == "30") {
                        if (strTab.length < 1) {
                            this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt + "_old" + ("" + (data.extra.crosszid ? (data.extra.crosszid == 1 ? "_crossleague" : "_fengyun") : "")), strTab);
                        }
                    }
                    if (realMtType == '50') {
                        var mailCode = data.extra.aid;
                        var newMailCode = mailCode.substr(8, 1);
                        str = LanguageManager.getlocal("systemMailContentType" + data.extra.mt + "_" + newMailCode, strTab);
                    }
                }
                this.content = str;
            }
        }
    };
    Object.defineProperty(MailInfoVo.prototype, "timeStr", {
        /**接收邮件的时间 */
        get: function () {
            return App.DateUtil.getFormatBySecond(this.st, 6);
        },
        enumerable: true,
        configurable: true
    });
    MailInfoVo.prototype.dispose = function () {
        this.st = 0;
        this.istouch = 0;
        this.isread = 0;
        this.mid = 0;
        this.title = "";
        this.touch = "";
        this.hadget = 0;
        this.content = null;
    };
    return MailInfoVo;
}(BaseVo));
__reflect(MailInfoVo.prototype, "MailInfoVo");
//# sourceMappingURL=MailInfoVo.js.map