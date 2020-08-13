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
    author : shaoliang
    date : 2019.5.22
    desc : 粽叶飘香-端午节活动
*/
var AcDuanWuPopupViewTab1 = (function (_super) {
    __extends(AcDuanWuPopupViewTab1, _super);
    function AcDuanWuPopupViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDuanWuPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDuanWuPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDuanWuPopupViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMB), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 540;
        Bg.height = 660;
        Bg.x = 20;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var objList = vo.getArr("recharge");
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 520, view.height + 30);
        var scrollList = ComponentManager.getScrollList(AcDuanWuTab1Item, arr, tmpRect, [view.code, view.getUiCode()]);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.lefttop, scrollList, view, [30, 60]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcDuanWuPopupViewTab1.prototype.rewardCallBack = function (evt) {
        var view = this;
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = "1013_0_" + rData.zongZiGet + "_" + this.getUiCode() + "|" + rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDuanWuPopupViewTab1.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("recharge"));
        view._scrollList.refreshData(arr, [view.code, view.getUiCode()]);
    };
    AcDuanWuPopupViewTab1.prototype.updateArr = function (arr) {
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
    AcDuanWuPopupViewTab1.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETDUANWUITEMB), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDuanWuPopupViewTab1;
}(AcCommonViewTab));
__reflect(AcDuanWuPopupViewTab1.prototype, "AcDuanWuPopupViewTab1");
//# sourceMappingURL=AcDuanWuPopupViewTab1.js.map