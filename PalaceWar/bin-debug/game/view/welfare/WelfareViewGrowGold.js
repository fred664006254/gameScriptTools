//管家一键事务
//shaoliang 2020.4.22
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
var WelfareViewGrowGold = /** @class */ (function (_super) {
    __extends(WelfareViewGrowGold, _super);
    function WelfareViewGrowGold() {
        var _this = _super.call(this) || this;
        _this._buyBtn = null;
        _this._hasBuy = null;
        _this._showTime = null;
        _this._list = null;
        return _this;
    }
    WelfareViewGrowGold.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "growgold_buy_btn", "growgold_fnt", "growgold_bg", "shopview_itemtitle", "public_titlebg",
            "collectflag", "public_popupscrollitembg"
        ]);
    };
    WelfareViewGrowGold.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_GETGROWGOLD), this.rewardCallBack, this);
        var topbg = BaseBitmap.create("growgold_bg");
        topbg.width = 492;
        topbg.height = 333;
        topbg.setPosition(0, 0);
        this.addChild(topbg);
        this.bottomBg.visible = false;
        var powerText = ComponentManager.getBitmapText(String(Config.GrowgoldCfg.power), "growgold_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, 32);
        powerText.setPosition(290 - powerText.width, 65);
        this.addChild(powerText);
        if (!Api.switchVoApi.checkOpenBMFont()) {
            var powerTf = powerText;
            powerTf.bold = true;
            if (PlatformManager.checkIsThSp()) {
                powerTf.setPosition(280 - powerText.width, 95);
            }
            else if (PlatformManager.checkIsRuLang()) {
                powerTf.setPosition(370, 85);
            }
        }
        // let validityTime = ComponentManager.getTextField(LanguageManager.getlocal("growGold_validity_time"),18,TextFieldConst.COLOR_QUALITY_YELLOW);
        // validityTime.setPosition(450-validityTime.width,150);
        // this.addChild(validityTime);
        var time = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        time.setPosition(20, 240);
        this.addChild(time);
        this._showTime = time;
        var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey(Config.GrowgoldCfg.unlockRecharge);
        var validityDesc = ComponentManager.getTextField(LanguageManager.getlocal("growGold_validity_desc", [String(rechargeItemCfg.getVipExp)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        validityDesc.width = 485;
        validityDesc.lineSpacing = 3;
        validityDesc.setPosition(2, 277);
        validityDesc.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(validityDesc);
        var hasbuy = BaseLoadBitmap.create("growgold_got");
        hasbuy.width = 147;
        hasbuy.height = 96;
        hasbuy.setPosition(310, 180);
        this.addChild(hasbuy);
        this._hasBuy = hasbuy;
        var buystr = (PlatformManager.checkisLocalPrice() && rechargeItemCfg.platFullPrice) ? rechargeItemCfg.platFullPrice : App.CommonUtil.getMoneyString(rechargeItemCfg.cost);
        var buybtn = ComponentManager.getButton("growgold_buy_btn", "", this.buyGrowGold, this, null, 1);
        buybtn.setText(buystr, false);
        buybtn.setPosition(280, 190);
        this.addChild(buybtn);
        this._buyBtn = buybtn;
        var rect = new egret.Rectangle(0, 0, 490, GameConfig.stageHeigth - 418);
        var list = ComponentManager.getScrollList(GrowGoldScrollItem, [], rect);
        list.setPosition(3, topbg.y + topbg.height);
        this.addChild(list);
        this._list = list;
        this.resetBtn();
        this.resetList();
        this.tick();
    };
    WelfareViewGrowGold.prototype.buyGrowGold = function () {
        PlatformManager.checkPay(Config.GrowgoldCfg.unlockRecharge);
    };
    WelfareViewGrowGold.prototype.resetBtn = function () {
        this._buyBtn.visible = !Api.shopVoApi.ifBuyGrowGold();
        this._hasBuy.visible = Api.shopVoApi.ifBuyGrowGold();
    };
    WelfareViewGrowGold.prototype.resetList = function () {
        this._list.refreshData(Config.GrowgoldCfg.task);
    };
    WelfareViewGrowGold.prototype.tick = function () {
        if (!this._showTime) {
            return;
        }
        var time = 0;
        if (Api.shopVoApi.ifBuyGrowGold()) {
            this._showTime.visible = false;
            // if (Api.shopVoApi.ifBuyGrowGoldTimeout())
            // {
            //     App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT);
            //     return;
            // }
        }
        else {
            var regdt = Api.gameinfoVoApi.getRegdt();
            time = regdt - GameData.serverTime + 86400 * Config.GrowgoldCfg.showTime;
            if (time < 0) {
                var n = 1 - Math.ceil(time / (86400 * Config.GrowgoldCfg.showTime));
                time += n * 86400 * Config.GrowgoldCfg.showTime;
                // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARFGE_BOX_TIMEOUT);
                // return;
            }
            var timestr = LanguageManager.getlocal("acChess_timeCount", [App.DateUtil.getFormatBySecond(time, 1)]);
            this._showTime.text = timestr;
        }
    };
    WelfareViewGrowGold.prototype.receivePushData = function (event) {
        var data = event.data;
        if (data.data.ret == 0 && data.data.cmd == NetPushConst.PUSH_PAY) {
            if (data.data.data.rewards) {
                var itemid = data.data.data.rewards;
                var rList = GameData.formatRewardItem(itemid);
                App.CommonUtil.playRewardFlyAction(rList);
            }
            this.resetBtn();
            this.resetList();
        }
    };
    WelfareViewGrowGold.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (!rData) {
            return;
        }
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        this.resetList();
    };
    WelfareViewGrowGold.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_GETGROWGOLD), this.rewardCallBack, this);
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData, this);
        this._buyBtn = null;
        this._hasBuy = null;
        this._showTime = null;
        this._list = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewGrowGold;
}(WelfareViewTab));
//# sourceMappingURL=WelfareViewGrowGold.js.map