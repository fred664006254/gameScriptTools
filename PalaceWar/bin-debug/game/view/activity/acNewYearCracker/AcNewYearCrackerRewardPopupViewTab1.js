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
desc : 庭院奖励
*/
var AcNewYearCrackerRewardPopupViewTab1 = (function (_super) {
    __extends(AcNewYearCrackerRewardPopupViewTab1, _super);
    function AcNewYearCrackerRewardPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcNewYearCrackerRewardPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerRewardPopupViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 571;
        view.width = 530;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER, view.update, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD, view.update, view);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        // let vo = this.vo;
        // let objList = vo.getArr("recharge");
        // let arr = view.updateArr(objList);
        // let keys = Object.keys(objList);
        // keys.sort((a:string,b:string)=>{
        // 	return Number(a) - Number(b) ;
        // });
        var tmpRect = new egret.Rectangle(0, 0, 528, view.height - 20);
        var scrollList = ComponentManager.getScrollList(AcNewYearCrackerRewardItem, [], tmpRect, view.param.data.code);
        scrollList.bounces = false;
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 9]);
        view.addChild(scrollList);
        view.update();
    };
    AcNewYearCrackerRewardPopupViewTab1.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(view.cfg.recharge);
        view._scrollList.refreshData(arr, view.param.data.code);
    };
    AcNewYearCrackerRewardPopupViewTab1.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var rechareTotal = vo.getCrackerNum();
        var start = 0;
        var end = 6;
        for (var i = start; i <= end; i++) {
            arr[i].id = i + 1;
            if (vo.getJinduReward(i + 1)) {
                arr1.push(arr[i]);
            }
            else {
                if (rechareTotal >= arr[i].needItem) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcNewYearCrackerRewardPopupViewTab1.prototype.dispose = function () {
        var view = this;
        view._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER, view.update, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD, view.update, view);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        _super.prototype.dispose.call(this);
    };
    return AcNewYearCrackerRewardPopupViewTab1;
}(CommonViewTab));
__reflect(AcNewYearCrackerRewardPopupViewTab1.prototype, "AcNewYearCrackerRewardPopupViewTab1");
//# sourceMappingURL=AcNewYearCrackerRewardPopupViewTab1.js.map