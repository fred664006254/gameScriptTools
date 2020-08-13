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
 * 分享窗口
 * 在很多地方分享
 * jiangliuyang
 *
 */
var ShareRecoverPopupView = (function (_super) {
    __extends(ShareRecoverPopupView, _super);
    function ShareRecoverPopupView() {
        var _this = _super.call(this) || this;
        //使用按钮
        _this._useBtn = null;
        //分享按钮
        _this._shareBtn = null;
        _this._shareTF1 = null;
        _this._shareTF2 = null;
        _this._shareTitle = null;
        _this._needItem = null;
        _this._info = null;
        _this._curShareId = "000";
        _this._numLb = null;
        ////////////////
        _this._type = null;
        _this._itemId = null;
        _this._hasNum = 0;
        _this._maxNum = 0;
        _this._index = 0;
        _this._wxshare = null;
        _this._callback = null;
        _this._target = null;
        _this._isShared = false;
        return _this;
    }
    // private get vo():any{
    // 	return Api.otherInfoVoApi.getGeneralShareInfo();
    // }
    ShareRecoverPopupView.prototype.initView = function () {
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refresh,this);
        //创建分享界面
        this.createShareView();
    };
    /**
     * 创建分享界面
     */
    ShareRecoverPopupView.prototype.createShareView = function () {
        //从配置中取得奖励数据
        this._needItem = null;
        var titleStr = null;
        var tipStr = null;
        var tipStr1 = null;
        var tipStr2 = null;
        switch (this._type) {
            case "a":
                //征收
                this._needItem = "6_1101_" + this._hasNum; // 征收令 Config.GameprojectCfg.rewardALL2;
                titleStr = LanguageManager.getlocal("shareManageRecoverTitle");
                tipStr = "";
                tipStr1 = LanguageManager.getlocal("shareRecoverManagerTip1");
                tipStr2 = LanguageManager.getlocal("shareRecoverManagerTip2");
                break;
            case "b":
                //出战令
                var hasNum = Api.itemVoApi.getItemNumInfoVoById("1090");
                this._needItem = "6_1090_" + hasNum;
                titleStr = LanguageManager.getlocal("shareChallengeRecoverTitle");
                tipStr = LanguageManager.getlocal("shareChallengeManagerTip");
                tipStr1 = LanguageManager.getlocal("shareChallengeManagerTip1");
                tipStr2 = LanguageManager.getlocal("shareChallengeManagerTip2");
                break;
        }
        var title = ComponentManager.getTextField(titleStr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        title.x = this.width / 2 - title.width / 2;
        title.y = this.viewBg.y + 66;
        this.addChild(title);
        var userBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE, "useBtn", this.useBtnClick, this, null, 3);
        // userBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        userBtn.x = 200 - userBtn.width / 2;
        userBtn.y = this.viewBg.y + 480;
        this.addChild(userBtn);
        var shareBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "shareRecoverShareBtn", this.shareBtnClick, this, null, 3);
        // userBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        shareBtn.x = 640 - 200 - shareBtn.width / 2;
        shareBtn.y = this.viewBg.y + 480;
        this._shareBtn = shareBtn;
        this.addChild(shareBtn);
        var rewardVo = GameData.formatRewardItem(this._needItem);
        // let needIcon = GameData.getItemIcon(rewardVo[0],true,false);
        var needIcon = BaseLoadBitmap.create("itemicon" + rewardVo[0].id);
        needIcon.width = 100;
        needIcon.height = 100;
        needIcon.setScale(0.8);
        needIcon.x = this.viewBg.x + 200 - needIcon.width * 0.8 / 2 - 12;
        needIcon.y = this.viewBg.y + 240 - needIcon.height * 0.8 / 2 + 20 - 13;
        this.addChild(needIcon);
        var numLb = ComponentManager.getTextField(String(rewardVo[0].num), 18, TextFieldConst.COLOR_BROWN);
        numLb.x = this.viewBg.x + 230;
        numLb.y = this.viewBg.y + 270;
        this.addChild(numLb);
        this._numLb = numLb;
        if (rewardVo[0].num == 0) {
            numLb.setColor(TextFieldConst.COLOR_WARN_RED);
        }
        var shareIcon = BaseBitmap.create("shareRecoverIcon");
        shareIcon.x = this.viewBg.x + 380;
        shareIcon.y = this.viewBg.y + 200;
        this.addChild(shareIcon);
        var tip = ComponentManager.getTextField(tipStr, 20, TextFieldConst.COLOR_BROWN);
        tip.width = 400;
        tip.x = 320 - tip.width / 2;
        tip.y = this.viewBg.y + 140 - tip.height / 2;
        this.addChild(tip);
        var tip1 = ComponentManager.getTextField(tipStr1, 20, TextFieldConst.COLOR_BROWN);
        tip1.width = 150;
        tip1.x = 200 - tip1.width / 2;
        tip1.y = this.viewBg.y + 370 - tip1.height / 2;
        this.addChild(tip1);
        var tip2 = ComponentManager.getTextField(tipStr2, 20, TextFieldConst.COLOR_BROWN);
        tip2.width = 150;
        tip2.x = 640 - 200 - tip2.width / 2;
        tip2.y = this.viewBg.y + 370 - tip2.height / 2;
        this.addChild(tip2);
    };
    ShareRecoverPopupView.prototype.getTitleStr = function () {
        return null;
    };
    ShareRecoverPopupView.prototype.useBtnClick = function () {
        if (this._type == "a") {
            if (this._hasNum > 0) {
                if (this._hasNum < 5) {
                    NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE, { type: this._index + 1, num: 1 });
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: this._itemId, hasNum: this._hasNum, callback: this._callback, handler: this._target });
                }
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW, { itemId: this._itemId, callback: null, handler: this });
            }
        }
        else {
            ////b
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, { type: ServantSelectedPopupView.TYPE_BATTLE, "info": this._info, callback: this._callback, handler: this._target });
        }
        this.hide();
    };
    ShareRecoverPopupView.prototype.manageItemCallbask = function () {
        if (this._callback != null && this._target != null) {
            egret.callLater(this._callback, this._target);
        }
        this.hide();
    };
    //点击分享按钮
    ShareRecoverPopupView.prototype.shareBtnClick = function () {
        /**判断是否为本地地址 */
        //test
        if (PlatformManager.checkIsLocal()) {
            //按钮重灰
            this.refreshShareSuccessView();
            this.shareSuccessCallback("0", {});
            // this.shareSuccessCallback("0",{groupId:"1234567890"});
            return;
        }
        this.confirmHandler();
    };
    ShareRecoverPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    ShareRecoverPopupView.prototype.getCloseBtnName = function () {
        return "btn_closebtn4";
    };
    //分享
    ShareRecoverPopupView.prototype.confirmHandler = function () {
        //是微信平台
        //test
        if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp()) {
            //微信平台分享次数统计
            // NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETSHARENUM,{type:this._type});
            var shareType = "";
            switch (this._type) {
                case "a":
                    // bgName = "shareBgWife";	
                    shareType = App.ShareGuideUtil.SHARETYPE_SHARE_JINGYING;
                    break;
                case "b":
                    // bgName = "shareBgChild";
                    shareType = App.ShareGuideUtil.SHARETYPE_SHARE_GUANKA;
                    break;
            }
            PlatformManager.share(shareType, this.shareSuccessCallback, this);
        }
        else {
            //分享失败
            App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
        }
    };
    //分享成功回调
    ShareRecoverPopupView.prototype.shareSuccessCallback = function (code, data) {
        this._isShared = true;
        //查看是否有分享界面
        //按钮重灰
        this.refreshShareSuccessView();
        if (this._type == "a") {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE, this.showReward, this);
            NetManager.request(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE, { shareFlag: 1 });
        }
        else if (this._type == "b") {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER, this.showReward, this);
            NetManager.request(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER, { shareFlag: 1 });
        }
    };
    //分享成功处理
    ShareRecoverPopupView.prototype.showReward = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER, this.showReward, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE, this.showReward, this);
        var r = event.data.data.ret;
        if (r == 0) {
            // if(event.data.data.data.groupexist){
            // 	console.log("分享到相同群了，不能获得奖励",event);
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("wxshareTip"));
            // 	this.refreshShareFailureView()
            // 	return;
            // }
            App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverSuccess"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_COUNT);
            // if(event.data.data.data.rewards)
            // {	
            // 	//分享成功后刷新界面
            // 	// this.refreshShareSuccessView()
            // 	//调用奖励界面
            // 	// ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverSuccess"));
            // } else {
            // 	//领取失败
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverFailed"));
            // }
        }
        else if (r == -3) {
            //已经领取过了
            App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverFailed"));
        }
        else {
            //领取失败
            App.CommonUtil.showTip(LanguageManager.getlocal("shareRecoverFailed"));
        }
        this.hide();
    };
    // public refresh(event?:egret.Event):void
    // {
    // }
    //分享成功后刷新界面
    ShareRecoverPopupView.prototype.refreshShareSuccessView = function () {
        //分享按钮禁用 并致灰色
        // this._shareBtn.setGray(true);
        this._shareBtn.setEnable(false);
    };
    //分享失败后按钮还原
    ShareRecoverPopupView.prototype.refreshShareFailureView = function () {
        //分享按钮禁用 并致灰色
        // this._shareBtn.setGray(false);
        this._shareBtn.setEnable(true);
    };
    /**
     * 重新一下title按钮
     * 仅适用于新的分享
     */
    ShareRecoverPopupView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重写 初始化viewbg
     * 仅适用于新的分享
     */
    ShareRecoverPopupView.prototype.initBg = function () {
        if (this.param != null) {
            this._type = this.param.data.type;
            this._itemId = this.param.data.itemId;
            this._hasNum = this.param.data.hasNum;
            this._maxNum = this.param.data.maxNum;
            this._index = this.param.data.index;
            this._wxshare = this.param.data.wxshare;
            this._callback = this.param.data.callback;
            this._target = this.param.data.target;
            this._info = this.param.data.info;
        }
        var bgName = null;
        var bgWidth = 0;
        var bgHeight = 0;
        bgName = "shareRecoverBg";
        bgWidth = 615;
        bgHeight = 594;
        this.viewBg = BaseLoadBitmap.create(bgName);
        this.viewBg.width = bgWidth;
        this.viewBg.height = bgHeight;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    ShareRecoverPopupView.prototype.resetBgSize = function () {
        this.closeBtn.x = this.viewBg.x + 570 - 7;
        this.closeBtn.y = this.viewBg.y + 40 - 5;
    };
    /**
     * 重写关闭方法
     * 仅适用于新的分享
     */
    ShareRecoverPopupView.prototype.closeHandler = function () {
        this.shareClose();
    };
    ShareRecoverPopupView.prototype.shareClose = function () {
        // if (this._callback != null && this._target != null){
        // 	// this._callback.call(this._target);
        // 	egret.callLater(this._callback,this._target)
        // }
        this.hide();
    };
    ShareRecoverPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shareRecoverIcon"
        ]);
    };
    ShareRecoverPopupView.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE),this.refresh,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CHALLENGE_SHARERECOVER, this.showReward, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MANAGE_SHAREFINANCE, this.showReward, this);
        this._shareTF1 = null;
        this._shareTF2 = null;
        this._shareBtn = null;
        this._needItem = null;
        this._type = null;
        this._itemId = null;
        this._hasNum = 0;
        this._maxNum = 0;
        this._index = 0;
        this._numLb = null;
        // this._lv = null;
        this._wxshare = null;
        this._callback = null;
        this._target = null;
        this._curShareId = "000";
        this._isShared = false;
        this._info = null;
        _super.prototype.dispose.call(this);
    };
    return ShareRecoverPopupView;
}(PopupView));
__reflect(ShareRecoverPopupView.prototype, "ShareRecoverPopupView");
