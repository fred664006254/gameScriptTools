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
 * 排名
 * author dky
 * date 2017/11/28
 * @class AllianceRankPopupView
 */
var AllianceRankPopupView = (function (_super) {
    __extends(AllianceRankPopupView, _super);
    function AllianceRankPopupView() {
        var _this = _super.call(this) || this;
        _this._curTabIdx = 0;
        _this._rank = 0;
        _this._index = 0;
        // private _punishRewardList: any = {};
        _this._scoreContainer = null;
        _this._downContainer = null;
        _this._logContainer = null;
        _this._tabbarGroup = null;
        _this._allianceTxt = null;
        _this._rankTxt = null;
        /**
         * 帮会战排行榜的数据
         */
        _this._rankInfo = null;
        /**
         * 我的帮会战排行榜的数据
         */
        _this._myRank = null;
        _this._myScore = null;
        return _this;
    }
    AllianceRankPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE, this.doApply, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE, this.doCancel, this);
        // this._rankData = this.param.data.acData;
        this._allianceVo = Api.allianceVoApi.getAllianceVo();
        var tabName = ["allianceRankTab1"];
        //帮会战开关开启之后才会显示排行榜
        if (Api.switchVoApi.checkOpenAllianceWar()) {
            tabName = ["allianceRankTab1", "allianceRankTab2", "allianceRankTab3"];
        }
        var tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabName, this.tabBtnClickHandler, this);
        tabbarGroup.x = 35 + GameData.popupviewOffsetX;
        tabbarGroup.y = 15;
        this.addChildToContainer(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 555;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 60;
        this.addChildToContainer(bg1);
        var bg3 = BaseBitmap.create("public_9_probiginnerbg");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this.addChildToContainer(bg3);
        var allianceVo;
        var allianceStr = "";
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            allianceStr = LanguageManager.getlocal("allianceRankMyAlliance", [LanguageManager.getlocal("allianceRankNoAlliance")]);
        }
        else {
            allianceStr = LanguageManager.getlocal("allianceRankMyAlliance", [Api.playerVoApi.getPlayerAllianceName()]);
        }
        var allianceTxt = ComponentManager.getTextField(allianceStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        allianceTxt.x = bg3.x + 50;
        allianceTxt.y = bg3.y + bg3.height / 2 - allianceTxt.height / 2;
        this.addChildToContainer(allianceTxt);
        this._allianceTxt = allianceTxt;
        var rankeStr = "";
        if (Api.playerVoApi.getPlayerAllianceId() == 0) {
            rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank", [LanguageManager.getlocal("allianceRankNoRank")]);
        }
        else {
            rankeStr = LanguageManager.getlocal("allianceRankMyAllianceRank", [this._rank.toString()]);
        }
        var rankTxt = ComponentManager.getTextField(rankeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTxt.x = bg3.x + 330;
        rankTxt.y = bg3.y + bg3.height / 2 - rankTxt.height / 2;
        this.addChildToContainer(rankTxt);
        this._rankTxt = rankTxt;
        var dataList = this._rankData;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg1.width - 10, bg1.height - 27);
        this._scrollList = ComponentManager.getScrollList(AllianceRankScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        // this._scrollList.setPosition(bg1.x + 5 ,bg1.y + 10);
        this._scrollList.x = bg1.x + 5;
        this._scrollList.y = bg1.y + 10;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceRankNoAlliance"));
        //帮战开关开启之后才会显示帮会战的榜单
        if (Api.switchVoApi.checkOpenAllianceWar()) {
            //帮战榜积分相关
            this._scoreContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._scoreContainer);
            this._downContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._downContainer);
            this._logContainer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._logContainer);
            var titleBg = BaseBitmap.create("public_9_bg37");
            titleBg.width = bg1.width;
            titleBg.height = 35;
            titleBg.setPosition(bg1.x, bg1.y);
            this._scoreContainer.addChild(titleBg);
            //排名
            var rankNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            rankNameTxt.setPosition(titleBg.x + 62 - rankNameTxt.width / 2, titleBg.y + titleBg.height / 2 - rankNameTxt.height / 2);
            this._scoreContainer.addChild(rankNameTxt);
            //帮派名字
            var rankAllianceName = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankAllianceName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            rankAllianceName.setPosition(rankNameTxt.x + rankNameTxt.width / 2 + 120 - rankAllianceName.width / 2, rankNameTxt.y + rankNameTxt.height / 2 - rankAllianceName.height / 2);
            this._scoreContainer.addChild(rankAllianceName);
            //区服
            var rankServer = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankServer"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            rankServer.setPosition(rankAllianceName.x + rankAllianceName.width / 2 + 123 - rankServer.width / 2, rankAllianceName.y + rankAllianceName.height / 2 - rankServer.height / 2);
            this._scoreContainer.addChild(rankServer);
            //分数
            var rankScore = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            rankScore.setPosition(rankServer.x + rankServer.width / 2 + 123 - rankScore.width / 2, rankServer.y + rankServer.height / 2 - rankScore.height / 2);
            this._scoreContainer.addChild(rankScore);
            //列表
            var rect_1 = new egret.Rectangle(0, 0, bg1.width, bg1.height - 45);
            var scoreScrollList = ComponentManager.getScrollList(AllianceWarRankScrollItem, this._rankInfo, rect_1);
            scoreScrollList.setPosition(bg1.x, bg1.y + 50);
            scoreScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
            this._scoreContainer.addChild(scoreScrollList);
            //名字
            var allianceName = Api.playerVoApi.getPlayerAllianceName();
            var myAllianceNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyAllianceName", [allianceName]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            myAllianceNameTxt.setPosition(bg3.x + 40, bg3.y + 20);
            this._downContainer.addChild(myAllianceNameTxt);
            //排名
            var myRankStr = "";
            if (this._myRank > 100) {
                myRankStr = LanguageManager.getlocal("allianceRankNoRank");
            }
            else {
                myRankStr = String(this._myRank);
            }
            var myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyRank", [myRankStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            myRankTxt.setPosition(myAllianceNameTxt.x, myAllianceNameTxt.y + myAllianceNameTxt.height + 10);
            this._downContainer.addChild(myRankTxt);
            //区服
            var myServerStr = Api.mergeServerVoApi.getAfterMergeSeverName();
            var myServerTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyServer", [myServerStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            myServerTxt.setPosition(bg3.x + 320, myAllianceNameTxt.y);
            this._downContainer.addChild(myServerTxt);
            //分数
            var myScoreStr = "";
            if (this._myScore) {
                myScoreStr = String(this._myScore);
            }
            else {
                myScoreStr = LanguageManager.getlocal("allianceWarRankNotScore");
            }
            var myScoreTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRankMyScore", [myScoreStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            myScoreTxt.setPosition(myServerTxt.x, myRankTxt.y);
            this._downContainer.addChild(myScoreTxt);
            //列表
            var rect2 = new egret.Rectangle(0, 0, bg1.width, bg1.height - 10);
            var logScrollList = ComponentManager.getScrollList(AllianceWarHistoryScrollItem, Api.allianceWarVoApi.history, rect2);
            logScrollList.setPosition(bg1.x, bg1.y + 5);
            logScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
            this._logContainer.addChild(logScrollList);
            this._logContainer.visible = false;
            this._scoreContainer.visible = false;
            this._logContainer.visible = false;
            this._downContainer.visible = false;
            //直接跳转tab2
            if (this.param && this.param.tab) {
                var paramTem = { index: Number(this.param.tab) };
                this.tabBtnClickHandler(paramTem);
            }
        }
    };
    /**
     * 帮会战排行榜相关
     */
    AllianceRankPopupView.prototype.rankWarHandle = function (event) {
        if (event && event.data && event.data.ret) {
            this._rankInfo = event.data.data.data.rank;
            this._myRank = event.data.data.data.myrank;
            this._myScore = event.data.data.data.myscore;
        }
    };
    /**
     * 获取活动配置
     */
    AllianceRankPopupView.prototype.getRequestData = function () {
        if (Api.switchVoApi.checkOpenAllianceWar()) {
            App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK, this.rankWarHandle, this);
            this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK, null);
        }
        return { requestType: NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST, requestData: {} };
    };
    //请求回调
    AllianceRankPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (data.data.data.allianceFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg1"));
            this.hide();
            return;
        }
        if (data.data.data.allianceFlag == 2) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg2"));
            return;
        }
        if (data.data.data.allianceFlag == 3) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg3"));
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_GETALLIANCELIST) {
            this._rankData = data.data.data.alliancelist;
            this._rank = data.data.data.arank;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE) {
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyTipSuccess"));
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY) {
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceCancelApplyTip"));
        }
    };
    AllianceRankPopupView.prototype.doApply = function (event) {
        var data = event.data;
        this._index = data.index;
        if (Api.allianceVoApi.isShowConfirmWhenJoin()) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal("allianceJoinLimitTip1"),
                callback: function () {
                    this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE, { aid: event.data.aid });
                },
                handler: this,
                needCancel: true
            });
        }
        else {
            this.request(NetRequestConst.REQUEST_ALLIANCE_APPLYALLIANCE, { aid: event.data.aid });
        }
    };
    AllianceRankPopupView.prototype.doCancel = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_CANCELAPPLY, { aid: event.data.aid });
    };
    AllianceRankPopupView.prototype.rankBtnClick = function () {
    };
    AllianceRankPopupView.prototype.tabBtnClickHandler = function (params) {
        this._curTabIdx = params.index;
        this._tabbarGroup.selectedIndex = this._curTabIdx;
        if (this._curTabIdx == 0) {
            this._scrollList.visible = true;
            this._rankTxt.setVisible(true);
            this._allianceTxt.setVisible(true);
            this._scoreContainer.setVisible(false);
            this._logContainer.setVisible(false);
            this._downContainer.setVisible(false);
        }
        else if (this._curTabIdx == 1) {
            this._scrollList.visible = false;
            this._rankTxt.setVisible(false);
            this._allianceTxt.setVisible(false);
            this._scoreContainer.setVisible(true);
            this._logContainer.setVisible(false);
            this._downContainer.setVisible(true);
        }
        else if (this._curTabIdx == 2) {
            this._scrollList.visible = false;
            this._rankTxt.setVisible(false);
            this._allianceTxt.setVisible(false);
            this._scoreContainer.setVisible(false);
            this._logContainer.setVisible(true);
            this._downContainer.setVisible(true);
        }
        this.refreshRankList();
    };
    AllianceRankPopupView.prototype.refreshRankList = function () {
    };
    AllianceRankPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AllianceRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "dinnerrankpopupview", "dinner_line", "dinner_rank_titlebg", "rankinglist_rankbg",
            "dinner_detail",
        ]);
    };
    AllianceRankPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_APPLYALLIANCE, this.doApply, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ALLIANCE_CANCELAPPLYALLIANCE, this.doCancel, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK, this.rankWarHandle, this);
        // 未婚滑动列表
        this._scrollList = null;
        this._timeTF = null;
        this._selectChildData = null;
        this._allianceVo = null;
        this._index = null;
        this._rank = 0;
        this._curTabIdx = 0;
        this._scoreContainer = null;
        this._tabbarGroup = null;
        this._rankTxt = null;
        this._allianceTxt = null;
        this._rankInfo = null;
        this._myRank = null;
        this._myScore = null;
        this._logContainer = null;
        this._downContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceRankPopupView;
}(PopupView));
__reflect(AllianceRankPopupView.prototype, "AllianceRankPopupView");
//# sourceMappingURL=AllianceRankPopupView.js.map