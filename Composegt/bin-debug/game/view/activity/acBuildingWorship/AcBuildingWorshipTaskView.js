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
var AcBuildingWorshipTaskView = (function (_super) {
    __extends(AcBuildingWorshipTaskView, _super);
    function AcBuildingWorshipTaskView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scrollList = null;
        _this.aid = null;
        _this.code = null;
        _this._aidAndCode = null;
        _this._fettersList = [];
        _this._fettersBaseList = [];
        _this._maskPanel = null;
        _this._lockPeople = null;
        _this._lockDialog = null;
        return _this;
    }
    Object.defineProperty(AcBuildingWorshipTaskView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBuildingWorshipTaskView.prototype.initView = function () {
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:2, kid:NetRequestConst.KID_BUILDINGWORSHIPAC});
        this.aid = AcBuildingWorshipView.AID;
        this.code = AcBuildingWorshipView.CODE;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BUILDINGWORSHIP_REFRESHVO, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.container.y - 10);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var taskData = this.vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList = ComponentManager.getScrollList(AcBuildingWorshipTaskScrollItem, taskData, rect, this._aidAndCode);
        this._scrollList.y = 3;
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this.addChildToContainer(this._scrollList);
        //边框
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 69;
        borderBg.y = 69;
        this.addChild(borderBg);
    };
    AcBuildingWorshipTaskView.prototype.rechargeHandler = function (event) {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcBuildingWorshipTaskView.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                    // Api.servantVoApi.checkServantChangeRewards( data.cfrewards, data.rewards);
                    Api.wifeVoApi.checkWifeChangeRewards(data.cfrewards, data.rewards);
                }
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, this._aidAndCode);
    };
    AcBuildingWorshipTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_1_red"
        ]);
    };
    AcBuildingWorshipTaskView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BUILDINGWORSHIP_REFRESHVO, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        this._fettersList = [];
        this._fettersBaseList = [];
        this._maskPanel = null;
        this._lockPeople = null;
        this._lockDialog = null;
        _super.prototype.dispose.call(this);
    };
    return AcBuildingWorshipTaskView;
}(CommonView));
__reflect(AcBuildingWorshipTaskView.prototype, "AcBuildingWorshipTaskView");
