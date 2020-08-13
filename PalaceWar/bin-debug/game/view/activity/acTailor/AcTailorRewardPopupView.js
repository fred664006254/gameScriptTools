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
var AcTailorRewardPopupView = (function (_super) {
    __extends(AcTailorRewardPopupView, _super);
    function AcTailorRewardPopupView() {
        return _super.call(this) || this;
    }
    AcTailorRewardPopupView.prototype.initView = function () {
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var tailorCfg = Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        var tailorPool = tailorCfg.tailorPool;
        var rewardTab = [];
        for (var key in tailorPool) {
            rewardTab.push(tailorPool[key][0]);
        }
        var bottomBg = BaseBitmap.create("public_9_bg39");
        bottomBg.width = 520;
        bottomBg.height = 522;
        bottomBg.name = "bottomBg";
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = this.viewBg.y + 20;
        this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bottomBg.width, bottomBg.height - 10);
        var rewardNode = new BaseDisplayObjectContainer();
        var tmpX = 25;
        var scroStartY = 15;
        var rIcons = GameData.getRewardItemIcons(rewardTab.join("|"), true, true);
        for (var index = 0; index < rIcons.length; index++) {
            var element = rIcons[index];
            element.x = tmpX;
            element.y = scroStartY;
            tmpX += (element.width + 15);
            //换行处理
            if (tmpX >= bottomBg.x + bottomBg.width) {
                tmpX = 25;
                scroStartY += element.height + 15;
                element.x = tmpX;
                element.y = scroStartY;
                // addH += element.height + 15;
                tmpX += (element.width + 15);
            }
            rewardNode.addChild(element);
        }
        var scrollView = ComponentManager.getScrollView(rewardNode, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = bottomBg.x;
        scrollView.y = bottomBg.y + 5;
        this.addChildToContainer(scrollView);
    };
    AcTailorRewardPopupView.prototype.getShowHeight = function () {
        return 660;
    };
    AcTailorRewardPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcTailorRewardPopupView;
}(PopupView));
__reflect(AcTailorRewardPopupView.prototype, "AcTailorRewardPopupView");
//# sourceMappingURL=AcTailorRewardPopupView.js.map