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
 * 帮会信息
 * author dky
 * date 2017/12/1
 * @class AllianceInfoPopupView
 */
var AllianceInfoPopupView = (function (_super) {
    __extends(AllianceInfoPopupView, _super);
    function AllianceInfoPopupView() {
        return _super.call(this) || this;
    }
    AllianceInfoPopupView.prototype.initView = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        // itemInfo.ic
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 540;
        bg.height = 643;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var bg1 = BaseBitmap.create("public_tc_bg03");
        bg1.width = 520;
        bg1.height = 160;
        bg1.setPosition(this.viewBg.width / 2 - bg1.width / 2, bg.y + 10);
        this.addChildToContainer(bg1);
        var nameStr = LanguageManager.getlocal("allianceInfoName2", [allianceVo.name]);
        this._nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._nameTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        this._nameTF.x = bg.x + 30;
        this._nameTF.y = 45;
        this.addChildToContainer(this._nameTF);
        //笔
        this._penIcon = BaseBitmap.create("public_pen_icon");
        this._penIcon.x = this._nameTF.x + this._nameTF.width + 10;
        this._penIcon.y = this._nameTF.y + this._nameTF.height / 2 - this._penIcon.height / 2;
        this.addChildToContainer(this._penIcon);
        this._penIcon.addTouchTap(this.reNameCilck, this);
        var info2Str = LanguageManager.getlocal("allianceFindInfo2", [allianceVo.creatorname]);
        var info2TF = ComponentManager.getTextField(info2Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info2TF.y = this._nameTF.y + this._nameTF.height + 10;
        info2TF.x = this._nameTF.x;
        this.addChildToContainer(info2TF);
        var allianceCfg = Config.AllianceCfg.getAllianceCfgByLv(allianceVo.level.toString());
        var info3Str = LanguageManager.getlocal("allianceInfoLevel2", [allianceVo.level.toString(), allianceVo.exp.toString(), allianceCfg.exp.toString()]);
        var info3TF = ComponentManager.getTextField(info3Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info3TF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
        info3TF.y = info2TF.y + info2TF.height + 10;
        info3TF.x = this._nameTF.x;
        this.addChildToContainer(info3TF);
        var info4Str = LanguageManager.getlocal("allianceFindInfo6", [allianceVo.mn + "/" + allianceVo.maxmn]);
        var info4TF = ComponentManager.getTextField(info4Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info4TF.y = info3TF.y + info3TF.height + 10;
        info4TF.x = this._nameTF.x;
        this.addChildToContainer(info4TF);
        var info5Str = LanguageManager.getlocal("allianceFindInfo4", [allianceVo.wealth.toString()]);
        var info5TF = ComponentManager.getTextField(info5Str, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        info5TF.y = info4TF.y + info4TF.height + 10;
        info5TF.x = this._nameTF.x;
        this.addChildToContainer(info5TF);
        //联盟微信
        var weixinText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateWeixinTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        weixinText.x = this._nameTF.x;
        weixinText.y = info5TF.y + info5TF.height + 20;
        this.addChildToContainer(weixinText);
        var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 500, 45, "public_tc_srkbg05", LanguageManager.getlocal("allianceCreateWeixinholder"), TextFieldConst.COLOR_WHITE, allianceVo.cweixin);
        inputTF2.x = 60;
        inputTF2.y = weixinText.y + weixinText.height + 10;
        this.addChildToContainer(inputTF2);
        this._inputWeixin = inputTF2.getChildByName("textField");
        this._inputWeixin.maxChars = 15;
        //联盟Q群
        var qqText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateQQTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        qqText.x = weixinText.x;
        qqText.y = inputTF2.y + inputTF2.height + 10;
        this.addChildToContainer(qqText);
        var inputTF3 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 500, 45, "public_tc_srkbg05", LanguageManager.getlocal("allianceCreateQQholder"), TextFieldConst.COLOR_WHITE, allianceVo.cqq);
        inputTF3.x = inputTF2.x;
        inputTF3.y = qqText.y + qqText.height + 10;
        this.addChildToContainer(inputTF3);
        this._inputQQ = inputTF3.getChildByName("textField");
        this._inputQQ.maxChars = 15;
        //对内公告
        var noticeText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateNoticeTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        noticeText.x = weixinText.x;
        noticeText.y = inputTF3.y + inputTF3.height + 10;
        if (Api.allianceVoApi.isHideQQ()) {
            qqText.visible = false;
            inputTF3.visible = false;
            noticeText.y = inputTF2.y + inputTF2.height + 10;
        }
        this.addChildToContainer(noticeText);
        var inputTF4 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 500, 100, "public_tc_srkbg05", LanguageManager.getlocal("allianceCreateMsgholder"), TextFieldConst.COLOR_WHITE, allianceVo.message);
        inputTF4.x = inputTF2.x;
        inputTF4.y = noticeText.y + noticeText.height + 15;
        this.addChildToContainer(inputTF4);
        this._inputNotice = inputTF4.getChildByName("textField");
        this._inputNotice.y = 10;
        this._inputNotice.height = 90;
        this._inputNotice.width = 490;
        this._inputNotice.maxChars = 80;
        this._inputNotice.multiline = true;
        //联盟公告
        var msgText = ComponentManager.getTextField(LanguageManager.getlocal("allianceCreateMsgTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        msgText.x = weixinText.x;
        msgText.y = inputTF4.y + inputTF4.height + 10;
        this.addChildToContainer(msgText);
        var inputTF5 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, 500, 100, "public_tc_srkbg05", LanguageManager.getlocal("allianceCreateMsgholder"), TextFieldConst.COLOR_WHITE, allianceVo.intro);
        inputTF5.x = inputTF2.x;
        inputTF5.y = msgText.y + msgText.height + 15;
        this.addChildToContainer(inputTF5);
        this._inputMsg = inputTF5.getChildByName("textField");
        this._inputMsg.y = 10;
        this._inputMsg.height = 90;
        this._inputMsg.width = 490;
        this._inputMsg.maxChars = 80;
        this._inputMsg.multiline = true;
        // if(allianceVo.intro != ""){
        // 	this._inputMsg.text = allianceVo.intro;
        // 	this._inputMsg.textColor = TextFieldConst.COLOR_WHITE;
        // 	this._inputMsg.bindData = true;
        // }
        var changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceInfoSave", this.createHandler, this);
        changeBtn.x = this.viewBg.width / 2 - changeBtn.width / 2;
        changeBtn.y = inputTF5.y + inputTF5.height + 25;
        // changeBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(changeBtn);
    };
    AllianceInfoPopupView.prototype.reNameCilck = function () {
        ViewController.getInstance().openView(ViewConst.POPUP.NAMEPOPUPVIEW, { type: 4, confirmCallback: this.reNameCallBack, handler: this });
    };
    AllianceInfoPopupView.prototype.reNameCallBack = function () {
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var nameStr = LanguageManager.getlocal("allianceInfoName2", [allianceVo.name]);
        this._nameTF.text = nameStr;
        this._penIcon.x = this._nameTF.x + this._nameTF.width + 10;
    };
    AllianceInfoPopupView.prototype.createHandler = function (param) {
        // //名字检测
        // let txtStr:string=this._inputName.text;
        // if(!App.StringUtil.userNameCheck(txtStr))
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip1"));
        // 	return;
        // }
        // if( txtStr.length < 2 || txtStr.length > 6)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("guideChangeNameTip2"));
        // 	return;
        // }
        // if(Config.ShieldCfg.checkShield(txtStr)==false)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
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
        var notice = this._inputNotice.text;
        msg = msg.replace(/[\r\n]/g, "");
        notice = notice.replace(/[\r\n]/g, "");
        if (Config.ShieldCfg.checkOnlyShield(msg) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (Config.ShieldCfg.checkOnlyShield(qq) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (Config.ShieldCfg.checkOnlyShield(notice) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (!this._inputNotice.bindData) {
            notice = "";
        }
        if (!this._inputQQ.bindData) {
            qq = "";
        }
        if (!this._inputWeixin.bindData) {
            weixin = "";
        }
        if (!this._inputMsg.bindData) {
            msg = "";
        }
        var joinSwitch = 0;
        if (PlatformManager.checkIsMwSp()) {
            this.request(NetRequestConst.REQUEST_ALLIANCE_MODINFO, {
                cweixin: weixin, cqq: qq, message: notice, intro: msg,
                server_name: ServerCfg.selectServer.sname,
            });
        }
        else {
            this.request(NetRequestConst.REQUEST_ALLIANCE_MODINFO, { cweixin: weixin, cqq: qq, message: notice, intro: msg });
        }
    };
    //请求回调
    AllianceInfoPopupView.prototype.receiveData = function (data) {
        if (!data.ret) {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_MODINFO) {
            if (PlatformManager.checkIsWxmgSp() && data.data.data.msgres && data.data.data.msgres.data.result == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
                return;
            }
            if (PlatformManager.checkIsWxmgSp() && data.data.data.introres && data.data.data.introres.data.result == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
                return;
            }
            if (PlatformManager.checkIsMwSp() && data.data && data.data.data.msgres) {
                if (data.data.data.msgres.result && data.data.data.msgres.result == "verify_fail") {
                    App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
                    return;
                }
            }
            if (this.param.data.callback) {
                // this.param.data.callback.apply(this.param.data.handler,[]);
                // this.hide();
            }
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceInfoSaveTip"));
            this.hide();
        }
    };
    AllianceInfoPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shield_cn"
        ]);
    };
    AllianceInfoPopupView.prototype.getTitleStr = function () {
        //  this._type = this.param.data.type 
        return "allianceFindIInfo";
    };
    AllianceInfoPopupView.prototype.dispose = function () {
        // this.removeTouchTap();
        this._inputWeixin = null;
        this._inputQQ = null;
        this._inputNotice = null;
        this._inputMsg = null;
        this._penIcon = null;
        this._nameTF = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceInfoPopupView;
}(PopupView));
__reflect(AllianceInfoPopupView.prototype, "AllianceInfoPopupView");
