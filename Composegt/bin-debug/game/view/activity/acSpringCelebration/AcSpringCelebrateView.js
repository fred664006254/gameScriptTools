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
 * 春季活动
 */
var AcSpringCelebrateView = (function (_super) {
    __extends(AcSpringCelebrateView, _super);
    function AcSpringCelebrateView() {
        var _this = _super.call(this) || this;
        _this._activityTimerText = null;
        _this._springAlcohol1NeedText = null;
        _this._springAlcohol2NeedText = null;
        _this._topBgArr = [];
        _this.curr_acNewYearVo = null;
        _this.public_dot1 = null;
        _this.public_dot2 = null;
        _this.public_dot3 = null;
        return _this;
    }
    AcSpringCelebrateView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        App.MessageHelper.addEventListener(MessageConst.RESFESH_SPRING_TAB, this.changeViewTab, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMA), this.useCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMB), this.useCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMC), this.useCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMD), this.useCallback, this);
        AcSpringCelebrateView.AID = this.aid;
        AcSpringCelebrateView.CODE = this.code;
        var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var _topBg = BaseBitmap.create("springcelerationbg_" + this.code);
        _topBg.y = -380;
        this.addChildToContainer(_topBg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("acSpringCelebrateTime", [curr_acNewYearVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.x = 20;
        this._activityTimerText.y = -163;
        this.addChildToContainer(this._activityTimerText);
        //杏花酒  ||青梅
        var springAlcohol1Text = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        springAlcohol1Text.text = LanguageManager.getlocal("springAlcohol1_" + this.code);
        this.addChildToContainer(springAlcohol1Text);
        springAlcohol1Text.x = 135;
        springAlcohol1Text.y = -118;
        var xinghua = BaseBitmap.create("spring_small_nuerhong_" + this.code);
        xinghua.x = springAlcohol1Text.x + 70;
        xinghua.y = -130;
        this.addChildToContainer(xinghua);
        //杏花酒数量
        var springAlcohol1NeedText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        if (this.code == "2" || this.code == "4") {
            springAlcohol1NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2105) + "";
        }
        else {
            springAlcohol1NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2103) + "";
        }
        this.addChildToContainer(springAlcohol1NeedText);
        springAlcohol1NeedText.x = xinghua.x + xinghua.width + 12;
        springAlcohol1NeedText.y = springAlcohol1Text.y;
        this._springAlcohol1NeedText = springAlcohol1NeedText;
        //竹叶青  杏仁
        var springAlcohol2Text = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        springAlcohol2Text.text = LanguageManager.getlocal("springAlcohol2_" + this.code);
        this.addChildToContainer(springAlcohol2Text);
        springAlcohol2Text.x = 380;
        springAlcohol2Text.y = springAlcohol1Text.y;
        var nuerhong = BaseBitmap.create("spring_small_clcohol_" + this.code);
        nuerhong.x = springAlcohol2Text.x + 60;
        nuerhong.y = xinghua.y;
        this.addChildToContainer(nuerhong);
        // 具体数量
        var springAlcohol2NeedText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        if (this.code == "2" || this.code == "4") {
            springAlcohol2NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2106) + ""; //"1";
        }
        else {
            springAlcohol2NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2104) + ""; //"1";
        }
        this.addChildToContainer(springAlcohol2NeedText);
        springAlcohol2NeedText.x = nuerhong.x + nuerhong.width - 2;
        springAlcohol2NeedText.y = springAlcohol2Text.y;
        this._springAlcohol2NeedText = springAlcohol2NeedText;
        // let promptText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        // promptText.text = LanguageManager.getlocal("acspringcelebrate_des1_"+this.code);
        // this.addChildToContainer(promptText);
        // promptText.x =this._activityTimerText.x-10;//450;
        // promptText.y = this._activityTimerText.y+85;
        //最底部背景
        // let bottomBg = BaseBitmap.create("servant_bottombg");
        // bottomBg.width = GameConfig.stageWidth+16;
        // bottomBg.height = GameConfig.stageHeigth - _topBg.height - _topBg.y -this.container.y+9;
        // bottomBg.x = -8; 
        // bottomBg.y = _topBg.height + _topBg.y-4; 
        // this._nodeContainer.addChild(bottomBg); 
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        public_dot1.x = 127;
        public_dot1.y = this.tabbarGroup.y + 10;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = 277;
        public_dot2.y = this.tabbarGroup.y + 10;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = 437;
        public_dot3.y = this.tabbarGroup.y + 6;
        this.public_dot3 = public_dot3;
        this.update();
        var bg1 = BaseBitmap.create("public_9v_bg02");
        bg1.width = 640;
        bg1.height = GameConfig.stageHeigth - 485;
        bg1.x = 0;
        bg1.y = 445;
        this.addChild(bg1);
        var bg2 = BaseBitmap.create("public_9v_bg02");
        bg2.width = 640;
        bg2.height = GameConfig.stageHeigth - 485;
        bg2.x = 0;
        bg2.y = 445;
        this.addChild(bg2);
        var bottomBg = BaseBitmap.create("public_9v_bg03");
        bottomBg.width = 640;
        bottomBg.height = GameConfig.stageHeigth - 385;
        bottomBg.x = 0;
        bottomBg.y = 385;
        this.addChild(bottomBg);
        if (PlatformManager.checkHideIconByIP()) {
            this.tabbarGroup.setLocked(0, true);
        }
    };
    // (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
    AcSpringCelebrateView.prototype.checkTabCondition = function (index) {
        if (index == 0 && PlatformManager.checkHideIconByIP()) {
            return false;
        }
        return true;
    };
    AcSpringCelebrateView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            if (event.data.data.data.rewards == "11_4002_1") {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
            }
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards));
        }
    };
    AcSpringCelebrateView.prototype.update = function () {
        //第一页 红点
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (this.public_dot1) {
            this.public_dot1.visible = springCelebrateVo.getpublicRedhot1();
        }
        //第二页 红点
        if (this.public_dot2) {
            this.public_dot2.visible = springCelebrateVo.getpublicRedhot2();
        }
        //第三页 红点
        if (this.public_dot3) {
            this.public_dot3.visible = springCelebrateVo.getpublicRedhot3();
        }
        //第一页  杏花酒数量 
        if (this._springAlcohol1NeedText) {
            if (this.code == "2" || this.code == "4") {
                this._springAlcohol1NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2105) + "";
            }
            else {
                this._springAlcohol1NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2103) + "";
            }
        }
        if (this._springAlcohol2NeedText) {
            if (this.code == "2" || this.code == "4") {
                this._springAlcohol2NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2106) + "";
            }
            else {
                this._springAlcohol2NeedText.text = Api.itemVoApi.getItemNumInfoVoById(2104) + "";
            }
        }
    };
    AcSpringCelebrateView.prototype.changeViewTab = function () {
        var data = [];
        data.index = 3;
        this.clickTabbarHandler(data);
        this.tabbarGroup.selectedIndex = data.index;
    };
    AcSpringCelebrateView.prototype.clickTabbarHandler = function (data) {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (springCelebrateVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        _super.prototype.clickTabbarHandler.call(this, data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_TAB);
    };
    AcSpringCelebrateView.prototype.getTabbarTextArr = function () {
        return ["acSpringCelebrateViewTab1_" + this.code,
            "acSpringCelebrateViewTab2_" + this.code,
            "acSpringCelebrateViewTab3_" + this.code,
            "acSpringCelebrateViewTab4_" + this.code,
        ];
    };
    AcSpringCelebrateView.prototype.getTabbarGroupY = function () {
        return 295;
    };
    AcSpringCelebrateView.prototype.getRuleInfo = function () {
        return "acspringcelebrate_description_" + this.code;
    };
    AcSpringCelebrateView.prototype.goToRechargeHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    };
    AcSpringCelebrateView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "spring_arrow",
            "spring_sign",
            "spring_small_clcohol_1",
            "spring_small_clcohol_2",
            "spring_small_clcohol_3",
            "spring_small_clcohol_4",
            "spring_small_nuerhong_1",
            "spring_small_nuerhong_2",
            "spring_small_nuerhong_3",
            "spring_small_nuerhong_4",
            "springcelerationbg_1",
            "springcelerationbg_2",
            "springcelerationbg_3",
            "springcelerationbg_4",
            "activity_charge_red",
            "shopview_corner",
            "servant_bottombg",
        ]);
    };
    AcSpringCelebrateView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.RESFESH_SPRING_TAB, this.changeViewTab, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMA), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMB), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMC), this.useCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.ACTIVITY_GETSPRINGITEMD), this.useCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        this.public_dot1 = null;
        this.public_dot2 = null;
        this.public_dot3 = null;
        this._springAlcohol1NeedText = null;
        this._springAlcohol2NeedText = null;
        _super.prototype.dispose.call(this);
    };
    AcSpringCelebrateView.AID = null;
    AcSpringCelebrateView.CODE = null;
    return AcSpringCelebrateView;
}(AcCommonView));
__reflect(AcSpringCelebrateView.prototype, "AcSpringCelebrateView");
