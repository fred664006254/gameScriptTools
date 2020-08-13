/**
 * 冲榜排行
 * author yanyuling
 * date 2017/11/06
 * @class AcCrossServerGemExpendPopupView
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
var AcCrossServerGemExpendPopupView = (function (_super) {
    __extends(AcCrossServerGemExpendPopupView, _super);
    function AcCrossServerGemExpendPopupView() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._acRankInfoVo = null;
        _this._allirank = null;
        return _this;
    }
    AcCrossServerGemExpendPopupView.prototype.initView = function () {
        console.log(this.param);
        var myrank = this.param.data.myrank;
        var myscore = this.param.data.myscore;
        var dataList = this.param.data.rankList;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        var startY = 20;
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 760;
        bg1.x = 42;
        bg1.y = 10;
        this._nodeContainer.addChild(bg1);
        var tcbg2 = BaseBitmap.create("public_tc_bg03");
        tcbg2.width = bg1.width - 30;
        tcbg2.height = 600;
        tcbg2.x = bg1.x + 15;
        tcbg2.y = 25;
        this._nodeContainer.addChild(tcbg2);
        var bg2 = BaseBitmap.create("rank_biao");
        bg2.width = 480;
        bg2.x = bg1.x + 20;
        bg2.y = 33;
        this._nodeContainer.addChild(bg2);
        var titleTxt2Str = LanguageManager.getlocal("acRankPop_title2");
        var titleTxt4Str = LanguageManager.getlocal("rankServer");
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 5;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(titleTxt2Str, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.name = "titleTxt2";
        titleTxt2.x = bg2.x + 145;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt4 = ComponentManager.getTextField(titleTxt4Str, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt4.name = "titleTxt4";
        titleTxt4.x = bg2.x + 285;
        titleTxt4.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt4);
        var titleStr3;
        titleStr3 = LanguageManager.getlocal("acRankPop_title3_11101");
        var titleTxt3 = ComponentManager.getTextField(titleStr3, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nodeContainer.addChild(titleTxt3);
        var moveX = 0;
        if (titleTxt3.text.length == 2) {
            moveX = 20;
        }
        this.setLayoutPosition(LayoutConst.right, titleTxt3, bg2, [25 + moveX, 0]);
        titleTxt3.y = titleTxt1.y;
        titleTxt3.name = "titleTxt3";
        var bg3 = BaseBitmap.create("public_tc_bg03");
        bg3.width = tcbg2.width;
        bg3.height = 120;
        bg3.x = tcbg2.x;
        bg3.y = tcbg2.y + tcbg2.height + 10;
        this._nodeContainer.addChild(bg3);
        var nickTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nickTxt.text = LanguageManager.getlocal("acRank_mynick", [Api.playerVoApi.getPlayerName()]);
        nickTxt.x = bg3.x + 20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);
        var rankV = "10000+";
        var addV = 0;
        rankV = String(myrank);
        addV = myscore;
        var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y + 30;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);
        var addStr = "";
        var addvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV", [titleStr3, String(addV)]);
        addvalueTxt.x = myRankTxt.x;
        addvalueTxt.y = myRankTxt.y + 30;
        addvalueTxt.name = "addvalueTxt";
        this._nodeContainer.addChild(addvalueTxt);
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, tcbg2.height - 140);
        var scrollView = ComponentManager.getScrollList(AcCrossServerGemExpendRankListScrollItem, dataList, rect);
        scrollView.y = bg2.y + 50;
        scrollView.x = 5;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
        this._scrollView = scrollView;
    };
    AcCrossServerGemExpendPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_tc_bg03",
            "public_tc_bg05",
            "public_tc_bg01",
            "rank_biao"
        ]);
    };
    AcCrossServerGemExpendPopupView.prototype.dispose = function () {
        this._aid = "";
        this._code = "";
        this._nodeContainer = null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._allirank = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerGemExpendPopupView;
}(PopupView));
__reflect(AcCrossServerGemExpendPopupView.prototype, "AcCrossServerGemExpendPopupView");
