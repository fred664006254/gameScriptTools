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
 * @class DecreePolicyListPopupView
 */
var DecreePolicyListPopupView = (function (_super) {
    __extends(DecreePolicyListPopupView, _super);
    function DecreePolicyListPopupView() {
        return _super.call(this) || this;
    }
    DecreePolicyListPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSP), this.setPolicyCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var decree_wordbg = BaseBitmap.create("decree_wordbg");
        decree_wordbg.width = 440;
        decree_wordbg.anchorOffsetX = decree_wordbg.width / 2;
        decree_wordbg.x = this.viewBg.width / 2;
        decree_wordbg.y = 70;
        this._nodeContainer.addChild(decree_wordbg);
        var word1Img = BaseBitmap.create("decree_policy_word2");
        word1Img.anchorOffsetX = word1Img.width / 2;
        word1Img.x = this.viewBg.width / 2;
        word1Img.y = decree_wordbg.y + decree_wordbg.height / 2 - word1Img.height / 2;
        this._nodeContainer.addChild(word1Img);
        var spid = Api.promoteVoApi.getSpid();
        var startY = 10;
        var decList = Config.PolicyCfg.sPolicyList;
        var keys = Object.keys(decList);
        var scrolNode = new BaseDisplayObjectContainer();
        for (var index = 0; index < keys.length; index++) {
            var decCfg = decList[keys[index]];
            var policybg = BaseBitmap.create("decree_policy_bg" + decCfg.id);
            policybg.x = this.viewBg.width / 2 - policybg.width / 2;
            policybg.y = startY;
            scrolNode.addChild(policybg);
            policybg.touchEnabled = true;
            policybg.addTouchTap(this.ProlicyImgClickHandler, this, [decCfg.id]);
            var policyIconbg = BaseBitmap.create("decree_bookbg");
            policyIconbg.x = policybg.x + 15;
            policyIconbg.y = policybg.y + policybg.height / 2 - policyIconbg.height / 2;
            scrolNode.addChild(policyIconbg);
            var policyIcon = BaseBitmap.create("decree_policy_icon" + decCfg.id);
            policyIcon.x = policyIconbg.x + policyIconbg.width / 2 - policyIcon.width / 2;
            policyIcon.y = policybg.y + policybg.height / 2 - policyIcon.height / 2;
            scrolNode.addChild(policyIcon);
            var arrowImg = BaseBitmap.create("decree_arrow2");
            arrowImg.name = "arrowImg" + index;
            arrowImg.x = policybg.x + policybg.width - arrowImg.width - 10;
            arrowImg.y = policybg.y + policybg.height / 2 - arrowImg.height / 2;
            scrolNode.addChild(arrowImg);
            if (spid == decCfg.id) {
                var stampImg = BaseBitmap.create("decree_policy_stamp");
                stampImg.x = policybg.x + policybg.width - stampImg.width - 15;
                stampImg.y = policybg.y + policybg.height / 2 - stampImg.height / 2;
                ;
                scrolNode.addChild(stampImg);
                arrowImg.visible = false;
            }
            var nameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
            nameTxt.text = LanguageManager.getlocal("decreePolicy_Name" + decCfg.id);
            nameTxt.x = policybg.x + 110;
            nameTxt.y = policyIcon.y + 6;
            scrolNode.addChild(nameTxt);
            var descTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            descTxt.multiline = true;
            descTxt.lineSpacing = 1;
            descTxt.width = policybg.width - 160;
            var addaddExtent = decCfg.addExtent * 100;
            var addaddExtent2 = decCfg.emAddExtent * 100;
            if (decCfg.id == "2") {
                descTxt.text = LanguageManager.getlocal("decreePolicy_Desc" + decCfg.id, ["" + decCfg.addTimes, "" + decCfg.emAddTimes]);
            }
            else {
                descTxt.text = LanguageManager.getlocal("decreePolicy_Desc" + decCfg.id, ["" + decCfg.addTimes, "" + addaddExtent, "" + addaddExtent2]);
            }
            descTxt.x = nameTxt.x;
            descTxt.y = nameTxt.y + nameTxt.height + 3;
            scrolNode.addChild(descTxt);
            startY += policybg.height + 4;
        }
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, 515);
        var scrollView = ComponentManager.getScrollView(scrolNode, rect);
        scrollView.y = decree_wordbg.y + decree_wordbg.height + 10;
        scrollView.horizontalScrollPolicy = "off";
        this._nodeContainer.addChild(scrollView);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW);
        if (Number(spid) > 0) {
            tipTxt.text = LanguageManager.getlocal("decreePolicyTipTxt3");
        }
        else {
            tipTxt.text = LanguageManager.getlocal("decreePolicyTipTxt2");
        }
        tipTxt.anchorOffsetX = tipTxt.width / 2;
        tipTxt.x = this.viewBg.width / 2;
        tipTxt.y = scrollView.y + scrollView.height + 10;
        this._nodeContainer.addChild(tipTxt);
        this.titleTF.y = this.viewBg.y + 10;
    };
    DecreePolicyListPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.titleTF.y = this.viewBg.y + 20;
    };
    DecreePolicyListPopupView.prototype.ProlicyImgClickHandler = function (obj, param) {
        egret.log("param >>>>>>> " + param);
        var oldSpid = Api.promoteVoApi.getSpid();
        if (Number(oldSpid) == 0) {
            //设置新国策
            ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYCHOOSEPOPUPVIEW, { spid: param });
            return;
        }
        if (oldSpid && oldSpid == param) {
            App.CommonUtil.showTip(LanguageManager.getlocal("decree_policylist_chooseTip"));
            return;
        }
        this._newSpid = param;
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
        var time1 = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        var mesObj = {
            confirmCallback: this.doChangeRequest,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            msg: LanguageManager.getlocal("decreePolicyChooseTxt1", ["" + costNUm, time1 + ""]),
            id: 1,
            useNum: costNUm,
            linespacing: 6,
            height: 250
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    DecreePolicyListPopupView.prototype.doChangeRequest = function () {
        if (Api.playerVoApi.getPlayerGem() < this._costGemNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("decreePolicyChangeCostTxt"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_POLICY_SETSP, { spid: this._newSpid });
    };
    DecreePolicyListPopupView.prototype.setPolicyCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("decree_policy_setSuccessTip"));
            var nextSpid = Api.promoteVoApi.getSinfo().nextinfo.spid;
            if (nextSpid) {
                ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYCHANGEPOPUPVIEW);
                ViewController.getInstance().hideView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW);
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYDETAILPOPUPVIEW, { isShowAni: true });
            }
        }
        this.hide();
    };
    DecreePolicyListPopupView.prototype.getShowHeight = function () {
        return 730;
    };
    // 背景图名称
    DecreePolicyListPopupView.prototype.getBgName = function () {
        return "decree_popbg";
    };
    DecreePolicyListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_arrow1", "decree_arrow2", "decree_paper_listbg", "decree_paper_open", "decree_paper1", "decree_paper2",
            "decree_policy_bg1", "decree_policy_bg2", "decree_policy_bg3", "decree_policy_bg4", "decree_policy_icon1", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4", "decree_policy_stamp", "decree_policy_word1", "decree_policy_word2",
            "decree_wordbg", "decree_policy_detailbg", "decree_arrow2", "decree_policy_iconbg", "decree_popbg", "decree_bookbg"
        ]);
    };
    // 标题背景名称
    DecreePolicyListPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    DecreePolicyListPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_SETSP), this.setPolicyCallback, this);
        this._nodeContainer = null;
        this._costGemNum = null;
        this._newSpid = null;
        _super.prototype.dispose.call(this);
    };
    return DecreePolicyListPopupView;
}(PopupView));
__reflect(DecreePolicyListPopupView.prototype, "DecreePolicyListPopupView");
//# sourceMappingURL=DecreePolicyListPopupView.js.map