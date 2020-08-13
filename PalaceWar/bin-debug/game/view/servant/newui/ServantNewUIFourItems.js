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
 * 门客详情new 突破部分
 * author shaoliang
 * date 2019/7/25
 * @class ServantNewUIFourItems
 */
var ServantNewUIFourItems = /** @class */ (function (_super) {
    __extends(ServantNewUIFourItems, _super);
    function ServantNewUIFourItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantNewUIFourItems.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW, this.refreshList, this);
        this._servantId = servantId;
        ServantInfoFourItemScrollItem.servantId = this._servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var auraList = servantcfg.aura;
        if (auraList) {
            var tarIdList = [];
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 42);
            var scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem, tarIdList, rect);
            scrollView.y = 30;
            scrollView.x = 24;
            this._scrollView = scrollView;
            this.addChild(scrollView);
            this.refreshList();
        }
        else {
            if (servantcfg.isOpenAuraBySkin()) {
                var tarIdList = [];
                var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 42);
                var scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem, tarIdList, rect);
                scrollView.y = 30;
                scrollView.x = 24;
                this._scrollView = scrollView;
                this.addChild(scrollView);
                this.refreshList();
            }
        }
    };
    ServantNewUIFourItems.prototype.refreshList = function () {
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var auraList = servantcfg.aura;
        var tarIdList = null;
        if (auraList) {
            var keysList = Object.keys(auraList);
            tarIdList = [keysList[0], keysList[1]];
            var auraId0 = keysList[0];
            var auraId1 = keysList[1];
            var auraId2 = keysList[2];
            var aura2Data = auraList[keysList[2]];
            var aura3Data = auraList[keysList[3]];
            if (aura2Data && Api.switchVoApi.checkOpenNewAura(aura2Data.auraIcon)) {
                var curData0 = auraList[auraId0];
                var curData1 = auraList[auraId1];
                var curData2 = auraList[auraId2];
                var servantObj = Api.servantVoApi.getServantObj(this._servantId);
                if (servantObj.aura[auraId0] >= curData0.maxLv && servantObj.aura[auraId1] >= curData1.maxLv) {
                    //光环3
                    tarIdList.push(keysList[2]);
                }
                if (aura3Data && (Api.switchVoApi.checkOpenNewAura(aura3Data.auraIcon) || Number(this._servantId) > 2018 || Number(this._servantId) < 2001)) {
                    if (servantObj.aura[auraId2] >= curData2.maxLv && Api.servantVoApi.checkAura4CanShow(this._servantId)) {
                        //光环4
                        tarIdList.push(keysList[3]);
                    }
                }
            }
        }
        if (servantcfg.isOpenAuraBySkin()) //把皮肤开启的光环加进去
         {
            if (!tarIdList) {
                tarIdList = [];
            }
            var skinList = Config.ServantskinCfg.getIdListBySerVantId(this._servantId);
            for (var i = 0; i < skinList.length; i++) {
                if (Api.servantVoApi.isOwnSkinOfSkinId(skinList[i])) {
                    var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinList[i]);
                    if (servantSkinCfg.specialAura) {
                        tarIdList.push(servantSkinCfg.id);
                    }
                }
            }
        }
        if (this._scrollView && tarIdList) {
            this._scrollView.refreshData(tarIdList);
            return;
        }
    };
    ServantNewUIFourItems.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW, this.refreshList, this);
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantNewUIFourItems;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=ServantNewUIFourItems.js.map