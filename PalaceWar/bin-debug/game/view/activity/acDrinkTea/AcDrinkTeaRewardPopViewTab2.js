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
 * 进度奖励
 * author wxz
 * date 2020.5.18
 * @class AcDrinkTeaRewardPopViewTab2
 */
var AcDrinkTeaRewardPopViewTab2 = (function (_super) {
    __extends(AcDrinkTeaRewardPopViewTab2, _super);
    function AcDrinkTeaRewardPopViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcDrinkTeaRewardPopViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DRINKTEA_GETACHIEVEMENT, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);
        var id = "";
        var index = -1;
        var dataList = this.vo.getSortAchievementCfg();
        if (AcDrinkTeaView.IS_SHOW_PROCESS >= 0) {
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id == AcDrinkTeaView.IS_SHOW_PROCESS) {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }
            AcDrinkTeaView.IS_SHOW_PROCESS = -1;
        }
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcDrinkTeaRewardTab2ScrollItem, dataList, rect, { id: id, aid: this.aid, code: this.code });
        scrollList.setPosition(25, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (index >= 0) {
            this._scrollList.setScrollTopByIndex(index, 1000);
        }
    };
    AcDrinkTeaRewardPopViewTab2.prototype.requestCallback = function (event) {
        var rData = event.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var replacerewards = rData.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
    };
    AcDrinkTeaRewardPopViewTab2.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcDrinkTeaRewardPopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDrinkTeaRewardPopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcDrinkTeaRewardPopViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DRINKTEA_GETACHIEVEMENT, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcDrinkTeaRewardPopViewTab2;
}(AcCommonViewTab));
__reflect(AcDrinkTeaRewardPopViewTab2.prototype, "AcDrinkTeaRewardPopViewTab2");
//# sourceMappingURL=AcDrinkTeaRewardPopViewTab2.js.map