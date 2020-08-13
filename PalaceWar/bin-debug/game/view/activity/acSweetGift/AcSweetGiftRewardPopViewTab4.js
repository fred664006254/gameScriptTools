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
 * 活动奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopViewTab4
 */
var AcSweetGiftRewardPopViewTab4 = (function (_super) {
    __extends(AcSweetGiftRewardPopViewTab4, _super);
    function AcSweetGiftRewardPopViewTab4() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AcSweetGiftRewardPopViewTab4.prototype.initView = function () {
        this.height = 670;
        this.width = 520;
        var dataList = this.vo.getSortMoonCakeCfg();
        var rect = new egret.Rectangle(0, 0, 520, 670);
        var scrollList = ComponentManager.getScrollList(AcSweetGiftRewardTab4ScrollItem, dataList, rect, { aid: this.aid, code: this.code });
        scrollList.setPosition(30 + 1, 60);
        this.addChild(scrollList);
    };
    Object.defineProperty(AcSweetGiftRewardPopViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSweetGiftRewardPopViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcSweetGiftRewardPopViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSweetGiftRewardPopViewTab4;
}(AcCommonViewTab));
__reflect(AcSweetGiftRewardPopViewTab4.prototype, "AcSweetGiftRewardPopViewTab4");
//# sourceMappingURL=AcSweetGiftRewardPopViewTab4.js.map