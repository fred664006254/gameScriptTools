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
 * 国策列表UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePolicyDetailPopupView
 */
var DecreePolicyDetailPopupView = (function (_super) {
    __extends(DecreePolicyDetailPopupView, _super);
    function DecreePolicyDetailPopupView() {
        var _this = _super.call(this) || this;
        _this._isShowAni = false;
        return _this;
    }
    DecreePolicyDetailPopupView.prototype.initView = function () {
        if (this.param && this.param.data && this.param.data.isShowAni) {
            this._isShowAni = this.param.data.isShowAni;
        }
        this._policyIdx = Api.promoteVoApi.getSpid();
        // this.param.data.spid;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var decree_wordbg = BaseBitmap.create("decree_policy_detailbg");
        decree_wordbg.anchorOffsetX = decree_wordbg.width / 2;
        decree_wordbg.x = this.viewBg.width / 2;
        decree_wordbg.y = 70;
        this._nodeContainer.addChild(decree_wordbg);
        var startY = decree_wordbg.y + decree_wordbg.height + 10;
        var policybg = BaseBitmap.create("decree_policy_bg" + this._policyIdx);
        policybg.x = this.viewBg.width / 2 - policybg.width / 2;
        policybg.y = startY;
        policybg.name = "policybg";
        this._nodeContainer.addChild(policybg);
        var policyIconbg = BaseBitmap.create("decree_bookbg");
        policyIconbg.x = policybg.x + 15;
        policyIconbg.y = policybg.y + policybg.height / 2 - policyIconbg.height / 2;
        this._nodeContainer.addChild(policyIconbg);
        var policyIcon = BaseBitmap.create("decree_policy_icon" + this._policyIdx);
        policyIcon.x = policyIconbg.x + policyIconbg.width / 2 - policyIcon.width / 2;
        policyIcon.y = policyIconbg.y + policyIconbg.height / 2 - policyIcon.height / 2;
        this._nodeContainer.addChild(policyIcon);
        var nameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        nameTxt.text = LanguageManager.getlocal("decreePolicy_Name" + this._policyIdx);
        nameTxt.x = policybg.x + 110;
        nameTxt.y = policyIcon.y + 6;
        this._nodeContainer.addChild(nameTxt);
        var policyCfg = Config.PolicyCfg.getPolicyById(this._policyIdx);
        var addaddExtent = String(policyCfg.addExtent * 100);
        var addaddExtent2 = policyCfg.emAddExtent * 100;
        var descTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        descTxt.multiline = true;
        descTxt.lineSpacing = 1;
        descTxt.width = policybg.width - 165;
        if (policyCfg.id == "2") {
            descTxt.text = LanguageManager.getlocal("decreePolicy_Desc" + this._policyIdx, ["" + policyCfg.addTimes, "" + policyCfg.emAddTimes]);
        }
        else {
            // descTxt.text = LanguageManager.getlocal("decreePolicy_Desc"+this._policyIdx,[""+policyCfg.addTimes,addaddExtent,""+addaddExtent2]);
            descTxt.text = LanguageManager.getlocal("decreePolicy_Desc" + this._policyIdx, ["" + policyCfg.addTimes, addaddExtent, "" + addaddExtent2]);
        }
        descTxt.x = nameTxt.x;
        descTxt.y = nameTxt.y + nameTxt.height + 3;
        this._nodeContainer.addChild(descTxt);
        startY += policybg.height + 10;
        var goldIcon = BaseLoadBitmap.create("itemicon1");
        goldIcon.setScale(0.45);
        goldIcon.x = this.viewBg.width / 2 - 50;
        goldIcon.y = startY;
        this._nodeContainer.addChild(goldIcon);
        var changeNum = Api.promoteVoApi.getSinfo().nextinfo.num;
        var costNum = Config.PolicyCfg.amendspNeedGem[changeNum];
        var costTxt = ComponentManager.getTextField("", 22);
        costTxt.text = "" + costNum;
        costTxt.x = goldIcon.x + 48;
        costTxt.y = startY + 15;
        this._nodeContainer.addChild(costTxt);
        startY += costTxt.height + 18;
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "decreePolicy_changeBtnTxt", this.ProlicyBtnClickHandler, this);
        btn.x = this.viewBg.width / 2 - btn.width / 2;
        btn.y = startY;
        this._nodeContainer.addChild(btn);
        if (this._isShowAni) {
            this.doStampAni();
        }
        else {
            this.addStampFlag();
        }
    };
    DecreePolicyDetailPopupView.prototype.doStampAni = function () {
        // let rData =  盖戳
        var stampImg = this.addStampFlag();
        stampImg.setScale(1.5);
        egret.Tween.get(stampImg, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300);
    };
    DecreePolicyDetailPopupView.prototype.addStampFlag = function () {
        var policybg = this._nodeContainer.getChildByName("policybg");
        var stampImg = BaseBitmap.create("decree_policy_stamp");
        stampImg.name = "stampImg";
        stampImg.anchorOffsetX = stampImg.width / 2;
        stampImg.anchorOffsetY = stampImg.height / 2;
        stampImg.x = policybg.x + +policybg.width - stampImg.width / 2 - 15;
        stampImg.y = policybg.y + policybg.height / 2;
        this._nodeContainer.addChild(stampImg);
        return stampImg;
    };
    DecreePolicyDetailPopupView.prototype.ProlicyBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
    };
    DecreePolicyDetailPopupView.prototype.getShowHeight = function () {
        return 560;
    };
    // 背景图名称
    DecreePolicyDetailPopupView.prototype.getBgName = function () {
        return "decree_popbg";
    };
    DecreePolicyDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_policy_detailbg", "decree_policy_bg1", "decree_policy_bg2", "decree_policy_bg3", "decree_policy_bg4",
            "decree_popbg", "decree_policy_icon1", "decree_policy_stamp", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4",
        ]);
    };
    // 标题背景名称
    DecreePolicyDetailPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    DecreePolicyDetailPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.titleTF.y = this.viewBg.y + 22;
    };
    DecreePolicyDetailPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._policyIdx = null;
        this._isShowAni = false;
        _super.prototype.dispose.call(this);
    };
    return DecreePolicyDetailPopupView;
}(PopupView));
__reflect(DecreePolicyDetailPopupView.prototype, "DecreePolicyDetailPopupView");
//# sourceMappingURL=DecreePolicyDetailPopupView.js.map