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
var AcArenaRankView = (function (_super) {
    __extends(AcArenaRankView, _super);
    // 滑动列表
    function AcArenaRankView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcArenaRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaRankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaRankView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcArenaRankView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcArenaRankView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "rankbg_1", "rankbg_2", "rankbg_3", "rankinglist_rankn1", "rankinglist_rankn2",
            "rankinglist_rankn3", "rank_line"
        ]).concat(arr);
    };
    AcArenaRankView.prototype.initView = function () {
        var view = this;
        var contentBg = BaseBitmap.create("public_9_bg39");
        contentBg.width = 530;
        contentBg.height = 610;
        contentBg.x = view.viewBg.x + view.viewBg.width / 2 - contentBg.width / 2;
        contentBg.y = 20;
        view.addChildToContainer(contentBg);
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 528;
        bottomBg.height = 86;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = contentBg.y + contentBg.height + 15;
        view.addChildToContainer(bottomBg);
        var titlebg = BaseBitmap.create("public_9_bg33");
        titlebg.width = 528;
        titlebg.height = 30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titlebg, contentBg);
        view.addChildToContainer(titlebg);
        //acwipeBossAllianceName acwipeBossPlayerName
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossPlayerName', [Api.playerVoApi.getPlayerName()]), 22);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25, 10]);
        view.addChildToContainer(myNameTxt);
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
        var myRankStr = ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank", [str.toString()]), 22, color);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25 + GameData.popupviewOffsetX, 10]);
        view.addChildToContainer(myRankStr);
        var scoreStr = ComponentManager.getTextField(LanguageManager.getlocal("acArenaRankNum-" + view.code, [addV.toString()]), 22, TextFieldConst.COLOR_WARN_GREEN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [25 + GameData.popupviewOffsetX, 10]);
        view.addChildToContainer(scoreStr);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acArenaRankNeed-" + view.code, [this.cfg.rankNeed.toString()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, titleTxt3, bottomBg, [25 + GameData.popupviewOffsetX, 10]);
        view.addChildToContainer(titleTxt3);
        // 	cRankPop_title1":"排名",
        // "acRankPop_title2":"玩家名称",
        // "acRankPop_titleAlliance":"帮会名称",
        // "acRankPop_title3_11":"积分",
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = contentBg.x + 40;
        titleTxt1.y = contentBg.y + 5;
        view.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = contentBg.x + 175;
        titleTxt2.y = titleTxt1.y;
        view.addChildToContainer(titleTxt2);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acArenaIconNum-" + view.code), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.x = contentBg.x + 375;
        titleTxt4.y = titleTxt1.y;
        view.addChildToContainer(titleTxt4);
        var rankList = [];
        var rankInfo = view.vo.getRankInfo();
        // if(rankInfo.rankList && rankInfo.rankList.length){
        // 	rankList = rankInfo.rankList;
        // 	// for(let i in view.vo.getRankInfo().rankList){
        // 	// 	let unit = view.vo.getRankInfo().rankList[i];
        // 	// 	rankList.push({
        // 	// 		uid : unit.uid,
        // 	// 		name : unit.name,
        // 	// 		score : unit.score
        // 	// 	});
        // 	// }
        // }
        var rect2 = egret.Rectangle.create();
        rect2.setTo(0, 0, 526, 545);
        var scrollList = ComponentManager.getScrollList(AcLaborRankScrollItem, rankInfo, rect2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titlebg, [0, titlebg.height]);
        view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
    };
    AcArenaRankView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_ARENARANK, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcArenaRankView.prototype.receiveData = function (data) {
        var view = this;
        view.vo.setRankInfo(data.data.data);
    };
    AcArenaRankView.prototype.getShowHeight = function () {
        return 805;
    };
    AcArenaRankView.prototype.getTitleStr = function () {
        return 'rankViewTitle';
    };
    AcArenaRankView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AcArenaRankView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcArenaRankView;
}(PopupView));
__reflect(AcArenaRankView.prototype, "AcArenaRankView");
//# sourceMappingURL=AcArenaRankView.js.map