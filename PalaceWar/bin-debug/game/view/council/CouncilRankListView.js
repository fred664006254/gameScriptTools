/**
 * 奖励排行榜
 */
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
var CouncilRankListView = (function (_super) {
    __extends(CouncilRankListView, _super);
    function CouncilRankListView() {
        return _super.call(this) || this;
    }
    CouncilRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rankinglist_rank1",
            "rankinglist_rank2",
            "rankinglist_rank3",
            "atkracecross_rewatdbg3",
            "discussline"
        ]);
    };
    Object.defineProperty(CouncilRankListView.prototype, "api", {
        get: function () {
            return Api.councilVoApi;
        },
        enumerable: true,
        configurable: true
    });
    CouncilRankListView.prototype.initView = function () {
        var view = this;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListTip1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view.viewBg, [0, 20]);
        view.addChildToContainer(tipTxt);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 530;
        rankBg.height = 610;
        rankBg.setPosition(view.viewBg.width / 2 - rankBg.width / 2, tipTxt.y + tipTxt.textHeight + 10);
        view.addChildToContainer(rankBg);
        // let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg41");
        // titleBg.width = rankBg.width;
        // titleBg.height = 36;
        // titleBg.setPosition(rankBg.x , rankBg.y);
        // this.addChildToContainer(titleBg);
        // let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // view.setLayoutPosition(LayoutConst.leftverticalCenter, rankText, titleBg, [40,0]);
        // this.addChildToContainer(rankText);
        // //玩家奖励
        // let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListParam1"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // view.setLayoutPosition(LayoutConst.leftverticalCenter, nameText, titleBg, [195,0]);
        // this.addChildToContainer(nameText); 
        // //每名门客奖励
        // let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("councilRankListParam2"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        // view.setLayoutPosition(LayoutConst.rightverticalCenter, quText, titleBg, [40,0]);
        // this.addChildToContainer(quText); ;
        var arr = [];
        var temp = view.api.getArr('rankList');
        for (var i in temp) {
            var unit = temp[i];
            arr.push({
                exp: unit.exp,
                bookexp: unit.bookExp,
                maxRank: unit.maxRank,
                minRank: unit.minRank
            });
        }
        var scroRect = new egret.Rectangle(rankBg.x, rankBg.y, rankBg.width, rankBg.height - 16);
        this._scrollList = ComponentManager.getScrollList(CouncilRewardRankItem, arr, scroRect);
        this._scrollList.x = rankBg.x;
        this._scrollList.y = rankBg.y;
        this.addChildToContainer(this._scrollList);
    };
    CouncilRankListView.prototype.getShowWidth = function () {
        return 570;
    };
    CouncilRankListView.prototype.getShowHeight = function () {
        return 740;
    };
    CouncilRankListView.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return CouncilRankListView;
}(PopupView));
__reflect(CouncilRankListView.prototype, "CouncilRankListView");
//# sourceMappingURL=CouncilRankListView.js.map