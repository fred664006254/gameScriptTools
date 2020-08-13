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
 * 问题item
 * author qianjun
 */
var AcQuestionItem = (function (_super) {
    __extends(AcQuestionItem, _super);
    function AcQuestionItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._curCheckBox = 0;
        _this._mulCheckBox = [];
        _this._showEff = false;
        _this._maxLength = 0;
        return _this;
    }
    Object.defineProperty(AcQuestionItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_QA;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcQuestionItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcQuestionItem.prototype.getUiCode = function () {
        var currCode = "";
        switch (Number(this.code)) {
            default:
                currCode = "1";
                break;
        }
        return currCode;
    };
    AcQuestionItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 585;
        view._code = itemParam;
        view._mulCheckBox = [];
        this._maxLength = 500;
        if (PlatformManager.checkIsEnLang()) {
            this._maxLength = 800;
        }
        var qaTxt = ComponentManager.getTextField(index + 1 + "." + LanguageManager.getlocal("acQuestion" + (index + 1) + "-" + view.code) + "<font color=0xff3c3c>" + LanguageManager.getlocal("acQuestionType" + data.type + "-" + view.code + (data.type == 2 ? (data.maxSelect ? "b" : "a") : ""), [data.maxSelect]) + "</font>", 20, TextFieldConst.COLOR_BLACK);
        qaTxt.width = 580;
        qaTxt.lineSpacing = 5;
        qaTxt.textAlign = egret.HorizontalAlign.LEFT;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, qaTxt, view, [0, 0], true);
        view.addChild(qaTxt);
        var answer = view.vo.getQuestionAnswer(index + 1);
        //单选
        if (data.type == 1) {
            var _loop_1 = function (i) {
                var checkBox = ComponentManager.getCheckBox("", "qaselcet-" + view.getUiCode());
                checkBox.name = "qabox" + i;
                checkBox.addTouchTap(function () {
                    var box = view.getChildByName("qabox" + view._curCheckBox);
                    if (box && i != view._curCheckBox) {
                        box.setSelected(false);
                    }
                    view._curCheckBox = i;
                }, view, [i]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, checkBox, qaTxt, [20, qaTxt.textHeight + 13 + (i - 1) * (checkBox.height + 5)]);
                view.addChild(checkBox);
                if (answer != '' && i == Number(answer.split("_")[1])) {
                    checkBox.setSelected(true);
                    view._curCheckBox = i;
                }
                var boxTxt = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswer" + (index + 1) + "_" + i + "-" + view.code), 18, TextFieldConst.COLOR_BLACK);
                boxTxt.addTouchTap(function () {
                    var box = view.getChildByName("qabox" + view._curCheckBox);
                    if (box && i != view._curCheckBox) {
                        box.setSelected(false);
                    }
                    view._curCheckBox = i;
                }, view, [i]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, boxTxt, checkBox, [checkBox.width + 10, 0]);
                view.addChild(boxTxt);
                if (i == data.selectNum) {
                    view.height = checkBox.y + 40;
                }
            };
            for (var i = 1; i <= data.selectNum; ++i) {
                _loop_1(i);
            }
        }
        else if (data.type == 2) {
            var str = "";
            if (answer != '') {
                str = answer.split("_")[1];
            }
            var _loop_2 = function (i) {
                var checkBox = ComponentManager.getCheckBox();
                checkBox.removeClilck();
                checkBox.setScale(0.6);
                checkBox.name = "qabox" + i;
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, checkBox, qaTxt, [20, qaTxt.textHeight + 13 + (i - 1) * (checkBox.height * 0.6 + 5)]);
                view.addChild(checkBox);
                checkBox.addTouchTap(function () {
                    var index = view._mulCheckBox.indexOf(i);
                    if (index > -1) {
                        view._mulCheckBox.splice(index, 1);
                        checkBox.selectHandler();
                    }
                    else {
                        if (view._mulCheckBox.length < data.maxSelect) {
                            view._mulCheckBox.push(i);
                            checkBox.selectHandler();
                        }
                    }
                }, view, [i]);
                for (var j in str) {
                    if (Number(str[j]) == i) {
                        checkBox.setSelected(true);
                        view._mulCheckBox.push(i);
                        break;
                    }
                }
                var boxTxt = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswer" + (index + 1) + "_" + i + "-" + view.code), 18, TextFieldConst.COLOR_BLACK);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, boxTxt, checkBox, [checkBox.width * 0.6 + 8, 0]);
                boxTxt.addTouchTap(function () {
                    var index = view._mulCheckBox.indexOf(i);
                    if (index > -1) {
                        view._mulCheckBox.splice(index, 1);
                        checkBox.selectHandler();
                    }
                    else {
                        if (view._mulCheckBox.length < data.maxSelect) {
                            view._mulCheckBox.push(i);
                            checkBox.selectHandler();
                        }
                    }
                }, view, [i]);
                view.addChild(boxTxt);
                if (i == data.selectNum) {
                    view.height = checkBox.y + 40;
                }
            };
            for (var i = 1; i <= data.selectNum; ++i) {
                _loop_2(i);
            }
        }
        else if (data.type == 3) {
            //剩余输入字数 
            var newfontNum = this._maxLength;
            if (answer != '') {
                newfontNum = this._maxLength - answer.length;
            }
            var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 90, "public_9_bg5", LanguageManager.getlocal("acQuestionTip3-" + view.code), 0xb1b1b1, answer);
            inputTF2.name = "inputTF2";
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, qaTxt, [20, qaTxt.textHeight + 10]);
            view.addChild(inputTF2);
            var inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswerWord-" + view.code, [newfontNum + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
            inputMaxText.name = "inputMaxText";
            inputTF2.addChild(inputMaxText);
            var inputtxt = inputTF2.getChildByName("textField");
            inputtxt.maxChars = this._maxLength;
            inputtxt.y = 10;
            inputtxt.height = 50;
            inputtxt.width = 530;
            inputtxt.multiline = true;
            inputtxt.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, inputMaxText, inputTF2, [0, 10], true);
            view.height = inputTF2.y + inputTF2.height + 20;
        }
        var line = BaseBitmap.create("public_line1");
        line.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [0, 5], true);
        view.addChild(line);
    };
    AcQuestionItem.prototype.callbackInput = function (event) {
        var view = this;
        var inputTF2 = view.getChildByName("inputTF2");
        var inputtxt = inputTF2.getChildByName("textField");
        var inputMaxText = inputTF2.getChildByName("inputMaxText");
        var _length = inputtxt.text.length; //+nNum;
        var newlength1 = this._maxLength - _length;
        if (newlength1 < 0) {
            newlength1 = 0;
        }
        inputMaxText.text = LanguageManager.getlocal("acQuestionAnswerWord-" + view.code, [newlength1 + ""]);
        if (newlength1 == 0) {
            inputMaxText.textColor = TextFieldConst.COLOR_WARN_RED3;
        }
        else {
            inputMaxText.textColor = 0xc2b89e;
        }
        if (inputtxt.text === '') {
            return;
        }
        if (Config.ShieldCfg.checkShield(inputtxt.text) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        if (App.StringUtil.checkChar(inputtxt.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
    };
    AcQuestionItem.prototype.checkAnwser = function (save) {
        var view = this;
        var answer = null;
        switch (view._data.type) {
            case 1:
                for (var i = 1; i <= view._data.selectNum; ++i) {
                    var checkBox = view.getChildByName("qabox" + i);
                    if (checkBox && checkBox.checkSelected()) {
                        answer = view._index + 1 + "_" + i;
                        break;
                    }
                }
                break;
            case 2:
                for (var i in view._mulCheckBox) {
                    if (Number(i) == 0) {
                        answer = view._index + 1 + "_";
                    }
                    var checkBox = view.getChildByName("qabox" + view._mulCheckBox[i]);
                    if (checkBox && checkBox.checkSelected()) {
                        answer += "" + view._mulCheckBox[i];
                    }
                }
                break;
            case 3:
                var inputTF2 = view.getChildByName("inputTF2");
                var inputtxt = inputTF2.getChildByName("textField");
                var msg = inputtxt.text;
                if (msg != '') {
                    if (save) {
                        answer = msg;
                    }
                    else {
                        if ((App.StringUtil.checkChar(msg) || Config.ShieldCfg.checkOnlyShield(msg) == false || Config.ShieldCfg.checkShield(msg) == false)) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
                        }
                        else {
                            answer = msg;
                        }
                    }
                }
                break;
        }
        return {
            index: view._index,
            answer: answer,
        };
    };
    AcQuestionItem.prototype.getIsAnswer = function () {
        var view = this;
        var flag = false;
        switch (view._data.type) {
            case 1:
                for (var i = 1; i <= view._data.selectNum; ++i) {
                    var checkBox = view.getChildByName("qabox" + i);
                    if (checkBox && checkBox.checkSelected()) {
                        flag = true;
                        break;
                    }
                }
                break;
            case 2:
                for (var i in view._mulCheckBox) {
                    var checkBox = view.getChildByName("qabox" + view._mulCheckBox[i]);
                    if (checkBox && checkBox.checkSelected()) {
                        flag = true;
                        break;
                    }
                }
                break;
            case 3:
                var inputTF2 = view.getChildByName("inputTF2");
                var inputtxt = inputTF2.getChildByName("textField");
                var msg = inputtxt.text;
                if (msg != '') {
                    flag = true;
                }
                break;
        }
        return flag;
    };
    AcQuestionItem.prototype.showEffect = function () {
        var view = this;
        if (view._showEff) {
            return;
        }
        view._showEff = true;
        var light = BaseBitmap.create("public_9_bg57");
        light.width = view.width + 20;
        light.height = view.height + 25;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, view, [0, -5], true);
        view.addChild(light);
        egret.Tween.get(light).
            to({ alpha: 0 }, 500).to({ alpha: 1 }, 500).
            to({ alpha: 0 }, 500).to({ alpha: 1 }, 500).
            to({ alpha: 0 }, 500).to({ alpha: 1 }, 500).
            call(function () {
            egret.Tween.removeTweens(light);
            view.removeChild(light);
            light = null;
            view._showEff = false;
        }, view);
    };
    AcQuestionItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcQuestionItem.prototype.dispose = function () {
        var view = this;
        view._showEff = false;
        view._curCheckBox = 0;
        view._data = null;
        view._code = '';
        view._mulCheckBox = [];
        this._maxLength = 0;
        _super.prototype.dispose.call(this);
    };
    return AcQuestionItem;
}(ScrollListItem));
__reflect(AcQuestionItem.prototype, "AcQuestionItem");
//# sourceMappingURL=AcQuestionItem.js.map