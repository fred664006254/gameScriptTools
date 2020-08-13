/**
 * 编号查找玩家
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkFindPopupView
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
var StudyatkFindPopupView = (function (_super) {
    __extends(StudyatkFindPopupView, _super);
    function StudyatkFindPopupView() {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._findInfo = null;
        _this._gotoBtn = null;
        return _this;
    }
    StudyatkFindPopupView.prototype.initView = function () {
        var typeBg = BaseBitmap.create("public_9_bg4");
        typeBg.width = 518;
        typeBg.height = 500;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 12);
        this.addChildToContainer(typeBg);
        this._findTxtNodeControler = new BaseDisplayObjectContainer();
        var titleText = ComponentManager.getTextField(LanguageManager.getlocal("playerIdFind"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleText.setPosition(52 + GameData.popupviewOffsetX, 27 + typeBg.y);
        this.addChildToContainer(titleText);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, 44, "public_chatinputbg", LanguageManager.getlocal("inputPlayerId"), 0xa4917f);
        inputTF.x = this.viewBg.width / 2 - inputTF.width / 2;
        inputTF.y = typeBg.y + 55;
        this.addChildToContainer(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.restrict = "0-9";
        this._inputTextField.maxChars = 40;
        //查找按钮
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "find", this.findHandle, this);
        confirmBtn.setPosition(this.viewBg.width - confirmBtn.width - 55 - GameData.popupviewOffsetX, inputTF.y + inputTF.height + 12);
        this.addChildToContainer(confirmBtn);
        //宴会信息
        var infoText = ComponentManager.getTextField(LanguageManager.getlocal("studyatk_find_teamInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoText.setPosition(titleText.x, 155 + typeBg.y);
        this.addChildToContainer(infoText);
        var rankBg = BaseBitmap.create("public_9_probiginnerbg");
        rankBg.width = 500;
        rankBg.height = 228;
        this._rankBg = rankBg;
        rankBg.setPosition(this.viewBg.width / 2 - rankBg.width / 2, infoText.y + infoText.height + 8);
        this.addChildToContainer(rankBg);
        this._gotoBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.gotoHandle, this);
        this._gotoBtn.setPosition(confirmBtn.x, rankBg.y + rankBg.height + 12);
        this.addChildToContainer(this._gotoBtn);
        this._gotoBtn.visible = false;
        this.addChildToContainer(this._findTxtNodeControler);
    };
    StudyatkFindPopupView.prototype.findHandle = function () {
        if (this._inputTextField.text.length < 5 || this._inputTextField.text == LanguageManager.getlocal("inputPlayerId")) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        if (Number(this._inputTextField.text) == Api.playerVoApi.getPlayerID()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("dinnerCannotSelf"));
            return;
        }
        this.request(NetRequestConst.REQUEST_STUDYATK_GETATK, { "fuid": Number(this._inputTextField.text) });
    };
    StudyatkFindPopupView.prototype.gotoHandle = function () {
        var lastTime = GameConfig.config.studyatkbaseCfg.lastTime;
        if (this._findInfo && this._findInfo.skillinfo && this._findInfo.skillinfo.lastTime) {
            lastTime = this._findInfo.skillinfo.lastTime;
        }
        if (this._findInfo.create_time + lastTime < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_joincode-2"));
            return;
        }
        var info = this._findInfo;
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW, info);
        this.hide();
    };
    StudyatkFindPopupView.prototype.receiveData = function (data) {
        if (data.ret == true) {
            if (data.data.data.dinnerinfo && !data.data.data.dinnerinfo.dtype) {
                App.CommonUtil.showTip(LanguageManager.getlocal("playerIdIsNoDinner"));
                return;
            }
            if (data.data.data.proflag == 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2"));
                return;
            }
            this._gotoBtn.visible = true;
            this._findInfo = data.data.data.getatk;
            this.showFindInfo();
        }
        else {
            //兼容错误
            if (data.data.ret == -2) {
                App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2"));
                return;
            }
        }
    };
    StudyatkFindPopupView.prototype.showFindInfo = function () {
        this._findTxtNodeControler.removeChildren();
        var txtCfg = undefined;
        /**
         * 有房间
         */
        if (this._findInfo.create_time) {
            /**
             * 自己创建
             */
            var studyatkbaseCfg = GameConfig.config.studyatkbaseCfg;
            var addPerMin = studyatkbaseCfg.levelList[String(this._findInfo.level)];
            var lastTime = GameConfig.config.studyatkbaseCfg.lastTime;
            if (this._findInfo.skillinfo && this._findInfo.skillinfo.lastTime) {
                lastTime = this._findInfo.skillinfo.lastTime;
            }
            var lastT = this._findInfo.create_time + lastTime - GameData.serverTime;
            var lastTStr = App.DateUtil.getFormatBySecond(lastT, 3);
            var mLen = String(Object.keys(this._findInfo.minfo).length + 1);
            if (this._findInfo.dtype == 1) {
                txtCfg = [
                    LanguageManager.getlocal("studyatk_find_txt1", [this._findInfo.name]),
                    LanguageManager.getlocal("studyatk_find_txt2", [LanguageManager.getlocal("officialTitle" + this._findInfo.level)]),
                    LanguageManager.getlocal("studyatk_find_txt3", [mLen]),
                    LanguageManager.getlocal("studyatk_find_txt4", [addPerMin]),
                    LanguageManager.getlocal("studyatk_find_txt5", [lastTStr]),
                ];
            }
            else {
                txtCfg = [
                    LanguageManager.getlocal("studyatk_find_txt6"),
                    LanguageManager.getlocal("studyatk_find_txt3", [mLen]),
                    LanguageManager.getlocal("studyatk_find_txt5", [lastTStr]),
                ];
            }
        }
        else {
            this._gotoBtn.visible = false;
            txtCfg = [
                LanguageManager.getlocal("studyatk_find_txt7"),
            ];
        }
        var startY = this._rankBg.y + 15;
        for (var index = 0; index < txtCfg.length; index++) {
            var findText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
            findText.text = txtCfg[index];
            findText.setPosition(this._rankBg.x + 20, startY);
            findText.width = 460;
            findText.lineSpacing = 5;
            startY += findText.height + 10;
            this._findTxtNodeControler.addChild(findText);
        }
    };
    StudyatkFindPopupView.prototype.dispose = function () {
        this._inputTextField = null;
        this._findInfo = null;
        this._gotoBtn = null;
        this._rankBg = null;
        this._findTxtNodeControler = null;
        _super.prototype.dispose.call(this);
    };
    return StudyatkFindPopupView;
}(PopupView));
__reflect(StudyatkFindPopupView.prototype, "StudyatkFindPopupView");
//# sourceMappingURL=StudyatkFindPopupView.js.map