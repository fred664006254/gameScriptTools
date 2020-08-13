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
var AcAC2020AIDicePopupView = (function (_super) {
    __extends(AcAC2020AIDicePopupView, _super);
    function AcAC2020AIDicePopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcAC2020AIDicePopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AIDicePopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AIDicePopupView.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AIDicePopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AIDicePopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAC2020AIDicePopupView.prototype.getTitleStr = function () {
        return "acAC2020_ai_throw_title";
    };
    AcAC2020AIDicePopupView.prototype.getResourceList = function () {
        var ret = _super.prototype.getResourceList.call(this);
        ret = ret.concat([
            "annualcelebration_dicebg-1", "annualcelebration_dicetitlebg-1",
        ]);
        return ret;
    };
    Object.defineProperty(AcAC2020AIDicePopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcAC2020AIDicePopupView.prototype.initView = function () {
        var topbg = BaseBitmap.create("annualcelebration_dicetitlebg-1");
        topbg.x = this.viewBg.width / 2 - topbg.width / 2;
        this.addChildToContainer(topbg);
        var tipText = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_ai_throw_tips"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipText.y = 21;
        tipText.lineSpacing = 5;
        tipText.width = 500;
        tipText.x = this.viewBg.width / 2 - tipText.width / 2;
        this.addChildToContainer(tipText);
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 530;
        itemBg.height = 480;
        itemBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - itemBg.width / 2, topbg.y + topbg.height + 10);
        this.addChildToContainer(itemBg);
        var dicebg1 = BaseBitmap.create("annualcelebration_dicebg-1");
        dicebg1.setPosition(this.viewBg.x + this.viewBg.width / 2 - dicebg1.width / 2, itemBg.y + 3);
        this.addChildToContainer(dicebg1);
        var dicebg2 = BaseBitmap.create("annualcelebration_dicebg-1");
        dicebg2.setPosition(this.viewBg.x + this.viewBg.width / 2 - dicebg2.width / 2, dicebg1.y + dicebg1.height + 30);
        this.addChildToContainer(dicebg2);
        var curPos = this.vo.getCurMapId();
        var f = this.param.data.confirmCallback;
        var o = this.param.data.handler;
        var view = this;
        var _loop_1 = function (i) {
            var onedic = BaseLoadBitmap.create("acannualcelebration_aidice" + i);
            onedic.setPosition(this_1.viewBg.x + 94 + (i - 1) % 3 * 170, itemBg.y + 52 + Math.floor((i - 1) / 3) * 232);
            this_1.addChildToContainer(onedic);
            onedic.addTouchTap(function () {
                f.apply(o, [i]);
                view.hide();
            }, this_1);
            var onePos = curPos + i;
            if (onePos >= 25) {
                onePos -= 24;
            }
            var unit = this_1.cfg.map[onePos];
            if (unit.buildingType) {
                var jzhou = BaseBitmap.create("public_9_bg87");
                jzhou.y = onedic.y + 135;
                this_1.addChildToContainer(jzhou);
                var name_1 = LanguageManager.getlocal("acEnjoyNightAward_" + unit.buildingType + "-1");
                var arrive = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_ai_throw_arrive", [name_1]), 18, TextFieldConst.COLOR_BLACK);
                jzhou.width = arrive.width + 60;
                jzhou.x = onedic.x + 50 - jzhou.width / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrive, jzhou);
                this_1.addChildToContainer(arrive);
            }
        };
        var this_1 = this;
        for (var i = 1; i <= 6; i++) {
            _loop_1(i);
        }
    };
    AcAC2020AIDicePopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    return AcAC2020AIDicePopupView;
}(PopupView));
__reflect(AcAC2020AIDicePopupView.prototype, "AcAC2020AIDicePopupView");
//# sourceMappingURL=AcAC2020AIDicePopupView.js.map