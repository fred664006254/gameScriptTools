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
var ManageVoApi = (function (_super) {
    __extends(ManageVoApi, _super);
    function ManageVoApi() {
        return _super.call(this) || this;
    }
    ManageVoApi.prototype.formatData = function (data) {
        _super.prototype.formatData.call(this, data);
        if (!this._affairVo) {
            this._affairVo = new AffairVo();
        }
        this._affairVo.initData(data);
    };
    ManageVoApi.prototype.isShowNpc = function () {
        // return Api.playerVoApi.getPlayerLevel()>=Config.WifebaseCfg.unlockLv;
        if (Api.rookieVoApi.isInGuiding && Api.rookieVoApi.guideId < 18) {
            return false;
        }
        return true;
    };
    ManageVoApi.prototype.formatAutoRes = function (data) {
        if (!this._autoResVo) {
            this._autoResVo = new AutoResVo();
        }
        this._autoResVo.initData(data);
    };
    ManageVoApi.prototype.resetAutoRes = function () {
        if (this._autoResVo) {
            this._autoResVo.reset();
        }
    };
    ManageVoApi.prototype.checkAutoRes = function () {
        return Api.playerVoApi.getPlayerLevel() >= Config.ManageCfg.needLv || Api.playerVoApi.getPlayerVipLevel() >= Config.ManageCfg.needVip;
    };
    ManageVoApi.prototype.getAutoGold = function () {
        return this._autoResVo.gold;
    };
    ManageVoApi.prototype.getAutoFood = function () {
        return this._autoResVo.food;
    };
    ManageVoApi.prototype.getAutoSoldier = function () {
        return this._autoResVo.soldier;
    };
    /**
     * 获取经营列表，已排序
     */
    ManageVoApi.prototype.getManageItemsVo = function () {
        return this.manageVo.itemsVo;
    };
    /**
     * 获取经营 是否可以一键经营
     */
    ManageVoApi.prototype.isOnekeyManage = function () {
        if (this.manageVo.itemsVo && this.manageVo.itemsVo.length > 0) {
            var l = this.manageVo.itemsVo.length;
            var i = 0;
            for (i; i < l; i++) {
                if (this.manageVo.itemsVo[i].num > 0) {
                    return 0;
                }
                if (this.manageVo.itemsVo[0].num == 0 && this.manageVo.itemsVo[1].num == 0 && Api.playerVoApi.getFood() <= 0) {
                    return 1;
                }
            }
            return 2;
        }
    };
    /**
     * 获取可以获得的粮草
     */
    ManageVoApi.prototype.getReapFood = function () {
        return Math.floor(Api.playerVoApi.getPolitics());
    };
    /**
     * 获取可以获得的商产
     */
    ManageVoApi.prototype.getReapGold = function () {
        return Math.floor(Api.playerVoApi.getInte());
    };
    /**
     * 获取可以招募的士兵数量
     */
    ManageVoApi.prototype.getReapSoldier = function () {
        return Math.min(Math.floor(Api.playerVoApi.getCharm()), Api.playerVoApi.getFood() / Config.ManageCfg.needFood);
    };
    /**
     * 获取需要的粮草数
     */
    ManageVoApi.prototype.getNeedFood = function () {
        return this.getReapSoldier() * Config.ManageCfg.needFood;
    };
    ManageVoApi.prototype.getManageNeedTime = function () {
        var allValue = Api.playerVoApi.getInte() + Api.playerVoApi.getPolitics() + Api.playerVoApi.getCharm();
        return Config.ManageCfg.getManageNeedTime(allValue);
    };
    ManageVoApi.prototype.getNeedItem = function () {
        return String(Config.ManageCfg.needItem);
    };
    /**
     * 检测是否弹板显示自动经营资源奖励
     * @param type  "1"挂机  "2"离线
     */
    ManageVoApi.prototype.checkAndShowAutoReward = function (type) {
        if (this._autoResVo && this._autoResVo.notice) {
            ViewController.getInstance().openView(ViewConst.POPUP.AUTORESPOPUPVIEW, { type: type });
        }
    };
    ManageVoApi.prototype.getAffairST = function () {
        return this._affairVo.st;
    };
    ManageVoApi.prototype.getCurAffairOpt = function () {
        return this._affairVo.opt;
    };
    ManageVoApi.prototype.getCurAffairNums = function () {
        //检测可用的真实次数
        if (this._affairVo.num == 0) {
            var deltaT = GameData.serverTime;
            var count = Math.floor((deltaT - this.getAffairST()) / GameConfig.config.affairCfg['needTime']);
            var totalNum = Config.LevelCfg.getCfgByLevel(Api.playerVoApi.getPlayerLevel().toString()).affair;
            count += this._affairVo.num;
            if (count > totalNum)
                count = totalNum;
            this._affairVo.num = count;
        }
        return this._affairVo.num;
    };
    ManageVoApi.prototype.setCurAffairNums = function (num) {
        this._affairVo.num = num;
    };
    ManageVoApi.prototype.checkNpcMessage = function () {
        if (Api.practiceVoApi.isPracticeBuildingUnlock() && Api.practiceVoApi.isStoregeFull()) {
            return true;
        }
        var result = false;
        var manageList = Api.manageVoApi.getManageItemsVo();
        var l = manageList.length;
        for (var i = 0; i < l; i++) {
            if (manageList[i].needRefresh) {
                // result=LanguageManager.getlocal("sceneManageNpcTipMessage");
                result = true;
                break;
            }
        }
        return result;
    };
    ManageVoApi.prototype.checkAffairNpcMessage = function () {
        var result = "";
        if (this.getCurAffairNums() > 0) {
            result = LanguageManager.getlocal("sceneAffairNpcTipMessage");
        }
        return result;
    };
    ManageVoApi.prototype.getDecreePolicyAddAttrInfo = function (type) {
        if (type == "food") {
            return Api.promoteVoApi.getDecreePolicyAddAttrInfo("manage", 2);
        }
        else if (type == "gold") {
            return Api.promoteVoApi.getDecreePolicyAddAttrInfo("manage", 1);
        }
        else if (type == "soldier") {
            return Api.promoteVoApi.getDecreePolicyAddAttrInfo("manage", 3);
        }
    };
    ManageVoApi.prototype.dispose = function () {
        if (this._affairVo) {
            this._affairVo.dispose();
            this._affairVo = null;
        }
        _super.prototype.dispose.call(this);
        this.manageVo = null;
    };
    return ManageVoApi;
}(BaseVoApi));
__reflect(ManageVoApi.prototype, "ManageVoApi");
//# sourceMappingURL=ManageVoApi.js.map