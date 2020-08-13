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
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
var AcMidAutumnViewTab2 = (function (_super) {
    __extends(AcMidAutumnViewTab2, _super);
    function AcMidAutumnViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        _this.initView();
        return _this;
    }
    AcMidAutumnViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.refreshData, this);
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 40);
        this._scrollList = ComponentManager.getScrollList(AcMidAutumnTaskScrollItem, null, rect, this._aidAndCode);
        this._scrollList.setPosition(15, 15);
        this.addChild(this._scrollList);
        this.refreshData(null);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - 205 + 54;
        bottomBg.x = 0;
        bottomBg.y = 0;
        this.addChild(bottomBg);
    };
    AcMidAutumnViewTab2.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                }
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, this._aidAndCode);
    };
    /**
     * 切换标签
     */
    AcMidAutumnViewTab2.prototype.refreshWhenSwitchBack = function () {
        this.refreshData(null);
    };
    AcMidAutumnViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY, this.refreshData, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE, this.refreshData, this);
        this._scrollList = null;
        this._aidAndCode = null;
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnViewTab2;
}(AcCommonViewTab));
__reflect(AcMidAutumnViewTab2.prototype, "AcMidAutumnViewTab2");
