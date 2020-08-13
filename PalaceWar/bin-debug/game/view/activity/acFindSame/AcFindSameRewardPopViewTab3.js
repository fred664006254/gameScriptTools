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
 * author ycg
 * date 2020.2.11
 * @class AcThreekingdomsOfWifeDetailPopupViewTab3
 */
var AcFindSameRewardPopViewTab4 = (function (_super) {
    __extends(AcFindSameRewardPopViewTab4, _super);
    function AcFindSameRewardPopViewTab4(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcFindSameRewardPopViewTab4.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 60);
        this.addChild(bg);
        var topBgStr = ResourceManager.hasRes("acfindsame_poolbg-" + this.getTypeCode()) ? "acfindsame_poolbg-" + this.getTypeCode() : "acfindsame_poolbg-1";
        var topBg = BaseBitmap.create(topBgStr);
        topBg.setPosition(bg.x + bg.width / 2 - topBg.width / 2, bg.y);
        this.addChild(topBg);
        // let listbg = BaseBitmap.create("public_9_bg14");
        // listbg.width = 530;
        // listbg.height = 670;
        // listbg.setPosition(25, 65);
        // this.addChild(listbg);
        App.LogUtil.log("rewardarr: " + this.cfg.getPoolRewards());
        var rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, true);
        var rewardScale = 1;
        var scrolNode = new BaseDisplayObjectContainer();
        // scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
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
    Object.defineProperty(AcFindSameRewardPopViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameRewardPopViewTab4.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcFindSameRewardPopViewTab4.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardPopViewTab4.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFindSameRewardPopViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFindSameRewardPopViewTab4.prototype.getResourceList = function () {
        var codeRes = ["acfindsame_poolbg-" + this.getTypeCode()];
        var codeList = null;
        if (this.code == "1") {
            codeList = [];
        }
        return _super.prototype.getResourceList.call(this).concat(codeList).concat(codeRes);
    };
    AcFindSameRewardPopViewTab4.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcFindSameRewardPopViewTab4;
}(CommonViewTab));
__reflect(AcFindSameRewardPopViewTab4.prototype, "AcFindSameRewardPopViewTab4");
//# sourceMappingURL=AcFindSameRewardPopViewTab3.js.map