/**
 * 冲榜排行
 * author yanyuling
 * date 2017/11/06
 * @class AcRankListPopupView
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
var AcCrossServerHegemonyRankListPopupView = (function (_super) {
    __extends(AcCrossServerHegemonyRankListPopupView, _super);
    function AcCrossServerHegemonyRankListPopupView() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._rankData = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyRankListPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取活动配置
     */
    AcCrossServerHegemonyRankListPopupView.prototype.getRequestData = function () {
        this._aid = String(this.param.data.aid);
        this._code = String(this.param.data.code);
        var type = this.param.data.type;
        if (this._aid == "" || this._code == "") {
            return null;
        }
        if (type == 2) {
            return { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETPROMOTIONRANK, requestData: { activeId: this._aid + "-" + this._code } };
        }
        else if (type == 1) {
            return { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETRANK, requestData: { activeId: this._aid + "-" + this._code } };
        }
    };
    AcCrossServerHegemonyRankListPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        this._rankData = null;
        this._rankData = data.data.data;
        // console.log(this._rankData);
        // this._acRankInfoVo  = Api.acRankVoApi.getAcRankInfoVoByAidAndCode(this._aid,this._code);
        // this._allirank = data.data.data.allirank  as AcRankInfoVo;
    };
    Object.defineProperty(AcCrossServerHegemonyRankListPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyRankListPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    AcCrossServerHegemonyRankListPopupView.prototype.initView = function () {
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, String(this._code));
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        // let startY = 20;
        var bg1 = BaseBitmap.create("public_9_bg33");
        bg1.width = 530;
        bg1.height = 35;
        bg1.x = this.viewBg.x + this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = 15;
        this._nodeContainer.addChild(bg1);
        var tcbg2 = BaseBitmap.create("public_9_bg93"); //bg33
        tcbg2.width = 530;
        tcbg2.height = 600;
        tcbg2.x = this.viewBg.width / 2 - tcbg2.width / 2;
        tcbg2.visible = true;
        8;
        this._nodeContainer.addChild(tcbg2);
        // let bg2= BaseBitmap.create("rank_biao");
        // bg2.width = 480; 
        // bg2.x = 42+20;
        // bg2.y = 33;
        // this._nodeContainer.addChild(bg2);
        var deltaH = 0;
        tcbg2.height = 610 - deltaH;
        tcbg2.y = 55 + deltaH;
        //排名
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyRank"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = 95 - titleTxt1.width / 2;
        titleTxt1.y = 21 + deltaH;
        this._nodeContainer.addChild(titleTxt1);
        //帮会名称
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyAllName2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.name = "titleTxt2";
        titleTxt2.x = 205 - titleTxt2.width / 2;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        //区服
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyQu"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nodeContainer.addChild(titleTxt3);
        titleTxt3.x = 318 - titleTxt3.width / 2;
        titleTxt3.y = titleTxt1.y;
        titleTxt3.name = "titleTxt3";
        //人气值
        var titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyFlagNumValue"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nodeContainer.addChild(titleTxt4);
        titleTxt4.x = 412 - titleTxt4.width / 2;
        titleTxt4.y = titleTxt1.y;
        titleTxt4.name = "titleTxt4";
        //胜场
        var titleTxt5 = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyCurWinNum"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nodeContainer.addChild(titleTxt5);
        titleTxt5.x = 522 - titleTxt5.width / 2;
        titleTxt5.y = titleTxt1.y;
        titleTxt5.name = "titleTxt5";
        var bg3 = BaseBitmap.create("public_9_bg1");
        bg3.width = tcbg2.width;
        bg3.height = 120;
        bg3.x = tcbg2.x;
        bg3.y = tcbg2.y + tcbg2.height + 5;
        this._nodeContainer.addChild(bg3);
        var allNameV = this._rankData.myrank.name;
        var rankV = "10000+";
        if (this._rankData.myrank) {
            rankV = String(this._rankData.myrank.myrank);
        }
        var quV = this._rankData.myrank.zid;
        var winNumV = this._rankData.myrank.win;
        if (!this.vo.isCanJoin()) {
            if (Api.playerVoApi.getPlayerAllianceName() && Api.playerVoApi.getPlayerAllianceName() != "") {
                allNameV = Api.playerVoApi.getPlayerAllianceName();
            }
            else {
                allNameV = LanguageManager.getlocal("acCrossServerHegemonyBattleMyServantNo");
            }
            rankV = LanguageManager.getlocal("acCrossServerNoAccess");
            quV = Api.mergeServerVoApi.getTrueZid();
            winNumV = LanguageManager.getlocal("acCrossServerNoAccess");
        }
        var myAllNameTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        myAllNameTxt.text = LanguageManager.getlocal("acCrossServerHegemonyMyAllName", [allNameV]);
        myAllNameTxt.x = bg3.x + 20;
        myAllNameTxt.y = bg3.y + 25;
        this._nodeContainer.addChild(myAllNameTxt);
        var myRankTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.text = LanguageManager.getlocal("acCrossServerHegemonyMyRank", [rankV]);
        myRankTxt.x = myAllNameTxt.x;
        myRankTxt.y = myAllNameTxt.y + myAllNameTxt.height + 14;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);
        var myQuTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        myQuTxt.text = LanguageManager.getlocal("acCrossServerHegemonyMyQu", [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Number(quV))]);
        myQuTxt.x = bg3.x + 330;
        myQuTxt.y = myAllNameTxt.y;
        this._nodeContainer.addChild(myQuTxt);
        var winNumTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        winNumTxt.text = LanguageManager.getlocal("acCrossServerHegemonyMyWinNum", [winNumV]);
        winNumTxt.x = myQuTxt.x;
        winNumTxt.y = myRankTxt.y;
        this._nodeContainer.addChild(winNumTxt);
        var rect = new egret.Rectangle(0, 0, 520, tcbg2.height);
        var dataList = this._rankData.rank;
        var scrollView = ComponentManager.getScrollList(AcCrossServerHegemonyRankListScrollItem, dataList, rect, { aid: this._aid, code: this._code });
        scrollView.y = tcbg2.y + tcbg2.height / 2 - scrollView.height / 2;
        scrollView.x = tcbg2.x + tcbg2.width / 2 - scrollView.width / 2;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"), TextFieldConst.COLOR_BROWN);
        this._scrollView = scrollView;
    };
    AcCrossServerHegemonyRankListPopupView.prototype.getTitleStr = function () {
        return App.StringUtil.firstCharToLower(this.getClassName()) + "Title" + this.param.data.type;
    };
    AcCrossServerHegemonyRankListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rankinglist_rankn1",
            "rankinglist_rankn2",
            "rankinglist_rankn3",
            "rankbgs_1",
            "rankbgs_2",
            "rankbgs_3",
            "rankbgs_4",
        ]);
    };
    AcCrossServerHegemonyRankListPopupView.prototype.dispose = function () {
        this._aid = "";
        this._code = "";
        this._nodeContainer = null;
        this._scrollView = null;
        this._rankData = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRankListPopupView;
}(PopupView));
__reflect(AcCrossServerHegemonyRankListPopupView.prototype, "AcCrossServerHegemonyRankListPopupView");
//# sourceMappingURL=AcCrossServerHegemonyRankListPopupView.js.map