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
var DailybossRankPopupView = (function (_super) {
    __extends(DailybossRankPopupView, _super);
    function DailybossRankPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(DailybossRankPopupView.prototype, "bossData", {
        get: function () {
            return this.param.data;
        },
        enumerable: true,
        configurable: true
    });
    DailybossRankPopupView.prototype.getTabbarTextArr = function () {
        if (Api.switchVoApi.checkNewDailyBoss()) {
            return ["dailybossScoreRankTitle"];
        }
        return ["dailybossScoreRankTitle", "dailybossKillRankTitle"];
    };
    DailybossRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DAILYBOSS_GETRANK, requestData: {} };
    };
    DailybossRankPopupView.prototype.receiveData = function (data) {
        this._acrank = data.data.data.acrank;
        this._killrank = data.data.data.killrank;
    };
    DailybossRankPopupView.prototype.getTitleValueStr = function () {
        if (this._selectedTabIndex == 0) {
            return LanguageManager.getlocal("dailybossRankValue1Desc");
        }
        else if (this._selectedTabIndex == 1) {
            return LanguageManager.getlocal("dailybossRankValue2Desc");
        }
    };
    DailybossRankPopupView.prototype.getListItemClass = function () {
        if (this._selectedTabIndex == 0) {
            return DailybossRankList1Item;
        }
        else if (this._selectedTabIndex == 1) {
            return DailybossRankList2Item;
        }
    };
    DailybossRankPopupView.prototype.getScrollDataList = function () {
        if (this._selectedTabIndex == 0) {
            return this._acrank.rankList;
        }
        else if (this._selectedTabIndex == 1) {
            return this._killrank;
        }
    };
    DailybossRankPopupView.prototype.initButtomInfo = function () {
        if (this._selectedTabIndex == 0) {
            var nickTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            nickTxt.x = 20;
            nickTxt.y = 20;
            this.buttomContainer.addChild(nickTxt);
            var rankV = "10000+";
            var addV = 0;
            if (this._acrank.myrank.myrank) {
                rankV = String(this._acrank.myrank.myrank);
                addV = this._acrank.myrank.value;
            }
            var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
            myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
            myRankTxt.x = nickTxt.x;
            myRankTxt.y = nickTxt.y + 40;
            this.buttomContainer.addChild(myRankTxt);
            var addvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
            addvalueTxt.text = LanguageManager.getlocal("dailybossRankValue1Desc") + LanguageManager.getlocal("syscolonDesc") + App.StringUtil.formatStringColor(this._acrank.myrank.value ? this._acrank.myrank.value : 0, TextFieldConst.COLOR_WARN_GREEN);
            addvalueTxt.x = myRankTxt.x + 240;
            addvalueTxt.y = myRankTxt.y;
            this.buttomContainer.addChild(addvalueTxt);
        }
        else if (this._selectedTabIndex == 1) {
            if (this._killrank && this._killrank[0]) {
                var lastkillTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossLastKillTimeDesc", [this._killrank[0].name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                lastkillTxt.setPosition((this.buttomContainer.width - lastkillTxt.width) / 2, (this.buttomContainer.height - lastkillTxt.height) / 2);
                this.buttomContainer.addChild(lastkillTxt);
            }
        }
    };
    DailybossRankPopupView.prototype.getBgExtraHeight = function () {
        return 10;
    };
    return DailybossRankPopupView;
}(RankPopupView));
__reflect(DailybossRankPopupView.prototype, "DailybossRankPopupView");
var DailybossRankList1Item = (function (_super) {
    __extends(DailybossRankList1Item, _super);
    function DailybossRankList1Item() {
        return _super.call(this) || this;
    }
    return DailybossRankList1Item;
}(RankPopupListItem));
__reflect(DailybossRankList1Item.prototype, "DailybossRankList1Item");
var DailybossRankList2Item = (function (_super) {
    __extends(DailybossRankList2Item, _super);
    function DailybossRankList2Item() {
        return _super.call(this) || this;
    }
    return DailybossRankList2Item;
}(RankPopupListItem));
__reflect(DailybossRankList2Item.prototype, "DailybossRankList2Item");
//# sourceMappingURL=DailybossRankPopupView.js.map