/**
 * 门客pk排行榜
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
var AcCrossServerServantRankListView = (function (_super) {
    __extends(AcCrossServerServantRankListView, _super);
    function AcCrossServerServantRankListView() {
        return _super.call(this) || this;
    }
    AcCrossServerServantRankListView.prototype.getTitleStr = function () {
        return 'allianceBtnRank';
    };
    AcCrossServerServantRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rankinglist_rank1",
            "rankinglist_rank2",
            "rankinglist_rank3",
        ]);
    };
    Object.defineProperty(AcCrossServerServantRankListView.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantRankListView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_SERVANTPK);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantRankListView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUST_SERVANTPK_RANK, requestData: {
                activeId: view.vo.aid + "-" + view.vo.code,
                sid: view.api.getWinServantId()
            } };
    };
    AcCrossServerServantRankListView.prototype.receiveData = function (data) {
        var view = this;
        view._data = data.data.data;
        //view.api.setZoneRankInfo(data.data.data);
    };
    AcCrossServerServantRankListView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_view, this);
        //let tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 516;
        rankBg.height = 550;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 10);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("public_9_bg41");
        titleBg.width = rankBg.width;
        titleBg.height = 36;
        titleBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(titleBg);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 516;
        bottomBg.height = 100;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, rankBg.y + rankBg.height + 8);
        this.addChildToContainer(bottomBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65 + GameData.popupviewOffsetX, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        //玩家昵称
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(160 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(nameText);
        //标题区服
        var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        quText.setPosition(300 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(quText);
        //门客属性
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("crossserverServantattr1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(407 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        //玩家名字
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.setLayoutPosition(LayoutConst.lefttop, nickName, bottomBg, [10, 20]);
        this.addChildToContainer(nickName);
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.setLayoutPosition(LayoutConst.lefttop, name, nickName, [nickName.textWidth + 3, 0]);
        this.addChildToContainer(name);
        //排行
        var rankStr;
        var rankOrder = 0;
        var rankPoint = 0;
        for (var i in this._data.sinfo) {
            var unit = this._data.sinfo[i];
            if (unit.uid == Api.playerVoApi.getPlayerID()) {
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
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText2.x = 342 + GameData.popupviewOffsetX;
        rankText2.y = 626;
        this.addChildToContainer(rankText2);
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this.setLayoutPosition(LayoutConst.lefttop, rank, rankText2, [rankText2.textWidth + 3, 0]);
        this.addChildToContainer(rank);
        //亲密涨幅
        var str = "";
        if (this.api.vo.v) {
            str = App.StringUtil.changeIntToText(this.api.vo.v);
        }
        else {
            str = LanguageManager.getlocal('emperorWarCheerNot');
        }
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("crossserverServantattr2", [str]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        socreText.x = 37 + GameData.popupviewOffsetX;
        socreText.y = 626;
        this.addChildToContainer(socreText);
        // let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // this.setLayoutPosition(LayoutConst.lefttop, socre, socreText, [socreText.textWidth + 3,0]);
        // this.addChildToContainer(socre);
        //玩家区服
        var serveText = ComponentManager.getTextField('', TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        serveText.x = 342 + GameData.popupviewOffsetX;
        serveText.y = 588;
        var currZid = Api.mergeServerVoApi.getTrueZid();
        var servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
        serveText.text = LanguageManager.getlocal("crossranserver", [servaername]);
        this.addChildToContainer(serveText);
        var arr = [];
        for (var i in this._data.sinfo) {
            var unit = this._data.sinfo[i];
            arr.push({
                zid: unit.zid,
                point: unit.point,
                type: 'rank',
                acid: this.vo.aid,
                name: unit.name,
                uid: unit.uid
            });
        }
        var scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 8);
        var scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
        scrollList.x = titleBg.x;
        scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(scrollList);
    };
    AcCrossServerServantRankListView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.fresh_view, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK), this.fresh_view, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantRankListView;
}(PopupView));
__reflect(AcCrossServerServantRankListView.prototype, "AcCrossServerServantRankListView");
//# sourceMappingURL=AcCrossServerServantRankListView.js.map