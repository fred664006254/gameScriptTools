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
 * 衣装预览
 * date 2020.6.15
 * @class AcNightSkyDetailPopupViewTab2
 */
var AcNightSkyDetailPopupViewTab2 = (function (_super) {
    __extends(AcNightSkyDetailPopupViewTab2, _super);
    function AcNightSkyDetailPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcNightSkyDetailPopupViewTab2.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);
        var topBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnightsky_poolrewardbg", this.getTypeCode()));
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y);
        this.addChild(topBg);
        App.LogUtil.log("rewardarr: " + this.cfg.getPoolRewards());
        var rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, true);
        var rewardScale = 1;
        var scrolNode = new BaseDisplayObjectContainer();
        scrolNode.width = bg.width - 20;
        var rect = new egret.Rectangle(0, 0, bg.width - 20, bg.height - topBg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = bg.x + 10;
        scrollview.y = topBg.y + topBg.height + 5;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChild(scrollview);
        var offY = 0;
        var iconHeight = 0;
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            icon.setScale(rewardScale);
            var idx = Number(i);
            icon.x = 14 + (idx % 4) * (icon.width * icon.scaleX + 20);
            icon.y = 5 + Math.floor(idx / 4) * (icon.height * icon.scaleX + 12);
            scrolNode.addChild(icon);
            iconHeight = icon.height;
            offY = icon.y;
        }
        scrolNode.height = offY + iconHeight + 10;
    };
    Object.defineProperty(AcNightSkyDetailPopupViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNightSkyDetailPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcNightSkyDetailPopupViewTab2.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcNightSkyDetailPopupViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcNightSkyDetailPopupViewTab2;
}(CommonViewTab));
__reflect(AcNightSkyDetailPopupViewTab2.prototype, "AcNightSkyDetailPopupViewTab2");
//# sourceMappingURL=AcNightSkyDetailPopupViewtTab2.js.map