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
        return _this;
    }
    AllianceTaskView.prototype.initView = function () {
        // let buttombg = BaseBitmap.create("arena_bottom");
        // buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y;
        // this.addChildToContainer(buttombg);
        var border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 100 + 30;
        border.x = 0;
        border.y = -20;
        this.addChildToContainer(border);
        //最底部背景
        var buttombg = BaseBitmap.create("adult_lowbg");
        buttombg.x = GameConfig.stageWidth / 2 - buttombg.width / 2;
        buttombg.y = GameConfig.stageHeigth - buttombg.height - this.container.y - 21;
        this.addChildToContainer(buttombg);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceBtnRank", this.rankBtnHandler, this);
        rankBtn.x = buttombg.x + buttombg.width / 2 - 202 - rankBtn.width / 2;
        rankBtn.y = buttombg.y + buttombg.height / 2 - rankBtn.height / 2 + 5;
        this.addChildToContainer(rankBtn);
        var buffBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceBtnBuff", this.buffBtnHandler, this);
        buffBtn.x = buttombg.x + buttombg.width / 2 - rankBtn.width / 2;
        buffBtn.y = rankBtn.y;
        this.addChildToContainer(buffBtn);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceBtnReward", this.rewardBtnHandler, this);
        rewardBtn.x = buttombg.x + buttombg.width / 2 + 202 - rankBtn.width / 2;
        rewardBtn.y = rankBtn.y;
        this.addChildToContainer(rewardBtn);
        var rect = new egret.Rectangle(0, 0, 622, buttombg.y - 10);
        var list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        this._scrollView = ComponentManager.getScrollList(AllianceTaskScrollItem, list, rect);
        this._scrollView.y = -10;
        this._scrollView.x = GameConfig.stageWidth / 2 - this._scrollView.width / 2;
        this.addChildToContainer(this._scrollView);
    };
    AllianceTaskView.prototype.rewardBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCETASKREWARDVIEW);
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
    AllianceTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_bottom", "progress_type1_yellow2", "progress_type3_bg",
            "alliance_taskAttrbg1",
            "alliance_taskAttrbg2",
            "alliance_taskAttrbg3",
            "alliance_taskAttrbg4",
            "alliance_taskAttrWord1",
            "alliance_taskAttrWord2",
            "alliance_taskAttrWord3",
            "alliance_taskAttrWord4",
            "alliance_taskbg",
            "alliance_taskIcon1",
            "alliance_taskIcon2",
            "alliance_taskIcon3",
            "alliance_taskIcon4",
            "alliance_taskIcon5",
            "adult_lowbg",
            "achievement_state1",
            "isover",
            "alliance_task_statebg",
            "studyatk_upfnt", "studyatk_uparrow"
        ]);
    };
    AllianceTaskView.prototype.dispose = function () {
        this._scrollView = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskView;
}(CommonView));
__reflect(AllianceTaskView.prototype, "AllianceTaskView");
