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
var StudyatkCreatePopupView = (function (_super) {
    __extends(StudyatkCreatePopupView, _super);
    function StudyatkCreatePopupView() {
        return _super.call(this) || this;
    }
    StudyatkCreatePopupView.prototype.initView = function () {
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
        bottomBg.height = 154;
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
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
        var txt3 = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (itemNum >= 1) {
            txt3.text = LanguageManager.getlocal("studyatk_createTxt3", [String(itemNum)]);
        }
        else {
            txt3.text = LanguageManager.getlocal("studyatk_createTxt4");
        }
        txt3.x = txt1.x;
        txt3.y = txt1.y + 50;
        this._nodeContainer.addChild(txt3);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "cancelBtn", this.cancelHandler, this);
        cancelBtn.x = 100;
        cancelBtn.y = bottomBg.y + bottomBg.height + 20;
        this._nodeContainer.addChild(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "studyatkCreatePopupViewTitle", this.confirmHandler, this);
        confirmBtn.x = this.viewBg.width - confirmBtn.width - cancelBtn.x;
        confirmBtn.y = cancelBtn.y;
        this._nodeContainer.addChild(confirmBtn);
    };
    StudyatkCreatePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        if (Api.switchVoApi.checkOpenStudyatkExp()) {
            var buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("studyatkAddExp"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width, this.viewBg.y + this.viewBg.height);
            this.addChild(buttomTip);
        }
    };
    StudyatkCreatePopupView.prototype.studyBtnHandlerCallback = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip2"));
        }
        this.hide();
    };
    StudyatkCreatePopupView.prototype.confirmHandler = function () {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
        if (itemNum > 0) {
            NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE, {});
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip1"));
        }
    };
    StudyatkCreatePopupView.prototype.cancelHandler = function () {
        this.hide();
    };
    StudyatkCreatePopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_CREATE), this.studyBtnHandlerCallback, this);
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    StudyatkCreatePopupView.itemId = "1751";
    return StudyatkCreatePopupView;
}(PopupView));
__reflect(StudyatkCreatePopupView.prototype, "StudyatkCreatePopupView");
