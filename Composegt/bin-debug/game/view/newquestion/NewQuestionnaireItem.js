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
var NewQuestionnaireItem = (function (_super) {
    __extends(NewQuestionnaireItem, _super);
    function NewQuestionnaireItem() {
        var _this = _super.call(this) || this;
        _this._rowIdx = 0;
        _this._uiData = undefined;
        //
        _this._q1aList = [];
        /**是否是多选 */
        _this.multipleChoice = 0;
        return _this;
    }
    NewQuestionnaireItem.prototype.initItem = function (index, data) {
        this._uiData = data;
        this.width = 500;
        /**
         */
        this.itemId = data.itemId;
        var qbg1 = BaseBitmap.create("public_tc_bg05");
        qbg1.width = 510;
        qbg1.height = 40;
        qbg1.x = 0;
        qbg1.y = 0;
        this.addChild(qbg1);
        var q1Text = ComponentManager.getTextField(LanguageManager.getlocal("newquestion_37wd_" + this.itemId), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
        q1Text.x = 9;
        q1Text.y = 10;
        this.addChild(q1Text);
        var view_data = NewQuestionnaireCtrl.getIns();
        //判断类型
        if (data.answerNum > 0) {
            var selectRes = "public_select4";
            var selectDownRes = "public_select_down4";
            this.multipleChoice = data.multipleChoice; //多选还是单选
            if (this.multipleChoice > 0) {
                var q2Text = ComponentManager.getTextField(LanguageManager.getlocal('newquestion_37wd_tip_4', ['' + data.multipleChoice]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BLACK);
                q2Text.x = q1Text.x + q1Text.width;
                q2Text.y = 10;
                this.addChild(q2Text);
                selectRes = null;
                selectDownRes = "public_select_down5";
            }
            var answerNum = data.answerNum, selectArr = view_data.getSelectArrById(this.itemId);
            var X = 45; //92;
            for (var i = 0; i < answerNum; i++) {
                var checkbox = ComponentManager.getCheckBox(null, null, null, null, selectDownRes, selectRes);
                checkbox.setScale(0.8);
                checkbox.x = X;
                checkbox.y = 54 + i * 51;
                this.addChild(checkbox);
                this._q1aList.push(checkbox);
                checkbox.addTouchTap(this.q1Handler, this, [i]);
                checkbox.setSelected(selectArr.indexOf(i) >= 0);
                var q2a4Text = ComponentManager.getTextField(LanguageManager.getlocal("newquestion_37wd_" + this.itemId + "_" + (i + 1)), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
                q2a4Text.x = X + checkbox.width + 5;
                q2a4Text.y = checkbox.y + 10;
                this.addChild(q2a4Text);
            }
            this.height = 54 + (answerNum - 1) * 51 + 36;
        }
        else {
            var inc = 180;
            var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 466, inc + 134, "public_tc_srkbg05", LanguageManager.getlocal("questionnaireQ4Tip"), TextFieldConst.COLOR_WHITE);
            inputTF.y = 57;
            this.addChild(inputTF);
            var _inputMsg_1 = inputTF.getChildByName("textField");
            _inputMsg_1.y = 10;
            _inputMsg_1.height = inc + 86; //130;
            _inputMsg_1.width = 456;
            _inputMsg_1.maxChars = 200;
            _inputMsg_1.multiline = true;
            inputTF.x = 16;
            if (view_data.getInputStr() != "") {
                _inputMsg_1.text = view_data.getInputStr();
            }
            _inputMsg_1.addEventListener(egret.Event.FOCUS_OUT, function () {
                if (_inputMsg_1.text && _inputMsg_1.text != "") {
                    view_data.setInputStr(_inputMsg_1.text);
                }
            }, this);
            view_data.setInputId(this.itemId);
            this._inputMsg = _inputMsg_1;
            this.height = 195 + inc;
        }
    };
    NewQuestionnaireItem.prototype.q1Handler = function (event, ii) {
        /**单选的 */
        var length = this._q1aList.length, view_data = NewQuestionnaireCtrl.getIns();
        if (this.multipleChoice == 0) {
            for (var index = 0; index < length; index++) {
                var element = this._q1aList[index];
                if (ii != index) {
                    element.setSelected(false);
                }
            }
            var selectIndex = -1;
            for (var index = 0; index < length; index++) {
                var element = this._q1aList[index];
                if (element.checkSelected() == true) {
                    selectIndex = index + 1;
                    break;
                }
            }
            if (selectIndex == -1) {
                view_data.addSelectId(this.itemId, [], this.multipleChoice);
            }
            else {
                view_data.addSelectId(this.itemId, [selectIndex], this.multipleChoice);
            }
        }
        else {
            var selectIdArr = [];
            for (var index = 0; index < length; index++) {
                var element = this._q1aList[index];
                if (element.checkSelected() == true) {
                    selectIdArr.push(index + 1);
                }
            }
            if (selectIdArr.length <= this.multipleChoice) {
                view_data.addSelectId(this.itemId, selectIdArr, this.multipleChoice);
            }
            else {
                //选择的超过数量，提示？
                this._q1aList[ii].setSelected(false);
                App.CommonUtil.showTip(LanguageManager.getlocal("newquestion_37wd_tip_1", ['' + this.multipleChoice]));
            }
        }
    };
    NewQuestionnaireItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    NewQuestionnaireItem.prototype.getSpaceY = function () {
        return 1;
    };
    NewQuestionnaireItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._maskImg = null;
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap = false;
        this._q1aList = [];
        if (this._inputMsg) {
            NewQuestionnaireCtrl.getIns().setInputStr(this._inputMsg.text);
        }
        this._inputMsg = null;
    };
    return NewQuestionnaireItem;
}(ScrollListItem));
__reflect(NewQuestionnaireItem.prototype, "NewQuestionnaireItem");
