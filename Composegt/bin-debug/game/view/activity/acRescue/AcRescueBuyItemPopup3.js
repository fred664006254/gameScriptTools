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
var AcRescueBuyItemPopup3 = (function (_super) {
    __extends(AcRescueBuyItemPopup3, _super);
    function AcRescueBuyItemPopup3() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this._currVipNum = 0;
        _this.initView();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), _this.receivePushData, _this);
        return _this;
    }
    AcRescueBuyItemPopup3.prototype.initView = function () {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this); 
        var bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 540;
        bottomBg.height = 605;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
        // let list1: Array<number> = new Array();
        // for (var index = 0; index < 4; index++) {
        // 	list1.push(index)
        // }
        // let dataList =new Array<any>();
        // let cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
        // for (var index = 1; index < 4; index++) {
        // 	dataList.push(cfg.powerItemList[index.toString()]);
        // }
        var dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
        for (var index = 1; index < 20; index++) {
            if (cfg.shop[index.toString()]) {
                dataList.push(cfg.shop[index.toString()]);
            }
            else {
                break;
            }
        }
        // // let list = Config.WifebaseCfg.wifeGift;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, bottomBg.height - 35);
        this._scrollList = ComponentManager.getScrollList(AcRescueExScrollItem, dataList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 10, bottomBg.y + 20);
    };
    AcRescueBuyItemPopup3.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (this._currVipNum != Api.playerVoApi.getPlayerVipLevel()) {
                this._currVipNum = Api.playerVoApi.getPlayerVipLevel();
                // this._scrollList.refreshData(this._shopInfoVoList);
            }
        }
    };
    // 页签类型
    AcRescueBuyItemPopup3.prototype.getSheepType = function () {
        return 1;
    };
    AcRescueBuyItemPopup3.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        _super.prototype.dispose.call(this);
    };
    return AcRescueBuyItemPopup3;
}(BaseDisplayObjectContainer));
__reflect(AcRescueBuyItemPopup3.prototype, "AcRescueBuyItemPopup3");
