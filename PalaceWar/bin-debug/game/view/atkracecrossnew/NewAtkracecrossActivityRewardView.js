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
var NewAtkracecrossActivityRewardView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossActivityRewardView, _super);
    function NewAtkracecrossActivityRewardView() {
        return _super.call(this) || this;
    }
    NewAtkracecrossActivityRewardView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    NewAtkracecrossActivityRewardView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_NEWATKRACECROSS_RANK, requestData: {} };
    };
    NewAtkracecrossActivityRewardView.prototype.receiveData = function (data) {
        if (data.ret == true && data.data && data.data.data.atkrank) {
            AtkracecrossActivityRewardView._merank = data.data.data.merank;
            AtkracecrossActivityRewardView._mepoint = data.data.data.mepoint;
            AtkracecrossActivityRewardView._iszonewin = data.data.data.iszonewin;
        }
    };
    NewAtkracecrossActivityRewardView.prototype.getTitleStr = function () {
        return "atkracecrossActivityRewardViewTitle";
    };
    NewAtkracecrossActivityRewardView.prototype.getTabbarTextArr = function () {
        return [
            "atkracecrossActivityRewardTab1",
            "atkracecrossActivityRewardTab2",
        ];
    };
    NewAtkracecrossActivityRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracecross_rewatdbg1",
            "atkracecross_rewatdbg2",
            "atkracecross_rewatdbg3",
            "wifeview_bottombg", "commonview_tabbar_bg"
        ]);
    };
    NewAtkracecrossActivityRewardView.prototype.initView = function () {
        var view = this;
        view.update();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACEG_WINZIDREWARD), this.update, this);
    };
    NewAtkracecrossActivityRewardView.prototype.tick = function () {
        if (this.tabbarGroup) {
            this.update();
        }
    };
    NewAtkracecrossActivityRewardView.prototype.update = function () {
        var codeStr2 = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace").code;
        var vo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", codeStr2 + "");
        if (vo.getZoneRewardRed()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
    };
    NewAtkracecrossActivityRewardView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACEG_WINZIDREWARD), this.update, this);
        _super.prototype.dispose.call(this);
    };
    NewAtkracecrossActivityRewardView._merank = 0;
    NewAtkracecrossActivityRewardView._mepoint = 0;
    NewAtkracecrossActivityRewardView._iszonewin = 0;
    return NewAtkracecrossActivityRewardView;
}(CommonView));
//# sourceMappingURL=NewAtkracecrossActivityRewardView.js.map