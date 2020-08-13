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
var AcRabbitComingRewardPopupViewTab3 = (function (_super) {
    __extends(AcRabbitComingRewardPopupViewTab3, _super);
    function AcRabbitComingRewardPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcRabbitComingRewardPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab3.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab3.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingRewardPopupViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcRabbitComingRewardPopupViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_ACHIEVE), this.rewardCallBack, this);
        view.height = 675;
        view.width = 535;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var obj = vo.getArr("achievement"); //
        var arr = view.updateArr(obj);
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcRabbitComingProgressItem, arr, tmpRect, {
            code: view.code,
            id: view.param.data.id
        });
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 3]);
        view.addChild(scrollList);
        view._scrollList = scrollList;
        if (typeof view.param.data.id != 'undefined') {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == view.param.data.id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcRabbitComingRewardPopupViewTab3.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = vo.getLuckyProgress();
        for (var i = 0; i < arr.length; i++) {
            if (vo.isGetJinduAward(arr[i].id)) {
                arr1.push(arr[i]);
            }
            else {
                if (rechareTotal >= arr[i].needNum) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcRabbitComingRewardPopupViewTab3.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            var rewards = rData.rewards;
            var str = rewards;
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
            var rewardList = GameData.formatRewardItem(str);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            this.vo.lastidx = null;
        }
    };
    AcRabbitComingRewardPopupViewTab3.prototype.update = function () {
        var view = this;
        var code = view.getUiCode();
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("achievement"));
        ; //
        view._scrollList.refreshData(arr, {
            code: view.code,
            id: view.param.data.id
        });
    };
    AcRabbitComingRewardPopupViewTab3.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RABBIT_ACHIEVE), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRewardPopupViewTab3;
}(CommonViewTab));
__reflect(AcRabbitComingRewardPopupViewTab3.prototype, "AcRabbitComingRewardPopupViewTab3");
//# sourceMappingURL=AcRabbitComingRewardPopupViewTab3.js.map