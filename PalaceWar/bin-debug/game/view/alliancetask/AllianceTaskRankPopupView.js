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
 *帮会任务排行榜
 * author yanyuling
 * date 2018/07/23
 * @class AllianceTaskRankPopupView

 */
var AllianceTaskRankPopupView = (function (_super) {
    __extends(AllianceTaskRankPopupView, _super);
    function AllianceTaskRankPopupView() {
        var _this = _super.call(this) || this;
        _this._acRankInfoVo = null;
        _this._ranksData = null;
        return _this;
    }
    AllianceTaskRankPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        var startY = 20;
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 540;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        this._nodeContainer.addChild(bg1);
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.name = "titleTxt2";
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        var titleStr3 = LanguageManager.getlocal("allianceTaskRankContribution");
        if (this.param.data.alliRank) {
            titleTxt2.text = LanguageManager.getlocal("acRankPop_titleAlliance");
            titleStr3 = LanguageManager.getlocal("allianceTaskRank_complete_times");
        }
        var titleTxt3 = ComponentManager.getTextField(titleStr3, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);
        titleTxt3.name = "titleTxt3";
        titleTxt2.x = bg2.x + 200;
        titleTxt3.x = bg2.x + 430 - titleTxt3.width / 2;
        var bg3 = BaseBitmap.create("public_9_bg1");
        bg3.width = bg1.width;
        bg3.height = 100;
        bg3.x = bg1.x;
        bg3.y = bg1.y + bg1.height + 9;
        this._nodeContainer.addChild(bg3);
        var nickTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        nickTxt.text = LanguageManager.getlocal("acRank_mynick") + Api.playerVoApi.getPlayerName();
        nickTxt.x = bg3.x + 20;
        nickTxt.y = bg3.y + 20;
        this._nodeContainer.addChild(nickTxt);
        if (this.param.data.alliRank) {
            if (Api.playerVoApi.getPlayerAllianceId() == 0) {
                nickTxt.text = LanguageManager.getlocal("allianceRankMyAlliance", [LanguageManager.getlocal("allianceRankNoAlliance")]);
            }
            else {
                nickTxt.text = LanguageManager.getlocal("allianceRankMyAlliance", [Api.playerVoApi.getPlayerAllianceName()]);
            }
        }
        var rankV = "10000+";
        var addV = "0";
        if (this._ranksData.merank) {
            rankV = String(this._ranksData.merank);
            addV = String(this._ranksData.v);
        }
        var myRankTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTxt.text = LanguageManager.getlocal("acRank_myrank", [rankV]);
        myRankTxt.x = nickTxt.x;
        myRankTxt.y = nickTxt.y + 40;
        myRankTxt.name = "myRankTxt";
        this._nodeContainer.addChild(myRankTxt);
        var addStr = "";
        var addvalueTxt = ComponentManager.getTextField("", nickTxt.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        addvalueTxt.text = LanguageManager.getlocal("acRank_myaddV", [titleStr3, addV]);
        addvalueTxt.x = myRankTxt.x + 240;
        addvalueTxt.y = myRankTxt.y;
        addvalueTxt.name = "addvalueTxt";
        this._nodeContainer.addChild(addvalueTxt);
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, bg1.height - 60);
        var dataList = this._ranksData.ranks;
        var scrollView = ComponentManager.getScrollList(AllianceTaskRankScrollItem, dataList, rect);
        scrollView.x = GameData.popupviewOffsetX;
        scrollView.y = bg2.y + 50;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollView = scrollView;
    };
    /**
     * 获取活动配置
     */
    AllianceTaskRankPopupView.prototype.getRequestData = function () {
        var taskId = this.param.data.taskId;
        var alliRank = this.param.data.alliRank;
        if (alliRank) {
            return { requestType: NetRequestConst.REQUEST_ALLIANCETASK_RANK, requestData: { dype: 1, tid: taskId } };
        }
        else {
            return { requestType: NetRequestConst.REQUEST_ALLIANCETASK_RANK, requestData: { dype: 2, tid: taskId } };
        }
    };
    AllianceTaskRankPopupView.prototype.receiveData = function (data) {
        if (data && data.ret) {
            this._ranksData = data.data.data;
        }
    };
    AllianceTaskRankPopupView.prototype.getShowHeight = function () {
        return 750;
    };
    AllianceTaskRankPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_1", "rank_2", "rank_3",
        ]);
    };
    AllianceTaskRankPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._ranksData = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskRankPopupView;
}(PopupView));
__reflect(AllianceTaskRankPopupView.prototype, "AllianceTaskRankPopupView");
//# sourceMappingURL=AllianceTaskRankPopupView.js.map