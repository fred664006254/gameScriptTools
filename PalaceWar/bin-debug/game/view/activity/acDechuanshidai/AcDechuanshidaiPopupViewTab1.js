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
var AcDechuanshidaiPopupViewTab1 = (function (_super) {
    __extends(AcDechuanshidaiPopupViewTab1, _super);
    function AcDechuanshidaiPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDechuanshidaiPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiPopupViewTab1.prototype.getUiCode = function () {
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
    AcDechuanshidaiPopupViewTab1.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_RECHARGE), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 535;
        Bg.height = 650;
        Bg.x = 30;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var objList = vo.getArr("recharge"); //
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcDechuanshidaiChargeItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcDechuanshidaiPopupViewTab1.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDechuanshidaiPopupViewTab1.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("recharge"));
        ; //
        view._scrollList.refreshData(arr, view.code);
    };
    AcDechuanshidaiPopupViewTab1.prototype.updateArr = function (arr) {
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
    AcDechuanshidaiPopupViewTab1.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_RECHARGE), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcDechuanshidaiPopupViewTab1.prototype, "AcDechuanshidaiPopupViewTab1");
//# sourceMappingURL=AcDechuanshidaiPopupViewTab1.js.map