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
 * 帝王成就
 * author ycg
 * date 2019.12.10
 * @class EmperorAchieveView
 */
var EmperorAchieveView = (function (_super) {
    __extends(EmperorAchieveView, _super);
    function EmperorAchieveView() {
        var _this = _super.call(this) || this;
        _this._outBtn = null;
        _this._viewBg = null;
        _this._callback = null;
        _this._obj = null;
        _this._outBtnContainer = null;
        return _this;
    }
    EmperorAchieveView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, this.getRewardCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPERORACHIEVEREWARD_OPENFUN, this.playOpenFunAni, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, this.outingCallback, this);
        var viewBg = BaseBitmap.create("decree_popbg");
        viewBg.height = this.getShowHeight(); // 620 w
        this.addChild(viewBg);
        viewBg.setPosition(GameConfig.stageWidth / 2 - viewBg.width / 2, GameConfig.stageHeigth / 2 - viewBg.height / 2);
        this._viewBg = viewBg;
        this.closeBtn = ComponentManager.getButton(ButtonConst.POPUP_CLOSE_BTN_1, "", this.closeHandler, this);
        this.closeBtn.x = viewBg.x + viewBg.width - 80;
        this.closeBtn.y = viewBg.y - 10;
        this.addChild(this.closeBtn);
        var title = BaseBitmap.create("emperorachieve_title");
        title.setPosition(viewBg.x + viewBg.width / 2 - title.width / 2, viewBg.y - 10);
        this.addChild(title);
        var textArr = this.getTabbarTextArrs();
        var tabBg = BaseBitmap.create("emperorachieve_tabbtn1"); // 170 68
        var tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarNames(), textArr, this.clickTabbarHandler, this, null, null, null, null, GameConfig.stageWidth, tabBg.height);
        tabbarGroup.setPosition(viewBg.x + 52, viewBg.y + 50);
        tabbarGroup.setSpace(3);
        tabbarGroup.setColor(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.tabbarGroup = tabbarGroup;
        this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        for (var i = 0; i < textArr.length; i++) {
            var tabbar = this.tabbarGroup.getTabBar(i);
            tabbar.setTextOffY(13);
            tabbar.setTextSize(24);
            tabbar.setText(textArr[i]);
            var tabEffect = ComponentManager.getCustomMovieClip("emperoroutachievetabeffect", 8, 70); //168 48
            tabEffect.setPosition(1, tabbar.height - 48);
            tabbar.addChild(tabEffect);
            tabEffect.playWithTime(0);
            tabEffect.name = "tabEffect";
            if (this.tabbarGroup.selectedIndex == i) {
                tabEffect.visible = true;
            }
            else {
                tabEffect.visible = false;
            }
            var redDot = BaseBitmap.create("public_dot2");
            redDot.setPosition(tabbar.width - 20, 17);
            tabbar.addChild(redDot);
            redDot.name = "tabRedDot";
            redDot.visible = false;
        }
        var bg = BaseBitmap.create("public_9_bg36");
        bg.width = viewBg.width - 88;
        bg.height = this.getShowHeight() - 155;
        bg.setPosition(viewBg.x + viewBg.width / 2 - bg.width / 2, tabbarGroup.y + tabbarGroup.height);
        this.addChild(bg);
        this.addChild(tabbarGroup);
        this.changeTab();
        var tabIndex = this.getChildIndex(this.tabbarGroup);
        var outBtnContainer = this.getBigSquareBtn(true, 0.6);
        outBtnContainer.setPosition(viewBg.x + 15, viewBg.y + viewBg.height - outBtnContainer.height * outBtnContainer.scaleY / 2 - 30);
        this.addChildAt(outBtnContainer, tabIndex + 2);
        this._outBtnContainer = outBtnContainer;
        if (Api.emperorAchieveVoApi.isUnlockOutFunc()) {
            outBtnContainer.visible = true;
            if (Api.emperorAchieveVoApi.isShowAchieveOutRedDot()) {
                App.CommonUtil.addIconToBDOC(outBtnContainer);
                var redDot = outBtnContainer.getChildByName("reddot");
                redDot.setScale(1 / outBtnContainer.scaleX);
                redDot.setPosition(outBtnContainer.width * outBtnContainer.scaleX - 11, 36);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(outBtnContainer);
            }
        }
        else {
            outBtnContainer.visible = false;
        }
        //解锁特效
        // this.showOpenFunAni();
        this.refreshView();
        this.refreshOutBtn();
    };
    EmperorAchieveView.prototype.showOpenFunAni = function () {
        var _this = this;
        var openContainer = new BaseDisplayObjectContainer();
        openContainer.width = GameConfig.stageWidth;
        openContainer.height = GameConfig.stageHeigth;
        var tabIndex = this.getChildIndex(this.tabbarGroup);
        this.addChildAt(openContainer, tabIndex + 3);
        var uiContainer = new BaseDisplayObjectContainer();
        uiContainer.width = GameConfig.stageWidth;
        uiContainer.height = GameConfig.stageHeigth;
        openContainer.addChild(uiContainer);
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = openContainer.width;
        mask.height = openContainer.height;
        uiContainer.addChild(mask);
        var bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.width = uiContainer.width;
        bottomBg.height = 330;
        uiContainer.addChild(bottomBg);
        bottomBg.x = 0;
        bottomBg.y = uiContainer.height / 2 - bottomBg.height / 2;
        var topArtbg = BaseBitmap.create("specialview_artbg");
        topArtbg.setPosition(uiContainer.width / 2 - topArtbg.width / 2 - 10, bottomBg.y - 200);
        uiContainer.addChild(topArtbg);
        var topTxt = BaseBitmap.create("emperorachieve_unlocktxt");
        topTxt.setPosition(uiContainer.width / 2 - topTxt.width / 2, topArtbg.y + 30);
        uiContainer.addChild(topTxt);
        // let outFlag = BaseBitmap.create("emperorachieve_unlock_bigbtn");
        // outFlag.setPosition(bottomBg.x + bottomBg.width/2 - outFlag.width/2 + 20, bottomBg.y + 25);
        // openContainer.addChild(outFlag);
        var outBtnContainer = this.getBigSquareBtn(false, 1);
        outBtnContainer.setPosition(bottomBg.x + bottomBg.width / 2 - outBtnContainer.width / 2 + 20, bottomBg.y - 40);
        openContainer.addChild(outBtnContainer);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("emperorAchieveOpenFunTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        tip.textAlign = TextFieldConst.ALIGH_CENTER;
        tip.lineSpacing = 6;
        tip.anchorOffsetX = tip.width / 2;
        tip.setPosition(bottomBg.x + bottomBg.width / 2, bottomBg.y + bottomBg.height - tip.height - 30);
        uiContainer.addChild(tip);
        mask.addTouchTap(function () {
            uiContainer.visible = false;
            if (outBtnContainer) {
                egret.Tween.get(outBtnContainer).to({ x: _this._outBtnContainer.x + _this._outBtnContainer.width / 2 * _this._outBtnContainer.scaleX, y: _this._outBtnContainer.y + _this._outBtnContainer.height / 2 * _this._outBtnContainer.scaleY, scaleX: 0, scaleY: 0 }, 400).call(function () {
                    // openContainer.visible = false;
                    _this._outBtnContainer.visible = true;
                    if (_this._callback) {
                        _this.showViewMask();
                        _this._callback.apply(_this._obj);
                    }
                    openContainer.dispose();
                });
            }
        }, this);
        egret.Tween.get(outBtnContainer).wait(2000).to({ x: this._outBtnContainer.x + this._outBtnContainer.width / 2 * this._outBtnContainer.scaleX, y: this._outBtnContainer.y + this._outBtnContainer.height / 2 * this._outBtnContainer.scaleY, scaleX: 0, scaleY: 0 }, 400).call(function () {
            // openContainer.visible = false;
            _this._outBtnContainer.visible = true;
            if (_this._callback) {
                _this.showViewMask();
                _this._callback.apply(_this._obj);
            }
            openContainer.dispose();
        });
    };
    EmperorAchieveView.prototype.tick = function () {
        this.refreshOutBtn();
        this.refreshView();
    };
    EmperorAchieveView.prototype.refreshOutBtn = function () {
        if (Api.emperorAchieveVoApi.isUnlockOutFunc()) {
            var lightClip = this._outBtnContainer.getChildByName("lightClip");
            if (Api.emperorAchieveVoApi.emperorAchieveVo.outingst != 0) {
                if (App.DateUtil.checkIsToday(Api.emperorAchieveVoApi.emperorAchieveVo.outingst) && Api.emperorAchieveVoApi.isInOuting(Api.emperorAchieveVoApi.emperorAchieveVo.outingst)) {
                    App.DisplayUtil.changeToNormal(this._outBtnContainer);
                    lightClip.visible = true;
                }
                else {
                    App.DisplayUtil.changeToGray(this._outBtnContainer);
                    lightClip.visible = false;
                }
            }
            else if (Api.emperorAchieveVoApi.emperorAchieveVo.outingst == 0) {
                App.DisplayUtil.changeToNormal(this._outBtnContainer);
                lightClip.visible = true;
            }
        }
    };
    EmperorAchieveView.prototype.getBigSquareBtn = function (isCanClick, scale) {
        var con = new BaseDisplayObjectContainer();
        var btnBg = BaseBitmap.create("emperorachieve_unlock_bigbtn_bg");
        con.addChild(btnBg);
        con.width = btnBg.width;
        con.height = btnBg.height;
        var hourseClip = ComponentManager.getCustomMovieClip("emperorout_bigsquarebtn", 10, 70);
        con.addChild(hourseClip);
        hourseClip.playWithTime(0);
        var lightClip = ComponentManager.getCustomMovieClip("emperorout_openIcon_lighteffect", 20, 70);
        con.addChild(lightClip);
        lightClip.playWithTime(0);
        lightClip.name = "lightClip";
        var btnName = BaseBitmap.create("emperorachieve_unlock_bigbtn_name");
        btnName.setPosition(btnBg.x + btnBg.width / 2 - btnName.width / 2, btnBg.y + btnBg.height - 62);
        con.addChild(btnName);
        con.setScale(scale);
        if (isCanClick) {
            btnBg.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.POPUP.EMPEROROUTSTARTPOPUPVIEW);
            }, this);
        }
        return con;
    };
    EmperorAchieveView.prototype.refreshView = function () {
        var redDot2 = this.tabbarGroup.getTabBar(0).getChildByName("tabRedDot");
        var redDot1 = this.tabbarGroup.getTabBar(1).getChildByName("tabRedDot");
        if (Api.emperorAchieveVoApi.isShowKingAchieveRedDotByType(2)) {
            // this.tabbarGroup.addRedPoint(0);
            // this.tabbarGroup.setRedPos(0, this.tabbarGroup.getTabBar(0).width - 20, 17);
            redDot2.visible = true;
        }
        else {
            // this.tabbarGroup.removeRedPoint(0);
            redDot2.visible = false;
        }
        if (Api.emperorAchieveVoApi.isShowKingAchieveRedDotByType(1)) {
            redDot1.visible = true;
        }
        else {
            redDot1.visible = false;
        }
        if (Api.emperorAchieveVoApi.isUnlockOutFunc()) {
            if (Api.emperorAchieveVoApi.isShowAchieveOutRedDot()) {
                App.CommonUtil.addIconToBDOC(this._outBtnContainer);
                var redDot = this._outBtnContainer.getChildByName("reddot");
                redDot.setScale(1 / this._outBtnContainer.scaleX);
                redDot.setPosition(this._outBtnContainer.width * this._outBtnContainer.scaleX - 11, 36);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._outBtnContainer);
            }
        }
    };
    EmperorAchieveView.prototype.getRewardCallback = function (evt) {
        this.hideViewMask();
        if (evt && evt.data && evt.data.ret) {
            var rData = evt.data.data.data;
            var rewardVo = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
        this.refreshView();
    };
    EmperorAchieveView.prototype.outingCallback = function () {
        if (Api.emperorAchieveVoApi.isUnlockOutFunc()) {
            if (Api.emperorAchieveVoApi.isShowAchieveOutRedDot()) {
                App.CommonUtil.addIconToBDOC(this._outBtnContainer);
                var redDot = this._outBtnContainer.getChildByName("reddot");
                redDot.setScale(1 / this._outBtnContainer.scaleX);
                redDot.setPosition(this._outBtnContainer.width * this._outBtnContainer.scaleX - 11, 36);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._outBtnContainer);
            }
        }
    };
    EmperorAchieveView.prototype.playOpenFunAni = function (param) {
        if (param.data.callback) {
            this._callback = param.data.callback;
            this._obj = param.data.obj;
        }
        this.showOpenFunAni();
    };
    //mask
    EmperorAchieveView.prototype.showViewMask = function () {
        var touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    };
    EmperorAchieveView.prototype.hideViewMask = function () {
        var touchPos = this.getChildByName("yiyibusheTouchPos");
        if (touchPos) {
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    };
    EmperorAchieveView.prototype.getTitleButtomY = function () {
        return 0;
    };
    EmperorAchieveView.prototype.getBgName = function () {
        // return "decree_popbg";
        return null;
    };
    EmperorAchieveView.prototype.getTitleBgName = function () {
        return null;
    };
    EmperorAchieveView.prototype.getTitleStr = function () {
        return null;
    };
    EmperorAchieveView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    EmperorAchieveView.prototype.getRuleInfo = function () {
        return "";
    };
    EmperorAchieveView.prototype.getTabbarTextArrs = function () {
        return [
            "emperorAchieveTabName1", "emperorAchieveTabName2"
        ];
    };
    EmperorAchieveView.prototype.getTabbarNames = function () {
        return [
            "emperorachieve_tabbtn1", "emperorachieve_tabbtn2"
        ];
    };
    // 关闭按钮图标名称
    EmperorAchieveView.prototype.getCloseBtnName = function () {
        // return ButtonConst.POPUP_CLOSE_BTN_1;
        return null;
    };
    EmperorAchieveView.prototype.clickTabbarHandler = function (data) {
        App.LogUtil.log("index: " + data.index);
        var index = Number(data.index);
        if (this.checkTabCondition(index) == false) {
            // 重新checkTabCondition方法处理
            this.tabbarGroup.selectedIndex = this.selectedTabIndex;
            return;
        }
        if (index == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_ITEMVIEWTAB2);
        }
        this.lastSelectedTabIndex = this.selectedTabIndex;
        this.selectedTabIndex = index;
        this.changeTab();
        var lastTab = this.tabbarGroup.getTabBar(this.lastSelectedTabIndex);
        var curTab = this.tabbarGroup.getTabBar(index);
        var lastEff = lastTab.getChildByName("tabEffect");
        var currEff = curTab.getChildByName("tabEffect");
        lastEff.visible = false;
        currEff.visible = true;
    };
    EmperorAchieveView.prototype.setTabBarPosition = function () {
        if (this.tabbarGroup) {
            var tabX = 0;
            var tabY = 0;
            if (egret.is(this, "PopupView")) {
                tabX = this._viewBg.x + 45;
                tabY = this._viewBg.y + 60;
            }
            tabY += this.getTabbarGroupY();
            this.tabbarGroup.setPosition(tabX, tabY);
        }
    };
    EmperorAchieveView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                var tabIndex = this.getChildIndex(this.tabbarGroup);
                this.addChildAt(commViewTab, tabIndex + 1);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this._viewBg.x + 44, this.tabbarGroup.y + this.tabbarGroup.height);
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                var tabIndex = this.getChildIndex(this.tabbarGroup);
                this.addChildAt(tabView, tabIndex + 1);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    EmperorAchieveView.prototype.getShowHeight = function () {
        return 800;
    };
    EmperorAchieveView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_smalldescbg", "decree_popbg", "emperorachieve_get", "emperorachieve_itembg1", "emperorachieve_itembg2", "emperorachieve_lock", "emperorachieve_outbtn", "emperorachieve_outbtn_down", "emperorachieve_startbg", "emperorachieve_startdescbg", "emperorachieve_tabbtn1", "emperorachieve_tabbtn2", "emperorachieve_tabbtn3", "emperorachieve_tabbtn1_down", "emperorachieve_tabbtn2_down", "emperorachieve_tabbtn3_down", "emperorachieve_title", "emperorachieve_unlock_bigbtn", "emperorachieve_unlocktxt", "specialview_artbg", "emperorachieve_unlock_bigbtn_bg", "emperorachieve_unlock_bigbtn_name", "acgiftreturnview_common_skintxt", "acwealthcarpview_servantskintxt", "servant_skin_title_2", "servant_skin_title_3", "public_dot2"
        ]);
    };
    EmperorAchieveView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_GETREWARD, this.getRewardCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPERORACHIEVEREWARD_OPENFUN, this.playOpenFunAni, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_OUTING, this.outingCallback, this);
        this._outBtn = null;
        this._viewBg = null;
        this._callback = null;
        this._obj = null;
        this._outBtnContainer = null;
        _super.prototype.dispose.call(this);
    };
    return EmperorAchieveView;
}(PopupView));
__reflect(EmperorAchieveView.prototype, "EmperorAchieveView");
//# sourceMappingURL=EmperorAchieveView.js.map