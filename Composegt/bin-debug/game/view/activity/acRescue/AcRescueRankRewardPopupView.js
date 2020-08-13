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
 * 排名奖励
 * author dky
 * date 2017/11/22
 * @class AcPunishRankRewardPopupView
 */
var AcRescueRankRewardPopupView = (function (_super) {
    __extends(AcRescueRankRewardPopupView, _super);
    function AcRescueRankRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._acCDTxt = null;
        return _this;
    }
    AcRescueRankRewardPopupView.prototype.initView = function () {
        this._acData = this.param.data.acData;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
        // let tabName = ["acPunishRankRewardTab1"];
        // let tabName = ["acPunishRankRewardTab1","acPunishRankRewardTab2"];
        // if(Api.switchVoApi.checkPunishAllianceRank()){
        //    tabName = ["acPunishRankRewardTab1"];
        // }
        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        // tabbarGroup.x = 35;
        // tabbarGroup.y = 15;
        // this.addChildToContainer(tabbarGroup);
        var contentBg = BaseBitmap.create("public_tc_bg01");
        contentBg.width = 540;
        contentBg.height = 685;
        contentBg.x = this.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 53;
        this.addChildToContainer(contentBg);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = contentBg.width - 20;
        bottomBg.height = 110;
        bottomBg.x = contentBg.x + 10;
        bottomBg.y = contentBg.y + contentBg.height - 125;
        this.addChildToContainer(bottomBg);
        var rankV = "10000+";
        var addV = 0;
        if (this._acData.myrank.myrank) {
            rankV = String(this._acData.myrank.myrank);
            addV = this._acData.myrank.value;
        }
        var myRankStr = LanguageManager.getlocal("acPunishMyrank1", [rankV]);
        this._myRankTF = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._myRankTF.x = bottomBg.x + 25;
        this._myRankTF.y = bottomBg.y + 15;
        this.addChildToContainer(this._myRankTF);
        var rankV2 = LanguageManager.getlocal("nothing");
        var addV2 = 0;
        if (this._acData.amyrank.myrank) {
            rankV2 = String(this._acData.amyrank.myrank);
            addV2 = this._acData.myrank.value;
        }
        var myRankStr2 = LanguageManager.getlocal("acPunishMyrank2", [rankV2]);
        this._allianceRankTF = ComponentManager.getTextField(myRankStr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._allianceRankTF.x = bottomBg.x + 25;
        this._allianceRankTF.y = bottomBg.y + 15;
        this.addChildToContainer(this._allianceRankTF);
        this._allianceRankTF.visible = false;
        this._acCDTxt = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._acCDTxt.x = bottomBg.x + 220;
        this._acCDTxt.y = bottomBg.y + 15;
        this.addChildToContainer(this._acCDTxt);
        //初始化 时间
        var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * acCfg.extraTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        this._myBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishRankTab1", this.rankBtnClick, this);
        this._myBtn.x = this._myRankTF.x;
        this._myBtn.y = this._myRankTF.y + this._myRankTF.height + 13;
        // this._myBtn.
        this.addChildToContainer(this._myBtn);
        // this._myBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._aBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishRankTab2", this.rankBtnClick2, this);
        this._aBtn.x = this._myRankTF.x;
        this._aBtn.y = this._myRankTF.y + this._myRankTF.height + 13;
        // this._aBtn.
        this.addChildToContainer(this._aBtn);
        // this._aBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._aBtn.visible = false;
        var sendDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        sendDesc.x = 230;
        sendDesc.y = bottomBg.y + 60;
        this.addChildToContainer(sendDesc);
        var dataList = new Array();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
        for (var index = 1; index < 9; index++) {
            dataList.push(cfg.personRank[index.toString()]);
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 520, contentBg.height - 147);
        this._scrollList = ComponentManager.getScrollList(AcPunishRankRewardScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(contentBg.x + 10, contentBg.y + 10);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // let rect = egret.Rectangle.create();
        // rect.setTo(0,0,508,contentBg.height - 20);
        var dataList2 = new Array();
        for (var index = 1; index < 9; index++) {
            if (cfg.allianceRank[index.toString()]) {
                dataList2.push(cfg.allianceRank[index.toString()]);
            }
        }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 520, contentBg.height - 147);
        this._scrollList2 = ComponentManager.getScrollList(AcPunishRankAllianceRewardScrollItem, dataList2, rect2);
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.setPosition(contentBg.x + 10, contentBg.y + 10);
        this._scrollList2.visible = false;
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcRescueRankRewardPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.setSpace(15);
        var tabX = 0;
        var tabY = 0;
        tabX = this.viewBg.x + 43;
        tabY = this.viewBg.y + 60;
        tabY += this.getTabbarGroupY();
        ;
        this.tabbarGroup.setPosition(tabX, tabY);
    };
    // 页签图名称
    AcRescueRankRewardPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcRescueRankRewardPopupView.prototype.getTitleStr = function () {
        return "acPunishRankRewardPopupViewTitle";
    };
    AcRescueRankRewardPopupView.prototype.getTabbarTextArr = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var tabName = ["acPunishRankRewardTab1", "acPunishRankRewardTab2"];
        if (Api.switchVoApi.checkPunishAllianceRank()) {
            tabName = ["acPunishRankRewardTab1"];
        }
        return tabName;
    };
    AcRescueRankRewardPopupView.prototype.rankBtnClick = function () {
        AcRescueRankPopupView.aid = AcRescueRankRewardPopupView.aid;
        AcRescueRankPopupView.code = AcRescueRankRewardPopupView.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUERANKPOPUPVIEW);
    };
    AcRescueRankRewardPopupView.prototype.rankBtnClick2 = function () {
        AcRescueRankPopupView.aid = AcRescueRankRewardPopupView.aid;
        AcRescueRankPopupView.code = AcRescueRankRewardPopupView.code;
        ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUERANKPOPUPVIEW_TAB1);
    };
    AcRescueRankRewardPopupView.prototype.tick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
        var deltaT = this._acVo.et - GameData.serverTime - 86400 * cfg.extraTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
        }
        return false;
    };
    AcRescueRankRewardPopupView.prototype.clickTabbarHandler = function (params) {
        _super.prototype.clickTabbarHandler.call(this, this);
        this._curTabIdx = params.index;
        this.refreshRankList();
    };
    AcRescueRankRewardPopupView.prototype.refreshRankList = function () {
        var dataList = this._acData.rankList;
        if (this._curTabIdx == 0) {
            this._scrollList.visible = true;
            this._scrollList2.visible = false;
            this._aBtn.visible = false;
            this._myBtn.visible = true;
            this._myRankTF.visible = true;
            this._allianceRankTF.visible = false;
        }
        else {
            this._scrollList.visible = false;
            this._scrollList2.visible = true;
            this._aBtn.visible = true;
            this._myBtn.visible = false;
            this._myRankTF.visible = false;
            this._allianceRankTF.visible = true;
        }
    };
    AcRescueRankRewardPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcRescueRankRewardPopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._scrollList2 = null;
        this._myBtn = null;
        this._myRankTF = null;
        this._aBtn = null;
        this._allianceRankTF = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._acVo = null;
        _super.prototype.dispose.call(this);
    };
    AcRescueRankRewardPopupView.aid = "";
    AcRescueRankRewardPopupView.code = "";
    return AcRescueRankRewardPopupView;
}(PopupView));
__reflect(AcRescueRankRewardPopupView.prototype, "AcRescueRankRewardPopupView");
