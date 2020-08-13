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
 * desc:活动弹窗
*/
var AcDestroySameRewardPopupView = (function (_super) {
    __extends(AcDestroySameRewardPopupView, _super);
    function AcDestroySameRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcDestroySameRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDestroySameRewardPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDestroySameRewardPopupView.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = "4";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDestroySameRewardPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        if (App.CommonUtil.getResByCode("destroysametopbg", this.getUiCode())) {
            arr.push("destroysametopbg-" + this.getUiCode());
        }
        return _super.prototype.getResourceList.call(this).concat([
            "destroysametopbg", "activity_charge_red", "collectflag"
        ]).concat(arr);
    };
    AcDestroySameRewardPopupView.prototype.getTitleStr = function () {
        return "achuntingRewardTitle";
    };
    // protected getRequestData():{requestType:string,requestData:any}
    // {	
    // 	// let view = this;
    // 	// return {requestType:NetRequestConst.REQUEST_ACTIVITY_ARENARANK,requestData:{
    // 	// 	activeId : view.vo.aidAndCode,
    // 	// }};
    // }
    // protected receiveData(data:{ret:boolean,data:any}):void
    // {
    // 	let view = this;
    // 	//view.vo.setRankInfo(data.data.data);
    // }
    AcDestroySameRewardPopupView.prototype.initView = function () {
        var view = this;
        var code = view.getUiCode();
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 700;
        Bg.x = 25 + GameData.popupviewOffsetX;
        Bg.y = 10;
        view.addChildToContainer(Bg);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_REWARD), this.rewardCallBack, this);
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("destroysametopbg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 5]);
        view.addChildToContainer(topbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip1", this.code, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 500;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0, 8]);
        tipTxt.lineSpacing = 5;
        view.addChildToContainer(tipTxt);
        //
        var vo = this.vo;
        var taskArr = view.getArr();
        var tmpRect = new egret.Rectangle(0, 0, 510, Bg.height - 110);
        var scrollList = ComponentManager.getScrollList(AcDestroySameRoundRewardItem, taskArr, tmpRect, view.code);
        view._list = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0, topbg.height + 5]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
    };
    AcDestroySameRewardPopupView.prototype.getArr = function () {
        var view = this;
        var arr = Object.keys(view.cfg.bossList);
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var curround = view.vo.getCurround();
        for (var i in arr) {
            var round = Number(arr[i]);
            if (view.vo.isGetRoundReward(round)) {
                arr1.push(arr[i]);
            }
            else {
                if (curround >= round) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcDestroySameRewardPopupView.prototype.getShowWidth = function () {
        return 580;
    };
    AcDestroySameRewardPopupView.prototype.freshView = function () {
        var view = this;
        var taskArr = view.getArr();
        view._list.refreshData(taskArr, this.code);
    };
    AcDestroySameRewardPopupView.prototype.rewardCallBack = function (evt) {
        var view = this;
        var code = view.getUiCode();
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("AcDestroySameTip3", this.code, code)));
            return;
        }
        var rewards = rData.rewards;
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDestroySameRewardPopupView.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DESTROYSAME_REWARD), this.rewardCallBack, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcDestroySameRewardPopupView;
}(PopupView));
__reflect(AcDestroySameRewardPopupView.prototype, "AcDestroySameRewardPopupView");
//# sourceMappingURL=AcDestroySameRewardPopupView.js.map