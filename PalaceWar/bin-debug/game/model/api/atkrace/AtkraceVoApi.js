/**
 * 擂台api
 * author shaoliang
 * date 2017/11/23
 * @class AtkraceVoApi
 */
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
var AtkraceVoApi = /** @class */ (function (_super) {
    __extends(AtkraceVoApi, _super);
    function AtkraceVoApi() {
        var _this = _super.call(this) || this;
        _this.revengeIdx = 0;
        _this._inithand = false;
        return _this;
    }
    /**
     * 战斗信息
     */
    AtkraceVoApi.prototype.getMyFightInfo = function () {
        return this.atkraceVo.ainfo;
    };
    /**
     * 武馆信息息
     */
    AtkraceVoApi.prototype.getMyInfo = function () {
        return this.atkraceVo.info;
    };
    AtkraceVoApi.prototype.isShowNpc = function () {
        return Api.servantVoApi.getServantCountLevel60Plus() >= 1 && Api.servantVoApi.getServantCount() >= Config.AtkraceCfg.getUnlock();
        // return true;
    };
    /**
     * 当前是否可以打开 擂台view， 如果已开启可以打开
     */
    AtkraceVoApi.prototype.getOpenViewMessage = function () {
        if (!this.isShowNpc()) {
            return this.getLockedString();
        }
        else {
            if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
                if (Api.unlocklist2VoApi.isInNeedShowEffect("atkrace")) {
                    return this.getLockedString();
                }
            }
        }
        return null;
    };
    AtkraceVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("atkraceUnlcok", [Config.AtkraceCfg.getUnlock().toString()]);
    };
    AtkraceVoApi.prototype.getPoint = function () {
        return this.atkraceVo.point;
    };
    AtkraceVoApi.prototype.getRewardc = function () {
        return this.atkraceVo.rewardc;
    };
    AtkraceVoApi.prototype.getLastKillerInfo = function () {
        return this.atkraceVo.info.lastKillerInfo;
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
                var countDownTime = this.atkraceVo.info.lasttime + Config.AtkraceCfg.getIntervalTime() - GameData.serverTime;
                if ((myNum < maxCount && countDownTime <= 0)) {
                    flag = true;
                }
            }
            //门客名望
            if (Api.switchVoApi.checkServantFame() && this.checkHaveServantCanUpFame()) {
                flag = true;
            }
        }
        return flag;
    };
    //门客免战
    AtkraceVoApi.prototype.checkHaveAvoidServant = function () {
        var idList = Api.servantVoApi.getServantInfoIdListWithSort(1);
        for (var i = 0, j = idList.length; i < j; i++) {
            if (Config.ServantCfg.checkCanAvoidAtkrace(idList[i])) {
                return true;
            }
        }
        return false;
    };
    //门客免战红点
    AtkraceVoApi.prototype.checkOpenAvoidReddot = function () {
        var idList = Api.servantVoApi.getServantInfoIdListWithSort(1);
        for (var i = 0, j = idList.length; i < j; i++) {
            if (Config.ServantCfg.checkCanAvoidAtkrace(idList[i])) {
                if (!Api.servantVoApi.getServantObj(idList[i]).avoid) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 获取门客名望列表
     */
    AtkraceVoApi.prototype.getServantListByFame = function () {
        var list = {};
        var servantInfoList = Api.servantVoApi.getServantInfoList();
        for (var key in servantInfoList) {
            var servantItem = servantInfoList[key];
            // servantItem.fameLv = Math.floor(Math.random()*13);
            if (servantItem.fameLv && servantItem.fameLv > 0) {
                list[servantItem.fameLv] = list[servantItem.fameLv] || [];
                list[servantItem.fameLv].push(servantItem.servantId);
            }
        }
        return list;
    };
    /**
     * 检测门客名望是否可升级
    */
    AtkraceVoApi.prototype.checkServantCanUpFame = function (servantId) {
        var servantInfo = Api.servantVoApi.getServantObj(servantId);
        var nowFame = servantInfo.fame;
        var fameLv = servantInfo.fameLv || 1;
        var curNeedFame = Config.AtkraceCfg.getNeedFameBylevel(fameLv);
        if (fameLv < Config.AtkraceCfg.getFameList().length && nowFame >= curNeedFame) {
            return true;
        }
        return false;
    };
    /**
     * 检测是否有可升级名望的门客
    */
    AtkraceVoApi.prototype.checkHaveServantCanUpFame = function () {
        if (this.getCanUpFameServantIdList() && this.getCanUpFameServantIdList().length > 0) {
            return true;
        }
        return false;
    };
    /**
 * 检测是否有可升级名望的门客
*/
    AtkraceVoApi.prototype.getCanUpFameServantIdList = function () {
        var idList = [];
        var servantList = Api.servantVoApi.getServantInfoList();
        for (var key in servantList) {
            if (servantList.hasOwnProperty(key)) {
                var element = servantList[key];
                if (this.checkServantCanUpFame(element.servantId)) {
                    idList.push(element.servantId);
                }
            }
        }
        return idList;
    };
    //根据type获取门课名望攻击力加成
    AtkraceVoApi.prototype.getFameTotalAddAtkByType = function (attrType) {
        var totalAtk = 0;
        var servantList = Api.servantVoApi.getServantInfoList();
        for (var key in servantList) {
            if (servantList.hasOwnProperty(key)) {
                var element = servantList[key];
                var fameCfg = Config.AtkraceCfg.getFameCfgBylevel(element.fameLv);
                if (fameCfg.att1Type == attrType) {
                    totalAtk += fameCfg.att1;
                }
            }
        }
        if (attrType === 2) {
            totalAtk = totalAtk * 100;
        }
        return totalAtk;
    };
    //获取门课名望暴击伤害加成
    AtkraceVoApi.prototype.getFameTotalAddCrt = function () {
        var totalCrt = 0;
        var servantList = Api.servantVoApi.getServantInfoList();
        for (var key in servantList) {
            if (servantList.hasOwnProperty(key)) {
                var element = servantList[key];
                var fameCfg = Config.AtkraceCfg.getFameCfgBylevel(element.fameLv);
                if (fameCfg.att2) {
                    totalCrt += fameCfg.att2 * 100;
                }
            }
        }
        return totalCrt;
    };
    Object.defineProperty(AtkraceVoApi.prototype, "inithand", {
        get: function () {
            return this._inithand;
        },
        enumerable: true,
        configurable: true
    });
    AtkraceVoApi.prototype.setInitHand = function (flag) {
        this._inithand = flag;
    };
    AtkraceVoApi.prototype.getDecreePolicyAddAttrInfo = function () {
        return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace", 5);
    };
    AtkraceVoApi.prototype.dateErrorHandle = function () {
        var atkraceView = ViewController.getInstance().getView(ViewConst.COMMON.ATKRACEVIEW);
        if (atkraceView) {
            atkraceView.refreshServant();
        }
        var rewardPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEREWARDPOPUPVIEW);
        if (rewardPopupView) {
            rewardPopupView.hide();
        }
        var autoFightPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEAUTOFIGHTPOPUPVIEW);
        if (autoFightPopupView) {
            autoFightPopupView.hide();
        }
        var buyPopupView = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEBUYPOPUPVIEW);
        if (buyPopupView) {
            buyPopupView.hide();
        }
        var agreePopupDialog = ViewController.getInstance().getView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW);
        if (agreePopupDialog) {
            agreePopupDialog.hide();
        }
        var arrestView = ViewController.getInstance().getView(ViewConst.COMMON.ATKRACEARRESTVIEW);
        if (arrestView) {
            arrestView.hide();
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("atkracedesErrorTip"));
    };
    AtkraceVoApi.prototype.dispose = function () {
        this.revengeIdx = 0;
        this._inithand = false;
        _super.prototype.dispose.call(this);
    };
    return AtkraceVoApi;
}(BaseVoApi));
//# sourceMappingURL=AtkraceVoApi.js.map