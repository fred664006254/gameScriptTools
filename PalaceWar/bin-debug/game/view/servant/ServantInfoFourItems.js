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
 * 门客详情 突破部分
 * author yanyuling
 * date 2017/11/21
 * @class ServantInfoFourItems
 */
var ServantInfoFourItems = (function (_super) {
    __extends(ServantInfoFourItems, _super);
    function ServantInfoFourItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._scrollView = null;
        return _this;
    }
    ServantInfoFourItems.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW, this.refreshList, this);
        this._servantId = servantId;
        ServantInfoFourItemScrollItem.servantId = this._servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var auraList = servantcfg.aura;
        if (!auraList) {
            return; //没有觉醒
        }
        var tarIdList = [];
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 120);
        var scrollView = ComponentManager.getScrollList(ServantInfoFourItemScrollItem, tarIdList, rect);
        scrollView.y = 90;
        scrollView.x = 24;
        this._scrollView = scrollView;
        this.addChild(scrollView);
        this.refreshList();
    };
    ServantInfoFourItems.prototype.refreshList = function () {
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var auraList = servantcfg.aura;
        if (!auraList) {
            return; //没有觉醒
        }
        var keysList = Object.keys(auraList);
        var tarIdList = [keysList[0], keysList[1]];
        var auraId0 = keysList[0];
        var auraId2 = keysList[2];
        var aura2Data = auraList[keysList[2]];
        if (aura2Data && Api.switchVoApi.checkOpenNewAura(aura2Data.auraIcon)) {
            var curData0 = auraList[auraId0];
            var auraId1 = keysList[1];
            var curData1 = auraList[auraId1];
            var servantObj = Api.servantVoApi.getServantObj(this._servantId);
            if (servantObj.aura[auraId0] >= curData0.maxLv && servantObj.aura[auraId1] >= curData1.maxLv) {
                tarIdList = keysList;
            }
        }
        if (this._scrollView) {
            this._scrollView.refreshData(tarIdList);
            return;
        }
    };
    ServantInfoFourItems.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVAMNT_AURA_NEW, this.refreshList, this);
        this._scrollView = null;
        this._servantId = null;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoFourItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoFourItems.prototype, "ServantInfoFourItems");
//# sourceMappingURL=ServantInfoFourItems.js.map