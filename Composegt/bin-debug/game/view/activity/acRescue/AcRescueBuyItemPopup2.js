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
var AcRescueBuyItemPopup2 = (function (_super) {
    __extends(AcRescueBuyItemPopup2, _super);
    function AcRescueBuyItemPopup2() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this._shopid = 0;
        _this._currVipNum = 0;
        _this.initView();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), _this.receivePushData, _this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM), _this.refreshUI3, _this);
        return _this;
    }
    AcRescueBuyItemPopup2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY, this.refreshUI2, this);
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
            dataList.push(cfg.powerItemList[index.toString()]);
        }
        // // let list = Config.WifebaseCfg.wifeGift;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, bottomBg.height - 170);
        this._scrollList = ComponentManager.getScrollList(AcRescueBuyItemCangkuScrollItem, dataList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 10, bottomBg.y + 20);
        var btmBg = BaseBitmap.create("public_tc_bg03");
        btmBg.width = 520;
        btmBg.height = 126;
        btmBg.y = this._scrollList.y + this._scrollList.height + 10;
        btmBg.x = this._scrollList.x;
        this.addChild(btmBg);
        var itemCfg = Config.ItemCfg.getItemCfgById(dataList[0].powerItem);
        var tip1 = ComponentManager.getTextField(LanguageManager.getlocal("acRescueUseItemTip1", [itemCfg.name]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tip1.width = 500;
        tip1.setPosition(btmBg.x + btmBg.width / 2 - tip1.width / 2, btmBg.y + btmBg.height / 2 - tip1.height / 2);
        tip1.width = 500;
        this.addChild(tip1);
    };
    AcRescueBuyItemPopup2.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.cmd == NetPushConst.PUSH_PAY) {
            if (this._currVipNum != Api.playerVoApi.getPlayerVipLevel()) {
                this._currVipNum = Api.playerVoApi.getPlayerVipLevel();
                // this._scrollList.refreshData(this._shopInfoVoList);
            }
        }
    };
    AcRescueBuyItemPopup2.prototype.refreshUI2 = function () {
        if (this._scrollList) {
            var dataList = new Array();
            var cfg = Config.AcCfg.getCfgByActivityIdAndCode("rescue", AcRescueBuyItemPopupView.code);
            for (var index = 1; index < 4; index++) {
                dataList.push(cfg.powerItemList[index.toString()]);
            }
            this._scrollList.refreshData(dataList);
        }
    };
    AcRescueBuyItemPopup2.prototype.refreshUI3 = function (event) {
        var data = event.data;
        if (data.data.ret == 0) {
            if (data.data.data.addPower) {
                var str = LanguageManager.getlocal("sysStrengDesc") + "+" + data.data.data.addPower;
                // App.CommonUtil.showTip(str);
                /**
                 * 飘起经验
                 */
                var strList = [];
                strList.push({ tipMessage: str });
                App.CommonUtil.playRewardFlyAction(strList);
                // egret.setTimeout( ()=>{
                // },this,800)
            }
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
    AcRescueBuyItemPopup2.prototype.getSheepType = function () {
        return 1;
    };
    AcRescueBuyItemPopup2.prototype.dispose = function () {
        this._scrollList = null;
        this._shopInfoVoList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SHOP_NEXTDAY, this.refreshUI2, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY), this.receivePushData, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_USERESCUEITEM), this.refreshUI3, this);
        _super.prototype.dispose.call(this);
    };
    return AcRescueBuyItemPopup2;
}(BaseDisplayObjectContainer));
__reflect(AcRescueBuyItemPopup2.prototype, "AcRescueBuyItemPopup2");
