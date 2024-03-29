/**
 * 宴会排行榜
 * author shaoliang
 * date 2017/10/31
 * @class DinnerRankPopupView
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
var WifebattleRankPopupView = (function (_super) {
    __extends(WifebattleRankPopupView, _super);
    function WifebattleRankPopupView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this._merank = 0;
        _this._mepoint = 0;
        return _this;
    }
    WifebattleRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankbg_1",
            "rankbg_2",
            "rankbg_3",
            "rankinglist_rankn1",
            "rankinglist_rankn2",
            "rankinglist_rankn3"
        ]);
    };
    WifebattleRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_WIFEBATTLE_RANK, requestData: {} };
    };
    WifebattleRankPopupView.prototype.receiveData = function (data) {
        this._infoList = data.data.data.rankarr;
        this._merank = data.data.data.merank;
        this._mepoint = data.data.data.mepoint;
    };
    WifebattleRankPopupView.prototype.initView = function () {
        // let tabName = ["dinnerRank"];
        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,null,null);
        // tabbarGroup.x = 50;
        // tabbarGroup.y = 10;
        // this.addChildToContainer(tabbarGroup);
        // let rankDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerRankDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // rankDesc.setPosition(this.viewBg.width - 40 - rankDesc.width, 22);
        // this.addChildToContainer(rankDesc);
        var topBg = BaseBitmap.create("public_9_bg36");
        topBg.width = 520;
        topBg.height = 521 + 84 + 30 + 50;
        topBg.setPosition(this.viewBg.width / 2 - topBg.width / 2, 20);
        // outBg.setPosition(this.viewBg.width/2  - outBg.width/2, tabbarGroup.y + tabbarGroup.height);
        this.addChildToContainer(topBg);
        var titleBg = BaseBitmap.create("public_9_bg33");
        titleBg.width = topBg.width;
        titleBg.height = 30;
        titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = topBg.y;
        this.addChildToContainer(titleBg);
        this._scroRect = new egret.Rectangle(0, 0, topBg.width, topBg.height - 12 - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(WifebattleRankPopupScrollList, this._infoList, this._scroRect);
        this._scrollList.x = this.viewBg.width / 2 - this._scrollList.width / 2;
        this._scrollList.y = titleBg.y + titleBg.height;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"), TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(this._scrollList);
        var bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = topBg.width;
        bottomBg.height = 84;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = topBg.y + topBg.height + 10;
        this.addChildToContainer(bottomBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(75 + GameData.popupviewOffsetX, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(206 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(nameText);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(395 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankBottomName", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickName.setPosition(bottomBg.x + 25, bottomBg.y + 15);
        this.addChildToContainer(nickName);
        // let rankStr :string = null;
        // if(this._merank > 100){
        // 	rankStr = "100+";
        // } else {
        // }
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankBottomOrder", [String(this._merank)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText2.setPosition(bottomBg.x + 305, nickName.y);
        this.addChildToContainer(rankText2);
        // let rankStr:string;
        // if (this._merank>300) {
        // 	rankStr = "10000+";
        // }
        // else {
        // 	rankStr = this._merank.toString();
        // }
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleRankBottomScore", [String(this._mepoint)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        socreText.setPosition(nickName.x, nickName.y + nickName.height + 8);
        this.addChildToContainer(socreText);
    };
    WifebattleRankPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this._scroRect = null;
        this._infoList = null;
        this._merank = 0;
        this._mepoint = 0;
        _super.prototype.dispose.call(this);
    };
    return WifebattleRankPopupView;
}(PopupView));
__reflect(WifebattleRankPopupView.prototype, "WifebattleRankPopupView");
//# sourceMappingURL=WifebattleRankPopupView.js.map