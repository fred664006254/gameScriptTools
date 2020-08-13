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
var ShareCommonPopupView = (function (_super) {
    __extends(ShareCommonPopupView, _super);
    function ShareCommonPopupView() {
        var _this = _super.call(this) || this;
        _this._shareBtn = null;
        _this._rewardContainer = [];
        _this._shareTF1 = null;
        _this._shareTF2 = null;
        _this._reward = null;
        _this._curShareId = "000";
        ////////////////
        _this._type = null;
        _this._lv = null;
        _this._wxshare = null;
        _this._callback = null;
        _this._target = null;
        _this._isShared = false;
        return _this;
    }
    // private get vo():any{
    // 	return Api.otherInfoVoApi.getGeneralShareInfo();
    // }
    ShareCommonPopupView.prototype.initView = function () {
        //创建分享界面
        this.createShareView();
    };
    // protected getParent():egret.DisplayObjectContainer
    // {
    // 	if(this._type == ShareVoApi.TYPE_GRADE){
    // 		return LayerManager.maskLayer;
    // 	} else {
    // 		return LayerManager.panelLayer;
    // 	}
    // }
    /**
     * 创建分享界面
     */
    ShareCommonPopupView.prototype.createShareView = function () {
        //从配置中取得奖励数据
        this._reward = null;
        switch (this._type) {
            case "a":
                //wife
                this._reward = Config.GameprojectCfg.rewardALL2;
                break;
            case "b":
                //child
                this._reward = Config.GameprojectCfg.rewardAll3;
                break;
            case "c":
                //lv
                var rewardList = Config.GameprojectCfg.rewardAll4;
                this._reward = rewardList[this._lv];
                var curLv = Api.playerVoApi.getPlayerLevel();
                // let posX = 20;
                // if (Api.playerVoApi.getTitleid() > 0)
                // {
                // 	curLv = Api.playerVoApi.getTitleid();
                // 	posX = -10;
                // }
                var mask = BaseBitmap.create("shareNewMask");
                mask.x = this.width / 2 - mask.width / 2;
                mask.y = this.viewBg.y - 50;
                this.addChildToContainer(mask);
                var userContainer = Api.playerVoApi.getMyPortrait();
                userContainer.mask = mask;
                userContainer.x = this.width / 2 - 300 / 2 - 5; //posX;
                userContainer.name = "userContainer";
                this.addChildToContainer(userContainer);
                var fg = BaseLoadBitmap.create("shareNewFgLv");
                fg.width = 640;
                fg.height = 960;
                fg.x = this.viewBg.x;
                fg.y = this.viewBg.y - 48;
                this.addChildToContainer(fg);
                break;
        }
        var rewardVo = GameData.formatRewardItem(this._reward);
        var startX = this.viewBg.x + this.viewBg.width / 2 - (rewardVo.length * 108 * 0.8 + (rewardVo.length - 1) * 10) / 2;
        for (var i = 0; i < rewardVo.length; i++) {
            var reward = GameData.getItemIcon(rewardVo[i], true, true);
            reward.setScale(0.8);
            reward.x = startX + i * (reward.width * 0.8 + 10);
            reward.y = this.viewBg.y + 565 - 48;
            this.addChildToContainer(reward);
        }
        var confirmBtn = ComponentManager.getButton("firstchargebutton02", "sysConfirm", this.shareBtnClickEvent, this, null, 3);
        confirmBtn.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        switch (this._type) {
            case "a":
                // bgName = "shareBgWife";	
                confirmBtn.x = this.viewBg.x + this.viewBg.width / 2 - confirmBtn.width * confirmBtn.scaleX / 2;
                confirmBtn.y = this.viewBg.y + 750 - 48; //-48;
                break;
            case "b":
                // bgName = "shareBgChild";
                confirmBtn.x = this.viewBg.x + this.viewBg.width / 2 - confirmBtn.width * confirmBtn.scaleX / 2;
                confirmBtn.y = this.viewBg.y + 750 - 48; //-48;
                break;
            case "c":
                // bgName = "shareBgLv";
                confirmBtn.x = this.viewBg.x + this.viewBg.width / 2 - confirmBtn.width * confirmBtn.scaleX / 2;
                confirmBtn.y = this.viewBg.y + 750 - 48; //-48;
                break;
        }
        // confirmBtn.setColor(TextFieldConst.COLOR_BROWN);
        this.addChildToContainer(confirmBtn);
        this._shareBtn = confirmBtn;
        var title = ComponentManager.getTextField(LanguageManager.getlocal("wxshareTitle"), 28, TextFieldConst.COLOR_WHITE);
        title.x = this.width / 2 - title.width / 2;
        title.y = this.viewBg.y + 520 - 48; //-48;
        this.addChildToContainer(title);
        var desTxt2 = null;
        if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp()) {
            desTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("wxshareTip"), 22, 0xa85408);
            desTxt2.setPosition(this.width / 2 - desTxt2.width / 2, this.viewBg.y + 665 - 48); //-48);
            this.addChildToContainer(desTxt2);
        }
        var shareCommonWarnField = ComponentManager.getTextField(LanguageManager.getlocal("wxshareTip2"), 22, 0xff5134);
        shareCommonWarnField.x = this.viewBg.x + this.viewBg.width / 2 - shareCommonWarnField.width / 2;
        if (desTxt2) {
            shareCommonWarnField.y = desTxt2.y + desTxt2.height + 5;
        }
        else {
            shareCommonWarnField.y = this.viewBg.y + 677 - 48; //-48;
        }
        this.addChildToContainer(shareCommonWarnField);
    };
    ShareCommonPopupView.prototype.isShowOpenAni = function () {
        return false;
    };
    ShareCommonPopupView.prototype.getTitleStr = function () {
        return null;
    };
    //点击分享按钮
    ShareCommonPopupView.prototype.shareBtnClickEvent = function () {
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
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    ShareCommonPopupView.prototype.getCloseBtnName = function () {
        switch (this._type) {
            case "a":
                // bgName = "shareBgWife";	
                return "btn_closebtn3";
            case "b":
                // bgName = "shareBgChild";
                return "btn_closebtn3";
            case "c":
                // bgName = "shareBgLv";
                return "btn_win_closebtn";
        }
    };
    //分享
    ShareCommonPopupView.prototype.confirmHandler = function () {
        //是微信平台
        //test
        if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp()) {
            //微信平台分享次数统计
            NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETSHARENUM, { type: this._type, lv: this._lv });
            var shareType = "";
            switch (this._type) {
                case "a":
                    // bgName = "shareBgWife";	
                    shareType = App.ShareGuideUtil.SHARETYPE_SHARE_MEIREN;
                    break;
                case "b":
                    // bgName = "shareBgChild";
                    shareType = App.ShareGuideUtil.SHARETYPE_SHARE_HAIZI;
                    break;
                case "c":
                    // bgName = "shareBgLv";
                    shareType = App.ShareGuideUtil.SHARETYPE_SHARE_LVUP;
                    break;
            }
            var shareTitle = this._wxshare[4];
            var shareContent = this._wxshare[5];
            var shareId = this._wxshare[2];
            this._curShareId = shareId;
            var shareImgUrl = ServerCfg.getWxGameResourceUrl() + "other/share_guide_image/" + this._wxshare[3];
            var content = { shareType: shareType, title: shareTitle, desc: shareContent, imageurl: shareImgUrl };
            // RSDKHelper.guideShare(content,this.shareSuccessCallback.bind(this));
            PlatformManager.share(shareType, this.shareSuccessCallback, this);
        }
        else {
            //分享失败
            App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
        }
    };
    //分享成功回调
    ShareCommonPopupView.prototype.shareSuccessCallback = function (code, data) {
        this._isShared = true;
        //查看是否有分享界面
        //按钮重灰
        this.refreshShareSuccessView();
        var shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHARECOMMONPOPUPVIEW);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD, this.showReward, this);
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD, { type: this._type, lv: this._lv });
    };
    //分享成功处理
    ShareCommonPopupView.prototype.showReward = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETWXSHAREREWARD, this.showReward, this);
        var r = event.data.data.ret;
        if (r == 0) {
            // if(event.data.data.data.groupexist){
            // 	console.log("分享到相同群了，不能获得奖励",event);
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("wxshareTip"));
            // 	this.refreshShareFailureView()
            // 	return;
            // }
            if (event.data.data.data.rewards) {
                //分享成功后刷新界面
                // this.refreshShareSuccessView()
                //调用奖励界面
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, event.data.data.data.rewards);
            }
            else {
                //领取失败
                App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonReceiveFailed"));
            }
        }
        else if (r == -3) {
            //已经领取过了
            App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonReceived"));
        }
        else {
            //领取失败
            App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonReceiveFailed"));
        }
    };
    //分享成功后刷新界面
    ShareCommonPopupView.prototype.refreshShareSuccessView = function () {
        //分享按钮禁用 并致灰色
        // this._shareBtn.setGray(true);
        this._shareBtn.setEnable(false);
    };
    //分享失败后按钮还原
    ShareCommonPopupView.prototype.refreshShareFailureView = function () {
        //分享按钮禁用 并致灰色
        // this._shareBtn.setGray(false);
        this._shareBtn.setEnable(true);
    };
    /**
     * 重新一下title按钮
     * 仅适用于新的分享
     */
    ShareCommonPopupView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重写 初始化viewbg
     * 仅适用于新的分享
     */
    ShareCommonPopupView.prototype.initBg = function () {
        if (this.param != null) {
            this._type = this.param.data.type;
            this._lv = this.param.data.lv;
            this._wxshare = this.param.data.wxshare;
            this._callback = this.param.data.callback;
            this._target = this.param.data.target;
        }
        var bgName = null;
        var bgWidth = 0;
        var bgHeight = 0;
        switch (this._type) {
            case "a":
                bgName = "shareNewBgWife";
                bgWidth = 640;
                bgHeight = 960;
                break;
            case "b":
                bgName = "shareNewBgChild";
                bgWidth = 640;
                bgHeight = 960;
                break;
            case "c":
                bgName = "shareNewBgLv";
                bgWidth = 640;
                bgHeight = 960;
                break;
        }
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
    ShareCommonPopupView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width, this.viewBg.y - 5);
        this.closeBtn.setScale(0.85);
        switch (this._type) {
            case "a":
                // bgName = "shareBgWife";	
                this.closeBtn.x = this.viewBg.x + 490;
                this.closeBtn.y = this.viewBg.y + 100;
                break;
            case "b":
                //调整好的
                // bgName = "shareBgChild";
                this.closeBtn.x = this.viewBg.x + 500;
                this.closeBtn.y = this.viewBg.y + 40;
                break;
            case "c":
                // bgName = "shareBgLv";
                this.closeBtn.x = this.viewBg.x + 487;
                this.closeBtn.y = this.viewBg.y + 78;
                break;
        }
    };
    /**
     * 重写关闭方法
     * 仅适用于新的分享
     */
    ShareCommonPopupView.prototype.closeHandler = function () {
        if (this._isShared) {
            this.shareClose();
        }
        else {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                "needCancel": 1,
                // "callback":this.,
                "clickNotAutoHide": false,
                "cancelcallback": this.shareClose,
                "title": "confirmShareCollectTitle",
                "msg": LanguageManager.getlocal("confirmShareCollectOtherTip"),
                "canelTxt": "canelTxt",
                "handler": this
            });
        }
    };
    ShareCommonPopupView.prototype.shareClose = function () {
        if (this._callback != null && this._target != null) {
            // this._callback.call(this._target);
            egret.callLater(this._callback, this._target);
        }
        this.hide();
    };
    ShareCommonPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "firstchargebutton02",
            "shareNewMask"
        ]);
    };
    ShareCommonPopupView.prototype.dispose = function () {
        this._shareTF1 = null;
        this._shareTF2 = null;
        this._shareBtn = null;
        this._reward = null;
        this._type = null;
        this._lv = null;
        this._wxshare = null;
        this._callback = null;
        this._target = null;
        this._curShareId = "000";
        this._isShared = false;
        _super.prototype.dispose.call(this);
    };
    return ShareCommonPopupView;
}(PopupView));
__reflect(ShareCommonPopupView.prototype, "ShareCommonPopupView");
