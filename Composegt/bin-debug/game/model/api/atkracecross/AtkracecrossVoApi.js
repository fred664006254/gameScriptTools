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
var AtkracecrossVoApi = (function (_super) {
    __extends(AtkracecrossVoApi, _super);
    function AtkracecrossVoApi() {
        var _this = _super.call(this) || this;
        _this.zonerankinfos = null;
        _this.isCanJoin = false;
        _this.zidgroups = null;
        return _this;
    }
    Object.defineProperty(AtkracecrossVoApi.prototype, "zidLength", {
        get: function () {
            return this.zidgroups ? this.zidgroups.length : 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 战斗信息
     */
    AtkracecrossVoApi.prototype.getMyFightInfo = function () {
        return this.atkracecrossVo.ainfo;
    };
    /**
     * 武馆信息息
     */
    AtkracecrossVoApi.prototype.getMyInfo = function () {
        return this.atkracecrossVo.info;
    };
    /**
    //  * 获取区服
    //  */
    // public getMydinfo(index:number):number
    // {
    // 	return this.atkracecrossVo.info[index].zid; 
    // }
    AtkracecrossVoApi.prototype.isShowNpc = function () {
        return Api.servantVoApi.getServantCountLevel60Plus() >= 1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
        // return true;
    };
    AtkracecrossVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString(), Config.AtkraceCfg.getservantLvAndNum()[1].toString()]);
    };
    AtkracecrossVoApi.prototype.getPoint = function () {
        return this.atkracecrossVo.point;
    };
    AtkracecrossVoApi.prototype.getRewardc = function () {
        return this.atkracecrossVo.rewardc;
    };
    AtkracecrossVoApi.prototype.checkNpcMessage = function () {
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
    AtkracecrossVoApi.prototype.dispose = function () {
        this.zonerankinfos = null;
        this.isCanJoin = false;
        this.zidgroups = null;
        _super.prototype.dispose.call(this);
    };
    return AtkracecrossVoApi;
}(BaseVoApi));
__reflect(AtkracecrossVoApi.prototype, "AtkracecrossVoApi");
