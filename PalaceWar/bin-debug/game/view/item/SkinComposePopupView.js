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
 * 门客皮肤碎片合成
 * author 张朝阳
 * date 2018/11/7
 * @class SkinComposePopupView
 * param: skinId 门客皮肤的ID
 */
var SkinComposePopupView = (function (_super) {
    __extends(SkinComposePopupView, _super);
    function SkinComposePopupView() {
        var _this = _super.call(this) || this;
        _this._composeInfoList = [];
        return _this;
    }
    SkinComposePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, this.servantSkinHandle, this);
        var skinId = this.param.data.skinId;
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        // this._itemCfg=Config.ItemCfg.getItemCfgById(this.getId());
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 292;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this.addChildToContainer(bg);
        var txtBg = BaseBitmap.create("public_9_probiginnerbg");
        txtBg.width = 502;
        txtBg.height = 142;
        txtBg.setPosition(bg.x + (bg.width - txtBg.width) / 2, bg.y + 10);
        this.addChildToContainer(txtBg);
        var icon = servantSkinCfg.getIconContainer();
        icon.setPosition(txtBg.x + 10, txtBg.y + (txtBg.height - icon.height) / 2);
        this.addChildToContainer(icon);
        var nameTxt = ComponentManager.getTextField(servantSkinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        nameTxt.setPosition(icon.x + icon.width + 10, icon.y);
        this.addChildToContainer(nameTxt);
        var descTxt = ComponentManager.getTextField(servantSkinCfg.getSkinDesc(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        descTxt.width = txtBg.width - icon.x + txtBg.x - icon.width - 10 - 10;
        descTxt.setPosition(nameTxt.x, nameTxt.y + nameTxt.height + 10);
        this.addChildToContainer(descTxt);
        var composeUseTxt = ComponentManager.getTextField(LanguageManager.getlocal("composeCostDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        composeUseTxt.setPosition(icon.x + 20, txtBg.y + txtBg.height + 10);
        this.addChildToContainer(composeUseTxt);
        var rewaradVoList = GameData.formatRewardItem(servantSkinCfg.exchangeItem);
        for (var i = 0; i < rewaradVoList.length; i++) {
            //icon
            var rewaradVo = rewaradVoList[i];
            var needItemCfg = Config.ItemCfg.getItemCfgById(rewaradVo.id);
            var icon_1 = needItemCfg.getIconContainer(true);
            icon_1.setPosition(composeUseTxt.x + composeUseTxt.width + 10 + (icon_1.width + 5) * i, txtBg.y + txtBg.height + 5);
            this.addChildToContainer(icon_1);
            //txt
            var ownNum = Api.itemVoApi.getItemNumInfoVoById(rewaradVo.id);
            var needNum = rewaradVo.num;
            var str = "";
            str = "(" + ownNum + "/" + needNum + ")";
            if (ownNum >= needNum) {
                str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
            }
            else {
                str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
            }
            var numTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
            numTxt.setPosition(icon_1.x + icon_1.width / 2 - numTxt.width / 2, icon_1.y + icon_1.height + 2);
            this.addChildToContainer(numTxt);
            var composeInfo = { rewaradVo: rewaradVo, icon: icon_1, numTxt: numTxt };
            this._composeInfoList.push(composeInfo);
        }
        var composeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "composeBtn", this.composeHandler, this);
        composeBtn.setPosition(bg.x + (bg.width - composeBtn.width) / 2, bg.y + bg.height + 10);
        this.addChildToContainer(composeBtn);
    };
    SkinComposePopupView.prototype.composeHandler = function () {
        var servantCfg = Config.ServantCfg.getServantItemById(this.param.data.servantId);
        if (!Api.servantVoApi.getServantObj(servantCfg.id)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossserverNotServantTip", [servantCfg.name]));
            return;
        }
        var cfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.skinId);
        // if (Api.servantVoApi.isOwnSkinOfSkinId(this.param.data.skinId)) {
        if (!cfg.canExchangeItem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossserverHaveServantSkin"));
            return;
        }
        var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.skinId);
        var rewaradVoList = GameData.formatRewardItem(servantSkinCfg.exchangeItem);
        for (var i = 0; i < rewaradVoList.length; i++) {
            //icon
            var rewaradVo = rewaradVoList[i];
            var ownNum = Api.itemVoApi.getItemNumInfoVoById(rewaradVo.id);
            var needNum = rewaradVo.num;
            if (ownNum < needNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("crossserverNotServantSkinDebris"));
                return;
            }
        }
        var aidAndCode = this.param.data.aid + "-" + this.param.data.code;
        this.request(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, { activeId: aidAndCode, skinId: this.param.data.skinId });
    };
    SkinComposePopupView.prototype.servantSkinHandle = function (event) {
        if (event && event.data && event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var servantSkinCfg = Config.ServantskinCfg.getServantSkinItemById(this.param.data.skinId);
            for (var i = 0; i < this._composeInfoList.length; i++) {
                var composeInfo = this._composeInfoList[i];
                var ownNum = Api.itemVoApi.getItemNumInfoVoById(composeInfo.rewaradVo.id);
                var needNum = composeInfo.rewaradVo.num;
                var str = "";
                str = "(" + ownNum + "/" + needNum + ")";
                if (ownNum >= needNum) {
                    str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_GREEN);
                }
                else {
                    str = App.StringUtil.formatStringColor(str, TextFieldConst.COLOR_WARN_RED);
                }
                composeInfo.numTxt.text = str;
                composeInfo.numTxt.setPosition(composeInfo.icon.x + composeInfo.icon.width / 2 - composeInfo.numTxt.width / 2, composeInfo.icon.y + composeInfo.icon.height + 2);
            }
            var rewardvo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardvo);
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("crossserverServantSkinFailure"));
        }
        this.hide();
    };
    SkinComposePopupView.prototype.getTitleStr = function () {
        return "composePopupViewTitle";
    };
    SkinComposePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_SERVANTPK_EXCHANGESERVANTSKIN, this.servantSkinHandle, this);
        this._composeInfoList = [];
        _super.prototype.dispose.call(this);
    };
    return SkinComposePopupView;
}(PopupView));
__reflect(SkinComposePopupView.prototype, "SkinComposePopupView");
//# sourceMappingURL=SkinComposePopupView.js.map