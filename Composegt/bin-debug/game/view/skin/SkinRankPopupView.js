/**
 * 皮肤
 * author yanyuling
 * date 2018/08/13
 * @class SkinRankPopupView
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
var SkinRankPopupView = (function (_super) {
    __extends(SkinRankPopupView, _super);
    function SkinRankPopupView() {
        var _this = _super.call(this) || this;
        _this._allirank = [];
        return _this;
    }
    SkinRankPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        var startY = 20;
        var bg1 = BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 620;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 20;
        this._nodeContainer.addChild(bg1);
        var inbg1 = BaseBitmap.create("public_tc_bg03");
        inbg1.width = bg1.width - 20;
        inbg1.height = bg1.height - 130;
        inbg1.x = bg1.x + 10;
        inbg1.y = bg1.y + 10;
        this._nodeContainer.addChild(inbg1);
        var bg2 = BaseBitmap.create("rank_biao");
        bg2.width = inbg1.width - 30;
        bg2.height = 40;
        bg2.x = inbg1.x + 10;
        bg2.y = inbg1.y + 14;
        this._nodeContainer.addChild(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 30;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2Str = LanguageManager.getlocal("ranknickName");
        var titleTxt2 = ComponentManager.getTextField(titleTxt2Str, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = bg2.x + 140;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        var titleStr3 = LanguageManager.getlocal("rankServer");
        var titleTxt3 = ComponentManager.getTextField(titleStr3, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.x = bg2.x + 330 - titleTxt3.width / 2;
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("rank_imacy"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (this.param.data.rtype == 1) {
            titleTxt4.text = LanguageManager.getlocal("attributeName");
        }
        titleTxt4.x = bg2.x + 430 - titleTxt4.width / 2;
        titleTxt4.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt4);
        var bg3 = BaseBitmap.create("public_tc_bg03");
        bg3.width = inbg1.width;
        bg3.height = 100;
        bg3.x = inbg1.x;
        bg3.y = inbg1.y + inbg1.height + 10;
        this._nodeContainer.addChild(bg3);
        var nickTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nickTxt.text = LanguageManager.getlocal("acRank_mynick", [Api.playerVoApi.getPlayerName()]);
        nickTxt.x = bg3.x + 20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);
        // let nickTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        // nickTxt2.text =  Api.playerVoApi.getPlayerName();
        // nickTxt2.x = nickTxt.x+nickTxt.width +2;
        // nickTxt2.y = nickTxt.y
        // this._nodeContainer.addChild(nickTxt2);
        var rankV = LanguageManager.getlocal("allianceRankNoRank");
        var addV = this._allirank["myinfo"].attr || 0;
        var resrank = this._allirank["resrank"];
        for (var key in resrank) {
            if (resrank.hasOwnProperty(key)) {
                var tmpData = resrank[key];
                if (tmpData.uid == Api.playerVoApi.getPlayerID()) {
                    rankV = "" + (Number(key) + 1);
                    break;
                }
            }
        }
        var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y + 40;
        this._nodeContainer.addChild(myRankTxt);
        var ZoneTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        ZoneTxt.text = LanguageManager.getlocal("rankServer") + ": ";
        ZoneTxt.x = myRankTxt.x + 260;
        ZoneTxt.y = nickTxt.y;
        this._nodeContainer.addChild(ZoneTxt);
        var ZoneTxt2 = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        ZoneTxt2.text = Api.mergeServerVoApi.getAfterMergeSeverName();
        // LanguageManager.getlocal("ranserver2", [""+ServerCfg.selectServer.zid]);
        ZoneTxt2.x = ZoneTxt.x + ZoneTxt.width;
        ZoneTxt2.y = ZoneTxt.y;
        this._nodeContainer.addChild(ZoneTxt2);
        var addStr = "";
        var addvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        addvalueTxt.text = LanguageManager.getlocal("rank_imacy") + ": " + App.StringUtil.changeIntToText(addV);
        if (this.param.data.rtype == 1) {
            addvalueTxt.text = LanguageManager.getlocal("attributeName") + ": " + App.StringUtil.changeIntToText(addV);
        }
        addvalueTxt.x = ZoneTxt.x;
        addvalueTxt.y = myRankTxt.y;
        this._nodeContainer.addChild(addvalueTxt);
        var rect = new egret.Rectangle(0, 0, inbg1.width - 20, inbg1.height - bg2.y - bg2.height);
        var scrollView = ComponentManager.getScrollList(SkinRankScrollItem, resrank, rect);
        scrollView.y = bg2.y + bg2.height + 10;
        scrollView.x = inbg1.x + 10;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollView = scrollView;
        var tipTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_BROWN);
        tipTxt.text = LanguageManager.getlocal("skinRankTipTxt");
        tipTxt.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bg1.y + bg1.height + 10;
        this._nodeContainer.addChild(tipTxt);
    };
    SkinRankPopupView.prototype.getShowHeight = function () {
        return 770;
    };
    /**
     * 获取活动配置
     */
    SkinRankPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUST_CROSSSKIN_GETSKINRANK, requestData: this.param.data };
    };
    SkinRankPopupView.prototype.receiveData = function (data) {
        this._allirank = data.data.data;
    };
    SkinRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "dinner_rankbg", "dinner_rank_titlebg",
            "rank_line", "rank_biao",
        ]);
    };
    SkinRankPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._scrollView = null;
        this._allirank = null;
        _super.prototype.dispose.call(this);
    };
    return SkinRankPopupView;
}(PopupView));
__reflect(SkinRankPopupView.prototype, "SkinRankPopupView");
