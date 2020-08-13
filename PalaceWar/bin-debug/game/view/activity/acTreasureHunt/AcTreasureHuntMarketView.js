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
 * 集市奖励预览
 * author qianjun
 */
var AcTreasureHuntMarketView = (function (_super) {
    __extends(AcTreasureHuntMarketView, _super);
    function AcTreasureHuntMarketView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcTreasureHuntMarketView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntMarketView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntMarketView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntMarketView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntMarketView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcTreasureHuntMarketView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 544, 730);
        var arr = [];
        var mapId = view.param.data.mapId;
        var relative = view.cfg.map[mapId].relative;
        for (var i in view.cfg.specialPoint[relative].arr) {
            var unit = view.cfg.specialPoint[relative].arr[i];
            arr.push(unit);
        }
        var scrollList = ComponentManager.getScrollList(AcTreasureHuntMarketItem, arr, rect, view.code);
        scrollList.setPosition(this.viewBg.x + this.viewBg.width / 2 - scrollList.width / 2, 0);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
    };
    AcTreasureHuntMarketView.prototype.getShowHeight = function () {
        return 805;
    };
    AcTreasureHuntMarketView.prototype.getShowWidth = function () {
        return 560;
    };
    AcTreasureHuntMarketView.prototype.getTitleStr = function () {
        return "acTreasureRoundRewardTitle" + this.param.data.mapId + "-" + this.code;
    };
    AcTreasureHuntMarketView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntMarketView;
}(PopupView));
__reflect(AcTreasureHuntMarketView.prototype, "AcTreasureHuntMarketView");
//# sourceMappingURL=AcTreasureHuntMarketView.js.map