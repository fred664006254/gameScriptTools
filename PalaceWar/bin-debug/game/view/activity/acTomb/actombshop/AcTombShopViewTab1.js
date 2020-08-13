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
var AcTombShopViewTab1 = (function (_super) {
    __extends(AcTombShopViewTab1, _super);
    function AcTombShopViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcTombShopViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombShopViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombShopViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombShopViewTab1.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTombShopViewTab1.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcTombShopViewTab1.prototype.getUicode = function () {
        var baseview = ViewController.getInstance().getView('AcTombView');
        return baseview.getUiCode();
    };
    AcTombShopViewTab1.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_TOMB_REFRESH, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY), view.collectHandlerCallBack, view);
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.vo.getArr('actMarket');
        var scrollList = ComponentManager.getScrollList(AcTombShopTab1ScrollItem, arr, tmpRect, view.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22 + 6, 65]);
        view.addChild(scrollList);
        view._list = scrollList;
    };
    AcTombShopViewTab1.prototype.update = function (evt) {
        var view = this;
        var index = view.vo.getClickIdx();
        if (view.vo.getClickType() == 'b') {
            return;
        }
        var item = view._list.getItemByIndex(index);
        item.update();
    };
    AcTombShopViewTab1.prototype.collectHandlerCallBack = function (evt) {
        var view = this;
        var code = view.getUicode();
        var data = evt.data;
        if (data.data.ret < 0 || view.vo.getClickType() == 'b') {
            return;
        }
        if (data.data.data.killAllBoss) {
            App.CommonUtil.showTip(LanguageManager.getlocal("loctombkillalltip-" + code));
            return;
        }
        var index = view.vo.getClickIdx();
        if (index == 0) {
            var addV = view.vo.getMyAdd();
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossShopEffectSuccess", [addV.toFixed(0)]));
            return;
        }
        else {
            var rewardList = GameData.formatRewardItem(data.data.data.rewards);
            var item = view._list.getItemByIndex(index);
            var pos = item.localToGlobal(390, 50);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
    };
    AcTombShopViewTab1.prototype.dispose = function () {
        var view = this;
        view._list = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_REFRESH, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_TOMBSHOPBUY), view.collectHandlerCallBack, view);
        _super.prototype.dispose.call(this);
    };
    return AcTombShopViewTab1;
}(CommonViewTab));
__reflect(AcTombShopViewTab1.prototype, "AcTombShopViewTab1");
//# sourceMappingURL=AcTombShopViewTab1.js.map