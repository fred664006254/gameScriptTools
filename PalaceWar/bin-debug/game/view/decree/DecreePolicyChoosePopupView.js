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
 * @class DecreePolicyChoosePopupView
 */
var DecreePolicyChoosePopupView = (function (_super) {
    __extends(DecreePolicyChoosePopupView, _super);
    function DecreePolicyChoosePopupView() {
        var _this = _super.call(this) || this;
        _this._costGemNum = 0;
        return _this;
    }
    DecreePolicyChoosePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSP), this.setPolicyCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var spid = this.param.data.spid;
        var bg = BaseBitmap.create("public_9_bg46");
        bg.width = 528;
        bg.height = 250;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._nodeContainer.addChild(bg);
        // let rbg:BaseBitmap = BaseBitmap.create("public_9_bg45");
        // rbg.width = 510;
        // rbg.height = 180;
        // rbg.x = this.viewBg.x + this.viewBg.width/2 - rbg.width/2;
        // rbg.y = bg.y;
        // this._nodeContainer.addChild(rbg);
        var iconbg = BaseBitmap.create("decree_bookbg");
        iconbg.x = this.viewBg.x + this.viewBg.width / 2 - iconbg.width / 2;
        iconbg.y = bg.y + 20;
        this._nodeContainer.addChild(iconbg);
        var policyIcon = BaseBitmap.create("decree_policy_icon" + spid);
        policyIcon.x = iconbg.x + iconbg.width / 2 - policyIcon.width / 2;
        policyIcon.y = iconbg.y + iconbg.height / 2 - policyIcon.height / 2;
        this._nodeContainer.addChild(policyIcon);
        var sinfo = Api.promoteVoApi.getSinfo();
        var num = sinfo.nextinfo.num;
        var costNUm = 0;
        var amendspNeedGem = Config.PolicyCfg.amendspNeedGem;
        if (num >= amendspNeedGem.length - 1) {
            costNUm = amendspNeedGem[amendspNeedGem.length - 1];
        }
        else {
            costNUm = amendspNeedGem[num];
        }
        this._costGemNum = costNUm;
        var policyeName = LanguageManager.getlocal("decreePolicy_Name" + spid);
        var chooseTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        chooseTxt1.multiline = true;
        chooseTxt1.lineSpacing = 5;
        chooseTxt1.text = LanguageManager.getlocal("decreePolicyChooseTxt2", [policyeName]);
        chooseTxt1.x = this.viewBg.x + this.viewBg.width / 2 - chooseTxt1.width / 2;
        chooseTxt1.y = policyIcon.y + policyIcon.height + 10;
        this._nodeContainer.addChild(chooseTxt1);
        var chooseTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        chooseTxt2.text = LanguageManager.getlocal("decreePolicyChooseTxt3");
        chooseTxt2.x = this.viewBg.x + 50 + GameData.popupviewOffsetX;
        chooseTxt2.y = chooseTxt1.y + chooseTxt1.height + 15;
        this._nodeContainer.addChild(chooseTxt2);
        var policyCfg = Config.PolicyCfg.getPolicyById(spid);
        var addaddExtent = "" + (policyCfg.addExtent * 100);
        var chooseTxt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        chooseTxt3.multiline = true;
        chooseTxt3.lineSpacing = 5;
        chooseTxt3.width = 350;
        var addaddExtent2 = policyCfg.emAddExtent * 100;
        if (policyCfg.id == "2") {
            chooseTxt3.text = LanguageManager.getlocal("decreePolicy_Desc" + policyCfg.id, ["" + policyCfg.addTimes, "" + policyCfg.emAddTimes]);
        }
        else {
            chooseTxt3.text = LanguageManager.getlocal("decreePolicy_Desc" + policyCfg.id, ["" + policyCfg.addTimes, "" + addaddExtent, "" + addaddExtent2]);
        }
        chooseTxt3.x = chooseTxt2.x + chooseTxt2.width + 10;
        chooseTxt3.y = chooseTxt2.y;
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
    DecreePolicyChoosePopupView.prototype.setPolicyCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("decree_policy_setSuccessTip"));
            // let nextSpid = Api.promoteVoApi.getSinfo().nextinfo.spid;
            // if(nextSpid)
            // {
            // 	ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYCHANGEPOPUPVIEW);
            // }else{
            // 	ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
            // }
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
            ViewController.getInstance().hideView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
        }
        this.hide();
    };
    DecreePolicyChoosePopupView.prototype.confirmBtnHandler = function () {
        // if(Api.playerVoApi.getPlayerGem() < this._costGemNum)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("decreePolicyChangeCostTxt"));
        // 	return;
        // }
        var spid = this.param.data.spid;
        NetManager.request(NetRequestConst.REQUEST_POLICY_SETSP, { spid: spid });
    };
    DecreePolicyChoosePopupView.prototype.getShowHeight = function () {
        return 400;
    };
    DecreePolicyChoosePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_popbg", "decree_policy_icon1", "decree_policy_stamp", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4",
        ]);
    };
    DecreePolicyChoosePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSP), this.setPolicyCallback, this);
        this._nodeContainer = null;
        this._costGemNum = 0;
        _super.prototype.dispose.call(this);
    };
    return DecreePolicyChoosePopupView;
}(PopupView));
__reflect(DecreePolicyChoosePopupView.prototype, "DecreePolicyChoosePopupView");
//# sourceMappingURL=DecreePolicyChoosePopupView.js.map