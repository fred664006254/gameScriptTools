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
var AcCrossServerWipeBossAllianceInfoViewTab1 = (function (_super) {
    __extends(AcCrossServerWipeBossAllianceInfoViewTab1, _super);
    function AcCrossServerWipeBossAllianceInfoViewTab1(data) {
        var _this = _super.call(this) || this;
        _this._sortBtn = null;
        _this._list = null;
        _this._sortType = 1;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoViewTab1.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossAllianceInfoViewTab1.prototype.initView = function () {
        var view = this;
        view.width = 526;
        view.height = 526;
        var tmpRect = new egret.Rectangle(0, 0, 505, view.height - 20);
        var arr = view.api.getWipeBossAllianceInfo(1);
        arr.sort(function (a, b) {
            var cfga = view.cfg.getBossNpcItemCfgById(a.bosstype);
            var cfgb = view.cfg.getBossNpcItemCfgById(b.bosstype);
            if (cfga.type == cfgb.type) {
                return cfgb.id - cfga.id;
            }
            else {
                return cfga.type - cfgb.type;
            }
        });
        var scrollList = ComponentManager.getScrollList(AcCrossServerWipeBossAllianceInfoScrollItem, arr, tmpRect, view.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [46, 65]);
        view.addChild(scrollList);
        view._list = scrollList;
        scrollList.setEmptyTip(LanguageManager.getlocal('acPunishNoData'));
        var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "accrossserverwipeBossAllInfoSort1", view.sortHandle, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, scrollList, [0, scrollList.height + 75]);
        view.addChild(btn);
        view._sortType = 1;
        view._sortBtn = btn;
    };
    AcCrossServerWipeBossAllianceInfoViewTab1.prototype.sortHandle = function () {
        var view = this;
        var list = view._list;
        var arr = list._dataList;
        arr.sort(function (a, b) {
            return view._sortType == 1 ? (a.bosstype - b.bosstype) : (b.bosstype - a.bosstype);
        });
        list.refreshData(arr, view.param.data.code);
        view._sortType = 3 - view._sortType;
        view._sortBtn.setText("accrossserverwipeBossAllInfoSort" + view._sortType);
    };
    AcCrossServerWipeBossAllianceInfoViewTab1.prototype.rankClick = function () {
        var view = this;
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTRANKVIEW);
    };
    AcCrossServerWipeBossAllianceInfoViewTab1.prototype.getrewardCallback = function (evt) {
        var view = this;
        var rdata = evt.data.data;
        if (rdata.ret != 0) {
            return;
        }
        var rewards = rdata.data.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
    };
    AcCrossServerWipeBossAllianceInfoViewTab1.prototype.dispose = function () {
        var view = this;
        view._list = null;
        view._sortBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossAllianceInfoViewTab1;
}(CommonViewTab));
__reflect(AcCrossServerWipeBossAllianceInfoViewTab1.prototype, "AcCrossServerWipeBossAllianceInfoViewTab1");
