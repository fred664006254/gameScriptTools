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
 * 邀请有礼
 * author 赵占涛
 * date 2018/3/6
 * @class InviteView
 */
var InviteView = (function (_super) {
    __extends(InviteView, _super);
    function InviteView() {
        return _super.call(this) || this;
    }
    InviteView.prototype.initView = function () {
        Api.inviteVoApi.processDataOnOpenDialog();
        var bg = BaseBitmap.create("invite_bg");
        bg.x = 0;
        bg.y = -10;
        this.addChildToContainer(bg);
        // 描述
        var descLabel = ComponentManager.getTextField(LanguageManager.getlocal("inviteDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        descLabel.x = 30;
        descLabel.y = bg.y + bg.height - 35 - descLabel.height / 2;
        this.addChildToContainer(descLabel);
        // 邀请按钮
        var goInviteBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "inviteButton", this.inviteButtonHandler, this);
        goInviteBtn.x = 477;
        goInviteBtn.y = 233;
        goInviteBtn.name = "goInviteBtn";
        this.addChildToContainer(goInviteBtn);
    };
    InviteView.prototype.inviteButtonHandler = function () {
        PlatformManager.share(App.ShareGuideUtil.SHARETYPE_SHARE_INVITE, function (code, data) { }, this);
        // if(shareType === 1 || shareType === 3)
        // {
        // 	RSDKHelper.share((code,data)=>{});
        // } else {
        // 	this.showHand();
        // }
    };
    InviteView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "invite_bg", "nobodyIcon", "rank_1", "rank_2", "rank_3", "rank_line", "guide_hand", "activity_db_01", "activity_db_02", "rank_biao", "public_tc_bg05"
        ]);
    };
    InviteView.prototype.getContainerY = function () {
        return 260;
    };
    InviteView.prototype.getTitleButtomY = function () {
        var buttonY;
        if (this.titleBg) {
            buttonY = this.titleBg.y + this.titleBg.height;
        }
        else {
            if (this.titleTF) {
                buttonY = this.titleTF.y + this.titleTF.height;
            }
        }
        return buttonY;
    };
    InviteView.prototype.getTabbarGroupY = function () {
        return 302;
    };
    InviteView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_INVITE_GETINFO, requestData: {} };
    };
    InviteView.prototype.getTabbarTextArr = function () {
        return [
            "inviteViewTab1Title", "inviteViewTab2Title", "inviteViewTab3Title", "inviteViewTab4Title"
        ];
    };
    InviteView.prototype.showHand = function () {
        if (!this._handContainer) {
            this._handContainer = new BaseDisplayObjectContainer();
            this.addChild(this._handContainer);
            var maskBmp = BaseBitmap.create("public_9_viewmask");
            maskBmp.width = GameConfig.stageWidth;
            maskBmp.height = GameConfig.stageHeigth;
            maskBmp.touchEnabled = true;
            this._handContainer.addChild(maskBmp);
            maskBmp.addTouchTap(this.hideMask, this);
            var clickHand = BaseBitmap.create("guide_hand");
            clickHand.skewY = 180;
            clickHand.x = 590;
            clickHand.y = 10;
            this._handContainer.addChild(clickHand);
            egret.Tween.get(clickHand, { loop: true })
                .to({ y: 60 }, 500)
                .to({ y: 10 }, 500);
            var getTxt = ComponentManager.getTextField(LanguageManager.getlocal("fkylcGetMsgTip"), TextFieldConst.FONTSIZE_TITLE_COMMON);
            getTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            getTxt.x = GameConfig.stageWidth / 2 - getTxt.width / 2;
            getTxt.y = GameConfig.stageHeigth / 2 - getTxt.height / 2;
            getTxt.lineSpacing = 10;
            this._handContainer.addChild(getTxt);
        }
    };
    InviteView.prototype.hideMask = function () {
        if (this._handContainer) {
            this.removeChild(this._handContainer);
            this._handContainer.dispose();
            this._handContainer = null;
        }
    };
    InviteView.prototype.dispose = function () {
        if (this._handContainer) {
            this._handContainer.dispose();
            this._handContainer = null;
        }
        _super.prototype.dispose.call(this);
    };
    return InviteView;
}(CommonView));
__reflect(InviteView.prototype, "InviteView");
