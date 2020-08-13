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
var NewAtkracecrossVoApi = (function (_super) {
    __extends(NewAtkracecrossVoApi, _super);
    function NewAtkracecrossVoApi() {
        var _this = _super.call(this) || this;
        _this.zonerankinfos = null;
        _this.isCanJoin = false;
        _this.revengeIdx = 0;
        return _this;
    }
    NewAtkracecrossVoApi.prototype.setZoneRankInfo = function (data) {
        this.zonerankinfos = data.atkranks;
    };
    /**
     * 战斗信息
     */
    NewAtkracecrossVoApi.prototype.getMyFightInfo = function () {
        return this.atkracecrossVo.ainfo;
    };
    /**
     * 武馆信息息
     */
    NewAtkracecrossVoApi.prototype.getMyInfo = function () {
        return this.atkracecrossVo.info;
    };
    NewAtkracecrossVoApi.prototype.isShowNpc = function () {
        return Api.servantVoApi.getServantCountLevel60Plus() >= 1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
    };
    NewAtkracecrossVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString()]);
    };
    NewAtkracecrossVoApi.prototype.getPoint = function () {
        return this.atkracecrossVo.point;
    };
    NewAtkracecrossVoApi.prototype.getRewardc = function () {
        return this.atkracecrossVo.rewardc;
    };
    NewAtkracecrossVoApi.prototype.getLastKillerInfo = function () {
        return this.atkracecrossVo.info.lastKillerInfo;
    };
    NewAtkracecrossVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (this.isShowNpc()) {
            if (this.atkracecrossVo.ainfo && this.atkracecrossVo.ainfo.mesid) {
                flag = true;
            }
            else {
                var maxCount = Config.AtkraceCfg.getDailyNum();
                var myNum = this.atkracecrossVo.info.num;
                if (myNum < maxCount) {
                    var countDownTime = this.atkracecrossVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                    if (countDownTime <= 0) {
                        flag = true;
                    }
                }
            }
        }
        return flag;
    };
    NewAtkracecrossVoApi.prototype.dispose = function () {
        this.zonerankinfos = null;
        this.isCanJoin = false;
        this.revengeIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return NewAtkracecrossVoApi;
}(BaseVoApi));
__reflect(NewAtkracecrossVoApi.prototype, "NewAtkracecrossVoApi");
//# sourceMappingURL=NewAtkracecrossVoApi.js.map