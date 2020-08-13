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
 * 创建军团
 * author dky
 * date 201711/27
 * @class AllianceCreatePopupView
 */
var AllianceCreatePopupView = (function (_super) {
    __extends(AllianceCreatePopupView, _super);
    function AllianceCreatePopupView() {
        var _this = _super.call(this) || this;
        _this._type = "";
        _this._infoMaxNum = 0;
        return _this;
    }
    ;
    AllianceCreatePopupView.prototype.initView = function () {
        // itemInfo.ic
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 525;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var nameText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateNameTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        nameText.x = 50 + GameData.popupviewOffsetX;
        nameText.y = bg.y + 20;
        this.addChildToContainer(nameText);
        //联盟名称
        var inputTF1 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 45, "public_9_bg5", LanguageManager.getlocal("allianceCreateNameholder"), 0xb1b1b1);
        inputTF1.x = nameText.x;
        inputTF1.y = nameText.y + nameText.height + 10;
        this.addChildToContainer(inputTF1);
        this._inputName = inputTF1.getChildByName("textField");
        if (PlatformManager.checkIsThSp()) {
            var nametxt_1 = "";
            this._inputName.addEventListener(egret.TextEvent.CHANGE, function (event) {
                var strName = String(event.target.text);
                var strLength = App.StringUtil.getStrLength(strName);
                if (strLength == GameData.nameThLength) {
                    nametxt_1 = strName;
                }
                if (strLength > GameData.nameThLength) {
                    this._inputName.text = nametxt_1;
                }
            }, this);
        }
        else if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            // this._inputName.maxChars = GameData.allianceNameEnLength;
            var nametxt_2 = "";
            this._inputName.addEventListener(egret.TextEvent.CHANGE, function (event) {
                var strName = String(event.target.text);
                var strLength = App.StringUtil.getEnLength(strName);
                if (strLength == GameData.allianceNameEnLength) {
                    nametxt_2 = strName;
                }
                if (strLength > GameData.allianceNameEnLength) {
                    this._inputName.text = nametxt_2;
                }
            }, this);
        }
        else {
            this._inputName.maxChars = 6;
        }
        //联盟微信
        var isEn = PlatformManager.checkIsEnSp();
        var weixinText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateWeixinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        weixinText.x = nameText.x;
        weixinText.y = inputTF1.y + inputTF1.height + 10;
        this.addChildToContainer(weixinText);
        var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 45, "public_9_bg5", LanguageManager.getlocal(isEn ? "allianceCreateWeixinholder2" : "allianceCreateWeixinholder"), 0xb1b1b1);
        inputTF2.x = nameText.x;
        inputTF2.y = weixinText.y + weixinText.height + 10;
        this.addChildToContainer(inputTF2);
        this._inputWeixin = inputTF2.getChildByName("textField");
        this._inputWeixin.maxChars = isEn ? 50 : 15;
        //联盟Q群
        var qqText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateQQTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        qqText.x = nameText.x;
        qqText.y = inputTF2.y + inputTF2.height + 10;
        this.addChildToContainer(qqText);
        var inputTF3 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 45, "public_9_bg5", LanguageManager.getlocal(isEn ? "allianceCreateQQholder2" : "allianceCreateQQholder"), 0xb1b1b1);
        inputTF3.x = nameText.x;
        inputTF3.y = qqText.y + qqText.height + 10;
        this.addChildToContainer(inputTF3);
        this._inputQQ = inputTF3.getChildByName("textField");
        this._inputQQ.maxChars = isEn ? 50 : 15;
        // //联盟密码
        // let passwordText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreatePasswordTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // passwordText.x = nameText.x;
        // passwordText.y = inputTF3.y + inputTF3.height + 10;
        // this.addChildToContainer(passwordText);
        // let inputTF4 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,466,45,"public_9_bg5",LanguageManager.getlocal("allianceCreatePasswordholder"),0xb1b1b1);
        // inputTF4.x = nameText.x;
        // inputTF4.y = passwordText.y + passwordText.height + 10;
        // this.addChildToContainer(inputTF4);
        // this._inputPassWard = <BaseTextField>inputTF4.getChildByName("textField");
        // this._inputPassWard.maxChars = 6;
        this._infoMaxNum = Config.AlliancebaseCfg.numofWords;
        //联盟公告
        var msgText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateMsgTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        msgText.x = nameText.x;
        msgText.y = inputTF3.y + inputTF3.height + 10;
        this.addChildToContainer(msgText);
        var inputTF5 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 134, "public_9_bg5", LanguageManager.getlocal("allianceCreateMsgholder", [this._infoMaxNum + ""]), 0xb1b1b1);
        inputTF5.x = nameText.x;
        inputTF5.y = msgText.y + msgText.height + 15;
        this.addChildToContainer(inputTF5);
        this._inputMsg = inputTF5.getChildByName("textField");
        this._inputMsg.y = 10;
        this._inputMsg.height = 120;
        this._inputMsg.width = 456;
        this._inputMsg.maxChars = this._infoMaxNum;
        this._inputMsg.multiline = true;
        this._inputMsg.restrict = "^\\n";
        this._inputMsg.multiline = true;
        this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("allianceJoinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._soundText.x = nameText.x;
        this._soundText.y = inputTF5.y + inputTF5.height + 10;
        this.addChildToContainer(this._soundText);
        this._soundBB = BaseBitmap.create("btn_swicth");
        this._soundBB.x = this._soundText.x + this._soundText.width + 10;
        this._soundBB.y = this._soundText.y + this._soundText.height / 2 - this._soundBB.height / 2;
        this.addChildToContainer(this._soundBB);
        this._soundBB.addTouchTap(this.sonndHander, this);
        if (PlatformManager.checkIsPtLang) {
            this._soundBB.x = this._soundText.x + this._soundText.width / 2 - this._soundBB.width / 2;
            this._soundBB.y = this._soundText.y + this._soundText.height + 5;
        }
        // this._soundBB.addTouch(this.sonndHander,this,null);	
        this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._soundState.x = this._soundBB.x + 15;
        this._soundState.y = this._soundBB.y + this._soundBB.height / 2 - this._soundState.height / 2;
        this.addChildToContainer(this._soundState);
        // this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
        var color = TextFieldConst.COLOR_WARN_GREEN;
        // if(this._type == ""){
        this._type = "ON";
        // }
        // if(this._type != "ON"){
        // 	this._soundBB.skewY = 180;
        // 	this._soundBB.x = this._soundBB.x + this._soundBB.width;
        // 	this._soundState.x = 390;
        // 	color = 0xb1b1b1;
        // }else{
        // }
        this._soundState.text = this._type;
        this._soundState.textColor = color;
        var gemBg = BaseLoadBitmap.create("itemicon1");
        gemBg.setScale(0.5);
        gemBg.x = 230 + GameData.popupviewOffsetX;
        gemBg.y = bg.y + bg.height - 5;
        this.addChildToContainer(gemBg);
        var gem = Config.AlliancebaseCfg.createNeedGem;
        var gemText = ComponentManager.getTextField(gem.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        gemText.x = 280 + GameData.popupviewOffsetX;
        gemText.y = bg.y + bg.height + 15;
        this.addChildToContainer(gemText);
        var changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceCreateCreateBtn", this.createHandler, this);
        changeBtn.x = this.viewBg.width / 2 - changeBtn.width / 2;
        changeBtn.y = gemText.y + gemText.height + 15;
        changeBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(changeBtn);
    };
    AllianceCreatePopupView.prototype.createHandler = function (param) {
        if (!this._inputName.bindData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreateNameTip"));
            return;
        }
        // if(!this._inputPassWard.bindData){
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreatePassWordTip"));
        // 	return;
        // }
        //名字检测
        var txtStr = this._inputName.text;
        var length = App.StringUtil.getStrLength(txtStr);
        if (!App.StringUtil.userNameCheck(txtStr)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
            return;
        }
        if (txtStr == "null" || txtStr == "undefined") {
            App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
            return;
        }
        if (PlatformManager.checkIsThSp()) {
            if (length < 2 || length > GameData.nameThLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
                return;
            }
        }
        else if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            length = App.StringUtil.getEnLength(txtStr);
            if (length < 2 || length > GameData.allianceNameEnLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.allianceNameEnLength.toString()]));
                return;
            }
        }
        else if (PlatformManager.checkIsPtLang()) {
            length = App.StringUtil.getStrLength(txtStr);
            if (length < 2 || length > GameData.allianceNamePtLength) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip3", ["2", GameData.allianceNamePtLength.toString()]));
                return;
            }
        }
        else {
            if (length < 2 || length > 6) {
                App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
                return;
            }
        }
        if (Config.ShieldCfg.checkShield(txtStr) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        // //密码检测
        // let passworStr:string=this._inputPassWard.text;
        // if(!App.StringUtil.numberCheck(passworStr))
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreatePassWordTip2"));
        // 	return;
        // }
        // if( passworStr.length != 6)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("allianceCreatePassWordTip2"));
        // 	return;
        // }
        //公告检查
        var msg = this._inputMsg.text;
        if (Config.ShieldCfg.checkOnlyShield(msg) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        var weixin = this._inputWeixin.text;
        var qq = this._inputQQ.text;
        if (!this._inputWeixin.bindData) {
            weixin = "";
        }
        //检查
        if (Config.ShieldCfg.checkOnlyShield(weixin) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (!this._inputQQ.bindData) {
            qq = "";
        }
        if (Config.ShieldCfg.checkOnlyShield(qq) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (!this._inputMsg.bindData) {
            msg = "";
        }
        var joinSwitch = 0;
        if (this._type == "OFF") {
            joinSwitch = 1;
        }
        if (Config.AlliancebaseCfg.createNeedGem > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        this.request(NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE, { name: txtStr, cweixin: weixin, cqq: qq, intro: msg, switch: joinSwitch });
    };
    //请求回调
    AllianceCreatePopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.data.nameFlag == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceNamePopupTip1"));
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_CREATEALLIANCE) {
            if (this.param.data.callback) {
                this.param.data.callback.apply(this.param.data.handler, []);
                this.hide();
            }
        }
    };
    AllianceCreatePopupView.prototype.sonndHander = function (param) {
        var color = TextFieldConst.COLOR_WARN_GREEN;
        if (this._type == "" || this._type == "ON") {
            this._type = "OFF";
        }
        else {
            this._type = "ON";
        }
        // LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
        if (this._type != "ON") {
            this._soundBB.skewY = 180;
            this._soundBB.x = this._soundBB.x + this._soundBB.width;
            this._soundState.x = this._soundBB.x - 50;
            color = 0xb1b1b1;
        }
        else {
            this._soundBB.skewY = 0;
            this._soundBB.x = this._soundText.x + this._soundText.width + 10;
            this._soundState.x = this._soundBB.x + 15;
        }
        this._soundState.text = this._type;
        this._soundState.textColor = color;
    };
    // protected getTitleStr(){
    //     //  this._type = this.param.data.type 
    //     return "adultChooseTypeViewTitle";
    // }
    AllianceCreatePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shield_cn"
        ]);
    };
    AllianceCreatePopupView.prototype.dispose = function () {
        this._type = "";
        this._soundBB = null;
        this._soundState = null;
        this._inputName = null;
        this._inputWeixin = null;
        this._inputQQ = null;
        // this._inputPassWard = null;
        this._inputMsg = null;
        // this.removeTouchTap();
        this._infoMaxNum = 0;
        _super.prototype.dispose.call(this);
    };
    return AllianceCreatePopupView;
}(PopupView));
__reflect(AllianceCreatePopupView.prototype, "AllianceCreatePopupView");
//# sourceMappingURL=AllianceCreatePopupView.js.map