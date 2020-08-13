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
 * 其他杂项vo
 * author yanyuling
 * date 2017/10/27
 * @class OtherInfoVo
 */
var OtherInfoVo = (function (_super) {
    __extends(OtherInfoVo, _super);
    // public notsharewife:number = 0;
    // public notshareservant:number = 0;
    function OtherInfoVo() {
        var _this = _super.call(this) || this;
        _this.imacy = 0;
        _this.power = 0;
        _this.challenge = 0;
        _this.palace_flag = 0;
        _this.banet = 0; //禁言时间
        _this.certification = null;
        _this.lastday = 0;
        _this.jd618 = null;
        _this.gpower = 0;
        _this.galliance = 0;
        _this.banEmMsg = 0;
        _this.skinHad = null;
        _this.skinWared = null;
        _this.wxchatgift = 0;
        _this.twdailyshare = 0;
        _this.firstchallengefail = 0;
        _this.kvmap = {};
        //秒杀截止时间
        _this.autosmallattacket = 0;
        return _this;
    }
    OtherInfoVo.prototype.initData = function (data) {
        if (data.rv_info) {
            if (data.rv_info.imacy) {
                this.imacy = data.rv_info.imacy;
            }
            if (data.rv_info.power) {
                this.power = data.rv_info.power;
            }
            if (data.rv_info.challenge) {
                this.challenge = data.rv_info.challenge;
            }
            if (data.rv_info.gpower) {
                this.gpower = data.rv_info.gpower;
            }
            if (data.rv_info.galliance) {
                this.galliance = data.rv_info.galliance;
            }
        }
        if (data.palace) {
            this.palace_flag = data.palace.flag;
        }
        if (data.info) {
            this.info = data.info;
        }
        if (data.banet) {
            this.banet = data.banet;
        }
        if (data.info && data.info.certification) {
            this.certification = data.info.certification;
        }
        if (data.lastday) {
            this.lastday = data.lastday;
        }
        if (data.info && data.info.skin != null) {
            this.skinHad = data.info.skin.had;
            this.skinWared = data.info.skin.wared;
        }
        if (data.info && data.info.wxchatgift != null) {
            this.wxchatgift = data.info.wxchatgift;
        }
        if (data.info && data.info.twdailyshare != null) {
            this.twdailyshare = data.info.twdailyshare;
        }
        if (data.info && data.info.firstchallengefail != null) {
            this.firstchallengefail = data.info.firstchallengefail;
        }
        if (data.info && data.info.kvmap != null) {
            this.kvmap = data.info.kvmap;
        }
        if (data.info && data.info.autosmallattacket != null) {
            this.autosmallattacket = data.info.autosmallattacket;
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_OTHERINFO_REFRESHVO);
    };
    OtherInfoVo.prototype.dispose = function () {
        this.imacy = 0;
        this.power = 0;
        this.challenge = 0;
        this.palace_flag = 0;
        this.banet = 0;
        this.info = null;
        this.certification = null;
        this.lastday = 0;
        this.skinHad = null;
        this.skinWared = null;
        this.wxchatgift = 0;
        this.kvmap = {};
        this.autosmallattacket = 0;
    };
    return OtherInfoVo;
}(BaseVo));
__reflect(OtherInfoVo.prototype, "OtherInfoVo");
