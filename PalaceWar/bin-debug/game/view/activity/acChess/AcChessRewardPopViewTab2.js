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
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardTab1ScrollItem
 */
var AcChessRewardPopViewTab2 = (function (_super) {
    __extends(AcChessRewardPopViewTab2, _super);
    function AcChessRewardPopViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcChessRewardPopViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        var id = "";
        var index = -1;
        var dataList = this.vo.getSortAchievementCfg();
        if (AcChessView.IS_SHOW_PROCESS > 0) {
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id == AcChessView.IS_SHOW_PROCESS) {
                    id = String(dataList[i].id);
                    index = i;
                    break;
                }
            }
            AcChessView.IS_SHOW_PROCESS = 0;
        }
        var rect = new egret.Rectangle(0, 0, 530, 670);
        var scrollList = ComponentManager.getScrollList(AcChessRewardTab2ScrollItem, dataList, rect, { id: id, aid: this.aid, code: this.code });
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (index >= 0) {
            this._scrollList.setScrollTopByIndex(index, 1000);
        }
    };
    AcChessRewardPopViewTab2.prototype.requestCallback = function (event) {
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
    AcChessRewardPopViewTab2.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcChessRewardPopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessRewardPopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChessRewardPopViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETNUMREWARDS, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcChessRewardPopViewTab2;
}(AcCommonViewTab));
__reflect(AcChessRewardPopViewTab2.prototype, "AcChessRewardPopViewTab2");
//# sourceMappingURL=AcChessRewardPopViewTab2.js.map