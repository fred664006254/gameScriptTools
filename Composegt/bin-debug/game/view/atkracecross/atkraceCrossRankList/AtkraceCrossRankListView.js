/**
 * 跨服擂台排行榜
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
var AtkraceCrossRankListView = (function (_super) {
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
        _this._atkracedes5 = null;
        _this._redNode = null;
        return _this;
    }
    AtkraceCrossRankListView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_line",
            "rankinglist_rankbg",
            "rank_biao",
            "rank_1", "rank_2", "rank_3", "public_tc_bg05",
            "popupview_bg4"
        ]);
    };
    Object.defineProperty(AtkraceCrossRankListView.prototype, "api", {
        get: function () {
            return Api.atkracecrossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    AtkraceCrossRankListView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AtkraceCrossRankListView.prototype.getTabbarTextArr = function () {
        //添加开关
        // if(Api.switchVoApi.checkOpenWifeBattle()){
        return [
            "crossServerImacyRankListViewTab1",
            "crossServerImacyRankListViewTab2",
        ];
        // }
    };
    // protected getTabbarGroupX():number
    // {
    //     return 17;
    // }
    AtkraceCrossRankListView.prototype.clickTabbarHandler = function (data) {
        // App.LogUtil.log("index: " + data.index);
        // var index = Number(data.index);
        // if(this.checkTabCondition(index) == false)
        // {
        // 	// 重新checkTabCondition方法处理
        // 	this.tabbarGroup.selectedIndex=this.selectedTabIndex;
        // 	return;
        // }
        // this.lastSelectedTabIndex = this.selectedTabIndex;
        // this.selectedTabIndex = index;
        // this.changeTab();
        this.tabBtnClickHandler(data);
    };
    AtkraceCrossRankListView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (this.tabbarBgLine && this._redNode) {
            this._redNode.y = this.tabbarBgLine.y - 1;
        }
    };
    AtkraceCrossRankListView.prototype.initView = function () {
        this.tabbarGroup.setSpace(5);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.fresh_view, this);
        this.tabbarBg.height = 115;
        if (this._redNode == null) {
            var red = BaseBitmap.create("popupview_bg4");
            this._redNode = new BaseDisplayObjectContainer();
            this.addChild(this._redNode);
            this._redNode.width = red.width;
            this._redNode.height = red.height;
            red.x = 0;
            red.y = 0;
            this._redNode.addChild(red);
            var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW_NEW);
            rankText.setPosition(95 - 35, red.y + red.height / 2 - rankText.height / 2);
            this._redNode.addChild(rankText);
            //玩家昵称
            var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW_NEW);
            nameText.setPosition(180 - 35, rankText.y);
            this._redNode.addChild(nameText);
            this._nickNameTxt = nameText;
            this._nickNameTxt.visible = false;
            //标题区服
            var quText = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW_NEW);
            quText.setPosition(330 - 35, rankText.y);
            this._redNode.addChild(quText);
            this._serverTxt = quText;
            //擂台分数
            var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW_NEW);
            scoreText.setPosition(437 - 35, rankText.y);
            this._redNode.addChild(scoreText);
            this._redNode.x = GameConfig.stageWidth / 2 - this._redNode.width / 2;
            this._redNode.y = this.tabbarBgLine.y;
        }
        // let tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];
        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,this.tabBtnClickHandler,this);
        // tabbarGroup.x = 40;
        // tabbarGroup.y = 18;
        // tabbarGroup.setSpace(20);
        // this.addChildToContainer(tabbarGroup); 
        // let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
        // rankBg.width = 540;
        // rankBg.height = 626;
        // rankBg.setPosition(39,65);
        // // rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
        // this.addChildToContainer(rankBg);
        var innerBg = BaseBitmap.create("public_9v_bg12");
        innerBg.width = 525;
        innerBg.height = 550;
        innerBg.x = this.viewBg.width / 2 - innerBg.width / 2;
        innerBg.y = 120;
        this.addChildToContainer(innerBg);
        // let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
        // titleBg.width = 502;
        // titleBg.height = 36;
        // titleBg.setPosition(60, 85);
        // this.addChildToContainer(titleBg);
        // this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,440);
        // this._scrollList  = ComponentManager.getScrollList(AtkraceCorssRankItem,this._infoList,this._scroRect);
        // this._scrollList.x = 55;
        // this._scrollList.y = titleBg.y + titleBg.height;
        // this.addChildToContainer(this._scrollList);
        var bottomBg = BaseBitmap.create("public_9v_bg12");
        bottomBg.width = 525;
        bottomBg.height = 104;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = innerBg.y + innerBg.height + 6;
        this.addChildToContainer(bottomBg);
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        nickName.setPosition(95, bottomBg.y + bottomBg.height / 2 - 5 - nickName.height);
        this.addChildToContainer(nickName);
        this._nickName = nickName;
        this._nickName.visible = false;
        //排名
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + "：", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        rankText2.setPosition(95, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(rankText2);
        //玩家名字
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN_NEW);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
        this._playerName = name;
        this._playerName.visible = false;
        //描述
        var atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
        atkracedes5.x = 250;
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
        else {
            rankStr = LanguageManager.getlocal("atkracedes4"); // this._merank.toString();
        }
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN_NEW);
        rank.setPosition(rankText2.x + rankText2.width, rankText2.y);
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
        var socre = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN_NEW);
        socre.setPosition(bottomBg.x + bottomBg.width - 40 - 60, rankText2.y);
        this.addChildToContainer(socre);
        this._playerScore = socre;
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        socreText.setPosition(socre.x - 20 - socreText.width, rankText2.y);
        this.addChildToContainer(socreText);
        //玩家区服
        var serveText = ComponentManager.getTextField(LanguageManager.getlocal("ranserver"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        serveText.setPosition(socreText.x, name.y);
        var currZid = Api.mergeServerVoApi.getTrueZid();
        var zidname = Api.mergeServerVoApi.getAfterMergeSeverName();
        serveText.text = LanguageManager.getlocal("acBattleGroundAlliRankServer-1", [zidname]); //Api.mergeServerVoApi.getAfterMergeSeverName();//LanguageManager.getlocal("ranserver",[zidname]);
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
        this._scroRect = new egret.Rectangle(0, 0, GameConfig.stageWidth, innerBg.height - 20);
        this._scrollList = ComponentManager.getScrollList(AtkracecrossServer2Item, this._infoList, this._scroRect);
        this._scrollList.x = this.viewBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = innerBg.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("chatNoData"), TextFieldConst.COLOR_BROWN_NEW);
        this.addChildToContainer(this._scrollList);
        this._scrollList2 = ComponentManager.getScrollList(AtkraceCorssRankItem, [], this._scroRect);
        this._scrollList2.x = this.viewBg.width / 2 - this._scrollList.width / 2;
        this._scrollList2.y = innerBg.y + 10;
        this._scrollList2.visible = false;
        this._scrollList2.setEmptyTip(LanguageManager.getlocal("chatNoData"), TextFieldConst.COLOR_BROWN_NEW);
        this.addChildToContainer(this._scrollList2);
        this._atkracedes5.visible = this._infoList.length == 0;
        this.fresh_view(null);
    };
    AtkraceCrossRankListView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        if (this._curTabIdx == 0) {
            this.fresh_view(null);
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_RANK, {});
        }
        //NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_RANK,requestData:{}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	if(data.ret==true&&data.data&&data.data.data.atkrank)	
    // 	{
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
        if (this._scrollList) {
            this._scrollList.visible = this._curTabIdx == 0;
        }
        if (this._scrollList2) {
            this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
        }
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
            // this._scrollList.refreshData([]);
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
            else {
                var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
                rankStr = LanguageManager.getlocal((crossVo.info && crossVo.info.iscanjoin == 1) ? "atkracedes4" : "crossImacyNoAccess"); // this._merank.toString();
            }
        }
        this._atkracedes5.visible = this._infoList.length == 0;
        this._playerRank.text = rankStr;
        this._playerScore.text = Number(score).toString();
        this._serverTxt.x = (this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2) + 30 : 340) - 35;
        this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 94);
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
        this._atkracedes5 = null;
        this._infoList = [];
        this._curTabIdx = 0;
        this._redNode = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_RANK), this.fresh_view, this);
        _super.prototype.dispose.call(this);
    };
    return AtkraceCrossRankListView;
}(PopupView));
__reflect(AtkraceCrossRankListView.prototype, "AtkraceCrossRankListView");
