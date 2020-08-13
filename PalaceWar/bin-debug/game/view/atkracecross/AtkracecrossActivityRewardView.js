var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AtkracecrossActivityRewardView = /** @class */ (function (_super) {
    __extends(AtkracecrossActivityRewardView, _super);
    function AtkracecrossActivityRewardView() {
        return _super.call(this) || this;
    }
    AtkracecrossActivityRewardView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AtkracecrossActivityRewardView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ATKRACECROSS_RANK, requestData: {} };
    };
    AtkracecrossActivityRewardView.prototype.receiveData = function (data) {
        if (data.ret == true && data.data && data.data.data.atkrank) {
            AtkracecrossActivityRewardView._merank = data.data.data.merank;
            AtkracecrossActivityRewardView._mepoint = data.data.data.mepoint;
            AtkracecrossActivityRewardView._iszonewin = data.data.data.iszonewin;
        }
    };
    AtkracecrossActivityRewardView.prototype.getTabbarTextArr = function () {
        return [
            "atkracecrossActivityRewardTab1",
            "atkracecrossActivityRewardTab2",
        ];
    };
    AtkracecrossActivityRewardView.prototype.initTabbarGroup = function () {
        var codeStr2 = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace", codeStr2 + "");
        if (vo.checkIsFengyun()) {
            var tabbg = BaseBitmap.create("commonview_tabbar_bg");
            tabbg.x = 10;
            tabbg.y = 145;
            this.addChild(tabbg);
        }
        _super.prototype.initTabbarGroup.call(this);
    };
    AtkracecrossActivityRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg",
            "commonview_tabbar_bg"
        ]);
    };
    AtkracecrossActivityRewardView.prototype.initView = function () {
        var view = this;
        var codeStr2 = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace", codeStr2 + "");
        if (vo.checkIsFengyun()) {
            view.bigframe.height = GameConfig.stageHeigth - view.container.y + 60;
            view.bigframe.y = -60;
        }
        else {
            view.bigframe.visible = false;
        }
        view.update();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD), this.update, this);
    };
    AtkracecrossActivityRewardView.prototype.update = function () {
        var codeStr2 = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace", codeStr2 + "");
        if (vo.showZonerward()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    AtkracecrossActivityRewardView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AtkracecrossActivityRewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACEG_WINZIDREWARD), this.update, this);
        _super.prototype.dispose.call(this);
    };
    AtkracecrossActivityRewardView._merank = 0;
    AtkracecrossActivityRewardView._mepoint = 0;
    AtkracecrossActivityRewardView._iszonewin = 0;
    return AtkracecrossActivityRewardView;
}(CommonView));
//# sourceMappingURL=AtkracecrossActivityRewardView.js.map