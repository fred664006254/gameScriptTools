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
desc : 进度奖励
*/
var AcBeatXiongNuRewardViewTab2 = (function (_super) {
    __extends(AcBeatXiongNuRewardViewTab2, _super);
    function AcBeatXiongNuRewardViewTab2(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBeatXiongNuRewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuRewardViewTab2.prototype.getUiCode = function () {
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
    Object.defineProperty(AcBeatXiongNuRewardViewTab2.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab2.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuRewardViewTab2.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 675;
        view.width = 532;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_XIONGNU_PROGRESS), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 675;
        Bg.x = 26;
        Bg.y = 74;
        view.addChild(Bg);
        var vo = this.vo;
        var objList = vo.getArr("achievement"); //
        var arr = view.updateArr(objList);
        var tmpRect = new egret.Rectangle(0, 0, 520, Bg.height - 14);
        var scrollList = ComponentManager.getScrollList(AcBeatXiongNuProgressItem, arr, tmpRect, {
            id: view.param.data.id,
            code: view.code
        });
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 7]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        if (typeof view.param.data.id != 'undefined') {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == view.param.data.id) {
                    scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcBeatXiongNuRewardViewTab2.prototype.rewardCallBack = function (evt) {
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
            var cfg = view.cfg.achievement[view.vo.lastidx];
            var str = rewards;
            var rewardList = GameData.formatRewardItem(str);
            var pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            this.vo.lastidx = null;
        }
    };
    AcBeatXiongNuRewardViewTab2.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.vo.getArr("achievement"));
        ; //
        view._scrollList.refreshData(arr, {
            id: view.param.data.id,
            code: view.code
        });
    };
    AcBeatXiongNuRewardViewTab2.prototype.updateArr = function (arr) {
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
                if (rechareTotal >= arr[i].specialnum) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcBeatXiongNuRewardViewTab2.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_XIONGNU_PROGRESS), this.rewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcBeatXiongNuRewardViewTab2;
}(CommonViewTab));
__reflect(AcBeatXiongNuRewardViewTab2.prototype, "AcBeatXiongNuRewardViewTab2");
//# sourceMappingURL=AcBeatXiongNuRewardViewTab2.js.map