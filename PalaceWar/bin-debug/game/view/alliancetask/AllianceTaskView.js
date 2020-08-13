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
 *帮会任务
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskView
 */
var AllianceTaskView = (function (_super) {
    __extends(AllianceTaskView, _super);
    function AllianceTaskView() {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        _this._rewardBtn = null;
        _this._rewardDesc = null;
        return _this;
    }
    AllianceTaskView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD), this.resetRedDot, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT), this.freshView, this);
        var buttombg = BaseBitmap.create("arena_bottom");
        buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y;
        this.addChildToContainer(buttombg);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnRank", this.rankBtnHandler, this);
        rankBtn.x = buttombg.x + 30;
        rankBtn.y = buttombg.y + buttombg.height / 2 - rankBtn.height / 2;
        this.addChildToContainer(rankBtn);
        var buffBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnBuff", this.buffBtnHandler, this);
        buffBtn.x = buttombg.x + buttombg.width / 2 - rankBtn.width / 2;
        buffBtn.y = rankBtn.y;
        this.addChildToContainer(buffBtn);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnReward", this.rewardBtnHandler, this);
        rewardBtn.x = buttombg.x + buttombg.width - rewardBtn.width - rankBtn.x;
        rewardBtn.y = rankBtn.y;
        this.addChildToContainer(rewardBtn);
        this._rewardBtn = rewardBtn;
        var rewardDescStr = "alliancetask_reward_desc";
        // let rewardDescColor = TextFieldConst.COLOR_WARN_RED3;
        if (Api.allianceTaskVoApi.isJoinedAllianceTask()) {
            rewardDescStr = "alliancetask_reward_joined_desc";
            // rewardDescColor = TextFieldConst.COLOR_WHITE;
        }
        var rewardDesc = ComponentManager.getTextField(LanguageManager.getlocal(rewardDescStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        // rewardDesc.setColor(TextFieldConst.COLOR_WHITE);
        rewardDesc.width = 640;
        rewardDesc.textAlign = egret.HorizontalAlign.CENTER;
        rewardDesc.setPosition(0, buttombg.y - 10 - rewardDesc.height);
        this.addChildToContainer(rewardDesc);
        this._rewardDesc = rewardDesc;
        var rect = new egret.Rectangle(0, 0, 622, buttombg.y - 10 - rewardDesc.height);
        // let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        var list = Api.allianceTaskVoApi.getAllTaskList();
        this._scrollView = ComponentManager.getScrollList(AllianceTaskScrollItem, list, rect);
        this._scrollView.y = -10;
        this._scrollView.x = GameConfig.stageWidth / 2 - this._scrollView.width / 2;
        this.addChildToContainer(this._scrollView);
        this.resetRedDot();
    };
    AllianceTaskView.prototype.rewardBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKREWARDVIEW);
    };
    AllianceTaskView.prototype.freshView = function () {
        var list = Api.allianceTaskVoApi.getAllTaskList();
        this._scrollView.refreshData(list);
        this.resetRedDot();
        var rewardDescStr = "alliancetask_reward_desc";
        // let rewardDescColor = TextFieldConst.COLOR_WARN_RED3;
        if (Api.allianceTaskVoApi.isJoinedAllianceTask()) {
            rewardDescStr = "alliancetask_reward_joined_desc";
            // rewardDescColor = TextFieldConst.COLOR_WHITE;
        }
        this._rewardDesc.text = LanguageManager.getlocal(rewardDescStr);
        // this._rewardDesc.setColor(rewardDescColor);
    };
    AllianceTaskView.prototype.resetRedDot = function () {
        if (Api.allianceTaskVoApi.isShowRewardRed() && (!Api.allianceTaskVoApi.isInNotGetTime())) {
            App.CommonUtil.addIconToBDOC(this._rewardBtn);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
        }
    };
    AllianceTaskView.prototype.rankBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKRANKPOPUPVIEW, { taskId: null, alliRank: 1 });
    };
    AllianceTaskView.prototype.buffBtnHandler = function () {
        var tws = App.DateUtil.getWeeTs(GameData.serverTime);
        if (GameData.serverTime + 1800 >= tws + 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceTaskoutTimeTip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCETASKBUFFLISTPOPUPVIEW);
    };
    AllianceTaskView.prototype.receiveData = function (data) {
    };
    AllianceTaskView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ALLIANCETASK_INIT, requestData: {} };
    };
    AllianceTaskView.prototype.getRuleInfo = function () {
        return "allianceTaskRuleInfo";
    };
    AllianceTaskView.prototype.getRuleInfoParam = function () {
        return [String(App.DateUtil.formatSvrHourByLocalTimeZone(0).hour)];
    };
    AllianceTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_bottom", "progress3", "progress3_bg",
            "alliance_taskAttrbg1",
            "alliance_taskAttrbg2",
            "alliance_taskAttrbg3",
            "alliance_taskAttrbg4",
            "alliance_taskAttrbg5",
            "alliance_taskAttrWordbg",
            "alliance_taskbg",
            "alliance_taskbg5",
            "alliance_taskIcon1",
            "alliance_taskIcon2",
            "alliance_taskIcon3",
            "alliance_taskIcon4",
            "alliance_taskIcon5",
            "alliance_taskimg1",
            "alliance_taskwotdbg1",
            "alliance_taskwotdbg2",
            "alliance_taskwotdbg3",
            "alliance_join1",
            "alliance_join3",
            "alliance_join2",
            "alliance_join4",
            "public_icon13",
        ]);
    };
    AllianceTaskView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_REWARD), this.resetRedDot, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCETASK_FIGHT), this.freshView, this);
        this._scrollView = null;
        this._rewardBtn = null;
        this._rewardDesc = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskView;
}(CommonView));
__reflect(AllianceTaskView.prototype, "AllianceTaskView");
//# sourceMappingURL=AllianceTaskView.js.map