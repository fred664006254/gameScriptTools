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
 * 玩家信息item
 * author shaoliang
 */
var UserMsgItem = (function (_super) {
    __extends(UserMsgItem, _super);
    function UserMsgItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._textTab = [];
        _this._btnTab = [];
        _this._showIdx = 0;
        _this._maxLength = 0;
        _this._showEff = false;
        _this._function = null;
        _this._obj = null;
        _this._nameTab = ["name", "address", "birthday", "tel", "email"];
        return _this;
    }
    UserMsgItem.prototype.initItem = function (index, data, itemParam) {
        var view = this;
        view._data = data;
        view.width = 585;
        this._function = itemParam.f;
        this._obj = itemParam.o;
        var name1 = ComponentManager.getTextField(String(data) + ".", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this.addChild(name1);
        var name = ComponentManager.getTextField(LanguageManager.getlocal("usermsg_name" + data), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        name.x = name1.width;
        name.width = 560;
        name.lineSpacing = 5;
        this.addChild(name);
        //名字
        if (data == 1) {
            this._maxLength = 200;
            var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 90, "public_9_bg5", LanguageManager.getlocal("acQuestionTip3-1"), 0xb1b1b1);
            inputTF2.name = "inputTF2";
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name, [20, name.textHeight + 10]);
            view.addChild(inputTF2);
            var inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswerWord-1", [this._maxLength + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
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
        else if (data == 2) {
            this._maxLength = 200;
            var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 90, "public_9_bg5", LanguageManager.getlocal("acQuestionTip3-1"), 0xb1b1b1);
            inputTF2.name = "inputTF2";
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name, [20, name.textHeight + 10]);
            view.addChild(inputTF2);
            var inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswerWord-1", [this._maxLength + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
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
        else if (data == 3) {
            var bg1 = BaseBitmap.create("public_9_bg5");
            bg1.setPosition(70, name.y + name.height + 20);
            bg1.width = 100;
            bg1.height = 40;
            this.addChild(bg1);
            var input1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            input1.setPosition(bg1.x + 8, bg1.y + 11);
            this.addChild(input1);
            var inputName1 = ComponentManager.getTextField(LanguageManager.getlocal("date_year"), 20, TextFieldConst.COLOR_BROWN);
            inputName1.setPosition(bg1.x + bg1.width + 3, input1.y);
            this.addChild(inputName1);
            var btn1 = ComponentManager.getButton("common_arrow_3", null, this.arrowClickHandler, this, [1]);
            btn1.anchorOffsetY = btn1.height / 2;
            btn1.setPosition(bg1.x + bg1.width - 2 - btn1.width - 6, bg1.y + bg1.height / 2);
            this.addChild(btn1);
            this._textTab.push(input1);
            this._btnTab.push(btn1);
            var bg2 = BaseBitmap.create("public_9_bg5");
            bg2.setPosition(inputName1.x + inputName1.width + 10, bg1.y);
            bg2.width = 77;
            bg2.height = 40;
            this.addChild(bg2);
            var input2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            input2.setPosition(bg2.x + 8, input1.y);
            this.addChild(input2);
            var inputName2 = ComponentManager.getTextField(LanguageManager.getlocal("date_month"), 20, TextFieldConst.COLOR_BROWN);
            inputName2.setPosition(bg2.x + bg2.width + 3, input1.y);
            this.addChild(inputName2);
            var btn2 = ComponentManager.getButton("common_arrow_3", null, this.arrowClickHandler, this, [2]);
            btn2.anchorOffsetY = btn2.height / 2;
            btn2.setPosition(bg2.x + bg2.width - 2 - btn2.width - 6, btn1.y);
            this.addChild(btn2);
            this._textTab.push(input2);
            this._btnTab.push(btn2);
            var bg3 = BaseBitmap.create("public_9_bg5");
            bg3.setPosition(inputName2.x + inputName2.width + 10, bg1.y);
            bg3.width = 77;
            bg3.height = 40;
            this.addChild(bg3);
            var input3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            input3.setPosition(bg3.x + 8, input1.y);
            this.addChild(input3);
            var inputName3 = ComponentManager.getTextField(LanguageManager.getlocal("date_day"), 20, TextFieldConst.COLOR_BROWN);
            inputName3.setPosition(bg3.x + bg3.width + 3, input1.y);
            this.addChild(inputName3);
            var btn3 = ComponentManager.getButton("common_arrow_3", null, this.arrowClickHandler, this, [3]);
            btn3.setPosition(bg3.x + bg3.width - 2 - btn3.width - 6, btn1.y);
            btn3.anchorOffsetY = btn3.height / 2;
            this.addChild(btn3);
            this._textTab.push(input3);
            this._btnTab.push(btn3);
            btn1.scaleY = -1;
            btn2.scaleY = -1;
            btn3.scaleY = -1;
            view.height = bg1.y + bg1.height + 20;
        }
        else if (data == 4) {
            this._maxLength = 20;
            var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 90, "public_9_bg5", LanguageManager.getlocal("acQuestionTip3-1"), 0xb1b1b1);
            inputTF2.name = "inputTF2";
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name, [20, name.textHeight + 10]);
            view.addChild(inputTF2);
            // let input = <BaseTextField>inputTF2.getChildByName("textField");
            // input.inputType = egret.TextFieldInputType.TEL;
            var inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswerWord-1", [this._maxLength + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
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
        else if (data == 5) {
            this._maxLength = 200;
            var inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_SMALL, 535, 90, "public_9_bg5", LanguageManager.getlocal("acQuestionTip3-1"), 0xb1b1b1);
            inputTF2.name = "inputTF2";
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, name, [20, name.textHeight + 10]);
            view.addChild(inputTF2);
            var inputMaxText = ComponentManager.getTextField(LanguageManager.getlocal("acQuestionAnswerWord-1", [this._maxLength + ""]), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0xc2b89e);
            inputMaxText.name = "inputMaxText";
            inputTF2.addChild(inputMaxText);
            var inputtxt = inputTF2.getChildByName("textField");
            inputtxt.maxChars = this._maxLength;
            inputtxt.y = 10;
            inputtxt.height = 50;
            inputtxt.width = 530;
            inputtxt.multiline = true;
            view.height = inputTF2.y + inputTF2.height + 20;
            inputtxt.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, inputMaxText, inputTF2, [0, 10], true);
            view.height = inputTF2.y + inputTF2.height + 20;
        }
        var line = BaseBitmap.create("public_line1");
        line.width = view.width;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view, [0, 5], true);
        view.addChild(line);
    };
    UserMsgItem.prototype.arrowClickHandler = function (idx) {
        this._showIdx = idx;
        var info = {};
        info["index"] = idx;
        if (idx == 3) {
            if (!this._textTab[0].text || !this._textTab[1].text) {
                App.CommonUtil.showTip(LanguageManager.getlocal("usermsg_day_tip1"));
                return;
            }
            info["year"] = this._textTab[0].text;
            info["month"] = this._textTab[1].text;
        }
        info["o"] = this;
        info["f"] = this.setBirthday;
        info["x"] = this._textTab[idx - 1].x + 23;
        info["y"] = this.y;
        this._btnTab[idx - 1].scaleY = 1;
        this._function.apply(this._obj, [info]);
    };
    UserMsgItem.prototype.setBirthday = function (str) {
        this._btnTab[this._showIdx - 1].scaleY = -1;
        if (str) {
            this._textTab[this._showIdx - 1].text = str;
        }
        if (this._showIdx != 3) {
            if (this._textTab[0].text && this._textTab[1].text && this._textTab[2].text) {
                var year = Number(this._textTab[0].text);
                var month = Number(this._textTab[1].text);
                var maxDays = GameData.getMonthDayByYearAndMonth(year, month);
                var day = Number(this._textTab[2].text);
                if (day > maxDays) {
                    this._textTab[2].text = String(maxDays);
                }
            }
        }
    };
    UserMsgItem.prototype.callbackInput = function (event) {
        var view = this;
        var inputTF2 = view.getChildByName("inputTF2");
        var inputtxt = inputTF2.getChildByName("textField");
        var inputMaxText = inputTF2.getChildByName("inputMaxText");
        var _length = inputtxt.text.length; //+nNum;
        var newlength1 = this._maxLength - _length;
        if (newlength1 < 0) {
            newlength1 = 0;
        }
        inputMaxText.text = LanguageManager.getlocal("acQuestionAnswerWord-1", [newlength1 + ""]);
        if (newlength1 == 0) {
            inputMaxText.textColor = TextFieldConst.COLOR_WARN_RED3;
        }
        else {
            inputMaxText.textColor = 0xc2b89e;
        }
        if (inputtxt.text === '') {
            return;
        }
        // if(Config.ShieldCfg.checkShield(inputtxt.text)==false)
        // {
        // 	App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
        // 	return;
        // }
        if (App.StringUtil.checkChar(inputtxt.text)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
    };
    UserMsgItem.prototype.checkAnwser = function () {
        var view = this;
        var answer = null;
        var msg = '';
        if (this._data == 3) {
            if (this._textTab[0].text && this._textTab[1].text && this._textTab[2].text) {
                msg = this._textTab[0].text + "/" + this._textTab[1].text + "/" + this._textTab[2].text;
            }
        }
        else {
            var inputTF2 = view.getChildByName("inputTF2");
            var inputtxt = inputTF2.getChildByName("textField");
            msg = inputtxt.text;
        }
        if (msg != '') {
            if ((App.StringUtil.checkChar(msg))) {
                App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            }
            else {
                answer = msg;
            }
        }
        return {
            index: view._index,
            name: this._nameTab[this._data - 1],
            answer: answer,
        };
    };
    UserMsgItem.prototype.getIsAnswer = function () {
        var view = this;
        var flag = false;
        if (this._data == 3) {
            if (this._textTab[0].text && this._textTab[1].text && this._textTab[2].text) {
                flag = true;
            }
        }
        else {
            var inputTF2 = view.getChildByName("inputTF2");
            var inputtxt = inputTF2.getChildByName("textField");
            var msg = inputtxt.text;
            if (msg != '') {
                flag = true;
            }
        }
        return flag;
    };
    UserMsgItem.prototype.showEffect = function () {
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
    UserMsgItem.prototype.dispose = function () {
        this._data = null;
        this._textTab.length = 0;
        this._maxLength = 0;
        this._showEff = false;
        this._showIdx = 0;
        this._function = null;
        this._obj = null;
        _super.prototype.dispose.call(this);
    };
    return UserMsgItem;
}(ScrollListItem));
__reflect(UserMsgItem.prototype, "UserMsgItem");
//# sourceMappingURL=UserMsgItem.js.map