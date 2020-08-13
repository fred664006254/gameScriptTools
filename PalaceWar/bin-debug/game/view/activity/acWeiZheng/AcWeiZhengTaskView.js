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
 * desc:魏征活动任务
*/
var AcWeiZhengTaskView = (function (_super) {
    __extends(AcWeiZhengTaskView, _super);
    function AcWeiZhengTaskView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this._day = 1;
        _this._detailBg = null;
        _this._detailTxt = null;
        _this._leftBtn = null;
        _this._rightBtn = null;
        return _this;
    }
    Object.defineProperty(AcWeiZhengTaskView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengTaskView.prototype.getUiCode = function () {
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
    AcWeiZhengTaskView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([
            "progress5", "progress3_bg", "activity_charge_red", "collectflag", "chatview_arrow"
        ]).concat(arr);
    };
    AcWeiZhengTaskView.prototype.getTitleStr = function () {
        return "acWeiZhengdaytask-" + this.getUiCode();
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
    AcWeiZhengTaskView.prototype.initView = function () {
        var view = this;
        if (view.param.data.day) {
            view._day = view.param.data.day;
        }
        var code = view.getUiCode();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETTASK), this.rewardCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK), this.rewardCallBack, this);
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 520;
        Bg.height = 690;
        Bg.x = this.viewBg.width / 2 - Bg.width / 2;
        Bg.y = 25;
        view.addChildToContainer(Bg);
        var topbg = BaseBitmap.create("weizhengtaskdetailbg-" + code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 5]);
        view.addChildToContainer(topbg);
        var detailbg = BaseBitmap.create("weizhengtaskdetail" + view._day + "-" + code);
        var detailTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengdaytasktip" + view._day + "-" + code), 20, TextFieldConst.COLOR_WARN_YELLOW2);
        detailTxt.width = 335;
        detailbg.width = 450;
        var leftArrow = ComponentManager.getButton("chatview_arrow", "", function () {
            var day = view._day;
            --day;
            if (day > 0) {
                view._day = day;
                view.freshDay();
            }
        }, view);
        leftArrow.anchorOffsetX = leftArrow.width / 2;
        leftArrow.anchorOffsetY = leftArrow.height / 2;
        leftArrow.rotation = 90;
        leftArrow.x = 50 + GameData.popupviewOffsetX;
        leftArrow.y = 110;
        view.addChildToContainer(leftArrow);
        view._leftBtn = leftArrow;
        var rightArrow = ComponentManager.getButton("chatview_arrow", "", function () {
            var day = view._day;
            ++day;
            if (day < 4) {
                view._day = day;
                view.freshDay();
            }
        }, view);
        rightArrow.anchorOffsetX = rightArrow.width / 2;
        rightArrow.anchorOffsetY = rightArrow.height / 2;
        rightArrow.rotation = -90;
        rightArrow.x = 530 + GameData.popupviewOffsetX;
        rightArrow.y = 110;
        view.addChildToContainer(rightArrow);
        view._rightBtn = rightArrow;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, detailbg, topbg);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, detailTxt, detailbg, [80, 0]);
        view.addChildToContainer(detailbg);
        view.addChildToContainer(detailTxt);
        view._detailBg = detailbg;
        view._detailTxt = detailTxt;
        var tmpRect = new egret.Rectangle(0, 0, 510, Bg.height - 10 - topbg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcWeiZhengTaskItem, [], tmpRect, view.code);
        view._scrollList = scrollList;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0, topbg.height + 10]);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWeiZhengTip3-" + code), 18, TextFieldConst.COLOR_BLACK);
        view.addChildToContainer(tipTxt);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0, Bg.height + 10]);
        view.freshDay();
    };
    AcWeiZhengTaskView.prototype.freshDay = function () {
        var view = this;
        var code = view.getUiCode();
        view._detailBg.setRes("weizhengtaskdetail" + view._day + "-" + code);
        view._detailTxt.text = LanguageManager.getlocal("acWeiZhengdaytasktip" + view._day + "-" + code);
        view._detailBg.width = 450;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, view._detailTxt, view._detailBg, [80, 0]);
        view._leftBtn.visible = view._day > 1;
        view._rightBtn.visible = view._day < 3;
        view.freshView();
    };
    AcWeiZhengTaskView.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i in arr) {
            var canLq = view.vo.canTaskLq(arr[i].questType, view._day);
            arr[i].day = view._day;
            arr[i].key = i;
            if (vo.getTaskLq(arr[i].questType, view._day)) {
                arr1.push(arr[i]);
            }
            else {
                if (canLq) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcWeiZhengTaskView.prototype.getShowWidth = function () {
        return 580;
    };
    AcWeiZhengTaskView.prototype.getShowHeight = function () {
        return 830;
    };
    AcWeiZhengTaskView.prototype.freshView = function () {
        var view = this;
        var objList = Api.chatVoApi.arr_clone(view.cfg.task);
        var arr = view.updateArr(objList[view._day]);
        view._scrollList.refreshData(arr, view.code);
        App.CommonUtil.removeIconFromBDOC(view._leftBtn);
        for (var i = 1; i < view._day; ++i) {
            if (view.vo.canDayRewardLq(i)) {
                App.CommonUtil.addIconToBDOC(view._leftBtn);
                var reddot = view._leftBtn.getChildByName("reddot");
                if (reddot) {
                    reddot.setScale(0.8);
                    reddot.x = -12;
                    reddot.y = -6;
                }
                break;
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._leftBtn);
            }
        }
        App.CommonUtil.removeIconFromBDOC(view._rightBtn);
        var day = view._day + 1;
        for (var i = day; i < 3; ++i) {
            if (view.vo.canDayRewardLq(i)) {
                App.CommonUtil.addIconToBDOC(view._rightBtn);
                var reddot = view._rightBtn.getChildByName("reddot");
                if (reddot) {
                    reddot.setScale(0.8);
                    reddot.x = 12;
                    reddot.y = 6;
                }
                break;
            }
            else {
                App.CommonUtil.removeIconFromBDOC(view._rightBtn);
            }
        }
    };
    AcWeiZhengTaskView.prototype.rewardCallBack = function (evt) {
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
    AcWeiZhengTaskView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETTASK), this.rewardCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK), this.rewardCallBack, this);
        view._scrollList = null;
        view._day = 1;
        view._detailBg = null;
        view._detailTxt = null;
        view._leftBtn = null;
        view._rightBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeiZhengTaskView;
}(PopupView));
__reflect(AcWeiZhengTaskView.prototype, "AcWeiZhengTaskView");
//# sourceMappingURL=AcWeiZhengTaskView.js.map