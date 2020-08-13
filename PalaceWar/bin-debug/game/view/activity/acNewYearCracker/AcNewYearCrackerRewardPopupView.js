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
 * 爆竹奖励
 * author qianjun
 */
var AcNewYearCrackerRewardPopupView = (function (_super) {
    __extends(AcNewYearCrackerRewardPopupView, _super);
    function AcNewYearCrackerRewardPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcNewYearCrackerRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcNewYearCrackerRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcNewYearCrackerRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accrackerpopdescbg-" + this.code, "acmidautumnview_titlebg", "progress5", "progress3_bg"
        ]);
    };
    AcNewYearCrackerRewardPopupView.prototype.getTabbarTextArr = function () {
        return [
            "acNewYearCrackerBuild1-" + this.code,
            "acNewYearCrackerBuild2-" + this.code,
            "acNewYearCrackerBuild3-" + this.code,
        ];
    };
    AcNewYearCrackerRewardPopupView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        view.selectedTabIndex = view.vo.getCurBuildId() - 1;
        view.tabbarGroup.selectedIndex = view.selectedTabIndex;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD, view.crackerRewardCallback, view);
        //红点
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER, view.freshView, view);
        var descbg = BaseBitmap.create("accrackerpopdescbg-" + view.code);
        descbg.setPosition(view.viewBg.x + view.viewBg.width / 2 - descbg.width / 2, 0);
        view.addChildToContainer(descbg);
        var btn = ComponentManager.getButton("accrackerscene-" + view.code, '', function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACNEWYEARCRACKERSCENEPOPUPVIEW, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, btn, descbg, [45, 0]);
        view.addChildToContainer(btn);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNewYearCrackerRewardTip-" + view.code), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, descbg, [btn.x + btn.width + 8, 0]);
        view.addChildToContainer(tipTxt);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 571;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, descbg, [0, descbg.height + 52]);
        view.addChildToContainer(bg);
        view.freshView();
    };
    AcNewYearCrackerRewardPopupView.prototype.freshView = function () {
        var view = this;
        var flag = false;
        var obj = {
            1: [0, 6],
            2: [7, 13],
            3: [14, 20]
        };
        for (var i in obj) {
            if (view.judgeRed(obj[i][0], obj[i][1])) {
                view.tabbarGroup.addRedPoint(Number(i) - 1);
            }
            else {
                view.tabbarGroup.removeRedPoint(Number(i) - 1);
            }
        }
    };
    AcNewYearCrackerRewardPopupView.prototype.judgeRed = function (start, end) {
        var view = this;
        var flag = false;
        for (var i = start; i <= end; ++i) {
            var unit = view.cfg.recharge[i];
            if (view.vo.getCrackerNum() >= unit.needItem && !view.vo.getJinduReward(i + 1)) {
                flag = true;
                break;
            }
        }
        return flag;
    };
    AcNewYearCrackerRewardPopupView.prototype.crackerRewardCallback = function (evt) {
        var view = this;
        if (evt && evt.data.data.ret < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        var rData = evt.data.data.data;
        App.LogUtil.log("crackerRewardCallback: " + rData.rewards);
        var rewardVo = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVo);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards, "message": "changeOtherRewardTip" });
        }
        view.freshView();
    };
    AcNewYearCrackerRewardPopupView.prototype.getShowHeight = function () {
        return 820;
    };
    AcNewYearCrackerRewardPopupView.prototype.getShowWidth = function () {
        return 560;
    };
    AcNewYearCrackerRewardPopupView.prototype.getTitleStr = function () {
        return "acNewYearCrackerRewardTitle-" + this.code;
    };
    AcNewYearCrackerRewardPopupView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                tabX = this.viewBg.x + 30;
                tabY = this.viewBg.y + 168;
            }
            else {
                tabX = 15;
                tabY = this.titleBg ? this.titleBg.y + this.titleBg.height + 8 : 97;
            }
            this.tabbarGroup.setPosition(tabX, tabY);
        }
        if (this.tabViewData) {
            for (var tabidx in this.tabViewData) {
                var tabView = this.tabViewData[tabidx];
                tabView.setPosition(this.container.x + 20, this.container.y + 167);
            }
        }
        this.tabbarGroup.x += 30;
    };
    AcNewYearCrackerRewardPopupView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
                commViewTab.setPosition(this.container.x + 20 + 27.5, this.container.y + 170);
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x + 20 + 28.5, this.container.y + 170);
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChild(tabView);
                // this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    AcNewYearCrackerRewardPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = this.container.x + 20 + 27.5;
    };
    AcNewYearCrackerRewardPopupView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD, view.crackerRewardCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER, view.freshView, view);
        _super.prototype.dispose.call(this);
    };
    return AcNewYearCrackerRewardPopupView;
}(PopupView));
__reflect(AcNewYearCrackerRewardPopupView.prototype, "AcNewYearCrackerRewardPopupView");
//# sourceMappingURL=AcNewYearCrackerRewardPopupView.js.map