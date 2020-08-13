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
    function OtherInfoVo() {
        var _this = _super.call(this) || this;
        _this.imacy = 0;
        _this.power = 0;
        _this.challenge = 0;
        _this.palace_flag = 0;
        _this.banet = 0; //禁言时间
        _this.certification = null;
        _this.jd618 = null;
        _this.gpower = 0;
        _this.galliance = 0;
        _this.gbiography = 0;
        _this.banEmMsg = 0;
        _this.skinHad = null;
        _this.skinWared = null;
        _this.skinHad2 = null;
        _this.skinWared2 = null;
        _this.skinHad3 = null;
        _this.skinWared3 = null;
        _this.citySkinNewYear = 0;
        _this.homeSkinNewYear = 0;
        _this.setactivitypop = null;
        _this.pushInfo = {};
        //登记玩家信息
        _this.userMsg = {};
        //记录红颜脱衣
        _this.wifeUndress = [];
        _this.kvmap = {};
        _this.crosschatNum = 0;
        _this.autoFastNum = 0;
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
            if (data.rv_info.gbiography) {
                this.gbiography = data.rv_info.gbiography;
            }
        }
        if (data.palace) {
            this.palace_flag = data.palace.flag;
        }
        if (data.info) {
            this.info = data.info;
            this.banEmMsg = data.info.banEmMsg ? 1 : 0;
        }
        if (data.banet) {
            this.banet = data.banet;
        }
        if (data.info && data.info.certification) {
            this.certification = data.info.certification;
        }
        if (data.info && data.info.jd618 != null) {
            this.jd618 = data.info.jd618;
        }
        if (data.info && data.info.skin != null) {
            this.skinHad = data.info.skin.had;
            this.skinWared = data.info.skin.wared;
            if (data.info.skin.st && data.info.skin.et) {
                if (data.info.skin.st <= GameData.serverTime && data.info.skin.et > GameData.serverTime) {
                    this.homeSkinNewYear = data.info.skin.et;
                }
                else {
                    this.homeSkinNewYear = 0;
                }
            }
        }
        if (data.info && data.info.citySceneSkin != null) {
            this.skinHad2 = data.info.citySceneSkin.had;
            this.skinWared2 = data.info.citySceneSkin.wared;
            if (data.info.citySceneSkin.st && data.info.citySceneSkin.et) {
                if (data.info.citySceneSkin.st <= GameData.serverTime && data.info.citySceneSkin.et > GameData.serverTime) {
                    this.citySkinNewYear = data.info.citySceneSkin.et;
                }
                else {
                    this.citySkinNewYear = 0;
                }
            }
            //  this.skinWared2 = "205";
        }
        if (data.info && data.info.searchScene != null) {
            this.skinHad3 = data.info.searchScene.had;
            this.skinWared3 = data.info.searchScene.wared;
        }
        if (data.info && data.info.activityPop != null) {
            this.setactivitypop = data.info.activityPop;
        }
        if (data.info && data.info.pushInfo != null) {
            this.pushInfo = data.info.pushInfo;
        }
        if (data.info && data.info.kvmap != null) {
            this.kvmap = data.info.kvmap;
        }
        if (data.info && data.info.crosschatNum != null) {
            this.crosschatNum = data.info.crosschatNum;
        }
        if (data.info && data.info.autoFastNum != null) {
            this.autoFastNum = data.info.autoFastNum;
        }
        if (data.info) {
            if (data.info.userMsg != null) {
                this.userMsg = data.info.userMsg;
            }
        }
    };
    OtherInfoVo.prototype.dispose = function () {
        this.imacy = 0;
        this.power = 0;
        this.gbiography = 0;
        this.challenge = 0;
        this.palace_flag = 0;
        this.banet = 0;
        this.info = null;
        this.certification = null;
        this.jd618 = null;
        this.skinHad = null;
        this.skinWared = null;
        this.skinHad2 = null;
        this.skinWared2 = null;
        this.skinHad3 = null;
        this.skinWared3 = null;
        this.setactivitypop = null;
        this.pushInfo = {};
        this.userMsg = {};
        this.wifeUndress = [];
        this.kvmap = {};
        this.crosschatNum = 0;
        this.autoFastNum = 0;
        this.citySkinNewYear = 0;
        this.homeSkinNewYear = 0;
    };
    return OtherInfoVo;
}(BaseVo));
__reflect(OtherInfoVo.prototype, "OtherInfoVo");
//# sourceMappingURL=OtherInfoVo.js.map