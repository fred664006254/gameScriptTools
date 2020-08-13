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
 * 红颜对战
 * author jiangly
 * date 2018/08/13
 * @class WifebattleVoApi
 */
var WifebattleVoApi = (function (_super) {
    __extends(WifebattleVoApi, _super);
    function WifebattleVoApi() {
        return _super.call(this) || this;
    }
    WifebattleVoApi.prototype.formatData = function (data) {
        if (this.wifebattleVo == null) {
            this.wifebattleVo = new WifebattleVo();
        }
        this.wifebattleVo.initData(data);
        _super.prototype.formatData.call(this, data);
    };
    WifebattleVoApi.prototype.getShopItemByNum = function (id) {
        return (this.wifebattleVo && this.wifebattleVo.info.shop[id]) ? this.wifebattleVo.info.shop[id] : 0;
    };
    WifebattleVoApi.prototype.getShopItemNeedScore = function (id) {
        var cfg = Config.WifebattleCfg.getShopItemById(id);
        var needScore = cfg.cost; //cfg.getNeedScoreByNum(Api.dailybossVoApi.getShopItemByNum(id));
        return needScore;
    };
    WifebattleVoApi.prototype.checkNpcMessage = function () {
        return false;
    };
    WifebattleVoApi.prototype.getScore = function () {
        return this.wifebattleVo ? this.wifebattleVo.rewardnum : 0;
    };
    WifebattleVoApi.prototype.isShowNpc = function () {
        // return true;
        return Api.switchVoApi.checkOpenWifeBattle() && this.checkCanJoin();
    };
    //检测是否有红颜获得位分
    WifebattleVoApi.prototype.checkCanJoin = function () {
        var wifestatusVoObj = Api.wifestatusVoApi.getWifestatusVo().info;
        var unlockCount = Config.WifebattleCfg.unlock_wifeStar;
        var curCount = 0;
        for (var key in wifestatusVoObj) {
            for (var index = 0; index < wifestatusVoObj[key].length; index++) {
                curCount++;
                if (curCount >= unlockCount) {
                    return true;
                }
            }
        }
        return false;
    };
    WifebattleVoApi.prototype.getLockedString = function () {
        var returnStr = "";
        if (Api.switchVoApi.checkOpenWifeBattle() == false) {
            returnStr = LanguageManager.getlocal("sysWaitOpen");
        }
        else {
            returnStr = LanguageManager.getlocal("wifeBattleUpLockDesc"); //LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]);
        }
        return returnStr;
    };
    WifebattleVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifebattleVoApi;
}(BaseVoApi));
__reflect(WifebattleVoApi.prototype, "WifebattleVoApi");
