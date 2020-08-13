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
 * 购买道具
 * author dky
 * date 2017/11/21
 * @class AcPunishBuyItemPopupView
 */
var AcPunishBuyItemPopupView = (function (_super) {
    __extends(AcPunishBuyItemPopupView, _super);
    function AcPunishBuyItemPopupView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    AcPunishBuyItemPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM, this.doBuy, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshHandler, this);
        //亲密度
        var icon1Bg = BaseBitmap.create("public_9_resbg");
        icon1Bg.x = 20 + GameData.popupviewOffsetX;
        icon1Bg.y = 15;
        this.addChildToContainer(icon1Bg);
        var icon1 = BaseLoadBitmap.create("itemicon1");
        icon1.setScale(0.5);
        icon1.x = icon1Bg.x - 3;
        icon1.y = icon1Bg.y + icon1Bg.height / 2 - 100 / 2 + 25;
        this.addChildToContainer(icon1);
        var gem = Api.playerVoApi.getPlayerGemStr();
        this._text1 = ComponentManager.getTextField(gem, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._text1.x = icon1Bg.x + 50;
        this._text1.y = icon1Bg.y + icon1Bg.height / 2 - this._text1.height / 2;
        this.addChildToContainer(this._text1);
        var addGoldBtn = ComponentManager.getButton("mainui_btn1", "", this.addGoldBtnClickHandler, this);
        addGoldBtn.x = icon1Bg.x + icon1Bg.width - 15;
        addGoldBtn.y = icon1Bg.y + icon1Bg.height / 2 - addGoldBtn.height / 2;
        this.addChildToContainer(addGoldBtn);
        if (Api.switchVoApi.checkPunishVip()) {
            var itemName = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemDesc"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
            itemName.setPosition(this.viewBg.width - itemName.width - 20 - GameData.popupviewOffsetX, icon1Bg.y + icon1Bg.height / 2 - addGoldBtn.height / 2 + 6);
            this.addChildToContainer(itemName);
        }
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 535;
        bottomBg.height = 535;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 75;
        this.addChildToContainer(bottomBg);
        var list1 = new Array();
        for (var index = 0; index < 4; index++) {
            list1.push(index);
        }
        this._dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode("punish", AcPunishBuyItemPopupView.code);
        for (var index = 1; index < 5; index++) {
            this._dataList.push(cfg.punishList[index.toString()]);
        }
        // let list = Config.WifebaseCfg.wifeGift;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 525, 535);
        this._scrollList = ComponentManager.getScrollList(AcPunishBuyItemScrollItem, this._dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 8);
    };
    AcPunishBuyItemPopupView.prototype.addGoldBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        // this.hide();
    };
    AcPunishBuyItemPopupView.prototype.doBuy = function (event) {
        var data = event.data;
        this._index = data.index;
        // if(this._index >= 3)
        // {
        // 	this.hide();
        // 	return;
        // }
        this.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, { activeId: AcPunishBuyItemPopupView.aid + "-" + AcPunishBuyItemPopupView.code, itemKey: data.key });
    };
    //请求回调
    AcPunishBuyItemPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            var gem = Api.playerVoApi.getPlayerGemStr();
            this._text1.text = gem;
        }
    };
    AcPunishBuyItemPopupView.prototype.refreshHandler = function () {
        this._scrollList.refreshData(this._dataList);
    };
    AcPunishBuyItemPopupView.prototype.checkData = function () {
        this._text1.text = Api.playerVoApi.getPlayerGemStr();
    };
    AcPunishBuyItemPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    AcPunishBuyItemPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.refreshHandler, this);
        // 未婚滑动列表
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_BUYITEM, this.doBuy, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO, this.checkData, this);
        this._text1 = null;
        this._index = null;
        this._dataList = null;
        _super.prototype.dispose.call(this);
    };
    AcPunishBuyItemPopupView.aid = "";
    AcPunishBuyItemPopupView.code = "";
    return AcPunishBuyItemPopupView;
}(PopupView));
__reflect(AcPunishBuyItemPopupView.prototype, "AcPunishBuyItemPopupView");
//# sourceMappingURL=AcPunishBuyItemPopupView.js.map