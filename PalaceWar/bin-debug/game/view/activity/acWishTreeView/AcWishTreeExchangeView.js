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
 * @class AcWishTreeExchangeView
 */
var AcWishTreeExchangeView = (function (_super) {
    __extends(AcWishTreeExchangeView, _super);
    function AcWishTreeExchangeView() {
        return _super.call(this) || this;
    }
    AcWishTreeExchangeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE), this.exchangeHandler, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._curownTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curownTxt.x = 8;
        this._curownTxt.y = 5;
        this._nodeContainer.addChild(this._curownTxt);
        var maskbg = BaseBitmap.create("public_9_bg23");
        maskbg.width = GameConfig.stageWidth;
        maskbg.height = GameConfig.stageHeigth - this.container.y - this._curownTxt.y - 30;
        maskbg.y = this._curownTxt.y + 35;
        this._nodeContainer.addChild(maskbg);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, maskbg.height - 8);
        var scrollList = ComponentManager.getScrollList(AcWishTreeExchangeItem, [], rect);
        scrollList.y = maskbg.y + 4;
        scrollList.x = 10;
        this._scrollList = scrollList;
        scrollList.bounces = false;
        this._nodeContainer.addChild(scrollList);
        this.refreshUI();
    };
    AcWishTreeExchangeView.prototype.refreshUI = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var acVo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        this._curownTxt.text = LanguageManager.getlocal("acWishTreeown", ["" + Api.itemVoApi.getItemNumInfoVoById("2102")]);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var list = cfg.getWishWifeIdList();
        this._scrollList.refreshData(list);
    };
    AcWishTreeExchangeView.prototype.exchangeHandler = function (event) {
        var rdata = event.data.data;
        if (rdata.ret != 0) {
            return;
        }
        this.refreshUI();
    };
    AcWishTreeExchangeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_EXCHANGEWIFE), this.exchangeHandler, this);
        this._nodeContainer = null;
        this._curownTxt = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcWishTreeExchangeView;
}(CommonView));
__reflect(AcWishTreeExchangeView.prototype, "AcWishTreeExchangeView");
//# sourceMappingURL=AcWishTreeExchangeView.js.map