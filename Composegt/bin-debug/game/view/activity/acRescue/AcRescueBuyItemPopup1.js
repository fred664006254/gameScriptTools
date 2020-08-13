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
var AcRescueBuyItemPopup1 = (function (_super) {
    __extends(AcRescueBuyItemPopup1, _super);
    function AcRescueBuyItemPopup1() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this._currVipNum = 0;
        _this.initView();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), _this.receivePushData, _this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD), _this.refreshUI1, _this);
        return _this;
    }
    AcRescueBuyItemPopup1.prototype.initView = function () {
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
        var dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
        for (var index = 1; index < 4; index++) {
            var tmpdata = cfg.powerItemList[index.toString()];
            if (tmpdata && (tmpdata.costGem || tmpdata.costGold)) {
                dataList.push(tmpdata);
            }
        }
        // // let list = Config.WifebaseCfg.wifeGift;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, bottomBg.height - 160);
        this._scrollList = ComponentManager.getScrollList(AcRescueBuyItemScrollItem, dataList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 10, bottomBg.y + 20);
        var btmBg = BaseBitmap.create("public_tc_bg03");
        btmBg.width = 520;
        btmBg.height = 126;
        btmBg.y = this._scrollList.y + this._scrollList.height;
        btmBg.x = this._scrollList.x;
        this.addChild(btmBg);
        var tip1 = ComponentManager.getTextField(LanguageManager.getlocal("acRescueBuyItemTip1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tip1.setPosition(btmBg.x + btmBg.width / 2 - tip1.width / 2, btmBg.y + 30);
        tip1.width = 500;
        this.addChild(tip1);
        // let itemCfg = Config.ItemCfg.getItemCfgById(dataList[2].powerItem);
        // let tip2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acRescueBuyItemTip2",[itemCfg.name]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // tip2.setPosition(btmBg.x + btmBg.width/2-tip2.width/2,tip1.y + tip1.height + 10);
        // tip2.width = 500; 
        // this.addChild(tip2);
    };
    // private doBuy(event:egret.Event){
    // 	let data  = event.data;
    // 	this._index = data.index;
    // 	// if(this._index >= 3)
    // 	// {
    // 	// 	this.hide();
    // 	// 	return;
    // 	// }
    // 	NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYRESCUEITEM, { activeId:AcRescueBuyItemPopupView.aid+ "-"+ AcRescueBuyItemPopupView.code,itemKey:data.key});
    // }
    AcRescueBuyItemPopup1.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            // if(this._currVipNum != Api.playerVoApi.getPlayerVipLevel())
            // {
            // 	this._currVipNum = Api.playerVoApi.getPlayerVipLevel(); 
            // 	// this._scrollList.refreshData(this._shopInfoVoList);
            // }
            if (this._scrollList) {
                var dataList = new Array();
                var cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
                for (var index = 1; index < 4; index++) {
                    dataList.push(cfg.powerItemList[index.toString()]);
                }
                this._scrollList.refreshData(dataList);
            }
        }
    };
    AcRescueBuyItemPopup1.prototype.refreshUI1 = function (event) {
        var data = event.data;
        if (data.data.ret == 0) {
            //领取成功
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("dailyGiftFailure"));
        }
        if (this._scrollList) {
            var dataList = new Array();
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
            for (var index = 1; index < 4; index++) {
                dataList.push(cfg.powerItemList[index.toString()]);
            }
            this._scrollList.refreshData(dataList);
        }
    };
    // 页签类型
    AcRescueBuyItemPopup1.prototype.getSheepType = function () {
        return 1;
    };
    AcRescueBuyItemPopup1.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY,this.refreshUI2,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        ;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETRESCUEREWARD), this.refreshUI1, this);
        _super.prototype.dispose.call(this);
    };
    return AcRescueBuyItemPopup1;
}(BaseDisplayObjectContainer));
__reflect(AcRescueBuyItemPopup1.prototype, "AcRescueBuyItemPopup1");
