var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 红颜对战
 * author jiangly
 * date 2018/08/13
 * @class WifebattleVoApi
 */
var WifebattleVoApi = /** @class */ (function (_super) {
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
        var needScore = cfg.costScore; //cfg.getNeedScoreByNum(Api.dailybossVoApi.getShopItemByNum(id));
        return needScore;
    };
    WifebattleVoApi.prototype.checkNpcMessage = function () {
        var flag = false;
        if (!this.isShowNpc()) {
            return flag;
        }
        if (this.wifebattleVo.checkHaveSearchCount() && this.wifebattleVo.checkCanCDSearch()) {
            flag = true;
        }
        if (this.wifebattleVo.checkHaveEnemy()) {
            flag = true;
        }
        var statusNum = Api.wifestatusVoApi.getStatusWifeNum();
        var itemHaveNum = Api.itemVoApi.getItemNumInfoVoById(Config.WifebattleCfg.costItem);
        var curLv = this.wifebattleVo.info.ylinfo ? this.wifebattleVo.info.ylinfo.lv : 0;
        var dataList = Config.WifebattleCfg.getWifeStudyCfgList();
        for (var i in dataList) {
            var needStatusNum = dataList[i].unlock;
            var itemNeedNum = dataList[i].costNum;
            if (statusNum >= needStatusNum && itemHaveNum >= itemNeedNum && (Number(i) + 1) > curLv) {
                flag = true;
                break;
            }
        }
        return flag;
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
    WifebattleVoApi.prototype.isBaseWifeBattleOpen = function () {
        if (Api.playerVoApi.getPlayerLevel() >= 3) {
            var b = false;
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                if (Api.unlocklist2VoApi.checkIsCanShowFunc("wifebattle")) {
                    b = true;
                }
            }
            else {
                b = true;
            }
            if (b && Api.wifebattleVoApi.checkCanJoin()) {
                return true;
            }
            else {
                return false;
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
            returnStr = LanguageManager.getlocal("wifeBattleUpLockDesc", [Config.WifebattleCfg.unlock_wifeStar.toString()]); //LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]);
        }
        return returnStr;
    };
    WifebattleVoApi.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifebattleVoApi;
}(BaseVoApi));
//# sourceMappingURL=WifebattleVoApi.js.map