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
 * 充值奖励
 * author ycg
 * date 2020.2.10
 * @class AcThreekingdomsOfWifeDetailPopupViewTab1
 */
var AcThreekingdomsOfWifeDetailPopupViewTab1 = (function (_super) {
    __extends(AcThreekingdomsOfWifeDetailPopupViewTab1, _super);
    function AcThreekingdomsOfWifeDetailPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcThreekingdomsOfWifeDetailPopupViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        var dataList = this.vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(0, 0, 530, 670);
        var scrollList = ComponentManager.getScrollList(AcThreekingdomsOfWifeDetailTab1ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(25, 65);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcThreekingdomsOfWifeDetailPopupViewTab1.prototype.requestCallback = function (event) {
        if (!event.data.ret) {
            this.refreshView();
            return;
        }
        var rData = event.data.data.data;
        var rewards = rData.rewards;
        if (rData.specialGift) {
            rewards = "1040_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    };
    AcThreekingdomsOfWifeDetailPopupViewTab1.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortRechargeCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupViewTab1.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        if (this.code == "4") {
            return "3";
        }
        return this.code;
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_CHARGE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsOfWifeDetailPopupViewTab1;
}(CommonViewTab));
__reflect(AcThreekingdomsOfWifeDetailPopupViewTab1.prototype, "AcThreekingdomsOfWifeDetailPopupViewTab1");
//# sourceMappingURL=AcThreekingdomsOfWifeDeatilPopupViewTab1.js.map