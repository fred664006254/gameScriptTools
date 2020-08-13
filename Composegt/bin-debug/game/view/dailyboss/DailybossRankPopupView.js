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
        var _this = _super.call(this) || this;
        _this._selectedTabIndex = 0;
        return _this;
    }
    //public_tc_bg01  public_tc_bg03
    DailybossRankPopupView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.setSpace(15);
        var tabX = 0;
        var tabY = 0;
        tabX = this.viewBg.x + 43;
        tabY = this.viewBg.y + 60;
        tabY += this.getTabbarGroupY();
        ;
        this.tabbarGroup.setPosition(tabX, tabY);
    };
    // 页签图名称
    DailybossRankPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    Object.defineProperty(DailybossRankPopupView.prototype, "bossData", {
        get: function () {
            return this.param.data;
        },
        enumerable: true,
        configurable: true
    });
    DailybossRankPopupView.prototype.getTabbarTextArr = function () {
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
            var nickTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick", [" " + Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            nickTxt.x = 30;
            nickTxt.y = 10;
            this.buttomContainer.addChild(nickTxt);
            // let nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
            // nameTxt.x = nickTxt.x + nickTxt.width;
            // nameTxt.y = 10;
            // this.buttomContainer.addChild(nameTxt);
            var rankV = "10000+";
            var addV = 0;
            if (this._acrank.myrank.myrank) {
                rankV = String(this._acrank.myrank.myrank);
                addV = this._acrank.myrank.value;
            }
            var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
            myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
            myRankTxt.x = nickTxt.x;
            myRankTxt.y = nickTxt.y + 30;
            this.buttomContainer.addChild(myRankTxt);
            var addvalueTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossRankValue1Desc") + LanguageManager.getlocal("syscolonDesc"), nickTxt.size, TextFieldConst.COLOR_BROWN);
            addvalueTxt.x = myRankTxt.x;
            addvalueTxt.y = myRankTxt.y + 30;
            this.buttomContainer.addChild(addvalueTxt);
            var addvalueVal = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
            addvalueVal.text = App.StringUtil.formatStringColor(this._acrank.myrank.value ? this._acrank.myrank.value : 0, TextFieldConst.COLOR_WARN_GREEN);
            addvalueVal.x = addvalueTxt.x + addvalueTxt.width;
            addvalueVal.y = myRankTxt.y + 30;
            this.buttomContainer.addChild(addvalueVal);
        }
        else if (this._selectedTabIndex == 1) {
            if (this._killrank && this._killrank[0]) {
                var lastkillTxt = ComponentManager.getTextField(LanguageManager.getlocal("dailybossLastKillTimeDesc", [this._killrank[0].name]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
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
