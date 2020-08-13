/**
 * 选择参加宴会的方式
 * date 2017/10/31
 * @class DinnerTypePopupView
 */
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
var DinnerTypePopupView = (function (_super) {
    __extends(DinnerTypePopupView, _super);
    function DinnerTypePopupView() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._scrollContainer = null;
        return _this;
    }
    DinnerTypePopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var goldBg = BaseBitmap.create("public_9_resbg");
        goldBg.setPosition(32 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(goldBg);
        var goldIcon = BaseLoadBitmap.create("itemicon1");
        goldIcon.setScale(0.5);
        goldIcon.x = goldBg.x - 3;
        goldIcon.y = goldBg.y + goldBg.height / 2 - 100 / 2 + 25;
        this.addChildToContainer(goldIcon);
        var goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        goldText.setPosition(goldBg.x + 50, goldBg.y + goldBg.height / 2 - goldText.height / 2);
        this.addChildToContainer(goldText);
        goldBg.width = goldText.width + 70;
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 528;
        typeBg.height = 626;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 60);
        this.addChildToContainer(typeBg);
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, this.viewBg.width, typeBg.height + typeBg.y);
        this._scrollContainer = new BaseDisplayObjectContainer();
        var scrollView = ComponentManager.getScrollView(this._scrollContainer, rect2);
        this.addChildToContainer(scrollView);
        this._scrollContainer.setPosition(0, typeBg.y);
        var itemsInfo = Config.DinnerCfg.getFeastItemList();
        for (var k in itemsInfo) {
            var idx = Number(k);
            var bgContainer = this.getDinnerTypeContainer(idx);
            bgContainer.setPosition(this.viewBg.width / 2 - 518 / 2 + 4, (idx - 1) * 155 + 10);
            this._scrollContainer.addChild(bgContainer);
        }
    };
    // idx  1~4
    DinnerTypePopupView.prototype.getDinnerTypeContainer = function (idx) {
        var bgContainer = new BaseDisplayObjectContainer();
        var itemBg = BaseBitmap.create("public_9_probiginnerbg");
        itemBg.width = 508;
        itemBg.height = 145;
        bgContainer.addChild(itemBg);
        var itemName = ComponentManager.getTextField(LanguageManager.getlocal("dinnerType" + idx), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        itemName.setPosition(130, 15);
        bgContainer.addChild(itemName);
        var expendText = ComponentManager.getTextField(LanguageManager.getlocal("expend"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        expendText.setPosition(itemName.x, itemName.y + itemName.height + 12);
        bgContainer.addChild(expendText);
        var itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(idx);
        if (itemCfg.needGem) {
            var iconBg = BaseBitmap.create("itembg_5");
            iconBg.setPosition(11, itemBg.height / 2 - iconBg.height / 2);
            bgContainer.addChild(iconBg);
            var icon = BaseBitmap.create("dinner_gems_" + idx);
            icon.setPosition(iconBg.x + iconBg.width / 2 - icon.width / 2, iconBg.y + iconBg.height / 2 - icon.height / 2);
            bgContainer.addChild(icon);
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 45, 45);
            var goldIcon = BaseLoadBitmap.create("itemicon1", rect);
            goldIcon.setPosition(expendText.x + expendText.width + 10, expendText.y + expendText.height / 2 - 45 / 2);
            bgContainer.addChild(goldIcon);
            var costText = ComponentManager.getTextField(itemCfg.needGem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            costText.setPosition(goldIcon.x + 50, expendText.y);
            bgContainer.addChild(costText);
        }
        else {
            var iconCfg = Config.ItemCfg.getItemCfgById(Number(itemCfg.needItem));
            var icon = GameData.getItemIcon(iconCfg);
            icon.setPosition(11, itemBg.height / 2 - icon.height / 2);
            bgContainer.addChild(icon);
            var costText = ComponentManager.getTextField(iconCfg.name + "x1", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
            costText.setPosition(expendText.x + expendText.width + 10, expendText.y);
            bgContainer.addChild(costText);
        }
        var effectTitle = ComponentManager.getTextField(LanguageManager.getlocal("effectTitle"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        effectTitle.setPosition(expendText.x, expendText.y + expendText.height + 23);
        bgContainer.addChild(effectTitle);
        var effectText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerEffect1", ["+" + itemCfg.getScore.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        effectText.setPosition(effectTitle.x + effectTitle.width, expendText.y + expendText.height + 10);
        bgContainer.addChild(effectText);
        if (itemCfg.getPoint > 0) {
            var effectText2 = ComponentManager.getTextField(LanguageManager.getlocal("dinnerEffect2", ["+" + itemCfg.getPoint.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
            effectText2.setPosition(effectTitle.x + effectTitle.width, expendText.y + expendText.height + 35);
            bgContainer.addChild(effectText2);
            var gotoFeastBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "dinnerFeast", this.touchTap, this, [idx]);
            gotoFeastBtn.setPosition(itemBg.width - gotoFeastBtn.width - 10, 20);
            gotoFeastBtn.setColor(TextFieldConst.COLOR_BLACK);
            bgContainer.addChild(gotoFeastBtn);
            if (idx == 2 && Api.switchVoApi.checkOpenDinnerLimit() && Api.playerVoApi.getPlayerVipLevel() < Config.DinnerCfg.getNeedVip() && (Api.challengeVoApi.getCurChannelId() <= Config.DinnerCfg.getNeedChallenge() * 41)) {
                gotoFeastBtn.setVisible(false);
                var dinnerLimit = ComponentManager.getTextField(LanguageManager.getlocal("dinner_vip_limit", [String(Config.DinnerCfg.getNeedVip()), String(Config.DinnerCfg.getNeedChallenge())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                dinnerLimit.setPosition(itemBg.width - dinnerLimit.width - 10, 20);
                dinnerLimit.textAlign = egret.HorizontalAlign.CENTER;
                bgContainer.addChild(dinnerLimit);
            }
        }
        else {
            var effectText2 = ComponentManager.getTextField(LanguageManager.getlocal("dinnerEffect2", [itemCfg.getPoint.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED3);
            effectText2.setPosition(effectTitle.x + effectTitle.width, expendText.y + expendText.height + 35);
            bgContainer.addChild(effectText2);
            var gotoFeastBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "dinnerType4", this.touchTap, this, [idx]);
            gotoFeastBtn.setPosition(itemBg.width - gotoFeastBtn.width - 10, 20);
            gotoFeastBtn.setColor(TextFieldConst.COLOR_BLACK);
            bgContainer.addChild(gotoFeastBtn);
        }
        return bgContainer;
    };
    DinnerTypePopupView.prototype.touchTap = function (idx) {
        var itemCfg = Config.DinnerCfg.getGoToFeastItemCfg(idx);
        if (itemCfg.needGem) {
            if (itemCfg.needGem > Api.playerVoApi.getPlayerGem()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
                return;
            }
        }
        else {
            var needItem = itemCfg.needItem;
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(needItem));
            if (1 > hasNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("goodsNotEnough2"));
                return;
            }
        }
        var feastCfg = Config.DinnerCfg.getFeastItemCfg(idx);
        if (this._obj && this._callbackF) {
            this._callbackF.apply(this._obj, [idx]);
        }
        this.hide();
    };
    DinnerTypePopupView.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return DinnerTypePopupView;
}(PopupView));
__reflect(DinnerTypePopupView.prototype, "DinnerTypePopupView");
//# sourceMappingURL=DinnerTypePopupView.js.map