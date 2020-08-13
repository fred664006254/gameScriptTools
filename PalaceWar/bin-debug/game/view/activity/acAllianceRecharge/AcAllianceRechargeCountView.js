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
 * 帮会充值活动
 * date 2018/10/17
 * @class AllianceRechargeCountView
 */
var AcAllianceRechargeCountView = (function (_super) {
    __extends(AcAllianceRechargeCountView, _super);
    function AcAllianceRechargeCountView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._rewardTime = null;
        _this._activityTimerText = null;
        _this._activityDes = null;
        _this._acCDTxt = null;
        _this._activityDes2 = null;
        _this._chrargeType = 0;
        _this._titleBg = null;
        return _this;
    }
    Object.defineProperty(AcAllianceRechargeCountView.prototype, "cfg", {
        get: function () {
            var currCode = this.param.data.code;
            if (!currCode) {
                currCode = this.code;
            }
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, currCode);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeCountView.prototype.getUiCode = function () {
        var currCode = this.param.data.code;
        if (!currCode) {
            currCode = this.code;
        }
        return currCode;
    };
    Object.defineProperty(AcAllianceRechargeCountView.prototype, "acVo", {
        get: function () {
            var currCode = this.param.data.code;
            if (!currCode) {
                currCode = this.code;
            }
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, currCode);
        },
        enumerable: true,
        configurable: true
    });
    AcAllianceRechargeCountView.prototype.getTitleStr = function () {
        var str = this.aid + "-" + this.getUiCode();
        return "ac" + App.StringUtil.firstCharToUper(str) + "_Title";
    };
    AcAllianceRechargeCountView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGECOUNTINFO, requestData: { activeId: this.aid + "-" + this.getUiCode() } };
    };
    AcAllianceRechargeCountView.prototype.receiveData = function (data) {
        if (data.ret) {
            // console.log(data.ret); 
        }
    };
    AcAllianceRechargeCountView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH, this.refreshBtnStatus, this);
        this._titleBg = BaseLoadBitmap.create("acallianrechargetitlebg_" + this.getUiCode());
        this._titleBg.name = "titleBg";
        this._titleBg.width = 640;
        this._titleBg.height = 254;
        this._titleBg.x = GameConfig.stageWidth / 2 - this._titleBg.width / 2;
        this._titleBg.y = -15;
        this.addChildToContainer(this._titleBg);
        // 活动时间
        this._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceTime", [this.acVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 130;
        this._activityTimerText.y = 285;
        this.addChild(this._activityTimerText);
        //倒计时文本 
        var acCDTxt = ComponentManager.getTextField("acAlliance_acCD", TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
        acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [""]);
        acCDTxt.x = 210;
        acCDTxt.y = 287 + 32;
        this.addChild(acCDTxt);
        this._acCDTxt = acCDTxt;
        // 内容描述
        this._activityDes = ComponentManager.getTextField(LanguageManager.getlocal("acAlliance-" + this.getUiCode() + "-describe"), 22, TextFieldConst.COLOR_BROWN);
        this._activityDes.width = 560;
        this._activityDes.height = 85;
        this._activityDes.x = 40;
        this._activityDes.y = 145;
        this.addChild(this._activityDes);
        this.refreshBtnStatus();
        // 内容描述2
        this._activityDes2 = ComponentManager.getTextField(LanguageManager.getlocal("acAllianceBuyDes" + this.getUiCode() + "_" + this._chrargeType), 22, TextFieldConst.COLOR_BROWN);
        this._activityDes2.width = 560;
        this._activityDes2.height = 25;
        this._activityDes2.x = GameConfig.stageWidth / 2 - this._activityDes2.width / 2;
        this._activityDes2.textAlign = TextFieldConst.ALIGH_CENTER;
        this._activityDes2.y = 250; ///this._activityDes.y+this._activityDes.height;
        this.addChild(this._activityDes2);
        var border = BaseBitmap.create("public_9_bg22");
        border.width = GameConfig.stageWidth;
        border.x = 0;
        border.y = 355 - 41 + 32;
        border.height = GameConfig.stageHeigth - border.y - 80 + 41 - 32;
        this.addChild(border);
        var bg5 = BaseBitmap.create("public_9_bg32");
        bg5.y = border.y + 20;
        bg5.x = 13;
        bg5.width = 615;
        bg5.height = border.height - 30;
        this.addChild(bg5);
        var tmpRect = null;
        var keys = this.cfg.countReward;
        tmpRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, bg5.height - 10);
        var scrollList = ComponentManager.getScrollList(AcAllianceRechargeScrollItem, keys, tmpRect, this.getUiCode());
        scrollList.setPosition(16, bg5.y + 6);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var downBottom = BaseBitmap.create("arena_bottom");
        downBottom.y = GameConfig.stageHeigth - downBottom.height;
        downBottom.x = 0;
        this.addChild(downBottom);
        var RecordBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "alliance_record", this.eventCollectHandler, this);
        RecordBtn.x = downBottom.width / 2 - RecordBtn.width / 2;
        RecordBtn.y = downBottom.y + downBottom.height / 2 - RecordBtn.height / 2;
        this.addChild(RecordBtn);
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            this.drawblackMask();
        }
    };
    AcAllianceRechargeCountView.prototype.refreshBtnStatus = function () {
        if (this.acVo.getRechargeFlag() == 1) {
            this._chrargeType = 2;
        }
        else {
            this._chrargeType = 1;
        }
        if (this._activityDes2) {
            this._activityDes2.text = LanguageManager.getlocal("acAllianceBuyDes" + this.getUiCode() + "_" + this._chrargeType);
        }
    };
    AcAllianceRechargeCountView.prototype.drawblackMask = function () {
        var _maskBmp = BaseBitmap.create("public_9_viewmask");
        _maskBmp.width = GameConfig.stageWidth;
        _maskBmp.height = GameConfig.stageHeigth;
        _maskBmp.touchEnabled = true;
        _maskBmp.y = 315 + 32;
        this.addChild(_maskBmp);
        //tip
        var tipBg = BaseBitmap.create("public_tipbg");
        tipBg.name = "tipBg";
        tipBg.x = 0;
        tipBg.y = 500;
        this.addChild(tipBg);
        var message = LanguageManager.getlocal("AllianceRechargtip");
        var msgText = ComponentManager.getTextField(message, TextFieldConst.FONTSIZE_TITLE_SMALL);
        msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
        msgText.textAlign = egret.HorizontalAlign.CENTER;
        msgText.name = "msgText";
        msgText.lineSpacing = 2;
        this.addChild(msgText);
        //按钮
        var imgBg = BaseBitmap.create("alliance_iconbg");
        imgBg.setPosition(GameConfig.stageWidth / 2 - imgBg.width / 2, tipBg.y + tipBg.height + 50);
        this.addChild(imgBg);
        var imgBtn = ComponentManager.getButton("alliance_memicon", "", this.bottomBtnClickHandler, this);
        imgBtn.setPosition(imgBg.x + imgBg.width / 2 - imgBtn.width / 2 - 5, imgBg.y + imgBg.height / 2 - imgBtn.height / 2);
        this.addChild(imgBtn);
        var imgName = BaseBitmap.create("serarchaliance");
        imgName.setPosition(imgBg.x + imgBg.width / 2 - imgName.width / 2, imgBg.y + imgBg.height - imgName.height);
        this.addChild(imgName);
        var openType = "alliance";
        var isShowNpc = Api[openType + "VoApi"].isShowNpc();
        if (!isShowNpc) {
            var lockedStr = LanguageManager.getlocal("allianUnluckDes"); //Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
            msgText.text = lockedStr;
            msgText.setPosition(tipBg.x + (tipBg.width - msgText.width) / 2, tipBg.y + (tipBg.height - msgText.height) / 2);
            msgText.textAlign = egret.HorizontalAlign.CENTER;
            imgBg.visible = false;
            imgBtn.visible = false;
            imgName.visible = false;
        }
    };
    AcAllianceRechargeCountView.prototype.bottomBtnClickHandler = function () {
        this.hide();
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
    };
    AcAllianceRechargeCountView.prototype.eventCollectHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ACALLIACERANKLISTPOPUPVIEW, {
            code: this.getUiCode(),
        });
    };
    AcAllianceRechargeCountView.prototype.getRuleInfo = function () {
        var ruleStr = this.getClassName().toLowerCase().replace("view", "") + "RuleInfo_" + this.getUiCode();
        if (LanguageManager.checkHasKey(ruleStr)) {
            return ruleStr;
        }
        return "";
    };
    AcAllianceRechargeCountView.prototype.tick = function () {
        var deltaT = this.acVo.et - GameData.serverTime - 86400 * 1;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
        }
        return false;
    };
    AcAllianceRechargeCountView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "alliance_iconbg",
            "alliance_memicon",
            "serarchaliance",
            "progress7",
            "progress7_bg",
            "acmidautumnview_titlebg",
            "arena_bottom"
        ]);
    };
    AcAllianceRechargeCountView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH, this.refreshBtnStatus, this);
        this._activityDes2 = null;
        this._scrollList = null;
        this._rewardTime = null;
        this._activityTimerText = null;
        this._activityDes = null;
        this._acCDTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcAllianceRechargeCountView;
}(AcCommonView));
__reflect(AcAllianceRechargeCountView.prototype, "AcAllianceRechargeCountView");
//# sourceMappingURL=AcAllianceRechargeCountView.js.map