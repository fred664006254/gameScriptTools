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
 * date 2020.5.14
 * @class AcKnightRewardPopViewTab2
 */
var AcKnightRewardPopViewTab2 = (function (_super) {
    __extends(AcKnightRewardPopViewTab2, _super);
    function AcKnightRewardPopViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcKnightRewardPopViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KNIGHT_GETACHIEVE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 690;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);
        var id = "";
        var index = -1;
        var dataList = this.vo.getSortAchievementCfg();
        if (AcKnightView.IS_SHOW_PROCESS > 0) {
            var tempid = (this.vo.getAttackProcess())["id"];
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id == tempid) {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }
            AcKnightView.IS_SHOW_PROCESS = 0;
        }
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcKnightRewardTab2ScrollItem, dataList, rect, { id: id, aid: this.aid, code: this.code });
        scrollList.setPosition(25, 60);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (index >= 0) {
            this._scrollList.setScrollTopByIndex(index, 1000);
        }
    };
    AcKnightRewardPopViewTab2.prototype.requestCallback = function (event) {
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
    AcKnightRewardPopViewTab2.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcKnightRewardPopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKnightRewardPopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcKnightRewardPopViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KNIGHT_GETACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcKnightRewardPopViewTab2;
}(AcCommonViewTab));
__reflect(AcKnightRewardPopViewTab2.prototype, "AcKnightRewardPopViewTab2");
//# sourceMappingURL=AcKnightRewardPopViewTab2.js.map