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
var BetheKingVotePopupView = (function (_super) {
    __extends(BetheKingVotePopupView, _super);
    function BetheKingVotePopupView() {
        return _super.call(this) || this;
    }
    BetheKingVotePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_VOTE, this.voteCallBackHandler, this);
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 670;
        rankBg.setPosition(39, 10);
        this.addChildToContainer(rankBg);
        var innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.width = rankBg.width - 20;
        innerBg.height = rankBg.height - 20;
        innerBg.x = rankBg.x + 10;
        innerBg.y = rankBg.y + 10;
        this.addChildToContainer(innerBg);
        var rbg2 = BaseBitmap.create("public_left2");
        rbg2.width = innerBg.width - 10;
        rbg2.height = 40;
        rbg2.x = innerBg.x + 5;
        rbg2.y = innerBg.y + innerBg.height - 5 - rbg2.height;
        this.addChildToContainer(rbg2);
        var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
        tipTxt.text = LanguageManager.getlocal("betheking_my_popularity2", ["" + this._acVo.cnum]);
        tipTxt.x = rbg2.x + rbg2.width / 2 - tipTxt.width / 2;
        tipTxt.y = rbg2.y + rbg2.height / 2 - tipTxt.height / 2 + 3;
        this.addChildToContainer(tipTxt);
        this._tipTxt = tipTxt;
        var rbg3 = BaseBitmap.create("public_up3");
        rbg3.width = innerBg.width - 10;
        rbg3.height = 70;
        rbg3.x = innerBg.x + 5;
        rbg3.y = innerBg.y + 5;
        this.addChildToContainer(rbg3);
        var votetipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        votetipTxt.multiline = true;
        votetipTxt.lineSpacing = 5;
        votetipTxt.width = rbg3.width - 80;
        votetipTxt.text = LanguageManager.getlocal("betheKing_voteTips");
        votetipTxt.x = rbg3.x + rbg3.width / 2 - votetipTxt.width / 2;
        votetipTxt.textAlign = egret.HorizontalAlign.CENTER;
        votetipTxt.y = rbg3.y + rbg3.height / 2 - votetipTxt.height / 2;
        this.addChildToContainer(votetipTxt);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = 500;
        titleBg.height = 36;
        titleBg.setPosition(59, rbg3.y + rbg3.height + 10);
        this.addChildToContainer(titleBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(100, titleBg.y + titleBg.height / 2 - rankText.height / 2 + 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.text = LanguageManager.getlocal("betheking_nameText");
        nameText.setPosition(rankText.x + 90, rankText.y);
        this.addChildToContainer(nameText);
        //擂台分数
        var scoreText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.text = LanguageManager.getlocal("betheking_popularity");
        scoreText.setPosition(rankText.x + 220, rankText.y);
        this.addChildToContainer(scoreText);
        //皇权值
        var powerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        powerText.text = LanguageManager.getlocal("betheking_powerText");
        powerText.setPosition(rankText.x + 370, rankText.y);
        this.addChildToContainer(powerText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, innerBg.width - 20, innerBg.height - titleBg.y - titleBg.height - 10 - rbg2.height);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        BetheKingVoteScrollItem._ACVO = this._acVo;
        var tmpList = this._acVo.getRankInfos();
        var _scrollList = ComponentManager.getScrollList(BetheKingVoteScrollItem, tmpList, rect);
        _scrollList.setPosition(innerBg.x + 10, titleBg.y + titleBg.height + 10);
        this.addChildToContainer(_scrollList);
    };
    BetheKingVotePopupView.prototype.voteCallBackHandler = function (event) {
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            this._tipTxt.text = LanguageManager.getlocal("betheking_my_popularity2", ["" + this._acVo.cnum]);
            NetManager.request(NetRequestConst.REQUEST_KINGS_KINGINFO, { activeId: this._acVo.aidAndCode });
        }
    };
    BetheKingVotePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_VOTE, this.voteCallBackHandler, this);
        this._aid = null;
        this._code = null;
        this._acVo = null;
        this._tipTxt = null;
        _super.prototype.dispose.call(this);
    };
    return BetheKingVotePopupView;
}(PopupView));
__reflect(BetheKingVotePopupView.prototype, "BetheKingVotePopupView");
