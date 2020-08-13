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
date : 2018.4.14
desc : 端午活动节日任务
*/
var PlayerReturnViewTab3 = (function (_super) {
    __extends(PlayerReturnViewTab3, _super);
    function PlayerReturnViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(PlayerReturnViewTab3.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnViewTab3.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETRECHARGEREWARD), view.rechargeCallBack, view);
        var boatview = ViewController.getInstance().getView('PlayerReturnView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        var api = view.api;
        var arr = api.getArr("rechargeReward");
        arr = view.updateArr(arr);
        var tmpRect = new egret.Rectangle(0, 0, 608, view.height);
        var scrollList = ComponentManager.getScrollList(PlayerReturnViewTab3ScrollItem, arr, tmpRect, '1');
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 0]);
        view.addChild(scrollList);
    };
    PlayerReturnViewTab3.prototype.update = function () {
        if (!this.api) {
            return;
        }
        var taskArr = this.api.getArr("rechargeReward");
        taskArr = this.updateArr(taskArr);
        this._taskArr = taskArr;
        this._scrollList.refreshData(taskArr, '1');
    };
    PlayerReturnViewTab3.prototype.updateArr = function (arr) {
        var view = this;
        var api = view.api;
        if (!api) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = api.getChargeNum();
        for (var i = 0; i < arr.length; i++) {
            if (api.isGetRecharge(arr[i].key)) {
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
    PlayerReturnViewTab3.prototype.rechargeCallBack = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.data.ret < 0) {
            return;
        }
        // if (data.data.data.myemperor){
        //     Api.emperorwarVoApi.setDataInfo(data.data.data.myemperor);
        // }
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var item = view._scrollList.getItemByIndex(view.api.getClickIdx());
        var pos = item.localToGlobal(520, 95);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    PlayerReturnViewTab3.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        this._taskArr = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETRECHARGEREWARD), view.rechargeCallBack, view);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnViewTab3;
}(CommonViewTab));
__reflect(PlayerReturnViewTab3.prototype, "PlayerReturnViewTab3");
