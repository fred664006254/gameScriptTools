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
 * 政令选择确认框UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePaperChoosePopupView
 */
var DecreePaperChoosePopupView = (function (_super) {
    __extends(DecreePaperChoosePopupView, _super);
    function DecreePaperChoosePopupView() {
        var _this = _super.call(this) || this;
        _this._costGemNum = 0;
        return _this;
    }
    DecreePaperChoosePopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var decreeId = this.param.data.gdid;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 528;
        bg.height = 316;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._nodeContainer.addChild(bg);
        var rbg = BaseBitmap.create("public_9_bg45");
        rbg.width = 520;
        rbg.height = 220;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        rbg.y = bg.y;
        this._nodeContainer.addChild(rbg);
        var decree_bookbg = BaseBitmap.create("itembg_1");
        decree_bookbg.x = this.viewBg.x + this.viewBg.width / 2 - decree_bookbg.width / 2;
        decree_bookbg.y = rbg.y + 10;
        this._nodeContainer.addChild(decree_bookbg);
        var decree_book = BaseBitmap.create("itemicon1");
        decree_book.x = this.viewBg.x + this.viewBg.width / 2 - decree_book.width / 2;
        decree_book.y = decree_bookbg.y + decree_bookbg.height / 2 - decree_bookbg.height / 2;
        this._nodeContainer.addChild(decree_book);
        var decreeCfg = Config.PolicyCfg.getGovDecreeById(decreeId);
        var costNUm = decreeCfg.gdCost;
        var decreeName = LanguageManager.getlocal("decreePaper_Name" + decreeCfg.type) + "-" + LanguageManager.getlocal("decreePaper_subName" + decreeCfg.sort);
        this._costGemNum = costNUm;
        var costStr = "" + costNUm;
        if (costNUm == 0) {
            costStr = LanguageManager.getlocal("sysFreeDesc");
        }
        var numTF = ComponentManager.getTextField(costStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        numTF.x = decree_bookbg.x + 98 - numTF.width;
        numTF.y = decree_bookbg.y + 98 - numTF.height;
        this._nodeContainer.addChild(numTF);
        var chooseTxt1 = ComponentManager.getTextField("", 20);
        chooseTxt1.multiline = true;
        chooseTxt1.lineSpacing = 5;
        // chooseTxt1.width = this.viewBg.width - 80;
        chooseTxt1.text = LanguageManager.getlocal("decreeChooseTxt1", [costStr, decreeName]);
        chooseTxt1.x = this.viewBg.x + this.viewBg.width / 2 - chooseTxt1.width / 2;
        chooseTxt1.y = decree_bookbg.y + decree_bookbg.height + 10;
        this._nodeContainer.addChild(chooseTxt1);
        // let goldIcon =  BaseLoadBitmap.create("itemicon1");
        // goldIcon.setScale(0.45);
        // goldIcon.x = chooseTxt1.x + 85;
        // goldIcon.y = chooseTxt1.y - 15;
        // this._nodeContainer.addChild(goldIcon);
        var chooseTxt2 = ComponentManager.getTextField("", 20);
        chooseTxt2.multiline = true;
        chooseTxt2.lineSpacing = 5;
        // chooseTxt2.width = this.viewBg.width - 80;
        var descStr = LanguageManager.getlocal("decreePaper_Desc" + decreeCfg.type);
        chooseTxt2.text = LanguageManager.getlocal("decreeChooseTxt2", [descStr]);
        chooseTxt2.x = this.viewBg.x + this.viewBg.width / 2 - chooseTxt2.width / 2;
        chooseTxt2.y = chooseTxt1.y + chooseTxt1.height + 10;
        this._nodeContainer.addChild(chooseTxt2);
        var totalNum = Api.playerVoApi.getPlayerGem();
        var ownTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        var name1 = LanguageManager.getlocal("itemName_1");
        var cur_have = LanguageManager.getlocal(costNUm < totalNum ? "itemUseNewTip" : "itemUseNewTip2", [name1, App.StringUtil.toString(totalNum)]);
        ownTxt.text = cur_have;
        ownTxt.x = this.viewBg.x + this.viewBg.width / 2 - ownTxt.width / 2;
        ownTxt.y = chooseTxt2.y + chooseTxt2.height + 10;
        this._nodeContainer.addChild(ownTxt);
        var chooseTxt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_RED);
        chooseTxt3.multiline = true;
        chooseTxt3.lineSpacing = 5;
        chooseTxt3.textAlign = egret.HorizontalAlign.CENTER;
        chooseTxt3.width = this.viewBg.width - 80;
        var time1 = App.DateUtil.formatSvrHourByLocalTimeZone(6).hour;
        var time2 = App.DateUtil.formatSvrHourByLocalTimeZone(12).hour;
        chooseTxt3.text = LanguageManager.getlocal("decreeChooseTxt3", [time1 + "", time2 + ""]);
        chooseTxt3.x = this.viewBg.x + this.viewBg.width / 2 - chooseTxt3.width / 2;
        chooseTxt3.y = rbg.y + rbg.height + 15;
        this._nodeContainer.addChild(chooseTxt3);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sysConfirm", this.confirmBtnHandler, this);
        confirmBtn.x = bg.x + bg.width / 2 + 50;
        confirmBtn.y = bg.y + bg.height + 10;
        confirmBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(confirmBtn);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "cancelBtn", this.hide, this);
        cancelBtn.x = bg.x + bg.width / 2 - cancelBtn.width - 50;
        cancelBtn.y = confirmBtn.y;
        cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(cancelBtn);
    };
    DecreePaperChoosePopupView.prototype.confirmBtnHandler = function () {
        if (Api.playerVoApi.getPlayerGem() < this._costGemNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("decreePaperChangeCostTxt"));
            return;
        }
        var decreeId = this.param.data.gdid;
        var decreeCfg = Config.PolicyCfg.getGovDecreeById(decreeId);
        NetManager.request(NetRequestConst.REQUEST_POLICY_SETGD, { gdid: decreeId, gdtype: decreeCfg.type });
        this.hide();
    };
    DecreePaperChoosePopupView.prototype.getShowHeight = function () {
        return 470;
    };
    DecreePaperChoosePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_bookbg",
            "decree_policy_detailbg", "decree_policy_bg1", "decree_policy_bg2", "decree_policy_bg3", "decree_policy_bg4",
            "decree_popbg", "decree_policy_icon1", "decree_policy_stamp", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4",
        ]);
    };
    DecreePaperChoosePopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._costGemNum = 0;
        _super.prototype.dispose.call(this);
    };
    return DecreePaperChoosePopupView;
}(PopupView));
__reflect(DecreePaperChoosePopupView.prototype, "DecreePaperChoosePopupView");
//# sourceMappingURL=DecreePaperChoosePopupView.js.map