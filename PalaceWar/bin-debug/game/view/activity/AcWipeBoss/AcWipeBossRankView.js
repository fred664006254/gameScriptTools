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
    AcWipeBossRankView.prototype.getOffsetY = function () {
        return -2;
    };
    AcWipeBossRankView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankTab1",
            "acPunishRankTab2",
            "acPunishRankTab3",
        ];
    };
    AcWipeBossRankView.prototype.initView = function () {
        var view = this;
        var contentBg = BaseBitmap.create("public_9_bg39");
        contentBg.width = 528;
        contentBg.height = 540;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 55;
        view.addChildToContainer(contentBg);
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 528;
        bottomBg.height = 86;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = contentBg.y + contentBg.height + 5;
        view.addChildToContainer(bottomBg);
        view.bottomBg = bottomBg;
        var titlebg = BaseBitmap.create("public_9_bg33");
        titlebg.width = 528;
        titlebg.height = 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, contentBg);
        view.addChildToContainer(titlebg);
        //acwipeBossAllianceName acwipeBossPlayerName
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPlayerName', [Api.playerVoApi.getPlayerName()]), 22);
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
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25, 10]);
        view.addChildToContainer(myRankStr);
        view._myRankTxt = myRankStr;
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerScore", [addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65, 10]);
        view.addChildToContainer(scoreStr);
        view._myScoreTxt = scoreStr;
        // 	cRankPop_title1":"排名",
        // "acRankPop_title2":"玩家名称",
        // "acRankPop_titleAlliance":"帮会名称",
        // "acRankPop_title3_11":"积分",
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = contentBg.y + 8;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = contentBg.x + 175;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        view._titleTxt = titleTxt2;
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = contentBg.x + 430 - titleTxt3.width / 2;
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
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._myScoreTxt, view.bottomBg, [65, 10]);
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
        return 798;
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
//# sourceMappingURL=AcWipeBossRankView.js.map