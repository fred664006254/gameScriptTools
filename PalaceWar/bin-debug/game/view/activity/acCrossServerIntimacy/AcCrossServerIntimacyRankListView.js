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
        return _this;
    }
    AcCrossServerIntimacyRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rankinglist_rank1",
            "rankinglist_rank2",
            "rankinglist_rank3",
        ]);
    };
    Object.defineProperty(AcCrossServerIntimacyRankListView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerIntimacyRankListView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
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
    Object.defineProperty(AcCrossServerIntimacyRankListView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerIntimacyRankListView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                code = "1";
                break;
        }
        return code;
    };
    AcCrossServerIntimacyRankListView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.fresh_view, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK), this.fresh_view, this);
        var tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 40 + GameData.popupviewOffsetX;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 526;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("public_9_bg41");
        titleBg.width = rankBg.width;
        titleBg.height = 36;
        titleBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(titleBg);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 516;
        bottomBg.height = 84;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, rankBg.y + rankBg.height + 8);
        this.addChildToContainer(bottomBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65 + GameData.popupviewOffsetX, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(160 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(nameText);
        this._nickNameTxt = nameText;
        this._nickNameTxt.visible = false;
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(((516 - quText.textWidth) / 2) + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(quText);
        this._serverTxt = quText;
        //亲密涨幅
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("croessImacyScore-" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(407 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        //描述
        var atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes5.x = rankBg.x + (rankBg.width - atkracedes5.textWidth) / 2;
        atkracedes5.y = titleBg.y + titleBg.height + 150;
        this.addChildToContainer(atkracedes5);
        this._atkracedes5 = atkracedes5;
        //玩家名字
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + "：", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickName.setPosition(rankText.x - 15, bottomBg.y + bottomBg.height / 2 - nickName.height);
        this.addChildToContainer(nickName);
        this._nickName = nickName;
        this._nickName.visible = false;
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        name.setPosition(nickName.x + nickName.width + 3, nickName.y);
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
            // if (rankOrder > 300) {
            // rankStr = "10000+";
            // }
            // else {
            rankStr = rankOrder.toString();
            // }
        }
        else {
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + "：", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText2.setPosition(rankText.x - 15, bottomBg.y + bottomBg.height / 2 + 10);
        this.addChildToContainer(rankText2);
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rank.setPosition(rankText2.x + rankText2.width + 3, rankText2.y);
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
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        socre.setPosition(bottomBg.x + bottomBg.width - 80 - socre.width, rankText2.y);
        this.addChildToContainer(socre);
        this._playerScore = socre;
        var socreText = ComponentManager.getTextField((LanguageManager.getlocal("croessImacyScore-" + this.getUiCode()) + '：'), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        socreText.setPosition(socre.x - socreText.textWidth - 3, rankText2.y);
        this.addChildToContainer(socreText);
        //玩家区服
        var serveText = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        serveText.setPosition(this._nickName.x, name.y);
        var currZid = Api.mergeServerVoApi.getTrueZid();
        var servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
        serveText.text = LanguageManager.getlocal("crossranserver", [servaername]);
        this.addChildToContainer(serveText);
        this._playerServer = serveText;
        this._infoList = [];
        for (var i in this.api.zonerankinfos) {
            var unit = this.api.zonerankinfos[i];
            this._infoList.push({
                zid: unit.zid,
                point: unit.point,
                type: 'rank',
                acid: this.vo.aid
            });
        }
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(AcCorssImacyServerItem, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(this._scrollList);
        this._scrollList2 = ComponentManager.getScrollList(AcCorssImacyPRankItem, [], this._scroRect);
        this._scrollList2.x = titleBg.x;
        this._scrollList2.y = titleBg.y + titleBg.height;
        this._scrollList2.visible = false;
        this.addChildToContainer(this._scrollList2);
        this._atkracedes5.visible = this._infoList.length == 0;
    };
    AcCrossServerIntimacyRankListView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
    };
    AcCrossServerIntimacyRankListView.prototype.fresh_view = function (event) {
        if (event.data.ret == false) {
            return;
        }
        this._scrollList.visible = this._curTabIdx == 0;
        this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
        var rankStr;
        var score = 0;
        this._infoList = [];
        if (this._curTabIdx == 0) {
            var rankOrder = 0;
            this.api.setZoneRankInfo(event.data.data.data);
            for (var i in this.api.zonerankinfos) {
                var unit = this.api.zonerankinfos[i];
                // unit.type = 'rank';
                // this._infoList.push(unit);
                this._infoList.push({
                    zid: unit.zid,
                    point: unit.point,
                    type: 'rank',
                    acid: this.vo.aid
                });
                if (Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())) {
                    rankOrder = Number(i) + 1;
                    score = Number(unit.point).toString();
                }
            }
            this._scrollList.refreshData(this._infoList);
            if (rankOrder) {
                // if (rankOrder > 300) {
                // rankStr = "10000+";
                // }
                // else {
                rankStr = rankOrder.toString();
                // }
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
                unit.imacy = true;
                this._infoList.push(unit);
            }
            this._scrollList2.refreshData(this._infoList);
            var meRank = this.api.merank;
            score = this.api.mepoint || '0';
            if (meRank) {
                // if (meRank > 300) {
                // 	rankStr = "10000+";
                // }
                // else {
                rankStr = meRank.toString();
                // }
            }
            else {
                rankStr = LanguageManager.getlocal(this.vo.getIsCanJoin() ? "atkracedes4" : "crossImacyNoAccess"); // this._merank.toString();
            }
        }
        this._atkracedes5.visible = this._infoList.length == 0;
        this._playerRank.text = rankStr;
        this._playerScore.text = Number(score).toString();
        this._serverTxt.x = (this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2) : 300) + GameData.popupviewOffsetX;
        this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 94);
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
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerIntimacyRankListView;
}(PopupView));
__reflect(AcCrossServerIntimacyRankListView.prototype, "AcCrossServerIntimacyRankListView");
//# sourceMappingURL=AcCrossServerIntimacyRankListView.js.map