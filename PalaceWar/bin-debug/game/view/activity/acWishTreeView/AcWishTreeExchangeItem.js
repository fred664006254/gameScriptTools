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
 * 红颜许愿兑换
 * author yanyuling
 * date 2018/03/13
 * @class AcWishTreeExchangeItem
 */
var AcWishTreeExchangeItem = (function (_super) {
    __extends(AcWishTreeExchangeItem, _super);
    function AcWishTreeExchangeItem() {
        var _this = _super.call(this) || this;
        _this._cfgData = null;
        return _this;
    }
    AcWishTreeExchangeItem.prototype.initItem = function (index, data) {
        this._cfgData = data;
        var wifeId = this._cfgData.wifeId;
        var bg = BaseBitmap.create("wishtree_listbg");
        this.addChild(bg);
        var nameTxt = ComponentManager.getTextField("", 22);
        nameTxt.width = 25;
        nameTxt.multiline = true;
        nameTxt.lineSpacing = 4;
        nameTxt.text = LanguageManager.getlocal("wifeName_" + wifeId);
        nameTxt.x = 32;
        nameTxt.y = 90 - nameTxt.height / 2;
        this.addChild(nameTxt);
        var headImg = BaseLoadBitmap.create("wife_half_" + wifeId);
        headImg.width = 205;
        headImg.height = 196;
        headImg.anchorOffsetY = headImg.height;
        headImg.setScale(0.9);
        headImg.x = 100;
        headImg.y = bg.y + bg.height - 7;
        this.addChild(headImg);
        var costTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        costTxt.text = LanguageManager.getlocal("acWishTreeCost", ["" + this._cfgData.needNum]);
        costTxt.x = 510 - costTxt.width / 2;
        costTxt.y = 80;
        this.addChild(costTxt);
        var exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "exchange", this.exchangeBtnHandler, this);
        exchangeBtn.x = 435;
        exchangeBtn.y = 110;
        this.addChild(exchangeBtn);
        this.checkMask();
    };
    AcWishTreeExchangeItem.prototype.checkMask = function () {
        if (Api.wifeVoApi.getWifeInfoVoById(this._cfgData.wifeId)) {
            var mask = BaseBitmap.create("wishtree_mask");
            mask.touchEnabled = true;
            this.addChild(mask);
            var wishtree_get = BaseBitmap.create("wishtree_get");
            wishtree_get.x = mask.width / 2 - wishtree_get.width / 2;
            wishtree_get.y = mask.height / 2 - wishtree_get.height / 2;
            this.addChild(wishtree_get);
        }
    };
    AcWishTreeExchangeItem.prototype.exchangeBtnHandler = function () {
        if (Api.wifeVoApi.getWifeInfoVoById(this._cfgData.wifeId)) {
            return;
        }
        var itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        if (itemNum < this._cfgData.needNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acWishTreeExchangeTip1"));
            return;
        }
        if (Api.wifeVoApi.getWifeInfoVoById(this._cfgData.wifeId)) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode("wishTree");
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE, { activeId: vo.aidAndCode, shopId: this._cfgData.id });
    };
    AcWishTreeExchangeItem.prototype.dispose = function () {
        this._cfgData = null;
        _super.prototype.dispose.call(this);
    };
    return AcWishTreeExchangeItem;
}(ScrollListItem));
__reflect(AcWishTreeExchangeItem.prototype, "AcWishTreeExchangeItem");
//# sourceMappingURL=AcWishTreeExchangeItem.js.map