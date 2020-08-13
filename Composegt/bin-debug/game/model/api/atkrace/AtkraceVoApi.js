/**
 * 擂台api
 * author shaoliang
 * date 2017/11/23
 * @class AtkraceVoApi
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
var AtkraceVoApi = (function (_super) {
    __extends(AtkraceVoApi, _super);
    function AtkraceVoApi() {
        var _this = _super.call(this) || this;
        _this.dieSidList = [{}, {}];
        return _this;
    }
    /**
     * 战斗信息
     */
    AtkraceVoApi.prototype.getMyFightInfo = function () {
        return this.atkraceVo.ainfo;
    };
    AtkraceVoApi.prototype.getFightServantList = function () {
        return this.atkraceVo.ainfo.meslist;
    };
    /**
     * 武馆信息息
     */
    AtkraceVoApi.prototype.getMyInfo = function () {
        return this.atkraceVo.info;
    };
    /**
     * 防守信息
     */
    AtkraceVoApi.prototype.getDefendInfo = function () {
        return this.atkraceVo.dinfo;
    };
    /**仇人信息 */
    AtkraceVoApi.prototype.getEnemyInfo = function () {
        return this.atkraceVo.einfo;
    };
    AtkraceVoApi.prototype.isShowNpc = function () {
        var __cfg = Config.AtkraceCfg.getservantLvAndNum();
        return Api.servantVoApi.getServantCountLevel60Plus() >= __cfg[1] && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
        // return true;
    };
    AtkraceVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString(), Config.AtkraceCfg.getservantLvAndNum()[1].toString()]);
    };
    AtkraceVoApi.prototype.getPoint = function () {
        return this.atkraceVo.point;
    };
    AtkraceVoApi.prototype.getRewardc = function () {
        return this.atkraceVo.rewardc;
    };
    AtkraceVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (this.isShowNpc()) {
            if (this.atkraceVo.ainfo && this.atkraceVo.ainfo.mesid) {
                flag = true;
            }
            else {
                var maxCount = Config.AtkraceCfg.getDailyNum();
                var myNum = this.atkraceVo.info.num;
                if (myNum < maxCount) {
                    var countDownTime = this.atkraceVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                    if (countDownTime <= 0) {
                        flag = true;
                    }
                }
            }
        }
        return flag;
    };
    AtkraceVoApi.prototype.checkAndStartBattle = function () {
        //条件检测
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEBATTLEVIEW);
    };
    AtkraceVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.dieSidList = [{}, {}];
        this.atkraceVo = null;
    };
    return AtkraceVoApi;
}(BaseVoApi));
__reflect(AtkraceVoApi.prototype, "AtkraceVoApi");
