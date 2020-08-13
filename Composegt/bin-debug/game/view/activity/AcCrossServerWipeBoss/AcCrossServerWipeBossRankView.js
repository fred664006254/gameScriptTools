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
var AcCrossServerWipeBossRankView = (function (_super) {
    __extends(AcCrossServerWipeBossRankView, _super);
    function AcCrossServerWipeBossRankView() {
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
    Object.defineProperty(AcCrossServerWipeBossRankView.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossRankView.prototype.getTabbarTextArr = function () {
        return [
            "acCrossServerWipeBoss_rankTabTitle1",
            "acCrossServerWipeBoss_rankTabTitle2",
            "acCrossServerWipeBoss_rankTabTitle3",
        ];
    };
    AcCrossServerWipeBossRankView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao"
        ]);
    };
    AcCrossServerWipeBossRankView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB_OLD;
    };
    AcCrossServerWipeBossRankView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcCrossServerWipeBossRankView.prototype.initView = function () {
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
        // let titlebg = BaseBitmap.create("public_9_bg33");
        // titlebg.width = 528;
        // titlebg.height = 30;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, contentBg);
        // view.addChildToContainer(titlebg);
        //acwipeBossAllianceName acwipeBossPlayerName
        // switch(params.index){
        // 	case 0:
        // 		name = this.api.getMyRankName();
        // 		rankV = this.api.getMyRank();
        // 		score = this.api.getMyScore();
        // 		break;
        // 	case 1:
        // 		name = this.api.getMyServerName();
        // 		rankV = this.api.getMyServerRank();
        // 		score = this.api.getMyServerScore();
        // 		break;
        // 	case 2:
        // 		name = this.api.getMyRankName();
        // 		rankV = this.api.getMyRankInServer();
        // 		score = this.api.getMyScore();
        // 		break;
        // }
        var name = "";
        var rankV = view.api.getMyRank();
        var score = view.api.getMyScore();
        if (this.param.data.index == 0) {
            name = this.api.getMyRankName();
            rankV = this.api.getMyRank();
            score = this.api.getMyScore();
        }
        else if (this.param.data.index == 1) {
            name = this.api.getMyServerName();
            rankV = this.api.getMyServerRank();
            score = this.api.getMyServerScore();
        }
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossPlayerName', [name]), 22, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25, 10]);
        this.addChildToContainer(myNameTxt);
        this._myNameTxt = myNameTxt;
        this._myNameTxt.text = LanguageManager.getlocal(this.param.data.index == 1 ? "accrossserverwipeBossServerName" : 'accrossserverwipeBossPlayerName', [name]);
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        if (this.param.data.index != 1) {
            if (!this.vo.isCanJoin()) {
                str = LanguageManager.getlocal('crossImacyNoAccess');
            }
        }
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBossPlayerRank", [str.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
        myRankStr.x = myNameTxt.x;
        myRankStr.y = myNameTxt.y + myNameTxt.height + 5;
        view.addChildToContainer(myRankStr);
        view._myRankTxt = myRankStr;
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBossPlayerScore", [score.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
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
        this._titleTxt.text = LanguageManager.getlocal(this.param.data.index == 1 ? "serverListServer2" : "acRankPop_title2");
        this._titleTxt.x = this.param.data.index == 0 ? this._bg2.x + 150 : this._bg2.x + 220;
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("serverListServer2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 300; //175;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        // view._quTitleTxt = titleTxt3;
        this._titleTxt3 = titleTxt3;
        titleTxt3.visible = this.param.data.index == 0;
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = bg2.x + 415;
        this._x = titleTxt4.x;
        titleTxt4.y = titleTxt1.y;
        this._titleTxt4 = titleTxt4;
        view.addChildToContainer(titleTxt4);
    };
    AcCrossServerWipeBossRankView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_WIPEBOSS_GETRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcCrossServerWipeBossRankView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setRankInfo(data.data.data);
    };
    AcCrossServerWipeBossRankView.prototype.clickTabbarHandler = function (params) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, params);
        view._curTabIdx = params.index;
        //view.api.getRankInfo().allimyrank.name
        var str = '';
        var rankV = 0;
        var score = 0;
        var scorename = 'accrossserverwipeBossPlayerScore';
        var name = "";
        switch (params.index) {
            case 0:
                name = this.api.getMyRankName();
                rankV = this.api.getMyRank();
                score = this.api.getMyScore();
                break;
            case 1:
                name = this.api.getMyServerName();
                rankV = this.api.getMyServerRank();
                score = this.api.getMyServerScore();
                break;
            case 2:
                name = this.api.getMyRankName();
                rankV = this.api.getMyRankInServer();
                score = this.api.getMyScore();
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
            if (!this.vo.isCanJoin()) {
                str = LanguageManager.getlocal('crossImacyNoAccess');
            }
        }
        this._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "accrossserverwipeBossServerName" : 'accrossserverwipeBossPlayerName', [name]);
        this._myRankTxt.text = LanguageManager.getlocal('accrossserverwipeBossPlayerRank', [str]);
        this._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
        this._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "serverListServer2" : "acRankPop_title2");
        // this._titleTxt3.text = LanguageManager.getlocal(params.index == 1 ? `acRankPop_title3_12_1` : `acPunish_score`);
        this._titleTxt3.visible = params.index == 0;
        this._titleTxt.x = params.index == 0 ? this._bg2.x + 150 : this._bg2.x + 220;
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
    AcCrossServerWipeBossRankView.prototype.getShowHeight = function () {
        return 830;
    };
    AcCrossServerWipeBossRankView.prototype.getTitleStr = function () {
        return 'acCrossServerWipeBoss_rankTitle';
    };
    AcCrossServerWipeBossRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcCrossServerWipeBossRankView.prototype.dispose = function () {
        var view = this;
        view._myNameTxt = null;
        view._myRankTxt = null;
        view._myScoreTxt = null;
        view._titleTxt = null;
        this._titleTxt3 = null;
        this._titleTxt4 = null;
        view.bottomBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossRankView;
}(PopupView));
__reflect(AcCrossServerWipeBossRankView.prototype, "AcCrossServerWipeBossRankView");
