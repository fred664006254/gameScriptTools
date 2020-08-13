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
 * author:qianjun
 * desc:魏征活动充值
*/
var AcWeiZhengRechargeView = (function (_super) {
    __extends(AcWeiZhengRechargeView, _super);
    function AcWeiZhengRechargeView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcWeiZhengRechargeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengRechargeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengRechargeView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengRechargeView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengRechargeView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengRechargeView.prototype.getUiCode = function () {
        var code = "";
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
    AcWeiZhengRechargeView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "accarnivalview_tab_red", "accarnivalview_tab_green", "collectflag",
            "activity_charge_red", "shopview_corner", "shopview_line"
        ]).concat(arr);
    };
    AcWeiZhengRechargeView.prototype.getTitleStr = function () {
        return "acArenaTab1-1";
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	let view = this;
    // 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LABORRANK,requestData:{
    // 		activeId : view.vo.aidAndCode,
    // 	}};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	view.vo.setRankInfo(data.data.data);
    // }
    AcWeiZhengRechargeView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETRECHARGE), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 520;
        Bg.height = 690;
        Bg.x = 30 + GameData.popupviewOffsetX - 6;
        Bg.y = 25;
        view.addChildToContainer(Bg);
        var vo = this.vo;
        var objList = view.cfg.recharge;
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 510, Bg.height - 15);
        var scrollList = ComponentManager.getScrollList(AcWeiZhengRechargeItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 5]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        view.freshView();
    };
    AcWeiZhengRechargeView.prototype.updateArr = function (arr) {
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
            var id = Number(i + 1);
            arr[i].id = id;
            if (vo.getChargeLq(id)) {
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
    AcWeiZhengRechargeView.prototype.getShowWidth = function () {
        return 580;
    };
    AcWeiZhengRechargeView.prototype.getShowHeight = function () {
        return 820;
    };
    AcWeiZhengRechargeView.prototype.freshView = function () {
        var view = this;
        var arr = view.updateArr(view.cfg.recharge);
        view._scrollList.refreshData(arr, view.code);
    };
    AcWeiZhengRechargeView.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = -1;
        this.vo.lastpos = null;
    };
    AcWeiZhengRechargeView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETRECHARGE), this.rewardCallBack, this);
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeiZhengRechargeView;
}(PopupView));
__reflect(AcWeiZhengRechargeView.prototype, "AcWeiZhengRechargeView");
//# sourceMappingURL=AcWeiZhengRechargeView.js.map