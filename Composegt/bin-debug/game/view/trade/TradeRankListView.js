/**
 * 擂台排行榜
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
var TradeRankListView = (function (_super) {
    __extends(TradeRankListView, _super);
    function TradeRankListView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this._merank = 0;
        _this._mepoint = 0;
        _this.atkracedes5 = null;
        _this.isShowTextBoo = false;
        return _this;
    }
    TradeRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "rankinglist_line",
            // "rankinglist_rankbg",
            // "rankinglist_rank1",
            // "rankinglist_rank2",
            // "rankinglist_rank3",
            "rank_line",
            "dinner_rankbg",
            "rank_biao",
            "rank_1",
            "rank_2",
            "rank_3"
        ]);
    };
    TradeRankListView.prototype.initView = function () {
        var tabName = ["tradeRank"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, null, null);
        tabbarGroup.x = 50;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);
        // let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // rankBg.width = 520;
        // rankBg.height = 526;
        // rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
        // this.addChildToContainer(rankBg);
        var outBg = BaseBitmap.create("public_tc_bg01");
        outBg.width = 538;
        outBg.height = 521 + 84 + 30;
        outBg.setPosition(this.viewBg.width / 2 - outBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(outBg);
        var topBg = BaseBitmap.create("public_tc_bg03");
        topBg.width = outBg.width - 20;
        topBg.height = 521;
        topBg.x = this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = outBg.y + 10;
        this.addChildToContainer(topBg);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = outBg.width - 50;
        titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = topBg.y + 12;
        this.addChildToContainer(titleBg);
        // this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
        this._scroRect = new egret.Rectangle(0, 0, topBg.width, topBg.height - 12 - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(TradeRankItem, this._infoList, this._scroRect);
        this._scrollList.x = this.viewBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = titleBg.y + titleBg.height + 5;
        this.addChildToContainer(this._scrollList);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = topBg.width;
        bottomBg.height = 84;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = topBg.y + topBg.height + 10;
        this.addChildToContainer(bottomBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(100, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(225, rankText.y);
        this.addChildToContainer(nameText);
        //擂台分数
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("tradeScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(400, rankText.y);
        this.addChildToContainer(scoreText);
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nickName.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 - 5 - nickName.height);
        this.addChildToContainer(nickName);
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankText2.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(rankText2);
        //玩家名字
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
        //描述
        var atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20, TextFieldConst.COLOR_BROWN);
        atkracedes5.x = 250;
        atkracedes5.y = GameConfig.stageHeigth - 530;
        this.addChild(atkracedes5);
        atkracedes5.visible = this.isShowTextBoo;
        var rankStr;
        if (this._merank) {
            if (this._merank > 300) {
                rankStr = "10000+";
            }
            else {
                rankStr = this._merank.toString();
            }
        }
        else {
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        rank.setPosition(rankText2.x + rankText2.width + 12, rankText2.y);
        this.addChildToContainer(rank);
        //擂台分数
        var str = "";
        if (this._mepoint) {
            str = this._mepoint + "";
        }
        else {
            str = "0";
        }
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        socre.setPosition(bottomBg.x + bottomBg.width - 40 - socre.width, rankText2.y);
        this.addChildToContainer(socre);
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("tradeScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        socreText.setPosition(socre.x - 20 - socreText.width, rankText2.y);
        this.addChildToContainer(socreText);
    };
    TradeRankListView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_TRADE_RANK, requestData: {} };
    };
    TradeRankListView.prototype.receiveData = function (data) {
        if (data.ret && data.data.data.conrank[0]) {
            this._infoList = data.data.data.conrank;
            this._merank = data.data.data.merank;
            this._mepoint = data.data.data.mepoint;
            this.isShowTextBoo = false;
        }
        else {
            this.isShowTextBoo = true;
        }
    };
    TradeRankListView.prototype.dispose = function () {
        this._scrollList = null;
        this._infoList = null;
        this._merank = 0;
        _super.prototype.dispose.call(this);
    };
    return TradeRankListView;
}(PopupView));
__reflect(TradeRankListView.prototype, "TradeRankListView");
