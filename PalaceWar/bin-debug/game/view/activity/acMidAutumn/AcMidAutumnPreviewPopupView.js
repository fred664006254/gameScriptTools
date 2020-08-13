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
var AcMidAutumnPreviewPopupView = (function (_super) {
    __extends(AcMidAutumnPreviewPopupView, _super);
    function AcMidAutumnPreviewPopupView() {
        var _this = _super.call(this) || this;
        _this._itemNumTextTab = [];
        return _this;
    }
    Object.defineProperty(AcMidAutumnPreviewPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMidAutumnPreviewPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMidAutumnPreviewPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMidAutumnPreviewPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMidAutumnPreviewPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMidAutumnPreviewPopupView.prototype, "uicode", {
        get: function () {
            return "" + this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    AcMidAutumnPreviewPopupView.prototype.getUiCode = function () {
        return this.uicode;
    };
    AcMidAutumnPreviewPopupView.prototype.getResourceList = function () {
        var view = this;
        var arr = [];
        return _super.prototype.getResourceList.call(this).concat([]).concat(arr);
    };
    AcMidAutumnPreviewPopupView.prototype.getTabbarTextArr = function () {
        var stringArr = [];
        if (this.code == "5" || this.code == "6") {
            stringArr = [
                'AcMidAutumnPreviewPopupViewTab1-' + this.code,
                'AcMidAutumnPreviewPopupViewTab2-' + this.code
            ];
        }
        else {
            stringArr = [
                'AcMidAutumnPreviewPopupViewTab1',
                'AcMidAutumnPreviewPopupViewTab2'
            ];
        }
        return stringArr;
        // `acDuanWuTab1-`,
        // `acDuanWuTab2-`,
        // `acDuanWuTab3-`,
        // `acDuanWuTab4-`,
    };
    AcMidAutumnPreviewPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB, tabBarTextArr, this.clickTabbarHandler, this);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            this.tabbarGroup.x = 55 + GameData.popupviewOffsetX;
        }
    };
    AcMidAutumnPreviewPopupView.prototype.setTabBarPosition = function () {
        _super.prototype.setTabBarPosition.call(this);
        this.tabbarGroup.x = 55 + GameData.popupviewOffsetX;
        this.tabbarGroup.y += 16;
    };
    AcMidAutumnPreviewPopupView.prototype.getTitleStr = function () {
        return "acMidAutumnRewardInfoTitle";
    };
    AcMidAutumnPreviewPopupView.prototype.initView = function () {
        // let servantCfg = Config.ServantCfg.getServantItemById("1050")
        // let wifeId = this.param.data.wifeId;
        // let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        // let servantCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
        // let bg = BaseLoadBitmap.create("sevendayssignupview_infobg_7");
        // bg.width = 544;
        // bg.height = 462;;
        // bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        // this.addChildToContainer(bg);
        // let rect = new egret.Rectangle(0, 0, 544, 462);
        // let maskContan = new BaseDisplayObjectContainer();
        // maskContan.width = 544;
        // maskContan.height = 462;
        // maskContan.mask = rect;
        // maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y);
        // this.addChildToContainer(maskContan);
        // let boneName = "";
        // if (wifeCfg && wifeCfg.bone) {
        // 	boneName = wifeCfg.bone + "_ske";
        // }
        // if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
        // 	let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
        // 	droWifeIcon.setScale(0.72);
        // 	droWifeIcon.anchorOffsetY = droWifeIcon.height;
        // 	droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
        // 	droWifeIcon.x = maskContan.width / 2;
        // 	droWifeIcon.y = maskContan.y + maskContan.height;
        // 	maskContan.addChild(droWifeIcon);
        // }
        // else {
        // 	let wifeImg = BaseLoadBitmap.create(wifeCfg.body);
        // 	wifeImg.width = 640;
        // 	wifeImg.height = 840;
        // 	wifeImg.anchorOffsetY = wifeImg.height;
        // 	wifeImg.anchorOffsetX = wifeImg.width / 2;
        // 	wifeImg.setScale(0.52);
        // 	wifeImg.x = maskContan.width / 2;
        // 	wifeImg.y = maskContan.y + maskContan.height;
        // 	maskContan.addChild(wifeImg);
        // }
        // let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        // skinnamebg.setPosition(bg.x, bg.y + 20);
        // this.addChildToContainer(skinnamebg);
        // let skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
        // skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 60 - skinNameTxt.height / 2);
        // this.addChildToContainer(skinNameTxt);
        // let buttomBg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        // buttomBg.width = 544;
        // buttomBg.height = 36;
        // buttomBg.setPosition(bg.x + bg.width / 2 - buttomBg.width / 2, bg.y + bg.height - buttomBg.height + 5);
        // this.addChildToContainer(buttomBg);
        // let charmTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifePopupViewcCharm", [String(wifeCfg.glamour)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // charmTF.setPosition(buttomBg.x + 70, buttomBg.y + buttomBg.height / 2 - charmTF.height / 2);
        // this.addChildToContainer(charmTF);
        // let servantTF = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifePopupViewcServant", [String(servantCfg.name)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // servantTF.setPosition(buttomBg.x + 310, buttomBg.y + buttomBg.height / 2 - servantTF.height / 2);
        // this.addChildToContainer(servantTF);
    };
    AcMidAutumnPreviewPopupView.prototype.getShowWidth = function () {
        return 570;
    };
    AcMidAutumnPreviewPopupView.prototype.getShowHeight = function () {
        return 790;
    };
    AcMidAutumnPreviewPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.tabViewData[this.selectedTabIndex].x = 35;
    };
    AcMidAutumnPreviewPopupView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        this.tabViewData[this.selectedTabIndex].x = 35;
    };
    AcMidAutumnPreviewPopupView.prototype.dispose = function () {
        var view = this;
        this._itemNumTextTab.length = 0;
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnPreviewPopupView;
}(PopupView));
__reflect(AcMidAutumnPreviewPopupView.prototype, "AcMidAutumnPreviewPopupView");
//# sourceMappingURL=AcMidAutumnPreviewPopupView.js.map