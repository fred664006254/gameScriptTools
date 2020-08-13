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
 * 双11排行榜
 * @author 张朝阳
 * date 2018/10/25
 * @class AcSingleDayRechargeRankPopupView
 */
var AcSingleDayRechargeRankPopupView = (function (_super) {
    __extends(AcSingleDayRechargeRankPopupView, _super);
    function AcSingleDayRechargeRankPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._myrankArr = null;
        _this._rankArr = null;
        _this._vo = null;
        return _this;
    }
    AcSingleDayRechargeRankPopupView.prototype.initView = function () {
        this._myrankArr = this.param.data.rankData.myrankArr;
        this._rankArr = this.param.data.rankData.rankArr;
        this._vo = this.param.data.vo;
        // let bg = BaseBitmap.create("public_tc_bg01");
        // bg.width = 535;
        // bg.height = 690;
        // bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 30);
        // this.addChildToContainer(bg);
        var topbg = BaseBitmap.create("public_9_probiginnerbg");
        topbg.width = 530;
        topbg.height = 630;
        topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 15);
        this.addChildToContainer(topbg);
        var buttombg = BaseBitmap.create("public_9_bg1");
        buttombg.width = topbg.width;
        buttombg.height = 125;
        buttombg.setPosition(topbg.x, topbg.y + topbg.height + 10);
        this.addChildToContainer(buttombg);
        var titlebg = BaseBitmap.create("public_9_bg37");
        titlebg.width = topbg.width;
        titlebg.height = 36;
        titlebg.setPosition(topbg.x, topbg.y);
        this.addChildToContainer(titlebg);
        var rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewRank"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankTxt.setPosition(titlebg.x + 60 - rankTxt.width / 2, titlebg.y + titlebg.height / 2 - rankTxt.height / 2);
        this.addChildToContainer(rankTxt);
        var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameTxt.setPosition(titlebg.x + 247 - nameTxt.width / 2, rankTxt.y);
        this.addChildToContainer(nameTxt);
        var rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewRechargeGem"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        rechargeTxt.setPosition(titlebg.x + 453 - rechargeTxt.width / 2, rankTxt.y);
        this.addChildToContainer(rechargeTxt);
        var rect = new egret.Rectangle(0, 0, titlebg.width, topbg.y + topbg.width - titlebg.y - titlebg.height - 5);
        this._scrollList = ComponentManager.getScrollList(AcSingleDayRechargeRankPopupViewItem, this._rankArr, rect);
        this._scrollList.setPosition(titlebg.x, titlebg.y + titlebg.height + 5);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setEmptyTip(LanguageManager.getlocal("acSingleDayBuild1ViewTab4NotRank"));
        var myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewMyName", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myNameTxt.setPosition(buttombg.x + 30, buttombg.y + 20);
        this.addChildToContainer(myNameTxt);
        var myRankStr = "";
        if (this._myrankArr.myrank) {
            myRankStr = this._myrankArr.myrank;
        }
        else {
            myRankStr = LanguageManager.getlocal("allianceRankNoRank");
        }
        var myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewMyRank", [myRankStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.setPosition(myNameTxt.x, myNameTxt.y + myNameTxt.height + 13);
        this.addChildToContainer(myRankTxt);
        var myRechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewMyRechargeGem", [String(this._vo.getUseGemNum())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRechargeTxt.setPosition(buttombg.x + buttombg.width - myRechargeTxt.width - 25, myNameTxt.y);
        this.addChildToContainer(myRechargeTxt);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewDesc", [this._vo.config.rankNeed]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.setPosition(buttombg.x + buttombg.width / 2 - descTxt.width / 2, myRankTxt.y + myRankTxt.height + 13);
        this.addChildToContainer(descTxt);
    };
    AcSingleDayRechargeRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcSingleDayRechargeRankPopupView.prototype.getTitleStr = function () {
        return "acSingleDayRechargePopupViewTitle";
    };
    AcSingleDayRechargeRankPopupView.prototype.getShowHeight = function () {
        return 875;
    };
    AcSingleDayRechargeRankPopupView.prototype.dispose = function () {
        this._scrollList = null;
        this._myrankArr = null;
        this._rankArr = null;
        this._vo = null;
        _super.prototype.dispose.call(this);
    };
    return AcSingleDayRechargeRankPopupView;
}(PopupView));
__reflect(AcSingleDayRechargeRankPopupView.prototype, "AcSingleDayRechargeRankPopupView");
//# sourceMappingURL=AcSingleDayRechargeRankPopupView.js.map