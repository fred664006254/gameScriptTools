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
var AcBattlePassRewardPopupView = (function (_super) {
    __extends(AcBattlePassRewardPopupView, _super);
    function AcBattlePassRewardPopupView() {
        var _this = _super.call(this) || this;
        _this._curIdx = 0;
        _this._leftbtn = null;
        _this._rightbtn = null;
        return _this;
    }
    Object.defineProperty(AcBattlePassRewardPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassRewardPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassRewardPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassRewardPopupView.prototype, "uicode", {
        get: function () {
            var code = "";
            switch (Number(this.code)) {
                case 2:
                    code = '1';
                    break;
                case 7:
                    code = '4';
                    break;
                default:
                    code = this.code;
                    break;
            }
            return code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassRewardPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassRewardPopupView.prototype, "aidAndCode", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassRewardPopupView.prototype.getTabbarTextArr = function () {
        var code = this.uicode;
        var arr = [];
        for (var i in this.cfg.showDetail) {
            var unit = GameData.formatRewardItem(this.cfg.showDetail[i])[0];
            var str = "battlepassreward_" + unit.type;
            if (unit.type == 1) {
                continue;
            }
            if (unit.type == 11) {
                var tfg = Config.TitleCfg.getTitleCfgById(unit.id);
                str += "_" + tfg.isTitle;
            }
            if ((unit.type == 1025 || unit.type == 1026)) {
                if ((arr.indexOf("battlepassreward_1025") == -1) && (arr.indexOf("battlepassreward_1026") == -1)) {
                    arr.push(str);
                }
            }
            else {
                arr.push(str);
            }
        }
        return arr;
    };
    // 初始化tabbarGroup
    AcBattlePassRewardPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            if (this.getTabbarTextArr().length > 3) {
                this.tabbarGroup = ComponentManager.getScroTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, TabBarGroup.ALIGN_HORIZONTAL, 455, false, null, 66);
                var tabBarX = (this instanceof PopupView) ? 30 : 15;
                this.addChild(this.tabbarGroup);
                this.setTabBarPosition();
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
                this.container.y = this.getTitleButtomY();
                this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            }
            else {
                this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null);
                var tabBarX = (this instanceof PopupView) ? 30 : 15;
                this.addChild(this.tabbarGroup);
                this.setTabBarPosition();
                this.tabbarGroup.setColor(0xe1ba86, 0x472c26);
                this.container.y = this.getTitleButtomY();
                this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            }
            // this.changeTab();
        }
    };
    AcBattlePassRewardPopupView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            tabX = this.viewBg.x + (this.getTabbarTextArr().length > 3 ? 55 : 20) + GameData.popupviewOffsetX;
            tabY = this.viewBg.y + 67 - 16;
            this.tabbarGroup.setPosition(tabX, tabY);
        }
    };
    AcBattlePassRewardPopupView.prototype.getTitleStr = function () {
        return "battlepassreward";
    };
    AcBattlePassRewardPopupView.prototype.getShowHeight = function () {
        return Number(this.uicode) <= 3 ? 795 : 825;
    };
    AcBattlePassRewardPopupView.prototype.getShowWidth = function () {
        return 560;
    };
    AcBattlePassRewardPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "battlepassrewardbg", "battlepassrewardbg1", "battlepassrewardbg2", "battlepassrewardwordbg", "skin_detail_namebg", "servant_star",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4", "studyatk_arrow", "qingyuanitemtitlebg",
        ]);
    };
    AcBattlePassRewardPopupView.prototype.resetBgSize = function () {
        var view = this;
        _super.prototype.resetBgSize.call(this);
        if (this.getTabbarTextArr().length > 3) {
            var leftbtn_1 = ComponentManager.getButton("btn_leftpage", "", function () {
                var idx = view.selectedTabIndex - 1;
                if (idx < 0) {
                }
                else {
                    view.clickTabbarHandler({ index: idx });
                    view.selectedTabIndex = idx;
                    view.tabbarGroup.selectedIndex = idx;
                    view.tabbarGroup.setTarBarScrollLeft(idx * 145);
                }
                leftbtn_1.visible = idx > 0;
                rightbtn_1.visible = idx < (view.getTabbarTextArr().length - 1);
            }, view);
            leftbtn_1.setScale(0.7);
            view.addChild(leftbtn_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftbtn_1, view.tabbarGroup, [-leftbtn_1.width * leftbtn_1.scaleX - 10, 0]);
            leftbtn_1.x = 45;
            var rightbtn_1 = ComponentManager.getButton("btn_leftpage", "", function () {
                var idx = view.selectedTabIndex + 1;
                if (idx >= view.getTabbarTextArr().length) {
                }
                else {
                    view.clickTabbarHandler({ index: idx });
                    view.selectedTabIndex = idx;
                    view.tabbarGroup.selectedIndex = idx;
                    view.tabbarGroup.setTarBarScrollLeft(idx * 145);
                }
                leftbtn_1.visible = idx > 0;
                rightbtn_1.visible = idx < (view.getTabbarTextArr().length - 1);
            }, view);
            rightbtn_1.anchorOffsetX = rightbtn_1.width / 2;
            rightbtn_1.scaleX = -0.7;
            rightbtn_1.scaleY = 0.7;
            view.addChild(rightbtn_1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rightbtn_1, view.tabbarGroup, [view.tabbarGroup.width + 10, 0]);
            rightbtn_1.x = 570;
            view._leftbtn = leftbtn_1;
            view._rightbtn = rightbtn_1;
            leftbtn_1.visible = view.selectedTabIndex > 0;
            rightbtn_1.visible = view.selectedTabIndex < (view.getTabbarTextArr().length - 1);
        }
    };
    AcBattlePassRewardPopupView.prototype.initView = function () {
        //  this.showHand();
        var view = this;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
            view.tabbarGroup.setTarBarScrollLeft((tab - 1) * 145);
        }
    };
    AcBattlePassRewardPopupView.prototype.clickTabbarHandler = function (data) {
        _super.prototype.clickTabbarHandler.call(this, data);
        var view = this;
        if (view._leftbtn) {
            view._leftbtn.visible = view.selectedTabIndex > 0;
            view._rightbtn.visible = view.selectedTabIndex < (view.getTabbarTextArr().length - 1);
        }
    };
    AcBattlePassRewardPopupView.prototype.getOffsetX = function () {
        return 34;
    };
    AcBattlePassRewardPopupView.prototype.getOffsetY = function () {
        return 6;
    };
    AcBattlePassRewardPopupView.prototype.dispose = function () {
        var view = this;
        view._leftbtn = null;
        view._rightbtn = null;
        view._curIdx = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassRewardPopupView;
}(PopupView));
__reflect(AcBattlePassRewardPopupView.prototype, "AcBattlePassRewardPopupView");
//# sourceMappingURL=AcBattlePassRewardPopupView.js.map