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
 * 暴击虎牢关，礼包item
 * author 赵占涛
 */
var AcHuLaoGiftListScrollItem = (function (_super) {
    __extends(AcHuLaoGiftListScrollItem, _super);
    function AcHuLaoGiftListScrollItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcHuLaoGiftListScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcHuLaoView.AID, AcHuLaoView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHuLaoGiftListScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcHuLaoView.AID, AcHuLaoView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcHuLaoGiftListScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcHuLaoView.AID + "-" + AcHuLaoView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    AcHuLaoGiftListScrollItem.prototype.initItem = function (index, data) {
        this.index = index;
        var cfgOne = this.cfg.vipshopNum[index];
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 518;
        bg.height = 137;
        this.addChild(bg);
        var up3 = BaseBitmap.create("public_up3");
        up3.width = 510;
        up3.height = 30;
        up3.x = 2;
        up3.y = 5;
        this.addChild(up3);
        var bgRed = BaseBitmap.create("activity_charge_red");
        bgRed.width = 277;
        bgRed.y = 2;
        this.addChild(bgRed);
        //名称
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoGiftName" + (index + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt.x = bgRed.x + 20;
        nameTxt.y = bgRed.y + bgRed.height / 2 - nameTxt.height / 2;
        this.addChild(nameTxt);
        // 道具
        var contentList = GameData.formatRewardItem(cfgOne.getReward);
        for (var i = 0; i < contentList.length; i++) {
            var tmpData = contentList[i];
            var iconItem = GameData.getItemIcon(tmpData, true);
            iconItem.setScale(0.7);
            iconItem.x = 20 + 80 * i;
            iconItem.y = 45;
            this.addChild(iconItem);
        }
        //限购vip
        var needVipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoGiftVipNeed", [String(cfgOne.needVIP)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needVipTxt.x = 436 - needVipTxt.width / 2;
        needVipTxt.y = 19 - needVipTxt.height / 2;
        this.addChild(needVipTxt);
        //限购数
        var limitNumTxt = ComponentManager.getTextField(LanguageManager.getlocal("acHuLaoGiftLimitNum", [String(cfgOne.limit - (this.vo.shop[index + 1] || 0))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        limitNumTxt.x = 436 - limitNumTxt.width / 2;
        limitNumTxt.y = 52 - limitNumTxt.height / 2;
        this.addChild(limitNumTxt);
        // 购买按钮
        var buyBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishBuyItemBuy", this.buyClick, this);
        buyBtn.setText(cfgOne.needNum.toString(), false);
        buyBtn.addTextIcon("public_icon1");
        buyBtn.x = bg.x + bg.width - buyBtn.width - 20;
        buyBtn.y = bg.y + bg.height - buyBtn.height - 20;
        this.addChild(buyBtn);
    };
    AcHuLaoGiftListScrollItem.prototype.buyClick = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (Api.playerVoApi.getPlayerVipLevel() < this.cfg.vipshopNum[this.index].needVIP) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acHuLaoGiftVipNeedTip', [String(this.cfg.vipshopNum[this.index].needVIP)]));
            return;
        }
        if (this.vo.shop[this.index + 1] >= this.cfg.vipshopNum[this.index].limit) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acHuLaoGiftLimitNumTip', [String(this.cfg.vipshopNum[this.index].limit)]));
            return;
        }
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = this.cfg.vipshopNum[this.index].needNum;
        var message = LanguageManager.getlocal("acHuLaoGiftBuyConfirm", [String(needGem), LanguageManager.getlocal("acHuLaoGiftName" + (this.index + 1))]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { useNum: needGem, confirmCallback: this.buyReal, handler: this, icon: "itemicon1", iconBg: "itembg_1", num: gem, msg: message, id: 1 });
    };
    AcHuLaoGiftListScrollItem.prototype.buyReal = function () {
        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var gem = Api.playerVoApi.getPlayerGem();
        var needGem = this.cfg.vipshopNum[this.index].needNum;
        if (gem < needGem) {
            App.CommonUtil.showTip(LanguageManager.getlocal('allianceBossOpen_tip5'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_HULAOSHOPGIFT, { activeId: this.acTivityId, giftId: this.index + 1 });
    };
    /**
     * 不同格子X间距
     */
    AcHuLaoGiftListScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcHuLaoGiftListScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcHuLaoGiftListScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcHuLaoGiftListScrollItem;
}(ScrollListItem));
__reflect(AcHuLaoGiftListScrollItem.prototype, "AcHuLaoGiftListScrollItem");
