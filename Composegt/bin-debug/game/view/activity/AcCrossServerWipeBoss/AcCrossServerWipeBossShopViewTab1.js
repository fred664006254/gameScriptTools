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
var AcCrossServerWipeBossShopViewTab1 = (function (_super) {
    __extends(AcCrossServerWipeBossShopViewTab1, _super);
    function AcCrossServerWipeBossShopViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossShopViewTab1.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossShopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossShopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossShopViewTab1.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 610;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY), view.collectHandlerCallBack, view);
        // let Bg = BaseBitmap.create("public_9_bg4");
        // Bg.width = 628;
        // Bg.height = 526;
        // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, Bg, view);
        // view.addChild(Bg);
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.vo.getArr('actMarket');
        var scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossShopTab1ScrollItem, arr, tmpRect, view.param.data.code);
        //110.5 65
        //56.5 
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46, 125]);
        view.addChild(scrollList);
        view._list = scrollList;
    };
    AcCrossServerWipeBossShopViewTab1.prototype.rankClick = function () {
        var view = this;
        // if(view.api.getCurpeirod() < 8){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip6"));
        // 	return;
        // }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
        //
    };
    AcCrossServerWipeBossShopViewTab1.prototype.rewardClick = function () {
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
    AcCrossServerWipeBossShopViewTab1.prototype.update = function (evt) {
        var view = this;
        var index = view.api.getClickIdx();
        if (view.api.getClickType() == 'b') {
            return;
        }
        if (index == 0) {
            var item = view._list.getItemByIndex(index);
            item.update();
            // let arr = view.vo.getArr('actMarket');
            // view._list.refreshData(arr, view.param.data.code);
        }
    };
    AcCrossServerWipeBossShopViewTab1.prototype.collectHandlerCallBack = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.data.ret < 0 || view.api.getClickType() == 'b') {
            return;
        }
        var index = view.api.getClickIdx();
        if (index == 0) {
            var addV = view.vo.getMyAdd();
            App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossShopEffectSuccess", [addV.toFixed(0)]));
            return;
        }
        else {
            var rewardList = GameData.formatRewardItem(data.data.data.rewards);
            var item = view._list.getItemByIndex(index);
            var pos = item.localToGlobal(390, 50);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
    };
    AcCrossServerWipeBossShopViewTab1.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSSSERVERWIPEBOSS_REFRESH, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WIPEBOSS_SHOPBUY), view.collectHandlerCallBack, view);
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK,view.update,view);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GETPREWARD),view.getrewardCallback,view);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossShopViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerWipeBossShopViewTab1.prototype, "AcCrossServerWipeBossShopViewTab1");
