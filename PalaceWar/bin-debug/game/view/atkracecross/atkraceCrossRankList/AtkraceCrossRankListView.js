/**
 * 跨服擂台排行榜
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AtkraceCrossRankListView = /** @class */ (function (_super) {
    __extends(AtkraceCrossRankListView, _super);
    function AtkraceCrossRankListView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this._merank = 0;
        _this._mepoint = 0;
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
        _this._scoreTxt = null;
        _this._bottomBg = null;
        _this._atkracedes5 = null;
        return _this;
    }
    Object.defineProperty(AtkraceCrossRankListView.prototype, "api", {
        get: function () {
            return Api.atkracecrossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AtkraceCrossRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rankinglist_rank1",
            "rankinglist_rank2",
            "rankinglist_rank3",
        ]);
    };
    AtkraceCrossRankListView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.fresh_view, this);
        var tabName = ["crossAtkraceRankListViewTab1", "crossAtkraceRankListViewTab2"];
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 40 + GameData.popupviewOffsetX;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 526;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("public_9_bg37");
        titleBg.width = rankBg.width;
        titleBg.height = 36;
        titleBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(titleBg);
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(AtkraceCorssRankItem, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(this._scrollList);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 516;
        bottomBg.height = 79;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, rankBg.y + rankBg.height + 8);
        this.addChildToContainer(bottomBg);
        this._bottomBg = bottomBg;
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
        if (PlatformManager.checkIsEnLang()) {
            quText.x = 250;
        }
        this._serverTxt = quText;
        //擂台分数
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(407 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nickName.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 - 5 - nickName.height);
        this.addChildToContainer(nickName);
        this._nickName = nickName;
        this._nickName.visible = false;
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankText2.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(rankText2);
        //玩家名字
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
        this._playerName = name;
        this._playerName.visible = false;
        //描述
        var atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes5.x = 250 + GameData.popupviewOffsetX;
        atkracedes5.y = GameConfig.stageHeigth - 530;
        this.addChild(atkracedes5);
        atkracedes5.visible = this.isShowTextBoo;
        this._atkracedes5 = atkracedes5;
        var rankStr;
        if (this._merank) {
            if (this._merank > 300) {
                rankStr = "10000+";
            }
            else {
                rankStr = this._merank.toString();
            }
        }
        else { //未上榜
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        rank.setPosition(rankText2.x + rankText2.width + 6, rankText2.y);
        this.addChildToContainer(rank);
        this._playerRank = rank;
        //擂台分数
        var str = "";
        if (this._mepoint) {
            str = this._mepoint + "";
        }
        else {
            str = "0";
        }
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        socre.setPosition(bottomBg.x + bottomBg.width - socre.width - 15, rankText2.y);
        this.addChildToContainer(socre);
        this._playerScore = socre;
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        socreText.setPosition(socre.x - socreText.width - 6, rankText2.y);
        this.addChildToContainer(socreText);
        this._scoreTxt = socreText;
        //玩家区服
        var serveText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver"), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        serveText.setPosition(socreText.x, name.y);
        var currZid = Api.mergeServerVoApi.getTrueZid();
        var zidname = Api.mergeServerVoApi.getAfterMergeSeverName();
        serveText.text = LanguageManager.getlocal("ranserver", [zidname]);
        this.addChildToContainer(serveText);
        this._playerServer = serveText;
        this._infoList = [];
        for (var i in this.api.zonerankinfos) {
            var unit = this.api.zonerankinfos[i];
            this._infoList.push({
                zid: unit.zid,
                point: unit.point,
                type: 'rank',
                acid: 'crossServerAtkRace'
            });
        }
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(AtkracecrossServerItem, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this.addChildToContainer(this._scrollList);
        this._scrollList2 = ComponentManager.getScrollList(AtkraceCorssRankItem, [], this._scroRect);
        this._scrollList2.x = titleBg.x;
        this._scrollList2.y = titleBg.y + titleBg.height;
        this._scrollList2.visible = false;
        this.addChildToContainer(this._scrollList2);
        this._atkracedes5.visible = this._infoList.length == 0;
        this.fresh_view(null);
        if (Api.switchVoApi.checkOpenAtkracegChangegpoint()) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossPointTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt.x = this.viewBg.x + this.viewBg.width - tipTxt.width - 20;
            tipTxt.y = bottomBg.y + bottomBg.height + 30;
            this.addChildToContainer(tipTxt);
        }
    };
    AtkraceCrossRankListView.prototype.getShowHeight = function () {
        return 750;
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_RANK,requestData:{}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	if(data.ret==true&&data.data&&data.data.data.atkrank)	
    // 	{
    // 		//this.fresh_view(data.data.data);
    // 		this._infoList = data.data.data.atkrank;
    // 		this._merank = data.data.data.merank;
    // 		this._mepoint = data.data.data.mepoint;
    // 		this.isShowTextBoo =false;
    // 	}
    // 	else
    // 	{	
    // 		this.isShowTextBoo =true;		
    // 	}
    // }
    AtkraceCrossRankListView.prototype.fresh_view = function (evt) {
        if (evt && evt.data && !evt.data.ret) {
            return;
        }
        this._scrollList.visible = this._curTabIdx == 0;
        this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
        var rankStr;
        var score = 0;
        this._infoList = [];
        if (this._curTabIdx == 0) {
            var rankOrder = 0;
            for (var i in this.api.zonerankinfos) {
                var unit = this.api.zonerankinfos[i];
                this._infoList.push({
                    zid: unit.zid,
                    point: unit.point,
                    type: 'rank',
                    acid: 'crossServerAtkRace'
                });
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
            else { //未上榜
                rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
            }
        }
        else {
            //this.api.setPRankInfo(event.data.data.data);
            var data = evt.data;
            this._merank = data.data.data.merank;
            this._mepoint = data.data.data.mepoint;
            this.isShowTextBoo = false;
            for (var i in data.data.data.atkrank) {
                var unit = data.data.data.atkrank[i];
                this._infoList.push(unit);
            }
            this._scrollList2.refreshData(this._infoList);
            var meRank = this._merank;
            score = this._mepoint || '0';
            if (meRank) {
                if (meRank > 300) {
                    rankStr = "10000+";
                }
                else {
                    rankStr = meRank.toString();
                }
            }
            else { //未上榜
                var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
                rankStr = LanguageManager.getlocal((crossVo.info && crossVo.info.iscanjoin == 1) ? "atkracedes4" : "crossImacyNoAccess"); // this._merank.toString();
            }
        }
        this._atkracedes5.visible = this._infoList.length == 0;
        this._playerRank.text = rankStr;
        this._playerScore.text = Number(score).toString();
        this._playerScore.x = this._bottomBg.x + this._bottomBg.width - this._playerScore.width - 15;
        this._scoreTxt.x = this._playerScore.x - this._scoreTxt.width - 6;
        this._serverTxt.x = this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2) + 25 : 325;
        this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 80);
        if (PlatformManager.checkIsEnLang() && this._curTabIdx == 1) {
            this._serverTxt.x = 325;
        }
    };
    AtkraceCrossRankListView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        if (this._curTabIdx == 0) {
            this.fresh_view(null);
            if (PlatformManager.checkIsEnLang()) {
                this._serverTxt.x = 250;
            }
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_RANK, {});
        }
        //NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
    };
    AtkraceCrossRankListView.prototype.dispose = function () {
        this._merank = 0;
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
        this._scroRect = null;
        this._bottomBg = null;
        this._atkracedes5 = null;
        this._infoList = [];
        this._curTabIdx = 0;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.fresh_view, this);
        _super.prototype.dispose.call(this);
    };
    return AtkraceCrossRankListView;
}(PopupView));
//# sourceMappingURL=AtkraceCrossRankListView.js.map