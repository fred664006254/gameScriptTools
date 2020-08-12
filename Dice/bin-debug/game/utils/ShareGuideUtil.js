var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App;
(function (App) {
    /**
     * 获得门客红颜等的分享引导工具类
     * @author 赵占涛
     */
    var ShareGuideUtil = (function () {
        function ShareGuideUtil() {
        }
        /** 点击分享 */
        ShareGuideUtil.shareBtnClickHandler = function () {
            console.log("no share word");
            if (PlatMgr.checkIsUseSDK() && RSDKHelper.isInit) {
                console.log("has Sdk 2");
                var shareType = PlatMgr.checkShare();
                if (shareType === 1 || shareType === 3) {
                    RSDKHelper.share(function () { });
                }
                else if (shareType === 2) {
                    this.showHand(LayerMgr.msgLayer);
                }
            }
            else {
                console.log("no Sdk 2");
                //App.CommonUtil.showTip("未设置分享内容");
                ViewController.getInstance().openView(ViewConst.INVITEFRIENDSHAREVIEW);
                //NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, {scene:this._sendSceneType[type], operate:"success"});
            }
        };
        // 领取分享奖励回调
        ShareGuideUtil.getShareGuideRewardCallback = function (event) {
            if (event.data.ret) {
                if (event.data.data.data.rewards) {
                    //ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,event.data.data.data.rewards);
                }
            }
            //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD), this.getShareGuideRewardCallback, this);
        };
        // 分享，显示一个手
        ShareGuideUtil.showHand = function (parentNode) {
            var _this = this;
            var _handContainer = new BaseDisplayObjectContainer();
            parentNode.addChild(_handContainer);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            _handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(function () {
                _handContainer.parent.removeChild(_handContainer);
                if (PlatMgr.checkIsUseSDK() && RSDKHelper.isInit) {
                    RSDKHelper.setShareInfo(Api.UserinfoVoApi.getUid().toString());
                    _this.sharingType = "";
                }
            }, null);
            var clickHand = BaseLoadBitmap.create("guide_hand");
            clickHand.skewY = 180;
            clickHand.x = 590;
            clickHand.y = 10;
            _handContainer.addChild(clickHand);
            egret.Tween.get(clickHand, { loop: true })
                .to({ y: 60 }, 500)
                .to({ y: 10 }, 500);
            var getTxt = ComponentMgr.getTextField(LangMger.getlocal("fkylcGetMsgTip"), TextFieldConst.SIZE_24);
            getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            getTxt.x = GameConfig.stageWidth / 2 - getTxt.width / 2;
            getTxt.y = GameConfig.stageHeigth / 2 - getTxt.height / 2;
            getTxt.lineSpacing = 10;
            _handContainer.addChild(getTxt);
        };
        /** 正在分享的方案id (不只是情景分享，所有的都算）*/
        ShareGuideUtil.sharingId = "";
        /** 状态变量，标记当时是否正在分享 */
        ShareGuideUtil.sharingType = "";
        return ShareGuideUtil;
    }());
    App.ShareGuideUtil = ShareGuideUtil;
    __reflect(ShareGuideUtil.prototype, "App.ShareGuideUtil");
})(App || (App = {}));
//# sourceMappingURL=ShareGuideUtil.js.map