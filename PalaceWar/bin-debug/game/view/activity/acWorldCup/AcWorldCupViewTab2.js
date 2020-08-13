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
desc : 世界杯竞猜活动
*/
var AcWorldCupViewTab2 = (function (_super) {
    __extends(AcWorldCupViewTab2, _super);
    function AcWorldCupViewTab2() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcWorldCupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupViewTab2.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
        // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
        // 	activeId : view.acTivityId
        // });
        var mainview = ViewController.getInstance().getView('AcWorldCupView');
        view.height = mainview.tabHeight;
        view.width = mainview.tabWidth;
        var tmpRect = new egret.Rectangle(0, 0, 606, view.height - 155);
        var scrollList = ComponentManager.getScrollList(AcWorldCupTab2Item, [], tmpRect, this.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, 10]);
        view.addChild(scrollList);
        view._list = scrollList;
        view.fresh_day();
    };
    AcWorldCupViewTab2.prototype.refreshWhenSwitchBack = function () {
        var view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
            activeId: view.acTivityId
        });
    };
    AcWorldCupViewTab2.prototype.fresh_day = function () {
        var view = this;
        view._list.refreshData(view.vo.getGuessInfo(), view.code);
        if (view.vo.getGuessInfo().length == 0) {
            view._list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        }
    };
    AcWorldCupViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupViewTab2;
}(AcCommonViewTab));
__reflect(AcWorldCupViewTab2.prototype, "AcWorldCupViewTab2");
//# sourceMappingURL=AcWorldCupViewTab2.js.map