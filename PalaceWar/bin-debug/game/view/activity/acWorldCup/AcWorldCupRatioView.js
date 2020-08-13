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
 * 世界杯投票活动查看赔率
 * author 钱竣
 */
var AcWorldCupRatioView = (function (_super) {
    __extends(AcWorldCupRatioView, _super);
    function AcWorldCupRatioView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcWorldCupRatioView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupRatioView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupRatioView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupRatioView.prototype.getTitleStr = function () {
        return 'AcWorldCupRatioTitle3';
    };
    AcWorldCupRatioView.prototype.resetBgSize = function () {
        if (this.getBgName() != "public_rule_bg") {
            this.closeBtn.y = this.viewBg.y - 15;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 15);
        }
        else {
            this.closeBtn.y = this.viewBg.y - 18;
            this.closeBtn.x = PlatformManager.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width + 37);
        }
    };
    AcWorldCupRatioView.prototype.initView = function () {
        var view = this;
        view.viewBg.height = 550;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view.viewBg, view);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.titleTF, view.viewBg, [0, 24]);
        var kuang = BaseBitmap.create("public_9_bg4");
        kuang.width = 518;
        kuang.height = 454;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, view.viewBg, [0, 70]);
        view.addChild(kuang);
        var bg = BaseBitmap.create("public_9_bg44");
        bg.width = 498;
        bg.height = 430;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang);
        view.addChild(bg);
        var titleBg = BaseBitmap.create("public_9_bg37");
        titleBg.width = bg.width;
        titleBg.height = 30;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titleBg, bg);
        view.addChild(titleBg);
        var desc = (titleBg.width - 2 * 24 * 2) / 3;
        var posArr = [];
        for (var i = 1; i < 3; ++i) {
            var guessTxtTitle = ComponentManager.getTextField(LanguageManager.getlocal("AcWorldCupRatioTitle" + i), 24, TextFieldConst.COLOR_QUALITY_WHITE);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, guessTxtTitle, titleBg, [desc * i + 48 * (i - 1), 0]);
            posArr.push(guessTxtTitle.x);
            view.addChild(guessTxtTitle);
        }
        var arr = [];
        for (var i in view.cfg.odds) {
            var unit = view.cfg.odds[i];
            arr.push({
                'day': Number(i) + 1,
                'ratio': unit,
                'pos_arr': posArr
            });
        }
        var tmpRect = new egret.Rectangle(0, 30, 430, 380);
        var scrollList = ComponentManager.getScrollList(AcWorldCupGuessRatioItem, arr, tmpRect, this.param.data.code);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titleBg, [0, titleBg.height]);
        view.addChild(scrollList);
    };
    AcWorldCupRatioView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupRatioView;
}(PopupView));
__reflect(AcWorldCupRatioView.prototype, "AcWorldCupRatioView");
//# sourceMappingURL=AcWorldCupRatioView.js.map