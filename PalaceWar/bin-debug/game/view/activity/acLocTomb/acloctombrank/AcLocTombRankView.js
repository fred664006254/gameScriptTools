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
var AcLocTombRankView = (function (_super) {
    __extends(AcLocTombRankView, _super);
    function AcLocTombRankView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._myNameTxt = null;
        _this._myRankTxt = null;
        _this._myScoreTxt = null;
        _this._titleTxt = null;
        _this._titleTxt4 = null;
        _this.bottomBg = null;
        _this._tipTxt = null;
        _this._x = 0;
        return _this;
    }
    Object.defineProperty(AcLocTombRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombRankView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombRankView.prototype.getTabbarTextArr = function () {
        return [
            "acPunishRankTab1",
            "acPunishRankTab2",
            "acPunishRankTab3",
        ];
    };
    AcLocTombRankView.prototype.initView = function () {
        var view = this;
        var contentBg = BaseBitmap.create("public_9_bg39");
        contentBg.width = 528;
        contentBg.height = 540;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 59;
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
        var rankV = view.vo.getMyPrank();
        var addV = view.vo.getMyPScore();
        var str = '';
        if (rankV == 0) {
            str = LanguageManager.getlocal('atkracedes4');
        }
        else {
            str = rankV.toString();
        }
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (!view.vo.getAttendQUality()) {
            str = LanguageManager.getlocal('crossImacyNoAccess');
            color = 0xff3c3c;
        }
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank", [str.toString()]), 22, color);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25, 10]);
        view.addChildToContainer(myRankStr);
        view._myRankTxt = myRankStr;
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerScore", [addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65, 10]);
        view.addChildToContainer(scoreStr);
        view._myScoreTxt = scoreStr;
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = contentBg.y + 8;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = contentBg.x + 175;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        view._titleTxt = titleTxt2;
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = contentBg.x + 430 - titleTxt4.width / 2;
        this._x = titleTxt4.x;
        titleTxt4.y = titleTxt1.y;
        view.addChildToContainer(titleTxt4);
        this._titleTxt4 = titleTxt4;
    };
    AcLocTombRankView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcLocTombRankView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcLocTombRankView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("loctombranktip-" + this.code), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0, this.viewBg.height + 10]);
        this.addChild(tipTxt);
        tipTxt.visible = false;
        this._tipTxt = tipTxt;
    };
    AcLocTombRankView.prototype.clickTabbarHandler = function (params) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, params);
        view._curTabIdx = params.index;
        var str = '';
        var rankV = 0;
        var score = 0;
        var scorename = 'acwipeBossPlayerScore';
        switch (params.index) {
            case 0:
                rankV = view.vo.getMyPrank();
                score = view.vo.getMyPScore();
                break;
            case 1:
                rankV = view.vo.getMyAllPrank();
                score = view.vo.getMyAScore();
                break;
            case 2:
                rankV = view.vo.getMyAlliMemPrank();
                score = view.vo.getMyAlliMemScore();
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
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (!view.vo.getAttendQUality()) {
            str = LanguageManager.getlocal('crossImacyNoAccess');
            color = 0xff3c3c;
        }
        view._titleTxt.text = LanguageManager.getlocal(params.index == 1 ? "acRankPop_titleAlliance" : "acRankPop_title2");
        view._myNameTxt.text = LanguageManager.getlocal(params.index == 1 ? "acwipeBossAllianceName" : 'acwipeBossPlayerName', [params.index == 1 ? Api.playerVoApi.getPlayerAllianceName() : Api.playerVoApi.getPlayerName()]);
        view._myRankTxt.text = LanguageManager.getlocal('acwipeBossPlayerRank', [str]);
        view._myRankTxt.textColor = color;
        view._myScoreTxt.text = LanguageManager.getlocal(scorename, [score.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view._myScoreTxt, view.bottomBg, [65, 10]);
        view._titleTxt4.text = LanguageManager.getlocal(params.index == 2 ? "acRankPop_title3_12_1" : "acPunish_score");
        view._titleTxt4.x = this._x + (params.index == 2 ? -48 : 0); //params.index == 2 ? contentBg.x + 430 - view._titleTxt3.width / 2;; 
        view._tipTxt.visible = params.index == 2;
    };
    AcLocTombRankView.prototype.getShowHeight = function () {
        return 798;
    };
    AcLocTombRankView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcLocTombRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcLocTombRankView.prototype.dispose = function () {
        var view = this;
        view._myNameTxt = null;
        view._myRankTxt = null;
        view._myScoreTxt = null;
        view._titleTxt = null;
        view.bottomBg = null;
        view._curTabIdx = 0;
        view._acData = null;
        view._selectChildData = null;
        view._titleTxt4 = null;
        view._tipTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombRankView;
}(PopupView));
__reflect(AcLocTombRankView.prototype, "AcLocTombRankView");
//# sourceMappingURL=AcLocTombRankView.js.map