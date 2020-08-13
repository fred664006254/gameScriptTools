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
  * 中秋活动 Tab2
  * @author 张朝阳
  * date 2018/12/7
  * @class AcHotelViewTab2
  */
var AcHotelViewTab2 = (function (_super) {
    __extends(AcHotelViewTab2, _super);
    function AcHotelViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    AcHotelViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMB, this.receiveHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 40);
        this._scrollList = ComponentManager.getScrollList(AcHotelTaskScrollItem, null, rect, this._aidAndCode);
        this._scrollList.setPosition(15, 15);
        this.addChild(this._scrollList);
        this.refreshData();
    };
    AcHotelViewTab2.prototype.refreshData = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, this._aidAndCode);
    };
    AcHotelViewTab2.prototype.receiveHandle = function (event) {
        if (event.data && event.data.ret) {
            var data = event.data.data.data;
            var rewards = data.rewards;
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
            this.refreshData();
        }
    };
    /**
     * 切换标签
     */
    AcHotelViewTab2.prototype.refreshWhenSwitchBack = function () {
        this.refreshData();
    };
    AcHotelViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMB, this.receiveHandle, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcHotelViewTab2;
}(AcCommonViewTab));
__reflect(AcHotelViewTab2.prototype, "AcHotelViewTab2");
//# sourceMappingURL=AcHotelViewTab2.js.map