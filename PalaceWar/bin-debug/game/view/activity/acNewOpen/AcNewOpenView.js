/*
    author : shaoliang
    date : 2020.4.16
    desc : 粽叶飘香-端午节活动
*/
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
var AcNewOpenView = (function (_super) {
    __extends(AcNewOpenView, _super);
    function AcNewOpenView() {
        var _this = _super.call(this) || this;
        _this._timeCountTxt = null;
        return _this;
    }
    AcNewOpenView.prototype.getUiCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcNewOpenView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_NEWOPENGETACTIVE, requestData: { activeId: this.acTivityId } };
    };
    // 标题背景名称
    AcNewOpenView.prototype.getTitleBgName = function () {
        return "acnewopen_title-" + this.getUiCode();
    };
    AcNewOpenView.prototype.getTitleStr = function () {
        return null;
    };
    AcNewOpenView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcNewOpenView.prototype.getResourceList = function () {
        var view = this;
        var code = view.getUiCode();
        return _super.prototype.getResourceList.call(this).concat([
            "acnewopen_reward_title-" + code, "acnewopen_title-" + code, "acnewopen_topbg-" + code,
            "public_scrollitembg", "acnewopen_specialitem2-" + code, "shopview_itemtitle", "destroysametaskbg",
            "progress3", "progress3_bg", "shopviewtimebg",
        ]);
    };
    Object.defineProperty(AcNewOpenView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewOpenView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcNewOpenView.prototype.getTabbarTextArr = function () {
        var code = this.getUiCode();
        return ["acNewOpenTab1-" + code,
            "acNewOpenTab2-" + code,
            "acNewOpenTab3-" + code,
        ];
    };
    AcNewOpenView.prototype.getTabbarGroupY = function () {
        return 225;
    };
    AcNewOpenView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcNewOpenView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcNewOpenView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        //new ui
        if (this.tabViewData[this.selectedTabIndex]) {
            this.tabViewData[this.selectedTabIndex].y = 377;
        }
    };
    AcNewOpenView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        var code = view.getUiCode();
        var topbg = BaseBitmap.create("acnewopen_topbg-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height - 0]);
        view.addChildAt(topbg, this.getChildIndex(this.container));
        var timebg = BaseBitmap.create("shopviewtimebg");
        // timebg.width = 280;
        timebg.setPosition(GameConfig.stageWidth - timebg.width, topbg.y + topbg.height - 10 - timebg.height);
        this.addChild(timebg);
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        var tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        tip2Text.setPosition(timebg.x, timebg.y + timebg.height / 2 - tip2Text.height / 2);
        tip2Text.width = timebg.width;
        tip2Text.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        this.freshView();
    };
    AcNewOpenView.prototype.tick = function () {
        var view = this;
        var str = view.vo.isInActivity() ? "acLuckyDrawTopTip2-1" : "acLaborDaytime-1";
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
    };
    AcNewOpenView.prototype.freshView = function () {
        var view = this;
        if (view.vo.getpublicRedhot1()) {
            view.tabbarGroup.addRedPoint(0);
        }
        else {
            view.tabbarGroup.removeRedPoint(0);
        }
        if (view.vo.getpublicRedhot2()) {
            view.tabbarGroup.addRedPoint(1);
        }
        else {
            view.tabbarGroup.removeRedPoint(1);
        }
        if (view.vo.getpublicRedhot3()) {
            view.tabbarGroup.addRedPoint(2);
        }
        else {
            view.tabbarGroup.removeRedPoint(2);
        }
    };
    AcNewOpenView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        view._timeCountTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcNewOpenView;
}(AcCommonView));
__reflect(AcNewOpenView.prototype, "AcNewOpenView");
//# sourceMappingURL=AcNewOpenView.js.map