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
 * 奖池
 * author wxz
 * date 2020.5.18
 * @class AcDrinkTeaRewardPopViewTab3
 */
var AcDrinkTeaRewardPopViewTab3 = (function (_super) {
    __extends(AcDrinkTeaRewardPopViewTab3, _super);
    function AcDrinkTeaRewardPopViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcDrinkTeaRewardPopViewTab3.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 690;
        bg.setPosition(25, 55);
        this.addChild(bg);
        var topBgStr = ResourceManager.hasRes("drinkteatab3-" + this.getTypeCode()) ? "drinkteatab3-" + this.getTypeCode() : "drinkteatab3-1";
        var topBg = BaseBitmap.create(topBgStr);
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y);
        this.addChild(topBg);
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
        this.addChild(scrollview);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            icon.setScale(rewardScale);
            var idx = Number(i);
            icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
            icon.y = 5 + Math.floor(idx / 4) * (icon.width * icon.scaleX + 12);
            scrolNode.addChild(icon);
        }
    };
    Object.defineProperty(AcDrinkTeaRewardPopViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcDrinkTeaRewardPopViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcDrinkTeaRewardPopViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDrinkTeaRewardPopViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDrinkTeaRewardPopViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcDrinkTeaRewardPopViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcDrinkTeaRewardPopViewTab3;
}(CommonViewTab));
__reflect(AcDrinkTeaRewardPopViewTab3.prototype, "AcDrinkTeaRewardPopViewTab3");
//# sourceMappingURL=AcDrinkTeaRewardPopViewTab3.js.map