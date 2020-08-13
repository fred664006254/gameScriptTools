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
var WelfareViewantideception = (function (_super) {
    __extends(WelfareViewantideception, _super);
    function WelfareViewantideception() {
        var _this = _super.call(this) || this;
        //领取按钮
        _this._getBtn = null;
        return _this;
    }
    WelfareViewantideception.prototype.init = function () {
        _super.prototype.init.call(this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_GETANTIDECEPTION), this.updateButtonState, this);
        var image1 = BaseBitmap.create("antideception_img1");
        image1.x = 20;
        image1.y = this.bottomBg.y + 50;
        this.addChild(image1);
        var image2 = BaseBitmap.create("antideception_img2");
        image2.x = image1.x + image1.width + 10;
        image2.y = image1.y;
        this.addChild(image2);
        var image3 = BaseBitmap.create("antideception_img3");
        image3.x = 20;
        image3.y = image1.y + image1.height + 10;
        this.addChild(image3);
        var image4 = BaseBitmap.create("antideception_img4");
        image4.x = image3.x + image3.width + 10;
        ;
        image4.y = image3.y;
        this.addChild(image4);
        // LanguageManager.getlocal("antideceptionTitle")
        var text = LanguageManager.getlocal("antideceptionTitle");
        var text5 = LanguageManager.getlocal("antideceptionDesc");
        var TextLable = ComponentManager.getTextField(text, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        TextLable.x = this.bottomBg.x + this.bottomBg.width / 2 - TextLable.width / 2;
        TextLable.y = this.bottomBg.y + TextLable.height / 2 + 10;
        this.addChild(TextLable);
        var descText = ComponentManager.getTextField(text5, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        descText.x = this.bottomBg.x + 15;
        descText.y = this.bottomBg.y + this.bottomBg.height - 80;
        descText.lineSpacing = 5;
        this.addChild(descText);
        var goToRechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "DragonBoatDayLq", this.clickGetBtnHandler, this);
        goToRechargeBtn.setScale(0.7);
        goToRechargeBtn.x = this.bottomBg.x + this.bottomBg.width - goToRechargeBtn.width + 50;
        goToRechargeBtn.y = this.bottomBg.y + this.bottomBg.height - 75;
        ;
        this.addChild(goToRechargeBtn);
        this._getBtn = goToRechargeBtn;
        var flag = Api.otherInfoVoApi.getAntiDeception();
        if (flag == 1 && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = 340;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2 - 10;
            this.addChild(hasGetSp);
        }
    };
    WelfareViewantideception.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ntideception_bg", "antideception_img1", "antideception_img2", "antideception_img3", "antideception_img4"
        ]);
    };
    WelfareViewantideception.prototype.updateButtonState = function (event) {
        var rData = event.data.data.data;
        var rewards = rData.rewards;
        var rewardList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList);
        var flag = Api.otherInfoVoApi.getAntiDeception();
        if (flag == 1 && this._getBtn) {
            this._getBtn.visible = false;
            var hasGetSp = BaseBitmap.create("collectflag");
            hasGetSp.x = 340;
            hasGetSp.y = this._getBtn.y + this._getBtn.height / 2 - hasGetSp.height / 2 - 10;
            this.addChild(hasGetSp);
        }
    };
    WelfareViewantideception.prototype.clickGetBtnHandler = function () {
        NetManager.request(NetRequestConst.REQUEST_USER_GETANTIDECEPTION, null);
    };
    WelfareViewantideception.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_GETANTIDECEPTION), this.updateButtonState, this);
        _super.prototype.dispose.call(this);
    };
    return WelfareViewantideception;
}(WelfareViewTab));
__reflect(WelfareViewantideception.prototype, "WelfareViewantideception");
