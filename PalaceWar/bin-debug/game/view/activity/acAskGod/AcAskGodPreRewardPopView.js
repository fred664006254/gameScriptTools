var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 奖池
 * author wxz
 * date 2020.6.15
 * @class AcAskGodPreRewardPopView
 */
var AcAskGodPreRewardPopView = /** @class */ (function (_super) {
    __extends(AcAskGodPreRewardPopView, _super);
    function AcAskGodPreRewardPopView(data) {
        return _super.call(this) || this;
    }
    AcAskGodPreRewardPopView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 690;
        bg.setPosition(55, 10);
        this.addChildToContainer(bg);
        var topBg = BaseBitmap.create("acaskgod_pre-" + this.getTypeCode());
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, 14);
        this.addChildToContainer(topBg);
        App.LogUtil.log("rewardarr: " + this.cfg.getPoolRewards());
        var rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, true);
        var rewardScale = 1;
        var scrolNode = new BaseDisplayObjectContainer();
        scrolNode.width = bg.width - 20;
        var rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - topBg.height);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = bg.x + 7;
        scrollview.y = topBg.y + topBg.height + 5;
        scrollview.horizontalScrollPolicy = 'off';
        scrollview.verticalScrollPolicy = 'off';
        this.addChildToContainer(scrollview);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            icon.setScale(rewardScale);
            var idx = Number(i);
            icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
            icon.y = 5 + Math.floor(idx / 4) * (icon.width * icon.scaleX + 12);
            scrolNode.addChild(icon);
        }
    };
    Object.defineProperty(AcAskGodPreRewardPopView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodPreRewardPopView.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcAskGodPreRewardPopView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodPreRewardPopView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAskGodPreRewardPopView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAskGodPreRewardPopView.prototype.getShowHeight = function () {
        return 800;
    };
    AcAskGodPreRewardPopView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.container.x = 0;
    };
    AcAskGodPreRewardPopView.prototype.getTitleStr = function () {
        return "acAskGodPreAwardTitle-" + this.getTypeCode();
    };
    AcAskGodPreRewardPopView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcAskGodPreRewardPopView;
}(PopupView));
//# sourceMappingURL=AcAskGodPreRewardPopView.js.map