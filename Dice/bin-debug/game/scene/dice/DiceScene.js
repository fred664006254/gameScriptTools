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
var DiceScene = (function (_super) {
    __extends(DiceScene, _super);
    function DiceScene() {
        return _super.call(this) || this;
    }
    DiceScene.prototype.getResourceList = function () {
        return [
            "progress_bg_1", "dice_tab_btn_down", "dice_tab_btn", "diceinfoscene", "card_bg_xiaoguo", "card_group_tab_bg", "progress24_bg", "progress25", "progress26", "progress24", "diceinuse"
        ];
    };
    // protected checkTabCondition(index:number):boolean
    // {
    // 	return index == 1;
    // }
    DiceScene.prototype.init = function () {
        _super.prototype.init.call(this);
        var view = this;
        view.name = "DiceScene";
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 137;
        // view.y = 72;
        this._sceneBg.addTouchTap(function () {
            App.MsgHelper.dispEvt(MsgConst.DICE_INFOCLICK, {
                idx: -1,
                dice: ""
            });
        }, this);
    };
    DiceScene.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        if (Api.GameinfoVoApi.checlIsInStepId(28) || Api.GameinfoVoApi.checlIsInGuideId(19)) {
            App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
        }
    };
    DiceScene.prototype.getTabPos = function () {
        return {
            x: 0,
            y: 130
        };
    };
    // 初始化tabbarGroup
    DiceScene.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, "", 0, false, 540, 95);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
            //暂时置灰皮肤
            this.tabbarGroup.setLocked(1, true);
        }
    };
    DiceScene.prototype.setTabBarPosition = function () {
        var view = this;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, view, [0, 72], true);
        for (var i = 0; i < 2; ++i) {
            var tab = view.tabbarGroup.getTabBar(i);
            var txt = tab.getChildByName("btnTxt");
            txt.width = tab.width;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.strokeColor = 0xb13c03;
            txt.setPosition(0, 20);
        }
    };
    DiceScene.prototype.getTabbarTextArr = function () {
        return [
            LangMger.getlocal("dicetab1"),
            LangMger.getlocal("dicetab2"),
        ];
    };
    // 页签图名称
    DiceScene.prototype.getTabbarName = function () {
        return "dice_tab_btn";
    };
    DiceScene.prototype.refreshAfterShow = function (bool) {
        if (bool === void 0) { bool = false; }
        _super.prototype.refreshAfterShow.call(this, bool);
        this.lastSelectedTabIndex = -1;
        this.changeTab();
        if (!bool) {
            if (Api.GameinfoVoApi.checlIsInStepId(28)) {
                App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
            }
        }
    };
    DiceScene.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return DiceScene;
}(BaseScene));
__reflect(DiceScene.prototype, "DiceScene");
//# sourceMappingURL=DiceScene.js.map