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
 * 朝廷诏令
 * date 2020.3.24
 * author ycg
 * @class AcChaoTingView
 */
var AcChaoTingView = (function (_super) {
    __extends(AcChaoTingView, _super);
    function AcChaoTingView() {
        var _this = _super.call(this) || this;
        _this._acTimeTf = null;
        _this._tabShowHeight = 0;
        return _this;
    }
    AcChaoTingView.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.container.y = 0;
        var infoBgStr = ResourceManager.hasRes("acchaoting_topbg-" + this.getTypeCode()) ? "acchaoting_topbg-" + this.getTypeCode() : "acchaoting_topbg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        this.addChildToContainer(infoBg);
        this.tabbarGroup.setSpace(0);
        this.setTabBarPosition();
        this.tabbarGroup.y = infoBg.y + infoBg.height - 7;
        if (this.tabbarGroupBg) {
            this.tabbarGroupBg.x = GameConfig.stageWidth / 2 - this.tabbarGroupBg.width / 2;
            this.tabbarGroupBg.y = infoBg.y + infoBg.height;
        }
        this.setBigFameY(0);
        this.setBigFameCorner(1);
        this._tabShowHeight = GameConfig.stageHeigth - infoBg.y - infoBg.height - this.tabbarGroupBg.height - 5;
        var decsBgImg = ResourceManager.hasRes("acchaoting_infobg-" + this.getTypeCode()) ? "acchaoting_infobg-" + this.getTypeCode() : "acchaoting_infobg-1";
        var descBg = BaseBitmap.create(decsBgImg);
        descBg.setPosition(GameConfig.stageWidth - descBg.width, infoBg.y + 5);
        this.addChildToContainer(descBg);
        //活动时间
        var acDate = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDate.setPosition(descBg.x + 25, descBg.y + 30);
        this.addChild(acDate);
        //倒计时
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._acTimeTf.setPosition(acDate.x, acDate.y + acDate.height + 5);
        this.addChildToContainer(this._acTimeTf);
        //活动说明
        var acDescStr = LanguageManager.getlocal("acChaotingInfo-" + this.getTypeCode(), ["" + this.cfg.cost, "" + this.cfg.number]);
        var acDesc = ComponentManager.getTextField(acDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.setPosition(acDate.x, this._acTimeTf.y + this._acTimeTf.height + 6);
        acDesc.width = 300;
        acDesc.lineSpacing = 5;
        this.addChildToContainer(acDesc);
        //排行榜按钮
        var rankBtnImg = ResourceManager.hasRes("acchaoting_rankbtn-" + this.getTypeCode()) ? "acchaoting_rankbtn-" + this.getTypeCode() : "acchaoting_rankbtn-1";
        var rankBtn = ComponentManager.getButton(rankBtnImg, "", function () {
            // if (this.vo.getToolNum() >= this.cfg.number){
            //     //打开
            // }
            ViewController.getInstance().openView(ViewConst.POPUP.ACCHAOTINGRANKLISTPOPUPVIEW, { aid: _this.aid, code: _this.code });
        }, this);
        rankBtn.setPosition(infoBg.x + infoBg.width - rankBtn.width - 20, infoBg.y + infoBg.height - rankBtn.height - 5);
        this.addChildToContainer(rankBtn);
        //诏令
        var toolFlagImg = ResourceManager.hasRes("acchaoting_toolicon-" + this.getTypeCode()) ? "acchaoting_toolicon-" + this.getTypeCode() : "acchaoting_toolicon-1";
        var toolFlag = BaseBitmap.create(toolFlagImg);
        toolFlag.setPosition(infoBg.x + 60, infoBg.y + 50);
        this.addChildToContainer(toolFlag);
        var toolFlagEff = ComponentManager.getCustomMovieClip("acchaoting_dragoneff", 12, 70);
        toolFlagEff.width = 235;
        toolFlagEff.height = 212;
        toolFlagEff.setPosition(toolFlag.x + toolFlag.width / 2 - toolFlagEff.width / 2, toolFlag.y + toolFlag.height / 2 - toolFlagEff.height / 2 - 10);
        this.addChildToContainer(toolFlagEff);
        toolFlagEff.playWithTime(0);
        toolFlagEff.blendMode = egret.BlendMode.ADD;
        var infoTxtImg = ResourceManager.hasRes("acchaoting_infotxt-" + this.getTypeCode()) ? "acchaoting_infotxt-" + this.getTypeCode() : "acchaoting_infotxt-1";
        var infoTxt = BaseBitmap.create(infoTxtImg);
        infoTxt.setPosition(infoBg.x + 5, infoBg.y + infoBg.height - infoTxt.height);
        this.addChildToContainer(infoTxt);
        this.refreshView();
    };
    AcChaoTingView.prototype.getListShowHeight = function () {
        return this._tabShowHeight;
    };
    AcChaoTingView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acChaotingTimeCountDown", [this.vo.getCountDown()]);
    };
    AcChaoTingView.prototype.refreshView = function () {
        if (this.vo.checkRechargeRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.checkTaskRedDot()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcChaoTingView.prototype.getTabbarGroupY = function () {
        return 425;
    };
    AcChaoTingView.prototype.getTabbarTextArr = function () {
        var code = this.getTypeCode();
        return [
            "acChaotingTabName1-" + code,
            "acChaotingTabName2-" + code,
            "acChaotingTabName3-" + code,
        ];
    };
    Object.defineProperty(AcChaoTingView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcChaoTingView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("acchaoting_titlebg-" + this.code) ? "acchaoting_titlebg-" + this.code : "acchaoting_titlebg-1";
    };
    AcChaoTingView.prototype.getTitleStr = function () {
        return "";
    };
    AcChaoTingView.prototype.getCloseBtnName = function () {
        return "acchaoting_closebtn";
    };
    AcChaoTingView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcChaoTingView.prototype.getRuleInfo = function () {
        return "acChaotingRuleInfo-" + this.getTypeCode();
    };
    AcChaoTingView.prototype.getReportTipData = function () {
        return { title: { key: "acChaotingReportTitle-" + this.getTypeCode() }, msg: { key: "acChaotingReportMsg-" + this.getTypeCode() } };
    };
    AcChaoTingView.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcChaoTingView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaoTingView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "acchaoting_topbg-1", "acchaotingcode1", "acchaoting_titlebg-1"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "progress7", "progress7_bg", "accourtduty_txtbg", "guide_hand", "public_textbrownbg", "progress5", "progress3_bg",
            "acchaoting_closebtn",
            "acchaoting_titlebg-" + this.getTypeCode(),
            "acchaoting_topbg-" + this.getTypeCode(),
            "acchaotingcode" + this.getTypeCode(),
        ]).concat(list);
    };
    AcChaoTingView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._acTimeTf = null;
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingView;
}(AcCommonView));
__reflect(AcChaoTingView.prototype, "AcChaoTingView");
//# sourceMappingURL=AcChaoTingView.js.map