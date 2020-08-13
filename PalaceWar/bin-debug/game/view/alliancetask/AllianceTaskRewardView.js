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
 *帮会任务奖励
 * author yanyuling
 * date 2018/07/20
 * @class AllianceTaskRewardView
 */
var AllianceTaskRewardView = (function (_super) {
    __extends(AllianceTaskRewardView, _super);
    function AllianceTaskRewardView() {
        var _this = _super.call(this) || this;
        _this._scrollView = null;
        return _this;
    }
    AllianceTaskRewardView.prototype.initView = function () {
        var rect = new egret.Rectangle(0, 0, 530, 565);
        // let list = Config.AlliancetaskCfg.getAllianceTaskIdList();
        var list = Api.allianceTaskVoApi.getNormalTaskList();
        this._scrollView = ComponentManager.getScrollList(AllianceTaskRewardScrollItem, list, rect);
        this._scrollView.y = 10;
        this._scrollView.x = this.viewBg.width / 2 - this._scrollView.width / 2;
        this.addChildToContainer(this._scrollView);
        var tipbg = BaseBitmap.create("public_searchdescbg");
        tipbg.width = 500;
        tipbg.x = this.viewBg.width / 2 - tipbg.width / 2;
        tipbg.y = 610;
        // tipbg.x = this.viewBg.width/2 - tipbg.width/2;
        this.addChildToContainer(tipbg);
        var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.text = LanguageManager.getlocal("alliancetask_rewardTip");
        tipTxt.lineSpacing = 6;
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = tipbg.y + tipbg.height / 2 - tipTxt.height / 2;
        this.addChildToContainer(tipTxt);
    };
    AllianceTaskRewardView.prototype.receiveData = function (data) {
    };
    AllianceTaskRewardView.prototype.getRequestData = function () {
        // return {requestType:NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,requestData:{}};
        return null;
    };
    AllianceTaskRewardView.prototype.getRuleInfo = function () {
        return "alliancetask_getRewardRuleInfo";
    };
    AllianceTaskRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AllianceTaskRewardView.prototype.getShowHeight = function () {
        return 660;
    };
    AllianceTaskRewardView.prototype.dispose = function () {
        this._scrollView = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceTaskRewardView;
}(PopupView));
__reflect(AllianceTaskRewardView.prototype, "AllianceTaskRewardView");
//# sourceMappingURL=AllianceTaskRewardView.js.map