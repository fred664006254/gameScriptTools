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
 * 携美同游充值奖励
 * author yangchengguo
 * date 2019.11.4
 * @class  AcTravelWithBeautyRechargePopupView
 */
var AcTravelWithBeautyRechargePopupView = (function (_super) {
    __extends(AcTravelWithBeautyRechargePopupView, _super);
    function AcTravelWithBeautyRechargePopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    AcTravelWithBeautyRechargePopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE, this.getRechargeCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var id = this.param.data.id;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(aid, code);
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 720;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var processCfg = vo.getSortRechargeCfg();
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcTravelWithBeautyRechargeScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        this.addChildToContainer(this._scrollList);
        if (id) {
            for (var i = 0; i < processCfg.length; i++) {
                if (processCfg[i].id == id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    /**刷新item */
    AcTravelWithBeautyRechargePopupView.prototype.getRechargeCallback = function (event) {
        if (!event.data.ret) {
            return;
        }
        var rData = event.data.data.data;
        if (rData) {
            var rewards = rData.rewards;
            var replacerewards = event.data.data.data.replacerewards;
            if (rData.specialGift) {
                rewards = "1033_0_" + rData.specialGift + "_" + this.getTypeCode() + "|" + rewards;
            }
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            var data = vo.getSortRechargeCfg();
            this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid });
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcTravelWithBeautyRechargePopupView.prototype.refreshView = function () {
        if (!this._scrollList) {
            return;
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        var data = vo.getSortRechargeCfg();
        this._scrollList.refreshData(data, { id: null, code: this.param.data.code, aid: this.param.data.aid });
    };
    AcTravelWithBeautyRechargePopupView.prototype.getTitleStr = function () {
        var code = this.param.data.code;
        if (this.param.data.code == "2") {
            code = "1";
        }
        else if (this.param.data.code == "4") {
            code = "3";
        }
        return "acTravelWithBeautyRechargeTitle-" + code;
    };
    AcTravelWithBeautyRechargePopupView.prototype.getTypeCode = function () {
        if (this.param.data.code == "2") {
            return "1";
        }
        else if (this.param.data.code == "4") {
            return "3";
        }
        return this.param.data.code;
    };
    AcTravelWithBeautyRechargePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress5",
            "accarnivalview_tab_red", "accarnivalview_tab_green",
        ]);
    };
    AcTravelWithBeautyRechargePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_TRAVELWITHBEAUTY_RECHARGE, this.getRechargeCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcTravelWithBeautyRechargePopupView;
}(PopupView));
__reflect(AcTravelWithBeautyRechargePopupView.prototype, "AcTravelWithBeautyRechargePopupView");
//# sourceMappingURL=AcTravelWithBeautyRechargePopupView.js.map