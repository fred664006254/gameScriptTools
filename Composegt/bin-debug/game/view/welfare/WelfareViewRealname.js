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
var WelfareViewRealname = (function (_super) {
    __extends(WelfareViewRealname, _super);
    function WelfareViewRealname() {
        var _this = _super.call(this) || this;
        _this.authenticationState = 0; //0未认证 1已认证
        _this.authenticationStateText = null;
        _this.authenticationBtn = null;
        _this.receiveBtn = null;
        _this.hasGetSp = null;
        _this._isReceive = false; //true  未领取
        return _this;
    }
    WelfareViewRealname.prototype.init = function () {
        _super.prototype.init.call(this);
        this.authenticationState = PlatformManager.client.checkPerson() ? 1 : 0;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD), this.useCallback, this);
        var temW = 491;
        var str = "";
        if (this.authenticationState == 1) {
            str = "realnamedes7";
        }
        else {
            str = "realnamedes1";
        }
        //实名认证状态
        var authenticationStateText = ComponentManager.getTextField(LanguageManager.getlocal(str), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        authenticationStateText.x = 10;
        authenticationStateText.y = 180;
        this.addChild(authenticationStateText);
        this.authenticationStateText = authenticationStateText;
        //认证描述
        var realnameDes = ComponentManager.getTextField(LanguageManager.getlocal("realnamedes2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        realnameDes.x = 30;
        realnameDes.y = 230;
        realnameDes.width = 440;
        this.addChild(realnameDes);
        var bg = BaseBitmap.create("public_9v_bg04");
        bg.width = 450;
        bg.height = 300;
        bg.x = 20;
        bg.y = 280;
        this.addChild(bg);
        //描述长的
        var realnameDes2 = ComponentManager.getTextField(LanguageManager.getlocal("realnamedes3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        realnameDes2.x = 30;
        realnameDes2.width = 430;
        realnameDes2.y = 300;
        realnameDes2.lineSpacing = 5;
        this.addChild(realnameDes2);
        var line1 = BaseBitmap.create("public_line3");
        line1.width = temW - 10;
        line1.x = temW / 2 - line1.width / 2;
        line1.y = bg.y + bg.height + 20;
        this.addChild(line1);
        //实名认证奖励
        var nameTF = ComponentManager.getTextField(LanguageManager.getlocal("realnamedes4"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        nameTF.x = line1.x + line1.width / 2 - nameTF.width / 2;
        nameTF.y = line1.y;
        this.addChild(nameTF);
        var temScale = 0.8;
        var spaceW = 15;
        var spaceH = 10;
        var rewardList = GameData.formatRewardItem(Config.GameprojectCfg.rewardID3K);
        var totalNum = rewardList.length;
        var bg2 = BaseBitmap.create("public_9v_bg04");
        bg2.width = 450;
        bg2.x = 20;
        bg2.y = line1.y + 30;
        this.addChild(bg2);
        var iconHeight = 0;
        for (var i = 0; i < rewardList.length; i++) {
            var icon = GameData.getItemIcon(rewardList[i], true, true);
            icon.scaleX = icon.scaleY = temScale;
            icon.x = bg.x + bg.width / 2 + (icon.width * temScale) * (i - totalNum / 2) + spaceW * (i - (totalNum - 1) / 2);
            icon.y = line1.y + 50;
            this.addChild(icon);
            iconHeight = icon.height;
        }
        bg2.height = iconHeight + 20;
        var str2 = "";
        if (this.authenticationState == 1) {
            str2 = "realnamedes8";
        }
        else {
            str2 = "realnamedes5";
        }
        //去认证
        var authenticationBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, str2, this.authenticationBtnHandler, this);
        authenticationBtn.setPosition(70, bg2.y + bg2.height + 30);
        this.addChild(authenticationBtn);
        this.authenticationBtn = authenticationBtn;
        //领取
        var receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "realnamedes6", this.receiveBtnHandler, this);
        receiveBtn.setPosition(280, bg2.y + bg2.height + 30);
        this.addChild(receiveBtn);
        this.receiveBtn = receiveBtn;
        this.receiveBtn.visible = false;
        //已领取
        var hasGetSp = BaseBitmap.create("collectflag");
        hasGetSp.x = receiveBtn.x;
        hasGetSp.y = receiveBtn.y + 5;
        this.addChild(hasGetSp);
        this.hasGetSp = hasGetSp;
        this.hasGetSp.visible = false;
        this.isReceive(); //是否领取状态
    };
    WelfareViewRealname.prototype.isReceive = function () {
        this._isReceive = Api.otherInfoVoApi.checkrealnamerewards();
        if (this._isReceive == true) {
            this.receiveBtn.visible = true;
            if (this.authenticationState == 1) {
                this.receiveBtn.touchEnabled = true;
                App.DisplayUtil.changeToNormal(this.receiveBtn);
            }
            else {
                this.receiveBtn.touchEnabled = false;
                App.DisplayUtil.changeToGray(this.receiveBtn);
            }
        }
        else {
            this.receiveBtn.visible = false;
            this.hasGetSp.visible = true;
        }
    };
    WelfareViewRealname.prototype.is3kuseCallback = function (event) {
        if (event === void 0) { event = null; }
    };
    WelfareViewRealname.prototype.useCallback = function (event) {
        if (event === void 0) { event = null; }
        if (event.data.data.data.rewards) {
            var curr_point = new egret.Point(GameConfig.stage.width / 2, GameConfig.stageHeigth / 2 + 100);
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(event.data.data.data.rewards), curr_point);
            this.isReceive();
        }
    };
    WelfareViewRealname.prototype.rest = function () {
        this.isReceive();
        this.restStr();
    };
    WelfareViewRealname.prototype.restStr = function () {
        var str = "";
        if (this.authenticationState == 1) {
            str = "realnamedes1";
        }
        else {
            str = "realnamedes7";
        }
        if (this.authenticationBtn) {
            if (this.authenticationState == 1) {
                var str2 = "realnamedes8";
                this.authenticationBtn.touchEnabled = false;
                this.authenticationBtn.setText(str2);
            }
        }
        if (this.authenticationStateText) {
            this.authenticationStateText.text = LanguageManager.getlocal(str);
        }
    };
    //去认证
    WelfareViewRealname.prototype.authenticationBtnHandler = function (evt) {
        var _this = this;
        //已经认证过的不给反馈
        if (this.authenticationState == 1) {
            return;
        }
        PlatformManager.client.showPersonView(function () {
            console.log("认证结果");
            _this.rest();
        });
    };
    //领取
    WelfareViewRealname.prototype.receiveBtnHandler = function (evt) {
        NetManager.request(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD, null);
    };
    WelfareViewRealname.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETAUTHOR3KREWARD), this.useCallback, this);
        this.authenticationState = 0;
        this.authenticationStateText = null;
        this.authenticationBtn = null;
        this.receiveBtn = null;
        this.hasGetSp = null;
        this._isReceive = false;
        _super.prototype.dispose.call(this);
    };
    return WelfareViewRealname;
}(WelfareViewTab));
__reflect(WelfareViewRealname.prototype, "WelfareViewRealname");
