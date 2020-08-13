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
 *  充值奖励
 * author jiangliuyang
 * date 2018/10/17
 * @class AcLotteryPopupView
 */
var AcLotteryRewardPopupView = (function (_super) {
    __extends(AcLotteryRewardPopupView, _super);
    function AcLotteryRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    AcLotteryRewardPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.x = GameData.popupviewOffsetX;
        this.addChildToContainer(this._nodeContainer);
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 532;
        bg1.height = 700;
        bg1.x = 18;
        bg1.y = 10;
        this._nodeContainer.addChild(bg1);
        var keys = this.cfg.recharge;
        var tmpRect = new egret.Rectangle(0, 0, 522, 690);
        this._scrollList = ComponentManager.getScrollList(AcLotteryScrollItem, keys, tmpRect, this.param.data.code);
        this._scrollList.setPosition(23, 15);
        this._nodeContainer.addChild(this._scrollList);
    };
    AcLotteryRewardPopupView.prototype.getShowHeight = function () {
        return 790;
    };
    AcLotteryRewardPopupView.prototype.getTitleStr = function () {
        return "inviteViewTab3Title";
    };
    Object.defineProperty(AcLotteryRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcLotteryRewardPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcLotteryRewardPopupView;
}(PopupView));
__reflect(AcLotteryRewardPopupView.prototype, "AcLotteryRewardPopupView");
//# sourceMappingURL=AcLotteryRewardPopupView.js.map