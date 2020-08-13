/**
 * 跨服亲密排行榜
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
var AcCrossServerIntimacyRankListView = (function (_super) {
    __extends(AcCrossServerIntimacyRankListView, _super);
    function AcCrossServerIntimacyRankListView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
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
        _this._socreText = null;
        return _this;
    }
    AcCrossServerIntimacyRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            // "rankinglist_rank1",
            // "rankinglist_rank2",
            // "rankinglist_rank3",
            "rank_biao",
            "rank_1", "rank_2", "rank_3", "public_tc_bg05",
        ]);
    };
    Object.defineProperty(AcCrossServerIntimacyRankListView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyRankListView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyRankListView.prototype, "api", {
        get: function () {
            return Api.crossImacyVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyRankListView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.fresh_view, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK), this.fresh_view, this);
        var tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 40;
        tabbarGroup.y = 10;
        tabbarGroup.setSpace(5);
        this.addChildToContainer(tabbarGroup);
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 720;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rankBg);
        var tcbg2 = BaseBitmap.create("public_tc_bg03");
        tcbg2.width = rankBg.width - 20;
        tcbg2.height = 590;
        tcbg2.x = rankBg.x + 10;
        tcbg2.y = rankBg.y + 10;
        this.addChildToContainer(tcbg2);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.setPosition(this.viewBg.width / 2 - titleBg.width / 2, tcbg2.y + 10);
        this.addChildToContainer(titleBg);
        this._infoList = [];
        for (var i in this.api.zonerankinfos) {
            var unit = this.api.zonerankinfos[i];
            unit.type = 'rank';
            this._infoList.push(unit);
        }
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, 500, 530);
        this._scrollList = ComponentManager.getScrollList(AcCorssImacyServer2Item, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height + 4;
        this.addChildToContainer(this._scrollList);
        this._scrollList2 = ComponentManager.getScrollList(AcCorssImacyPRank2Item, [], this._scroRect);
        this._scrollList2.x = titleBg.x;
        this._scrollList2.y = titleBg.y + titleBg.height;
        this._scrollList2.visible = false;
        this.addChildToContainer(this._scrollList2);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = tcbg2.width;
        bottomBg.height = 100;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, tcbg2.y + tcbg2.height + 10);
        this.addChildToContainer(bottomBg);
        var deltaX = 30;
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65 + deltaX, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // nameText.setPosition(160+deltaX , rankText.y);
        nameText.setPosition(235 - nameText.width / 2, rankText.y);
        this.addChildToContainer(nameText);
        this._nickNameTxt = nameText;
        this._nickNameTxt.visible = false;
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(((516 - quText.textWidth) / 2 + deltaX + 3), rankText.y);
        this.addChildToContainer(quText);
        this._serverTxt = quText;
        //亲密涨幅
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("croessImacyScore-" + this.vo.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(387 + deltaX, rankText.y);
        this.addChildToContainer(scoreText);
        //描述
        var atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20, TextFieldConst.COLOR_BROWN);
        atkracedes5.x = rankBg.x + (rankBg.width - atkracedes5.textWidth) / 2;
        atkracedes5.y = rankBg.y + rankBg.height / 2 - 20;
        this.addChildToContainer(atkracedes5);
        this._atkracedes5 = atkracedes5;
        this._atkracedes5.visible = this._infoList.length == 0;
        //玩家名字
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nickName.setPosition(rankText.x - 20, bottomBg.y + bottomBg.height / 2 - 5 - nickName.height);
        this.addChildToContainer(nickName);
        this._nickName = nickName;
        this._nickName.visible = false;
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), 20, TextFieldConst.COLOR_QUALITY_GREEN);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
        this._playerName = name;
        this._playerName.visible = false;
        //排行
        var rankStr;
        var rankOrder = 0;
        var rankPoint = 0;
        for (var i in this.api.zonerankinfos) {
            var unit = this.api.zonerankinfos[i];
            if (Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())) {
                rankOrder = Number(i) + 1;
                rankPoint = Number(unit.point);
                break;
            }
        }
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
        rankText2.setPosition(this._nickName.x, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(rankText2);
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        rank.setPosition(rankText2.x + rankText2.width + 12, rankText2.y);
        this.addChildToContainer(rank);
        this._playerRank = rank;
        //亲密涨幅
        var str = "";
        if (rankPoint) {
            str = rankPoint.toString();
        }
        else {
            str = "0";
        }
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        socre.setPosition(bottomBg.x + bottomBg.width - 50 - socre.width, rankText2.y);
        this.addChildToContainer(socre);
        this._playerScore = socre;
        var socreText = ComponentManager.getTextField((LanguageManager.getlocal("croessImacyScore-" + this.vo.code) + ': '), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        socreText.setPosition(socre.x - socreText.width, rankText2.y);
        this.addChildToContainer(socreText);
        this._socreText = socreText;
        //玩家区服
        var serveText = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        serveText.setPosition(this._nickName.x, name.y);
        var currZid = Api.mergeServerVoApi.getTrueZid();
        serveText.text = LanguageManager.getlocal("crossranserver");
        this.addChildToContainer(serveText);
        // ,[currZid+""]
        this._playerServer = serveText;
        var servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
        this._currZidTxt = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        this._currZidTxt.setPosition(serveText.x + serveText.width, serveText.y);
        this._currZidTxt.text = servaername;
        this.addChildToContainer(this._currZidTxt);
    };
    AcCrossServerIntimacyRankListView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
    };
    AcCrossServerIntimacyRankListView.prototype.fresh_view = function (event) {
        this._scrollList.visible = this._curTabIdx == 0;
        this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
        this._playerName.visible = this._nickNameTxt.visible;
        var rankStr;
        var score = 0;
        this._infoList = [];
        if (this._curTabIdx == 0) {
            var rankOrder = 0;
            this.api.setZoneRankInfo(event.data.data.data);
            for (var i in this.api.zonerankinfos) {
                var unit = this.api.zonerankinfos[i];
                unit.type = 'rank';
                this._infoList.push(unit);
                if (Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())) {
                    rankOrder = Number(i) + 1;
                    score = Number(unit.point).toString();
                }
            }
            this._scrollList.refreshData(this._infoList);
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
        }
        else {
            this.api.setPRankInfo(event.data.data.data);
            for (var i in this.api.prankinfos) {
                var unit = this.api.prankinfos[i];
                unit.type = 'rank';
                this._infoList.push(unit);
            }
            this._scrollList2.refreshData(this._infoList);
            var meRank = this.api.merank;
            score = this.api.mepoint || '0';
            if (meRank) {
                if (meRank > 300) {
                    rankStr = "10000+";
                }
                else {
                    rankStr = meRank.toString();
                }
            }
            else {
                rankStr = LanguageManager.getlocal(this.vo.getIsCanJoin() ? "atkracedes4" : "crossImacyNoAccess"); // this._merank.toString();
            }
        }
        this._atkracedes5.visible = this._infoList.length == 0;
        this._playerRank.text = rankStr;
        this._playerScore.text = Number(score).toString();
        this._serverTxt.x = this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2 + 32) : 333;
        this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x : this._socreText.x; //(this._playerScore.x - 99);
        this._currZidTxt.x = this._playerServer.x + this._playerServer.width;
    };
    AcCrossServerIntimacyRankListView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.fresh_view, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK), this.fresh_view, this);
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
        this._infoList = null;
        this._currZidTxt = null;
        this._socreText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyRankListView;
}(PopupView));
__reflect(AcCrossServerIntimacyRankListView.prototype, "AcCrossServerIntimacyRankListView");
