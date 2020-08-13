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
  * 中秋活动 Tab3
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab3
  */
var AcMidAutumnViewTab3 = (function (_super) {
    __extends(AcMidAutumnViewTab3, _super);
    function AcMidAutumnViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._aidAndCode = null;
        // this.initView();
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcMidAutumnViewTab3.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC, this.refreshData, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE, this.refreshData, this);
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 40);
        this._scrollList = ComponentManager.getScrollList(AcMidAutumnRechargeScrollItem, cfg.rechargeList(), rect, this._aidAndCode);
        this._scrollList.setPosition(15, 15);
        this.addChild(this._scrollList);
        this.refreshData(null);
    };
    /**
     * 刷新数据
     */
    AcMidAutumnViewTab3.prototype.refreshData = function (event) {
        if (event) {
            if (event.data && event.data.ret) {
                var cmd = event.data.data.cmd;
                if (cmd == NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC) {
                    var data = event.data.data.data;
                    var rewards = data.rewards;
                    var oldRewards = data.cfrewards;
                    var rList = GameData.formatRewardItem(rewards);
                    App.CommonUtil.playRewardFlyAction(rList);
                    if (rewards != oldRewards) {
                        var rewardvo = GameData.formatRewardItem(oldRewards)[0];
                        var wife = Config.WifeCfg.getWifeCfgById(rewardvo.id);
                        ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "name": wife.name, "touch": wife.exchange, "message": "changeOtherRewardTip" });
                    }
                }
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var rechargeData = vo.getSortRecharge();
        rechargeData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(rechargeData, this._aidAndCode);
    };
    /**
     * 切换标签
     */
    AcMidAutumnViewTab3.prototype.refreshWhenSwitchBack = function () {
        this.refreshData(null);
    };
    AcMidAutumnViewTab3.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMC, this.refreshData, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE, this.refreshData, this);
        this._aidAndCode = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnViewTab3;
}(AcCommonViewTab));
__reflect(AcMidAutumnViewTab3.prototype, "AcMidAutumnViewTab3");
//# sourceMappingURL=AcMidAutumnViewTab3.js.map