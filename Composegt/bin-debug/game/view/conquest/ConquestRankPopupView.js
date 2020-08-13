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
 * @class ConquestRankPopupView
 */
var ConquestRankPopupView = (function (_super) {
    __extends(ConquestRankPopupView, _super);
    function ConquestRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        return _this;
    }
    ConquestRankPopupView.prototype.setTabBarPosition = function () {
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
    ConquestRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    ConquestRankPopupView.prototype.getTabbarTextArr = function () {
        return ["conquestRank"];
    };
    ConquestRankPopupView.prototype.getListItemClass = function () {
        return ConquestRankScrollItem1;
    };
    ConquestRankPopupView.prototype.getScrollDataList = function () {
        return this._acrank.conrank;
    };
    /**
     * 获取配置
     */
    ConquestRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_CONQUEST_RANK, requestData: {} };
    };
    //请求回调
    ConquestRankPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_CONQUEST_RANK) {
            this._acrank = data.data.data;
            // this._acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode("punish","1");
        }
    };
    ConquestRankPopupView.prototype.rankBtnClick = function () {
    };
    ConquestRankPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        // this.refreshRankList();
    };
    ConquestRankPopupView.prototype.initButtomInfo = function () {
        var dataList = this._acrank.rankList;
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nameTxt.x = 30;
        nameTxt.y = 10;
        this.buttomContainer.addChild(nameTxt);
        var rankV = "10000+";
        var addV = 0;
        if (this._acrank.merank) {
            rankV = String(this._acrank.merank);
            addV = this._acrank.merank;
        }
        var myRankTxt = ComponentManager.getTextField("", nameTxt.size, TextFieldConst.COLOR_BROWN);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        myRankTxt.x = nameTxt.x;
        myRankTxt.y = nameTxt.y + 30;
        this.buttomContainer.addChild(myRankTxt);
        var rtext = LanguageManager.getlocal("conquestScore") + ":" + this._acrank.mepoint;
        var addvalueTxt = ComponentManager.getTextField(rtext, nameTxt.size, TextFieldConst.COLOR_BROWN);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y + 30;
        this.buttomContainer.addChild(addvalueTxt);
        // if(this._curTabIdx == 0){
        //     let rankV = "10000+";
        //     let addV = 0;
        //     this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName()
        //     this._titleTF.text = LanguageManager.getlocal("acRankPop_title2");
        //     if(this._acrank.myrank.myrank)
        //     {
        //         rankV = String(this._acrank.myrank.myrank);
        //         addV = this._acrank.myrank.value;
        //     }
        //     this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        //     // this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
        // }
        // else{
        //     dataList = this._acData.arankList
        //     this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");
        //     let aName = LanguageManager.getlocal("allianceRankNoAlliance");
        //     let rankV = LanguageManager.getlocal("nothing");
        //     let score = LanguageManager.getlocal("nothing");
        //     let addV = 0;
        //     this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + rankV;
        //     this._titleTF.text = LanguageManager.getlocal("acRankPop_titleAlliance");
        //     if(this._acData.amyrank.myrank)
        //     {
        //         rankV = String(this._acData.amyrank.myrank);
        //         score = String(this._acData.amyrank.value);
        //         // addV = this._acData.myrank.value;
        //     }
        //     if(Api.playerVoApi.getPlayerAllianceId() != 0){
        //         aName = Api.playerVoApi.getPlayerAllianceName();
        //     }
        //     this._nickNameTF.text = LanguageManager.getlocal("acRank_myAlliancenick") + aName;
        //     this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[score]);
        //     this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
        // }
        // this._scrollList.refreshData(dataList);
    };
    ConquestRankPopupView.prototype.getTitleStr = function () {
        return "conquestRank";
    };
    ConquestRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    ConquestRankPopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        // this._acVo = null;
        this._titleTF = null;
        this._nickNameTF = null;
        this._myRankTF = null;
        this._scoreTF = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestRankPopupView;
}(RankPopupView));
__reflect(ConquestRankPopupView.prototype, "ConquestRankPopupView");
var ConquestRankScrollItem1 = (function (_super) {
    __extends(ConquestRankScrollItem1, _super);
    function ConquestRankScrollItem1() {
        return _super.call(this) || this;
    }
    return ConquestRankScrollItem1;
}(RankPopupListItem));
__reflect(ConquestRankScrollItem1.prototype, "ConquestRankScrollItem1");
