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
var AcLocTombShopViewTab2 = (function (_super) {
    __extends(AcLocTombShopViewTab2, _super);
    function AcLocTombShopViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcLocTombShopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopViewTab2.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombShopViewTab2.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombShopViewTab2.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBSHOPBUY), view.collectHandlerCallBack, view);
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.vo.getArr('scoreMarket');
        var scrollList = ComponentManager.getScrollList(AcLocTombShopTab2ScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [22, 65]);
        view.addChild(scrollList);
        view._list = scrollList;
    };
    AcLocTombShopViewTab2.prototype.update = function (evt) {
        var view = this;
        if (view.vo.getClickType() == 'a') {
            return;
        }
        var index = view.vo.getClickIdx();
        var item = view._list.getItemByIndex(index);
        item.update();
    };
    AcLocTombShopViewTab2.prototype.collectHandlerCallBack = function (evt) {
        var view = this;
        var data = evt.data;
        if (data.data.ret < 0 || view.vo.getClickType() == 'a') {
            return;
        }
        var index = view.vo.getClickIdx();
        var rewardList = GameData.formatRewardItem(data.data.data.rewards);
        var item = view._list.getItemByIndex(index);
        var pos = item.localToGlobal(67, 195);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcLocTombShopViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBSHOPBUY), view.collectHandlerCallBack, view);
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombShopViewTab2;
}(CommonViewTab));
__reflect(AcLocTombShopViewTab2.prototype, "AcLocTombShopViewTab2");
//# sourceMappingURL=AcLocTombShopViewTab2.js.map