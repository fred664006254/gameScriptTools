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
 * 女优活动1 依见钟情
 * author ycg
 * date 2019.10
 * @class AcFirstSightLoveView
 */
var AcFirstSightLoveView = (function (_super) {
    __extends(AcFirstSightLoveView, _super);
    function AcFirstSightLoveView() {
        var _this = _super.call(this) || this;
        _this._showHeight = 0;
        return _this;
    }
    AcFirstSightLoveView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.refreshGetInfo, this);
        var tabBtnName = [
            ResourceManager.hasRes("ac_firstsightlove_lovebtn-" + this.getTypeCode()) ? "ac_firstsightlove_lovebtn-" + this.getTypeCode() : "ac_firstsightlove_lovebtn-1",
            ResourceManager.hasRes("ac_firstsightlove_truthbtn-" + this.getTypeCode()) ? "ac_firstsightlove_truthbtn-" + this.getTypeCode() : "ac_firstsightlove_truthbtn-1",
            ResourceManager.hasRes("ac_firstsightlove_meetbtn-" + this.getTypeCode()) ? "ac_firstsightlove_meetbtn-" + this.getTypeCode() : "ac_firstsightlove_meetbtn-1"
        ];
        var tabTextArr = [
            "acFirstSightLoveBtnLoveName-" + this.getTypeCode(), "acFirstSightLoveBtnTruthName-" + this.getTypeCode(), "acFirstSightLoveBtnMeetName-" + this.getTypeCode()
        ];
        var tabBg = BaseBitmap.create("ac_firstsightlove_btnbg");
        tabBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - tabBg.width / 2, this.titleBg.y + this.titleBg.height - 7);
        var bottomBg = BaseBitmap.create("public_9_bg22");
        bottomBg.width = GameConfig.stageWidth;
        bottomBg.height = GameConfig.stageHeigth - tabBg.y - tabBg.height + 8;
        bottomBg.setPosition(tabBg.x + tabBg.width / 2 - bottomBg.width / 2, tabBg.y + tabBg.height - 8);
        this.addChildToContainer(bottomBg);
        App.LogUtil.log("bottomBgheight: " + bottomBg.height);
        this._showHeight = bottomBg.height;
        this.addChildToContainer(tabBg);
        var tabbarGroup = ComponentManager.getTabBarGroup(tabBtnName, tabTextArr, this.clickTabbarHandler, this, null, null, null, true);
        tabbarGroup.setSpace(1);
        tabbarGroup.setPosition(this.titleBg.x + this.titleBg.width / 2 - tabbarGroup.width / 2, tabBg.y + 0);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;
        this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        for (var i = 0; i < tabTextArr.length; i++) {
            var tab = tabbarGroup.getTabBar(i);
            var tabLb = ComponentManager.getTextField(LanguageManager.getlocal(tabTextArr[i]), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_BROWN);
            tabLb.setPosition(85, 55);
            tab.addChild(tabLb);
        }
        var flowerStr = ResourceManager.hasRes("ac_firstsightlove_btn_flower-" + this.getTypeCode()) ? "ac_firstsightlove_btn_flower-" + this.getTypeCode() : "ac_firstsightlove_btn_flower-1";
        var flower = BaseBitmap.create(flowerStr);
        flower.setPosition(tabBg.x, tabBg.y);
        this.addChildToContainer(flower);
        this.changeTab();
        this.refreshView();
    };
    AcFirstSightLoveView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x, this.container.y + this.tabbarGroup.y + this.tabbarGroup.height + 10);
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    AcFirstSightLoveView.prototype.refreshGetInfo = function (evt) {
        var rData = evt.data.data.data;
        if (rData) {
            App.LogUtil.log("tab2 getInfoCallback");
            this.vo.totalLove = rData.totalv;
            this.refreshView();
        }
    };
    AcFirstSightLoveView.prototype.refreshView = function () {
        if (this.vo.isShowRewardRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isShowBmRedDot()) {
            this.tabbarGroup.addRedPoint(2);
        }
        else {
            this.tabbarGroup.removeRedPoint(2);
        }
    };
    AcFirstSightLoveView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, requestData: { activeId: this.vo.aidAndCode } };
    };
    AcFirstSightLoveView.prototype.receiveData = function (data) {
        if (data.ret) {
            this.vo.totalLove = data.data.data.totalv;
        }
    };
    AcFirstSightLoveView.prototype.getChildShowHeight = function () {
        return this._showHeight;
    };
    AcFirstSightLoveView.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcFirstSightLoveView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcFirstSightLoveView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcFirstSightLoveView.prototype.getRuleInfo = function () {
        return "acFirstSightLoveRuleInfo-" + this.getTypeCode();
    };
    AcFirstSightLoveView.prototype.getTitleBgName = function () {
        return "ac_firstsightlove_titlebg-" + this.getTypeCode();
    };
    AcFirstSightLoveView.prototype.getTitleStr = function () {
        return "";
    };
    AcFirstSightLoveView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcFirstSightLoveView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() != "1") {
            list = [
                "ac_firstsightlove_love_infobg-1", "ac_firstsightlove_loveitembg-1", "ac_firstsightlove_meet_mailbg-1", "ac_firstsightlove_truth_infobg-1", "ac_firstsightlove_truth_itembg-1",
                "ac_firstsightlove_box1-1", "ac_firstsightlove_box2-1", "ac_firstsightlove_box3-1", "ac_firstsightlove_box4-1", "ac_firstsightlove_btn_flower-1", "ac_firstsightlove_love_numbg-1", "ac_firstsightlove_lovebtn-1", "ac_firstsightlove_lovebtn-1_down",
                "ac_firstsightlove_meetbtn-1", "ac_firstsightlove_meetbtn-1_down",
                "ac_firstsightlove_truthbtn-1", "ac_firstsightlove_truthbtn-1_down",
                "ac_firstsightlove_loveitem-1", "ac_firstsightlove_lovespecial_itembg1-1", "ac_firstsightlove_lovespecial_itembg0-1",
                "ac_firstsightlove_meet_txt-1", "ac_firstsightlove_meetrole-1", "ac_firstsightlove_meet_bg-1",
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "ac_firstsightlove_btnbg", "ac_firstsightlove_lookbtn_down", "ac_firstsightlove_lookbtn", "ac_firstsightlove_numbg", "ac_firstsightlove_special_itembg", "ac_firstsightlove_textbg", "shopview_line", "acwealthcomingview_box_1", "ac_firstsightlove_slider", "progress12", "progress12_bg", "acwealthcomingview_progresslight", "ac_firstsightlove_joinbtn", "ac_firstsightlove_joinbtn_down", "ac_firstsightlove_superflag", "common_titlebg", "alliance_taskAttrbg1", "ac_firstsightlove_emptyrole", "acgiftreturnview_common_skintxt",
            "ac_firstsightlove_love_infobg-" + this.getTypeCode(), "ac_firstsightlove_loveitembg-" + this.getTypeCode(), "ac_firstsightlove_meet_mailbg-" + this.getTypeCode(),
            "ac_firstsightlove_titlebg-" + this.getTypeCode(),
            "ac_firstsightlove_truth_infobg-" + this.getTypeCode(),
            "ac_firstsightlove_truth_itembg-" + this.getTypeCode(),
            "ac_firstsightlove_box1-" + this.getTypeCode(),
            "ac_firstsightlove_box2-" + this.getTypeCode(),
            "ac_firstsightlove_box3-" + this.getTypeCode(),
            "ac_firstsightlove_box4-" + this.getTypeCode(),
            "ac_firstsightlove_btn_flower-" + this.getTypeCode(),
            "ac_firstsightlove_love_numbg-" + this.getTypeCode(),
            "ac_firstsightlove_lovebtn-" + this.getTypeCode(),
            "ac_firstsightlove_lovebtn-" + this.getTypeCode() + "_down",
            "ac_firstsightlove_meetbtn-" + this.getTypeCode(),
            "ac_firstsightlove_meetbtn-" + this.getTypeCode() + "_down",
            "ac_firstsightlove_truthbtn-" + this.getTypeCode(),
            "ac_firstsightlove_truthbtn-" + this.getTypeCode() + "_down",
            "ac_firstsightlove_loveitem-" + this.getTypeCode(),
            "ac_firstsightlove_lovespecial_itembg0-" + this.getTypeCode(),
            "ac_firstsightlove_meet_txt-" + this.getTypeCode(),
            "ac_firstsightlove_meet_bg-" + this.getTypeCode(),
            "ac_firstsightlove_meetrole-" + this.getTypeCode(),
        ]);
    };
    AcFirstSightLoveView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_FIRSTSIGHTLOVE_GETINFO, this.refreshGetInfo, this);
        for (var key in this.tabViewData) {
            if (this.tabViewData[key]) {
                this.tabViewData[key].dispose();
            }
        }
        this.tabViewData = {};
        this.tabbarGroup = null;
        this._selectedTabIndex = 0;
        this._showHeight = 0;
        this._selectedTabIndex = 0;
        _super.prototype.dispose.call(this);
    };
    return AcFirstSightLoveView;
}(AcCommonView));
__reflect(AcFirstSightLoveView.prototype, "AcFirstSightLoveView");
//# sourceMappingURL=AcFirstSightLoveView.js.map