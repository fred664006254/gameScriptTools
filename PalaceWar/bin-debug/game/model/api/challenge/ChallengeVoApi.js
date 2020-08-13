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
        _this.lastRecallId = 0;
        return _this;
    }
    /**
     * 当前关卡ID
     */
    ChallengeVoApi.prototype.getCurChannelId = function () {
        return this.challengeVo.cid + 1;
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
     * 是否有门课可以使用请战书
     */
    ChallengeVoApi.prototype.getHasServantCanRelive = function () {
        for (var k in this.challengeVo.info) {
            if (this.challengeVo.info[k] < 2) {
                return true;
            }
        }
        return false;
    };
    /**
     * 当前第几大关
     */
    ChallengeVoApi.prototype.getCurBigChannelId = function () {
        var bcid = Math.floor(this.challengeVo.cid / 41) + 1;
        return bcid;
    };
    ChallengeVoApi.prototype.getBigChannelIdByCid = function (cid) {
        var bcid;
        if (cid >= ChallengeCfg.getChallengeTotalPass()) {
            bcid = Math.floor(ChallengeCfg.getChallengeTotalPass() / 41);
        }
        else {
            bcid = Math.floor(cid / 41) + 1;
        }
        return bcid;
    };
    /**
     * 当前第几中关
     */
    ChallengeVoApi.prototype.getCurMiddleChannelId = function () {
        var mcid = Math.floor(this.challengeVo.cid % 41 / 8) + 1;
        return mcid;
    };
    /**
     * 当前第几小关
     */
    ChallengeVoApi.prototype.getCurSmallChannelId = function () {
        var scid = this.challengeVo.cid % 41 % 8;
        return scid;
    };
    /**
     * 当前是否是boss关
     */
    ChallengeVoApi.prototype.getIsBossChannel = function () {
        var b = false;
        // 关卡版本2
        // if (Api.challengeVoApi.getCurMiddleChannelId() == 6 || Api.challengeVoApi.getCurSmallChannelId() == 7) {
        if (Api.challengeVoApi.getCurMiddleChannelId() == 6) {
            b = true;
        }
        return b;
    };
    /**
     * 当前是否打开 关卡view， 如果已经通关，就不打开了。
     */
    ChallengeVoApi.prototype.getOpenViewMessage = function () {
        if (this.challengeVo.cid >= ChallengeCfg.getChallengeTotalPass()) {
            return LanguageManager.getlocal("challengeAllPassed");
        }
        return null;
    };
    ChallengeVoApi.prototype.dispose = function () {
        this.lastRecallId = 0;
        _super.prototype.dispose.call(this);
    };
    ChallengeVoApi.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("challenge", 4);
    };
    return ChallengeVoApi;
}(BaseVoApi));
__reflect(ChallengeVoApi.prototype, "ChallengeVoApi");
//# sourceMappingURL=ChallengeVoApi.js.map