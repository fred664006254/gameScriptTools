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
var AtkraceAutoFightPopupView = (function (_super) {
    __extends(AtkraceAutoFightPopupView, _super);
    function AtkraceAutoFightPopupView() {
        var _this = _super.call(this) || this;
        _this._dotBtns = [];
        _this._dotIdx = 0;
        _this._callbackF = null;
        _this._obj = null;
        _this._fightNum = 0;
        _this._fightName = null;
        return _this;
    }
    /**生成新标头 */
    AtkraceAutoFightPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    AtkraceAutoFightPopupView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        // let titleBg:BaseBitmap = BaseBitmap.create("public_tc_bg02");
        // titleBg.setPosition(55,12);
        // this.addChildToContainer(titleBg);
        var resBar = ComponentManager.getResBar(1, true, 175);
        resBar.setPosition(120, 30);
        this.addChildToContainer(resBar);
        var moraleBg = BaseBitmap.create("public_hb_bg01");
        moraleBg.setPosition(380, 30);
        this.addChildToContainer(moraleBg);
        var moraleIcon = BaseBitmap.create("atkrace_morale");
        moraleIcon.setPosition(moraleBg.x + 3, moraleBg.y + moraleBg.height / 2 - 45 / 2);
        this.addChildToContainer(moraleIcon);
        var moraleText = ComponentManager.getTextField(Api.atkraceVoApi.getMyInfo().morale.toString(), 20, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        moraleText.setPosition(moraleIcon.x + 50, moraleBg.y + moraleBg.height / 2 - moraleText.height / 2);
        this.addChildToContainer(moraleText);
        moraleBg.width = moraleText.width + 70;
        var typeBg = BaseBitmap.create("public_9v_bg12");
        typeBg.width = 530;
        typeBg.height = 450;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 80);
        this.addChildToContainer(typeBg);
        var typeBg2 = BaseBitmap.create("public_9v_bg12");
        typeBg2.width = 530;
        typeBg2.height = 155;
        typeBg2.x = this.viewBg.width / 2 - typeBg2.width / 2;
        typeBg2.y = typeBg.y + typeBg.height + 10;
        this.addChildToContainer(typeBg2);
        var posY = typeBg.y + 30;
        var optionText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        optionText.width = 460;
        optionText.textAlign = egret.HorizontalAlign.CENTER;
        optionText.lineSpacing = 6;
        optionText.setPosition(this.viewBg.width / 2 - optionText.width / 2, posY - 10);
        this.addChildToContainer(optionText);
        posY += optionText.height + 43;
        var posX = 70;
        for (var i = 1; i <= 4; i++) {
            var dot = BaseBitmap.create("public_select");
            dot.setPosition(posX, posY);
            this.addChildToContainer(dot);
            this._dotBtns.push(dot);
            var option = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption" + i), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
            option.width = 460;
            option.setPosition(dot.x + 45, posY + 7);
            this.addChildToContainer(option);
            var containerBg = BaseBitmap.create("public_alphabg");
            containerBg.width = 500;
            containerBg.height = option.height + 11;
            containerBg.x = dot.x;
            containerBg.y = dot.y;
            containerBg.addTouchTap(this.dotHandle, this, [i]);
            this.addChildToContainer(containerBg);
            posY += option.height + 27;
        }
        this.dotHandle(null, 4);
        // posY+=2;
        // let line:BaseBitmap = BaseBitmap.create("public_line1");
        // line.setPosition(this.viewBg.width/2-line.width/2,posY);
        // this.addChildToContainer(line);
        // posY+=20;
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        infoDesc2.setPosition(90, typeBg2.y + 25);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        infoDesc3.setPosition(400, infoDesc2.y);
        this.addChildToContainer(infoDesc3);
        var myAtkInfo = Api.atkraceVoApi.getMyFightInfo();
        var myInfo = myAtkInfo.mesid;
        this._fightName = myAtkInfo.getFName();
        var tmpatt = myAtkInfo.tmpattr;
        var atkAdd = 0;
        var skillAdd = 0;
        if (tmpatt) {
            if (tmpatt.atk) {
                atkAdd = Math.floor(tmpatt.atk * 100);
            }
            if (tmpatt.skill) {
                skillAdd = Math.floor(tmpatt.skill * 100);
            }
        }
        // posY +=infoDesc2.height + 23;
        var infoText2 = ComponentManager.getTextField(atkAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
        infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(skillAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN_NEW);
        infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(infoText3);
        var bloodText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        bloodText.setPosition(infoDesc2.x, infoDesc2.y + 60);
        this.addChildToContainer(bloodText);
        var tempAttr = Number(myInfo.attr);
        tempAttr = tempAttr > 0 ? tempAttr : 0;
        //血量具体
        var bloodText2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED_NEW);
        bloodText2.setPosition(bloodText.width + bloodText.x + 20, bloodText.y);
        bloodText2.text = tempAttr + "/" + myInfo.fullattr;
        this.addChildToContainer(bloodText2);
        var progressBar = ComponentManager.getProgressBar("progress_type3_red", "progress_type3_bg", 470);
        progressBar.x = this.viewBg.width / 2 - progressBar.width / 2;
        progressBar.y = typeBg2.y + 115;
        this.addChildToContainer(progressBar);
        // posY +=bloodText.height + 23;
        // progressBar.setText( myInfo.attr + "/"+ myInfo.fullattr);
        progressBar.setPercentage(tempAttr / myInfo.fullattr);
        // typeBg.height =  posY - typeBg.y;
        // typeBg2.height = typeBg.height - 20;
        var autoFight = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "atkraceFight", this.attAllClickHandler, this);
        autoFight.setPosition(this.viewBg.width / 2 - autoFight.width / 2, typeBg2.y + typeBg2.height);
        this.addChildToContainer(autoFight);
    };
    AtkraceAutoFightPopupView.prototype.attAllClickHandler = function () {
        this.request(NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT, { pos: this._dotIdx });
    };
    //请求回调
    AtkraceAutoFightPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACE_BATCH_FIGHT_RET_REFRESH);
            return;
        }
        if (rData.cmd == NetRequestConst.REQUEST_ATKRACE_BATCHFIGHT) {
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFIGHTINFOPOPUPVIEW, { info: { info: rData.data.alllogs,
                    pos: this._dotIdx,
                    respTmpAttr: rData.data.respTmpAttr,
                    respMesid: rData.data.respMesid,
                    fightNum: this._fightNum,
                    oppoName: this._fightName,
                },
                f: this._callbackF,
                o: this._obj });
            this.hide();
        }
    };
    AtkraceAutoFightPopupView.prototype.dotHandle = function (obj, idx) {
        if (idx != this._dotIdx) {
            if (this._dotIdx) {
                this._dotBtns[this._dotIdx - 1].texture = ResourceManager.getRes("public_select");
            }
            this._dotBtns[idx - 1].texture = ResourceManager.getRes("public_select_down");
            this._dotIdx = idx;
        }
    };
    AtkraceAutoFightPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_select", "public_select_down",
        ]);
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    AtkraceAutoFightPopupView.prototype.getBgExtraHeight = function () {
        return 25;
    };
    AtkraceAutoFightPopupView.prototype.dispose = function () {
        this._dotBtns.length = 0;
        this._dotIdx = 0;
        this._callbackF = null;
        this._obj = null;
        this._fightNum = 0;
        _super.prototype.dispose.call(this);
    };
    return AtkraceAutoFightPopupView;
}(PopupView));
__reflect(AtkraceAutoFightPopupView.prototype, "AtkraceAutoFightPopupView");
