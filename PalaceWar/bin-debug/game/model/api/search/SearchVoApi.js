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
var SearchVoApi = (function (_super) {
    __extends(SearchVoApi, _super);
    function SearchVoApi() {
        var _this = _super.call(this) || this;
        _this.buildInfoList = {};
        _this.wifeList = {};
        return _this;
    }
    SearchVoApi.prototype.formatData = function (data) {
        _super.prototype.formatData.call(this, data);
    };
    SearchVoApi.prototype.checkNpcMessage = function () {
        return this.getSearchNum() > 0;
    };
    /**
     * 根据personid获取红颜获取进度
     * @param personId
     */
    SearchVoApi.prototype.getWifeValueById = function (personId) {
        var itmVo = this.searchVo.info[personId];
        if (itmVo) {
            return itmVo.progress;
        }
        return 0;
    };
    SearchVoApi.prototype.getNeedItem = function () {
        return Config.SearchbaseCfg.needItem;
    };
    SearchVoApi.prototype.getSearchNum = function () {
        return this.searchVo.searchNum;
    };
    SearchVoApi.prototype.getLeftTime = function () {
        return this.searchVo.leftTime;
    };
    SearchVoApi.prototype.getSearchNumLocalStr = function () {
        var str;
        if (this.getSearchNum() < 1) {
            str = LanguageManager.getlocal("searchViewLeftNumDesc", [App.DateUtil.getFormatBySecond(this.getLeftTime(), 1)]);
        }
        else {
            str = LanguageManager.getlocal("searchViewLeftNumDesc", [Api.searchVoApi.getSearchNum().toString() + "/" + Api.searchVoApi.getMaxSearchNum().toString()]);
        }
        return str;
    };
    /**
     * 获取当前寻访次数最大值
     */
    SearchVoApi.prototype.getMaxSearchNum = function () {
        return this.searchVo.maxSearchNum;
    };
    SearchVoApi.prototype.getPersonListByBuildId = function (buildId) {
        var buildIdStr = String(buildId);
        if (buildIdStr == "5") {
            this.buildInfoList[buildIdStr] = null;
        }
        if (this.buildInfoList[buildIdStr] == null) {
            var buildInfoItemList = [];
            var buildInfoArr = Config.SearchCfg.getPersonItemCfgListByBuildId(buildId);
            for (var key in buildInfoArr) {
                var value = buildInfoArr[key];
                if (buildId == 5 && value.unlock && value.unlock["needVip"]) {
                    var needVip = value.unlock["needVip"];
                    var openVipNum = Api.vipVoApi.getMaxbtnNum();
                    if (openVipNum >= needVip) {
                        this.getInfoItemList(value, buildInfoItemList);
                    }
                }
                else {
                    this.getInfoItemList(value, buildInfoItemList);
                }
            }
            this.buildInfoList[buildIdStr] = buildInfoItemList;
        }
        return this.buildInfoList[buildIdStr];
    };
    SearchVoApi.prototype.getInfoItemList = function (value, buildInfoItemList) {
        var itemVo = new SearchBuildInfoItemVo();
        itemVo.initData(value.personId);
        buildInfoItemList.push(itemVo);
        if (value.wifeId) {
            this.wifeList[value.wifeId] = itemVo;
        }
    };
    /**
     * 获取当前运势值
     */
    SearchVoApi.prototype.getCurLuckNum = function () {
        var curLuckNum = 0;
        if (this.searchVo) {
            var resAddMax = Config.SearchbaseCfg.resAddMax;
            var now = GameData.serverTime;
            //当前已满有可能超过90
            var needTime = Config.SearchbaseCfg.luckNeedTime;
            var fixNum = Math.floor((now - this.searchVo.lucky.st) / needTime);
            curLuckNum = Math.min(Math.max(resAddMax, this.searchVo.lucky.num), this.searchVo.lucky.num + fixNum);
        }
        return curLuckNum;
    };
    /**
     * 获取当前VIP剩余免费次数
     */
    SearchVoApi.prototype.getSearchLuckFreeNum = function () {
        return Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).searchLuckFree - this.getSearchLuckUsedFreeNum();
    };
    SearchVoApi.prototype.getSearchLuckUsedFreeNum = function () {
        return this.searchVo ? this.searchVo.lucky.vipfree : 0;
    };
    /**
     * 运势值上限
     */
    SearchVoApi.prototype.getMaxLuckNum = function () {
        return Config.SearchbaseCfg.luckMax;
    };
    SearchVoApi.prototype.getMaxLuckByType = function (type) {
        if (type == this.getDonateTypes()[2]) {
            return this.getMaxLuckNum();
        }
        else {
            return Config.SearchbaseCfg.resAddMax;
        }
    };
    SearchVoApi.prototype.getAutosetValue = function () {
        return this.searchVo ? this.searchVo.lucky.autoset : 0;
    };
    SearchVoApi.prototype.getFoodOpen = function () {
        return this.searchVo ? this.searchVo.lucky.foodopen : 0;
    };
    SearchVoApi.prototype.getGoldOpen = function () {
        return this.searchVo ? this.searchVo.lucky.goldopen : 0;
    };
    SearchVoApi.prototype.getDonateTypes = function () {
        return [ItemEnums[2], ItemEnums[3], ItemEnums[1]];
    };
    SearchVoApi.prototype.getDonateCost = function (type) {
        if (type == this.getDonateTypes()[2]) {
            return Config.SearchbaseCfg.getGemCostByLuck(this.getCurLuckNum());
        }
        else {
            var curNum = this.searchVo ? this.searchVo.lucky.buynum : 0;
            return (curNum + 1) * Config.SearchbaseCfg.resCost;
        }
    };
    SearchVoApi.prototype.checkCostEnough = function (type, showTip) {
        if (type == "food") {
            if (Api.playerVoApi.getFood() < this.getDonateCost(type)) {
                if (showTip) {
                    App.CommonUtil.showTip(Config.RewardCfg.getNotEnoughLocalTip(ItemEnums[type]));
                }
                return false;
            }
        }
        else if (type == "gold") {
            if (Api.playerVoApi.getPlayerGold() < this.getDonateCost(type)) {
                if (showTip) {
                    App.CommonUtil.showTip(Config.RewardCfg.getNotEnoughLocalTip(ItemEnums[type]));
                }
                return false;
            }
        }
        else if (type == "gem") {
            if (Api.playerVoApi.getPlayerGem() < this.getDonateCost(type)) {
                if (showTip) {
                    App.CommonUtil.showTip(Config.RewardCfg.getNotEnoughLocalTip(ItemEnums[type]));
                }
                return false;
            }
        }
        return true;
    };
    SearchVoApi.prototype.getPersonValueLocalStr = function (personId) {
        var itemCfg = Config.SearchCfg.getPersonItemCfgByPersonId(personId);
        if (itemCfg.wifeId && itemCfg.value) {
            var value = Api.searchVoApi.getWifeValueById(personId) / itemCfg.value;
            var descStr = "";
            if (value <= 0.3) {
                descStr = "searchWifeDesc1";
            }
            else if (value > 0.3 && value <= 0.6) {
                descStr = "searchWifeDesc2";
            }
            else if (value > 0.6 && value < 1) {
                descStr = "searchWifeDesc3";
            }
            else if (value) {
                descStr = "searchWifeDesc4";
            }
            return LanguageManager.getlocal(descStr, [itemCfg.name]);
        }
        return "";
    };
    SearchVoApi.prototype.isShowNpc = function () {
        return Api.playerVoApi.getPlayerLevel() >= Config.SearchbaseCfg.needLv;
    };
    SearchVoApi.prototype.getLockedString = function () {
        return LanguageManager.getlocal("reachLvelUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(Config.SearchbaseCfg.needLv)]);
    };
    /**
     * 检测是否可以一键寻访了
     */
    SearchVoApi.prototype.checkOneKey = function () {
        return Api.playerVoApi.getPlayerVipLevel() >= this.getOneKeyNeedVipLevel();
    };
    /**
     * 获取一键寻访需要的条件
     */
    SearchVoApi.prototype.getOneKeyNeedVipLevel = function () {
        return Config.SearchbaseCfg.needVip;
    };
    SearchVoApi.prototype.openMainView = function () {
        if (this.isShowNpc()) {
            ViewController.getInstance().openView(App.StringUtil.firstCharToUper(this.getModeName()) + "View");
        }
    };
    return SearchVoApi;
}(BaseVoApi));
__reflect(SearchVoApi.prototype, "SearchVoApi");
//# sourceMappingURL=SearchVoApi.js.map