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
 * 今日诏书UI
 * author yanyuling
 * date 2018/05/29
 * @class DecreeRescriptDisplayPopupView
 */
var DecreeRescriptDisplayPopupView = (function (_super) {
    __extends(DecreeRescriptDisplayPopupView, _super);
    function DecreeRescriptDisplayPopupView() {
        return _super.call(this) || this;
    }
    DecreeRescriptDisplayPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_ZANGD), this.agreeTouchHandlerCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var policyId = Api.promoteVoApi.getSpid();
        var decreeId = Api.promoteVoApi.getGdinfo().gdid;
        var decree_wordbg = BaseBitmap.create("decree_policy_detailbg");
        decree_wordbg.anchorOffsetX = decree_wordbg.width / 2;
        decree_wordbg.x = this.viewBg.width / 2;
        decree_wordbg.y = 10;
        this._nodeContainer.addChild(decree_wordbg);
        var policyCfg = Config.PolicyCfg.getPolicyById(policyId);
        var decCfg = Config.PolicyCfg.getGovDecreeById(decreeId);
        var disCfg = {};
        if (policyCfg) {
            var addaddExtent = "" + (policyCfg.addExtent * 100);
            disCfg["0"] = {
                redNameStr: "decree_rescriptTxt1",
                icon: "decree_policy_icon" + policyId,
                iconbg: "decree_bookbg",
                nameTxtStr: LanguageManager.getlocal("decreePolicy_Name" + policyId),
                descStr: LanguageManager.getlocal("decreePolicy_public_Desc" + policyCfg.id, ["" + policyCfg.addTimes, addaddExtent]),
                descStr2: undefined,
                isAgree: Api.promoteVoApi.getSinfo().isread > 0,
            };
        }
        if (decCfg) {
            var addExtent1 = "" + (decCfg.addExtent1 * 100);
            var addExtent2 = "" + (decCfg.addExtent2 * 100);
            var moreStr = "";
            if (Api.promoteVoApi.ismore()) {
                addExtent1 = "" + (decCfg.leveeTimeEff1 * 100);
                addExtent2 = "" + (decCfg.leveeTimeEff2 * 100);
                moreStr = "  " + LanguageManager.getlocal("decreepaper_ismore");
            }
            disCfg["1"] = {
                redNameStr: "decree_rescriptTxt2",
                icon: "decree_book",
                iconbg: "decree_bookbg",
                nameTxtStr: LanguageManager.getlocal("decreePaper_Name" + decCfg.type) + "-" + LanguageManager.getlocal("decreePaper_subName" + decCfg.sort) + moreStr,
                // descStr: LanguageManager.getlocal("decreePaper_Desc"+decCfg.type + "_1",[]),
                descStr: LanguageManager.getlocal("decreePaper_Desc" + decCfg.type + "_1", ["" + decCfg.addTimes1, addExtent1]),
                descStr2: LanguageManager.getlocal("decreePaper_Desc" + decCfg.type + "_2", ["" + decCfg.addTimes2, addExtent2]),
                isAgree: Api.promoteVoApi.getGdinfo().zan > 0,
            };
        }
        var startY = decree_wordbg.y + decree_wordbg.height + 5;
        for (var index = 0; index < 2; index++) {
            var scaleBg1 = BaseBitmap.create("decree_policy_bg1");
            // let scaleBg1 = BaseBitmap.create("public_9_bg45");
            // scaleBg1.width = 526;
            // scaleBg1.height = 110;
            scaleBg1.x = this.viewBg.x + this.viewBg.width / 2 - scaleBg1.width / 2;
            scaleBg1.y = startY;
            this._nodeContainer.addChild(scaleBg1);
            var decree_redflag = BaseBitmap.create("decree_redflag");
            decree_redflag.x = scaleBg1.x;
            decree_redflag.y = scaleBg1.y - 1;
            this._nodeContainer.addChild(decree_redflag);
            var redflagTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            redflagTxt.text = LanguageManager.getlocal("decree_rescriptTxt" + (index + 1));
            if (PlatformManager.checkIsTextHorizontal()) {
                decree_redflag.width = redflagTxt.width + 50;
                decree_redflag.setPosition(scaleBg1.x, scaleBg1.y);
                redflagTxt.setPosition(decree_redflag.x + 10, decree_redflag.y + decree_redflag.height / 2 - redflagTxt.height / 2 + 2);
            }
            else {
                redflagTxt.width = 25;
                redflagTxt.multiline = true;
                redflagTxt.lineSpacing = 7;
                redflagTxt.x = decree_redflag.x + 13;
                redflagTxt.y = decree_redflag.y + decree_redflag.height / 2 - redflagTxt.height / 2;
            }
            this._nodeContainer.addChild(redflagTxt);
            startY = startY + scaleBg1.height + 15;
            var cfg = disCfg["" + index];
            if (!cfg) {
                var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_QUALITY_RED);
                tipTxt.text = LanguageManager.getlocal("decreeRescriptemptyTip" + (index + 1));
                tipTxt.x = scaleBg1.x + scaleBg1.width / 2 - tipTxt.width / 2;
                tipTxt.y = scaleBg1.y + scaleBg1.height / 2 - tipTxt.height / 2;
                this._nodeContainer.addChild(tipTxt);
                continue;
            }
            var policyIconbg = BaseBitmap.create(cfg.iconbg);
            policyIconbg.x = scaleBg1.x + 105 - policyIconbg.width / 2;
            policyIconbg.y = scaleBg1.y + scaleBg1.height / 2 - policyIconbg.height / 2;
            this._nodeContainer.addChild(policyIconbg);
            var policyIcon = BaseBitmap.create(cfg.icon);
            policyIcon.x = policyIconbg.x + policyIconbg.width / 2 - policyIcon.width / 2;
            policyIcon.y = scaleBg1.y + scaleBg1.height / 2 - policyIcon.height / 2;
            this._nodeContainer.addChild(policyIcon);
            if (index == 1) {
                var agreeImg = BaseBitmap.create("decree_agree1");
                agreeImg.name = "agreeImg" + index;
                agreeImg.x = scaleBg1.x + scaleBg1.width - 50;
                agreeImg.y = scaleBg1.y + 5;
                this._nodeContainer.addChild(agreeImg);
                if (Api.promoteVoApi.getGdinfo().zan) {
                    App.DisplayUtil.changeToGray(agreeImg);
                }
                else {
                    agreeImg.addTouchTap(this.agreeTouchHandler, this, [index]);
                }
            }
            var num = 20;
            if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsRuSp()) {
                num = 18;
            }
            var nameTxt = ComponentManager.getTextField("", num, TextFieldConst.COLOR_BROWN);
            nameTxt.text = cfg.nameTxtStr;
            // nameTxt.text = LanguageManager.getlocal(cfg.nameTxtStr);
            nameTxt.x = policyIcon.x + policyIcon.width + 10;
            nameTxt.y = policyIcon.y + 10;
            this._nodeContainer.addChild(nameTxt);
            if (PlatformManager.checkIsTextHorizontal()) {
                var scaleVale = 0.75;
                policyIconbg.setScale(scaleVale);
                policyIcon.setScale(scaleVale);
                policyIconbg.setPosition(scaleBg1.x + 50, scaleBg1.y + scaleBg1.height - policyIconbg.height * 0.75 - 5);
                policyIcon.setPosition(policyIconbg.x + policyIconbg.width * scaleVale / 2 - policyIcon.width * scaleVale / 2, policyIconbg.y + policyIconbg.height * scaleVale / 2 - policyIcon.height * scaleVale / 2);
            }
            var descTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            descTxt.multiline = true;
            descTxt.lineSpacing = 3;
            if (index == 1) {
                descTxt.width = 400;
            }
            else {
                descTxt.width = 340;
            }
            descTxt.text = cfg.descStr;
            descTxt.x = nameTxt.x;
            descTxt.y = nameTxt.y + 30;
            if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsRuSp()) {
                descTxt.size = 16;
                descTxt.width = 350;
                descTxt.lineSpacing = 2;
                descTxt.x = descTxt.x - 15;
                descTxt.y = nameTxt.y + 25;
                nameTxt.x = 170;
                if (PlatformManager.checkIsRuSp()) {
                    nameTxt.x = 200;
                }
            }
            if (PlatformManager.checkIsThSp()) {
                nameTxt.lineSpacing = 3;
                descTxt.y = nameTxt.y + nameTxt.height + 3;
            }
            this._nodeContainer.addChild(descTxt);
            if (cfg.descStr2) {
                var descTxt2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
                descTxt2.multiline = true;
                descTxt2.lineSpacing = 3;
                descTxt2.width = descTxt.width;
                descTxt2.text = cfg.descStr2;
                descTxt2.x = nameTxt.x;
                descTxt2.y = descTxt.y + 30;
                this._nodeContainer.addChild(descTxt2);
                if (PlatformManager.checkIsEnSp() || PlatformManager.checkIsRuSp()) {
                    descTxt.width = 350;
                    descTxt2.size = 16;
                    descTxt2.lineSpacing = 2;
                    descTxt2.x = descTxt2.x - 15;
                    descTxt2.y = descTxt2.y - 11;
                    if (PlatformManager.checkIsRuSp()) {
                        descTxt2.width = 350;
                        nameTxt.x = 200;
                    }
                }
                if (PlatformManager.checkIsThSp()) {
                    descTxt2.y = descTxt.y + descTxt.height + 3;
                }
            }
        }
    };
    DecreeRescriptDisplayPopupView.prototype.agreeTouchHandlerCallback = function (event) {
        if (event && event.data && event.data.ret) {
            var rData = event.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal("decree_agreeSuccessTip"));
            var agreeImg = this._nodeContainer.getChildByName("agreeImg1");
            App.DisplayUtil.changeToGray(agreeImg);
        }
    };
    DecreeRescriptDisplayPopupView.prototype.agreeTouchHandler = function (obj, index) {
        if (index == 1 && Api.promoteVoApi.getGdinfo().zan != 1) {
            NetManager.request(NetRequestConst.REQUEST_POLICY_ZANGD, {});
        }
    };
    DecreeRescriptDisplayPopupView.prototype.getShowHeight = function () {
        return 570;
    };
    DecreeRescriptDisplayPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "decree_policy_detailbg", "decree_redflag", "decree_policy_icon1", "decree_policy_icon2", "decree_policy_icon3", "decree_policy_icon4",
            "agreeImg1", "agreeImg2", "decree_bookbg", "decree_book", "decree_agree1", "decree_policy_iconbg", "decree_policy_bg1",
        ]);
    };
    DecreeRescriptDisplayPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_POLICY_ZANGD), this.agreeTouchHandlerCallback, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return DecreeRescriptDisplayPopupView;
}(PopupView));
__reflect(DecreeRescriptDisplayPopupView.prototype, "DecreeRescriptDisplayPopupView");
//# sourceMappingURL=DecreeRescriptDisplayPopupView.js.map