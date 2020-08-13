/**
 * 跨服权势排行榜
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
var AcCrossServantPowerRankListPopupView = (function (_super) {
    __extends(AcCrossServantPowerRankListPopupView, _super);
    function AcCrossServantPowerRankListPopupView() {
        var _this = _super.call(this) || this;
        _this._infoList = [];
        _this.atkracedes5 = null;
        _this.isShowTextBoo = false;
        _this._curTabIdx = 0;
        _this._nickName = null;
        _this._nickNameTxt = null;
        _this._serverTxt = null;
        _this._playerName = null;
        _this._playerServer = null;
        _this._playerRank = null;
        _this._playerScore = null;
        _this._atkracedes5 = null;
        _this._currZidTxt = null;
        return _this;
    }
    AcCrossServantPowerRankListPopupView.prototype.getTitleStr = function () {
        return "acRankBtnTxt";
    };
    AcCrossServantPowerRankListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rank_biao",
            "rank_1", "rank_2", "rank_3", "public_tc_bg05",
        ]);
    };
    Object.defineProperty(AcCrossServantPowerRankListPopupView.prototype, "vo", {
        // private get api() : CrossPowerVoApi{
        //     return Api.crossPowerVoApi;
        // }
        // private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        //     return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        // }
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServantPowerRankListPopupView.prototype.initView = function () {
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 720;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 10);
        this.addChildToContainer(rankBg);
        var tcbg2 = BaseBitmap.create("public_tc_bg03");
        tcbg2.width = rankBg.width - 20;
        tcbg2.height = 590;
        tcbg2.x = rankBg.x + 10;
        tcbg2.y = rankBg.y + 10;
        this.addChildToContainer(tcbg2);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = 516;
        bottomBg.height = 100;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, tcbg2.y + tcbg2.height + 10);
        this.addChildToContainer(bottomBg);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.setPosition(this.viewBg.width / 2 - titleBg.width / 2, tcbg2.y + 10);
        this.addChildToContainer(titleBg);
        var deltaX = 30;
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65 + deltaX, titleBg.y + titleBg.height / 2 - rankText.height / 2 + 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(190 + deltaX, rankText.y);
        this.addChildToContainer(nameText);
        this._nickNameTxt = nameText;
        // this._nickNameTxt.visible = false;
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServantPower_rankProtxt"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(516 - quText.textWidth, rankText.y);
        this.addChildToContainer(quText);
        this._serverTxt = quText;
        //玩家名字
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nickName.setPosition(rankText.x - 20, bottomBg.y + 10);
        this.addChildToContainer(nickName);
        this._nickName = nickName;
        // this._nickName.visible = false;
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
        this._playerName = name;
        //涨幅
        var str = "" + this.vo.v;
        ;
        var socreText = ComponentManager.getTextField((LanguageManager.getlocal("acCrossServantPower_rankProtxt") + ': '), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        socreText.setPosition(nickName.x, nickName.y + nickName.height + 7);
        this.addChildToContainer(socreText);
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        socre.setPosition(socreText.x + socreText.width, socreText.y);
        this.addChildToContainer(socre);
        this._playerScore = socre;
        //排行
        var rankStr;
        var rankOrder = this.vo.myrank;
        if (rankOrder) {
            if (rankOrder > 300) {
                rankStr = "10000+";
            }
            else {
                rankStr = rankOrder.toString();
            }
        }
        else {
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        rankText2.setPosition(this._nickName.x, socreText.y + socreText.height + 7);
        this.addChildToContainer(rankText2);
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        rank.setPosition(rankText2.x + rankText2.width + 12, rankText2.y);
        this.addChildToContainer(rank);
        this._playerRank = rank;
        this._infoList = this.vo.ranks;
        // for(let i in this.api.zonerankinfos){
        // 	let unit = this.api.zonerankinfos[i];
        // 	this._infoList.push({
        // 		zid : unit.zid,
        // 		point : unit.point,
        // 		type : 'rank',
        // 		acid : this.vo.aid
        // 	});
        // }
        AcCrossServantPowerRankScrollItem._ACVO = this.vo;
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, 520, 530);
        // AcCrossServantPowerScrollItem._ACVO = this.vo;
        this._scrollList = ComponentManager.getScrollList(AcCrossServantPowerRankScrollItem, this._infoList, this._scroRect);
        this._scrollList.x = tcbg2.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
    };
    AcCrossServantPowerRankListPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this._scrollList2 = null;
        this._scroRect = null;
        this._nickName = null;
        this._nickNameTxt = null;
        this._serverTxt = null;
        this._playerName = null;
        this._playerServer = null;
        this._playerRank = null;
        this._playerScore = null;
        this._atkracedes5 = null;
        this._infoList = [];
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerRankListPopupView;
}(PopupView));
__reflect(AcCrossServantPowerRankListPopupView.prototype, "AcCrossServantPowerRankListPopupView");
