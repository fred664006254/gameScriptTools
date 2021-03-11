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
//
var AcCrossServerWipeBossShopViewTab2 = (function (_super) {
    __extends(AcCrossServerWipeBossShopViewTab2, _super);
    function AcCrossServerWipeBossShopViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossShopViewTab2.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossShopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossShopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossShopViewTab2.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 610;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY), view.collectHandlerCallBack, view);
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        //App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
        // let Bg = BaseBitmap.create("public_9_bg4");
        // Bg.width = 628;
        // Bg.height = 526;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
        // view.addChild(Bg);
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.vo.getArr('scoreMarket');
        var scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossShopTab2ScrollItem, arr, tmpRect, view.param.data.code);
        //32.5
        //56.5
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46.5, 65]);
        view.addChild(scrollList);
        view._list = scrollList;
    };
    AcCrossServerWipeBossShopViewTab2.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerWipeBossShopViewTab2.prototype.rewardClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        // else{
        // 	if(view.api.getIsWinner()){
        // 		NetManager.request(NetRequestConst.REQUST_SERVANTPK_GETPREWARD,{
        // 			activeId:view.api.vo.aidAndCode,
        // 		})
        // 	}
        // 	else{
        // 		App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip7"));
        // 		return;
        // 	}
        // }
    };
    AcCrossServerWipeBossShopViewTab2.prototype.update = function (evt) {
        var view = this;
        if (view.api.getClickType() == 'a') {
            return;
        }
        // let arr = view.vo.getArr('scoreMarket');
        // view._list.refreshData(arr, view.param.data.code);
        var index = view.api.getClickIdx();
        var item = view._list.getItemByIndex(index);
        item.update();
    };
    AcCrossServerWipeBossShopViewTab2.prototype.collectHandlerCallBack = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.data.ret < 0 || view.api.getClickType() == 'a') {
            return;
        }
        var index = view.api.getClickIdx();
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var item = view._list.getItemByIndex(index);
        var pos = item.localToGlobal(67, 195);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcCrossServerWipeBossShopViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY), view.collectHandlerCallBack, view);
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossShopViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerWipeBossShopViewTab2.prototype, "AcCrossServerWipeBossShopViewTab2");