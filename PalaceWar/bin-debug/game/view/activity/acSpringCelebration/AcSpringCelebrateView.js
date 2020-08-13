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
        this.curr_acNewYearVo = curr_acNewYearVo;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var _topBg = BaseBitmap.create("springcelerationbg_" + this.code);
        _topBg.y = -286 - 6;
        this.addChildToContainer(_topBg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal("acSpringCelebrateTime", [curr_acNewYearVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW2);
        this._activityTimerText.x = 250;
        this._activityTimerText.y = -180;
        this.addChildToContainer(this._activityTimerText);
        //杏花酒
        var springAlcohol1Text = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        springAlcohol1Text.text = LanguageManager.getlocal("springAlcohol1_" + this.code);
        this.addChildToContainer(springAlcohol1Text);
        // springAlcohol1Text.x= 260;  1111111
        springAlcohol1Text.y = -135;
        var xinghua = BaseBitmap.create("spring_small_nuerhong_" + this.code);
        // xinghua.x = springAlcohol1Text.x + springAlcohol1Text.width + 2;  2222222
        xinghua.y = springAlcohol1Text.y + springAlcohol1Text.height / 2 - xinghua.height / 2; //-145; 
        this.addChildToContainer(xinghua);
        //杏花酒数量
        var springAlcohol1NeedText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        springAlcohol1NeedText.text = Api.itemVoApi.getItemNumInfoVoById(this.getShowItem1()) + "";
        this.addChildToContainer(springAlcohol1NeedText);
        // springAlcohol1NeedText.x= xinghua.x+xinghua.width+2;   3333333
        springAlcohol1NeedText.y = springAlcohol1Text.y;
        this._springAlcohol1NeedText = springAlcohol1NeedText;
        //竹叶青
        var springAlcohol2Text = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        springAlcohol2Text.text = LanguageManager.getlocal("springAlcohol2_" + this.code);
        this.addChildToContainer(springAlcohol2Text);
        springAlcohol2Text.y = springAlcohol1Text.y;
        var nuerhong = BaseBitmap.create("spring_small_clcohol_" + this.code);
        nuerhong.y = xinghua.y;
        this.addChildToContainer(nuerhong);
        // 具体数量
        var springAlcohol2NeedText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        springAlcohol2NeedText.text = Api.itemVoApi.getItemNumInfoVoById(this.getShowItem2()) + ""; //"1";
        this.addChildToContainer(springAlcohol2NeedText);
        // springAlcohol2NeedText.x = 570;    //4444
        // nuerhong.x = springAlcohol2NeedText.x - 2 - nuerhong.width;   // 5555
        // springAlcohol2Text.x = nuerhong.x - 2 - springAlcohol2Text.width;  //6666
        //260 －－ 590  330
        var totalWidth = springAlcohol1Text.width + 5 + xinghua.width + 5 + springAlcohol1NeedText.width + 40 + springAlcohol2Text.width + 5 + nuerhong.width + 5 + springAlcohol2NeedText.width;
        springAlcohol1Text.x = 260 + 330 / 2 - totalWidth / 2;
        xinghua.x = springAlcohol1Text.x + springAlcohol1Text.width + 5;
        springAlcohol1NeedText.x = xinghua.x + xinghua.width + 5;
        springAlcohol2Text.x = springAlcohol1NeedText.x + springAlcohol1NeedText.width + 40;
        nuerhong.x = springAlcohol2Text.x + springAlcohol2Text.width + 5;
        springAlcohol2NeedText.x = nuerhong.x + nuerhong.width + 5;
        springAlcohol2NeedText.y = springAlcohol2Text.y;
        this._springAlcohol2NeedText = springAlcohol2NeedText;
        var promptText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        promptText.text = LanguageManager.getlocal("acspringcelebrate_des1_" + this.code);
        this.addChildToContainer(promptText);
        promptText.x = this._activityTimerText.x - 10; //450;
        promptText.y = this._activityTimerText.y + 85;
        //最底部背景
        var bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth + 16;
        bottomBg.height = GameConfig.stageHeigth - _topBg.height - _topBg.y - this.container.y + 9;
        bottomBg.x = -8;
        bottomBg.y = _topBg.height + _topBg.y - 4;
        this._nodeContainer.addChild(bottomBg);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = 135;
        public_dot1.y = this.tabbarGroup.y;
        this.public_dot1 = public_dot1;
        //红点2
        var public_dot2 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot2);
        ;
        public_dot2.x = 295;
        public_dot2.y = this.tabbarGroup.y;
        this.public_dot2 = public_dot2;
        //红点3
        var public_dot3 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot3);
        ;
        public_dot3.x = 455;
        public_dot3.y = this.tabbarGroup.y;
        this.public_dot3 = public_dot3;
        this.update();
    };
    AcSpringCelebrateView.prototype.getShowItem1 = function () {
        var showItem1 = 2103;
        if (this.code == "2" || this.code == "4") {
            showItem1 = 2105;
        }
        var cfg = this.curr_acNewYearVo.config;
        if (cfg && cfg.showItem) {
            showItem1 = cfg.showItem[0];
        }
        return showItem1;
    };
    AcSpringCelebrateView.prototype.getShowItem2 = function () {
        var showItem2 = 2104;
        if (this.code == "2" || this.code == "4") {
            showItem2 = 2106;
        }
        var cfg = this.curr_acNewYearVo.config;
        if (cfg && cfg.showItem) {
            showItem2 = cfg.showItem[1];
        }
        return showItem2;
    };
    AcSpringCelebrateView.prototype.useCallback = function (event) {
        if (event.data.ret) {
            var data = event.data.data.data;
            var replacerewards = data.replacerewards;
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
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
            this._springAlcohol1NeedText.text = Api.itemVoApi.getItemNumInfoVoById(this.getShowItem1()) + "";
        }
        if (this._springAlcohol2NeedText) {
            this._springAlcohol2NeedText.text = Api.itemVoApi.getItemNumInfoVoById(this.getShowItem2()) + "";
        }
    };
    AcSpringCelebrateView.prototype.changeViewTab = function () {
        // console.log("xxx");
        var data = [];
        data.index = 3;
        this.clickTabbarHandler(data, 1);
        this.tabbarGroup.selectedIndex = data.index;
    };
    AcSpringCelebrateView.prototype.clickTabbarHandler = function (data, type) {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (springCelebrateVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (type == 1) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_TAB);
        }
        _super.prototype.clickTabbarHandler.call(this, data);
    };
    AcSpringCelebrateView.prototype.getTabbarTextArr = function () {
        return ["acSpringCelebrateViewTab1_" + this.code,
            "acSpringCelebrateViewTab2_" + this.code,
            "acSpringCelebrateViewTab3_" + this.code,
            "acSpringCelebrateViewTab4_" + this.code,
        ];
    };
    AcSpringCelebrateView.prototype.getTabbarGroupY = function () {
        return 235;
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
            "spring_small_clcohol_" + this.code,
            "spring_small_nuerhong_" + this.code,
            "springcelerationbg_" + this.code,
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
//# sourceMappingURL=AcSpringCelebrateView.js.map