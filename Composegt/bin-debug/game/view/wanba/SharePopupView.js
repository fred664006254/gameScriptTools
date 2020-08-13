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
var SharePopupView = (function (_super) {
    __extends(SharePopupView, _super);
    function SharePopupView() {
        var _this = _super.call(this) || this;
        _this._shareType = 0;
        _this._isTask = false;
        _this._shareBtn = null;
        _this._numTxt = null;
        _this._rewardContainer = [];
        /** 分享的次数 */
        _this._shareNum = 0;
        _this._shareTF = null;
        _this._allShareNum = 0;
        _this._reward = [];
        _this._receiveBM = null;
        _this._desTxt = null;
        _this._share2 = null;
        return _this;
    }
    Object.defineProperty(SharePopupView.prototype, "vo", {
        get: function () {
            return Api.otherInfoVoApi.getGeneralShareInfo();
        },
        enumerable: true,
        configurable: true
    });
    SharePopupView.prototype.initView = function () {
        if (this.param != null) {
            if (String(this.param.data.isTask) == "1") {
                this._isTask = true;
            }
        }
        this._shareType = PlatformManager.checkShare();
        this.showNewShareView();
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    SharePopupView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    /**
     * 重新一下title按钮
     * 仅适用于新的分享
     */
    SharePopupView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重写 初始化viewbg
     * 仅适用于新的分享
     */
    SharePopupView.prototype.initBg = function () {
        if (this.param != null) {
            if (String(this.param.data.isTask) == "1") {
                this._isTask = true;
            }
        }
        if (this._isTask) {
            this.viewBg = BaseLoadBitmap.create("share_fenxiang03");
        }
        else {
            this.viewBg = BaseLoadBitmap.create("share_fenxiang");
        }
        this.viewBg.width = 640;
        this.viewBg.height = 644;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    SharePopupView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 510, this.viewBg.y + 50 + 32);
    };
    /**
     * 使用新的分享面板
     */
    SharePopupView.prototype.showNewShareView = function () {
        //这块需要服务器返回次数和分享信息
        this._shareNum = this.vo.sharenum; //添加一个字段  是已经分享的次数
        this._allShareNum = Config.GameprojectCfg.rewardAllNum;
        //分享的奖励列表
        this._reward = Config.GameprojectCfg.rewardAll1;
        //从左到右413    从右到左227       横向距离640
        var shareTF = ComponentManager.getTextField(LanguageManager.getlocal("sharePopupViewShareGameTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        shareTF.anchorOffsetX = shareTF.width / 2;
        // shareTF.setPosition(this.viewBg.x + this.viewBg.width - 227,this.viewBg.y + shareTF.height + 95);
        shareTF.setPosition(400, this.viewBg.y + shareTF.height + 95 + 70);
        this.addChildToContainer(shareTF);
        this._shareTF = shareTF;
        var nextRewardIndex = 0;
        if (this._shareNum >= this._allShareNum) {
            nextRewardIndex = this._shareNum;
        }
        else {
            nextRewardIndex = this._shareNum + 1;
        }
        if (nextRewardIndex > this._reward.length) {
            nextRewardIndex = this._reward.length;
        }
        var rewardVo = GameData.formatRewardItem(this._reward[nextRewardIndex]);
        for (var i = 0; i < rewardVo.length; i++) {
            var reward = GameData.getItemIcon(rewardVo[i], true, true);
            reward.anchorOffsetX = reward.width / 2;
            reward.setScale(0.7);
            // reward.anchorOffsetY = reward.height  / 2;
            reward.setPosition(375 + (i % 3 - 1) * (reward.width - 20), this.viewBg.y + 230 + (Math.floor(i / 3) * (reward.height - 18)));
            this.addChildToContainer(reward);
            this._rewardContainer.push(reward);
        }
        var confirmBtn = ComponentManager.getButton("share_button_fenxiang", null, this.confirmBtnHandler, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - 65, this.viewBg.y + this.viewBg.height - confirmBtn.height - 90);
        this.addChildToContainer(confirmBtn);
        this._shareBtn = confirmBtn;
        var receiveBM = BaseBitmap.create("collectflag");
        receiveBM.anchorOffsetX = receiveBM.width / 2;
        receiveBM.anchorOffsetY = receiveBM.height / 2;
        receiveBM.setPosition(this._shareBtn.x + this._shareBtn.width / 2, this._shareBtn.y + this._shareBtn.height / 2);
        receiveBM.setScale(0.7);
        this.addChildToContainer(receiveBM);
        this._receiveBM = receiveBM;
        this._receiveBM.setVisible(false);
        //public_searchdescbg
        // let txtBg = BaseBitmap.create("public_searchdescbg");
        // txtBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - txtBg.width / 2,this.viewBg.y + this.viewBg.height + txtBg.height - 105);
        // this.addChildToContainer(txtBg);
        var numTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, 0xab9079);
        if (this._shareNum >= this._allShareNum) {
            numTxt.text = LanguageManager.getlocal("sharePopupViewShareOver");
            this._shareBtn.setVisible(false);
            this._receiveBM.setVisible(true);
        }
        else if (this.vo && this.vo.et && this.vo.et > GameData.serverTime) {
            var time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime, 1);
            numTxt.text = LanguageManager.getlocal("sharePopupViewShareTime", [time]);
            this.tick();
            this._shareBtn.setVisible(true);
            this._shareBtn.setEnable(false);
        }
        else {
            numTxt.text = LanguageManager.getlocal("sharePopupViewShareNum", [String(this._allShareNum - this._shareNum)]);
            this._shareBtn.setVisible(true);
            this._shareBtn.setEnable(true);
        }
        numTxt.setPosition(confirmBtn.x + confirmBtn.width / 2 - numTxt.width / 2, confirmBtn.y + confirmBtn.height + 10);
        this.addChildToContainer(numTxt);
        this._numTxt = numTxt;
        if (PlatformManager.checkIsWxCfg()) {
            var desTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, 0xab9079);
            desTxt.text = LanguageManager.getlocal("sharePopupViewDes");
            desTxt.setPosition(this.width / 2 - desTxt.width / 2, confirmBtn.y + confirmBtn.height + 40);
            this.addChildToContainer(desTxt);
            this._desTxt = desTxt;
            if (PlatformManager.checkIsWxSp()) {
                var desTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
                desTxt2.text = LanguageManager.getlocal("wxshareTip");
                desTxt2.setPosition(this.width / 2 - desTxt2.width / 2, desTxt.y + desTxt.height + 10);
                this.addChildToContainer(desTxt2);
            }
            var share2 = BaseBitmap.create("share_fenxiang02");
            this.addChildToContainer(share2);
            share2.setPosition(440, this.viewBg.y + 400 - 114);
            this._share2 = share2;
            if (this._shareNum >= 1) {
                this._share2.visible = false;
                this._desTxt.visible = false;
            }
        }
    };
    /**
     * 刷新新的分享面板的UI  处理返回消息之后的刷新处理
     */
    SharePopupView.prototype.updateView = function () {
        this._shareNum = this.vo.sharenum; //添加一个字段  是已经分享的次数
        if (this._shareNum >= 1) {
            if (this._desTxt) {
                this._desTxt.visible = false;
            }
            if (this._share2) {
                this._share2.visible = false;
            }
        }
        if (this._shareNum >= this._allShareNum) {
            this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareOver");
            this._shareBtn.setVisible(false);
            this._receiveBM.setVisible(true);
            this._receiveBM.setScale(1.5);
            egret.Tween.get(this._receiveBM).to({ scaleX: 0.7, scaleY: 0.7 }, 200);
        }
        else if (this.vo && this.vo.et && this.vo.et > GameData.serverTime) {
            var time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime, 1);
            this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareTime", [time]);
            this._shareBtn.setVisible(true);
            this._shareBtn.setEnable(false);
            this._receiveBM.setVisible(false);
            this.tick();
        }
        else {
            this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareNum", [String(this._allShareNum - this._shareNum)]);
            this._shareBtn.setVisible(true);
            this._shareBtn.setEnable(true);
            this._receiveBM.setVisible(false);
        }
        this._numTxt.x = this._shareBtn.x + this._shareBtn.width / 2 - this._numTxt.width / 2;
        //分享成功之后 刷新界面
        var nextRewardIndex = 0;
        if (this._shareNum >= this._allShareNum) {
            nextRewardIndex = this._shareNum;
        }
        else {
            nextRewardIndex = this._shareNum + 1;
        }
        if (nextRewardIndex > this._reward.length) {
            nextRewardIndex = this._reward.length;
        }
        var rewardVo = GameData.formatRewardItem(this._reward[nextRewardIndex]);
        for (var i = 0; i < rewardVo.length; i++) {
            this.container.removeChild(this._rewardContainer[i]);
        }
        this._rewardContainer = []; //清空数据
        for (var i = 0; i < rewardVo.length; i++) {
            var reward = GameData.getItemIcon(rewardVo[i], true, true);
            reward.anchorOffsetX = reward.width / 2;
            reward.setScale(0.7);
            // reward.anchorOffsetY = reward.height  / 2;
            reward.setPosition(375 + (i % 3 - 1) * (reward.width - 20), this.viewBg.y + 230 + (Math.floor(i / 3) * (reward.height - 18)));
            this.addChildToContainer(reward);
            this._rewardContainer.push(reward);
        }
    };
    //分享回调
    SharePopupView.prototype.fkcwShareCallback = function (data) {
        var _this = this;
        if (PlatformManager.checkIsQQXYXSp()) {
            egret.setTimeout(function () {
                _this.qqShareCallback(null);
            }, this, 5000);
            return;
        }
        console.log("fkcwShareCallback-->", data);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, this.gameShareRewardCallBack, this);
        //分享成功,请求奖励
        NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, {});
    };
    //分享延迟回调
    SharePopupView.prototype.qqShareCallback = function (data) {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, this.gameShareRewardCallBack, this);
        //分享成功,请求奖励
        NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, {});
    };
    // private fkcwShareCallback(data:any):void
    // {
    // console.log("fkcwShareCallback-->",data);
    // App.MessageHelper.addNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,this.gameShareRewardCallBack,this);
    // if(data&&PlatformManager.checkIsWxSp()){
    // if(!data.groupId){
    // 	App.CommonUtil.showTip(LanguageManager.getlocal("wxshareTip"));
    // 	console.log("没有分享到群里");
    // 	return;
    // } else {
    // 	console.log(11111);
    // 	NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{groupid:data.groupId});
    // }
    // } else {
    // 	console.log(222222);
    // 	NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{});
    // }
    // NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{});
    // let shareView = ViewController.getInstance().getView(ViewConst.POPUP.SHAREPOPUPVIEW)
    // if(shareView && shareView.isInit())
    // {
    // 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WANBA_SHARE_SUCCESS);
    // }
    // else{
    // 	if(data&&PlatformManager.checkIsWxSp()){
    // 		if(!data.groupId){
    // 			App.CommonUtil.showTip(LanguageManager.getlocal("wxshareTip"));
    // 			console.log("没有分享到群里");
    // 			return;
    // 		} else {
    // 			console.log(11111);
    // 			NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{groupid:data.groupId});
    // 		}
    // 	} else {
    // 		console.log(222222);
    // 		NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE,{});
    // 	}
    // }
    // }
    //点击分享按钮
    SharePopupView.prototype.confirmBtnHandler = function () {
        if (PlatformManager.checkIsWxH5Chuansheng()) {
            // if(!PlatformManager.checkIsLocal()){
            var title = "皇上快点";
            var key = Math.floor(Math.random() * 2) + 1;
            // let imageurl = ServerCfg.getWxGameResourceUrl() + "other/share_guide_image/" + "shareWxH5chuansheng"+key+".jpg";
            var lastGang = document.baseURI.lastIndexOf("/");
            var imageurl = document.baseURI.substr(0, lastGang + 1) + "resource/other/share_guide_image/" + "shareWxH5chuansheng" + key + ".jpg";
            var desc = LanguageManager.getlocal("shareWxH5chuanshengDesc" + key);
            var content = { shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG, title: title, desc: desc, imageurl: imageurl };
            // console.log(content);
            RSDK.setShareInfo(content, PlatformManager.userId);
            // RSDKHelper.setShareInfoGuide(content2, GameData.userId.toString(),"000");
            // }
            this.showHand();
            return;
        }
        //本地
        if (PlatformManager.checkIsLocal()) {
            this.requestRewardNewShare();
            return;
        }
        var shareType = App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG;
        if (this._isTask) {
            shareType = App.ShareGuideUtil.SHARETYPE_SHARE_GUIDE;
        }
        //分享  
        PlatformManager.share(shareType, this.fkcwShareCallback, this);
    };
    SharePopupView.prototype.showHand = function () {
        var _this = this;
        if (!this._handContainer) {
            this._handContainer = new BaseDisplayObjectContainer();
            this.addChild(this._handContainer);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            this._handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(this.hideMask, this);
            var clickHand = BaseBitmap.create("sharewxtip");
            // clickHand.skewY = 180;
            clickHand.x = GameConfig.stageWidth - clickHand.width - 15;
            clickHand.y = 3;
            this._handContainer.addChild(clickHand);
        }
        else {
            this._handContainer.visible = true;
        }
        egret.Tween.get(this)
            .wait(10000)
            .call(function () {
            App.MessageHelper.addNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, _this.gameShareRewardCallBack, _this);
            //分享成功,请求奖励
            NetManager.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, {});
        });
    };
    /*
    private showHand()
    {
        //本地
        if(PlatformManager.checkIsLocal())
        {

            this.requestRewardNewShare();
            return;
        }
        this._shareType = 3;
        if(this._shareType==2 || this._shareType==3)
        {
            if (this._shareType==3)
            {
                if(PlatformManager.checkIsWanbaFromWx())
                {
                    window["rsdkShareCallback"](0);
                }
                else
                {
                    PlatformManager.share(this.fkcwShareCallback,this);
                    return;
                }
            }

            if(!this._handContainer){
                this._handContainer = new BaseDisplayObjectContainer();
                this.addChild(this._handContainer)

                let maskBmp = BaseBitmap.create("public_9_viewmask");
                maskBmp.width=GameConfig.stageWidth;
                maskBmp.height=GameConfig.stageHeigth;
                maskBmp.touchEnabled = true;
                this._handContainer.addChild(maskBmp);
                maskBmp.addTouchTap(this.hideMask,this);

                let clickHand = BaseBitmap.create("guide_hand");
                clickHand.skewY = 180;
                clickHand.x = 590;
                clickHand.y = 10;
                this._handContainer.addChild(clickHand);

                egret.Tween.get(clickHand,{loop:true})
                    .to({y:60}, 500)
                    .to({y:10}, 500)

                let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
                getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
                getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
                getTxt.lineSpacing = 10;
                this._handContainer.addChild(getTxt);

            }
            else{
                this._handContainer.visible = true;
            }
        }
        else
        {
            this.confirmHandler();
        }
        
    }
    */
    SharePopupView.prototype.hideMask = function () {
        if (this._handContainer) {
            this._handContainer.visible = false;
        }
    };
    SharePopupView.prototype.tick = function () {
        if (this._numTxt != null && this.vo) {
            if (this.vo.et > GameData.serverTime) {
                var time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime, 1);
                this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareTime", [time]);
                this._shareBtn.setVisible(true);
                this._shareBtn.setEnable(false);
                this._receiveBM.setVisible(false);
            }
            else if (this.vo.et <= GameData.serverTime) {
                this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareNum", [String(this._allShareNum - this._shareNum)]);
                this._shareBtn.setVisible(true);
                this._shareBtn.setEnable(true);
                this._receiveBM.setVisible(false);
            }
            if (this._shareNum >= this._allShareNum) {
                this._numTxt.text = LanguageManager.getlocal("sharePopupViewShareOver");
                this._shareBtn.setVisible(false);
                this._receiveBM.setVisible(true);
            }
            this._numTxt.x = this._shareBtn.x + this._shareBtn.width / 2 - this._numTxt.width / 2;
        }
    };
    SharePopupView.prototype.confirmHandler = function () {
        // PlatformManager.share(this.requestReward,this);
    };
    SharePopupView.prototype.sendShareSuccess = function () {
        this.hideMask();
        this.requestRewardNewShare();
    };
    SharePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "collectflag"
        ]);
    };
    SharePopupView.prototype.getTitleStr = function () {
        return null;
    };
    SharePopupView.prototype.requestReward = function () {
        this.requestRewardNewShare();
    };
    /**
     * 新的面板请求
     */
    SharePopupView.prototype.requestRewardNewShare = function () {
        this.request(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, {});
    };
    SharePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.rewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
            }
            this.updateView();
            if (this._isTask) {
                this.hide();
            }
            this._isTask = false;
        }
    };
    /**
     * 重写关闭方法
     * 仅适用于新的分享
     */
    SharePopupView.prototype.closeHandler = function () {
        if (this._isTask) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                "needCancel": 1,
                "callback": this.hide,
                "msg": LanguageManager.getlocal("sharePopupViewTip"),
                "canelTxt": "canelTxt",
                "handler": this
            });
        }
        else {
            this.hide();
        }
    };
    //奖励请求回调
    SharePopupView.prototype.gameShareRewardCallBack = function (event) {
        console.log("gameShareRewardCallBack", event);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_OTHERINFO_GETGENERALSHARE, this.gameShareRewardCallBack, this);
        if (event.data.ret) {
            //获得奖励
            if (event.data.data.data.rewards) {
                //弹出奖励窗口
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, event.data.data.data.rewards);
                //刷新ui
                this.updateView();
            }
            //如果是新手引导分享 关闭窗口
            if (this._isTask) {
                this.hide();
            }
        }
    };
    SharePopupView.prototype.dispose = function () {
        this._handContainer = null;
        this._shareType = 0;
        this._isTask = false;
        this._rewardContainer = [];
        this._numTxt = null;
        this._shareNum = 0;
        this._shareTF = null;
        this._shareBtn = null;
        this._reward = [];
        this._allShareNum = null;
        this._receiveBM = null;
        this._desTxt = null;
        this._share2 = null;
        egret.Tween.removeTweens(this);
        _super.prototype.dispose.call(this);
    };
    return SharePopupView;
}(PopupView));
__reflect(SharePopupView.prototype, "SharePopupView");
