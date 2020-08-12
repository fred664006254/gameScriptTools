namespace App
{
    /**
     * 获得门客红颜等的分享引导工具类
     * @author 赵占涛
     */
 	export class ShareGuideUtil 
	{
       /** 正在分享的方案id (不只是情景分享，所有的都算）*/
        public static sharingId:string = "";
        /** 状态变量，标记当时是否正在分享 */
        public static sharingType:string = "";
        /** 点击分享 */
        public static shareBtnClickHandler()
        {
            console.log("no share word");
            if(PlatMgr.checkIsUseSDK() && RSDKHelper.isInit) {
                console.log("has Sdk 2");
                let shareType = PlatMgr.checkShare();
                if (shareType === 1 || shareType === 3) {
                    RSDKHelper.share(()=>{});
                } else if (shareType === 2) {
                    this.showHand(LayerMgr.msgLayer);
                }
            }else{
                console.log("no Sdk 2");
                //App.CommonUtil.showTip("未设置分享内容");
                ViewController.getInstance().openView(ViewConst.INVITEFRIENDSHAREVIEW);
                //NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[type], operate:"success"});
            }
        }
        // 领取分享奖励回调
        private static getShareGuideRewardCallback(event: egret.Event)
        {
            if(event.data.ret)
            {
                if(event.data.data.data.rewards)
                {
                    //ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
                }
            }
            //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD), this.getShareGuideRewardCallback, this);
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

                if (PlatMgr.checkIsUseSDK() && RSDKHelper.isInit) {
                    RSDKHelper.setShareInfo(Api.UserinfoVoApi.getUid().toString());
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

            let getTxt = ComponentMgr.getTextField(LangMger.getlocal("fkylcGetMsgTip"), TextFieldConst.SIZE_24);
            getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            getTxt.x = GameConfig.stageWidth/2 - getTxt.width/2;
            getTxt.y = GameConfig.stageHeigth/2- getTxt.height/2;
            getTxt.lineSpacing = 10;
            _handContainer.addChild(getTxt);

        }
    }
}