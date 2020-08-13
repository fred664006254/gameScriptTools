/**
 * 关卡系统api
 * author shaoliang
 * date 2017/9/26
 * @class ChallengeVoApi
 */
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
var ChallengeVoApi = (function (_super) {
    __extends(ChallengeVoApi, _super);
    function ChallengeVoApi() {
        var _this = _super.call(this) || this;
        _this.bigNum = 15;
        // private middleNum:number=
        _this.smallNum = 329;
        return _this;
    }
    /**
     * 当前关卡ID
     */
    ChallengeVoApi.prototype.getCurChannelId = function () {
        return this.challengeVo.cid + 1;
    };
    ChallengeVoApi.prototype.getHasPassId = function () {
        return this.challengeVo.cid;
    };
    /**
     * 当前关卡已经击杀数量
     */
    ChallengeVoApi.prototype.getCurKilledNum = function () {
        return this.challengeVo.ksoldier;
    };
    ChallengeVoApi.prototype.getServantInfo = function () {
        return this.challengeVo.info;
    };
    ChallengeVoApi.prototype.getServantInfoValue = function (k) {
        var v = this.challengeVo.info[k];
        if (v == null) {
            v = 0;
        }
        return v;
    };
    /**
     * 当前第几大关
     */
    ChallengeVoApi.prototype.getCurBigChannelId = function () {
        var bcid;
        if (this.getCurChannelId() > this.smallNum) {
            bcid = Math.ceil((this.getCurChannelId() - this.smallNum) / 41) + this.bigNum;
        }
        else {
            bcid = ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).big;
        }
        return bcid;
    };
    ChallengeVoApi.prototype.getBigChannelIdByCid = function (cid) {
        var bcid;
        cid = cid + 1;
        if (cid >= ChallengeCfg.getChallengeTotalPass()) {
            bcid = Math.floor((ChallengeCfg.getChallengeTotalPass() - this.smallNum) / 41) + this.bigNum;
        }
        else {
            if (cid > this.smallNum) {
                bcid = Math.ceil((cid - this.smallNum) / 41) + this.bigNum;
            }
            else {
                bcid = ChallengeCfg.getChallengeCfgById(cid).big;
            }
        }
        return bcid;
    };
    //不加一 配置用
    ChallengeVoApi.prototype.getBigChannelIdByCid2 = function (cid) {
        var bcid;
        if (cid >= ChallengeCfg.getChallengeTotalPass()) {
            bcid = Math.floor((ChallengeCfg.getChallengeTotalPass() - this.smallNum) / 41) + this.bigNum;
        }
        else {
            if (cid > this.smallNum) {
                bcid = Math.ceil((cid - this.smallNum) / 41) + this.bigNum;
            }
            else {
                bcid = ChallengeCfg.getChallengeCfgById(cid).big;
            }
        }
        return bcid;
    };
    /**
     * 第几中关
     */
    ChallengeVoApi.prototype.getMiddleChannelById = function (cid) {
        var mcid;
        // cid = cid + 1;
        if (cid >= this.smallNum) {
            //  mcid = Math.floor((cid-this.smallNum-1) % 41 / 8 ) + 1;
            mcid = Math.ceil((cid - this.smallNum) % (5 * 8 + 1) / 8) || 6;
        }
        else {
            mcid = ChallengeCfg.getChallengeCfgById(cid + 1).middle;
        }
        return mcid;
    };
    /**
     * 当前第几中关
     */
    ChallengeVoApi.prototype.getCurMiddleChannelId = function () {
        var mcid;
        if (this.getCurChannelId() > this.smallNum) {
            mcid = Math.floor((this.getCurChannelId() - this.smallNum - 1) % 41 / 8) + 1;
        }
        else {
            mcid = ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).middle;
        }
        return mcid;
    };
    /**
     * 当前第几小关
     */
    ChallengeVoApi.prototype.getCurSmallChannelId = function () {
        var scid;
        if (this.getCurChannelId() > this.smallNum) {
            scid = (this.getCurChannelId() - this.smallNum - 1) % 41 % 8;
        }
        else {
            scid = ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).small - 1;
        }
        return scid;
    };
    /**
     * 当前是否是boss关
     */
    ChallengeVoApi.prototype.getIsBossChannel = function () {
        var b = false;
        // 关卡版本2
        // if (Api.challengeVoApi.getCurMiddleChannelId() == 6 || Api.challengeVoApi.getCurSmallChannelId() == 7) {
        if (ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).type == 2) {
            b = true;
        }
        return b;
    };
    /**
     * 当前是否打开 关卡view， 如果已经通关，就不打开了。
     */
    ChallengeVoApi.prototype.getOpenViewMessage = function () {
        if (Api.switchVoApi.checkOpenLimitC100Chapter() && this.getCurBigChannelId() > 100) {
            return LanguageManager.getlocal("servantInfo_levelupTip12");
        }
        if (this.challengeVo.cid >= ChallengeCfg.getChallengeTotalPass()) {
            return LanguageManager.getlocal("challengeAllPassed");
        }
        return null;
    };
    ChallengeVoApi.prototype.getUnlockPersonLimit = function () {
        return ChallengeCfg.getChallengeCfgById(this.getCurChannelId()) ? ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).personLimit : 0;
    };
    /**
     * 获取当前关卡是否解锁
     */
    ChallengeVoApi.prototype.getChannelIslock = function () {
        var cfg = ChallengeCfg.getChallengeCfgById(this.getCurChannelId());
        if ((!cfg) || (!cfg.personLimit)) {
            return true;
        }
        return Api.composemapVoApi.getMaxLv() >= ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).personLimit;
    };
    /**
     * 获取当前关卡是否解锁
     */
    ChallengeVoApi.prototype.getChannelLockStr = function () {
        var str = LanguageManager.getlocal("challengeUnlockTip", [ChallengeCfg.getChallengeCfgById(this.getCurChannelId()).personLimit]);
        return str;
    };
    ChallengeVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ChallengeVoApi;
}(BaseVoApi));
__reflect(ChallengeVoApi.prototype, "ChallengeVoApi");
