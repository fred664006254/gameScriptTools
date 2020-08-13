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
 * 新七日签到
 * author jiangliuyang
 * date 2018/10/23
 * @class WifeView
 */
var SignUpView = (function (_super) {
    __extends(SignUpView, _super);
    function SignUpView() {
        var _this = _super.call(this) || this;
        _this._curTab = null;
        _this._detailBg = null;
        _this._itemList = [];
        _this._itemDataList1 = [];
        _this._itemDataList2 = [];
        _this._collectBtn = null;
        _this._signDay = 0;
        _this._curState = 0;
        _this._signupData = null;
        _this._signupRewardData = null;
        _this._signupRewardSharedData = null;
        _this._curIndex = 0;
        _this._flagList = [];
        _this._tabList = [];
        _this._checkBox = null;
        return _this;
    }
    Object.defineProperty(SignUpView.prototype, "vo", {
        get: function () {
            return Api.otherInfoVoApi.getArrivalNewInfo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignUpView.prototype, "cfg", {
        get: function () {
            return Config.SignupCfg;
        },
        enumerable: true,
        configurable: true
    });
    SignUpView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVALNEW), this.collectCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO, this.updateStatus, this);
        var title = BaseBitmap.create("signupview_title");
        title.x = this.viewBg.width / 2 - title.width / 2;
        title.y = this.viewBg.y + 5;
        this.addChild(title);
        this._signDay = this.vo.count;
        this._curState = this.vo.flag; //1已经签到  0没有签到
        this._signupData = this.cfg.getSignup();
        this._signupRewardData = this.cfg.getSignupReward();
        this._signupRewardSharedData = this.cfg.getSignupRewardShared();
        for (var i = 1; i < 8; i++) {
            var tab = new BaseDisplayObjectContainer();
            var tabBg = BaseBitmap.create("signupview_titlebg");
            tab.width = tabBg.width;
            tab.height = tabBg.height;
            tabBg.x = tab.width / 2 - tabBg.width / 2;
            tabBg.y = 0;
            tab.addChild(tabBg);
            var name_1 = BaseBitmap.create("signupview_name" + i);
            name_1.x = tab.width / 2 - name_1.width / 2;
            name_1.y = 11;
            tab.addChild(name_1);
            var iconStr = this._signupData[i];
            var rewardItem = GameData.formatRewardItem(iconStr)[0];
            if (rewardItem) {
                var icon = BaseLoadBitmap.create(rewardItem.icon);
                icon.width = 100;
                icon.height = 100;
                icon.setScale(0.7);
                icon.x = tab.width / 2 - icon.scaleX * icon.width / 2;
                icon.y = tab.height / 2 - icon.scaleY * icon.height / 2 + 4;
                tab.addChild(icon);
            }
            // let icon = BaseLoadBitmap.create();
            var flag = BaseBitmap.create("signupview_flag");
            flag.name = "flag";
            flag.visible = false;
            flag.x = tab.width / 2 - flag.width / 2;
            flag.y = tab.height / 2 - flag.height / 2;
            this._flagList.push(flag);
            tab.addChild(flag);
            var desc = ComponentManager.getTextField(LanguageManager.getlocal("signUpViewTabName" + i), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            desc.x = tab.width / 2 - desc.width / 2;
            desc.y = tab.height - desc.height - 9;
            tab.addChild(desc);
            tab.addTouchTap(this.tabHandler, this, [i]);
            tab.anchorOffsetX = tab.width / 2;
            tab.x = this.viewBg.x + this.viewBg.width / 2 - 480 / 2 + (i - 1) * (480 / 6);
            tab.y = this.viewBg.y + 105;
            if (this._curState == 0) {
                //不是当前天
                if (i != this._signDay + 1) {
                    tab.setScale(0.9);
                }
                else {
                    this._curTab = tab;
                }
            }
            else {
                //不是当前天
                if (i != this._signDay) {
                    tab.setScale(0.9);
                }
                else {
                    this._curTab = tab;
                }
            }
            this._tabList.push(tab);
            this.addChild(tab);
            if (this._curState == 0) {
                this.initDetail(this._signDay + 1);
            }
            else {
                this.initDetail(this._signDay);
            }
        }
        this.refreshFlag();
        // TickManager.removeTick(this.tick,this);
        // //启动定时器
        // TickManager.addTick(this.tick,this);
    };
    // private tick():void
    // {
    // console.log("tick-----",GameData.serverTime,Api.otherInfoVoApi.getLastday() + 24 * 3600);
    // if(GameData.serverTime > Api.otherInfoVoApi.getLastday() + 24 * 3600)
    // {
    // 	TickManager.removeTick(this.tick,this);
    // 	Api.otherInfoVoApi.setLastday(Api.otherInfoVoApi.getLastday() + 24 * 3600);
    // 	Api.otherInfoVoApi.refreshArrivalNewInfoFlag();
    // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_OTHERINFO_REFRESHVO);
    // } else {
    // 	return
    // }
    // }
    SignUpView.prototype.refreshFlag = function () {
        if (this._flagList.length != 7) {
            return;
        }
        for (var i = 1; i < 8; i++) {
            if (i <= this._signDay) {
                //之前天 已经领取
                this._flagList[i - 1].visible = true;
            }
            else {
                this._flagList[i - 1].visible = false;
            }
        }
    };
    //1,2,3,4,5,6,7
    SignUpView.prototype.initDetail = function (index, isDouble) {
        if (index > 7) {
            return;
        }
        if (index != null) {
            this._curIndex = index;
        }
        for (var i = 0; i < this._itemList.length; i++) {
            if (this._itemList[i].parent) {
                this.removeChild(this._itemList[i]);
            }
        }
        this._itemList = [];
        this._itemDataList1 = [];
        this._itemDataList2 = [];
        var itemData = null;
        if (isDouble == 1) {
            itemData = this._signupRewardData[this._curIndex];
        }
        else if (isDouble == 2) {
            itemData = this._signupRewardSharedData[this._curIndex];
        }
        else {
            itemData = this._signupRewardData[this._curIndex];
        }
        var rewardItemVos = GameData.formatRewardItem(itemData);
        var iconScale = 0.8;
        var spaceX = 16;
        var spaceY = 10;
        var iconWidth = 106;
        var iconHeight = 106;
        var startX = this.viewBg.width / 2 - (iconWidth * iconScale * 5 + spaceX * 4) / 2;
        var startY = this.viewBg.y + 580;
        for (var i = 0; i < rewardItemVos.length; i++) {
            var itemIcon = GameData.getItemIcon(rewardItemVos[i], true, false);
            itemIcon.setScale(iconScale);
            itemIcon.x = startX + (i % 5) * (spaceX + iconWidth * itemIcon.scaleX);
            itemIcon.y = startY + Math.floor(i / 5) * (spaceY + iconHeight * itemIcon.scaleX);
            this._itemList.push(itemIcon);
            this._itemDataList1.push(rewardItemVos[i]);
            this.addChild(itemIcon);
        }
        if (!this._detailBg) {
            this._detailBg = BaseLoadBitmap.create("signupview_daybg" + this._curIndex);
            this._detailBg.width = 527;
            this._detailBg.height = 272;
            this._detailBg.x = this.viewBg.width / 2 - this._detailBg.width / 2;
            this._detailBg.y = this.viewBg.y + 277;
            this.addChild(this._detailBg);
        }
        else {
            // this._detailBg.texture = ResourceManager.getRes("signupview_daybg"+index);
            this._detailBg.setload("signupview_daybg" + this._curIndex);
        }
        if (!this._collectBtn) {
            this._collectBtn = ComponentManager.getButton("firstchargebutton01", "signUpViewCollect", this.collectHandler, this);
            this._collectBtn.x = this.viewBg.width / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this.viewBg.y + this.viewBg.height - this._collectBtn.height - 23;
            this._collectBtn.setColor(TextFieldConst.COLOR_BROWN);
            this.addChild(this._collectBtn);
        }
        this._collectBtn.visible = true;
        if (this._curIndex <= this._signDay) {
            //之前天 已经领取
            this._collectBtn.setText("signUpViewCollected");
            this._collectBtn.setEnable(false);
        }
        else if (this._curIndex == this._signDay + 1 && this._curState == 1) {
            //当前天 已经领取
            this._collectBtn.visible = false;
        }
        else if (this._curIndex == this._signDay + 1 && this._curState == 0) {
            //当前天 可以领取
            this._collectBtn.setText("signUpViewCollect");
            this._collectBtn.setEnable(true);
        }
        else {
            this._collectBtn.visible = false;
        }
        // if(this._collectBtn.visible){
        // }
        if (isDouble == null) {
            this.checkShowGetBtn();
        }
    };
    SignUpView.prototype.checkShowGetBtn = function () {
        if (PlatformManager.checkGetShare()) {
            // 显示勾选分享
            if (!this._checkBox) {
                this._checkBox = ComponentManager.getCheckBox(LanguageManager.getlocal("shareFriendDoubleText"), false, 18, 0xc2aca0, "public_select_down3", "public_select3");
                this._checkBox.x = this._collectBtn.x + this._collectBtn.width + 20;
                this._checkBox.y = this._collectBtn.y + this._checkBox.height / 2 - 5;
                this._checkBox.setSelected(true);
                this.addChild(this._checkBox);
            }
            this._checkBox.setCallback(this.checkBoxCallback, this);
            this._checkBox.visible = this._collectBtn.visible;
            if (this._checkBox.visible) {
                this._checkBox.visible = this._collectBtn.isEnable();
            }
            if (this._checkBox.visible) {
                // this.setShareGiftNum(true);
                if (this._checkBox.checkSelected()) {
                    this.initDetail(null, 2);
                }
                else {
                    this.initDetail(null, 1);
                }
            }
        }
    };
    SignUpView.prototype.checkBoxCallback = function (isSelect) {
        if (isSelect) {
            // this.setShareGiftNum(true);
            this.initDetail(null, 2);
        }
        else {
            // this.setShareGiftNum(false);
            this.initDetail(null, 1);
        }
    };
    // private setShareGiftNum(isDouble:boolean):void{
    // 	// this._itemList.push(itemIcon);
    // 	for(let i = 0;i < this._itemList.length; i ++){
    // 		let itemIcon:BaseDisplayObjectContainer = this._itemList[i];
    // 		let itemData:RewardItemVo = this._itemDataList1[i];
    // 		let showNum:number = itemData.num;
    // 		let numLb:BaseTextField = <BaseTextField>itemIcon.getChildByName("numLb");
    // 		numLb.text = String(showNum);
    // 		let iconBg:BaseBitmap = <BaseBitmap>itemIcon.getChildByName("iconBg");
    // 		numLb.setPosition(iconBg.width - 3 - numLb.width, iconBg.height - 3 - numLb.height );
    // 	}
    // }
    SignUpView.prototype.updateStatus = function () {
        this._signDay = this.vo.count;
        this._curState = this.vo.flag;
        var event = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
        var clickTabNum = 0;
        if (this._curState == 0) {
            // this.initDetail(this._signDay + 1);
            clickTabNum = this._signDay + 1;
        }
        else {
            // this.initDetail(this._signDay);
            clickTabNum = this._signDay;
        }
        if (clickTabNum > 7) {
            clickTabNum = 7;
        }
        if (this._tabList.length > 0) {
            this._tabList[clickTabNum - 1].dispatchEvent(event);
        }
        this.refreshFlag();
    };
    SignUpView.prototype.tabHandler = function (event, p) {
        if (this._curTab) {
            this._curTab.setScale(0.9);
        }
        this._curTab = event.target;
        this._curTab.setScale(1);
        this.initDetail(p);
    };
    SignUpView.prototype.hide = function () {
        if (this.param) {
            this._isOpen = this.param.data;
        }
        if (this._isOpen) {
            _super.prototype.hide.call(this);
            //限时红颜 和 首充的强弹
            if (Api.switchVoApi.checkOpenShowPopupWin()) {
                if (Api.switchVoApi.checkClosePay()) {
                    return;
                }
                if (GameData.checkTimeLimitWife()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEVIEW);
                }
                else {
                    if (Api.shopVoApi.getPayFlag() != 2 && Api.servantVoApi.getServantObj("1033") == null) {
                        ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
                    }
                }
            }
        }
        else {
            _super.prototype.hide.call(this);
        }
    };
    SignUpView.prototype.collectCallback = function (event) {
        var data = event.data.data.data;
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        var pos = this._collectBtn.localToGlobal(this._collectBtn.width / 2, 50);
        App.CommonUtil.playRewardFlyAction(rList, pos);
    };
    SignUpView.prototype.collectHandler = function (event) {
        if (PlatformManager.checkGetShare()) {
            if (this._checkBox && this._checkBox.checkSelected()) {
                this.shareCollect();
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    "needCancel": 1,
                    // "callback":this.,
                    "clickNotAutoHide": false,
                    "cancelcallback": this.commonCollect,
                    "title": "confirmShareCollectTitle",
                    "msg": LanguageManager.getlocal("confirmShareCollectSignTip"),
                    "canelTxt": "canelTxt",
                    "handler": this
                });
            }
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW, {});
        }
        // if(this._checkBox && this._checkBox.checkSelected()){
        // 	// console.log("分享");
        // 	PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_SEVENDAYAUTO,()=>{},this);
        // }
        // // console.log("领取");
        // NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW,{});
    };
    SignUpView.prototype.shareCollect = function () {
        if (PlatformManager.checkIsLocal()) {
            NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW, { shareFlag: 1 });
        }
        else {
            PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_SEVENDAYAUTO, function () {
                NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW, { shareFlag: 1 });
            }, this);
        }
    };
    SignUpView.prototype.commonCollect = function () {
        NetManager.request(NetRequestConst.REQUEST_USER_ARRIVALNEW, {});
    };
    /**
     * 重写 初始化viewbg
     *
     */
    SignUpView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("signupview_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 861;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重新一下关闭按钮
     *
     */
    SignUpView.prototype.getCloseBtnName = function () {
        return "load_closebtn";
    };
    SignUpView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10, this.viewBg.y + 50);
    };
    SignUpView.prototype.getTitleStr = function () {
        return null;
    };
    SignUpView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton01"
        ]);
    };
    SignUpView.prototype.dispose = function () {
        // TickManager.removeTick(this.tick,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_ARRIVALNEW), this.collectCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_OTHERINFO_REFRESHVO, this.updateStatus, this);
        this._curTab = null;
        this._detailBg = null;
        this._itemList = [];
        this._itemDataList1 = [];
        this._itemDataList2 = [];
        this._collectBtn = null;
        this._signDay = 0;
        this._curState = 0;
        this._signupData = null;
        this._signupRewardData = null;
        this._signupRewardSharedData = null;
        this._curIndex = 0;
        this._flagList = [];
        this._tabList = [];
        this._isOpen = false;
        this._checkBox = null;
        _super.prototype.dispose.call(this);
    };
    return SignUpView;
}(PopupView));
__reflect(SignUpView.prototype, "SignUpView");
