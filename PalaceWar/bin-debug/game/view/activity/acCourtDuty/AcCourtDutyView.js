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
 * 依生依世
 * author ycg
 * date 2019.10.28
 * @class AcCourtDutyView
 */
var AcCourtDutyView = (function (_super) {
    __extends(AcCourtDutyView, _super);
    function AcCourtDutyView() {
        var _this = _super.call(this) || this;
        _this._timeBg = null;
        _this._acTimeTf = null;
        _this._listHeight = 0;
        _this._dialogPanel = null;
        _this._infoBg = null;
        _this._tabBg = null;
        _this._flagBg = null;
        _this._selectDialogBtnIndex = 0;
        return _this;
    }
    AcCourtDutyView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK, this.getTaskCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        var infoBgStr = ResourceManager.hasRes("accourtduty_infobg-" + this.getTypeCode()) ? "accourtduty_infobg-" + this.getTypeCode() : "accourtduty_infobg-1";
        var infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width / 2 - infoBg.width / 2, this.titleBg.y + this.titleBg.height - 2);
        this.addChildToContainer(infoBg);
        this._infoBg = infoBg;
        var nameStr = "";
        if (this.code == "1") {
            nameStr = "itemName_3904";
        }
        var name = ComponentManager.getTextField(LanguageManager.getlocal(nameStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.anchorOffsetX = name.width / 2;
        name.setPosition(infoBg.x + 80, infoBg.y + infoBg.height - 40);
        this.addChildToContainer(name);
        //活动时间
        var acTime = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acTime.setPosition(infoBg.x + 150, infoBg.y + 20);
        this.addChildToContainer(acTime);
        //活动介绍
        var acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyInfo-" + this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 480;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(acTime.x, acTime.y + acTime.height + 3);
        this.addChildToContainer(acDesc);
        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
        this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height - 2;
        this.addChildToContainer(this._timeBg);
        this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);
        var tabBgStr = ResourceManager.hasRes("accourtduty_tabbg-" + this.getTypeCode()) ? "accourtduty_tabbg-" + this.getTypeCode() : "accourtduty_tabbg-1";
        var tabBg = BaseBitmap.create(tabBgStr);
        tabBg.setPosition(infoBg.x + infoBg.width / 2 - tabBg.width / 2, infoBg.y + infoBg.height);
        this.addChildToContainer(tabBg);
        this._tabBg = tabBg;
        var flagBgStr = ResourceManager.hasRes("accourtduty_flag-" + this.getTypeCode()) ? "accourtduty_flag-" + this.getTypeCode() : "accourtduty_flag-1";
        var flagBg = BaseBitmap.create(flagBgStr);
        flagBg.setPosition(infoBg.x + infoBg.width / 2 - flagBg.width / 2, infoBg.y + infoBg.height - 30);
        this._flagBg = flagBg;
        this._listHeight = GameConfig.stageHeigth - tabBg.y - tabBg.height;
        var tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarNames(), ["1", "2"], this.clickTabbarHandler, this, null, null, null, true);
        tabbarGroup.setSpace(200);
        tabbarGroup.setPosition(this.titleBg.x + this.titleBg.width / 2 - tabbarGroup.width / 2, tabBg.y + 0);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;
        this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        var tabIndex = this.getChildIndex(this.tabbarGroup);
        this.addChildAt(flagBg, tabIndex + 2);
        this.changeTab();
        this.initDialogPanel();
        this.freshView();
    };
    AcCourtDutyView.prototype.initDialogPanel = function () {
        var localKey = this.vo.aidAndCode + Api.playerVoApi.getPlayerID();
        var lastTime = LocalStorageManager.get(localKey);
        // LocalStorageManager.set(localKey, String(0));
        if (lastTime && App.DateUtil.checkIsToday(Number(lastTime))) {
            return;
        }
        this._flagBg.visible = false;
        var dialogPanel = new BaseDisplayObjectContainer();
        dialogPanel.width = GameConfig.stageWidth;
        dialogPanel.height = GameConfig.stageHeigth - this._infoBg.y - this._infoBg.height;
        dialogPanel.setPosition(0, this._infoBg.y + this._infoBg.height);
        var tmpIndex = this.getChildIndex(this.tabbarGroup);
        this.addChildAt(dialogPanel, tmpIndex + 2);
        dialogPanel.touchEnabled = true;
        this._dialogPanel = dialogPanel;
        //bg
        var bgStr = ResourceManager.hasRes("accourtduty_bg-" + this.getTypeCode()) ? "accourtduty_bg-" + this.getTypeCode() : "accourtduty_bg-1";
        var bg = BaseBitmap.create(bgStr);
        bg.width = GameConfig.stageWidth;
        bg.height = dialogPanel.height;
        bg.setPosition(0, 0);
        dialogPanel.addChild(bg);
        bg.name = "bg";
        //bottom
        var bottomBgStr = ResourceManager.hasRes("accourtduty_bottombg-" + this.getTypeCode()) ? "accourtduty_bottombg-" + this.getTypeCode() : "accourtduty_bottombg-1";
        var bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(dialogPanel.width / 2 - bottomBg.width / 2, dialogPanel.height - bottomBg.height);
        bottomBg.name = "bottomBg";
        // //对话
        // let tipContainer = new BaseDisplayObjectContainer();
        // tipContainer.setPosition(200, 100);
        // dialogPanel.addChild(tipContainer);
        // tipContainer.name = "tipContainer";
        // let tipBg = BaseBitmap.create("public_9_bg21");
        // tipBg.width = 400;
        // tipBg.setPosition(0, 0);
        // tipContainer.addChild(tipBg);
        // let tip = ComponentManager.getTextField("aaaaaaaaa", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // tip.width = tipBg.width - 20;
        // tipBg.height = tip.height + 40;
        // tipContainer.height = tipBg.height;
        // tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height/2 - tip.height/2);
        // tipContainer.addChild(tip);
        //按钮
        var btnContainer = new BaseDisplayObjectContainer();
        btnContainer.setPosition(360, 180);
        dialogPanel.addChild(btnContainer);
        btnContainer.name = "btnContainer";
        var btn1BgStr = ResourceManager.hasRes("accourtduty_circlebtn_1-" + this.getTypeCode()) ? "accourtduty_circlebtn_1-" + this.getTypeCode() : "accourtduty_circlebtn_1-1";
        var btn1 = ComponentManager.getButton(btn1BgStr, "", this.clickDialogBtnCallback, this, [0]);
        btn1.setPosition(0, 0);
        btnContainer.addChild(btn1);
        var btn2BgStr = ResourceManager.hasRes("accourtduty_circlebtn_2-" + this.getTypeCode()) ? "accourtduty_circlebtn_2-" + this.getTypeCode() : "accourtduty_circlebtn_2-1";
        var btn2 = ComponentManager.getButton(btn2BgStr, "", this.clickDialogBtnCallback, this, [1]);
        btn2.setPosition(btn1.x + btn1.width / 2 - 30, btn1.y + btn1.height + 50);
        btnContainer.addChild(btn2);
        var btn2Effect = ComponentManager.getCustomMovieClip("accourtduty_effect_circlelight", 10, 70);
        btn2Effect.blendMode = egret.BlendMode.ADD;
        btn2Effect.setPosition(btn2.x - 27, btn2.y - 17);
        btnContainer.addChild(btn2Effect);
        btn2Effect.playWithTime(0);
        //role
        var roleContainer = new BaseDisplayObjectContainer();
        dialogPanel.addChild(roleContainer);
        roleContainer.name = "roleContainer";
        roleContainer.setPosition(0, bottomBg.y + 55);
        var wifeSkinCfg = Config.WifeCfg.getWifeCfgById("234");
        var boneName = wifeSkinCfg.bone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var role = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            role.setScale(1);
            role.anchorOffsetY = role.height;
            role.anchorOffsetX = 0;
            role.x = 210;
            role.y = 0; //
            roleContainer.addChild(role);
        }
        else {
            var role = BaseLoadBitmap.create(wifeSkinCfg.body);
            role.width = 640;
            role.height = 840;
            role.anchorOffsetY = role.height;
            role.anchorOffsetX = 0;
            role.setScale(0.7);
            role.x = 10;
            role.y = 30;
            roleContainer.addChild(role);
        }
        //骨骼
        var snowBone = "accourtdutyview_snow";
        var snowBoneName = snowBone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && snowBoneName && RES.hasRes(snowBoneName) && App.CommonUtil.check_dragon()) {
            var snow = App.DragonBonesUtil.getLoadDragonBones(snowBone);
            snow.setScale(1);
            // snow.anchorOffsetY = 0;
            // snow.anchorOffsetX = 0;
            snow.x = 0;
            snow.y = 880; //880
            dialogPanel.addChild(snow);
        }
        dialogPanel.addChild(bottomBg);
        this.playDialogAni(true);
    };
    //点击对话按钮
    AcCourtDutyView.prototype.clickDialogBtnCallback = function (index) {
        App.LogUtil.log("clickdialog: " + index);
        this._selectDialogBtnIndex = index;
        this.playDialogAni(false);
    };
    //播放动画
    AcCourtDutyView.prototype.playDialogAni = function (isAniIn) {
        var _this = this;
        var bg = this._dialogPanel.getChildByName("bg");
        var bottomBg = this._dialogPanel.getChildByName("bottomBg");
        // let tipContainer = <BaseDisplayObjectContainer>this._dialogPanel.getChildByName("tipContainer");
        var btnContainer = this._dialogPanel.getChildByName("btnContainer");
        var roleContainer = this._dialogPanel.getChildByName("roleContainer");
        if (isAniIn) {
            this._flagBg.visible = false;
            bg.alpha = 1;
            bottomBg.alpha = 0;
            // tipContainer.alpha = 0;
            btnContainer.alpha = 0;
            roleContainer.alpha = 0;
            bottomBg.y = this._dialogPanel.height;
            // tipContainer.x = GameConfig.stageWidth;
            btnContainer.x = GameConfig.stageWidth;
            roleContainer.x = -GameConfig.stageWidth / 2;
            egret.Tween.get(bottomBg).wait(180).to({ y: this._dialogPanel.height - bottomBg.height, alpha: 1 }, 100); //180
            // egret.Tween.get(tipContainer).wait(100).to({x: 200, alpha: 1}, 300); //400
            egret.Tween.get(btnContainer).wait(120).to({ x: 360, alpha: 1 }, 280); //280
            egret.Tween.get(roleContainer).wait(100).to({ x: 0, alpha: 1 }, 300); //320
        }
        else {
            egret.Tween.get(bottomBg).wait(180).to({ y: this._dialogPanel.height, alpha: 0 }, 100); //180
            // egret.Tween.get(tipContainer).wait(100).to({x: GameConfig.stageWidth, alpha: 0}, 300); //400
            egret.Tween.get(btnContainer).wait(120).to({ x: GameConfig.stageWidth, alpha: 0 }, 280); //280
            egret.Tween.get(roleContainer).wait(100).to({ x: -GameConfig.stageWidth / 2, alpha: 0 }, 300); //320
            var view_1 = this;
            egret.Tween.get(bg).wait(300).to({ alpha: 0 }, 100).call(function () {
                var localKey = view_1.vo.aidAndCode + Api.playerVoApi.getPlayerID();
                LocalStorageManager.set(localKey, String(GameData.serverTime));
                if (_this.selectedTabIndex != _this._selectDialogBtnIndex) {
                    _this.tabbarGroup.selectedIndex = _this._selectDialogBtnIndex;
                    view_1.clickTabbarHandler({ index: _this._selectDialogBtnIndex });
                }
                view_1._dialogPanel.visible = false;
                _this._flagBg.visible = true;
            });
        }
    };
    AcCourtDutyView.prototype.changeTab = function () {
        var tabveiwClass = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex + 1));
        if (tabveiwClass) {
            var commViewTab = this.tabViewData[this.selectedTabIndex];
            if (commViewTab) {
                // this.addChild(commViewTab);
                var tmpIndex = this.getChildIndex(this.tabbarGroup);
                this.addChildAt(commViewTab, tmpIndex + 3);
                commViewTab.refreshWhenSwitchBack();
            }
            else {
                var tabView = new tabveiwClass(this.param);
                tabView.setPosition(this.container.x, this._tabBg.y + this._tabBg.height);
                this.tabViewData[this.selectedTabIndex] = tabView;
                tabView["param"] = this.param;
                // this.addChild(tabView);
                var tmpIndex = this.getChildIndex(this.tabbarGroup);
                this.addChildAt(tabView, tmpIndex + 1);
            }
            if (this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex]) {
                this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
            }
        }
    };
    AcCourtDutyView.prototype.getTaskCallback = function (evt) {
        if (evt && evt.data && evt.data.ret) {
            var rData = evt.data.data.data;
            if (rData) {
                var rewObj = GameData.formatRewardItem(rData.rewards);
                App.CommonUtil.playRewardFlyAction(rewObj);
                if (rData.replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            }
        }
    };
    AcCourtDutyView.prototype.freshView = function () {
        if (this.vo.isShowYaMenTaskRedDot() || this.vo.isShowUnlockYaMenRedDot()) {
            this.tabbarGroup.addRedPoint(0);
        }
        else {
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowHuangBangTaskRedDot() || this.vo.isShowUnlockHuangBangRedDot()) {
            this.tabbarGroup.addRedPoint(1);
        }
        else {
            this.tabbarGroup.removeRedPoint(1);
        }
    };
    AcCourtDutyView.prototype.getListHeight = function () {
        return this._listHeight;
    };
    AcCourtDutyView.prototype.tick = function () {
        this._acTimeTf.text = LanguageManager.getlocal("acCourtDutyTimeCountDown", [this.vo.getCountDown()]);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
        this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    };
    Object.defineProperty(AcCourtDutyView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCourtDutyView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCourtDutyView.prototype.getTypeCode = function () {
        return this.code;
    };
    AcCourtDutyView.prototype.getTabbarNames = function () {
        // let btnName1 = ResourceManager.hasRes("accourtduty_tabbtn_1-"+this.getTypeCode()) ? "accourtduty_tabbtn_1-"+this.getTypeCode() : "accourtduty_tabbtn_1-1";
        // let btnName2 = ResourceManager.hasRes("accourtduty_tabbtn_2-"+this.getTypeCode()) ? "accourtduty_tabbtn_2-"+this.getTypeCode() : "accourtduty_tabbtn_2-1";
        return ["accourtduty_tabbtn_1-1", "accourtduty_tabbtn_2-1"];
        // return "";
    };
    AcCourtDutyView.prototype.getTitleBgName = function () {
        return "accourtduty_titlebg-" + this.getTypeCode();
    };
    AcCourtDutyView.prototype.getTitleStr = function () {
        return null;
    };
    AcCourtDutyView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcCourtDutyView.prototype.getRuleInfo = function () {
        return "acCourtDutyRuleInfo-" + this.getTypeCode();
    };
    AcCourtDutyView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() == "1") {
            list = [
                "accourtduty_bg-1", "accourtduty_infobg-1", "accourtduty_bottombg-1", "accourtduty_chargetipbg-1", "accourtduty_flag-1",
                "accourtduty_tabbg-1", "accourtduty_unlock-1", "accourtduty_circlebtn_1-1", "accourtduty_circlebtn_1-1_down", "accourtduty_circlebtn_2-1", "accourtduty_circlebtn_2-1_down", "accourtduty_tabbtn_1-1", "accourtduty_tabbtn_1-1_down",
                "accourtduty_tabbtn_2-1", "accourtduty_tabbtn_2-1_down"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "activity_charge_red", "progress7_bg", "progress7", "accourtduty_txtbg", "guide_hand",
            "accourtduty_bg-" + this.getTypeCode(), "accourtduty_infobg-" + this.getTypeCode(), "accourtduty_bottombg-" + this.getTypeCode(), "accourtduty_chargetipbg-" + this.getTypeCode(), "accourtduty_flag-" + this.getTypeCode(),
            "accourtduty_tabbg-" + this.getTypeCode(), "accourtduty_unlock-" + this.getTypeCode(),
            "accourtduty_circlebtn_1-" + this.getTypeCode(), "accourtduty_circlebtn_1-" + this.getTypeCode() + "_down", "accourtduty_circlebtn_2-" + this.getTypeCode(), "accourtduty_circlebtn_2-" + this.getTypeCode() + "_down", "accourtduty_tabbtn_1-" + this.getTypeCode(), "accourtduty_tabbtn_1-" + this.getTypeCode() + "_down",
            "accourtduty_tabbtn_2-" + this.getTypeCode(), "accourtduty_tabbtn_2-" + this.getTypeCode() + "_down",
        ]).concat(list);
    };
    AcCourtDutyView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK, this.getTaskCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);
        this._timeBg = null;
        this._acTimeTf = null;
        this._dialogPanel = null;
        this._listHeight = 0;
        this._selectDialogBtnIndex = 0;
        this._infoBg = null;
        this._tabBg = null;
        this._flagBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcCourtDutyView;
}(AcCommonView));
__reflect(AcCourtDutyView.prototype, "AcCourtDutyView");
//# sourceMappingURL=AcCourtDutyView.js.map