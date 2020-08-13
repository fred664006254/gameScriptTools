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
            else if (this.content == "fightfakemail") {
                this.content = LanguageManager.getlocal("fightfakemail");
            }
            else if (this.content == "xinguanyoulimail") {
                this.content = LanguageManager.getlocal("xinguanyoulimail");
            }
        }
        if (data.extra != null) {
            if (data.extra.mt != null) {
                var str = '';
                this.title = LanguageManager.getlocal("systemMailTitleType" + data.extra.mt);
                //众筹大奖的邮件
                var mtStr = data.extra.mt.toString();
                if (mtStr == "50" || mtStr == "50_7_1" || mtStr == "84") {
                    this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, [App.DateUtil.getFormatBySecond(data.extra.pa[0], 2), data.extra.pa[1]]);
                }
                else if (String(data.extra.mt) == '33') {
                    // let obj = {
                    // 	eventid : 1,
                    // 	randevent : 1,
                    // 	rank : 2,
                    // 	addNum : 100,
                    // 	servantObj : [{servantId : 1001, num : 20}]
                    //thistime
                    // }
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
                    this.content = str;
                }
                else if (mtStr == "24") {
                    var taskname = LanguageManager.getlocal("allianceTaskName" + data.extra.pa[0].substr(3));
                    this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, [taskname]);
                }
                else if (mtStr.indexOf("68_") > -1 && data.extra.aid.indexOf("fanliReview") > -1) {
                    this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, [data.extra.itemnum]);
                }
                else if (mtStr.indexOf("71_") > -1 && data.extra.aid.indexOf("wifeBathing") > -1) {
                    this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, [data.extra.itemnum]);
                }
                else if (mtStr.indexOf("83_") > -1 && data.extra.aid.indexOf("ransackTraitorSP") > -1) {
                    this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, [String(data.extra.pa[0]), String(data.extra.pa[1]), String(data.extra.pa[2]), String(data.extra.pa[3])]);
                }
                else {
                    this.content = LanguageManager.getlocal("systemMailContentType" + data.extra.mt, data.extra.pa);
                }
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
