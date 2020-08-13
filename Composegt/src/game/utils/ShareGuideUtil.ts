namespace App
{
    /**
     * 获得门客红颜等的分享引导工具类
     * @author 赵占涛
     */
 	export class ShareGuideUtil 
	{


        public static readonly SHARETYPE_SHARE_HAIZI="share_haizi";             //情景强弹分享第一次生孩子弹出
        public static readonly SHARETYPE_SHARE_RICHANG="share_richang";         //府邸常驻每日5次分享
        public static readonly SHARETYPE_SHARE_MEIREN="share_meiren";           //情景强弹分享第一次迎娶非小怜红颜弹出
        public static readonly SHARETYPE_SHARE_MENKE="share_menke";             //情景强弹分享第一次获得门客弹出
        public static readonly SHARETYPE_SHARE_GUIDE="share_guide";             //新手引导阶段送v3的强弹分享
        public static readonly SHARETYPE_SHARE_LVUP="share_lvup";               //情景强弹分享官品提升弹出
        public static readonly SHARETYPE_SHARE_MENKEAUTO="share_menke.auto";    //获得门客时默认勾选的自动分享
        public static readonly SHARETYPE_SHARE_MEIRENAUTO="share_meiren.auto";  //获得红颜时默认勾选的自动分享
        public static readonly SHARETYPE_SHARE_INVITE="share_invite";           //邀请好友分享
        public static readonly SHARETYPE_SHARE_SEVENDAYAUTO="share_sevenday.auto";  //七天自动分享
        
        public static readonly SHARETYPE_SHARE_GUANKA="share_guanka";             //关卡分享
        public static readonly SHARETYPE_SHARE_JINGYING="share_jingying";            //经营分享
        public static readonly SHARETYPE_SHARE_TWITTERDAILY="share_twitterdaily";            //twitter每日分享


        /** 官位提升 */
        public static readonly TYPE_PROMOTION="a";
        /** 门客获得 */
        public static readonly TYPE_SERVANTGET="b";
        /** 红颜获得 */
        public static readonly TYPE_WIFEGET="c";
        /** 子嗣获得 */
        public static readonly TYPE_CHILDGET="d";
        /** 子嗣联姻 */
        public static readonly TYPE_CHILDMARRY="e";
        /** 分享方案 */
        private static shareGuideCfg:any;
        /** 状态变量，标记当时是否正在分享 */
        public static sharingType:string = "";
        /** 向后端发送的时候的场景 */
        private static _sendSceneType={
            a: "levelup",
            b: "servantget",
            c: "wifeget",
            d: "childget",
            e: "childmarry"
        };
        /** 正在分享的方案id (不只是情景分享，所有的都算）*/
        public static sharingId:string = "";
        /**
         * addShareNode
         */
        public static addShareNode(parentNode, type) {
            if(1==1){
                return;
            }
            if (Api.switchVoApi.checkOpenShareGate()) {
                //分享按钮
                let shareBtn = ComponentManager.getButton("shareBtn","",this.shareBtnClickHandler,this,[parentNode, type]);
                shareBtn.x = GameConfig.stageWidth - shareBtn.width - 20;
                shareBtn.y = PlatformManager.hasSpcialCloseBtn()? 100 : 20;
                parentNode.addChild(shareBtn);


                // let shareEffect = ComponentManager.getCustomMovieClip("fenxiang_",15,1000/15);
                // shareEffect.setScale(1.9);
                // shareEffect.setPosition(shareBtn.width/2 - 59*shareEffect.scaleX/2, shareBtn.height/2 - 60*shareEffect.scaleY/2 - 2);
                // shareBtn.addChild(shareEffect);
                // shareEffect.playWithTime(0);

                if (Api.switchVoApi.checkOpenShareReward() && Api.otherInfoVoApi.getShareGuideCount() < Config.SharerewardCfg.maxReward) {
                    // 奖励
                    let rewardNode = new BaseDisplayObjectContainer();
                    // 奖励的元素的x点。
                    let rewardNodeXPoint = 0;
                    let rewardStr = LanguageManager.getlocal("taskReward");
                    let rewardText = ComponentManager.getTextField(rewardStr,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                    rewardText.x = rewardNodeXPoint;
                    rewardNodeXPoint += rewardText.width;
                    rewardNode.addChild(rewardText);
                    let rewards = GameData.formatRewardItem(Config.SharerewardCfg.shareReward);
                    for(let i = 0; i < rewards.length; i++) {
                        rewardStr += (" " + rewards[i].name + "x" + rewards[i].num) + rewards[i].icon
                        //奖励图标
                        let shareRewardIcon = BaseLoadBitmap.create(rewards[i].icon);
                        shareRewardIcon.x = rewardNodeXPoint;
                        shareRewardIcon.y = -10;
                        shareRewardIcon.scaleX = 0.4;
                        shareRewardIcon.scaleY = 0.4;
                        rewardNodeXPoint += 40;
                        rewardNode.addChild(shareRewardIcon);
                        // 数量
                        let rewardNum = ComponentManager.getTextField("x" + rewards[i].num,TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                        rewardNum.x = rewardNodeXPoint;
                        rewardNodeXPoint += rewardNum.width;
                        rewardNode.addChild(rewardNum);
                    }
                    // 奖励框
                    let sharePop = BaseBitmap.create("shareRewardPop");
                    sharePop.width = rewardNodeXPoint + 20;
                    sharePop.height = rewardText.height + 30;
                    sharePop.x = shareBtn.x-sharePop.width + shareBtn.width;
                    sharePop.y = shareBtn.y+100 ;
                    parentNode.addChild(sharePop);
                    rewardNode.x = sharePop.x + 10;
                    rewardNode.y = sharePop.y + 20;
                    parentNode.addChild(rewardNode);
                }
                // 如果还没分享方案，就获取一下
                if (!this.shareGuideCfg) {
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDE), this.getShareGuideCallback, this);

                    NetManager.request(NetRequestConst.REQUEST_GETSHAREGUIDE, {});
                }

                NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[type], operate:"appear"});
            }
        }
        // 获取分享方案的回调
        private static getShareGuideCallback(event: egret.Event)
        {
            if (event.data.ret) {
                this.shareGuideCfg = [];
                let shareArr = event.data.data.data.shareguide;
                
                for(let i = 0; i < shareArr.length; i++) {
                    if (!this.shareGuideCfg[shareArr[i][2]]) {
                        this.shareGuideCfg[shareArr[i][2]] = [];
                    }
                    this.shareGuideCfg[shareArr[i][2]].push(shareArr[i]);
                }
                console.log("this.shareGuideCfg" + this.shareGuideCfg);
            }
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDE), this.getShareGuideCallback, this);
        }
        /** 点击分享 */
        private static shareBtnClickHandler(parentNode, type)
        {
            console.log("click share " + type);
            NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[type], operate:"click"});
            if (this.shareGuideCfg[type] && this.shareGuideCfg[type].length > 0) {
                console.log("has share word");
                let content = this.shareGuideCfg[type][Math.floor(Math.random() * this.shareGuideCfg[type].length)];
                let imageurl = content[3];
                let shareId = content[4];
                if (App.DeviceUtil.IsHtml5()) {
                    // 找到最后一个"/"
                    let lastGang = document.baseURI.lastIndexOf("/");
                    imageurl = document.baseURI.substr(0, lastGang + 1) + "resource/other/share_guide_image/" + content[3];
                } else if (App.DeviceUtil.isWXgame()) {
                    imageurl = ServerCfg.getWxGameResourceUrl() + "other/share_guide_image/" + content[3];
                }
                let content2 = {title:content[0], desc:content[1], imageurl:imageurl};
                if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                    console.log("has Sdk");
                    let shareType = PlatformManager.checkShare();
                    console.log("shareType "+ shareType);
                    if (shareType === 1 || shareType === 3) {
                        console.log("RSDKHelper.guideShare");
                        // RSDKHelper.guideShare(content2, ()=>{}, shareId);
                        this.sharingType = type;
                    } else if (shareType === 2) {
                        console.log("showHand");
                        RSDKHelper.setShareInfoGuide(content2, GameData.userId.toString(), shareId);
                        this.showHand(LayerManager.msgLayer);
                        this.sharingType = type;
                    }
                } else {
                    console.log("no Sdk");
                    App.CommonUtil.showTip("分享内容"+JSON.stringify(content, null, 4));
                    NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[type], operate:"success"});
                }
            } else {
                console.log("no share word");
                if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                    console.log("has Sdk 2");
                    let shareType = PlatformManager.checkShare();
                    if (shareType === 1 || shareType === 3) {
                        RSDKHelper.share(()=>{});
                        this.sharingType = type;
                    } else if (shareType === 2) {
                        this.showHand(LayerManager.msgLayer);
                        this.sharingType = type;
                    }
                } else {
                    console.log("no Sdk 2");
                    App.CommonUtil.showTip("未设置分享内容");
                    NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[type], operate:"success"});
                }
            }

            if (Api.switchVoApi.checkOpenShareReward() && Api.otherInfoVoApi.getShareGuideCount() < Config.SharerewardCfg.maxReward) {
                NetManager.request(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD, {});
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD), this.getShareGuideRewardCallback, this);
            }
        }
        // 领取分享奖励回调
        private static getShareGuideRewardCallback(event: egret.Event)
        {
            if(event.data.ret)
            {
                if(event.data.data.data.rewards)
                {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
                }
            }
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD), this.getShareGuideRewardCallback, this);
        }

        // 分享，显示一个手
        public static showHand(parentNode) {

            let _handContainer = new BaseDisplayObjectContainer();
            parentNode.addChild(_handContainer)

            let maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width=GameConfig.stageWidth;
            maskBmp.height=GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            _handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(()=>{
                _handContainer.parent.removeChild(_handContainer);

                if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                    RSDKHelper.setShareInfo(GameData.userId.toString());
                    this.sharingType = "";
                }
            }, null);

            let clickHand = BaseLoadBitmap.create("guide_hand");
            clickHand.skewY = 180;
            clickHand.x = 590;
            clickHand.y = 10;
            _handContainer.addChild(clickHand);

            egret.Tween.get(clickHand,{loop:true})
                .to({y:60}, 500)
                .to({y:10}, 500)

            let getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
            getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
            getTxt.lineSpacing = 10;
            _handContainer.addChild(getTxt);

        }
    }
}