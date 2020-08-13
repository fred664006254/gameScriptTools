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
var AcConquerMainLandDetailViewTab2 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab2, _super);
    function AcConquerMainLandDetailViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._tabHeight = 0;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab2.prototype.getTabbarTextArr = function () {
        return ["skinRankPopupViewTitle", "crossImacyOpenDesc3-1"];
    };
    AcConquerMainLandDetailViewTab2.prototype.initView = function () {
        var view = this;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var tabBg = BaseBitmap.create('popupview_bg3');
        tabBg.width = view.width - 20;
        this.addChild(tabBg);
        tabBg.setPosition(10, 3);
        view.initTabbarGroup();
        var tabArr = this.getTabbarTextArr();
        if (tabArr && tabArr.length > 0) {
            this.changeTab();
        }
        var line = BaseBitmap.create("commonview_border2");
        line.width = tabBg.width + 10;
        line.x = tabBg.x - 5;
        line.y = tabBg.y + 30;
        this.addChild(line);
    };
    AcConquerMainLandDetailViewTab2.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = 15;
        this.tabbarGroup.y = 4;
    };
    AcConquerMainLandDetailViewTab2.prototype.getTabbarGroupY = function () {
        return this.tabbarGroup.y + this.tabbarGroup.height - this.y + 10;
    };
    AcConquerMainLandDetailViewTab2.prototype.getTabbarName = function () {
        return ButtonConst.BTN_NEWTAB2;
    };
    AcConquerMainLandDetailViewTab2.prototype.rewardCallBack = function (evt) {
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
    AcConquerMainLandDetailViewTab2.prototype.update = function () {
        // let view = this;
        // if(!view.vo){
        // 	return;
        // }
        // let arr = view.updateArr(view.vo.getArr("recharge"));
        // view._scrollList.refreshData(arr,view.code);
    };
    AcConquerMainLandDetailViewTab2.prototype.dispose = function () {
        var view = this;
        view._tabHeight = 0;
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ARENACHARGE),this.rewardCallBack,this);
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab2;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab2.prototype, "AcConquerMainLandDetailViewTab2");
