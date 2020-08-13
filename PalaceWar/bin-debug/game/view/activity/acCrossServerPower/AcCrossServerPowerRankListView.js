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
var AcCrossServerPowerRankListView = (function (_super) {
    __extends(AcCrossServerPowerRankListView, _super);
    function AcCrossServerPowerRankListView() {
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
        _this._isInitSingleList = true;
        _this._isSingleListHasData = false;
        return _this;
    }
    AcCrossServerPowerRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rankinglist_rank1",
            "rankinglist_rank2",
            "rankinglist_rank3",
        ]);
    };
    Object.defineProperty(AcCrossServerPowerRankListView.prototype, "api", {
        get: function () {
            return Api.crossPowerVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRankListView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRankListView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerRankListView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerRankListView.prototype.getUiCode = function () {
        var code = "1";
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcCrossServerPowerRankListView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_zrankview, this);
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
        var scoreTitleText = ComponentManager.getTextField(LanguageManager.getlocal("croessPowerScore-" + this.getUiCode()), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreTitleText.setPosition(407 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreTitleText);
        //描述
        var atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes5.x = rankBg.x + (rankBg.width - atkracedes5.textWidth) / 2;
        atkracedes5.y = titleBg.y + titleBg.height + 150;
        atkracedes5.visible = false;
        this.addChildToContainer(atkracedes5);
        //玩家名字
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickName.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 - 5 - nickName.height);
        this.addChildToContainer(nickName);
        this._nickName = nickName;
        this._nickName.visible = false;
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
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
            // if (rankOrder > 300) {
            // 	rankStr = "10000+";
            // }
            // else {
            rankStr = rankOrder.toString();
            // }
        }
        else {
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText2.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(rankText2);
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
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
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        if (PlatformManager.checkIsRuSp()) {
            socre.setPosition(this.viewBg.width - socre.width - 50, rankText2.y);
        }
        else {
            socre.setPosition(bottomBg.x + bottomBg.width - 20 - socre.width, rankText2.y);
        }
        this.addChildToContainer(socre);
        this._playerScore = socre;
        var socreText = ComponentManager.getTextField((LanguageManager.getlocal("croessPowerScore-" + this.getUiCode()) + ': '), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        // socreText.setPosition(socre.x - 20 - 99, rankText2.y);
        socreText.setPosition(this.viewBg.x + this.viewBg.width / 2 + 30, rankText2.y);
        this.addChildToContainer(socreText);
        socre.setPosition(socreText.x + socreText.width, rankText2.y);
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
        // this._scrollList2 = ComponentManager.getScrollList(AcCorssImacyPRankItem,[],this._scroRect);
        var list2Request = { requestType: NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, requestParam: { index: 1 } };
        this._scrollList2 = ComponentManager.getRankScrollList(AcCorssImacyPRankItem, [], this._scroRect, { index: 0 }, list2Request);
        this._scrollList2.x = titleBg.x;
        this._scrollList2.y = titleBg.y + titleBg.height;
        this._scrollList2.visible = false;
        this.addChildToContainer(this._scrollList2);
        this._scrollList2.addRequestFlag();
        this._atkracedes5 = atkracedes5;
        this._atkracedes5.visible = this._infoList.length == 0;
    };
    AcCrossServerPowerRankListView.prototype.tabBtnClickHandler = function (params) {
        if (this.vo && (!this.vo.isStart)) {
            this.vo.showAcEndTip();
            return;
        }
        this._curTabIdx = params.index;
        if (this._curTabIdx == 0) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK, {});
        }
        else {
            if (this._scrollList2) {
                this._scrollList2.setRequestIndex(1);
            }
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, { index: 1 });
        }
        this._scrollList.visible = this._curTabIdx == 0;
        this._scrollList2.visible = this._curTabIdx == 1;
    };
    AcCrossServerPowerRankListView.prototype.fresh_view = function (event) {
        if (event.data.ret == false) {
            return;
        }
        // this._scrollList.visible = this._curTabIdx == 0;
        // this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
        var rankStr;
        var score = 0;
        this._infoList = [];
        if (this._curTabIdx == 1) {
            // this.api.setPRankInfo(event.data.data.data);
            var rankData = event.data.data.data.atkranks;
            for (var i in rankData) {
                // let unit = this.api.prankinfos[i];
                var unit = rankData[i];
                unit.type = 'rank';
                unit.crosspower = true;
                this._infoList.push(unit);
            }
            if (this._isInitSingleList) {
                if (rankData && rankData.length > 0) {
                    this._isSingleListHasData = true;
                    this._isInitSingleList = false;
                }
            }
            // this._scrollList2.refreshData(this._infoList);
            var index = event.data.data.data.index;
            this._scrollList2.refreshRankData(this._infoList, { index: index });
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
            this._atkracedes5.visible = (!this._isSingleListHasData);
            this._playerRank.text = rankStr;
            this._playerScore.text = Number(score).toString();
            // this._playerScore.x = this.viewBg.width -  this._playerScore.width-50;
            this._serverTxt.x = 300 + GameData.popupviewOffsetX;
            // this._playerServer.x = (this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 94))+GameData.popupviewOffsetX;
            this._playerServer.x = this.viewBg.x + this.viewBg.width / 2 + 23;
        }
    };
    AcCrossServerPowerRankListView.prototype.fresh_zrankview = function (evt) {
        if (evt.data.ret == false) {
            return;
        }
        App.LogUtil.log("fresh_zrankview " + this._curTabIdx);
        var rankStr;
        var score = 0;
        this._infoList = [];
        if (this._curTabIdx == 0) {
            var rankOrder = 0;
            this.api.setZoneRankInfo(evt.data.data.data);
            for (var i in this.api.zonerankinfos) {
                var unit = this.api.zonerankinfos[i];
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
            console.log("freshview ", this._infoList);
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
            this._atkracedes5.visible = this._infoList.length == 0;
            this._playerRank.text = rankStr;
            this._playerScore.text = Number(score).toString();
            // this._playerScore.x = this.viewBg.width -  this._playerScore.width-50;
            this._serverTxt.x = (this._curTabIdx == 0 ? ((500 - this._serverTxt.textWidth) / 2) : 300) + GameData.popupviewOffsetX;
            // this._playerServer.x = (this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 94))+GameData.popupviewOffsetX;
            this._playerServer.x = (this._curTabIdx == 0 ? (65 + GameData.popupviewOffsetX) : (this.viewBg.x + this.viewBg.width / 2 + 23));
        }
    };
    AcCrossServerPowerRankListView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_zrankview, this);
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
        this._isInitSingleList = true;
        this._isSingleListHasData = false;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerRankListView;
}(PopupView));
__reflect(AcCrossServerPowerRankListView.prototype, "AcCrossServerPowerRankListView");
//# sourceMappingURL=AcCrossServerPowerRankListView.js.map