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
*/
var AcConquerMainLandDetailViewTab1 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab1, _super);
    function AcConquerMainLandDetailViewTab1(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab1.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab1.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab1.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab1.prototype.initView = function () {
        var view = this;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
        var Bg = BaseBitmap.create("public_9_downbg");
        Bg.width = view.width;
        view.addChild(Bg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.vo.getThisCn("acConquerMainLandDetailDesc")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.width = 605;
        tipTxt.textAlign = egret.HorizontalAlign.LEFT;
        view.addChild(tipTxt);
        Bg.height = tipTxt.textHeight + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, Bg);
        var viewbg = BaseBitmap.create("public_9_bg22");
        viewbg.height = view.height - Bg.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, viewbg, Bg, [0, Bg.height]);
        view.addChild(viewbg);
        var listbg = BaseBitmap.create("public_9_bg32");
        listbg.width = 616;
        listbg.height = viewbg.height - 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, viewbg, [0, 20]);
        view.addChild(listbg);
        var tmpRect = new egret.Rectangle(0, 0, listbg.width - 10, listbg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandTimebuffItem, view.cfg.timeAndBuff, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, listbg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
    };
    AcConquerMainLandDetailViewTab1.prototype.rewardCallBack = function (evt) {
        var view = this;
        // let rData = evt.data.data.data;
        // if(!rData){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        //     return;
        // }
        // let rewards = rData.rewards;
        // let cfg = view.cfg.recharge[view.vo.lastidx];
        // let str = `1011_0_${cfg.specialItem}_${this.code}|` + rewards;
        // let rewardList =  GameData.formatRewardItem(str);
        // let pos = this.vo.lastpos;
        // App.CommonUtil.playRewardFlyAction(rewardList,pos);
        // this.vo.lastidx = null;
    };
    AcConquerMainLandDetailViewTab1.prototype.update = function () {
        // let view = this;
        // if(!view.vo){
        // 	return;
        // }
        // let arr = view.updateArr(view.vo.getArr("recharge"));
        // view._scrollList.refreshData(arr,view.code);
    };
    AcConquerMainLandDetailViewTab1.prototype.dispose = function () {
        var view = this;
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab1;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab1.prototype, "AcConquerMainLandDetailViewTab1");
//# sourceMappingURL=AcConquerMainLandDetailViewTab1.js.map