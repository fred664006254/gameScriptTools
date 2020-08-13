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
var DinnerRankPopupView = (function (_super) {
    __extends(DinnerRankPopupView, _super);
    function DinnerRankPopupView() {
        var _this = _super.call(this) || this;
        _this._infoList = null;
        _this._merank = 0;
        return _this;
    }
    DinnerRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_line",
            "dinner_rankbg"
        ]);
    };
    DinnerRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_DINNER_TOP, requestData: {} };
    };
    DinnerRankPopupView.prototype.receiveData = function (data) {
        this._infoList = data.data.data.dinnertop;
        this._merank = data.data.data.merank;
    };
    DinnerRankPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    DinnerRankPopupView.prototype.initView = function () {
        var tabName = ["dinnerRank"];
        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,null,null);
        // tabbarGroup.x = 40;
        // tabbarGroup.y = 10;
        // this.addChildToContainer(tabbarGroup);
        // let rankDescStr:string = "";
        // if(!this.shieldCn())
        // {
        // 	rankDescStr = LanguageManager.getlocal("dinnerRankDesc");
        // }
        // let rankDesc:BaseTextField = ComponentManager.getTextField(rankDescStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // rankDesc.setPosition(this.viewBg.width - 40 - rankDesc.width, 22);
        // this.addChildToContainer(rankDesc);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 520;
        rankBg.height = 526;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, 20);
        this.addChildToContainer(rankBg);
        var titleBg = BaseBitmap.create("dinner_rank_titlebg");
        titleBg.width = rankBg.width;
        titleBg.height = 36;
        titleBg.setPosition(rankBg.x, rankBg.y);
        this.addChildToContainer(titleBg);
        this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width, rankBg.height - titleBg.height - 8);
        this._scrollList = ComponentManager.getScrollList(DinnerRankItem, this._infoList, this._scroRect);
        this._scrollList.x = titleBg.x;
        this._scrollList.y = titleBg.y + titleBg.height;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("allianceBossRank_emptyTip"));
        this.addChildToContainer(this._scrollList);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 516;
        bottomBg.height = 84;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, rankBg.y + rankBg.height + 8);
        this.addChildToContainer(bottomBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.setPosition(65 + GameData.popupviewOffsetX, titleBg.y + titleBg.height / 2 - rankText.height / 2);
        this.addChildToContainer(rankText);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.setPosition(200 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(nameText);
        var scoreText = ComponentManager.getTextField(LanguageManager.getlocal("dinnerScore"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        scoreText.setPosition(387 + GameData.popupviewOffsetX, rankText.y);
        this.addChildToContainer(scoreText);
        var nickName = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nickName.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 - 5 - nickName.height);
        this.addChildToContainer(nickName);
        var rankText2 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankText2.setPosition(rankText.x, bottomBg.y + bottomBg.height / 2 + 5);
        this.addChildToContainer(rankText2);
        var name = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nickName.x + nickName.width + 12, nickName.y);
        this.addChildToContainer(name);
        var rankStr;
        if (this._merank > 300) {
            rankStr = "10000+";
        }
        else {
            rankStr = this._merank.toString();
        }
        var rank = ComponentManager.getTextField(rankStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        rank.setPosition(rankText2.x + rankText2.width + 12, rankText2.y);
        this.addChildToContainer(rank);
        var socre = ComponentManager.getTextField(Api.dinnerVoApi.getTotalPoint().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
        socre.setPosition(bottomBg.x + bottomBg.width - 20 - socre.width, rankText2.y);
        this.addChildToContainer(socre);
        var socreText = ComponentManager.getTextField(LanguageManager.getlocal("playerScore") + ":", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        socreText.setPosition(socre.x - 20 - socreText.width, rankText2.y);
        this.addChildToContainer(socreText);
    };
    /**
     * 需要屏蔽的cn字库
     */
    DinnerRankPopupView.prototype.shieldCn = function () {
        return PlatformManager.checkIsThSp();
    };
    DinnerRankPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this._scroRect = null;
        this._infoList = null;
        this._merank = 0;
        _super.prototype.dispose.call(this);
    };
    return DinnerRankPopupView;
}(PopupView));
__reflect(DinnerRankPopupView.prototype, "DinnerRankPopupView");
//# sourceMappingURL=DinnerRankPopupView.js.map