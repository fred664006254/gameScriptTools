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
desc : 端午活动 累积充值
*/
var PlayerReturnViewTab1 = (function (_super) {
    __extends(PlayerReturnViewTab1, _super);
    function PlayerReturnViewTab1() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(PlayerReturnViewTab1.prototype, "cfg", {
        get: function () {
            return Config.PlayerreturnCfg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerReturnViewTab1.prototype, "api", {
        get: function () {
            return Api.playerReturnVoApi;
        },
        enumerable: true,
        configurable: true
    });
    PlayerReturnViewTab1.prototype.initView = function () {
        var view = this;
        var boatview = ViewController.getInstance().getView('PlayerReturnView');
        view.height = boatview.tabHeight;
        view.width = boatview.tabWidth;
        //提示
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("PlayerReturnTip1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, view, [0, 5]);
        view.addChild(tipTxt);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETSIGNREWARD), view.signCallBack, view);
        var api = view.api;
        var objList = api.getArr("signReward");
        var arr = view.updateArr(objList);
        // let keys = Object.keys(objList);
        // keys.sort((a:string,b:string)=>{
        // 	return Number(a) - Number(b) ;
        // });
        var tmpRect = new egret.Rectangle(0, 0, 608, view.height - 50);
        var scrollList = ComponentManager.getScrollList(PlayerReturnViewTab1ScrollItem, arr, tmpRect, '1');
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 0]);
        view.addChild(scrollList);
    };
    PlayerReturnViewTab1.prototype.update = function () {
        var view = this;
        var arr = view.updateArr(view.api.getArr("signReward"));
        view._scrollList.refreshData(arr, '1');
    };
    PlayerReturnViewTab1.prototype.updateArr = function (arr) {
        var view = this;
        var api = view.api;
        if (!api) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var curDay = api.getSignDay();
        for (var i = 0; i < arr.length; i++) {
            if (api.isGetSignAllReward(arr[i].key)) {
                arr1.push(arr[i]);
            }
            else {
                if (curDay >= arr[i].days) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    PlayerReturnViewTab1.prototype.signCallBack = function (evt) {
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
    PlayerReturnViewTab1.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RETURN_FRESH_ITEM, view.update, view); //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REBACK_GETSIGNREWARD), view.signCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return PlayerReturnViewTab1;
}(CommonViewTab));
__reflect(PlayerReturnViewTab1.prototype, "PlayerReturnViewTab1");
