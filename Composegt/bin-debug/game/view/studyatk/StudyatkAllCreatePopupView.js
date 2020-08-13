/**
 * 编号查找玩家
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkCreatePopupView
 */
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
var StudyatkAllCreatePopupView = (function (_super) {
    __extends(StudyatkAllCreatePopupView, _super);
    function StudyatkAllCreatePopupView() {
        var _this = _super.call(this) || this;
        _this.needItem = null;
        _this.needAllianceItem = null;
        return _this;
    }
    StudyatkAllCreatePopupView.prototype.initView = function () {
        this.needItem = GameConfig.config.studyatkbaseCfg.needItem;
        this.needAllianceItem = GameConfig.config.studyatkbaseCfg.needAllianceItem;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE), this.studyBtnHandlerCallback, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var addExp = GameConfig.config.studyatkbaseCfg.addExp;
        var tipTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        tipTxt.multiline = true;
        tipTxt.width = 500;
        tipTxt.lineSpacing = 5;
        tipTxt.text = LanguageManager.getlocal("studyatk_createTipTxt", [String(addExp + 1)]);
        tipTxt.x = this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = 20;
        this._nodeContainer.addChild(tipTxt);
        var bottomBg = BaseBitmap.create("public_tc_bg01");
        bottomBg.width = 520;
        bottomBg.height = 80;
        bottomBg.x = this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = tipTxt.y + tipTxt.height + 15;
        this._nodeContainer.addChild(bottomBg);
        var txt1 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt1.text = LanguageManager.getlocal("studyatk_createTxt1", [Api.playerVoApi.getPlayerOffice()]);
        txt1.x = bottomBg.x + 30;
        txt1.y = bottomBg.y + 30;
        this._nodeContainer.addChild(txt1);
        var studyatkbaseCfg = GameConfig.config.studyatkbaseCfg;
        var addPerMin = studyatkbaseCfg.levelList[String(Api.playerVoApi.getPlayerLevel())];
        var txt2 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt2.text = LanguageManager.getlocal("studyatk_createTxt2", [addPerMin]);
        txt2.x = txt1.x + 250;
        txt2.y = txt1.y;
        this._nodeContainer.addChild(txt2);
        //anniu
        var needItemNum = Api.itemVoApi.getItemNumInfoVoById(this.needItem);
        var icon3 = BaseLoadBitmap.create("itemicon" + this.needItem);
        icon3.width = 100;
        icon3.height = 100;
        icon3.scaleX = 0.7;
        icon3.scaleY = 0.7;
        this._nodeContainer.addChild(icon3);
        var txt3 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        if (needItemNum >= 1) {
            txt3.text = LanguageManager.getlocal("studyatk_allcreateTxt3", [String(needItemNum)]);
        }
        else {
            txt3.text = LanguageManager.getlocal("studyatk_allcreateTxt4");
        }
        this._nodeContainer.addChild(txt3);
        icon3.x = 170 - (icon3.width * 0.7 + txt3.width) / 2;
        icon3.y = bottomBg.y + bottomBg.height + 5;
        txt3.x = icon3.x + icon3.width * 0.7;
        txt3.y = icon3.y + icon3.height * 0.7 / 2 - txt3.height / 2;
        //-------------
        var needAllianceItemNum = Api.itemVoApi.getItemNumInfoVoById(this.needAllianceItem);
        var icon4 = BaseLoadBitmap.create("itemicon" + this.needAllianceItem);
        icon4.width = 100;
        icon4.height = 100;
        icon4.scaleX = 0.7;
        icon4.scaleY = 0.7;
        this._nodeContainer.addChild(icon4);
        var txt4 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_BROWN);
        if (needAllianceItemNum >= 1) {
            txt4.text = LanguageManager.getlocal("studyatk_allcreateTxt3", [String(needAllianceItemNum)]);
        }
        else {
            txt4.text = LanguageManager.getlocal("studyatk_allcreateTxt4");
        }
        this._nodeContainer.addChild(txt4);
        icon4.x = this.viewBg.width - 170 - (icon4.width * 0.7 + txt4.width) / 2;
        icon4.y = icon3.y;
        txt4.x = icon4.x + icon4.width * 0.7;
        txt4.y = icon4.y + icon4.height * 0.7 / 2 - txt4.height / 2;
        //-------
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "studyatkCreatePopupViewTitle", this.confirmHandler, this);
        confirmBtn.x = 170 - confirmBtn.width / 2; //this.viewBg.width - confirmBtn.width - cancelBtn.x ;
        confirmBtn.y = icon3.y + icon3.height * 0.7 + 5; //cancelBtn.y ;
        this._nodeContainer.addChild(confirmBtn);
        var confirmAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "studyatkAllCreatePopupViewTitle", this.confirmAllHandler, this);
        confirmAllBtn.x = this.viewBg.width - 170 - confirmAllBtn.width / 2; //this.viewBg.width - confirmBtn.width - cancelBtn.x ;
        confirmAllBtn.y = confirmBtn.y; //cancelBtn.y ;
        this._nodeContainer.addChild(confirmAllBtn);
    };
    StudyatkAllCreatePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (Api.switchVoApi.checkOpenStudyatkExp()) {
            var buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("studyatkAddExp"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width, this.viewBg.y + this.viewBg.height);
            this.addChild(buttomTip);
        }
    };
    StudyatkAllCreatePopupView.prototype.studyBtnHandlerCallback = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip2"));
        }
        this.hide();
    };
    StudyatkAllCreatePopupView.prototype.confirmHandler = function () {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(this.needItem);
        if (itemNum > 0) {
            NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE, {});
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip1"));
        }
    };
    StudyatkAllCreatePopupView.prototype.confirmAllHandler = function () {
        var id = Api.playerVoApi.getPlayerAllianceId();
        if ((!id) || id <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip4"));
            return;
        }
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(this.needAllianceItem);
        if (itemNum > 0) {
            //帮会聊天发消息
            var txtStr = LanguageManager.getlocal("allinaceChatMsg4");
            var chatData = {};
            chatData.channel = Api.playerVoApi.getPlayerAllianceId();
            chatData.message = txtStr;
            NetManager.requestChat(chatData);
            NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE, { ctype: 1 });
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip3"));
        }
    };
    StudyatkAllCreatePopupView.prototype.cancelHandler = function () {
        this.hide();
    };
    StudyatkAllCreatePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE), this.studyBtnHandlerCallback, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    StudyatkAllCreatePopupView.itemId = "1751";
    return StudyatkAllCreatePopupView;
}(PopupView));
__reflect(StudyatkAllCreatePopupView.prototype, "StudyatkAllCreatePopupView");
