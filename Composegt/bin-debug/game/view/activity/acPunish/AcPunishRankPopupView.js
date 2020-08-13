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
 * @class AcPunishRankPopupView
 */
var AcPunishRankPopupView = (function (_super) {
    __extends(AcPunishRankPopupView, _super);
    function AcPunishRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        return _this;
    }
    // public initView():void
    // {		
    // 	// this._acData = this.param.data.acData;
    // 	// let tabName = ["acPunishRankTab1","acPunishRankTab2"];
    //     // if(Api.switchVoApi.checkPunishAllianceRank()){
    //     //    tabName = ["acPunishRankTab1"];
    //     // }
    //     // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
    //     // tabbarGroup.x = 35;
    //     // tabbarGroup.y = 15;
    //     // this.addChildToContainer(tabbarGroup);
    // 	// let bg1= BaseBitmap.create("public_9v_bg04");
    //     // bg1.width = 520;
    //     // bg1.height = 600;
    //     // bg1.x = this.viewBg.width/2 - bg1.width/2;
    //     // bg1.y = 60;
    //     // this.addChildToContainer(bg1);
    //     // let bg2= BaseBitmap.create("public_9_bg33");
    //     // bg2.width = bg1.width;
    //     // bg2.height = 40;
    //     // bg2.x = bg1.x;
    //     // bg2.y = bg1.y;
    //     // this.addChildToContainer(bg2);
    // 	// let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
    //     // titleTxt1.x = bg2.x+40;
    //     // titleTxt1.y = bg2.y + 8;
    //     // this.addChildToContainer(titleTxt1);
    //     // this._titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
    //     // this._titleTF.x = bg2.x+175;
    //     // this._titleTF.y = titleTxt1.y;
    //     // this.addChildToContainer(this._titleTF);
    //     // // let titleStr3:string;
    //     // // if(acRankInfoVo.getProgressTitle()=="")
    //     // // {
    //     // //     titleStr3 = LanguageManager.getlocal("pointNumber");
    //     // // }
    //     // // else
    //     // {
    //     //     titleStr3 = acRankInfoVo.getProgressTitle();
    //     // }
    //     let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"),titleTxt1.size,TextFieldConst.COLOR_LIGHT_YELLOW)
    //     titleTxt3.x = bg2.x+430 - titleTxt3.width/2;
    //     titleTxt3.y = titleTxt1.y;
    //     this.addChildToContainer(titleTxt3);
    //     let bg3= BaseBitmap.create("public_9_bg1");
    //     bg3.width = bg1.width;
    //     bg3.height = 100;
    //     bg3.x = bg1.x;
    //     bg3.y = bg1.y + bg1.height + 9;
    //     this.addChildToContainer(bg3);
    // 	this._nickNameTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
    //     this._nickNameTF.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
    //     this._nickNameTF.x = bg3.x+20;
    //     this._nickNameTF.y = bg3.y + 20;
    //     this.addChildToContainer(this._nickNameTF);
    // 	let rankV = "10000+";
    //     let addV = 0;
    //     if(this._acData.myrank.myrank)
    //     {
    //         rankV = String(this._acData.myrank.myrank);
    //         addV = this._acData.myrank.value;
    //     }
    //     this._myRankTF = ComponentManager.getTextField("",this._nickNameTF.size,TextFieldConst.COLOR_LIGHT_YELLOW)
    //     this._myRankTF.text = LanguageManager.getlocal("acRank_myrank",[rankV]);
    //     this._myRankTF.x = this._nickNameTF.x;
    //     this._myRankTF.y = this._nickNameTF.y+40;
    //     this.addChildToContainer(this._myRankTF);
    //     // let addStr = ""
    //     // if(this._acData.getProgressDesc() == "")
    //     // {
    //     //     addStr  = LanguageManager.getlocal("acRankPop_title3_"+this._code);
    //     // }
    //     // else
    //     // {
    //     //     addStr  = this._acData.getProgressDesc();
    //     // }
    //     this._scoreTF = ComponentManager.getTextField( "",this._nickNameTF.size,TextFieldConst.COLOR_LIGHT_YELLOW)
    //     this._scoreTF.text = LanguageManager.getlocal("acPunishScore",[this._acVo.v.toString()]);
    //     this._scoreTF.x = this._myRankTF.x + 240;
    //     this._scoreTF.y = this._myRankTF.y ;
    //     this.addChildToContainer(this._scoreTF);
    // 	let dataList = this._acData.rankList;
    // 	let rect = egret.Rectangle.create();
    // 	rect.setTo(0,0,this.viewBg.width,bg1.height - 70);
    // 	this._scrollList = ComponentManager.getScrollList(AcPunishRankScrollItem,dataList,rect);
    // 	this.addChildToContainer(this._scrollList);
    // 	// this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
    // 	this._scrollList.y  = bg2.y+50;
    // 	this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )
    //     if(this.param.data.tt == 1){
    //         this._curTabIdx = 0;
    //         tabbarGroup.selectedIndex = 0;
    //     }
    //     else{
    //         this._curTabIdx = 1;
    //         tabbarGroup.selectedIndex = 1;
    //     }
    //     if(!this.param.data.tt){
    //          this._curTabIdx = 0;
    //         tabbarGroup.selectedIndex = 0;
    //     }
    //     this._allianceRankTip = ComponentManager.getTextField( "",19,TextFieldConst.COLOR_BROWN)
    //     this._allianceRankTip.text = LanguageManager.getlocal("acPunishRankTip");
    //     this._allianceRankTip.x = this.viewBg.x + this.viewBg.width/2 - this._allianceRankTip.width/2 ;
    //     this._allianceRankTip.y = this._myRankTF.y + 55;
    //     this._allianceRankTip.visible = false;
    //     this.addChildToContainer(this._allianceRankTip);
    //     this.refreshRankList();
    //     // this.tabBtnClickHandler(null);;
    // }
    AcPunishRankPopupView.prototype.setTabBarPosition = function () {
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
    AcPunishRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcPunishRankPopupView.prototype.getTabbarTextArr = function () {
        if (Api.switchVoApi.checkPunishAllianceRank()) {
            return ["acPunishRankTab1"];
        }
        else {
            return ["acPunishRankTab1", "acPunishRankTab2"];
        }
    };
    AcPunishRankPopupView.prototype.getListItemClass = function () {
        if (this._selectedTabIndex == 0) {
            return AcPunishRankScroll1Item;
        }
        else if (this._selectedTabIndex == 1) {
            return AcPunishRankScroll2Item;
        }
    };
    AcPunishRankPopupView.prototype.getScrollDataList = function () {
        if (this._selectedTabIndex == 0) {
            return this._acrank.rankList;
        }
        else if (this._selectedTabIndex == 1) {
            return this._acrank.arankList;
        }
    };
    AcPunishRankPopupView.prototype.initButtomInfo = function () {
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishRankPopupView.aid, AcPunishRankPopupView.code);
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
    AcPunishRankPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    /**
     * 获取活动配置
     */
    AcPunishRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE, requestData: { activeId: AcPunishRankPopupView.aid + "-" + AcPunishRankPopupView.code } };
    };
    //请求回调
    AcPunishRankPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ACTIVITY_GETPUNISHACTIVE) {
            this._acrank = data.data.data.punishActive;
            this._acVo = Api.acVoApi.getActivityVoByAidAndCode(AcPunishRankPopupView.aid, AcPunishRankPopupView.code);
        }
    };
    AcPunishRankPopupView.prototype.rankBtnClick = function () {
    };
    AcPunishRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcPunishRankPopupView.prototype.dispose = function () {
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
    AcPunishRankPopupView.aid = "";
    AcPunishRankPopupView.code = "";
    return AcPunishRankPopupView;
}(RankPopupView));
__reflect(AcPunishRankPopupView.prototype, "AcPunishRankPopupView");
var AcPunishRankScroll1Item = (function (_super) {
    __extends(AcPunishRankScroll1Item, _super);
    function AcPunishRankScroll1Item() {
        return _super.call(this) || this;
    }
    return AcPunishRankScroll1Item;
}(RankPopupListItem));
__reflect(AcPunishRankScroll1Item.prototype, "AcPunishRankScroll1Item");
var AcPunishRankScroll2Item = (function (_super) {
    __extends(AcPunishRankScroll2Item, _super);
    function AcPunishRankScroll2Item() {
        return _super.call(this) || this;
    }
    return AcPunishRankScroll2Item;
}(RankPopupListItem));
__reflect(AcPunishRankScroll2Item.prototype, "AcPunishRankScroll2Item");
