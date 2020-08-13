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
desc : 活动进度
*/
var AcLanternPopupViewTab2 = (function (_super) {
    __extends(AcLanternPopupViewTab2, _super);
    function AcLanternPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLanternPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupViewTab2.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLanternPopupViewTab2.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLanternPopupViewTab2.prototype.getUiCode = function () {
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
    AcLanternPopupViewTab2.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LANTERN_PROCESSREWARD), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 535;
        Bg.height = 650;
        Bg.x = 32;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var objList = vo.getArr("answerList"); //
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcLanternProcessItem, arr, tmpRect, {
            code: view.code,
            id: this.param.data.id
        });
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        if (this.param.data.id) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == this.param.data.id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcLanternPopupViewTab2.prototype.rewardCallBack = function (evt) {
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
    AcLanternPopupViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("answerList"));
        ; //
        view._scrollList.refreshData(arr, {
            code: view.code
        });
    };
    AcLanternPopupViewTab2.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var pray = vo.getProcessNum();
        for (var i = 0; i < arr.length; i++) {
            if (vo.isGetprocessReward(arr[i].id)) {
                arr1.push(arr[i]);
            }
            else {
                if (pray >= arr[i].ratetime) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcLanternPopupViewTab2.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LANTERN_PROCESSREWARD), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcLanternPopupViewTab2;
}(CommonViewTab));
__reflect(AcLanternPopupViewTab2.prototype, "AcLanternPopupViewTab2");
//# sourceMappingURL=AcLanternPopupViewTab2.js.map