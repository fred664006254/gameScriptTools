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
 * date 2020.2.10
 * @class AcThreekingdomsOfWifeDetailPopupViewTab2
 */
var AcThreekingdomsOfWifeDetailPopupViewTab2 = (function (_super) {
    __extends(AcThreekingdomsOfWifeDetailPopupViewTab2, _super);
    function AcThreekingdomsOfWifeDetailPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE, this.requestCallback, this);
        var id = null;
        if (this.param && this.param.data) {
            App.LogUtil.log(" aid: " + this.param.data.aid);
            id = this.param.data.id;
        }
        var rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 680;
        rewardBg.setPosition(25, 60);
        this.addChild(rewardBg);
        var dataList = this.vo.getSortAchievementCfg();
        var rect = new egret.Rectangle(0, 0, 530, 670);
        var scrollList = ComponentManager.getScrollList(AcThreekingdomsOfWifeDetailTab2ScrollItem, dataList, rect, { aid: this.getAid(), code: this.getCode(), id: id });
        scrollList.setPosition(25, 65);
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
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.requestCallback = function (event) {
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
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.refreshView = function () {
        if (!this.vo) {
            return;
        }
        var dataList = this.vo.getSortAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.getAid(), code: this.getCode() });
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.getAid(), this.getCode());
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.getTypeCode = function () {
        if (this.getCode() == "2") {
            return "1";
        }
        if (this.getCode() == "4") {
            return "3";
        }
        return this.getCode();
    };
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.getAid = function () {
        return this.param.data.aid;
    };
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.getCode = function () {
        return this.param.data.code;
    };
    Object.defineProperty(AcThreekingdomsOfWifeDetailPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.getAid(), this.getCode());
        },
        enumerable: true,
        configurable: true
    });
    AcThreekingdomsOfWifeDetailPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTHREEKINGDOMSOFWIFE_ACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThreekingdomsOfWifeDetailPopupViewTab2;
}(CommonViewTab));
__reflect(AcThreekingdomsOfWifeDetailPopupViewTab2.prototype, "AcThreekingdomsOfWifeDetailPopupViewTab2");
//# sourceMappingURL=AcThreekingdomsOfWifeDeatilPopupViewTab2.js.map