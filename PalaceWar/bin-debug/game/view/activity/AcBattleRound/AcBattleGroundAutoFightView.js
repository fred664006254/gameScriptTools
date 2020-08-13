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
var AcBattleGroundAutoFightView = (function (_super) {
    __extends(AcBattleGroundAutoFightView, _super);
    function AcBattleGroundAutoFightView() {
        var _this = _super.call(this) || this;
        _this._dotBtns = [];
        _this._dotIdx = 0;
        _this._callbackF = null;
        _this._obj = null;
        _this._fightNum = 0;
        _this._fightName = null;
        return _this;
    }
    Object.defineProperty(AcBattleGroundAutoFightView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAutoFightView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAutoFightView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAutoFightView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundAutoFightView.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundAutoFightView.prototype.initView = function () {
        if (this.param.data && this.param.data.f && this.param.data.o) {
            this._obj = this.param.data.o;
            this._callbackF = this.param.data.f;
        }
        var gemsBg = BaseBitmap.create("public_9_resbg");
        gemsBg.setPosition(32 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(gemsBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 45, 45);
        var goldIcon = BaseLoadBitmap.create("itemicon1", rect);
        goldIcon.setPosition(gemsBg.x - 1, gemsBg.y + gemsBg.height / 2 - 45 / 2);
        this.addChildToContainer(goldIcon);
        var goldText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        goldText.setPosition(goldIcon.x + 50, gemsBg.y + gemsBg.height / 2 - goldText.height / 2);
        this.addChildToContainer(goldText);
        gemsBg.width = goldText.width + 70;
        var moraleBg = BaseBitmap.create("public_9_resbg");
        moraleBg.setPosition(280 + GameData.popupviewOffsetX, 12);
        this.addChildToContainer(moraleBg);
        var moraleIcon = BaseBitmap.create("atkrace_morale");
        moraleIcon.setPosition(moraleBg.x + 3, moraleBg.y + moraleBg.height / 2 - 45 / 2);
        this.addChildToContainer(moraleIcon);
        var moraleText = ComponentManager.getTextField(this.vo.getMyInfo().morale.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        moraleText.setPosition(moraleIcon.x + 50, moraleBg.y + moraleBg.height / 2 - moraleText.height / 2);
        this.addChildToContainer(moraleText);
        moraleBg.width = moraleText.width + 70;
        var typeBg = BaseBitmap.create("public_9_probiginnerbg");
        typeBg.width = 528;
        typeBg.height = 250;
        typeBg.setPosition(this.viewBg.width / 2 - typeBg.width / 2, 65);
        this.addChildToContainer(typeBg);
        var posY = typeBg.y + 30;
        var optionText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        optionText.width = 460;
        optionText.textAlign = egret.HorizontalAlign.CENTER;
        optionText.lineSpacing = 6;
        optionText.setPosition(this.viewBg.width / 2 - optionText.width / 2, posY);
        this.addChildToContainer(optionText);
        posY += optionText.height + 23;
        var posX = 38 + GameData.popupviewOffsetX;
        for (var i = 1; i <= 4; i++) {
            var dot = BaseBitmap.create("public_dot3");
            dot.setPosition(posX, posY);
            this.addChildToContainer(dot);
            this._dotBtns.push(dot);
            var option = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFightOption" + i), TextFieldConst.FONTSIZE_CONTENT_COMMON);
            option.width = 460;
            option.setPosition(dot.x + 35, posY);
            this.addChildToContainer(option);
            var containerBg = BaseBitmap.create("public_alphabg");
            containerBg.width = 500;
            containerBg.height = option.height + 11;
            containerBg.x = dot.x;
            containerBg.y = dot.y - 11;
            containerBg.addTouchTap(this.dotHandle, this, [i]);
            this.addChildToContainer(containerBg);
            posY += option.height + 22;
        }
        this.dotHandle(null, 4);
        posY += 2;
        var line = BaseBitmap.create("public_line1");
        line.setPosition(this.viewBg.width / 2 - line.width / 2, posY);
        this.addChildToContainer(line);
        posY += 20;
        var infoDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoDesc2.setPosition(posX, posY);
        this.addChildToContainer(infoDesc2);
        var infoDesc3 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        infoDesc3.setPosition(280, infoDesc2.y);
        this.addChildToContainer(infoDesc3);
        var myAtkInfo = this.vo.getMyFightInfo();
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
        posY += infoDesc2.height + 23;
        var infoText2 = ComponentManager.getTextField(atkAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        infoText2.setPosition(infoDesc2.x + infoDesc2.width, infoDesc2.y);
        this.addChildToContainer(infoText2);
        var infoText3 = ComponentManager.getTextField(skillAdd.toString() + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_GREEN);
        infoText3.setPosition(infoDesc3.x + infoDesc3.width, infoDesc3.y);
        this.addChildToContainer(infoText3);
        var bloodText = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_property3"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        bloodText.setPosition(posX, posY);
        this.addChildToContainer(bloodText);
        var progressBar = ComponentManager.getProgressBar("progress8", "progress7_bg", 440);
        progressBar.x = bloodText.x + bloodText.width + 20;
        progressBar.y = bloodText.y - progressBar.height / 2 + bloodText.height / 2;
        this.addChildToContainer(progressBar);
        posY += bloodText.height + 23;
        progressBar.setText(myInfo.attr + "/" + myInfo.fullattr);
        progressBar.setPercentage(myInfo.attr / myInfo.fullattr);
        typeBg.height = posY - typeBg.y;
        var autoFight = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "atkraceFight", this.attAllClickHandler, this);
        autoFight.setPosition(this.viewBg.width / 2 - autoFight.width / 2, typeBg.y + 20 + typeBg.height);
        this.addChildToContainer(autoFight);
    };
    AcBattleGroundAutoFightView.prototype.attAllClickHandler = function () {
        this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_AUTOFIGHT, { pos: this._dotIdx, activeId: this.acTivityId });
    };
    //请求回调
    AcBattleGroundAutoFightView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_AUTOFIGHT) {
            if (rData.data.battleground) {
                this.vo.setRaceInfo(rData.data.battleground);
            }
            if (data.data.data.newRound) {
                this._callbackF.apply(this._obj);
                this.hideLoadingMask();
                this.hide();
                return;
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND);
            ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFIGHTINFOPOPUPVIEW, { info: { info: rData.data.alllogs,
                    pos: this._dotIdx,
                    respTmpAttr: rData.data.respTmpAttr,
                    respMesid: rData.data.respMesid,
                    fightNum: this._fightNum,
                    oppoName: this._fightName,
                },
                f: this._callbackF,
                o: this._obj,
                type: 3,
                morale: this.vo.getMyInfo().morale,
                fameAdd: 5
            });
            this.hide();
        }
    };
    AcBattleGroundAutoFightView.prototype.dotHandle = function (obj, idx) {
        if (idx != this._dotIdx) {
            if (this._dotIdx) {
                this._dotBtns[this._dotIdx - 1].texture = ResourceManager.getRes("public_dot3");
            }
            this._dotBtns[idx - 1].texture = ResourceManager.getRes("public_dot4");
            this._dotIdx = idx;
        }
    };
    // 计算背景高度时使用，在container高度的基础上添加该高度
    AcBattleGroundAutoFightView.prototype.getBgExtraHeight = function () {
        return 15;
    };
    AcBattleGroundAutoFightView.prototype.getTitleStr = function () {
        return "atkraceAutoFightPopupViewTitle";
    };
    AcBattleGroundAutoFightView.prototype.dispose = function () {
        this._dotBtns.length = 0;
        this._dotIdx = 0;
        this._callbackF = null;
        this._obj = null;
        this._fightNum = 0;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundAutoFightView;
}(PopupView));
__reflect(AcBattleGroundAutoFightView.prototype, "AcBattleGroundAutoFightView");
//# sourceMappingURL=AcBattleGroundAutoFightView.js.map