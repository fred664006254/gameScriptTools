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
 * 已选择政令UI
 * author yanyuling
 * date 2018/05/28
 * @class DecreePaperDetailPopupView
 */
var DecreePaperDetailPopupView = (function (_super) {
    __extends(DecreePaperDetailPopupView, _super);
    function DecreePaperDetailPopupView() {
        return _super.call(this) || this;
    }
    DecreePaperDetailPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_REFRESHGD), this.ProlicyBtnClickHandlerCallBack, this);
        this._paperIdx = Api.promoteVoApi.getGdinfo().gdid;
        var paperCfg = Config.PolicyCfg.getGovDecreeById(this._paperIdx);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var paperbg = BaseBitmap.create("decree_policy_detailbg");
        paperbg.anchorOffsetX = paperbg.width / 2;
        paperbg.x = this.viewBg.width / 2;
        paperbg.y = 70;
        this._nodeContainer.addChild(paperbg);
        var startY = paperbg.y + paperbg.height + 10;
        var policybg = BaseBitmap.create("decree_policy_bg1");
        // policybg.width = 530;
        policybg.x = this.viewBg.width / 2 - policybg.width / 2;
        policybg.y = startY;
        policybg.name = "policybg";
        this._nodeContainer.addChild(policybg);
        var bookbg = BaseBitmap.create("decree_bookbg");
        bookbg.x = policybg.x + 15;
        bookbg.y = policybg.y + policybg.height / 2 - bookbg.height / 2 - 2;
        this._nodeContainer.addChild(bookbg);
        var policyIcon = BaseBitmap.create("decree_book");
        policyIcon.x = bookbg.x + bookbg.width / 2 - policyIcon.width / 2;
        policyIcon.y = bookbg.y + bookbg.height / 2 - policyIcon.height / 2;
        this._nodeContainer.addChild(policyIcon);
        var addTimes1 = paperCfg.addTimes1;
        var addTimes2 = paperCfg.addTimes2;
        var addExtent1 = String(paperCfg.addExtent1 * 100);
        var addExtent2 = String(paperCfg.addExtent2 * 100);
        var moreStr = "";
        if (Api.promoteVoApi.ismore()) {
            addExtent1 = String(paperCfg.leveeTimeEff1 * 100);
            addExtent2 = String(paperCfg.leveeTimeEff2 * 100);
            moreStr = "  " + LanguageManager.getlocal("decreepaper_ismore");
        }
        var nameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        nameTxt.text = LanguageManager.getlocal("decreePaper_Name" + paperCfg.type) + "-" + LanguageManager.getlocal("decreePaper_subName" + paperCfg.sort) + moreStr;
        nameTxt.x = policybg.x + 117;
        nameTxt.y = policyIcon.y + 12;
        this._nodeContainer.addChild(nameTxt);
        var descTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        descTxt.multiline = true;
        descTxt.lineSpacing = 3;
        descTxt.width = paperbg.width - 60;
        descTxt.text = LanguageManager.getlocal("decreePaper_Desc" + paperCfg.type + "_1", ["" + addTimes1, addExtent1]);
        descTxt.x = nameTxt.x;
        descTxt.y = nameTxt.y + 28;
        this._nodeContainer.addChild(descTxt);
        var descTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        descTxt.multiline = true;
        descTxt2.lineSpacing = 3;
        descTxt2.width = paperbg.width - 60;
        descTxt2.text = LanguageManager.getlocal("decreePaper_Desc" + paperCfg.type + "_2", ["" + addTimes2, addExtent2]);
        descTxt2.x = descTxt.x;
        descTxt2.y = descTxt.y + 28;
        this._nodeContainer.addChild(descTxt2);
        if (PlatformManager.checkIsEnSp()) {
            nameTxt.size = 18;
            descTxt.size = 17;
            descTxt.width = 390;
            descTxt.lineSpacing = 2;
            descTxt.x = 162;
            descTxt.x - 15;
            descTxt.y = nameTxt.y + 25;
            descTxt2.size = 17;
            descTxt2.width = 390;
            descTxt2.y = descTxt.y + descTxt.height + 3;
        }
        if (PlatformManager.checkIsThSp()) {
            nameTxt.lineSpacing = 3;
            descTxt.y = nameTxt.y + nameTxt.height + 3;
            descTxt2.y = descTxt.y + descTxt.height + 3;
        }
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_YELLOW);
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        tipTxt.text = LanguageManager.getlocal("decreePaperDetail_tip", [zoneStr + ""]);
        tipTxt.anchorOffsetX = tipTxt.width / 2;
        tipTxt.x = this.viewBg.width / 2;
        tipTxt.y = descTxt2.y + 70;
        this._nodeContainer.addChild(tipTxt);
    };
    DecreePaperDetailPopupView.prototype.ProlicyBtnClickHandlerCallBack = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            // let rData =  盖戳
            var stampImg = this.addStampFlag();
            stampImg.setScale(1.5);
            egret.Tween.get(stampImg, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300);
        }
    };
    DecreePaperDetailPopupView.prototype.addStampFlag = function () {
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
    DecreePaperDetailPopupView.prototype.ProlicyBtnClickHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.DECREEPOLICYLISTPOPUPVIEW);
    };
    DecreePaperDetailPopupView.prototype.getShowHeight = function () {
        return 500;
    };
    // 背景图名称
    DecreePaperDetailPopupView.prototype.getBgName = function () {
        return "decree_popbg";
    };
    DecreePaperDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_policy_detailbg", "decree_policy_bg1", "decree_policy_bg2", "decree_policy_bg3", "decree_policy_bg4",
            "decree_paper_listbg", "decree_book", "decree_bookbg",
            "decree_popbg", "decree_policy_icon1", "decree_policy_stamp", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4",
        ]);
    };
    // 标题背景名称
    DecreePaperDetailPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    DecreePaperDetailPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_REFRESHGD), this.ProlicyBtnClickHandlerCallBack, this);
        this._nodeContainer = null;
        this._paperIdx = null;
        _super.prototype.dispose.call(this);
    };
    return DecreePaperDetailPopupView;
}(PopupView));
__reflect(DecreePaperDetailPopupView.prototype, "DecreePaperDetailPopupView");
//# sourceMappingURL=DecreePaperDetailPopupView.js.map