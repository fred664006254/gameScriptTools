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
var LadderRankViewTab2 = (function (_super) {
    __extends(LadderRankViewTab2, _super);
    function LadderRankViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._myrank = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(LadderRankViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode("ladderTournament", "1");
        },
        enumerable: true,
        configurable: true
    });
    LadderRankViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.resetInfo, this);
        var listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 268;
        listbg.setPosition(8, 0);
        this.addChild(listbg);
        var tmpRect = new egret.Rectangle(0, 0, listbg.width, listbg.height - 16);
        var scrollList = ComponentManager.getScrollList(LadderRankViewTab2Item, this.vo.getArr("rankReward"), tmpRect);
        view._scrollList = scrollList;
        scrollList.setPosition(listbg.x, listbg.y + 8);
        view.addChild(scrollList);
        scrollList.bounces = false;
        var bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.y = listbg.y + listbg.height + 7;
        this.addChild(bottomBg);
        var bottomText1 = ComponentManager.getTextField(LanguageManager.getlocal("acRank_myrank1", ["1"]), 20, TextFieldConst.COLOR_WHITE);
        bottomText1.setPosition(65, bottomBg.y + 30);
        this.addChild(bottomText1);
        var bottomText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_refresh_tip"), 20, TextFieldConst.COLOR_WHITE);
        bottomText2.setPosition(bottomText1.x, bottomBg.y + 73);
        this.addChild(bottomText2);
        this._myrank = bottomText1;
        this.resetInfo();
    };
    LadderRankViewTab2.prototype.resetInfo = function () {
        var myinfo = Api.laddertournamentVoApi.getMyRankArray();
        var ranknum = myinfo.myrank;
        var rankstr;
        if (ranknum) {
            rankstr = String(ranknum);
        }
        else {
            rankstr = LanguageManager.getlocal("acLadder_notJoin");
        }
        this._myrank.text = LanguageManager.getlocal("acRank_myrank1", [rankstr]);
    };
    LadderRankViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK), this.resetInfo, this);
        this._scrollList = null;
        this._myrank = null;
        _super.prototype.dispose.call(this);
    };
    return LadderRankViewTab2;
}(CommonViewTab));
__reflect(LadderRankViewTab2.prototype, "LadderRankViewTab2");
//# sourceMappingURL=LadderRankViewTab2.js.map