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
 * 门客详情 丹药信息部分
 * author yanyuling
 * date 2017/11/20
 * @class ServantInfoItems
 */
var ServantInfoItems = (function (_super) {
    __extends(ServantInfoItems, _super);
    function ServantInfoItems() {
        var _this = _super.call(this) || this;
        _this._servantId = null;
        _this._totalNum = 0;
        return _this;
    }
    ServantInfoItems.prototype.init = function (servantId, bottomH) {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_SERVANT, this.refreshListView, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE, this.refreshItemTipFromDispatch, this);
        this._servantId = servantId;
        var servantcfg = Config.ServantCfg.getServantItemById(this._servantId);
        var baseY = 87;
        var danyao = ComponentManager.getTextField(LanguageManager.getlocal("servantAttr_add2"), 26, TextFieldConst.COLOR_LIGHT_YELLOW); //BaseBitmap.create("servant_danyaoshuliang");  
        this.addChild(danyao);
        danyao.x = 230;
        danyao.y = baseY - danyao.height / 2;
        var itemTip = ComponentManager.getTextField("0", 26);
        this.addChild(itemTip);
        this._itemTip = itemTip;
        itemTip.x = danyao.x + danyao.width + 10;
        itemTip.y = baseY - itemTip.height / 2;
        var itemList = [1, 2, 3, 4];
        // let attItem = GameConfig.config.servantbaseCfg.attItem;
        for (var i = 0; i < itemList.length; ++i) {
            var equip = itemList[i];
            var equipQuality = Api.servantVoApi.getEquipQuality(servantId, equip);
            var equipLv = Api.servantVoApi.getEquipAddLv(servantId, equip);
            this._totalNum += Api.servantVoApi.getEquipAddAttr(equip, equipQuality, equipLv);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bottomH - 145 - 25);
        ServantInfoItemsScrollItem.servantId = this._servantId;
        var scrollView = ComponentManager.getScrollList(ServantInfoItemsScrollItem, itemList, rect);
        scrollView.x = 12;
        scrollView.y = 120;
        // scrollView.x = 24;
        this._scrollView = scrollView;
        this.addChild(scrollView);
        this.refreshItemTip();
    };
    ServantInfoItems.prototype.refreshItemTipFromDispatch = function (event) {
        var num = event.data;
        this.refreshItemTip(num);
    };
    ServantInfoItems.prototype.refreshItemTip = function (changeNum) {
        if (changeNum) {
            this._totalNum -= changeNum;
        }
        this._itemTip.text = this._totalNum + "";
    };
    ServantInfoItems.prototype.refreshListView = function () {
        var itemList = [1, 2, 3, 4];
        // let attItem = GameConfig.config.servantbaseCfg.attItem;
        this._totalNum = 0;
        for (var i = 0; i < itemList.length; ++i) {
            var equip = itemList[i];
            var equipQuality = Api.servantVoApi.getEquipQuality(this._servantId, equip);
            var equipLv = Api.servantVoApi.getEquipAddLv(this._servantId, equip);
            this._totalNum += Api.servantVoApi.getEquipAddAttr(equip, equipQuality, equipLv);
        }
        this._scrollView.refreshData(itemList);
        this._itemTip.text = this._totalNum + "";
        // let itemList = [];
        // let attItem = GameConfig.config.servantbaseCfg.attItem;
        // this._totalNum  = 0;
        // for (var index = 0; index < attItem.length; index++) {
        // 	let id = attItem[index];
        // 	let itemVO = Api.itemVoApi.getItemInfoVoById(id);
        // 	if(itemVO && itemVO.num > 0)
        // 	{
        // 		this._totalNum += itemVO.num;
        // 		itemList.push(itemVO);
        // 	}
        // }
        // this.refreshItemTip();
        // this._scrollView.refreshData(itemList);
    };
    ServantInfoItems.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_SERVANT, this.refreshListView, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRSH_SERVANT_ITEM_USE, this.refreshItemTipFromDispatch, this);
        this._servantId = null;
        this._scrollView = null;
        this._itemTip = null;
        this._totalNum = 0;
        _super.prototype.dispose.call(this);
    };
    return ServantInfoItems;
}(BaseDisplayObjectContainer));
__reflect(ServantInfoItems.prototype, "ServantInfoItems");
