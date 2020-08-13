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
 * 投石奖励
 * author yangchengguo
 * date 2019.8.28
 * @class AcThrowStoneRewardTab2
 */
var AcThrowStoneRewardPopViewTab2 = (function (_super) {
    __extends(AcThrowStoneRewardPopViewTab2, _super);
    function AcThrowStoneRewardPopViewTab2() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    AcThrowStoneRewardPopViewTab2.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 680;
        bg.setPosition(25, 60);
        this.addChild(bg);
        var listbg = BaseBitmap.create("public_9_bg14");
        listbg.width = 530;
        listbg.height = 670;
        listbg.setPosition(25, 65);
        this.addChild(listbg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = 540;
        titleBg.height = 35;
        titleBg.setPosition(listbg.x + listbg.width / 2 - titleBg.width / 2, listbg.y + 8);
        this.addChild(titleBg);
        var titleInfo = ComponentManager.getTextField(LanguageManager.getlocal("acthrowstoneStoneRewardTitle-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleInfo.setPosition(titleBg.x + titleBg.width / 2 - titleInfo.width / 2, titleBg.y + titleBg.height / 2 - titleInfo.height / 2);
        this.addChild(titleInfo);
        App.LogUtil.log("rewardarr: " + this.cfg.getPoolRewards());
        var rewardArr = GameData.getRewardItemIcons(this.cfg.getPoolRewards(), true, true);
        var rewardScale = 0.83;
        var scrolNode = new BaseDisplayObjectContainer();
        // scrolNode.height = Math.ceil(rewardArr.length / 4) * (108 + 8);
        scrolNode.width = listbg.width - 20;
        var rect = new egret.Rectangle(listbg.x + 10, titleBg.y + titleBg.height + 5, listbg.width - 20, listbg.height - 10);
        var scrollview = ComponentManager.getScrollView(scrolNode, rect);
        scrollview.bounces = false;
        scrollview.x = listbg.x + 10;
        scrollview.y = titleBg.y + titleBg.height + 5;
        scrollview.horizontalScrollPolicy = 'off';
        this.addChild(scrollview);
        for (var i in rewardArr) {
            var icon = rewardArr[i];
            var idx = Number(i);
            icon.x = 9 + (idx % 4) * (icon.width + 20);
            icon.y = 5 + Math.floor(idx / 4) * (icon.width + 8);
            scrolNode.addChild(icon);
        }
    };
    AcThrowStoneRewardPopViewTab2.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcThrowStoneRewardPopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowStoneRewardPopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcThrowStoneRewardPopViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcThrowStoneRewardPopViewTab2;
}(AcCommonViewTab));
__reflect(AcThrowStoneRewardPopViewTab2.prototype, "AcThrowStoneRewardPopViewTab2");
//# sourceMappingURL=AcThrowStoneRewardPopViewTab2.js.map