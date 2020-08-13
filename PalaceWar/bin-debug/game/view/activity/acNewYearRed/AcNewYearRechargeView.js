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
/*
author : qinajun
desc : 累积充值
*/
var AcNewYearRedRechargeView = (function (_super) {
    __extends(AcNewYearRedRechargeView, _super);
    function AcNewYearRedRechargeView() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcNewYearRedRechargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearRedRechargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearRedRechargeView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearRedRechargeView.prototype.getResourceList = function () {
        var code = this.getUiCode();
        var arr = [
            "accarnivalview_tab_red", "progress5", "progress3_bg", "accarnivalview_tab_green", "collectflag",
        ];
        return _super.prototype.getResourceList.call(this).concat(arr);
    };
    AcNewYearRedRechargeView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
            case 3:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcNewYearRedRechargeView.prototype.getTitleStr = function () {
        return "acRechargeViewTitle";
    };
    Object.defineProperty(AcNewYearRedRechargeView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearRedRechargeView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearRedRechargeView.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWYEARRED_GEREWARD), this.rewardCallBack, this);
        var bg = BaseBitmap.create("public_9_bg22");
        bg.width = 640;
        bg.height = GameConfig.stageHeigth - 89;
        bg.setPosition(0, -15);
        this.addChildToContainer(bg);
        var bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
        var vo = this.vo;
        var objList = [];
        var idx = -1;
        for (var i in view.cfg.recharge) {
            objList.push(view.cfg.recharge[i]);
        }
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 600, bg2.height - 10);
        var scrollList = ComponentManager.getScrollList(AcNewYearRedChargeItem, arr, tmpRect, { code: view.code, id: view.param.data.id });
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg2, [0, 5]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        for (var i in arr) {
            if (arr[i].id == view.param.data.id) {
                idx = Number(i);
                break;
            }
        }
        if (idx > -1) {
            scrollList.setScrollTopByIndex(idx, 1000);
        }
    };
    AcNewYearRedRechargeView.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            var rData = evt.data.data.data;
            if (!rData) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            var rewards = rData.rewards;
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            }
            var str = rewards;
            var rewardList = GameData.formatRewardItem(str);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            this.vo.lastidx = null;
        }
    };
    AcNewYearRedRechargeView.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var objList = [];
        for (var i in view.cfg.recharge) {
            objList.push(view.cfg.recharge[i]);
        }
        var arr = view.updateArr(objList);
        view._scrollList.refreshData(arr, { code: view.code, id: view.param.data.id });
    };
    AcNewYearRedRechargeView.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = vo.getChargeNum();
        for (var i = 0; i < arr.length; i++) {
            if (vo.isGetRecharge(arr[i].id)) {
                arr1.push(arr[i]);
            }
            else {
                if (rechareTotal >= arr[i].needGem) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcNewYearRedRechargeView.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWYEARRED_GEREWARD), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcNewYearRedRechargeView;
}(CommonView));
__reflect(AcNewYearRedRechargeView.prototype, "AcNewYearRedRechargeView");
//# sourceMappingURL=AcNewYearRechargeView.js.map