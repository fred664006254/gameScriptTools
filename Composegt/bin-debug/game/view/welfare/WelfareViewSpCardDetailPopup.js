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
 * 每日奖励宝箱奖励预览弹板
 * author yanyuling qianjun 通用于转盘宝箱
 * date 2017/10/30
 * @class WelfareViewSpCardDetailPopup
 */
var WelfareViewSpCardDetailPopup = (function (_super) {
    __extends(WelfareViewSpCardDetailPopup, _super);
    function WelfareViewSpCardDetailPopup() {
        return _super.call(this) || this;
    }
    WelfareViewSpCardDetailPopup.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.hide, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        // let data = this.param.data;
        // let rewardId = data.id;
        var rewardCfg = null;
        var need = 0;
        var mustStr = '';
        var canReward = null;
        var ofy = 51;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 205;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 116 - ofy + 15;
        // bg.y = 116-ofy;
        this._nodeContainer.addChild(bg);
        var topBg = BaseBitmap.create("public_tc_bg02");
        topBg.width = 272;
        topBg.x = this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = 65 - ofy;
        this._nodeContainer.addChild(topBg);
        var lockTxt = "spCardDetailSTitle";
        var tipTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt1.text = LanguageManager.getlocal(lockTxt);
        tipTxt1.x = topBg.x + topBg.width / 2 - tipTxt1.width / 2;
        tipTxt1.y = topBg.y + topBg.height / 2 - tipTxt1.height / 2;
        this._nodeContainer.addChild(tipTxt1);
        var rbg = BaseBitmap.create("public_tc_bg03");
        rbg.width = bg.width - 30;
        rbg.height = 340;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        rbg.y = tipTxt1.y + tipTxt1.height + 50;
        this._nodeContainer.addChild(rbg);
        var content = ComponentManager.getTextField(LanguageManager.getlocal("spCardDetailContent"), 20, TextFieldConst.COLOR_BLACK);
        content.x = rbg.x + rbg.width / 2 - content.width / 2;
        content.y = rbg.y + 18;
        content.lineSpacing = 5;
        // content.textAlign = egret.HorizontalAlign.CENTER;
        this._nodeContainer.addChild(content);
        var desc1 = ComponentManager.getTextField(LanguageManager.getlocal("spCardDetailDesc1"), 20, TextFieldConst.COLOR_BLACK);
        var desc2 = ComponentManager.getTextField(LanguageManager.getlocal("spCardDetailDesc2"), 20, TextFieldConst.COLOR_BLACK);
        var desc3 = ComponentManager.getTextField(LanguageManager.getlocal("spCardDetailDesc3"), 20, TextFieldConst.COLOR_BLACK);
        var desc4 = ComponentManager.getTextField(LanguageManager.getlocal("spCardDetailDesc4"), 20, TextFieldConst.COLOR_BLACK);
        desc1.x = content.x;
        desc2.x = content.x;
        desc3.x = content.x;
        desc4.x = content.x;
        desc1.y = rbg.y + rbg.height + 15;
        desc2.y = desc1.y + desc1.height + 5;
        desc3.y = desc2.y + desc2.height + 20;
        desc4.y = desc3.y + desc3.height + 5;
        this._nodeContainer.addChild(desc1);
        this._nodeContainer.addChild(desc2);
        this._nodeContainer.addChild(desc3);
        this._nodeContainer.addChild(desc4);
        bg.height = rbg.height + 250;
        var rechargeBtn = ComponentManager.getButton("firstchargebutton01", "", this.goToRechargeHandler, this);
        rechargeBtn.x = rbg.x + rbg.width / 2 - rechargeBtn.width / 2;
        rechargeBtn.y = rbg.y + rbg.height + 170;
        var rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g70");
        var str = LanguageManager.getlocal("anyMoney", [rechargeItemCfg.cost.toString()]);
        rechargeBtn.setText(str, false);
        rechargeBtn.setColor(TextFieldConst.COLOR_BROWN);
        this._nodeContainer.addChild(rechargeBtn);
    };
    WelfareViewSpCardDetailPopup.prototype.goToRechargeHandler = function () {
        PlatformManager.pay("g70");
    };
    WelfareViewSpCardDetailPopup.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton01"
        ]);
    };
    WelfareViewSpCardDetailPopup.prototype.dispose = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT, this.hide, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewSpCardDetailPopup;
}(PopupView));
__reflect(WelfareViewSpCardDetailPopup.prototype, "WelfareViewSpCardDetailPopup");
