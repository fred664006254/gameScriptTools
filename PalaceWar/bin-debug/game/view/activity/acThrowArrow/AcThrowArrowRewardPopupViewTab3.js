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
var AcThrowArrowRewardPopupViewTab3 = (function (_super) {
    __extends(AcThrowArrowRewardPopupViewTab3, _super);
    function AcThrowArrowRewardPopupViewTab3() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThrowArrowRewardPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThrowArrowRewardPopupViewTab3.prototype.initView = function () {
        var view = this;
        view.height = 620;
        view.width = 545;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var titleBg = BaseBitmap.create("fourpeople_bottom");
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acThrowArrowPopupView_rewardTopTitle-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleBg.width = titleTF.width + 60;
        titleBg.setPosition(Bg.x + Bg.width / 2 - titleBg.width / 2, Bg.y + 10);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var listArray = this.cfg.throwArrowPoolListItemCfgList;
        // for (let i = this.cfg.throwArrowPoolListItemCfgList.length; i>0; i--)
        // {
        // 	listArray.push(this.cfg.throwArrowPoolListItemCfgList[i-1]);
        // }
        var rect = new egret.Rectangle(0, 0, 520, Bg.height - titleBg.height - 22);
        var scrollList = ComponentManager.getScrollList(AcThrowArrowRewardScrollItem, listArray, rect, { aid: this.aid, code: this.code, length: listArray.length });
        scrollList.setPosition(Bg.x + Bg.width / 2 - scrollList.width / 2, titleBg.y + titleBg.height + 5);
        scrollList.bounces = false;
        this.addChild(scrollList);
    };
    AcThrowArrowRewardPopupViewTab3.prototype.dispose = function () {
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowRewardPopupViewTab3;
}(AcCommonViewTab));
__reflect(AcThrowArrowRewardPopupViewTab3.prototype, "AcThrowArrowRewardPopupViewTab3");
//# sourceMappingURL=AcThrowArrowRewardPopupViewTab3.js.map