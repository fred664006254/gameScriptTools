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
var AcWipeBossRankView = (function (_super) {
    __extends(AcWipeBossRankView, _super);
    function AcWipeBossRankView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._myNameTxt = null;
        _this._myRankTxt = null;
        _this._myScoreTxt = null;
        _this._titleTxt = null;
        _this._titleTxt3 = null;
        _this.bottomBg = null;
        _this._x = 0;
        return _this;
    }
    Object.defineProperty(AcWipeBossRankView.prototype, "api", {
        get: function () {
            return Api.wipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWipeBossRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWipeBossRankView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankTab1",
            "acPunishRankTab2",
            "acPunishRankTab3",
        ];
    };
    AcWipeBossRankView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao"
        ]);
    };
    AcWipeBossRankView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB_OLD;
    };
    AcWipeBossRankView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcWipeBossRankView.prototype.initView = function () {
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
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = bg1.width;
        ;
        bottomBg.height = 96;
        bottomBg.setPosition(bg1.x, bg1.y + bg1.height + 9);
        view.bottomBg = bottomBg;
        this.addChildToContainer(bottomBg);
        //acwipeBossAllianceName acwipeBossPlayerName
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPlayerName', [Api.playerVoApi.getPlayerName()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25, 10]);
        view.addChildToContainer(myNameTxt);
        view._myNameTxt = myNameTxt;
        var rankV = view.api.getMyPrank();
        var addV = view.api.getMyPScore();
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank", [str.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
        myRankStr.x = myNameTxt.x;
        myRankStr.y = myNameTxt.y + myNameTxt.height + 5;
        view.addChildToContainer(myRankStr);
        view._myRankTxt = myRankStr;
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerScore", [addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
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
        titleTxt2.x = bg2.x + 175;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        view._titleTxt = titleTxt2;
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 400 - titleTxt3.width / 2;
        this._x = titleTxt3.x;
        titleTxt3.y = titleTxt1.y;
        view.addChildToContainer(titleTxt3);
        this._titleTxt3 = titleTxt3;
    };
    AcWipeBossRankView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcWipeBossRankView.prototype.receiveData = function (data) {
        var view = this;
        view.api.setRankInfo(data.data.data);
    };
    AcWipeBossRankView.prototype.clickTabbarHandler = function (params) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, params);
        view._curTabIdx = params.index;
        //view.api.getRankInfo().allimyrank.name
        var str = '';
        var rankV = 0;
        var score = 0;
        var scorename = 'acwipeBossPlayerScore';
        switch (params.index) {
            case 0:
                rankV = view.api.getMyPrank();
                score = view.api.getMyPScore();
                break;
            case 1:
                rankV = view.api.getMyAllPrank();
                score = view.api.getMyAScore();
                break;
            case 2:
                rankV = view.api.getMyAlliMemPrank();
                score = view.api.getMyAlliMemScore();
                scorename = 'acwipeBossPlayerMem';
                break;
        }
        // params.index == 0 ? view.api.getMyPrank() :  view.api.getMyAllPrank();
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        view._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "acRankPop_titleAlliance" : "acRankPop_title2");
        view._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "acwipeBossAllianceName" : 'acwipeBossPlayerName', [params.index == 1 ? Api.playerVoApi.getPlayerAllianceName() : Api.playerVoApi.getPlayerName()]);
        view._myRankTxt.text = LanguageManager.getlocal('acwipeBossPlayerRank', [str]);
        view._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._myScoreTxt, view.bottomBg, [65,10]);
        view._titleTxt3.text = LanguageManager.getlocal(params.index == 2 ? "acRankPop_title3_12_1" : "acPunish_score");
        view._titleTxt3.x = this._x + (params.index == 2 ? -48 : 0); //params.index == 2 ? contentBg.x + 430 - view._titleTxt3.width / 2;; 
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {
    // 	// ["activity.getdragonrank"] = "划龙舟活动排行榜",
    // 	// --返回 data.rankArr 所有人排行信息
    // 	// --返回 data.myrankArr 我的排行信息
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_DBRANK,requestData:{activeId : this.acTivityId}};
    // }
    AcWipeBossRankView.prototype.getShowHeight = function () {
        return 830;
    };
    AcWipeBossRankView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcWipeBossRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcWipeBossRankView.prototype.dispose = function () {
        var view = this;
        view._myNameTxt = null;
        view._myRankTxt = null;
        view._myScoreTxt = null;
        view._titleTxt = null;
        view.bottomBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcWipeBossRankView;
}(PopupView));
__reflect(AcWipeBossRankView.prototype, "AcWipeBossRankView");
