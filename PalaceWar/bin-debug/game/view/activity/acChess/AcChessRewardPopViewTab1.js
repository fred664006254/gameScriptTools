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
 * 活动奖励
 * author weixiaozhe
 * date 2020.5.8
 * @class AcChessRewardPopViewTab1
 */
var AcChessRewardPopViewTab1 = (function (_super) {
    __extends(AcChessRewardPopViewTab1, _super);
    function AcChessRewardPopViewTab1() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcChessRewardPopViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHESS_GETRECHARGE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        var dataList = this.vo.getSortRechargeCfg();
        var id = "";
        var index = -1;
        if (AcChessView.IS_SHOW_RECHARGE) {
            AcChessView.IS_SHOW_RECHARGE = false;
            for (var i = 0; i < dataList.length; i++) {
                var strArr = dataList[i].getReward.split("|");
                for (var j = 0; j < strArr.length; j++) {
                    if (strArr[j].split("_")[1] == String(this.cfg.show2)) {
                        id = dataList[i].id;
                        index = i;
                        break;
                    }
                }
            }
        }
        var rect = new egret.Rectangle(0, 0, 530, 670);
        var scrollList = ComponentManager.getScrollList(AcChessRewardTab1ScrollItem, dataList, rect, { id: id, aid: this.aid, code: this.code });
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (index >= 0) {
            this._scrollList.setScrollTopByIndex(index, 1000);
        }
    };
    AcChessRewardPopViewTab1.prototype.requestCallback = function (event) {
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
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcChessRewardPopViewTab1.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcChessRewardPopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessRewardPopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChessRewardPopViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHESS_GETRECHARGE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcChessRewardPopViewTab1;
}(AcCommonViewTab));
__reflect(AcChessRewardPopViewTab1.prototype, "AcChessRewardPopViewTab1");
//# sourceMappingURL=AcChessRewardPopViewTab1.js.map