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
  * 马超活动Tab2
  * author 张朝阳
  * date 2019/1/14
  * @class AcMazeViewTab2
  */
var AcMaChaoViewTab2 = (function (_super) {
    __extends(AcMaChaoViewTab2, _super);
    function AcMaChaoViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcMaChaoViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB, this.receiveHandle, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        var bg = BaseBitmap.create("public_9_bg43");
        bg.width = 620;
        bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 25;
        bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, 10);
        this.addChild(bg);
        var rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10);
        this._scrollList = ComponentManager.getScrollList(AcMaChaoTaskScrollItem, null, rect);
        this._scrollList.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(this._scrollList);
        this.refreshData();
    };
    AcMaChaoViewTab2.prototype.refreshData = function () {
        if (!this.parent) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, { code: this.code, aid: this.aid });
    };
    AcMaChaoViewTab2.prototype.receiveHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
        }
    };
    AcMaChaoViewTab2.prototype.refreshWhenSwitchBack = function () {
        this.refreshData();
    };
    AcMaChaoViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB, this.receiveHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoViewTab2;
}(AcCommonViewTab));
__reflect(AcMaChaoViewTab2.prototype, "AcMaChaoViewTab2");
//# sourceMappingURL=AcMaChaoViewTab2.js.map