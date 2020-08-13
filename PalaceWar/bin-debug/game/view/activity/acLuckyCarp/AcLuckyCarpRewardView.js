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
  * 锦鲤奖励预览
  * author 张朝阳
  * date 2019/2/11
  * @class AcLuckyCarpRewardView
  */
var AcLuckyCarpRewardView = (function (_super) {
    __extends(AcLuckyCarpRewardView, _super);
    function AcLuckyCarpRewardView() {
        return _super.call(this) || this;
    }
    AcLuckyCarpRewardView.prototype.initView = function () {
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var titlebg = BaseLoadBitmap.create("acluckycarptitilebg-" + this.code);
        titlebg.width = 640;
        titlebg.height = 92;
        var midbg = BaseLoadBitmap.create("dragonboattab1bg");
        midbg.width = 640;
        midbg.height = GameConfig.stageHeigth - titlebg.height + 10;
        midbg.setPosition(0, titlebg.x + titlebg.height - 10);
        this.addChildToContainer(midbg);
        this.addChildToContainer(titlebg);
        if (this.param.data.handleDate.totalCharge > cfg.rewardItemListCfg[cfg.rewardItemListCfg.length - 1].unlockValue) {
            this.param.data.handleDate.totalCharge = cfg.rewardItemListCfg[cfg.rewardItemListCfg.length - 1].unlockValue;
        }
        var rect = new egret.Rectangle(0, 0, 614, midbg.height - 37);
        var scrollList = ComponentManager.getScrollList(AcLuckyCarpRewardScrollItem, cfg.rewardItemListCfg, rect, {
            aid: this.aid,
            code: this.code,
            handleDate: this.param.data.handleDate
        });
        scrollList.setPosition(midbg.x + midbg.width / 2 - scrollList.width / 2, midbg.y + 17);
        this.addChildToContainer(scrollList);
    };
    AcLuckyCarpRewardView.prototype.getRuleInfo = function () {
        return "acLuckyCarpViewRule-" + this.code;
    };
    AcLuckyCarpRewardView.prototype.getTitleBgName = function () {
        return null;
    };
    AcLuckyCarpRewardView.prototype.getTitleStr = function () {
        return null;
    };
    AcLuckyCarpRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLuckyCarpRewardView;
}(CommonView));
__reflect(AcLuckyCarpRewardView.prototype, "AcLuckyCarpRewardView");
//# sourceMappingURL=AcLuckyCarpRewardView.js.map