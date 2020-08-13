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
        var _this = _super.call(this) || this;
        _this._dragProgressBar = null;
        _this._useNum = 0;
        _this._text = null;
        _this._timetext = null;
        _this.maxnum = 0;
        _this._havetxt = null;
        return _this;
    }
    StudyatkCreatePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2", "progress2_bg"
        ]);
    };
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
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 520;
        bottomBg.height = 170;
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
        // this.maxnum = Math.min(3,itemNum);
        if (itemNum >= 1) {
            txt3.text = LanguageManager.getlocal("studyatk_createTxt3", ['1']);
        }
        else {
            txt3.text = LanguageManager.getlocal("studyatk_createTxt4", ["1"]);
        }
        txt3.x = txt1.x;
        txt3.y = txt1.y + 50;
        this._nodeContainer.addChild(txt3);
        this._text = txt3;
        var txt4 = ComponentManager.getTextField(LanguageManager.getlocal("studyatk_createTxt5", [App.DateUtil.getFormatBySecond(studyatkbaseCfg.lastTime * 1, 16)]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt4.x = txt2.x;
        txt4.y = txt3.y;
        this._timetext = txt4;
        this._nodeContainer.addChild(txt4);
        //
        this._useNum = 1;
        this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", 3, this.dragCallback, this, null, 1, 380);
        this._dragProgressBar.setPosition(90 + GameData.popupviewOffsetX + 5, txt3.y + txt3.height + 20);
        this._nodeContainer.addChild(this._dragProgressBar);
        this._dragProgressBar.setMinNum(0);
        var cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.cancelHandler, this);
        cancelBtn.x = 80 + GameData.popupviewOffsetX;
        cancelBtn.y = bottomBg.y + bottomBg.height + 36;
        this._nodeContainer.addChild(cancelBtn);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "studyatkCreatePopupViewTitle", this.confirmHandler, this);
        confirmBtn.x = this.viewBg.width - confirmBtn.width - cancelBtn.x;
        confirmBtn.y = cancelBtn.y;
        this._nodeContainer.addChild(confirmBtn);
        var icon = BaseLoadBitmap.create("itemicon" + StudyatkCreatePopupView.itemId);
        icon.width = 100;
        icon.height = 100;
        this._nodeContainer.addChild(icon);
        icon.setScale(0.3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, confirmBtn, [confirmBtn.width / 2 - icon.scaleX * icon.width - 3, -(icon.height * icon.scaleY) + 2]);
        var havetxt = ComponentManager.getTextField(this._useNum + "/" + itemNum, 20, itemNum >= this._useNum ? TextFieldConst.COLOR_BLACK : TextFieldConst.COLOR_WARN_RED);
        this._nodeContainer.addChild(havetxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, havetxt, icon, [icon.width * icon.scaleX - 3, 0]);
        this._havetxt = havetxt;
    };
    StudyatkCreatePopupView.prototype.dragCallback = function (curNum) {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
        this._useNum = curNum;
        if (this._useNum == 0) {
            this._dragProgressBar.setDragPercent(1, 3);
            this._useNum = 1;
        }
        this._havetxt.text = this._useNum + "/" + itemNum;
        this._havetxt.setColor(itemNum >= this._useNum ? TextFieldConst.COLOR_BLACK : TextFieldConst.COLOR_WARN_RED);
        // let numStr = String(this._useNum) + "/" + String(3);
        this._text.text = LanguageManager.getlocal((itemNum > 0 && itemNum >= curNum) ? "studyatk_createTxt3" : "studyatk_createTxt4", [String(this._useNum)]);
        var studyatkbaseCfg = GameConfig.config.studyatkbaseCfg;
        this._timetext.text = LanguageManager.getlocal("studyatk_createTxt5", [App.DateUtil.getFormatBySecond(studyatkbaseCfg.lastTime * this._useNum, 16)]);
        // this._messageTF.setPosition(this._bg.x + this._bg.width / 2 - this._messageTF.width / 2, this._bg.y + this._bg.height / 2 - this._messageTF.height - 40);
    };
    StudyatkCreatePopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.viewBg.height = 445;
        if (Api.switchVoApi.checkOpenStudyatkExp()) {
            var textKey = void 0;
            if (Api.switchVoApi.checkIsSceneState("202")) {
                textKey = "studyatkCreatePopupViewButtom_withHouseSkin";
            }
            else {
                textKey = "studyatkCreatePopupViewButtom";
            }
            var buttomTip = ComponentManager.getTextField(LanguageManager.getlocal(textKey), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width - GameData.popupviewOffsetX, this.viewBg.y + this.viewBg.height + 10);
            if (PlatformManager.checkIsEnLang()) {
                buttomTip.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomTip.width / 2, this.viewBg.y + this.viewBg.height);
            }
            this.addChild(buttomTip);
        }
    };
    StudyatkCreatePopupView.prototype.studyBtnHandlerCallback = function (event) {
        if (event.data.ret) {
            var rdata = event.data.data;
            if (rdata.ret == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("study_createTip2"));
            }
            this.hide();
        }
        else {
            //兼容处理
        }
    };
    StudyatkCreatePopupView.prototype.confirmHandler = function () {
        var itemNum = Api.itemVoApi.getItemNumInfoVoById(StudyatkCreatePopupView.itemId);
        if (itemNum >= this._useNum) {
            NetManager.request(NetRequestConst.REQUEST_STUDYATK_CREATE, {
                itemNum: this._useNum
            });
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
        this._dragProgressBar = null;
        this._text = null;
        this._timetext = null;
        _super.prototype.dispose.call(this);
    };
    StudyatkCreatePopupView.itemId = "1751";
    return StudyatkCreatePopupView;
}(PopupView));
__reflect(StudyatkCreatePopupView.prototype, "StudyatkCreatePopupView");
//# sourceMappingURL=StudyatkCreatePopupView.js.map