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
        /**
         * addShareNode
         */
        ShareGuideUtil.addShareNode = function (parentNode, type) {
            if (Api.switchVoApi.checkOpenShareGate()) {
                //分享按钮
                var shareBtn = ComponentManager.getButton("shareBtn", "", this.shareBtnClickHandler, this, [parentNode, type]);
                shareBtn.x = GameConfig.stageWidth - shareBtn.width - 20;
                shareBtn.y = PlatformManager.hasSpcialCloseBtn() ? 100 : 20;
                parentNode.addChild(shareBtn);
                var shareEffect = ComponentManager.getCustomMovieClip("fenxiang_", 15, 1000 / 15);
                shareEffect.setScale(1.9);
                shareEffect.setPosition(shareBtn.width / 2 - 59 * shareEffect.scaleX / 2, shareBtn.height / 2 - 60 * shareEffect.scaleY / 2 - 2);
                shareBtn.addChild(shareEffect);
                shareEffect.playWithTime(0);
                if (Api.switchVoApi.checkOpenShareReward() && Api.otherInfoVoApi.getShareGuideCount() < Config.SharerewardCfg.maxReward) {
                    // 奖励
                    var rewardNode = new BaseDisplayObjectContainer();
                    // 奖励的元素的x点。
                    var rewardNodeXPoint = 0;
                    var rewardStr = LanguageManager.getlocal("taskReward");
                    var rewardText = ComponentManager.getTextField(rewardStr, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                    rewardText.x = rewardNodeXPoint;
                    rewardNodeXPoint += rewardText.width;
                    rewardNode.addChild(rewardText);
                    var rewards = GameData.formatRewardItem(Config.SharerewardCfg.shareReward);
                    for (var i = 0; i < rewards.length; i++) {
                        rewardStr += (" " + rewards[i].name + "x" + rewards[i].num) + rewards[i].icon;
                        //奖励图标
                        var shareRewardIcon = BaseLoadBitmap.create(rewards[i].icon);
                        shareRewardIcon.x = rewardNodeXPoint;
                        shareRewardIcon.y = -10;
                        shareRewardIcon.scaleX = 0.4;
                        shareRewardIcon.scaleY = 0.4;
                        rewardNodeXPoint += 40;
                        rewardNode.addChild(shareRewardIcon);
                        // 数量
                        var rewardNum = ComponentManager.getTextField("x" + rewards[i].num, TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
                        rewardNum.x = rewardNodeXPoint;
                        rewardNodeXPoint += rewardNum.width;
                        rewardNode.addChild(rewardNum);
                    }
                    // 奖励框
                    var sharePop = BaseBitmap.create("shareRewardPop");
                    sharePop.width = rewardNodeXPoint + 20;
                    sharePop.x = shareBtn.x - sharePop.width + shareBtn.width;
                    sharePop.y = shareBtn.y + 100;
                    parentNode.addChild(sharePop);
                    rewardNode.x = sharePop.x + 10;
                    rewardNode.y = sharePop.y + 20;
                    parentNode.addChild(rewardNode);
                }
                // 如果还没分享方案，就获取一下
                if (!this.shareGuideCfg) {
                    NetManager.request(NetRequestConst.REQUEST_GETSHAREGUIDE, {});
                    App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDE), this.getShareGuideCallback, this);
                }
                NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, { scene: this._sendSceneType[type], operate: "appear" });
            }
        };
        // 获取分享方案的回调
        ShareGuideUtil.getShareGuideCallback = function (event) {
            if (event.data.ret) {
                this.shareGuideCfg = [];
                var shareArr = event.data.data.data.shareguide;
                for (var i = 0; i < shareArr.length; i++) {
                    if (!this.shareGuideCfg[shareArr[i][2]]) {
                        this.shareGuideCfg[shareArr[i][2]] = [];
                    }
                    this.shareGuideCfg[shareArr[i][2]].push(shareArr[i]);
                }
                console.log("this.shareGuideCfg" + this.shareGuideCfg);
            }
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDE), this.getShareGuideCallback, this);
        };
        /** 点击分享 */
        ShareGuideUtil.shareBtnClickHandler = function (parentNode, type) {
            console.log("click share " + type);
            NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, { scene: this._sendSceneType[type], operate: "click" });
            if (this.shareGuideCfg[type] && this.shareGuideCfg[type].length > 0) {
                console.log("has share word");
                var content = this.shareGuideCfg[type][Math.floor(Math.random() * this.shareGuideCfg[type].length)];
                var imageurl = content[3];
                var shareId = content[4];
                if (App.DeviceUtil.IsHtml5()) {
                    // 找到最后一个"/"
                    var lastGang = document.baseURI.lastIndexOf("/");
                    imageurl = document.baseURI.substr(0, lastGang + 1) + "resource/other/share_guide_image/" + content[3];
                }
                else if (App.DeviceUtil.isWXgame()) {
                    imageurl = ServerCfg.getWxGameResourceUrl() + "other/share_guide_image/" + content[3];
                }
                var content2 = { title: content[0], desc: content[1], imageurl: imageurl };
                if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                    console.log("has Sdk");
                    var shareType = PlatformManager.checkShare();
                    console.log("shareType " + shareType);
                    if (shareType === 1 || shareType === 3) {
                        console.log("RSDKHelper.guideShare");
                        RSDKHelper.guideShare(content2, function () { }, shareId);
                        this.sharingType = type;
                    }
                    else if (shareType === 2) {
                        console.log("showHand");
                        RSDKHelper.setShareInfoGuide(content2, GameData.userId.toString(), shareId);
                        this.showHand(LayerManager.msgLayer);
                        this.sharingType = type;
                    }
                }
                else {
                    console.log("no Sdk");
                    App.CommonUtil.showTip("分享内容" + JSON.stringify(content, null, 4));
                    NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, { scene: this._sendSceneType[type], operate: "success" });
                }
            }
            else {
                console.log("no share word");
                if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                    console.log("has Sdk 2");
                    var shareType = PlatformManager.checkShare();
                    if (shareType === 1 || shareType === 3) {
                        RSDKHelper.share(function () { });
                        this.sharingType = type;
                    }
                    else if (shareType === 2) {
                        this.showHand(LayerManager.msgLayer);
                        this.sharingType = type;
                    }
                }
                else {
                    console.log("no Sdk 2");
                    App.CommonUtil.showTip("未设置分享内容");
                    NetManager.request(NetRequestConst.REQUEST_STATSUPDATESHAREDATA, { scene: this._sendSceneType[type], operate: "success" });
                }
            }
            if (Api.switchVoApi.checkOpenShareReward() && Api.otherInfoVoApi.getShareGuideCount() < Config.SharerewardCfg.maxReward) {
                NetManager.request(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD, {});
                App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD), this.getShareGuideRewardCallback, this);
            }
        };
        // 领取分享奖励回调
        ShareGuideUtil.getShareGuideRewardCallback = function (event) {
            if (event.data.ret) {
                if (event.data.data.data.rewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, event.data.data.data.rewards);
                }
            }
            App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_GETSHAREGUIDEREWARD), this.getShareGuideRewardCallback, this);
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
                if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
                    RSDKHelper.setShareInfo(GameData.userId.toString());
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
            var getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            getTxt.x = GameConfig.stageWidth / 2 - getTxt.width / 2;
            getTxt.y = GameConfig.stageHeigth / 2 - getTxt.height / 2;
            getTxt.lineSpacing = 10;
            _handContainer.addChild(getTxt);
        };
        /** 官位提升 */
        ShareGuideUtil.TYPE_PROMOTION = "a";
        /** 门客获得 */
        ShareGuideUtil.TYPE_SERVANTGET = "b";
        /** 红颜获得 */
        ShareGuideUtil.TYPE_WIFEGET = "c";
        /** 子嗣获得 */
        ShareGuideUtil.TYPE_CHILDGET = "d";
        /** 子嗣联姻 */
        ShareGuideUtil.TYPE_CHILDMARRY = "e";
        /** 状态变量，标记当时是否正在分享 */
        ShareGuideUtil.sharingType = "";
        /** 向后端发送的时候的场景 */
        ShareGuideUtil._sendSceneType = {
            a: "levelup",
            b: "servantget",
            c: "wifeget",
            d: "childget",
            e: "childmarry"
        };
        /** 正在分享的方案id (不只是情景分享，所有的都算）*/
        ShareGuideUtil.sharingId = "";
        return ShareGuideUtil;
    }());
    App.ShareGuideUtil = ShareGuideUtil;
    __reflect(ShareGuideUtil.prototype, "App.ShareGuideUtil");
})(App || (App = {}));
//# sourceMappingURL=ShareGuideUtil.js.map