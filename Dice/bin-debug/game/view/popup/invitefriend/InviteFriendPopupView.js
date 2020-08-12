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
 * 邀请好友
 * author qianjun
 *
 */
var InviteFriendPopupView = (function (_super) {
    __extends(InviteFriendPopupView, _super);
    function InviteFriendPopupView() {
        return _super.call(this) || this;
    }
    InviteFriendPopupView.prototype.getMsgConstEventArr = function () {
        return [
            MsgConst.MODEL_INVITEFRIEND
        ];
    };
    InviteFriendPopupView.prototype.msgEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case MsgConst.MODEL_INVITEFRIEND:
                view.modelCallBack();
                break;
        }
    };
    InviteFriendPopupView.prototype.modelCallBack = function () {
        var view = this;
        if (Api.InviteFriendVoApi.getIsFinishBind() && this.tabbarGroup.selectedIndex == 1) {
            view.tabbarGroup.getTabBar(1).visible = false;
            view.clickTabbarHandler({ index: 0 });
            view.selectedTabIndex = 0;
            view.tabbarGroup.selectedIndex = 0;
        }
    };
    InviteFriendPopupView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            tabX = this.viewBg.x + 55;
            tabY = this.viewBg.y + 60;
            tabY += this.getTabbarGroupY();
            this.tabbarGroup.setPosition(tabX, tabY);
        }
    };
    InviteFriendPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "invitefriendview", "userinfo_view_progress", "userinfo_view_bar", "userinfo_view_top_split", "joinwarinputbg"
        ]);
    };
    InviteFriendPopupView.prototype.isTouchMaskClose = function () {
        return false;
    };
    InviteFriendPopupView.prototype.getTitleStr = function () {
        return null;
    };
    InviteFriendPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    InviteFriendPopupView.prototype.getTitlePic = function () {
        return "invitefriendtitle";
    };
    // 背景图名称
    InviteFriendPopupView.prototype.getBgName = function () {
        return "invitefriendbg";
    };
    // 初始化标题
    InviteFriendPopupView.prototype.initTitle = function () {
        var titlepic = this.getTitlePic();
        if (ResMgr.hasRes(titlepic)) {
            this.titleBmp = BaseBitmap.create(titlepic);
            this.addChild(this.titleBmp);
        }
    };
    InviteFriendPopupView.prototype.getTabbarTextArr = function () {
        var arr = [LangMger.getlocal("invitefriendTab1")];
        if (!Api.InviteFriendVoApi.getIsFinishBind()) {
            arr.push(LangMger.getlocal("invitefriendTab2"));
        }
        return arr;
    };
    // 页签图名称
    InviteFriendPopupView.prototype.getTabbarName = function () {
        return "invitefriendtabbg";
    };
    // 初始化tabbarGroup
    InviteFriendPopupView.prototype.initTabbarGroup = function () {
        var tabBarTextArr = this.getTabbarTextArr();
        if (tabBarTextArr && tabBarTextArr.length > 0) {
            this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(), tabBarTextArr, this.clickTabbarHandler, this, null, "", null, false, 386, 82);
            this.addChild(this.tabbarGroup);
            this.setTabBarPosition();
            this.container.y = this.getTitleButtomY();
            this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        }
    };
    InviteFriendPopupView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                commViewTab.setPosition(this.tabbarGroup.x, this.tabbarGroup.y + this.tabbarGroup.height);
                this.addChild(commViewTab);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.tabbarGroup.x, this.tabbarGroup.y + this.tabbarGroup.height);
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                this.addChild(tabView);
                // this.param = null;
                // this.addChild(tabView);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    InviteFriendPopupView.prototype.getTabbarGroupY = function () {
        return 91;
    };
    // 打开该面板时，需要传参数msg
    InviteFriendPopupView.prototype.initView = function () {
        var view = this;
    };
    InviteFriendPopupView.prototype.resetBgSize = function () {
        var view = this;
        _super.prototype.resetBgSize.call(this);
        view.changeTab();
        view.titleBmp.setPosition(view.viewBg.x + view.viewBg.width / 2 - view.titleBmp.width / 2, view.viewBg.y + 31);
        view.closeBtn.y = view.viewBg.y + 75;
        var ruleBtn = ComponentMgr.getButton("public_rule", "", function () {
            ViewController.getInstance().openView(ViewConst.INVITEFRIENDRULEPOPUPVIEW);
        }, view);
        ruleBtn.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, ruleBtn, view.viewBg, [53, 167]);
        view.addChild(ruleBtn);
    };
    InviteFriendPopupView.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return InviteFriendPopupView;
}(PopupView));
__reflect(InviteFriendPopupView.prototype, "InviteFriendPopupView");
//# sourceMappingURL=InviteFriendPopupView.js.map