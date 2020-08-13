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
 * yanyuling
 * 问卷答题
 */
var AcExamAnswerRankPopupView = (function (_super) {
    __extends(AcExamAnswerRankPopupView, _super);
    function AcExamAnswerRankPopupView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this._merank = 0;
        _this._mepoint = 0;
        _this.atkracedes5 = null;
        return _this;
    }
    AcExamAnswerRankPopupView.prototype.initView = function () {
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 700;
        rankBg.setPosition(39, 20);
        this.addChildToContainer(rankBg);
        var innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = rankBg.width - 20;
        innerBg.height = 570;
        innerBg.x = rankBg.x + 10;
        innerBg.y = rankBg.y + 10;
        this.addChildToContainer(innerBg);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = 502;
        titleBg.height = 36;
        titleBg.setPosition(59, 45);
        this.addChildToContainer(titleBg);
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, 440);
        this._scrollList = ComponentManager.getScrollList(AcExamAnswerScrollItem, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("atkracedes5"), TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this._scrollList);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = 520;
        bottomBg.height = 100;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, innerBg.y + innerBg.height + 10);
        this.addChildToContainer(bottomBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(bottomBg.x + 50, titleBg.y + titleBg.height / 2 - rankText.height / 2 + 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(rankText.x + 160, rankText.y);
        this.addChildToContainer(nameText);
        //擂台分数
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("answer_rankscrore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(rankText.x + 330, rankText.y);
        this.addChildToContainer(scoreText);
        //下面玩家昵称
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nickName.setPosition(bottomBg.x + 30, bottomBg.y + 30);
        this.addChildToContainer(nickName);
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankText2.setPosition(nickName.x, nickName.y + nickName.height + 10);
        this.addChildToContainer(rankText2);
        //玩家名字
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
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
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("answer_rankscrore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        socreText.setPosition(bottomBg.x + 300, nickName.y);
        this.addChildToContainer(socreText);
        //擂台分数
        var str = "";
        if (this._mepoint) {
            str = this._mepoint + "";
        }
        else {
            str = "0";
        }
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        socre.setPosition(socreText.x + socreText.width + 5, socreText.y);
        this.addChildToContainer(socre);
        var answer_rankTip = ComponentManager.getTextField(LanguageManager.getlocal("answer_rankTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        answer_rankTip.setPosition(bottomBg.x + bottomBg.width - answer_rankTip.width, bottomBg.y + bottomBg.height + 20);
        this.addChildToContainer(answer_rankTip);
    };
    AcExamAnswerRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY2S_ANSWERRANK, requestData: { activeId: this.param.data.activeId } };
    };
    AcExamAnswerRankPopupView.prototype.receiveData = function (data) {
        if (data.ret && data.data.data.rank) {
            this._infoList = data.data.data.rank;
            this._merank = data.data.data.merank;
            this._mepoint = this.param.data.score;
        }
    };
    AcExamAnswerRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line", "rankinglist_rankbg",
            "rank_1", "rank_2", "rank_3", "rank_biao",
        ]);
    };
    AcExamAnswerRankPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this._infoList = null;
        this._merank = 0;
        _super.prototype.dispose.call(this);
    };
    return AcExamAnswerRankPopupView;
}(PopupView));
__reflect(AcExamAnswerRankPopupView.prototype, "AcExamAnswerRankPopupView");
