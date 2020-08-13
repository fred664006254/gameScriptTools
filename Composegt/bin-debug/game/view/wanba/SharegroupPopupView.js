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
var SharegroupPopupView = (function (_super) {
    __extends(SharegroupPopupView, _super);
    function SharegroupPopupView() {
        var _this = _super.call(this) || this;
        _this._shareType = 0;
        _this._isTask = false;
        _this._shareBtn = null;
        _this._rewardBtn = null;
        _this._numTxt = null;
        _this._numBg = null;
        _this._rewardContainer = [];
        /** 分享的次数 */
        _this._shareNum = 0;
        _this._shareTF = null;
        _this._allShareNum = 0;
        _this._reward = [];
        _this._receiveBM = null;
        _this._desTxt = null;
        _this._share2 = null;
        //是否触发了失败
        _this._shareFail = false;
        return _this;
    }
    Object.defineProperty(SharegroupPopupView.prototype, "vo", {
        get: function () {
            return Api.otherInfoVoApi.getTherealShareInfo();
        },
        enumerable: true,
        configurable: true
    });
    SharegroupPopupView.prototype.initView = function () {
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
    SharegroupPopupView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    /**
     * 重新一下title按钮
     * 仅适用于新的分享
     */
    SharegroupPopupView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重写 初始化viewbg
     * 仅适用于新的分享
     */
    SharegroupPopupView.prototype.initBg = function () {
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
    SharegroupPopupView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 510, this.viewBg.y + 50 + 32);
    };
    /**
     * 使用新的分享面板
     */
    SharegroupPopupView.prototype.showNewShareView = function () {
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE, this.getRewardHandler, this);
        //这块需要服务器返回次数和分享信息
        this._shareNum = this.vo.sharenum; //添加一个字段  是已经分享的次数
        this._allShareNum = Config.GameprojectCfg.rewardShareGroupNum;
        //分享的奖励列表
        this._reward = Config.GameprojectCfg.rewardShareGroup;
        //从左到右413    从右到左227       横向距离640
        var shareTF = ComponentManager.getTextField(LanguageManager.getlocal("shareGroupPopupViewShareGameTip"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
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
        var confirmBtn = ComponentManager.getButton("sharegroup_button_fenxiang", null, this.confirmBtnHandler, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 + 50 - confirmBtn.width, this.viewBg.y + this.viewBg.height - confirmBtn.height - 60);
        this.addChildToContainer(confirmBtn);
        this._shareBtn = confirmBtn;
        var rewardBtn = ComponentManager.getButton("sharegroup_button_reward", null, this.rewardBtnHandler, this);
        rewardBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 + 50, this.viewBg.y + this.viewBg.height - rewardBtn.height - 60);
        this.addChildToContainer(rewardBtn);
        this._rewardBtn = rewardBtn;
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
            numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareOver");
            // this._shareBtn.setVisible(false);
            // this._receiveBM.setVisible(true);
            this._rewardBtn.setGray(true);
        }
        else if (this.vo && this.vo.et && this.vo.et > GameData.serverTime) {
            var time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime, 1);
            numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareTime", [time]);
            this.tick();
            // this._shareBtn.setVisible(true);
            // this._shareBtn.setEnable(false);
            this._rewardBtn.setGray(true);
        }
        else {
            numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareNum", [String(this._allShareNum - this._shareNum)]);
            // this._shareBtn.setVisible(true);
            // this._shareBtn.setEnable(true);
            this._rewardBtn.setGray(false);
        }
        var numBg = BaseBitmap.create("public_lockbg");
        numBg.x = this._rewardBtn.x + this._rewardBtn.width / 2 - numBg.width / 2;
        numBg.y = this._rewardBtn.y - numBg.height;
        this._numBg = numBg;
        this.addChildToContainer(numBg);
        numTxt.setPosition(this._numBg.x + this._numBg.width / 2 - numTxt.width / 2, numBg.y + numBg.height / 2 - numTxt.height / 2);
        this.addChildToContainer(numTxt);
        this._numTxt = numTxt;
        if (PlatformManager.checkIsWxCfg()) {
            var desTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, 0xab9079);
            desTxt.text = LanguageManager.getlocal("shareGroupPopupViewDes");
            desTxt.setPosition(this.width / 2 - desTxt.width / 2, confirmBtn.y + confirmBtn.height + 40);
            this.addChildToContainer(desTxt);
            this._desTxt = desTxt;
            if (PlatformManager.checkIsWxSp() || PlatformManager.checkIsWxmgSp()) {
                var desTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
                desTxt2.text = LanguageManager.getlocal("wxgroupshareTip");
                desTxt2.setPosition(this.width / 2 - desTxt2.width / 2, desTxt.y + desTxt.height + 10);
                this.addChildToContainer(desTxt2);
            }
            var share2 = BaseBitmap.create("sharegroup_fenxiang02");
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
    SharegroupPopupView.prototype.updateView = function () {
        this._shareNum = this.vo.sharenum; //添加一个字段  是已经分享的次数
        if (this._shareNum >= 1) {
            if (this._desTxt) {
                this._desTxt.visible = false;
            }
            if (this._share2) {
                this._share2.visible = false;
            }
        }
        if (this.vo.et > GameData.serverTime) {
            var time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime, 1);
            this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareTime", [time]);
            // this._shareBtn.setVisible(true);
            // this._shareBtn.setEnable(false);
            // this._receiveBM.setVisible(false);
            // App.DisplayUtil.changeToNormal(this._buttonImage);
            // App.DisplayUtil.changeToGray(this._textLb);
            this._rewardBtn.setGray(true);
        }
        else if (this.vo.et <= GameData.serverTime) {
            this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareNum", [String(this._allShareNum - this._shareNum)]);
            // this._shareBtn.setVisible(true);
            // this._shareBtn.setEnable(true);
            // this._receiveBM.setVisible(false);
            this._rewardBtn.setGray(false);
        }
        if (this._shareNum >= this._allShareNum) {
            this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareOver");
            // this._rewardBtn.setVisible(false);
            this._rewardBtn.setGray(true);
            // this._receiveBM.setVisible(true);
        }
        // if(this._shareNum >= this._allShareNum)
        // {
        // 	this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareOver");
        // 	// this._shareBtn.setVisible(false);
        // 	this._rewardBtn.setVisible(false);
        // 	// this._receiveBM.setVisible(true);
        // 	// this._receiveBM.setScale(1.5);
        // 	// egret.Tween.get(this._receiveBM).to({scaleX:0.7,scaleY:0.7},200);
        // }
        // else if(this.vo && this.vo.et && this.vo.et > GameData.serverTime)
        // {
        // 	let time = App.DateUtil.getFormatBySecond(this.vo.et -GameData.serverTime,1);
        // 	this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareTime",[time]);
        // 	// this._shareBtn.setVisible(true);
        // 	this._rewardBtn.setVisible(true);
        // 	this._rewardBtn.setEnable(false);
        // 	// this._receiveBM.setVisible(false);
        // 	this.tick();	
        // }
        // else
        // {
        // 	this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareNum",[String(this._allShareNum - this._shareNum)]);
        // 	this._shareBtn.setVisible(true);
        // 	this._rewardBtn.setVisible(true);
        // 	this._rewardBtn.setEnable(true);
        // 	// this._receiveBM.setVisible(false);
        // }
        // this._numTxt.x = this._shareBtn.x + this._shareBtn.width / 2 - this._numTxt.width / 2;
        this._numTxt.x = this._numBg.x + this._numBg.width / 2 - this._numTxt.width / 2;
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
    SharegroupPopupView.prototype.fkcwShareCallback = function (data) {
        console.log("分享完毕");
        // this._shareFail = true;
        if (!this._shareFail) {
            App.CommonUtil.showTip(LanguageManager.getlocal("shareGroupPopupViewShareSuccess"));
        }
        // if(PlatformManager.checkIsQQXYXSp())
        // {
        // 	 egret.setTimeout(()=>{
        //                 this.qqShareCallback(null)
        //             },this,5000);
        // 	return;
        // }
        // console.log("fkcwShareCallback-->",data);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,this.gameShareRewardCallBack,this);
        // //分享成功,请求奖励
        // NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,{});
    };
    //分享延迟回调
    // private qqShareCallback(data:any):void
    // {
    // 	App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,this.gameShareRewardCallBack,this);
    // 	//分享成功,请求奖励
    // 	NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,{});
    // }
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
    SharegroupPopupView.prototype.confirmBtnHandler = function () {
        this._shareFail = false;
        if (PlatformManager.checkIsWxH5Chuansheng()) {
            // if(!PlatformManager.checkIsLocal()){
            var title = "皇上快点";
            var key = Math.floor(Math.random() * 2) + 1;
            // let imageurl = ServerCfg.getWxGameResourceUrl() + "other/share_guide_image/" + "shareWxH5chuansheng"+key+".jpg";
            var lastGang = document.baseURI.lastIndexOf("/");
            var imageurl = document.baseURI.substr(0, lastGang + 1) + "resource/other/share_guide_image/" + "shareWxH5chuansheng" + key + ".jpg";
            var desc = LanguageManager.getlocal("shareWxH5chuanshengDesc" + key);
            var tmpTsStr = Date.now().toString();
            var content = { shareType: App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG, title: title, desc: desc, imageurl: imageurl, ext: tmpTsStr };
            //传 share_ext
            RSDK.setShareInfo(content, PlatformManager.userId);
            // RSDKHelper.setShareInfoGuide(content2, GameData.userId.toString(),"000");
            // }
            this.showHand();
            return;
        }
        //本地
        if (PlatformManager.checkIsLocal()) {
            this.fkcwShareCallback(null);
            return;
        }
        var shareType = App.ShareGuideUtil.SHARETYPE_SHARE_RICHANG;
        if (this._isTask) {
            shareType = App.ShareGuideUtil.SHARETYPE_SHARE_GUIDE;
        }
        //分享  
        this.share(shareType, this.fkcwShareCallback, this);
    };
    SharegroupPopupView.prototype.share = function (shareType, callback, callbackThisObj) {
        var _this = this;
        if (RSDKHelper.isInit) {
            var tmpTsStr = Date.now().toString();
            var shareContent = { shareType: shareType, ext: tmpTsStr + "_" + Api.playerVoApi.getPlayerID() };
            console.log("sharecontent--->", shareContent);
            this.guideShare(shareContent, function (code, data) {
                //微信分享假失败
                console.log("分享code:" + code);
                if ((PlatformManager.checkIsWxmgSp() || PlatformManager.checkIsQQXYXSp()) && Api.switchVoApi.checkOpenWxShareFail()) {
                    var otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
                    if (otherinfo.firstshare != 1) {
                        //值发生改变
                        NetManager.request(NetRequestConst.REQUST_OTHERINFO_CHANGSHARE, { scene: "firstshare", changshare: 1 });
                        code = "1";
                    }
                    var ranIndex = App.MathUtil.getRandom(1, 5);
                    if (Number(code) == 0 && ranIndex == 1) {
                        code = "1";
                    }
                }
                if (Number(code) == 0) {
                    if (callback) {
                        callback.apply(callbackThisObj, [data]);
                    }
                }
                else {
                    _this._shareFail = true;
                    //分享失败
                    egret.setTimeout(function () {
                        App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
                    }, _this, 500);
                }
            });
        }
    };
    /**
     * 门客获得等专用的分享方法
     */
    SharegroupPopupView.prototype.guideShare = function (shareContent, callback) {
        // if (!shareId) {
        //     shareId = "000";
        // }
        // App.ShareGuideUtil.sharingId = shareId;
        // RSDK.setShareInfo(shareContent, GameData.userId.toString());
        if (PlatformManager.checkIsWanbaSp()) {
            shareContent.title = "皇上快点";
            shareContent.desc = "让好友看看你的女人有多美！";
        }
        if (PlatformManager.checkIsBaiduSp()) {
            shareContent.title = "皇上快点";
            shareContent.desc = "这游戏真的省钱 玩了1个月都没充值 原来当官的游戏都这么爽！ 3天就当王爷了！";
            shareContent.imageurl = "https://gd-h5ly-web01.leishenhuyu.com/share/baidushareicon.png";
        }
        if (PlatformManager.checkIsQQXYXSp()) {
            shareContent.title = "快来测试一下你的桃花运";
            // shareContent.desc = "有两个格格都想嫁给你 ";
            shareContent.imageurl = "https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg";
        }
        if (shareContent.shareType == App.ShareGuideUtil.SHARETYPE_SHARE_TWITTERDAILY) {
            // 日本twitter每日分享
            shareContent.title = "100万ダウンロード突破！人気RPGゲーム『日替わり内室』貴方だけの皇帝ライフを始めよう";
            shareContent.link = "https://gd-wanba-web01.leishenhuyu.com/image/sharelogo.jpg";
        }
        PlatformManager.analytics37Point("custom_social", "share_behavior", 1);
        RSDK.share(shareContent, callback);
    };
    SharegroupPopupView.prototype.rewardBtnHandler = function () {
        if (this.vo.et > GameData.serverTime) {
            return;
        }
        if (this._shareNum >= this._allShareNum) {
            return;
        }
        if (PlatformManager.isFromWxCard && PlatformManager.fromWxCardExt) {
            var data = PlatformManager.fromWxCardExt.split("_");
            var ext = data[0];
            var uid = data[1];
            var time = Number(ext);
            if (!App.DateUtil.checkIsToday(time)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("shareGroupPopupViewTodayShare"));
                return;
            }
            if (uid != String(Api.playerVoApi.getPlayerID())) {
                App.CommonUtil.showTip(LanguageManager.getlocal("shareGroupPopupViewMustMyself"));
                return;
            }
            var info = Api.otherInfoVoApi.getOtherInfo().info;
            var canReward = true;
            for (var key in info.therealshare.sharetime) {
                if (String(info.therealshare.sharetime[key]) == ext) {
                    canReward = false;
                    break;
                }
            }
            if (canReward) {
                // NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE, {thetime: PlatformManager.fromWxCardExt});
                this.request(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE, { thetime: ext });
                PlatformManager.isFromWxCard = false;
                PlatformManager.fromWxCardExt = null;
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("shareGroupPopupViewShared"));
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("shareGroupPopupViewMustGroup"));
        }
    };
    SharegroupPopupView.prototype.getRewardHandler = function (event) {
        if (event.data.data.ret === 0) {
            var data = event.data.data.data;
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                "rewards": data.rewards,
                "otherRewards": data.otherrewards,
                "isPlayAni": true,
            });
        }
        else {
            App.CommonUtil.showTip(event.data.data.ret);
        }
    };
    // private refreshRewardBtnHandler(){
    // 	if(this.vo.et > )
    // }
    SharegroupPopupView.prototype.showHand = function () {
        if (!this._handContainer) {
            this._handContainer = new BaseDisplayObjectContainer();
            this.addChild(this._handContainer);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            this._handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(this.hideMask, this);
            var clickHand = BaseBitmap.create("sharegroup_sharewxtip");
            // clickHand.skewY = 180;
            clickHand.x = GameConfig.stageWidth - clickHand.width - 15;
            clickHand.y = 3;
            this._handContainer.addChild(clickHand);
        }
        else {
            this._handContainer.visible = true;
        }
        // egret.Tween.get(this)
        // .wait(10000)
        // .call(()=>{
        // 	App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,this.gameShareRewardCallBack,this);
        // 	//分享成功,请求奖励
        // 	NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,{thetime: PlatformManager.fromWxCardExt});
        // });
    };
    SharegroupPopupView.prototype.hideMask = function () {
        if (this._handContainer) {
            this._handContainer.visible = false;
        }
    };
    SharegroupPopupView.prototype.tick = function () {
        if (this._numTxt != null && this.vo) {
            if (this.vo.et > GameData.serverTime) {
                var time = App.DateUtil.getFormatBySecond(this.vo.et - GameData.serverTime, 1);
                this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareTime", [time]);
                // this._shareBtn.setVisible(true);
                // this._shareBtn.setEnable(false);
                // this._receiveBM.setVisible(false);
                // App.DisplayUtil.changeToNormal(this._buttonImage);
                // App.DisplayUtil.changeToGray(this._textLb);
                this._rewardBtn.setGray(true);
            }
            else if (this.vo.et <= GameData.serverTime) {
                this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareNum", [String(this._allShareNum - this._shareNum)]);
                // this._shareBtn.setVisible(true);
                // this._shareBtn.setEnable(true);
                // this._receiveBM.setVisible(false);
                this._rewardBtn.setGray(false);
            }
            if (this._shareNum >= this._allShareNum) {
                this._numTxt.text = LanguageManager.getlocal("shareGroupPopupViewShareOver");
                this._rewardBtn.setGray(true);
                // this._rewardBtn.setVisible(false);
                // this._receiveBM.setVisible(true);
            }
            // this._numTxt.x = this._shareBtn.x + this._shareBtn.width / 2 - this._numTxt.width / 2;
            this._numTxt.x = this._numBg.x + this._numBg.width / 2 - this._numTxt.width / 2;
        }
    };
    // private sendShareSuccess():void
    // {	
    // 	this.hideMask();
    // 	this.requestRewardNewShare();
    // }
    SharegroupPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "collectflag",
            "sharegroup_button_fenxiang",
            // "sharegroup_button_guanbi2",
            "sharegroup_button_reward",
            "sharegroup_fenxiang02",
            "sharegroup_sharewxtip",
        ]);
    };
    SharegroupPopupView.prototype.getTitleStr = function () {
        return null;
    };
    // private requestReward():void
    // {
    // 	this.requestRewardNewShare();
    // }
    /**
     * 新的面板请求
     */
    // private requestRewardNewShare()
    // {
    // 	this.request(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE,{thetime: PlatformManager.fromWxCardExt});
    // }
    SharegroupPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.rewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SHAREGROUP_CHECK);
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
    SharegroupPopupView.prototype.closeHandler = function () {
        if (this._isTask) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                "needCancel": 1,
                "callback": this.hide,
                "msg": LanguageManager.getlocal("shareGroupPopupViewTip"),
                "canelTxt": "canelTxt",
                "handler": this
            });
        }
        else {
            this.hide();
        }
    };
    //奖励请求回调
    SharegroupPopupView.prototype.gameShareRewardCallBack = function (event) {
        console.log("gameShareRewardCallBack", event);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE, this.gameShareRewardCallBack, this);
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
    SharegroupPopupView.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_OTHERINFO_GETTHEREALSHARE, this.getRewardHandler, this);
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
        this._numBg = null;
        this._shareFail = false;
        egret.Tween.removeTweens(this);
        _super.prototype.dispose.call(this);
    };
    return SharegroupPopupView;
}(PopupView));
__reflect(SharegroupPopupView.prototype, "SharegroupPopupView");
