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
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryDetailPopupViewTab2
 */
var AcRecoveryDetailPopupViewTab2 = (function (_super) {
    __extends(AcRecoveryDetailPopupViewTab2, _super);
    function AcRecoveryDetailPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcRecoveryDetailPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE, this.requestCallback, this);
        var id = null;
        if (this.param && this.param.data) {
            App.LogUtil.log(" aid: " + this.param.data.aid);
            id = this.param.data.id;
        }
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 50);
        this.addChild(rewardBg);
        var dataList = this.vo.getSortAchievementCfg();
        var rect = new egret.Rectangle(0, 0, 530, 670);
        var scrollList = ComponentManager.getScrollList(AcRecoveryDetailTab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code, id: id });
        scrollList.setPosition(25, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (id) {
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id == Number(id)) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcRecoveryDetailPopupViewTab2.prototype.requestCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rData = event.data.data.data;
        var rewards = rData.rewards;
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcRecoveryDetailPopupViewTab2.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcRecoveryDetailPopupViewTab2.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcRecoveryDetailPopupViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRecoveryDetailPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcRecoveryDetailPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACRECOVERY_ACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcRecoveryDetailPopupViewTab2;
}(CommonViewTab));
__reflect(AcRecoveryDetailPopupViewTab2.prototype, "AcRecoveryDetailPopupViewTab2");
//# sourceMappingURL=AcRecoveryDetailPopupViewTab2.js.map