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
 * 排名
 * author dky
 * date 2017/11/23
 * @class AcRescueRankPopupView
 */
var AcRescueRankPopupView = (function (_super) {
    __extends(AcRescueRankPopupView, _super);
    function AcRescueRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        return _this;
        // this.initTab();
    }
    // public initView():void
    // {	
    // 	super.initView();
    // 	this.selectedTabIndex = this.param.data.tab?parseInt(this.param.data.tab):0;
    // 	let data = {index:this.selectedTabIndex}
    // 	this.clickTabbarHandler(data)
    // }
    // private initTab()
    // {
    // 	// this._selectedTabIndex = this.param.tt;
    // }
    AcRescueRankPopupView.prototype.setTabBarPosition = function () {
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
    AcRescueRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcRescueRankPopupView.prototype.getTabbarTextArr = function () {
        if (Api.switchVoApi.checkPunishAllianceRank()) {
            return ["acPunishRankTab1"];
        }
        else {
            return ["acPunishRankTab1", "acPunishRankTab2"];
        }
    };
    AcRescueRankPopupView.prototype.getListItemClass = function () {
        if (this._selectedTabIndex == 0) {
            return AcRescueRankScroll1Item;
        }
        else if (this._selectedTabIndex == 1) {
            return AcRescueRankScroll2Item;
        }
    };
    AcRescueRankPopupView.prototype.getScrollDataList = function () {
        if (this._selectedTabIndex == 0) {
            return this._acrank.rankList;
        }
        else if (this._selectedTabIndex == 1) {
            return this._acrank.arankList;
        }
    };
    AcRescueRankPopupView.prototype.initButtomInfo = function () {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueRankPopupView.aid, AcRescueRankPopupView.code);
        // let nickTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // nickTxt.x = 30;
        // nickTxt.y = 10;
        // this.buttomContainer.addChild(nickTxt);
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 30;
        nameTxt.y = 10;
        this.buttomContainer.addChild(nameTxt);
        var rankV = "10000+";
        var addV = 0;
        if (this._acrank.myrank.myrank) {
            rankV = String(this._acrank.myrank.myrank);
            addV = this._acrank.myrank.value;
        }
        var myRankTxt = ComponentManager.getTextField("", nameTxt.size, TextFieldConst.COLOR_BROWN);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        myRankTxt.x = nameTxt.x;
        myRankTxt.y = nameTxt.y + 30;
        this.buttomContainer.addChild(myRankTxt);
        var rtext = LanguageManager.getlocal("acPunishScore", [this._acVo.v.toString()]);
        var addvalueTxt = ComponentManager.getTextField(rtext, nameTxt.size, TextFieldConst.COLOR_BROWN);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y + 30;
        this.buttomContainer.addChild(addvalueTxt);
        if (this._selectedTabIndex == 0) {
        }
        else if (this._selectedTabIndex == 1) {
            var aName = LanguageManager.getlocal("allianceRankNoAlliance");
            var rankV_1 = LanguageManager.getlocal("nothing");
            var score = LanguageManager.getlocal("nothing");
            if (this._acrank.amyrank.myrank) {
                rankV_1 = String(this._acrank.amyrank.myrank);
                score = String(this._acrank.amyrank.value);
                // addV = this._acData.myrank.value;
            }
            if (Api.playerVoApi.getPlayerAllianceId() != 0) {
                aName = Api.playerVoApi.getPlayerAllianceName();
            }
            nameTxt.text = LanguageManager.getlocal("acRank_myAlliancenick", [aName]);
            myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV_1]);
            addvalueTxt.text = LanguageManager.getlocal("acPunishScore", [score]);
        }
    };
    AcRescueRankPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    /**
     * 获取活动配置
     */
    AcRescueRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE, requestData: { activeId: AcRescueRankPopupView.aid + "-" + AcRescueRankPopupView.code } };
    };
    //请求回调
    AcRescueRankPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETRESCUEACTIVE) {
            this._acrank = data.data.data.rescueActive;
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode(AcRescueRankPopupView.aid, AcRescueRankPopupView.code);
        }
    };
    AcRescueRankPopupView.prototype.rankBtnClick = function () {
    };
    AcRescueRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcRescueRankPopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._acVo = null;
        this._titleTF = null;
        this._nickNameTF = null;
        this._myRankTF = null;
        this._scoreTF = null;
        this._allianceRankTip = null;
        _super.prototype.dispose.call(this);
    };
    // private _punishRewardList: any = {};
    AcRescueRankPopupView.aid = "";
    AcRescueRankPopupView.code = "";
    return AcRescueRankPopupView;
}(RankPopupView));
__reflect(AcRescueRankPopupView.prototype, "AcRescueRankPopupView");
var AcRescueRankScroll1Item = (function (_super) {
    __extends(AcRescueRankScroll1Item, _super);
    function AcRescueRankScroll1Item() {
        return _super.call(this) || this;
    }
    return AcRescueRankScroll1Item;
}(RankPopupListItem));
__reflect(AcRescueRankScroll1Item.prototype, "AcRescueRankScroll1Item");
var AcRescueRankScroll2Item = (function (_super) {
    __extends(AcRescueRankScroll2Item, _super);
    function AcRescueRankScroll2Item() {
        return _super.call(this) || this;
    }
    return AcRescueRankScroll2Item;
}(RankPopupListItem));
__reflect(AcRescueRankScroll2Item.prototype, "AcRescueRankScroll2Item");
