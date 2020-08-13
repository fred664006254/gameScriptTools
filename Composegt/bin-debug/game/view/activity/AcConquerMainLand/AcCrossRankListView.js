/**
 * 跨服活动区服内排行榜
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
var AcCrossRankListView = (function (_super) {
    __extends(AcCrossRankListView, _super);
    function AcCrossRankListView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this.atkracedes5 = null;
        return _this;
    }
    AcCrossRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rankinglist_rank1",
            "rankinglist_rank2",
            "rankinglist_rank3",
        ]);
    };
    AcCrossRankListView.prototype.initView = function () {
        // let tabName = ["atkraceRank"];
        var _this = this;
        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,null,null);
        // tabbarGroup.x = 40;
        // tabbarGroup.y = 10;
        // this.addChildToContainer(tabbarGroup);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 588;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 10);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("public_9_bg37");
        titleBg.width = rankBg.width;
        titleBg.height = 36;
        titleBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(titleBg);
        this._infoList.forEach(function (unit) {
            unit.type = 'rank';
            unit.zid = _this.param.data.zid;
        });
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        //排名
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(160, rankText.y);
        this.addChildToContainer(nameText);
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(300, rankText.y);
        this.addChildToContainer(quText);
        //擂台分数
        var score = '';
        switch (this.param.data.acid) {
            case 'crossServerIntimacy':
                score = 'croessImacyScore-1';
                break;
            case 'crossServerPower':
                score = 'croessPowerScore-1';
                break;
            case 'crossServerAtkRace':
                score = 'atkraceScore';
                break;
        }
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal(score), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(407, rankText.y);
        this.addChildToContainer(scoreText);
    };
    AcCrossRankListView.prototype.getRequestData = function () {
        var str = '';
        switch (this.param.data.acid) {
            case 'crossServerIntimacy':
                str = NetRequestConst.REQUEST_ACTIVITY_IMACYRANK;
                break;
            case 'crossServerPower':
                str = NetRequestConst.REQUEST_ACTIVITY_POWERRANK;
                break;
            case 'crossServerAtkRace':
                str = NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK;
                break;
        }
        return { requestType: str, requestData: this.param.data };
    };
    AcCrossRankListView.prototype.receiveData = function (data) {
        this._infoList = [];
        if (data.ret) {
            for (var i in data.data.data.atkrank) {
                this._infoList.push(data.data.data.atkrank[i]);
            }
            //this._infoList = data.data.data.atkrank;
        }
    };
    AcCrossRankListView.prototype.dispose = function () {
        this._scrollList = null;
        this._infoList = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossRankListView;
}(PopupView));
__reflect(AcCrossRankListView.prototype, "AcCrossRankListView");
