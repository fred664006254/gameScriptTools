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
var TwitterdailyshareView = (function (_super) {
    __extends(TwitterdailyshareView, _super);
    function TwitterdailyshareView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(TwitterdailyshareView.prototype, "vo", {
        get: function () {
            return Api.otherInfoVoApi.getGeneralShareInfo();
        },
        enumerable: true,
        configurable: true
    });
    TwitterdailyshareView.prototype.initView = function () {
        this.showShareView();
    };
    /**
     * 重写 初始化viewbg
     * 仅适用于新的分享
     */
    TwitterdailyshareView.prototype.initBg = function () {
        this.viewBg = BaseLoadBitmap.create("twitter_share_fenxiang");
        this.viewBg.width = 640;
        this.viewBg.height = 644;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    /**
     * 重新一下关闭按钮
     * 仅适用于新的分享
     */
    TwitterdailyshareView.prototype.getCloseBtnName = function () {
        return "btn_lantern";
    };
    /**
     * 重新一下title按钮
     * 仅适用于新的分享
     */
    TwitterdailyshareView.prototype.getTitleBgName = function () {
        return "";
    };
    /**
     * 重置背景的高度 主要设置 btn的位置
     * 仅适用于新的分享
     */
    TwitterdailyshareView.prototype.resetBgSize = function () {
        this.closeBtn.setPosition(this.viewBg.x + 510, this.viewBg.y + 50 + 32);
    };
    /**
     * 使用新的分享面板
     */
    TwitterdailyshareView.prototype.showShareView = function () {
        //分享的奖励列表
        var _reward = Config.GameprojectCfg.shareRewardtwJP;
        //从左到右413    从右到左227       横向距离640
        var shareTF = ComponentManager.getTextField(LanguageManager.getlocal("sharePopupViewShareGameTip"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        shareTF.anchorOffsetX = shareTF.width / 2;
        // shareTF.setPosition(this.viewBg.x + this.viewBg.width - 227,this.viewBg.y + shareTF.height + 95);
        shareTF.setPosition(450, this.viewBg.y - shareTF.height / 2 + 195);
        this.addChildToContainer(shareTF);
        var rewardVo = GameData.formatRewardItem(_reward);
        for (var i = 0; i < rewardVo.length; i++) {
            var reward = GameData.getItemIcon(rewardVo[i], true, true);
            reward.anchorOffsetX = reward.width / 2;
            reward.setScale(0.7);
            reward.setPosition(425 + (i % 3 - 1) * (reward.width - 20), this.viewBg.y + 230 + (Math.floor(i / 3) * (reward.height - 18)));
            this.addChildToContainer(reward);
        }
        var confirmBtn = ComponentManager.getButton("share_button_fenxiang", null, this.shareBtnClick, this);
        confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - 65, this.viewBg.y + this.viewBg.height - confirmBtn.height - 90);
        this.addChildToContainer(confirmBtn);
    };
    //分享回调
    TwitterdailyshareView.prototype.shareCallback = function (data) {
        console.log("shareCallback-->", data);
        this.requestRewardShare();
    };
    //点击分享按钮
    TwitterdailyshareView.prototype.shareBtnClick = function () {
        if (Api.otherInfoVoApi.getTwdailyshare() != 1) {
            //本地
            if (PlatformManager.checkIsLocal()) {
                App.CommonUtil.showTip("本地环境，直接领取奖励");
                this.requestRewardShare();
                return;
            }
            var shareType = App.ShareGuideUtil.SHARETYPE_SHARE_TWITTERDAILY;
            //分享  
            PlatformManager.share(shareType, this.shareCallback, this);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("sharePopupViewShareOver"));
        }
    };
    TwitterdailyshareView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "share_button_fenxiang"
        ]);
    };
    TwitterdailyshareView.prototype.getTitleStr = function () {
        return null;
    };
    /**
     * 领奖请求
     */
    TwitterdailyshareView.prototype.requestRewardShare = function () {
        this.request(NetRequestConst.REQUST_OTHERINFO_GETSHAREREWARD, {});
    };
    TwitterdailyshareView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.data.rewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data.data.data.rewards);
                this.hide();
            }
        }
    };
    return TwitterdailyshareView;
}(PopupView));
__reflect(TwitterdailyshareView.prototype, "TwitterdailyshareView");
