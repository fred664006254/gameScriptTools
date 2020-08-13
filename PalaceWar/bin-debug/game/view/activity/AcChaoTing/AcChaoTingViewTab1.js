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
 * 排行奖励
 * author ycg
 * date 2020.3.24
 */
var AcChaoTingViewTab1 = (function (_super) {
    __extends(AcChaoTingViewTab1, _super);
    function AcChaoTingViewTab1() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcChaoTingViewTab1.prototype.initView = function () {
        var baseView = ViewController.getInstance().getView("AcChaoTingView");
        var showHeight = baseView.getListShowHeight();
        var data = this.cfg.getRankRewardCfg();
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, showHeight - 10);
        var scrollList = ComponentManager.getScrollList(AcChaoTingViewTabScrollItem1, data, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(GameConfig.stageWidth / 2 - scrollList.width / 2, 5);
        this.addChild(scrollList);
    };
    AcChaoTingViewTab1.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcChaoTingViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChaoTingViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcChaoTingViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChaoTingViewTab1;
}(AcCommonViewTab));
__reflect(AcChaoTingViewTab1.prototype, "AcChaoTingViewTab1");
//# sourceMappingURL=AcChaoTingViewTab1.js.map