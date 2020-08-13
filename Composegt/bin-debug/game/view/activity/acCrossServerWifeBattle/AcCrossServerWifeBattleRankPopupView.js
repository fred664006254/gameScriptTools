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
 * 活动排名
 * author qianjun
 */
var AcCrossServerWifeBattleRankPopupView = (function (_super) {
    __extends(AcCrossServerWifeBattleRankPopupView, _super);
    function AcCrossServerWifeBattleRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._myNameTxt = null;
        _this._myRankTxt = null;
        _this._myScoreTxt = null;
        _this._titleTxt = null;
        _this._titleTxt3 = null;
        _this._titleTxt4 = null;
        _this.bottomBg = null;
        _this._bg2 = null;
        _this._index = 0;
        _this._x = 0;
        return _this;
    }
    Object.defineProperty(AcCrossServerWifeBattleRankPopupView.prototype, "cfg", {
        // private get api() : CrossServerWipeBossVoApi{
        //     return Api.crossServerWipeBossVoApi;
        // }
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWifeBattleRankPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWifeBattleRankPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acCrossServerWifeBattleRankTabTitle1",
            "acCrossServerWifeBattleRankTabTitle2",
        ];
    };
    AcCrossServerWifeBattleRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao"
        ]);
    };
    AcCrossServerWifeBattleRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcCrossServerWifeBattleRankPopupView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcCrossServerWifeBattleRankPopupView.prototype.initView = function () {
        this.tabbarGroup.setSpace(10);
        var scrollListBgRect = egret.Rectangle.create();
        scrollListBgRect.setTo(0, 0, 518, 541);
        var view = this;
        var contentBg = BaseBitmap.create("public_tc_bg01");
        contentBg.width = scrollListBgRect.width + 20; //538
        contentBg.height = scrollListBgRect.height + 20 + 96 + 9; //666
        contentBg.x = this.viewBg.width / 2 - contentBg.width / 2; //view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
        contentBg.y = 55;
        view.addChildToContainer(contentBg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = scrollListBgRect.width;
        bg1.height = scrollListBgRect.height;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 65;
        scrollListBgRect.x = bg1.x;
        scrollListBgRect.y = bg1.y;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("rank_biao");
        bg2.width = bg1.width - 30;
        bg2.x = this.viewBg.width / 2 - bg2.width / 2;
        bg2.y = bg1.y + 14;
        this.addChildToContainer(bg2);
        this._bg2 = bg2;
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = bg1.width;
        ;
        bottomBg.height = 96;
        bottomBg.setPosition(bg1.x, bg1.y + bg1.height + 9);
        view.bottomBg = bottomBg;
        this.addChildToContainer(bottomBg);
        var name = "";
        var rankV = 0; //this.vo.rankData.merank;//view.api.getMyRank();
        var score = 0; //this.vo.rankData.mepoint;//view.api.getMyScore();
        var server = "";
        // if(this.param.data.index == 0){
        // 	name = this.vo.getRankServerName();
        // 	rankV = this.vo.getRankServerRank();
        // 	score = this.vo.getRankServerScore();
        // } else if(this.param.data.index == 1){
        // 	name = this.vo.getRankMyName();
        // 	rankV = this.vo.getRankMyRank();
        // 	score = this.vo.getRankMyScore();
        // 	server = this.vo.getRankMyServer();
        // }
        name = this.vo.getRankServerName();
        rankV = this.vo.getRankServerRank();
        score = this.vo.getRankServerScore();
        var myNameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25, 10]);
        this.addChildToContainer(myNameTxt);
        this._myNameTxt = myNameTxt;
        this._myNameTxt.text = LanguageManager.getlocal("acCrossServerWifeBattleRankServerName", [name]);
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        // if(this.param.data.index != 1){
        if (!this.vo.isCanJoin) {
            str = LanguageManager.getlocal('crossImacyNoAccess');
        }
        // }
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleRankServerRank", [str.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
        myRankStr.x = myNameTxt.x;
        myRankStr.y = myNameTxt.y + myNameTxt.height + 5;
        view.addChildToContainer(myRankStr);
        view._myRankTxt = myRankStr;
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleRankServerScore", [score.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65,10]);
        scoreStr.x = myNameTxt.x;
        scoreStr.y = myRankStr.y + myRankStr.height + 5;
        view.addChildToContainer(scoreStr);
        view._myScoreTxt = scoreStr;
        // 	cRankPop_title1":"排名",
        // "acRankPop_title2":"玩家名称",
        // "acRankPop_titleAlliance":"帮会名称",
        // "acRankPop_title3_11":"积分",
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + bg2.height / 2 - titleTxt1.height / 2; //contentBg.y + 8;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = bg2.x + 150; //175;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        view._titleTxt = titleTxt2;
        // this._titleTxt.text = LanguageManager.getlocal(this.param.data.index == 0 ? "serverListServer2" : "acRankPop_title2");
        this._titleTxt.text = LanguageManager.getlocal("serverListServer2");
        this._titleTxt.x = this._bg2.x + 220;
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("serverListServer2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 300; //175;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        // view._quTitleTxt = titleTxt3;
        this._titleTxt3 = titleTxt3;
        titleTxt3.visible = this.param.data.index == 1;
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = bg2.x + 415;
        this._x = titleTxt4.x;
        titleTxt4.y = titleTxt1.y;
        this._titleTxt4 = titleTxt4;
        view.addChildToContainer(titleTxt4);
    };
    AcCrossServerWifeBattleRankPopupView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcCrossServerWifeBattleRankPopupView.prototype.receiveData = function (data) {
        // let view = this;
        // view.api.setRankInfo(data.data.data);
        console.log("rankdata--->", data, data.data.data);
        this.vo.setRankData(data.data.data);
    };
    AcCrossServerWifeBattleRankPopupView.prototype.clickTabbarHandler = function (params) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, params);
        view._curTabIdx = params.index;
        //view.api.getRankInfo().allimyrank.name
        var str = '';
        var rankV = 0;
        var score = 0;
        var scorename = 'acCrossServerWifeBattleRankServerScore';
        var name = "";
        var server = "";
        switch (params.index) {
            case 0:
                name = this.vo.getRankServerName();
                rankV = this.vo.getRankServerRank();
                score = this.vo.getRankServerScore();
                break;
            case 1:
                name = this.vo.getRankMyName();
                rankV = this.vo.getRankMyRank();
                score = this.vo.getRankMyScore();
                server = this.vo.getRankMyServer();
                break;
        }
        // params.index == 0 ? view.api.getMyPrank() :  view.api.getMyAllPrank();
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        if (params.index != 1) {
            if (!this.vo.isCanJoin) {
                str = LanguageManager.getlocal('crossImacyNoAccess');
            }
        }
        this._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "acCrossServerWifeBattleRankMyName" : 'acCrossServerWifeBattleRankServerName', [name]);
        this._myRankTxt.text = LanguageManager.getlocal('acCrossServerWifeBattleRankServerRank', [str]);
        this._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
        this._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "acRankPop_title2" : "serverListServer2");
        this._titleTxt.x = params.index == 1 ? this._bg2.x + 150 : this._bg2.x + 220;
        // this._titleTxt3.text = LanguageManager.getlocal(params.index == 1 ? `acRankPop_title3_12_1` : `acPunish_score`);
        this._titleTxt3.visible = params.index == 1;
        // this._titleTxt.x = params.index == 2?this._bg2 
        // if(params.index == 0){
        // 	this._titleTxt.x = this._bg2.x + 150;
        // } else if(params.index == 1){
        // 	this._titleTxt.x = this._bg2.x + 220;
        // } else {
        // 	this._titleTxt.x = this._bg2.x + 220;
        // }
        // this._titleTxt4.x = params.index == 0?this._bg2.x + 440 : this._bg2.x + 410; 
        // this._titleTxt3.x = this._x + (params.index == 2 ? -48 : 0);//params.index == 2 ? contentBg.x + 430 - view._titleTxt3.width / 2;; 
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
    // 	// --返回 data.rankArr 所有人排行信息
    // 	// --返回 data.myrankArr 我的排行信息
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
    // }
    AcCrossServerWifeBattleRankPopupView.prototype.getShowHeight = function () {
        return 830;
    };
    AcCrossServerWifeBattleRankPopupView.prototype.getTitleStr = function () {
        return 'acCrossServerWipeBoss_rankTitle';
    };
    AcCrossServerWifeBattleRankPopupView.prototype.hide = function () {
        AcCrossServerWifeBattleView.isOpenWin = false;
        _super.prototype.hide.call(this);
    };
    AcCrossServerWifeBattleRankPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    AcCrossServerWifeBattleRankPopupView.prototype.dispose = function () {
        var view = this;
        view._myNameTxt = null;
        view._myRankTxt = null;
        view._myScoreTxt = null;
        view._titleTxt = null;
        this._titleTxt3 = null;
        this._titleTxt4 = null;
        view.bottomBg = null;
        this._bg2 = null;
        this._index = 0;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWifeBattleRankPopupView;
}(PopupView));
__reflect(AcCrossServerWifeBattleRankPopupView.prototype, "AcCrossServerWifeBattleRankPopupView");
